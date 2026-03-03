import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Eye, EyeOff, Check, Sun, Moon } from 'lucide-react';

export default function Login() {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [agreed, setAgreed] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            navigate('/dashboard');
        }, 1200);
    };

    const features = [
        'Effortlessly spider and map targets to uncover hidden security flaws',
        'Deliver high-quality, validated findings in hours, not weeks.',
        'Generate professional, enterprise-grade security reports automatically.',
    ];

    return (
        <div className="login-page">
            {/* Full dark gradient background */}
            <div className="login-bg">
                <div className="login-glow login-glow-1" />
                <div className="login-glow login-glow-2" />
                <div className="login-glow login-glow-3" />
            </div>

            <button className="login-theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className="login-content">
                {/* Left branding */}
                <div className="login-left">
                    <div className="login-left-content">
                        <div className="login-logo">
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                                <circle cx="18" cy="18" r="16" fill="#0CC8A8" />
                                <text x="18" y="24" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="700" fontFamily="Inter">F</text>
                            </svg>
                            <span className="login-logo-text">Fenrir</span>
                        </div>

                        <h1 className="login-headline">
                            Expert level Cybersecurity in <span className="highlight">hours</span> not weeks.
                        </h1>

                        <div className="login-features">
                            <p className="features-label">What's included</p>
                            {features.map(f => (
                                <div key={f} className="feature-item">
                                    <div className="feature-check"><Check size={14} /></div>
                                    <span>{f}</span>
                                </div>
                            ))}
                        </div>

                        <div className="login-trust">
                            <div className="trust-stars">
                                {[1, 2, 3, 4].map(i => (
                                    <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="#4ADE80" stroke="none">
                                        <path d="M8 1l2.2 4.5L15 6.2l-3.5 3.4.8 4.9L8 12.2 3.7 14.5l.8-4.9L1 6.2l4.8-.7L8 1z" />
                                    </svg>
                                ))}
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#4ADE80" strokeWidth="1">
                                    <path d="M8 1l2.2 4.5L15 6.2l-3.5 3.4.8 4.9L8 12.2 3.7 14.5l.8-4.9L1 6.2l4.8-.7L8 1z" />
                                </svg>
                            </div>
                            <span className="trust-rating">4.5/5.0</span>
                            <span className="trust-source">Trustpilot</span>
                        </div>
                    </div>
                </div>

                {/* Floating form card */}
                <div className="login-right">
                    <div className="login-card">
                        <h2 className="login-form-title">Sign up</h2>
                        <p className="login-form-subtitle">Already have an account? <a href="#signin" onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }}>Log in</a></p>

                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="form-group">
                                <input
                                    id="firstName"
                                    type="text"
                                    placeholder="First name*"
                                    value={form.firstName}
                                    onChange={e => setForm({ ...form, firstName: e.target.value })}
                                    required
                                    aria-required="true"
                                    aria-label="First name"
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    id="lastName"
                                    type="text"
                                    placeholder="Last name*"
                                    value={form.lastName}
                                    onChange={e => setForm({ ...form, lastName: e.target.value })}
                                    required
                                    aria-required="true"
                                    aria-label="Last name"
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Email address*"
                                    value={form.email}
                                    onChange={e => setForm({ ...form, email: e.target.value })}
                                    required
                                    aria-required="true"
                                    aria-label="Email address"
                                />
                            </div>

                            <div className="form-group">
                                <div className="password-input">
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Password (8+ characters)*"
                                        value={form.password}
                                        onChange={e => setForm({ ...form, password: e.target.value })}
                                        required
                                        aria-required="true"
                                        aria-label="Password"
                                    />
                                    <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <label className="checkbox-label" htmlFor="terms">
                                <input type="checkbox" id="terms" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
                                <span className="custom-checkbox">{agreed && <Check size={12} />}</span>
                                I agree to Fenrir's <a href="#terms">Terms &amp; Conditions</a> and acknowledge the <a href="#privacy">Privacy Policy</a>
                            </label>

                            <button
                                type="submit"
                                className={`btn-primary login-submit ${loading ? 'loading' : ''}`}
                                disabled={loading}
                            >
                                {loading ? <div className="spinner" /> : 'Create account'}
                            </button>
                        </form>

                        <div className="social-logins">
                            <button className="social-btn social-apple" aria-label="Sign in with Apple">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                </svg>
                            </button>
                            <button className="social-btn social-google" aria-label="Sign in with Google">
                                <svg width="20" height="20" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                            </button>
                            <button className="social-btn social-meta" aria-label="Sign in with Meta">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
