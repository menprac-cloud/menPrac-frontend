import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Added for fast, seamless page transitions
import SidebarLayout from '../../components/SidebarLayout';
import { Search, Plus, Play, X, AlertCircle, CheckCircle } from 'lucide-react';
import API_URL from '../../config'; // Replaced hardcoded localhost

const Learners = () => {
  const navigate = useNavigate();
  const [learners, setLearners] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Custom Notification State
  const [notification, setNotification] = useState(null); 
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', dob: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const colors = { card: '#130a2a', border: '#2d1b5e', primary: '#8b5cf6', textMuted: '#9ca3af', bg: '#080514', danger: '#ef4444', success: '#10b981' };

  // --- THE SECURITY GUARD ---
  const kickToLogin = () => {
    localStorage.removeItem('aura_user');
    window.location.href = '/login'; 
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000); 
  };

  // Fetch Learners with 401 interception
  useEffect(() => {
    const fetchLearners = async () => {
      try {
        const res = await fetch(`${API_URL}/api/learners`, {
          credentials: 'include' // Sends the secure HTTP-Only cookie
        });
        
        if (res.status === 401 || res.status === 403) throw new Error('Unauthorized');
        if (!res.ok) throw new Error('Failed to fetch');
        
        setLearners(await res.json());
      } catch (err) {
        if (err.message === 'Unauthorized') {
          kickToLogin();
        } else {
          showNotification("Error loading learners.", "error");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchLearners();
  }, []);

  // Handle Add Learner with 401 interception
  const handleAddLearner = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/learners`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include'
      });
      
      if (res.status === 401 || res.status === 403) throw new Error('Unauthorized');
      if (!res.ok) throw new Error('Failed to create learner');
      
      const newLearner = await res.json();
      
      setLearners([newLearner, ...learners]);
      setIsModalOpen(false);
      setFormData({ firstName: '', lastName: '', dob: '' });
      showNotification("Learner successfully created!");
    } catch (err) {
      if (err.message === 'Unauthorized') {
        kickToLogin();
      } else {
        showNotification("Error adding learner. Please try again.", "error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAge = (dobString) => {
    if (!dobString) return 'N/A';
    const today = new Date();
    const birthDate = new Date(dobString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  const filteredLearners = learners.filter(l => 
    `${l.first_name} ${l.last_name}`.toLowerCase().includes(search.toLowerCase())
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
            <h1 style={{ margin: '0 0 8px 0' }}>Client Directory</h1>
            <p style={{ color: colors.textMuted, margin: 0 }}>Manage your active caseload and client profiles.</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} style={{ backgroundColor: colors.primary, color: '#fff', padding: '10px 16px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={18} /> Add Client
          </button>
        </header>

        {/* MAIN PANEL */}
        <div style={{ backgroundColor: colors.card, border: `1px solid ${colors.border}`, borderRadius: '12px', padding: '20px' }}>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', padding: '12px', backgroundColor: '#0f0822', borderRadius: '8px', border: `1px solid ${colors.border}` }}>
            <Search size={18} color={colors.textMuted} />
            <input type="text" placeholder="Search clients by name..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ backgroundColor: 'transparent', border: 'none', color: '#fff', width: '100%', outline: 'none', fontSize: '15px' }} />
          </div>

          {loading ? (
            <p style={{ color: colors.textMuted, textAlign: 'center', padding: '40px 0' }}>Loading clients...</p>
          ) : filteredLearners.length === 0 ? (
            <p style={{ color: colors.textMuted, textAlign: 'center', padding: '40px 0' }}>No client found.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {filteredLearners.map(l => (
                <div key={l.id} style={{ border: `1px solid ${colors.border}`, borderRadius: '8px', padding: '20px', backgroundColor: colors.bg }}>
                  
                  {/* SEAMLESS REACT NAVIGATION (Replaced window.location) */}
                  <h3 
                    onClick={() => navigate(`/learner/${l.id}`)} 
                    style={{ margin: '0 0 4px 0', cursor: 'pointer', color: colors.primary, textDecoration: 'underline' }}
                  >
                    {l.first_name} {l.last_name}
                  </h3>
                  
                  <p style={{ color: colors.textMuted, fontSize: '14px', margin: '0 0 16px 0' }}>Age: {getAge(l.dob)}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#10b981', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>{l.status}</span>
                    <button onClick={() => navigate(`/session/${l.id}`)} style={{ backgroundColor: 'transparent', border: `1px solid ${colors.primary}`, color: colors.primary, padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600' }}>
                      <Play size={14} /> Session
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* --- ADD LEARNER MODAL --- */}
        {isModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ backgroundColor: colors.card, border: `1px solid ${colors.border}`, borderRadius: '12px', padding: '30px', width: '100%', maxWidth: '400px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0 }}>Add New Client</h2>
                <X size={20} color={colors.textMuted} style={{ cursor: 'pointer' }} onClick={() => setIsModalOpen(false)} />
              </div>
              
              <form onSubmit={handleAddLearner} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '13px', color: colors.textMuted, display: 'block', marginBottom: '6px' }}>First Name</label>
                  <input required type="text" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} style={{ width: '100%', padding: '10px', backgroundColor: '#0f0822', border: `1px solid ${colors.border}`, borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ fontSize: '13px', color: colors.textMuted, display: 'block', marginBottom: '6px' }}>Last Name</label>
                  <input required type="text" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} style={{ width: '100%', padding: '10px', backgroundColor: '#0f0822', border: `1px solid ${colors.border}`, borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ fontSize: '13px', color: colors.textMuted, display: 'block', marginBottom: '6px' }}>Date of Birth</label>
                  <input required type="date" value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})} style={{ width: '100%', padding: '10px', backgroundColor: '#0f0822', border: `1px solid ${colors.border}`, borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }} />
                </div>
                
                <button type="submit" disabled={isSubmitting} style={{ width: '100%', padding: '12px', backgroundColor: colors.primary, color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
                  {isSubmitting ? 'Creating...' : 'Create Client Profile'}
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </SidebarLayout>
  );
};

export default Learners;