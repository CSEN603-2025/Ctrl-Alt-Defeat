"use client"
import { useState } from "react"
import Report from "@/components/Report"
import Header from "@/components/Header"
import ReportTiles from "@/components/ReportTiles"
import ReportEdit from "@/components/ReportEdit"
import DeleteTileConfirmation from "@/components/DeleteTileConfirmation"
import { mockReports } from "../../../../../../constants/reportData"

export default function ReportDashboard(){
    const [reports, setReports] = useState(mockReports);
    const [editIndex, setEditIndex] = useState(null);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [isCreateReportOpen, setIsCreateReportOpen] = useState(false);

    const handleAddReport = (newReport) => {
        setReports((prev) => [...prev, newReport]);
    };

    const handleUpdateReport = (updatedReport) => {
        setReports((prev) =>
        prev.map((Report, i) => (i === editIndex ? updatedReport : Report))
        );
        setEditIndex(null);
    };

    const handleDeleteReport = () => {
        setReports((prev) => prev.filter((_, i) => i !== deleteIndex));
        setDeleteIndex(null);
    };    return(
        <div className="w-full px-4 py-6 space-y-4">
            <div className="w-full max-w-6xl mx-auto">
                <Header text="My Reports" size="text-6xl" className="mb-6"/>
                
                <ReportTiles 
                    tiles={reports} 
                    onEditClick={(index) => setEditIndex(index)}
                    onDeleteClick={(index) => setDeleteIndex(index)}
                />

                <div className="fixed bottom-8 right-8">
                    <button
                        onClick={() => setIsCreateReportOpen(true)}
                        className="p-4 bg-[#5DB2C7] text-white rounded-full shadow-lg hover:bg-[#4796a8] transition-colors"
                    >
                        + Create New Report
                    </button>
                </div>

                {/* Create Report Modal */}
                {isCreateReportOpen && (
                    <Report 
                        isOpen={isCreateReportOpen}
                        onClose={() => setIsCreateReportOpen(false)}
                        onAddTile={(data) => {
                            handleAddReport(data);
                            setIsCreateReportOpen(false);
                        }}
                    />
                )}

                {/* Edit Modal */}
                {editIndex !== null && (
                    <ReportEdit
                        report={reports[editIndex]}
                        onSave={handleUpdateReport}
                        onCancel={() => setEditIndex(null)}
                    />
                )}

                {/* Delete Confirmation Modal */}
                {deleteIndex !== null && (
                    <DeleteTileConfirmation
                        type="report"
                        onConfirm={handleDeleteReport}
                        onCancel={() => setDeleteIndex(null)}
                    />
                )}
            </div>
        </div>
    )
}