// Mock user data for authentication
export const MOCK_USERS = {
  scad: {
    email: "scad@example.com",
    password: "scad123",
    name: "SCAD Admin",
    role: "scad",
    id: "scad_001"
  },
  faculty: {
    email: "faculty@example.com",
    password: "faculty123",
    name: "Faculty Member",
    role: "faculty",
    id: "faculty_001"
  },
  company: {
    email: "company@example.com",
    password: "company123",
    name: "Company Representative",
    role: "company",
    id: "company_001"
  },
  students: [
    {
      email: "student@example.com",
      password: "student123",
      name: "Student User",
      role: "student",
      accountType: "none",
      id: "student_001",
      major: "Computer Science",
      jobInterests: ["Software Engineer", "Backend Developer"],
      industries: ["Law", "Education"],
      recommendedCompanies: [3, 2],
      pastInterns: [
        { name: "Omar", companyId: 3, feedback: "Learned a lot about ML." }
      ]
    },
    {
      email: "hatem@trybytes.ai",
      password: "hatem123",
      name: "Hatem",
      role: "student",
      accountType: "PRO",
      id: "student_002",
      major: "Media Engineering & Technology",
      jobInterests: ["Frontend Developer", "UI/UX Designer"],
      industries: ["Technology", "Finance"],
      recommendedCompanies: [1, 4],
      pastInterns: [
        { name: "Omar", companyId: 1, feedback: "Great mentorship!" }
      ]
    },
    {
      email: "salmaaburahmah@gmail.com",
      password: "salma123",
      name: "Salma",
      role: "student",
      accountType: "PRO",
      id: "student_003",
      major: "Computer Science",
      jobInterests: ["UI/UX Designer", "Backend Developer"],
      industries: ["Technology", "Design"],
      recommendedCompanies: [3, 2],
      pastInterns: [
        { name: "Sara", companyId: 3, feedback: "Learned a lot about ML." }
      ]
    }
  ]
};

// Mock companies data for SCAD dashboard
export const MOCK_COMPANIES = [
  {
    id: "comp_001",
    name: "Tawabiry",
    alt: "Tawabiry",
    email: "contact-us@tawabiry.com",
    logo: "/logos/tawabiry.png",
    industry: "Software as a Service",
    size: "Small (1-50 employees)",
    documentation: [
      { type: "registration", url: "/docs/company-registration.pdf" },
    ],
    status: "pending"
  },
  {
    id: "comp_002",
    name: 'Vodafone Egypt',
    alt: 'Vodafone Egypt',
    email: 'contact@vodafone.com.eg',
    logo: '/logos/tawabiry.png',
    industry: 'Telecommunications',
    size: 'Corporate (500+ employees)',
    documentation: [
      { type: "registration", url: "/docs/company-registration.pdf" },
    ],
    status: "pending"
  },
  {
    id: "comp_003",
    name: 'Juhayna Food Industries',
    alt: 'Juhayna Food Industries',
    email: 'contact@juhayna.com',
    logo: '/logos/tawabiry.png',
    industry: 'Food Production',
    size: 'Large (101-500 employees)',
    documentation: [
      { type: "registration", url: "/docs/company-registration.pdf" },
    ],
    status: "pending"
  },
  {
    id: "comp_004",
    name: 'Nestlé Egypt',
    industry: 'Food & Beverages',
    size: 'Corporate (500+ employees)',
    email: 'contact@eg.nestle.com',
    logo: '/logos/tawabiry.png',
    documentation: [
      { type: "registration", url: "/docs/company-registration.pdf" },
    ],
    status: "pending"
  },
  {
    id: "comp_005",
    name: 'Valeo Egypt',
    alt: 'Valeo Egypt',
    industry: 'Automotive',
    size: 'Large (101-500 employees)',
    email: 'hr@valeo.com',
    logo: '/logos/tawabiry.png',
    documentation: [
      { type: "taxCard", url: "/docs/tax-card.pdf" },
    ],
    status: "pending"
  },
  {
    id: "comp_006",
    name: 'Fawry',
    alt: 'Fawry',
    industry: 'Financial Services',
    size: 'Medium (51-100 employees)',
    email: 'support@fawry.com',
    logo: '/logos/tawabiry.png',
    documentation: [
      { type: "taxId", url: "/docs/tax-id.pdf" },
    ],
    status: "pending"
  },
  {
    id: "comp_007",
    name: 'Careem Egypt',
    alt: 'Careem Egypt',
    industry: 'Internet',
    size: 'Medium (51-100 employees)',
    email: 'info@careem.com',
    logo: '/logos/tawabiry.png',
    documentation: [
      { type: "registration", url: "/docs/company-registration.pdf" },
    ],
    location: 'Multinational (Egypt)'
  },
  {
    id: "comp_008",
    name: 'Edita Food Industries',
    alt: 'Edita Food Industries',
    industry: 'Food Production',
    size: 'Large (101-500 employees)',
    email: 'contact@edita.com.eg',
    logo: '/logos/tawabiry.png',
    documentation: [
      { type: "taxCard", url: "/docs/tax-card.pdf" },
    ],
    status: "pending"
  },
  {
    id: "comp_009",
    name: 'Deloitte Egypt',
    alt: 'Deloitte Egypt',
    industry: 'Consulting',
    size: 'Large (101-500 employees)',
    email: 'contact@deloitte.com.eg',
    logo: '/logos/tawabiry.png',
    documentation: [
      { type: "registration", url: "/docs/company-registration.pdf" },
    ],
    status: "pending"
  },
  {
    id: "comp_010",
    name: 'KPMG Egypt',
    alt: 'KPMG Egypt',
    industry: 'Consulting',
    size: 'Large (101-500 employees)',
    email: 'contact@kpmg.com.eg',
    logo: '/logos/tawabiry.png',
    documentation: [
      { type: "registration", url: "/docs/company-registration.pdf" },
    ],
    status: "pending"
  },
  {
    id: "comp_011",
    name: 'PwC Egypt',
    alt: 'PwC Egypt',
    industry: 'Consulting',
    size: 'Large (101-500 employees)',
    email: 'contact@pwc.com.eg',
    logo: '/logos/tawabiry.png',
    documentation: [
      { type: "registration", url: "/docs/company-registration.pdf" },
    ],
    status: "pending"
  },
  {
    id: "comp_012",
    name: 'EY Egypt',
    alt: 'EY Egypt',
    industry: 'Consulting',
    size: 'Large (101-500 employees)',
    email: 'contact@ey.com.eg',
    logo: '/logos/tawabiry.png',
    documentation: [
      { type: "registration", url: "/docs/company-registration.pdf" },
    ],
    status: "pending"
  },
  {
    id: "comp_013",
    name: 'Gates Of Egypt',
    alt: 'Gates Of Egypt',
    industry: 'Tourism',
    size: 'Small (1-50 employees)',
    email: 'contact@gates-of-egypt.com',
    logo: '/logos/tawabiry.png',
    documentation: [
      { type: "registration", url: "/docs/company-registration.pdf" },
    ],
    status: "pending"
  },
];

// Mock data for applied internships
export const MOCK_APPLIED_INTERNSHIPS = [
  {
    id: 1,
    title: "UI Designer",
    company: "Dribble",
    type: "Part-time",
    jobType: "Part-time",
    jobSetting: "Remote",
    paid: true,
    rate: "$20/hr",
    appliedDate: "2021-06-03",
    startDate: "2025-01-15",
    duration: "3 months",
    skills: ["Figma", "User Research", "Prototyping", "UI Design", "Wireframing", "Usability Testing", "Adobe XD"],
    description: "Help design user-friendly interfaces and improve user experience for our products.",
    details: "Dribble, a leading design platform, offers hands-on experience with real-world design challenges and client projects.",
    requirements: "Design students proficient in Figma with user research experience preferred...",
    status: "pending"
  },
  {
    id: 2,
    title: "Frontend Developer Intern",
    company: "TechVision",
    type: "Full-time",
    jobType: "Full-time",
    jobSetting: "Remote",
    paid: true,
    rate: "$0/hr",
    appliedDate: "2021-06-03",
    startDate: "2025-01-15",
    duration: "3 months",
    skills: ["JavaScript", "React", "TypeScript", "Redux", "HTML5", "CSS3", "REST APIs"],
    description: "Join our team to work on exciting projects and gain hands-on experience in frontend development.",
    details: "TechVision leads in software development, pioneering web technology innovation for over a decade with cutting-edge solutions.",
    requirements: "Applicants should be pursuing a Computer Science degree with basic JavaScript/React knowledge...",
    status: "accepted"
  },
  {
    id: 3,
    title: "Marketing Coordinator",
    company: "BrandBoost",
    type: "Part-time",
    jobType: "Part-time",
    jobSetting: "Hybrid",
    paid: false,
    rate: "$0/hr",
    appliedDate: "2021-06-03",
    startDate: "2025-02-01",
    duration: "6 months",
    skills: ["SEO", "Content Creation", "Social Media", "Google Analytics", "Email Marketing", "Copywriting", "Market Research"],
    description: "Assist in marketing campaigns and help boost our brand presence online.",
    details: "BrandBoost, a premier digital marketing agency, empowers businesses to establish and grow their online presence effectively.",
    requirements: "Marketing/Communications students with social media knowledge and strong writing skills preferred...",
    status: "finalized"
  },
  {
    id: 4,
    title: "Data Science Intern",
    company: "Thndr",
    type: "Full-time",
    jobType: "Full-time",
    jobSetting: "On-site",
    paid: true,
    rate: "$0/hr",
    appliedDate: "2021-06-03",
    startDate: "2025-03-01",
    duration: "4 months",
    skills: ["Python", "Machine Learning", "Data Analysis", "SQL", "Pandas", "NumPy", "Data Visualization"],
    description: "Work with our data team to analyze large datasets and derive insights.",
    details: "Thndr, an innovative fintech startup, transforms the investment landscape using advanced AI-powered analytics and insights.",
    requirements: "Data Science/CS majors with Python proficiency and basic ML understanding needed...",
    status: "rejected"
  }
];

