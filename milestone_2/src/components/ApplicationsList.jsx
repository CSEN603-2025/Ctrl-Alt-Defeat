"use client";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSearch, faUser, faBuilding, faXmark, faChevronDown, faChevronUp, faEnvelope, faPhone, faCalendarAlt, faMapMarkerAlt, faGraduationCap, faLink, faCheckCircle, faTimesCircle, faClock } from '@fortawesome/free-solid-svg-icons';
import StatusBadge from './shared/StatusBadge';
import ActionButton from './shared/ActionButton';

// Mock applications data
const MOCK_APPLICATIONS = [
  {
    id: 1,
    internshipId: 1,
    internshipTitle: "Frontend Developer Intern",
    studentName: "Sarah Johnson",
    studentEmail: "sarah.johnson@example.com",
    studentPhone: "+20 123 456 7890",
    studentUniversity: "German University in Cairo",
    studentMajor: "Media Engineering & Technology",
    studentSemester: "Spring 2024",
    appliedDate: "2024-04-10",
    resumeLink: "https://example.com/resume",
    coverLetterLink: "https://example.com/coverletter",
    portfolioLink: "https://example.com/portfolio",
    status: "pending" // pending, accepted, rejected, finalized, current, completed
  },
  {
    id: 2,
    internshipId: 2,
    internshipTitle: "UI/UX Design Intern",
    studentName: "Mohammed Ahmed",
    studentEmail: "mohammed.ahmed@example.com",
    studentPhone: "+20 123 456 7891",
    studentUniversity: "American University in Cairo",
    studentMajor: "Computer Science",
    studentSemester: "Fall 2023",
    appliedDate: "2024-04-05",
    resumeLink: "https://example.com/resume",
    coverLetterLink: "https://example.com/coverletter",
    portfolioLink: "https://example.com/portfolio",
    status: "accepted"
  },
  {
    id: 3,
    internshipId: 1,
    internshipTitle: "Frontend Developer Intern",
    studentName: "Omar Farouq",
    studentEmail: "omar.farouq@example.com",
    studentPhone: "+20 123 456 7892",
    studentUniversity: "Cairo University",
    studentMajor: "Software Engineering",
    studentSemester: "Spring 2024",
    appliedDate: "2024-04-08",
    resumeLink: "https://example.com/resume",
    coverLetterLink: "https://example.com/coverletter",
    portfolioLink: null,
    status: "finalized"
  },
  {
    id: 4,
    internshipId: 3,
    internshipTitle: "Backend Developer Intern",
    studentName: "Fatma Mostafa",
    studentEmail: "fatma.mostafa@example.com",
    studentPhone: "+20 123 456 7893",
    studentUniversity: "Ain Shams University",
    studentMajor: "Computer Engineering",
    studentSemester: "Fall 2023",
    appliedDate: "2024-04-02",
    resumeLink: "https://example.com/resume",
    coverLetterLink: "https://example.com/coverletter",
    portfolioLink: "https://example.com/portfolio",
    status: "rejected"
  },
  {
    id: 5,
    internshipId: 4,
    internshipTitle: "Data Analyst Intern",
    studentName: "Ali Hassan",
    studentEmail: "ali.hassan@example.com",
    studentPhone: "+20 123 456 7894",
    studentUniversity: "GUC",
    studentMajor: "Data Science",
    studentSemester: "Spring 2023",
    appliedDate: "2024-04-01",
    resumeLink: "https://example.com/resume",
    coverLetterLink: "https://example.com/coverletter",
    portfolioLink: "https://example.com/portfolio",
    status: "current"
  },
  {
    id: 6,
    internshipId: 5,
    internshipTitle: "Marketing Intern",
    studentName: "Nour Mohamed",
    studentEmail: "nour.mohamed@example.com",
    studentPhone: "+20 123 456 7895",
    studentUniversity: "British University in Egypt",
    studentMajor: "Marketing",
    studentSemester: "Fall 2022",
    appliedDate: "2024-03-28",
    resumeLink: "https://example.com/resume",
    coverLetterLink: "https://example.com/coverletter",
    portfolioLink: null,
    status: "completed"
  }
];

