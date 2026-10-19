import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Building2, 
  Calendar, 
  MessageSquare, 
  Compass, 
  Bookmark, 
  Sliders, 
  X, 
  ArrowRight,
  ExternalLink,
  Sparkles,
  Layers,
  GraduationCap
} from 'lucide-react';
import { universitiesData } from '../data/universities';
import { noticesData } from '../data/notices';

export default function CommandPalette({
  isOpen,
  onClose,
  onNavigate,
  onSelectUniversity,
  onOpenNotice,
  onAskAboutUni
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSearchTerm('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(false); // toggle handled by parent
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter options
  const term = searchTerm.toLowerCase().trim();

  // Navigation pages
  const pages = [
    { id: 'p-home', title: 'Home Overview', subtitle: 'Hero, live preview & value pillars', tab: 'home', icon: Compass },
    { id: 'p-ai', title: 'Ask AI Admission Assistant', subtitle: 'Get verified admission answers with official sources', tab: 'ask-ai', icon: MessageSquare },
    { id: 'p-explore', title: 'Explore & Match Universities', subtitle: 'Browse 50+ Bangladesh universities by eligibility', tab: 'explore', subView: 'results', icon: Compass },
    { id: 'p-wizard', title: 'Eligibility Matching Wizard', subtitle: 'Recalculate GPA match scores and preferences', tab: 'explore', subView: 'wizard', icon: Sliders },
    { id: 'p-compare', title: 'Compare Universities', subtitle: 'Side-by-side comparison matrix', tab: 'compare', icon: Layers },
    { id: 'p-notices', title: 'Admission Notices & Deadlines', subtitle: 'Official 2026 circulars and calendar dates', tab: 'notices', icon: Calendar },
    { id: 'p-shortlist', title: 'My Shortlist', subtitle: 'View saved universities and deadlines', tab: 'shortlist', icon: Bookmark },
    { id: 'p-profile', title: 'Student Profile & Settings', subtitle: 'Arafat Rahman (GPA 5.00 / 4.83)', tab: 'profile', icon: GraduationCap },
  ].filter(p => !term || p.title.toLowerCase().includes(term) || p.subtitle.toLowerCase().includes(term));

  // Universities
  const unis = universitiesData.filter(u => 
    !term || 
    u.name.toLowerCase().includes(term) || 
    u.code.toLowerCase().includes(term) || 
    u.location.toLowerCase().includes(term) ||
    u.preferredProgram?.toLowerCase().includes(term)
  ).slice(0, 5);

  // Notices
  const notices = noticesData.filter(n =>
    !term ||
    n.universityName.toLowerCase().includes(term) ||
    n.title.toLowerCase().includes(term) ||
    n.summary.toLowerCase().includes(term)
  ).slice(0, 4);

  // Grouped results array for keyboard navigation
  const allResults = [
    ...unis.map(u => ({ type: 'uni', data: u })),
    ...pages.map(p => ({ type: 'page', data: p })),
    ...notices.map(n => ({ type: 'notice', data: n }))
  ];

  const handleSelect = (item) => {
    if (item.type === 'page') {
      onNavigate(item.data.tab, item.data.subView);
    } else if (item.type === 'uni') {
      onSelectUniversity(item.data.id);
    } else if (item.type === 'notice') {
      onOpenNotice(item.data.id);
    }
    onClose();
  };

  return (
    <div 
      className="command-palette-backdrop animate-fade-in"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(8px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '10vh 1.5rem 2rem 1.5rem'
      }}
    >
      <div 
        className="command-palette-modal animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '680px',
          background: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25), 0 0 0 1px rgba(15, 23, 42, 0.08)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '80vh'
        }}
      >
        {/* Search Input Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '18px 20px',
          borderBottom: '1px solid var(--border-light)',
          background: '#FAFAFA'
        }}>
          <Search size={22} color="var(--color-primary)" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search universities, programs, circulars, or navigate (e.g. BUET, CSE, notices)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: '1.05rem',
              fontWeight: 500,
              color: 'var(--text-main)'
            }}
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 4 }}
            >
              <X size={18} />
            </button>
          )}
          <span style={{
            fontSize: '0.75rem',
            padding: '3px 8px',
            background: '#E2E8F0',
            color: '#64748B',
            borderRadius: '6px',
            fontWeight: 700
          }}>
            ESC
          </span>
        </div>

        {/* Results Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px' }}>
          
          {/* Universities Section */}
          {unis.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', padding: '6px 10px', letterSpacing: '0.05em' }}>
                Universities & Campuses
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {unis.map(uni => (
                  <div
                    key={uni.id}
                    onClick={() => handleSelect({ type: 'uni', data: uni })}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-subtle)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        background: 'var(--color-primary-light)',
                        color: 'var(--color-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '0.8rem'
                      }}>
                        {uni.code}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.925rem', color: 'var(--text-main)' }}>
                          {uni.name}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          {uni.location} · {uni.type} · {uni.preferredProgram}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        background: '#DCFCE7',
                        color: '#15803D',
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: 700
                      }}>
                        {uni.matchScore}% Match
                      </span>
                      <ArrowRight size={16} color="#94A3B8" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Pages */}
          {pages.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', padding: '6px 10px', letterSpacing: '0.05em' }}>
                Quick Navigation
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {pages.map(page => {
                  const Icon = page.icon;
                  return (
                    <div
                      key={page.id}
                      onClick={() => handleSelect({ type: 'page', data: page })}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        transition: 'background 0.15s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-subtle)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: '8px',
                          background: '#F1F5F9',
                          color: '#475569',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Icon size={18} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                            {page.title}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                            {page.subtitle}
                          </div>
                        </div>
                      </div>
                      <ArrowRight size={16} color="#94A3B8" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Official Notices */}
          {notices.length > 0 && (
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', padding: '6px 10px', letterSpacing: '0.05em' }}>
                Admission Notices & Circulars
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {notices.map(notice => (
                  <div
                    key={notice.id}
                    onClick={() => handleSelect({ type: 'notice', data: notice })}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-subtle)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '8px',
                        background: '#FEF3C7',
                        color: '#B45309',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Calendar size={18} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-main)' }}>
                          {notice.universityName} — {notice.title}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          Deadline: {notice.deadline} · {notice.statusLabel}
                        </div>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                      View Circular
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {unis.length === 0 && pages.length === 0 && notices.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94A3B8' }}>
              <Building2 size={36} style={{ margin: '0 auto 12px auto', opacity: 0.5 }} />
              <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)' }}>
                No results found for "{searchTerm}"
              </div>
              <div style={{ fontSize: '0.85rem', marginTop: 4 }}>
                Try searching for "BUET", "Dhaka", "CSE", "Deadlines", or "Shortlist"
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div style={{
          padding: '10px 20px',
          background: '#F8FAFC',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.75rem',
          color: '#64748B'
        }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span><kbd style={{ background: '#E2E8F0', padding: '2px 5px', borderRadius: '4px' }}>↵</kbd> to select</span>
            <span><kbd style={{ background: '#E2E8F0', padding: '2px 5px', borderRadius: '4px' }}>ESC</kbd> to close</span>
          </div>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-primary)', fontWeight: 600 }}>
            <Sparkles size={13} />
            UniQuery Instant Search
          </span>
        </div>
      </div>
    </div>
  );
}
