"use client"
import { useState, useEffect } from 'react';
import StudentCard from "./StudentCard";
import StudentDetails from "./StudentDetails";
import UpdateProfileS from "./UpdateProfileS";
import './styles/StudentProfile.css'; // Importing CSS for styling

export default function Student() {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // Default student data
  const defaultStudentData = {
    name: "John Doe",
    handle: "@johndoe",
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
      { trait: "Agreeableness", rating: 3 },
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
    skills: ["Java", "Python", "React", "Node.js", "UI/UX Design", "Problem Solving", "Team Leadership"],
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
    ],
    theme: {
      primary: "#318FA8", 
      secondary: "#256980",
      accent: "#41B9D9",
      text: "#1A4857",
      background: "#E8F4F8"
    }
  };
  
  // Load student data from localStorage on component mount
  const [studentData, setStudentData] = useState(defaultStudentData);
  
  useEffect(() => {
    const loadStudentData = () => {
      try {
        const savedData = localStorage.getItem('studentProfileData');
        if (savedData) {
          setStudentData(JSON.parse(savedData));
        }
      } catch (error) {
        console.error("Error loading student data from localStorage:", error);
      }
    };
    
    loadStudentData();
  }, []);

  const toggleDetails = () => {
    setIsDetailsOpen(!isDetailsOpen);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  // Function to update student data from edit form
  const handleProfileUpdate = (updatedData) => {
    setStudentData(updatedData);
    
    // Save the updated data to localStorage
    try {
      localStorage.setItem('studentProfileData', JSON.stringify(updatedData));
    } catch (error) {
      console.error("Error saving student data to localStorage:", error);
    }
    
    closeEditModal();
    
    // In a real application, you would send the data to your backend here
    console.log("Updated profile data:", updatedData);
  };

  return (
    <div className="container-fluid overflow-x-hidden"> {/* Added overflow-x-hidden to prevent horizontal scrolling using Tailwind CSS */}
      <div className="row">
        <div className="main">
          <div className="student-profile">
            <StudentCard 
              isOpen={isDetailsOpen} 
              toggleDetails={toggleDetails}
              onEditProfile={openEditModal}
              studentData={studentData}
            />
            <StudentDetails 
              isOpen={isDetailsOpen}
              studentData={studentData}
            />
            <UpdateProfileS 
              isOpen={isEditModalOpen}
              onClose={closeEditModal}
              studentData={studentData}
              onProfileUpdate={handleProfileUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}