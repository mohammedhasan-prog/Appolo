import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('medsync_token');

    const handleLogout = () => {
        localStorage.removeItem('medsync_token');
        localStorage.removeItem('medsync_user');
        navigate('/');
    };

    return (
        <div className="landing-root">
            {/* Top Navigation Bar */}
            <nav className="landing-nav">
                <div className="landing-nav-container">
                    <div className="landing-logo">
                        MedSync
                    </div>
                    <div className="landing-nav-links">
                        <a href="#" className="active">Find Doctor</a>
                        <a href="#">Services</a>
                        <a href="#">Patient Portal</a>
                        <a href="#">Contact</a>
                    </div>
                    <div className="landing-actions">
                        {token ? (
                            <button className="btn-signin-nav" onClick={handleLogout}>Logout</button>
                        ) : (
                            <button className="btn-signin-nav" onClick={() => navigate('/auth')}>Sign In</button>
                        )}
                        <button className="btn-emergency-nav">Emergency</button>
                    </div>
                </div>
            </nav>

            <main>
                {/* Hero Section */}
                <section className="hero-section">
                    <div className="hero-grid">
                        <div className="hero-left">
                            <h1 className="hero-title">
                                Healthcare <span>Precisely</span> Reimagined.
                            </h1>
                            <p className="hero-desc">
                                Access world-class medical expertise through a clinical editorial interface designed for clarity, trust, and frictionless care delivery.
                            </p>
                            
                            {/* Search Anchor */}
                            <div className="search-anchor">
                                <div className="search-input-group">
                                    <span className="material-symbols-outlined" style={{color: '#727783', marginRight: '0.75rem'}}>search</span>
                                    <input type="text" placeholder="Find a Doctor by Speciality or Name" />
                                </div>
                                <div className="search-devider"></div>
                                <div className="search-input-group">
                                    <span className="material-symbols-outlined" style={{color: '#727783', marginRight: '0.75rem'}}>location_on</span>
                                    <input type="text" placeholder="Location" />
                                </div>
                                <button className="btn-search">Search</button>
                            </div>

                            <div className="hero-stats">
                                <div className="stats-faces">
                                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjJy169RqMOL--XEQj73tqWBiAyI9yiiHcHTAuzUYPt-5TY5UWEgb3w65p4WWA468hNX1bxOQpENhHV6JKoce49ku3ukWn_0xQC7kvyoSbZsB75twONSa9Hc92pLETq5bdqnQHKaZpWk_wxXjMRUCTZy2rgbe0XZCIrLOGXsT1KOMkT-p17CM-zQg69VvO7jGGmEZuCfy9gD9J85dVWAH57o92-TO2INegrf9icQpsJ7cn3pHPZHyfu0JCXVlGx8V_9xkcJZELU7Iu" alt="doctor1"/>
                                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeRzu-iLS9EGC2hl8Hgf053QIM7LmRztyPeel4kYizygDEw29XPIQBauJ8LVHlYEznHriv7S97aS1lnJjoLXxV9JrLKgtNsc5aTkYX8Rkb20vvb2jgVRXkv9SRZI00L5w7fjevT-cJXPjUqcGBVEIfKD7mWHVZXcinsNYEMPFkW2mTVUU-iFPAZ3xnsjcDxsPtWNCzdOot6eTuybDzauFuhtcN-q4dxqbmk4JI1GV1QFqAJr09oxh40gTmj7LWw2wN5lI-x2lNeCZ5" alt="doctor2"/>
                                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvzWcOT4r1xGlSDPDodAqCB_5BMWFKArfozxP7HeGbkBLmqCf-hcmO6_0JpoyNAzwixuq3g1CV4qnYdENJN3D_xoHEgYSa4fvmhsW-m7zbBcPZsc4x3JJYrhr-tSgavfih0JmxLN21r7cEhndboJ1fwsDqyyHdGwlvcS-CB0PciKQk0VLY6U8cohrHPI_Xj0qtXQ5kYTU-t2Qz1dIokgIKKCGTGEaeqZ846TQHcno3GYyI9lxGPnqXbdI_AvgpJKTJ5xNa8013vMXw" alt="doctor3"/>
                                </div>
                                <p className="stats-text"><span style={{color: '#00478d', fontWeight: 'bold'}}>2,400+</span> Specialized Doctors available today</p>
                            </div>
                        </div>

                        <div className="hero-right">
                            <div className="visuals-blur"></div>
                            <div className="hero-right-visuals">
                                <img className="hero-main-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNnsqDlOHPT8W2w7BFM2j0dwXVTDxBfZd7j50d-sEZNMqeet-vctkgwivXdw32_EEkZfdeQUOlXz4zevxdg0efQq9OC8MHp37FZVfVTuH-bJVakXMSitwqZru8YBQGHam_XJw1MEOJvPqIam3s96qQsH_unHFLRP7d3vqQ_DLgOgE8Q38ghYiuHVEBunUW8oq4EwwOhlwDD9w3cvKVV4vkCv9t_qQBUc8xkmk2pgAnp0c9O_QCNMVzaq50kXtFu1fgm4M1VL5tk0Dl" alt="clinical room"/>
                                <div className="badge-overlay">
                                    <div className="badge-icon">
                                        <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
                                    </div>
                                    <div>
                                        <p className="badge-text-top">Accredited Partner</p>
                                        <p className="badge-text-bot">Johns Hopkins Medicine Affiliated</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Specialities Section */}
                <section className="specialities-section">
                    <div className="spec-header">
                        <div>
                            <h2 className="spec-title">Our Specialities</h2>
                            <p className="spec-desc">Precision care across every discipline. We connect you with verified specialists who lead their respective fields in research and clinical excellence.</p>
                        </div>
                        <a href="#" className="spec-link">
                            View All Services <span className="material-symbols-outlined">arrow_forward</span>
                        </a>
                    </div>
                    <div className="spec-grid">
                        <div className="spec-card">
                            <div className="spec-icon-wrapper" style={{background: '#d6e3ff', color: '#00478d'}}>
                                <span className="material-symbols-outlined" style={{fontSize: '2rem'}}>cardiology</span>
                            </div>
                            <h3>Cardiology</h3>
                            <p>Advanced diagnostics and personalized treatment for cardiovascular health.</p>
                        </div>
                        <div className="spec-card">
                            <div className="spec-icon-wrapper" style={{background: '#93f2f2', color: '#006e6e'}}>
                                <span className="material-symbols-outlined" style={{fontSize: '2rem'}}>neurology</span>
                            </div>
                            <h3 style={{'--hover-bg': '#006e6e'}}>Neurology</h3>
                            <p>Expert care for complex brain, spinal cord, and nervous system conditions.</p>
                        </div>
                        <div className="spec-card">
                           <div className="spec-icon-wrapper" style={{background: '#b1eeea', color: '#09504e'}}>
                                <span className="material-symbols-outlined" style={{fontSize: '2rem'}}>child_care</span>
                            </div>
                            <h3>Pediatrics</h3>
                            <p>Compassionate medical care for infants, children, and adolescents.</p>
                        </div>
                        <div className="spec-card">
                            <div className="spec-icon-wrapper" style={{background: '#d6e3ff', color: '#00478d'}}>
                                <span className="material-symbols-outlined" style={{fontSize: '2rem'}}>oncology</span>
                            </div>
                            <h3>Oncology</h3>
                            <p>Comprehensive cancer care integrated with the latest research protocols.</p>
                        </div>
                    </div>
                </section>

                {/* Metrics Section */}
                <section className="metrics-section">
                    <div className="metrics-grid">
                        <div className="metric-card">
                            <p className="metric-label">Network Reach</p>
                            <div className="metric-values">
                                <span className="metric-number">150+</span>
                                <span className="metric-unit">Facilities</span>
                            </div>
                        </div>
                        <div className="metric-card">
                            <p className="metric-label">Patient Trust</p>
                            <div className="metric-values">
                                <span className="metric-number">98%</span>
                                <span className="metric-unit">Satisfaction</span>
                            </div>
                        </div>
                        <div className="metric-card">
                            <p className="metric-label">Response Time</p>
                            <div className="metric-values">
                                <span className="metric-number">12m</span>
                                <span className="metric-unit">Avg Wait</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How it Works Section */}
                <section className="how-section">
                    <div className="how-container">
                        <h2 className="how-title">How MedSync Works</h2>
                        <div className="how-grid">
                            <div className="how-step step-1">
                                <div style={{zIndex: 10}}>
                                    <span className="step-num">01</span>
                                    <h3 className="step-title">Precision Matching</h3>
                                    <p className="step-desc">Our AI-driven system analyzes your symptoms and preferences to suggest the most qualified specialists in your immediate area.</p>
                                </div>
                                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0iGgbfKFomJPi-aVDOpHhuMgtKBdD6A47ZIpXQmHVdPD6KcUzg52jq2bgg6iExHDtgJxUjskBkDGI8UmwIysunUCbSRU1qal0xNWBXmCbnE0YFXXPTacvGkogDNNU2Oa4ZzVzqIwDHf0vz2I64mz_D0LrZMW0EcQytaKytCkzEKkDIhbl0XVHWWKeDIsu6HnYuNpv89FqS0OmwB990-cwPweJpCP-qyT5vgy-WDBhFOfvi8fvOlbAsmvQb_0G_8Ujegjz5_9hLyGM" alt="screen" style={{position:'absolute', bottom:0, right: 0, width: '50%', height: '60%', objectFit: 'cover', borderTopLeftRadius: '3rem', opacity: 0.4, mixBlendMode: 'overlay'}} />
                            </div>

                            <div className="how-step step-2">
                                <div>
                                    <span className="step-num">02</span>
                                    <h3 className="step-title">Secure Sync</h3>
                                    <p className="step-desc">Seamlessly share your medical history via encrypted channels before your first appointment.</p>
                                </div>
                                <div className="security-badge">
                                    <span className="material-symbols-outlined" style={{color: '#00478d', fontVariationSettings: "'FILL' 1"}}>security</span>
                                    <p style={{fontSize: '12px', fontWeight: 700, color: '#00478d', margin: 0}}>HIPAA COMPLIANT</p>
                                </div>
                            </div>
                            
                            <div className="how-step step-3">
                                <div>
                                    <span className="step-num">03</span>
                                    <h3 className="step-title">Virtual Care</h3>
                                    <p className="step-desc">Book HD video consultations for follow-ups or initial screenings from home.</p>
                                </div>
                            </div>

                            <div className="how-step step-4">
                                <div style={{display:'flex', flexDirection: 'row', alignItems: 'center', gap: '3rem'}}>
                                    <div style={{flex: 1}}>
                                        <span className="step-num">04</span>
                                        <h3 className="step-title">Integrated Recovery</h3>
                                        <p className="step-desc">Receive digital prescriptions, care plans, and recovery tracking directly in your portal.</p>
                                    </div>
                                    <div style={{flex: 1, backgroundColor: 'rgba(214, 227, 255, 0.4)', borderRadius: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem'}}>
                                        <span className="material-symbols-outlined" style={{fontSize: '5rem', color: '#00478d'}}>monitoring</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="cta-section">
                    <h2 className="cta-title">Ready for a better care experience?</h2>
                    <p className="cta-desc">Join thousands of patients who have found their trusted medical partners through MedSync's precision platform.</p>
                    <div className="cta-buttons">
                        <button className="btn-primary-cta" onClick={() => navigate('/auth')}>Create Account</button>
                        <button className="btn-secondary-cta">Explore Doctors</button>
                    </div>
                </section>
            </main>

            <footer className="footer-section">
                <div className="footer-grid">
                    <div>
                        <div className="footer-logo">MedSync</div>
                        <p className="footer-text">Leading the digital transformation of patient-centered healthcare through precision engineering and clinical empathy.</p>
                    </div>
                    <div className="footer-link-group">
                        <h4>Company</h4>
                        <ul>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Our Network</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Press Room</a></li>
                        </ul>
                    </div>
                    <div className="footer-link-group">
                        <h4>Patient Resources</h4>
                        <ul>
                            <li><a href="#">Health Library</a></li>
                            <li><a href="#">Insurance Partners</a></li>
                            <li><a href="#">Telehealth Guide</a></li>
                            <li><a href="#">Patient Stories</a></li>
                        </ul>
                    </div>
                     <div className="footer-link-group">
                        <h4>Support</h4>
                        <ul>
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Accessibility</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
