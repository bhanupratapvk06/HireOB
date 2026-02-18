import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Briefcase, Globe, User, Building2, BarChart3, Settings,
  ChevronLeft, ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import './DashboardSidebar.css';

const navItems = [
  { title: 'Overview', path: '/', icon: LayoutDashboard },
  { title: 'Applications', path: 'applications', icon: Briefcase },
  { title: 'External Tracker', path: 'external', icon: Globe },
  { title: 'Profile', path: 'profile', icon: User },
  { title: 'Companies', path: 'companies', icon: Building2 },
  { title: 'Analytics', path: 'analytics', icon: BarChart3 },
  { title: 'Settings', path: 'settings', icon: Settings },
];

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  return (
    <aside className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="sidebar-header">
        {!collapsed && (
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon gradient-primary">
              <Briefcase size={16} color="white" />
            </div>
            <span className="sidebar-logo-text">JobTracker</span>
          </div>
        )}
        <button className="sidebar-toggle" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive ? 'nav-item-active' : ''} ${collapsed ? 'nav-item-collapsed' : ''}`}
            >
              <item.icon size={20} />
              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          );
        })}
      </nav>
      {!collapsed && (
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar gradient-primary">JD</div>
            <div className="sidebar-user-info">
              <p className="sidebar-user-name">John Doe</p>
              <p className="sidebar-user-email">john.doe@email.com</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}