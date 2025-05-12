"use client"

import { useState } from "react"
import { Students, SkillsProffessional, TechnicalBackground, CommandLanguages } from "../../constants/mockData"

export default function CompanyEvaluations( { student, onAddEvaluation } ){
    const [form, setForm] = useState({})
    const [selectedStudent, setSelectedStudent] = useState("")
    const [availableStudents, setAvailableStudents] = useState(Students)

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
        if (selectedStudent) {
            onAddEvaluation({
                studentName: selectedStudent,
                ...form,
            })
            setAvailableStudents((prev) => prev.filter((student) => student !== selectedStudent))
            setForm({})
            setSelectedStudent("")
            document.querySelectorAll('input[type="radio"]').forEach(input => input.checked = false); // Reset radio buttons visually
        }
    }

    const handleStudentChange = (e) => {
        setSelectedStudent(e.target.value)
        setForm({}) // Reset form selections when student changes
        document.querySelectorAll('input[type="radio"]').forEach(input => input.checked = false); // Reset radio buttons visually
    }

    return(
        <div className="flex justify-center items-center min-h-screen bg-[#E2F4F7]">
            <div className="p-6 bg-[#F9FAFB] rounded-lg shadow-md w-full max-w-2xl border-2 border-[#5DB2C7]">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">Please evaluate the following students</h3>
                    <select
                        value={selectedStudent}
                        onChange={handleStudentChange}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" disabled>Select a student</option>
                        {availableStudents.map((student, index) => (
                            <option key={index} value={student}>{student}</option>
                        ))}
                    </select>
                </div>
                <p className="mb-6 text-sm text-gray-500">1=Unsatisfactory 2=Below Average 3=Satisfactory 4=Above Average 5=Excellent</p>
                <form className="space-y-6 bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
                    {/* Skills Professional Section */}
                    <div>
                        <h4 className="text-md font-semibold mb-2">Skills Professional</h4>
                        {SkillsProffessional.map((skill, index) => (
                            <div key={index} className="mb-4">
                                <p className="text-sm mb-1 text-gray-700">{skill}</p>
                                <div className="flex space-x-4">
                                    {[1, 2, 3, 4, 5].map(value => (
                                        <label key={value} className="flex items-center space-x-1">
                                            <input
                                                type="radio"
                                                name={`SkillsProffessional-${index}`}
                                                value={value}
                                                onChange={() => handleChange("SkillsProffessional", skill, value)}
                                                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700">{value}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Technical Background Section */}
                    <div>
                        <h4 className="text-md font-semibold mb-2">Technical Background</h4>
                        {TechnicalBackground.map((tech, index) => (
                            <div key={index} className="mb-4">
                                <p className="text-sm mb-1 text-gray-700">{tech}</p>
                                <div className="flex space-x-4">
                                    {[1, 2, 3, 4, 5].map(value => (
                                        <label key={value} className="flex items-center space-x-1">
                                            <input
                                                type="radio"
                                                name={`TechnicalBackground-${index}`}
                                                value={value}
                                                onChange={() => handleChange("TechnicalBackground", tech, value)}
                                                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700">{value}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Command Languages Section */}
                    <div>
                        <h4 className="text-md font-semibold mb-2">Command Languages</h4>
                        {CommandLanguages.map((language, index) => (
                            <div key={index} className="mb-4">
                                <p className="text-sm mb-1 text-gray-700">{language}</p>
                                <div className="flex space-x-4">
                                    {[1, 2, 3, 4, 5].map(value => (
                                        <label key={value} className="flex items-center space-x-1">
                                            <input
                                                type="radio"
                                                name={`CommandLanguages-${index}`}
                                                value={value}
                                                onChange={() => handleChange("CommandLanguages", language, value)}
                                                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700">{value}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="bg-[var(--metallica-blue-600)] hover:bg-[var(--metallica-blue-700)] text-white px-6 py-2 rounded-md transition-colors shadow-sm font-medium"
                    >
                        Submit Evaluation
                    </button>
                </form>
            </div>
        </div>
    )
}