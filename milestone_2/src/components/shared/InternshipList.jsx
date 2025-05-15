"use client";
import { useState } from 'react';
import CardTable from './CardTable';
import DatePicker from '../DatePicker';
import InternshipRow from './InternshipRow';
import NoResults from './NoResults';
import Report from "../Report";

const statusColors = {
  // Applied internship statuses
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-400',
  accepted: 'bg-green-100 text-green-800 border-green-400',
  finalized: 'bg-purple-100 text-purple-800 border-purple-400',
  rejected: 'bg-red-100 text-red-800 border-red-400',

  // My internship statuses
  current: 'bg-blue-100 text-blue-800 border-blue-400',
  completed: 'bg-green-100 text-green-800 border-green-400',
  evaluated: 'bg-purple-100 text-purple-800 border-purple-400',
};

export default function InternshipList({
  title = "INTERNSHIPS",
  internships = [],
  type = "regular", // "regular", "my", "applied"
  statuses = [],
  customFilterPanel,
  onApplicationCompleted,
  appliedInternshipIds = new Set(),
  showDatePicker = true,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedDate, setSelectedDate] = useState(null);
  const [reportingInternship, setReportingInternship] = useState(false);

  // Default statuses if none provided
  const displayStatuses = statuses.length > 0 ? statuses :
    type === "my" ? ['current', 'completed', 'evaluated'] :
      type === "applied" ? ['pending', 'accepted', 'finalized', 'rejected'] :
        [];

  const filterFunction = (internship) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      internship.title.toLowerCase().includes(searchLower) ||
      internship.company.toLowerCase().includes(searchLower) ||
      (internship.skills && internship.skills.some(skill =>
        skill.toLowerCase().includes(searchLower))
      );

    const matchesStatus =
      activeTab === 'all' ||
      internship.status?.toLowerCase() === activeTab;

    const matchesDate = !selectedDate || (
      (type === "applied" && internship.appliedDate && new Date(internship.appliedDate).toDateString() === new Date(selectedDate).toDateString()) ||
      (type !== "applied" && internship.startDate && new Date(internship.startDate).toDateString() === new Date(selectedDate).toDateString())
    );

    // For "applied" type, only show internships with applied statuses
    if (type === "applied") {
      const isApplied = displayStatuses.includes(internship.status?.toLowerCase());
      return matchesSearch && matchesStatus && matchesDate && isApplied;
    }

    // For "my" type, only show internships with my statuses
    if (type === "my") {
      const isMine = displayStatuses.includes(internship.status?.toLowerCase());
      return matchesSearch && matchesStatus && matchesDate && isMine;
    }

    // For regular internships, show all
    return matchesSearch && matchesStatus && matchesDate;
  };

  const handleTriggerReportCreate = (internship) => {
    setReportingInternship(internship);
  };

  const handleReportClose = () => {
    setReportingInternship(null);
  };

  const handleReportAddTile = (data) => {
    // Handle any data submission from the report if necessary
    // For now, just closes the report view
    setReportingInternship(null);
    // You might want to trigger a data refresh or navigation here
  };

  return (
    <>
    {reportingInternship ? (
      <Report
        // Pass the internship data to the Report component if it needs it
        // internshipData={reportingInternship} 
        isOpen={true} // If reportingInternship is not null, the report is open
        onClose={handleReportClose}
        onAddTile={handleReportAddTile}
      />
    ) : (
      <div className="w-full px-4 py-6 space-y-4">
      
        {  <div className="w-full max-w-5xl mx-auto px-2 md:px-6">
           
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-metallica-blue-200">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex-shrink-0 bg-[var(--metallica-blue-100)] rounded-full p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[var(--metallica-blue-700)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
          </div>
          <div>
            <p className="text-sm text-gray-400"></p>
            <div className="text-2xl font-semibold text-[#2a5f74] mb-4"> {type=="my"?"Your Internships  Dashboard": type=="applied"?"Track Your Internship Applications":"Browse Career-Building Internships"}</div>
            {type=="my"? <div className="text-gray-700 mb-2"> Manage all your internships in one place.
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li> Current internships are ongoing</li>
            <li> Completed internships are awaiting your report and evaluation submissions</li>
            <li> Evaluated ones have been reviewed by your supervisor</li>
            </ul> 
          <p className="text-metallica-blue-700 font-medium">
           Use the filters to sort through your internship history or search for specific opportunities.
           </p>
           </div>
           :type=="applied"?<div className="text-gray-700 mb-2">Welcome to your personal internship tracking dashboard. Here you can monitor the status of all your internship applications in real-time.
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li><span className="text-metallica-blue-700 font-medium">Pending: </span> Your application has been submitted and is under review</li>
            <li><span className="text-metallica-blue-700 font-medium">Finalized: </span> Your application has been reviewed and you've been shortlisted as one of the top candidates</li>
            <li><span className="text-metallica-blue-700 font-medium">Accepted: </span> Congratulations! Your application has been approved</li>
            <li><span className="text-metallica-blue-700 font-medium">Rejected: </span> Unfortunately, your application was not selected this time</li>
            </ul> 
          <p className="text-metallica-blue-700 font-medium">
           Need help with your pending applications? Contact your career advisor for guidance on follow-up strategies or preparation for upcoming interviews.
          </p>
            </div>:<div className="text-gray-700 mb-2"> Explore curated internship opportunities provided by SCAD and our partner companies. These positions are designed to give you real-world experience while building your professional portfolio.
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
              <p className="text-metallica-blue-700 font-medium">Why These Opportunities Matter:</p>
            <li>Potential for academic credit and professional references</li>
            <li> Networking connections that could lead to full-time employment</li>
            <li>Portfolio-building projects to showcase your skillsr</li>
            </ul> 
          <p className="text-metallica-blue-700 font-medium">
            Remember to watch our informational video "What Makes Your Internship Count" to learn how to maximize your internship experience and ensure it contributes meaningfully to your academic requirements.
          </p>
            </div>}
            
          </div>
        </div>
      </div>
       
        <div className="w-full max-w-3xl mx-auto">
          {/* First CardTable for Search Bar only */}
          <CardTable
            title=""
            data={[]}
            filterFunction={() => true}
            emptyMessage=""
            searchConfig={{
              searchTerm: searchTerm,
              onSearchChange: setSearchTerm,
              placeholder: 'Search by job title, company, or skills...',
              hideSearchBar: false
            }}
            filterConfig={{ showFilter: false }}
            renderCard={() => null}
          />

          {/* Custom Filter Panel (e.g., All/Recommended) */}
          {customFilterPanel && (
            <div className="py-2 mb-4">{customFilterPanel}</div>
          )}

          {/* Status Tabs and Date Picker Row */}
          {displayStatuses.length > 0 && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2 mb-4">
              {/* Status Tabs */}
              <div className="flex flex-wrap gap-2">
                {['all', ...displayStatuses].map((tab) => {
  const isActive = activeTab === tab;

  // You can define hover styles manually if needed
  const hoverStyles = {
    pending: 'hover:bg-yellow-100 hover:text-yellow-800 hover:border-yellow-400',
    accepted: 'hover:bg-green-100 hover:text-green-800 hover:border-green-400',
    finalized: 'hover:bg-purple-100 hover:text-purple-800 hover:border-purple-400',
    rejected: 'hover:bg-red-100 hover:text-red-800 hover:border-red-400',
    current: 'hover:bg-blue-100 hover:text-blue-800 hover:border-blue-400',
    completed: 'hover:bg-green-100 hover:text-green-800 hover:border-green-400',
    evaluated: 'hover:bg-purple-100 hover:text-purple-800 hover:border-purple-400',
  };

  const activeStyles = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-400',
    accepted: 'bg-green-100 text-green-800 border-green-400',
    finalized: 'bg-purple-100 text-purple-800 border-purple-400',
    rejected: 'bg-red-100 text-red-800 border-red-400',
    current: 'bg-blue-100 text-blue-800 border-blue-400',
    completed: 'bg-green-100 text-green-800 border-green-400',
    evaluated: 'bg-purple-100 text-purple-800 border-purple-400',
  };

  return (
    <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border
        ${isActive
          ? activeStyles[tab] ?? 'bg-[#D9F0F4] text-[#2a5f74] border-[#3298BA]'
          : `bg-white text-gray-600 border-gray-300 ${hoverStyles[tab] ?? 'hover:bg-gray-50'}`}`}
    >
      {tab === 'all' ? 'All' : tab.charAt(0).toUpperCase() + tab.slice(1)}
    </button>
  );
})}
              </div>

              {showDatePicker && (
                <DatePicker
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                />
              )}
            </div>
          )}

          {/* Internship Cards */}
          <CardTable
            data={internships}
            filterFunction={filterFunction}
            emptyMessage={
              <NoResults
                mainMessage={`No internships found matching your criteria`}
                subMessage="Try adjusting your search or filter"
              />
            }
            searchConfig={{
              hideSearchBar: true
            }}
            filterConfig={{ showFilter: false }}
            renderCard={(internship) => (
              <InternshipRow
                key={internship.id}
                internship={internship}
                type={type}
                statusColors={statusColors}
                onApplicationCompleted={onApplicationCompleted}
                isApplied={appliedInternshipIds.has(internship.id)}
                onTriggerReportCreate={handleTriggerReportCreate} // Pass the handler down
              />
            )}
          />
        </div>
      </div>
      }
      </div>
    )}
    </>
  );
}
