import { useState } from 'react';
import { userProfile as initialProfile, resumeScore } from '../../data/mockData.js';
import { Pencil, Save, Upload } from 'lucide-react';
import './Profile.css';
const skillBadge = {
  Expert: 'badge-expert',
  Intermediate: 'badge-intermediate',
  Beginner: 'badge-beginner',
};

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState(initialProfile);
  return (
    <div className="profile-page">
      <div className="profile-top">
        <div>
          <h1 className="page-title">Profile</h1>
          <p className="page-subtitle">Manage your professional profile</p>
        </div>
        <button className={`btn btn-sm ${editing ? 'btn-primary' : 'btn-outline'}`} onClick={() => setEditing(!editing)}>
          {editing ? <><Save size={16} /> Save</> : <><Pencil size={16} /> Edit</>}
        </button>
      </div>
      {/* Personal Details */}
      <div className="card fade-in">
        <div className="card-header"><h3 className="card-title">Personal Details</h3></div>
        <div className="card-content">
          <div className="profile-avatar-row">
            <div className="profile-avatar gradient-primary">
              {profile.firstName[0]}{profile.lastName[0]}
            </div>
            {editing && (
              <button className="btn btn-outline btn-sm"><Upload size={16} /> Upload Photo</button>
            )}
          </div>
          <div className="profile-fields">
            {[
              { label: 'First Name', value: profile.firstName, key: 'firstName' },
              { label: 'Last Name', value: profile.lastName, key: 'lastName' },
              { label: 'Email', value: profile.email, key: 'email' },
              { label: 'Phone', value: profile.phone, key: 'phone' },
              { label: 'Location', value: profile.location, key: 'location' },
            ].map((field) => (
              <div key={field.key} className="profile-field">
                <label className="form-label">{field.label}</label>
                {editing ? (
                  <input
                    className="form-input form-input-sm"
                    value={field.value}
                    onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                  />
                ) : (
                  <p className="profile-field-value">{field.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Skills */}
      <div className="card fade-in">
        <div className="card-header"><h3 className="card-title">Skills</h3></div>
        <div className="card-content">
          <div className="skills-grid">
            {profile.skills.map((skill) => (
              <div key={skill.name} className="skill-item">
                <div>
                  <p className="skill-name">{skill.name}</p>
                  <p className="skill-years">{skill.years} years</p>
                </div>
                <span className={`badge ${skillBadge[skill.level]}`}>{skill.level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="profile-two-col">
        {/* Education */}
        <div className="card fade-in">
          <div className="card-header"><h3 className="card-title">Education</h3></div>
          <div className="card-content">
            {profile.education.map((edu, i) => (
              <div key={i}>
                <h4 className="edu-degree">{edu.degree} in {edu.field}</h4>
                <p className="edu-institution">{edu.institution}</p>
                <p className="edu-dates">{edu.startDate} — {edu.endDate} · GPA: {edu.gpa}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Social Links */}
        <div className="card fade-in">
          <div className="card-header"><h3 className="card-title">Social Links</h3></div>
          <div className="card-content social-links">
            {[
              { label: 'LinkedIn', value: profile.social.linkedin },
              { label: 'GitHub', value: profile.social.github },
              { label: 'Portfolio', value: profile.social.portfolio },
              { label: 'Twitter', value: profile.social.twitter },
            ].map((link) => (
              <div key={link.label} className="social-item">
                <span className="social-label">{link.label}</span>
                {editing ? (
                  <input className="form-input form-input-sm" value={link.value} readOnly />
                ) : (
                  <a href={link.value} target="_blank" rel="noopener noreferrer" className="social-link">
                    {link.value}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Experience */}
      <div className="card fade-in">
        <div className="card-header"><h3 className="card-title">Work Experience</h3></div>
        <div className="card-content experience-list">
          {profile.experience.map((exp, i) => (
            <div key={i} className="experience-item">
              <div className="experience-dot" />
              <div className="experience-header">
                <div>
                  <h4 className="exp-title">{exp.title}</h4>
                  <p className="exp-company">{exp.company} · {exp.location}</p>
                  <p className="exp-dates">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</p>
                </div>
                {exp.current && <span className="badge badge-current">Current</span>}
              </div>
              <p className="exp-description">{exp.description}</p>
              <ul className="exp-achievements">
                {exp.achievements.map((a, j) => (
                  <li key={j} className="exp-achievement">
                    <span className="text-primary">•</span> {a}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* Resume Upload */}
      <div className="card fade-in">
        <div className="card-header"><h3 className="card-title">Resume</h3></div>
        <div className="card-content">
          <div className="resume-upload">
            <div>
              <p className="resume-filename">resume_john_doe.pdf</p>
              <p className="resume-meta">Score: {resumeScore.overall}/100 · Last analyzed {new Date(resumeScore.lastAnalyzed).toLocaleDateString()}</p>
            </div>
            <button className="btn btn-outline btn-sm"><Upload size={16} /> Upload New</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;