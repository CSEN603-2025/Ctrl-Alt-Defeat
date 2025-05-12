"use client";

import { useState, useEffect } from "react";
import Image from 'next/image';

// Mock data for interns (replace with API call or database data)
const initialInterns = [
  { 
    id: 1, 
    name: "John Doe", 
    jobTitle: "Software Engineer", 
    status: "current", 
    company: "Tech Corp",
    profilePic: "/public/icons8-avatar-50.png",
    gender: "male"
  },
  { 
    id: 2, 
    name: "Jane Smith", 
    jobTitle: "Marketing Intern", 
    status: "complete", 
    company: "Marketing Co",
    profilePic: "/public/icons8-avatar-50 (1).png",
    gender: "female"
  },
  { 
    id: 3, 
    name: "Bob Johnson", 
    jobTitle: "Data Analyst", 
    status: "current", 
    company: "Data Inc",
    profilePic: "/public/icons8-avatar-50.png",
    gender: "male"
  },
  { 
    id: 4, 
    name: "Alice Brown", 
    jobTitle: "UI/UX Designer", 
    status: "evaluated", 
    company: "Design Studio",
    profilePic: "/public/icons8-avatar-50 (1).png",
    gender: "female"
  },
  { 
    id: 5, 
    name: "Charlie Wilson", 
    jobTitle: "DevOps Intern", 
    status: "current", 
    company: "Cloud Tech",
    profilePic: "/public/icons8-avatar-50.png",
    gender: "male"
  },
  { 
    id: 6, 
    name: "Emma Davis", 
    jobTitle: "Product Manager", 
    status: "evaluated", 
    company: "Product Co",
    profilePic: "/public/icons8-avatar-50 (1).png",
    gender: "female"
  },
];

const AvatarImage = ({ gender }) => {
  return (
    <div className="profile-image-container">
      <Image
        src={gender === "female" ? "/images/icons8-avatar-50 (1).png" : "/images/icons8-avatar-50.png"}
        alt="Profile"
        width={50}
        height={50}
        className="profile-image"
        priority
      />
    </div>
  );
};

export default function CurrentInterns() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("current"); // Changed from "all" to "current"
  const [interns, setInterns] = useState(initialInterns);

  const handleSelectIntern = (id) => {
    console.log(`Selected intern with id: ${id}`);
  };

  // Handle search and filter
  useEffect(() => {
    let filteredInterns = [...initialInterns];

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filteredInterns = filteredInterns.filter(
        (intern) =>
          intern.name.toLowerCase().includes(searchLower) ||     
          intern.jobTitle.toLowerCase().includes(searchLower) || 
          intern.company.toLowerCase().includes(searchLower)     
      );
    }

    if (filter !== "all") {
      filteredInterns = filteredInterns.filter((intern) => intern.status === filter);
    }

    setInterns(filteredInterns);
  }, [searchTerm, filter]);

  return (
    <div className="container">
      <h1 className="title">My Interns</h1>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by job title or name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filter-container">
        <div className="filter-buttons">
          <button 
            onClick={() => setFilter('all')} 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          >
            ALL
          </button>
          <button 
            onClick={() => setFilter('current')} 
            className={`filter-btn ${filter === 'current' ? 'active' : ''}`}
          >
            CURRENT
          </button>
          <button 
            onClick={() => setFilter('complete')} 
            className={`filter-btn ${filter === 'complete' ? 'active' : ''}`}
          >
            COMPLETED
          </button>
          <button 
            onClick={() => setFilter('evaluated')} 
            className={`filter-btn ${filter === 'evaluated' ? 'active' : ''}`}
          >
            EVALUATED
          </button>
        </div>
      </div>

      <div className="interns-list">
        {interns.map((intern) => (
          <div 
            key={intern.id} 
            className="intern-card"
            onClick={() => handleSelectIntern(intern.id)}
          >
            <div className="intern-info">
              <AvatarImage gender={intern.gender} />
              <div className="details">
                <p className="intern-name">{intern.name} - {intern.jobTitle}</p>
                <p className={`intern-status ${intern.status}`}>
                  {intern.status.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .container {
          background-color: #F0F9FB;
          padding: 20px;
          border-radius: 10px;
          font-family: 'IBM Plex Sans', sans-serif;
          max-width: 800px;
          margin: 0 auto;
        }

        .title {
          color: #2A5F74;
          font-size: 42px;
          font-weight: bold;
          margin-bottom: 20px;
          text-decoration: underline;
          text-decoration-thickness: 3px;
          text-underline-offset: 8px;
        }

        .search-input {
          width: 100%;
          padding: 12px;
          border: 2px solid #318FA8;
          border-radius: 25px;
          margin-bottom: 20px;
          font-size: 14px;
        }

        .filter-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .filter-buttons {
          display: flex;
          gap: 10px;
        }

        .filter-btn {
          padding: 8px 24px;
          border: 2px solid #318FA8;
          border-radius: 20px;
          font-size: 14px;
          background: white;
          color: #318FA8;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-btn.active {
          background: #D9F0F4;
          border-color: #318FA8;
          color: #2A5F74;
        }

        .intern-card {
          background-color: white;
          padding: 15px;
          border: 3px solid #318FA8;
          border-radius: 10px;
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .intern-card:hover {
          background-color: #F0F9FB;
          transform: translateY(-2px);
          box-shadow: 0 4px 6px #2A5F74;
        }

        .intern-info {
          display: flex;
          align-items: center;
          gap: 15px;
          width: 100%;
        }

        .profile-image-container {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--user-primary, #D9F0F4);
          padding: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }

        .profile-image {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }

        .details {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .intern-name {
          color:rgb(54, 120, 147);
          font-size: 16px;
          margin: 0;
        }

        .intern-status {
          font-size: 12px;
          margin: 0;
        }

        .intern-status.current {
          color: #5CB2C7;
        }

        .intern-status.complete {
          color: #328FA8;
        }

        .intern-status.evaluated {
          color:rgb(49, 106, 128);
        }
      `}</style>
    </div>
  );
}