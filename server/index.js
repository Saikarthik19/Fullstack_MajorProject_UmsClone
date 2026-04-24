import http from 'node:http'
import { findChatbotAnswer, findUser, portalData, resolveAction } from './data.js'

const port = Number(process.env.PORT || 3001)

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  })
  response.end(JSON.stringify(payload))
}

function parseBody(request) {
  return new Promise((resolve, reject) => {
    let data = ''

    request.on('data', (chunk) => {
      data += chunk
    })

    request.on('end', () => {
      if (!data) {
        resolve({})
        return
      }

      try {
        resolve(JSON.parse(data))
      } catch (error) {
        reject(error)
      }
    })

    request.on('error', reject)
  })
}

function getDashboardPayload(user) {
  return {
    profile: {
      name: user.name,
      details: user.details,
      program: user.program,
      profileDetails: user.profileDetails,
    },
    quickLinks: portalData.quickLinks,
    quickLinkDetails: portalData.quickLinkDetails,
    heroSlides: portalData.heroSlides,
    happeningItems: portalData.happeningItems,
    messageItems: portalData.messageItems,
    messageCenter: portalData.messageCenter,
    courseCards: portalData.courseCards,
    courseDetails: portalData.courseDetails,
    timetable: portalData.timetable,
    feeCenter: portalData.feeCenter,
    assignments: portalData.assignments,
    assignmentMatrix: portalData.assignmentMatrix,
    assignmentUpload: portalData.assignmentUpload,
    placementDrives: portalData.placementDrives,
    authorities: portalData.authorities,
    announcementTabs: portalData.announcementTabs,
    chatbot: {
      suggestions: portalData.chatbot.suggestions,
    },
  }
}

function getPortalContext() {
  const user = portalData.users[0]
  const feeRows = portalData.feeCenter.transactions
    .map((row) => row.join(' | '))
    .join('\n')
  const assignmentRows = portalData.assignments
    .map((item) => `${item.course} | ${item.detail} | ${item.due}`)
    .join('\n')
  const quickLinks = Object.entries(portalData.quickLinkDetails)
    .map(([label, detail]) => `${label}: ${JSON.stringify(detail)}`)
    .join('\n')
  const courses = portalData.courseCards
    .map((course) => `${course.code} ${course.title} | ${course.info} | ${course.exam}`)
    .join('\n')

  return `
Portal context for one student:
Name: ${user.name}
Program: ${user.program}
Details: ${user.details}
Profile: ${JSON.stringify(user.profileDetails)}
Fee total: ${portalData.feeCenter.total}
Fee transactions:
${feeRows}
Assignments:
${assignmentRows}
Courses:
${courses}
Quick links:
${quickLinks}
Announcements: ${JSON.stringify(portalData.announcementTabs)}
Emergency numbers: ${JSON.stringify(portalData.quickLinkDetails['Emergency Numbers'])}
Issued books: ${JSON.stringify(portalData.quickLinkDetails['Issued Books'])}
Date sheet: ${JSON.stringify(portalData.quickLinkDetails['Date Sheet'])}
`.trim()
}

async function callGemini(message) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured.')
  }

  const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash'
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: `You are a university portal assistant. Answer only using the provided portal context. If the answer is unavailable, say that the portal data does not show it.\n\n${getPortalContext()}\n\nUser question: ${message}`,
            },
          ],
        },
      ],
    }),
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.error?.message || 'Gemini request failed.')
  }

  const text = data.candidates?.[0]?.content?.parts
    ?.map((part) => part.text)
    .filter(Boolean)
    .join('\n')

  if (!text) {
    throw new Error('Gemini returned no text response.')
  }

  return {
    subject: 'Gemini',
    answer: text,
  }
}

async function callAnthropic(message) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY is not configured.')
  }

  const model = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514'
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model,
      max_tokens: 700,
      messages: [
        {
          role: 'user',
          content: `You are a university portal assistant. Answer only using the provided portal context. If the answer is unavailable, say that the portal data does not show it.\n\n${getPortalContext()}\n\nUser question: ${message}`,
        },
      ],
    }),
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.error?.message || 'Anthropic request failed.')
  }

  const text = data.content
    ?.filter((item) => item.type === 'text')
    .map((item) => item.text)
    .join('\n')

  if (!text) {
    throw new Error('Anthropic returned no text response.')
  }

  return {
    subject: 'Claude Sonnet',
    answer: text,
  }
}


