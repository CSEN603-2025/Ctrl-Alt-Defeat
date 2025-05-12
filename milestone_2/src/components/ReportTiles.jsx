"use client"
import { useState } from "react";
import StatusBadge from "./shared/StatusBadge";

const statusColors = {
  'Accepted': 'bg-green-100 text-green-800 border-green-400',
  'Flagged': 'bg-yellow-100 text-yellow-800 border-yellow-400',
  'Pending': 'bg-blue-100 text-blue-800 border-blue-400',
  'Rejected': 'bg-red-100 text-red-800 border-red-400',
};

export default function ReportTiles({ tiles, onEditClick, onDeleteClick }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tiles.map((tile, index) => (        <div key={index} className="relative p-6 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden break-words">
          {/* Status Badge */}
          {tile.status && (
            <div className="absolute top-4 right-4">
              <StatusBadge color={statusColors[tile.status]} className="border">
                {tile.status.toUpperCase()}
              </StatusBadge>
            </div>
          )}
          <h1 className="text-lg font-bold text-gray-800 mb-2 break-words">Report Summary</h1>
          <h3>Internship Title:</h3>
          <p>{tile.internshipTitle}</p>
          <h3>Organization Name:</h3>
          <p className="text-sm text-gray-600 mb-1 break-words">{tile.companyOrgName}</p>
          <h3>Performed Tasks:</h3>
          <p className="text-sm text-gray-600 mb-1 break-words">{tile.tasks}</p>
          <p className="text-sm text-gray-600 mb-1 break-words">Satisfaction: {tile.satisfaction}</p>
          <p className="text-sm text-gray-600 break-words">Recommendation: {tile.recommendation}</p>

          <div className="mt-2">
            <p className="text-sm font-medium text-gray-700">Major:</p>
            <StatusBadge color="bg-blue-100 text-blue-800">{tile.major}</StatusBadge>
          </div>

          <div className="mt-2">
            <p className="text-sm font-medium text-gray-700">Helpful Courses:</p>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(tile.selectedCourses) && tile.selectedCourses.map((course, idx) => (
                <StatusBadge key={idx} color="bg-green-100 text-green-800">{course}</StatusBadge>
              ))}
            </div>
          </div>

          {expandedIndex === index && (
            <div className="mt-4 space-y-2">
              <h3>Introduction:</h3>
              <p className="text-sm text-gray-600">{tile.introduction}</p>
              <h3>Company Description:</h3>
              <p className="text-sm text-gray-600">{tile.companyDesc}</p>
              <h3>Evaluation:</h3>
              <p className="text-sm text-gray-600">{tile.evaluation}</p>
              <h3>Conclusion:</h3>
              <p className="text-sm text-gray-600">{tile.conclusion}</p>
              <h3>References:</h3>
              <p className="text-sm text-gray-600">{tile.references}</p>
              <h3>Appendices:</h3>
              <p className="text-sm text-gray-600">{tile.appendencies}</p>
            </div>
          )}
          <div className="mt-2 space-x-2">
            <button onClick={() => onEditClick(index)} className="px-3 py-1 bg-yellow-500 text-white rounded">Edit</button>
            <button onClick={() => onDeleteClick(index)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
            <button onClick={() => toggleExpand(index)} className="px-3 py-1 bg-green-500 text-white rounded">
              {expandedIndex === index ? "Collapse" : "View Full Report"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}