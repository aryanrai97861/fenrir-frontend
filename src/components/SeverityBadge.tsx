interface SeverityBadgeProps {
    severity: 'Critical' | 'High' | 'Medium' | 'Low';
    count?: number;
    showLabel?: boolean;
}

const severityColors: Record<string, string> = {
    Critical: '#FF4D4D',
    High: '#FF6B35',
    Medium: '#FFB800',
    Low: '#4ADE80',
};

export default function SeverityBadge({ severity, count, showLabel = false }: SeverityBadgeProps) {
    const color = severityColors[severity];

    if (count !== undefined) {
        return (
            <span className="severity-count-badge" style={{ backgroundColor: `${color}20`, color }}>
                {count}
            </span>
        );
    }

    return (
        <span className="severity-badge" style={{ backgroundColor: `${color}18`, color, borderColor: `${color}40` }}>
            <span className="severity-dot" style={{ backgroundColor: color }} />
            {showLabel && severity}
        </span>
    );
}
