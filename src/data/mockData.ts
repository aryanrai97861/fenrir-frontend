export interface Scan {
  id: string;
  name: string;
  type: string;
  status: 'Completed' | 'Scheduled' | 'Failed' | 'In Progress';
  progress: number;
  vulnerabilities: { critical: number; high: number; medium: number; low: number };
  lastScan: string;
}

export interface LogEntry {
  timestamp: string;
  message: string;
  highlights?: { text: string; color: string }[];
}

export interface Finding {
  id: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  title: string;
  endpoint: string;
  description: string;
  timestamp: string;
}

export const severityStats = {
  critical: { count: 12, change: +2.5, label: 'Critical' },
  high: { count: 38, change: -1.8, label: 'High' },
  medium: { count: 56, change: +4.2, label: 'Medium' },
  low: { count: 124, change: +0.6, label: 'Low' },
};

export const scans: Scan[] = [
  {
    id: '1',
    name: 'Production API Scan',
    type: 'Full Scan',
    status: 'Completed',
    progress: 100,
    vulnerabilities: { critical: 3, high: 7, medium: 12, low: 24 },
    lastScan: '2026-03-03 09:15',
  },
  {
    id: '2',
    name: 'Staging Environment Scan',
    type: 'Quick Scan',
    status: 'Completed',
    progress: 100,
    vulnerabilities: { critical: 1, high: 4, medium: 8, low: 15 },
    lastScan: '2026-03-03 08:30',
  },
  {
    id: '3',
    name: 'Payment Gateway Audit',
    type: 'Compliance',
    status: 'In Progress',
    progress: 67,
    vulnerabilities: { critical: 2, high: 5, medium: 3, low: 9 },
    lastScan: '2026-03-03 07:45',
  },
  {
    id: '4',
    name: 'User Auth Module Test',
    type: 'Targeted Scan',
    status: 'Completed',
    progress: 100,
    vulnerabilities: { critical: 0, high: 2, medium: 6, low: 11 },
    lastScan: '2026-03-02 22:10',
  },
  {
    id: '5',
    name: 'Cloud Infrastructure Scan',
    type: 'Full Scan',
    status: 'Scheduled',
    progress: 0,
    vulnerabilities: { critical: 0, high: 0, medium: 0, low: 0 },
    lastScan: '2026-03-04 06:00',
  },
  {
    id: '6',
    name: 'Mobile API Endpoints',
    type: 'Quick Scan',
    status: 'Failed',
    progress: 10,
    vulnerabilities: { critical: 0, high: 1, medium: 0, low: 2 },
    lastScan: '2026-03-02 18:20',
  },
  {
    id: '7',
    name: 'Internal Network Audit',
    type: 'Network Scan',
    status: 'Completed',
    progress: 100,
    vulnerabilities: { critical: 5, high: 12, medium: 18, low: 32 },
    lastScan: '2026-03-02 14:00',
  },
  {
    id: '8',
    name: 'Database Security Check',
    type: 'Targeted Scan',
    status: 'Scheduled',
    progress: 0,
    vulnerabilities: { critical: 0, high: 0, medium: 0, low: 0 },
    lastScan: '2026-03-04 10:00',
  },
  {
    id: '9',
    name: 'Third-party API Review',
    type: 'Compliance',
    status: 'Completed',
    progress: 100,
    vulnerabilities: { critical: 1, high: 3, medium: 9, low: 14 },
    lastScan: '2026-03-01 16:30',
  },
  {
    id: '10',
    name: 'Frontend XSS Assessment',
    type: 'Quick Scan',
    status: 'Failed',
    progress: 45,
    vulnerabilities: { critical: 2, high: 1, medium: 4, low: 7 },
    lastScan: '2026-03-01 11:15',
  },
];

