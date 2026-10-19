import React, { useState } from 'react';
import { 
  GraduationCap, 
  Sliders, 
  Check, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  X, 
  Plus 
} from 'lucide-react';

export default function ExploreWizard({ userProfile, onUpdateProfile, onCompleteStep }) {
  const [sscGpa, setSscGpa] = useState(userProfile.sscGpa || 5.00);
  const [hscGpa, setHscGpa] = useState(userProfile.hscGpa || 4.83);
  const [academicGroup, setAcademicGroup] = useState(userProfile.academicGroup || "Science");
  const [budgetRange, setBudgetRange] = useState(userProfile.budgetRange || "৳5–10 Lakh total");
  const [uniType, setUniType] = useState(userProfile.universityType || "Public university");
  const [locations, setLocations] = useState(userProfile.preferredLocations || ["Dhaka", "Rajshahi"]);
  const [program, setProgram] = useState(userProfile.preferredProgram || "Computer Science & Engineering");
  const [importantList, setImportantList] = useState(userProfile.alsoImportant || ["Scholarship available", "Residential hall"]);
  const [newLocInput, setNewLocInput] = useState('');
  const [showAddLoc, setShowAddLoc] = useState(false);

  const handleRemoveLocation = (loc) => {
    setLocations(prev => prev.filter(l => l !== loc));
  };

  const handleAddLocation = (e) => {
    e.preventDefault();
    if (newLocInput.trim() && !locations.includes(newLocInput.trim())) {
      setLocations(prev => [...prev, newLocInput.trim()]);
      setNewLocInput('');
      setShowAddLoc(false);
    }
  };

  const handleToggleImportant = (item) => {
    setImportantList(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleCheckEligibility = () => {
    onUpdateProfile({
      sscGpa: parseFloat(sscGpa),
      hscGpa: parseFloat(hscGpa),
      academicGroup,
      budgetRange,
      universityType: uniType,
      preferredLocations: locations,
      preferredProgram: program,
      alsoImportant: importantList
    });
    onCompleteStep();
  };

  return (
    <div className="explore-wizard-container">
      {/* Header */}
      <div className="page-header-block">
        <span className="page-category-tag">PERSONALISED MATCHING</span>
        <h1 className="page-main-title">Find universities you’re eligible for</h1>
        <p className="page-main-desc">
          Complete your academic profile and preferences. We’ll match you with programs where you meet the published requirements.
        </p>
      </div>

      {/* Stepper Bar */}
      <div className="wizard-stepper-card">
        <div className="step-node">
          <div className="step-circle completed">
            <Check size={18} />
          </div>
          <div className="step-node-info">
            <span className="step-node-title">Academic Profile</span>
            <span className="step-node-sub" style={{ color: '#10B981', fontWeight: 600 }}>Completed</span>
          </div>
        </div>

        <div className="step-connector-line active" />

        <div className="step-node">
          <div className="step-circle in-progress">
            02
          </div>
          <div className="step-node-info">
            <span className="step-node-title">Preferences</span>
            <span className="step-node-sub" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>In progress</span>
          </div>
        </div>

        <div className="step-connector-line" />

        <div className="step-node">
          <div className="step-circle upcoming">
            03
          </div>
          <div className="step-node-info">
            <span className="step-node-title">Results</span>
            <span className="step-node-sub">Your matches</span>
          </div>
        </div>
      </div>

      {/* Wizard Form Layout */}
      <div className="wizard-grid-layout">
        <div className="wizard-form-col">
          {/* Card 1: Academic Profile */}
          <div className="form-step-card">
            <div className="form-step-header">
              <div className="form-step-title-group">
                <div className="form-step-icon">
                  <GraduationCap size={22} />
                </div>
                <div>
                  <h3 className="form-step-heading">Academic Profile</h3>
                  <p className="form-step-sub">Your most recent secondary results</p>
                </div>
              </div>
              <span className="badge-pill-status active">✓ Complete</span>
            </div>

            <div className="form-row-2col">
              <div className="form-field-group">
                <div className="field-label-row">
                  <label className="field-label">SSC GPA</label>
                  <span className="field-status-hint">Looks good ✓</span>
                </div>
                <input 
                  type="number" 
                  step="0.01" 
                  min="1" 
                  max="5"
                  className="input-text-standard success" 
                  value={sscGpa} 
                  onChange={(e) => setSscGpa(e.target.value)} 
                />
              </div>

              <div className="form-field-group">
                <div className="field-label-row">
                  <label className="field-label">HSC GPA</label>
                </div>
                <select 
                  className="select-standard"
                  value={hscGpa}
                  onChange={(e) => setHscGpa(e.target.value)}
                >
                  <option value="5.00">5.00 (Golden / A+)</option>
                  <option value="4.83">4.83 (Current HSC result)</option>
                  <option value="4.50">4.50</option>
                  <option value="4.00">4.00</option>
                  <option value="3.75">3.75</option>
                  <option value="3.50">3.50</option>
                </select>
              </div>
            </div>

            <div className="form-field-group">
              <label className="field-label">Academic Group</label>
              <div className="radio-options-row">
                <label className="radio-item-label">
                  <input 
                    type="radio" 
                    name="group" 
                    value="Science" 
                    checked={academicGroup === "Science"} 
                    onChange={() => setAcademicGroup("Science")} 
                  />
                  <span>Science</span>
                </label>
                <label className="radio-item-label">
                  <input 
                    type="radio" 
                    name="group" 
                    value="Business Studies" 
                    checked={academicGroup === "Business Studies"} 
                    onChange={() => setAcademicGroup("Business Studies")} 
                  />
                  <span>Business Studies</span>
                </label>
                <label className="radio-item-label">
                  <input 
                    type="radio" 
                    name="group" 
                    value="Humanities" 
                    checked={academicGroup === "Humanities"} 
                    onChange={() => setAcademicGroup("Humanities")} 
                  />
                  <span>Humanities</span>
                </label>
              </div>
            </div>
          </div>

          {/* Card 2: Preferences (Active Step with Blue Border) */}
          <div className="form-step-card active-step">
            <div className="form-step-header">
              <div className="form-step-title-group">
                <div className="form-step-icon">
                  <Sliders size={22} />
                </div>
                <div>
                  <h3 className="form-step-heading">Preferences</h3>
                  <p className="form-step-sub">Tell us what matters most to you</p>
                </div>
              </div>
              <span className="badge-ranking-pill">Step 2 of 3</span>
            </div>

            <div className="form-row-2col">
              <div className="form-field-group">
                <label className="field-label">Budget Range</label>
                <select 
                  className="select-standard"
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                >
                  <option value="৳0–5 Lakh total">৳0–5 Lakh total</option>
                  <option value="৳5–10 Lakh total">৳5–10 Lakh total</option>
                  <option value="৳10–15 Lakh total">৳10–15 Lakh total</option>
                  <option value="৳15+ Lakh total">৳15+ Lakh total</option>
                </select>
              </div>

              <div className="form-field-group">
                <label className="field-label">University Type</label>
                <select 
                  className="select-standard"
                  value={uniType}
                  onChange={(e) => setUniType(e.target.value)}
                >
                  <option value="Public university">Public university</option>
                  <option value="Private university">Private university</option>
                  <option value="Both Public & Private">Both Public & Private</option>
                </select>
              </div>
            </div>

            <div className="form-row-2col">
              <div className="form-field-group">
                <label className="field-label">Preferred Location</label>
                <select 
                  className="select-standard"
                  value={locations.join(", ")}
                  onChange={(e) => {
                    const selected = e.target.value.split(", ");
                    setLocations(selected);
                  }}
                >
                  <option value="Dhaka, Rajshahi">Dhaka, Rajshahi</option>
                  <option value="Dhaka">Dhaka only</option>
                  <option value="Dhaka, Chattogram">Dhaka, Chattogram</option>
                  <option value="All divisions">All Bangladesh</option>
                </select>

                <div className="tags-row-wrap">
                  {locations.map((loc) => (
                    <span key={loc} className="tag-pill-dismiss">
                      {loc}
                      <X size={12} onClick={() => handleRemoveLocation(loc)} />
                    </span>
                  ))}
                  {showAddLoc ? (
                    <form onSubmit={handleAddLocation} style={{ display: 'inline-flex', gap: '4px' }}>
                      <input 
                        type="text" 
                        placeholder="City" 
                        value={newLocInput}
                        onChange={(e) => setNewLocInput(e.target.value)}
                        style={{ padding: '4px 8px', fontSize: '0.8rem', borderRadius: '4px', border: '1px solid #CBD5E1' }}
                        autoFocus
                      />
                      <button type="submit" style={{ padding: '4px 8px', background: 'var(--color-primary)', color: 'white', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '0.75rem' }}>Add</button>
                    </form>
                  ) : (
                    <button type="button" className="tag-add-btn" onClick={() => setShowAddLoc(true)}>
                      <Plus size={14} />
                      <span>Add location</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="form-field-group">
                <label className="field-label">Preferred Program / Department</label>
                <select 
                  className="select-standard"
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                >
                  <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                  <option value="Software Engineering">Software Engineering</option>
                  <option value="Electrical & Electronic Engineering">Electrical & Electronic Engineering</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Information & Communication Technology">Information & Communication Technology</option>
                </select>
              </div>
            </div>

            <div className="form-field-group" style={{ marginTop: '16px' }}>
              <label className="field-label">Also important to me</label>
              <div className="checkboxes-2col-grid">
                {["Scholarship available", "Residential hall", "Strong research", "Sports facilities"].map(item => (
                  <label key={item} className="checkbox-item-label">
                    <input 
                      type="checkbox" 
                      checked={importantList.includes(item)}
                      onChange={() => handleToggleImportant(item)}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="wizard-nav-actions">
            <button className="btn-secondary" onClick={() => onCompleteStep()}>
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>

            <span style={{ fontSize: '0.9rem', color: '#64748B', cursor: 'pointer', fontWeight: 600 }}>
              Save for later
            </span>

            <button className="btn-primary" onClick={handleCheckEligibility}>
              <span>Check Eligibility</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="wizard-sidebar-col" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Match Profile Preview (Dark Slate) */}
          <div className="sidebar-dark-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#94A3B8' }}>Your match profile</span>
              <Sparkles size={18} color="#A78BFA" />
            </div>

            <div style={{ fontSize: '3rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>
              24
            </div>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '6px', marginBottom: '20px' }}>
              potential university & program matches
            </p>

            <div className="profile-checks-list">
              <div className="profile-check-item">
                <Check size={16} />
                <span>Science group</span>
              </div>
              <div className="profile-check-item">
                <Check size={16} />
                <span>GPA above 4.50</span>
              </div>
              <div className="profile-check-item">
                <Check size={16} />
                <span>Public universities</span>
              </div>
              <div className="profile-check-item">
                <Check size={16} />
                <span>CSE preferred</span>
              </div>
            </div>
          </div>

          {/* Data Privacy Note */}
          <div className="sidebar-card-white" style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <ShieldCheck size={20} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ display: 'block', fontSize: '0.9rem', color: '#0F172A', marginBottom: '4px' }}>
                Your data stays private
              </strong>
              <p style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.5 }}>
                We use these details only to personalise your results. You can edit or delete them anytime.
              </p>
            </div>
          </div>

          {/* Results unlock lock card */}
          <div style={{
            background: '#F8FAFC',
            border: '1px dashed #CBD5E1',
            borderRadius: '16px',
            padding: '24px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              RESULTS UNLOCK AFTER STEP 2
            </span>
            <button 
              className="btn-secondary" 
              style={{ opacity: 0.7, cursor: 'pointer' }}
              onClick={handleCheckEligibility}
            >
              <Lock size={16} />
              <span>View Results</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