// Mock internships data
const MOCK_INTERNSHIPS = [
  { id: 1, title: "Frontend Developer Intern" },
  { id: 2, title: "UI/UX Design Intern" },
  { id: 3, title: "Backend Developer Intern" },
  { id: 4, title: "Data Analyst Intern" },
  { id: 5, title: "Marketing Intern" }
];

// Status configuration with colors and available transitions
const STATUS_CONFIG = {
  pending: {
    label: "PENDING",
    color: "bg-yellow-100 text-yellow-800 border border-yellow-400",
    badgeColor: "bg-yellow-600",
    transitions: ["accepted", "rejected"]
  },
  accepted: {
    label: "ACCEPTED",
    color: "bg-green-100 text-green-800 border border-green-400",
    badgeColor: "bg-green-600",
    transitions: ["finalized", "rejected"]
  },
  rejected: {
    label: "REJECTED",
    color: "bg-red-100 text-red-800 border border-red-400",
    badgeColor: "bg-red-600",
    transitions: []
  },
  finalized: {
    label: "FINALIZED",
    color: "bg-purple-100 text-purple-800 border border-purple-400",
    badgeColor: "bg-purple-600",
    transitions: ["current"]
  },
  current: {
    label: "CURRENT INTERN",
    color: "bg-blue-100 text-blue-800 border border-blue-400",
    badgeColor: "bg-blue-600",
    transitions: ["completed"]
  },
  completed: {
    label: "COMPLETED",
    color: "bg-green-100 text-green-800 border border-green-400",
    badgeColor: "bg-green-600",
    transitions: []
  }
};

export default function ApplicationsList() {
  const [applications, setApplications] = useState(MOCK_APPLICATIONS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedInternship, setSelectedInternship] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isCombinedFilterPopoverOpen, setIsCombinedFilterPopoverOpen] = useState(false);

  // Filter applications based on search term, status, and internship
  const filteredApplications = applications.filter(app => {
    const matchesSearch =
      app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.studentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.internshipTitle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus;
    const matchesInternship = selectedInternship === 'all' || app.internshipId === parseInt(selectedInternship);

    return matchesSearch && matchesStatus && matchesInternship;
  });

  // Handle application selection
  const handleSelectApplication = (application) => {
    if (selectedApplication && selectedApplication.id === application.id) {
      setSelectedApplication(null);
    } else {
      setSelectedApplication(application);
    }
  };

  // Handle status change
  const handleStatusChange = (applicationId, newStatus) => {
    setApplications(prevApplications =>
      prevApplications.map(app =>
        app.id === applicationId ? { ...app, status: newStatus } : app
      )
    );

    // Update the selected application if it's currently selected
    if (selectedApplication && selectedApplication.id === applicationId) {
      setSelectedApplication(prev => ({ ...prev, status: newStatus }));
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedStatus('all');
    setSelectedInternship('all');
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // New: Close combined filter popover on outside click
      if (!event.target.closest('.combined-filter-popover') && !event.target.closest('.combined-filter-button')) {
        setIsCombinedFilterPopoverOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-left text-[#2a5f74] relative">
          APPLICATIONS MANAGEMENT
          <span className="absolute bottom-0 left-0 w-16 h-1 bg-[#2a5f74]"></span>
        </h1>

        {/* Filters section - MODIFIED for modern/futuristic look */}
        <div className="w-full bg-[#D9F0F4]/60 backdrop-blur-md p-6 rounded-xl shadow-lg mb-8 border border-[#B8E1E9]/50 transition-all duration-300 hover:shadow-xl">
          {/* Added Title for Filter Options */}
          <h3 className="text-lg font-semibold text-[#2a5f74] mb-5 text-left">Filter Options</h3>

          <div className="w-full flex flex-col md:flex-row gap-4 justify-between items-center"> {/* Ensured items-center here for the input row itself */}
            {/* Search box - MODIFIED */}
            <div className="flex-1 w-full md:w-auto md:max-w-md">
              <div className="relative w-full flex justify-center items-center">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, email, or position..."
                  className="w-full py-3 pl-10 pr-10 appearance-none bg-white/90 backdrop-blur-sm border-2 border-[#B8E1E9] hover:border-[#5DB2C7] text-sm text-[#1a3f54] rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-[#5DB2C7] focus:border-[#5DB2C7] transition-all duration-300 placeholder-gray-500"
                />
                <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="h-4 w-4 text-[#5DB2C7]"
                  />
                </div>
                {searchTerm && (
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3.5 flex items-center p-1 rounded-full hover:bg-[#B8E1E9]/50 transition-colors duration-200"
                    onClick={() => setSearchTerm('')}
                  >
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="w-4 h-4 text-[#5DB2C7] hover:text-[#2a5f74]"
                    />
                  </button>
                )}
              </div>
            </div>

            {/* NEW Combined Filter Button and Popover */}
            <div className="relative w-full md:w-auto">
              <button
                onClick={() => setIsCombinedFilterPopoverOpen(!isCombinedFilterPopoverOpen)}
                className="appearance-none w-full md:w-auto bg-white/90 backdrop-blur-sm border-2 border-[#B8E1E9] hover:border-[#5DB2C7] text-sm text-[#1a3f54] py-3 px-4 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-[#5DB2C7] focus:border-[#5DB2C7] transition-all duration-300 flex items-center justify-center gap-2 combined-filter-button min-w-[150px]"
              >
                <FontAwesomeIcon icon={faFilter} className="h-4 w-4 text-[#5DB2C7]" />
                <span>Filters</span>
                <FontAwesomeIcon icon={faChevronDown} className={`h-4 w-4 text-[#5DB2C7] transition-transform duration-300 ${isCombinedFilterPopoverOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCombinedFilterPopoverOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white/95 backdrop-blur-md border-2 border-[#B8E1E9] rounded-xl shadow-xl z-30 combined-filter-popover animate-dropdown focus:outline-none p-4 space-y-4">
                  {/* Internship Filter Section */}
                  <div>
                    <h4 className="text-sm font-semibold text-[#2a5f74] mb-2">Internship Position</h4>
                    <div className="max-h-40 overflow-y-auto space-y-1 pr-1">
                      <div
                        className={`px-3 py-2 text-sm text-[#2a5f74] hover:bg-[#D9F0F4] rounded-lg cursor-pointer transition-colors duration-200 ${selectedInternship === 'all' ? 'bg-[#D9F0F4] font-semibold' : 'font-normal'}`}
                        onClick={() => { setSelectedInternship('all'); /* setIsCombinedFilterPopoverOpen(false); // Optional: close on select */ }}
                      >
                        All Internships
                      </div>
                      {MOCK_INTERNSHIPS.map(internship => (
                        <div
                          key={internship.id}
                          className={`px-3 py-2 text-sm text-[#2a5f74] hover:bg-[#D9F0F4] rounded-lg cursor-pointer transition-colors duration-200 ${selectedInternship === internship.id.toString() ? 'bg-[#D9F0F4] font-semibold' : 'font-normal'}`}
                          onClick={() => { setSelectedInternship(internship.id.toString()); /* setIsCombinedFilterPopoverOpen(false); */ }}
                        >
                          {internship.title}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Status Filter Section */}
                  <div>
                    <h4 className="text-sm font-semibold text-[#2a5f74] mb-2">Status</h4>
                    <div className="max-h-40 overflow-y-auto space-y-1 pr-1">
                      <div
                        className={`px-3 py-2 text-sm text-[#2a5f74] hover:bg-[#D9F0F4] rounded-lg cursor-pointer transition-colors duration-200 ${selectedStatus === 'all' ? 'bg-[#D9F0F4] font-semibold' : 'font-normal'}`}
                        onClick={() => { setSelectedStatus('all'); /* setIsCombinedFilterPopoverOpen(false); */ }}
                      >
                        All Statuses
                      </div>
                      {Object.entries(STATUS_CONFIG).map(([status, config]) => (
                        <div
                          key={status}
                          className={`px-3 py-2 text-sm flex items-center gap-2 text-[#2a5f74] hover:bg-[#D9F0F4] rounded-lg cursor-pointer transition-colors duration-200 ${selectedStatus === status ? 'bg-[#D9F0F4] font-semibold' : 'font-normal'}`}
                          onClick={() => { setSelectedStatus(status); /* setIsCombinedFilterPopoverOpen(false); */ }}
                        >
                          <span className={`h-2.5 w-2.5 rounded-full ${config.badgeColor} border border-black/20`}></span>
                          {config.label}
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Optional: Add Apply/Close buttons for the popover here */}
                </div>
              )}
            </div>
          </div>

          {/* Active filters - MODIFIED for tag-like appearance */}
          <div className="w-full flex flex-wrap gap-3 items-center mt-4 pt-4 border-t border-[#B8E1E9]/50">
            {(searchTerm || selectedStatus !== 'all' || selectedInternship !== 'all') ? (
              <>
                <span className="text-sm text-[#2a5f74] font-medium">Active Filters:</span>

                {searchTerm && (
                  <div className="flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-white/80 text-[#2a5f74] border-2 border-[#B8E1E9] shadow-sm hover:shadow-md transition-all duration-300 group">
                    <span className="mr-1.5">Search:</span>
                    <span className="font-semibold italic mr-1.5">"{searchTerm}"</span>
                    <button
                      className="ml-1 p-0.5 rounded-full text-[#5DB2C7] hover:bg-[#B8E1E9]/60 hover:text-[#1a3f54] transition-colors duration-200"
                      onClick={() => setSearchTerm('')}
                      aria-label="Remove search term"
                    >
                      <FontAwesomeIcon icon={faXmark} className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {selectedStatus !== 'all' && (
                  <div className={`flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${STATUS_CONFIG[selectedStatus].color} shadow-sm hover:shadow-md transition-all duration-300 group`}>
                    <span className="mr-1.5">Status:</span>
                    <span className="font-semibold mr-1.5">{STATUS_CONFIG[selectedStatus].label}</span>
                    <button
                      className="ml-1 p-0.5 rounded-full opacity-70 hover:opacity-100 transition-opacity duration-200 hover:bg-black/10"
                      onClick={() => setSelectedStatus('all')}
                      aria-label={`Remove status filter ${STATUS_CONFIG[selectedStatus].label}`}
                    >
                      <FontAwesomeIcon icon={faXmark} className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {selectedInternship !== 'all' && (
                  <div className="flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-white/80 text-[#2a5f74] border-2 border-[#B8E1E9] shadow-sm hover:shadow-md transition-all duration-300 group">
                    <span className="mr-1.5">Position:</span>
                    <span className="font-semibold mr-1.5">{MOCK_INTERNSHIPS.find(i => i.id === parseInt(selectedInternship))?.title}</span>
                    <button
                      className="ml-1 p-0.5 rounded-full text-[#5DB2C7] hover:bg-[#B8E1E9]/60 hover:text-[#1a3f54] transition-colors duration-200"
                      onClick={() => setSelectedInternship('all')}
                      aria-label="Remove position filter"
                    >
                      <FontAwesomeIcon icon={faXmark} className="w-3 h-3" />
                    </button>
                  </div>
                )}

                <button
                  className="ml-auto bg-[#2a5f74] hover:bg-[#1a3f54] text-white px-3 py-1.5 rounded-lg text-xs font-medium shadow-sm hover:shadow-md transition-all duration-300 flex items-center"
                  onClick={clearFilters}
                >
                  <FontAwesomeIcon icon={faXmark} className="w-3 h-3 mr-1.5" /> Clear All
                </button>
              </>
            ) : (
              <p className="text-sm text-gray-500 italic">No filters currently applied.</p>
            )}
          </div>
        </div>

        {/* Applications list */}
        <div className="space-y-4">
          {filteredApplications.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <FontAwesomeIcon icon={faUser} className="text-gray-400 text-xl" />
              </div>
              <p className="text-gray-500 font-medium">No applications found</p>
              <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
            </div>
          ) : (
            filteredApplications.map(application => (
              <div
                key={application.id}
                className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden
                  transition-[background,border,box-shadow,backdrop-filter] duration-300 ease-in-out 
                  group hover:border-metallica-blue-300 hover:backdrop-blur-sm hover:bg-white/90 
                  ${selectedApplication?.id === application.id
                    ? 'ring-2 ring-[#5DB2C7] shadow-md'
                    : 'hover:shadow-md'
                  }`}
              >
                {/* Application summary row */}
                <div
                  className="p-4 cursor-pointer flex flex-wrap md:flex-nowrap items-center gap-4 transition-all duration-300 ease-in-out group-hover:bg-gray-50"
                  onClick={() => handleSelectApplication(application)}
                >
                  {/* Student icon/avatar */}
                  <div className="w-12 h-12 rounded-full bg-metallica-blue-100 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-md">
                    <FontAwesomeIcon icon={faUser} className="text-metallica-blue-700 text-xl" />
                  </div>

                  {/* Student info */}
                  <div className="flex-1 min-w-0 md:w-1/3 lg:w-2/5">
                    <h3 className="font-semibold text-gray-800 truncate group-hover:text-metallica-blue-800 transition-all duration-300">
                      {application.studentName}
                    </h3>
                    <p className="text-sm text-gray-600 truncate group-hover:text-gray-700 transition-colors duration-300">
                      {application.internshipTitle}
                    </p>
                  </div>

                  {/* University - HIDDEN as per user request */}
                  <div className="hidden md:hidden lg:hidden w-0 md:w-1/4 lg:w-1/5 flex-shrink-0"> {/* Effectively hidden across all sizes */}
                    <p className="text-sm text-gray-600 truncate">{application.studentUniversity}</p>
                    <p className="text-xs text-gray-500 truncate">{application.studentMajor}</p>
                  </div>

                  {/* Applied date - Adjusting width since University is hidden */}
                  <div className="hidden md:block md:w-1/3 lg:w-1/4 flex-shrink-0">
                    <p className="text-xs text-gray-500">Applied on</p>
                    <p className="text-sm text-gray-600">
                      {new Date(application.appliedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>

                  {/* Status badge - Adjusting width since University is hidden */}
                  <div className="flex-shrink-0 md:w-auto lg:w-1/4 text-right"> {/* Added text-right for better alignment of badge content */}
                    <StatusBadge color={STATUS_CONFIG[application.status].color}>
                      <span className="flex items-center">
                        <span className={`inline-block w-2 h-2 rounded-full ${STATUS_CONFIG[application.status].badgeColor} mr-1.5`}></span>
                        {STATUS_CONFIG[application.status].label}
                      </span>
                    </StatusBadge>
                  </div>

                  {/* Expand/Collapse icon */}
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`text-gray-400 ml-2 flex-shrink-0 transition-transform duration-300 ease-in-out 
                      ${selectedApplication?.id === application.id ? 'rotate-180' : 'rotate-0'}`}
                  />
                </div>

                {/* Expanded application details - NEW outer wrapper for accordion animation */}
                <div
                  className={`
                    overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]
                    transform-gpu
                    ${selectedApplication?.id === application.id ? 'max-h-[1000px]' : 'max-h-0'}
                  `}
                >
                  {/* This div is the one that was previously conditionally rendered (selectedApplication?.id === application.id) */}
                  {/* It now handles its own opacity and contains the original structure, and is always rendered if the parent is, but opacity controls visibility */}
                  <div
                    className={`
                      px-4 pt-4 pb-6 
                      bg-gray-50 border-t border-gray-200 
                      flex flex-col md:flex-row 
                      transition-opacity duration-700 ease-in-out
                      ${selectedApplication?.id === application.id ? 'opacity-100 delay-300' : 'opacity-0'}
                    `}
                  >
                    {/* Left column - Student details (removed animate-slideInFromLeft and py-4) */}
                    <div className="flex-1 md:pr-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">Applicant Details</h4>

                      <div className="space-y-2">
                        <div className="flex items-center group">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 transition-transform duration-300 group-hover:scale-110">
                            <FontAwesomeIcon icon={faEnvelope} className="text-blue-500" />
                          </div>
                          <a href={`mailto:${application.studentEmail}`} className="text-sm text-metallica-blue-600 hover:underline transition-colors duration-300 hover:text-metallica-blue-800">
                            {application.studentEmail}
                          </a>
                        </div>

                        <div className="flex items-center group">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2 transition-transform duration-300 group-hover:scale-110">
                            <FontAwesomeIcon icon={faPhone} className="text-green-500" />
                          </div>
                          <p className="text-sm text-gray-700">{application.studentPhone}</p>
                        </div>

                        <div className="flex items-center group">
                          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2 transition-transform duration-300 group-hover:scale-110">
                            <FontAwesomeIcon icon={faGraduationCap} className="text-purple-500" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-700">Major: {application.studentMajor}</p>
                            <p className="text-xs text-gray-500">Semester: {application.studentSemester || 'N/A'}</p>
                          </div>
                        </div>
                      </div>

                      <h4 className="text-sm font-semibold text-gray-700 mb-3 mt-4">Application Documents</h4>

                      <div className="space-y-2">
                        <a
                          href={application.resumeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-metallica-blue-600 hover:text-metallica-blue-800 group"
                        >
                          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-2 transition-transform duration-300 group-hover:scale-110">
                            <FontAwesomeIcon icon={faLink} className="text-amber-500" />
                          </div>
                          <span className="text-sm group-hover:underline transition-all duration-300">Resume</span>
                        </a>

                        <a
                          href={application.coverLetterLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-metallica-blue-600 hover:text-metallica-blue-800 group"
                        >
                          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-2 transition-transform duration-300 group-hover:scale-110">
                            <FontAwesomeIcon icon={faLink} className="text-amber-500" />
                          </div>
                          <span className="text-sm group-hover:underline transition-all duration-300">Cover Letter</span>
                        </a>

                        {application.portfolioLink && (
                          <a
                            href={application.portfolioLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-metallica-blue-600 hover:text-metallica-blue-800 group"
                          >
                            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-2 transition-transform duration-300 group-hover:scale-110">
                              <FontAwesomeIcon icon={faLink} className="text-amber-500" />
                            </div>
                            <span className="text-sm group-hover:underline transition-all duration-300">Portfolio</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Right column - Status management (removed animate-slideInFromRight and adjusted padding/borders) */}
                    <div className="w-full md:w-72 flex-shrink-0 md:border-l border-gray-200 md:pl-4 mt-6 md:mt-0 border-t md:border-t-0 pt-6 md:pt-0">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">Current Application Status</h4>

                      <div className="flex items-center mb-4 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                        <div className={`w-3 h-3 rounded-full mr-2 ${STATUS_CONFIG[application.status].badgeColor}`}></div>
                        <p className="text-sm font-medium text-gray-700">
                          {STATUS_CONFIG[application.status].label}
                        </p>
                      </div>

                      {/* Status transition buttons */}
                      <div className="flex flex-col items-center space-y-3 w-full">
                        {STATUS_CONFIG[application.status].transitions.map(nextStatus => (
                          <ActionButton
                            key={nextStatus}
                            buttonType={nextStatus === 'rejected' ? 'reject' : 'accept'}
                            text={`Mark as ${STATUS_CONFIG[nextStatus].label}`}
                            icon={nextStatus === 'rejected' ? faTimesCircle :
                              (nextStatus === 'completed' ? faCheckCircle : faClock)}
                            onClick={() => handleStatusChange(application.id, nextStatus)}
                            buttonClassName="!w-full text-sm py-3 hover:scale-102 transition-transform duration-300"
                          />
                        ))}

                        {STATUS_CONFIG[application.status].transitions.length === 0 && (
                          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center w-full">
                            <p className="text-sm text-gray-500 italic">
                              No further status changes available
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add animations */}
      <style jsx global>{`
        @keyframes dropdown {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-dropdown {
          animation: dropdown 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
} 