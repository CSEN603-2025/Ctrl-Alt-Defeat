import { useState } from "react";
import { SkillsProffessional, TechnicalBackground, CommandLanguages } from "../../constants/mockData"

export default function CompanyEvaluationEdit({ initialData, onSave, onCancel }) {
    const [form, setForm] = useState(initialData);

    const handleChange = (section, question, value) => {
        setForm((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [question]: value,
            },
        }));
    };

    const handleSave = () => {
        onSave(form);
    };

    return (
        <div className="space-y-6">
            <div>
                <h4 className="text-md font-semibold mb-2">Skills Professional</h4>
                {SkillsProffessional.map((skill, index) => (
                    <div key={index} className="mb-4">
                        <p className="text-sm mb-1 text-gray-700">{skill}</p>
                        <div className="flex space-x-4">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <label key={value} className="flex items-center space-x-1">
                                    <input
                                        type="radio"
                                        name={`SkillsProffessional-${index}`}
                                        value={value}
                                        checked={form.SkillsProffessional?.[skill] === value}
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

            <div>
                <h4 className="text-md font-semibold mb-2">Technical Background</h4>
                {TechnicalBackground.map((tech, index) => (
                    <div key={index} className="mb-4">
                        <p className="text-sm mb-1 text-gray-700">{tech}</p>
                        <div className="flex space-x-4">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <label key={value} className="flex items-center space-x-1">
                                    <input
                                        type="radio"
                                        name={`TechnicalBackground-${index}`}
                                        value={value}
                                        checked={form.TechnicalBackground?.[tech] === value}
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

            <div>
                <h4 className="text-md font-semibold mb-2">Command Languages</h4>
                {CommandLanguages.map((language, index) => (
                    <div key={index} className="mb-4">
                        <p className="text-sm mb-1 text-gray-700">{language}</p>
                        <div className="flex space-x-4">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <label key={value} className="flex items-center space-x-1">
                                    <input
                                        type="radio"
                                        name={`CommandLanguages-${index}`}
                                        value={value}
                                        checked={form.CommandLanguages?.[language] === value}
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

            <div className="flex justify-end space-x-4">
                <button
                    onClick={onCancel}
                    className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Save
                </button>
            </div>
        </div>
    );
}
