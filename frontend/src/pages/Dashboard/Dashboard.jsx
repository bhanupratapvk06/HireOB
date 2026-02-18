import {
  Layers,
  Sparkles,
  CalendarCheck,
  CircleX,
  ArrowUpRight,
  ArrowDownRight,
  FileSearch,
  Activity,
  GitBranch,
  CalendarClock,
  BellDot,
  Target
} from "lucide-react";

import { applications, activities, resumeScore } from '../../data/mockData.js';
import './Dashboard.css';

const StatsCard = ({ title, value, subtitle, icon: Icon, trend }) => {
  return (
    <div className="card fade-in stats-card">
      <div className="stats-card-inner">
        <div>
          <p className="stats-label">{title}</p>
          <p className="stats-value">{value}</p>
          <div className="stats-trend-row">
            {trend && (
              <>
                {trend.positive ? (
                  <ArrowUpRight size={14} className="text-success" />
                ) : (
                  <ArrowDownRight size={14} className="text-destructive" />
                )}
                <span className={`stats-trend ${trend.positive ? 'text-success' : 'text-destructive'}`}>
                  {trend.value}
                </span>
              </>
            )}

            <span className="stats-subtitle">{subtitle}</span>
          </div>
        </div>
        <div className="stats-icon-box">
          <Icon size={20} className="text-primary" />
        </div>
      </div>
    </div>
  );
}

const ResumeScoreWidget = () => {
  const { overall, skillsMatch, projects, experience, formatting } = resumeScore;
  const categories = [
    { label: 'Skills Match', ...skillsMatch },
    { label: 'Projects', ...projects },
    { label: 'Experience', ...experience },
    { label: 'Formatting', ...formatting },
  ];
  return (
    <div className="card fade-in">
      <div className="card-header">
        <h3 className="card-title">Resume Score</h3>
      </div>
      <div className="card-content resume-score-content">
        <div className="resume-score-top">
          <div
            className="score-ring"
            style={{ background: `conic-gradient(hsl(var(--primary)) ${overall * 3.6}deg, hsl(var(--border)) 0deg)` }}
          >
            <div className="score-ring-inner">
              <span className="score-ring-value">{overall}</span>
            </div>
          </div>
          <div className="score-summary">
            <p className="score-summary-title">Great score!</p>
            <p className="score-summary-text">Your resume is competitive for most roles</p>
          </div>
        </div>
        <div className="score-categories">
          {categories.map((cat) => (
            <div key={cat.label} className="score-category">
              <div className="score-category-header">
                <span className="text-muted">{cat.label} ({cat.weight}%)</span>
                <span className="score-category-value">{cat.score}/100</span>
              </div>
              <div className="score-bar">
                <div className="score-bar-fill" style={{ width: `${cat.score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const UpcomingInterviews = () => {
  const upcoming = applications
    .filter(a => a.status === "Interview" && new Date(a.date) > new Date())
    .slice(0, 3);

  return (
    <div className="card fade-in">
      <div className="card-header">
        <h3 className="card-title"><CalendarClock size={16} /> Upcoming</h3>
      </div>
      <div className="card-content list">
        {upcoming.length === 0 && <p className="text-muted">No interviews scheduled</p>}
        {upcoming.map(a => (
          <div key={a.id} className="schedule-item upcoming">
            <div className="schedule-left">
              <span className="dot"></span>
              <div>
                <p className="schedule-company">{a.company}</p>
                <p className="schedule-date">{new Date(a.date).toLocaleDateString()}</p>
              </div>
            </div>
            <span className="badge upcoming-badge">Interview</span>
          </div>
        ))}

      </div>
    </div>
  );
};

const FollowUps = () => {
  const today = new Date();

  const followups = applications.filter(a => {
    if (!a.appliedDate || a.status !== "Applied") return false;
    const diff = (today - new Date(a.appliedDate)) / (1000 * 60 * 60 * 24);
    return diff >= 5;
  }).slice(0, 4);

  return (
    <div className="card fade-in">
      <div className="card-header">
        <h3 className="card-title"><BellDot size={16} /> Follow-ups Needed</h3>
      </div>
      <div className="card-content list">
        {followups.length === 0 && <p className="text-muted">All caught up 🎉</p>}
        {followups.map(a => (
          <div key={a.id} className="schedule-item followup">
            <div className="schedule-left">
              <span className="dot warning"></span>
              <div>
                <p className="schedule-company">{a.company}</p>
                <p className="schedule-date">Applied {a.appliedDate}</p>
              </div>
            </div>
            <span className="badge followup-badge">Follow up</span>
          </div>
        ))}

      </div>
    </div>
  );
};


const Dashboard = () => {
  const totalApps = applications.length;
  const shortlisted = applications.filter((a) => a.status === 'Shortlisted').length;
  const interviews = applications.filter((a) => a.status === 'Interview').length;
  const rejected = applications.filter((a) => a.status === 'Rejected').length;
  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Welcome back, John. Here's your job search overview.</p>
      </div>
      <div className="stats-grid">
        <StatsCard
          title="Total Applications"
          value={totalApps}
          subtitle="this month"
          icon={Layers}
          trend={{ value: '+12%', positive: true }}
        />

        <StatsCard
          title="Shortlisted"
          value={shortlisted}
          subtitle="companies"
          icon={Sparkles}
          trend={{ value: '+2', positive: true }}
        />

        <StatsCard
          title="Interviews"
          value={interviews}
          subtitle="scheduled"
          icon={CalendarCheck}
        />

        <StatsCard
          title="Rejected"
          value={rejected}
          subtitle="total"
          icon={CircleX}
        />

      </div>
      <div className="dashboard-bottom">
        <div className="activity-section">
          <div className="card fade-in">
            <div className="card-header">
              <h3 className="card-title">Recent Activity</h3>
            </div>
            <div className="card-content">
              <div className="activity-list">
                {activities.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <span className="activity-icon">
                      <Activity size={16} />
                    </span>

                    <div className="activity-info">
                      <p className="activity-message">{activity.message}</p>
                      <p className="activity-time">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <ResumeScoreWidget />

        <UpcomingInterviews />
        <FollowUps />
      </div>

    </div >
  );
}

export default Dashboard;