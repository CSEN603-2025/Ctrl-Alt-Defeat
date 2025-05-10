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
  faUserCircle
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
    <div className="bg-white rounded-lg shadow-xl p-4 max-w-sm w-full border-l-4 border-metallica-blue-500">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-bold text-metallica-blue-700">Incoming Call</h3>
        <span className="text-red-500 font-medium">{timeLeft}s</span>
      </div>
      
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
          <img 
            src={caller.profileImage || "/images/student.png"} 
            alt={caller.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-metallica-blue-300 z-10 relative"
          />
        </div>
        <div>
          <h4 className="font-bold text-gray-800 text-lg">{caller.name}</h4>
          <p className="text-gray-600">is calling you...</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <button 
          onClick={onReject}
          className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-full flex items-center justify-center gap-2 font-medium transition-colors"
        >
          <FontAwesomeIcon icon={faPhoneSlash} />
          <span>Decline</span>
        </button>
        <button 
          onClick={onAccept}
          className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-full flex items-center justify-center gap-2 font-medium transition-colors"
        >
          <FontAwesomeIcon icon={faPhone} />
          <span>Accept</span>
        </button>
      </div>
    </div>
  );
};

// Main Call Interface Component
export const CallInterface = ({ isOpen, onClose, caller = {}, isOutgoing = false }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callStatus, setCallStatus] = useState(isOutgoing ? 'calling' : 'connected');
  const [callDuration, setCallDuration] = useState(0);
  const [showRemoteVideo, setShowRemoteVideo] = useState(!isOutgoing);
  const [callAccepted, setCallAccepted] = useState(false);
  
  const timerRef = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  
  // Get current user from session
  const currentUser = typeof window !== 'undefined' ? 
    JSON.parse(sessionStorage.getItem('userSession') || localStorage.getItem('userSession') || '{}') : {};
  
  // Handle outgoing call simulation
  useEffect(() => {
    // If it's an outgoing call, wait 3 seconds then "connect"
    if (isOutgoing && callStatus === 'calling') {
      const timer = setTimeout(() => {
        setCallStatus('connected');
        setShowRemoteVideo(true);
        setCallAccepted(true);
        
        // Show notification that call was accepted
        toast.success(`${caller?.name || 'User'} accepted your call`, {
          position: "top-right",
          autoClose: 3000
        });
      }, 3000);
      
      return () => clearTimeout(timer);
    }
    
    return () => {};
  }, [isOutgoing, callStatus, caller?.name]); // Use optional chaining to prevent errors
  
  // Setup media stream and timer when call is connected
  useEffect(() => {
    if (callStatus === 'connected') {
      // Start call duration timer
      timerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
      
      // Setup video streams (using getUserMedia API)
      if (isVideoEnabled && navigator.mediaDevices) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then(stream => {
            // Set local video stream
            if (localVideoRef.current) {
              localVideoRef.current.srcObject = stream;
            }
            
            // For demo purposes, use the same stream for remote video
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = stream;
            }
          })
          .catch(error => {
            console.error("Error accessing camera/microphone:", error);
            setIsVideoEnabled(false);
            toast.error("Could not access camera or microphone", {
              position: "top-right",
              autoClose: 3000
            });
          });
      }
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
  }, [callStatus, isVideoEnabled]);
  
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
          toast.error("Could not share screen", {
            position: "top-right",
            autoClose: 3000
          });
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
              if (remoteVideoRef.current) remoteVideoRef.current.srcObject = stream;
            });
        }
      }
      setIsScreenSharing(false);
    }
  };
  
  // End call
  const handleEndCall = () => {
    // Stop all media tracks
    if (localVideoRef.current?.srcObject) {
      localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    
    // Show end call notification
    toast.info(`Call ended with ${caller.name || 'User'}`, {
      position: "top-right",
      autoClose: 3000
    });
    
    // Close call interface
    onClose();
    
    // Reset global call state
    globalCallState.activeCall = null;
    globalCallState.showCallInterface = false;
    globalCallState.isOutgoingCall = false;
  };
  
  // If the call is not open, don't render anything
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-90">
      <div className="w-full max-w-5xl mx-4 bg-metallica-blue-900 rounded-xl overflow-hidden shadow-2xl">
        {/* Call header */}
        <div className="bg-metallica-blue-800 p-4 flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-xl text-white">
              {isOutgoing ? `Calling ${caller.name || 'User'}...` : `Call with ${caller.name || 'User'}`}
            </h3>
            <p className="text-sm text-metallica-blue-200">
              {callStatus === 'connected' 
                ? `Connected • ${formatDuration(callDuration)}` 
                : 'Calling...'}
            </p>
          </div>
        </div>
        
        {/* Call content area */}
        <div className="p-6">
          {isOutgoing && !showRemoteVideo ? (
            // Initial outgoing call view - only shows caller
            <div className="w-full">
              <div className="w-full h-[60vh] bg-metallica-blue-700 rounded-lg overflow-hidden relative">
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
                    <FontAwesomeIcon icon={faUserCircle} className="text-metallica-blue-300 text-8xl mb-4" />
                    <p className="text-white text-xl">Camera is off</p>
                  </div>
                )}
              </div>
              <div className="mt-3 text-center text-white text-lg font-medium">
                {currentUser.name || "You"}
              </div>
            </div>
          ) : (
            // Connected call view - both participants
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Remote video */}
              <div className="aspect-video bg-metallica-blue-700 rounded-lg overflow-hidden relative">
                {isVideoEnabled ? (
                  <video 
                    ref={remoteVideoRef} 
                    autoPlay 
                    playsInline 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center flex-col">
                    <FontAwesomeIcon icon={faUserCircle} className="text-metallica-blue-300 text-8xl mb-4" />
                    <p className="text-white text-xl">Camera is off</p>
                  </div>
                )}
                {isScreenSharing && (
                  <div className="absolute top-2 left-2 bg-metallica-blue-900 bg-opacity-60 px-3 py-1 rounded text-white text-sm">
                    Screen sharing
                  </div>
                )}
                <div className="mt-3 text-center text-white text-lg font-medium">
                  {caller.name || "Caller"}
                </div>
              </div>
              
              {/* Local video */}
              <div className="aspect-video bg-metallica-blue-700 rounded-lg overflow-hidden relative">
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
                    <FontAwesomeIcon icon={faUserCircle} className="text-metallica-blue-300 text-8xl mb-4" />
                    <p className="text-white text-xl">Camera is off</p>
                  </div>
                )}
                <div className="mt-3 text-center text-white text-lg font-medium">
                  {currentUser.name || "You"}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Call controls */}
        <div className="bg-metallica-blue-800 p-4 flex justify-center gap-6">
          <button 
            onClick={handleToggleMute} 
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              isMuted ? 'bg-red-500' : 'bg-metallica-blue-500 hover:bg-metallica-blue-600'
            }`}
          >
            <FontAwesomeIcon icon={isMuted ? faMicrophoneSlash : faMicrophone} className="text-white text-lg" />
          </button>
          
          <button 
            onClick={handleToggleVideo} 
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              !isVideoEnabled ? 'bg-red-500' : 'bg-metallica-blue-500 hover:bg-metallica-blue-600'
            }`}
          >
            <FontAwesomeIcon icon={isVideoEnabled ? faVideo : faVideoSlash} className="text-white text-lg" />
          </button>
          
          <button 
            onClick={handleToggleScreenShare}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              isScreenSharing ? 'bg-green-500' : 'bg-metallica-blue-500 hover:bg-metallica-blue-600'
            }`}
          >
            <FontAwesomeIcon icon={faDesktop} className="text-white text-lg" />
          </button>
          
          <button 
            onClick={handleEndCall}
            className="w-12 h-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors"
          >
            <FontAwesomeIcon icon={faPhoneSlash} className="text-white text-lg" />
          </button>
        </div>
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
      const { recipient } = event.detail;
      makeCall(recipient);
    };
    
    document.addEventListener('open-call', handleOpenCall);
    document.addEventListener('initiate-call', handleInitiateCall);
    
    return () => {
      document.removeEventListener('open-call', handleOpenCall);
      document.removeEventListener('initiate-call', handleInitiateCall);
    };
  }, []);
  
  // Make outgoing call
  const makeCall = (recipient) => {
    setActiveCall(recipient);
    setIsOutgoingCall(true);
    setShowCallInterface(true);
    
    globalCallState.activeCall = recipient;
    globalCallState.showCallInterface = true;
    globalCallState.isOutgoingCall = true;
  };
  
  // End active call
  const handleEndCall = () => {
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
        onClose={handleEndCall}
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
            toast.info("Call rejected", {
              position: "top-right",
              autoClose: 3000,
            });
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