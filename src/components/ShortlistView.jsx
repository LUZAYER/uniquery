import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  Trash2, 
  ArrowRight, 
  Layers, 
  ExternalLink,
  Plus,
  Sparkles,
  Info
} from 'lucide-react';
import { universitiesData } from '../data/universities';

export default function ShortlistView({
  shortlist = [],
  compareList = [],
  onToggleShortlist,
  onToggleCompare,
  onSelectUniversity,
  onNavigate
}) {
  const [selectedForCompare, setSelectedForCompare] = useState(() => {
    // default to whatever is in compareList that exists in shortlist
    return compareList.filter(id => shortlist.includes(id));
  });

  // Get shortlisted universities data
  const shortlistedUnis = universitiesData.filter(u => shortlist.includes(u.id));

  const handleCheckboxToggle = (id) => {
    if (selectedForCompare.includes(id)) {
      setSelectedForCompare(selectedForCompare.filter(x => x !== id));
      if (compareList.includes(id)) {
        onToggleCompare(id);
      }
    } else {
      if (selectedForCompare.length >= 4) {
        alert("You can compare up to 4 universities simultaneously.");
        return;
      }
      setSelectedForCompare([...selectedForCompare, id]);
      if (!compareList.includes(id)) {
        onToggleCompare(id);
      }
    }
  };

  const handleClearSelection = () => {
    setSelectedForCompare([]);
  };

  const handleCompareClick = () => {
    onNavigate('compare');
  };

  return (
    <div className="shortlist-view-container animate-fade-in" style={{ padding: '2.5rem 0 5rem 0' }}>
      <div className="container">
        
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <span style={{ 
              fontSize: '0.8rem', 
              fontWeight: 700, 
              letterSpacing: '0.08em', 
              color: 'var(--primary-color)',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '0.35rem'
            }}>
              YOUR SAVED OPTIONS
            </span>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '0.5rem' }}>
              My Shortlist
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '620px', lineHeight: 1.5 }}>
              Keep your strongest university options together, compare details and track application deadlines.
            </p>
          </div>
          <div>
            <button 
              className="btn btn-primary"
              onClick={() => onNavigate('explore')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Plus size={18} />
              Explore more universities
            </button>
          </div>
        </div>

        {/* Batch Selection Bar (Shown when items exist) */}
        {shortlistedUnis.length > 0 && (
          <div style={{
            background: 'white',
            borderRadius: 'var(--radius-lg)',
            padding: '1rem 1.5rem',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ 
                  background: 'var(--primary-light)', 
                  color: 'var(--primary-color)', 
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '9999px'
                }}>
                  {selectedForCompare.length} selected for comparison
                </span>
                {selectedForCompare.length > 0 && (
                  <button 
                    onClick={handleClearSelection}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: 'var(--text-muted)', 
                      fontSize: '0.85rem', 
                      textDecoration: 'underline', 
                      cursor: 'pointer' 
                    }}
                  >
                    Clear selection
                  </button>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
                {shortlistedUnis.length} shortlisted
              </span>
              <button 
                className="btn btn-primary"
                onClick={handleCompareClick}
                disabled={selectedForCompare.length < 2}
                style={{ 
                  padding: '0.55rem 1.25rem', 
                  fontSize: '0.9rem', 
                  opacity: selectedForCompare.length < 2 ? 0.6 : 1,
                  cursor: selectedForCompare.length < 2 ? 'not-allowed' : 'pointer'
                }}
              >
                Compare Selected Universities
              </button>
            </div>
          </div>
        )}

        {/* Shortlist Cards List */}
        {shortlistedUnis.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {shortlistedUnis.map((uni, idx) => {
              const isSelected = selectedForCompare.includes(uni.id);
              const savedTimeline = idx === 0 ? 'Saved 1 week ago' : idx === 1 ? 'Saved 2 weeks ago' : 'Saved 3 weeks ago';

              return (
                <div 
                  key={uni.id}
                  style={{
                    background: 'white',
                    borderRadius: 'var(--radius-xl)',
                    border: isSelected ? '2px solid var(--primary-color)' : '1px solid var(--border-color)',
                    boxShadow: 'var(--shadow-sm)',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ padding: '1.75rem' }}>
                    {/* Top Row: Select, Uni Name, Match Badge */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                        <div style={{ paddingTop: '0.2rem' }}>
                          <input 
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleCheckboxToggle(uni.id)}
                            style={{ 
                              width: '20px', 
                              height: '20px', 
                              accentColor: 'var(--primary-color)', 
                              cursor: 'pointer' 
                            }}
                          />
                        </div>

                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                            <span style={{
                              background: '#ECFDF5',
                              color: '#059669',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              padding: '0.2rem 0.6rem',
                              borderRadius: '9999px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.3rem'
                            }}>
                              <CheckCircle size={12} />
                              Eligible
                            </span>
                            <span style={{
                              background: 'var(--bg-light)',
                              color: 'var(--text-dark)',
                              fontSize: '0.75rem',
                              fontWeight: 800,
                              padding: '0.2rem 0.6rem',
                              borderRadius: '4px',
                              border: '1px solid var(--border-color)'
                            }}>
                              {uni.code}
                            </span>
                          </div>

                          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '0.25rem' }}>
                            {uni.name}
                          </h3>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                            <MapPin size={14} />
                            <span>{uni.location} · {uni.type}</span>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span style={{
                          background: '#ECFDF5',
                          color: '#059669',
                          fontSize: '0.9rem',
                          fontWeight: 800,
                          padding: '0.35rem 0.85rem',
                          borderRadius: '9999px',
                          border: '1px solid #A7F3D0'
                        }}>
                          {uni.matchScore}% match
                        </span>
                        <span style={{
                          background: uni.deadlineStatus === 'closing-soon' ? '#FEF2F2' : '#EFF6FF',
                          color: uni.deadlineStatus === 'closing-soon' ? '#DC2626' : '#2563EB',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          padding: '0.35rem 0.75rem',
                          borderRadius: '9999px',
                          border: uni.deadlineStatus === 'closing-soon' ? '1px solid #FECACA' : '1px solid #BFDBFE'
                        }}>
                          {uni.deadlineBadge}
                        </span>
                      </div>
                    </div>

                    {/* Middle specs grid */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                      gap: '1rem',
                      background: 'var(--bg-light)',
                      padding: '1.25rem',
                      borderRadius: 'var(--radius-lg)',
                      marginBottom: '1.5rem'
                    }}>
                      <div>
                        <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '0.25rem' }}>
                          PREFERRED PROGRAM
                        </div>
                        <div style={{ fontWeight: 700, color: 'var(--text-dark)', fontSize: '0.92rem' }}>
                          {uni.preferredProgram || 'BSc in Computer Science & Engineering'}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {uni.programDuration || '4 years'}
                        </div>
                      </div>

                      <div>
                        <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '0.25rem' }}>
                          ESTIMATED TUITION
                        </div>
                        <div style={{ fontWeight: 700, color: 'var(--text-dark)', fontSize: '0.92rem' }}>
                          {uni.tuitionEst}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          Total program
                        </div>
                      </div>

                      <div>
                        <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '0.25rem' }}>
                          SCHOLARSHIP
                        </div>
                        <div style={{ fontWeight: 700, color: 'var(--text-dark)', fontSize: '0.92rem' }}>
                          {uni.scholarshipDesc}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {uni.scholarshipNote}
                        </div>
                      </div>

                      <div>
                        <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '0.25rem' }}>
                          APPLICATION DEADLINE
                        </div>
                        <div style={{ fontWeight: 700, color: 'var(--text-dark)', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Calendar size={14} color="var(--primary-color)" />
                          {uni.applicationDeadline}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 600 }}>
                          ✓ Requirements met
                        </div>
                      </div>
                    </div>

                    {/* Bottom Footer actions */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {savedTimeline}
                      </span>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <button 
                          onClick={() => onToggleShortlist(uni.id)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-muted)',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            padding: '0.4rem 0.6rem',
                            borderRadius: 'var(--radius-sm)'
                          }}
                          onMouseOver={(e) => e.currentTarget.style.color = '#DC2626'}
                          onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                        >
                          <Trash2 size={15} />
                          Remove
                        </button>

                        <button 
                          onClick={() => handleCheckboxToggle(uni.id)}
                          className="btn btn-secondary"
                          style={{ 
                            fontSize: '0.85rem', 
                            padding: '0.45rem 0.9rem',
                            borderColor: isSelected ? 'var(--primary-color)' : 'var(--border-color)',
                            color: isSelected ? 'var(--primary-color)' : 'var(--text-dark)'
                          }}
                        >
                          <Layers size={15} />
                          {isSelected ? 'Compared' : 'Compare'}
                        </button>

                        <button 
                          className="btn btn-primary"
                          onClick={() => onSelectUniversity(uni.id)}
                          style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty Shortlist State */
          <div style={{
            background: 'white',
            borderRadius: 'var(--radius-xl)',
            padding: '4rem 2rem',
            textAlign: 'center',
            boxShadow: 'var(--shadow-sm)',
            border: '1px dashed var(--border-color)',
            maxWidth: '650px',
            margin: '2rem auto'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'var(--primary-light)',
              color: 'var(--primary-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}>
              <Sparkles size={32} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '0.5rem' }}>
              Your shortlist is ready for great options
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.75rem', maxWidth: '400px', margin: '0 auto 1.75rem auto', lineHeight: 1.5 }}>
              Explore eligible universities and save the ones you like to track deadlines and compare side-by-side.
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => onNavigate('explore')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.75rem' }}
            >
              Explore Universities
              <ArrowRight size={18} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