// Faculty and SCAD Report Data - shared between both views
export const facultyScadReports = {
  "1": {
    id: "1",
    reportNumber: 'RPT-001',
    title: 'Backend Development Internship Final Report',
    studentName: 'David Lee',
    studentMajor: 'Computer Science',
    companyName: 'TechCorp Inc.',
    submissionDate: '2025-04-15',
    status: 'pending',
    introduction: 'This report outlines my experience as a backend developer intern at TechCorp from January to April 2025. During this period, I worked on server-side development, database optimization, and API design, gaining valuable industry experience.',
    body: 'During my three-month internship at TechCorp Inc., I was assigned to the backend development team working on the company\'s cloud infrastructure services. I worked alongside senior developers and DevOps engineers to improve the scalability and reliability of their microservices architecture.\n\nMy primary responsibilities included implementing new API endpoints, optimizing database queries, and writing unit tests for existing functionality. I also participated in code reviews and daily stand-up meetings, which helped me understand the importance of communication in a professional development environment.\n\nOne of the major projects I contributed to was the optimization of the data retrieval system, which previously experienced performance issues with large datasets. I implemented query optimization techniques and caching strategies that resulted in a 60% improvement in response times.\n\nThe technical skills I gained during this internship include:\n- Node.js and Express.js for API development\n- MongoDB optimization techniques\n- Docker containerization\n- CI/CD pipeline configuration with Jenkins\n- Test-driven development practices\n\nBeyond technical skills, I also developed important professional skills such as project planning, time management, and technical documentation. The experience of working in an agile team taught me how to break down complex problems and collaborate effectively with team members of varying expertise levels.\n\nMy coursework in Database Systems and Advanced Programming provided a solid foundation for this internship. The theoretical concepts I learned were directly applicable to the real-world challenges I faced, particularly when working with database optimization and system architecture.',
    highlights: [
      // { start: 52, end: 122, color: '#FFFBC9' }, // "server-side development, database optimization, and API design"
      // { start: 327, end: 397, color: '#D4F1F9' }, // "improve the scalability and reliability of their microservices architecture"
      // { start: 658, end: 721, color: '#D1F5D3' }  // "resulted in a 60% improvement in response times"
    ],
    comments: [
      // { position: 112, text: "Good focus on key backend skills" },
      // { position: 389, text: "Impressive technical challenge to tackle as an intern" },
      // { position: 695, text: "Quantifiable results - excellent addition to the report!" }
    ],
    feedback: 'This report demonstrates strong technical skills and clear documentation.',
    statusReason: ''
  },
  "2": {
    id: "2",
    reportNumber: 'RPT-002',
    title: 'Frontend Development Internship Final Report',
    studentName: 'Sarah Wilson',
    studentMajor: 'Computer Engineering',
    companyName: 'Web Solutions Ltd.',
    submissionDate: '2025-04-10',
    status: 'flagged',
    introduction: 'This report details my experience as a frontend developer intern at Web Solutions Ltd. from January to March 2025. I worked on user interface design and implementation using modern web technologies like React and TailwindCSS.',
    body: 'During my internship at Web Solutions Ltd., I worked with the frontend development team on various client projects. The company specializes in creating custom web applications for businesses across different industries.\n\nMy main responsibilities included implementing UI components according to design specifications, fixing cross-browser compatibility issues, and optimizing application performance. I collaborated closely with designers and backend developers to ensure seamless integration of all system components.\n\nA significant project I contributed to was the redesign of a healthcare provider\'s patient portal. I implemented responsive components that improved accessibility and user experience, particularly for users with disabilities. This project taught me the importance of inclusive design and adherence to WCAG guidelines.\n\nThroughout the internship, I gained proficiency in:\n- React.js and state management with Redux\n- Styled Components and CSS-in-JS approaches\n- Frontend testing with Jest and React Testing Library\n- Webpack configuration and optimization\n- Client-side performance optimization techniques\n\nThe internship also helped me develop soft skills such as client communication, requirement analysis, and presenting technical concepts to non-technical stakeholders. I learned to balance aesthetic design with technical constraints, which is crucial for successful frontend development.\n\nThe knowledge from my Human-Computer Interaction and Web Development courses proved invaluable during this experience. Understanding usability principles and web standards helped me contribute meaningful improvements to projects right from the start of my internship.',
    highlights: [
      { start: 52, end: 148, color: '#D4F1F9' }, // "user interface design and implementation using modern web technologies like React and TailwindCSS"
      { start: 412, end: 483, color: '#FFDBF2' }, // "optimizing application performance. I collaborated closely with designers"
      { start: 557, end: 642, color: '#FFFBC9' }  // "responsive components that improved accessibility and user experience, particularly"
    ],
    comments: [
      { position: 137, text: "Need more details on specific React features used" },
      { position: 465, text: "Good example of cross-functional collaboration" },
      { position: 642, text: "This section lacks specific examples of accessibility improvements made" }
    ],
    feedback: 'The report shows good UI/UX understanding but lacks detail on accessibility improvements.',
    statusReason: 'Needs clarification on accessibility implementation.'
  },
  "3": {
    id: "3",
    reportNumber: 'RPT-003',
    title: 'Full Stack Developer Internship Final Report',
    studentName: 'Michael Brown',
    studentMajor: 'Computer Science',
    companyName: 'Digital Innovations',
    submissionDate: '2025-04-05',
    status: 'rejected',
    introduction: 'This report summarizes my experience as a full stack developer intern at Digital Innovations from December 2024 to March 2025. I worked on both frontend and backend aspects of web application development for multiple client projects.',
    body: 'My internship at Digital Innovations provided comprehensive exposure to the entire web development stack. As a full stack intern, I rotated between frontend and backend teams to gain experience in all aspects of application development.\n\nOn the frontend, I worked with React and Angular frameworks to build interactive user interfaces. I implemented responsive designs, managed state across complex applications, and optimized components for better performance. On the backend, I developed REST APIs using Node.js and Express, configured database schemas using MongoDB and PostgreSQL, and implemented authentication systems.\n\nA significant achievement during my internship was developing an internal tool that automated the generation of client reports. This tool reduced the time required to create reports by 75% and decreased human error. I was responsible for the entire implementation, from database design to user interface.\n\nThe technical skills I enhanced during this internship include:\n- Full-stack JavaScript development (React, Node.js)\n- Database design and optimization (SQL and NoSQL)\n- OAuth implementation and security best practices\n- GraphQL API development\n- Serverless architecture using AWS Lambda\n\nI also gained valuable insights into project management methodologies, particularly Scrum and Kanban. Participating in sprint planning, daily stand-ups, and retrospectives helped me understand how to prioritize tasks and contribute effectively to team goals.\n\nThe combination of my Software Engineering and Cloud Computing courses provided excellent preparation for this internship. The concepts of system design, clean code practices, and distributed computing were directly applicable to the work I performed at Digital Innovations.',
    highlights: [
      { start: 241, end: 302, color: '#D1F5D3' }, // "I implemented responsive designs, managed state across complex"
      { start: 472, end: 572, color: '#FFFBC9' }, // "developing an internal tool that automated the generation of client reports. This tool reduced"
      { start: 577, end: 607, color: '#FFDBF2' }  // "by 75% and decreased human error"
    ],
    comments: [
      { position: 98, text: "Report is vague about specific project contributions" },
      { position: 313, text: "No concrete examples of state management implementation" },
      { position: 607, text: "Claims appear exaggerated without supporting evidence" }
    ],
    feedback: 'Report is vague about specific project contributions. Please provide more concrete examples.',
    statusReason: 'Did not meet the minimum requirements.'
  },
  "4": {
    id: "4",
    reportNumber: 'RPT-004',
    title: 'Data Science Internship Final Report',
    studentName: 'Emma Johnson',
    studentMajor: 'Information Systems',
    companyName: 'Data Insights Corp',
    submissionDate: '2025-04-12',
    status: 'accepted',
    introduction: 'This report documents my data science internship at Data Insights Corp from February to April 2025. During this time, I worked on data analysis, machine learning model development, and data visualization projects.',
    body: 'My internship at Data Insights Corp allowed me to apply theoretical knowledge to practical data science challenges. I was part of a specialized team focused on building predictive analytics solutions for retail clients.\n\nMy primary responsibilities included cleaning and preprocessing large datasets, implementing machine learning algorithms, and creating interactive dashboards to visualize insights. I collaborated with data engineers to ensure proper data pipelines and with business analysts to align technical solutions with client needs.\n\nA key project I contributed to was developing a customer segmentation model for a major retail chain. Using clustering algorithms and behavioral analysis, I helped identify distinct customer segments that informed the client\'s marketing strategy. My model achieved a 25% improvement in campaign conversion rates during initial testing.\n\nThrough this internship, I enhanced my skills in:\n- Python data science libraries (Pandas, NumPy, Scikit-learn)\n- Statistical analysis and hypothesis testing\n- Machine learning model development and validation\n- Data visualization with Tableau and Matplotlib\n- Big data processing using Spark\n\nBeyond technical skills, I improved my ability to communicate complex analyses to non-technical stakeholders. Translating data insights into actionable business recommendations was a significant learning experience.\n\nMy Statistical Methods and Machine Learning coursework provided essential foundations for this internship. Understanding the mathematical principles behind algorithms helped me make informed choices when selecting and tuning models for specific business problems.',
    highlights: [
      { start: 354, end: 428, color: '#D4F1F9' }, // "creating interactive dashboards to visualize insights. I collaborated with"
      { start: 571, end: 662, color: '#D1F5D3' }, // "customer segments that informed the client\'s marketing strategy. My model achieved a 25%"
      { start: 811, end: 881, color: '#FFDBF2' }  // "Statistical analysis and hypothesis testing"
    ],
    comments: [
      { position: 428, text: "Excellent cross-functional collaboration example" },
      { position: 662, text: "Great quantifiable result with business impact" }
    ],
    feedback: 'Excellent application of data science concepts and clear business impact.',
    statusReason: ''
  },
  "5": {
    id: "5",
    reportNumber: 'RPT-005',
    title: 'Mobile App Development Internship Report',
    studentName: 'James Rodriguez',
    studentMajor: 'Software Engineering',
    companyName: 'AppWorks Inc.',
    submissionDate: '2025-04-08',
    status: 'pending',
    introduction: 'This report details my experience as a mobile application development intern at AppWorks Inc. from January to March 2025, where I contributed to the development of cross-platform mobile applications using React Native.',
    body: 'During my internship at AppWorks Inc., I worked with the mobile development team on creating and enhancing applications for both iOS and Android platforms. The company focuses on delivering high-quality mobile solutions for clients in various industries including healthcare, finance, and retail.\n\nMy main responsibilities included implementing new features, fixing bugs, writing unit tests, and optimizing application performance. I participated in the entire development lifecycle, from initial planning and design discussions to deployment and user feedback analysis.\n\nA major project I worked on was a health and fitness tracking application that interfaced with wearable devices. I implemented the Bluetooth connectivity module and developed a real-time data synchronization system that maintained data integrity even with intermittent connectivity. This feature received positive feedback from beta testers and was highlighted in the product release notes.\n\nThrough this internship, I gained proficiency in:\n- React Native and cross-platform development\n- State management using Redux and Context API\n- Native module integration on iOS and Android\n- Automated testing for mobile applications\n- Continuous integration for mobile deployment\n\nThe internship also taught me valuable lessons about mobile UX design considerations, performance optimization for resource-constrained devices, and the importance of thorough testing across different device configurations.\n\nMy Mobile Application Development and UI/UX Design courses provided excellent theoretical background for this internship. Understanding platform-specific design guidelines and development constraints helped me contribute effectively from the beginning of my internship.',
    highlights: [
      // { start: 133, end: 183, color: '#FFFBC9' }, // "cross-platform mobile applications using React Native"
      // { start: 532, end: 662, color: '#D1F5D3' }, // "Bluetooth connectivity module and developed a real-time data synchronization system that maintained data integrity"
      // { start: 1021, end: 1121, color: '#D4F1F9' }  // "performance optimization for resource-constrained devices, and the importance of thorough testing"
    ],
    comments: [
      // { position: 183, text: "Good technology choice for the project requirements" },
      // { position: 622, text: "Excellent technical solution for a challenging problem" },
      // { position: 1121, text: "Shows good understanding of mobile development constraints" }
    ],
    feedback: 'Good technology choice and strong technical solution for mobile development.',
    statusReason: ''
  },
  "6": {
    id: "6",
    reportNumber: 'RPT-006',
    title: 'UX/UI Design Internship Final Report',
    studentName: 'Olivia Chen',
    studentMajor: 'Information Systems',
    companyName: 'Creative Solutions',
    submissionDate: '2025-04-17',
    status: 'accepted',
    introduction: 'This report outlines my experience as a UX/UI design intern at Creative Solutions from January to April 2025, where I worked on various digital product design projects and user experience research initiatives.',
    body: 'During my internship at Creative Solutions, I participated in a variety of UX/UI projects, collaborating with both designers and developers. My responsibilities included conducting user research, creating wireframes, and developing interactive prototypes. I was able to apply my academic knowledge in real-world scenarios, and my mentor provided constructive feedback that helped me refine my skills.\n\nOne of my main achievements was leading a usability testing session, which resulted in actionable insights for the team. This experience greatly improved my proficiency in Figma and enhanced my communication and teamwork abilities. Overall, the internship deepened my understanding of user-centered design and the importance of iterative development.\n\nI worked on the redesign of an e-commerce application, focusing on improving the checkout process to reduce cart abandonment. Through user interviews and journey mapping, I identified key pain points and proposed design solutions that resulted in a 15% decrease in abandonment rate during A/B testing.\n\nThe technical skills I developed during this internship include:\n- Proficiency in design tools (Figma, Adobe XD)\n- User research methodologies and usability testing\n- Information architecture and interaction design\n- Design system creation and maintenance\n- Prototyping and design handoff to development teams\n\nI also gained valuable experience in collaborating with cross-functional teams, presenting design decisions to stakeholders, and balancing user needs with business requirements.\n\nMy User Experience Design and Human-Computer Interaction courses provided a strong foundation for this internship. The principles of cognitive psychology, usability heuristics, and design thinking methodologies were directly applicable to my daily work at Creative Solutions.',
    highlights: [
      { start: 204, end: 292, color: '#FFDBF2' }, // "creating wireframes, and developing interactive prototypes. I was able to apply my academic knowledge"
      { start: 457, end: 597, color: '#D1F5D3' }, // "deepened my understanding of user-centered design and the importance of iterative development.\n\nI worked on the redesign of an e-commerce application"
      { start: 732, end: 812, color: '#FFFBC9' }  // "resulted in a 15% decrease in abandonment rate during A/B testing"
    ],
    comments: [
      { position: 292, text: "Great application of academic concepts" },
      { position: 562, text: "Excellent practical application of UX principles" },
      { position: 812, text: "Impressive measurable business impact" }
    ],
    feedback: 'Great application of academic concepts and impressive measurable business impact.',
    statusReason: ''
  }
};

