"use client";

import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPhone, 
  faPhoneSlash, 
  faMicrophone, 
  faMicrophoneSlash, 
  faVideo, 
  faVideoSlash,
  faDesktop,
  faUserCircle,
  faComments,
  faNoteSticky,
  faXmark
} from '@fortawesome/free-solid-svg-icons';

// Global state for active call
let globalCallState = {
  activeCall: null,
  showCallInterface: false,
  isOutgoingCall: false
};

// Incoming Call Notification Component
export const CallNotification = ({ caller, onAccept, onReject }) => {
  const [timeLeft, setTimeLeft] = useState(30);
  
  // Auto-reject call after 30 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onReject();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [onReject]);
  
  return (
    <div className="bg-gray-800 rounded-2xl shadow-xl p-4 max-w-sm w-full flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative">
          <img 
            src={caller.profileImage || "/images/student.png"} 
            alt={caller.name}
            className="w-14 h-14 rounded-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-bold text-white text-xl">{caller.name}</h4>
          <p className="text-gray-300">is calling</p>
        </div>
      </div>
      
      <div className="flex gap-3">
        <button 
          onClick={onReject}
          className="bg-red-600 hover:bg-red-700 w-12 h-12 rounded-full flex items-center justify-center transition-colors"
          aria-label="Decline call"
        >
          <FontAwesomeIcon icon={faPhoneSlash} className="text-white" />
        </button>
        <button 
          onClick={onAccept}
          className="bg-green-500 hover:bg-green-600 w-12 h-12 rounded-full flex items-center justify-center transition-colors"
          aria-label="Answer call"
        >
          <FontAwesomeIcon icon={faPhone} className="text-white" />
        </button>
      </div>
    </div>
  );
};

