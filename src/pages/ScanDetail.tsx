import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import SeverityBadge from '../components/SeverityBadge';
import { useToast } from '../context/ToastContext';
import type { LogEntry } from '../data/mockData';
import {
    activityLogs, verificationLogs, findings, scanSteps,
    scanMetadata, statusBarData,
} from '../data/mockData';
import {
    ChevronDown, X,
    Globe, Key, FileText, ClipboardCheck, Target, Clock,
    Bug, Map as MapIcon, FlaskConical, ShieldCheck, FileBarChart,
} from 'lucide-react';

const stepIcons = [
    { icon: Bug, label: 'Spidering' },
    { icon: MapIcon, label: 'Mapping' },
    { icon: FlaskConical, label: 'Testing' },
    { icon: ShieldCheck, label: 'Validating' },
    { icon: FileBarChart, label: 'Reporting' },
];

export default function ScanDetail() {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [activeTab, setActiveTab] = useState<'activity' | 'verification'>('activity');
    const [progress, setProgress] = useState(0);
    const [visibleLogs, setVisibleLogs] = useState<LogEntry[]>([]);
    const [consoleOpen, setConsoleOpen] = useState(true);
    const [loading, setLoading] = useState(true);
    const logEndRef = useRef<HTMLDivElement>(null);

    const logs = activeTab === 'activity' ? activityLogs : verificationLogs;

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 600);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        setVisibleLogs([]);
        let idx = 0;
        const interval = setInterval(() => {
            if (idx < logs.length) {
                const currentIdx = idx;
                idx++;
                setVisibleLogs(prev => [...prev, logs[currentIdx]]);
            } else {
                clearInterval(interval);
            }
        }, 600);
        return () => clearInterval(interval);
    }, [activeTab]);

    useEffect(() => {
        logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [visibleLogs]);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 47) { clearInterval(interval); return 47; }
                return prev + 1;
            });
        }, 120);
        return () => clearInterval(interval);
    }, []);

    const renderLogMessage = (entry: LogEntry) => {
        if (!entry.highlights?.length) return <span>{entry.message}</span>;

        let msg = entry.message;
        const parts: (string | React.ReactNode)[] = [];
        let lastIdx = 0;

        const sortedHighlights = [...entry.highlights].sort((a, b) => msg.indexOf(a.text) - msg.indexOf(b.text));

        sortedHighlights.forEach((hl, i) => {
            const idx = msg.indexOf(hl.text, lastIdx);
            if (idx > -1) {
                if (idx > lastIdx) parts.push(msg.slice(lastIdx, idx));
                const isBg = hl.color === '#FFB800';
                parts.push(
                    <span
                        key={i}
                        style={isBg
                            ? { background: 'rgba(255,184,0,0.2)', color: '#FFB800', padding: '1px 4px', borderRadius: '3px', fontWeight: 600 }
                            : { color: hl.color, fontWeight: 600 }
                        }
                    >
                        {hl.text}
                    </span>
                );
                lastIdx = idx + hl.text.length;
            }
        });
        if (lastIdx < msg.length) parts.push(msg.slice(lastIdx));

        return <>{parts}</>;
    };

    const circumference = 2 * Math.PI * 54;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    const metaItems = [
        { icon: Globe, label: 'Scan Type', value: scanMetadata.scanType },
        { icon: Target, label: 'Targets', value: scanMetadata.targets },
        { icon: Clock, label: 'Started At', value: scanMetadata.startedAt },
        { icon: Key, label: 'Credentials', value: scanMetadata.credentials },
        { icon: FileText, label: 'Files', value: scanMetadata.files },
        { icon: ClipboardCheck, label: 'Checklists', value: scanMetadata.checklists },
    ];

    return (
        <div className="app-layout">
            <Sidebar />
            <main className="main-content">
                {/* Breadcrumb Header */}
                <div className="scan-detail-header">
                    <div className="scan-breadcrumb">
                        <span className="breadcrumb-main" onClick={() => navigate('/dashboard')}>Scan</span>
                        <span className="breadcrumb-sep">⚙</span>
                        <span className="breadcrumb-sep">/</span>
                        <span className="breadcrumb-item">Private Assets</span>
                        <span className="breadcrumb-sep">/</span>
                        <span className="breadcrumb-new">New Scan</span>
                    </div>
                    <div className="scan-detail-actions">
                        <button className="btn-export" onClick={() => showToast('Report exported', 'success')} aria-label="Export report">
                            Export Report
                        </button>
                        <button className="btn-stop-scan" onClick={() => showToast('Scan stopped', 'error')} aria-label="Stop scan">
                            Stop Scan
                        </button>
                    </div>
                </div>

                {/* Progress + Steps */}
                <div className="scan-progress-section">
                    {loading ? (
                        <div className="skeleton-progress-section" />
                    ) : (
                        <>
                            <div className="progress-ring-container">
                                <svg className="progress-ring" width="120" height="120" viewBox="0 0 130 130">
                                    <circle cx="65" cy="65" r="54" fill="none" stroke="var(--border)" strokeWidth="7" />
                                    <circle
                                        cx="65" cy="65" r="54" fill="none" stroke="#0CC8A8"
                                        strokeWidth="7" strokeLinecap="round"
                                        strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                                        transform="rotate(-90 65 65)"
                                        className="progress-ring-circle"
                                    />
                                </svg>
                                <div className="progress-ring-text">
                                    <span className="progress-ring-value">{progress}%</span>
                                    <span className="progress-ring-label">In Progress</span>
                                </div>
                            </div>

                            <div className="step-tracker">
                                {scanSteps.map((step, i) => {
                                    const IconComp = stepIcons[i]?.icon;
                                    return (
                                        <div key={step.label} className={`step step-${step.status}`}>
                                            <div className="step-icon-wrapper">
                                                <div className={`step-icon ${step.status === 'active' ? 'step-icon-active' : ''} ${step.status === 'completed' ? 'step-icon-completed' : ''}`}>
                                                    {IconComp && <IconComp size={20} />}
                                                </div>
                                                {i < scanSteps.length - 1 && <div className="step-connector" />}
                                            </div>
                                            <span className="step-label">{step.label}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>

                {/* Metadata */}
                <div className="scan-metadata">
                    {metaItems.map(({ icon: Icon, label, value }) => (
                        <div key={label} className="meta-item">
                            <Icon size={15} className="meta-icon" />
                            <span className="meta-label">{label}</span>
                            <span className="meta-value">{value}</span>
                        </div>
                    ))}
                </div>

                {/* Console + Findings */}
                {consoleOpen && (
                    <div className="console-wrapper">
                        <div className="console-header-bar">
                            <div className="console-title-group">
                                <span className="console-dot" />
                                <h3>Live Scan Console</h3>
                                <span className="running-badge">
                                    <span className="running-spinner" />
                                    Running...
                                </span>
                            </div>
                            <div className="console-controls">
                                <button className="console-ctrl-btn" aria-label="Collapse console"><ChevronDown size={16} /></button>
                                <button className="console-ctrl-btn" onClick={() => setConsoleOpen(false)} aria-label="Close console"><X size={16} /></button>
                            </div>
                        </div>

                        <div className="scan-panels">
                            <div className="panel console-panel">
                                <div className="console-tabs" role="tablist">
                                    <button
                                        role="tab"
                                        aria-selected={activeTab === 'activity'}
                                        className={`console-tab ${activeTab === 'activity' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('activity')}
                                    >
                                        Activity Log
                                    </button>
                                    <button
                                        role="tab"
                                        aria-selected={activeTab === 'verification'}
                                        className={`console-tab ${activeTab === 'verification' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('verification')}
                                    >
                                        Verification Loops
                                    </button>
                                </div>
                                <div className="console-output" role="log" aria-live="polite">
                                    {visibleLogs.map((entry, i) => (
                                        <div key={i} className="log-entry log-entry-animate">
                                            <span className="log-timestamp">[{entry.timestamp}]</span>
                                            <span className="log-message">{renderLogMessage(entry)}</span>
                                        </div>
                                    ))}
                                    <div ref={logEndRef} />
                                </div>
                            </div>

                            <div className="panel findings-panel">
                                <div className="findings-header">
                                    <h3>Finding Log</h3>
                                </div>
                                <div className="findings-list">
                                    {findings.map(finding => (
                                        <div key={finding.id} className="finding-card">
                                            <div className="finding-top">
                                                <SeverityBadge severity={finding.severity} showLabel />
                                                <span className="finding-time">{finding.timestamp}</span>
                                            </div>
                                            <h4 className="finding-title">{finding.title}</h4>
                                            <span className="finding-endpoint">{finding.endpoint}</span>
                                            <p className="finding-desc">{finding.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

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
                            <span className="status-value">{statusBarData.operations.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="status-divider" />
                    <div className="status-severity">
                        <span className="sev-label">Critical:</span> <span className="sev-count critical">{statusBarData.critical}</span>
                        <span className="sev-label">High:</span> <span className="sev-count high">{statusBarData.high}</span>
                        <span className="sev-label">Medium:</span> <span className="sev-count medium">{statusBarData.medium}</span>
                        <span className="sev-label">Low:</span> <span className="sev-count low">{statusBarData.low}</span>
                    </div>
                </div>
            </main>
        </div>
    );
}
