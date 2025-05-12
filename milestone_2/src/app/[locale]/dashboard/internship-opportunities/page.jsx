'use client';
import InternshipList from '@/components/shared/InternshipList';
import { getRegularInternships } from '../../../../../constants/internshipData';

export default function InternshipsPage() {
  return (
    <div className="container mx-auto px-4 pt-0 pb-8">
      <InternshipList
        title="INTERNSHIP OPPORTUNITIES"
        internships={getRegularInternships()}
        type="regular"
      />
    </div>
  );
}
