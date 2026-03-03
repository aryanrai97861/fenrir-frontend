import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ScanDetail from './pages/ScanDetail';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Dashboard />} />
            <Route path="/scans" element={<Dashboard />} />
            <Route path="/schedule" element={<Dashboard />} />
            <Route path="/notifications" element={<Dashboard />} />
            <Route path="/settings" element={<Dashboard />} />
            <Route path="/support" element={<Dashboard />} />
            <Route path="/scan/:id" element={<ScanDetail />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
