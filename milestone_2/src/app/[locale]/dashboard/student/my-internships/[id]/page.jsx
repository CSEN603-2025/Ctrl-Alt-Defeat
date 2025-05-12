"use client";
import { useParams } from "next/navigation";
import { getMyInternships } from "../../../../../../../constants/internshipData";
import InfoCard from "@/components/shared/InfoCard";
import StatusBadge from "@/components/shared/StatusBadge";

const statusColors = {
  current: 'bg-blue-100 text-blue-800 border-blue-400',
  completed: 'bg-green-100 text-green-800 border-green-400',
  evaluated: 'bg-purple-100 text-purple-800 border-purple-400',
};

export default function MyInternshipViewPage() {
  const { id } = useParams();
  const internship = getMyInternships().find(app => app.id === Number(id));
  if (!internship) return <div className="p-8 text-center">Internship not found.</div>;

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 pt-0 pb-8 max-w-2xl">
      <InfoCard
        title={internship.title}
        subtitle={internship.type + (internship.jobSetting ? ` • ${internship.jobSetting}` : "")}
        label={internship.company}
        rightTop={internship.paid ? "$ Paid" : "Unpaid"}
        rightBottom={`Started on ${formatDate(internship.startDate)}`}
        leftIcon={<div className="w-12 h-12 rounded-full bg-gray-300" />}
        className="mb-6"
      >
        {/* Status Badge */}
        {internship.status && (
          <StatusBadge color={statusColors[internship.status.toLowerCase()] || ''} className="mt-2">
            {internship.status.toUpperCase()}
          </StatusBadge>
        )}
      </InfoCard>
      <div className="bg-white rounded-lg border border-[#5DB2C7] p-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-2">
            <p><span className="font-semibold">Start Date:</span> {formatDate(internship.startDate)}</p>
            <p><span className="font-semibold">Duration:</span> {internship.duration || "-"}</p>
            <p><span className="font-semibold">Rate:</span> {internship.rate || "-"}</p>
            <div>
              <h4 className="font-semibold">Skills:</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {internship.skills && internship.skills.length > 0 ? internship.skills.map((skill, idx) => (
                  <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#E2F4F7] text-[#5DB2C7] border border-[#5DB2C7]">{skill}</span>
                )) : <span className="text-gray-500">N/A</span>}
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <h4 className="font-semibold mb-1">Job Description</h4>
            <div className="border border-[#5DB2C7] rounded-md p-2 mb-2">
              <p className="text-sm text-gray-600">{internship.description || "N/A"}</p>
            </div>
            <h4 className="font-semibold mb-1">Requirements</h4>
            <div className="border border-[#5DB2C7] rounded-md p-2">
              <p className="text-sm text-gray-600">{internship.requirements || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 