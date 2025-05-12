"use client";
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import StatusBadge from './StatusBadge';
import { Tooltip } from 'react-tooltip';
import UploadDocuments from '../UploadDocuments';
import Report from "../Report"; // Import the Report component

const formatDate = (isoDate) => {
  if (!isoDate) return "-";
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Helper to show how long ago a date was
const timeAgo = (isoDate) => {
  if (!isoDate) return "-";
  const now = new Date();
  const date = new Date(isoDate);
  const diff = now - date;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  if (months > 0) return `posted ${months} month${months > 1 ? 's' : ''} ago`;
  if (weeks > 0) return `posted ${weeks} week${weeks > 1 ? 's' : ''} ago`;
  if (days > 0) return `posted ${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `posted ${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `posted ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'posted just now';
};

// Tooltip messages specifically for APPLIED internship statuses
const appliedStatusTooltipMessages = {
  accepted: "Your application has been accepted by the company! Congratulations!",
  pending: "Your application has been submitted but not yet reviewed by the company.",
  finalized: "You are among the top applicants, and the company may proceed with an offer soon. Awaiting final confirmation.",
  rejected: "Unfortunately, your application was not selected for this position this time.",
};

export default function InternshipRow({ internship, type, onApplicationCompleted, isApplied }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHeightAnimating, setIsHeightAnimating] = useState(false);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [reportCreate, setReportCreate] = useState(false);
  const router = useRouter();

  const handleToggle = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsHeightAnimating(true);
      setTimeout(() => {
        setIsDescriptionVisible(true);
      }, 400);
    } else {
      setIsDescriptionVisible(false);
      setTimeout(() => {
        setIsHeightAnimating(false);
        setIsOpen(false);
      }, 600);
    }
  };

  // Determine tooltip content ONLY for applied type
  let tooltipContent = undefined;
  if (type === 'applied') {
    const currentStatus = internship.status ? internship.status.toLowerCase() : null;
    if (currentStatus) {
      tooltipContent = appliedStatusTooltipMessages[currentStatus];
    }
  }

  const handleOpenUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  const handleCloseUploadModal = (success, appliedInternshipId) => {
    setIsUploadModalOpen(false);
    if (success && onApplicationCompleted && appliedInternshipId) {
      onApplicationCompleted(appliedInternshipId);
    }
    // Potentially refresh data or give feedback if an upload happened - handled by parent
  };

  const handleOpenReportCreate = () => {
    setReportCreate(true);
  }

  const handleCloseReportCreate = () => {
    setReportCreate(false);
  }

  return (
    <div className="mb-3 w-full max-w-3xl mx-auto">
      {/* Header Row (Click to Expand) */}
      <div className="relative">
        <button
          onClick={handleToggle}
          className={`group flex flex-col p-4 w-full bg-[#E2F4F7] rounded-lg border-2 border-[#5DB2C7] hover:shadow-md transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] gap-4 relative font-['IBM_Plex_Sans']
                    ${isHeightAnimating ? 'pb-8' : ''} overflow-hidden`}
        >
          {/* Top Row */}
          <div className="flex items-start gap-4">
            {/* Left: Logo and Company */}
            <div className="flex flex-col items-center w-24 flex-shrink-0 space-y-3">
              <div className="w-12 h-12 rounded-full bg-gray-300"></div>
              <p className="text-sm font-medium text-gray-500 text-center">{internship.company}</p>
            </div>

            {/* Center: Job Details */}
            <div className="flex-1 min-w-0 ml-2">
              <div className="flex flex-col space-y-1">
                <h3 className="text-lg font-bold text-gray-800 text-left">{internship.title}</h3>
                <div className="flex flex-col space-y-2">
                  <p className="text-sm text-gray-600 text-left">{internship.type}</p>
                  <div className="inline-flex">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-800">
                      {internship.locationType}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Status Badge */}
            <div className="flex flex-col items-end w-28 flex-shrink-0 space-y-2">
              {type === 'regular' && (
                <StatusBadge color={internship.paid ? 'bg-green-100 text-green-800 border-green-400' : 'bg-gray-100 text-gray-600 border-gray-400'} className="border">
                  {internship.paid ? '$ Paid' : 'Unpaid'}
                </StatusBadge>
              )}

              {type === 'my' && (
                <StatusBadge
                  color={
                    internship.status === 'current' ? 'bg-blue-100 text-blue-800 border-blue-400' :
                      internship.status === 'completed' ? 'bg-green-100 text-green-800 border-green-400' :
                        internship.status === 'evaluated' ? 'bg-purple-100 text-purple-800 border-purple-400' :
                          'bg-gray-100 text-gray-600 border-gray-400'
                  }
                  className="border"
                >
                  {internship.status ? internship.status.toUpperCase() : 'CURRENT'}
                </StatusBadge>
              )}

              {type === 'applied' && (
                <StatusBadge
                  data-tooltip-id="status-tooltip"
                  data-tooltip-content={tooltipContent}
                  color={
                    internship.status === 'accepted' ? 'bg-green-100 text-green-800 border-green-400' :
                      internship.status === 'rejected' ? 'bg-red-100 text-red-800 border-red-400' :
                        internship.status === 'finalized' ? 'bg-purple-100 text-purple-800 border-purple-400' :
                          'bg-yellow-100 text-yellow-800 border-yellow-400'
                  }
                  className="border"
                >
                  {internship.status ? internship.status.toUpperCase() : 'PENDING'}
                </StatusBadge>
              )}
            </div>

            {/* Chevron Icon */}
            <ChevronDown
              className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 h-5 w-5 text-gray-500 transition-transform duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'rotate-180' : ''}`}
              aria-hidden
            />

            {/* Posted/Applied/Started Date (Header Row) */}
            <span className="absolute bottom-2 right-2 text-xs text-gray-500">
              {type === 'my' && `started on ${formatDate(internship.startDate)}`}
              {type === 'applied' && `applied on ${formatDate(internship.appliedDate)}`}
              {type === 'regular' && timeAgo(internship.postedDate)}
            </span>
          </div>

          {/* Expanded Company Details (Left Aligned) */}
          {isHeightAnimating && (
            <div className="mt-4 flex flex-col p-4 w-full text-left space-y-1 transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]">
              <p className={`text-sm text-gray-700 transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${isDescriptionVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
                {internship.details}
              </p>
            </div>
          )}
        </button>
      </div>

      {/* Collapsible Content */}
      <div
        className={`overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] transform-gpu
                  ${isOpen ? 'max-h-[2000px]' : 'max-h-0'}`}
      >
        <div className={`px-4 py-4 bg-white rounded-b-lg border border-t-0 border-[#5DB2C7] mt-1 font-['IBM_Plex_Sans']
                      transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] transform-gpu origin-top
                      ${isOpen ? 'translate-y-0 scale-y-100' : 'translate-y-[-100%] scale-y-0'}`}>
          {/* Section 1 & 2 */}
          <div className="flex flex-col md:flex-row gap-6 mb-4">
            {/* Left */}
            <div className="flex-1 space-y-4 p-3">
              {/* Start Date & Duration */}
              <div className="space-y-2">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Start Date:</span> {formatDate(internship.startDate)}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Duration:</span> {internship.duration}
                </p>
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-600">Skills:</h4>
                <div className="flex flex-wrap gap-2">
                  {internship.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#E2F4F7] text-[#5DB2C7] border border-[#5DB2C7]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="flex-1 space-y-1 p-3">
              {/* Job Description Title */}
              <h4 className="text-sm font-semibold text-gray-600 mb-1">Job Description</h4>
              <div className="border border-[#5DB2C7] rounded-md p-2">
                <p className="text-sm text-gray-600">{internship.description}</p>
              </div>
              {/* Requirements Title */}
              <h4 className="text-sm font-semibold text-gray-600 mb-1">Requirements</h4>
              <div className="border border-[#5DB2C7] rounded-md p-2">
                <p className="text-sm text-gray-600">{internship.requirements || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-t border-gray-400 mt-6 pt-3">
            <div className="flex flex-col">
              <p className="text-base font-bold text-gray-800">
                {internship.rate || "Rate not specified"}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {type === 'my' && `started on ${formatDate(internship.startDate)}`}
                {type === 'applied' && `applied on ${formatDate(internship.appliedDate)}`}
                {type === 'regular' && timeAgo(internship.postedDate)}
              </p>
            </div>
            {type === 'regular' ? (
              <button
                onClick={isApplied ? undefined : handleOpenUploadModal}
                className={`px-4 py-2 text-white rounded-lg transition w-full sm:w-auto text-sm ${isApplied
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#5DB2C7] hover:bg-[#4796a8]'
                  }`}
                disabled={isApplied}
              >
                {isApplied ? 'Applied' : 'Apply'}
              </button>
            ) : type === 'applied' ? (
              <button
                className="px-4 py-2 bg-[#5DB2C7] text-white rounded-lg hover:bg-[#4796a8] transition w-full sm:w-auto text-sm"
                onClick={() => router.push(`/dashboard/student/applied-internships/${internship.id}`)}
              >
                View Application
              </button>
            ) : type === 'my' ? (
              <div className="flex items-center gap-4">
                {internship.status === 'completed' && (
                  <button
                    onClick={handleOpenReportCreate}
                    className="px-4 py-2 bg-[#5DB2C7] text-white rounded-lg hover:bg-[#4796a8] transition w-full sm:w-auto text-sm"
                  >
                    Create Report
                  </button>
                )}
                {/* View Application button for all 'my' internships (current, completed) */}
                <button
                  className="px-4 py-2 bg-[#5DB2C7] text-white rounded-lg hover:bg-[#4796a8] transition w-full sm:w-auto text-sm"
                  onClick={() => router.push(`/dashboard/student/applied-internships/${internship.id}`)}
                >
                  View Application
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {/* Tooltip component instance - only needed if type='applied' might be rendered */}
      {type === 'applied' && <Tooltip id="status-tooltip" />}

      {/* Upload Documents Modal */}
      <UploadDocuments
        open={isUploadModalOpen}
        onClose={handleCloseUploadModal}
        internshipId={internship.id}
      />

      {/* Create Report Modal */}
      {reportCreate && (
        <Report
          isOpen={reportCreate}
          onClose={handleCloseReportCreate}
          onAddTile={(data) => {
            handleCloseReportCreate();
          }}
        />
      )}
    </div>
  );
}
