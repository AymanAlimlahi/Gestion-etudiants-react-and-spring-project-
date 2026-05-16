import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEtudiants, getCours, getFilieres } from '../services/api';

function Dashboard() {
  const [stats, setStats] = useState({ etudiants: 0, cours: 0, filieres: 0 });
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadStats = async () => {
      const [e, c, f] = await Promise.all([getEtudiants(), getCours(), getFilieres()]);
      setStats({ etudiants: e.data.length, cours: c.data.length, filieres: f.data.length });
      setTimeout(() => setLoaded(true), 100);
    };
    loadStats();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        .dash-root {
          min-height: 100vh;
          background: #0a0a0f;
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
          position: relative;
        }

        .dash-root::before {
          content: '';
          position: fixed;
          top: -40%;
          left: -20%;
          width: 80vw;
          height: 80vw;
          background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .dash-root::after {
          content: '';
          position: fixed;
          bottom: -40%;
          right: -20%;
          width: 70vw;
          height: 70vw;
          background: radial-gradient(circle, rgba(20,184,166,0.10) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .noise-overlay {
          position: fixed;
          inset: 0;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
        }

        .dash-content {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 40px;
        }

        .hero-section {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 80px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-left {
          max-width: 600px;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(99,102,241,0.1);
          border: 1px solid rgba(99,102,241,0.2);
          color: #818cf8;
          padding: 6px 14px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 24px;
        }

        .eyebrow-dot {
          width: 6px;
          height: 6px;
          background: #818cf8;
          border-radius: 50%;
          animation: pulse-dot 2s infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        .hero-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(42px, 5vw, 64px);
          font-weight: 800;
          line-height: 1.05;
          color: #f8fafc;
          margin: 0 0 20px 0;
          letter-spacing: -0.03em;
        }

        .hero-title span {
          background: linear-gradient(135deg, #818cf8, #34d399);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-desc {
          font-size: 17px;
          color: #64748b;
          line-height: 1.7;
          margin: 0 0 40px 0;
          font-weight: 300;
        }

        .hero-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btn-primary-dash {
          padding: 14px 28px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 4px 20px rgba(99,102,241,0.3);
        }

        .btn-primary-dash:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(99,102,241,0.4);
        }

        .btn-secondary-dash {
          padding: 14px 28px;
          background: rgba(255,255,255,0.05);
          color: #94a3b8;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
          font-family: 'DM Sans', sans-serif;
        }

        .btn-secondary-dash:hover {
          background: rgba(255,255,255,0.08);
          color: #f1f5f9;
          transform: translateY(-2px);
        }

        .hero-visual {
          width: 260px;
          height: 260px;
          flex-shrink: 0;
          position: relative;
        }

        .orbit-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(99,102,241,0.15);
          animation: orbit-spin 20s linear infinite;
        }

        .orbit-ring:nth-child(1) {
          width: 100%;
          height: 100%;
          top: 0; left: 0;
        }

        .orbit-ring:nth-child(2) {
          width: 75%;
          height: 75%;
          top: 12.5%; left: 12.5%;
          animation-duration: 15s;
          animation-direction: reverse;
          border-color: rgba(52,211,153,0.15);
        }

        .orbit-ring:nth-child(3) {
          width: 50%;
          height: 50%;
          top: 25%; left: 25%;
          animation-duration: 10s;
          border-color: rgba(251,191,36,0.15);
        }

        @keyframes orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .orbit-dot {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          top: -4px;
          left: 50%;
          margin-left: -4px;
        }

        .center-icon {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, rgba(99,102,241,0.2), rgba(52,211,153,0.2));
          border-radius: 24px;
          border: 1px solid rgba(99,102,241,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 50px;
        }

        .stat-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          padding: 32px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(20px);
        }

        .stat-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .stat-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--card-color-a), var(--card-color-b));
          opacity: 0;
          transition: opacity 0.4s;
          border-radius: 20px;
        }

        .stat-card:hover::before {
          opacity: 0.06;
        }

        .stat-card:hover {
          border-color: var(--card-border);
          transform: translateY(-6px);
          box-shadow: 0 20px 60px var(--card-shadow);
        }

        .stat-card-inner {
          position: relative;
          z-index: 1;
        }

        .stat-icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          margin-bottom: 20px;
          background: var(--card-icon-bg);
          border: 1px solid var(--card-border);
        }

        .stat-number {
          font-family: 'Syne', sans-serif;
          font-size: 52px;
          font-weight: 800;
          color: #f8fafc;
          line-height: 1;
          margin-bottom: 8px;
          letter-spacing: -0.03em;
        }

        .stat-label {
          font-size: 14px;
          color: #64748b;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 20px;
        }

        .stat-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: var(--card-accent);
          font-weight: 500;
          transition: gap 0.2s;
        }

        .stat-card:hover .stat-link {
          gap: 10px;
        }

        .quick-actions {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          padding: 32px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s;
        }

        .quick-actions.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .section-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #475569;
          font-weight: 500;
          margin-bottom: 20px;
        }

        .actions-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 20px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          color: #94a3b8;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
          font-family: 'DM Sans', sans-serif;
        }

        .action-btn:hover {
          background: rgba(255,255,255,0.08);
          color: #f1f5f9;
          border-color: rgba(255,255,255,0.12);
          transform: translateY(-2px);
        }

        .action-btn-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }
      `}</style>

      <div className="dash-root">
        <div className="noise-overlay" />
        <div className="dash-content">

          {/* Hero */}
          <div className={`hero-section ${loaded ? 'visible' : ''}`}>
            <div className="hero-left">
              <div className="eyebrow">
                <div className="eyebrow-dot" />
                Système de Gestion Académique
              </div>
              <h1 className="hero-title">
                Gérez votre<br />
                <span>université</span><br />
                avec style.
              </h1>
              <p className="hero-desc">
                Une plateforme moderne pour gérer vos étudiants,
                cours et filières. Simple, rapide et élégant.
              </p>
              <div className="hero-actions">
                <button className="btn-primary-dash" onClick={() => navigate('/etudiants')}>
                  Voir les étudiants →
                </button>
                <button className="btn-secondary-dash" onClick={() => navigate('/cours')}>
                  Explorer les cours
                </button>
              </div>
            </div>

            <div className="hero-visual">
              <div className="orbit-ring">
                <div className="orbit-dot" style={{ background: '#818cf8' }} />
              </div>
              <div className="orbit-ring">
                <div className="orbit-dot" style={{ background: '#34d399' }} />
              </div>
              <div className="orbit-ring">
                <div className="orbit-dot" style={{ background: '#fbbf24' }} />
              </div>
              <div className="center-icon">🎓</div>
            </div>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            {[
              {
                icon: '👨‍🎓', number: stats.etudiants, label: 'Étudiants',
                colorA: '#6366f1', colorB: '#8b5cf6',
                border: 'rgba(99,102,241,0.25)', shadow: 'rgba(99,102,241,0.15)',
                iconBg: 'rgba(99,102,241,0.1)', accent: '#818cf8',
                path: '/etudiants', delay: '0.1s'
              },
              {
                icon: '📚', number: stats.cours, label: 'Cours',
                colorA: '#10b981', colorB: '#34d399',
                border: 'rgba(52,211,153,0.25)', shadow: 'rgba(52,211,153,0.15)',
                iconBg: 'rgba(52,211,153,0.1)', accent: '#34d399',
                path: '/cours', delay: '0.2s'
              },
              {
                icon: '🏛️', number: stats.filieres, label: 'Filières',
                colorA: '#f59e0b', colorB: '#fbbf24',
                border: 'rgba(251,191,36,0.25)', shadow: 'rgba(251,191,36,0.15)',
                iconBg: 'rgba(251,191,36,0.1)', accent: '#fbbf24',
                path: '/filieres', delay: '0.3s'
              }
            ].map((item, i) => (
              <div
                key={i}
                className={`stat-card ${loaded ? 'visible' : ''}`}
                style={{
                  '--card-color-a': item.colorA,
                  '--card-color-b': item.colorB,
                  '--card-border': item.border,
                  '--card-shadow': item.shadow,
                  '--card-icon-bg': item.iconBg,
                  '--card-accent': item.accent,
                  transitionDelay: item.delay
                }}
                onClick={() => navigate(item.path)}
              >
                <div className="stat-card-inner">
                  <div className="stat-icon-wrap">{item.icon}</div>
                  <div className="stat-number">{item.number}</div>
                  <div className="stat-label">{item.label}</div>
                  <div className="stat-link">
                    Voir tout <span>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className={`quick-actions ${loaded ? 'visible' : ''}`}>
            <div className="section-label">Actions rapides</div>
            <div className="actions-row">
              {[
                { icon: '➕', label: 'Nouvel étudiant', path: '/etudiants', bg: 'rgba(99,102,241,0.15)' },
                { icon: '📖', label: 'Nouveau cours', path: '/cours', bg: 'rgba(52,211,153,0.15)' },
                { icon: '🏫', label: 'Nouvelle filière', path: '/filieres', bg: 'rgba(251,191,36,0.15)' },
              ].map((a, i) => (
                <button key={i} className="action-btn" onClick={() => navigate(a.path)}>
                  <div className="action-btn-icon" style={{ background: a.bg }}>{a.icon}</div>
                  {a.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;