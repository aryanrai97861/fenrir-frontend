# 🐺 Fenrir Security

**Expert-level cybersecurity scanning and vulnerability assessment platform.**

A modern, dark-themed frontend dashboard for managing automated penetration tests, tracking vulnerability findings, and monitoring real-time scan progress — built as a responsive single-page application.

🔗 **Live Demo:** [fenrir-frontend.vercel.app](https://fenrir-frontend.vercel.app/)

---

## ✨ Features

- **Sign Up / Login Page** — Sleek onboarding form with social login options (Apple, Google, Meta), animated background glows, and Trustpilot-style branding
- **Dashboard** — Organization overview with severity stat cards (Critical / High / Medium / Low), interactive scan table with search, filter, and pagination
- **Scan Detail Page** — Live scan progress ring, multi-step tracker (Spidering → Mapping → Testing → Validating → Reporting), real-time console output with syntax-highlighted logs, and a findings panel with severity badges
- **Sidebar Navigation** — Collapsible sidebar with route links for Dashboard, Projects, Scans, Schedule, Notifications, Settings, and Support
- **Dark / Light Theme** — System-aware theme toggle via React Context
- **Toast Notifications** — Contextual success / error / info toasts for user actions
- **Skeleton Loading States** — Shimmer placeholders while data loads
- **Responsive Design** — Adapts across desktop, tablet, and mobile viewports

---

## 🛠️ Tech Stack

| Layer        | Technology                                                                 |
| ------------ | -------------------------------------------------------------------------- |
| **Framework**    | [React 19](https://react.dev/) with TypeScript                             |
| **Build Tool**   | [Vite 7](https://vite.dev/)                                                |
| **Routing**      | [React Router v7](https://reactrouter.com/)                                |
| **Icons**        | [Lucide React](https://lucide.dev/)                                        |
| **Styling**      | Vanilla CSS with CSS custom properties (dark/light theme tokens)           |
| **Linting**      | ESLint 9 with `typescript-eslint` and React Hooks / Refresh plugins        |
| **Deployment**   | [Vercel](https://vercel.com/)                                              |

---

## 📁 Project Structure

```
app/
├── index.html                  # HTML entry point
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript config (root)
├── package.json
└── src/
    ├── main.tsx                # React DOM root
    ├── App.tsx                 # Router & provider setup
    ├── index.css               # Global styles & design tokens
    ├── context/
    │   ├── ThemeContext.tsx     # Dark / Light theme provider
    │   └── ToastContext.tsx     # Toast notification provider
    ├── components/
    │   ├── Sidebar.tsx         # Collapsible navigation sidebar
    │   ├── SeverityBadge.tsx   # Color-coded severity pill
    │   └── StatusChip.tsx      # Scan status indicator chip
    ├── pages/
    │   ├── Login.tsx           # Sign-up / login page
    │   ├── Dashboard.tsx       # Main dashboard with scan table
    │   └── ScanDetail.tsx      # Individual scan detail view
    └── data/
        └── mockData.ts         # Static mock data & TypeScript interfaces
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (or yarn / pnpm)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/fenrir-security.git
cd fenrir-security/app

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173** by default.

### Build for Production

```bash
npm run build
```

The optimized output is generated in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## 🔑 Demo Credentials

No real authentication is implemented — any input on the sign-up form will redirect you to the Dashboard. Simply click **"Create account"** or the **"Log in"** link to proceed.

---

## ⚠️ Known Limitations

| Area                  | Detail                                                                                                   |
| --------------------- | -------------------------------------------------------------------------------------------------------- |
| **No Backend / API**      | The app runs entirely on the client with static mock data (`mockData.ts`). No real scanning engine, API server, or database is connected. |
| **No Authentication**     | The login/sign-up form does not validate credentials or manage sessions. Any input navigates to the dashboard. |
| **Static Data**           | All scan records, severity stats, console logs, and findings are hardcoded. Pagination controls are present but operate on a fixed dataset. |
| **Sidebar Routes**        | Several sidebar links (Projects, Scans, Schedule, Notifications, Settings, Support) all render the Dashboard page — dedicated pages have not been built yet. |
| **No Persistent State**   | Theme preference and form data are not persisted to `localStorage` or any storage. Refreshing the page resets all state. |
| **Social Login Buttons**  | Apple, Google, and Meta login buttons are visual-only and do not connect to any OAuth provider. |

---

## 📄 License

This project is for educational / demonstration purposes.
