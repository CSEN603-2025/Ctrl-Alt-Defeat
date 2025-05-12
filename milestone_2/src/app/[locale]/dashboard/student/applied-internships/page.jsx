'use client';
import InternshipList from "@/components/shared/InternshipList";
import { getAppliedInternships } from "../../../../../../constants/internshipData";

export default function AppliedInternshipsPage() {
  return (
    <div className="container mx-auto px-4 pt-0 pb-8">
      <InternshipList
        title="APPLIED INTERNSHIPS"
        internships={getAppliedInternships()}
        type="applied"
        statuses={['pending', 'accepted', 'finalized', 'rejected']}
      />
    </div>
  );
} 