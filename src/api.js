const API_BASE = 'http://localhost:3001/api'

const localPortalData = {
  users: [
    {
      userId: '12405703',
      password: 'password123',
      roles: ['Student', 'HeadOffice'],
      name: 'Parvathaneni Sai Karthik',
      details: 'VID: 12405703 | Section: 324BX',
      program: 'B.Tech. (CSE-Generative AI) [Gen AI] (P132-NNS)',
      profileDetails: {
        school: 'School of Computing and Artificial Intelligence',
        batch: '2023 - 2027',
        rollNo: 'R324BXB53',
        section: '324BX',
        group: '2',
        email: '12405703@lpu.in',
        hostel: 'BH-4 | Room 217',
      },
    },
  ],
  quickLinks: [
    { label: 'Hostel Booking', tone: 'accent' },
    { label: 'Apply for Edu-Revolution', tone: 'accent' },
    { label: 'RMS', tone: 'primary' },
    { label: 'Fee Dashboard', tone: 'primary' },
    { label: 'Issued Books', tone: 'accent' },
    { label: 'Academic Calendar', tone: 'primary' },
    { label: 'Emergency Numbers', tone: 'primary' },
    { label: 'Certificate Request', tone: 'primary' },
    { label: 'Part-time job', tone: 'primary' },
    { label: 'Security Brochure', tone: 'primary' },
    { label: 'Date Sheet', tone: 'primary', badge: '9' },
  ],
  quickLinkDetails: {
    'Hostel Booking': { title: 'Residential Booking', type: 'hostel-booking', session: 'Session 2026-2027', roomTypes: ['Studio Apartment Air Conditioned (Attached Washroom)', 'Standard Air Conditioned (Attached Washroom)', 'Standard Air Cooled (Attached Washroom)'], mealOptions: ['Alacarte - Choice of Dishes | INR : 56000.00', 'Standard Mess Four Meals | INR : 48000.00', 'Standard Mess Three Meals | INR : 44000.00', 'Standard Mess Two Meals (Breakfast & Dinner) | INR : 40000.00', 'Standard Mess Two Meals (Lunch & Dinner) | INR : 40000.00', 'Standard Mess Two Meals (Breakfast & Lunch) | INR : 40000.00'] },
    'Apply for Edu-Revolution': { title: 'Edu-Revolution Application', type: 'list', items: ['Scholarship status: Eligible for merit review', 'Referral form is available in Student Services', 'Document upload required: Aadhaar, 10th marksheet, 12th marksheet', 'Last application review date: 19-04-2026'] },
    RMS: { title: 'Relationship Management System (RMS)', type: 'rms-screen', statements: ['I have not shared my UMS password with anyone.', 'I am responsible for the content typed in query.', 'I understand that necessary disciplinary action can be initiated against me in case of use of derogatory words or false statements against any Student/Faculty/Staff/Higher Authority.', 'The information given by me regarding the complaint/request is true to the best of my knowledge and if found false/wrong, necessary disciplinary action can be initiated against me.', 'I have read the policy / UMS Notification related to the concerned matter already before submitting the RMS and I am unable to find the answer related to my query.'] },
    'Fee Dashboard': { title: 'Fee Dashboard', type: 'table', columns: ['Head', 'Amount', 'Status'], rows: [['Tuition Fee', '180000', 'Pending'], ['Examination Fee', '12000', 'Pending'], ['Library Fee', '6400', 'Paid'], ['Transport/Other', '20000', 'Optional']] },
    'Issued Books': { title: 'Issued Books', type: 'table', columns: ['Book', 'Issued On', 'Due Date'], rows: [['Introduction to Algorithms', '04-04-2026', '24-04-2026'], ['Computer Networks', '07-04-2026', '27-04-2026'], ['Software Engineering Practitioner Notes', '09-04-2026', '29-04-2026']] },
    'Academic Calendar': { title: 'Academic Calendar', type: 'list', items: ['Mid-term examinations begin: 05-05-2026', 'Recoup window opens: 18-05-2026', 'Project demonstrations: 01-06-2026', 'End-term examinations begin: 15-06-2026'] },
    'Emergency Numbers': { title: 'Emergency Numbers', type: 'table', columns: ['Department', 'Contact'], rows: [['Campus Security', '+91 1824 517000'], ['Medical Emergency', '+91 1824 517911'], ['Hostel Warden', '+91 1824 518210'], ['Transport Helpdesk', '+91 1824 519144']] },
    'Certificate Request': { title: 'Certificate Request', type: 'list', items: ['Bonafide certificate: Ready for download', 'Fee receipt certificate: Available in fee dashboard', 'Character certificate: Request can be raised after advisor approval'] },
    'Part-time job': { title: 'Part-time Jobs', type: 'table', columns: ['Role', 'Hours', 'Status'], rows: [['Library Assistant', '10 hrs/week', 'Open'], ['Lab Support Intern', '8 hrs/week', 'Applied'], ['Content Volunteer', 'Flexible', 'Open']] },
    'Security Brochure': { title: 'Security Brochure', type: 'list', items: ['Always carry university ID while entering academic blocks.', 'Report suspicious activity to the security desk immediately.', 'Women safety helpline is active 24x7 from hostel and campus gates.', 'Vehicle stickers must be renewed before month end.'] },
    'Date Sheet': { title: 'Date Sheet', type: 'table', columns: ['Course', 'Date', 'Slot'], rows: [['CSB206', '05-05-2026', '09:00 - 12:00'], ['CSB207', '08-05-2026', '09:00 - 12:00'], ['CSB210', '11-05-2026', '13:00 - 16:00'], ['CSE239', '14-05-2026', '09:00 - 12:00']] },
  },
  feeCenter: {
    total: '218400/-',
    notifications: ['Fee due for next term 2627-1 is active.', 'Last date for registration is 31-05-2026.', 'Late fee charges apply after the due date.'],
    transactions: [['08-01-2026', 'Tuition Fee Installment', '120000', 'Success'], ['17-02-2026', 'Library Fee', '6400', 'Success'], ['04-03-2026', 'Exam Registration', '12000', 'Success']],
  },
  heroSlides: [
    {
      title: "LPU's Final-Year students getting Highest Package",
      subtitle: '1700+ students selected at packages of 10 Lakh to 2.5 Crore',
      cta: 'Education Revolution Starts at LPU',
    },
    {
      title: 'Admissions are open for 2026 intake',
      subtitle: 'Apply early to unlock scholarship review and hostel preference',
      cta: 'Apply Today',
    },
    {
      title: 'Campus events and placements in one dashboard',
      subtitle: 'Track classes, assignments, drives, notices and essential updates',
      cta: 'Explore Services',
    },
  ],
  happeningItems: [
    "Court Competition 2026, Featuring India's Emerging Legal Talent",
    'LPU Welcomed Global Alumni Community Back Home at Alumni Homecoming 2026',
    'ONE WORLD 2026 Grand Results Announcement and Celebration of Global Unity at LPU',
    'MP Rajya Sabha Dr. Abhishek Manu interaction announced for this week',
  ],
  messageItems: [
    {
      title: 'Recoup CA',
      meta: 'By Sakshi | Apr 12, 2026',
      body: 'A new recoup CA is available in your account. Review details and respond before the due date.',
    },
    {
      title: 'Fee Due for Next Term 2627 - 1',
      meta: 'By Dr. Sourabh Kumar | Apr 09, 2026',
      body: 'The academic fee for your next term is due soon. Please complete payment on time to avoid late charges.',
    },
  ],
  messageCenter: {
    title: 'My Messages',
    items: [
      { subject: 'Lakhanpal', meta: 'Apr 16, 2026', body: 'Your Duty Leave for event Cognitia NEW on 03/27/2026 has been approved, and the same has been updated on your UMS.' },
      { subject: 'Extension in registration deadline for Recoup CA - By Dr. Mohit Prakram', meta: 'Apr 16, 2026', body: 'Assessment (CA) chance for 25262 term has been extended up to 20th April 2026 5PM. Register only once through the mentioned link.' },
      { subject: 'Regarding compulsory submission of Exam Feedback - By Navdeep Singh', meta: 'Apr 16, 2026', body: 'You are required to provide compulsory exam feedback for course MTH182 dated 15-04-2026 at the earliest via UMS.' },
      { subject: 'BYOD-Practical - By Dr. Ravishanker', meta: 'Apr 03, 2026', body: 'A new BYOD-Practical is available in your account.' },
      { subject: 'NPTEL/SWAYAM exam schedule clashes - By Sanchit Singla', meta: 'Mar 13, 2026', body: 'Students whose NPTEL/SWAYAM exam schedule clashes with LPU academic activities may apply for duty leave.' },
    ],
  },
  courseCards: [
    { code: 'CSB206', title: 'Algorithms and Data Structures II', term: '25262', attendance: 91, info: 'Roll No: R324BXB53 / Group 2', exam: 'Exam Pattern : X6: MTE: Not Applicable: ETE: Practical Course' },
    { code: 'CSB207', title: 'Cloud Security', term: '25262', attendance: 88, info: 'Roll No: R324BXB53 / Group 2', exam: 'Exam Pattern : X3: MTE: Not Applicable: ETE: 50% MCQ - 50% Theory' },
    { code: 'CSB209', title: 'Cloud Security Lab', term: '25262', attendance: 90, info: 'Roll No: R324BXB53 / Group 2', exam: 'Exam Pattern : 66: MTE: Practical' },
    { code: 'CSB210', title: 'Azure AI Engineer Associate', term: '25262', attendance: 87, info: 'Class Today at : 10:10-11:00 AM | Room: 28-501A', exam: 'Exam Pattern : NN1: MTE: Not Applicable, ETE: Not Applicable, Certification based, Objective Type' },
    { code: 'CSB211', title: 'Full Stack Development', term: '25262', attendance: 100, info: 'Class Today at : 01:30-02:20 PM | Room: 27-501, 11:50-12:40 PM | Room: 28-501A', exam: 'Exam Pattern : X6: MTE: Not Applicable: ETE: Practical Course' },
    { code: 'CSE238', title: 'Computer Networks', term: '25262', attendance: 87, info: 'Roll No: R324BXB53 / Group 2', exam: 'Exam Pattern : 11: MTE: 100% MCQ - 0% Theory: ETE: 100% MCQ - 0% Theory' },
    { code: 'CSE239', title: 'Software Engineering', term: '25262', attendance: 94, info: 'Roll No: R324BXB53 / Group 2', exam: 'Exam Pattern : 11: MTE: 100% MCQ - 0% Theory: ETE: 100% MCQ - 0% Theory' },
  ],
  courseDetails: {
    CSB206: { plan: { lectures: 4, tutorials: 0, practicals: 2, credits: 5, weightage: 'ATT: 5   CA: 35   MTP: 20   ETP: 40' }, syllabus: ['Analyze algorithm efficiency using asymptotic notations, recurrence relations, and problem-solving techniques.', 'Design recursive and backtracking-based solutions for computational problems.', 'Apply greedy techniques to solve optimization problems.', 'Design and analyze dynamic programming solutions.', 'Solve graph problems using appropriate algorithmic strategies.', 'Analyze computational complexity and design efficient string algorithms.'], outcomes: ['Analyze Algorithm Efficiency Using Asymptotic Notations, Recurrence Relations, And Problem-Solving Techniques.', 'Design Recursive And Backtracking-Based Solutions For Computational Problems.', 'Apply Greedy Techniques To Solve Optimization Problems.', 'Design And Analyze Dynamic Programming Solutions.', 'Solve Graph Problems Using Appropriate Algorithmic Strategies.', 'Analyze Computational Complexity And Design Efficient String Algorithms.'] },
    CSB207: { plan: { lectures: 3, tutorials: 0, practicals: 0, credits: 3, weightage: 'ATT: 5   CA: 25   MTE: 30   ETE: 40' }, syllabus: ['Cloud security fundamentals and service deployment models.', 'Identity and access management in distributed cloud systems.', 'Data protection, key management, and secure storage patterns.', 'Network segmentation, monitoring, and incident response basics.'], outcomes: ['Understand cloud attack surfaces and shared-responsibility models.', 'Choose appropriate authentication and authorization controls.', 'Evaluate secure storage and encrypted communication workflows.', 'Recommend defensive controls for cloud-native applications.'] },
    CSB209: { plan: { lectures: 0, tutorials: 0, practicals: 2, credits: 1, weightage: 'ATT: 5   CA: 35   PRACTICAL: 60' }, syllabus: ['Hands-on IAM policy configuration and tenant isolation.', 'Log analysis, vulnerability checks, and compliance tasks.', 'Secure deployment exercises in public cloud environments.'], outcomes: ['Configure security controls in a cloud lab environment.', 'Perform practical monitoring and access-governance tasks.', 'Demonstrate secure deployment and validation workflows.'] },
    CSB210: { plan: { lectures: 2, tutorials: 0, practicals: 2, credits: 3, weightage: 'ATT: 5   CA: 35   CERTIFICATION: 60' }, syllabus: ['Azure AI service portfolio and responsible AI basics.', 'Computer vision, NLP, speech, and document intelligence workflows.', 'Prompting, orchestration, and solution integration patterns.', 'Certification-aligned case studies and implementation practice.'], outcomes: ['Identify the right Azure AI service for a given problem.', 'Implement AI workflows using managed cloud services.', 'Evaluate responsible AI and deployment tradeoffs.', 'Prepare for role-based Azure AI certification tasks.'] },
    CSB211: { plan: { lectures: 3, tutorials: 0, practicals: 2, credits: 4, weightage: 'ATT: 5   CA: 35   MTP: 20   ETP: 40' }, syllabus: ['Frontend development with component-based architecture.', 'Backend APIs, routing, and authentication basics.', 'Database integration and deployment workflows.', 'Project-based full stack application implementation.'], outcomes: ['Build responsive frontend experiences with reusable components.', 'Create backend services and connect them to databases.', 'Integrate frontend and backend flows into a complete application.', 'Deploy and maintain a project-ready full stack solution.'] },
    CSE238: { plan: { lectures: 3, tutorials: 0, practicals: 0, credits: 3, weightage: 'ATT: 5   CA: 25   MTE: 30   ETE: 40' }, syllabus: ['OSI and TCP/IP architecture overview.', 'Routing, switching, subnetting, and addressing.', 'Transport protocols, congestion control, and reliability.', 'Wireless networking and network security basics.'], outcomes: ['Explain layered communication and packet delivery processes.', 'Apply addressing and routing techniques to network problems.', 'Differentiate core transport and application protocol behavior.', 'Evaluate practical networking constraints and security risks.'] },
    CSE239: { plan: { lectures: 3, tutorials: 0, practicals: 0, credits: 3, weightage: 'ATT: 5   CA: 25   MTE: 30   ETE: 40' }, syllabus: ['Software process models and requirement engineering.', 'Design modeling, architecture, and development lifecycle planning.', 'Testing, maintenance, quality assurance, and project control.', 'Agile practices and software team collaboration patterns.'], outcomes: ['Select suitable lifecycle models for different project contexts.', 'Document software requirements and design artifacts effectively.', 'Plan testing and quality-assurance workflows.', 'Apply team-based project management and delivery practices.'] },
  },
  timetable: [
    { day: 'Monday', slots: [{ time: '09:20 - 10:10', room: '28-406', type: 'L', course: 'CSB210' }, { time: '10:10 - 11:00', room: '28-406', type: 'L', course: 'CSB207' }, { time: '11:00 - 11:50', room: '28-406', type: 'L', course: 'CSB211' }, { time: '11:50 - 12:40', room: '28-406', type: 'L', course: 'CSB210' }, { time: '13:30 - 14:20', room: '27-407A', type: 'L', course: 'CSB208' }, { time: '14:20 - 15:10', room: '37-605', type: 'P', course: 'CSB206' }] },
    { day: 'Tuesday', slots: [{ time: '10:10 - 11:00', room: '28-501A', type: 'L', course: 'CSB210', highlight: 'soft' }, { time: '11:00 - 11:50', room: '28-501A', type: 'L', course: 'CSB207', highlight: 'soft' }, { time: '11:50 - 12:40', room: '28-501A', type: 'L', course: 'CSB211', highlight: 'green' }, { time: '13:30 - 14:20', room: '27-501', type: 'L', course: 'CSB211', highlight: 'gold' }, { time: '14:20 - 15:10', room: '37-805', type: 'P', course: 'CSE238', highlight: 'soft' }] },
    { day: 'Wednesday', slots: [{ time: '09:20 - 10:10', room: '37-605', type: 'P', course: 'CSB211' }, { time: '10:10 - 11:00', room: '37-605', type: 'P', course: 'CSB211' }, { time: '11:00 - 11:50', room: '28-501A', type: 'L', course: 'CSE239' }, { time: '11:50 - 12:40', room: '28-501A', type: 'L', course: 'CSE238' }, { time: '13:30 - 14:20', room: '27-302', type: 'L', course: 'CSE238' }, { time: '14:20 - 15:10', room: '37-805', type: 'P', course: 'CSB209' }] },
    { day: 'Thursday', slots: [{ time: '09:20 - 10:10', room: '37-805', type: 'P', course: 'CSB210' }, { time: '10:10 - 11:00', room: '37-805', type: 'P', course: 'CSB210' }, { time: '11:00 - 11:50', room: '28-302', type: 'L', course: 'CSE239' }, { time: '11:50 - 12:40', room: '28-302', type: 'L', course: 'CSE238' }, { time: '13:30 - 14:20', room: '28-407A', type: 'L', course: 'CSB208' }, { time: '14:20 - 15:10', room: '28-407A', type: 'L', course: 'CSB206' }] },
    { day: 'Friday', slots: [{ time: '09:20 - 10:10', room: '37-805', type: 'P', course: 'CSB207' }, { time: '10:10 - 11:00', room: '37-805', type: 'P', course: 'CSB207' }, { time: '11:00 - 11:50', room: '28-302', type: 'L', course: 'CSE239' }, { time: '11:50 - 12:40', room: '28-302', type: 'L', course: 'CSB207' }, { time: '13:30 - 14:20', room: '28-408', type: 'L', course: 'CSB208' }, { time: '14:20 - 15:10', room: '28-408', type: 'L', course: 'CSB206' }] },
    { day: 'Saturday', slots: [] },
    { day: 'Sunday', slots: [] },
  ],
  assignments: [
    { course: 'CSB206', detail: 'Course : CSB206 | Project', due: '17-04-2026' },
    { course: 'CSB207', detail: 'Course : CSB207 | Test - Code based 4', due: '17-04-2026' },
    { course: 'CSE239', detail: 'Course : CSE239 | Recoup CA', due: '18-04-2026' },
  ],
  assignmentMatrix: {
    columns: ['Assignment - Case based', 'BYOD-Practical', 'Project', 'Recoup CA', 'Test', 'Test - Code based'],
    rows: [
      { code: 'CSB206', name: 'ALGORITHMS AND DATA STRUCTURES II', values: ['-', '-', '1', '-', '2', '2'] },
      { code: 'CSB207', name: 'OBJECT-ORIENTED PROGRAMMING', values: ['-', '-', '-', '-', '-', '4'] },
      { code: 'CSB208', name: 'CLOUD SECURITY', values: ['-', '-', '-', '-', '3', '-'] },
      { code: 'CSB209', name: 'CLOUD SECURITY LAB', values: ['-', '1', '-', '-', '-', '-'] },
      { code: 'CSB210', name: 'AZURE AI ENGINEER ASSOCIATE', values: ['-', '-', '-', '-', '3', '-'] },
      { code: 'CSB211', name: 'FULL STACK DEVELOPMENT', values: ['-', '-', '-', '-', '-', '2'] },
      { code: 'CSE238', name: 'COMPUTER NETWORKS', values: ['-', '1', '-', '-', '1', '-'] },
      { code: 'CSE239', name: 'SOFTWARE ENGINEERING', values: ['1', '-', '-', '1', '1', '-'] },
    ],
  },
  assignmentUpload: { title: 'Student Assignment Upload', courses: ['CSB201::CYBERSECURITY FUNDAMENTALS', 'CSB206::ALGORITHMS AND DATA STRUCTURES II', 'CSB207::OBJECT-ORIENTED PROGRAMMING', 'CSE239::SOFTWARE ENGINEERING'], teachers: ['Abhay nath', 'Dr. Mohit Arora', 'Dr. Arun Malik'], notice: 'Please Upload MsWord-2003(.doc),Ms-Excel(.xls),PresentationFile(.ppt) and .Pdf file only and do not use speical character like (#,!) etc in file name. Max Size 5.00 MB' },
  placementDrives: [
    { title: 'CAREER PLAN B - Batch 2026', stream: 'All Disciplines', package: 'Refer Below' },
    { title: 'RELTIO - Batch 2027', stream: 'CSE/IT', package: 'Stipend Rs.60000 PM During Internship Then CTC Rs.15 LPA to 17 LPA' },
    { title: 'VVDN TECHNOLOGIES - Batch 2026', stream: 'MBA', package: 'CTC Rs.8 LPA to 10 LPA' },
  ],
  authorities: [
    { role: 'Mentor', name: 'Tushar Kasana', designation: 'Assistant Professor', school: 'School of Computing and Artificial Intelligence', phone: '6395094420' },
    { role: 'Head of Department', name: 'Dr. Mohit Arora', designation: 'Associate Professor', school: 'School of Computing and Artificial Intelligence', phone: '8146713742' },
    { role: 'Head of School', name: 'Dr. Arun Malik', designation: 'Professor & Additional Dean', school: 'School of Computing and Artificial Intelligence', phone: '8968389565' },
    { role: 'Head of Faculty', name: 'Dr. Lovi Raj Gupta', designation: 'Pro Vice Chancellor', school: 'Office of Faculty of Technology and Sciences', phone: 'NA' },
  ],
  topMenuData: {
    Academics: [
      { title: 'Cohorts', items: ['Career Profiling', 'My Cohorts Progress', 'My Cohorts Status', 'Select Cohort'] },
      { title: 'Examination System', items: ['Academic Result', 'Application for Academic Certificate', 'Application for Certified Curriculum', 'Application for Degree Extension', 'Application for Guidance Classes Polling', 'Application for Letter of Recommendation', 'Application for MOOC Certification', 'Application for Refund'] },
      { title: 'Learning Management System (LMS)', items: ['Assignment Download', 'Assignment Upload', 'Community Development Form', 'CR Nomination', 'Credit Transfer', 'EDU-Revolution : BE THE CHANGE'] },
      { title: 'Library Management System', items: ['Discussion Room Booking', 'Dissertation/Thesis Submission', 'Extended Time Request', 'Library Dues', 'Library Issue History', 'Search Catalogue'] },
      { title: 'Placement Services', items: ['Career Services Registration', 'Exit From Career Services', 'Internship Recommendation Letter', 'OJT/Internship Attendance', 'Placement Portal', 'Placement Document Repository'] },
      { title: 'Research and Development', items: ['Apply for Duty Leave and PVR', 'International Research Program', 'Ph.D. Candidacy Letter', 'Pre-submission Registration', 'Registration of Upcoming Activity', 'Research Achievements Report'] },
    ],
    Administrative: [
      { title: 'Alumni Services', items: ['Alumni Membership Fee', 'Alumni Mentor Selection', 'Update Alumni Profile'] },
      { title: 'Fee and Scholarship System', items: ['Fee Dashboard', 'Apply and Download Fee related Certificates', 'Apply for Outer Agency Scholarship', 'Bank Loan Document Submission', 'Scholarship Award Request', 'Scholarship Policies'] },
      { title: 'My Profile', items: ['My Virtual ID Card', 'Profile Update'] },
      { title: 'Residential Services', items: ['Electricity Consumption View', 'Hostel Booking', 'Hostel Leave Application', 'Hostel Guidelines', 'Hostel Mail Acknowledgement', 'House Keeping Rating'] },
      { title: 'Special Services', items: ['Joy of Giving', 'Resident Details (For Day scholars)', 'Special Food Services', 'Student Hostel Special Leave Request', 'View Residential Reporting Slip'] },
      { title: 'Security and Safety', items: ['Case Details', 'RFID Application Form', 'Sponsored Parent Pass Request', 'Upload Case Statement'] },
    ],
    'Important Links': [
      { title: 'Capstone Dissertation Internships', items: ['External CA Format for Internship', 'Guidelines - Inviting External Examiners', 'Guidelines-Dissertation for Master Degree Programs', 'Guidelines-Project Courses including Capstone'] },
      { title: 'Change Password', items: ['Change UMS Password', 'Reset Internet Password'] },
      { title: 'Miscellaneous Links', items: ['Animal House Facility (AHF)', 'Apply Duplicate ID/ Transport Card', 'Appointment System', 'Emergency Contact Numbers', 'Interaction Timings with Higher Authorities', 'View Induction/ University Map'] },
      { title: 'Policies, Rules, Guidelines and Formats', items: ['Academic Honour To Regular Students', 'Attendance Marking Policy in case of late registration', 'Download Formats', 'Dress Code and Uniform Policy', 'Library Policy', 'Semester/ Year Abroad Policy'] },
      { title: 'Support and Information', items: ['View list of Medical Staff at Uni Hospital', 'View Lost and Found Items', 'View My Messages'] },
    ],
    'Student Services': [
      { title: 'Feedback and Surveys', items: ['Alumni Feedback on program PO/PSO', 'Feedback for Program Scheme and Courses', 'Feedback on course outcome', 'Grievances Description', 'Online Survey', 'Rate Mentor Meeting'] },
      { title: 'Health Services', items: ['Counseling Psychologist Appointment', 'Doctor Appointment'] },
      { title: 'Relationship Management System (RMS)', items: ['Log Request', 'View Request Status'] },
      { title: 'Student Welfare', items: ['Activity Registration', 'Admission Referral Form', 'Approved Skill Courses', 'Club Attendance View'] },
      { title: 'Registrations', items: ['Community Services Registration', 'Event Registration', 'Idea Management System', 'Interview Panel', 'Part-Time Job Registration', 'Participation and Achievements Dashboard'] },
      { title: 'Policies', items: ['Press Release Request', 'Request for Recruitment Drive', 'Student Event Registration', 'Transport Preference', 'Uniform Size Selection', 'Vendor Services Search'] },
    ],
    'Quick Links': [
      { title: 'Common Tools', items: ['Student Mail', 'Academic Calendar', 'Date Sheet', 'Fee Dashboard', 'Issued Books', 'Emergency Numbers'] },
      { title: 'Student Utilities', items: ['Profile Update', 'RMS', 'Hostel Booking', 'Certificate Request', 'Security Brochure'] },
    ],
  },
  announcementTabs: {
    Academic: {
      count: 48,
      title: 'Short Term Course on AI-Powered Pedagogy: Revolutionizing the Academic Landscape',
      body: [
        'Analyze and implement AI-driven tools to enhance teaching, learning, and student engagement in academic settings.',
        'Develop AI-powered content and assessment strategies to personalize learning experiences and optimize educational outcomes.',
        'Critically evaluate the ethical, pedagogical, and research implications of AI integration in academia.',
      ],
    },
    Administrative: {
      count: 4,
      title: 'Updated office timings and student support desk coordination',
      body: [
        'Administrative desks will operate on an optimized support window during examination week.',
        'Service requests submitted through the portal will be acknowledged within one working day.',
        'Students are encouraged to use the self-service dashboard before raising an offline request.',
      ],
    },
    'Co-curricular': {
      count: 12,
      title: 'Student clubs open registration for the new activity cycle',
      body: [
        'Music, sports, dramatics, design and coding clubs have reopened participation intake.',
        'Weekly schedules and mentor names are available inside the student services area.',
        'Interested students should complete membership before the club orientation deadline.',
      ],
    },
    Examination: {
      count: 2,
      title: 'Internal assessment policy reminder',
      body: [
        'Assessment rubrics and recoup policies have been refreshed for the current term.',
        'Course faculty may publish evaluation notes directly through the dashboard.',
        'Any discrepancy should be escalated through the academic support channel.',
      ],
    },
    Placement: {
      count: 20,
      title: 'Placement preparation support sessions announced',
      body: [
        'Resume review, aptitude prep and interview simulations are scheduled throughout the month.',
        'Eligible batches can book practice slots from the placement details section.',
        'Drive alerts and shortlists will continue to appear in the dashboard feed.',
      ],
    },
    Research: {
      count: 1,
      title: 'Interdisciplinary research proposal call',
      body: [
        'Faculty and students may collaborate on applied AI and systems research proposals.',
        'Selected teams will receive mentorship and documentation support for submission.',
        'The proposal format is available through the important links area.',
      ],
    },
  },
  chatbot: {
    suggestions: [
      'Show my pending assignments',
      'What fee actions are available?',
      'Open important announcements',
      'Show my fee due',
      'What books are issued to me?',
      'Show my profile details',
    ],
    qa: [
      {
        subject: 'General',
        questions: ['show my pending assignments', 'pending assignments'],
        answer: 'You currently have 3 pending assignment items across CSB206, CSB207, and CSE239.',
      },
      {
        subject: 'Fee',
        questions: ['what fee actions are available?', 'fee actions', 'pay fee'],
        answer: 'You can use Pay Online, Fee Notification, and Transactions from the Fee card on the dashboard.',
      },
      {
        subject: 'Announcements',
        questions: ['open important announcements', 'important announcements'],
        answer: 'Important announcements include Academic, Administrative, Co-curricular, Examination, Placement, and Research tabs.',
      },
    ],
  },
}

