import { useState } from "react";
import CompanyEvaluationEdit from "@/components/CompanyEvaluationEdit";
import Modal from "@/components/Modal";
import DeleteTileConfirmation from "@/components/DeleteTileConfirmation";

export default function CompanyEvaluationTiles({ evaluations, onEdit, onDelete, onView }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");
    const [selectedEvaluation, setSelectedEvaluation] = useState(null);
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);

    const handleEdit = (evaluation, index) => {
        setSelectedEvaluation({ ...evaluation, index });
        setModalType("edit");
        setIsModalOpen(true);
    };

    const handleView = (evaluation) => {
        setSelectedEvaluation(evaluation);
        setModalType("view");
        setIsModalOpen(true);
    };

    const handleDelete = (index) => {
        setDeleteIndex(index);
        setIsDeleteConfirmationOpen(true);
    };

    const confirmDelete = () => {
        if (deleteIndex !== null) {
            onDelete(deleteIndex);
        }
        setIsDeleteConfirmationOpen(false);
        setDeleteIndex(null);
    };

    const handleSaveEdit = (updatedEvaluation) => {
        if (selectedEvaluation) {
            onEdit(selectedEvaluation.index, updatedEvaluation);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {evaluations.map((evaluation, index) => (
                <EvaluationCard
                    key={index}
                    evaluation={evaluation}
                    onEdit={() => handleEdit(evaluation, index)}
                    onDelete={() => handleDelete(index)}
                    onView={() => handleView(evaluation)}
                />
            ))}

            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={modalType === "edit" ? "Edit Evaluation" : "View Full Evaluation"}
                >
                    {modalType === "edit" ? (
                        <CompanyEvaluationEdit
                            initialData={selectedEvaluation}
                            onSave={handleSaveEdit}
                            onCancel={() => setIsModalOpen(false)}
                        />
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-md font-semibold mb-2">Skills Professional</h4>
                                {Object.entries(selectedEvaluation.SkillsProffessional || {}).map(([question, value], index) => (
                                    <p key={index} className="text-sm text-gray-700">
                                        <strong>{question}:</strong> {value}
                                    </p>
                                ))}
                            </div>
                            <div>
                                <h4 className="text-md font-semibold mb-2">Technical Background</h4>
                                {Object.entries(selectedEvaluation.TechnicalBackground || {}).map(([question, value], index) => (
                                    <p key={index} className="text-sm text-gray-700">
                                        <strong>{question}:</strong> {value}
                                    </p>
                                ))}
                            </div>
                            <div>
                                <h4 className="text-md font-semibold mb-2">Command Languages</h4>
                                {Object.entries(selectedEvaluation.CommandLanguages || {}).map(([question, value], index) => (
                                    <p key={index} className="text-sm text-gray-700">
                                        <strong>{question}:</strong> {value}
                                    </p>
                                ))}
                            </div>
                        </div>
                    )}
                </Modal>
            )}

            {isDeleteConfirmationOpen && (
                <DeleteTileConfirmation
                    type="evaluation"
                    onConfirm={confirmDelete}
                    onCancel={() => setIsDeleteConfirmationOpen(false)}
                />
            )}
        </div>
    );
}

function EvaluationCard({ evaluation, onEdit, onDelete, onView }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div
            className={`p-6 bg-white rounded-lg shadow-md border border-gray-200 transition-transform duration-300 ${isExpanded ? "scale-105" : ""}`}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            <h3 className="text-lg font-bold text-gray-800 mb-2">{evaluation.studentName}</h3>
            {isExpanded && (
                <div className="mt-4 space-y-4">
                    <div className="flex justify-between">
                        <button
                            onClick={onEdit}
                            className="bg-[var(--metallica-blue-600)] hover:bg-[var(--metallica-blue-700)] text-white px-3 py-1 rounded-md text-sm transition-colors"
                        >
                            Update
                        </button>
                        <button
                            onClick={onDelete}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                    <button
                        onClick={onView}
                        className="w-full bg-[var(--metallica-blue-600)] hover:bg-[var(--metallica-blue-700)] text-white px-3 py-1 rounded-md text-sm transition-colors"
                    >
                        View Evaluation
                    </button>
                </div>
            )}
        </div>
    );
}
