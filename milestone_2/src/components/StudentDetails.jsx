import './styles/StudentProfile.css';

export default function StudentDetails({ isOpen, studentData }) {
  // Function to render stars for personality traits
  const renderStars = (rating) => {
    const stars = [];
    const maxStars = 5;
    
    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        <span 
          key={i} 
          className={`trait-star ${i <= rating ? 'filled' : 'empty'}`}
        >
          ★
        </span>
      );
    }
    
    return (
      <div className="trait-stars">
        {stars}
      </div>
    );
  };

  // Get theme colors if available
  const theme = studentData.theme || {
    primary: "#318FA8", 
    secondary: "#256980",
    accent: "#41B9D9",
    text: "#1A4857",
    background: "#E8F4F8"
  };

  // Apply theme colors using CSS variables
  const themeStyle = {
    "--user-primary": theme.primary,
    "--user-secondary": theme.secondary,
    "--user-accent": theme.accent,
    "--user-text": theme.text,
    "--user-background": theme.background,
  };
  
  // Text styles based on theme
  const sectionTitleStyle = {
    color: theme.text
  };
  
  const headingStyle = {
    color: theme.text
  };
  
  const textStyle = {
    color: theme.secondary
  };
  
  const lightTextStyle = {
    color: theme.secondary,
    opacity: 0.8
  };
  
  const skillTagStyle = {
    backgroundColor: theme.background,
    color: theme.text
  };

  return (
    <div className={`student-details ${isOpen ? 'expanded' : ''}`} style={themeStyle}>
      <div className="details-content">
        <div className="grid-layout">
          <div className="grid-column">
            <div className="details-section personality-traits-section">
              <h3 style={sectionTitleStyle}>Personality Traits</h3>
              <div className="personality-traits">
                {studentData.personalityTraits.map((trait, index) => (
                  <div key={index} className="trait-item">
                    <div className="trait-header-inline">
                      <span className="trait-label" style={textStyle}>{trait.trait}</span>
                      {renderStars(trait.rating)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="details-section education-section">
              <h3 style={sectionTitleStyle}>Education</h3>
              <div className="education-content">
                {studentData.education[0] && (
                  <div className="education-item">
                    <h4 style={headingStyle}>{studentData.education[0].degree}</h4>
                    <p style={textStyle}>{studentData.education[0].institution}</p>
                    <p className="year" style={lightTextStyle}>{studentData.education[0].period}</p>
                  </div>
                )}
                {studentData.education[1] && (
                  <div className="education-item">
                    <h4 style={headingStyle}>Faculty</h4>
                    <p style={textStyle}>{studentData.education[1].faculty}</p>
                    <p className="year" style={lightTextStyle}>Semester {studentData.education[1].semester}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="details-section skills-section">
              <h3 style={sectionTitleStyle}>Skills</h3>
              <div className="skills-container">
                {studentData.skills.map((skill, index) => (
                  <span key={index} className="skill-tag" style={skillTagStyle}>{skill}</span>
                ))}
              </div>
            </div>
            
            <div className="details-section job-interests-section">
              <h3 style={sectionTitleStyle}>Job Interests</h3>
              <div className="job-interests-container">
                {studentData.jobInterests.map((interest, index) => (
                  <div key={index} className="job-interest-item">
                    <h4 style={headingStyle}>{interest.title}</h4>
                    <div className="job-interest-separator"></div>
                    <p className="job-interest-description" style={textStyle}>
                      {interest.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid-column">
            <div className="details-section experience-section">
              <h3 style={sectionTitleStyle}>Experience</h3>
              <div className="experience-content">
                {studentData.experience.map((exp, index) => (
                  <div key={index} className="experience-item">
                    <h4 style={headingStyle}>{exp.title}</h4>
                    <p className="company" style={textStyle}>{exp.company}</p>
                    <p className="duration" style={lightTextStyle}>{exp.duration}</p>
                    
                    <ul className="responsibilities">
                      {exp.responsibilities.map((resp, respIdx) => (
                        <li key={respIdx} style={textStyle}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="details-section internships-section">
              <h3 style={sectionTitleStyle}>Internships</h3>
              <div className="internships-container">
                {studentData.internships.map((internship, index) => (
                  <div key={index} className="internship-item">
                    <div className="internship-header">
                      <div className="internship-icon">📋</div>
                      <h4 style={headingStyle}>{internship.title}</h4>
                    </div>
                    <div className="internship-content">
                      <p style={textStyle}>{internship.company}</p>
                      <p className="internship-period" style={lightTextStyle}>{internship.period}</p>
                      <div className="internship-separator"></div>
                      <p className="internship-description" style={textStyle}>{internship.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="details-section frustrations-section">
              <h3 style={sectionTitleStyle}>Frustrations</h3>
              <div className="frustration-container">
                <div className="frustration-item">
                  <div className="frustration-dot"></div>
                  <p style={textStyle}>Difficulty finding internships related to specific interests</p>
                </div>
                <div className="frustration-item">
                  <div className="frustration-dot"></div>
                  <p style={textStyle}>Balancing coursework with building practical experience</p>
                </div>
                <div className="frustration-item">
                  <div className="frustration-dot"></div>
                  <p style={textStyle}>Keeping up with rapidly changing technologies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