function getTopMenuDetail(label) {
  const lower = label.toLowerCase()

  if (lower.includes('result')) {
    return {
      type: 'topmenu-detail',
      title: label,
      detailType: 'table',
      columns: ['Course', 'Grade', 'Credits', 'Status'],
      rows: [
        ['CSB206', 'A', '5', 'Declared'],
        ['CSB207', 'A-', '3', 'Declared'],
        ['CSE239', 'B+', '3', 'Declared'],
      ],
    }
  }

  if (lower.includes('certificate') || lower.includes('letter')) {
    return {
      type: 'topmenu-detail',
      title: label,
      detailType: 'list',
      items: [
        'Request status: Ready for submission',
        'Expected processing time: 2 working days',
        'Required documents: University ID, fee clearance, latest term registration',
      ],
    }
  }

  if (lower.includes('registration') || lower.includes('application') || lower.includes('nomination')) {
    return {
      type: 'topmenu-detail',
      title: label,
      detailType: 'list',
      items: [
        'Current status: Open',
        'Window closes on: 31-05-2026',
        'Last submitted activity: Draft saved in portal',
      ],
    }
  }

  if (lower.includes('hostel') || lower.includes('residential')) {
    return {
      type: 'topmenu-detail',
      title: label,
      detailType: 'list',
      items: [
        'Current room: BH-4 | Room 217',
        'Residential status: Active',
        'Latest hostel request: Under review by residential services',
      ],
    }
  }

  if (lower.includes('fee') || lower.includes('scholarship') || lower.includes('loan')) {
    return {
      type: 'topmenu-detail',
      title: label,
      detailType: 'table',
      columns: ['Head', 'Value'],
      rows: [
        ['Pending Fee', portalData.feeCenter.total],
        ['Scholarship Flag', 'Merit review eligible'],
        ['Last Transaction', portalData.feeCenter.transactions[0][1]],
      ],
    }
  }

  if (lower.includes('library') || lower.includes('book')) {
    return {
      type: 'topmenu-detail',
      title: label,
      detailType: 'list',
      items: [
        'Issued books: 3',
        'Fine due: NIL',
        'Next due date: 29-04-2026',
      ],
    }
  }

  if (lower.includes('placement') || lower.includes('career') || lower.includes('internship')) {
    return {
      type: 'topmenu-detail',
      title: label,
      detailType: 'list',
      items: [
        'Eligible drives this week: 3',
        'Latest activity: Resume shortlisted for practice review',
        'Placement support desk: Active',
      ],
    }
  }

  if (lower.includes('feedback') || lower.includes('survey') || lower.includes('grievance')) {
    return {
      type: 'topmenu-detail',
      title: label,
      detailType: 'list',
      items: [
        'Portal entry available for this service',
        'One pending submission is visible in your account',
        'Response window remains open for the current term',
      ],
    }
  }

  if (lower.includes('password') || lower.includes('security')) {
    return {
      type: 'topmenu-detail',
      title: label,
      detailType: 'list',
      items: [
        'Last password update: 03-04-2026',
        'Recommended action: change password before 15-04-2026',
        'MFA / identity verification can be enabled from profile settings',
      ],
    }
  }

  if (lower.includes('calendar') || lower.includes('date sheet') || lower.includes('schedule') || lower.includes('time table')) {
    return {
      type: 'topmenu-detail',
      title: label,
      detailType: 'table',
      columns: ['Item', 'Date', 'Status'],
      rows: [
        ['Mid-term Activity', '05-05-2026', 'Scheduled'],
        ['Registration Window', '31-05-2026', 'Open'],
        ['Project Review', '01-06-2026', 'Upcoming'],
      ],
    }
  }

  return {
    type: 'topmenu-detail',
    title: label,
    detailType: 'list',
    items: [
      'Sample backend data prepared for this menu option.',
      'This item can be expanded into a full dedicated module next.',
      'Current portal status: available for demonstration.',
    ],
  }
}

