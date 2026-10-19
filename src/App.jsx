import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomeView from './components/HomeView';
import AskAiView from './components/AskAiView';
import ExploreWizard from './components/ExploreWizard';
import ExploreResults from './components/ExploreResults';
import UniversityDetailsView from './components/UniversityDetailsView';
import CompareView from './components/CompareView';
import NoticesView from './components/NoticesView';
import ShortlistView from './components/ShortlistView';
import ProfileView from './components/ProfileView';

// Rich Interactive Modals
import CommandPalette from './components/CommandPalette';
import EligibilityCalculatorModal from './components/EligibilityCalculatorModal';
import QuickUniversityModal from './components/QuickUniversityModal';

import { initialProfile as initialUserProfile, universitiesData } from './data/universities';
import { noticesData } from './data/notices';
import logoImg from './assets/logo.png';
import { 
  CheckCircle, 
  X, 
  ExternalLink, 
  Info, 
  Sparkles, 
  GraduationCap, 
  Heart,
  Globe,
  FileText,
  HelpCircle,
  Calculator,
  Search,
  Compass,
  Building2,
  BookOpen,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'ask-ai' | 'explore' | 'compare' | 'notices' | 'shortlist' | 'profile'
  const [exploreSubView, setExploreSubView] = useState('results'); // 'wizard' | 'results' | 'details'
  const [selectedUniId, setSelectedUniId] = useState('buet');
  const [preloadedAiQuery, setPreloadedAiQuery] = useState('');

  // User Profile
  const [userProfile, setUserProfile] = useState(initialUserProfile);

  // Shortlist and Compare State
  const [shortlist, setShortlist] = useState(['buet', 'du', 'ru']);
  const [compareList, setCompareList] = useState(['buet', 'du', 'ru']);

  // Modals state
  const [activeModalNoticeId, setActiveModalNoticeId] = useState(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [quickUniModalId, setQuickUniModalId] = useState(null);

  // Toast notifications
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Global keydown for Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle shortlist toggle
  const handleToggleShortlist = (uniId) => {
    const uni = universitiesData.find(u => u.id === uniId);
    const uniName = uni ? uni.name : 'University';

    if (shortlist.includes(uniId)) {
      setShortlist(prev => prev.filter(id => id !== uniId));
      showToast(`${uniName} removed from your shortlist. You can add it again from Explore.`, 'info');
    } else {
      setShortlist(prev => [...prev, uniId]);
      showToast(`Added ${uniName} to your shortlist!`, 'success');
    }
  };

  // Handle compare toggle
  const handleToggleCompare = (uniId) => {
    const uni = universitiesData.find(u => u.id === uniId);
    const uniCode = uni ? uni.code : 'University';

    if (compareList.includes(uniId)) {
      setCompareList(prev => prev.filter(id => id !== uniId));
      showToast(`${uniCode} removed from comparison.`);
    } else {
      if (compareList.length >= 4) {
        showToast("Maximum 4 universities can be compared at once.", "warning");
        return;
      }
      setCompareList(prev => [...prev, uniId]);
      showToast(`${uniCode} added to comparison dock.`);
    }
  };

  // Handle Select University Details
  const handleSelectUniversity = (uniId) => {
    setSelectedUniId(uniId);
    setActiveTab('explore');
    setExploreSubView('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Ask AI about a specific university or topic
  const handleAskAboutUni = (topicOrCode) => {
    setPreloadedAiQuery(`Tell me about admission requirements, eligibility, and GPA calculation for ${topicOrCode}`);
    setActiveTab('ask-ai');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle notice modal open
  const handleOpenNotice = (noticeId) => {
    setActiveModalNoticeId(noticeId);
    setActiveTab('notices');
  };

  // Direct tab switcher
  const handleNavigate = (tab, subView = null) => {
    setActiveTab(tab);
    if (subView) {
      setExploreSubView(subView);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="uniquery-app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#F8FAFC' }}>
      
      {/* Global Navigation Header */}
      <Header 
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        userProfile={userProfile}
        shortlistCount={shortlist.length}
        compareCount={compareList.length}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenNotice={handleOpenNotice}
      />

      {/* Main View Area */}
      <main style={{ flex: 1 }}>
        {/* HOME VIEW (Screen 1) */}
        {activeTab === 'home' && (
          <HomeView 
            onNavigate={handleNavigate}
            onSelectUniversity={handleSelectUniversity}
            onOpenNotice={handleOpenNotice}
            onSendAiMessage={(query) => {
              setPreloadedAiQuery(query);
              setActiveTab('ask-ai');
            }}
            onOpenQuickModal={(id) => setQuickUniModalId(id)}
            onOpenCalculator={() => setIsCalculatorOpen(true)}
          />
        )}

        {/* ASK AI VIEW (Screen 2) */}
        {activeTab === 'ask-ai' && (
          <AskAiView 
            userProfile={userProfile}
            onSelectUniversity={handleSelectUniversity}
            onToggleShortlist={handleToggleShortlist}
            shortlist={shortlist}
            preloadedQuery={preloadedAiQuery}
            onClearPreloadedQuery={() => setPreloadedAiQuery('')}
          />
        )}

        {/* EXPLORE VIEWS (Screens 3, 4, 5) */}
        {activeTab === 'explore' && (
          <>
            {/* Screen 3: Eligibility & Matching Wizard */}
            {exploreSubView === 'wizard' && (
              <ExploreWizard 
                userProfile={userProfile}
                onSaveProfile={(updatedProfile) => {
                  setUserProfile(updatedProfile);
                  setExploreSubView('results');
                  showToast("Profile & preferences updated! Calculated match scores.");
                }}
                onCancel={() => setExploreSubView('results')}
              />
            )}

            {/* Screen 4: Explore Results */}
            {exploreSubView === 'results' && (
              <ExploreResults 
                userProfile={userProfile}
                shortlist={shortlist}
                compareList={compareList}
                onToggleShortlist={handleToggleShortlist}
                onToggleCompare={handleToggleCompare}
                onSelectUniversity={handleSelectUniversity}
                onOpenWizard={() => setExploreSubView('wizard')}
                onNavigateToCompare={() => setActiveTab('compare')}
              />
            )}

            {/* Screen 5: University Details */}
            {exploreSubView === 'details' && (
              <UniversityDetailsView 
                uniId={selectedUniId}
                userProfile={userProfile}
                shortlist={shortlist}
                compareList={compareList}
                onToggleShortlist={handleToggleShortlist}
                onToggleCompare={handleToggleCompare}
                onBack={() => setExploreSubView('results')}
                onAskAboutUni={handleAskAboutUni}
              />
            )}
          </>
        )}

        {/* COMPARE VIEW (Screen 6) */}
        {activeTab === 'compare' && (
          <CompareView 
            compareList={compareList}
            shortlist={shortlist}
            onToggleCompare={handleToggleCompare}
            onToggleShortlist={handleToggleShortlist}
            onSelectUniversity={handleSelectUniversity}
            onAskAboutUni={handleAskAboutUni}
            onNavigate={handleNavigate}
          />
        )}

        {/* NOTICES & DEADLINES VIEW (Screen 7) */}
        {activeTab === 'notices' && (
          <NoticesView 
            onAskAboutUni={handleAskAboutUni}
            initialModalNoticeId={activeModalNoticeId}
            onCloseModalNotice={() => setActiveModalNoticeId(null)}
          />
        )}

        {/* SHORTLIST VIEW (Screen 8) */}
        {activeTab === 'shortlist' && (
          <ShortlistView 
            shortlist={shortlist}
            compareList={compareList}
            onToggleShortlist={handleToggleShortlist}
            onToggleCompare={handleToggleCompare}
            onSelectUniversity={handleSelectUniversity}
            onNavigate={handleNavigate}
          />
        )}

        {/* STUDENT PROFILE VIEW (Screen 9) */}
        {activeTab === 'profile' && (
          <ProfileView 
            userProfile={userProfile}
            onUpdateProfile={(updated) => setUserProfile(updated)}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Quick University Modal */}
      <QuickUniversityModal 
        uniId={quickUniModalId}
        isOpen={Boolean(quickUniModalId)}
        onClose={() => setQuickUniModalId(null)}
        onViewFullDetails={handleSelectUniversity}
        onToggleShortlist={handleToggleShortlist}
        onToggleCompare={handleToggleCompare}
        onAskAboutUni={handleAskAboutUni}
        isShortlisted={shortlist.includes(quickUniModalId)}
        isCompared={compareList.includes(quickUniModalId)}
      />

      {/* Instant Eligibility Calculator Modal */}
      <EligibilityCalculatorModal 
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        onExploreMatches={() => {
          setIsCalculatorOpen(false);
          setActiveTab('explore');
          setExploreSubView('results');
        }}
      />

      {/* Command Palette (Cmd + K) */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={handleNavigate}
        onSelectUniversity={handleSelectUniversity}
        onOpenNotice={handleOpenNotice}
        onAskAboutUni={handleAskAboutUni}
      />

      {/* Global Interactive Toast Notification */}
      {toast && (
        <div 
          className="animate-slide-up"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: toast.type === 'warning' ? '#FEF3C7' : '#0F172A',
            color: toast.type === 'warning' ? '#92400E' : '#FFFFFF',
            border: toast.type === 'warning' ? '1px solid #F59E0B' : '1px solid #334155',
            padding: '1rem 1.4rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            zIndex: 9999,
            maxWidth: '440px',
            backdropFilter: 'blur(8px)'
          }}
        >
          <div style={{
            color: toast.type === 'warning' ? '#D97706' : '#10B981',
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0
          }}>
            <CheckCircle size={20} />
          </div>
          <div style={{ fontSize: '0.9rem', fontWeight: 500, lineHeight: 1.4, flex: 1 }}>
            {toast.message}
          </div>
          <button 
            onClick={() => setToast(null)}
            style={{
              background: 'none',
              border: 'none',
              color: toast.type === 'warning' ? '#92400E' : '#94A3B8',
              cursor: 'pointer',
              padding: '0.2rem',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* UniQuery Footer styled with UITS Dark Maroon & Navy Theme */}
      <footer className="ftco-footer" style={{ marginTop: 'auto' }}>
        <div style={{ maxWidth: '1380px', margin: '0 auto' }}>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem'
          }}>
            {/* Col 1: Brand & Mission */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <img 
                  src={logoImg} 
                  alt="UniQuery Logo" 
                  style={{ height: '38px', width: 'auto', objectFit: 'contain' }} 
                />
                <div>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>
                    UniQuery
                  </span>
                  <span style={{ display: 'block', fontSize: '0.7rem', color: '#E5A823', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Ask · Explore · Choose
                  </span>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#94A3B8', marginBottom: '1.25rem' }}>
                Bangladesh's premier AI-powered university discovery and admission assistant. Helping prospective undergraduate students match eligibility, track deadlines, and navigate admissions with verified UGC circulars.
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(146, 30, 51, 0.25)', border: '1px solid rgba(146, 30, 51, 0.5)', padding: '0.35rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', color: '#FDF3D6' }}>
                <Sparkles size={13} color="#E5A823" />
                Built for SPDD Project Specification
              </div>
            </div>

            {/* Col 2: Platform Features */}
            <div>
              <h2 className="ftco-heading-2">
                <Compass size={18} color="#E5A823" />
                <span>Admission Tools</span>
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem' }}>
                <li>
                  <button 
                    onClick={() => handleNavigate('home')} 
                    style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer', padding: 0, fontSize: '0.85rem', textAlign: 'left' }}
                  >
                    Home Overview
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigate('ask-ai')} 
                    style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer', padding: 0, fontSize: '0.85rem', textAlign: 'left' }}
                  >
                    Ask AI Admission Assistant
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigate('explore', 'wizard')} 
                    style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer', padding: 0, fontSize: '0.85rem', textAlign: 'left' }}
                  >
                    Eligibility Matching Wizard
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigate('compare')} 
                    style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer', padding: 0, fontSize: '0.85rem', textAlign: 'left' }}
                  >
                    Side-by-Side Comparison Matrix
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigate('notices')} 
                    style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer', padding: 0, fontSize: '0.85rem', textAlign: 'left' }}
                  >
                    Official Circulars &amp; Deadlines
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setIsCalculatorOpen(true)}
                    style={{ background: 'none', border: 'none', color: '#E5A823', cursor: 'pointer', padding: 0, fontSize: '0.85rem', fontWeight: 700, textAlign: 'left' }}
                  >
                    Instant GPA &amp; Eligibility Calculator ↗
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Indexed Universities */}
            <div>
              <h2 className="ftco-heading-2">
                <Building2 size={18} color="#E5A823" />
                <span>Featured Universities</span>
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem' }}>
                <li>
                  <button 
                    onClick={() => handleSelectUniversity('buet')}
                    style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer', padding: 0, fontSize: '0.85rem', textAlign: 'left' }}
                  >
                    BUET — Bangladesh Univ. of Eng &amp; Tech
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleSelectUniversity('du')}
                    style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer', padding: 0, fontSize: '0.85rem', textAlign: 'left' }}
                  >
                    University of Dhaka (DU)
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleSelectUniversity('ru')}
                    style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer', padding: 0, fontSize: '0.85rem', textAlign: 'left' }}
                  >
                    Rajshahi University (RU)
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleSelectUniversity('kuet')}
                    style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer', padding: 0, fontSize: '0.85rem', textAlign: 'left' }}
                  >
                    CKRUET Engineering Cluster
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleSelectUniversity('nsu')}
                    style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer', padding: 0, fontSize: '0.85rem', textAlign: 'left' }}
                  >
                    North South University (NSU)
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigate('explore')}
                    style={{ background: 'none', border: 'none', color: '#E5A823', cursor: 'pointer', padding: 0, fontSize: '0.85rem', fontWeight: 600, textAlign: 'left' }}
                  >
                    View All 50+ Universities →
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Data Credibility & Verification */}
            <div>
              <h2 className="ftco-heading-2">
                <BookOpen size={18} color="#E5A823" />
                <span>Data &amp; Verification</span>
              </h2>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.5, color: '#94A3B8', marginBottom: '1rem' }}>
                All eligibility criteria, circular deadlines, and fee estimates are indexed directly from official University Grants Commission (UGC) Bangladesh publications and university admission portals.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.825rem', color: '#CBD5E1' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={15} color="#10B981" />
                  Synced with 2026/2027 Circulars
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldCheck size={15} color="#E5A823" />
                  Direct PDF &amp; Official Citations
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sparkles size={15} color="#921E33" />
                  AI Responses Grounded in Fact
                </span>
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', margin: '2rem 0' }} />

          {/* Contact Bar & Socials */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            alignItems: 'center',
            marginBottom: '2.5rem'
          }}>
            {/* Helpdesk Info */}
            <div>
              <div style={{ fontSize: '0.9rem', color: '#FFFFFF', fontWeight: 700, marginBottom: '6px' }}>
                Admission Helpdesk &amp; Support:
              </div>
              <div style={{ fontSize: '0.825rem', color: '#94A3B8', lineHeight: 1.5 }}>
                Dhaka, Bangladesh · Available Daily 9:00 AM – 9:00 PM BST<br />
                Hotline: +880 17 1234 5678 · support@uniquery.edu.bd
              </div>
            </div>

            {/* Newsletter Subscribe */}
            <div>
              <div style={{ fontSize: '0.9rem', color: '#FFFFFF', fontWeight: 700, marginBottom: '8px' }}>
                Subscribe for Admission Bulletins:
              </div>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  showToast("Thank you for subscribing to UniQuery admission circular updates!");
                }}
                style={{ display: 'flex', background: '#FFFFFF', borderRadius: '50px', overflow: 'hidden', padding: '3px' }}
              >
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  required 
                  style={{ flex: 1, border: 'none', outline: 'none', padding: '0 16px', fontSize: '0.825rem', color: '#1E293B' }} 
                />
                <button 
                  type="submit" 
                  style={{ background: '#921E33', color: '#FFFFFF', border: 'none', borderRadius: '50px', padding: '8px 18px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Social Icons */}
            <div>
              <div style={{ fontSize: '0.9rem', color: '#FFFFFF', fontWeight: 700, marginBottom: '8px' }}>
                Connect With UniQuery:
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon fb" title="Facebook">
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon tw" title="Twitter / X">
                  <i className="fa-brands fa-x-twitter"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon inst" title="Instagram">
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-icon yt" title="YouTube">
                  <i className="fa-brands fa-youtube"></i>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon ln" title="LinkedIn">
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '1.5rem',
            textAlign: 'center',
            fontSize: '0.8rem',
            color: 'rgba(255,255,255,0.6)'
          }}>
            &copy; 2026 UniQuery · Built with precision according to SPDD System Requirements &amp; Visual Specifications. All Rights Reserved.
          </div>

        </div>
      </footer>

    </div>
  );
}