// Main Call Interface Component
export const CallInterface = ({ isOpen, onClose, caller = {}, isOutgoing = false }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(false); // Changed to false to have camera off by default
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callStatus, setCallStatus] = useState(isOutgoing ? 'calling' : 'connected');
  const [callDuration, setCallDuration] = useState(0);
  const [showRemoteVideo, setShowRemoteVideo] = useState(!isOutgoing);
  const [callAccepted, setCallAccepted] = useState(!isOutgoing);
  const [showChat, setShowChat] = useState(false); 
  const [showNotes, setShowNotes] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [noteContent, setNoteContent] = useState('');
  const [currentMessage, setCurrentMessage] = useState('');
  
  const timerRef = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  
  // Get current user from session
  const currentUser = typeof window !== 'undefined' ? 
    JSON.parse(sessionStorage.getItem('userSession') || localStorage.getItem('userSession') || '{}') : {};
  
  // Handle outgoing call simulation
  useEffect(() => {
    // If it's an outgoing call, wait 5 seconds then "connect"
    if (isOutgoing && callStatus === 'calling') {
      // After 3 seconds, show connecting status
      const connectingTimer = setTimeout(() => {
        setCallStatus('connecting');
      }, 3000);
      
      // After 5 seconds total, show connected status
      const connectedTimer = setTimeout(() => {
        setCallStatus('connected');
        setShowRemoteVideo(true);
        
        // Delay setting callAccepted to create a visible transition
        setTimeout(() => {
          setCallAccepted(true);
        }, 500);
      }, 5000);
      
      return () => {
        clearTimeout(connectingTimer);
        clearTimeout(connectedTimer);
      };
    }
    
    return () => {};
  }, [isOutgoing, callStatus, caller?.name]);
  
  // Setup media stream and timer when call is connected
  useEffect(() => {
    // Always set up local video stream immediately
    if (isVideoEnabled && navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          // Set local video stream
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
          
          // For demo purposes, use the same stream for remote video
          // but only after call is accepted
          if (remoteVideoRef.current && callAccepted) {
            remoteVideoRef.current.srcObject = stream;
          }
        })
        .catch(error => {
          console.error("Error accessing camera/microphone:", error);
          setIsVideoEnabled(false);
        });
    }
    
    // Start call duration timer only when connected
    if (callStatus === 'connected') {
      timerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    
    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      // Stop all media tracks when component unmounts or call ends
      if (localVideoRef.current?.srcObject) {
        localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [callStatus, isVideoEnabled, callAccepted]);
  
  // Format call duration as MM:SS
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Toggle mute
  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    
    // In a real implementation, this would mute the audio track
    if (localVideoRef.current?.srcObject) {
      const audioTracks = localVideoRef.current.srcObject.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = isMuted; // Toggle the current state
      });
    }
  };
  
  // Toggle video
  const handleToggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    
    // In a real implementation, this would enable/disable video
    if (localVideoRef.current?.srcObject) {
      const videoTracks = localVideoRef.current.srcObject.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !isVideoEnabled; // Toggle the current state
      });
    }
  };
  
  // Toggle screen sharing
  const handleToggleScreenShare = () => {
    // Implementation for screen sharing would use getDisplayMedia API
    if (!isScreenSharing && navigator.mediaDevices?.getDisplayMedia) {
      navigator.mediaDevices.getDisplayMedia({ video: true })
        .then(stream => {
          const currentStream = localVideoRef.current?.srcObject;
          
          // Set screen sharing stream
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
          
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = stream;
          }
          
          // Listen for end of screen sharing
          stream.getVideoTracks()[0].onended = () => {
            // Restore camera stream when screen sharing ends
            if (localVideoRef.current) {
              localVideoRef.current.srcObject = currentStream;
            }
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = currentStream;
            }
            setIsScreenSharing(false);
          };
          
          setIsScreenSharing(true);
        })
        .catch(error => {
          console.error("Error sharing screen:", error);
        });
    } else {
      // Stop screen sharing
      if (isScreenSharing && localVideoRef.current?.srcObject) {
        const tracks = localVideoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        
        // Restart camera if video was enabled
        if (isVideoEnabled) {
          navigator.mediaDevices.getUserMedia({ video: true, audio: !isMuted })
            .then(stream => {
              if (localVideoRef.current) localVideoRef.current.srcObject = stream;
              if (remoteVideoRef.current) localVideoRef.current.srcObject = stream;
            });
        }
      }
      setIsScreenSharing(false);
    }
  };
  
  // Toggle chat visibility
  const handleToggleChat = () => {
    setShowChat(!showChat);
    // Close notes if open
    if (showNotes) setShowNotes(false);
  };

  // Toggle notes visibility  
  const handleToggleNotes = () => {
    setShowNotes(!showNotes);
    // Close chat if open
    if (showChat) setShowChat(false);
  };

  // Handle sending a chat message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      sender: currentUser.name || 'You',
      content: currentMessage,
      timestamp: new Date(),
      isSelf: true
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    setCurrentMessage('');
    
    // Simulate a response after 1-3 seconds
    setTimeout(() => {
      const response = {
        id: Date.now() + 1,
        sender: caller.name || 'Caller',
        content: getAutoResponse(currentMessage),
        timestamp: new Date(),
        isSelf: false
      };
      
      setChatMessages(prev => [...prev, response]);
    }, Math.random() * 2000 + 1000);
  };
  
  // Get a simple auto-response for demo purposes
  const getAutoResponse = (message) => {
    const responses = [
      "I see. That makes sense.",
      "Thanks for letting me know.",
      "Got it!",
      "That's interesting.",
      "Let's discuss that further during our meeting.",
      "I'll make a note of that.",
      "Perfect, I'll look into it."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  // Handle saving notes
  const handleSaveNotes = () => {
    toast.success('Notes saved successfully!');
  };

  // End call
  const handleEndCall = (participantLeft = false) => {
    // Stop all media tracks
    if (localVideoRef.current?.srcObject) {
      localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    
    // Call onClose WITHOUT passing the participantLeft parameter
    // This ensures the parent's handleEndCall always treats it as you ending the call
    onClose(false);
  };
  
  // If the call is not open, don't render anything
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-metallica-blue-50 bg-opacity-40 backdrop-blur-sm">
      <div className="w-full max-w-4xl bg-white overflow-hidden shadow-xl relative rounded-2xl border-2 border-metallica-blue-200 flex flex-row">
        {/* Left side - Main video area */}
        <div className={`${showChat || showNotes ? 'w-3/5' : 'w-full'} transition-all duration-300 ease-in-out`}>
          {/* Call header */}
          <div className="bg-metallica-blue-50 p-4 flex justify-between items-center border-b border-metallica-blue-100">
            <div>
              <h3 className="font-semibold text-xl text-metallica-blue-800">
                {isOutgoing && !callAccepted ? `Calling ${caller.name || 'User'}...` : `Call with ${caller.name || 'User'}`}
              </h3>
              <p className="text-sm text-metallica-blue-600">
                {callStatus === 'connected' 
                  ? `Connected • ${formatDuration(callDuration)}` 
                  : callStatus === 'connecting' 
                  ? 'Connecting...' 
                  : 'Calling...'}
              </p>
            </div>
            
            {/* Notes toggle button in header */}
            <button 
              onClick={handleToggleNotes}
              className={`rounded-full p-2 transition-colors ${
                showNotes ? 'bg-metallica-blue-500 text-white' : 'bg-metallica-blue-50 text-metallica-blue-700 hover:bg-metallica-blue-100'
              }`}
              aria-label="Toggle notes"
            >
              <FontAwesomeIcon icon={faNoteSticky} className="text-lg" />
            </button>
          </div>
          
          {/* Call content area */}
          <div className="w-full relative">
            {isOutgoing && !callAccepted ? (
              // Initial outgoing call view - only shows caller's video centered with "You" label
              <div className="w-full flex flex-col items-center justify-center p-4 bg-white">
                <div className="w-full h-[50vh] bg-metallica-blue-50 rounded-lg overflow-hidden relative">
                  {isVideoEnabled ? (
                    <video 
                      ref={localVideoRef} 
                      autoPlay 
                      playsInline 
                      muted 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center flex-col">
                      <FontAwesomeIcon icon={faUserCircle} className="text-metallica-blue-300 text-7xl mb-3" />
                      <p className="text-metallica-blue-600 text-lg">Camera is off</p>
                    </div>
                  )}
                </div>
                <div className="mt-3 text-center text-metallica-blue-700 text-lg font-medium">
                  You
                </div>
              </div>
            ) : (
              // Connected call view with main video display
              <div className="relative w-full h-full">
                {/* Main video (center) */}
                <div className={`w-full h-[50vh] rounded-lg overflow-hidden bg-metallica-blue-50 ${showRemoteVideo ? 'animate-fadeIn' : 'opacity-0'}`}>
                  {showRemoteVideo && isVideoEnabled ? (
                    <video 
                      ref={remoteVideoRef} 
                      autoPlay 
                      playsInline 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center flex-col">
                      <FontAwesomeIcon icon={faUserCircle} className="text-metallica-blue-300 text-7xl mb-3" />
                      <p className="text-metallica-blue-600 text-lg">Camera is off</p>
                    </div>
                  )}
                  
                  {/* Remote user name label */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
                    <div className="bg-white bg-opacity-80 px-4 py-2 rounded-full text-metallica-blue-800 text-lg font-medium shadow-sm">
                      {caller.name || "Caller"}
                    </div>
                  </div>
                  
                  {/* Screen sharing indicator */}
                  {isScreenSharing && (
                    <div className="absolute top-4 left-4 bg-white bg-opacity-80 px-3 py-1 rounded-full text-metallica-blue-800 text-sm shadow-sm">
                      Screen sharing
                    </div>
                  )}
                </div>
                
                {/* Local video (PiP in bottom right corner) */}
                <div className="absolute bottom-16 right-4 w-1/5 aspect-video bg-metallica-blue-50 rounded-lg overflow-hidden border-2 border-white shadow-md">
                  {isVideoEnabled ? (
                    <video 
                      ref={localVideoRef} 
                      autoPlay 
                      playsInline 
                      muted
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center flex-col">
                      <FontAwesomeIcon icon={faUserCircle} className="text-metallica-blue-300 text-2xl mb-1" />
                      <p className="text-metallica-blue-600 text-xs">Camera is off</p>
                    </div>
                  )}
                  
                  {/* Your name label */}
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-80 px-2 py-1 rounded-full text-metallica-blue-800 text-xs shadow-sm">
                    You
                  </div>
                </div>
                
                {/* Volume slider on the left side */}
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full py-4 px-1 shadow-sm">
                  <div className="h-32 flex flex-col items-center">
                    <FontAwesomeIcon icon={isMuted ? faMicrophoneSlash : faMicrophone} className="text-metallica-blue-800 text-sm mb-2" />
                    <div className="bg-metallica-blue-100 w-1 h-24 rounded-full relative">
                      <div className="absolute bottom-0 w-1 bg-metallica-blue-500 rounded-full" style={{ height: isMuted ? '0%' : '80%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Call controls - circular buttons at the bottom */}
          <div className="bg-white p-6 flex justify-center gap-5 border-t border-metallica-blue-100">
            <button 
              onClick={handleToggleMute} 
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-md ${
                isMuted ? 'bg-red-500' : 'bg-metallica-blue-50 hover:bg-metallica-blue-100'
              }`}
              title={isMuted ? "Unmute" : "Mute"}
            >
              <FontAwesomeIcon icon={isMuted ? faMicrophoneSlash : faMicrophone} className={`${isMuted ? 'text-white' : 'text-metallica-blue-700'} text-lg`} />
            </button>
            
            <button 
              onClick={handleToggleVideo} 
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-md ${
                !isVideoEnabled ? 'bg-red-500' : 'bg-metallica-blue-50 hover:bg-metallica-blue-100'
              }`}
              title={isVideoEnabled ? "Turn off camera" : "Turn on camera"}
            >
              <FontAwesomeIcon icon={isVideoEnabled ? faVideo : faVideoSlash} className={`${!isVideoEnabled ? 'text-white' : 'text-metallica-blue-700'} text-lg`} />
            </button>
            
            <button 
              onClick={handleEndCall}
              className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all shadow-md"
              title="End call"
            >
              <FontAwesomeIcon icon={faPhoneSlash} className="text-white text-xl" />
            </button>
            
            <button 
              onClick={handleToggleScreenShare}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-md ${
                isScreenSharing ? 'bg-green-500' : 'bg-metallica-blue-50 hover:bg-metallica-blue-100'
              }`}
              title={isScreenSharing ? "Stop sharing screen" : "Share screen"}
            >
              <FontAwesomeIcon icon={faDesktop} className={`${isScreenSharing ? 'text-white' : 'text-metallica-blue-700'} text-lg`} />
            </button>
            
            <button
              onClick={handleToggleChat}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-md ${
                showChat ? 'bg-metallica-blue-500 text-white' : 'bg-metallica-blue-50 hover:bg-metallica-blue-100'
              }`}
              title="Chat"
            >
              <FontAwesomeIcon icon={faComments} className={`${showChat ? 'text-white' : 'text-metallica-blue-700'} text-lg`} />
            </button>
          </div>
        </div>
        
        {/* Right side - Chat or Notes panel */}
        {(showChat || showNotes) && (
          <div className="w-2/5 border-l border-metallica-blue-200 h-full flex flex-col">
            {/* Panel header */}
            <div className="bg-metallica-blue-50 p-4 flex justify-between items-center border-b border-metallica-blue-100">
              <h3 className="font-semibold text-metallica-blue-800">
                {showChat ? 'Chat' : 'Notes'}
              </h3>
              <button 
                onClick={showChat ? handleToggleChat : handleToggleNotes}
                className="text-metallica-blue-600 hover:text-metallica-blue-800"
              >
                <FontAwesomeIcon icon={faXmark} className="text-lg" />
              </button>
            </div>
            
            {/* Chat panel */}
            {showChat && (
              <div className="flex flex-col h-full">
                {/* Chat messages */}
                <div className="flex-grow p-4 space-y-4 overflow-y-auto" style={{ maxHeight: '50vh' }}>
                  {chatMessages.length === 0 ? (
                    <p className="text-center text-metallica-blue-400 py-8">No messages yet. Start the conversation!</p>
                  ) : (
                    chatMessages.map(message => (
                      <div 
                        key={message.id}
                        className={`flex ${message.isSelf ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                          message.isSelf 
                            ? 'bg-metallica-blue-500 text-white rounded-tr-none' 
                            : 'bg-metallica-blue-50 text-metallica-blue-800 rounded-tl-none'
                        }`}>
                          <p>{message.content}</p>
                          <p className={`text-xs ${message.isSelf ? 'text-metallica-blue-100' : 'text-metallica-blue-400'} text-right mt-1`}>
                            {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                
                {/* Message input */}
                <div className="p-4 border-t border-metallica-blue-100">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                      type="text"
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      className="flex-grow border border-metallica-blue-200 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-metallica-blue-300 focus:border-transparent"
                      placeholder="Type a message..."
                    />
                    <button
                      type="submit"
                      className="bg-metallica-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-metallica-blue-600 transition-colors"
                      disabled={!currentMessage.trim()}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            )}
            
            {/* Notes panel */}
            {showNotes && (
              <div className="flex flex-col h-full">
                <div className="flex-grow p-4">
                  <textarea
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    className="w-full h-full p-3 border border-metallica-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-metallica-blue-300 focus:border-transparent resize-none"
                    placeholder="Take notes during your call..."
                    style={{ minHeight: '50vh' }}
                  ></textarea>
                </div>
                <div className="p-4 border-t border-metallica-blue-100 flex justify-end">
                  <button
                    onClick={handleSaveNotes}
                    className="bg-metallica-blue-500 hover:bg-metallica-blue-600 text-white py-2 px-4 rounded-lg font-medium flex items-center gap-2 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                    </svg>
                    Save Notes
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Main component to manage calls
export default function Calls() {
  const [activeCall, setActiveCall] = useState(globalCallState.activeCall);
  const [showCallInterface, setShowCallInterface] = useState(globalCallState.showCallInterface);
  const [isOutgoingCall, setIsOutgoingCall] = useState(globalCallState.isOutgoingCall);
  
  // Listen for call events
  useEffect(() => {
    const handleOpenCall = (event) => {
      console.log("Open call event received:", event.detail);
      const { activeCall, isOutgoing = false } = event.detail;
      setActiveCall(activeCall);
      setIsOutgoingCall(isOutgoing);
      setShowCallInterface(true);
      
      // Update global state
      globalCallState.activeCall = activeCall;
      globalCallState.showCallInterface = true;
      globalCallState.isOutgoingCall = isOutgoing;
    };
    
    const handleInitiateCall = (event) => {
      console.log("Initiate call event received:", event.detail);
      const { recipient } = event.detail;
      makeCall(recipient);
    };
    
    const handleParticipantLeft = () => {
      // Only handle this event if we're in an active call
      if (showCallInterface && activeCall) {
        // Call handleEndCall with participantLeft=true to show the proper notification
        handleEndCall(true);
      }
    };
    
    // Add event listeners
    document.addEventListener('open-call', handleOpenCall);
    document.addEventListener('initiate-call', handleInitiateCall);
    document.addEventListener('participant-left-call', handleParticipantLeft);
    
    return () => {
      document.removeEventListener('open-call', handleOpenCall);
      document.removeEventListener('initiate-call', handleInitiateCall);
      document.removeEventListener('participant-left-call', handleParticipantLeft);
    };
  }, [activeCall, showCallInterface]);
  
  // Make outgoing call
  const makeCall = (recipient) => {
    console.log("Making call to:", recipient);
    setActiveCall(recipient);
    setIsOutgoingCall(true);
    setShowCallInterface(true);
    
    globalCallState.activeCall = recipient;
    globalCallState.showCallInterface = true;
    globalCallState.isOutgoingCall = true;
  };
  
  // End active call
  const handleEndCall = (participantLeft = false) => {
    // Show notification only when the other person leaves the call
    if (activeCall && participantLeft) {
      // Other person left the call
      toast.info(`${activeCall.name || 'User'} has left the call`, {
        position: "top-right",
        autoClose: 3000,
        icon: <FontAwesomeIcon icon={faPhoneSlash} className="text-red-500" />
      });
    }
    // No notification when you end the call (red button)
    
    setActiveCall(null);
    setShowCallInterface(false);
    setIsOutgoingCall(false);
    
    globalCallState.activeCall = null;
    globalCallState.showCallInterface = false;
    globalCallState.isOutgoingCall = false;
  };
  
  return (
    <>
      <CallInterface
        isOpen={showCallInterface}
        onClose={(participantLeft) => handleEndCall(participantLeft)}
        caller={activeCall}
        isOutgoing={isOutgoingCall}
      />
    </>
  );
}

// Helper hook for initiating calls from other components
export const useCallFunctions = () => {
  // Receive incoming call
  const receiveCall = (caller) => {
    const toastId = toast(
      ({ closeToast }) => (
        <CallNotification
          caller={caller}
          onAccept={() => {
            toast.dismiss(toastId);
            document.dispatchEvent(new CustomEvent('open-call', {
              detail: { activeCall: caller, isOutgoing: false }
            }));
          }}
          onReject={() => {
            toast.dismiss(toastId);
          }}
        />
      ),
      {
        position: "top-right",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        closeButton: false,
      }
    );
    return toastId;
  };
  
  // Make outgoing call
  const initiateCall = (recipient) => {
    document.dispatchEvent(new CustomEvent('initiate-call', {
      detail: { recipient }
    }));
  };
  
  return { receiveCall, initiateCall };
};