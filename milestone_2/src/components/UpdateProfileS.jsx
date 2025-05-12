import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './styles/StudentProfile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSave, faPlus, faTrash, faCamera, faPalette, faFont, faSquare, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

// Validation schema for student profile form
const ProfileValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .matches(/^[a-zA-Z\s-]+$/, 'Name can only contain letters, spaces, and hyphens')
    .min(2, 'Name must be at least 2 characters'),
  handle: Yup.string()
    .required('Email is required')
    .email('Invalid email format. Please enter a valid email address'),
  bio: Yup.string().max(500, 'Bio cannot exceed 500 characters'),
  socialLinks: Yup.object().shape({
    linkedin: Yup.string().url('Invalid URL. Please enter a valid LinkedIn URL').nullable(),
    github: Yup.string().url('Invalid URL. Please enter a valid GitHub URL').nullable(),
    portfolio: Yup.string().url('Invalid URL. Please enter a valid portfolio URL').nullable(),
  }),
});

export default function UpdateProfileS({ isOpen, onClose, studentData, onProfileUpdate }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(studentData?.profileImage || "/images/student.png");
  const [initialValues, setInitialValues] = useState({
    ...studentData,
    cardColor: studentData?.cardColor || "#318FA8", // Default blue color if not set
    theme: studentData?.theme || {
      primary: "#318FA8",
      secondary: "#256980",
      accent: "#41B9D9",
      text: "#1A4857",
      background: "#E8F4F8"
    }
  });

  // Update initial values when student data changes
  useEffect(() => {
    setImagePreview(studentData?.profileImage || "/images/student.png");
    setInitialValues({
      ...studentData,
      cardColor: studentData?.cardColor || "#318FA8",
      theme: studentData?.theme || {
        primary: "#318FA8",
        secondary: "#256980",
        accent: "#41B9D9",
        text: "#1A4857",
        background: "#E8F4F8"
      }
    });
  }, [studentData]);

  const handleImageChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setSelectedImage(file);
      setFieldValue('profileImage', file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to generate a gradient based on the selected color
  const generateGradient = (baseColor) => {
    // Convert hex to RGB
    const r = parseInt(baseColor.slice(1, 3), 16);
    const g = parseInt(baseColor.slice(3, 5), 16);
    const b = parseInt(baseColor.slice(5, 7), 16);
    
    // Create lighter and darker variants for gradient
    const lighterColor = `rgb(${Math.min(r + 40, 255)}, ${Math.min(g + 40, 255)}, ${Math.min(b + 40, 255)})`;
    const darkerColor = `rgb(${Math.max(r - 40, 0)}, ${Math.max(g - 40, 0)}, ${Math.max(b - 40, 0)})`;
    
    return `linear-gradient(135deg, ${lighterColor} 0%, ${darkerColor} 100%)`;
  };

  // Generate a complete color theme based on the selected base color
  const generateColorTheme = (baseColor) => {
    // Convert hex to RGB
    const r = parseInt(baseColor.slice(1, 3), 16);
    const g = parseInt(baseColor.slice(3, 5), 16);
    const b = parseInt(baseColor.slice(5, 7), 16);
    
    // Create color variations for the theme
    const primary = baseColor;
    
    // Darker variation for secondary color (30% darker)
    const secondaryR = Math.max(r * 0.7, 0);
    const secondaryG = Math.max(g * 0.7, 0);
    const secondaryB = Math.max(b * 0.7, 0);
    const secondary = `#${Math.round(secondaryR).toString(16).padStart(2, '0')}${Math.round(secondaryG).toString(16).padStart(2, '0')}${Math.round(secondaryB).toString(16).padStart(2, '0')}`;
    
    // Lighter variation for accent color (20% lighter)
    const accentR = Math.min(r * 1.3, 255);
    const accentG = Math.min(g * 1.3, 255);
    const accentB = Math.min(b * 1.3, 255);
    const accent = `#${Math.round(accentR).toString(16).padStart(2, '0')}${Math.round(accentG).toString(16).padStart(2, '0')}${Math.round(accentB).toString(16).padStart(2, '0')}`;
    
    // Very dark variation for text (60% darker)
    const textR = Math.max(r * 0.4, 0);
    const textG = Math.max(g * 0.4, 0);
    const textB = Math.max(b * 0.4, 0);
    const text = `#${Math.round(textR).toString(16).padStart(2, '0')}${Math.round(textG).toString(16).padStart(2, '0')}${Math.round(textB).toString(16).padStart(2, '0')}`;
    
    // Very light variation for background (90% lighter with some opacity)
    const backgroundR = Math.min(255, r + (255 - r) * 0.9);
    const backgroundG = Math.min(255, g + (255 - g) * 0.9);
    const backgroundB = Math.min(255, b + (255 - b) * 0.9);
    const background = `#${Math.round(backgroundR).toString(16).padStart(2, '0')}${Math.round(backgroundG).toString(16).padStart(2, '0')}${Math.round(backgroundB).toString(16).padStart(2, '0')}`;
    
    return { primary, secondary, accent, text, background };
  };

  const handleSubmit = (values) => {
    // Create a copy of the values to handle special cases (like the image)
    const updatedProfileData = { ...values };
    
    // If we have a new image selected with a preview URL, use it
    if (selectedImage) {
      updatedProfileData.profileImage = imagePreview;
    }
    
    onProfileUpdate(updatedProfileData);
  };

  // Function to render star rating input
  const renderStarRating = (name, value, onChange) => {
    const maxStars = 5;
    const stars = [];
    
    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        <span 
          key={i} 
          className={`trait-star ${i <= value ? 'filled' : 'empty'}`}
          onClick={() => onChange(name, i)}
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

  if (!isOpen) return null;

  return (
    <div className="update-profile-modal">
      <div className="update-profile-content">
        <div className="modal-header">
          Edit Profile
          <button 
            className="modal-close-btn"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={ProfileValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, handleChange }) => (
            <Form className="update-profile-form">
              <div className="update-profile-grid">
                <div className="update-profile-column">
                  {/* Basic Info Section */}
                  <div className="update-profile-section">
                    <h3>Basic Information</h3>
                    <div className="profile-image-upload">
                      <div className="profile-image-preview">
                        <img src={imagePreview} alt="Profile Preview" />
                        <label htmlFor="profile-image-input" className="profile-image-upload-icon">
                          <FontAwesomeIcon icon={faCamera} />
                          <input
                            id="profile-image-input"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, setFieldValue)}
                            style={{ display: 'none' }}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="form-row">
                      <label htmlFor="name">Full Name</label>
                      <Field type="text" id="name" name="name" />
                      <ErrorMessage name="name" component="div" className="error-message" />
                    </div>
                    <div className="form-row">
                      <label htmlFor="handle">Email</label>
                      <Field type="text" id="handle" name="handle" />
                      <ErrorMessage name="handle" component="div" className="error-message" />
                    </div>
                    <div className="form-row">
                      <label htmlFor="bio">Bio</label>
                      <Field as="textarea" id="bio" name="bio" rows="3" />
                      <ErrorMessage name="bio" component="div" className="error-message" />
                    </div>

                    {/* Color Theme Picker */}
                    <div className="form-row color-picker-container">
                      <label htmlFor="cardColor" className="color-picker-label">
                        <FontAwesomeIcon icon={faPalette} /> Profile Color Theme
                      </label>
                                            <div className="color-picker-wrapper">
                        <div className="color-picker-clickable">
                          <input 
                            type="color" 
                            id="cardColor" 
                            name="cardColor"
                            value={values.cardColor}
                            onChange={(e) => {
                              const newColor = e.target.value;
                              // Update both cardColor and theme
                              setFieldValue('cardColor', newColor);
                              const newTheme = generateColorTheme(newColor);
                              setFieldValue('theme', newTheme);
                            }}
                            className="color-picker-input"
                          />
                          <div className="click-indicator">
                            <span className="click-text">Click to select color</span>
                          </div>
                        </div>
                        <div className="theme-preview-container">
                          <div 
                            className="color-preview"
                            style={{ 
                              background: generateGradient(values.cardColor)
                            }}
                          >
                            <span className='preview'>Card Preview</span>
                          </div>
                          <div className="theme-color-squares">
                            <div className="theme-color-row">
                              <div className="theme-color-square" style={{ backgroundColor: values.theme.primary }} title="Primary">
                                <FontAwesomeIcon icon={faSquare} />
                              </div>
                              <div className="theme-color-square" style={{ backgroundColor: values.theme.secondary }} title="Secondary">
                                <FontAwesomeIcon icon={faSquare} />
                              </div>
                              <div className="theme-color-square" style={{ backgroundColor: values.theme.accent }} title="Accent">
                                <FontAwesomeIcon icon={faSquare} />
                              </div>
                            </div>
                            <div className="theme-color-row">
                              <div className="theme-color-square" style={{ backgroundColor: values.theme.text, color: values.theme.background }} title="Text">
                                <FontAwesomeIcon icon={faFont} />
                              </div>
                              <div className="theme-color-square" style={{ backgroundColor: values.theme.background, color: values.theme.text }} title="Background">
                                <span>Bg</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h4>Social Links</h4>
                    <div className="form-row">
                      <label htmlFor="linkedin">LinkedIn URL</label>
                      <Field type="text" id="linkedin" name="socialLinks.linkedin" />
                      <ErrorMessage name="socialLinks.linkedin" component="div" className="error-message" />
                    </div>
                    <div className="form-row">
                      <label htmlFor="github">GitHub URL</label>
                      <Field type="text" id="github" name="socialLinks.github" />
                      <ErrorMessage name="socialLinks.github" component="div" className="error-message" />
                    </div>
                    <div className="form-row">
                      <label htmlFor="portfolio">Portfolio URL</label>
                      <Field type="text" id="portfolio" name="socialLinks.portfolio" />
                      <ErrorMessage name="socialLinks.portfolio" component="div" className="error-message" />
                    </div>
                  </div>

                  {/* Personality Traits Section */}
                  <div className="update-profile-section">
                    <h3>Personality Traits</h3>
                    <FieldArray name="personalityTraits">
                      {({ push, remove }) => (
                        <>
                          {values.personalityTraits.map((trait, index) => (
                            <div key={index} className="trait-item-edit">
                              <div className="trait-edit-header">
                                <Field
                                  type="text"
                                  name={`personalityTraits.${index}.trait`}
                                  placeholder="Trait name"
                                  className="trait-name-input"
                                />
                                <button 
                                  type="button" 
                                  className="remove-button"
                                  onClick={() => remove(index)}
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </button>
                              </div>
                              {renderStarRating(
                                `personalityTraits.${index}.rating`,
                                values.personalityTraits[index].rating,
                                setFieldValue
                              )}
                            </div>
                          ))}
                          <button
                            type="button"
                            className="add-button"
                            onClick={() => push({ trait: "", rating: 3 })}
                          >
                            <FontAwesomeIcon icon={faPlus} /> Add Trait
                          </button>
                        </>
                      )}
                    </FieldArray>
                  </div>

                  {/* Education Section */}
                  <div className="update-profile-section">
                    <h3>Education</h3>
                    <div className="form-row">
                      <label htmlFor="degree">Degree</label>
                      <Field type="text" id="degree" name="education[0].degree" />
                    </div>
                    <div className="form-row">
                      <label htmlFor="institution">Institution</label>
                      <Field type="text" id="institution" name="education[0].institution" />
                    </div>
                    <div className="form-row">
                      <label htmlFor="period">Period</label>
                      <Field type="text" id="period" name="education[0].period" />
                    </div>
                    <div className="form-row">
                      <label htmlFor="faculty">Faculty</label>
                      <Field as="select" id="faculty" name="education[1].faculty">
                        <option value="">Select Faculty</option>
                        <option value="Media Engineering and Technology (MET)">Media Engineering and Technology (MET)</option>
                        <option value="Computer Science and Engineering">Computer Science and Engineering</option>
                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                        <option value="Electrical Engineering">Electrical Engineering</option>
                      </Field>
                    </div>
                    <div className="form-row">
                      <label htmlFor="semester">Semester</label>
                      <Field as="select" id="semester" name="education[1].semester">
                        <option value="">Select Semester</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                          <option key={num} value={num}>Semester {num}</option>
                        ))}
                      </Field>
                    </div>
                  </div>

                  {/* Skills Section */}
                  <div className="update-profile-section">
                    <h3>Skills</h3>
                    <FieldArray name="skills">
                      {({ push, remove }) => (
                        <div className="skills-edit-container">
                          <div className="skills-grid">
                            {values.skills.map((skill, index) => (
                              <div key={index} className="skill-tag-edit">
                                <Field
                                  type="text"
                                  name={`skills.${index}`}
                                  className="skill-input"
                                />
                                <button 
                                  type="button" 
                                  className="remove-skill"
                                  onClick={() => remove(index)}
                                >
                                  <FontAwesomeIcon icon={faTimes} />
                                </button>
                              </div>
                            ))}
                          </div>
                          <button
                            type="button"
                            className="add-button"
                            onClick={() => push("")}
                          >
                            <FontAwesomeIcon icon={faPlus} /> Add Skill
                          </button>
                        </div>
                      )}
                    </FieldArray>
                  </div>
                </div>

                <div className="update-profile-column">
                  {/* Job Interests Section */}
                  <div className="update-profile-section">
                    <h3>Job Interests</h3>
                    <FieldArray name="jobInterests">
                      {({ push, remove }) => (
                        <>
                          {values.jobInterests.map((interest, index) => (
                            <div key={index} className="job-interest-edit">
                              <div className="form-row">
                                <label htmlFor={`jobInterests-${index}-title`}>Job Title</label>
                                <Field
                                  type="text"
                                  id={`jobInterests-${index}-title`}
                                  name={`jobInterests.${index}.title`}
                                />
                              </div>
                              <div className="form-row">
                                <label htmlFor={`jobInterests-${index}-description`}>Description</label>
                                <Field
                                  as="textarea"
                                  id={`jobInterests-${index}-description`}
                                  name={`jobInterests.${index}.description`}
                                  rows="3"
                                />
                              </div>
                              <button
                                type="button"
                                className="remove-button"
                                onClick={() => remove(index)}
                              >
                                <FontAwesomeIcon icon={faTrash} /> Remove Job Interest
                              </button>
                              <hr className="section-divider" />
                            </div>
                          ))}
                          <button
                            type="button"
                            className="add-button"
                            onClick={() => push({ title: "", description: "" })}
                          >
                            <FontAwesomeIcon icon={faPlus} /> Add Job Interest
                          </button>
                        </>
                      )}
                    </FieldArray>
                  </div>

                  {/* Experience Section */}
                  <div className="update-profile-section">
                    <h3>Experience</h3>
                    <FieldArray name="experience">
                      {({ push, remove }) => (
                        <>
                          {values.experience.map((exp, index) => (
                            <div key={index} className="experience-edit">
                              <div className="form-row">
                                <label htmlFor={`experience-${index}-title`}>Title</label>
                                <Field
                                  type="text"
                                  id={`experience-${index}-title`}
                                  name={`experience.${index}.title`}
                                />
                              </div>
                              <div className="form-row">
                                <label htmlFor={`experience-${index}-company`}>Company</label>
                                <Field
                                  type="text"
                                  id={`experience-${index}-company`}
                                  name={`experience.${index}.company`}
                                />
                              </div>
                              <div className="form-row">
                                <label htmlFor={`experience-${index}-duration`}>Duration</label>
                                <Field
                                  type="text"
                                  id={`experience-${index}-duration`}
                                  name={`experience.${index}.duration`}
                                />
                              </div>
                              <div className="form-row">
                                <label>Responsibilities</label>
                                <FieldArray name={`experience.${index}.responsibilities`}>
                                  {({ push: pushResp, remove: removeResp }) => (
                                    <>
                                      {values.experience[index].responsibilities.map((resp, respIdx) => (
                                        <div key={respIdx} className="responsibility-input-row">
                                          <Field
                                            type="text"
                                            name={`experience.${index}.responsibilities.${respIdx}`}
                                            className="responsibility-input"
                                          />
                                          <button
                                            type="button"
                                            className="remove-responsibility"
                                            onClick={() => removeResp(respIdx)}
                                          >
                                            <FontAwesomeIcon icon={faTimes} />
                                          </button>
                                        </div>
                                      ))}
                                      <button
                                        type="button"
                                        className="add-responsibility"
                                        onClick={() => pushResp("")}
                                      >
                                        <FontAwesomeIcon icon={faPlus} /> Add Responsibility
                                      </button>
                                    </>
                                  )}
                                </FieldArray>
                              </div>
                              <button
                                type="button"
                                className="remove-button"
                                onClick={() => remove(index)}
                              >
                                <FontAwesomeIcon icon={faTrash} /> Remove Experience
                              </button>
                              <hr className="section-divider" />
                            </div>
                          ))}
                          <button
                            type="button"
                            className="add-button"
                            onClick={() => push({ title: "", company: "", duration: "", responsibilities: [""] })}
                          >
                            <FontAwesomeIcon icon={faPlus} /> Add Experience
                          </button>
                        </>
                      )}
                    </FieldArray>
                  </div>

                  {/* Internships Section */}
                  <div className="update-profile-section">
                    <h3>Internships</h3>
                    <FieldArray name="internships">
                      {({ push, remove }) => (
                        <>
                          {values.internships.map((internship, index) => (
                            <div key={index} className="internship-edit">
                              <div className="form-row">
                                <label htmlFor={`internships-${index}-title`}>Position</label>
                                <Field
                                  type="text"
                                  id={`internships-${index}-title`}
                                  name={`internships.${index}.title`}
                                />
                              </div>
                              <div className="form-row">
                                <label htmlFor={`internships-${index}-company`}>Company</label>
                                <Field
                                  type="text"
                                  id={`internships-${index}-company`}
                                  name={`internships.${index}.company`}
                                />
                              </div>
                              <div className="form-row">
                                <label htmlFor={`internships-${index}-period`}>Period</label>
                                <Field
                                  type="text"
                                  id={`internships-${index}-period`}
                                  name={`internships.${index}.period`}
                                />
                              </div>
                              <div className="form-row">
                                <label htmlFor={`internships-${index}-description`}>Description</label>
                                <Field
                                  as="textarea"
                                  id={`internships-${index}-description`}
                                  name={`internships.${index}.description`}
                                  rows="3"
                                />
                              </div>
                              <button
                                type="button"
                                className="remove-button"
                                onClick={() => remove(index)}
                              >
                                <FontAwesomeIcon icon={faTrash} /> Remove Internship
                              </button>
                              <hr className="section-divider" />
                            </div>
                          ))}
                          <button
                            type="button"
                            className="add-button"
                            onClick={() => push({ title: "", company: "", period: "", description: "" })}
                          >
                            <FontAwesomeIcon icon={faPlus} /> Add Internship
                          </button>
                        </>
                      )}
                    </FieldArray>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" onClick={onClose} className="cancel-button">
                  <FontAwesomeIcon icon={faTimes} /> Cancel
                </button>
                <button type="submit" className="save-button">
                  <FontAwesomeIcon icon={faSave} /> Save Changes
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}