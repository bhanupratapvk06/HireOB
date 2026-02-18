import { applications } from '../../data/mockData.js';
import './Companies.css';

const badgeClass = {
  Applied: 'badge-applied',
  Shortlisted: 'badge-shortlisted',
  Interview: 'badge-interview',
  Rejected: 'badge-rejected',
  Offer: 'badge-offer',
};

const Companies = () => {
  const grouped = applications.reduce((acc, app) => {
    if (!acc[app.company]) acc[app.company] = [];
    acc[app.company].push(app);
    return acc;
  }, {});
  const companies = Object.entries(grouped).map(([name, apps]) => ({
    name,
    logo: apps[0].logo,
    apps,
    lastDate: apps.sort((a, b) => b.appliedDate.localeCompare(a.appliedDate))[0].appliedDate,
  }));
  return (
    <div className="companies-page">
      <div className="page-header">
        <h1 className="page-title">Companies</h1>
        <p className="page-subtitle">
          {companies.length} companies · {applications.length} total applications · Avg {(applications.length / companies.length).toFixed(1)} per company
        </p>
      </div>
      <div className="company-list">
        {companies.map((company) => (
          <div key={company.name} className="card fade-in">
            <div className="company-card-inner">
              <div className="app-logo">{company.logo}</div>
              <div className="company-info">
                <div className="company-top">
                  <div>
                    <h3 className="company-name">{company.name}</h3>
                    <p className="company-meta">{company.apps.length} application(s) · Last: {company.lastDate}</p>
                  </div>
                  <div className="company-badges">
                    {company.apps.map((app) => (
                      <span key={app.id} className={`badge ${badgeClass[app.status]}`}>{app.status}</span>
                    ))}
                  </div>
                </div>
                <div className="company-positions">
                  {company.apps.map((app) => (
                    <div key={app.id} className="company-position">
                      <span className="position-dot" />
                      {app.role} — Applied {app.appliedDate}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default Companies;