function getModuleData(body) {
  const { module, label, mode, courseCode } = body

  if (module === 'quicklink') {
    const detail = portalData.quickLinkDetails[label]
    if (!detail) throw new Error(`Quick link not found: ${label}`)
    return { type: 'quicklink', label, quickLink: detail }
  }

  if (module === 'profile') {
    const user = portalData.users[0]
    return {
      type: 'profile',
      profile: {
        name: user.name,
        details: user.details,
        program: user.program,
        profileDetails: user.profileDetails,
      },
    }
  }

  if (module === 'messages') {
    return { type: 'messages', messageCenter: portalData.messageCenter }
  }

  if (module === 'assignments') {
    return { type: 'assignments', assignmentMatrix: portalData.assignmentMatrix }
  }

  if (module === 'fee') {
    return { type: 'fee', mode: mode || 'pay', feeCenter: portalData.feeCenter }
  }

  if (module === 'topmenu') {
    return getTopMenuDetail(label)
  }

  if (module === 'course') {
    const course = portalData.courseCards.find((item) => item.code === courseCode)
    const courseDetail = portalData.courseDetails[courseCode]
    if (!course || !courseDetail) throw new Error(`Course not found: ${courseCode}`)
    return {
      type: body.view || 'syllabus',
      courseCode,
      course,
      courseDetail,
      timetable: portalData.timetable,
    }
  }

  throw new Error(`Module not found: ${module}`)
}

async function getChatbotAnswer(message, provider = 'local') {
  if (provider === 'gemini') {
    try {
      return await callGemini(message)
    } catch (error) {
      const fallback = findChatbotAnswer(message)
      return {
        ...fallback,
        provider: 'local',
        answer: `${fallback.answer} Gemini is not available right now (${error.message}).`,
      }
    }
  }

  if (provider === 'sonnet') {
    try {
      return await callAnthropic(message)
    } catch (error) {
      const fallback = findChatbotAnswer(message)
      return {
        ...fallback,
        provider: 'local',
        answer: `${fallback.answer} Claude Sonnet is not available right now (${error.message}).`,
      }
    }
  }

  return { ...findChatbotAnswer(message), provider: 'local' }
}

const server = http.createServer(async (request, response) => {
  const { method, url } = request

  if (method === 'OPTIONS') {
    sendJson(response, 204, {})
    return
  }

  if (method === 'GET' && url === '/api/health') {
    sendJson(response, 200, { ok: true })
    return
  }

  if (method === 'POST' && url === '/api/login') {
    try {
      const body = await parseBody(request)
      const user = findUser(body.userId, body.password, body.role)

      if (!user) {
        sendJson(response, 401, {
          ok: false,
          message: 'Invalid user ID, password, or role.',
        })
        return
      }

      sendJson(response, 200, {
        ok: true,
        message: `Logged in successfully as ${body.role}.`,
        dashboard: getDashboardPayload(user),
      })
    } catch {
      sendJson(response, 400, { ok: false, message: 'Invalid login request payload.' })
    }
    return
  }

  if (method === 'POST' && url === '/api/action') {
    try {
      const body = await parseBody(request)
      sendJson(response, 200, {
        ok: true,
        message: resolveAction(body.action ?? 'Unknown action'),
      })
    } catch {
      sendJson(response, 400, { ok: false, message: 'Invalid action request payload.' })
    }
    return
  }

  if (method === 'POST' && url === '/api/module') {
    try {
      const body = await parseBody(request)
      sendJson(response, 200, {
        ok: true,
        module: getModuleData(body),
      })
    } catch (error) {
      sendJson(response, 400, { ok: false, message: error.message || 'Invalid module request payload.' })
    }
    return
  }

  if (method === 'GET' && url === '/api/chatbot/config') {
    sendJson(response, 200, {
      ok: true,
      suggestions: portalData.chatbot.suggestions,
      providers: [
        { id: 'local', label: 'Portal AI' },
        { id: 'gemini', label: 'Gemini' },
        { id: 'sonnet', label: 'Claude Sonnet' },
      ],
    })
    return
  }

  if (method === 'POST' && url === '/api/chatbot/ask') {
    try {
      const body = await parseBody(request)
      const result = await getChatbotAnswer(body.message ?? '', body.provider ?? 'local')

      sendJson(response, 200, {
        ok: true,
        provider: result.provider ?? body.provider ?? 'local',
        ...result,
      })
    } catch (error) {
      sendJson(response, 400, { ok: false, message: error.message || 'Invalid chatbot request payload.' })
    }
    return
  }

  sendJson(response, 404, { ok: false, message: 'Route not found.' })
})

server.listen(port, () => {
  console.log(`UMS backend running on http://localhost:${port}`)
})
