import React, { useState, useEffect } from 'react';
import './index';
import './App.css'

// Sample job data
const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    salary: "$80k - $120k",
    type: "Full-time",
    description: "Build amazing user interfaces with React and modern web technologies.",
    skills: ["React", "JavaScript", "CSS", "HTML"],
    aiMatch: 95
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "DataFlow",
    location: "New York, NY",
    salary: "$90k - $130k",
    type: "Full-time",
    description: "Develop scalable backend systems using Node.js and cloud technologies.",
    skills: ["Node.js", "Python", "AWS", "Database"],
    aiMatch: 88
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "CreativeStudio",
    location: "Austin, TX",
    salary: "$70k - $100k",
    type: "Contract",
    description: "Design beautiful and intuitive user experiences for web and mobile apps.",
    skills: ["Figma", "Sketch", "Adobe XD", "Prototyping"],
    aiMatch: 82
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Seattle, WA",
    salary: "$100k - $140k",
    type: "Full-time",
    description: "Manage cloud infrastructure and deployment pipelines for modern applications.",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    aiMatch: 90
  },
  {
    id: 5,
    title: "Product Manager",
    company: "InnovateLab",
    location: "Boston, MA",
    salary: "$85k - $125k",
    type: "Full-time",
    description: "Lead product development and work with cross-functional teams to deliver great products.",
    skills: ["Product Strategy", "Analytics", "Agile", "Leadership"],
    aiMatch: 85
  }
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [appliedJobs, setAppliedJobs] = useState([]);

  // Filter jobs based on search and filters
  useEffect(() => {
    let filtered = jobs;

    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (locationFilter) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (typeFilter) {
      filtered = filtered.filter(job => job.type === typeFilter);
    }

    setFilteredJobs(filtered);
  }, [searchTerm, locationFilter, typeFilter]);

  const handleApply = (jobId) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs([...appliedJobs, jobId]);
      alert('Application submitted successfully!');
    }
  };

  const getMatchColor = (match) => {
    if (match >= 90) return '#10b981';
    if (match >= 80) return '#3b82f6';
    if (match >= 70) return '#f59e0b';
    return '#6b7280';
  };

  return (
    <div className="container">
      <div className="header">
        <h1>AI Job Portal</h1>
        <p>Find your dream job with AI-powered matching</p>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search jobs, companies, or skills..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <div className="filters">
          <select
            className="filter-select"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="">All Locations</option>
            <option value="san francisco">San Francisco</option>
            <option value="new york">New York</option>
            <option value="austin">Austin</option>
            <option value="seattle">Seattle</option>
            <option value="boston">Boston</option>
          </select>
          
          <select
            className="filter-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Contract">Contract</option>
            <option value="Part-time">Part-time</option>
          </select>
        </div>
      </div>

      <div>
        {filteredJobs.map(job => (
          <div key={job.id} className="job-card">
            <div className="job-header">
              <div>
                <div className="job-title">{job.title}</div>
                <div className="job-company">{job.company}</div>
              </div>
              <div 
                className="ai-match"
                style={{ backgroundColor: getMatchColor(job.aiMatch) }}
              >
                {job.aiMatch}% Match
              </div>
            </div>
            
            <div className="job-details">
              <span>📍 {job.location}</span>
              <span>💰 {job.salary}</span>
              <span>⏰ {job.type}</span>
            </div>
            
            <div className="job-description">{job.description}</div>
            
            <div className="job-skills">
              {job.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
            
            <button
              className="apply-btn"
              onClick={() => handleApply(job.id)}
              disabled={appliedJobs.includes(job.id)}
              style={{
                opacity: appliedJobs.includes(job.id) ? 0.5 : 1,
                cursor: appliedJobs.includes(job.id) ? 'not-allowed' : 'pointer'
              }}
            >
              {appliedJobs.includes(job.id) ? 'Applied ✓' : 'Apply Now'}
            </button>
          </div>
        ))}
      </div>

      <div className="stats">
        <h3>Found {filteredJobs.length} jobs</h3>
        <p>Applications submitted: {appliedJobs.length}</p>
      </div>
    </div>
  );
}

export default App;