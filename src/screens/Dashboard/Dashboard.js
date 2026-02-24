import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import SidebarLayout from '../../components/SidebarLayout';
import { 
  Users, Activity, BrainCircuit, FileText, Settings, Play, Plus, 
  TrendingUp, Calendar, FileSignature, AlertCircle, Clock, MessageSquare, X 
} from 'lucide-react';
import API_URL from '../../config'; // Using dynamic config

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ clinicianName: '', metrics: {}, schedule: [], actionItems: [], caseload: [] });
  const [liveFeed, setLiveFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const socketRef = useRef(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apptData, setApptData] = useState({ learnerId: '', date: new Date().toISOString().split('T')[0], startTime: '', endTime: '' });

  // --- THE SECURITY GUARD ---
  const kickToLogin = () => {
    localStorage.removeItem('aura_user');
    window.location.href = '/login'; 
  };

  // --- FETCH DATA & CONNECT WEBSOCKETS ---
  const fetchDashboard = async () => {
    try {
      const res = await fetch(`${API_URL}/api/dashboard`, {
        credentials: 'include' // Sends the secure HTTP-Only cookie automatically
      });
      
      // Intercept expired or invalid sessions
      if (res.status === 401 || res.status === 403) throw new Error('Unauthorized');
      if (!res.ok) throw new Error('Failed to fetch dashboard');
      
      const dbData = await res.json();
      setData(dbData);
    } catch (err) {
      console.error("Dashboard Fetch Error:", err.message);
      if (err.message === 'Unauthorized') kickToLogin();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check local storage for the user profile (not the token)
    const storedUser = localStorage.getItem('aura_user');
    if (!storedUser) {
      kickToLogin();
      return;
    }

    fetchDashboard();

    // Connect WebSocket
    socketRef.current = io(API_URL);
    
    // Listen for live intelligence updates!
    socketRef.current.on('live_activity', (newActivity) => {
      setLiveFeed((prev) => [newActivity, ...prev].slice(0, 5)); 
    });

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, []); // Removed navigate from dependencies to prevent unnecessary re-renders

  // --- HANDLE SCHEDULING ---
  const handleScheduleAppt = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/dashboard/appointment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apptData),
        credentials: 'include' 
      });
      
      if (res.status === 401 || res.status === 403) throw new Error('Unauthorized');

      if (res.ok) {
        setIsModalOpen(false);
        fetchDashboard(); // Refresh the dashboard
        setApptData({ learnerId: '', date: new Date().toISOString().split('T')[0], startTime: '', endTime: '' });
      } else {
        alert("Failed to schedule appointment. Please check your inputs.");
      }
    } catch (err) {
      console.error(err);
      if (err.message === 'Unauthorized') kickToLogin();
    }
  };

  // --- INLINE STYLES ---
  const colors = { bg: '#080514', card: '#130a2a', border: '#2d1b5e', primary: '#8b5cf6', textMain: '#ffffff', textMuted: '#9ca3af', hover: '#1e1140', danger: '#ef4444', success: '#10b981' };
  
  const s = {
    gridRow1: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' },
    gridRow2: { display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px', marginBottom: '30px' },
    card: { backgroundColor: colors.card, border: `1px solid ${colors.border}`, borderRadius: '12px', padding: '24px' },
    cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${colors.border}`, paddingBottom: '16px', marginBottom: '16px' },
    listItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: `1px solid ${colors.border}` },
    primaryBtn: { backgroundColor: colors.primary, color: '#fff', padding: '10px 16px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' },
    badge: (color) => ({ backgroundColor: `${color}20`, color: color, padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }),
    liveBadge: { backgroundColor: `${colors.success}20`, color: colors.success, padding: '4px 8px', borderRadius: '4px', fontSize: '11px', display: 'inline-block', marginBottom: '10px', border: `1px solid ${colors.success}`, animation: 'pulse 2s infinite' }
  };

  if (loading) return <SidebarLayout><div style={{display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', color: '#fff'}}><h2>Loading Workspace...</h2></div></SidebarLayout>;

  return (
    <SidebarLayout>
      <div style={{ padding: '30px 40px', position: 'relative' }}>
        
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h1 style={{ margin: '0 0 8px 0', fontSize: '28px' }}>Good morning, {data?.clinicianName || 'Clinician'}.</h1>
            <p style={{ color: colors.textMuted, margin: 0 }}>Real-time clinical and operational overview.</p>
          </div>
          <button onClick={() => navigate('/learners')} style={s.primaryBtn}><Plus size={18} /> Add New Client</button>
        </header>

        {/* METRICS ROW */}
        <div style={s.gridRow1}>
          {[
            { title: "Active Caseload", value: data?.metrics?.activeLearners || 0, icon: <Users size={20} />, color: '#3b82f6' },
            { title: "Appointments Today", value: data?.metrics?.appointmentsToday || 0, icon: <Calendar size={20} />, color: '#10b981' },
            { title: "Pending Actions", value: data?.metrics?.pendingActions || 0, icon: <FileSignature size={20} />, color: '#ef4444' },
            { title: "Mastered Targets", value: data?.metrics?.masteredTargets || 0, icon: <TrendingUp size={20} />, color: '#f59e0b' }
          ].map((metric, idx) => (
            <div key={idx} style={{...s.card, padding: '20px', display: 'flex', alignItems: 'center', gap: '16px'}}>
              <div style={{ backgroundColor: `${metric.color}20`, color: metric.color, padding: '12px', borderRadius: '10px' }}>{metric.icon}</div>
              <div>
                <p style={{ margin: 0, fontSize: '13px', color: colors.textMuted }}>{metric.title}</p>
                <h3 style={{ margin: '4px 0 0 0', fontSize: '24px' }}>{metric.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* MIDDLE ROW: Schedule & Action Items */}
        <div style={s.gridRow2}>
          <div style={s.card}>
            <div style={s.cardHeader}>
              <h2 style={{ fontSize: '18px', margin: 0 }}>Today's Schedule</h2>
              <button onClick={() => setIsModalOpen(true)} style={{ backgroundColor: 'transparent', color: colors.primary, border: `1px solid ${colors.primary}`, padding: '4px 12px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}><Plus size={14}/> Schedule Session</button>
            </div>
            {(!data?.schedule || data.schedule.length === 0) ? <p style={{color: colors.textMuted}}>No appointments scheduled for today.</p> : data.schedule.map((apt, idx) => (
              <div key={apt.id} style={{...s.listItem, borderBottom: idx === data.schedule.length - 1 ? 'none' : `1px solid ${colors.border}`}}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ backgroundColor: colors.hover, padding: '10px', borderRadius: '8px', color: colors.textMuted }}><Clock size={18} /></div>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>{apt.learner}</h4>
                    <p style={{ margin: 0, fontSize: '13px', color: colors.textMuted }}>{apt.start_time} - {apt.end_time} • {apt.status}</p>
                  </div>
                </div>
                <button onClick={() => navigate(`/session/${apt.id}`)} style={{ backgroundColor: 'transparent', border: `1px solid ${colors.primary}`, color: colors.primary, padding: '6px 16px', borderRadius: '6px', cursor: 'pointer' }}>Start Session</button>
              </div>
            ))}
          </div>

          <div style={s.card}>
            <div style={s.cardHeader}>
              <h2 style={{ fontSize: '18px', margin: 0 }}>Action Items</h2>
              <span style={s.badge(colors.danger)}>{data?.actionItems?.length || 0} Pending</span>
            </div>
            {(!data?.actionItems || data.actionItems.length === 0) ? <p style={{color: colors.textMuted}}>All caught up!</p> : data.actionItems.map((item, idx) => (
              <div key={item.id} style={{ padding: '16px 0', borderBottom: idx === data.actionItems.length - 1 ? 'none' : `1px solid ${colors.border}` }}>
                <span style={{ fontSize: '12px', color: item.urgency === 'High' ? colors.danger : colors.textMuted, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                  {item.urgency === 'High' && <AlertCircle size={12} />} {item.task_type}
                </span>
                <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5' }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM ROW: Caseload & Live Intelligence */}
        <div style={s.gridRow2}>
          <div style={s.card}>
            <div style={s.cardHeader}>
              <h2 style={{ fontSize: '18px', margin: 0 }}>Active Caseload</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {(!data?.caseload || data.caseload.length === 0) ? <p style={{color: colors.textMuted}}>No active learners found.</p> : data.caseload.map(learner => (
                <div key={learner.id} style={{ backgroundColor: colors.hover, padding: '16px', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>{learner.name}</h3>
                  <p style={{ margin: 0, fontSize: '13px', color: colors.textMuted }}>Status: {learner.status}</p>
                  <button onClick={() => navigate(`/learner/${learner.id}`)} style={{ marginTop: '16px', width: '100%', backgroundColor: 'transparent', border: `1px solid ${colors.border}`, color: colors.primary, padding: '8px', borderRadius: '6px', cursor: 'pointer' }}>Go to Profile</button>
                </div>
              ))}
            </div>
          </div>

          <div style={s.card}>
            <h2 style={{ fontSize: '18px', margin: '0 0 16px 0', borderBottom: `1px solid ${colors.border}`, paddingBottom: '16px' }}>Live Intelligence</h2>
            <div style={s.liveBadge}>● LIVE STREAMING</div>
            {liveFeed.length === 0 && <p style={{color: colors.textMuted, fontSize: '14px'}}>Listening for network events...</p>}
            
            {/* Display the live feed! */}
            {liveFeed.map((feed, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${colors.border}`, padding: '16px 0', fontSize: '14px', animation: 'fadeIn 0.5s' }}>
                <p style={{ margin: '0 0 8px 0', color: '#e2e8f0' }}>{feed.text}</p>
                <span style={{ fontSize: '12px', color: colors.primary }}>{feed.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* --- SCHEDULE MODAL (UPGRADED SAFELY) --- */}
        {isModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ backgroundColor: colors.card, border: `1px solid ${colors.border}`, borderRadius: '12px', padding: '30px', width: '100%', maxWidth: '400px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0 }}>Schedule Session</h2>
                <X size={20} color={colors.textMuted} style={{ cursor: 'pointer' }} onClick={() => setIsModalOpen(false)} />
              </div>
              
              <form onSubmit={handleScheduleAppt} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '13px', color: colors.textMuted, display: 'block', marginBottom: '6px' }}>Learner</label>
                  <select 
                    required 
                    value={apptData.learnerId} 
                    onChange={(e) => setApptData({...apptData, learnerId: e.target.value})} 
                    style={{ width: '100%', padding: '10px', backgroundColor: '#0f0822', border: `1px solid ${colors.border}`, borderRadius: '6px', color: '#fff', outline: 'none' }}
                  >
                    <option value="" disabled>Select Client...</option>
                    
                    {/* SAFELY MAPPED DATA */}
                    {data?.caseload?.length > 0 ? (
                      data.caseload.map(l => <option key={l.id} value={l.id}>{l.name}</option>)
                    ) : (
                      <option value="" disabled>No active Clients. Add one first!</option>
                    )}
                    
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '13px', color: colors.textMuted, display: 'block', marginBottom: '6px' }}>Date</label>
                  <input required type="date" value={apptData.date} onChange={(e) => setApptData({...apptData, date: e.target.value})} style={{ width: '100%', padding: '10px', backgroundColor: '#0f0822', border: `1px solid ${colors.border}`, borderRadius: '6px', color: '#fff', boxSizing: 'border-box', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '13px', color: colors.textMuted, display: 'block', marginBottom: '6px' }}>Start Time</label>
                    <input required type="time" value={apptData.startTime} onChange={(e) => setApptData({...apptData, startTime: e.target.value})} style={{ width: '100%', padding: '10px', backgroundColor: '#0f0822', border: `1px solid ${colors.border}`, borderRadius: '6px', color: '#fff', boxSizing: 'border-box', outline: 'none' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '13px', color: colors.textMuted, display: 'block', marginBottom: '6px' }}>End Time</label>
                    <input required type="time" value={apptData.endTime} onChange={(e) => setApptData({...apptData, endTime: e.target.value})} style={{ width: '100%', padding: '10px', backgroundColor: '#0f0822', border: `1px solid ${colors.border}`, borderRadius: '6px', color: '#fff', boxSizing: 'border-box', outline: 'none' }} />
                  </div>
                </div>
                <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: colors.primary, color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
                  Confirm Appointment
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </SidebarLayout>
  );
};

export default Dashboard;