import React, { useState } from 'react';
import { 
  User, 
  GraduationCap, 
  Sliders, 
  Bell, 
  Shield, 
  CheckCircle2, 
  Edit3, 
  Save, 
  X, 
  MapPin, 
  Phone, 
  Mail, 
  BookOpen, 
  Award, 
  Sparkles,
  Check
} from 'lucide-react';

export default function ProfileView({ userProfile, onUpdateProfile, onShowToast }) {
  const [activeSection, setActiveSection] = useState('personal');
  const [isEditingPersonal, setIsEditingPersonal] = useState(true);
  const [isEditingAcademic, setIsEditingAcademic] = useState(false);
  const [isEditingPreferences, setIsEditingPreferences] = useState(false);

  // Form states
  const [personalForm, setPersonalForm] = useState({
    name: userProfile.fullName || userProfile.name || '',
    email: userProfile.email || '',
    phone: userProfile.phone || '',
    city: userProfile.city || ''
  });

  const [academicForm, setAcademicForm] = useState({
    sscGpa: userProfile.sscGpa != null ? String(userProfile.sscGpa) : '',
    hscGpa: userProfile.hscGpa != null ? String(userProfile.hscGpa) : '',
    group: userProfile.academicGroup || userProfile.group || '',
    sscBoard: userProfile.sscBoard || '',
    hscBoard: userProfile.hscBoard || '',
    passingYear: userProfile.passingYear != null ? String(userProfile.passingYear) : '',
    coreSubjects: userProfile.coreSubjects || ''
  });

  const [preferencesForm, setPreferencesForm] = useState({
    uniType: userProfile.universityType || userProfile.preferredUniType || 'Both Public and Private',
    budget: userProfile.budgetRange || userProfile.budget || '',
    locations: userProfile.preferredLocations && userProfile.preferredLocations.length > 0 ? userProfile.preferredLocations.join(', ') : (userProfile.locations ? userProfile.locations.join(', ') : ''),
    program: userProfile.preferredProgram || 'Computer Science & Engineering'
  });

  const handleSavePersonal = (e) => {
    e?.preventDefault();
    onUpdateProfile({
      ...userProfile,
      ...personalForm
    });
    setIsEditingPersonal(false);
    onShowToast("Profile changes saved. Your eligibility matches have been refreshed.");
  };

  const handleSaveAcademic = (e) => {
    e?.preventDefault();
    onUpdateProfile({
      ...userProfile,
      ...academicForm
    });
    setIsEditingAcademic(false);
    onShowToast("Academic criteria updated. Match scores recalculated.");
  };

  const handleSavePreferences = (e) => {
    e?.preventDefault();
    onUpdateProfile({
      ...userProfile,
      preferredUniType: preferencesForm.uniType,
      budget: preferencesForm.budget,
      locations: preferencesForm.locations.split(',').map(s => s.trim()),
      preferredProgram: preferencesForm.program
    });
    setIsEditingPreferences(false);
    onShowToast("Preferences updated. Recommendation feed tailored.");
  };

  return (
    <div className="profile-view-container animate-fade-in" style={{ padding: '2.5rem 0 5rem 0' }}>
      <div className="container">

        {/* Top Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <span style={{ 
            fontSize: '0.8rem', 
            fontWeight: 700, 
            letterSpacing: '0.08em', 
            color: 'var(--primary-color)',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '0.35rem'
          }}>
            ACCOUNT & PREFERENCES
          </span>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '0.5rem' }}>
            Student Profile
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '620px', lineHeight: 1.5 }}>
            Keep your academic details and preferences accurate for better eligibility matches and recommendations.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(260px, 320px) 1fr',
          gap: '2rem',
          alignItems: 'start'
        }} className="profile-layout-grid">

          {/* Left Sidebar */}
          <div style={{
            background: 'white',
            borderRadius: 'var(--radius-xl)',
            padding: '1.75rem',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)',
            position: 'sticky',
            top: '90px'
          }}>
            {/* Avatar & Basics */}
            <div style={{ textAlign: 'center', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
              <div style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                color: 'white',
                fontSize: '1.75rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto',
                boxShadow: '0 8px 16px rgba(146, 30, 51, 0.25)'
              }}>
                {(personalForm.name || 'UQ').split(' ').filter(Boolean).map(n => n[0]).slice(0, 2).join('').toUpperCase() || 'UQ'}
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '0.2rem' }}>
                {personalForm.name || 'Applicant Profile'}
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                {personalForm.email || 'Email not set'}
              </p>

              {/* Profile completion badge */}
              <div style={{
                background: '#ECFDF5',
                color: '#059669',
                padding: '0.45rem 1rem',
                borderRadius: '9999px',
                fontSize: '0.85rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                border: '1px solid #A7F3D0'
              }}>
                <CheckCircle2 size={16} />
                Profile {userProfile.profileCompletion || (personalForm.name ? 50 : 0)}% complete
              </div>
            </div>

            {/* Sidebar Navigation */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1.5rem' }}>
              <button
                onClick={() => setActiveSection('personal')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  background: activeSection === 'personal' ? 'var(--primary-light)' : 'transparent',
                  color: activeSection === 'personal' ? 'var(--primary-color)' : 'var(--text-muted)',
                  fontWeight: activeSection === 'personal' ? 700 : 500,
                  fontSize: '0.9rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <User size={18} />
                Personal details
              </button>

              <button
                onClick={() => setActiveSection('academic')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  background: activeSection === 'academic' ? 'var(--primary-light)' : 'transparent',
                  color: activeSection === 'academic' ? 'var(--primary-color)' : 'var(--text-muted)',
                  fontWeight: activeSection === 'academic' ? 700 : 500,
                  fontSize: '0.9rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <GraduationCap size={18} />
                Academic profile
              </button>

              <button
                onClick={() => setActiveSection('preferences')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  background: activeSection === 'preferences' ? 'var(--primary-light)' : 'transparent',
                  color: activeSection === 'preferences' ? 'var(--primary-color)' : 'var(--text-muted)',
                  fontWeight: activeSection === 'preferences' ? 700 : 500,
                  fontSize: '0.9rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <Sliders size={18} />
                Preferences
              </button>

              <button
                onClick={() => setActiveSection('notifications')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  background: activeSection === 'notifications' ? 'var(--primary-light)' : 'transparent',
                  color: activeSection === 'notifications' ? 'var(--primary-color)' : 'var(--text-muted)',
                  fontWeight: activeSection === 'notifications' ? 700 : 500,
                  fontSize: '0.9rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <Bell size={18} />
                Notifications
              </button>

              <button
                onClick={() => setActiveSection('privacy')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  background: activeSection === 'privacy' ? 'var(--primary-light)' : 'transparent',
                  color: activeSection === 'privacy' ? 'var(--primary-color)' : 'var(--text-muted)',
                  fontWeight: activeSection === 'privacy' ? 700 : 500,
                  fontSize: '0.9rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <Shield size={18} />
                Privacy & security
              </button>
            </div>

            <div style={{ paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)', fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              Last updated 24 Sep 2026
            </div>
          </div>

          {/* Right Main Content Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* CARD 1: Personal Information (Inline Edit State as in Mockup) */}
            <div id="personal" style={{
              background: 'white',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                      Personal Information
                    </h2>
                    {isEditingPersonal && (
                      <span style={{
                        background: 'var(--color-primary-light)',
                        color: 'var(--color-primary)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.6rem',
                        borderRadius: '9999px',
                        border: '1px solid var(--color-primary-subtle)'
                      }}>
                        Editing
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    {isEditingPersonal ? 'Inline edit state' : 'Manage your contact details'}
                  </p>
                </div>

                {!isEditingPersonal && (
                  <button 
                    onClick={() => setIsEditingPersonal(true)}
                    className="btn btn-secondary"
                    style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}
                  >
                    <Edit3 size={15} />
                    Edit Profile
                  </button>
                )}
              </div>

              {isEditingPersonal ? (
                <form onSubmit={handleSavePersonal}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                    {/* Full Name */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dark)' }}>
                          Full Name
                        </label>
                        <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                          <Check size={12} /> Looks good
                        </span>
                      </div>
                      <input 
                        type="text"
                        value={personalForm.name}
                        onChange={(e) => setPersonalForm({ ...personalForm, name: e.target.value })}
                        className="form-control"
                        style={{ padding: '0.75rem 1rem', width: '100%', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--primary-color)' }}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dark)' }}>
                          Email Address
                        </label>
                        <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                          <Check size={12} /> Looks good
                        </span>
                      </div>
                      <input 
                        type="email"
                        value={personalForm.email}
                        onChange={(e) => setPersonalForm({ ...personalForm, email: e.target.value })}
                        className="form-control"
                        style={{ padding: '0.75rem 1rem', width: '100%', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--primary-color)' }}
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dark)' }}>
                          Phone Number
                        </label>
                        <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                          <Check size={12} /> Looks good
                        </span>
                      </div>
                      <input 
                        type="text"
                        value={personalForm.phone}
                        onChange={(e) => setPersonalForm({ ...personalForm, phone: e.target.value })}
                        className="form-control"
                        style={{ padding: '0.75rem 1rem', width: '100%', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border-color)' }}
                      />
                    </div>

                    {/* City */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dark)' }}>
                          City
                        </label>
                      </div>
                      <input 
                        type="text"
                        value={personalForm.city}
                        onChange={(e) => setPersonalForm({ ...personalForm, city: e.target.value })}
                        className="form-control"
                        style={{ padding: '0.75rem 1rem', width: '100%', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border-color)' }}
                      />
                    </div>
                  </div>

                  {/* Verification Banner */}
                  <div style={{
                    background: '#ECFDF5',
                    border: '1px solid #A7F3D0',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem 1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1.5rem',
                    color: '#065F46',
                    fontSize: '0.875rem'
                  }}>
                    <CheckCircle2 size={18} color="#059669" />
                    <span>Email verified. Your profile is ready for personalised matching.</span>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                    <button 
                      type="button"
                      onClick={() => setIsEditingPersonal(false)}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="btn btn-primary"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      <Save size={16} />
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                /* Static view */
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Full Name</div>
                      <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-dark)', marginTop: '0.2rem' }}>{personalForm.name}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Email Address</div>
                      <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-dark)', marginTop: '0.2rem' }}>{personalForm.email}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Phone Number</div>
                      <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-dark)', marginTop: '0.2rem' }}>{personalForm.phone}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>City</div>
                      <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-dark)', marginTop: '0.2rem' }}>{personalForm.city}</div>
                    </div>
                  </div>

                  <div style={{
                    background: '#ECFDF5',
                    border: '1px solid #A7F3D0',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem 1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    color: '#065F46',
                    fontSize: '0.875rem'
                  }}>
                    <CheckCircle2 size={18} color="#059669" />
                    <span>Email verified. Your profile is ready for personalised matching.</span>
                  </div>
                </div>
              )}
            </div>

            {/* CARD 2: Academic Profile */}
            <div id="academic" style={{
              background: 'white',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                    Academic Profile
                  </h2>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    Used to check published eligibility criteria
                  </p>
                </div>

                {!isEditingAcademic && (
                  <button 
                    onClick={() => setIsEditingAcademic(true)}
                    className="btn btn-secondary"
                    style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}
                  >
                    <Edit3 size={15} />
                    Edit Profile
                  </button>
                )}
              </div>

              {isEditingAcademic ? (
                <form onSubmit={handleSaveAcademic}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dark)', display: 'block', marginBottom: '0.4rem' }}>
                        SSC GPA
                      </label>
                      <input 
                        type="number"
                        step="0.01"
                        max="5.0"
                        min="1.0"
                        value={academicForm.sscGpa}
                        onChange={(e) => setAcademicForm({ ...academicForm, sscGpa: e.target.value })}
                        className="form-control"
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dark)', display: 'block', marginBottom: '0.4rem' }}>
                        HSC GPA
                      </label>
                      <input 
                        type="number"
                        step="0.01"
                        max="5.0"
                        min="1.0"
                        value={academicForm.hscGpa}
                        onChange={(e) => setAcademicForm({ ...academicForm, hscGpa: e.target.value })}
                        className="form-control"
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dark)', display: 'block', marginBottom: '0.4rem' }}>
                        Academic Group
                      </label>
                      <select 
                        value={academicForm.group}
                        onChange={(e) => setAcademicForm({ ...academicForm, group: e.target.value })}
                        className="form-control"
                      >
                        <option value="Science">Science</option>
                        <option value="Commerce">Commerce</option>
                        <option value="Arts">Humanities / Arts</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dark)', display: 'block', marginBottom: '0.4rem' }}>
                        Passing Year
                      </label>
                      <input 
                        type="text"
                        value={academicForm.passingYear}
                        onChange={(e) => setAcademicForm({ ...academicForm, passingYear: e.target.value })}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                    <button 
                      type="button" 
                      onClick={() => setIsEditingAcademic(false)}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                    >
                      Save Academic Profile
                    </button>
                  </div>
                </form>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '1.5rem',
                  background: 'var(--bg-light)',
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-lg)'
                }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '0.25rem' }}>
                      SSC GPA
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                      {academicForm.sscGpa}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      {academicForm.sscBoard}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '0.25rem' }}>
                      HSC GPA
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                      {academicForm.hscGpa}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      {academicForm.hscBoard}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '0.25rem' }}>
                      ACADEMIC GROUP
                    </div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-dark)', marginTop: '0.25rem' }}>
                      {academicForm.group}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      Passing Year {academicForm.passingYear}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '0.25rem' }}>
                      CORE SUBJECTS
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-dark)', marginTop: '0.25rem' }}>
                      {academicForm.coreSubjects}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 600, marginTop: '0.2rem' }}>
                      ✓ Eligible for Engineering & General
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* CARD 3: Preferences */}
            <div id="preferences" style={{
              background: 'white',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                    Preferences
                  </h2>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    Shapes your recommendations and ranking
                  </p>
                </div>

                {!isEditingPreferences && (
                  <button 
                    onClick={() => setIsEditingPreferences(true)}
                    className="btn btn-secondary"
                    style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}
                  >
                    <Edit3 size={15} />
                    Edit Preferences
                  </button>
                )}
              </div>

              {isEditingPreferences ? (
                <form onSubmit={handleSavePreferences}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dark)', display: 'block', marginBottom: '0.4rem' }}>
                        Preferred University Type
                      </label>
                      <select 
                        value={preferencesForm.uniType}
                        onChange={(e) => setPreferencesForm({ ...preferencesForm, uniType: e.target.value })}
                        className="form-control"
                      >
                        <option value="Public university">Public university</option>
                        <option value="Private university">Private university</option>
                        <option value="Both">Both Public & Private</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dark)', display: 'block', marginBottom: '0.4rem' }}>
                        Budget Range
                      </label>
                      <input 
                        type="text"
                        value={preferencesForm.budget}
                        onChange={(e) => setPreferencesForm({ ...preferencesForm, budget: e.target.value })}
                        className="form-control"
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-dark)', display: 'block', marginBottom: '0.4rem' }}>
                        Preferred Location(s)
                      </label>
                      <input 
                        type="text"
                        value={preferencesForm.locations}
                        onChange={(e) => setPreferencesForm({ ...preferencesForm, locations: e.target.value })}
                        className="form-control"
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dark)', display: 'block', marginBottom: '0.4rem' }}>
                        Preferred Program
                      </label>
                      <input 
                        type="text"
                        value={preferencesForm.program}
                        onChange={(e) => setPreferencesForm({ ...preferencesForm, program: e.target.value })}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                    <button 
                      type="button" 
                      onClick={() => setIsEditingPreferences(false)}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                    >
                      Save Preferences
                    </button>
                  </div>
                </form>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1.25rem',
                  background: 'var(--bg-light)',
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-lg)'
                }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '0.25rem' }}>
                      PREFERRED UNIVERSITY TYPE
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                      {preferencesForm.uniType}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '0.25rem' }}>
                      PREFERRED LOCATION
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                      {preferencesForm.locations}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '0.25rem' }}>
                      BUDGET RANGE
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                      {preferencesForm.budget}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '0.25rem' }}>
                      PREFERRED PROGRAM
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                      {preferencesForm.program}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* CARD 4: Notifications (Additional settings for completeness) */}
            {activeSection === 'notifications' && (
              <div id="notifications" style={{
                background: 'white',
                borderRadius: 'var(--radius-xl)',
                padding: '2rem',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '0.5rem' }}>
                  Notification Preferences
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  Select how you want to be notified about application deadlines and circular updates.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--primary-color)' }} />
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--text-dark)', fontSize: '0.9rem' }}>Deadline Reminders</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Get notified 48 hours and 24 hours before deadlines of shortlisted universities</div>
                    </div>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--primary-color)' }} />
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--text-dark)', fontSize: '0.9rem' }}>Circular Updates</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Instant notifications when new admission circulars match your eligibility</div>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* CARD 5: Privacy (Additional settings for completeness) */}
            {activeSection === 'privacy' && (
              <div id="privacy" style={{
                background: 'white',
                borderRadius: 'var(--radius-xl)',
                padding: '2rem',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '0.5rem' }}>
                  Privacy & Data Security
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  UniQuery strictly uses your GPA and academic records locally and for matching only. Your data is never sold to third parties.
                </p>

                <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  ✓ End-to-end encrypted profile data<br />
                  ✓ Compliant with student data protection guidelines<br />
                  ✓ One-click profile data export and erasure available
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
