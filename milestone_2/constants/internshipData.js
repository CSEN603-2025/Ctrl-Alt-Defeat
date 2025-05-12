import { MOCK_USERS } from "./mockData";

// Unified mock internship data with all properties needed across different views
export const allInternships = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "TechVision",
    type: "Full-time",
    locationType: "REMOTE",
    jobSetting: "Remote",
    paid: true,
    rate: "$20/hr",
    postedDate: "2 days ago",
    appliedDate: "2024-04-15",
    startDate: "2025-01-15",
    industry: "Technology",
    duration: "3 months",
    skills: ["JavaScript", "React", "TypeScript", "Redux", "HTML5", "CSS3", "REST APIs"],
    description: "Join our team to work on exciting projects and gain hands-on experience in frontend development.",
    details: "TechVision leads in software development, pioneering web technology innovation for over a decade with cutting-edge solutions.",
    requirements: "Applicants should be pursuing a Computer Science degree with basic JavaScript/React knowledge...",
    status: "current", // For my-internships
    applicationStatus: "accepted", // For applied-internships
    isRecommended: true
  },
  {
    id: 2,
    title: "Marketing Coordinator",
    company: "BrandBoost",
    type: "Part-time",
    locationType: "HYBRID",
    jobSetting: "Hybrid",
    paid: false,
    rate: "$0/hr",
    postedDate: "1 week ago",
    appliedDate: "2024-04-10",
    startDate: "2025-02-01",
    industry: "Marketing",
    duration: "6 months",
    skills: ["SEO", "Content Creation", "Social Media", "Google Analytics", "Email Marketing", "Copywriting", "Market Research"],
    description: "Assist in marketing campaigns and help boost our brand presence online.",
    details: "BrandBoost, a premier digital marketing agency, empowers businesses to establish and grow their online presence effectively.",
    requirements: "Marketing/Communications students with social media knowledge and strong writing skills preferred...",
    status: "completed", // For my-internships
    applicationStatus: "finalized", // For applied-internships
    isRecommended: false
  },
  {
    id: 3,
    title: "Data Science Intern",
    company: "Thndr",
    type: "Full-time",
    locationType: "ON-SITE",
    jobSetting: "On-site",
    paid: true,
    rate: "$25/hr",
    postedDate: "3 days ago",
    appliedDate: "2024-04-05",
    startDate: "2025-03-01",
    industry: "Technology",
    duration: "4 months",
    skills: ["Python", "Machine Learning", "Data Analysis", "SQL", "Pandas", "NumPy", "Data Visualization"],
    description: "Work with our data team to analyze large datasets and derive insights.",
    details: "Thndr, an innovative fintech startup, transforms the investment landscape using advanced AI-powered analytics and insights.",
    requirements: "Data Science/CS majors with Python proficiency and basic ML understanding needed...",
    status: "evaluated", // For my-internships
    applicationStatus: "rejected", // For applied-internships
    isRecommended: true
  },
  {
    id: 4,
    title: "UX Design Intern",
    company: "CreativeMinds",
    type: "Contract",
    locationType: "REMOTE",
    jobSetting: "Remote",
    paid: true,
    rate: "$22/hr",
    postedDate: "5 days ago",
    appliedDate: "2024-04-01",
    startDate: "2025-06-01",
    industry: "Design",
    duration: "4 months",
    skills: ["Figma", "User Research", "Prototyping", "UI Design", "Wireframing", "Usability Testing", "Adobe XD"],
    description: "Help design user-friendly interfaces and improve user experience for our products.",
    details: "CreativeMinds, a globally recognized design consultancy, has been shaping exceptional user experiences worldwide since 2012.",
    requirements: "Design students proficient in Figma with user research experience preferred...",
    status: "current", // For my-internships
    applicationStatus: "pending", // For applied-internships
    isRecommended: false
  },
  {
    id: 5,
    title: "Biomedical Research Assistant",
    company: "HealthInnovate",
    type: "Full-time",
    locationType: "ON-SITE",
    jobSetting: "On-site",
    paid: false,
    rate: "$0/hr",
    postedDate: "2 weeks ago",
    startDate: "2025-04-01",
    industry: "Healthcare",
    duration: "6 months",
    skills: ["Research", "Data Collection", "Analysis", "Lab Techniques", "Scientific Writing", "Statistics", "Clinical Protocols"],
    description: "Assist in ongoing biomedical research projects and contribute to data collection and analysis.",
    details: "HealthInnovate, a pioneering medical research firm, is dedicated to advancing global healthcare technology and treatments.",
    requirements: "Biology/Medical students with research experience and strong analytical skills needed...",
    status: "completed",
    applicationStatus: null, // Not applied to
    isRecommended: false
  }
];

// Helper functions to filter internships for different views
export const getRegularInternships = () => {
  return allInternships;
};

export const getMyInternships = () => {
  return allInternships.filter(internship =>
    ["current", "completed", "evaluated"].includes(internship.status)
  );
};

export const getAppliedInternships = () => {
  return allInternships.filter(internship =>
    internship.applicationStatus !== null
  ).map(internship => ({
    ...internship,
    status: internship.applicationStatus // Use applicationStatus as status for applied view
  }));
};

export const getRecommendedInternships = () => {
  return allInternships.filter(internship => internship.isRecommended);
};

// Get recommended internships based on a specific student's profile
export const getRecommendedInternshipsForStudent = (studentProfile) => {
  if (!studentProfile) return []; // Return empty if no student profile

  // Ensure MOCK_USERS.students is available and is an array
  const allStudents = MOCK_USERS && Array.isArray(MOCK_USERS.students) ? MOCK_USERS.students : [];

  // Find the student if an email is passed, otherwise assume studentProfile is the object
  const student = typeof studentProfile === 'string'
    ? allStudents.find(s => s.email === studentProfile)
    : studentProfile;

  if (!student) return []; // Return empty if student not found or profile invalid

  return allInternships.filter((internship) => {
    const matchesRecommendedCompanies = student.recommendedCompanies?.includes(internship.id);
    const matchesIndustries = student.industries?.includes(internship.industry);
    const matchesJobInterests = student.jobInterests?.some((interest) =>
      internship.title.toLowerCase().includes(interest.toLowerCase())
    );
    // Add more sophisticated logic here if needed, e.g., weighting
    return matchesRecommendedCompanies || matchesIndustries || matchesJobInterests;
  });
}; 