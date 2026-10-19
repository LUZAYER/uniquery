import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Trophy, 
  Calendar, 
  Bookmark, 
  Columns, 
  ExternalLink, 
  Check, 
  Sparkles, 
  BookOpen, 
  Home as HomeIcon, 
  Activity, 
  FlaskConical, 
  Wifi, 
  HeartPulse, 
  Code, 
  Zap, 
  Settings, 
  DollarSign, 
  Award, 
  Building2, 
  MessageSquare 
} from 'lucide-react';
import { universitiesData } from '../data/universities';

export default function UniversityDetailsView({ 
  uniId, 
  onBack, 
  shortlist, 
  onToggleShortlist, 
  compareList, 
  onToggleCompare, 
  onAskAboutUni 
}) {
  const uni = universitiesData.find(u => u.id === uniId) || universitiesData[0];
  const [activeTab, setActiveTab] = useState('Overview');

  const isShortlisted = shortlist.includes(uni.id);
  const isCompared = compareList.includes(uni.id);

  const getFacilityIcon = (iconName) => {
    switch(iconName) {
      case 'book': return <BookOpen size={18} />;
      case 'home': return <HomeIcon size={18} />;
      case 'activity': return <Activity size={18} />;
      case 'flask': return <FlaskConical size={18} />;
      case 'wifi': return <Wifi size={18} />;
      case 'heart-pulse': return <HeartPulse size={18} />;
      default: return <Building2 size={18} />;
    }
  };

  const getProgramIcon = (iconName) => {
    switch(iconName) {
      case 'code': return <Code size={18} />;
      case 'zap': return <Zap size={18} />;
      case 'settings': return <Settings size={18} />;
      default: return <Code size={18} />;
    }
  };

  return (
    <div className="university-details-view-container">
      {/* Breadcrumb Navigation */}
      <div className="breadcrumbs-row">
        <span className="breadcrumb-link" onClick={onBack}>Explore</span>
        <span>&gt;</span>
        <span style={{ color: '#0F172A', fontWeight: 700 }}>{uni.code}</span>
      </div>

      {/* University Hero Header */}
      <div className="uni-profile-hero">
        <div className="uni-hero-top-row">
          <div style={{ display: 'flex', gap: '20px' }}>
            <div 
              className="uni-badge-square" 
              style={{ 
                backgroundColor: uni.badgeBg || 'var(--color-primary)', 
                color: uni.badgeColor || '#FFFFFF',
                width: '64px',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                borderRadius: '16px'
              }}
            >
              {uni.code}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                <span className="badge-ranking-pill" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
                  {uni.category}
                </span>
                <span className="badge-pill-status active">{uni.deadlineBadge || uni.eligibilityStatus}</span>
              </div>
              <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                {uni.name}
              </h1>
              <div className="uni-profile-meta-row">
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={15} color="#64748B" />
                  <span>{uni.locationDisplay || `${uni.location}, Bangladesh`}</span>
                </span>
                {uni.rankingDetail && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Trophy size={15} color="#64748B" />
                    <span>{uni.rankingDetail}</span>
                  </span>
                )}
                {uni.founded && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={15} color="#64748B" />
                    <span>Founded {uni.founded}</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              className="btn-secondary"
              style={isShortlisted ? { borderColor: 'var(--color-primary)', color: 'var(--color-primary)', background: 'var(--color-primary-light)' } : {}}
              onClick={() => onToggleShortlist(uni.id)}
            >
              <Bookmark size={16} fill={isShortlisted ? 'var(--color-primary)' : 'none'} />
              <span>{isShortlisted ? 'Shortlisted' : 'Add to Shortlist'}</span>
            </button>

            <button 
              className="btn-primary"
              style={isCompared ? { background: 'var(--color-secondary)' } : {}}
              onClick={() => onToggleCompare(uni.id)}
            >
              <Columns size={16} />
              <span>{isCompared ? 'In Comparison' : 'Compare'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* University Sub-tabs Navigation */}
      <div className="uni-tabs-bar">
        {['Overview', 'Programs', 'Eligibility', 'Tuition & Fees', 'Scholarships', 'Facilities', 'Admission Schedule'].map((tab) => (
          <button 
            key={tab} 
            className={`uni-tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Profile Body 2-Column Grid */}
      <div className="profile-body-layout">
        {/* Left Main Content Column */}
        <div className="profile-main-col">
          {/* Section 1: About BUET */}
          <div className="section-box-card">
            <h2 className="section-box-title">About {uni.code}</h2>
            <p style={{ color: '#334155', lineHeight: 1.65, fontSize: '0.95rem' }}>
              {uni.about}
            </p>

            {uni.stats && (
              <div className="stats-4col-grid">
                <div className="stat-metric-card">
                  <span className="metric-number">{uni.stats.students}</span>
                  <span className="metric-label">Students</span>
                </div>
                <div className="stat-metric-card">
                  <span className="metric-number">{uni.stats.departments}</span>
                  <span className="metric-label">Departments</span>
                </div>
                <div className="stat-metric-card">
                  <span className="metric-number">{uni.stats.faculty}</span>
                  <span className="metric-label">Faculty</span>
                </div>
                <div className="stat-metric-card">
                  <span className="metric-number">{uni.stats.labs}</span>
                  <span className="metric-label">Research labs</span>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Programs */}
          <div className="section-box-card">
            <div style={{ display: 'flex', alignItems: 'center', justifySelf: 'stretch', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div>
                <h2 className="section-box-title" style={{ marginBottom: '2px' }}>Programs</h2>
                <p style={{ fontSize: '0.85rem', color: '#64748B' }}>Popular undergraduate options for your profile</p>
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 700 }}>
                {uni.programs?.length || 0} undergraduate offerings
              </span>
            </div>

            <div className="programs-cards-stack">
              {(uni.programs || []).map((prog, idx) => (
                <div key={prog.id} className={`program-stack-item ${idx === 0 ? 'selected' : ''}`}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: idx === 0 ? 'var(--color-primary)' : 'white',
                      color: idx === 0 ? 'white' : 'var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {getProgramIcon(prog.icon)}
                    </div>
                    <div>
                      <div className="prog-item-title">{prog.name}</div>
                      <div className="prog-item-degree">{prog.degree} · {prog.duration}</div>
                    </div>
                  </div>
                  {prog.seats ? (
                    <span className="prog-seats-pill">{prog.seats}</span>
                  ) : (
                    <span className="prog-seats-pill" style={{ background: '#F1F5F9', color: '#64748B' }}>Per circular</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Tuition & Fees / Scholarships */}
          <div className="fees-scholarship-grid">
            <div className="section-box-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <DollarSign size={20} color="var(--color-primary)" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>Tuition & Fees</h3>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #E2E8F0', fontSize: '0.875rem' }}>
                <span style={{ color: '#64748B' }}>Application fee</span>
                <strong style={{ color: '#0F172A' }}>{uni.applicationFee || 'Check official circular'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #E2E8F0', fontSize: '0.875rem' }}>
                <span style={{ color: '#64748B' }}>Tuition / semester</span>
                <strong style={{ color: '#0F172A' }}>{uni.tuitionPerSemester || (uni.type === 'Public' ? 'Government subsidized' : 'Per credit hour')}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontSize: '1rem' }}>
                <span style={{ color: '#64748B', fontWeight: 600 }}>Estimated total cost</span>
                <strong style={{ color: 'var(--color-primary)', fontWeight: 800 }}>{uni.tuitionRange || uni.tuitionEst || 'Refer to official fee circular'}</strong>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '6px' }}>
                Session fees and waivers are not hardcoded until officially announced by the authority.
              </div>
            </div>

            <div className="section-box-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Award size={20} color="#10B981" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>Scholarships & Waivers</h3>
              </div>
              {uni.scholarshipItems && uni.scholarshipItems.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                  {uni.scholarshipItems.map((s, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
                      <Check size={16} color="#10B981" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '16px', lineHeight: 1.6 }}>
                  Scholarship criteria and tuition fee waiver policies are session-specific. Please verify with the current official admission notice.
                </div>
              )}
              <span className="badge-pill-status active" style={{ display: 'inline-block' }}>
                {uni.scholarshipNote || uni.deadlineBadge || 'Official circular'}
              </span>
            </div>
          </div>

          {/* Section 4: Campus Facilities */}
          <div className="section-box-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 className="section-box-title" style={{ marginBottom: 0 }}>Campus & Academic Profile</h2>
              <a 
                href={uni.officialWebsite} 
                target="_blank" 
                rel="noreferrer" 
                style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 700, textDecoration: 'none' }}
              >
                Official Website →
              </a>
            </div>

            {uni.facilities && uni.facilities.length > 0 ? (
              <div className="facilities-6col-grid">
                {uni.facilities.map((fac, i) => (
                  <div key={i} className="facility-card-item">
                    <div className="facility-icon-wrap">
                      {getFacilityIcon(fac.icon)}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0F172A' }}>{fac.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{fac.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ marginTop: '16px', padding: '16px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '0.9rem', color: '#475569' }}>
                <p style={{ margin: 0, lineHeight: 1.6 }}>
                  Institution details: <strong>{uni.name}</strong> ({uni.type}). 
                  Instruction language: <strong>{uni.instructionLanguage}</strong>. 
                  Academic calendar: <strong>{uni.academicCalendar}</strong>.
                </p>
                <p style={{ margin: '8px 0 0 0', fontSize: '0.825rem', color: '#64748B' }}>
                  Refer to the official portal for library facilities, residential halls, laboratories, and specialized campus infrastructure.
                </p>
              </div>
            )}
          </div>

          {/* Section 5: Admission Schedule */}
          <div className="section-box-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h2 className="section-box-title" style={{ marginBottom: 0 }}>Admission Schedule</h2>
              <span className="badge-pill-status active" style={{ background: '#FEF3C7', color: '#92400E', border: '1px solid #FCD34D' }}>
                {uni.deadlineBadge || 'Verify official circular'}
              </span>
            </div>

            {uni.schedule && uni.schedule.length > 0 ? (
              <div className="timeline-horizontal">
                {uni.schedule.map((step, idx) => (
                  <div key={idx} className="timeline-step-point">
                    <div className={`timeline-dot ${step.status}`}>
                      {step.status === 'completed' ? <Check size={14} /> : null}
                    </div>
                    <span className="timeline-step-date">{step.date}</span>
                    <span className="timeline-step-label">{step.label}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0', color: '#475569', fontSize: '0.875rem' }}>
                <p style={{ margin: 0, fontWeight: 600, color: '#0F172A' }}>
                  {uni.admissionSession || 'Admission session schedule must be confirmed from the official portal.'}
                </p>
                <p style={{ margin: '6px 0 0 0', fontSize: '0.825rem', color: '#64748B' }}>
                  Official dates, application deadlines, and exam schedules are published by the admission committee in the gazetted circular.
                </p>
              </div>
            )}
          </div>

          {/* Sticky Bottom Bar */}
          <div className="sticky-details-bottom-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="badge-pill-status active" style={{ background: '#FEF3C7', color: '#92400E', border: '1px solid #FCD34D' }}>
                {uni.deadlineBadge || 'Verify official circular'}
              </span>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0F172A' }}>
                Deadline: {uni.deadline || uni.deadlineFormatted || 'Check official notice'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button 
                className="btn-secondary"
                style={isShortlisted ? { borderColor: 'var(--color-primary)', color: 'var(--color-primary)', background: 'var(--color-primary-light)' } : {}}
                onClick={() => onToggleShortlist(uni.id)}
              >
                <Bookmark size={16} fill={isShortlisted ? 'var(--color-primary)' : 'none'} />
                <span>{isShortlisted ? 'Shortlisted' : 'Add to Shortlist'}</span>
              </button>

              <button 
                className="btn-secondary"
                onClick={() => onToggleCompare(uni.id)}
              >
                <Columns size={16} />
                <span>Compare</span>
              </button>

              <a 
                href={uni.portalUrl || uni.officialWebsite} 
                target="_blank" 
                rel="noreferrer" 
                className="btn-primary"
              >
                <span>View Official Application Portal</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Your Eligibility Card */}
          <div className="eligibility-check-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A' }}>Admission Eligibility</h3>
              <span className="badge-pill-status active" style={{ background: '#FEF3C7', color: '#92400E', border: '1px solid #FCD34D' }}>
                Circular Required
              </span>
            </div>

            {uni.eligibilityCriteria ? (
              <>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${uni.matchPercentage || 100}%` }} />
                </div>

                <div className="eligibility-criteria-list">
                  <div className="criterion-item-row">
                    <span className="criterion-name">
                      <Check size={16} color="#10B981" />
                      <span>SSC GPA</span>
                    </span>
                    <span className="criterion-val">
                      {uni.eligibilityCriteria.sscGpaMin ? `${uni.eligibilityCriteria.sscGpaMin.toFixed(2)} min` : 'Per circular'}
                    </span>
                  </div>

                  <div className="criterion-item-row">
                    <span className="criterion-name">
                      <Check size={16} color="#10B981" />
                      <span>HSC GPA</span>
                    </span>
                    <span className="criterion-val">
                      {uni.eligibilityCriteria.hscGpaMin ? `${uni.eligibilityCriteria.hscGpaMin.toFixed(2)} min` : 'Per circular'}
                    </span>
                  </div>

                  <div className="criterion-item-row">
                    <span className="criterion-name">
                      <Check size={16} color="#10B981" />
                      <span>Academic group</span>
                    </span>
                    <span className="criterion-val">{uni.eligibilityCriteria.group || 'Science / Relevant'}</span>
                  </div>

                  <div className="criterion-item-row">
                    <span className="criterion-name">
                      <Check size={16} color="#10B981" />
                      <span>Subject criteria</span>
                    </span>
                    <span className="criterion-val" style={{ fontSize: '0.75rem' }}>{uni.eligibilityCriteria.subjects || 'Check circular'}</span>
                  </div>
                </div>

                <p style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: 1.5 }}>
                  {uni.eligibilityCriteria.notes}
                </p>
              </>
            ) : (
              <div style={{ marginTop: '14px' }}>
                <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0', marginBottom: '12px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>
                    {uni.eligibilityStatus || 'Requires applicant details and current circular'}
                  </div>
                  <p style={{ fontSize: '0.78rem', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                    Session-specific eligibility thresholds, eligible passing years, minimum subject grades, and quota policies are published in the official admission circular.
                  </p>
                </div>
                <a 
                  href={uni.portalUrl || uni.officialWebsite}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
                >
                  <span>Check criteria on official portal</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            )}
          </div>

          {/* Quick Facts Card */}
          <div className="sidebar-card-white">
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>Quick Facts</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.85rem' }}>
              <div>
                <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>University type</span>
                <strong style={{ color: '#0F172A' }}>{uni.type} ({uni.category})</strong>
              </div>
              <div>
                <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>Academic calendar</span>
                <strong style={{ color: '#0F172A' }}>{uni.academicCalendar}</strong>
              </div>
              <div>
                <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>Language of instruction</span>
                <strong style={{ color: '#0F172A' }}>{uni.instructionLanguage}</strong>
              </div>
              {uni.founded && (
                <div>
                  <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>Founded</span>
                  <strong style={{ color: '#0F172A' }}>{uni.founded}</strong>
                </div>
              )}
              <div>
                <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>Official website</span>
                <a 
                  href={uni.officialWebsite} 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{ color: 'var(--color-primary)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  <span>{uni.officialWebsite ? uni.officialWebsite.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'Official Website'}</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>

          {/* Have a question? Card */}
          <div style={{
            background: 'var(--color-primary-light)',
            border: '1px solid var(--color-primary-subtle)',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)', marginBottom: '8px' }}>
              <Sparkles size={18} />
              <strong style={{ fontSize: '0.95rem' }}>Have a question?</strong>
            </div>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-body)', marginBottom: '16px', lineHeight: 1.5 }}>
              Ask UniQuery about {uni.code} admission, fees or eligibility.
            </p>
            <button 
              className="btn-primary" 
              style={{ width: '100%' }}
              onClick={() => onAskAboutUni(uni.code)}
            >
              <MessageSquare size={16} />
              <span>Ask about {uni.code}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
