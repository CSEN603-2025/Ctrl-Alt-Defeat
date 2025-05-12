"use client"
import CompanyEvaluations from "@/components/CompanyEvaluations"
import { useState } from "react"
import CompanyEvaluationTiles from "@/components/CompanyEvaluationTiles"

export default function StudentEvaluations(){
    const [evaluations, setEvaluations] = useState([]);
    const [availableStudents, setAvailableStudents] = useState([]);

    const handleAddEvaluation = (newEvaluation) => {
        setEvaluations((prev) => [...prev, newEvaluation]);
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
            setAvailableStudents((prevStudents) => [...prevStudents, deletedEvaluation.studentName]);
            return prev.filter((_, i) => i !== index);
        });
    };

    const handleViewEvaluation = (index) => {
        console.log("View evaluation at index:", index);
    };

    return(
        <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
                <CompanyEvaluations 
                    student="true" 
                    onAddEvaluation={handleAddEvaluation} 
                    availableStudents={availableStudents} 
                    setAvailableStudents={setAvailableStudents} 
                />
            </div>
            <div className="flex-1">
                <h2 className="text-lg font-bold mb-4">My Evaluations</h2>
                <CompanyEvaluationTiles
                    evaluations={evaluations}
                    onEdit={handleEditEvaluation}
                    onDelete={handleDeleteEvaluation}
                    onView={handleViewEvaluation}
                />
            </div>
        </div>
    )
}