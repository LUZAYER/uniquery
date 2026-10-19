import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Check, 
  ExternalLink, 
  Bookmark, 
  CheckCircle2, 
  Building2,
  Printer,
  Share2,
  Sliders,
  Sparkles,
  MessageSquare,
  HelpCircle
} from 'lucide-react';
import { universitiesData } from '../data/universities';

export default function CompareView({ 
  compareList = [], 
  shortlist = [],
  onToggleCompare,
  onToggleShortlist,
  onSelectUniversity,
  onAskAboutUni,
  onNavigate
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [highlightDiffs, setHighlightDiffs] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Universities currently selected for comparison
  const selectedUnis = compareList
    .map(id => universitiesData.find(u => u.id === id))
    .filter(Boolean);

  // Available universities to add to comparison
  const availableToAdd = universitiesData.filter(u => !compareList.includes(u.id));

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Helper to check if row values differ
  const valuesDiffer = (extractor) => {
    if (selectedUnis.length < 2) return false;
    const first = extractor(selectedUnis[0]);
    return selectedUnis.some(u => extractor(u) !== first);
  };

  return (
    <div className="compare-view-container animate-fade-in" style={{ padding: '2rem 0 5rem 0' }}>
      <div className="container">

        {/* Header */}
        <div className="page-header-block" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <span className="page-category-tag">SIDE-BY-SIDE MATRIX</span>
            <h1 className="page-main-title">Compare Universities</h1>
            <p className="page-main-desc">
              Compare up to four universities across the criteria that matter most to you. No biased winner — just total clarity.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {/* Highlight Diffs Toggle */}
            <button 
              onClick={() => setHighlightDiffs(!highlightDiffs)}
              className="btn-secondary"
              style={{
                fontSize: '0.85rem',
                padding: '8px 14px',
                borderColor: highlightDiffs ? 'var(--color-primary)' : 'var(--border-light)',
                backgroundColor: highlightDiffs ? 'var(--color-primary-light)' : 'white',
                color: highlightDiffs ? 'var(--color-primary)' : 'var(--text-main)',
                fontWeight: 600
              }}
            >
              <Sliders size={15} />
              <span>{highlightDiffs ? 'Differences Highlighted' : 'Highlight Differences'}</span>
            </button>

            {/* Print / Export */}
            <button 
              onClick={handlePrint}
              className="btn-secondary"
              style={{ fontSize: '0.85rem', padding: '8px 14px' }}
              title="Print or Save comparison as PDF"
            >
              <Printer size={15} />
              <span>Print / Export</span>
            </button>

            {/* Share */}
            <button 
              onClick={handleShare}
              className="btn-secondary"
              style={{ fontSize: '0.85rem', padding: '8px 14px' }}
              title="Copy shareable link"
            >
              <Share2 size={15} />
              <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>

            <span className="badge-ranking-pill" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)', fontSize: '0.85rem', padding: '6px 12px' }}>
              {selectedUnis.length} of 4 selected
            </span>
          </div>
        </div>

        {/* Top 4-Slots Grid */}
        <div className="comparison-slots-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '28px'
        }}>
          {selectedUnis.map((uni, idx) => {
            const isShortlisted = shortlist.includes(uni.id);

            return (
              <div 
                key={uni.id} 
                style={{
                  background: 'white',
                  borderRadius: 'var(--radius-xl)',
                  padding: '20px',
                  border: idx === 0 ? '2px solid var(--color-primary)' : '1px solid var(--border-light)',
                  boxShadow: 'var(--shadow-sm)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <button 
                  onClick={() => onToggleCompare(uni.id)}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: '#F1F5F9',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#64748B'
                  }}
                  title="Remove from comparison"
                >
                  <X size={14} />
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{
                    background: 'var(--color-primary-light)',
                    color: 'var(--color-primary)',
                    fontWeight: 800,
                    fontSize: '0.75rem',
                    padding: '2px 8px',
                    borderRadius: '4px'
                  }}>
                    {uni.code}
                  </span>
                  <span style={{
                    background: '#DCFCE7',
                    color: '#15803D',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    padding: '2px 8px',
                    borderRadius: '9999px'
                  }}>
                    {uni.matchScore}% Match
                  </span>
                </div>

                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.3, marginBottom: '6px' }}>
                  {uni.name}
                </h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
                  {uni.location} · {uni.type}
                </div>

                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--border-light)' }}>
                  <button
                    onClick={() => onToggleShortlist(uni.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: isShortlisted ? 'var(--color-primary)' : '#64748B',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Bookmark size={14} fill={isShortlisted ? 'currentColor' : 'none'} />
                    <span>{isShortlisted ? 'Shortlisted' : 'Shortlist'}</span>
                  </button>

                  <button
                    onClick={() => onSelectUniversity(uni.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-primary)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Details →
                  </button>
                </div>
              </div>
            );
          })}

          {/* Empty Slots up to 4 */}
          {selectedUnis.length < 4 && (
            <div 
              onClick={() => setShowAddModal(true)}
              style={{
                border: '2px dashed #CBD5E1',
                borderRadius: 'var(--radius-xl)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                cursor: 'pointer',
                background: 'rgba(255, 255, 255, 0.6)',
                transition: 'all 0.15s ease',
                minHeight: '160px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-primary)';
                e.currentTarget.style.backgroundColor = 'var(--color-primary-light)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#CBD5E1';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
              }}
            >
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'white',
                border: '1px solid #CBD5E1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary)',
                marginBottom: '8px'
              }}>
                <Plus size={20} />
              </div>
              <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)', display: 'block' }}>Add Another</strong>
              <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
                {4 - selectedUnis.length} slot{4 - selectedUnis.length > 1 ? 's' : ''} available
              </span>
            </div>
          )}
        </div>

        {/* Side-by-Side Comparison Matrix Table */}
        {selectedUnis.length > 0 ? (
          <div style={{
            background: 'white',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)',
            overflowX: 'auto',
            marginBottom: '32px'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
              <thead>
                <tr style={{ background: '#0F172A', color: 'white' }}>
                  <th style={{ padding: '16px 20px', width: '220px', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.05em' }}>
                    CRITERIA
                  </th>
                  {selectedUnis.map(uni => (
                    <th key={uni.id} style={{ padding: '16px 20px', fontSize: '0.9rem', fontWeight: 800 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>
                          {uni.code}
                        </span>
                        <span>{uni.name.split(' ')[0]}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* University Type */}
                <tr style={{ borderBottom: '1px solid var(--border-light)', backgroundColor: highlightDiffs && valuesDiffer(u => u.type) ? '#FEF3C7' : 'transparent' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>University Type</td>
                  {selectedUnis.map(u => (
                    <td key={u.id} style={{ padding: '14px 20px', fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600 }}>{u.type}</td>
                  ))}
                </tr>

                {/* Location */}
                <tr style={{ borderBottom: '1px solid var(--border-light)', backgroundColor: highlightDiffs && valuesDiffer(u => u.location) ? '#FEF3C7' : 'transparent' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>Campus Location</td>
                  {selectedUnis.map(u => (
                    <td key={u.id} style={{ padding: '14px 20px', fontSize: '0.9rem', color: 'var(--text-main)' }}>{u.location}</td>
                  ))}
                </tr>

                {/* National Ranking */}
                <tr style={{ borderBottom: '1px solid var(--border-light)', backgroundColor: highlightDiffs && valuesDiffer(u => u.rankingNational) ? '#FEF3C7' : 'transparent' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>Category / Ranking</td>
                  {selectedUnis.map(u => (
                    <td key={u.id} style={{ padding: '14px 20px', fontSize: '0.9rem' }}>
                      <span style={{ background: '#EDE9FE', color: '#6D28D9', padding: '3px 10px', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 700 }}>
                        {u.rankingNational ? `#${u.rankingNational} in Bangladesh` : (u.category || u.type)}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Preferred Program */}
                <tr style={{ borderBottom: '1px solid var(--border-light)', backgroundColor: highlightDiffs && valuesDiffer(u => u.preferredProgram) ? '#FEF3C7' : 'transparent' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>Flagship Program</td>
                  {selectedUnis.map(u => (
                    <td key={u.id} style={{ padding: '14px 20px', fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 700 }}>
                      {u.preferredProgram || 'BSc in Computer Science & Engineering'}
                    </td>
                  ))}
                </tr>

                {/* Total Seats */}
                <tr style={{ borderBottom: '1px solid var(--border-light)', backgroundColor: highlightDiffs && valuesDiffer(u => u.seats) ? '#FEF3C7' : 'transparent' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>Undergraduate Seats</td>
                  {selectedUnis.map(u => (
                    <td key={u.id} style={{ padding: '14px 20px', fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600 }}>
                      {u.seats ? `${u.seats} seats` : 'Check circular'}
                    </td>
                  ))}
                </tr>

                {/* Minimum Combined GPA */}
                <tr style={{ borderBottom: '1px solid var(--border-light)', backgroundColor: highlightDiffs && valuesDiffer(u => u.minGpaCombined) ? '#FEF3C7' : 'transparent' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>Eligibility Threshold</td>
                  {selectedUnis.map(u => (
                    <td key={u.id} style={{ padding: '14px 20px', fontSize: '0.9rem', color: '#059669', fontWeight: 700 }}>
                      {u.minGpaCombined ? `${u.minGpaCombined} / 10.00` : (u.eligibilityStatus || 'Requires circular')}
                    </td>
                  ))}
                </tr>

                {/* Estimated Total Tuition */}
                <tr style={{ borderBottom: '1px solid var(--border-light)', backgroundColor: highlightDiffs && valuesDiffer(u => u.tuitionEst) ? '#FEF3C7' : 'transparent' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>Estimated Tuition</td>
                  {selectedUnis.map(u => (
                    <td key={u.id} style={{ padding: '14px 20px', fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 800 }}>
                      {u.tuitionEst || u.tuitionRange || 'Per session notice'}
                    </td>
                  ))}
                </tr>

                {/* Scholarship / Waivers */}
                <tr style={{ borderBottom: '1px solid var(--border-light)', backgroundColor: highlightDiffs && valuesDiffer(u => u.scholarshipDesc) ? '#FEF3C7' : 'transparent' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>Scholarship & Waivers</td>
                  {selectedUnis.map(u => (
                    <td key={u.id} style={{ padding: '14px 20px', fontSize: '0.85rem', color: '#334155' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#166534', fontWeight: 600 }}>
                        <Check size={14} color="#10B981" />
                        <span>{u.scholarshipDesc || 'Per session notice'}</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Campus Facilities */}
                <tr style={{ borderBottom: '1px solid var(--border-light)', backgroundColor: highlightDiffs && valuesDiffer(u => u.facilities?.length) ? '#FEF3C7' : 'transparent' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>Academic & Campus</td>
                  {selectedUnis.map(u => (
                    <td key={u.id} style={{ padding: '14px 20px', fontSize: '0.825rem', color: '#475569' }}>
                      {u.facilities && Array.isArray(u.facilities) 
                        ? u.facilities.map(f => typeof f === 'string' ? f : f.name).slice(0, 3).join(' · ')
                        : `${u.instructionLanguage} · ${u.academicCalendar}`}
                    </td>
                  ))}
                </tr>

                {/* Application Deadline */}
                <tr style={{ borderBottom: '1px solid var(--border-light)', backgroundColor: highlightDiffs && valuesDiffer(u => u.applicationDeadline) ? '#FEF3C7' : 'transparent' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>Application Deadline</td>
                  {selectedUnis.map(u => (
                    <td key={u.id} style={{ padding: '14px 20px', fontSize: '0.9rem', color: '#DC2626', fontWeight: 700 }}>
                      {u.applicationDeadline || u.deadline || u.deadlineFormatted || 'Check official notice'}
                    </td>
                  ))}
                </tr>

                {/* Quick Actions */}
                <tr>
                  <td style={{ padding: '16px 20px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>Actions</td>
                  {selectedUnis.map(u => (
                    <td key={u.id} style={{ padding: '16px 20px' }}>
                      <button
                        onClick={() => onSelectUniversity(u.id)}
                        className="btn-primary"
                        style={{ padding: '6px 14px', fontSize: '0.8rem', width: '100%' }}
                      >
                        Full Details
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: '16px', border: '1px solid var(--border-light)', marginBottom: '32px' }}>
            <Building2 size={36} color="#94A3B8" style={{ margin: '0 auto 12px auto' }} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
              No universities selected for comparison
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '16px' }}>
              Select up to four universities from Explore or Shortlist to compare requirements side-by-side.
            </p>
            <button onClick={() => onNavigate('explore')} className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.875rem' }}>
              Browse Universities
            </button>
          </div>
        )}

        {/* Ready to Decide CTA Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '28px 32px',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sparkles size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '4px' }}>
                Still weighing your decision?
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#94A3B8', margin: 0 }}>
                Ask UniQuery AI to analyze the specific pros and cons between {selectedUnis.map(u => u.code).join(' vs ')} for you.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              className="btn-primary"
              onClick={() => onAskAboutUni(selectedUnis.map(u => u.code).join(' and '))}
              style={{ padding: '10px 20px', fontSize: '0.9rem' }}
            >
              <MessageSquare size={16} />
              <span>Ask AI to Compare</span>
            </button>
          </div>
        </div>

        {/* Add University Modal */}
        {showAddModal && (
          <div 
            className="animate-fade-in"
            onClick={() => setShowAddModal(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              backdropFilter: 'blur(6px)',
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem'
            }}
          >
            <div 
              className="animate-scale-up"
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '540px',
                background: 'white',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-xl)',
                overflow: 'hidden',
                maxHeight: '80vh',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{
                padding: '18px 20px',
                borderBottom: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                  Add University to Compare
                </h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 4 }}
                >
                  <X size={18} />
                </button>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
                {availableToAdd.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {availableToAdd.map(uni => (
                      <div
                        key={uni.id}
                        onClick={() => {
                          onToggleCompare(uni.id);
                          setShowAddModal(false);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 14px',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-light)',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary-light)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--color-primary)' }}>{uni.code}</span>
                            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>{uni.name}</span>
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                            {uni.location} · {uni.type} · {uni.matchScore}% Match
                          </div>
                        </div>

                        <button 
                          className="btn-primary"
                          style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                        >
                          + Select
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '24px', color: '#94A3B8' }}>
                    All available universities are already added.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
