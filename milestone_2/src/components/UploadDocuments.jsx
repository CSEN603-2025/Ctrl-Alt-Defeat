"use client";

// Import tools we need: React hooks to manage state and refs, and lottie-web to show animations
import React, { useState, useRef, useEffect } from 'react';
import Lottie from 'lottie-react';
// import animationData from '../../public/animted-cloud.json'; // Your Lottie JSON
import animationData from '../../public/cloud-icon.json'; // Your Lottie JSON
import { motion, AnimatePresence } from 'framer-motion';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp, faXmark, faTimes, faCheckCircle, faTimesCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import ActionButton from './shared/ActionButton';

// Create the main component for uploading documents
const UploadDocuments = ({ open, onClose, internshipId }) => {
  // States for Resume
  const [resumeFile, setResumeFile] = useState(null);
  const [isResumeUploading, setIsResumeUploading] = useState(false);
  const [resumeUploadComplete, setResumeUploadComplete] = useState(false);
  const [resumeUploadProgress, setResumeUploadProgress] = useState(0);
  const [resumeError, setResumeError] = useState('');
  const resumeFileInputRef = useRef(null);
  const resumeProgressIntervalRef = useRef(null);
  const resumeAnimationTimerRef = useRef(null);

  // States for Cover Letter
  const [coverLetterFile, setCoverLetterFile] = useState(null);
  const [isCoverLetterUploading, setIsCoverLetterUploading] = useState(false);
  const [coverLetterUploadComplete, setCoverLetterUploadComplete] = useState(false);
  const [coverLetterUploadProgress, setCoverLetterUploadProgress] = useState(0);
  const coverLetterFileInputRef = useRef(null);
  const coverLetterProgressIntervalRef = useRef(null);
  const coverLetterAnimationTimerRef = useRef(null);

  // Shared states
  const [coverLetterText, setCoverLetterText] = useState('');
  const [links, setLinks] = useState([{ id: Date.now(), value: '' }]);
  // Add state for animation
  const [animatingLinks, setAnimatingLinks] = useState({});

  // Feedback state for successful upload
  const [feedback, setFeedback] = useState(null);

  const resetUploadStates = (type) => {
    if (type === 'resume' || type === 'all') {
      setResumeFile(null);
      setIsResumeUploading(false);
      setResumeUploadComplete(false);
      setResumeUploadProgress(0);
      setResumeError('');
      if (resumeProgressIntervalRef.current) clearInterval(resumeProgressIntervalRef.current);
      if (resumeAnimationTimerRef.current) clearTimeout(resumeAnimationTimerRef.current);
    }
    if (type === 'coverLetter' || type === 'all') {
      setCoverLetterFile(null);
      setIsCoverLetterUploading(false);
      setCoverLetterUploadComplete(false);
      setCoverLetterUploadProgress(0);
      if (coverLetterProgressIntervalRef.current) clearInterval(coverLetterProgressIntervalRef.current);
      if (coverLetterAnimationTimerRef.current) clearTimeout(coverLetterAnimationTimerRef.current);
    }
  };

  useEffect(() => {
    if (!open) {
      resetUploadStates('all');
      setCoverLetterText('');
      setLinks([{ id: Date.now(), value: '' }]);
    }
    return () => {
      resetUploadStates('all'); // Cleanup on unmount
    };
  }, [open]);

  const handleFileChange = (e, type) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    let setFile, setIsUploading, setUploadComplete, setProgress, progressIntervalRef, animationTimerRef;

    if (type === 'resume') {
      resetUploadStates('resume');
      setFile = setResumeFile;
      setIsUploading = setIsResumeUploading;
      setUploadComplete = setResumeUploadComplete;
      setProgress = setResumeUploadProgress;
      progressIntervalRef = resumeProgressIntervalRef;
      animationTimerRef = resumeAnimationTimerRef;
      setResumeError(''); // Clear resume error on new selection
    } else { // coverLetter
      resetUploadStates('coverLetter');
      setFile = setCoverLetterFile;
      setIsUploading = setIsCoverLetterUploading;
      setUploadComplete = setCoverLetterUploadComplete;
      setProgress = setCoverLetterUploadProgress;
      progressIntervalRef = coverLetterProgressIntervalRef;
      animationTimerRef = coverLetterAnimationTimerRef;
    }

    setFile(selectedFile);
    setIsUploading(true);
    setUploadComplete(false); // Ensure complete is false during animation
    setProgress(0);
    let currentProgress = 0;
    const targetProgress = 100;
    const animationDuration = 5000;
    const progressUpdateInterval = 50;
    const totalSteps = animationDuration / progressUpdateInterval;
    const increment = targetProgress / totalSteps;

    progressIntervalRef.current = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= targetProgress) {
        setProgress(targetProgress);
        clearInterval(progressIntervalRef.current);
      } else {
        setProgress(Math.floor(currentProgress));
      }
    }, progressUpdateInterval);

    animationTimerRef.current = setTimeout(() => {
      setIsUploading(false);
      setUploadComplete(true); // Now mark as complete
      setProgress(100);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    }, animationDuration);
  };

  const handleTriggerFileInput = (type) => {
    if (type === 'resume') resumeFileInputRef.current.click();
    else coverLetterFileInputRef.current.click();
  };

  const handleRemoveFile = (type) => {
    resetUploadStates(type);
  };

  const handleAddLink = () => {
    const newLinkId = Date.now();
    // Set animating state for new link
    setAnimatingLinks(prev => ({ ...prev, [newLinkId]: 'entering' }));
    setLinks([...links, { id: newLinkId, value: '' }]);

    // Remove animation class after animation completes
    setTimeout(() => {
      setAnimatingLinks(prev => {
        const updated = { ...prev };
        delete updated[newLinkId];
        return updated;
      });
    }, 500);
  };

  const handleLinkChange = (id, newValue) => setLinks(links.map(link => (link.id === id ? { ...link, value: newValue } : link)));

  const handleRemoveLink = (idToRemove) => {
    if (links.length > 1) {
      // Set animating state for link being removed
      setAnimatingLinks(prev => ({ ...prev, [idToRemove]: 'exiting' }));

      // Remove after animation completes
      setTimeout(() => {
        setLinks(links.filter(link => link.id !== idToRemove));
      }, 300);
    }
  };

  const handleActualSubmit = () => {
    if (!resumeFile || !resumeUploadComplete) {
      setResumeError('Resume is required and must finish uploading.');
      return;
    }
    setResumeError('');

    console.log("Submitting Documents for internship:", internshipId, {
      resume: resumeFile ? resumeFile.name : null,
      coverLetterFile: coverLetterFile ? coverLetterFile.name : null,
      coverLetterText,
      links
    });

    // Show success feedback
    setFeedback('success');

    setTimeout(() => {
      setFeedback(null);
      console.log('Documents successfully submitted (simulated).');
      resetUploadStates('all');
      setCoverLetterText('');
      setLinks([{ id: Date.now(), value: '' }]);
      if (onClose) onClose(true, internshipId); // Indicate success and pass internshipId
    }, 1400);
  };

  const handleCancelAndClose = () => {
    resetUploadStates('all');
    setCoverLetterText('');
    setLinks([{ id: Date.now(), value: '' }]);
    if (onClose) onClose(false, null); // Indicate not a successful submission
  };

  const handleCoverLetterChange = (event) => setCoverLetterText(event.target.value);

  if (!open) return null;

  const renderUploadBox = (type) => {
    const isUploading = type === 'resume' ? isResumeUploading : isCoverLetterUploading;
    const file = type === 'resume' ? resumeFile : coverLetterFile;
    const uploadComplete = type === 'resume' ? resumeUploadComplete : coverLetterUploadComplete;
    const progress = type === 'resume' ? resumeUploadProgress : coverLetterUploadProgress;
    const title = type === 'resume' ? 'Resume' : 'Cover Letter';
    const isRequired = type === 'resume';

    return (
      <div style={{ width: '48%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
          <label style={{ color: '#2A5F74', fontSize: '16px', fontWeight: '600', display: 'block', textAlign: 'left' }}>
            {title} {isRequired && <span style={{ color: '#D32F2F'}}>*</span>}
          </label>

          {type === 'resume' && resumeError && (
            <div style={{ color: '#D32F2F', fontSize: '12px', textAlign: 'right', marginLeft: '12px' }}>{resumeError}</div>
          )}
        </div>

        <div style={{
          border: '2px dashed #318FA8', borderRadius: '30px',
          padding: '20px', textAlign: 'left', backgroundColor: '#FFFFFF',
          position: 'relative', display: 'flex', flexDirection: 'column',
          justifyContent: 'center', minHeight: '180px', width: '100%'
        }}>
          {isUploading && (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
              <div style={{ width: '120px', height: '120px', position: 'relative', margin: '0 auto 10px auto', zIndex: 10 }}>
                <Lottie animationData={animationData} loop={true} style={{ width: '100%', height: '100%' }} />
                <span style={{
                  position: 'absolute', top: '55%', left: '55%', transform: 'translate(-50%, -50%)',
                  color: '#2A5F74', fontSize: '20px', fontWeight: 'bold', zIndex: 11
                }}>{progress}%</span>
              </div>
            </div>
          )}

          {!isUploading && uploadComplete && file && (
            <div style={{
              backgroundColor: '#F0F9FB', padding: '10px 15px', borderRadius: '8px',
              fontSize: '14px', color: '#2A5F74', wordBreak: 'break-word',
              border: '1px solid #318FA8', marginTop: '10px', position: 'relative',
              paddingRight: '35px', width: 'calc(100% - 40px)', textAlign: 'left', margin: '0 auto'
            }}>
              {file.name}
              <button onClick={() => handleRemoveFile(type)} style={{
                position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)',
                background: 'transparent', border: 'none', cursor: 'pointer', color: '#318FA8', padding: 0
              }}>
                <FontAwesomeIcon icon={faXmark} style={{ width: '14px', height: '14px' }} />
              </button>
            </div>
          )}

          {!isUploading && !uploadComplete && (
            <button onClick={() => handleTriggerFileInput(type)} style={{
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '15px',
              backgroundColor: 'transparent',
              borderRadius: '20px',
              color: '#2A5F74',
              fontSize: '20px',
              gap: '8px',
              width: '144px',
              marginTop: '24px',
              border: 'none',
              alignSelf: 'center'
            }}>
              <FontAwesomeIcon icon={faCloudArrowUp} style={{ width: '32px', height: '32px', color: '#318FA8' }} />
              <span style={{ fontWeight: '700' }}>Upload</span>
            </button>
          )}
          <input
            type="file"
            ref={type === 'resume' ? resumeFileInputRef : coverLetterFileInputRef}
            onChange={(e) => handleFileChange(e, type)}
            style={{ display: 'none' }}
            accept=".pdf"
          />
        </div>
      </div>
    );
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 1000,
    }}>
      {/* Feedback overlay */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1100,
              background: 'rgba(42, 95, 116, 0.18)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              style={{
                background: 'white',
                padding: '25px',
                borderRadius: '15px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                maxWidth: '400px'
              }}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              <motion.div
                style={{
                  marginBottom: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: '#318FA8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ fontSize: 32, color: 'white' }}
                  />
                </div>
              </motion.div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2A5F74', marginBottom: '10px' }}>
                Success!
              </div>
              <div style={{ color: '#333', textAlign: 'center' }}>
                Your documents have been successfully uploaded.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main modal content */}
      <div style={{
        backgroundColor: '#F0F9FB', padding: '20px 40px', borderRadius: '10px',
        fontFamily: 'IBM Plex Sans, sans-serif', width: '900px',
        margin: '0 auto', position: 'relative', maxHeight: '90vh', overflowY: 'auto'
      }}>
        <button onClick={handleCancelAndClose} style={{
          position: 'absolute', top: '25px', right: '25px', background: 'transparent',
          border: 'none', cursor: 'pointer', fontSize: '20px', color: '#2A5F74'
        }}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h1 style={{ color: '#2A5F74', fontSize: '24px', fontWeight: '700', marginBottom: '20px', textAlign: 'left' }}>
          Upload Your Documents
        </h1>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', marginBottom: '20px' }}>
          {renderUploadBox('resume')}
          {renderUploadBox('coverLetter')}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ color: '#2A5F74', fontSize: '16px', fontWeight: '600', marginBottom: '10px', display: 'block', textAlign: 'left' }}>Write your own Cover Letter</label>
          <textarea value={coverLetterText} onChange={handleCoverLetterChange} placeholder="Type your cover letter here..." style={{
            width: '100%', height: '120px', border: '2px solid #318FA8', borderRadius: '20px',
            padding: '12px', fontSize: '14px', color: '#2A5F74', resize: 'vertical',
            fontFamily: 'IBM Plex Sans, sans-serif', backgroundColor: '#FFFFFF'
          }} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ color: '#2A5F74', fontSize: '16px', fontWeight: '600', display: 'block', marginBottom: '10px', textAlign: 'left' }}>Include a link to your GitHub profile and/or website</label>
          {links.map((link, index) => (
            <div
              key={link.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: index !== links.length - 1 ? '10px' : '0',
                opacity: animatingLinks[link.id] === 'entering' ? 0 : 1,
                transform: animatingLinks[link.id] === 'entering' ? 'translateY(-20px)' : 'translateY(0)',
                height: animatingLinks[link.id] === 'exiting' ? 0 : 'auto',
                overflow: 'hidden',
                transition: 'all 0.3s ease-in-out'
              }}
            >
              <div className="relative w-2/3">
                <input type="text" value={link.value} onChange={(e) => handleLinkChange(link.id, e.target.value)} placeholder="https://example.com" style={{
                  width: '100%', border: '2px solid #318FA8', borderRadius: '50px', padding: '10px 12px',
                  fontSize: '14px', color: '#2A5F74', fontFamily: 'IBM Plex Sans, sans-serif', backgroundColor: '#FFFFFF'
                }} />
              </div>
              {(links.length > 1 || index < links.length - 1) && index !== links.length - 1 && (
                <button
                  onClick={() => handleRemoveLink(link.id)}
                  style={{
                    backgroundColor: '#D32F2F',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#FFFFFF',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: '500',
                    padding: '0',
                    lineHeight: '1',
                    flexShrink: 0
                  }}
                >
                  -
                </button>
              )}
              {index === links.length - 1 && (
                <button
                  onClick={handleAddLink}
                  style={{
                    backgroundColor: '#318FA8',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#FFFFFF',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: '500',
                    padding: '0',
                    lineHeight: '0',
                    flexShrink: 0
                  }}
                >
                  +
                </button>
              )}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '30px' }}>
          <button
            onClick={handleCancelAndClose}
            style={{
              backgroundColor: '#C41E3A',
              color: 'white',
              padding: '12px 40px',
              borderRadius: '50px',
              border: 'none',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              width: '200px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'background-color 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#A01830'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#C41E3A'}
          >
            Cancel
          </button>
          <button
            onClick={handleActualSubmit}
            disabled={!resumeFile || !resumeUploadComplete || isResumeUploading}
            style={{
              backgroundColor: '#318FA8',
              color: 'white',
              padding: '12px 40px',
              borderRadius: '50px',
              border: 'none',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: !resumeFile || !resumeUploadComplete || isResumeUploading ? 'not-allowed' : 'pointer',
              width: '200px',
              opacity: (!resumeFile || !resumeUploadComplete || isResumeUploading) ? 0.7 : 1,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'background-color 0.2s ease'
            }}
            onMouseOver={(e) => !e.target.disabled && (e.target.style.backgroundColor = '#287A8F')} // Darker shade for hover
            onMouseOut={(e) => !e.target.disabled && (e.target.style.backgroundColor = '#318FA8')}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadDocuments;