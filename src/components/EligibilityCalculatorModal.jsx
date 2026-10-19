import React, { useState } from 'react';
import { 
  Calculator, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  X, 
  Sparkles, 
  Award, 
  GraduationCap, 
  ArrowRight,
  Info
} from 'lucide-react';

export default function EligibilityCalculatorModal({ isOpen, onClose, onExploreMatches }) {
  const [sscGpa, setSscGpa] = useState(5.00);
  const [hscGpa, setHscGpa] = useState(4.83);
  const [group, setGroup] = useState('Science');
  const [passingYear, setPassingYear] = useState('2026');
  
  // Subject Grade Points (out of 5.0)
  const [mathGp, setMathGp] = useState(5.0);
  const [phyGp, setPhyGp] = useState(5.0);
  const [chemGp, setChemGp] = useState(5.0);
  const [bioGp, setBioGp] = useState(4.5);
  const [engGp, setEngGp] = useState(4.5);

  if (!isOpen) return null;

  const totalGpa = parseFloat(sscGpa) + parseFloat(hscGpa);
  const stemSum = parseFloat(mathGp) + parseFloat(phyGp) + parseFloat(chemGp);

  // Criteria calculations
  const institutions = [
    {
      name: 'BUET Engineering Unit',
      code: 'BUET',
      minCombined: 8.00,
      minSubject: 'Math + Phy + Chem = 15.0 GP',
      status: (sscGpa >= 4.0 && hscGpa >= 4.0 && stemSum >= 14.5 && group === 'Science') ? 'eligible' : 'ineligible',
      reason: (sscGpa < 4.0 || hscGpa < 4.0) 
        ? 'Requires min GPA 4.00 in both SSC & HSC.'
        : stemSum < 14.5 
          ? 'Requires near-perfect Grade Points in Math, Physics, and Chemistry (Total ≥ 14.5).' 
          : 'Fully eligible to apply for preliminary screening!'
    },
    {
      name: 'University of Dhaka (KA Unit - Science)',
      code: 'DU',
      minCombined: 8.00,
      minSubject: 'Min 3.50 in SSC & HSC each',
      status: (totalGpa >= 8.00 && sscGpa >= 3.5 && hscGpa >= 3.5 && group === 'Science') ? 'eligible' : 'ineligible',
      reason: totalGpa < 8.00 
        ? `Combined GPA is ${totalGpa.toFixed(2)}, but DU requires min 8.00 total.`
        : (sscGpa < 3.5 || hscGpa < 3.5)
          ? 'Requires min 3.50 separately in both exams.'
          : 'Fully eligible for Dhaka University Unit A admission test!'
    },
    {
      name: 'Government Medical Colleges (MBBS)',
      code: 'DGHS',
      minCombined: 9.00,
      minSubject: 'Min Bio GPA 4.00, SSC/HSC min 4.00',
      status: (totalGpa >= 9.00 && sscGpa >= 4.0 && hscGpa >= 4.0 && bioGp >= 4.0 && group === 'Science') ? 'eligible' : 'ineligible',
      reason: totalGpa < 9.00 
        ? `Combined GPA is ${totalGpa.toFixed(2)}, medical requires min 9.00 total.`
        : bioGp < 4.0
          ? 'Requires min GPA 4.00 in HSC Biology.'
          : 'Fully eligible for Medical Admission Test (National Exam)!'
    },
    {
      name: 'GST General, Science & Tech Cluster (24 Public Unis)',
      code: 'GST',
      minCombined: 7.50,
      minSubject: 'Min 3.50 in SSC & HSC',
      status: (totalGpa >= 7.50 && sscGpa >= 3.5 && hscGpa >= 3.5) ? 'eligible' : 'ineligible',
      reason: totalGpa >= 7.50 
        ? 'Eligible for all 24 GST cluster public universities.' 
        : 'Requires minimum combined GPA 7.50.'
    },
    {
      name: 'Top Private Universities (NSU, BRACU, IUB)',
      code: 'Private',
      minCombined: 7.00,
      minSubject: 'Min 3.00 in each exam',
      status: (totalGpa >= 7.00 && sscGpa >= 3.0 && hscGpa >= 3.0) ? 'eligible' : 'ineligible',
      reason: totalGpa >= 9.5 
        ? 'Eligible for up to 50–100% Merit Tuition Waiver!' 
        : totalGpa >= 7.0 
          ? 'Eligible for direct admission test with high admission probability.'
          : 'Requires combined GPA 7.00 for CSE/EEE.'
    }
  ];

  const eligibleCount = institutions.filter(i => i.status === 'eligible').length;

  return (
    <div 
      className="calculator-modal-backdrop animate-fade-in"
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
        className="calculator-modal animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '780px',
          background: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh'
        }}
      >
        {/* Modal Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, var(--color-primary-light) 0%, #FFFFFF 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'var(--color-primary)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Calculator size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                Instant Admission Eligibility Calculator
              </h2>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', margin: 0 }}>
                Simulate your eligibility across BUET, DU, Medical, and GST criteria in Bangladesh
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '50%'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          
          {/* Inputs Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            background: '#F8FAFC',
            padding: '18px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
            marginBottom: '24px'
          }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                SSC GPA (Out of 5.0)
              </label>
              <input 
                type="number"
                step="0.01"
                min="1.0"
                max="5.0"
                value={sscGpa}
                onChange={(e) => setSscGpa(parseFloat(e.target.value) || 0)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-light)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: 'var(--text-main)'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                HSC GPA (Out of 5.0)
              </label>
              <input 
                type="number"
                step="0.01"
                min="1.0"
                max="5.0"
                value={hscGpa}
                onChange={(e) => setHscGpa(parseFloat(e.target.value) || 0)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-light)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: 'var(--text-main)'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                Discipline / Group
              </label>
              <select 
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-light)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  color: 'var(--text-main)'
                }}
              >
                <option value="Science">Science Group</option>
                <option value="Commerce">Business Studies / Commerce</option>
                <option value="Arts">Humanities / Arts</option>
              </select>
            </div>
          </div>

          {/* Individual Subject Grades (Science Cluster) */}
          {group === 'Science' && (
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.04em' }}>
                HSC Key Subject Grade Points (Crucial for BUET & Medical)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '10px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>Mathematics</span>
                  <input 
                    type="number" step="0.5" min="2.0" max="5.0" value={mathGp} onChange={(e) => setMathGp(parseFloat(e.target.value) || 0)}
                    style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontWeight: 700 }}
                  />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>Physics</span>
                  <input 
                    type="number" step="0.5" min="2.0" max="5.0" value={phyGp} onChange={(e) => setPhyGp(parseFloat(e.target.value) || 0)}
                    style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontWeight: 700 }}
                  />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>Chemistry</span>
                  <input 
                    type="number" step="0.5" min="2.0" max="5.0" value={chemGp} onChange={(e) => setChemGp(parseFloat(e.target.value) || 0)}
                    style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontWeight: 700 }}
                  />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>Biology</span>
                  <input 
                    type="number" step="0.5" min="2.0" max="5.0" value={bioGp} onChange={(e) => setBioGp(parseFloat(e.target.value) || 0)}
                    style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontWeight: 700 }}
                  />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>English</span>
                  <input 
                    type="number" step="0.5" min="2.0" max="5.0" value={engGp} onChange={(e) => setEngGp(parseFloat(e.target.value) || 0)}
                    style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontWeight: 700 }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Quick Score Overview Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
            color: 'white',
            borderRadius: 'var(--radius-lg)',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '24px'
          }}>
            <div>
              <div style={{ fontSize: '0.78rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>
                Combined Total GPA
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#38BDF8' }}>
                {totalGpa.toFixed(2)} <span style={{ fontSize: '1rem', color: '#94A3B8', fontWeight: 500 }}>/ 10.00</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                background: 'rgba(16, 185, 129, 0.2)',
                border: '1px solid #10B981',
                padding: '6px 14px',
                borderRadius: '9999px',
                color: '#34D399',
                fontWeight: 700,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <CheckCircle2 size={16} />
                Eligible for {eligibleCount} of {institutions.length} Tracks
              </div>
            </div>
          </div>

          {/* Institutions Breakdown Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {institutions.map((inst, i) => {
              const isEligible = inst.status === 'eligible';
              return (
                <div 
                  key={i}
                  style={{
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-md)',
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    backgroundColor: isEligible ? '#F0FDF4' : '#FFF1F2'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ marginTop: '2px' }}>
                      {isEligible ? (
                        <CheckCircle2 size={20} color="#16A34A" />
                      ) : (
                        <XCircle size={20} color="#E11D48" />
                      )}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                          {inst.name}
                        </span>
                        <span style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          background: isEligible ? '#DCFCE7' : '#FFE4E6',
                          color: isEligible ? '#15803D' : '#BE123C'
                        }}>
                          {isEligible ? 'ELIGIBLE' : 'REQUIREMENTS NOT MET'}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: '#475569', marginTop: '3px' }}>
                        {inst.reason}
                      </p>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>Threshold</div>
                    <div style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      Min {inst.minCombined} Total
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#FAFAFA'
        }}>
          <button 
            onClick={onClose}
            className="btn-secondary"
            style={{ padding: '8px 18px', fontSize: '0.875rem' }}
          >
            Close
          </button>

          <button 
            onClick={() => {
              onClose();
              onExploreMatches();
            }}
            className="btn-primary"
            style={{ padding: '8px 20px', fontSize: '0.875rem' }}
          >
            <span>Explore Matched Universities</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}
