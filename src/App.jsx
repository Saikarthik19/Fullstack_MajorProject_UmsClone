import { useEffect, useMemo, useRef, useState } from 'react'
import { askChatbot, fetchModule, getChatbotConfig, login, runAction } from './api'
import './App.css'

const roles = ['HeadOffice', 'Student', 'Faculty', 'Parent']

const defaultDashboard = {
  profile: {
    name: 'Parvathaneni Sai Karthik',
    details: 'VID: 12405703 | Section: 324BX',
    program: 'B.Tech. (CSE-Generative AI) [Gen AI] (P132-NNS)',
  },
  quickLinks: [],
  quickLinkDetails: {},
  heroSlides: [],
  happeningItems: [],
  messageItems: [],
  messageCenter: {
    title: 'My Messages',
    items: [],
  },
  courseCards: [],
  courseDetails: {},
  timetable: [],
  feeCenter: {
    total: '0',
    notifications: [],
    transactions: [],
  },
  assignments: [],
  assignmentMatrix: {
    columns: [],
    rows: [],
  },
  assignmentUpload: {
    title: 'Student Assignment Upload',
    courses: [],
    teachers: [],
    notice: '',
  },
  placementDrives: [],
  authorities: [],
  announcementTabs: {},
  chatbot: {
    suggestions: [],
  },
  topMenuData: {},
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '◔' },
  { id: 'touch', label: 'LPU Touch', icon: '▣' },
  { id: 'live', label: 'LPU Live', icon: '◌' },
  { id: 'class', label: 'My Class', icon: '◎' },
  { id: 'support', label: 'YourDost', icon: '◍' },
]

const topMenu = ['Academics', 'Administrative', 'Important Links', 'Student Services', 'Quick Links']

function generateCaptcha() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

