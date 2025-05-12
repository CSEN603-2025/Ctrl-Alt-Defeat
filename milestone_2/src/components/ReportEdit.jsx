import StatusBadge from "./shared/StatusBadge";
import { useState, useEffect } from "react";
import { CSEN_Courses, DMET_Courses, BioTech_Courses, Law_Courses } from "../../constants/mockData";
import Modal from "./shared/Modal";

export default function TileEdit({ report, onSave, onCancel }) {
    const [editReport, setEditReport] = useState(report);
    const [courses, setCourses] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState(report.selectedCourses || []);
    const [isModalOpen, setIsModalOpen] = useState(true);

    useEffect(() => {
        setEditReport(report);
        setSelectedCourses(report.selectedCourses || []);
        updateCourses(report.major, report.selectedCourses || []);
    }, [report]);

    const handleClose = () => {
        setIsModalOpen(false);
        onCancel();
    };

    const updateCourses = (major, selectedCourses = []) => {
        let availableCourses = [];
        if (major === 'CSEN') {
            availableCourses = CSEN_Courses;
        } else if (major === 'DMET') {
            availableCourses = DMET_Courses;
        } else if (major === 'BioTechnology') {
            availableCourses = BioTech_Courses;
        } else if (major === 'Law') {
            availableCourses = Law_Courses;
        }
        // Filter out already selected courses
        setCourses(availableCourses.filter(course => !selectedCourses.includes(course)));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditReport((prev) => ({ ...prev, [name]: value }));
    };

    const handleMajorChange = (e) => {
        const newMajor = e.target.value;
        setEditReport((prev) => ({ ...prev, major: newMajor }));
        setSelectedCourses([]); // Reset chosen courses when major changes
        updateCourses(newMajor);
    };

    const handleCourseSelect = (e) => {
        const selectedCourse = e.target.value;
        if (selectedCourse && !selectedCourses.includes(selectedCourse)) {
            setSelectedCourses((prev) => [...prev, selectedCourse]);
            setCourses((prev) => prev.filter((course) => course !== selectedCourse));
        }
        e.target.value = ""; // Reset the dropdown to ensure no course is highlighted
    };

    const handleCourseRemove = (course) => {
        setSelectedCourses((prev) => prev.filter((c) => c !== course));
        setCourses((prev) => [...prev, course]);
    };

    const handleSave = () => {
        onSave({ ...editReport, selectedCourses });
    };

    return (
        <Modal isOpen={isModalOpen} onClose={handleClose}>
            <div className="p-6 bg-[#E2F4F7] rounded-lg border-2 border-[#5DB2C7] max-h-[80vh] overflow-y-auto">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Edit Report</h3>
                <label className="block text-sm font-medium text-gray-700">Internship Title:</label>
                <input required name="internshipTitle" value={editReport.internshipTitle} onChange={handleChange} className="w-full border p-2 rounded" />

                <label className="block text-sm font-medium text-gray-700">Company/Organization Name:</label>
                <input required name="companyOrgName" value={editReport.companyOrgName} onChange={handleChange} className="w-full border p-2 rounded" />

                <label className="block text-sm font-medium text-gray-700">Introduction:</label>
                <textarea required name="introduction" value={editReport.introduction} onChange={handleChange} className="w-full border p-2 rounded" />

                <label className="block text-sm font-medium text-gray-700">Company/Organization Description:</label>
                <textarea required name="companyDesc" value={editReport.companyDesc} onChange={handleChange} className="w-full border p-2 rounded" />

                <label className="block text-sm font-medium text-gray-700">Internship Performed Tasks:</label>
                <textarea required name="tasks" value={editReport.tasks} onChange={handleChange} className="w-full border p-2 rounded" />

                <label className="block text-sm font-medium text-gray-700">Internship Evaluation:</label>
                <p className="text-sm text-gray-500">
                    What skills do you think that you have gained from the internship? Did the internship meet your expectations?
                    If not, please explain why? How do you think the internship will influence your future career plans?
                    How do you think the internship activities that you carried out are correlated with your studies?
                    Which of the academic courses that you have taken in GUC were the most related to your internship?
                </p>
                <textarea required name="evaluation" value={editReport.evaluation} onChange={handleChange} className="w-full border p-2 rounded" />

                <label className="block text-sm font-medium text-gray-700">Conclusion:</label>
                <textarea required name="conclusion" value={editReport.conclusion} onChange={handleChange} className="w-full border p-2 rounded" />

                <label className="block text-sm font-medium text-gray-700">References:</label>
                <textarea required name="references" value={editReport.references} onChange={handleChange} className="w-full border p-2 rounded" />

                <label className="block text-sm font-medium text-gray-700">Appendencies:</label>
                <textarea required name="appendencies" value={editReport.appendencies} onChange={handleChange} className="w-full border p-2 rounded" />

                <div className="flex flex-col space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Please rate your satisfaction with the internship experience</label>
                    <div className="flex items-center">
                        <input onChange={handleChange} type="radio" name="satisfaction" value="Very satisfied" required className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                        <label className="ml-2 text-sm text-gray-700">Very satisfied</label>
                    </div>
                    <div className="flex items-center">
                        <input onChange={handleChange} type="radio" name="satisfaction" value="Somehow satisfied" className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                        <label className="ml-2 text-sm text-gray-700">Somehow satisfied</label>
                    </div>
                    <div className="flex items-center">
                        <input onChange={handleChange} type="radio" name="satisfaction" value="Neutral" className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                        <label className="ml-2 text-sm text-gray-700">Neutral</label>
                    </div>
                    <div className="flex items-center">
                        <input onChange={handleChange} type="radio" name="satisfaction" value="Somehow dissatisfied" className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                        <label className="ml-2 text-sm text-gray-700">Somehow dissatisfied</label>
                    </div>
                    <div className="flex items-center">
                        <input onChange={handleChange} type="radio" name="satisfaction" value="Very dissatisfied" className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                        <label className="ml-2 text-sm text-gray-700">Very dissatisfied</label>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Would you recommend this internship to other colleagues?</label>
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center">
                            <input onChange={handleChange} type="radio" name="recommendation" value="Yes" required className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                            <label className="ml-2 text-sm text-gray-700">Yes</label>
                        </div>
                        <div className="flex items-center">
                            <input onChange={handleChange} type="radio" name="recommendation" value="No" className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                            <label className="ml-2 text-sm text-gray-700">No</label>
                        </div>
                        <div className="flex items-center">
                            <input onChange={handleChange} type="radio" name="recommendation" value="Maybe" className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                            <label className="ml-2 text-sm text-gray-700">Maybe</label>
                        </div>
                    </div>
                </div>

                <label className="block text-sm font-medium text-gray-700">Major:</label>
                <select
                    name="major"
                    value={editReport.major || ""}
                    onChange={handleMajorChange}
                    className="w-full border p-2 rounded"
                >
                    <option value="" disabled>Select Major</option>
                    <option value="CSEN">CSEN</option>
                    <option value="DMET">DMET</option>
                    <option value="BioTechnology">BioTechnology</option>
                    <option value="Law">Law</option>
                </select>

                <label className="block text-sm font-medium text-gray-700">Helpful Courses:</label>
                <select
                    onChange={handleCourseSelect}
                    className="w-full border p-2 rounded"
                >
                    <option value="" disabled>Select a course</option>
                    {courses.map((course, index) => (
                        <option key={index} value={course}>{course}</option>
                    ))}
                </select>
                <div className="flex flex-wrap gap-2 mt-2">
                    {selectedCourses.map((course, index) => (
                        <StatusBadge
                            key={index}
                            color="bg-green-100 text-green-800"
                            className="cursor-pointer"
                            onClick={() => handleCourseRemove(course)}
                        >
                            {course}
                        </StatusBadge>
                    ))}
                </div>

                <div className="space-x-2 mt-4">
                    <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
                    <button onClick={onCancel} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
                </div>
            </div>
        </Modal>
    );
}