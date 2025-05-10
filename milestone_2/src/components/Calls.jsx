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
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[var(--metallica-blue-50)] bg-opacity-40 backdrop-blur-sm">
      <div className="w-full max-w-3xl bg-white overflow-hidden shadow-lg relative rounded-2xl border border-[var(--metallica-blue-200)]">
        {/* Call header */}
        <div className="bg-[var(--metallica-blue-50)] p-4 flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-xl text-[var(--metallica-blue-800)]">
              {isOutgoing && !callAccepted ? `Calling ${caller.name || 'User'}...` : `Call with ${caller.name || 'User'}`}
            </h3>
            <p className="text-sm text-[var(--metallica-blue-600)]">
              {callStatus === 'connected' 
                ? `Connected • ${formatDuration(callDuration)}` 
                : callStatus === 'connecting' 
                ? 'Connecting...' 
                : 'Calling...'}
            </p>
          </div>
          {/* Removed top end call button since we'll have it in the controls below */}
        </div>
        
        {/* Call content area */}
        <div className="w-full relative">
          {isOutgoing && !callAccepted ? (
            // Initial outgoing call view - only shows caller's video centered with "You" label
            <div className="w-full flex flex-col items-center justify-center p-4 bg-white">
              <div className="w-full h-[50vh] bg-[var(--metallica-blue-50)] rounded-lg overflow-hidden relative">
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
                    <FontAwesomeIcon icon={faUserCircle} className="text-[var(--metallica-blue-300)] text-7xl mb-3" />
                    <p className="text-[var(--metallica-blue-600)] text-lg">Camera is off</p>
                  </div>
                )}
              </div>
              <div className="mt-3 text-center text-[var(--metallica-blue-700)] text-lg font-medium">
                You
              </div>
            </div>
          ) : (
            // Connected call view with main video display
            <div className="relative w-full h-full">
              {/* Main video (center) */}
              <div className={`w-full h-[60vh] rounded-lg overflow-hidden bg-[var(--metallica-blue-50)] ${showRemoteVideo ? 'animate-fadeIn' : 'opacity-0'}`}>
                {showRemoteVideo && isVideoEnabled ? (
                  <video 
                    ref={remoteVideoRef} 
                    autoPlay 
                    playsInline 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center flex-col">
                    <FontAwesomeIcon icon={faUserCircle} className="text-[var(--metallica-blue-300)] text-7xl mb-3" />
                    <p className="text-[var(--metallica-blue-600)] text-lg">Camera is off</p>
                  </div>
                )}
                
                {/* Remote user name label */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
                  <div className="bg-white bg-opacity-80 px-4 py-2 rounded-full text-[var(--metallica-blue-800)] text-lg font-medium shadow-sm">
                    {caller.name || "Caller"}
                  </div>
                </div>
                
                {/* Screen sharing indicator */}
                {isScreenSharing && (
                  <div className="absolute top-16 left-4 bg-white bg-opacity-80 px-3 py-1 rounded-full text-[var(--metallica-blue-800)] text-sm shadow-sm">
                    Screen sharing
                  </div>
                )}
              </div>
              
              {/* Local video (PiP in bottom right corner) */}
              <div className="absolute bottom-16 right-4 w-1/5 aspect-video bg-[var(--metallica-blue-50)] rounded-lg overflow-hidden border-2 border-white shadow-md">
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
                    <FontAwesomeIcon icon={faUserCircle} className="text-[var(--metallica-blue-300)] text-2xl mb-1" />
                    <p className="text-[var(--metallica-blue-600)] text-xs">Camera is off</p>
                  </div>
                )}
                
                {/* Your name label */}
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-80 px-2 py-1 rounded-full text-[var(--metallica-blue-800)] text-xs shadow-sm">
                  You
                </div>
              </div>
              
              {/* Volume slider on the left side */}
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full py-4 px-1 shadow-sm">
                <div className="h-32 flex flex-col items-center">
                  <FontAwesomeIcon icon={isMuted ? faMicrophoneSlash : faMicrophone} className="text-[var(--metallica-blue-800)] text-sm mb-2" />
                  <div className="bg-[var(--metallica-blue-100)] w-1 h-24 rounded-full relative">
                    <div className="absolute bottom-0 w-1 bg-[var(--metallica-blue-500)] rounded-full" style={{ height: isMuted ? '0%' : '80%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Call controls - circular buttons at the bottom */}
        <div className="bg-white p-6 flex justify-center gap-5">
          <button 
            onClick={handleToggleMute} 
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-md ${
              isMuted ? 'bg-red-500' : 'bg-[var(--metallica-blue-50)] hover:bg-[var(--metallica-blue-100)]'
            }`}
          >
            <FontAwesomeIcon icon={isMuted ? faMicrophoneSlash : faMicrophone} className={`${isMuted ? 'text-white' : 'text-[var(--metallica-blue-700)]'} text-lg`} />
          </button>
          
          <button 
            onClick={handleToggleVideo} 
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-md ${
              !isVideoEnabled ? 'bg-red-500' : 'bg-[var(--metallica-blue-50)] hover:bg-[var(--metallica-blue-100)]'
            }`}
          >
            <FontAwesomeIcon icon={isVideoEnabled ? faVideo : faVideoSlash} className={`${!isVideoEnabled ? 'text-white' : 'text-[var(--metallica-blue-700)]'} text-lg`} />
          </button>
          
          <button 
            onClick={handleEndCall}
            className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all shadow-md"
          >
            <FontAwesomeIcon icon={faPhoneSlash} className="text-white text-xl" />
          </button>
          
          <button 
            onClick={handleToggleScreenShare}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-md ${
              isScreenSharing ? 'bg-[var(--metallica-green-pop-color)]' : 'bg-[var(--metallica-blue-50)] hover:bg-[var(--metallica-blue-100)]'
            }`}
          >
            <FontAwesomeIcon icon={faDesktop} className={`${isScreenSharing ? 'text-white' : 'text-[var(--metallica-blue-700)]'} text-lg`} />
          </button>
          
          <button
            className="w-14 h-14 bg-[var(--metallica-blue-50)] hover:bg-[var(--metallica-blue-100)] rounded-full flex items-center justify-center transition-all shadow-md"
            onClick={() => {}}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--metallica-blue-700)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
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
    
    const handleParticipantLeft = () => {
      // Only handle this event if we're in an active call
      if (showCallInterface && activeCall) {
        // Call handleEndCall with participantLeft=true to show the proper notification
        handleEndCall(true);
      }
    };
    
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
    setActiveCall(recipient);
    setIsOutgoingCall(true);
    setShowCallInterface(true);
    
    globalCallState.activeCall = recipient;
    globalCallState.showCallInterface = true;
    globalCallState.isOutgoingCall = true;
    
    // Comment out notification for outgoing calls
    // toast.info(`Calling ${recipient.name || 'User'}...`, {
    //   position: "top-right",
    //   autoClose: 3000,
    //   icon: <FontAwesomeIcon icon={faPhone} className="text-green-500 animate-pulse" />
    // });
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