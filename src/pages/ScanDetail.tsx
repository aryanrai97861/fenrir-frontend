import { useState, useEffect, useRef } from 'react';
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
    StopCircle, Download, ChevronLeft,
    Globe, Key, FileText, ClipboardCheck, Target, Clock,
} from 'lucide-react';

export default function ScanDetail() {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [activeTab, setActiveTab] = useState<'activity' | 'verification'>('activity');
    const [progress, setProgress] = useState(0);
    const [visibleLogs, setVisibleLogs] = useState<LogEntry[]>([]);
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
                setVisibleLogs(prev => [...prev, logs[idx]]);
                idx++;
            } else {
                clearInterval(interval);
            }
        }, 400);
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
        const parts: (string | JSX.Element)[] = [];
        let lastIdx = 0;

        const sortedHighlights = [...entry.highlights].sort((a, b) => msg.indexOf(a.text) - msg.indexOf(b.text));

        sortedHighlights.forEach((hl, i) => {
            const idx = msg.indexOf(hl.text, lastIdx);
            if (idx > -1) {
                if (idx > lastIdx) parts.push(msg.slice(lastIdx, idx));
                parts.push(<span key={i} style={{ color: hl.color, fontWeight: 600 }}>{hl.text}</span>);
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
                <div className="scan-detail-header">
                    <button className="btn-back" onClick={() => navigate('/dashboard')} aria-label="Back to dashboard">
                        <ChevronLeft size={18} /> Back to Scans
                    </button>
                    <div className="scan-detail-actions">
                        <button className="btn-danger" onClick={() => showToast('Scan stopped', 'error')} aria-label="Stop scan">
                            <StopCircle size={16} /> Stop Scan
                        </button>
                        <button className="btn-outline" onClick={() => showToast('Report exported', 'success')} aria-label="Export report">
                            <Download size={16} /> Export Report
                        </button>
                    </div>
                </div>

                <div className="scan-progress-section">
                    {loading ? (
                        <div className="skeleton-progress-section" />
                    ) : (
                        <>
                            <div className="progress-ring-container">
                                <svg className="progress-ring" width="130" height="130" viewBox="0 0 130 130">
                                    <circle cx="65" cy="65" r="54" fill="none" stroke="var(--border)" strokeWidth="8" />
                                    <circle
                                        cx="65" cy="65" r="54" fill="none" stroke="#0CC8A8"
                                        strokeWidth="8" strokeLinecap="round"
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
                                {scanSteps.map((step, i) => (
                                    <div key={step.label} className={`step step-${step.status}`}>
                                        <div className="step-indicator">
                                            <div className="step-dot" />
                                            {i < scanSteps.length - 1 && <div className="step-line" />}
                                        </div>
                                        <span className="step-label">{step.label}</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <div className="scan-metadata">
                    {metaItems.map(({ icon: Icon, label, value }) => (
                        <div key={label} className="meta-item">
                            <Icon size={15} className="meta-icon" />
                            <span className="meta-label">{label}</span>
                            <span className="meta-value">{value}</span>
                        </div>
                    ))}
                </div>

                <div className="scan-panels">
                    <div className="panel console-panel">
                        <div className="panel-header">
                            <h3>Live Scan Console</h3>
                            <div className="panel-tabs" role="tablist">
                                <button
                                    role="tab"
                                    aria-selected={activeTab === 'activity'}
                                    className={`panel-tab ${activeTab === 'activity' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('activity')}
                                >
                                    Activity Log
                                </button>
                                <button
                                    role="tab"
                                    aria-selected={activeTab === 'verification'}
                                    className={`panel-tab ${activeTab === 'verification' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('verification')}
                                >
                                    Verification Loops
                                </button>
                            </div>
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
                        <div className="panel-header">
                            <h3>Finding Log</h3>
                            <span className="finding-count">{findings.length} found</span>
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

                <div className="status-bar" role="status">
                    <div className="status-item">
                        <span className="status-label">Sub-agents</span>
                        <span className="status-value">{statusBarData.subAgents}</span>
                    </div>
                    <div className="status-item">
                        <span className="status-label">Parallel Executions</span>
                        <span className="status-value">{statusBarData.parallelExecutions}</span>
                    </div>
                    <div className="status-item">
                        <span className="status-label">Operations</span>
                        <span className="status-value">{statusBarData.operations.toLocaleString()}</span>
                    </div>
                    <div className="status-divider" />
                    <div className="status-severity">
                        <span className="sev-count critical">{statusBarData.critical}</span>
                        <span className="sev-count high">{statusBarData.high}</span>
                        <span className="sev-count medium">{statusBarData.medium}</span>
                        <span className="sev-count low">{statusBarData.low}</span>
                    </div>
                </div>
            </main>
        </div>
    );
}
