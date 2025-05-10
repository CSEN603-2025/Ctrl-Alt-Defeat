"use client";

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faPhoneVolume, faBug, faPhoneSlash } from '@fortawesome/free-solid-svg-icons';
import { useCallFunctions } from './Calls';
import Image from 'next/image';
import { MOCK_USERS } from '../../constants/mockData';

const CallManager = ({ contacts = [] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const { initiateCall, receiveCall } = useCallFunctions();
  const [showSimulateOptions, setShowSimulateOptions] = useState(false);

  useEffect(() => {
    // Get current user from session storage
    if (typeof window !== 'undefined') {
      const userSession = sessionStorage.getItem('userSession') || localStorage.getItem('userSession');
      if (userSession) {
        setCurrentUser(JSON.parse(userSession));
      }
    }
  }, []);

  const handleCallClick = (contact) => {
    console.log("Initiating call to contact:", contact);
    initiateCall(contact);
    setIsMenuOpen(false);
  };
  
  // Function to simulate receiving a call
  const handleSimulateIncomingCall = () => {
    // Determine who should be calling based on current user role
    let caller = null;
    
    if (currentUser?.role === 'student') {
      // If user is a student, simulate call from SCAD admin
      caller = {
        id: 'scad_admin',
        name: MOCK_USERS.scad?.name || 'SCAD Admin',
        profileImage: MOCK_USERS.scad?.profileImage || "/images/scad-icon.png",
        role: 'scad'
      };
    } else if (currentUser?.role === 'scad') {
      // If user is SCAD, simulate call from a student
      caller = {
        id: 'student_1',
        name: 'John Doe',
        profileImage: '/images/student-icon.png',
        role: 'student'
      };
    } else {
      // Fallback caller
      caller = {
        id: 'default_caller',
        name: 'Incoming Call',
        profileImage: '/images/icons8-avatar-50.png',
        role: 'unknown'
      };
    }
    
    console.log('Simulating incoming call from:', caller);
    // Use the receiveCall function from the useCallFunctions hook
    // This will show the call notification that user can accept or reject
    receiveCall(caller);
    setShowSimulateOptions(false);
  };
  
  // Function to simulate a participant leaving the call
  const handleSimulateParticipantLeft = () => {
    console.log('Simulating participant left call');
    // Dispatch an event that will be handled by the Calls component
    document.dispatchEvent(new CustomEvent('participant-left-call'));
    setShowSimulateOptions(false);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        {/* Debug button for simulating calls */}
        <button 
          onClick={() => setShowSimulateOptions(!showSimulateOptions)}
          className={`w-10 h-10 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center bg-gray-600 hover:bg-gray-700 mb-2`}
          aria-label="Debug options"
        >
          <FontAwesomeIcon 
            icon={faBug} 
            className="text-white text-sm" 
          />
        </button>
        
        {/* Simulation options */}
        {showSimulateOptions && (
          <div className="absolute bottom-16 right-0 mb-2 bg-white rounded-lg shadow-xl w-64 overflow-hidden">
            <div className="p-3 bg-gray-100 text-gray-800 font-medium">
              Debug Options
            </div>
            <div className="p-3">
              <button
                onClick={handleSimulateIncomingCall}
                className="w-full py-2 px-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faPhoneVolume} />
                <span>Simulate Incoming Call</span>
              </button>
              <button
                onClick={handleSimulateParticipantLeft}
                className="w-full py-2 px-3 bg-red-500 hover:bg-red-600 text-white rounded flex items-center justify-center gap-2 mt-2"
              >
                <FontAwesomeIcon icon={faPhoneSlash} />
                <span>Simulate Participant Left</span>
              </button>
            </div>
          </div>
        )}
        
        {/* Call button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
            isMenuOpen ? 'bg-gray-600 rotate-135' : 'bg-metallica-blue-600 hover:bg-metallica-blue-700'
          }`}
          aria-label="Open call menu"
        >
          <FontAwesomeIcon 
            icon={faPhone} 
            className={`text-white text-xl ${isMenuOpen ? 'rotate-135' : ''}`} 
          />
        </button>
        
        {/* Contacts menu */}
        {isMenuOpen && contacts.length > 0 && (
          <div className="absolute bottom-16 right-0 mb-2 bg-white rounded-lg shadow-xl w-64 overflow-hidden transition-all duration-300">
            <div className="p-3 bg-metallica-blue-100 text-metallica-blue-800 font-medium">
              Quick Contact
            </div>
            <div className="max-h-64 overflow-y-auto py-2">
              {contacts.map(contact => (
                <div 
                  key={contact.id}
                  onClick={() => handleCallClick(contact)}
                  className="px-4 py-3 flex items-center gap-3 hover:bg-metallica-blue-50 cursor-pointer transition-colors"
                >
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-metallica-blue-100">
                    {contact.profileImage ? (
                      <Image
                        src={contact.profileImage}
                        alt={contact.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-metallica-blue-500">
                        {contact.name?.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-xs text-gray-500">{contact.role === 'scad' ? 'SCAD Admin' : contact.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CallManager;