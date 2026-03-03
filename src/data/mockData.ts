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
  critical: { count: 86, change: +2.5, label: 'Critical' },
  high: { count: 16, change: +3.5, label: 'High' },
  medium: { count: 26, change: -0.5, label: 'Medium' },
  low: { count: 16, change: +0.5, label: 'Low' },
};

export const scans: Scan[] = [
  { id: '1', name: 'Web App Servers', type: 'Greybox', status: 'Completed', progress: 100, vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago' },
  { id: '2', name: 'Web App Servers', type: 'Greybox', status: 'Completed', progress: 100, vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago' },
  { id: '3', name: 'Web App Servers', type: 'Greybox', status: 'Completed', progress: 100, vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago' },
  { id: '4', name: 'Web App Servers', type: 'Greybox', status: 'Completed', progress: 100, vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago' },
  { id: '5', name: 'Web App Servers', type: 'Greybox', status: 'Completed', progress: 100, vulnerabilities: { critical: 3, high: 12, medium: 0, low: 18 }, lastScan: '4d ago' },
  { id: '6', name: 'Web App Servers', type: 'Greybox', status: 'Scheduled', progress: 100, vulnerabilities: { critical: 2, high: 0, medium: 23, low: 0 }, lastScan: '4d ago' },
  { id: '7', name: 'Web App Servers', type: 'Greybox', status: 'Scheduled', progress: 100, vulnerabilities: { critical: 5, high: 12, medium: 0, low: 0 }, lastScan: '4d ago' },
  { id: '8', name: 'IoT Devices', type: 'Blackbox', status: 'Failed', progress: 10, vulnerabilities: { critical: 2, high: 6, medium: 5, low: 1 }, lastScan: '3d ago' },
  { id: '9', name: 'Temp Data', type: 'Blackbox', status: 'Failed', progress: 10, vulnerabilities: { critical: 2, high: 4, medium: 5, low: 1 }, lastScan: '3d ago' },
];

export const activityLogs: LogEntry[] = [
  {
    timestamp: '09:00:00',
    message: "I'll begin a systematic penetration test on helpdesk.democorp.com. Let me start with reconnaissance and enumeration.",
    highlights: [{ text: 'helpdesk.democorp.com', color: '#0CC8A8' }],
  },
  {
    timestamp: '09:01:00',
    message: 'Good! target is online. Now let me perform port scanning to identify running services.',
    highlights: [],
  },
  {
    timestamp: '09:02:00',
    message: 'Excellent reconnaissance results:\n    - helpdesk.democorp.com: Apache httpd 2.4.65 on port 80 (web server)\nLet me probe the web server on target first to understand its structure.',
    highlights: [
      { text: 'helpdesk.democorp.com', color: '#0CC8A8' },
      { text: 'Apache httpd 2.4.65', color: '#0CC8A8' },
      { text: 'port 80', color: '#0CC8A8' },
    ],
  },
  {
    timestamp: '09:03:00',
    message: 'Great! I found a login page for a Help Desk Platform. I can see a useful comment: "TODO: Delete the testing account (test:test)". Let me test this credential. The login redirects to /password/test. Let me follow that path and explore it.',
    highlights: [
      { text: '"TODO: Delete the testing account (test:test)"', color: '#FFB800' },
      { text: '/password/test', color: '#0CC8A8' },
    ],
  },
  {
    timestamp: '09:04:00',
    message: "The POST method is not allowed on /password/test. Let me check what the JavaScript does - it posts to '#' which means the current page. Let me try a different approach.",
    highlights: [
      { text: "'#'", color: '#FFB800' },
    ],
  },
  {
    timestamp: '09:05:00',
    message: 'It redirects back to /password/test. Let me check if there\'s an /api endpoint or look for other paths. Let me also try exploring with the test:test password directly on other endpoints.',
    highlights: [
      { text: 'test:test', color: '#0CC8A8' },
    ],
  },
  {
    timestamp: '09:06:00',
    message: 'Great! I can access the dashboard using the "X-UserId: 10032" header. The dashboard shows "Welcome, John Doe". This suggests an **IDOR vulnerability** - I can access any user\'s dashboard by just changing the X-UserId header. Let me explore more of the application...',
    highlights: [
      { text: '"X-UserId: 10032"', color: '#FFB800' },
      { text: '**IDOR vulnerability**', color: '#FF4D4D' },
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
    title: 'SQL Injection in Authentication Endpoint',
    endpoint: '/api/users/profile',
    description: 'Time-based blind SQL injection confirmed on user-controlled input during authentication flow. Exploitation allows database-level access.',
    timestamp: '10:45:23',
  },
  {
    id: 'f2',
    severity: 'High',
    title: 'Unauthorized Access to User Metadata',
    endpoint: '/api/auth/login',
    description: 'Authenticated low-privilege user was able to access metadata of other users. Access control checks were missing.',
    timestamp: '10:45:23',
  },
  {
    id: 'f3',
    severity: 'Medium',
    title: 'Broken Authentication Rate Limiting',
    endpoint: '/api/search',
    description: 'No effective rate limiting detected on login attempts. Automated brute-force attempts possible.',
    timestamp: '10:45:23',
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
  scanType: 'Grey Box',
  targets: 'google.com',
  startedAt: 'Nov 22, 09:00AM',
  credentials: '2 Active',
  files: 'Control.pdf',
  checklists: '40/350',
};

export const statusBarData = {
  subAgents: 0,
  parallelExecutions: 0,
  operations: 0,
  critical: 0,
  high: 0,
  medium: 0,
  low: 0,
  userEmail: 'admin@edu.com',
  userRole: 'Security Lead',
};
