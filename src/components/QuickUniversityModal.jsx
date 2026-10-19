import React from 'react';
import { 
  Building2, 
  MapPin, 
  Award, 
  Calendar, 
  CheckCircle2, 
  DollarSign, 
  ExternalLink, 
  Layers, 
  Bookmark, 
  MessageSquare, 
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { universitiesData } from '../data/universities';

export default function QuickUniversityModal({
  uniId,
  isOpen,
  onClose,
  onViewFullDetails,
  onToggleShortlist,
  onToggleCompare,
  onAskAboutUni,
  isShortlisted,
  isCompared
}) {
  if (!isOpen || !uniId) return null;

  const uni = universitiesData.find(u => u.id === uniId) || universitiesData[0];

  return (
    <div 
      className="quick-uni-backdrop animate-fade-in"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(8px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
    >
      <div 
        className="quick-uni-modal animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '700px',
          background: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '85vh'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '24px',
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          color: 'white',
          position: 'relative'
        }}>
          <button 
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '18px',
              right: '18px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{
              background: 'rgba(146, 30, 51, 0.4)',
              border: '1px solid #D4AF37',
              color: '#F5DDE2',
              fontSize: '0.75rem',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '6px'
            }}>
              {uni.code}
            </span>
            <span style={{
              background: 'rgba(16, 185, 129, 0.2)',
              border: '1px solid #10B981',
              color: '#34D399',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '9999px'
            }}>
              {uni.matchScore}% Eligibility Match
            </span>
            <span style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#E2E8F0',
              fontSize: '0.75rem',
              padding: '2px 8px',
              borderRadius: '9999px'
            }}>
              {uni.type}
            </span>
          </div>

          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '4px' }}>
            {uni.name}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94A3B8', fontSize: '0.85rem' }}>
            <MapPin size={14} />
            <span>{uni.locationDisplay || uni.location} · {uni.rankingNational ? `Ranked #${uni.rankingNational} in Bangladesh` : (uni.category || uni.type)}</span>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          
          {/* Key Quick Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            marginBottom: '20px'
          }}>
            <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Available Seats</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '2px' }}>
                {uni.seats ? `${uni.seats} seats` : 'Per Circular'}
              </div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Estimated Tuition</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '2px' }}>
                {uni.tuitionEst || uni.tuitionRange || 'Per Circular'}
              </div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Deadline</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#DC2626', marginTop: '2px' }}>
                {uni.applicationDeadline || uni.deadline || uni.deadlineFormatted || 'Check Notice'}
              </div>
            </div>
          </div>

          {/* Preferred Program & Eligibility */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
              Flagship Program & Eligibility Criteria
            </h4>
            <div style={{
              background: 'var(--color-primary-light)',
              border: '1px solid var(--color-primary-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '14px 16px'
            }}>
              <div style={{ fontWeight: 800, color: 'var(--color-primary)', fontSize: '1rem', marginBottom: '4px' }}>
                {uni.preferredProgram || 'BSc in Computer Science & Engineering'}
              </div>
              <p style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.5, margin: 0 }}>
                {typeof uni.eligibilityCriteria === 'string' ? uni.eligibilityCriteria : (uni.eligibilityCriteria?.notes || uni.eligibilityStatus || 'Requires applicant details and current circular')}
              </p>
            </div>
          </div>

          {/* Campus Facilities */}
          {uni.facilities && Array.isArray(uni.facilities) && uni.facilities.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                Key Campus Highlights
              </h4>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {uni.facilities.map((fac, idx) => (
                  <span 
                    key={idx}
                    style={{
                      background: '#F1F5F9',
                      color: '#475569',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: '6px'
                    }}
                  >
                    ✓ {typeof fac === 'string' ? fac : fac.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Quick AI Advice */}
          <div style={{
            background: '#F0FDF4',
            border: '1px solid #BBF7D0',
            borderRadius: 'var(--radius-md)',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sparkles size={18} color="#16A34A" />
              <span style={{ fontSize: '0.85rem', color: '#166534', fontWeight: 600 }}>
                Have specific admission questions about {uni.code}?
              </span>
            </div>
            <button
              onClick={() => {
                onClose();
                onAskAboutUni(uni.code);
              }}
              style={{
                background: '#16A34A',
                color: 'white',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <MessageSquare size={14} />
              Ask AI
            </button>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#FAFAFA',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => onToggleShortlist(uni.id)}
              className="btn-secondary"
              style={{ padding: '8px 14px', fontSize: '0.825rem' }}
            >
              <Bookmark size={15} color={isShortlisted ? 'var(--color-primary)' : 'currentColor'} />
              <span>{isShortlisted ? 'Shortlisted' : 'Shortlist'}</span>
            </button>

            <button
              onClick={() => onToggleCompare(uni.id)}
              className="btn-secondary"
              style={{ padding: '8px 14px', fontSize: '0.825rem' }}
            >
              <Layers size={15} color={isCompared ? 'var(--color-primary)' : 'currentColor'} />
              <span>{isCompared ? 'In Compare Dock' : 'Add to Compare'}</span>
            </button>
          </div>

          <button
            onClick={() => {
              onClose();
              onViewFullDetails(uni.id);
            }}
            className="btn-primary"
            style={{ padding: '8px 18px', fontSize: '0.85rem' }}
          >
            <span>View Full University Profile</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}
