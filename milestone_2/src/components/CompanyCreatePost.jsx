import { useEffect, useState } from 'react';
import DatePicker from './DatePicker';
import { format, isBefore, startOfDay, isValid, parseISO } from 'date-fns';

export default function CompanyCreatePost({ onAddPost, onFormChange, initialPost, isEditing }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    startDate: '',
    duration: '',
    jobType: 'Full-time',
    jobSetting: 'On-site',
    paid: 'Paid',
    salary: '',
    requirements: '',
    skills: [],
  });

  const [paidValidation, setPaid] = useState(true);
  const [skillInput, setSkillInput] = useState('');

  // Initialize form with post data if editing
  useEffect(() => {
    if (isEditing && initialPost) {
      setForm(initialPost);
    }
  }, [isEditing, initialPost]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    // Send updated form data to parent for live preview
    if (onFormChange) {
      onFormChange(updatedForm);
    }
  };

  const handleDateChange = (date) => {
    const updatedForm = { ...form, startDate: date };
    setForm(updatedForm);

    // Send updated form data to parent for live preview
    if (onFormChange) {
      onFormChange(updatedForm);
    }
  };

  const handleSkillInputChange = (e) => {
    setSkillInput(e.target.value);
  };

  const handleSkillInputKeyDown = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      if (!form.skills.includes(skillInput.trim())) {
        const updatedForm = {
          ...form,
          skills: [...form.skills, skillInput.trim()],
        };
        setForm(updatedForm);

        // Send updated form data to parent for live preview
        if (onFormChange) {
          onFormChange(updatedForm);
        }
      }
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    const updatedForm = {
      ...form,
      skills: form.skills.filter((skill) => skill !== skillToRemove),
    };
    setForm(updatedForm);

    // Send updated form data to parent for live preview
    if (onFormChange) {
      onFormChange(updatedForm);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPost(form);
    const resetForm = {
      title: '',
      description: '',
      startDate: '',
      duration: '',
      jobType: 'Full-time',
      jobSetting: 'On-site',
      paid: 'Paid',
      salary: '',
      requirements: '',
      skills: [],
    };
    setForm(resetForm);
    setSkillInput('');

    // Reset preview in parent component
    if (onFormChange) {
      onFormChange(resetForm);
    }
  };

  useEffect(() => {
    if (form.paid === 'Paid') {
      setPaid(true);
    } else {
      setPaid(false);
    }
  }, [form.paid]);

  // Send initial form state on component mount for preview
  useEffect(() => {
    if (onFormChange) {
      onFormChange(form);
    }
  }, []);

  // Function to disable past dates
  const disablePastDates = (date) => {
    if (!isValid(date)) return true;
    
    try {
      const today = startOfDay(new Date());
      return isBefore(date, today);
    } catch (error) {
      console.error("Error in date validation:", error);
      return false;
    }
  };

  // Common input style classes
  const inputClasses = "w-full border-2 border-[var(--metallica-blue-200)] p-2 rounded-md bg-white focus:border-[var(--metallica-blue-500)] focus:outline-none transition-colors";
  const labelClasses = "block text-sm font-medium text-[var(--metallica-blue-800)] mb-1";
  const sectionClasses = "mb-5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className={sectionClasses}>
        <label className={labelClasses}>Job Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter job title"
          required
          className={inputClasses}
        />
      </div>

      <div className={sectionClasses}>
        <label className={labelClasses}>Job Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Enter detailed job description"
          required
          className={`${inputClasses} min-h-[100px] resize-vertical`}
        />
      </div>

      <div className={sectionClasses}>
        <label className={labelClasses}>Start Date</label>
        <div className="mt-1">
          <DatePicker 
            selectedDate={form.startDate}
            onDateChange={handleDateChange}
            disabled={disablePastDates}
          />
        </div>
        {!form.startDate && (
          <p className="text-red-500 text-xs mt-1">Please select a start date</p>
        )}
      </div>

      <div className={sectionClasses}>
        <label className={labelClasses}>Duration</label>
        <input
          name="duration"
          value={form.duration}
          onChange={handleChange}
          placeholder="e.g., 3 months, 6 months"
          required
          className={inputClasses}
        />
      </div>

      <div className={sectionClasses}>
        <label className={labelClasses}>Internship Type</label>
        <div className="flex flex-wrap gap-4 mt-2">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              name="jobType"
              value="Full-time"
              checked={form.jobType === 'Full-time'}
              onChange={handleChange}
              className="form-radio h-4 w-4 text-[var(--metallica-blue-600)] border-[var(--metallica-blue-300)]"
            />
            <span className="ml-2 text-[var(--metallica-blue-700)]">Full-time</span>
          </label>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              name="jobType"
              value="Part-time"
              checked={form.jobType === 'Part-time'}
              onChange={handleChange}
              className="form-radio h-4 w-4 text-[var(--metallica-blue-600)] border-[var(--metallica-blue-300)]"
            />
            <span className="ml-2 text-[var(--metallica-blue-700)]">Part-time</span>
          </label>
        </div>
      </div>

      <div className={sectionClasses}>
        <label className={labelClasses}>Internship Setting</label>
        <div className="flex flex-wrap gap-4 mt-2">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              name="jobSetting"
              value="Remote"
              checked={form.jobSetting === 'Remote'}
              onChange={handleChange}
              className="form-radio h-4 w-4 text-[var(--metallica-blue-600)] border-[var(--metallica-blue-300)]"
            />
            <span className="ml-2 text-[var(--metallica-blue-700)]">Remote</span>
          </label>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              name="jobSetting"
              value="On-site"
              checked={form.jobSetting === 'On-site'}
              onChange={handleChange}
              className="form-radio h-4 w-4 text-[var(--metallica-blue-600)] border-[var(--metallica-blue-300)]"
            />
            <span className="ml-2 text-[var(--metallica-blue-700)]">On-site</span>
          </label>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              name="jobSetting"
              value="Hybrid"
              checked={form.jobSetting === 'Hybrid'}
              onChange={handleChange}
              className="form-radio h-4 w-4 text-[var(--metallica-blue-600)] border-[var(--metallica-blue-300)]"
            />
            <span className="ml-2 text-[var(--metallica-blue-700)]">Hybrid</span>
          </label>
        </div>
      </div>

      <div className={sectionClasses}>
        <label className={labelClasses}>Payment Status</label>
        <select
          name="paid"
          value={form.paid}
          onChange={handleChange}
          className={inputClasses}
        >
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
        </select>
      </div>

      {paidValidation && (
        <div className={sectionClasses}>
          <label className={labelClasses}>Salary</label>
          <input
            name="salary"
            value={form.salary}
            onChange={handleChange}
            placeholder="e.g., $500/month, $15/hour"
            required
            className={inputClasses}
          />
        </div>
      )}

      <div className={sectionClasses}>
        <label className={labelClasses}>Requirements</label>
        <textarea
          name="requirements"
          value={form.requirements}
          onChange={handleChange}
          placeholder="Enter detailed job requirements, qualifications, and expectations"
          required
          className={`${inputClasses} min-h-[100px] resize-vertical`}
        />
      </div>

      <div className={sectionClasses}>
        <label className={labelClasses}>Skills</label>
        <div className="w-full">
          <input
            type="text"
            value={skillInput}
            onChange={handleSkillInputChange}
            onKeyDown={handleSkillInputKeyDown}
            placeholder="Type a skill and press Enter (e.g., JavaScript, React, UI/UX)"
            className={inputClasses}
          />
          <div className="flex flex-wrap gap-2 mt-3">
            {form.skills.map((skill, index) => (
              <div
                key={index}
                className="bg-[var(--metallica-blue-100)] text-[var(--metallica-blue-800)] px-3 py-1 rounded-full flex items-center"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-2 text-[var(--metallica-blue-600)] hover:text-[var(--metallica-blue-800)] focus:outline-none"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          {form.skills.length === 0 && (
            <p className="text-sm text-[var(--metallica-blue-500)] mt-2">
              Skills will appear here as bubbles after you press Enter
            </p>
          )}
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="bg-[var(--metallica-blue-600)] hover:bg-[var(--metallica-blue-700)] text-white px-6 py-2 rounded-md transition-colors shadow-sm font-medium"
        >
          {isEditing ? 'Save Changes' : 'Create Post'}
        </button>
      </div>
    </form>
  );
}
