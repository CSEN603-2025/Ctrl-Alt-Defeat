"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
  FaPen, FaComments, FaStar, FaDownload,
  FaMicrophone, FaVideo, FaDesktop, FaUsers,
  FaPlay, FaPause, FaStop, FaBell, FaPhoneSlash,
  FaArrowRight, FaClosedCaptioning
} from "react-icons/fa";
import BackButton from "./shared/BackButton";
import ActionButton from "./shared/ActionButton";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import WorkshopFeedback from './WorkshopFeedback';

const WORKSHOP_IMAGES = {
  WORKSHOP_BG: '/images/workshop1.jpg',  // Update with your actual image name
  INSTRUCTOR: '/images/instructor.jpg',   // Update with your actual image name
  PARTICIPANT: '/images/participant.jpg'  // Update with your actual image name
};

const WorkshopInterface = ({ workshop }) => {
  const [isLive, setIsLive] = useState(true);
  const [notes, setNotes] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [certificateUrl, setCertificateUrl] = useState("");
  const [isMicOn, setIsMicOn] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const videoRef = useRef(null);
  const [workshopCompleted, setWorkshopCompleted] = useState(false);
  const [hasAttendedMinimumTime, setHasAttendedMinimumTime] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [isPreRecorded, setIsPreRecorded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [isChatSliderOpen, setIsChatSliderOpen] = useState(false);
  const [workshopEnded, setWorkshopEnded] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [workshopStartTime, setWorkshopStartTime] = useState(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {  
      setWorkshopStartTime(new Date());
    }
  }, []);

  useEffect(() => {
    const attendanceCheck = setInterval(() => {
      if (workshopStartTime) {
        const timeSpent = (new Date() - workshopStartTime) / 1000 / 60; 
        if (timeSpent >= 45) { 
          setHasAttendedMinimumTime(true);
          clearInterval(attendanceCheck);
        }
      }
    }, 60000); 

    return () => clearInterval(attendanceCheck);
  }, [workshopStartTime]);

  useEffect(() => {
    if (workshopEnded && hasAttendedMinimumTime) {
      setShowFeedback(true);
    }
  }, [workshopEnded, hasAttendedMinimumTime]);

  const handleNoteChange = (e) => setNotes(e.target.value);
  const handleMessageChange = (e) => setNewMessage(e.target.value);
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const now = new Date();
      setMessages([
        ...messages, 
        { 
          text: newMessage, 
          sender: "You", 
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleRating = (rate) => setRating(rate);
  const handleFeedbackChange = (e) => setFeedback(e.target.value);
  const handleSubmitFeedback = () => {
    console.log("Rating:", rating, "Feedback:", feedback);
    generateCertificate();
    setShowFeedback(false);
  };

  const generateCertificate = () => {
    if (typeof window === "undefined") return;

    const certificateDiv = document.createElement("div");
    certificateDiv.innerHTML = certificateStyle + certificateHtml;
    document.body.appendChild(certificateDiv);

    html2canvas(certificateDiv.firstChild).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${workshop.title}_certificate.pdf`);
      
      document.body.removeChild(certificateDiv);
      setCertificateUrl(URL.createObjectURL(pdf.output("blob")));
    });
  };

  const toggleMicrophone = async () => {
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsMicOn(!isMicOn);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const toggleCamera = async () => {
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = videoStream;
      }
      setIsCameraOn(!isCameraOn);
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const toggleScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia();
      if (videoRef.current) {
        videoRef.current.srcObject = screenStream;
      }
      setIsScreenSharing(!isScreenSharing);
    } catch (err) {
      console.error("Error sharing screen:", err);
    }
  };

  const handleNewMessage = (message) => {
    setMessages(prev => [...prev, message]);
    if (!isChatSliderOpen) {
      setUnreadMessages(prev => prev + 1);
    }
  };

  useEffect(() => {
    if (isChatSliderOpen) {
      setUnreadMessages(0);
    }
  }, [isChatSliderOpen]);

  const handleLeaveWorkshop = () => {
    if (!workshopEnded) {
      const confirm = window.confirm(
        'Are you sure you want to leave? You won\'t receive a certificate if you leave before the workshop ends.'
      );
      if (confirm) {
        setIsLeaving(true);
        setIsLive(false);
      }
    } else {
      setIsLive(false);
      if (hasAttendedMinimumTime) {
        setShowFeedback(true);
      }
    }
  };

  const handleSaveNotes = () => {
    const element = document.createElement("a");
    const file = new Blob([notes], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "workshop-notes.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleWorkshopEnd = () => {
    setWorkshopEnded(true);
    setShowFeedback(true);
  };

  const videoGridStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "100%",
    marginBottom: "80px",
  };

  const mainVideoStyle = {
    width: "100%",
    height: "500px",
    backgroundColor: "#2A5F74",
    borderRadius: "10px",
    overflow: "hidden",
    position: "relative",
    zIndex: 1,
  };

  const participantsGridStyle = {
    display: "flex",
    justifyContent: "right",
    alignItems: "center",
    padding: "10px",
    width: "100%",
  };

  const participantStyle = {
    position: "relative",
    width: "250px",
    height: "130px",
    backgroundColor: "#D9F0F4",
    borderRadius: "10px",
    overflow: "hidden",
    border: "2px solid #318FA8",
  };

  const thumbnailStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  const participantNameStyle = {
    position: "absolute",
    bottom: "5px",
    left: "5px",
    color: "white",
    fontSize: "12px",
    textShadow: "0 1px 2px rgba(0,0,0,0.5)",
  };

  const containerStyle = {
    display: 'flex',
    height: '100vh',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease-in-out',
  };

  const panelStyle = {
    padding: "20px",
    border: "2px solid #318FA8",
    borderRadius: "10px",
    backgroundColor: "white",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 40px)",
    transition: 'all 0.3s ease-in-out',
    flex: 1,
    position: 'relative',
    zIndex: 2,
    marginLeft: isChatOpen ? '300px' : '0',
    marginRight: isNotesOpen ? '300px' : '0',
    width: `calc(100% - ${isChatOpen ? '300px' : '0'} - ${isNotesOpen ? '300px' : '0'})`,
    overflow: 'hidden',
  };

  const chatPanelStyle = {
    position: 'fixed',
    left: 0,
    top: 0,
    height: '100vh',
    width: '300px',
    backgroundColor: '#fff',
    boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
    transform: `translateX(${isChatOpen ? '0' : '-300px'})`,
    transition: 'transform 0.3s ease-in-out',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
  };

  const notesPanelStyle = {
    position: 'fixed',
    right: 0,
    top: 0,
    height: '100vh',
    width: '300px',
    backgroundColor: '#fff',
    boxShadow: '-2px 0 10px rgba(0,0,0,0.1)',
    transform: `translateX(${isNotesOpen ? '0' : '300px'})`,
    transition: 'transform 0.3s ease-in-out',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  };

  const videoPlaceholderStyle = {
    textAlign: "center",
    marginBottom: "10px",
    position: "relative",
  };

  const videoTextStyle = {
    color: "#2A5F74",
    fontSize: "14px",
    position: "absolute",
    bottom: "5px",
    left: "50%",
    transform: "translateX(-50%)",
  };

  const controlsStyle = {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "10px",
  };

  const buttonStyle = {
    padding: "10px",
    background: "#D9F0F4",
    border: "2px solid #318FA8",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "16px",
  };

  const titleStyle = {
    color: "#2A5F74",
    fontSize: "24px",
    marginBottom: "20px",
  };

  const contentStyle = {
    color: "#2A5F74",
    fontSize: "16px",
  };

  const feedbackSectionStyle = {
    marginTop: "20px",
  };

  const feedbackTitleStyle = {
    color: "#2A5F74",
    fontSize: "20px",
    marginBottom: "10px",
  };

  const starsStyle = {
    marginBottom: "10px",
  };

  const starStyle = {
    fontSize: "20px",
    margin: "0 5px",
    cursor: "pointer",
  };

  const feedbackInputStyle = {
    width: "100%",
    height: "100px",
    padding: "10px",
    border: "2px solid #318FA8",
    borderRadius: "5px",
    marginTop: "10px",
    fontFamily: "'IBM Plex Sans', sans-serif",
  };

  const submitButtonStyle = {
    marginTop: "10px",
    padding: "10px 20px",
    background: "#D9F0F4",
    border: "2px solid #318FA8",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const rightPanelStyle = {
    position: "relative",
    height: "100%",
  };

  const chatToggleStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    padding: "10px",
    background: "#D9F0F4",
    border: "2px solid #318FA8",
    borderRadius: "50%",
    cursor: "pointer",
    zIndex: 10,
  };

  const notesSectionStyle = {
    height: "100%",
    overflowY: "auto",
  };

  const notesTitleStyle = {
    color: "#2A5F74",
    fontSize: "18px",
    marginBottom: "10px",
  };

  const notesInputStyle = {
    width: "100%",
    height: "80%",
    padding: "10px",
    border: "2px solid #318FA8",
    borderRadius: "5px",
    marginTop: "10px",
    fontFamily: "'IBM Plex Sans', sans-serif",
  };

  const chatSectionStyle = {
    height: "100%",
    overflowY: "auto",
  };

  const chatTitleStyle = {
    color: "#2A5F74",
    fontSize: "18px",
    marginBottom: "10px",
  };

  const messagesStyle = {
    height: "70%",
    overflowY: "auto",
    border: "2px solid #318FA8",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  const messageStyle = {
    margin: "5px 0",
  };

  const messageStrongStyle = {
    color: "#2A5F74",
  };

  const chatInputContainerStyle = {
    display: 'flex',
    gap: '10px',
    padding: '15px',
    borderTop: '1px solid #eee',
  };

  const chatInputStyle = {
    flex: 1,
    padding: '12px',
    border: '2px solid #318FA8',
    borderRadius: '25px',
    outline: 'none',
  };

  const circularNavStyle = {
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(90deg, #D9F0F4, #318FA8)",
    borderRadius: "30px",
    padding: "10px 25px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    gap: "15px",
    zIndex: 100,
  };

  const navButtonStyle = {
    padding: "12px",
    background: "white",
    border: "2px solid #2A5F74",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "18px",
    color: "#2A5F74",
    transition: "all 0.3s ease",
    width: "45px",
    height: "45px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      transform: "scale(1.1)",
      backgroundColor: "#D9F0F4",
    },
  };

  const NavButton = ({ icon: Icon, tooltip, onClick, active }) => (
    <div className="tooltip-container">
      <button 
        onClick={onClick}
        style={{
          ...navButtonStyle,
          backgroundColor: active ? "#318FA8" : "white",
          color: active ? "white" : "#2A5F74",
        }}
      >
        <Icon />
      </button>
      <span className="tooltip">
        {tooltip}
      </span>
    </div>
  );

  const tooltipStyle = {
    position: 'absolute',
    bottom: '-25px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(0,0,0,0.8)',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    whiteSpace: 'nowrap',
    opacity: 0,
    transition: 'opacity 0.2s',
    pointerEvents: 'none',
  };

  const chatIconStyle = {
    position: 'fixed',
    top: '20px',
    left: '20px',
    padding: '12px',
    background: 'white',
    border: '2px solid #318FA8',
    borderRadius: '50%',
    cursor: 'pointer',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const unreadBadgeStyle = {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    background: '#FF4444',
    color: 'white',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const SendMessageButton = () => (
    <button
      onClick={handleSendMessage}
      style={{
        background: '#318FA8',
        border: 'none',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
      }}
    >
      <FaArrowRight color="white" size={16} />
    </button>
  );

  const VideoControls = () => {
    if (!isClient) return null;
    
    return (
      <div style={controlsContainerStyle}>
        {/* Subtitles container (replacing participant panel) */}
        <div style={{
          width: "190px",
          height: "120px",
          padding: '8px',
          background: showSubtitles ? 'white' : 'transparent',
          borderRadius: '10px',
          border: showSubtitles ? '1px solid #318FA8' : 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#2A5F74',
          transition: 'all 0.3s ease-in-out',
          opacity: showSubtitles ? 1 : 0,
          visibility: showSubtitles ? 'visible' : 'hidden',
          overflow: 'hidden',
        }}>
          {showSubtitles && (
            <p style={{ 
              margin: 0, 
              padding: '4px', 
              textAlign: 'center',
              fontSize: '13px',
              width: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              wordWrap: 'break-word',
            }}>
              Live subtitles will appear here...
            </p>
          )}
        </div>

        {/* Participant rectangle (replacing end workshop button position) */}
        <div style={participantsGridStyle}>
          <div style={{
            ...participantStyle,
            width: "190px",
            height: "120px",
          }}>
            <Image 
              src="/images/default-avatar.png"
              alt="Default Avatar"
              width={24}
              height={24}
              style={avatarStyle}
            />
            <span style={participantNameStyle}>John Doe</span>
          </div>
        </div>
      </div>
    );
  };

  const controlsContainerStyle = {
    display: "grid",
    gridTemplateColumns: "195px 1fr 200px",
    gap: "15px",
    alignItems: "center",
    width: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    padding: "10px",
    marginBottom: "150px",
  };

  const certificateStyle = `
  <style>
    .certificate {
      width: 800px;
      height: 600px;
      padding: 20px;
      text-align: center;
      border: 10px solid #318FA8;
      background-color: white;
    }
    .certificate-title {
      font-size: 50px;
      color: #2A5F74;
    }
    .certificate-content {
      margin: 20px;
      font-size: 20px;
    }
    .tooltip-container {
      position: relative;
    }
  </style>
`;

const certificateHtml = `
  <div class="certificate">
    <div class="certificate-title">Certificate of Completion</div>
    <div class="certificate-content">
      This is to certify that you have successfully completed the workshop:<br/>
      <strong>${workshop?.title || 'Workshop'}</strong>
    </div>
  </div>
`;

const tooltipStyles = `
  .tooltip-container {
    position: relative;
  }
  
  .tooltip-container .tooltip {
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s, visibility 0.2s;
  }

  .tooltip-container:hover .tooltip {
    opacity: 1;
    visibility: visible;
  }
`;

const avatarStyle = {
  width: "24px",
  height: "24px",
  borderRadius: "50%",
  objectFit: "cover",
  border: "2px solid #318FA8",
};

const downloadCertificateStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "10px 20px",
  background: "#D9F0F4",
  border: "2px solid #318FA8",
  borderRadius: "5px",
  color: "#2A5F74",
  textDecoration: "none",
  cursor: "pointer",
  marginTop: "10px"
};

const chatHeaderStyle = {
  padding: '20px',
  background: '#318FA8',
  color: 'white',
  fontSize: '18px',
  fontWeight: '500',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
};

const chatMessageStyle = {
  display: 'flex',
  gap: '10px',
  alignItems: 'flex-start',
  marginBottom: '15px',
  padding: '12px',
  borderRadius: '12px',
  backgroundColor: '#f8f9fa',
  margin: '10px',
};

const sendButtonStyle = {
  background: '#318FA8',
  color: 'white',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const saveButtonStyle = {
  padding: '12px 24px',
  background: '#318FA8',
  color: 'white',
  border: 'none',
  borderRadius: '25px',
  cursor: 'pointer',
  marginTop: '15px',
  fontWeight: '500',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  transition: 'all 0.3s ease',
  boxShadow: '0 2px 8px rgba(49, 143, 168, 0.2)',
  '&:hover': {
    background: '#2A5F74',
    boxShadow: '0 4px 12px rgba(49, 143, 168, 0.3)',
  },
};

return (
  <>
    <style>{tooltipStyles}</style>
    {isClient && (
      <div style={containerStyle}>
        {/* Chat Panel */}
        <div style={chatPanelStyle}>
          <div style={chatHeaderStyle}>Chat</div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '15px' }}>
            {messages.map((msg, index) => (
              <div key={index} style={chatMessageStyle}>
                <div style={{ flex: 1 }}>
                  <strong>{msg.sender}</strong>
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={chatInputContainerStyle}>
            <input
              value={newMessage}
              onChange={handleMessageChange}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              style={chatInputStyle}
            />
            <button style={sendButtonStyle} onClick={handleSendMessage}>
              <FaArrowRight />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div style={panelStyle}>
          <BackButton />
          <div style={videoGridStyle}>
            <div style={mainVideoStyle}>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted={isMicOn}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <VideoControls />
          </div>
        </div>

        {/* Notes Panel */}
        <div style={notesPanelStyle}>
          <h3 style={notesTitleStyle}>Notes</h3>
          <textarea
            value={notes}
            onChange={handleNoteChange}
            placeholder="Take notes here..."
            style={notesInputStyle}
          />
          <button 
            onClick={handleSaveNotes} 
            style={saveButtonStyle}
          >
            <FaDownload /> Save Notes
          </button>
        </div>

        {/* Circular Navigation with all icons */}
        <div style={circularNavStyle}>
          <NavButton 
            icon={FaMicrophone} 
            tooltip="Microphone" 
            onClick={toggleMicrophone} 
            active={isMicOn} 
          />
          <NavButton 
            icon={FaVideo} 
            tooltip="Camera" 
            onClick={toggleCamera} 
            active={isCameraOn} 
          />
          <NavButton 
            icon={FaDesktop} 
            tooltip="Share Screen" 
            onClick={toggleScreenShare} 
            active={isScreenSharing} 
          />
          <NavButton 
            icon={FaComments} 
            tooltip="Chat" 
            onClick={() => setIsChatOpen(!isChatOpen)} 
            active={isChatOpen}
          />
          <NavButton 
            icon={FaPen} 
            tooltip="Notes" 
            onClick={() => setIsNotesOpen(!isNotesOpen)} 
            active={isNotesOpen}
          />
          <NavButton 
            icon={FaClosedCaptioning} 
            tooltip="Subtitles" 
            onClick={() => setShowSubtitles(!showSubtitles)} 
            active={showSubtitles}
          />
        </div>

        {/* Test Button */}
        <button 
          style={{
            position: 'absolute',
            bottom: '100px',
            right: '20px',
            padding: '10px 20px',
            background: '#318FA8',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            cursor: 'pointer',
            zIndex: 1000,
          }} 
          onClick={handleWorkshopEnd}
        >
          End Workshop & Show Feedback
        </button>

        {showFeedback && (
          <WorkshopFeedback 
            isOpen={showFeedback}
            onClose={() => setShowFeedback(false)}
            workshopTitle={workshop?.title || 'Workshop'}
            studentName="John Doe"
            workshopEnded={workshopEnded}
          />
        )}
      </div>
    )}
  </>
);
};

export default WorkshopInterface;