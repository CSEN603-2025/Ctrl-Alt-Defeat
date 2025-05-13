"use client"

import { useState } from "react"
import { SkillsProffessional, TechnicalBackground, CommandLanguages } from "../../constants/mockData"
import Modal from "./shared/Modal";

export default function CompanyEvaluations({ students, onAddEvaluation, isOpen, onClose }){
    const [form, setForm] = useState({})
    const [selectedStudent, setSelectedStudent] = useState("")
    const [availableStudents, setAvailableStudents] = useState(students)

    const handleChange = (section, question, value) => {
        setForm((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [question]: value,
            },
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onAddEvaluation({
            studentName: selectedStudent,
            ...form,
        })
        setForm({})
        setSelectedStudent("")
        document.querySelectorAll('input[type="radio"]').forEach(input => input.checked = false)
        onClose()
    }

    const handleStudentChange = (e) => {
        setSelectedStudent(e.target.value)
        setForm({})
        document.querySelectorAll('input[type="radio"]').forEach(input => input.checked = false)
    }
    
    if (!isOpen) return null;

    return(
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="bg-[#E2F4F7] rounded-lg border-2 border-[#5DB2C7] relative flex flex-col h-[85vh]">

                <div className="flex-1 overflow-y-auto px-6 pb-24">

                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Please evaluate the following interns</h2>
                        </div>
                        <div className="mb-6">
                            <select
                                value={selectedStudent}
                                onChange={handleStudentChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5DB2C7] focus:border-transparent border-gray-300"
                            >
                                <option value="" disabled>Select a student</option>
                                {availableStudents.map((student, index) => (
                                    <option key={index} value={student}>{student}</option>
                                ))}
                            </select>
                        </div>
                        <p className="mt-4 mb-6 text-sm text-gray-600">1=Unsatisfactory 2=Below Average 3=Satisfactory 4=Above Average 5=Excellent</p>
                    </div>

                    <form id="evaluationForm" className="space-y-8" onSubmit={handleSubmit}>
                        {/* Skills Professional Section */}
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h4 className="text-lg font-semibold mb-4 text-gray-900">Skills Professional</h4>
                            <div className="space-y-4">
                                {SkillsProffessional.map((skill, index) => (
                                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                                        <p className="text-sm font-medium text-gray-700 mb-2">{skill}</p>
                                        <div className="flex space-x-6">
                                            {[1, 2, 3, 4, 5].map(value => (
                                                <label key={value} className="flex items-center space-x-2">
                                                    <input
                                                        type="radio"
                                                        name={`SkillsProffessional-${index}`}
                                                        value={value}
                                                        onChange={() => handleChange("SkillsProffessional", skill, value)}
                                                        className="w-4 h-4 text-[#5DB2C7] border-gray-300 focus:ring-[#5DB2C7]"
                                                    />
                                                    <span className="text-sm text-gray-600">{value}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Technical Background Section */}
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h4 className="text-lg font-semibold mb-4 text-gray-900">Technical Background</h4>
                            <div className="space-y-4">
                                {TechnicalBackground.map((tech, index) => (
                                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                                        <p className="text-sm font-medium text-gray-700 mb-2">{tech}</p>
                                        <div className="flex space-x-6">
                                            {[1, 2, 3, 4, 5].map(value => (
                                                <label key={value} className="flex items-center space-x-2">
                                                    <input
                                                        type="radio"
                                                        name={`TechnicalBackground-${index}`}
                                                        value={value}
                                                        onChange={() => handleChange("TechnicalBackground", tech, value)}
                                                        className="w-4 h-4 text-[#5DB2C7] border-gray-300 focus:ring-[#5DB2C7]"
                                                    />
                                                    <span className="text-sm text-gray-600">{value}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Command Languages Section */}
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h4 className="text-lg font-semibold mb-4 text-gray-900">Command Languages</h4>
                            <div className="space-y-4">
                                {CommandLanguages.map((language, index) => (
                                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                                        <p className="text-sm font-medium text-gray-700 mb-2">{language}</p>
                                        <div className="flex space-x-6">
                                            {[1, 2, 3, 4, 5].map(value => (
                                                <label key={value} className="flex items-center space-x-2">
                                                    <input
                                                        type="radio"
                                                        name={`CommandLanguages-${index}`}
                                                        value={value}
                                                        onChange={() => handleChange("CommandLanguages", language, value)}
                                                        className="w-4 h-4 text-[#5DB2C7] border-gray-300 focus:ring-[#5DB2C7]"
                                                    />
                                                    <span className="text-sm text-gray-600">{value}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </form>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 bg-[#E2F4F7] border-t border-[#5DB2C7]">
                    <button
                        type="submit"
                        form="evaluationForm"
                        className="w-full px-6 py-3 bg-[#5DB2C7] text-white font-medium rounded-lg shadow-sm hover:bg-[#4796a8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#5DB2C7] focus:ring-offset-2"
                    >
                        Submit Evaluation
                    </button>
                </div>
            </div>
        </Modal>
    )      
}