// Mock reviews for company evaluation modal
export const mockCompanyReviews = [
  {
    user: "Sarah Ahmed",
    rating: 4,
    date: "18 APR 2025",
    comment: "Great mentorship and supportive environment. Learned a lot!",
    likes: 298
  },
  {
    user: "Mohamed Tarek",
    rating: 5,
    date: "15 APR 2025",
    comment: "Amazing experience, the team was very helpful and the projects were interesting.",
    likes: 178
  }
];

// Mock evaluations for students
export const MOCK_EVALUATIONS = [
  {
    studentName: "Layla Khaled",
    major: "Computer Science",
    companyName: "Juhayna Food Industries",
    supervisorName: "Dr. Indra",
    supervisorEmail: "indra@juhayna.com",
    tasks: "Worked on backend APIs and learned about scalable systems.",
    environment: "Supportive and collaborative team.",
    rating: 5,
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    avatar: "/images/girl2.png"
  },
  {
    studentName: "Hatem Soliman",
    major: "Media Engineering & Technology",
    companyName: "Vodafone Egypt",
    supervisorName: "Ms. Laila Hassan",
    supervisorEmail: "laila.hassan@vodafone.com.eg",
    tasks: "Designed UI/UX for mobile app and participated in frontend sprints.",
    environment: "Fast-paced, innovative, and fun.",
    rating: 4,
    startDate: "2024-07-01",
    endDate: "2024-09-15",
    avatar: "/images/boy2.png"
  },
  {
    studentName: "Salma Tarek",
    major: "Computer Science",
    companyName: "Nestlé Egypt",
    supervisorName: "Mr. Ahmed Said",
    supervisorEmail: "ahmed.said@eg.nestle.com",
    tasks: "Worked on data analysis and automation scripts.",
    environment: "Very organized and welcoming.",
    rating: 5,
    startDate: "2024-06-15",
    endDate: "2024-09-01",
    avatar: "/images/girl1.png"
  },
   {
    studentName: "Salma Tarek",
    major: "Computer Science",
    companyName: "Nestlé Egypt",
    supervisorName: "Mr. Ahmed Said",
    supervisorEmail: "ahmed.said@eg.nestle.com",
    tasks: "Worked on data analysis and automation scripts.",
    environment: "Very organized and welcoming.",
    rating: 3,
    startDate: "2024-06-15",
    endDate: "2024-09-01",
    avatar: "/images/girl1.png"
  },
   {
    studentName: "Salma Tarek",
    major: "Computer Science",
    companyName: "Nestlé Egypt",
    supervisorName: "Mr. Ahmed Said",
    supervisorEmail: "ahmed.said@eg.nestle.com",
    tasks: "Worked on data analysis and automation scripts.",
    environment: "Very organized and welcoming.",
    rating: 2,
    startDate: "2024-06-15",
    endDate: "2024-09-01",
    avatar: "/images/girl1.png"
  }
];

