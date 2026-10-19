import React, { useState, useMemo } from 'react';
import { 
  User, 
  TrendingUp, 
  Edit3, 
  Filter, 
  RotateCcw, 
  MapPin, 
  Check, 
  Calendar, 
  DollarSign, 
  Award, 
  Bookmark, 
  Columns, 
  ArrowRight, 
  X, 
  Sliders,
  Search,
  CheckCircle2,
  Building2
} from 'lucide-react';
import { universitiesData } from '../data/universities';

export default function ExploreResults({ 
  userProfile, 
  onEditProfile, 
  onSelectUniversity, 
  shortlist = [], 
  onToggleShortlist, 
  compareList = [], 
  onToggleCompare, 
  onNavigateToCompare 
}) {
  // Filter States - Empty means show all
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortBy, setSortBy] = useState('Best match');

  const filteredUniversities = useMemo(() => {
    return universitiesData.filter(uni => {
      // Keyword search
      if (searchKeyword.trim()) {
        const kw = searchKeyword.toLowerCase();
        const matchesKw = 
          uni.name.toLowerCase().includes(kw) ||
          uni.code.toLowerCase().includes(kw) ||
          uni.location.toLowerCase().includes(kw) ||
          uni.preferredProgram?.toLowerCase().includes(kw);
        if (!matchesKw) return false;
      }

      // Filter by Type
      if (selectedTypes.length > 0) {
        const matchesType = selectedTypes.some(t => uni.type?.toLowerCase().includes(t.toLowerCase()));
        if (!matchesType) return false;
      }

      // Filter by Location
      if (selectedLocations.length > 0) {
        const matchesLoc = selectedLocations.some(l => uni.location?.toLowerCase().includes(l.toLowerCase()));
        if (!matchesLoc) return false;
      }

      // Filter by Program
      if (selectedPrograms.length > 0) {
        const matchesProg = selectedPrograms.some(p => 
          uni.matchedProgram?.shortTitle?.toLowerCase().includes(p.toLowerCase()) ||
          uni.matchedProgram?.title?.toLowerCase().includes(p.toLowerCase()) ||
          uni.preferredProgram?.toLowerCase().includes(p.toLowerCase()) ||
          uni.programs?.some(pr => pr.name.toLowerCase().includes(p.toLowerCase()))
        );
        if (!matchesProg) return false;
      }

      // Filter by Eligibility status
      if (selectedStatus.length > 0) {
        const statusVal = uni.eligibilityStatus || 'Eligible';
        if (!selectedStatus.includes(statusVal)) return false;
      }

      return true;
    }).sort((a, b) => {
      const scoreA = a.matchScore ?? a.matchPercentage ?? 85;
      const scoreB = b.matchScore ?? b.matchPercentage ?? 85;

      if (sortBy === 'Best match') return scoreB - scoreA;
      if (sortBy === 'Ranking: Best') return (a.rankingNational || 99) - (b.rankingNational || 99);
      if (sortBy === 'Deadline: Soonest') return (a.daysLeft || 99) - (b.daysLeft || 99);
      return 0;
    });
  }, [selectedTypes, selectedLocations, selectedPrograms, selectedStatus, searchKeyword, sortBy]);

  const handleResetFilters = () => {
    setSelectedTypes([]);
    setSelectedLocations([]);
    setSelectedPrograms([]);
    setSelectedStatus([]);
    setSearchKeyword('');
    setSortBy('Best match');
  };

  const toggleArrayItem = (list, setList, item) => {
    setList(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  return (
    <div className="explore-results-view-container animate-fade-in" style={{ padding: '2rem 0 5rem 0' }}>
      <div className="container">

        {/* Header */}
        <div className="page-header-block" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <span className="page-category-tag">MATCH RESULTS</span>
            <h1 className="page-main-title">Eligible Universities & Programs</h1>
            <p className="page-main-desc">
              Showing {filteredUniversities.length} verified Bangladesh higher education institutions matching your academic profile and preferences.
            </p>
          </div>
          <button className="btn-secondary" onClick={onEditProfile} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Edit3 size={16} />
            <span>Recalculate Wizard</span>
          </button>
        </div>

        {/* Profile Summary Strip */}
        <div style={{
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          padding: '16px 24px',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '28px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <User size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {userProfile.fullName || userProfile.name || 'Applicant Profile'}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                HSC Group: <strong>{userProfile.academicGroup || userProfile.group || 'Not specified'}</strong>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <div>
              <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>SSC GPA</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {userProfile.sscGpa ? parseFloat(userProfile.sscGpa).toFixed(2) : '—'}
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>HSC GPA</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {userProfile.hscGpa ? parseFloat(userProfile.hscGpa).toFixed(2) : '—'}
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Budget</span>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {userProfile.budgetRange || userProfile.budget || 'Flexible / Any'}
              </div>
            </div>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '9999px',
              background: '#ECFDF5',
              color: '#059669',
              fontSize: '0.825rem',
              fontWeight: 700,
              border: '1px solid #A7F3D0'
            }}>
              <TrendingUp size={16} />
              <span>Highly Competitive Profile</span>
            </div>
          </div>
        </div>

        {/* Main 2-Column Results Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          gap: '24px',
          alignItems: 'start'
        }} className="results-content-layout">
          
          {/* Left Filter Sidebar */}
          <aside style={{
            background: 'white',
            borderRadius: 'var(--radius-xl)',
            padding: '20px',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)',
            position: 'sticky',
            top: '90px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Filter size={18} color="var(--color-primary)" />
                <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>Filters</span>
              </div>
              <button 
                onClick={handleResetFilters}
                style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Reset All
              </button>
            </div>

            {/* University Type Filter */}
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                University Type
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {['Public', 'Private', 'International'].map(t => (
                  <label key={t} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--text-main)', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={selectedTypes.includes(t)}
                      onChange={() => toggleArrayItem(selectedTypes, setSelectedTypes, t)}
                      style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)' }}
                    />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                Campus Location
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {['Dhaka', 'Rajshahi', 'Chattogram', 'Khulna', 'Sylhet', 'Gazipur'].map(loc => (
                  <label key={loc} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--text-main)', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={selectedLocations.includes(loc)}
                      onChange={() => toggleArrayItem(selectedLocations, setSelectedLocations, loc)}
                      style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)' }}
                    />
                    <span>{loc}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Program Filter */}
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                Program / Discipline
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {['CSE', 'EEE', 'Mechanical', 'Civil', 'MBBS', 'Architecture', 'BBA'].map(prog => (
                  <label key={prog} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--text-main)', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={selectedPrograms.includes(prog)}
                      onChange={() => toggleArrayItem(selectedPrograms, setSelectedPrograms, prog)}
                      style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)' }}
                    />
                    <span>{prog}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Results Main Column */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Header controls: Search & Sort */}
            <div style={{
              background: 'white',
              borderRadius: 'var(--radius-lg)',
              padding: '12px 18px',
              border: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              {/* Keyword Search */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '220px' }}>
                <Search size={16} color="#94A3B8" />
                <input
                  type="text"
                  placeholder="Filter by university name, city, program..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  style={{
                    border: 'none',
                    outline: 'none',
                    fontSize: '0.875rem',
                    width: '100%',
                    color: 'var(--text-main)'
                  }}
                />
              </div>

              {/* Sort by */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 600 }}>Sort By:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-light)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--text-main)'
                  }}
                >
                  <option value="Best match">Best match score</option>
                  <option value="Ranking: Best">National Ranking</option>
                  <option value="Deadline: Soonest">Application Deadline</option>
                </select>
              </div>
            </div>

            {/* University List Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {filteredUniversities.length > 0 ? (
                filteredUniversities.map((uni) => {
                  const isSelectedForCompare = compareList.includes(uni.id);
                  const isShortlisted = shortlist.includes(uni.id);
                  const matchScore = uni.matchScore ?? uni.matchPercentage ?? 88;

                  return (
                    <div 
                      key={uni.id} 
                      style={{
                        background: 'white',
                        borderRadius: 'var(--radius-xl)',
                        border: isSelectedForCompare ? '2px solid var(--color-primary)' : '1px solid var(--border-light)',
                        boxShadow: 'var(--shadow-sm)',
                        padding: '20px 24px',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {/* Top Header: Badge, Code, Name, Match Score */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                          <div style={{
                            width: '46px',
                            height: '46px',
                            borderRadius: '10px',
                            background: uni.badgeBg || 'var(--color-primary)',
                            color: uni.badgeColor || 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: '0.9rem',
                            flexShrink: 0
                          }}>
                            {uni.code}
                          </div>

                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '2px' }}>
                              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                                {uni.name}
                              </h3>
                              <span style={{
                                background: '#EDE9FE',
                                color: '#6D28D9',
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                padding: '2px 8px',
                                borderRadius: '9999px'
                              }}>
                                {uni.rankingNational ? `#${uni.rankingNational} in Bangladesh` : (uni.category || uni.type)}
                              </span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.825rem' }}>
                              <MapPin size={13} />
                              <span>{uni.locationDisplay || uni.location} · {uni.type}{uni.founded ? ` · Founded ${uni.founded}` : ''}</span>
                            </div>
                          </div>
                        </div>

                        {/* Match Badge & Deadline Status */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{
                            background: '#DCFCE7',
                            color: '#15803D',
                            padding: '4px 10px',
                            borderRadius: '9999px',
                            fontWeight: 800,
                            fontSize: '0.85rem',
                            border: '1px solid #86EFAC'
                          }}>
                            {matchScore}% Match
                          </span>

                          <span style={{
                            background: uni.deadlineStatus === 'closing-soon' ? '#FEF2F2' : '#EFF6FF',
                            color: uni.deadlineStatus === 'closing-soon' ? '#DC2626' : '#2563EB',
                            padding: '4px 10px',
                            borderRadius: '9999px',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            border: uni.deadlineStatus === 'closing-soon' ? '1px solid #FECACA' : '1px solid #BFDBFE'
                          }}>
                            {uni.deadlineBadge || (uni.daysLeft <= 15 ? 'Closing soon' : 'Application open')}
                          </span>
                        </div>
                      </div>

                      {/* Middle Details Grid */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                        gap: '12px',
                        background: '#F8FAFC',
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-lg)',
                        marginBottom: '16px'
                      }}>
                        <div>
                          <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Flagship Program</div>
                          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
                            {uni.preferredProgram || 'Undergraduate Degree'}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                            {uni.seats ? `${uni.seats} available` : 'Seats per circular'}
                          </div>
                        </div>

                        <div>
                          <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Estimated Tuition</div>
                          <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '2px' }}>
                            {uni.tuitionEst || uni.tuitionRange || 'Per session notice'}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                            {uni.type === 'Public' ? 'Subsidized Public' : (uni.type === 'Private' ? 'Private Tuition' : 'Check prospectus')}
                          </div>
                        </div>

                        <div>
                          <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Session Status</div>
                          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#166534', marginTop: '2px' }}>
                            {uni.scholarshipDesc ? `✓ ${uni.scholarshipDesc}` : 'Check circular for waivers'}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                            {uni.secondTimerAllowed !== undefined ? (uni.secondTimerAllowed ? '2nd timers eligible' : '1st timer only') : 'Verify passing year rules'}
                          </div>
                        </div>

                        <div>
                          <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Application Deadline</div>
                          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#DC2626', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Calendar size={14} />
                            {uni.applicationDeadline || uni.deadline || uni.deadlineFormatted || 'Check official notice'}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: uni.daysLeft != null ? '#059669' : '#D97706', fontWeight: 600 }}>
                            {uni.daysLeft != null ? `${uni.daysLeft} days remaining` : (uni.deadlineBadge || 'Verify official circular')}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Footer Actions */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <button
                            onClick={() => onToggleShortlist(uni.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: isShortlisted ? 'var(--color-primary)' : '#64748B',
                              fontSize: '0.825rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <Bookmark size={15} fill={isShortlisted ? 'currentColor' : 'none'} />
                            <span>{isShortlisted ? 'Shortlisted' : 'Add to Shortlist'}</span>
                          </button>

                          <button
                            onClick={() => onToggleCompare(uni.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: isSelectedForCompare ? 'var(--color-primary)' : '#64748B',
                              fontSize: '0.825rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <Columns size={15} />
                            <span>{isSelectedForCompare ? 'In Comparison Dock' : 'Add to Compare'}</span>
                          </button>
                        </div>

                        <button
                          onClick={() => onSelectUniversity(uni.id)}
                          className="btn-primary"
                          style={{ padding: '8px 18px', fontSize: '0.85rem' }}
                        >
                          <span>View Full Profile</span>
                          <ArrowRight size={15} />
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div style={{ textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
                  <Building2 size={36} color="#94A3B8" style={{ margin: '0 auto 12px auto' }} />
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                    No universities match your filter criteria
                  </h3>
                  <p style={{ color: '#64748B', fontSize: '0.875rem', marginBottom: '16px' }}>
                    Try unchecking filters or search with another keyword.
                  </p>
                  <button onClick={handleResetFilters} className="btn-secondary" style={{ padding: '6px 16px', fontSize: '0.85rem' }}>
                    Reset Filters
                  </button>
                </div>
              )}
            </div>

          </section>

        </div>

      </div>
    </div>
  );
}
