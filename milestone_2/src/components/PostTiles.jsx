import { useState, useRef, useEffect } from 'react';
import CompanyPost from './CompanyPost';
import CompanyCreatePost from './CompanyCreatePost';
import DeleteTileConfirmation from './DeleteTileConfirmation';

export default function PostTiles() {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingPostIndex, setDeletingPostIndex] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    jobType: [],
    jobSetting: []
  });
  const filterRef = useRef(null);
  const [postPreview, setPostPreview] = useState({
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

  // Close filters dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [filterRef]);

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  const handleAddPost = (newPost) => {
    if (editingPost !== null) {
      // We're updating an existing post
      setPosts((prevPosts) =>
        prevPosts.map((post, index) =>
          index === editingPost ? newPost : post
        )
      );
      setEditingPost(null);
    } else {
      // We're creating a new post
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    }
    setShowForm(false);
  };

  const handleFormChange = (updatedForm) => {
    setPostPreview(updatedForm);
  };

  const handleUpdateClick = (post) => {
    const postIndex = posts.findIndex(p =>
      p.title === post.title &&
      p.description === post.description
    );

    if (postIndex !== -1) {
      setEditingPost(postIndex);
      setPostPreview(post);
      setShowForm(true);
    }
  };

  const handleDeleteClick = (post) => {
    const postIndex = posts.findIndex(p =>
      p.title === post.title &&
      p.description === post.description
    );

    if (postIndex !== -1) {
      setDeletingPostIndex(postIndex);
    }
  };

  const handleConfirmDelete = () => {
    if (deletingPostIndex !== null) {
      setPosts(prevPosts => prevPosts.filter((_, index) => index !== deletingPostIndex));
      setDeletingPostIndex(null);
    }
  };

  const handleCancelDelete = () => {
    setDeletingPostIndex(null);
  };

  const toggleCreatePost = () => {
    if (showForm) {
      // If we're closing the form, clear the editing state
      setEditingPost(null);
      setPostPreview({
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
    }
    setShowForm(!showForm);
  };

  const toggleFilter = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterChange = (category, value) => {
    setFilters(prevFilters => {
      const updatedFilters = { ...prevFilters };

      if (updatedFilters[category].includes(value)) {
        // Remove the value if it's already selected
        updatedFilters[category] = updatedFilters[category].filter(item => item !== value);
      } else {
        // Add the value if it's not selected
        updatedFilters[category] = [...updatedFilters[category], value];
      }

      return updatedFilters;
    });
  };

  const clearFilters = () => {
    setFilters({
      jobType: [],
      jobSetting: []
    });
  };

  // Filter posts based on search query (only title) and filters
  const filteredPosts = posts.filter(post => {
    // Filter by title search
    const titleMatches = post.title?.toLowerCase().includes(searchQuery.toLowerCase());
    if (!titleMatches) return false;

    // Filter by job type
    if (filters.jobType.length > 0 && !filters.jobType.includes(post.jobType)) {
      return false;
    }

    // Filter by job setting
    if (filters.jobSetting.length > 0 && !filters.jobSetting.includes(post.jobSetting)) {
      return false;
    }

    return true;
  });

  // Available filter options
  const jobTypeOptions = ['Full-time', 'Part-time', 'Internship'];
  const jobSettingOptions = ['Remote', 'On-site', 'Hybrid'];

  return (
    <div className="container mx-auto px-4 pt-0 pb-8">
      <h1 className="text-2xl font-bold text-[var(--metallica-blue-800)] mb-6">Internship Posts</h1>

      {/* Search and Actions Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex items-center w-full sm:w-2/3">
          {/* Search Bar */}
          <div className="relative flex-grow mr-2">
            <div className="flex items-center border-2 border-[var(--metallica-blue-300)] focus-within:border-[var(--metallica-blue-600)] transition-colors duration-200 rounded-md overflow-hidden bg-white shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-3 text-[var(--metallica-blue-500)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search posts by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2.5 px-3 focus:outline-none text-[var(--metallica-blue-800)] placeholder:text-[var(--metallica-blue-400)]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-2 mr-1 text-[var(--metallica-blue-500)] hover:text-[var(--metallica-blue-700)] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Filter Button */}
          <div className="relative" ref={filterRef}>
            <button
              onClick={toggleFilter}
              className={`flex items-center justify-center p-2 rounded-md transition-colors ${Object.values(filters).some(arr => arr.length > 0)
                ? "bg-[var(--metallica-blue-600)] text-white"
                : "bg-[var(--metallica-blue-100)] text-[var(--metallica-blue-800)] hover:bg-[var(--metallica-blue-200)]"
                }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>

              {/* Show badge if filters are active */}
              {Object.values(filters).some(arr => arr.length > 0) && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {filters.jobType.length + filters.jobSetting.length}
                </span>
              )}
            </button>

            {/* Filter dropdown */}
            {showFilters && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-[var(--metallica-blue-800)]">Filters</h3>
                    <button
                      onClick={clearFilters}
                      className="text-xs text-[var(--metallica-blue-600)] hover:text-[var(--metallica-blue-800)]"
                    >
                      Clear all
                    </button>
                  </div>

                  {/* Job Type filters */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2 text-gray-700">Job Type</h4>
                    <div className="space-y-1">
                      {jobTypeOptions.map(type => (
                        <label key={type} className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-[var(--metallica-blue-600)] rounded border-gray-300"
                            checked={filters.jobType.includes(type)}
                            onChange={() => handleFilterChange('jobType', type)}
                          />
                          <span className="ml-2 text-sm text-gray-700">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Job Setting filters */}
                  <div>
                    <h4 className="text-sm font-medium mb-2 text-gray-700">Job Setting</h4>
                    <div className="space-y-1">
                      {jobSettingOptions.map(setting => (
                        <label key={setting} className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-[var(--metallica-blue-600)] rounded border-gray-300"
                            checked={filters.jobSetting.includes(setting)}
                            onChange={() => handleFilterChange('jobSetting', setting)}
                          />
                          <span className="ml-2 text-sm text-gray-700">{setting}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Create Post Button */}
        <button
          onClick={toggleCreatePost}
          className="bg-[var(--metallica-blue-600)] hover:bg-[var(--metallica-blue-700)] text-white px-6 py-2 rounded-md shadow-sm transition-colors font-medium w-full sm:w-auto"
        >
          {showForm ? 'Cancel' : 'Create New Post'}
        </button>
      </div>

      {/* Active filters display */}
      {Object.values(filters).some(arr => arr.length > 0) && (
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-sm text-[var(--metallica-blue-700)]">Active filters:</span>
          {filters.jobType.map(type => (
            <span
              key={type}
              className="bg-[var(--metallica-blue-100)] text-[var(--metallica-blue-800)] px-2 py-1 rounded-full text-xs flex items-center"
            >
              {type}
              <button
                onClick={() => handleFilterChange('jobType', type)}
                className="ml-1 hover:text-[var(--metallica-blue-600)]"
              >
                &times;
              </button>
            </span>
          ))}
          {filters.jobSetting.map(setting => (
            <span
              key={setting}
              className="bg-[var(--metallica-blue-100)] text-[var(--metallica-blue-800)] px-2 py-1 rounded-full text-xs flex items-center"
            >
              {setting}
              <button
                onClick={() => handleFilterChange('jobSetting', setting)}
                className="ml-1 hover:text-[var(--metallica-blue-600)]"
              >
                &times;
              </button>
            </span>
          ))}
          <button
            onClick={clearFilters}
            className="text-xs text-[var(--metallica-blue-600)] hover:underline"
          >
            Clear all
          </button>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center backdrop-blur-sm overflow-auto py-8">
          <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-6xl max-h-[90vh] overflow-hidden">
            <div className="relative">
              {/* Header bar */}
              <div className="bg-[var(--metallica-blue-700)] text-white py-3 px-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  {editingPost !== null ? 'Update Post' : 'Create New Post'}
                </h2>
                <button
                  onClick={toggleCreatePost}
                  className="text-white hover:text-[var(--metallica-blue-100)] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col lg:flex-row h-[calc(90vh-56px)]">
                {/* Left side - Form - This div will be scrollable */}
                <div className="lg:w-1/2 p-6 overflow-y-auto bg-[var(--metallica-blue-50)]">
                  <div className="bg-[var(--metallica-blue-50)] rounded-lg border border-[var(--metallica-blue-200)] p-6">
                    <CompanyCreatePost
                      onAddPost={handleAddPost}
                      onFormChange={handleFormChange}
                      initialPost={editingPost !== null ? posts[editingPost] : null}
                      isEditing={editingPost !== null}
                    />
                  </div>
                </div>

                {/* Right side - Live Preview - This div will NOT scroll with the form */}
                <div className="lg:w-1/2 p-6 overflow-y-auto bg-white">
                  <h2 className="text-xl font-semibold mb-4 text-[var(--metallica-blue-700)]">Post Preview</h2>
                  <div className="bg-white rounded-lg shadow-md p-6 border border-[var(--metallica-blue-100)]">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-[var(--metallica-blue-800)]">
                          {postPreview.title || "Job Title"}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          {postPreview.jobSetting && (
                            <span className={`px-2.5 py-1 text-xs rounded-full font-medium border flex items-center
                              ${postPreview.jobSetting === 'Remote' ? 'bg-teal-100 text-teal-700 border-teal-200' : ''}
                              ${postPreview.jobSetting === 'On-site' ? 'bg-indigo-100 text-indigo-700 border-indigo-200' : ''}
                              ${postPreview.jobSetting === 'Hybrid' ? 'bg-cyan-100 text-cyan-700 border-cyan-200' : ''}
                            `}>
                              {postPreview.jobSetting}
                            </span>
                          )}

                          {postPreview.jobType && (
                            <span className={`px-2.5 py-1 text-xs rounded-full font-medium border flex items-center
                              ${postPreview.jobType === 'Full-time' ? 'bg-green-100 text-green-700 border-green-200' : ''}
                              ${postPreview.jobType === 'Part-time' ? 'bg-blue-100 text-blue-700 border-blue-200' : ''}
                            `}>
                              {postPreview.jobType}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-block bg-[var(--metallica-blue-100)] text-[var(--metallica-blue-800)] px-2 py-1 rounded text-sm">
                          {postPreview.paid || "Payment Status"}
                        </span>
                        {postPreview.paid === 'Paid' && postPreview.salary && (
                          <p className="text-[var(--metallica-green-pop-color)] font-medium mt-1">{postPreview.salary}</p>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4 mb-4">
                      <h4 className="font-medium mb-2 text-[var(--metallica-blue-700)]">Description</h4>
                      <p className="text-gray-700 mb-4 text-sm">
                        {postPreview.description || "Job description will appear here..."}
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-medium mb-1 text-[var(--metallica-blue-700)]">Start Date</h4>
                          <p className="text-gray-700 text-sm">
                            {formatDate(postPreview.startDate) || "Not specified"}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1 text-[var(--metallica-blue-700)]">Duration</h4>
                          <p className="text-gray-700 text-sm">
                            {postPreview.duration || "Not specified"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {postPreview.requirements && (
                      <div className="mb-4">
                        <h4 className="font-medium mb-2 text-[var(--metallica-blue-700)]">Requirements</h4>
                        <p className="text-gray-700 text-sm">{postPreview.requirements}</p>
                      </div>
                    )}

                    {postPreview.skills.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2 text-[var(--metallica-blue-700)]">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {postPreview.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="bg-[var(--metallica-blue-100)] text-[var(--metallica-blue-800)] px-3 py-1 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {deletingPostIndex !== null && (
        <DeleteTileConfirmation
          type="post" 
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <div key={index} className="max-w-sm w-full">
              <CompanyPost
                post={post}
                onUpdateClick={handleUpdateClick}
                onDeleteClick={handleDeleteClick}
                compact={true}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 bg-white rounded-lg shadow-sm p-8 border border-[var(--metallica-blue-100)]">
            <p className="text-[var(--metallica-blue-600)] text-lg mb-4">
              {posts.length > 0 ? 'No posts match your search' : 'No internship posts yet.'}
            </p>
            {!showForm && posts.length === 0 && (
              <button
                onClick={toggleCreatePost}
                className="bg-[var(--metallica-blue-600)] hover:bg-[var(--metallica-blue-700)] text-white px-6 py-2 rounded-md shadow-sm transition-colors font-medium"
              >
                Create Your First Post
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
