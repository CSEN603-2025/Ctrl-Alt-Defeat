"use client";

import dynamic from 'next/dynamic';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Custom toast components
export const InfoToast = ({ title, message }) => (
  <div className="flex items-center p-2">
    <div className="bg-blue-500 rounded-full p-2 mr-3">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <div>
      <div className="font-semibold text-gray-800">{title}</div>
      <div className="text-sm text-gray-600">{message}</div>
    </div>
  </div>
);

export const SuccessToast = ({ title, message }) => (
  <div className="flex items-center p-2">
    <div className="bg-green-500 rounded-full p-2 mr-3">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <div>
      <div className="font-semibold text-gray-800">{title}</div>
      <div className="text-sm text-gray-600">{message}</div>
    </div>
  </div>
);

export const WarningToast = ({ title, message }) => (
  <div className="flex items-center p-2">
    <div className="bg-yellow-500 rounded-full p-2 mr-3">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    </div>
    <div>
      <div className="font-semibold text-gray-800">{title}</div>
      <div className="text-sm text-gray-600">{message}</div>
    </div>
  </div>
);

export const ErrorToast = ({ title, message }) => (
  <div className="flex items-center p-2">
    <div className="bg-red-500 rounded-full p-2 mr-3">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
    <div>
      <div className="font-semibold text-gray-800">{title}</div>
      <div className="text-sm text-gray-600">{message}</div>
    </div>
  </div>
);

// Override the default toast functions
toast.info = (message, options = {}) => {
  return toast(
    <InfoToast title="Information" message={message} />,
    { ...options, className: 'bg-blue-50 border-l-4 border-blue-500 rounded-lg' }
  );
};

toast.success = (message, options = {}) => {
  return toast(
    <SuccessToast title="Success" message={message} />,
    { ...options, className: 'bg-green-50 border-l-4 border-green-500 rounded-lg' }
  );
};

toast.warning = (message, options = {}) => {
  return toast(
    <WarningToast title="Warning" message={message} />,
    { ...options, className: 'bg-yellow-50 border-l-4 border-yellow-500 rounded-lg' }
  );
};

toast.error = (message, options = {}) => {
  return toast(
    <ErrorToast title="Error" message={message} />,
    { ...options, className: 'bg-red-50 border-l-4 border-red-500 rounded-lg' }
  );
};

// Dynamically import the Calls component with no SSR
const Calls = dynamic(() => import('./Calls'), {
  ssr: false,
});

// Simple client component wrapper
export default function ClientCalls() {
  return (
    <>
      <Calls />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={3} // Limit number of notifications shown at once
        closeButton={({ closeToast }) => (
          <button 
            onClick={closeToast} 
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      />
    </>
  );
}