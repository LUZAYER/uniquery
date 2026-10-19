import React, { useState } from 'react';
import { 
  Bell, 
  ExternalLink, 
  X, 
  Filter, 
  Calendar as CalendarIcon, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { noticesData } from '../data/notices';
import { universitiesData } from '../data/universities';

export default function NoticesView({ activeModalNoticeId, onCloseModalNotice, onOpenNotice }) {
  const [selectedUni, setSelectedUni] = useState('All universities');
  const [selectedProg, setSelectedProg] = useState('All programs');
  const [selectedType, setSelectedType] = useState('Undergraduate');
  const [selectedStatus, setSelectedStatus] = useState('All statuses');
  const [selectedDate, setSelectedDate] = useState('Next 60 days');
  const [alertSuccessToast, setAlertSuccessToast] = useState(false);

  // Filtered notices
  const filteredNotices = noticesData.filter(n => {
    if (selectedUni !== 'All universities' && n.code !== selectedUni) return false;
    if (selectedProg !== 'All programs' && !n.program.toLowerCase().includes(selectedProg.toLowerCase())) return false;
    if (selectedStatus !== 'All statuses' && n.status !== selectedStatus) return false;
    return true;
  });

  const activeNotice = noticesData.find(n => n.id === activeModalNoticeId);

  const handleClear = () => {
    setSelectedUni('All universities');
    setSelectedProg('All programs');
    setSelectedType('Undergraduate');
    setSelectedStatus('All statuses');
    setSelectedDate('Next 60 days');
  };

  const handleSetAlert = () => {
    setAlertSuccessToast(true);
    setTimeout(() => setAlertSuccessToast(false), 3000);
  };

  return (
    <div className="notices-view-container">
      {/* Header */}
      <div className="page-header-block" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <span className="page-category-tag">STAY ON TRACK</span>
          <h1 className="page-main-title">Admission Notices & Deadlines</h1>
          <p className="page-main-desc">
            Track official admission updates, application windows and upcoming deadlines in one place.
          </p>
        </div>
        <button className="btn-secondary" onClick={handleSetAlert}>
          <Bell size={16} />
          <span>Set deadline alert</span>
        </button>
      </div>

      {/* Filter Card */}
      <div className="notices-filter-box">
        <div className="notices-filter-grid">
          <div className="form-field-group">
            <label className="field-label">University</label>
            <select 
              className="select-standard" 
              value={selectedUni} 
              onChange={(e) => setSelectedUni(e.target.value)}
            >
              <option value="All universities">All universities</option>
              <option value="BUET">BUET</option>
              <option value="DU">DU</option>
              <option value="RU">RU</option>
              <option value="CU">CU</option>
              <option value="NSTU">NSTU</option>
              <option value="KUET">KUET</option>
            </select>
          </div>

          <div className="form-field-group">
            <label className="field-label">Program</label>
            <select 
              className="select-standard" 
              value={selectedProg} 
              onChange={(e) => setSelectedProg(e.target.value)}
            >
              <option value="All programs">All programs</option>
              <option value="CSE">CSE / Engineering</option>
              <option value="Science Unit">Science Unit</option>
              <option value="GST">GST Cluster</option>
            </select>
          </div>

          <div className="form-field-group">
            <label className="field-label">Admission Type</label>
            <select 
              className="select-standard" 
              value={selectedType} 
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="Undergraduate">Undergraduate</option>
              <option value="Postgraduate">Postgraduate</option>
            </select>
          </div>

          <div className="form-field-group">
            <label className="field-label">Status</label>
            <select 
              className="select-standard" 
              value={selectedStatus} 
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="All statuses">All statuses</option>
              <option value="Closing Soon">Closing Soon</option>
              <option value="Active">Active</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div className="form-field-group">
            <label className="field-label">Date</label>
            <select 
              className="select-standard" 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              <option value="Next 60 days">Next 60 days</option>
              <option value="Next 30 days">Next 30 days</option>
              <option value="All dates">All dates</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
          <span style={{ fontSize: '0.85rem', color: '#64748B' }}>
            Showing {filteredNotices.length} of {noticesData.length} official notices
          </span>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn-secondary" onClick={handleClear} style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
              Clear
            </button>
            <button className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
              <Filter size={14} />
              <span>Apply Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Notices Table */}
      <div className="notices-table-container">
        <table className="notices-table">
          <thead>
            <tr>
              <th style={{ width: '120px' }}>University</th>
              <th style={{ width: '160px' }}>Program</th>
              <th>Notice Title</th>
              <th style={{ width: '140px' }}>Deadline</th>
              <th style={{ width: '130px' }}>Status</th>
              <th style={{ width: '130px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotices.map((notice) => {
              const uni = universitiesData.find(u => u.id === notice.universityId);
              return (
                <tr key={notice.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div 
                        className="uni-badge-square" 
                        style={{ backgroundColor: uni?.badgeBg || '#2563EB', padding: '3px 8px', fontSize: '0.75rem' }}
                      >
                        {notice.code}
                      </div>
                      <strong style={{ fontSize: '0.85rem', color: '#0F172A' }}>{notice.code}</strong>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.85rem', color: '#334155', fontWeight: 500 }}>
                      {notice.program}
                    </span>
                  </td>
                  <td>
                    <div>
                      <div style={{ fontSize: '0.925rem', fontWeight: 700, color: '#0F172A' }}>
                        {notice.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>
                        {notice.source}
                      </div>
                    </div>
                  </td>
                  <td>
                    <strong style={{ color: notice.status === 'Closing Soon' ? '#D97706' : '#0F172A', fontSize: '0.9rem' }}>
                      {notice.deadline}
                    </strong>
                  </td>
                  <td>
                    <span className={`badge-pill-status ${notice.statusType}`}>
                      {notice.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn-secondary" 
                      style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                      onClick={() => onOpenNotice(notice.id)}
                    >
                      View Notice
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Upcoming Deadlines Calendar Cards Section */}
      <section style={{ marginTop: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div>
            <h2 className="page-main-title" style={{ fontSize: '1.5rem', marginBottom: '2px' }}>Upcoming Deadlines</h2>
            <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
              Important dates from your shortlist and preferences
            </p>
          </div>
          <span style={{ fontSize: '0.875rem', color: 'var(--color-primary)', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>Open calendar</span>
            <ArrowRight size={16} />
          </span>
        </div>

        <div className="deadlines-calendar-grid">
          {noticesData.filter(n => n.daysLeft > 0).slice(0, 4).map(notice => {
            const uni = universitiesData.find(u => u.id === notice.universityId);
            return (
              <div 
                key={notice.id} 
                className="deadline-calendar-card"
                onClick={() => onOpenNotice(notice.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="calendar-card-header">
                  <div 
                    className="uni-badge-square" 
                    style={{ backgroundColor: uni?.badgeBg || '#2563EB', padding: '6px 12px', fontSize: '0.9rem' }}
                  >
                    {notice.code}
                  </div>
                  <div className="calendar-date-display">
                    <span className="cal-day">{notice.calendarDate.day}</span>
                    <span className="cal-month">{notice.calendarDate.month}</span>
                  </div>
                </div>

                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0F172A', marginBottom: '14px' }}>
                  {notice.program} application
                </div>

                <div style={{ marginTop: 'auto' }}>
                  <span className={`badge-pill-status ${notice.statusType}`}>
                    {notice.daysLeft} days left
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Notice Details Modal Dialog */}
      {activeNotice && (
        <div className="modal-overlay" onClick={onCloseModalNotice}>
          <div className="notice-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={onCloseModalNotice} title="Close modal">
              <X size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div 
                className="uni-badge-square" 
                style={{ 
                  backgroundColor: universitiesData.find(u => u.id === activeNotice.universityId)?.badgeBg || '#2563EB', 
                  padding: '6px 14px', 
                  fontSize: '0.95rem' 
                }}
              >
                {activeNotice.code}
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.08em', color: '#64748B', textTransform: 'uppercase' }}>
                  NOTICE DETAILS · OFFICIAL
                </span>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A' }}>
                  {activeNotice.universityName}
                </div>
              </div>
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', marginBottom: '12px', lineHeight: 1.3 }}>
              {activeNotice.title}
            </h2>

            <p style={{ color: '#334155', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px' }}>
              {activeNotice.summary}
            </p>

            <p style={{ color: '#64748B', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '24px' }}>
              {activeNotice.fullDescription}
            </p>

            {/* Amber Deadline & Status Box */}
            <div style={{
              background: '#FFFBEB',
              border: '1px solid #FDE68A',
              borderRadius: '12px',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px'
            }}>
              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#B45309', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  DEADLINE
                </span>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#92400E' }}>
                  {activeNotice.deadline} · {activeNotice.deadlineTime}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#B45309', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  STATUS
                </span>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: activeNotice.status === 'Closing Soon' ? '#D97706' : '#15803D' }}>
                  {activeNotice.status}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
              <button className="btn-secondary" onClick={onCloseModalNotice}>
                Close
              </button>

              <a 
                href={activeNotice.officialUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="btn-primary"
              >
                <span>Open Official Notice</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Alert confirmation toast */}
      {alertSuccessToast && (
        <div className="floating-toast-alert">
          <CheckCircle2 size={20} className="toast-icon" />
          <div>
            <div className="toast-title">Deadline alert enabled</div>
            <div className="toast-sub">You will receive reminders before critical application cutoffs.</div>
          </div>
        </div>
      )}
    </div>
  );
}