function getDashboardPayload(user) {
  return {
    profile: {
      name: user.name,
      details: user.details,
      program: user.program,
      profileDetails: user.profileDetails,
    },
    quickLinks: localPortalData.quickLinks,
    quickLinkDetails: localPortalData.quickLinkDetails,
    heroSlides: localPortalData.heroSlides,
    happeningItems: localPortalData.happeningItems,
    messageItems: localPortalData.messageItems,
    messageCenter: localPortalData.messageCenter,
    courseCards: localPortalData.courseCards,
    courseDetails: localPortalData.courseDetails,
    timetable: localPortalData.timetable,
    feeCenter: localPortalData.feeCenter,
    assignments: localPortalData.assignments,
    assignmentMatrix: localPortalData.assignmentMatrix,
    assignmentUpload: localPortalData.assignmentUpload,
    placementDrives: localPortalData.placementDrives,
    topMenuData: localPortalData.topMenuData,
    authorities: localPortalData.authorities,
    announcementTabs: localPortalData.announcementTabs,
    chatbot: {
      suggestions: localPortalData.chatbot.suggestions,
    },
  }
}


function localTopMenuDetail(label) {
  const lower = label.toLowerCase()

  if (lower.includes('result')) {
    return { ok: true, module: { type: 'topmenu-detail', title: label, detailType: 'table', columns: ['Course', 'Grade', 'Credits', 'Status'], rows: [['CSB206', 'A', '5', 'Declared'], ['CSB207', 'A-', '3', 'Declared'], ['CSE239', 'B+', '3', 'Declared']] } }
  }

  if (lower.includes('certificate') || lower.includes('letter')) {
    return { ok: true, module: { type: 'topmenu-detail', title: label, detailType: 'list', items: ['Request status: Ready for submission', 'Expected processing time: 2 working days', 'Required documents: University ID, fee clearance, latest term registration'] } }
  }

  if (lower.includes('registration') || lower.includes('application') || lower.includes('nomination')) {
    return { ok: true, module: { type: 'topmenu-detail', title: label, detailType: 'list', items: ['Current status: Open', 'Window closes on: 31-05-2026', 'Last submitted activity: Draft saved in portal'] } }
  }

  if (lower.includes('hostel') || lower.includes('residential')) {
    return { ok: true, module: { type: 'topmenu-detail', title: label, detailType: 'list', items: ['Current room: BH-4 | Room 217', 'Residential status: Active', 'Latest hostel request: Under review by residential services'] } }
  }

  if (lower.includes('fee') || lower.includes('scholarship') || lower.includes('loan')) {
    return { ok: true, module: { type: 'topmenu-detail', title: label, detailType: 'table', columns: ['Head', 'Value'], rows: [['Pending Fee', localPortalData.feeCenter.total], ['Scholarship Flag', 'Merit review eligible'], ['Last Transaction', localPortalData.feeCenter.transactions[0][1]]] } }
  }

  if (lower.includes('library') || lower.includes('book')) {
    return { ok: true, module: { type: 'topmenu-detail', title: label, detailType: 'list', items: ['Issued books: 3', 'Fine due: NIL', 'Next due date: 29-04-2026'] } }
  }

  if (lower.includes('placement') || lower.includes('career') || lower.includes('internship')) {
    return { ok: true, module: { type: 'topmenu-detail', title: label, detailType: 'list', items: ['Eligible drives this week: 3', 'Latest activity: Resume shortlisted for practice review', 'Placement support desk: Active'] } }
  }

  if (lower.includes('feedback') || lower.includes('survey') || lower.includes('grievance')) {
    return { ok: true, module: { type: 'topmenu-detail', title: label, detailType: 'list', items: ['Portal entry available for this service', 'One pending submission is visible in your account', 'Response window remains open for the current term'] } }
  }

  if (lower.includes('password') || lower.includes('security')) {
    return { ok: true, module: { type: 'topmenu-detail', title: label, detailType: 'list', items: ['Last password update: 03-04-2026', 'Recommended action: change password before 15-04-2026', 'MFA / identity verification can be enabled from profile settings'] } }
  }

  if (lower.includes('calendar') || lower.includes('date sheet') || lower.includes('schedule') || lower.includes('time table')) {
    return { ok: true, module: { type: 'topmenu-detail', title: label, detailType: 'table', columns: ['Item', 'Date', 'Status'], rows: [['Mid-term Activity', '05-05-2026', 'Scheduled'], ['Registration Window', '31-05-2026', 'Open'], ['Project Review', '01-06-2026', 'Upcoming']] } }
  }

  return { ok: true, module: { type: 'topmenu-detail', title: label, detailType: 'list', items: ['Sample backend data prepared for this menu option.', 'This item can be expanded into a full dedicated module next.', 'Current portal status: available for demonstration.'] } }
}

