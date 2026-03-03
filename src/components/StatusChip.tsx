interface StatusChipProps {
    status: 'Completed' | 'Scheduled' | 'Failed' | 'In Progress';
}

export default function StatusChip({ status }: StatusChipProps) {
    const statusClass = status.toLowerCase().replace(' ', '-');
    return (
        <span className={`status-chip status-${statusClass}`} role="status" aria-label={`Status: ${status}`}>
            <span className="status-chip-dot" />
            {status}
        </span>
    );
}