export const activityLogs: LogEntry[] = [
  {
    timestamp: '13:24:01',
    message: 'Initiating spider module on target https://api.example.com',
    highlights: [{ text: 'https://api.example.com', color: '#0CC8A8' }],
  },
  {
    timestamp: '13:24:03',
    message: 'Discovered endpoint /api/users/profile — added to queue',
    highlights: [{ text: '/api/users/profile', color: '#0CC8A8' }],
  },
  {
    timestamp: '13:24:05',
    message: 'Testing X-Frame-Options header on /api/auth/login',
    highlights: [
      { text: 'X-Frame-Options', color: '#FFB800' },
      { text: '/api/auth/login', color: '#0CC8A8' },
    ],
  },
  {
    timestamp: '13:24:08',
    message: 'SQL Injection test initiated on /api/products?id=1',
    highlights: [
      { text: 'SQL Injection', color: '#FF4D4D' },
      { text: '/api/products?id=1', color: '#0CC8A8' },
    ],
  },
  {
    timestamp: '13:24:11',
    message: 'Response 200 OK from /api/users — analyzing response body',
    highlights: [
      { text: '200 OK', color: '#4ADE80' },
      { text: '/api/users', color: '#0CC8A8' },
    ],
  },
  {
    timestamp: '13:24:14',
    message: 'CSRF token validation missing on POST /api/transfer',
    highlights: [
      { text: 'CSRF token', color: '#FFB800' },
      { text: 'POST /api/transfer', color: '#0CC8A8' },
    ],
  },
  {
    timestamp: '13:24:17',
    message: 'Open redirect detected at /api/redirect?url=evil.com — CRITICAL',
    highlights: [
      { text: 'Open redirect', color: '#FF4D4D' },
      { text: '/api/redirect?url=evil.com', color: '#0CC8A8' },
      { text: 'CRITICAL', color: '#FF4D4D' },
    ],
  },
  {
    timestamp: '13:24:19',
    message: 'Testing Content-Security-Policy header compliance',
    highlights: [{ text: 'Content-Security-Policy', color: '#FFB800' }],
  },
  {
    timestamp: '13:24:22',
    message: 'Enumerating /api/admin/* endpoints — 3 discovered',
    highlights: [{ text: '/api/admin/*', color: '#0CC8A8' }],
  },
  {
    timestamp: '13:24:25',
    message: 'Brute-force protection check on /api/auth/login — rate limiting absent',
    highlights: [
      { text: 'Brute-force', color: '#FF6B35' },
      { text: '/api/auth/login', color: '#0CC8A8' },
      { text: 'rate limiting absent', color: '#FF4D4D' },
    ],
  },
  {
    timestamp: '13:24:28',
    message: 'TLS certificate verification passed — Grade A+',
    highlights: [
      { text: 'Grade A+', color: '#4ADE80' },
    ],
  },
  {
    timestamp: '13:24:31',
    message: 'Checking CORS configuration on /api/data endpoint',
    highlights: [
      { text: 'CORS', color: '#FFB800' },
      { text: '/api/data', color: '#0CC8A8' },
    ],
  },
];

export const verificationLogs: LogEntry[] = [
  {
    timestamp: '13:24:30',
    message: 'Verification loop #1: Re-testing SQL injection on /api/products?id=1',
    highlights: [
      { text: 'SQL injection', color: '#FF4D4D' },
      { text: '/api/products?id=1', color: '#0CC8A8' },
    ],
  },
  {
    timestamp: '13:24:33',
    message: 'Verification loop #2: Confirming open redirect at /api/redirect',
    highlights: [
      { text: 'open redirect', color: '#FF4D4D' },
      { text: '/api/redirect', color: '#0CC8A8' },
    ],
  },
  {
    timestamp: '13:24:36',
    message: 'Verification loop #3: CSRF bypass confirmed on /api/transfer',
    highlights: [
      { text: 'CSRF bypass', color: '#FFB800' },
      { text: '/api/transfer', color: '#0CC8A8' },
    ],
  },
];

export const findings: Finding[] = [
  {
    id: 'f1',
    severity: 'Critical',
    title: 'SQL Injection in Product Query',
    endpoint: '/api/products?id=1',
    description: 'Unsanitized user input passed directly to SQL query, allowing arbitrary database access.',
    timestamp: '13:24:08',
  },
  {
    id: 'f2',
    severity: 'Critical',
    title: 'Open Redirect Vulnerability',
    endpoint: '/api/redirect?url=',
    description: 'Unvalidated redirect parameter allows attackers to redirect users to malicious sites.',
    timestamp: '13:24:17',
  },
  {
    id: 'f3',
    severity: 'High',
    title: 'Missing CSRF Protection',
    endpoint: '/api/transfer',
    description: 'POST endpoint lacks CSRF token validation, enabling cross-site request forgery attacks.',
    timestamp: '13:24:14',
  },
  {
    id: 'f4',
    severity: 'High',
    title: 'No Rate Limiting on Auth',
    endpoint: '/api/auth/login',
    description: 'Login endpoint has no brute-force protection. Attackers can attempt unlimited password guesses.',
    timestamp: '13:24:25',
  },
  {
    id: 'f5',
    severity: 'Medium',
    title: 'Missing X-Frame-Options Header',
    endpoint: '/api/auth/login',
    description: 'Page can be embedded in iframes, potentially enabling clickjacking attacks.',
    timestamp: '13:24:05',
  },
  {
    id: 'f6',
    severity: 'Medium',
    title: 'Permissive CORS Policy',
    endpoint: '/api/data',
    description: 'CORS headers allow requests from any origin. Restrict to known trusted domains.',
    timestamp: '13:24:31',
  },
];

export const scanSteps = [
  { label: 'Spidering', status: 'completed' as const },
  { label: 'Mapping', status: 'completed' as const },
  { label: 'Testing', status: 'active' as const },
  { label: 'Validating', status: 'pending' as const },
  { label: 'Reporting', status: 'pending' as const },
];

export const scanMetadata = {
  scanType: 'Full Scan',
  targets: 'api.example.com',
  startedAt: '2026-03-03 13:24:00',
  credentials: 'OAuth 2.0',
  files: '24 endpoints',
  checklists: 'OWASP Top 10',
};

export const statusBarData = {
  subAgents: 4,
  parallelExecutions: 2,
  operations: 1847,
  critical: 2,
  high: 2,
  medium: 2,
  low: 0,
};
