import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import SeverityBadge from '../components/SeverityBadge';
import StatusChip from '../components/StatusChip';
import { useToast } from '../context/ToastContext';
import { scans, severityStats } from '../data/mockData';
import { TrendingUp, TrendingDown, Search, SlidersHorizontal, Columns3, Plus, Download } from 'lucide-react';

export default function Dashboard() {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [loading, setLoading] = useState(true);

    useState(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    });

    const filteredScans = useMemo(() => {
        return scans.filter(scan => {
            const matchesSearch = scan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                scan.type.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter = filterStatus === 'all' || scan.status === filterStatus;
            return matchesSearch && matchesFilter;
        });
    }, [searchQuery, filterStatus]);

    const statEntries = Object.entries(severityStats) as [string, typeof severityStats.critical][];

    return (
        <div className="app-layout">
            <Sidebar />
            <main className="main-content" role="main">
                <div className="dashboard-header">
                    <div>
                        <h1>Dashboard</h1>
                        <p className="header-subtitle">Monitor your security scans and vulnerabilities</p>
                    </div>
                    <button className="btn-export" onClick={() => showToast('Report exported successfully', 'success')} aria-label="Export report">
                        <Download size={16} />
                        Export Report
                    </button>
                </div>

                <div className="stats-grid" role="region" aria-label="Severity statistics">
                    {statEntries.map(([key, stat]) => (
                        <div key={key} className={`stat-card stat-${key}`}>
                            {loading ? (
                                <div className="skeleton-stat" />
                            ) : (
                                <>
                                    <div className="stat-header">
                                        <SeverityBadge severity={stat.label as any} showLabel />
                                        <span className={`stat-trend ${stat.change >= 0 ? 'up' : 'down'}`}>
                                            {stat.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                            {Math.abs(stat.change)}%
                                        </span>
                                    </div>
                                    <div className="stat-count">{stat.count}</div>
                                    <p className="stat-desc">{stat.change >= 0 ? '+' : ''}{stat.change}% increase than yesterday</p>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                <div className="table-toolbar">
                    <div className="search-wrapper">
                        <Search size={16} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search scans by name or type..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="search-input"
                            aria-label="Search scans"
                        />
                    </div>
                    <div className="toolbar-actions">
                        <div className="filter-container">
                            <button className="btn-outline" onClick={() => setShowFilterDropdown(!showFilterDropdown)} aria-label="Filter scans">
                                <SlidersHorizontal size={16} /> Filter
                            </button>
                            {showFilterDropdown && (
                                <div className="filter-dropdown">
                                    {['all', 'Completed', 'In Progress', 'Scheduled', 'Failed'].map(status => (
                                        <button
                                            key={status}
                                            className={`filter-option ${filterStatus === status ? 'active' : ''}`}
                                            onClick={() => { setFilterStatus(status); setShowFilterDropdown(false); }}
                                        >
                                            {status === 'all' ? 'All Statuses' : status}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <button className="btn-outline" onClick={() => showToast('Column view updated', 'info')} aria-label="Modify columns">
                            <Columns3 size={16} /> Column
                        </button>
                        <button className="btn-primary" onClick={() => showToast('New scan initiated!', 'success')} aria-label="Start new scan">
                            <Plus size={16} /> New Scan
                        </button>
                    </div>
                </div>

                <div className="table-container" role="region" aria-label="Scan results">
                    <table className="scan-table" aria-label="Scans table">
                        <thead>
                            <tr>
                                <th>Scan Name</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Progress</th>
                                <th>Vulnerabilities</th>
                                <th>Last Scan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="skeleton-row">
                                        <td><div className="skeleton skeleton-text" /></td>
                                        <td><div className="skeleton skeleton-text-sm" /></td>
                                        <td><div className="skeleton skeleton-chip" /></td>
                                        <td><div className="skeleton skeleton-bar" /></td>
                                        <td><div className="skeleton skeleton-badges" /></td>
                                        <td><div className="skeleton skeleton-text-sm" /></td>
                                    </tr>
                                ))
                            ) : filteredScans.length > 0 ? (
                                filteredScans.map(scan => (
                                    <tr
                                        key={scan.id}
                                        onClick={() => navigate(`/scan/${scan.id}`)}
                                        className="scan-row"
                                        tabIndex={0}
                                        role="button"
                                        aria-label={`View scan: ${scan.name}`}
                                        onKeyDown={e => e.key === 'Enter' && navigate(`/scan/${scan.id}`)}
                                    >
                                        <td className="scan-name">{scan.name}</td>
                                        <td>{scan.type}</td>
                                        <td><StatusChip status={scan.status} /></td>
                                        <td>
                                            <div className="progress-cell">
                                                <div className="progress-bar-bg">
                                                    <div
                                                        className="progress-bar-fill"
                                                        style={{ width: `${scan.progress}%` }}
                                                    />
                                                </div>
                                                <span className="progress-text">{scan.progress}%</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="vuln-badges">
                                                <SeverityBadge severity="Critical" count={scan.vulnerabilities.critical} />
                                                <SeverityBadge severity="High" count={scan.vulnerabilities.high} />
                                                <SeverityBadge severity="Medium" count={scan.vulnerabilities.medium} />
                                                <SeverityBadge severity="Low" count={scan.vulnerabilities.low} />
                                            </div>
                                        </td>
                                        <td className="last-scan-time">{scan.lastScan}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="no-results">No scans found matching your criteria</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