function localModule(body) {
  const { module, label, mode, courseCode } = body

  if (module === 'quicklink') {
    const detail = localPortalData.quickLinkDetails[label]
    if (!detail) throw new Error(`Quick link not found: ${label}`)
    return { ok: true, module: { type: 'quicklink', label, quickLink: detail } }
  }

  if (module === 'profile') {
    const user = localPortalData.users[0]
    return {
      ok: true,
      module: {
        type: 'profile',
        profile: {
          name: user.name,
          details: user.details,
          program: user.program,
          profileDetails: user.profileDetails,
        },
      },
    }
  }

  if (module === 'messages') {
    return { ok: true, module: { type: 'messages', messageCenter: localPortalData.messageCenter } }
  }

  if (module === 'assignments') {
    return { ok: true, module: { type: 'assignments', assignmentMatrix: localPortalData.assignmentMatrix } }
  }

  if (module === 'fee') {
    return { ok: true, module: { type: 'fee', mode: mode || 'pay', feeCenter: localPortalData.feeCenter } }
  }

  if (module === 'topmenu') {
    return localTopMenuDetail(label)
  }

  if (module === 'course') {
    const course = localPortalData.courseCards.find((item) => item.code === courseCode)
    const courseDetail = localPortalData.courseDetails[courseCode]
    if (!course || !courseDetail) throw new Error(`Course not found: ${courseCode}`)
    return {
      ok: true,
      module: {
        type: body.view || 'syllabus',
        courseCode,
        course,
        courseDetail,
        timetable: localPortalData.timetable,
      },
    }
  }

  throw new Error(`Module not found: ${module}`)
}

