import React, { useState, useEffect } from 'react';
import SidebarLayout from '../../components/SidebarLayout';
import { Search, Plus, FileText, Activity, Clock, X, AlertCircle, CheckCircle } from 'lucide-react';
import API_URL from '../../config'; // Replaced hardcoded localhost

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [learners, setLearners] = useState([]); 
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Custom Notification State (Replaces ugly alerts)
  const [notification, setNotification] = useState(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ learnerId: '', title: '', targetType: 'Frequency' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const colors = { card: '#130a2a', border: '#2d1b5e', primary: '#8b5cf6', textMuted: '#9ca3af', bg: '#080514', frequency: '#3b82f6', duration: '#f59e0b', danger: '#ef4444', success: '#10b981' };

  // --- THE SECURITY GUARD ---
  const kickToLogin = () => {
    localStorage.removeItem('aura_user');
    window.location.href = '/login'; 
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000); 
  };

  // --- 1. FETCH PROGRAMS & LEARNERS ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both concurrently using secure HTTP-Only cookies
        const [programsRes, learnersRes] = await Promise.all([
          fetch(`${API_URL}/api/programs`, { credentials: 'include' }),
          fetch(`${API_URL}/api/learners`, { credentials: 'include' })
        ]);

        // Intercept expired or invalid sessions
        if (programsRes.status === 401 || programsRes.status === 403 || 
            learnersRes.status === 401 || learnersRes.status === 403) {
          throw new Error('Unauthorized');
        }

        if (programsRes.ok && learnersRes.ok) {
          setPrograms(await programsRes.json());
          setLearners(await learnersRes.json());
        }
      } catch (err) {
        console.error("Error loading data:", err);
        if (err.message === 'Unauthorized') kickToLogin();
        else showNotification("Error loading programs data.", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- 2. HANDLE CREATION ---
  const handleAddProgram = async (e) => {
    e.preventDefault();
    if (!formData.learnerId) {
      showNotification("Please select a learner to assign this target to.", "error");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/programs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include' 
      });
      
      if (res.status === 401 || res.status === 403) throw new Error('Unauthorized');
      if (!res.ok) throw new Error('Failed to create program');
      
      const newProgram = await res.json();
      
      setPrograms([newProgram, ...programs]);
      setIsModalOpen(false);
      setFormData({ learnerId: '', title: '', targetType: 'Frequency' });
      showNotification("Target successfully created!");
    } catch (err) {
      if (err.message === 'Unauthorized') kickToLogin();
      else showNotification("Error adding target. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Safely filter programs, falling back to empty strings if data is missing
  const filteredPrograms = programs.filter(p => 
    (p.title || '').toLowerCase().includes(search.toLowerCase()) || 
    (p.learner_name || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SidebarLayout>
      <div style={{ padding: '30px 40px', position: 'relative' }}>
        
        {/* INBUILT NOTIFICATION BANNER */}
        {notification && (
          <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', backgroundColor: notification.type === 'error' ? `${colors.danger}20` : `${colors.success}20`, border: `1px solid ${notification.type === 'error' ? colors.danger : colors.success}`, color: notification.type === 'error' ? colors.danger : colors.success, padding: '12px 24px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', zIndex: 1000, animation: 'fadeInDown 0.3s' }}>
            {notification.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
            {notification.message}
          </div>
        )}

        {/* HEADER */}
        <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
          <div>
            <h1 style={{ margin: '0 0 8px 0' }}>Program Library</h1>
            <p style={{ color: colors.textMuted, margin: 0 }}>Define and track specific behavioral targets for your caseload.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            style={{ backgroundColor: colors.primary, color: '#fff', padding: '10px 16px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={18} /> Add Target
          </button>
        </header>

        {/* MAIN PANEL */}
        <div style={{ backgroundColor: colors.card, border: `1px solid ${colors.border}`, borderRadius: '12px', padding: '20px' }}>
          
          {/* SEARCH BAR */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', padding: '12px', backgroundColor: '#0f0822', borderRadius: '8px', border: `1px solid ${colors.border}` }}>
            <Search size={18} color={colors.textMuted} />
            <input 
              type="text" 
              placeholder="Search by target name or learner..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ backgroundColor: 'transparent', border: 'none', color: '#fff', width: '100%', outline: 'none', fontSize: '15px' }} 
            />
          </div>

          {/* GRID */}
          {loading ? (
            <p style={{ color: colors.textMuted, textAlign: 'center', padding: '40px 0' }}>Loading programs...</p>
          ) : filteredPrograms.length === 0 ? (
            <p style={{ color: colors.textMuted, textAlign: 'center', padding: '40px 0' }}>No targets found. Click "Add Target" to create one.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {filteredPrograms.map(p => (
                <div key={p.id} style={{ border: `1px solid ${colors.border}`, borderRadius: '8px', padding: '20px', backgroundColor: colors.bg }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <h3 style={{ margin: 0, fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FileText size={16} color={colors.textMuted} /> {p.title}
                    </h3>
                  </div>
                  
                  <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#e2e8f0' }}>
                    Assigned to: <strong style={{color: '#fff'}}>{p.learner_name || 'Unassigned'}</strong>
                  </p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ 
                      backgroundColor: p.target_type === 'Frequency' ? `${colors.frequency}20` : `${colors.duration}20`, 
                      color: p.target_type === 'Frequency' ? colors.frequency : colors.duration, 
                      padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' 
                    }}>
                      {p.target_type === 'Frequency' ? <Activity size={12}/> : <Clock size={12}/>} 
                      {p.target_type}
                    </span>
                    <span style={{ fontSize: '12px', color: p.is_active ? '#10b981' : colors.textMuted }}>
                      {p.is_active !== false ? '● Active' : '○ Inactive'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* --- ADD PROGRAM MODAL --- */}
        {isModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ backgroundColor: colors.card, border: `1px solid ${colors.border}`, borderRadius: '12px', padding: '30px', width: '100%', maxWidth: '400px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0 }}>Create New Target</h2>
                <X size={20} color={colors.textMuted} style={{ cursor: 'pointer' }} onClick={() => setIsModalOpen(false)} />
              </div>
              
              <form onSubmit={handleAddProgram} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* Select Learner */}
                <div>
                  <label style={{ fontSize: '13px', color: colors.textMuted, display: 'block', marginBottom: '6px' }}>Assign to Learner</label>
                  <select 
                    required 
                    value={formData.learnerId} 
                    onChange={(e) => setFormData({...formData, learnerId: e.target.value})} 
                    style={{ width: '100%', padding: '10px', backgroundColor: '#0f0822', border: `1px solid ${colors.border}`, borderRadius: '6px', color: '#fff', outline: 'none' }}
                  >
                    <option value="" disabled>Select a learner...</option>
                    {learners.map(l => (
                      <option key={l.id} value={l.id}>{l.first_name} {l.last_name}</option>
                    ))}
                  </select>
                </div>

                {/* Target Name */}
                <div>
                  <label style={{ fontSize: '13px', color: colors.textMuted, display: 'block', marginBottom: '6px' }}>Target Name (e.g. "Manding")</label>
                  <input required type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} style={{ width: '100%', padding: '10px', backgroundColor: '#0f0822', border: `1px solid ${colors.border}`, borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }} />
                </div>
                
                {/* Measurement Type */}
                <div>
                  <label style={{ fontSize: '13px', color: colors.textMuted, display: 'block', marginBottom: '6px' }}>Measurement Type</label>
                  <select 
                    value={formData.targetType} 
                    onChange={(e) => setFormData({...formData, targetType: e.target.value})} 
                    style={{ width: '100%', padding: '10px', backgroundColor: '#0f0822', border: `1px solid ${colors.border}`, borderRadius: '6px', color: '#fff', outline: 'none' }}
                  >
                    <option value="Frequency">Frequency (Count)</option>
                    <option value="Duration">Duration (Time)</option>
                  </select>
                </div>
                
                <button type="submit" disabled={isSubmitting || learners.length === 0} style={{ width: '100%', padding: '12px', backgroundColor: colors.primary, color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
                  {isSubmitting ? 'Saving...' : 'Save Target'}
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </SidebarLayout>
  );
};

export default Programs;