function getInitials(value) {
  return value
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function App() {
  const [activeView, setActiveView] = useState('login')
  const [selectedRole, setSelectedRole] = useState(roles[0])
  const [form, setForm] = useState({
    userId: '12405703',
    password: 'password123',
    captchaInput: '',
  })
  const [captcha, setCaptcha] = useState(generateCaptcha())
  const [loginError, setLoginError] = useState('')
  const [loginNotice, setLoginNotice] = useState('Use the sample account and enter the captcha exactly as shown.')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [selectedNav, setSelectedNav] = useState('dashboard')
  const [selectedAnnouncement, setSelectedAnnouncement] = useState('Academic')
  const [openTopMenu, setOpenTopMenu] = useState(null)
  const [heroIndex, setHeroIndex] = useState(0)
  const [actionMessage, setActionMessage] = useState('Portal ready. Select an option to see a working backend response.')
  const [chatOpen, setChatOpen] = useState(false)
  const [chatInput, setChatInput] = useState('')
  const [chatLoading, setChatLoading] = useState(false)
  const [faqOpen, setFaqOpen] = useState(false)
  const chatBodyRef = useRef(null)
  const [dashboardLoading, setDashboardLoading] = useState(false)
  const [dashboardData, setDashboardData] = useState(defaultDashboard)
  const [selectedAuthority, setSelectedAuthority] = useState(null)
  const [activeModal, setActiveModal] = useState(null)
  const [chatSuggestions, setChatSuggestions] = useState(defaultDashboard.chatbot.suggestions)
  const [chatProviders, setChatProviders] = useState([{ id: 'local', label: 'Portal AI' }])
  const [selectedChatProvider, setSelectedChatProvider] = useState('local')
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hi, I am your campus assistant. I can answer predefined backend questions and I am ready for the Q&A you give me next.',
    },
  ])

  useEffect(() => {
    getChatbotConfig()
      .then((data) => {
        setChatSuggestions(data.suggestions ?? [])
        setChatProviders(data.providers ?? [{ id: 'local', label: 'Portal AI' }])
      })
      .catch(() => {
        setChatSuggestions([])
        setChatProviders([{ id: 'local', label: 'Portal AI' }])
      })
  }, [])

  useEffect(() => {
    if (!chatBodyRef.current) {
      return
    }

    chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight
  }, [chatMessages, chatLoading, faqOpen])

  useEffect(() => {
    if (!dashboardData.heroSlides.length) {
      return undefined
    }

    const timer = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % dashboardData.heroSlides.length)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [dashboardData.heroSlides])

  useEffect(() => {
    if (!selectedAuthority && dashboardData.authorities.length) {
      setSelectedAuthority(dashboardData.authorities[0])
    }
  }, [dashboardData.authorities, selectedAuthority])

  useEffect(() => {
    const tabs = Object.keys(dashboardData.announcementTabs)
    if (tabs.length && !dashboardData.announcementTabs[selectedAnnouncement]) {
      setSelectedAnnouncement(tabs[0])
    }
  }, [dashboardData.announcementTabs, selectedAnnouncement])

  const profile = useMemo(() => dashboardData.profile, [dashboardData.profile])
  const currentHero = dashboardData.heroSlides[heroIndex] ?? null
  const currentAnnouncement = dashboardData.announcementTabs[selectedAnnouncement]
  const activeTopMenuSections = openTopMenu ? dashboardData.topMenuData?.[openTopMenu] ?? [] : []
  const activeCourseDetail = activeModal?.courseCode
    ? dashboardData.courseDetails?.[activeModal.courseCode]
    : null

  function handleInputChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function reloadCaptcha() {
    const nextCaptcha = generateCaptcha()
    setCaptcha(nextCaptcha)
    setForm((current) => ({ ...current, captchaInput: '' }))
    setLoginError('')
    setLoginNotice('Captcha reloaded. Enter the new code to continue.')
  }

  async function handleLogin(event) {
    event.preventDefault()

    if (!form.userId.trim() || !form.password.trim()) {
      setLoginError('User ID and password are required.')
      return
    }

    if (form.captchaInput.trim().toUpperCase() !== captcha) {
      setLoginError('Captcha mismatch. Please try again or reload the captcha.')
      return
    }

    setDashboardLoading(true)
    setLoginError('')

    try {
      const result = await login({
        userId: form.userId.trim(),
        password: form.password.trim(),
        role: selectedRole,
      })

      setDashboardData(result.dashboard)
      setSelectedAuthority(result.dashboard.authorities[0] ?? null)
      setSelectedAnnouncement(Object.keys(result.dashboard.announcementTabs)[0] ?? 'Academic')
      setHeroIndex(0)
      setChatSuggestions(result.dashboard.chatbot?.suggestions ?? [])
      setLoginNotice(result.message)
      setActionMessage(`Welcome back, ${result.dashboard.profile.name}. Your ${selectedRole} dashboard is now active.`)
      setActiveView('dashboard')
    } catch (error) {
      setLoginError(error.message)
    } finally {
      setDashboardLoading(false)
    }
  }


  async function openTopMenuDetail(label) {
    try {
      const result = await fetchModule({ module: 'topmenu', label })
      setActiveModal(result.module)
      setActionMessage(`${label} loaded from backend.`)
      setOpenTopMenu(null)
    } catch (error) {
      setActionMessage(error.message)
    }
  }

  async function triggerAction(label) {
    try {
      const result = await runAction(label)
      setActionMessage(result.message)
    } catch (error) {
      setActionMessage(error.message)
    }
  }

  function openCourseModal(course, type) {
    setActiveModal({
      type,
      courseCode: course.code,
      course,
    })
    setActionMessage(`${course.code} ${type} opened.`)
  }

  function openProfileModal() {
    setActiveModal({
      type: 'profile',
    })
  }

  function openQuickLinkModal(label) {
    const detail = dashboardData.quickLinkDetails?.[label]

    if (!detail) {
      triggerAction(label)
      return
    }

    setActiveModal({
      type: 'quicklink',
      quickLink: detail,
      label,
    })
    setActionMessage(`${label} opened.`)
  }

  function openMessageCenter() {
    setActiveModal({
      type: 'messages',
    })
    setActionMessage('My Messages opened.')
  }

  function openAssignmentsOverview() {
    setActiveModal({
      type: 'assignments',
    })
    setActionMessage('Pending assignments overview opened.')
  }

  function openAssignmentUpload(item) {
    setActiveModal({
      type: 'assignment-upload',
      assignment: item,
    })
    setActionMessage(`${item.course} upload page opened.`)
  }

  function openFeeModal(mode) {
    setActiveModal({
      type: 'fee',
      mode,
    })
    setActionMessage(`Fee ${mode} opened.`)
  }

  async function handleChatSend(message) {
    if (!message.trim()) {
      return
    }

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: message.trim(),
    }

    setChatMessages((current) => [...current, userMessage])
    setChatInput('')
    setChatLoading(true)

    try {
      const result = await askChatbot(message, selectedChatProvider)
      setChatMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: `[${result.subject} | ${chatProviders.find((provider) => provider.id === (result.provider ?? selectedChatProvider))?.label ?? 'Portal AI'}] ${result.answer}`,
        },
      ])
    } catch (error) {
      setChatMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: error.message,
        },
      ])
    } finally {
      setChatLoading(false)
    }
  }

  function handleLogout() {
    setActiveView('login')
    setSelectedNav('dashboard')
    setOpenTopMenu(null)
    setActionMessage('Signed out. Log in again to re-enter the dashboard.')
    setDashboardData(defaultDashboard)
    setSelectedAuthority(null)
    reloadCaptcha()
  }

  return (
    <div className="app-shell">
      {activeView === 'login' ? (
        <section className="login-page">
          <div className="promo-panel">
            <div className="promo-glow" />
            <div className="promo-copy">
              <p className="eyebrow">Refer your friends & earn incentives</p>
              <h1>Monetary benefits on reward points</h1>
              <div className="promo-points">
                <p>1000 points for each approved admission</p>
                <p>2000 additional points if residential facilities are also availed</p>
              </div>
              <div className="promo-card">
                <h2>Refer a friend now!</h2>
                <p>(Use UMS Referral Portal)</p>
                <p>UMS &gt; Student Services &gt; Admission Referral Form</p>
              </div>
              <button type="button" className="apply-button" onClick={() => triggerAction('Apply now')}>
                Apply Now
              </button>
            </div>
            <div className="student-stack" aria-hidden="true">
              <div className="student student-large">SK</div>
              <div className="student student-top">AA</div>
              <div className="student student-left">RK</div>
              <div className="student student-right">NV</div>
              <div className="student student-bottom">PJ</div>
            </div>
          </div>

          <div className="login-panel">
            <div className="brand-block">
              <div className="brand-mark">UMS</div>
              <div>
                <div className="brand-title">University Management System</div>
                <div className="brand-subtitle">University portal clone</div>
              </div>
            </div>

            <form className="login-card" onSubmit={handleLogin}>
              <div className="login-card-head">
                <h2>Log in</h2>
                <select value={selectedRole} onChange={(event) => setSelectedRole(event.target.value)}>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <label className="field">
                <span>User ID</span>
                <div className="field-box">
                  <input
                    name="userId"
                    value={form.userId}
                    onChange={handleInputChange}
                    placeholder="Enter your user ID"
                  />
                  <span className="field-icon">◔</span>
                </div>
              </label>

              <label className="field">
                <span>Password</span>
                <div className="field-box">
                  <input
                    name="password"
                    type={passwordVisible ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="icon-button"
                    onClick={() => setPasswordVisible((current) => !current)}
                  >
                    {passwordVisible ? 'Hide' : 'Show'}
                  </button>
                </div>
              </label>

              <div className="captcha-row">
                <label className="field captcha-input">
                  <span>Captcha</span>
                  <div className="field-box">
                    <input
                      name="captchaInput"
                      value={form.captchaInput}
                      onChange={handleInputChange}
                      placeholder="Enter captcha"
                    />
                  </div>
                </label>

                <div className="captcha-box" aria-label={`Captcha code ${captcha}`}>
                  <span>{captcha}</span>
                </div>

                <button type="button" className="reload-button" onClick={reloadCaptcha}>
                  Reload
                </button>
              </div>

              <button type="submit" className="login-button" disabled={dashboardLoading}>
                {dashboardLoading ? 'Logging in...' : 'Login'}
              </button>

              <button
                type="button"
                className="text-link"
                onClick={() => setLoginNotice('Password reset flow can be connected next.')}
              >
                Forgot your password?
              </button>

              <p className={`status-text ${loginError ? 'error' : ''}`}>{loginError || loginNotice}</p>
            </form>

            <button type="button" className="mail-link" onClick={() => triggerAction('Student Mail')}>
              Student Mail
            </button>
          </div>
        </section>
      ) : (
        <section className="dashboard-page">
          <aside className="sidebar">
            <button type="button" className="sidebar-collapse">
              ‹
            </button>
            {navItems.map((item) => (
              <button
                type="button"
                key={item.id}
                className={`side-item ${selectedNav === item.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedNav(item.id)
                  triggerAction(item.label)
                }}
              >
                <span className="side-icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
            <button type="button" className="support-fab" onClick={() => setChatOpen(true)}>
              b
            </button>
          </aside>

          <div className="dashboard-main">
            <header className="topbar">
              <div className="ums-logo-block">
                <div className="logo-badge">UMS</div>
                <div className="logo-copy">
                  <div className="logo-title">University Management System</div>
                  <div className="logo-small">Clone dashboard interface</div>
                </div>
              </div>

              <nav className="menu-bar">
                {topMenu.map((item) => (
                  <button key={item} type="button" className={`menu-item ${openTopMenu === item ? 'active' : ''}`} onClick={() => setOpenTopMenu((current) => current === item ? null : item)}>
                    {item}
                    <span>⌄</span>
                  </button>
                ))}
                <button type="button" className="menu-search" onClick={() => triggerAction('Search')}>
                  Search
                </button>
              </nav>

              <div className="profile-summary">
                <div>
                  <button type="button" className="profile-trigger" onClick={openProfileModal}>
                    <div className="profile-name">{profile.name}</div>
                    <div className="profile-meta">{profile.details}</div>
                    <div className="profile-meta">{profile.program}</div>
                  </button>
                </div>
                <button type="button" className="avatar avatar-button" onClick={openProfileModal}>
                  {getInitials(profile.name || 'UM')}
                </button>
                <button type="button" className="profile-menu" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </header>

            {openTopMenu ? (
              <section className="mega-menu">
                <div className="mega-menu-grid">
                  {activeTopMenuSections.map((section) => (
                    <div key={section.title} className="mega-menu-section">
                      <h3>{section.title}</h3>
                      <ul>
                        {section.items.map((item) => (
                          <li key={item}>
                            <button type="button" className="mega-link" onClick={() => openTopMenuDetail(item)}>{item}</button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            <main className="content">
              <div className="alert-bar">UMS password will expire in 1 day. Change your password on or before 15-04-2026.</div>

              {selectedNav === 'dashboard' ? (
                <>
                  <section className="section">
                    <div className="section-head">
                      <h2>Important Links</h2>
                    </div>
                    <div className="chip-row">
                      {dashboardData.quickLinks.map((link) => (
                        <button
                          type="button"
                          key={link.label}
                          className={`chip ${link.tone === 'accent' ? 'accent' : ''}`}
                          onClick={() => openQuickLinkModal(link.label)}
                        >
                          {link.label}
                          {link.badge ? <span className="chip-badge">{link.badge}</span> : null}
                        </button>
                      ))}
                    </div>
                  </section>

                  <section className="dashboard-grid top-grid">
                    <article className="panel panel-hero">
                      <div className="panel-title">Highlights</div>
                      <div className="hero-card">
                        <div className="hero-copy">
                          <h3>{currentHero?.title}</h3>
                          <p>{currentHero?.subtitle}</p>
                          <button
                            type="button"
                            className="blue-button"
                            onClick={() => triggerAction(currentHero?.cta ?? 'Highlights')}
                          >
                            {currentHero?.cta ?? 'Explore'}
                          </button>
                        </div>
                        <div className="hero-figure">
                          <div className="figure-circle figure-one">AP</div>
                          <div className="figure-circle figure-two">RK</div>
                        </div>
                      </div>
                      <div className="slide-dots">
                        {dashboardData.heroSlides.map((slide, index) => (
                          <button
                            key={slide.title}
                            type="button"
                            className={`dot ${index === heroIndex ? 'active' : ''}`}
                            onClick={() => setHeroIndex(index)}
                          />
                        ))}
                      </div>
                    </article>

                    <article className="panel panel-list">
                      <div className="panel-title">Happening</div>
                      <div className="list-stack">
                        {dashboardData.happeningItems.map((item) => (
                          <button key={item} type="button" className="list-item" onClick={() => triggerAction(item)}>
                            {item}
                          </button>
                        ))}
                      </div>
                      <div className="panel-footer">
                        <span>Happening events in LPU</span>
                        <button type="button" className="blue-button" onClick={() => triggerAction('View More Events')}>
                          View More
                        </button>
                      </div>
                    </article>

                    <article className="panel panel-list">
                      <div className="panel-title">My Messages</div>
                      <div className="message-stack">
                        {dashboardData.messageItems.map((message) => (
                          <button
                            key={message.title}
                            type="button"
                            className="message-card"
                            onClick={openMessageCenter}
                          >
                            <strong>{message.title}</strong>
                            <span>{message.meta}</span>
                            <p>{message.body}</p>
                          </button>
                        ))}
                      </div>
                      <div className="panel-footer">
                        <span>Messages sent by teachers</span>
                        <button type="button" className="blue-button" onClick={openMessageCenter}>
                          All Messages
                        </button>
                      </div>
                    </article>
                  </section>

                  <section className="dashboard-grid summary-grid">
                    <article className="panel panel-courses">
                      <div className="panel-title">My Courses</div>
                      <div className="course-scroll">
                        {dashboardData.courseCards.map((course) => (
                          <div key={course.code} className="course-row">
                            <div className="progress-ring">
                              <span>{course.attendance}%</span>
                            </div>
                            <div className="course-info">
                              <h3>
                                {course.code} : {course.title}
                              </h3>
                              <p>Term : {course.term}</p>
                              <p>{course.info}</p>
                              <p>{course.exam}</p>
                            </div>
                            <div className="course-actions">
                              {['IP', 'Syllabus', 'Timetable', 'Outcomes', 'View Books'].map((action) => (
                                <button
                                  type="button"
                                  key={action}
                                  className="outline-pill"
                                  onClick={() => {
                                    if (action === 'Syllabus') {
                                      openCourseModal(course, 'syllabus')
                                      return
                                    }

                                    if (action === 'Timetable') {
                                      openCourseModal(course, 'timetable')
                                      return
                                    }

                                    if (action === 'Outcomes') {
                                      openCourseModal(course, 'outcomes')
                                      return
                                    }

                                    triggerAction(`${course.code} ${action}`)
                                  }}
                                >
                                  {action}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="course-meta">
                        <span>CGPA : 7.98</span>
                        <span>ATTENDANCE : 91%</span>
                      </div>
                    </article>

                    <article className="panel panel-fee">
                      <div className="panel-title">Fee</div>
                      <div className="fee-total">{dashboardData.feeCenter.total}</div>
                      <button type="button" className="outline-pill large" onClick={() => openFeeModal('pay')}>
                        Pay Online
                      </button>
                      <button type="button" className="text-link dark" onClick={() => openFeeModal('notification')}>
                        Fee Notification
                      </button>
                      <button type="button" className="blue-button" onClick={() => openFeeModal('transactions')}>
                        Transactions
                      </button>
                    </article>

                    <article className="panel panel-assignment">
                      <div className="panel-title">Pending Assignments</div>
                      <div className="assignment-stack">
                        {dashboardData.assignments.map((item) => (
                          <div key={`${item.course}-${item.due}`} className="assignment-item">
                            <div>
                              <strong>{item.course}</strong>
                              <p>{item.detail}</p>
                              <span>Last Date : {item.due}</span>
                            </div>
                            <button
                              type="button"
                              className="outline-pill"
                              onClick={() => openAssignmentUpload(item)}
                            >
                              Upload
                            </button>
                          </div>
                        ))}
                      </div>
                      <button type="button" className="blue-button" onClick={openAssignmentsOverview}>
                        View Assignments
                      </button>
                    </article>

                    <article className="panel panel-events">
                      <div className="panel-title">Events</div>
                      <div className="event-copy">Get your event listed here through email events@lpu.co.in</div>
                      <div className="event-actions">
                        <button type="button" className="outline-pill" onClick={() => triggerAction('View Event Details')}>
                          View Details
                        </button>
                        <button type="button" className="blue-button" onClick={() => triggerAction('All Events')}>
                          All Events
                        </button>
                      </div>
                    </article>
                  </section>

                  <section className="section">
                    <div className="section-head">
                      <h2>Placement Details</h2>
                    </div>
                    <div className="dashboard-grid placement-grid">
                      <article className="panel">
                        <div className="panel-title">Recently Placed</div>
                        <div className="placed-card">
                          <p>Placed in : CORIZO EDUTECH</p>
                          <h3>Package ( CTC ) : 650000.00</h3>
                          <span>Total Students Placed : 5</span>
                        </div>
                        <div className="slide-dots compact">
                          {Array.from({ length: 10 }).map((_, index) => (
                            <span key={index} className={`dot static ${index === 0 ? 'active' : ''}`} />
                          ))}
                        </div>
                      </article>

                      <article className="panel">
                        <div className="panel-title">Today's Placement Drives</div>
                        <div className="drive-stack">
                          {dashboardData.placementDrives.map((drive) => (
                            <button
                              type="button"
                              key={drive.title}
                              className="drive-item"
                              onClick={() => triggerAction(drive.title)}
                            >
                              <strong>{drive.title}</strong>
                              <span>Stream : {drive.stream}</span>
                              <span>Salary Package : {drive.package}</span>
                            </button>
                          ))}
                        </div>
                      </article>
                    </div>
                  </section>

                  <section className="section">
                    <div className="section-head">
                      <h2>Important Announcements</h2>
                      <button type="button" className="blue-button" onClick={() => triggerAction('View All Announcements')}>
                        View All Announcements
                      </button>
                    </div>
                    <article className="panel">
                      <div className="panel-title">Announcements</div>
                      <div className="tab-row">
                        {Object.entries(dashboardData.announcementTabs).map(([tab, value]) => (
                          <button
                            type="button"
                            key={tab}
                            className={`tab-button ${selectedAnnouncement === tab ? 'active' : ''}`}
                            onClick={() => setSelectedAnnouncement(tab)}
                          >
                            {tab} ({value.count})
                          </button>
                        ))}
                      </div>
                      {currentAnnouncement ? (
                        <div className="announcement-body announcement-scroll">
                          <h3>{currentAnnouncement.title}</h3>
                          {currentAnnouncement.body.map((item) => (
                            <p key={item}>{item}</p>
                          ))}
                        </div>
                      ) : null}
                    </article>
                  </section>
                </>
              ) : (
                <section className="section">
                  <div className="section-head">
                    <h2>Know your Authorities</h2>
                  </div>
                  <div className="authority-grid">
                    {dashboardData.authorities.map((authority) => (
                      <button
                        type="button"
                        key={authority.role}
                        className={`authority-card ${selectedAuthority?.role === authority.role ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedAuthority(authority)
                          triggerAction(authority.role)
                        }}
                      >
                        <div className="authority-avatar">{getInitials(authority.name)}</div>
                        <div className="authority-role">{authority.role}</div>
                        <div className="authority-body">
                          <h3>{authority.name}</h3>
                          <p>{authority.designation}</p>
                          <p>{authority.school}</p>
                          <p>Phone: {authority.phone}</p>
                        </div>
                        <span className="blue-button">Book Appointment</span>
                      </button>
                    ))}
                  </div>
                  {selectedAuthority ? (
                    <article className="panel action-panel">
                      <div className="panel-title">Selected Authority</div>
                      <h3>{selectedAuthority.name}</h3>
                      <p>{selectedAuthority.role}</p>
                      <p>{selectedAuthority.designation}</p>
                      <p>{selectedAuthority.school}</p>
                      <button
                        type="button"
                        className="blue-button"
                        onClick={() => triggerAction(`Contact ${selectedAuthority.name}`)}
                      >
                        Contact Now
                      </button>
                    </article>
                  ) : null}
                </section>
              )}
            </main>
          </div>
        </section>
      )}

      <div className="action-toast">{actionMessage}</div>

      {activeModal ? (
        <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            <div className="modal-head">
              <div>
                <h3>
                  {activeModal.type === 'profile'
                    ? 'User Profile'
                    : `${activeModal.courseCode} ${activeModal.type[0].toUpperCase()}${activeModal.type.slice(1)}`}
                </h3>
                {activeModal.course ? (
                  <p>{activeModal.course.title}</p>
                ) : (
                  <p>{profile.program}</p>
                )}
              </div>
              <button type="button" className="modal-close" onClick={() => setActiveModal(null)}>
                Close
              </button>
            </div>

            {activeModal.type === 'profile' ? (
              <div className="profile-modal-grid">
                <div className="profile-modal-hero">
                  <div className="profile-modal-avatar">{getInitials(profile.name || 'UM')}</div>
                  <div>
                    <strong>{profile.name}</strong>
                    <p>{profile.details}</p>
                    <p>{profile.program}</p>
                  </div>
                </div>
                <div className="profile-detail-list">
                  <div><span>School</span><strong>{profile.profileDetails?.school}</strong></div>
                  <div><span>Batch</span><strong>{profile.profileDetails?.batch}</strong></div>
                  <div><span>Roll No</span><strong>{profile.profileDetails?.rollNo}</strong></div>
                  <div><span>Section</span><strong>{profile.profileDetails?.section}</strong></div>
                  <div><span>Group</span><strong>{profile.profileDetails?.group}</strong></div>
                  <div><span>Email</span><strong>{profile.profileDetails?.email}</strong></div>
                  <div><span>Hostel</span><strong>{profile.profileDetails?.hostel}</strong></div>
                </div>
              </div>
            ) : null}

            {activeModal.type === 'quicklink' && activeModal.quickLink.type === 'hostel-booking' ? (
              <div className="hostel-booking-screen">
                <div className="hostel-topbar">
                  <div className="hostel-logo">LPU</div>
                  <div className="hostel-title-block">
                    <h2>Residential Booking</h2>
                    <p>{activeModal.quickLink.session}</p>
                  </div>
                  <div className="hostel-top-links">Booking Process Demo | Watch Residential Facilities</div>
                </div>
                <div className="hostel-tabs">
                  <span className="active">Individual Booking</span>
                  <span>Group Booking</span>
                  <span>Wait List (Hostel Already Booked)</span>
                  <span>Wait List (Hostel Not Booked)</span>
                </div>
                <div className="hostel-section">
                  <h3>Select Room Type</h3>
                  <div className="hostel-option-grid">
                    {activeModal.quickLink.roomTypes.map((item) => (
                      <div key={item} className="hostel-option-card">
                        <strong>{item.split(' (')[0]}</strong>
                        <span>{item.includes('(') ? `(${item.split('(')[1]}` : ''}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="hostel-section">
                  <h3>Meal Options</h3>
                  <div className="hostel-option-grid meal">
                    {activeModal.quickLink.mealOptions.map((item) => {
                      const parts = item.split(' | ')
                      return (
                        <div key={item} className="hostel-option-card">
                          <strong>{parts[0]}</strong>
                          <span>{parts[1] ?? ''}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            ) : null}

            {activeModal.type === 'quicklink' && activeModal.quickLink.type === 'rms-screen' ? (
              <div className="rms-screen">
                <div className="rms-header">
                  <div className="rms-logo">LPU</div>
                  <h2>Relationship Management System <span>(RMS)</span></h2>
                  <div className="rms-home-link">UMS Home</div>
                </div>
                <div className="rms-tabs">
                  <button type="button" className="active">Log Request</button>
                  <button type="button">RMS History</button>
                </div>
                <div className="rms-body">
                  {activeModal.quickLink.statements.map((item) => (
                    <div key={item} className="rms-line">
                      <span className="rms-check">?</span>
                      <p>{item}</p>
                    </div>
                  ))}
                  <button type="button" className="rms-proceed">Agree & Proceed</button>
                </div>
              </div>
            ) : null}

            {activeModal.type === 'quicklink' && activeModal.quickLink.type !== 'hostel-booking' && activeModal.quickLink.type !== 'rms-screen' ? (
              <div className="quicklink-sheet">
                <div className="quicklink-title">{activeModal.quickLink.title}</div>
                {activeModal.quickLink.type === 'list' ? (
                  <ul className="quicklink-list">
                    {activeModal.quickLink.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {activeModal.quickLink.type === 'table' ? (
                  <div className="quicklink-table-wrap">
                    <table className="quicklink-table">
                      <thead>
                        <tr>
                          {activeModal.quickLink.columns.map((column) => (
                            <th key={column}>{column}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {activeModal.quickLink.rows.map((row) => (
                          <tr key={row.join('-')}>
                            {row.map((cell) => (
                              <td key={cell}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
              </div>
            ) : null}

            {activeModal.type === 'assignment-upload' ? (
              <div className="assignment-upload-screen">
                <div className="upload-top-note">Last date for Registration for the Next Term is 31st May, 2026. CLICK HERE to clear your dues and complete the registration</div>
                <div className="upload-header">
                  <div className="upload-logo">UMS</div>
                  <div className="upload-nav">
                    <span>UMS Navigation</span>
                    <span>Important Links</span>
                    <span>Change Password</span>
                  </div>
                  <div className="upload-actions">DASHBOARD HOME LOGOUT</div>
                </div>
                <div className="upload-title">Student Assignment Upload</div>
                <div className="upload-form-grid">
                  <div className="upload-row">
                    <label>Course Name:</label>
                    <select defaultValue={activeModal.assignment?.course === 'CSB206' ? 'CSB206::ALGORITHMS AND DATA STRUCTURES II' : dashboardData.assignmentUpload.courses[0]}>
                      {dashboardData.assignmentUpload.courses.map((course) => (
                        <option key={course} value={course}>{course}</option>
                      ))}
                    </select>
                  </div>
                  <div className="upload-row">
                    <label>Teacher Name:</label>
                    <select defaultValue={dashboardData.assignmentUpload.teachers[0]}>
                      {dashboardData.assignmentUpload.teachers.map((teacher) => (
                        <option key={teacher} value={teacher}>{teacher}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="upload-notice">{dashboardData.assignmentUpload.notice}</div>
              </div>
            ) : null}

            {activeModal.type === 'topmenu-detail' ? (
              <div className="quicklink-sheet">
                <div className="quicklink-title">{activeModal.title}</div>
                {activeModal.detailType === 'list' ? (
                  <ul className="quicklink-list">
                    {activeModal.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {activeModal.detailType === 'table' ? (
                  <div className="quicklink-table-wrap">
                    <table className="quicklink-table">
                      <thead>
                        <tr>
                          {activeModal.columns.map((column) => (
                            <th key={column}>{column}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {activeModal.rows.map((row) => (
                          <tr key={row.join('-')}>
                            {row.map((cell) => (
                              <td key={cell}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
              </div>
            ) : null}

            {activeModal.type === 'messages' ? (
              <div className="messages-sheet">
                <div className="quicklink-title">{dashboardData.messageCenter.title}</div>
                <div className="message-center-list">
                  {dashboardData.messageCenter.items.map((item) => (
                    <article key={`${item.subject}-${item.meta}`} className="message-center-item">
                      <h4>{item.subject} ({item.meta})</h4>
                      <p>{item.body}</p>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}

            {activeModal.type === 'assignments' ? (
              <div className="assignments-sheet">
                <div className="assignment-header">Student Download Assignment</div>
                <div className="quicklink-table-wrap">
                  <table className="quicklink-table assignment-table">
                    <thead>
                      <tr>
                        <th>View</th>
                        <th>Course Code</th>
                        <th>Course Name</th>
                        {dashboardData.assignmentMatrix.columns.map((column) => (
                          <th key={column}>{column}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.assignmentMatrix.rows.map((row) => (
                        <tr key={row.code}>
                          <td>
                            <button type="button" className="mini-blue-button">
                              View Details
                            </button>
                          </td>
                          <td>{row.code}</td>
                          <td>{row.name}</td>
                          {row.values.map((value, index) => (
                            <td key={`${row.code}-${index}`}>{value}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}

            {activeModal.type === 'fee' ? (
              <div className="quicklink-sheet">
                <div className="quicklink-title">
                  {activeModal.mode === 'pay'
                    ? 'Pay Online'
                    : activeModal.mode === 'notification'
                      ? 'Fee Notification'
                      : 'Transactions'}
                </div>
                {activeModal.mode === 'pay' ? (
                  <div className="fee-modal-block">
                    <p>Total pending fee amount</p>
                    <strong>{dashboardData.feeCenter.total}</strong>
                    <ul className="quicklink-list">
                      <li>Payment mode: Net banking / UPI / Card</li>
                      <li>Registration will be cleared after successful payment</li>
                      <li>Receipt will appear in the fee dashboard</li>
                    </ul>
                  </div>
                ) : null}
                {activeModal.mode === 'notification' ? (
                  <ul className="quicklink-list">
                    {dashboardData.feeCenter.notifications.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {activeModal.mode === 'transactions' ? (
                  <div className="quicklink-table-wrap">
                    <table className="quicklink-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Description</th>
                          <th>Amount</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dashboardData.feeCenter.transactions.map((row) => (
                          <tr key={row.join('-')}>
                            {row.map((cell) => (
                              <td key={cell}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
              </div>
            ) : null}

            {activeModal.type === 'syllabus' && activeCourseDetail ? (
              <div className="syllabus-sheet">
                <div className="sheet-title">Print Instruction Plan</div>
                <h2>Lovely Professional University, Punjab</h2>
                <table className="syllabus-table">
                  <tbody>
                    <tr>
                      <th>Course Code</th>
                      <th>Course Title</th>
                      <th>Lectures</th>
                      <th>Tutorials</th>
                      <th>Practicals</th>
                      <th>Credits</th>
                    </tr>
                    <tr>
                      <td>{activeModal.course.code}</td>
                      <td>{activeModal.course.title.toUpperCase()}</td>
                      <td>{activeCourseDetail.plan.lectures}</td>
                      <td>{activeCourseDetail.plan.tutorials}</td>
                      <td>{activeCourseDetail.plan.practicals}</td>
                      <td>{activeCourseDetail.plan.credits}</td>
                    </tr>
                    <tr>
                      <td colSpan="6">
                        <strong>Course Weightage</strong> {activeCourseDetail.plan.weightage}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="sheet-section">
                  <strong>Course Outcomes:</strong> Through this course students should be able to
                </div>
                <ol className="sheet-list">
                  {activeCourseDetail.syllabus.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </div>
            ) : null}

            {activeModal.type === 'outcomes' && activeCourseDetail ? (
              <div className="outcome-sheet">
                <h2>Course Outcome ({activeModal.courseCode})</h2>
                <ol className="sheet-list spaced">
                  {activeCourseDetail.outcomes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
                <button type="button" className="orange-action" onClick={() => setActiveModal(null)}>
                  OK
                </button>
              </div>
            ) : null}

            {activeModal.type === 'timetable' ? (
              <div className="timetable-sheet">
                <div className="timetable-banner">Timetable</div>
                <div className="timetable-grid">
                  {dashboardData.timetable.map((day) => (
                    <div key={day.day} className="timetable-column">
                      <div className="timetable-day">{day.day}</div>
                      {day.slots.length ? (
                        day.slots.map((slot) => (
                          <div
                            key={`${day.day}-${slot.time}-${slot.course}`}
                            className={`time-slot ${slot.highlight ?? ''} ${slot.course === activeModal.courseCode ? 'selected-course' : ''}`}
                          >
                            <strong>{slot.time}</strong>
                            <span>{slot.room} - {slot.type} - {slot.course}</span>
                            <small>324BX</small>
                          </div>
                        ))
                      ) : (
                        <div className="time-slot empty">No class</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className={`chatbot ${chatOpen ? 'open' : ''}`}>
        {!chatOpen ? (
          <button type="button" className="chatbot-toggle" onClick={() => setChatOpen((current) => !current)}>
            Open Assistant
          </button>
        ) : null}

        {chatOpen ? (
          <div className="chatbot-window">
            <div className="chatbot-head">
              <div>
                <strong>Campus Assistant</strong>
                <span>Backend-powered chatbot panel</span>
              </div>
              <button type="button" className="chatbot-close" onClick={() => setChatOpen(false)}>
                Close
              </button>
            </div>

            <div className="chatbot-provider-bar">
              <label>
                Model
                <select value={selectedChatProvider} onChange={(event) => setSelectedChatProvider(event.target.value)}>
                  {chatProviders.map((provider) => (
                    <option key={provider.id} value={provider.id}>
                      {provider.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="chatbot-body" ref={chatBodyRef}>
              {chatMessages.map((message) => (
                <div key={message.id} className={`chat-message ${message.sender}`}>
                  {message.text}
                </div>
              ))}
              {chatLoading ? <div className="chat-message bot">Thinking...</div> : null}
            </div>

            <div className="chatbot-faq-panel">
              <button type="button" className="faq-toggle" onClick={() => setFaqOpen((current) => !current)}>
                {faqOpen ? 'Hide FAQs' : 'Show FAQs'}
              </button>
              {faqOpen ? (
                <div className="suggestion-row">
                  {chatSuggestions.map((suggestion) => (
                    <button type="button" key={suggestion} className="suggestion-chip" onClick={() => handleChatSend(suggestion)}>
                      {suggestion}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <form
              className="chatbot-form"
              onSubmit={(event) => {
                event.preventDefault()
                handleChatSend(chatInput)
              }}
            >
              <input
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                placeholder="Type a chatbot instruction"
              />
              <button type="submit" className="blue-button" disabled={chatLoading}>
                Send
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default App
