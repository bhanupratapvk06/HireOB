import { useState } from 'react';
import { externalJobs as initialJobs } from '../../data/mockData.js';
import { Plus, Trash2, ExternalLink } from 'lucide-react';
import './ExternalTracker.css';

const badgeClass = {
  Applied: 'badge-applied',
  Interview: 'badge-interview',
  Offer: 'badge-offer',
  Rejected: 'badge-rejected',
  Withdrawn: 'badge-withdrawn',
};

const emptyJob = {
  company: '', role: '', link: '', status: 'Applied', appliedDate: '', salary: '', notes: '', interviewDate: '',
};

const ExternalTrackecr = () => {
  const [jobs, setJobs] = useState(initialJobs);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ ...emptyJob });
  const handleAdd = () => {
    if (!form.company || !form.role) return;
    setJobs([...jobs, { ...form, id: Date.now().toString() }]);
    setForm({ ...emptyJob });
    setShowForm(false);
  };
  const handleDelete = (id) => {
    setJobs(jobs.filter((j) => j.id !== id));
  };
  return (
    <div className="external-page">
      <div className="external-header">
        <div>
          <h1 className="page-title">External Job Tracker</h1>
          <p className="page-subtitle">Track jobs you've applied to outside the platform</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setShowForm(true)}>
          <Plus size={16} /> Add Job
        </button>
      </div>
      <div className="job-list">
        {jobs.map((job) => (
          <div key={job.id} className="card fade-in">
            <div className="job-card-inner">
              <div className="job-info">
                <div className="job-title-row">
                  <h3 className="job-role">{job.role}</h3>
                  <span className={`badge ${badgeClass[job.status]}`}>{job.status}</span>
                </div>
                <p className="job-company">{job.company}</p>
                <div className="job-meta">
                  <span>Applied: {job.appliedDate}</span>
                  {job.salary && <span>Salary: {job.salary}</span>}
                  {job.interviewDate && <span>Interview: {job.interviewDate}</span>}
                </div>
                {job.notes && <p className="job-notes">"{job.notes}"</p>}
              </div>
              <div className="job-actions">
                {job.link && (
                  <button className="btn btn-ghost" onClick={() => window.open(job.link, '_blank')}>
                    <ExternalLink size={16} />
                  </button>
                )}
                <button className="btn btn-ghost text-destructive" onClick={() => handleDelete(job.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {jobs.length === 0 && (
          <div className="empty-state">No external jobs tracked yet. Add one!</div>
        )}
      </div>
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Add External Job</h2>
            </div>
            <div className="form-grid">
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Company *</label>
                  <input className="form-input" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company name" />
                </div>
                <div className="form-group">
                  <label className="form-label">Role *</label>
                  <input className="form-input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Job title" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Job Link</label>
                <input className="form-input" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="https://" />
              </div>
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select className="form-select" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                    {['Applied', 'Interview', 'Offer', 'Rejected', 'Withdrawn'].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Salary</label>
                  <input className="form-input" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} placeholder="$150k" />
                </div>
              </div>
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Applied Date</label>
                  <input className="form-input" type="date" value={form.appliedDate} onChange={(e) => setForm({ ...form, appliedDate: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Interview Date</label>
                  <input className="form-input" type="date" value={form.interviewDate || ''} onChange={(e) => setForm({ ...form, interviewDate: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Notes</label>
                <textarea className="form-textarea" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Add notes..." />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAdd} disabled={!form.company || !form.role}>Add Job</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExternalTrackecr;