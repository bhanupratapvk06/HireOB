import { useState } from 'react';
import { applications as initialApps } from '../../data/mockData.js';
import { MapPin, DollarSign, Clock } from 'lucide-react';
import './Applications.css';

const filters = ['All', 'Applied', 'Shortlisted', 'Interview', 'Rejected'];

const badgeClass = {
  Applied: 'badge-applied',
  Shortlisted: 'badge-shortlisted',
  Interview: 'badge-interview',
  Rejected: 'badge-rejected',
  Offer: 'badge-offer',
};

const Applications = () => {
  const [apps, setApps] = useState(initialApps);
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const [withdrawId, setWithdrawId] = useState(null);
  const filtered = filter === 'All' ? apps : apps.filter((a) => a.status === filter);

  const handleWithdraw = () => {
    if (withdrawId) {
      setApps(apps.filter((a) => a.id !== withdrawId));
      setWithdrawId(null);
      setSelected(null);
    }
  };

  return (
    <div className="applications-page">
      <div className="page-header">
        <h1 className="page-title">Applications</h1>
        <p className="page-subtitle">Track your platform job applications</p>
      </div>

      <div className="filter-bar">
        {filters.map((f) => (
          <button
            key={f}
            className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="app-list">
        {filtered.map((app) => (
          <div key={app.id} className="card fade-in app-card" onClick={() => setSelected(app)}>
            <div className="app-card-inner">
              <div className="app-logo">{app.logo}</div>
              <div className="app-info">
                <div className="app-info-top">
                  <div>
                    <h3 className="app-role">{app.role}</h3>
                    <p className="app-company">{app.company}</p>
                  </div>
                  <span className={`badge ${badgeClass[app.status]}`}>{app.status}</span>
                </div>
                <div className="app-meta">
                  <span className="app-meta-item"><MapPin size={12} />{app.location}</span>
                  <span className="app-meta-item"><DollarSign size={12} />{app.salary}</span>
                  <span className="app-meta-item"><Clock size={12} />Applied {app.appliedDate}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="empty-state">No applications found for this filter.</div>
        )}
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="app-detail-header">
                <div className="app-logo app-logo-lg">{selected.logo}</div>
                <div>
                  <h2 className="modal-title">{selected.role}</h2>
                  <p className="modal-description">{selected.company}</p>
                </div>
              </div>
            </div>

            <div className="app-detail-grid">
              <div><span className="text-muted">Location:</span> {selected.location}</div>
              <div><span className="text-muted">Salary:</span> {selected.salary}</div>
              <div><span className="text-muted">Type:</span> {selected.type}</div>
              <div><span className="text-muted">Applied:</span> {selected.appliedDate}</div>
            </div>

            <span className={`badge ${badgeClass[selected.status]}`}>{selected.status}</span>
            {selected.interviewDate && (
              <p className="interview-date">📅 Interview scheduled: <strong>{selected.interviewDate}</strong></p>
            )}
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setSelected(null)}>Close</button>
              <button className="btn btn-destructive" onClick={() => setWithdrawId(selected.id)}>Withdraw</button>
            </div>
          </div>
        </div>
      )}

      {withdrawId && (
        <div className="modal-overlay" onClick={() => setWithdrawId(null)}>
          <div className="modal-content modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Withdraw Application?</h2>
              <p className="modal-description">This action cannot be undone. The company will be notified.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setWithdrawId(null)}>Cancel</button>
              <button className="btn btn-destructive" onClick={handleWithdraw}>Confirm Withdraw</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Applications;