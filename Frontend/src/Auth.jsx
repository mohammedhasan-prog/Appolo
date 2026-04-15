import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Auth = () => {
    const navigate = useNavigate();
    const [currentMode, setCurrentMode] = useState('login'); // 'login' or 'register'
    const [currentRole, setCurrentRole] = useState('PATIENT'); // 'PATIENT', 'DOCTOR', 'ADMIN'
    
    // Form fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    
    // Toggle password visibility
    const [showPassword, setShowPassword] = useState(false);

    // Alerts
    const [alert, setAlert] = useState(null);

    const API_BASE_URL = 'http://localhost:5000/api/auth';

    const showAlert = (message, isError = true) => {
        setAlert({ message, isError });
    };

    const hideAlert = () => setAlert(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        hideAlert();
        
        const payload = { email, password };
        let endpoint = `${API_BASE_URL}/login`;

        if (currentMode === 'register') {
            payload.name = name;
            payload.phone = phone;
            payload.role = currentRole;
            endpoint = `${API_BASE_URL}/register`;
        }

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Authentication failed. Please try again.');
            }

            if (currentMode === 'register') {
                showAlert('Account created successfully! Switching to login...', false);
                setTimeout(() => { 
                    setCurrentMode('login'); 
                    setEmail('');
                    setPassword('');
                    setName('');
                    setPhone('');
                }, 2000);
            } else {
                showAlert('Authentication successful!', false);
                localStorage.setItem('medsync_token', data.token);
                localStorage.setItem('medsync_user', JSON.stringify(data.user || data.data));
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            }

        } catch (err) {
            showAlert(err.message, true);
        }
    };

    const roles = ['PATIENT', 'DOCTOR', 'ADMIN'];

    return (
        <div className="auth-root">
            {/* Top Navigation Bar */}
            <header className="auth-header">
                <nav className="auth-nav">
                    <div className="auth-logo font-headline">
                        MedSync
                    </div>
                    <div className="auth-nav-links font-headline">
                        <a href="#">Find Doctor</a>
                        <a href="#">Services</a>
                        <a href="#">Patient Portal</a>
                        <a href="#">Contact</a>
                    </div>
                    <div className="auth-actions">
                        <button className="btn-signin font-headline">Sign In</button>
                        <button className="btn-emergency font-headline">Emergency</button>
                    </div>
                </nav>
            </header>

            <main className="auth-main">
                {/* Background Artistic Elements */}
                <div className="auth-bg-elements">
                    <div className="bg-blob-1"></div>
                    <div className="bg-blob-2"></div>
                </div>

                <div className="auth-container">
                    {/* Left Editorial Section */}
                    <div className="auth-editorial">
                        <div>
                            <span className="editorial-tag text-xs">Clinical Editorial</span>
                            <h1 className="editorial-title font-headline text-on-surface">
                                Precision Care <br/><span className="text-primary-accent">Seamlessly Synced.</span>
                            </h1>
                            <p className="editorial-desc">
                                Experience the next generation of healthcare management. Secure, integrated, and designed for the modern practitioner and patient.
                            </p>
                        </div>
                        {/* Vital Cards Showcase */}
                        <div className="vital-cards-grid">
                            <div className="vital-card card-net">
                                <span className="vital-label">Network</span>
                                <div className="vital-value font-headline">12k+</div>
                                <span className="vital-sub">Providers Active</span>
                            </div>
                            <div className="vital-card card-sec">
                                <span className="vital-label">Security</span>
                                <div className="vital-value font-headline">256</div>
                                <span className="vital-sub">Bit Encryption</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Authentication Shell */}
                    <div className="auth-form-wrapper">
                        <div className="glass-effect-card">
                            
                            {/* Role Selection Toggle */}
                            <div style={{ marginBottom: '2.5rem' }}>
                                <div className="form-header">
                                    <h2 className="form-title font-headline">Portal Access</h2>
                                    <div>
                                        <span className="material-symbols-outlined icon-verified" style={{fontVariationSettings: "'FILL' 1"}}>verified_user</span>
                                    </div>
                                </div>
                                <div className="role-selector font-headline">
                                    {roles.map((r) => (
                                        <button 
                                            key={r}
                                            type="button"
                                            onClick={() => setCurrentRole(r)}
                                            className={currentRole === r ? 'active' : ''}
                                        >
                                            {r.charAt(0) + r.slice(1).toLowerCase()}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Tabs: Login / Register */}
                            <div className="auth-tabs font-headline">
                                <button 
                                    type="button"
                                    onClick={() => setCurrentMode('login')}
                                    className={currentMode === 'login' ? 'active' : ''}
                                >
                                    Sign In
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setCurrentMode('register')}
                                    className={currentMode === 'register' ? 'active' : ''}
                                >
                                    Register
                                </button>
                            </div>

                            {/* Alert Box */}
                            {alert && (
                                <div className={`auth-alert ${alert.isError ? 'alert-error' : 'alert-success'}`}>
                                    {alert.message}
                                </div>
                            )}

                            {/* Auth Form */}
                            <form className="auth-form-internal" onSubmit={handleSubmit}>
                                {currentMode === 'register' && (
                                    <>
                                        <div className="input-group">
                                            <label htmlFor="name">Full Name</label>
                                            <div className="input-box">
                                                <span className="material-symbols-outlined input-icon">person</span>
                                                <input 
                                                    value={name}
                                                    onChange={e => setName(e.target.value)}
                                                    id="name" 
                                                    placeholder="John Doe" 
                                                    type="text"
                                                    required={currentMode === 'register'}
                                                />
                                            </div>
                                        </div>
                                        <div className="input-group">
                                            <label htmlFor="phone">Phone Number</label>
                                            <div className="input-box">
                                                <span className="material-symbols-outlined input-icon">call</span>
                                                <input 
                                                    value={phone}
                                                    onChange={e => setPhone(e.target.value)}
                                                    id="phone" 
                                                    placeholder="+1234567890" 
                                                    type="tel"
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className="input-group">
                                    <label htmlFor="email">Institutional Email</label>
                                    <div className="input-box">
                                        <span className="material-symbols-outlined input-icon">mail</span>
                                        <input 
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            id="email" 
                                            placeholder="name@medsync.io" 
                                            type="email" 
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="input-group">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <label htmlFor="password" style={{ padding: 0 }}>Security Key</label>
                                        {currentMode === 'login' && (
                                            <a className="forgot-pw" href="#">Forgot Password?</a>
                                        )}
                                    </div>
                                    <div className="input-box">
                                        <span className="material-symbols-outlined input-icon">lock</span>
                                        <input 
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            id="password" 
                                            placeholder="••••••••" 
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                        />
                                        <button 
                                            type="button" 
                                            className="btn-toggle-pw"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            <span className="material-symbols-outlined">
                                                {showPassword ? 'visibility_off' : 'visibility'}
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                <div className="remember-group">
                                    <input id="remember" type="checkbox"/>
                                    <label htmlFor="remember">Secure Session for 30 Days</label>
                                </div>

                                <button className="btn-submit font-headline" type="submit">
                                    <span>{currentMode === 'register' ? 'Create Profile' : 'Authenticate Portal'}</span>
                                    <span className="material-symbols-outlined">login</span>
                                </button>
                            </form>

                            {/* Divider */}
                            <div className="auth-divider">
                                <div className="line"></div>
                                <span>Institutional SSO</span>
                                <div className="line"></div>
                            </div>

                            {/* Social/SSO Providers */}
                            <div className="sso-grid font-headline">
                                <button className="btn-sso">
                                    <img alt="Google authentication" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoMYqiV9EIeeG78xc8llQpLlaithUyIHjxeSNSugiUtx4iBNPETaykwiZAL_jsk3S-HhDTRBmm2SRwtK2IftLP0VtJXUsxgiIf-mBiHM42J1J9Xju70DgoufDszdphvzA8HqUBFOMgv3B3GzH1wUZs_-H3320hjcHA3tp5iRfUrt21af9RELVg0NnpmEcnK_tsN0wGGWzbVpC5ejKX7GSxV3fUOIr2h3aCh-QgpFpPIX3R0DlhW7CYIvWH3vPRC8AvPiVCzxH19ZSG"/>
                                    <span>Google</span>
                                </button>
                                <button className="btn-sso">
                                    <img alt="Microsoft authentication" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFkA-ZCnjHT8i_ocpjhau3cFuUP7y_86dagly_v3cuPrlk9_2431y0mT32mBAkH4l2m5Z5r1NhA2s97MaySbCPZcl5HKFL47ELf8K-ujL3tmaGs7NOmelcDWKvqWVRvvEc-jbfhm9wKtz797_8-8m-qUUgQPr72EqIaRCjRsD-o6mMZ0pZK-rt2iE7PcnTOdOxQtusvSETQ8svNEciNVjj6cRgP3f6Pk167kWEJIHJ0xT-iXCaXL1x0_M7othQirjYvpj4dUAmMpC4"/>
                                    <span>Microsoft</span>
                                </button>
                            </div>

                            {/* Compliance Footer */}
                            <div className="auth-compliance">
                                <p>
                                    By authenticating, you agree to the <a href="#">Data Processing Agreement</a> and HIPAA compliance guidelines. System access is monitored for security purposes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer Identity */}
            <footer className="auth-footer">
                <div className="footer-content">
                    <div className="footer-left">
                        <span className="footer-logo font-headline">MedSync</span>
                        <div className="footer-links">
                            <a href="#">Privacy</a>
                            <a href="#">Security</a>
                            <a href="#">Interoperability</a>
                        </div>
                    </div>
                    <div className="footer-right">
                        <div className="footer-text font-headline" style={{textAlign: 'right'}}>
                            <p className="footer-title">Precision Serenity</p>
                            <p className="footer-subtitle">Designed for Modern Healthcare</p>
                        </div>
                        <div className="footer-icon">
                            <span className="material-symbols-outlined">health_and_safety</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Auth;
