import React, { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from 'framer-motion';

export default function WorkshopSidebar({ workshop, onClose, onJoinLive, onWatchPrerecorded }) {
  const [registrationFeedback, setRegistrationFeedback] = useState(null);

  const handleAction = () => {
    if (!workshop) return;

    switch (workshop.type) {
      case 'live':
        if (onJoinLive) onJoinLive(workshop);
        break;
      case 'prerecorded':
        if (onWatchPrerecorded) onWatchPrerecorded(workshop);
        break;
      default: // regular/upcoming workshop
        setRegistrationFeedback('success');
        setTimeout(() => {
          setRegistrationFeedback(null);
          // Close the sidebar after showing success message
          if (onClose) onClose();
        }, 1500);
        break;
    }
  };

  const getButtonText = () => {
    if (registrationFeedback === 'success') return 'Registered!';

    switch (workshop?.type) {
      case 'live':
        return 'Join Now';
      case 'prerecorded':
        return 'Watch Now';
      default:
        return 'Register Now';
    }
  };

  const getButtonColor = () => {
    switch (workshop?.type) {
      case 'live':
        return 'bg-red-500 hover:bg-red-600';
      case 'prerecorded':
        return 'bg-yellow-500 hover:bg-yellow-600 text-gray-900';
      default:
        return 'bg-[#3298BA] hover:bg-[#267a8c]';
    }
  };

  return (
    <>
      {/* Semi-transparent overlay behind sidebar */}
      {workshop && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-20 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      <div className={`fixed top-0 right-0 h-full transition-all duration-300 ease-in-out transform ${workshop ? "translate-x-0" : "translate-x-full"
        } w-full md:w-1/2 lg:w-1/3 z-50`}>
        {workshop && (
          <div className="bg-white border-l-4 border-[#5DB2C7] h-full flex flex-col shadow-xl relative">
            {/* Success Feedback Overlay */}
            <AnimatePresence>
              {registrationFeedback === 'success' && (
                <motion.div
                  className="absolute inset-0 bg-[rgba(42,95,116,0.18)] z-50 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="bg-white p-6 rounded-lg shadow-xl text-center max-w-xs"
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.7, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  >
                    <motion.div
                      className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    >
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-green-600 text-xl"
                      />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      Success!
                    </h3>
                    <p className="text-gray-600">
                      You've registered to this workshop successfully
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Close button */}
            <div className="flex justify-end sticky top-0 bg-white z-10 p-2">
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1 px-6">
              <div className="pr-2">
                <div className="relative">
                  <img
                    src={workshop.imageUrl}
                    alt={workshop.title}
                    className="w-full h-56 object-cover rounded-md mb-4"
                  />
                  {workshop.type && (
                    <span className={`absolute top-2 left-2 px-3 py-1 rounded-md text-xs font-bold ${workshop.type === 'live' ? 'bg-red-500 text-white' :
                      workshop.type === 'prerecorded' ? 'bg-yellow-500 text-gray-900' :
                        'bg-green-600 text-white'
                      }`}>
                      {workshop.type === 'live' ? 'LIVE' :
                        workshop.type === 'prerecorded' ? 'PRERECORDED' :
                          'UPCOMING'}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-[#3298BA] mb-4">{workshop.title}</h2>

                {/* Instructor Info */}
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                    <Image
                      src={workshop.instructorImage}
                      alt={workshop.instructor}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{workshop.instructor}</p>
                    <p className="text-sm text-gray-500">{workshop.instructorBio}</p>
                  </div>
                </div>

                {/* Workshop Details */}
                <div className="space-y-3 mb-6">
                  <p className="text-gray-600 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(workshop.date).toLocaleDateString()} | {workshop.time}
                  </p>

                  <p className="text-gray-600 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {workshop.location}
                  </p>

                  <p className="text-gray-600 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    {workshop.seatsAvailable} seats available
                  </p>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700">{workshop.description}</p>
                </div>

                {/* Prerequisites */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Prerequisites</h3>
                  <p className="text-gray-700">{workshop.prerequisites}</p>
                </div>
              </div>
            </div>
 
            {/* Action Button */}
            <div className="sticky bottom-0 bg-white py-4 px-6 border-t border-gray-100">
              <button
                onClick={handleAction}
                text={getButtonText()}
                width="w-full"
                disabled={registrationFeedback === 'success' && workshop.type !== 'live' && workshop.type !== 'prerecorded'}
              >
                {getButtonText()}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}