"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { MOCK_USERS } from '../../../../../constants/mockData';
import { usersOptions } from '../../../../../constants/index';
import Link from "next/link";
import Blobs from "@/components/Blobs";
import Header from "@/components/Header";
import Copyright from "@/components/Copyright";
import LoginForm from "@/components/LoginForm";
import BackButton from "@/components/shared/BackButton";
import { ToastContainer, toast } from 'react-toastify';


export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const userType = searchParams.get('userType');

  const [error, setError] = useState('');

  // Get user type details from usersOptions
  const userDetails = usersOptions.find(option => option.value === userType);

  useEffect(() => {
    // If no userType is provided, redirect to home
    if (!userType || !userDetails) {
      router.push('/en');
    }
  }, [userType, userDetails, router]);

  const handleLogin = async (values) => {
    setError('');

    let mockUser = null;

    // Check if it's a student login
    if (userType === 'student') {
      // Find the student in the students array
      mockUser = MOCK_USERS.students.find(
        student => student.email === values.email && student.password === values.password
      );
    } else {
      // For other user types, access directly
      mockUser = MOCK_USERS[userType];

      // Check credentials for non-student users
      if (mockUser && (values.email !== mockUser.email || values.password !== mockUser.password)) {
        mockUser = null; // Reset if credentials don't match
      }
    }

    if (!mockUser) {
      setError('Invalid email or password');
      return;
    }

    // Create user session data
    const userSession = {
      ...mockUser,
      timestamp: new Date().toISOString()
    };

    // Store in localStorage if remember me is checked
    if (values.remember) {
      localStorage.setItem('userSession', JSON.stringify(userSession));
    }

    // Store in sessionStorage for current session
    sessionStorage.setItem('userSession', JSON.stringify(userSession));

    // Dispatch Redux action to update auth state
    dispatch({
      type: 'LOGIN',
      payload: {
        email: values.email,
        password: values.password
      }
    });

    // Redirect to appropriate dashboard
    router.push(`/en/dashboard/${userType}`);
  };

  if (!userDetails) return null;

  /**
   * AMR's NOTIFICATIONS starts here
   */
  useEffect(() => { notify() }, [])

  const notify = () => (
    toast.info('Please check your inbox, your application has been reviewed', {
      position: "top-right",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }),

    toast.success('Someone has applied to one of your internship listings', {
      position: "top-right",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }),

    toast.info('A new internship cycle is staring soon!', {
      position: "top-right",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }),

    toast.info('Dear student your report status has been updated', {
      position: "top-right",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }),

    toast.success('Your appointment has been accepted', {
      position: "top-right",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }),

    toast.info('Incoming call', {
      position: "top-right",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }),

    toast.info('Reminder: You have an upcoming workshop', {
      position: "top-right",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }),

    toast.info('An attendee has sent a message', {
      position: "top-right",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  );

  /**
   * AMR's NOTIFICATIONS ends here
   */

  return (
    <div className="min-h-screen flex flex-col kontainer">
      <BackButton />
      {/* Main content */}
      <div className="flex-grow flex items-center justify-center py-8">
        <main className="w-full flex flex-col-reverse xl:flex-row items-center justify-center gap-4 xl:gap-16 px-4">
          <div className="w-full xl:w-2/5 flex flex-col-reverse xl:flex-col items-center">
            <div className="w-full max-w-[430px] px-4 xl:block hidden">
              <Blobs imageUrl={userDetails.imageUrl} bgColor={userDetails.bgColor} />
            </div>
            <div className="text-center mt-0 mb-16 xl:mb-0 xl:mt-8">
              {userType === 'company' && (
                <span className="text-black font-medium font-ibm-plex-sans">
                  Not registered yet?{' '}
                  <Link href={`/en/auth/signup?userType=${userType}`} className="text-metallica-blue-off-charts underline">
                    Sign up
                  </Link>
                </span>
              )}
            </div>
          </div>
          <div className="w-full xl:w-2/5 flex flex-col items-center mb-4 xl:mb-0">
            <div className="w-full max-w-md">
              {/* Header Section with Blobs */}
              <div className="flex flex-row items-start gap-8 mb-12 xl:hidden">
                <div className="w-24 h-24">
                  <Blobs
                    imageUrl={userDetails.imageUrl}
                    bgColor={userDetails.bgColor}
                    decreaseBorderThickness={true}
                  />
                </div>
                <Header
                  text={`Login`}
                  className="block xl:hidden"
                  size="text-6xl"
                />
              </div>
              <Header
                text={`Login`}
                className="hidden xl:block"
                size="text-6xl"
              />
              {error && (
                <div className="text-red-500 text-sm text-center mb-4">{error}</div>
              )}
              <LoginForm userType={userType} onSubmit={handleLogin} />
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer>
        <Copyright />
      </footer>
    </div>
  );
}