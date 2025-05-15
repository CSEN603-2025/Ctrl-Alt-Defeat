import React from "react";
import Image from "next/image";

export default function AssessmentCard({ assessment, onClick }) {
  return (
    <div 
      onClick={() => onClick(assessment)}
      className="bg-white border-[#86CBDA] rounded-lg shadow-sm transition-shadow duration-300 cursor-pointer overflow-hidden hover:scale-110 hover:shadow-2xl hover:border-[#3298BA] min-h-[380px]"
    >
      {/* Assessment Image */}
      <div className="relative h-56"> {/* Increased from h-40 to h-56 */}
        <img 
          src={assessment.imageUrl} 
          alt={assessment.title} 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Category Tag */}
        <span className="text-xs text-blue-600 font-medium mb-2 block">
          {assessment.type || "ASSESSMENT"}
        </span>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-4 line-clamp-2">
          {assessment.title}
        </h3>
      </div>
    </div>
  );
}