function localLogin(payload) {
  const user = localPortalData.users.find(
    (item) =>
      item.userId === payload.userId &&
      item.password === payload.password &&
      item.roles.includes(payload.role),
  )

  if (!user) {
    throw new Error('Invalid user ID, password, or role.')
  }

  return {
    ok: true,
    message: `Logged in successfully as ${payload.role}.`,
    dashboard: getDashboardPayload(user),
  }
}

function localAction(action) {
  const actionMap = {
    Dashboard: 'Opening the dashboard summary view.',
    'Fee Dashboard': 'Loading fee dashboard tools and notices.',
    Transactions: 'Showing transaction history for the current student.',
    'View Assignments': 'Opening all pending assignments with upload options.',
    Search: 'Search is ready to be connected to a global portal lookup.',
    'All Messages': 'Opening the full inbox and teacher communication feed.',
    'All Events': 'Showing the complete events directory.',
    'View All Announcements': 'Loading all announcement categories and details.',
  }

  return {
    ok: true,
    message: actionMap[action] ?? `${action} opened. Local backend fallback handled this request.`,
  }
}

function includesAny(text, patterns) {
  return patterns.some((pattern) => text.includes(pattern))
}

function getGeneralLocalAnswer(normalized) {
  if (includesAny(normalized, ['hi', 'hello', 'hey'])) {
    return 'Hello. I can help with your UMS dashboard, courses, fee, assignments, timetable, certificates, books, emergency contacts, and basic general questions.'
  }

  if (includesAny(normalized, ['what can you do', 'help', 'how can you help'])) {
    return 'I can answer portal questions like fee due, pending assignments, issued books, date sheet, timetable, course syllabus, profile details, certificates, announcements, and emergency numbers. If Gemini or Claude Sonnet API keys are configured, I can also answer broader general questions.'
  }

  if (includesAny(normalized, ['who are you', 'your name', 'what are you'])) {
    return 'I am the Campus Assistant chatbot for this UMS clone. I use portal data first, then external AI providers when they are configured.'
  }

  if (includesAny(normalized, ['what is ums', 'ums meaning', 'university management system'])) {
    return 'UMS means University Management System. It is a student portal for academics, attendance, timetable, fee details, assignments, messages, announcements, books, certificates, and other university services.'
  }

  if (includesAny(normalized, ['what is api', 'api meaning'])) {
    return 'An API is an Application Programming Interface. In this project, the frontend sends requests to backend API routes like login, chatbot, actions, fee, and assignments, and the backend returns data as JSON.'
  }

  if (includesAny(normalized, ['what is chatbot', 'chat bot'])) {
    return 'A chatbot is a program that accepts questions and returns useful answers. Here, it can answer from UMS portal data and can also use Gemini or Claude Sonnet when API keys are available.'
  }

  if (includesAny(normalized, ['thank', 'thanks'])) {
    return 'You are welcome. Ask me anything about your dashboard or university portal modules.'
  }

  return null
}

