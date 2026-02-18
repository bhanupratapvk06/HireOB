import { monthlyApplications, statusDistribution, topRoles } from '../../data/mockData.js';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar } from 'recharts';
import './Analytics.css';

const MetricCard = ({ label, value, sub }) => {
  return (
    <div className="card fade-in metric-card">
      <div className="metric-content">
        <p className="metric-label">{label}</p>
        <p className="metric-value">{value}</p>
        <p className="metric-sub">{sub}</p>
      </div>
    </div>
  );
}

const tooltipStyle = {
  background: 'hsl(0 0% 100%)',
  border: '1px solid hsl(220 13% 91%)',
  borderRadius: '8px',
  fontSize: '12px',
};

const Analytics = () => {
  return (
    <div className="analytics-page">
      <div className="page-header">
        <h1 className="page-title">Analytics</h1>
        <p className="page-subtitle">Your job search performance metrics</p>
      </div>
      <div className="metrics-grid">
        <MetricCard label="Response Rate" value="67%" sub="48 of 72 responded" />
        <MetricCard label="Interview Ratio" value="15%" sub="11 interviews" />
        <MetricCard label="Total Applications" value="72" sub="Last 6 months" />
        <MetricCard label="Avg Response Time" value="5.2 days" sub="Median: 4 days" />
      </div>
      <div className="charts-grid">
        <div className="card fade-in">
          <div className="card-header"><h3 className="card-title">Applications Over Time</h3></div>
          <div className="card-content">
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={monthlyApplications}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220 9% 46%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(220 9% 46%)" />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="count" stroke="hsl(173 58% 39%)" strokeWidth={2} dot={{ fill: 'hsl(173 58% 39%)', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card fade-in">
          <div className="card-header"><h3 className="card-title">Status Distribution</h3></div>
          <div className="card-content">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={statusDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={50} paddingAngle={3}>
                  {statusDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="card fade-in">
        <div className="card-header"><h3 className="card-title">Top Roles Applied</h3></div>
        <div className="card-content">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={topRoles} layout="vertical" margin={{ left: 100 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
              <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(220 9% 46%)" />
              <YAxis type="category" dataKey="role" tick={{ fontSize: 12 }} stroke="hsl(220 9% 46%)" width={100} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="count" fill="hsl(173 58% 39%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Analytics;