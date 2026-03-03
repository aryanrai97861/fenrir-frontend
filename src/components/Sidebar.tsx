import { NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import {
    LayoutDashboard, FolderOpen, Scan, CalendarClock,
    Bell, Settings, HelpCircle, Sun, Moon, LogOut, Menu, X,
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/projects', icon: FolderOpen, label: 'Projects' },
    { to: '/scan/1', icon: Scan, label: 'Scans' },
    { to: '/schedule', icon: CalendarClock, label: 'Schedule' },
    { to: '/notifications', icon: Bell, label: 'Notifications' },
    { to: '/settings', icon: Settings, label: 'Settings' },
    { to: '/support', icon: HelpCircle, label: 'Support' },
];

export default function Sidebar() {
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            <button className="mobile-menu-btn" onClick={() => setMobileOpen(true)} aria-label="Open menu">
                <Menu size={22} />
            </button>
            {mobileOpen && <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />}
            <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
                <div className="sidebar-top">
                    <div className="sidebar-logo">
                        <div className="logo-icon">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                                <circle cx="14" cy="14" r="13" stroke="#0CC8A8" strokeWidth="2" />
                                <text x="14" y="18" textAnchor="middle" fill="#0CC8A8" fontSize="13" fontWeight="700" fontFamily="Inter">F</text>
                            </svg>
                        </div>
                        <span className="logo-text">Fenrir</span>
                    </div>
                    <button className="sidebar-close-btn" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                        <X size={20} />
                    </button>
                </div>

                <nav className="sidebar-nav" role="navigation" aria-label="Main navigation">
                    {navItems.map(({ to, icon: Icon, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                            onClick={() => setMobileOpen(false)}
                            aria-label={label}
                        >
                            <Icon size={18} />
                            <span>{label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="sidebar-bottom">
                    <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
                        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                        <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                    </button>

                    <div className="sidebar-user">
                        <div className="user-avatar">AR</div>
                        <div className="user-info">
                            <span className="user-name">Aryan Rai</span>
                            <span className="user-email">admin@fenrir.io</span>
                        </div>
                        <button className="logout-btn" onClick={() => navigate('/')} aria-label="Logout">
                            <LogOut size={16} />
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
