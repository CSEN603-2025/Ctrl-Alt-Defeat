import { useState } from 'react';
import { FaStar, FaDownload, FaEye } from 'react-icons/fa';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const WorkshopFeedback = ({ isOpen, onClose, workshopTitle, studentName, workshopEnded }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showCertificate, setShowCertificate] = useState(false);
  const [certificateUrl, setCertificateUrl] = useState('');
  const [error, setError] = useState(null);

  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '90%',
    maxWidth: '500px',
    zIndex: 1000,
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  };

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '12px 24px',
    background: '#318FA8',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '14px',
    fontWeight: '500',
  };

  const errorStyle = {
    color: 'red',
    marginBottom: '15px',
    textAlign: 'center',
  };

  const generateCertificate = async () => {
    try {
      const loadFont = new Promise((resolve) => {
        const fontLink = document.createElement('link');
        fontLink.href = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;600;700&display=swap';
        fontLink.rel = 'stylesheet';
        fontLink.onload = resolve;
        fontLink.onerror = resolve;
        document.head.appendChild(fontLink);
      });
  
      await loadFont;
      await document.fonts.ready; // Ensure font is loaded
  
      const certificateHtml = `<div id="certificate" style="...">...</div>`; // Keep as is
  
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'fixed';
      tempDiv.style.top = '0';
      tempDiv.style.left = '0';
      tempDiv.style.visibility = 'hidden';
      tempDiv.innerHTML = certificateHtml;
      document.body.appendChild(tempDiv);
  
      await new Promise((resolve) => setTimeout(resolve, 100));
  
      const certElement = tempDiv.querySelector('#certificate');
      if (!certElement) throw new Error("Certificate element not found.");
  
      const canvas = await html2canvas(certElement, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
  
      document.body.removeChild(tempDiv);
  
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [800, 600],
      });
  
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 800, 600);
      const pdfBlob = pdf.output('blob');
      const url = URL.createObjectURL(pdfBlob);
      setCertificateUrl(url);
      pdf.save(`${workshopTitle || 'Sample'}-Certificate.pdf`);
      setError(null);
    } catch (err) {
      console.error('Error generating certificate:', err);
      setError('Failed to generate certificate. Please try again.');
    }
  };
  

  const handleSubmit = () => {
    if (rating === 0) {
      alert('Please rate the workshop before submitting');
      return;
    }
    setShowCertificate(true);
    generateCertificate();
  };

  const viewCertificate = () => {
    if (certificateUrl) {
      window.open(certificateUrl, '_blank');
    }
  };

  if (!isOpen || !workshopEnded) return null;

  return (
    <>
      <div style={overlayStyle} onClick={onClose} />
      <div style={modalStyle}>
        {!showCertificate ? (
          <>
            <h2 style={{ color: '#2A5F74', marginBottom: '20px', textAlign: 'center' }}>
              Workshop Feedback
            </h2>
            
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px'
            }}>
              <p style={{ color: '#2A5F74', marginBottom: '10px' }}>How would you rate this workshop?</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '24px',
                      color: star <= rating ? '#e2dd55' : '#D9F0F4',
                      cursor: 'pointer',
                    }}
                  >
                    <FaStar />
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your thoughts about the workshop..."
              style={{
                width: '100%',
                minHeight: '120px',
                padding: '12px',
                borderRadius: '8px',
                border: '2px solid #2A5F74',
                marginBottom: '20px',
                resize: 'vertical',
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '15px' }}>
              <button onClick={handleSubmit} style={buttonStyle}>
                Submit Feedback
              </button>
              <button
                onClick={onClose}
                style={{
                  ...buttonStyle,
                  background: '#D9F0F4',
                  color: '#2A5F74',
                }}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: '#2A5F74', marginBottom: '20px' }}>
              Thank you for your feedback!
            </h2>
            <p style={{ marginBottom: '30px', color: '#2A5F74' }}>
              You can now download your certificate of attendance.
            </p>
            {error && <p style={errorStyle}>{error}</p>}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
              <button onClick={generateCertificate} style={buttonStyle}>
                <FaDownload /> Download Certificate
              </button>
              {certificateUrl && (
                <button onClick={viewCertificate} style={{ ...buttonStyle, background: '#2A5F74' }}>
                  <FaEye /> View Certificate
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WorkshopFeedback;