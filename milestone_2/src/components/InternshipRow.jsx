"use client";
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from 'lucide-react';

export default function InternshipRow({ internship }) {
  return (
    <Accordion.Item value={internship.id} className="mb-3 w-full max-w-3xl mx-auto">

      {/* Header Row (Click to Expand) */}
      <Accordion.Header>
        <Accordion.Trigger
          className="group flex flex-col p-4 w-full bg-[#E2F4F7] rounded-lg border-2 border-[#5DB2C7] hover:shadow-md transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] gap-4 relative font-['IBM_Plex_Sans']
                     data-[state=open]:pb-8"
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

            {/* Right: Compensation */}
            <div className="flex flex-col items-end w-28 flex-shrink-0 space-y-2">
              <span className={`font-semibold text-sm ${internship.paid ? 'text-green-600' : 'text-gray-600'}`}>
                {internship.paid ? '$ Paid' : 'Unpaid'}
              </span>
            </div>

            {/* Chevron Icon */}
            <ChevronDownIcon
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2 h-5 w-5 text-gray-500 transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-data-[state=open]:rotate-180"
              aria-hidden
            />

            {/* Posted Date */}
            <span className="absolute bottom-2 right-2 text-xs text-gray-500">
              posted {internship.postedDate}
            </span>
          </div>

          {/* Expanded Company Details (Left Aligned) */}
          <div className="mt-4 hidden group-data-[state=open]:flex flex-col p-4 transition-all duration-700 opacity-0 group-data-[state=open]:opacity-100 group-data-[state=open]:transition-opacity group-data-[state=open]:delay-500 w-full text-left space-y-1">
            <p className="text-sm text-gray-700">{internship.details}</p>
          </div>

        </Accordion.Trigger>
      </Accordion.Header>

      {/* Collapsible Content */}
      <Accordion.Content
        className="overflow-hidden opacity-0 data-[state=open]:opacity-100
                   px-4 py-4 bg-white rounded-b-lg border border-t-0 border-[#5DB2C7] mt-1 font-['IBM_Plex_Sans']
                   transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] origin-top transform-gpu"
      >

        {/* Section 1 & 2 */}
        <div className="flex flex-col md:flex-row gap-6 mb-4">
          {/* Left */}
          <div className="flex-1 space-y-4 p-3">
            {/* Start Date & Duration */}
            <div className="space-y-2">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Start Date:</span> {internship.startDate}
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
              posted {internship.postedDate}
            </p>
          </div>
          <button className="px-4 py-2 bg-[#5DB2C7] text-white rounded-lg hover:bg-[#4796a8] transition w-full sm:w-auto text-sm">
            Apply
          </button>
        </div>

      </Accordion.Content>

    </Accordion.Item>
  );
}