//Courses by Major:

export const CSEN_Courses = [
  'Software Engineering',
  'Databses I',
  'Databases II',
  'Introduction to Communication Networks',
  'Data Structures and Algorithms'
]

export const DMET_Courses = [
  'Computer Graphics',
  'Introduction to Media Engineering',
  'Web Technologies and Usability',
  'Visualization and Animation'
]

export const BioTech_Courses = [
  'Physiology and Anatomy I',
  'Physical Chemistry',
  'General and Pharmaceutical Microbiology',
  'Physiology and Anatomy II',
]

export const Law_Courses = [
  'Introduction to Common Law',
  'The Constitutional Law',
  'Criminology and Penology',
  'Civil Law',
  'Criminal Law'
]

export const mockStudents = [
  {
    id: "61-1959",
    name: "Farid Khaled",
    photo: "/images/boy1.png",
    major: "DMET",
    semester: "4",
    status: "Regular",
    internshipStatus: "Completed",
    gpa: 1.3,
    email: "FaridKhaled@student.guc.edu.eg",
    bio: "DMET student with a strong interest in embedded systems and robotics.",
    profileImage: "/images/boy1.png",
    socialLinks: {
      linkedin: "https://linkedin.com/in/faridkhaled",
      github: "https://github.com/faridkhaled"
    },
    personalityTraits: [
      { trait: "Openness", rating: 3 },
      { trait: "Conscientiousness", rating: 4 },
      { trait: "Extraversion", rating: 2 },
      { trait: "Agreeableness", rating: 4 }
    ],
    education: [
      {
        degree: "B.Sc. in Digital Media Engineering & Technology",
        institution: "German University in Cairo",
        period: "2021 - Present"
      }
    ],
    skills: ["C++", "Verilog", "Arduino", "MATLAB", "Teamwork"],
    jobInterests: [
      {
        title: "Embedded Systems Engineer",
        description: "Loves building low-level systems that interface directly with hardware."
      }
    ],
    experience: [
      {
        title: "Robotics Club Member",
        company: "GUC Robotics Society",
        duration: "2023",
        responsibilities: [
          "Built autonomous robots using Arduino",
          "Participated in local robotics competitions"
        ]
      }
    ],
    internships: [
      {
        title: "Embedded Intern",
        company: "Valeo Egypt",
        period: "Summer 2023",
        description: "Worked on firmware for automotive microcontrollers."
      }
    ]
  },
  {
    id: "55-5727",
    name: "Salma Tarek",
    photo: "/images/girl1.png",
    major: "Mechatronics Engineering",
    semester: "8",
    status: "Regular",
    internshipStatus: "Current",
    gpa: 2.3,
    email: "SalmaTarek@student.guc.edu.eg",
    bio: "Final-year Mechatronics student focused on industrial automation.",
    profileImage: "/images/girl1.png",
    socialLinks: {
      linkedin: "https://linkedin.com/in/salmatarek",
      portfolio: "https://salmatarek.me"
    },
    personalityTraits: [
      { trait: "Openness", rating: 5 },
      { trait: "Conscientiousness", rating: 4 },
      { trait: "Extraversion", rating: 3 },
      { trait: "Agreeableness", rating: 5 }
    ],
    education: [
      {
        degree: "B.Sc. in Mechatronics Engineering",
        institution: "German University in Cairo",
        period: "2019 - Present"
      }
    ],
    skills: ["PLC Programming", "SolidWorks", "Python", "ROS", "Simulink"],
    jobInterests: [
      {
        title: "Automation Engineer",
        description: "Interested in smart factories and robotic assembly lines."
      }
    ],
    experience: [
      {
        title: "Senior Project",
        company: "GUC Lab",
        duration: "2024",
        responsibilities: [
          "Designed a pick-and-place robotic arm",
          "Integrated computer vision for object detection"
        ]
      }
    ],
    internships: [
      {
        title: "Control Systems Intern",
        company: "Siemens Egypt",
        period: "Summer 2023",
        description: "Assisted in commissioning PLC-based systems in a manufacturing plant."
      }
    ]
  },
  {
    id: "55-6188",
    name: "Hatem Soliman",
    photo: "/images/boy4.png",
    major: "MET",
    semester: "6",
    status: "PRO",
    internshipStatus: "Current",
    gpa: 1.7,
    email: "HatemSoliman@student.guc.edu.eg",
    bio: "Computer Science student passionate about web development and AI.",
    profileImage: "/images/student.png",
    socialLinks: {
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      portfolio: "https://johndoe.dev"
    },
    personalityTraits: [
      { trait: "Openness", rating: 4 },
      { trait: "Conscientiousness", rating: 5 },
      { trait: "Extraversion", rating: 4 },
      { trait: "Agreeableness", rating: 3 }
    ],
    education: [
      {
        degree: "B.S. in Computer Science and Engineering",
        institution: "German University in Cairo",
        period: "2022 - Present"
      },
      {
        faculty: "Media Engineering and Technology (MET)",
        semester: 6
      }
    ],
    skills: [
      "Java", "Python", "React", "Node.js", 
      "UI/UX Design", "Problem Solving", "Team Leadership"
    ],
    jobInterests: [
      {
        title: "Software Development Engineer",
        description: "Passionate about building scalable web applications with modern frameworks. Looking for opportunities to work on user-facing features that make a difference."
      },
      {
        title: "Data Science",
        description: "Intrigued by the power of data to drive decision-making. Eager to apply machine learning techniques to solve real-world problems."
      },
      {
        title: "Product Management",
        description: "Interested in bridging the gap between technical and business aspects. Aspires to lead product development from conception to launch."
      }
    ],
    experience: [
      {
        title: "Software Engineering Intern",
        company: "Tech Innovators Inc.",
        duration: "Summer 2023",
        responsibilities: [
          "Developed features for the company's web application",
          "Collaborated with the UX team to improve user experience",
          "Fixed bugs and improved application performance"
        ]
      },
      {
        title: "Research Assistant",
        company: "University AI Lab",
        duration: "2022 - Present",
        responsibilities: [
          "Assisted in data collection and analysis for AI research",
          "Implemented algorithms for pattern recognition",
          "Co-authored a research paper on machine learning applications"
        ]
      }
    ],
    internships: [
      {
        title: "Software Engineering Intern",
        company: "Google",
        period: "Summer 2024 (Upcoming)",
        description: "Will be working on Google Maps features using React and Node.js. Selected from over 500 applicants through a rigorous interview process."
      },
      {
        title: "Research Assistant",
        company: "Michigan State AI Lab",
        period: "Fall 2023",
        description: "Worked on developing machine learning algorithms for image recognition. Presented findings at the campus research exhibition."
      },
      {
        title: "Mobile Development Intern",
        company: "Local Startup",
        period: "Summer 2023",
        description: "Developed features for an iOS app using Swift. Implemented user authentication and real-time chat functionality."
      }
    ]
  },
  {
    id: "58-16143",
    name: "Amr Baher",
    photo: "/images/boy2.png",
    major: "Business Management",
    semester: "6",
    status: "PRO",
    internshipStatus: "Current",
    gpa: 1.7,
    email: "AmrBaher@student.guc.edu.eg",
    bio: "Business student with a focus on digital transformation and analytics.",
    profileImage: "/images/boy2.png",
    socialLinks: {
      linkedin: "https://linkedin.com/in/amrbaher",
      github: "https://github.com/amrbaher"
    },
    personalityTraits: [
      { trait: "Openness", rating: 4 },
      { trait: "Conscientiousness", rating: 2 },
      { trait: "Extraversion", rating: 5 },
      { trait: "Agreeableness", rating: 3 }
    ],
    education: [
      {
        degree: "B.A. in Business Management",
        institution: "German University in Cairo",
        period: "2021 - Present"
      }
    ],
    skills: ["Excel", "Power BI", "Marketing", "Communication", "Public Speaking"],
    jobInterests: [
      {
        title: "Marketing Analyst",
        description: "Loves interpreting market trends and campaign data."
      },
      {
        title: "Product Strategist",
        description: "Enjoys aligning products with customer needs and market gaps."
      }
    ],
    experience: [
      {
        title: "Marketing Trainee",
        company: "PepsiCo Egypt",
        duration: "Spring 2023",
        responsibilities: [
          "Supported digital ad campaigns",
          "Collected and analyzed social media metrics"
        ]
      }
    ],
    internships: [
      {
        title: "Business Analyst Intern",
        company: "Vodafone",
        period: "Summer 2023",
        description: "Worked with BI teams to generate reports on customer churn."
      }
    ]
  },
  {
    id: "52-4567",
    name: "Layla Khaled",
    photo: "/images/girl2.png",
    major: "Product Design",
    semester: "8",
    status: "PRO",
    internshipStatus: "Completed",
    gpa: 2.7,
    email: "LaylaKhaled@student.guc.edu.eg",
    bio: "Passionate product designer blending aesthetics and functionality.",
    profileImage: "/images/girl2.png",
    socialLinks: {
      linkedin: "https://linkedin.com/in/laylakhaled",
      portfolio: "https://laylakhaled.design"
    },
    personalityTraits: [
      { trait: "Openness", rating: 5 },
      { trait: "Conscientiousness", rating: 3 },
      { trait: "Extraversion", rating: 4 },
      { trait: "Agreeableness", rating: 4 }
    ],
    education: [
      {
        degree: "B.Sc. in Product Design",
        institution: "German University in Cairo",
        period: "2019 - Present"
      }
    ],
    skills: ["Sketch", "Figma", "3D Modeling", "UX Research", "Design Thinking"],
    jobInterests: [
      {
        title: "UX Designer",
        description: "Driven to create seamless digital experiences."
      },
      {
        title: "Product Designer",
        description: "Loves iterating on prototypes and testing with users."
      }
    ],
    experience: [
      {
        title: "Freelance UX Designer",
        company: "Startup Portfolio",
        duration: "2023",
        responsibilities: [
          "Designed mobile app interfaces",
          "Conducted usability tests"
        ]
      }
    ],
    internships: [
      {
        title: "Design Intern",
        company: "Orange Labs",
        period: "Summer 2023",
        description: "Assisted in redesigning internal tools for employee use."
      }
    ]
  },
  {
    id: "64-5123",
    name: "Khaled Ahmed",
    photo: "/images/boy3.png",
    major: "IET",
    semester: "2",
    status: "Regular",
    internshipStatus: "Completed",
    gpa: 3.0,
    email: "KhaledAhmed@student.guc.edu.eg",
    bio: "Early IET student exploring the intersections of electrical engineering and computing.",
    profileImage: "/images/boy3.png",
    socialLinks: {
      linkedin: "https://linkedin.com/in/khaledahmed"
    },
    personalityTraits: [
      { trait: "Openness", rating: 3 },
      { trait: "Conscientiousness", rating: 4 },
      { trait: "Extraversion", rating: 2 },
      { trait: "Agreeableness", rating: 3 }
    ],
    education: [
      {
        degree: "B.Sc. in Information Engineering and Technology",
        institution: "German University in Cairo",
        period: "2023 - Present"
      }
    ],
    skills: ["Python", "Circuits", "Microcontrollers", "Debugging", "Soldering"],
    jobInterests: [
      {
        title: "IoT Engineer",
        description: "Excited about connecting the physical world through sensors and software."
      }
    ],
    experience: [],
    internships: []
  },
  {
    id: "58-0454",
    name: "Habiba Mahmoud",
    photo: "/images/girl3.png",
    major: "Pharmacy",
    semester: "6",
    status: "PRO",
    internshipStatus: "Current",
    gpa: 1.0,
    email: "HabibaMahmoud@student.guc.edu.eg",
    bio: "Pharmacy student interested in clinical research and pharmacovigilance.",
    profileImage: "/images/girl3.png",
    socialLinks: {
      linkedin: "https://linkedin.com/in/habibamahmoud"
    },
    personalityTraits: [
      { trait: "Openness", rating: 4 },
      { trait: "Conscientiousness", rating: 5 },
      { trait: "Extraversion", rating: 2 },
      { trait: "Agreeableness", rating: 4 }
    ],
    education: [
      {
        degree: "B.Pharm in Pharmaceutical Sciences",
        institution: "German University in Cairo",
        period: "2021 - Present"
      }
    ],
    skills: ["Drug Interaction Analysis", "Lab Techniques", "Research Writing", "SPSS"],
    jobInterests: [
      {
        title: "Clinical Research Associate",
        description: "Interested in supporting clinical trials and ensuring drug safety."
      },
      {
        title: "Regulatory Affairs Specialist",
        description: "Wants to work with compliance teams to bring pharmaceuticals to market safely."
      }
    ],
    experience: [
      {
        title: "Lab Assistant",
        company: "GUC Pharmacology Lab",
        duration: "2023",
        responsibilities: [
          "Prepared chemical solutions for lab tests",
          "Assisted in documentation of compound reactions"
        ]
      }
    ],
    internships: [
      {
        title: "Pharmacy Intern",
        company: "El Ezaby Pharmacy",
        period: "Summer 2023",
        description: "Gained experience in prescription processing and patient consultation."
      }
    ]
  },
  {
    id: "61-7128",
    name: "Hala Khaled",
    photo: "/images/girl4.png",
    major: "Business Informatics",
    semester: "4",
    status: "Regular",
    internshipStatus: "Completed",
    gpa: 2.0,
    email: "HalaKhaled@student.guc.edu.eg",
    bio: "Business Informatics student passionate about data-driven solutions and ERP systems.",
    profileImage: "/images/girl4.png",
    socialLinks: {
      linkedin: "https://linkedin.com/in/halakhaled",
      github: "https://github.com/halakhaled"
    },
    personalityTraits: [
      { trait: "Openness", rating: 3 },
      { trait: "Conscientiousness", rating: 4 },
      { trait: "Extraversion", rating: 3 },
      { trait: "Agreeableness", rating: 5 }
    ],
    education: [
      {
        degree: "B.Sc. in Business Informatics",
        institution: "German University in Cairo",
        period: "2022 - Present"
      }
    ],
    skills: ["SQL", "ERP Systems", "Data Analytics", "Business Intelligence", "Excel"],
    jobInterests: [
      {
        title: "ERP Consultant",
        description: "Interested in helping companies digitize their operations through ERP systems."
      },
      {
        title: "Data Analyst",
        description: "Enjoys working with data to uncover business insights and support decision-making."
      }
    ],
    experience: [
      {
        title: "Business Analyst Trainee",
        company: "SAP Student Academy",
        duration: "2023",
        responsibilities: [
          "Completed workshops on SAP ERP systems",
          "Created mock dashboards using BI tools"
        ]
      }
    ],
    internships: [
      {
        title: "IT Support Intern",
        company: "Nestlé Egypt",
        period: "Summer 2023",
        description: "Provided support for internal systems and assisted with data integrity checks in ERP modules."
      }
    ]
  }
];

export const reports = [
  {
    id: "RPT-001",
    studentName: "Alex Johnson",
    studentId: "S12345",
    major: "DMET",
    company: "Tech Innovations Inc.",
    internshipDuration: "12 weeks",
    reportTitle: "Digital Media Internship Experience",
    submissionDate: "2023-05-15",
    status: "ACCEPTED"
  },
  {
    id: "RPT-002",
    studentName: "Maria Garcia",
    studentId: "S12346",
    major: "IET",
    company: "PowerGrid Solutions",
    internshipDuration: "10 weeks",
    reportTitle: "Industrial Systems Analysis Internship",
    submissionDate: "2023-05-18",
    status: "PENDING"
  },
  {
    id: "RPT-003",
    studentName: "James Wilson",
    studentId: "S12347",
    major: "MET",
    company: "Auto Dynamics",
    internshipDuration: "8 weeks",
    reportTitle: "Manufacturing Engineering Internship",
    submissionDate: "2023-05-20",
    status: "FLAGGED"
  },
  {
    id: "RPT-004",
    studentName: "Sarah Lee",
    studentId: "S12348",
    major: "Management",
    company: "Global Finance Corp",
    internshipDuration: "12 weeks",
    reportTitle: "Marketing Strategy Internship Report",
    submissionDate: "2023-05-22",
    status: "REJECTED" 
  },
  {
    id: "RPT-005",
    studentName: "David Kim",
    studentId: "S12349",
    major: "BI",
    company: "DataSystems LLC",
    internshipDuration: "14 weeks",
    reportTitle: "Business Data Analysis Internship",
    submissionDate: "2023-05-25",
    status: "ACCEPTED"
  },
  {
    id: "RPT-006",
    studentName: "Emma Thompson",
    studentId: "S12350",
    major: "Law",
    company: "Legal Associates LLP",
    internshipDuration: "10 weeks",
    reportTitle: "Corporate Law Internship Report",
    submissionDate: "2023-05-28",
    status: "PENDING"
  },
  {
    id: "RPT-007",
    studentName: "Michael Brown",
    studentId: "S12351",
    major: "Applied Arts",
    company: "Creative Design Studio",
    internshipDuration: "12 weeks",
    reportTitle: "Graphic Design Internship Portfolio",
    submissionDate: "2023-05-30",
    status: "ACCEPTED"
  },
  {
    id: "RPT-008",
    studentName: "Olivia Davis",
    studentId: "S12352",
    major: "DMET",
    company: "Digital Media Solutions",
    internshipDuration: "8 weeks",
    reportTitle: "Animation Internship Experience",
    submissionDate: "2023-06-01",
    status: "FLAGGED"
  },
  {
    id: "RPT-009",
    studentName: "Daniel Wilson",
    studentId: "S12353",
    major: "IET",
    company: "Industrial Automation Co.",
    internshipDuration: "16 weeks",
    reportTitle: "Process Control Systems Internship",
    submissionDate: "2023-06-03",
    status: "PENDING"
  },
  {
    id: "RPT-010",
    studentName: "Sophia Martinez",
    studentId: "S12354",
    major: "Management",
    company: "Market Leaders Inc.",
    internshipDuration: "10 weeks",
    reportTitle: "Business Development Internship Report",
    submissionDate: "2023-06-05",
    status: "ACCEPTED"
  },
  {
    id: "RPT-011",
    studentName: "Ethan Parker",
    studentId: "S12355",
    major: "Pharmacy",
    company: "Metro Health Pharmaceuticals",
    internshipDuration: "12 weeks",
    reportTitle: "Clinical Pharmacy Internship Experience",
    submissionDate: "2023-06-08",
    status: "ACCEPTED"
  },
  {
    id: "RPT-012",
    studentName: "Ava Rodriguez",
    studentId: "S12356",
    major: "DMET",
    company: "Virtual Reality Studios",
    internshipDuration: "14 weeks",
    reportTitle: "VR Content Development Internship",
    submissionDate: "2023-06-10",
    status: "PENDING"
  },
  {
    id: "RPT-013",
    studentName: "Noah Chen",
    studentId: "S12357",
    major: "BI",
    company: "Analytics Pro",
    internshipDuration: "10 weeks",
    reportTitle: "Business Intelligence Systems Internship",
    submissionDate: "2023-06-12",
    status: "FLAGGED",
  },
  {
    id: "RPT-014",
    studentName: "Isabella Wong",
    studentId: "S12358",
    major: "Applied Arts",
    company: "Urban Design Collective",
    internshipDuration: "8 weeks",
    reportTitle: "Product Design Internship Portfolio",
    submissionDate: "2023-06-15",
    status: "ACCEPTED"
  },
  {
    id: "RPT-015",
    studentName: "Liam O'Brien",
    studentId: "S12359",
    major: "Pharmacy",
    company: "Community Care Pharmacy",
    internshipDuration: "16 weeks",
    reportTitle: "Retail Pharmacy Operations Internship",
    submissionDate: "2023-06-18",
    status: "PENDING"
  }
];
export const sampleWorkshops = [
  {
    id: 1,
    title: "Introduction to Machine Learning",
    date: "2023-10-15",
    time: "10:00 AM - 12:00 PM",
    location: "Tech Building, Room 101",
    description: "Kickstart your journey into machine learning! In this beginner-friendly session, you'll explore key ML concepts, algorithms like decision trees and k-nearest neighbors, and see live demos of real-world applications in healthcare, finance, and marketing.",
    instructor: "Dr. Ahmed El-Sayed",
    instructorBio: "Dr. Ahmed El-Sayed is an Associate Professor of Computer Science at Cairo University with over 15 years of experience in machine learning and artificial intelligence.",
    instructorImage: "/images/boy3.png",
    imageUrl: "/images/Workshop5.jpeg",
    seatsAvailable: 25,
    prerequisites: "Basic knowledge of statistics and Python is recommended."
  },
  {
    id: 2,
    title: "Web Development Bootcamp",
    date: "2023-10-20",
    time: "1:00 PM - 4:00 PM",
    location: "Innovation Hub, Room 202",
    description: "Join us for a hands-on workshop where you'll build a modern web app from scratch using HTML, CSS, JavaScript, and React. You'll also get introduced to backend concepts with Node.js.",
    instructor: "Ms. Sara Mohamed",
    instructorBio: "Ms. Sara Mohamed is a senior web developer at BrightTech Solutions and a certified instructor with 10+ years in full-stack development.",
    instructorImage: "/images/girl3.png",
    imageUrl: "/images/Workshop1.jpeg",
    seatsAvailable: 30,
    prerequisites: "No prior experience needed, but familiarity with basic programming is a plus."
  },
  {
    id: 3,
    title: "Data Science with Python",
    date: "2023-10-25",
    time: "9:00 AM - 11:00 AM",
    location: "Analytics Lab, Room 303",
    description: "Dive into data science using Python! Learn about data manipulation with pandas, data visualization with matplotlib, and machine learning with scikit-learn through practical exercises.",
    instructor: "Dr. Hossam Khaled",
    instructorBio: "Dr. Hossam Khaled is a data scientist at DataX Analytics and holds a Ph.D. in Data Mining. He has conducted workshops in over 5 countries.",
    instructorImage: "/images/boy2.png",
    imageUrl: "/images/Workshop4.jpeg",
    seatsAvailable: 20,
    prerequisites: "Participants should have Python installed and basic programming knowledge."
  },
  {
    id: 4,
    title: "UI/UX Design Principles",
    date: "2023-10-30",
    time: "2:00 PM - 5:00 PM",
    location: "Design Studio, Room 404",
    description: "Master the principles of great design! This session covers user research, wireframing, prototyping, and usability testing with tools like Figma and Adobe XD.",
    instructor: "Ms. Layla Ahmed",
    instructorBio: "Ms. Layla Ahmed is a lead UX designer at Creative Minds Agency with over 12 years of experience in product design.",
    instructorImage: "/images/girl2.png",
    imageUrl: "/images/Workshop.jpeg",
    seatsAvailable: 18,
    prerequisites: "Bring your laptop. No prior design experience required."
  },
  {
    id: 5,
    title: "Digital Marketing Strategies",
    date: "2023-11-05",
    time: "10:00 AM - 12:00 PM",
    location: "Business Center, Room 505",
    description: "Explore the latest trends and tools in digital marketing, including SEO, content marketing, paid ads, and analytics. You'll leave with actionable strategies to boost your brand.",
    instructor: "Mr. Omar Hassan",
    instructorBio: "Mr. Omar Hassan is a digital marketing consultant and former head of marketing at MarketPro with 15 years in the field.",
    instructorImage: "/images/boy1.png",
    imageUrl: "/images/Workshop2.jpeg",
    seatsAvailable: 40,
    prerequisites: "Ideal for entrepreneurs, marketers, and small business owners."
  },
  {
    id: 6,
    title: "Cybersecurity Essentials",
    date: "2023-11-10",
    time: "1:00 PM - 3:00 PM",
    location: "IT Security Lab, Room 606",
    description: "Learn how to secure your digital assets! This workshop covers password management, phishing detection, encryption basics, and security best practices.",
    instructor: "Dr. Fatma Ali",
    instructorBio: "Dr. Fatma Ali is a cybersecurity expert at SecureNet Solutions and an international speaker on cyber defense tactics.",
    instructorImage: "/images/girl1.png",
    imageUrl: "/images/Workshop3.jpeg",
    seatsAvailable: 35,
    prerequisites: "No prior knowledge needed; open to all skill levels."
  }
];
export const mockAssessments = [
  {
    id: 1,
    title: "Myers-Briggs Type Indicator (MBTI)",
    imageUrl: "/images/mbti.jpeg",
    type: "Personality Assessment",
    description: "The MBTI assessment identifies your personality type based on four dichotomies: Extraversion/Introversion, Sensing/Intuition, Thinking/Feeling, and Judging/Perceiving. Understand your preferences for interacting, processing information, decision-making, and organizing your life.",
    whyTakeIt: "The MBTI helps you understand your personality type, giving insight into your strengths and preferences in how you interact with others and make decisions. Knowing your MBTI type can help improve communication, enhance team collaboration, and provide a clearer understanding of career paths that align with your natural tendencies.",
    questions: [
      {
        id: 1,
        question: "Do you feel energized by social interactions or do you prefer time alone to recharge?",
        options: [
          { id: "A", text: "Strongly prefer social interactions", value: 2 },
          { id: "B", text: "Somewhat prefer social interactions", value: 1 },
          { id: "C", text: "Somewhat prefer time alone", value: -1 },
          { id: "D", text: "Strongly prefer time alone", value: -2 },
        ],
        dimension: "Extraversion-Introversion",
      },
      {
        id: 2,
        question: "When solving problems, do you rely more on logical analysis or do you consider your emotions?",
        options: [
          { id: "A", text: "Strongly rely on logical analysis", value: 2 },
          { id: "B", text: "Somewhat rely on logical analysis", value: 1 },
          { id: "C", text: "Somewhat consider emotions", value: -1 },
          { id: "D", text: "Strongly consider emotions", value: -2 },
        ],
        dimension: "Thinking-Feeling",
      },
      {
        id: 3,
        question: "Do you prefer a structured plan or do you like to keep your options open?",
        options: [
          { id: "A", text: "Strongly prefer a structured plan", value: 2 },
          { id: "B", text: "Somewhat prefer a structured plan", value: 1 },
          { id: "C", text: "Somewhat like to keep options open", value: -1 },
          { id: "D", text: "Strongly like to keep options open", value: -2 },
        ],
        dimension: "Judging-Perceiving",
      },
      {
        id: 4,
        question: "Do you focus on concrete facts or do you explore abstract possibilities?",
        options: [
          { id: "A", text: "Strongly focus on concrete facts", value: 2 },
          { id: "B", text: "Somewhat focus on concrete facts", value: 1 },
          { id: "C", text: "Somewhat explore possibilities", value: -1 },
          { id: "D", text: "Strongly explore possibilities", value: -2 },
        ],
        dimension: "Sensing-Intuition",
      },
      {
        id: 5,
        question: "Do you easily start conversations with strangers or do you prefer familiar company?",
        options: [
          { id: "A", text: "Strongly enjoy starting conversations", value: 2 },
          { id: "B", text: "Somewhat enjoy starting conversations", value: 1 },
          { id: "C", text: "Somewhat prefer familiar company", value: -1 },
          { id: "D", text: "Strongly prefer familiar company", value: -2 },
        ],
        dimension: "Extraversion-Introversion",
      },
      {
        id: 6,
        question: "Do you make decisions based on objective criteria or do you weigh your values?",
        options: [
          { id: "A", text: "Strongly use objective criteria", value: 2 },
          { id: "B", text: "Somewhat use objective criteria", value: 1 },
          { id: "C", text: "Somewhat weigh values", value: -1 },
          { id: "D", text: "Strongly weigh values", value: -2 },
        ],
        dimension: "Thinking-Feeling",
      },
      {
        id: 7,
        question: "Do you prefer to follow a schedule or act spontaneously?",
        options: [
          { id: "A", text: "Strongly prefer a schedule", value: 2 },
          { id: "B", text: "Somewhat prefer a schedule", value: 1 },
          { id: "C", text: "Somewhat prefer spontaneity", value: -1 },
          { id: "D", text: "Strongly prefer spontaneity", value: -2 },
        ],
        dimension: "Judging-Perceiving",
      },
      {
        id: 8,
        question: "Do you trust tangible information or do you rely on your intuition?",
        options: [
          { id: "A", text: "Strongly trust tangible information", value: 2 },
          { id: "B", text: "Somewhat trust tangible information", value: 1 },
          { id: "C", text: "Somewhat rely on intuition", value: -1 },
          { id: "D", text: "Strongly rely on intuition", value: -2 },
        ],
        dimension: "Sensing-Intuition",
      },
      {
        id: 9,
        question: "Do you thrive in group settings or do you work best alone?",
        options: [
          { id: "A", text: "Strongly thrive in groups", value: 2 },
          { id: "B", text: "Somewhat thrive in groups", value: 1 },
          { id: "C", text: "Somewhat prefer working alone", value: -1 },
          { id: "D", text: "Strongly prefer working alone", value: -2 },
        ],
        dimension: "Extraversion-Introversion",
      },
      {
        id: 10,
        question: "Do you prioritize practical solutions or innovative ideas?",
        options: [
          { id: "A", text: "Strongly prioritize practical solutions", value: 2 },
          { id: "B", text: "Somewhat prioritize practical solutions", value: 1 },
          { id: "C", text: "Somewhat prioritize innovative ideas", value: -1 },
          { id: "D", text: "Strongly prioritize innovative ideas", value: -2 },
        ],
        dimension: "Sensing-Intuition",
      },
    ],
    resultExplanation: "Your responses determine your preference on four dichotomies, resulting in one of 16 personality types (e.g., INFP, ESTJ). Each type offers insights into your communication style, decision-making, and work preferences. For example, ENTJs are often strategic leaders, while ISFPs are creative and empathetic.",
    scoringLogic: "Sum the values for each dimension (Extraversion-Introversion, Sensing-Intuition, Thinking-Feeling, Judging-Perceiving). Positive scores indicate the first trait (e.g., Extraversion), negative scores the second (e.g., Introversion). The score's magnitude reflects preference strength.",
  },
  {
    id: 2,
    title: "Big Five Personality Assessment",
    imageUrl: "/images/bigfive.jpeg",
    type: "Personality Assessment",
    description: "This assessment evaluates five core personality traits: Openness to Experience, Conscientiousness, Extraversion, Agreeableness, and Neuroticism. It provides a detailed profile for personal growth, career planning, and understanding relationships.",
    whyTakeIt: "The Big Five provides a scientifically-backed model of personality, giving you valuable insights into how you approach life. It’s helpful for improving self-awareness, personal development, and understanding how you interact with others. By understanding your scores, you can improve your relationships, adapt to work environments, and boost emotional intelligence.",
    questions: [
      {
        id: 1,
        question: "I enjoy exploring new ideas and unconventional perspectives.",
        options: [
          { id: "A", text: "Strongly Agree", value: 3 },
          { id: "B", text: "Agree", value: 2 },
          { id: "C", text: "Neutral", value: 0 },
          { id: "D", text: "Disagree", value: -2 },
          { id: "E", text: "Strongly Disagree", value: -3 },
        ],
        dimension: "Openness",
      },
      {
        id: 2,
        question: "I am highly organized and always meet deadlines.",
        options: [
          { id: "A", text: "Strongly Agree", value: 3 },
          { id: "B", text: "Agree", value: 2 },
          { id: "C", text: "Neutral", value: 0 },
          { id: "D", text: "Disagree", value: -2 },
          { id: "E", text: "Strongly Disagree", value: -3 },
        ],
        dimension: "Conscientiousness",
      },
      {
        id: 3,
        question: "I feel energized by being around many people.",
        options: [
          { id: "A", text: "Strongly Agree", value: 3 },
          { id: "B", text: "Agree", value: 2 },
          { id: "C", text: "Neutral", value: 0 },
          { id: "D", text: "Disagree", value: -2 },
          { id: "E", text: "Strongly Disagree", value: -3 },
        ],
        dimension: "Extraversion",
      },
      {
        id: 4,
        question: "I find it easy to empathize with others’ feelings.",
        options: [
          { id: "A", text: "Strongly Agree", value: 3 },
          { id: "B", text: "Agree", value: 2 },
          { id: "C", text: "Neutral", value: 0 },
          { id: "D", text: "Disagree", value: -2 },
          { id: "E", text: "Strongly Disagree", value: -3 },
        ],
        dimension: "Agreeableness",
      },
      {
        id: 5,
        question: "I often feel anxious in stressful situations.",
        options: [
          { id: "A", text: "Strongly Agree", value: 3 },
          { id: "B", text: "Agree", value: 2 },
          { id: "C", text: "Neutral", value: 0 },
          { id: "D", text: "Disagree", value: -2 },
          { id: "E", text: "Strongly Disagree", value: -3 },
        ],
        dimension: "Neuroticism",
      },
      {
        id: 6,
        question: "I am open to trying new experiences, even if they are risky.",
        options: [
          { id: "A", text: "Strongly Agree", value: 3 },
          { id: "B", text: "Agree", value: 2 },
          { id: "C", text: "Neutral", value: 0 },
          { id: "D", text: "Disagree", value: -2 },
          { id: "E", text: "Strongly Disagree", value: -3 },
        ],
        dimension: "Openness",
      },
      {
        id: 7,
        question: "I pay close attention to details in my work.",
        options: [
          { id: "A", text: "Strongly Agree", value: 3 },
          { id: "B", text: "Agree", value: 2 },
          { id: "C", text: "Neutral", value: 0 },
          { id: "D", text: "Disagree", value: -2 },
          { id: "E", text: "Strongly Disagree", value: -3 },
        ],
        dimension: "Conscientiousness",
      },
      {
        id: 8,
        question: "I prefer quiet settings over lively social events.",
        options: [
          { id: "A", text: "Strongly Agree", value: -3 },
          { id: "B", text: "Agree", value: -2 },
          { id: "C", text: "Neutral", value: 0 },
          { id: "D", text: "Disagree", value: 2 },
          { id: "E", text: "Strongly Disagree", value: 3 },
        ],
        dimension: "Extraversion",
      },
      {
        id: 9,
        question: "I often put others’ needs before my own.",
        options: [
          { id: "A", text: "Strongly Agree", value: 3 },
          { id: "B", text: "Agree", value: 2 },
          { id: "C", text: "Neutral", value: 0 },
          { id: "D", text: "Disagree", value: -2 },
          { id: "E", text: "Strongly Disagree", value: -3 },
        ],
        dimension: "Agreeableness",
      },
      {
        id: 10,
        question: "I remain calm and composed under pressure.",
        options: [
          { id: "A", text: "Strongly Agree", value: -3 },
          { id: "B", text: "Agree", value: -2 },
          { id: "C", text: "Neutral", value: 0 },
          { id: "D", text: "Disagree", value: 2 },
          { id: "E", text: "Strongly Disagree", value: 3 },
        ],
        dimension: "Neuroticism",
      },
    ],
    resultExplanation: "Your responses are scored to provide a percentage for each trait (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism). Higher scores indicate stronger expression of the trait. For example, high Openness suggests creativity, while high Conscientiousness indicates reliability.",
    scoringLogic: "For each dimension, sum the values of the two questions. Scores range from -6 to +6, converted to a 0-100% scale (e.g., +6 = 100%, -6 = 0%). Reverse-scored questions (e.g., preferring quiet settings for Extraversion) adjust the direction.",
  },
  {
    id: 3,
    title: "Strong Interest Inventory (SII)",
    imageUrl: "/images/sii.jpeg",
    type: "Career Assessment",
    description: "The Strong Interest Inventory assesses your interests across six occupational themes: Realistic, Investigative, Artistic, Social, Enterprising, and Conventional. It suggests career paths aligned with your preferences for work activities and environments.",
    whyTakeIt: "The SII helps you identify career paths that align with your interests, ensuring greater satisfaction and success in your professional life. Whether you’re looking to change careers or make a more informed decision about your path, the SII provides guidance based on your individual preferences for work environments and tasks.",
    questions: [
      {
        id: 1,
        question: "I enjoy working with tools or machines to build or repair things.",
        options: [
          { id: "A", text: "Strongly Agree", value: 3 },
          { id: "B", text: "Agree", value: 2 },
          { id: "C", text: "Neutral", value: 0 },
          { id: "D", text: "Disagree", value: -2 },
          { id: "E", text: "Strongly Disagree", value: -3 },
        ],
        dimension: "Realistic",
      },
      {
        id: 2,
        question: "I am interested in conducting scientific research or solving complex problems.",
        options: [
          { id: "A", text: "Strongly Agree", value: 3 },
          { id: "B", text: "Agree", value: 2 },
          { id: "C", text: "Neutral", value: 0 },
          { id: "D", text: "Disagree", value: -2 },
          { id: "E", text: "Strongly Disagree", value: -3 },
        ],
        dimension: "Investigative",
      },
      {
        id: 3,
        question: "I enjoy expressing myself through writing, music, or visual arts.",
        options: [
          { id: "A", text: "Strongly Agree", value: 3 },
          { id: "B", text: "Agree", value: 2 },
          { id: "C", text: "Neutral", value: 0 },
          { id: "D", text: "Disagree", value: -2 },
          { id: "E", text: "Strongly Disagree", value: -3 },
        ],
        dimension: "Artistic",
      },
      {
        id: 4,
        question: "I find satisfaction in helping others through teaching or counseling.",
        options: [
          { id: "A", text: "Strongly Agree", value: 3 },
          { id: "B", text: "Agree", value: 2 },
          { id: "C", text: "Neutral", value: 0 },
          { id: "D", text: "Disagree", value: -2 },
          { id: "E", text: "Strongly Disagree", value: -3 },
        ],
        dimension: "Social",
      },
      {
        id: 5,
        question: "I enjoy leading teams or persuading others to achieve goals.",
        options: [
          { id: "A", text: "Strongly Agree", value: 3 },
          { id: "B", text: "Agree", value: 2 },
          { id: "C", text: "Neutral", value: 0 },
          { id: "D", text: "Disagree", value: -2 },
          { id: "E", text: "Strongly Disagree", value: -3 },
        ],
        dimension: "Enterprising",
      },
      {
        id: 6,
        question: "I prefer organizing data or managing detailed records.",
        options: [
          { id: "A", text: "Strongly Agree", value: 3 },
          { id: "B", text: "Agree", value: 2 },
          { id: "C", text: "Neutral", value: 0 },
          { id: "D", text: "Disagree", value: -2 },
          { id: "E", text: "Strongly Disagree", value: -3 },
        ],
        dimension: "Conventional",
      },
      {
        id: 7,
        question: "I like outdoor activities like farming or construction.",
        options: [
          { id: "A", text: "Strongly Agree", value: 3 },
          { id: "B", text: "Agree", value: 2 },
          { id: "C", text: "Neutral", value: 0 },
          { id: "D", text: "Disagree", value: -2 },
          { id: "E", text: "Strongly Disagree", value: -3 },
        ],
        dimension: "Realistic",
      },
      {
        id: 8,
        question: "I am curious about how things work and enjoy analyzing systems.",
        options: [
          { id: "A", text: "Strongly Agree", value: 3 },
          { id: "B", text: "Agree", value: 2 },
          { id: "C", text: "Neutral", value: 0 },
          { id: "D", text: "Disagree", value: -2 },
          { id: "E", text: "Strongly Disagree", value: -3 },
        ],
        dimension: "Investigative",
      },
      {
        id: 9,
        question: "I enjoy collaborating with others to support their growth.",
        options: [
          { id: "A", text: "Strongly Agree", value: 3 },
          { id: "B", text: "Agree", value: 2 },
          { id: "C", text: "Neutral", value: 0 },
          { id: "D", text: "Disagree", value: -2 },
          { id: "E", text: "Strongly Disagree", value: -3 },
        ],
        dimension: "Social",
      },
      {
        id: 10,
        question: "I thrive in structured environments with clear procedures.",
        options: [
          { id: "A", text: "Strongly Agree", value: 3 },
          { id: "B", text: "Agree", value: 2 },
          { id: "C", text: "Neutral", value: 0 },
          { id: "D", text: "Disagree", value: -2 },
          { id: "E", text: "Strongly Disagree", value: -3 },
        ],
        dimension: "Conventional",
      },
    ],
    resultExplanation: "Your responses are scored across six themes (Realistic, Investigative, Artistic, Social, Enterprising, Conventional). Higher scores in a theme suggest stronger interest in related careers, such as engineering (Realistic), research (Investigative), or teaching (Social).",
    scoringLogic: "For each dimension, sum the values of the two questions. Scores range from -6 to +6, converted to a 0-100% scale (e.g., +6 = 100%, -6 = 0%). The highest-scoring themes indicate your strongest career interests.",
  },
];