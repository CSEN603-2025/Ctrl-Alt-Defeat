import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';// Correct import path


const likertOptions = [
  { id: 1, text: 'Strongly Disagree', color: 'border-[#FCA5A5] bg-[#FEE2E2]', selected: 'border-[#EF4444] bg-[#FCA5A5]/40' },
  { id: 2, text: 'Disagree', color: 'border-[#FDE68A] bg-[#FEF9C3]', selected: 'border-[#FBBF24] bg-[#FDE68A]/40' },
  { id: 3, text: 'Neutral', color: 'border-gray-300 bg-gray-100', selected: 'border-gray-400 bg-gray-200' },
  { id: 4, text: 'Agree', color: 'border-[#6EE7B7] bg-[#D1FAE5]', selected: 'border-[#34D399] bg-[#6EE7B7]/40' },
  { id: 5, text: 'Strongly Agree', color: 'border-[#5EEAD4] bg-[#CCFBF1]', selected: 'border-[#14B8A6] bg-[#5EEAD4]/40' },
];

const AssessmentSidebar = ({ assessment, onClose }) => {
  const [answers, setAnswers] = useState([]);
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);

  const [postFeedback, setPostFeedback] = useState(null);
  const [sharing, setSharing] = useState(null);

  useEffect(() => {
    if (assessment) {
      setAnswers(new Array(assessment?.questions.length).fill(null));
      setTestStarted(false);
      setTestCompleted(false);
      setSharing(null);
    }
  }, [assessment]);

  const handleAnswerChange = (questionIndex, answerId) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = answerId;
    setAnswers(updatedAnswers);
  };

  const calculateProgress = () => {
    const answeredCount = answers.filter(answer => answer !== null).length;
    return (answeredCount / answers.length) * 100;
  };

  const handleSubmitTest = () => {
    setTestCompleted(true);
  };

  const handlePostToProfile = () => {
    setPostFeedback('success');
    setTimeout(() => {
      setPostFeedback(null);
    }, 1500);
  };

  const handleSharingDecision = (decision) => {
    setSharing(decision);
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <div className={`fixed top-0 right-0 h-full w-1/3 z-50 transition-all duration-300 ease-in-out transform ${assessment ? 'translate-x-0' : 'translate-x-full'}`}>
      {assessment && !testStarted && !testCompleted && (
        <div className="bg-white border-l-2 border-[#5DB2C7] h-full flex flex-col shadow-lg relative">
          <div className="flex justify-end sticky top-0 bg-white z-10 p-2">
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
          </div>
          <div className="overflow-y-auto flex-1 px-0">
            <div className="flex flex-col items-center">
              <div className="w-full px-6 pt-6 pb-2">
                <img
                  src={assessment.imageUrl}
                  alt={assessment.title}
                  className="w-full h-56 object-cover rounded-md shadow"
                  style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                />
              </div>
              <div className="px-6 w-full flex flex-col items-start">
                <h2 className="text-2xl font-bold text-[#3298BA] mb-4 text-left w-full">{assessment.title}</h2>
                <p className="text-gray-700 mb-4">{assessment.description}</p>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Why take the test?</h3>
                <p className="text-gray-700 mb-4">{assessment.whyTakeIt}</p>
                <p className="text-gray-700 mb-4">{assessment.resultExplanation}</p>
              </div>
            </div>
          </div>
          <div className="sticky bottom-0 left-0 w-full bg-white px-6 pb-6 pt-3 border-t border-gray-100 z-20">
            <button
              onClick={() => setTestStarted(true)}
              className="w-full bg-[#3298BA] text-white py-2 px-4 rounded-full hover:bg-[#267a8c] transition-colors duration-200"
            >
              Take the Test
            </button>
          </div>
        </div>
      )}

      {assessment && testStarted && !testCompleted && (
        <div className="bg-white border-l-2 border-[#5DB2C7] h-full flex flex-col shadow-lg relative overflow-y-auto">
          <div className="flex justify-end sticky top-0 bg-white z-10 p-2">
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
          </div>
          {/* Make progress bar sticky */}
          <div className="sticky top-0 z-10 bg-white px-6 pt-2 pb-4 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-[#3298BA] mb-2">{assessment.title}</h2>
            <div className="h-2 bg-gray-300 rounded-full mb-2">
              <div
                className="h-full bg-[#3298BA] rounded-full"
                style={{ width: `${calculateProgress()}%` }}
              />
            </div>
          </div>
          <div className="p-6 pt-4">
            <div className="space-y-6">
              {assessment.questions.map((question, index) => (
                <div key={index} className="flex flex-col items-center mb-8">
                  <p className="text-center text-base font-medium text-gray-800 mb-2">{question.question}</p>
                  <div className="flex justify-center gap-8 mt-2">
                  {likertOptions.map(option => (
                  <div key={option.id} className="flex flex-col items-center">
                    <motion.div
                      whileTap={{ scale: 0.9 }}  // Apply shrinking effect when clicked
                      whileHover={{ 
                        scale: 1.1, // Slight scaling effect on hover
                        borderWidth: '3px', // Match border thickness on hover
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)' // Add a subtle shadow to match the selected state on hover
                      }}
                      animate={answers[index] === option.id ? { scale: 1.15, borderWidth: '3px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)' } : { scale: 1 }}
                      transition={{ type: 'spring', stiffness: 250, damping: 18 }}
                      onClick={() => handleAnswerChange(index, option.id)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-1
                        ${answers[index] === option.id
                          ? option.selected + ' border-[3px] shadow-md'
                          : option.color + ' border'}
                        cursor-pointer transition-all duration-300
                      `}
                    />
                    <span className="text-xs text-gray-600 text-center w-16">{option.text}</span>
                  </div>
                ))}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleSubmitTest}
              className="w-full mt-6 bg-[#3298BA] text-white py-2 px-4 rounded-full hover:bg-[#267a8c] transition-colors duration-200"
            >
              Submit Test
            </button>
          </div>
        </div>
      )}

      {testCompleted && (
  <div className="bg-white border-l-2 border-[#5DB2C7] h-full flex flex-col shadow-lg relative">
    <div className="flex justify-end sticky top-0 bg-white z-10 p-2">
      <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
    </div>
    <div className="flex-1 flex items-center justify-center px-4 pb-8">
      <div className="bg-white rounded-xl shadow p-8 w-full max-w-md flex flex-col items-center">
        <div className="bg-green-50 rounded-full flex items-center justify-center mb-6" style={{ width: 72, height: 72 }}>
          <FontAwesomeIcon icon={faCheck} className="text-green-500 text-3xl" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">Test Completed!</h3>
        <p className="text-gray-600 mb-4 text-center">
          Thank you for completing the test! Your results are being processed and will be available shortly. <br />
          You will receive your detailed results via email within the next few minutes.
        </p>
        {sharing === null ? (
          <>
            <p className="text-center text-gray-700 mb-4">Do you want to share your results?</p>
            <div className="flex justify-center gap-4 mb-2">
              <button
                onClick={() => {
                  setSharing('yes');
                  setTimeout(() => onClose(), 1000);
                }}
                className="py-2 px-8 rounded-full font-semibold border border-[#3298BA] text-[#3298BA] bg-transparent hover:bg-[#3298BA]/10 transition-colors duration-200 shadow-none"
              >
                Yes
              </button>
              <button
                onClick={() => onClose()}
                className="py-2 px-8 rounded-full font-semibold border border-[#d9534f] text-[#d9534f] bg-transparent hover:bg-[#d9534f]/10 transition-colors duration-200 shadow-none"
              >
                No
              </button>
            </div>
          </>
        ) : sharing === 'yes' ? (
          <p className="text-center text-green-600 font-semibold">Posted to Profile!</p>
        ) : null}
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default AssessmentSidebar;
