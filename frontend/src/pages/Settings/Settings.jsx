import { useState, useEffect } from 'react';
import { Lock, Bell, Trash2 } from 'lucide-react';
import './Settings.css';

const Settings = () => {
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [prefs, setPrefs] = useState({ email: true, recommendations: true, weekly: false });
  const [showDelete, setShowDelete] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [toast, setToast] = useState(null);
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);
  const showToast = (title, message, type = 'success') => {
    setToast({ title, message, type });
  };
  const handlePasswordChange = () => {
    if (passwords.new.length < 8) {
      showToast('Error', 'Password must be at least 8 characters', 'error');
      return;
    }
    if (passwords.new !== passwords.confirm) {
      showToast('Error', 'Passwords do not match', 'error');
      return;
    }
    showToast('Success', 'Password updated successfully');
    setPasswords({ current: '', new: '', confirm: '' });
  };
  const handleDelete = () => {
    if (deleteConfirm === 'DELETE') {
      showToast('Account Deleted', 'Your account has been deleted (simulated)', 'error');
      setShowDelete(false);
      setDeleteConfirm('');
    }
  };
  return (
    <div className="settings-page">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Manage your account and preferences</p>
      </div>
      {/* Change Password */}
      <div className="card fade-in">
        <div className="card-header">
          <h3 className="card-title settings-title"><Lock size={16} /> Change Password</h3>
        </div>
        <div className="card-content settings-form">
          <div className="form-group">
            <label className="form-label">Current Password</label>
            <input className="form-input" type="password" value={passwords.current} onChange={(e) => setPasswords({ ...passwords, current: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">New Password</label>
            <input className="form-input" type="password" value={passwords.new} onChange={(e) => setPasswords({ ...passwords, new: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Confirm New Password</label>
            <input className="form-input" type="password" value={passwords.confirm} onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })} />
          </div>
          <button className="btn btn-primary btn-sm" onClick={handlePasswordChange}>Update Password</button>
        </div>
      </div>
      {/* Preferences */}
      <div className="card fade-in">
        <div className="card-header">
          <h3 className="card-title settings-title"><Bell size={16} /> Preferences</h3>
        </div>
        <div className="card-content pref-list">
          {[
            { label: 'Email Notifications', key: 'email', desc: 'Receive updates about your applications' },
            { label: 'Job Recommendations', key: 'recommendations', desc: 'Get personalized job suggestions' },
            { label: 'Weekly Summary', key: 'weekly', desc: 'Receive weekly activity reports' },
          ].map((pref) => (
            <div key={pref.key} className="pref-item">
              <div>
                <p className="pref-label">{pref.label}</p>
                <p className="pref-desc">{pref.desc}</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" checked={prefs[pref.key]} onChange={(e) => setPrefs({ ...prefs, [pref.key]: e.target.checked })} />
                <span className="toggle-slider" />
              </label>
            </div>
          ))}
        </div>
      </div>
      {/* Delete Account */}
      <div className="card fade-in card-danger">
        <div className="card-header">
          <h3 className="card-title settings-title text-destructive"><Trash2 size={16} /> Delete Account</h3>
        </div>
        <div className="card-content">
          <p className="delete-warning">Once deleted, all your data will be permanently removed.</p>
          <button className="btn btn-destructive btn-sm" onClick={() => setShowDelete(true)}>Delete My Account</button>
        </div>
      </div>
      {showDelete && (
        <div className="modal-overlay" onClick={() => setShowDelete(false)}>
          <div className="modal-content modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title text-destructive">Delete Account</h2>
              <div className="modal-description">
                This will permanently delete:
                <ul className="delete-list">
                  <li>• Personal information</li>
                  <li>• Application records</li>
                  <li>• External job tracking</li>
                  <li>• Resume and files</li>
                  <li>• Profile settings</li>
                </ul>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Type DELETE to confirm</label>
              <input className="form-input" value={deleteConfirm} onChange={(e) => setDeleteConfirm(e.target.value)} placeholder="DELETE" />
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setShowDelete(false)}>Cancel</button>
              <button className="btn btn-destructive" onClick={handleDelete} disabled={deleteConfirm !== 'DELETE'}>Delete Account</button>
            </div>
          </div>
        </div>
      )}
      {toast && (
        <div className={`toast ${toast.type === 'error' ? 'toast-error' : 'toast-success'}`}>
          <p className="toast-title">{toast.title}</p>
          <p className="toast-message">{toast.message}</p>
        </div>
      )}
    </div>
  );
}

export default Settings;