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
      email: "salmaaburahma@gmail.com",
      password: "salma123",
      name: "Salma",
      role: "student",
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
    requirements: "Data Science/CS majors with Python proficiency and basic ML understanding needed...",
    status: "rejected"
  }
];

export const SkillsProffessional = [
'Ability to adapt to change',						
'Analytical skills',						
'Collecting data/ research data skills',						
'Creativity', 						
'Follow up skills',						
'Interpersonal skills with peers, supervisors, and clients',						
'Problem solving',						
'Punctuality', 						
'Reporting skills',						
'Responsibility and accountability', 						
'Stress handling',						
'Taking initiatives', 						
'Teamwork', 						
'Time management'
]

export const TechnicalBackground = [
'Technical Knowledge',						
'Compatibility of technical skills with the job'
]

export const CommandLanguages = [
'Arabic',						
'English',						
'German'						
];

export const Students = [
  "Hatem",
  "Omar",
  "Salma",
  "Sara",
  "Ahmed",
  "Mohamed",
  "Ali",
  "Yasmin"
]