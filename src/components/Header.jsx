import React, { useState, useRef, useEffect } from 'react';
import { 
  Home, 
  MessageSquare, 
  Compass, 
  Columns, 
  Calendar, 
  Bookmark, 
  Bell, 
  Search, 
  Calculator, 
  ChevronDown, 
  Globe, 
  Menu, 
  X, 
  GraduationCap, 
  Building2, 
  BookOpen, 
  Award, 
  Phone, 
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  User
} from 'lucide-react';
import { noticesData } from '../data/notices';
import logoImg from '../assets/logo.png';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  userProfile,
  shortlistCount = 0, 
  compareCount = 0,
  onOpenCommandPalette,
  onOpenCalculator,
  onOpenNotice
}) {
  const [activeMegamenu, setActiveMegamenu] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [lang, setLang] = useState('EN'); // 'EN' | 'BN'

  const toggleLang = () => {
    setLang(prev => prev === 'EN' ? 'BN' : 'EN');
  };

  // Close menus when clicking outside
  const headerRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setActiveMegamenu(null);
        setShowNotifications(false);
        setResourcesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header ref={headerRef} style={{ position: 'sticky', top: 0, zIndex: 1000, width: '100%' }}>
      
      {/* 1. TOP MAROON BAR (#921E33) - UITS UI Bar styling with UniQuery platform links */}
      <div className="uits-top-bar">
        <div className="uits-top-bar-inner">
          <ul className="uits-top-nav-links">
            <li>
              <button 
                className="uits-top-link-item" 
                onClick={() => setActiveTab('home')}
              >
                HOME
              </button>
            </li>
            <li>
              <button 
                className="uits-top-link-item" 
                onClick={() => setActiveTab('explore')}
              >
                ADMISSION PORTAL <span className="uits-top-link-badge">2026/2027</span>
              </button>
            </li>
            <li style={{ position: 'relative' }}>
              <button 
                className="uits-top-link-item"
                onClick={() => setResourcesOpen(!resourcesOpen)}
              >
                RESOURCES <ChevronDown size={11} />
              </button>
              {resourcesOpen && (
                <div 
                  className="animate-slide-down"
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    background: '#FFFFFF',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.18)',
                    minWidth: '200px',
                    padding: '8px 0',
                    zIndex: 1100,
                    marginTop: '4px',
                    border: '1px solid #E2E8F0'
                  }}
                >
                  <button 
                    onClick={() => { setActiveTab('profile'); setResourcesOpen(false); }}
                    style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '8px 16px', color: '#002147', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                  >
                    STUDENT PROFILE &amp; RESULTS
                  </button>
                  <button 
                    onClick={() => { onOpenCalculator(); setResourcesOpen(false); }}
                    style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '8px 16px', color: '#002147', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                  >
                    ELIGIBILITY CALCULATOR
                  </button>
                  <button 
                    onClick={() => { setActiveTab('shortlist'); setResourcesOpen(false); }}
                    style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '8px 16px', color: '#002147', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                  >
                    SAVED SHORTLIST ({shortlistCount})
                  </button>
                </div>
              )}
            </li>
            <li>
              <button 
                className="uits-top-link-item"
                onClick={onOpenCalculator}
              >
                ELIGIBILITY VERIFICATION
              </button>
            </li>
            <li>
              <button 
                className="uits-top-link-item"
                onClick={() => setActiveTab('notices')}
              >
                LATEST CIRCULARS
              </button>
            </li>
            <li>
              <button 
                className="uits-top-link-item"
                onClick={() => setActiveTab('compare')}
              >
                COMPARE MATRIX
              </button>
            </li>
            <li>
              <button 
                className="uits-top-link-item"
                onClick={() => setActiveTab('notices')}
              >
                NOTICE BOARD
              </button>
            </li>
            <li>
              <button 
                className="uits-top-link-item"
                onClick={() => setActiveTab('ask-ai')}
              >
                AI ASSISTANT
              </button>
            </li>
          </ul>

          {/* Right contacts & language */}
          <div className="uits-top-contacts">
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Phone size={11} color="#E5A823" />
              <span>Helpline: +880 17 1234 5678</span>
            </span>
            <button 
              onClick={toggleLang}
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: 'none',
                color: '#FFFFFF',
                borderRadius: '4px',
                padding: '2px 8px',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {lang}
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN STICKY NAVBAR - White background with Shadow */}
      <nav className="site-header">
        <div className="header-container">
          
          {/* UniQuery Brand Logo & Tagline */}
          <div 
            className="brand-wrapper"
            onClick={() => {
              setActiveTab('home');
              setMobileMenuOpen(false);
            }}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <img 
              src={logoImg} 
              alt="UniQuery Logo" 
              style={{ height: '42px', width: 'auto', objectFit: 'contain' }} 
            />
            <div className="brand-text-group">
              <span className="brand-title">UniQuery</span>
              <span className="brand-subtitle">ASK · EXPLORE · CHOOSE</span>
            </div>
          </div>

          {/* Megamenu Navigation Tabs (Desktop) */}
          <div className="desktop-only-nav">
            <ul className="uits-nav-container">
              
              {/* Home */}
              <li>
                <button 
                  className={`uits-nav-btn ${activeTab === 'home' ? 'active' : ''}`}
                  onClick={() => setActiveTab('home')}
                >
                  <Home size={15} />
                  <span>Home</span>
                </button>
              </li>

              {/* Explore Universities Dropdown */}
              <li 
                className="uits-nav-item"
                onMouseEnter={() => setActiveMegamenu('universities')}
                onMouseLeave={() => setActiveMegamenu(null)}
              >
                <button 
                  className={`uits-nav-btn ${activeMegamenu === 'universities' || activeTab.startsWith('explore') ? 'active' : ''}`}
                  onClick={() => setActiveMegamenu(activeMegamenu === 'universities' ? null : 'universities')}
                >
                  Explore <ChevronDown size={14} />
                </button>

                {activeMegamenu === 'universities' && (
                  <div className="uits-dropdown-menu uits-megamenu" style={{ minWidth: '580px' }}>
                    <div>
                      <h6 className="uits-megamenu-title">Public &amp; Engineering</h6>
                      <button 
                        onClick={() => { setActiveTab('explore'); setActiveMegamenu(null); }}
                        className="uits-megamenu-item"
                        style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
                      >
                        BUET — Bangladesh Univ. of Eng &amp; Tech
                      </button>
                      <button 
                        onClick={() => { setActiveTab('explore'); setActiveMegamenu(null); }}
                        className="uits-megamenu-item"
                        style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
                      >
                        University of Dhaka (DU - Ka, Kha, Ga)
                      </button>
                      <button 
                        onClick={() => { setActiveTab('explore'); setActiveMegamenu(null); }}
                        className="uits-megamenu-item"
                        style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
                      >
                        Rajshahi University (RU - A, B, C)
                      </button>
                      <button 
                        onClick={() => { setActiveTab('explore'); setActiveMegamenu(null); }}
                        className="uits-megamenu-item"
                        style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
                      >
                        CKRUET Engineering Cluster (KUET, RUET, CUET)
                      </button>
                    </div>

                    <div>
                      <h6 className="uits-megamenu-title">Top Private &amp; Specialized</h6>
                      <button 
                        onClick={() => { setActiveTab('explore'); setActiveMegamenu(null); }}
                        className="uits-megamenu-item"
                        style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
                      >
                        North South University (NSU)
                      </button>
                      <button 
                        onClick={() => { setActiveTab('explore'); setActiveMegamenu(null); }}
                        className="uits-megamenu-item"
                        style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
                      >
                        BRAC University
                      </button>
                      <button 
                        onClick={() => { setActiveTab('explore'); setActiveMegamenu(null); }}
                        className="uits-megamenu-item"
                        style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left', color: '#921E33', fontWeight: 700 }}
                      >
                        Browse All 50+ Universities →
                      </button>
                    </div>
                  </div>
                )}
              </li>

              {/* Admission Tools Dropdown */}
              <li 
                className="uits-nav-item"
                onMouseEnter={() => setActiveMegamenu('tools')}
                onMouseLeave={() => setActiveMegamenu(null)}
              >
                <button 
                  className={`uits-nav-btn ${activeMegamenu === 'tools' ? 'active' : ''}`}
                  onClick={() => setActiveMegamenu(activeMegamenu === 'tools' ? null : 'tools')}
                >
                  Admission Tools <ChevronDown size={14} />
                </button>

                {activeMegamenu === 'tools' && (
                  <div className="uits-dropdown-menu" style={{ minWidth: '280px' }}>
                    <h6 className="uits-megamenu-title">Smart Tools</h6>
                    <button 
                      onClick={() => { onOpenCalculator(); setActiveMegamenu(null); }}
                      className="uits-megamenu-item"
                      style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left', color: '#921E33', fontWeight: 700 }}
                    >
                      Instant GPA &amp; Eligibility Calculator ↗
                    </button>
                    <button 
                      onClick={() => { setActiveTab('ask-ai'); setActiveMegamenu(null); }}
                      className="uits-megamenu-item"
                      style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
                    >
                      Ask AI Admission Assistant
                    </button>
                    <button 
                      onClick={() => { setActiveTab('compare'); setActiveMegamenu(null); }}
                      className="uits-megamenu-item"
                      style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
                    >
                      Side-by-Side Comparison Matrix
                    </button>
                    <button 
                      onClick={() => { setActiveTab('explore', 'wizard'); setActiveMegamenu(null); }}
                      className="uits-megamenu-item"
                      style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
                    >
                      Eligibility Matching Wizard
                    </button>
                  </div>
                )}
              </li>

              {/* Direct Tab: Ask AI */}
              <li>
                <button 
                  className={`uits-nav-btn ${activeTab === 'ask-ai' ? 'active' : ''}`}
                  onClick={() => setActiveTab('ask-ai')}
                >
                  <MessageSquare size={15} />
                  <span>Ask AI</span>
                </button>
              </li>

              {/* Direct Tab: Compare */}
              <li>
                <button 
                  className={`uits-nav-btn ${activeTab === 'compare' ? 'active' : ''}`}
                  onClick={() => setActiveTab('compare')}
                >
                  <Columns size={15} />
                  <span>Compare</span>
                  {compareCount > 0 && (
                    <span className="nav-tab-counter">
                      {compareCount}
                    </span>
                  )}
                </button>
              </li>

              {/* Direct Tab: Notices */}
              <li>
                <button 
                  className={`uits-nav-btn ${activeTab === 'notices' ? 'active' : ''}`}
                  onClick={() => setActiveTab('notices')}
                >
                  <Calendar size={15} />
                  <span>Notices</span>
                </button>
              </li>

              {/* Direct Tab: Shortlist */}
              <li>
                <button 
                  className={`uits-nav-btn ${activeTab === 'shortlist' ? 'active' : ''}`}
                  onClick={() => setActiveTab('shortlist')}
                >
                  <Bookmark size={15} />
                  <span>Shortlist</span>
                  {shortlistCount > 0 && (
                    <span className="nav-tab-counter light">
                      {shortlistCount}
                    </span>
                  )}
                </button>
              </li>

            </ul>
          </div>

          {/* Right Actions: Apply / Check Eligibility Pill, Search Pill, Bell */}
          <div className="uits-header-actions">
            
            {/* Check Eligibility Pill Button (Maroon #921E33) */}
            <button 
              className="uits-apply-btn"
              onClick={onOpenCalculator}
              title="Instant GPA & Eligibility Calculator"
            >
              <Calculator size={15} />
              <span>Check Eligibility</span>
            </button>

            {/* Rounded Search Pill (Triggers Command Palette Cmd+K) */}
            <div 
              className="uits-search-pill"
              onClick={onOpenCommandPalette}
              title="Search universities, programs, circulars (Cmd+K)"
            >
              <Search size={15} color="#64748B" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="uits-search-input"
                readOnly
              />
              <kbd style={{ fontSize: '10px', background: '#E2E8F0', padding: '1px 5px', borderRadius: '4px', color: '#64748B', fontWeight: 700 }}>⌘K</kbd>
            </div>

            {/* Admission Notification Bell */}
            <div style={{ position: 'relative' }}>
              <button 
                className="icon-btn-round" 
                title="Admission Alerts & Circulars"
                onClick={() => setShowNotifications(!showNotifications)}
                style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#F8FAFC', border: '1.5px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <Bell size={17} color="#002147" />
                <span className="notif-badge-dot" style={{ position: 'absolute', top: '6px', right: '6px', width: '8px', height: '8px', borderRadius: '50%', background: '#921E33' }} />
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div 
                  className="notifications-dropdown-menu animate-scale-up"
                  style={{
                    position: 'absolute',
                    top: '48px',
                    right: 0,
                    width: '340px',
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    boxShadow: '0 20px 35px rgba(0, 33, 71, 0.18), 0 0 0 1px #E2E8F0',
                    padding: '16px',
                    zIndex: 9999,
                    borderTop: '3px solid #921E33'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Bell size={16} color="#921E33" />
                      <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#002147' }}>
                        Active Circulars ({noticesData.length})
                      </span>
                    </div>
                    <button 
                      onClick={() => {
                        setShowNotifications(false);
                        setActiveTab('notices');
                      }}
                      style={{ background: 'none', border: 'none', color: '#921E33', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      View All
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {noticesData.slice(0, 3).map(notice => (
                      <div 
                        key={notice.id}
                        onClick={() => {
                          setShowNotifications(false);
                          onOpenNotice(notice.id);
                        }}
                        style={{
                          padding: '10px 12px',
                          borderRadius: '8px',
                          background: '#F8FAFC',
                          cursor: 'pointer',
                          border: '1px solid #E2E8F0',
                          transition: 'background 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 700, fontSize: '0.8rem', color: '#002147' }}>
                            {notice.universityCode}
                          </span>
                          <span style={{
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            padding: '2px 6px',
                            borderRadius: '4px',
                            background: notice.status === 'closing-soon' ? '#FEF2F2' : '#EFF6FF',
                            color: notice.status === 'closing-soon' ? '#DC2626' : '#2563EB'
                          }}>
                            {notice.statusLabel}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#334155', lineHeight: 1.3 }}>
                          {notice.title}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '4px' }}>
                          Deadline: {notice.deadline}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Button (Right of Notification Button) */}
            <button
              className={`icon-btn-round ${activeTab === 'profile' ? 'active' : ''}`}
              title="Student Profile & Preferences"
              onClick={() => {
                setActiveTab('profile');
                setShowNotifications(false);
              }}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: activeTab === 'profile' ? 'linear-gradient(135deg, #002147 0%, #921E33 100%)' : '#F8FAFC',
                border: activeTab === 'profile' ? '1.5px solid #921E33' : '1.5px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                color: activeTab === 'profile' ? '#FFFFFF' : '#002147',
                boxShadow: activeTab === 'profile' ? '0 2px 8px rgba(146, 30, 51, 0.25)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== 'profile') {
                  e.currentTarget.style.borderColor = '#921E33';
                  e.currentTarget.style.color = '#921E33';
                  e.currentTarget.style.backgroundColor = '#FFF5F6';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== 'profile') {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.color = '#002147';
                  e.currentTarget.style.backgroundColor = '#F8FAFC';
                }
              }}
            >
              <User size={18} />
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              className="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-drawer-menu animate-slide-down">
            <button 
              className={`mobile-nav-item ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
            >
              <Home size={18} />
              <span>Home Overview</span>
            </button>

            <button 
              className={`mobile-nav-item ${activeTab === 'explore' ? 'active' : ''}`}
              onClick={() => { setActiveTab('explore'); setMobileMenuOpen(false); }}
            >
              <Compass size={18} />
              <span>Explore Universities</span>
            </button>

            <button 
              className={`mobile-nav-item ${activeTab === 'ask-ai' ? 'active' : ''}`}
              onClick={() => { setActiveTab('ask-ai'); setMobileMenuOpen(false); }}
            >
              <MessageSquare size={18} />
              <span>Ask AI Assistant</span>
            </button>

            <button 
              className={`mobile-nav-item ${activeTab === 'compare' ? 'active' : ''}`}
              onClick={() => { setActiveTab('compare'); setMobileMenuOpen(false); }}
            >
              <Columns size={18} />
              <span>Compare Universities ({compareCount})</span>
            </button>

            <button 
              className={`mobile-nav-item ${activeTab === 'notices' ? 'active' : ''}`}
              onClick={() => { setActiveTab('notices'); setMobileMenuOpen(false); }}
            >
              <Calendar size={18} />
              <span>Circulars &amp; Deadlines</span>
            </button>

            <button 
              className={`mobile-nav-item ${activeTab === 'shortlist' ? 'active' : ''}`}
              onClick={() => { setActiveTab('shortlist'); setMobileMenuOpen(false); }}
            >
              <Bookmark size={18} />
              <span>Shortlist ({shortlistCount})</span>
            </button>

            <button 
              className={`mobile-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => { setActiveTab('profile'); setMobileMenuOpen(false); }}
            >
              <User size={18} />
              <span>Student Profile &amp; Preferences</span>
            </button>

            <button 
              className="mobile-nav-item"
              onClick={() => { onOpenCalculator(); setMobileMenuOpen(false); }}
              style={{ color: '#921E33', fontWeight: 700 }}
            >
              <Calculator size={18} />
              <span>Check Eligibility &amp; Calculate GPA</span>
            </button>
          </div>
        )}
      </nav>

    </header>
  );
}
