import { Outlet } from 'react-router-dom';
import { DashboardSidebar } from './DashboardSidebar.jsx';
import './DashboardLayout.css';
export function DashboardLayout() {
  return (
    <div className="dashboard">
      <DashboardSidebar />
      <main className="dashboard-main">
        <div className="dashboard-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}