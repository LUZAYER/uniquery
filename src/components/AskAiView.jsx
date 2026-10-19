import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  RotateCcw, 
  MoreHorizontal, 
  Paperclip, 
  ArrowUp, 
  ExternalLink, 
  ThumbsUp, 
  ThumbsDown, 
  Copy, 
  Check, 
  Lightbulb,
  Mic,
  MicOff,
  Download,
  Share2,
  Bookmark,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { suggestedQuestions, getBotResponse } from '../data/chatKnowledge';
import { universitiesData } from '../data/universities';

export default function AskAiView({ 
  userProfile, 
  onSelectUniversity, 
  initialQuery = '', 
  preloadedQuery = '', 
  onClearPreloadedQuery 
}) {
  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      sender: 'user',
      text: 'Which universities offer CSE for Science students?'
    },
    {
      id: 'msg-2',
      sender: 'assistant',
      text: 'Yes — several leading public universities offer Computer Science & Engineering to Science group students. Based on current admission information, these are strong options:',
      universityIds: ['buet', 'du', 'ru', 'cu'],
      officialSource: 'BUET, DU, RU & CU undergraduate admission portals · Last updated 24 Sep 2026',
      feedback: null
    }
  ]);

  const [inputVal, setInputVal] = useState(initialQuery || '');
  const [isTyping, setIsTyping] = useState(false);
  const [usingProfile, setUsingProfile] = useState(true);
  const [copiedId, setCopiedId] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [chatToast, setChatToast] = useState(null);
  const chatStreamRef = useRef(null);

  // Auto-scroll chat
  useEffect(() => {
    if (chatStreamRef.current) {
      chatStreamRef.current.scrollTop = chatStreamRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Handle preloaded query from other views
  useEffect(() => {
    if (preloadedQuery && preloadedQuery.trim()) {
      handleSend(preloadedQuery.trim());
      if (onClearPreloadedQuery) {
        onClearPreloadedQuery();
      }
    }
  }, [preloadedQuery]);

  const handleSend = (queryText) => {
    const textToSend = queryText || inputVal;
    if (!textToSend.trim() || isTyping) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Simulate AI thinking and source verification latency
    setTimeout(() => {
      const responseData = getBotResponse(textToSend, usingProfile, userProfile);
      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: responseData.text,
        universityIds: responseData.universityIds,
        officialSource: responseData.officialSource,
        feedback: null
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'msg-reset',
        sender: 'assistant',
        text: 'Hello! I am UniQuery Assistant. Ask me anything about university admission requirements, tuition fees, deadlines, or programs in Bangladesh.',
        feedback: null
      }
    ]);
  };

  const handleFeedback = (msgId, type) => {
    setMessages(prev => prev.map(m => {
      if (m.id === msgId) {
        return { ...m, feedback: m.feedback === type ? null : type };
      }
      return m;
    }));
    setChatToast(`Thank you for your feedback! This helps improve admission guidance.`);
    setTimeout(() => setChatToast(null), 3000);
  };

  const handleCopyText = (msgId, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(msgId);
    setChatToast('Answer copied to clipboard!');
    setTimeout(() => {
      setCopiedId(null);
      setChatToast(null);
    }, 2000);
  };

  const toggleVoice = () => {
    if (!isListening) {
      setIsListening(true);
      setInputVal('What is the minimum GPA for BUET CSE?');
      setTimeout(() => {
        setIsListening(false);
      }, 2000);
    } else {
      setIsListening(false);
    }
  };

  return (
    <div className="ask-ai-view-container animate-fade-in" style={{ padding: '2rem 0 5rem 0' }}>
      <div className="container">

        {/* Page Header */}
        <div className="page-header-block" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <span className="page-category-tag">AI ADMISSION ASSISTANT</span>
            <h1 className="page-main-title">Ask UniQuery</h1>
            <p className="page-main-desc">
              Get clear, instant admission guidance verified against official 2026/2027 university circulars and UGC Bangladesh guidelines.
            </p>
          </div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '9999px',
            background: '#ECFDF5',
            border: '1px solid #A7F3D0',
            color: '#065F46',
            fontSize: '0.85rem',
            fontWeight: 700
          }}>
            <ShieldCheck size={18} color="#059669" />
            <span>Sources 100% verified</span>
          </div>
        </div>

        {/* Main 2-Column Chat Layout */}
        <div className="ask-ai-layout" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 340px',
          gap: '24px',
          alignItems: 'start'
        }}>
          
          {/* Left Column: Interactive Chat Box */}
          <div className="chat-container-card" style={{
            background: 'white',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            height: '680px',
            overflow: 'hidden'
          }}>
            
            {/* Chat Card Header */}
            <div className="chat-card-topbar" style={{
              padding: '16px 20px',
              borderBottom: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#FAFAFA'
            }}>
              <div className="chat-agent-info" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="chat-agent-avatar" style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'var(--color-primary)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Sparkles size={20} />
                </div>
                <div>
                  <div className="chat-agent-title" style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                    UniQuery Admission AI
                  </div>
                  <div className="chat-agent-status" style={{ fontSize: '0.75rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
                    <span>Online · Synchronized with 2026 Circulars</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  className="icon-btn-round" 
                  title="Restart conversation"
                  onClick={handleResetChat}
                  style={{ width: '34px', height: '34px' }}
                >
                  <RotateCcw size={15} />
                </button>
              </div>
            </div>

            {/* Chat Stream Body */}
            <div className="chat-stream-body" ref={chatStreamRef} style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              {messages.map((msg) => {
                if (msg.sender === 'user') {
                  return (
                    <div key={msg.id} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <div style={{
                        background: 'var(--color-primary)',
                        color: 'white',
                        padding: '12px 18px',
                        borderRadius: '18px 18px 4px 18px',
                        fontSize: '0.95rem',
                        fontWeight: 500,
                        maxWidth: '85%',
                        lineHeight: 1.5,
                        boxShadow: '0 2px 6px rgba(146, 30, 51, 0.2)'
                      }}>
                        {msg.text}
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={msg.id} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'var(--color-primary-light)',
                      color: 'var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}>
                      <Sparkles size={16} />
                    </div>

                    <div style={{ flex: 1, maxWidth: '92%' }}>
                      <div style={{
                        background: '#F8FAFC',
                        border: '1px solid var(--border-light)',
                        borderRadius: '16px',
                        padding: '16px 18px',
                        fontSize: '0.925rem',
                        color: 'var(--text-main)',
                        lineHeight: 1.6,
                        marginBottom: '10px'
                      }}>
                        {msg.text}
                      </div>

                      {/* University Recommendation Cards embedded inside response */}
                      {msg.universityIds && msg.universityIds.length > 0 && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '12px' }}>
                          {msg.universityIds.map(uniId => {
                            const uni = universitiesData.find(u => u.id === uniId);
                            if (!uni) return null;
                            return (
                              <div 
                                key={uni.id} 
                                style={{
                                  background: 'white',
                                  border: '1px solid var(--border-light)',
                                  borderRadius: '12px',
                                  padding: '12px 14px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  boxShadow: 'var(--shadow-sm)'
                                }}
                              >
                                <div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span style={{ fontWeight: 800, fontSize: '0.8rem', color: 'var(--color-primary)' }}>{uni.code}</span>
                                    <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-main)' }}>{uni.name.split(' ')[0]}</span>
                                  </div>
                                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                                    {uni.matchScore}% Match · {uni.location}
                                  </div>
                                </div>
                                <button 
                                  onClick={() => onSelectUniversity(uni.id)}
                                  style={{
                                    background: 'var(--color-primary-light)',
                                    color: 'var(--color-primary)',
                                    border: 'none',
                                    borderRadius: '6px',
                                    padding: '4px 8px',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    cursor: 'pointer'
                                  }}
                                >
                                  Details
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Official Source Card */}
                      {msg.officialSource && (
                        <div style={{
                          background: '#ECFDF5',
                          border: '1px solid #A7F3D0',
                          borderRadius: '8px',
                          padding: '10px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: '10px'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ShieldCheck size={16} color="#059669" />
                            <div>
                              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#065F46' }}>Official Citation</div>
                              <div style={{ fontSize: '0.72rem', color: '#047857' }}>{msg.officialSource}</div>
                            </div>
                          </div>
                          <ExternalLink size={14} color="#059669" style={{ cursor: 'pointer' }} />
                        </div>
                      )}

                      {/* Action Row: Feedback & Copy */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.75rem', color: '#94A3B8' }}>
                        <button 
                          onClick={() => handleCopyText(msg.id, msg.text)}
                          style={{ background: 'none', border: 'none', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
                        >
                          {copiedId === msg.id ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
                          <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                        </button>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <button 
                            onClick={() => handleFeedback(msg.id, 'up')}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: msg.feedback === 'up' ? '#10B981' : '#94A3B8' }}
                            title="Helpful"
                          >
                            <ThumbsUp size={14} />
                          </button>
                          <button 
                            onClick={() => handleFeedback(msg.id, 'down')}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: msg.feedback === 'down' ? '#EF4444' : '#94A3B8' }}
                            title="Not helpful"
                          >
                            <ThumbsDown size={14} />
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'var(--color-primary-light)',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Sparkles size={16} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', fontSize: '0.85rem' }}>
                    <div className="typing-dots">
                      <span /><span /><span />
                    </div>
                    <span>Researching published 2026 circulars...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input Bar */}
            <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border-light)', background: '#FAFAFA' }}>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'white',
                  border: '1.5px solid var(--color-primary)',
                  borderRadius: 'var(--radius-full)',
                  padding: '6px 8px 6px 14px',
                  boxShadow: '0 2px 6px rgba(146, 30, 51, 0.12)'
                }}
              >
                <button 
                  type="button" 
                  onClick={toggleVoice}
                  style={{
                    background: isListening ? '#FEE2E2' : 'none',
                    border: 'none',
                    color: isListening ? '#DC2626' : '#94A3B8',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '50%'
                  }}
                  title={isListening ? "Listening..." : "Simulate voice input"}
                >
                  {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                </button>

                <input 
                  type="text" 
                  placeholder={isListening ? "Listening to your voice..." : "Ask a question about eligibility, tuition, quota, units..."} 
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    fontSize: '0.9rem',
                    color: 'var(--text-main)',
                    background: 'transparent'
                  }}
                />

                <button 
                  type="submit" 
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'var(--color-primary)',
                    border: 'none',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  title="Send message"
                >
                  <ArrowUp size={18} />
                </button>
              </form>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', fontSize: '0.72rem', color: '#94A3B8' }}>
                <span>UniQuery AI answers are cross-referenced with UGC Bangladesh data.</span>
                {chatToast && <span style={{ color: '#059669', fontWeight: 600 }}>{chatToast}</span>}
              </div>
            </div>

          </div>

          {/* Right Column: Suggested Questions & Profile Context */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Card 1: Suggested Questions */}
            <div style={{
              background: 'white',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-xl)',
              padding: '20px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Lightbulb size={18} color="#F59E0B" />
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                  Suggested Questions
                </h3>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
                Click any topic to get immediate cited answers:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {suggestedQuestions.map((q, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => handleSend(q)}
                    style={{
                      textAlign: 'left',
                      background: '#F8FAFC',
                      border: '1px solid var(--border-light)',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      fontSize: '0.825rem',
                      fontWeight: 600,
                      color: '#334155',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-primary-light)';
                      e.currentTarget.style.borderColor = 'var(--color-primary)';
                      e.currentTarget.style.color = 'var(--color-primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#F8FAFC';
                      e.currentTarget.style.borderColor = 'var(--border-light)';
                      e.currentTarget.style.color = '#334155';
                    }}
                  >
                    <span>{q}</span>
                    <ChevronRight size={14} style={{ opacity: 0.5, flexShrink: 0 }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Card 2: Using Your Profile (Dark Slate) */}
            <div style={{
              background: '#0F172A',
              color: 'white',
              borderRadius: 'var(--radius-xl)',
              padding: '20px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0 }}>
                  Using Your Profile
                </h3>
                <div 
                  onClick={() => setUsingProfile(!usingProfile)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '4px 10px',
                    borderRadius: '9999px'
                  }}
                  title="Toggle profile personalization"
                >
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: usingProfile ? '#34D399' : '#94A3B8' }}>
                    {usingProfile ? 'ACTIVE' : 'MUTED'}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.825rem', color: '#CBD5E1' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} color="#34D399" />
                  <span>{userProfile.group || 'Science'} group student</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} color="#34D399" />
                  <span>SSC GPA {userProfile.sscGpa || '5.00'} · HSC GPA {userProfile.hscGpa || '4.83'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} color="#34D399" />
                  <span>Budget: {userProfile.budget || '৳5–10 Lakh total'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} color="#34D399" />
                  <span>Target: {userProfile.preferredProgram || 'CSE'}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
