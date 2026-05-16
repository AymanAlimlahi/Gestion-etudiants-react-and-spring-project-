import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { path: '/', label: 'Dashboard', icon: '⬡' },
    { path: '/etudiants', label: 'Étudiants', icon: '👨‍🎓' },
    { path: '/cours', label: 'Cours', icon: '📚' },
    { path: '/filieres', label: 'Filières', icon: '🏛️' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');

        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          padding: 16px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.4s;
          background: rgba(10,10,15,0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .nav-logo-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #6366f1, #34d399);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }

        .nav-logo-text {
          font-family: 'Syne', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #f8fafc;
          letter-spacing: -0.02em;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 6px;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 9px 16px;
          border-radius: 10px;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s;
          color: #94a3b8;
        }

        .nav-link:hover {
          color: #f1f5f9;
          background: rgba(255,255,255,0.07);
        }

        .nav-link.active {
          background: linear-gradient(135deg, rgba(99,102,241,0.25), rgba(52,211,153,0.15));
          color: #f8fafc;
          border: 1px solid rgba(99,102,241,0.3);
        }

        .nav-link-icon {
          font-size: 15px;
        }

        .nav-badge {
          width: 6px;
          height: 6px;
          background: #34d399;
          border-radius: 50%;
          margin-left: 2px;
          animation: pulse-badge 2s infinite;
        }

        @keyframes pulse-badge {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.7); }
        }
      `}</style>

      <nav className="navbar">
        <Link to="/" className="nav-logo">
          <div className="nav-logo-icon">🎓</div>
          <span className="nav-logo-text">EduManager</span>
        </Link>

        <div className="nav-links">
          {links.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              <span className="nav-link-icon">{link.icon}</span>
              {link.label}
              {location.pathname === link.path && <div className="nav-badge" />}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}

export default Navbar;