import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import SeverityBadge from '../components/SeverityBadge';
import StatusChip from '../components/StatusChip';
import { useToast } from '../context/ToastContext';
import { scans, severityStats, statusBarData } from '../data/mockData';
import {
    TrendingUp, TrendingDown, Search, SlidersHorizontal, Columns3, Plus,
    ShieldAlert, AlertTriangle, AlertCircle, Search as SearchIcon, Clock, ChevronLeft, ChevronRight,
} from 'lucide-react';

const sevIcons: Record<string, typeof ShieldAlert> = {
    critical: ShieldAlert,
    high: AlertTriangle,
    medium: AlertCircle,
    low: SearchIcon,
};

const sevColors: Record<string, string> = {
    critical: '#FF4D4D',
    high: '#FF6B35',
    medium: '#FFB800',
    low: '#3B82F6',
};

export default function Dashboard() {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

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

    const totalScans = 100;
    const totalPages = Math.ceil(totalScans / itemsPerPage);

    const statEntries = Object.entries(severityStats) as [string, typeof severityStats.critical][];

    return (
        <div className="app-layout">
            <Sidebar />
            <main className="main-content" role="main">
                {/* Breadcrumb Header */}
                <div className="scan-detail-header">
                    <div className="scan-breadcrumb">
                        <span className="breadcrumb-main">Scan</span>
                        <span className="breadcrumb-sep">⚙</span>
                        <span className="breadcrumb-sep">/</span>
                        <span className="breadcrumb-item">Private Assets</span>
                        <span className="breadcrumb-sep">/</span>
                        <span className="breadcrumb-new">New Scan</span>
                    </div>
                    <div className="scan-detail-actions">
                        <button className="btn-export" onClick={() => showToast('Report exported', 'success')}>
                            Export Report
                        </button>
                        <button className="btn-stop-scan" onClick={() => showToast('Scan stopped', 'error')}>
                            Stop Scan
                        </button>
                    </div>
                </div>

                {/* Info Bar */}
                <div className="dash-info-bar">
                    <div className="info-item"><span className="info-label">Org:</span> <span className="info-val">Project X</span></div>
                    <div className="info-sep">|</div>
                    <div className="info-item"><span className="info-label">Owner:</span> <span className="info-val">Nammagiri</span></div>
                    <div className="info-sep">|</div>
                    <div className="info-item"><span className="info-label">Total Scans:</span> <span className="info-val">100</span></div>
                    <div className="info-sep">|</div>
                    <div className="info-item"><span className="info-label">Scheduled:</span> <span className="info-val">1000</span></div>
                    <div className="info-sep">|</div>
                    <div className="info-item"><span className="info-label">Rescans:</span> <span className="info-val">100</span></div>
                    <div className="info-sep">|</div>
                    <div className="info-item"><span className="info-label">Failed Scans:</span> <span className="info-val">100</span></div>
                    <div className="info-item" style={{ marginLeft: 'auto' }}>
                        <Clock size={14} style={{ color: 'var(--text-tertiary)' }} />
                        <span className="info-val">10 mins ago</span>
                    </div>
                </div>

                {/* Severity Cards */}
                <div className="stats-grid" role="region" aria-label="Severity statistics">
                    {statEntries.map(([key, stat]) => {
                        const SevIcon = sevIcons[key];
                        const color = sevColors[key];
                        return (
                            <div key={key} className={`stat-card stat-${key}`}>
                                {loading ? (
                                    <div className="skeleton-stat" />
                                ) : (
                                    <>
                                        <div className="stat-header">
                                            <span className="stat-sev-title">{stat.label} Severity</span>
                                            <div className="stat-sev-icon" style={{ background: `${color}20`, color }}>
                                                <SevIcon size={18} />
                                            </div>
                                        </div>
                                        <div className="stat-count" style={{ color }}>{stat.count}</div>
                                        <p className="stat-desc">
                                            <span className={`stat-trend ${stat.change >= 0 ? 'up' : 'down'}`}>
                                                {stat.change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                                {stat.change >= 0 ? '+' : ''}{stat.change}%
                                            </span>
                                            {stat.change >= 0 ? ' increase' : ' decrease'} from yesterday
                                        </p>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Search & Filter Toolbar */}
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
                            <Plus size={16} /> New scan
                        </button>
                    </div>
                </div>

                {/* Scan Table */}
                <div className="table-container" role="region" aria-label="Scan results">
                    <table className="scan-table" aria-label="Scans table">
                        <thead>
                            <tr>
                                <th>Scan Name</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Progress</th>
                                <th>Vulnerability</th>
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
                                                        className={`progress-bar-fill ${scan.status === 'Failed' ? 'progress-bar-failed' : ''}`}
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

                    {/* Pagination */}
                    <div className="table-pagination">
                        <span className="pagination-info">Showing {filteredScans.length} of {totalScans} Scans</span>
                        <div className="pagination-controls">
                            <button
                                className="pagination-btn"
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <button
                                className="pagination-btn"
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Status Bar */}
                <div className="status-bar" role="status">
                    <div className="status-user">
                        <div className="status-user-avatar">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" alt="User" width="28" height="28" style={{ borderRadius: '50%' }} />
                        </div>
                        <div className="status-user-info">
                            <span className="status-user-email">{statusBarData.userEmail}</span>
                            <span className="status-user-role">{statusBarData.userRole}</span>
                        </div>
                    </div>
                    <div className="status-divider" />
                    <div className="status-items">
                        <div className="status-item">
                            <span className="status-label">Sub-Agents</span>
                            <span className="status-value">{statusBarData.subAgents}</span>
                        </div>
                        <span className="status-dot">•</span>
                        <div className="status-item">
                            <span className="status-label">Parallel Executions</span>
                            <span className="status-value">{statusBarData.parallelExecutions}</span>
                        </div>
                        <span className="status-dot">•</span>
                        <div className="status-item">
                            <span className="status-label">Operations</span>
                            <span className="status-value">{statusBarData.operations}</span>
                        </div>
                    </div>
                    <div className="status-divider" />
                    <div className="status-severity">
                        <span className="sev-label" style={{ color: '#FF4D4D' }}>Critical:</span> <span className="sev-count critical">{statusBarData.critical}</span>
                        <span className="sev-label" style={{ color: '#FF6B35' }}>High:</span> <span className="sev-count high">{statusBarData.high}</span>
                        <span className="sev-label" style={{ color: '#FFB800' }}>Medium:</span> <span className="sev-count medium">{statusBarData.medium}</span>
                        <span className="sev-label" style={{ color: '#4ADE80' }}>Low:</span> <span className="sev-count low">{statusBarData.low}</span>
                    </div>
                </div>
            </main>
        </div>
    );
}
