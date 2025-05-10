"use client";

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { useCallFunctions } from './Calls';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

const CallManager = ({ contacts = [] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const { initiateCall } = useCallFunctions();

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
    initiateCall(contact);
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        {/* Call button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
            isMenuOpen ? 'bg-gray-600 rotate-135' : 'bg-metallica-blue-600 hover:bg-metallica-blue-700'
          }`}
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

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default CallManager;