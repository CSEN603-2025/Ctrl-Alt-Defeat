'use client';
import InternshipList from "@/components/shared/InternshipList";
import { getMyInternships } from "../../../../../../constants/internshipData";

export default function MyInternshipsPage() {
  return (
    <div className="container mx-auto px-4 pt-0 pb-8">
      <InternshipList
        title="MY INTERNSHIPS"
        internships={getMyInternships()}
        type="my"
        statuses={['current', 'completed', 'evaluated']}
      />
    </div>
  );
}