function localChatbot(message) {
  const normalized = message.trim().toLowerCase()
  const generalAnswer = getGeneralLocalAnswer(normalized)

  if (generalAnswer) {
    return { ok: true, subject: 'General', answer: generalAnswer }
  }

  if (includesAny(normalized, ['fee due', 'pending fee', 'fee status', 'my fee'])) {
    const [latestDate, latestDescription, latestAmount, latestStatus] =
      localPortalData.feeCenter.transactions[localPortalData.feeCenter.transactions.length - 1]

    return {
      ok: true,
      subject: 'Fee',
      answer: `Your pending fee total is ${localPortalData.feeCenter.total}. Latest recorded transaction: ${latestDescription} on ${latestDate} for ${latestAmount} with status ${latestStatus}.`,
    }
  }

  if (includesAny(normalized, ['issued book', 'books issued', 'library book', 'my books'])) {
    const books = localPortalData.quickLinkDetails['Issued Books'].rows
      .map(([title, issuedOn, dueDate]) => `${title} (issued ${issuedOn}, due ${dueDate})`)
      .join('; ')

    return { ok: true, subject: 'Library', answer: `Issued books are: ${books}.` }
  }

  if (includesAny(normalized, ['assignment', 'pending assignment', 'my assignment'])) {
    const items = localPortalData.assignments
      .map((item) => `${item.course} due on ${item.due}`)
      .join('; ')

    return {
      ok: true,
      subject: 'Assignments',
      answer: `You currently have ${localPortalData.assignments.length} highlighted assignment items: ${items}.`,
    }
  }

  if (includesAny(normalized, ['profile', 'my details', 'user details', 'student details'])) {
    const user = localPortalData.users[0]
    return {
      ok: true,
      subject: 'Profile',
      answer: `${user.name}, ${user.program}. Roll number ${user.profileDetails.rollNo}, section ${user.profileDetails.section}, group ${user.profileDetails.group}, hostel ${user.profileDetails.hostel}, email ${user.profileDetails.email}.`,
    }
  }

  if (includesAny(normalized, ['emergency', 'help number', 'contact number'])) {
    const contacts = localPortalData.quickLinkDetails['Emergency Numbers'].rows
      .map(([name, phone]) => `${name}: ${phone}`)
      .join('; ')

    return { ok: true, subject: 'Emergency', answer: `Emergency contacts are ${contacts}.` }
  }

  if (includesAny(normalized, ['certificate', 'bonafide', 'character certificate'])) {
    return {
      ok: true,
      subject: 'Certificates',
      answer: localPortalData.quickLinkDetails['Certificate Request'].items.join(' '),
    }
  }

  if (includesAny(normalized, ['date sheet', 'exam date', 'exam schedule'])) {
    const exams = localPortalData.quickLinkDetails['Date Sheet'].rows
      .map(([course, date, slot]) => `${course} on ${date} during ${slot}`)
      .join('; ')

    return { ok: true, subject: 'Examinations', answer: `Your visible date sheet entries are ${exams}.` }
  }

  const knownCourse = localPortalData.courseCards.find(
    (course) => normalized.includes(course.code.toLowerCase()) || normalized.includes(course.title.toLowerCase()),
  )

  if (knownCourse && includesAny(normalized, ['timetable', 'class time', 'schedule'])) {
    const slots = localPortalData.timetable
      .flatMap((day) =>
        day.slots
          .filter((slot) => slot.course === knownCourse.code)
          .map((slot) => `${day.day} ${slot.time} ${slot.course} in ${slot.room}`),
      )
      .slice(0, 8)
      .join('; ')

    return {
      ok: true,
      subject: 'Timetable',
      answer: `${knownCourse.code} ${knownCourse.title}. Relevant timetable slots: ${slots || 'not found yet'}.`,
    }
  }

  if (knownCourse && includesAny(normalized, ['syllabus', 'outcome', 'course outcome'])) {
    const details = localPortalData.courseDetails[knownCourse.code]
    return {
      ok: true,
      subject: 'Course',
      answer: details
        ? `${knownCourse.code} ${knownCourse.title}. Syllabus topics include ${details.syllabus.slice(0, 3).join('; ')}.`
        : 'Course details are not available yet.',
    }
  }

  const match = localPortalData.chatbot.qa.find((item) =>
    item.questions.some((question) => normalized.includes(question)),
  )

  return {
    ok: true,
    subject: match?.subject ?? 'General',
    answer:
      match?.answer ??
      'I can answer UMS portal questions like fee, assignments, timetable, profile, books, certificates, announcements, and emergency numbers. For broader general knowledge, select Gemini or Claude Sonnet after configuring the API key on the backend.',
  }
}

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    ...options,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Request failed.')
  }

  return data
}

