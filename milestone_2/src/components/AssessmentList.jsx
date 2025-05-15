import { useState, useEffect } from "react";
import AssessmentCard from "./AssessmentCard";
import AssessmentSidebar from "./AssessmentSidebar";
import { mockAssessments } from "../../constants/mockData";

export default function AssessmentList() {
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  // Reset the sidebar content when a new assessment is selected
  useEffect(() => {
    if (selectedAssessment) {
      setSelectedAssessment(selectedAssessment);
    }
  }, [selectedAssessment]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 min-h-screen flex flex-col">
      {/* Title */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-left text-[#2a5f74] relative">
          AVAILABLE ASSESSMENTS
          <span className="absolute bottom-0 left-0 w-24 h-1 bg-[#2a5f74]"></span>
        </h1>
      </div>

      {/* Main content area */}
      <div className="relative flex-1 flex">
        {/* Assessment grid */}
        <div className={`transition-all duration-300 ease-in-out flex-1 flex justify-start items-start ${selectedAssessment ? "pr-[33%]" : "pr-0"}`}>
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${selectedAssessment ? "lg:grid-cols-2" : "lg:grid-cols-3"} gap-6`}>
            {mockAssessments.map((assessment) => (
              <AssessmentCard 
                key={assessment.id} 
                assessment={assessment} 
                onClick={setSelectedAssessment} 
              />
            ))}
          </div>
        </div>

        {/* Fixed sidebar */}
        <AssessmentSidebar 
          assessment={selectedAssessment} 
          onClose={() => setSelectedAssessment(null)} 
        />
      </div>
    </div>
  );
}
