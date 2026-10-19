import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  MessageSquare, 
  Compass, 
  CheckCircle2, 
  RefreshCw, 
  ArrowRight, 
  ArrowUp, 
  Columns, 
  Calendar, 
  BookOpen, 
  Building2, 
  Clock, 
  ChevronRight, 
  Calculator, 
  Search, 
  GraduationCap, 
  Phone, 
  Award, 
  ShieldCheck, 
  ExternalLink, 
  X, 
  Users, 
  FlaskConical, 
  Check,
  HelpCircle,
  FileText,
  TrendingUp,
  MapPin,
  Filter,
  CheckCircle,
  Lock,
  Zap,
  Globe
} from 'lucide-react';
import { noticesData } from '../data/notices';
import { universitiesData } from '../data/universities';

export default function HomeView({ 
  onNavigate, 
  onSelectUniversity, 
  onOpenNotice,
  onSendAiMessage,
  onOpenQuickModal,
  onOpenCalculator
}) {
  // Top Notice Alert
  const [showNoticeAlert, setShowNoticeAlert] = useState(true);

  // Hero Quick Match interactive state
  const [heroGroup, setHeroGroup] = useState('Science');
  const [heroSscGpa, setHeroSscGpa] = useState(5.00);
  const [heroHscGpa, setHeroHscGpa] = useState(4.85);

  // Hero search input
  const [heroSearchInput, setHeroSearchInput] = useState('');

  // Live Interactive Ask AI Sandbox state
  const [liveQuery, setLiveQuery] = useState('');
  const [previewChat, setPreviewChat] = useState([
    {
      sender: 'user',
      text: 'Which universities offer CSE for Science students in Bangladesh?'
    },
    {
      sender: 'assistant',
      text: 'BUET, University of Dhaka (Science Unit A), RU, and CKRUET engineering cluster (CUET, KUET, RUET) offer leading Computer Science & Engineering programs for Science students. BUET requires GPA 4.00 in SSC & HSC with 15.0 combined points in Math, Physics & Chem.',
      tags: ['BUET', 'DU', 'KUET', 'RU'],
      source: 'Verified with official 2026/2027 admission circulars · UGC Bangladesh'
    }
  ]);
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Calculate live matching universities in the Hero Quick Match Widget
  const heroMatchCount = useMemo(() => {
    return universitiesData.filter(uni => {
      const minSsc = uni.eligibilityCriteria?.sscGpaMin || 3.5;
      const minHsc = uni.eligibilityCriteria?.hscGpaMin || 3.5;
      return heroSscGpa >= minSsc && heroHscGpa >= minHsc;
    }).length;
  }, [heroSscGpa, heroHscGpa, heroGroup]);

  // Handle hero search submission
  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (heroSearchInput.trim()) {
      onNavigate('explore');
    } else {
      onNavigate('explore');
    }
  };

  // Handle live AI query inside sandbox
  const handleLiveSubmit = (e) => {
    e.preventDefault();
    if (!liveQuery.trim() || isAiThinking) return;

    const userText = liveQuery.trim();
    setLiveQuery('');
    setPreviewChat(prev => [...prev, { sender: 'user', text: userText }]);
    setIsAiThinking(true);

    setTimeout(() => {
      let botResponse = {
        sender: 'assistant',
        text: `Based on verified 2026/2027 circulars, requirements vary by unit. For your query "${userText}", check the official unit gazette for subject weightings and quota rules.`,
        tags: ['DU', 'BUET'],
        source: 'UniQuery Admission Assistant · Official Gazetted Data'
      };

      const lower = userText.toLowerCase();
      if (lower.includes('buet')) {
        botResponse.text = 'BUET requires min GPA 4.00 in SSC & HSC, with total 15.0 grade points in Mathematics, Physics, and Chemistry. Preliminary screening MCQ exam precedes the 600-mark written test.';
        botResponse.tags = ['BUET'];
      } else if (lower.includes('du') || lower.includes('dhaka')) {
        botResponse.text = 'University of Dhaka (Science Unit A) requires combined GPA 8.00 (min 3.50 in each). Note: DU does not allow second-time examinees.';
        botResponse.tags = ['DU'];
      } else if (lower.includes('tuition') || lower.includes('fee')) {
        botResponse.text = 'Public universities like BUET and DU charge roughly ৳15,000–৳30,000 total for 4 years. Top private universities range from ৳8.5L–৳12.5L before merit waivers.';
        botResponse.tags = ['DU', 'NSU'];
      } else if (lower.includes('second') || lower.includes('2nd')) {
        botResponse.text = 'Second-timers are allowed in Rajshahi University (RU), Chittagong University (CU), Jahangirnagar University (JU), GST General Cluster, and all private universities.';
        botResponse.tags = ['RU', 'NSU'];
      } else if (lower.includes('ckruet') || lower.includes('kuet') || lower.includes('ruet') || lower.includes('cuet')) {
        botResponse.text = 'Combined CKRUET admission test covers CUET, KUET, and RUET with 3,291 seats. Requires minimum GPA 4.00 in SSC and HSC with high grade points in Science subjects.';
        botResponse.tags = ['KUET', 'BUET'];
      }

      setPreviewChat(prev => [...prev, botResponse]);
      setIsAiThinking(false);
    }, 700);
  };

  const popularQueries = [
    "What is the BUET CSE cutoff for 2026?",
    "Which public universities allow 2nd timers?",
    "DU Science Unit A admission test format",
    "Compare public vs private engineering tuition fees"
  ];

  // University clusters data
  const clusters = [
    {
      id: 'eng',
      title: 'Engineering & Technology',
      unis: 'BUET · CKRUET · BUTEX · MIST',
      seats: '5,500+ Seats',
      badge: 'Public Engineering',
      cutoff: 'Min GPA 4.00 - 5.00',
      accentColor: '#921E33',
      icon: <Building2 size={24} />
    },
    {
      id: 'general',
      title: 'Autonomous Public Universities',
      unis: 'DU · RU · CU · JU',
      seats: '14,000+ Seats',
      badge: 'Autonomous',
      cutoff: 'Min GPA 3.50 - 4.50',
      accentColor: '#002147',
      icon: <GraduationCap size={24} />
    },
    {
      id: 'gst',
      title: 'GST Cluster System',
      unis: '24 General, Science & Tech Universities',
      seats: '21,000+ Seats',
      badge: 'Single Combined Exam',
      cutoff: 'Min GPA 3.00 - 3.50',
      accentColor: '#E5A823',
      icon: <Compass size={24} />
    },
    {
      id: 'med',
      title: 'Medical & Armed Forces',
      unis: 'DMC · SSMC · AFMC · Army Medicals',
      seats: '5,380+ Seats',
      badge: 'National Central Exam',
      cutoff: 'Combined GPA 9.00 (Bio 4.0)',
      accentColor: '#059669',
      icon: <FlaskConical size={24} />
    },
    {
      id: 'business',
      title: 'Business & Multi-Discipline',
      unis: 'IBA · FBS (DU) · BUP · JU IBA',
      seats: '3,800+ Seats',
      badge: 'All Groups Eligible',
      cutoff: 'Min GPA 3.50 - 4.50',
      accentColor: '#7C3AED',
      icon: <Columns size={24} />
    },
    {
      id: 'private',
      title: 'Top-Tier UGC Private Universities',
      unis: 'NSU · BRACU · AIUB · IUB · AUST',
      seats: '25,000+ Seats',
      badge: 'Merit Waivers Up to 100%',
      cutoff: 'Min Combined GPA 6.00 - 7.00',
      accentColor: '#0284C7',
      icon: <Award size={24} />
    }
  ];

  return (
    <div className="home-view-container animate-fade-in">
      
      {/* 1. TOP NOTICE ALERT BANNER */}
      {showNoticeAlert && (
        <div 
          className="animate-slide-down"
          style={{
            background: 'linear-gradient(90deg, #921E33 0%, #002147 100%)',
            color: '#FFFFFF',
            padding: '10px clamp(1.5rem, 4vw, 3.5rem)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.85rem',
            borderBottom: '2px solid #E5A823',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ 
              background: '#E5A823', 
              color: '#002147', 
              padding: '2px 8px', 
              borderRadius: '20px', 
              fontWeight: 800, 
              fontSize: '0.75rem', 
              letterSpacing: '0.5px' 
            }}>
              LIVE INTAKE 2026/2027
            </span>
            <span>
              <strong>Active Admission Window:</strong> Official circulars from BUET, DU, CKRUET, and NSU are live with application deadlines.
            </span>
            <button 
              onClick={() => onNavigate('notices')}
              style={{
                background: '#FFFFFF',
                color: '#921E33',
                padding: '3px 12px',
                borderRadius: '50px',
                fontWeight: 700,
                fontSize: '0.78rem',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              View All Circulars ↗
            </button>
          </div>
          <button 
            onClick={() => setShowNoticeAlert(false)}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.8)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '2px'
            }}
            title="Dismiss notice"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* 2. FULL-BLEED HERO BANNER (Split 2-Column with Interactive Quick Match Finder) */}
      <section className="home-hero-wrap">
        <div className="home-hero-ambient-glow" />
        <div className="home-hero-ambient-glow-2" />
        
        <div className="home-section-container">
          <div className="hero-grid-split">
            
            {/* Left Column: Heading, Subhead, Search Capsule, Metrics */}
            <div>
              <div className="hero-live-pill">
                <span className="hero-live-dot" />
                <span>ADMISSION CYCLE 2026/2027 · 50+ BANGLADESH UNIVERSITIES</span>
              </div>

              <h1 className="hero-h1">
                Find Your Ideal University <br />
                with <span className="hero-h1-gold">UniQuery Intelligence</span>
              </h1>

              <p className="hero-lead-desc">
                Instant admission eligibility verification, cited answers directly from official 2026/2027 circular gazettes, and side-by-side program comparisons for Bangladesh students.
              </p>

              {/* Quick Search Capsule */}
              <form onSubmit={handleHeroSearch} className="hero-search-capsule">
                <Search size={18} color="#921E33" />
                <input 
                  type="text"
                  placeholder="Search university (BUET, DU), program (CSE, BBA), or city..."
                  value={heroSearchInput}
                  onChange={(e) => setHeroSearchInput(e.target.value)}
                  className="hero-search-input"
                />
                <button type="submit" className="hero-search-btn">
                  <span>Explore Now</span>
                  <ArrowRight size={15} />
                </button>
              </form>

              {/* Quick Keyword Chips */}
              <div className="hero-chips-wrap">
                <span style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.7)', fontWeight: 600 }}>Popular:</span>
                {['BUET Engineering', 'DU Science Unit A', 'CKRUET Cluster', '2nd Timers Allowed', 'Top Private CS'].map((tag, idx) => (
                  <button 
                    key={idx} 
                    className="hero-chip-pill"
                    onClick={() => {
                      setHeroSearchInput(tag);
                      onNavigate('explore');
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Proof Counters Deck */}
              <div className="hero-metrics-deck">
                <div className="hero-metric-item">
                  <span className="hero-metric-num">50+</span>
                  <span className="hero-metric-lbl">Indexed Universities</span>
                </div>
                <div style={{ width: '1px', height: '32px', background: 'rgba(255,255,255,0.15)' }} />
                <div className="hero-metric-item">
                  <span className="hero-metric-num">15,000+</span>
                  <span className="hero-metric-lbl">Cataloged Seats</span>
                </div>
                <div style={{ width: '1px', height: '32px', background: 'rgba(255,255,255,0.15)' }} />
                <div className="hero-metric-item">
                  <span className="hero-metric-num">100%</span>
                  <span className="hero-metric-lbl">UGC Gazetted Data</span>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Interactive Quick Eligibility Match Card */}
            <div>
              <div className="hero-match-card">
                
                <div className="hero-match-topbar">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#921E33', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Zap size={16} color="#FFFFFF" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#FFFFFF' }}>Instant Eligibility Snapshot</div>
                      <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)' }}>Live calculation based on your HSC GPA</div>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, padding: '3px 8px', borderRadius: '4px', background: '#E5A823', color: '#002147' }}>
                    2026 BATCH
                  </span>
                </div>

                {/* Group Selector */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.85)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                    Select Your HSC Academic Discipline:
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {['Science', 'Business Studies', 'Humanities'].map(g => (
                      <button 
                        key={g}
                        type="button"
                        className={`hero-match-group-btn ${heroGroup === g ? 'active' : ''}`}
                        onClick={() => setHeroGroup(g)}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* GPA Inputs Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                      SSC GPA (1.0 - 5.0)
                    </label>
                    <input 
                      type="number"
                      step="0.01"
                      min="1.0"
                      max="5.0"
                      value={heroSscGpa}
                      onChange={(e) => setHeroSscGpa(parseFloat(e.target.value) || 0)}
                      className="hero-gpa-input-box"
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                      HSC GPA (1.0 - 5.0)
                    </label>
                    <input 
                      type="number"
                      step="0.01"
                      min="1.0"
                      max="5.0"
                      value={heroHscGpa}
                      onChange={(e) => setHeroHscGpa(parseFloat(e.target.value) || 0)}
                      className="hero-gpa-input-box"
                    />
                  </div>
                </div>

                {/* Dynamic Qualification Result Preview */}
                <div className="hero-match-preview-box">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle size={22} color="#10B981" />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#FFFFFF' }}>
                        Eligible for {heroMatchCount} Universities
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#D1FAE5' }}>
                        Strong qualification threshold for {heroGroup}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#34D399' }}>
                      {Math.min(98, Math.round(((heroSscGpa + heroHscGpa) / 10) * 100))}%
                    </span>
                    <span style={{ display: 'block', fontSize: '0.68rem', color: 'rgba(255,255,255,0.7)' }}>Match Score</span>
                  </div>
                </div>

                {/* Top Eligible Badges */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.75)', fontWeight: 600, marginBottom: '8px' }}>
                    Top Matching Public &amp; Engineering Institutions:
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ background: '#921E33', color: '#FFFFFF', padding: '3px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>
                      BUET Preliminary
                    </span>
                    <span style={{ background: '#002147', color: '#FFFFFF', padding: '3px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>
                      DU Science Unit A
                    </span>
                    <span style={{ background: '#001733', color: '#E5A823', padding: '3px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>
                      CKRUET Cluster
                    </span>
                    <span style={{ background: 'rgba(255,255,255,0.15)', color: '#FFFFFF', padding: '3px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                      RU Science Unit
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    onClick={onOpenCalculator}
                    style={{
                      flex: 1,
                      background: '#921E33',
                      color: '#FFFFFF',
                      padding: '10px 14px',
                      borderRadius: '50px',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      boxShadow: '0 4px 14px rgba(146, 30, 51, 0.4)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Calculator size={15} />
                    <span>Calculate Full Criteria</span>
                  </button>

                  <button 
                    onClick={() => onNavigate('explore')}
                    style={{
                      background: 'rgba(255, 255, 255, 0.15)',
                      color: '#FFFFFF',
                      padding: '10px 18px',
                      borderRadius: '50px',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>View All</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. THE 4 PILLAR SERVICE DECK (Floating cleanly beneath Hero) */}
      <div className="home-section-container">
        <div className="home-services-deck">
          
          <div 
            className="home-service-card c-maroon"
            onClick={() => onNavigate('explore')}
          >
            <div>
              <div className="home-service-icon-wrap">
                <Building2 size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#002147', marginBottom: '8px' }}>
                University Directory
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.6, marginBottom: '16px' }}>
                Explore 50+ public autonomous, engineering cluster, and UGC-approved private universities in Bangladesh with verified metrics.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#921E33', fontWeight: 700, fontSize: '0.85rem' }}>
              <span>Browse 50+ Profiles</span>
              <ArrowRight size={15} />
            </div>
          </div>

          <div 
            className="home-service-card c-dark"
            onClick={() => onNavigate('ask-ai')}
          >
            <div>
              <div className="home-service-icon-wrap">
                <MessageSquare size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#002147', marginBottom: '8px' }}>
                Ask AI Assistant
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.6, marginBottom: '16px' }}>
                Get instant, cited answers to complex admission questions without reading 40-page circular PDFs. Grounded in official facts.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#002147', fontWeight: 700, fontSize: '0.85rem' }}>
              <span>Ask Admission AI</span>
              <ArrowRight size={15} />
            </div>
          </div>

          <div 
            className="home-service-card c-navy"
            onClick={() => onNavigate('explore', 'wizard')}
          >
            <div>
              <div className="home-service-icon-wrap">
                <Compass size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#002147', marginBottom: '8px' }}>
                Eligibility Engine
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.6, marginBottom: '16px' }}>
                Input your SSC &amp; HSC GPA, passing year, and group. Instantly see match percentages and programs where you qualify.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#002147', fontWeight: 700, fontSize: '0.85rem' }}>
              <span>Run Matching Engine</span>
              <ArrowRight size={15} />
            </div>
          </div>

          <div 
            className="home-service-card c-gold"
            onClick={() => onNavigate('compare')}
          >
            <div>
              <div className="home-service-icon-wrap">
                <Columns size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#002147', marginBottom: '8px' }}>
                Compare Matrix
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.6, marginBottom: '16px' }}>
                Place up to 4 universities side-by-side to evaluate minimum GPA thresholds, tuition estimates, seat quotas, and deadlines.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#B45309', fontWeight: 700, fontSize: '0.85rem' }}>
              <span>Compare Programs</span>
              <ArrowRight size={15} />
            </div>
          </div>

        </div>
      </div>

      {/* 4. EXPLORE BY CLUSTER (Visual Categories) */}
      <section style={{ padding: '20px 0 60px 0' }}>
        <div className="home-section-container">
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span style={{ color: '#921E33', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
                ADMISSION PATHWAYS
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#002147', marginTop: '4px' }}>
                Explore by University Cluster &amp; Discipline
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.925rem', margin: '4px 0 0 0', maxWidth: '680px' }}>
                Target your preparation with admission unit clusters, seat breakdowns, and passing year eligibility.
              </p>
            </div>

            <button 
              onClick={() => onNavigate('explore')}
              style={{
                background: 'none',
                border: '1.5px solid #921E33',
                color: '#921E33',
                padding: '8px 20px',
                borderRadius: '50px',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>View All 50+ Institutions</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="home-cluster-grid">
            {clusters.map((c) => (
              <div 
                key={c.id} 
                className="home-cluster-card"
                onClick={() => onNavigate('explore')}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: `${c.accentColor}15`, color: c.accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {c.icon}
                    </div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '3px 8px', borderRadius: '50px', background: '#F1F5F9', color: '#334155' }}>
                      {c.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#002147', marginBottom: '6px' }}>
                    {c.title}
                  </h3>
                  <div style={{ fontSize: '0.825rem', fontWeight: 600, color: '#921E33', marginBottom: '8px' }}>
                    {c.unis}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748B', marginBottom: '16px' }}>
                    Threshold: <strong>{c.cutoff}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #F1F5F9', fontSize: '0.8rem' }}>
                  <span style={{ color: '#002147', fontWeight: 700 }}>{c.seats}</span>
                  <span style={{ color: '#921E33', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
                    Explore Cluster →
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. FEATURED TOP UNIVERSITIES GRID */}
      <section style={{ padding: '60px 0', background: '#F8FAFC', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div className="home-section-container">
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span style={{ color: '#921E33', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
                FEATURED INSTITUTIONS
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#002147', marginTop: '4px' }}>
                Premier Universities in Bangladesh
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.925rem', margin: '4px 0 0 0', maxWidth: '680px' }}>
                Verified criteria, seat capacities, estimated tuition, and application countdowns.
              </p>
            </div>

            <button 
              onClick={() => onNavigate('explore')}
              style={{
                background: '#921E33',
                color: '#FFFFFF',
                padding: '9px 22px',
                borderRadius: '50px',
                fontWeight: 700,
                fontSize: '0.85rem',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 12px rgba(146, 30, 51, 0.25)'
              }}
            >
              <span>Explore All 50+ Profiles</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="home-uni-grid">
            {universitiesData.slice(0, 4).map((uni) => (
              <div 
                key={uni.id}
                className="home-uni-card"
                onClick={() => onSelectUniversity(uni.id)}
              >
                {/* Card Top Banner */}
                <div 
                  className="home-uni-card-header"
                  style={{ background: 'linear-gradient(135deg, #002147 0%, #921E33 100%)' }}
                >
                  <div>
                    <span style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800, color: '#FFFFFF', marginRight: '6px' }}>
                      {uni.type}
                    </span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#E5A823' }}>
                      {uni.rankingNational ? `#${uni.rankingNational} in Bangladesh` : (uni.category || uni.type)}
                    </span>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FFFFFF', margin: '8px 0 2px 0' }}>
                      {uni.code}
                    </h3>
                    <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={12} />
                      <span>{uni.locationDisplay || `${uni.location}, Bangladesh`}</span>
                    </div>
                  </div>

                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: '#FFFFFF',
                    color: '#921E33',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    fontSize: '1rem',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                  }}>
                    {uni.code.substring(0, 2)}
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#002147', marginBottom: '12px' }}>
                      {uni.name}
                    </h4>

                    {/* 4-Stat Grid */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '10px',
                      background: '#F8FAFC',
                      padding: '12px',
                      borderRadius: '10px',
                      border: '1px solid #E2E8F0',
                      marginBottom: '16px'
                    }}>
                      <div>
                        <span style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Available Seats</span>
                        <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#002147' }}>
                          {uni.seats ? `${uni.seats} seats` : 'Per Circular'}
                        </div>
                      </div>

                      <div>
                        <span style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Est. Tuition</span>
                        <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#002147' }}>
                          {uni.tuitionEst || uni.tuitionRange || 'Per Circular'}
                        </div>
                      </div>

                      <div>
                        <span style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Deadline</span>
                        <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#DC2626' }}>
                          {uni.deadline || uni.deadlineFormatted || 'Check Notice'}
                        </div>
                      </div>

                      <div>
                        <span style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Academic Term</span>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#002147' }}>
                          {uni.academicCalendar || 'Term system'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #F1F5F9' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#15803D', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={14} />
                      <span>{uni.deadlineBadge || 'Official circular'}</span>
                    </span>

                    <button 
                      style={{
                        background: '#921E33',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '50px',
                        padding: '6px 14px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <span>View Profile</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. INTERACTIVE AI ADMISSION ASSISTANT (Live Preview Sandbox) */}
      <section style={{ padding: '60px 0', background: '#FFFFFF' }}>
        <div className="home-section-container">
          
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span style={{ color: '#921E33', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
              INTELLIGENT ADMISSION ASSISTANT
            </span>
            <h2 style={{ fontSize: '2.1rem', fontWeight: 800, color: '#002147', marginTop: '6px' }}>
              Ask Any Admission Question in Natural Language
            </h2>
            <p style={{ color: '#64748B', maxWidth: '640px', margin: '8px auto 0 auto', fontSize: '0.95rem' }}>
              Get instant answers on admission criteria, GPA minimums, tuition fees, and second-timer rules across public and private universities.
            </p>
          </div>

          <div style={{
            maxWidth: '880px',
            margin: '0 auto',
            background: '#FFFFFF',
            borderRadius: '16px',
            border: '1.5px solid #E2E8F0',
            boxShadow: '0 12px 36px rgba(0, 33, 71, 0.08)',
            overflow: 'hidden'
          }}>
            {/* Bot Header */}
            <div style={{
              background: '#002147',
              color: '#FFFFFF',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: '#921E33',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF'
                }}>
                  <Sparkles size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>UniQuery Admission Assistant</div>
                  <div style={{ fontSize: '0.72rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
                    Online · Grounded in Official 2026 Circulars
                  </div>
                </div>
              </div>

              <button 
                onClick={() => onNavigate('ask-ai')}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: 'none',
                  color: '#FFFFFF',
                  padding: '5px 14px',
                  borderRadius: '50px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Open Full Screen ↗
              </button>
            </div>

            {/* Chat Stream */}
            <div style={{ padding: '24px', maxHeight: '320px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {previewChat.map((msg, idx) => (
                <div key={idx}>
                  {msg.sender === 'user' ? (
                    <div style={{
                      background: '#921E33',
                      color: '#FFFFFF',
                      padding: '10px 16px',
                      borderRadius: '16px 16px 4px 16px',
                      maxWidth: '80%',
                      marginLeft: 'auto',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      boxShadow: '0 2px 6px rgba(146, 30, 51, 0.2)'
                    }}>
                      {msg.text}
                    </div>
                  ) : (
                    <div style={{
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      padding: '14px 18px',
                      borderRadius: '16px 16px 16px 4px',
                      maxWidth: '88%',
                      fontSize: '0.9rem',
                      lineHeight: 1.6,
                      color: '#1E293B'
                    }}>
                      <div>{msg.text}</div>
                      
                      {msg.tags && (
                        <div style={{ display: 'flex', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
                          {msg.tags.map(tag => (
                            <button 
                              key={tag}
                              onClick={() => onSelectUniversity(tag.toLowerCase())}
                              style={{
                                background: '#FFFFFF',
                                border: '1px solid #CBD5E1',
                                borderRadius: '4px',
                                padding: '2px 8px',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                color: '#002147',
                                cursor: 'pointer'
                              }}
                            >
                              {tag} Details →
                            </button>
                          ))}
                        </div>
                      )}

                      {msg.source && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px', fontSize: '0.72rem', color: '#15803D', fontWeight: 600 }}>
                          <CheckCircle2 size={12} />
                          <span>{msg.source}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {isAiThinking && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: '#F8FAFC', borderRadius: '10px', width: 'fit-content' }}>
                  <div className="typing-dots">
                    <span /><span /><span />
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Searching verified circulars...</span>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleLiveSubmit} style={{ padding: '16px', background: '#F8FAFC', borderTop: '1px solid #E2E8F0', display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                placeholder="Ask about admission, GPA criteria, second timers, tuition fees..."
                value={liveQuery}
                onChange={(e) => setLiveQuery(e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  borderRadius: '50px',
                  border: '1.5px solid #CBD5E1',
                  outline: 'none',
                  fontSize: '0.875rem'
                }}
              />
              <button 
                type="submit"
                style={{
                  background: '#921E33',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '10px 22px',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>Ask</span>
                <ArrowUp size={16} />
              </button>
            </form>

            {/* Popular query chips */}
            <div style={{ padding: '12px 20px', background: '#FFFFFF', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B' }}>Popular:</span>
              {popularQueries.map((q, idx) => (
                <button 
                  key={idx}
                  onClick={() => onSendAiMessage(q)}
                  style={{
                    background: '#F1F5F9',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '3px 10px',
                    fontSize: '0.75rem',
                    color: '#002147',
                    fontWeight: 500,
                    cursor: 'pointer'
                  }}
                >
                  {q}
                </button>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* 7. UPCOMING ADMISSION NOTICES */}
      <section style={{ padding: '60px 0', background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
        <div className="home-section-container">
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span style={{ color: '#921E33', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
                CIRCULARS &amp; DEADLINES
              </span>
              <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#002147', marginTop: '4px' }}>
                Upcoming Admission Notices &amp; Deadlines
              </h2>
            </div>

            <button 
              onClick={() => onNavigate('notices')}
              style={{
                background: 'none',
                border: '1.5px solid #921E33',
                color: '#921E33',
                padding: '8px 20px',
                borderRadius: '50px',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>View All Circulars</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {noticesData.slice(0, 3).map((notice) => (
              <div 
                key={notice.id}
                onClick={() => onOpenNotice(notice.id)}
                style={{
                  background: '#FFFFFF',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: '14px',
                  padding: '24px',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = '#921E33';
                  e.currentTarget.style.boxShadow = '0 10px 24px rgba(146, 30, 51, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{
                    background: '#002147',
                    color: '#FFFFFF',
                    padding: '3px 10px',
                    borderRadius: '4px',
                    fontWeight: 800,
                    fontSize: '0.78rem'
                  }}>
                    {notice.universityCode}
                  </span>

                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: notice.status === 'closing-soon' ? '#FEF2F2' : '#EFF6FF',
                    color: notice.status === 'closing-soon' ? '#DC2626' : '#2563EB'
                  }}>
                    {notice.statusLabel}
                  </span>
                </div>

                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#002147', marginBottom: '8px' }}>
                  {notice.universityName}
                </h4>

                <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.5, marginBottom: '16px' }}>
                  {notice.summary}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #F1F5F9', fontSize: '0.8rem' }}>
                  <span style={{ color: '#002147', fontWeight: 600 }}>
                    Deadline: <strong>{notice.deadline}</strong>
                  </span>
                  <span style={{ color: '#921E33', fontWeight: 700 }}>
                    View Circular →
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. 4-PILLAR TRUST & ASSURANCE BANNER */}
      <section className="home-trust-wrap">
        <div className="home-section-container">
          <div className="home-trust-grid">
            
            <div className="home-trust-item">
              <div className="home-trust-icon-box">
                <FileText size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#002147', marginBottom: '4px' }}>
                  100% Gazetted Citations
                </h4>
                <p style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                  Every requirement links directly to published circulars and university gazettes.
                </p>
              </div>
            </div>

            <div className="home-trust-item">
              <div className="home-trust-icon-box">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#002147', marginBottom: '4px' }}>
                  UGC Compliant Scale
                </h4>
                <p style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                  Calculations follow verified Bangladesh grading scale and unit-specific multipliers.
                </p>
              </div>
            </div>

            <div className="home-trust-item">
              <div className="home-trust-icon-box">
                <Clock size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#002147', marginBottom: '4px' }}>
                  2nd Timer Transparency
                </h4>
                <p style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                  Explicit rules on 5% marks deductions and units that allow second-time examinees.
                </p>
              </div>
            </div>

            <div className="home-trust-item">
              <div className="home-trust-icon-box">
                <Lock size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#002147', marginBottom: '4px' }}>
                  Zero Registration Needed
                </h4>
                <p style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                  Calculate your eligibility and compare universities immediately without signing up.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. PRE-FOOTER CALL TO ACTION BANNER */}
      <div className="home-section-container">
        <div className="home-cta-banner">
          <div style={{ maxWidth: '640px' }}>
            <span style={{ 
              background: 'rgba(229, 168, 35, 0.25)', 
              color: '#FDF3D6', 
              padding: '4px 12px', 
              borderRadius: '50px', 
              fontSize: '0.78rem', 
              fontWeight: 800, 
              letterSpacing: '0.5px' 
            }}>
              START YOUR ADMISSION JOURNEY
            </span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.4rem)', fontWeight: 800, color: '#FFFFFF', margin: '12px 0 10px 0', lineHeight: 1.25 }}>
              Check Your Eligibility Across All 50+ Bangladesh Universities
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.88)', lineHeight: 1.6, margin: 0 }}>
              Input your SSC and HSC scores to find matching programs in under 60 seconds with verified cutoff scores and fee structures.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <button 
              onClick={onOpenCalculator}
              style={{
                background: '#E5A823',
                color: '#002147',
                padding: '14px 28px',
                borderRadius: '50px',
                fontWeight: 800,
                fontSize: '0.95rem',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
                transition: 'all 0.2s ease'
              }}
            >
              <Calculator size={18} />
              <span>Calculate Eligibility Now</span>
            </button>

            <button 
              onClick={() => onNavigate('ask-ai')}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                padding: '14px 24px',
                borderRadius: '50px',
                fontWeight: 700,
                fontSize: '0.95rem',
                border: '1.5px solid rgba(255, 255, 255, 0.35)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.2s ease'
              }}
            >
              <MessageSquare size={18} />
              <span>Ask AI Assistant</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