async function withFallback(remoteCall, fallbackCall) {
  try {
    return await remoteCall()
  } catch (error) {
    if (error instanceof TypeError || /fetch|network|failed|not configured|not available|api key/i.test(String(error.message))) {
      return fallbackCall()
    }
    throw error
  }
}

export function login(payload) {
  return withFallback(
    () =>
      request('/login', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    () => Promise.resolve(localLogin(payload)),
  )
}

export function runAction(action) {
  return withFallback(
    () =>
      request('/action', {
        method: 'POST',
        body: JSON.stringify({ action }),
      }),
    () => Promise.resolve(localAction(action)),
  )
}

export function fetchModule(payload) {
  return withFallback(
    () =>
      request('/module', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    () => Promise.resolve(localModule(payload)),
  )
}

export function askChatbot(message, provider = 'local') {
  return withFallback(
    () =>
      request('/chatbot/ask', {
        method: 'POST',
        body: JSON.stringify({ message, provider }),
      }),
    () => Promise.resolve({ ...localChatbot(message), provider: 'local' }),
  )
}

export function getChatbotConfig() {
  return withFallback(
    () => request('/chatbot/config'),
    () =>
      Promise.resolve({
        ok: true,
        suggestions: localPortalData.chatbot.suggestions,
        providers: [
          { id: 'local', label: 'Portal AI' },
          { id: 'gemini', label: 'Gemini' },
          { id: 'sonnet', label: 'Claude Sonnet' },
        ],
      }),
  )
}
