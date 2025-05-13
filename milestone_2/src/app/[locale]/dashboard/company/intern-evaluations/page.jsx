"use client"
import CompanyEvaluations from "@/components/CompanyEvaluations"
import { useState } from "react"
import CompanyEvaluationTiles from "@/components/CompanyEvaluationTiles"
import Header from "@/components/Header"
import { Students } from "../../../../../../constants/mockData"
import { SkillsProffessional, TechnicalBackground, CommandLanguages } from "../../../../../../constants/mockData"

export default function StudentEvaluations(){
    const [evaluations, setEvaluations] = useState([]);
    const [availableStudents, setAvailableStudents] = useState(Students);
    const [isCreateEvaluationOpen, setIsCreateEvaluationOpen] = useState(false);

    const handleAddEvaluation = (newEvaluation) => {
        setEvaluations((prev) => [...prev, newEvaluation]);
        setAvailableStudents((prev) => prev.filter((student) => student != newEvaluation.studentName));
    };

    const handleEditEvaluation = (index, updatedEvaluation) => {
        setEvaluations((prev) => {
            const newEvaluations = [...prev];
            newEvaluations[index] = updatedEvaluation;
            return newEvaluations;
        });
    };

    const handleDeleteEvaluation = (index) => {
        setEvaluations((prev) => {
            const deletedEvaluation = prev[index];
            return prev.filter((_, i) => i !== index);
        });
    };

    const handleViewEvaluation = (index) => {
        console.log("View evaluation at index:", index);
    };    return(
        <div className="w-full px-4 py-6 space-y-4">
            <div className="w-full max-w-6xl mx-auto">
                <Header text="My Intern Evaluations" size="text-6xl" className="mb-6"/>
                
                <CompanyEvaluationTiles
                    evaluations={evaluations}
                    onEdit={handleEditEvaluation}
                    onDelete={handleDeleteEvaluation}
                    onView={handleViewEvaluation}
                />

                <div className="fixed bottom-8 right-8">
                    <button
                        onClick={() => setIsCreateEvaluationOpen(true)}
                        className="p-4 bg-[#5DB2C7] text-white rounded-full shadow-lg hover:bg-[#4796a8] transition-colors"
                    >
                        + Create New Evaluation
                    </button>
                </div>

                {/* Create Evaluation Modal */}
                {isCreateEvaluationOpen && (
                    <CompanyEvaluations 
                        students = {availableStudents}
                        isOpen={isCreateEvaluationOpen}
                        onClose={() => setIsCreateEvaluationOpen(false)}
                        onAddEvaluation={(data) => {
                            handleAddEvaluation(data);
                            setIsCreateEvaluationOpen(false);
                        }}
                    />
                )}
            </div>
        </div>
    )
}