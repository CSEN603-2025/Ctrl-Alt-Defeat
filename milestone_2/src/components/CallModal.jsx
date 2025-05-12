'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { outgoingCall, acceptCall, requestAppointment, acceptAppointment, rejectAppointment } from '../store/callReducer';
import { MOCK_USERS } from '../../constants/mockData';
import SignalingService from '../services/SignalingService';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus, faCheck, faTimes, faVideo, faSpinner, faUserClock, faUsers, faUserCheck, faClock, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import DatePicker from './DatePicker';
import { format as formatDateFns } from 'date-fns';
import CallInterface from './CallInterface';
import CallNotification from './CallNotification';

const CallModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const callState = useSelector((state) => state.call);
  const appointments = useSelector((state) => state.call.appointments);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [isInitiatingCall, setIsInitiatingCall] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [callTimeout, setCallTimeout] = useState(null);
  const callingAudioRef = useRef(null);

  // State for inline date picker
  const [schedulingForUserId, setSchedulingForUserId] = useState(null);
  const [pendingDateTime, setPendingDateTime] = useState(null); // Holds Date object from DatePicker

  // Helper to get the effective user (Redux or fallback)
  const getEffectiveUser = () => {
    if (currentUser) return currentUser;
    if (typeof window !== 'undefined') {
      const userSessionData = sessionStorage.getItem('userSession') || localStorage.getItem('userSession');
      if (userSessionData) {
        try { return JSON.parse(userSessionData); } catch (e) { console.error('Error parsing user session data', e); }
      }
    }
    return null;
  };
  const effectiveUser = getEffectiveUser();

  // Reset state when modal opens, including scheduling state
  useEffect(() => {
    if (isOpen) {
      console.log("CallModal: Opening, resetting state.");
      setIsInitiatingCall(false);
      setSelectedUser(null);
      setSchedulingForUserId(null); // Reset scheduling state
      setPendingDateTime(null);     // Reset pending date
    }
  }, [isOpen]);

  useEffect(() => {
    console.log('Current user from Redux:', currentUser);
    const sessionUser = !currentUser ? getEffectiveUser() : null;
    console.log('User from session:', sessionUser);
    const user = effectiveUser;

    // Filter available users
    if (user?.role === 'scad') {
      const proStudents = MOCK_USERS.students.filter(student => student.accountType === 'PRO');
      console.log('Available PRO students for SCAD:', proStudents);
      setAvailableUsers(proStudents);
    } else if (user?.role === 'student' && user?.accountType === 'PRO') {
      console.log('SCAD admin for PRO student:', MOCK_USERS.scad);
      setAvailableUsers([MOCK_USERS.scad]);
    } else {
      console.log('No available contacts for user type:', user?.role);
      setAvailableUsers([]);
    }

    // Initialize signaling service
    if (isOpen && user?.id) {
      SignalingService.init(user.id);
    }

    return () => {
      if (!isOpen) {
        SignalingService.disconnect();
      }
    };
  }, [currentUser, isOpen]);

  // If we're in an active call, ensure modal stays open
  useEffect(() => {
    if (callState.isInCall || callState.isReceivingCall || callState.isMakingCall) {
      // Force modal to stay open
      if (!isOpen) onClose();
    }
  }, [callState.isInCall, callState.isReceivingCall, callState.isMakingCall, isOpen, onClose]);

  // Handle calling sound and call initiation sequence
  useEffect(() => {
    let callingSoundTimeoutId = null;
    let acceptTimeoutId = null;

    if (isInitiatingCall && selectedUser) {
      if (callingAudioRef.current) {
        console.log("CallModal: Playing calling sound.");
        callingAudioRef.current.play().catch(err => console.error('CallModal: Error playing calling audio:', err));

        callingSoundTimeoutId = setTimeout(() => {
          console.log("CallModal: Calling sound timeout reached.");
          if (callingAudioRef.current) callingAudioRef.current.pause();

          console.log("CallModal: Dispatching outgoingCall.");
          dispatch(outgoingCall({
            callerId: effectiveUser?.id,
            calleeId: selectedUser.id,
            calleeName: selectedUser.name
          }));

          acceptTimeoutId = setTimeout(() => {
            console.log("CallModal: Simulating call acceptance, dispatching acceptCall.");
            dispatch(acceptCall());
          }, 500);
        }, 3000);
      }
    }

    setCallTimeout(callingSoundTimeoutId);

    return () => {
      console.log("CallModal: Cleaning up sound/initiation effect.");
      clearTimeout(callingSoundTimeoutId);
      clearTimeout(acceptTimeoutId);
      if (callingAudioRef.current) {
        callingAudioRef.current.pause();
        callingAudioRef.current.currentTime = 0;
      }
    };
  }, [isInitiatingCall, selectedUser, dispatch, effectiveUser]);

  // Cleanup timeouts and sounds on modal close or component unmount
  useEffect(() => {
    return () => {
      if (callTimeout) {
        clearTimeout(callTimeout);
      }
    };
  }, [callTimeout]);

  // Close the modal automatically when the call connects
  useEffect(() => {
    if (callState.isInCall && isOpen) {
      console.log('Call connected (isInCall is true), closing CallModal.');
      onClose();
    }
  }, [callState.isInCall, isOpen, onClose]);

  const initiateCall = (userId, userName) => {
    // Check if there is a confirmed appointment first
    const hasConfirmedAppointment = appointments.some(appt =>
      ((appt.requesterId === effectiveUser?.id && appt.requestedUserId === userId) ||
        (appt.requestedUserId === effectiveUser?.id && appt.requesterId === userId)) &&
      appt.status === 'confirmed'
    );

    if (!hasConfirmedAppointment) {
      alert("You can only call users with confirmed appointments. Please book an appointment first.");
      return;
    }

    setSchedulingForUserId(null); // Close date picker if open
    setSelectedUser({ id: userId, name: userName });
    setIsInitiatingCall(true);
    SignalingService.addReceiverId(userId);
  };

  const cancelCall = () => {
    console.log("CallModal: Cancelling call initiation.");
    if (callTimeout) {
      clearTimeout(callTimeout);
      setCallTimeout(null);
    }
    if (callingAudioRef.current) {
      callingAudioRef.current.pause();
      callingAudioRef.current.currentTime = 0;
    }
    setIsInitiatingCall(false);
    setSelectedUser(null);
  };

  // --- Appointment Handlers ---
  const handleOpenScheduler = (targetUserId) => {
    setSchedulingForUserId(targetUserId);
    setPendingDateTime(new Date()); // Default to now, or fetch availability later
  };

  const handleCancelScheduling = () => {
    setSchedulingForUserId(null);
    setPendingDateTime(null);
  };

  const handleConfirmAppointmentRequest = (targetUser) => {
    if (!effectiveUser || !targetUser || !pendingDateTime) return;
    dispatch(requestAppointment({
      requesterId: effectiveUser.id,
      requesterName: effectiveUser.name,
      requestedUserId: targetUser.id,
      requestedUserName: targetUser.name,
      dateTime: pendingDateTime.toISOString() // Send as ISO string
    }));
    // Reset scheduling state
    setSchedulingForUserId(null);
    setPendingDateTime(null);
  };

  const handleAcceptAppointment = (appointmentId) => {
    dispatch(acceptAppointment({ appointmentId }));
  };

  const handleRejectAppointment = (appointmentId) => {
    dispatch(rejectAppointment({ appointmentId }));
  };

  // Check if an appointment request exists and its status
  const getAppointmentStatus = (targetUserId) => {
    if (!effectiveUser) return null;
    const appt = appointments.find(
      a => (a.requesterId === effectiveUser.id && a.requestedUserId === targetUserId) ||
        (a.requestedUserId === effectiveUser.id && a.requesterId === targetUserId)
    );
    return appt ? appt.status : null;
  };

  // Filter appointments for display
  const pendingReceivedAppointments = appointments.filter(
    appt => appt.requestedUserId === effectiveUser?.id && appt.status === 'pending'
  );
  const confirmedAppointments = appointments.filter(
    appt => (appt.requesterId === effectiveUser?.id || appt.requestedUserId === effectiveUser?.id) && appt.status === 'confirmed'
  );
  const rejectedAppointments = appointments.filter(
    appt => (appt.requesterId === effectiveUser?.id || appt.requestedUserId === effectiveUser?.id) && appt.status === 'rejected'
  );

  // Render Logic:
  // 1. If isInCall or isReceivingCall, show CallInterface.
  // 2. Otherwise, if the modal is open, show the contact list or the initiating UI.

  // If modal is not open and not in a call state, render nothing
  if (!isOpen) {
    return null;
  }

  // Otherwise, show the modal content (contacts or initiating UI)
  return (
    <div className="fixed inset-0 z-40 overflow-y-auto">
      {/* Audio elements */}
      <audio
        ref={callingAudioRef}
        src="/sounds/FaceTime_Calling_Sound.mp3"
        preload="auto"
      />

      <AnimatePresence>
        {/* Overlay */}
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-gray-500/75 backdrop-blur-sm"
          onClick={isInitiatingCall || schedulingForUserId ? null : onClose}
        />

        {/* Modal Content Wrapper */}
        <div className="flex items-center justify-center min-h-screen px-4 py-8 text-center sm:p-0">
          <motion.div
            key="modal-content"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-metallica-blue-50 rounded-2xl overflow-hidden shadow-2xl transform sm:my-8 text-left"
          >
            {/* Conditional Rendering: Calling UI or Contact List/Appointments */}
            {isInitiatingCall && selectedUser ? (
              <div className="p-6 flex flex-col items-center">
                {/* Avatar & Rings */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-metallica-blue-200 flex items-center justify-center text-5xl font-bold text-metallica-blue-600 mb-6">
                    {selectedUser.name.charAt(0)}
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-metallica-blue-400"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-metallica-blue-300"
                    animate={{ scale: [1, 1.7, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  />
                </div>
                {/* Name & Status */}
                <h2 className="text-2xl font-young-serif text-metallica-blue-600 font-semibold mt-2">
                  {selectedUser.name}
                </h2>
                <p className="text-metallica-metallica-blue-900 mb-6 text-sm">Calling...</p>
                {/* Cancel Button */}
                <div className="flex items-center justify-center space-x-4 mt-4">
                  <button
                    onClick={cancelCall}
                    className="flex items-center justify-center w-14 h-14 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-all duration-200 transform hover:scale-105"
                    aria-label="Cancel call"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {/* Close button - positioned relative to the main light background */}
                <button
                  className="absolute top-3 right-3 z-20 flex items-center justify-center w-7 h-7 rounded-full shadow-sm bg-gray-200/70 hover:bg-gray-300/90 transition-colors"
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  <FontAwesomeIcon icon={faTimes} className="text-xl text-gray-500 font-normal" />
                </button>

                {/* Header Tab */}
                <div className="relative z-10">
                  <div className="inline-block bg-metallica-blue-600 text-white px-6 py-3 rounded-tl-2xl rounded-br-xl shadow-md">
                    <h3 className="text-xl font-young-serif font-medium">Video Calls & Appointments</h3>
                  </div>
                </div>

                {/* Content Area with Scroll */}
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                  {/* Appointment-First Policy Alert */}
                  <div className="bg-blue-50 border-l-4 border-metallica-blue-700 p-4 mb-4 rounded-md">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <FontAwesomeIcon icon={faUserClock} className="h-5 w-5 text-metallica-blue-700" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-metallica-blue-700">
                          <strong>Appointment-First Policy:</strong> You can only call contacts with confirmed appointments. Please request an appointment and wait for confirmation.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Available Contacts Section */}
                  <h4 className="text-lg font-semibold text-metallica-blue-700 mb-3 font-ibm-plex-sans border-b pb-2">Available Contacts</h4>
                  {availableUsers.length === 0 ? (
                    <div className="bg-white rounded-xl p-4 shadow-sm text-center text-gray-500 mb-6"><FontAwesomeIcon icon={faUsers} className="mr-2" />No contacts found.</div>
                  ) : (
                    <div className="space-y-3 mb-6">
                      {availableUsers.map((user) => {
                        const apptStatus = getAppointmentStatus(user.id);
                        const isThisUserScheduling = schedulingForUserId === user.id;
                        const canRequest = !apptStatus || apptStatus === 'rejected';
                        const isPending = apptStatus === 'pending';
                        const isConfirmed = apptStatus === 'confirmed';

                        return (
                          <div key={user.id} className="bg-white rounded-xl p-4 shadow-sm border border-metallica-blue-100 transition-all duration-200">
                            <motion.div layout>
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center flex-grow min-w-0 mr-2">
                                  <div className="relative mr-3 flex-shrink-0">
                                    <div className="bg-metallica-blue-100 text-metallica-blue-700 rounded-full h-10 w-10 flex items-center justify-center font-medium text-base shadow-sm">
                                      {user.name.charAt(0)}
                                    </div>
                                    {confirmedAppointments.some(appt => appt.requesterId === user.id && appt.requestedUserId === effectiveUser?.id && appt.status === 'confirmed') && (
                                      <span
                                        className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white shadow-sm"
                                        title={`${user.name} has a confirmed appointment with you (requested by them)`}
                                      />
                                    )}
                                  </div>
                                  <div className="text-left">
                                    <h3 className="font-medium text-sm text-metallica-blue-700 font-ibm-plex-sans">{user.name}</h3>
                                    <p className="text-xs text-metallica-metallica-blue-900 mt-0.5 font-ibm-plex-sans">
                                      {user.role === 'scad' ? 'SCAD Admin' : `${user.major || 'Student'}`}
                                      {user.role === 'student' && <span className="ml-2 inline-block bg-green-100 text-green-800 text-[10px] px-1.5 py-0.5 rounded font-semibold">PRO</span>}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2 ml-2 flex-shrink-0">
                                  <button
                                    onClick={() => initiateCall(user.id, user.name)}
                                    className={`${isConfirmed ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'} text-white p-2 rounded-full flex items-center justify-center transition-colors shadow-sm h-9 w-9`}
                                    title={isConfirmed ? "Call Now" : "Confirmed appointment required"}
                                    disabled={!isConfirmed || isThisUserScheduling}
                                  >
                                    <FontAwesomeIcon icon={faVideo} className="h-4 w-4" />
                                  </button>
                                  {canRequest && !isThisUserScheduling && (
                                    <button
                                      onClick={() => handleOpenScheduler(user.id)}
                                      className="bg-metallica-blue-700 hover:bg-metallica-blue-800 text-white p-2 rounded-full flex items-center justify-center transition-colors shadow-sm h-9 w-9"
                                      title="Request Appointment"
                                    >
                                      <FontAwesomeIcon icon={faCalendarPlus} className="h-4 w-4" />
                                    </button>
                                  )}
                                  {isThisUserScheduling && (
                                    <button
                                      onClick={handleCancelScheduling}
                                      className="bg-gray-400 hover:bg-gray-500 text-white p-2 rounded-full flex items-center justify-center transition-colors shadow-sm h-9 w-9"
                                      title="Cancel Scheduling"
                                    >
                                      <FontAwesomeIcon icon={faTimes} className="h-4 w-4" />
                                    </button>
                                  )}
                                  {isPending && !isThisUserScheduling && (
                                    <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full font-medium flex items-center h-9">
                                      <FontAwesomeIcon icon={faUserClock} className="mr-1.5 h-3 w-3" /> Requested
                                    </span>
                                  )}
                                  {isConfirmed && !isThisUserScheduling && (
                                    <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full font-medium flex items-center h-9">
                                      <FontAwesomeIcon icon={faUserCheck} className="mr-1.5 h-3 w-3" /> Confirmed
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Inline Date Picker */}
                              <AnimatePresence>
                                {isThisUserScheduling && (
                                  <motion.div
                                    layout
                                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                    animate={{ opacity: 1, height: 'auto', marginTop: '0.75rem' }}
                                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                    className="pt-3 border-t border-gray-200"
                                  >
                                    <div className="flex flex-col sm:flex-row items-center gap-3">
                                      <DatePicker
                                        selectedDate={pendingDateTime}
                                        onDateChange={setPendingDateTime}
                                      />
                                      <button
                                        onClick={() => handleConfirmAppointmentRequest(user)}
                                        className="bg-metallica-blue-700 hover:bg-metallica-blue-800 text-white py-2 px-4 rounded-full text-sm font-medium flex items-center justify-center shadow-sm transition-colors h-9 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={!pendingDateTime}
                                        title="Confirm Appointment Request"
                                      >
                                        <FontAwesomeIcon icon={faPaperPlane} className="mr-2 h-3.5 w-3.5" />
                                        Confirm Request
                                      </button>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Pending Appointments Received */}
                  {pendingReceivedAppointments.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-metallica-blue-700 mb-3 font-ibm-plex-sans border-b pb-2">Pending Requests</h4>
                      <div className="space-y-3">
                        {pendingReceivedAppointments.map(appt => (
                          <div key={appt.id} className="bg-yellow-50 rounded-xl p-4 shadow-sm border border-yellow-200">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="bg-yellow-100 text-yellow-700 rounded-full h-10 w-10 flex items-center justify-center mr-3 font-medium text-base shadow-sm flex-shrink-0">
                                  {appt.requesterName.charAt(0)}
                                </div>
                                <div>
                                  <h3 className="font-medium text-sm text-yellow-800 font-ibm-plex-sans">{appt.requesterName}</h3>
                                  <p className="text-xs text-yellow-600 mt-0.5 font-ibm-plex-sans flex items-center">
                                    <FontAwesomeIcon icon={faClock} className="mr-1.5 h-3 w-3" />
                                    {appt.dateTime ? formatDateFns(new Date(appt.dateTime), 'MMM d, yyyy') : 'Wants to schedule'}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 ml-2">
                                <button
                                  onClick={() => handleAcceptAppointment(appt.id)}
                                  className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full flex items-center justify-center transition-colors shadow-sm h-9 w-9"
                                  title="Accept Appointment"
                                >
                                  <FontAwesomeIcon icon={faCheck} className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleRejectAppointment(appt.id)}
                                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full flex items-center justify-center transition-colors shadow-sm h-9 w-9"
                                  title="Reject Appointment"
                                >
                                  <FontAwesomeIcon icon={faTimes} className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Confirmed Appointments */}
                  {confirmedAppointments.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-metallica-blue-700 mb-3 font-ibm-plex-sans border-b pb-2">Confirmed Appointments</h4>
                      <div className="space-y-3">
                        {confirmedAppointments.map(appt => {
                          const otherPartyName = appt.requesterId === effectiveUser?.id ? appt.requestedUserName : appt.requesterName;
                          const otherPartyId = appt.requesterId === effectiveUser?.id ? appt.requestedUserId : appt.requesterId;
                          return (
                            <div key={appt.id} className="bg-green-50 rounded-xl p-4 shadow-sm border border-green-200">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="bg-green-100 text-green-700 rounded-full h-10 w-10 flex items-center justify-center mr-3 font-medium text-base shadow-sm flex-shrink-0">
                                    {otherPartyName.charAt(0)}
                                  </div>
                                  <div>
                                    <h3 className="font-medium text-sm text-green-800 font-ibm-plex-sans">{otherPartyName}</h3>
                                    <p className="text-xs text-green-600 mt-0.5 font-ibm-plex-sans flex items-center">
                                      <FontAwesomeIcon icon={faClock} className="mr-1.5 h-3 w-3" />
                                      {appt.dateTime ? formatDateFns(new Date(appt.dateTime), 'MMM d, yyyy') : 'Confirmed (No date set)'}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2 ml-2">
                                  <button
                                    onClick={() => initiateCall(otherPartyId, otherPartyName)}
                                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full flex items-center justify-center transition-colors shadow-sm h-9 w-9"
                                    title="Call Now"
                                  >
                                    <FontAwesomeIcon icon={faVideo} className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => handleRejectAppointment(appt.id)}
                                    className="bg-gray-400 hover:bg-gray-500 text-white p-2 rounded-full flex items-center justify-center transition-colors shadow-sm h-9 w-9"
                                    title="Cancel Appointment"
                                  >
                                    <FontAwesomeIcon icon={faTimes} className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Rejected Appointments (Optional Display) */}
                  {rejectedAppointments.length > 0 && (
                    <div className="mb-6 opacity-60">
                      <h4 className="text-md font-medium text-gray-500 mb-3 font-ibm-plex-sans border-b pb-2">Past / Rejected</h4>
                      <div className="space-y-2">
                        {rejectedAppointments.map(appt => {
                          const otherPartyName = appt.requesterId === effectiveUser?.id ? appt.requestedUserName : appt.requesterName;
                          return (
                            <div key={appt.id} className="bg-gray-100 rounded-lg p-3 shadow-sm border border-gray-200">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="bg-gray-200 text-gray-500 rounded-full h-8 w-8 flex items-center justify-center mr-3 font-medium text-sm flex-shrink-0">
                                    {otherPartyName.charAt(0)}
                                  </div>
                                  <div>
                                    <h3 className="font-normal text-xs text-gray-600 font-ibm-plex-sans">
                                      {appt.requesterId === effectiveUser?.id ? `You requested ${otherPartyName}` : `${otherPartyName} requested you`}
                                    </h3>
                                    <p className="text-[10px] text-red-500 mt-0.5 font-ibm-plex-sans font-medium">Rejected</p>
                                  </div>
                                </div>
                                {appt.dateTime && (
                                  <p className="text-[10px] text-gray-400 mt-0.5 font-ibm-plex-sans flex items-center ml-auto">
                                    <FontAwesomeIcon icon={faClock} className="mr-1 h-2.5 w-2.5" />
                                    {formatDateFns(new Date(appt.dateTime), 'MMM d, yyyy')}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </AnimatePresence>
    </div>
  );
};

export default CallModal;