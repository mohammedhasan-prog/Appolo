import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('medsync_token');

    const handleLogout = () => {
        localStorage.removeItem('medsync_token');
        localStorage.removeItem('medsync_user');
        navigate('/');
    };

    return (
        <div className="navbar-container">
            <div className="navbar-content">
                <div className="navbar-logo" onClick={() => navigate('/')}>
                    <span className="material-symbols-outlined" style={{color: '#005eb8'}}>health_and_safety</span>
                    MedSync
                </div>
                <div className="navbar-links">
                    <a href="#" className={location.pathname === '/' ? 'active' : ''} onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
                    <a href="#">Find Doctor</a>
                    <a href="#">Services</a>
                    <a href="#">Patient Portal</a>
                    <a href="#">Contact</a>
                </div>
                <div className="navbar-actions">
                    {token ? (
                        <button className="btn-signin-nav" onClick={handleLogout}>Logout</button>
                    ) : (
                        <button className="btn-signin-nav" onClick={() => navigate('/auth')}>Sign In</button>
                    )}
                    <button className="btn-emergency-nav">Emergency</button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
