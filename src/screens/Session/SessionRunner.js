import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Square, Plus, Activity, Clock as ClockIcon, ArrowLeft, BrainCircuit } from 'lucide-react';
import API_URL from '../../config'; // Using dynamic config

const SessionRunner = () => {
  const { learnerId } = useParams();
  const navigate = useNavigate();
  
  const [learner, setLearner] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [session, setSession] = useState(null); 
  
  // Local state for instant UI updates
  const [counts, setCounts] = useState({});
  const [activeTimers, setActiveTimers] = useState({});
  
  // --- NEW: AI Tracking States ---
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [isGeneratingNote, setIsGeneratingNote] = useState(false);

  const colors = { bg: '#080514', card: '#130a2a', border: '#2d1b5e', primary: '#8b5cf6', danger: '#ef4444', success: '#10b981', textMuted: '#9ca3af' };

  // --- THE SECURITY GUARD ---
  const kickToLogin = () => {
    localStorage.removeItem('aura_user');
    window.location.href = '/login'; 
  };

  // --- 1. INITIAL LOAD ---
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch(`${API_URL}/api/session/programs/${learnerId}`, {
          credentials: 'include' 
        });
        
        if (res.status === 401 || res.status === 403) throw new Error("Unauthorized");
        if (!res.ok) throw new Error("Failed to load");
        
        const data = await res.json();
        
        setLearner(data.learner);
        setPrograms(data.programs);
        
        const initialCounts = {};
        data.programs.forEach(p => initialCounts[p.id] = 0);
        setCounts(initialCounts);
        
      } catch (err) {
        if (err.message === 'Unauthorized') kickToLogin();
        else {
          alert("Error loading learner programs.");
          navigate('/dashboard');
        }
      }
    };
    fetchPrograms();
  }, [learnerId, navigate]);

  // --- 2. START SESSION ---
  const handleStartSession = async () => {
    try {
      const res = await fetch(`${API_URL}/api/session/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ learnerId }),
        credentials: 'include' 
      });
      
      if (res.status === 401 || res.status === 403) throw new Error("Unauthorized");
      
      const data = await res.json();
      setSession(data);
      setSessionStartTime(Date.now()); // Record the exact start time for the AI
    } catch (err) {
      if (err.message === 'Unauthorized') kickToLogin();
      else alert("Failed to start session");
    }
  };

  // --- 3. LOG DATA (Frequency) ---
  const logFrequency = async (programId) => {
    if (!session) return alert("Please start the session first!");

    setCounts(prev => ({ ...prev, [programId]: prev[programId] + 1 }));

    try {
      const res = await fetch(`${API_URL}/api/session/trial`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: session.id, programId, value: 1 }),
        credentials: 'include' 
      });
      if (res.status === 401 || res.status === 403) kickToLogin();
    } catch (err) {
      console.error("Failed to sync trial to DB");
    }
  };

  // --- 4. LOG DATA (Duration) ---
  const toggleTimer = async (programId) => {
    if (!session) return alert("Please start the session first!");

    if (activeTimers[programId]) {
      const startTime = activeTimers[programId];
      const durationSeconds = Math.round((Date.now() - startTime) / 1000);
      
      setActiveTimers(prev => { const updated = {...prev}; delete updated[programId]; return updated; });
      setCounts(prev => ({ ...prev, [programId]: prev[programId] + durationSeconds }));

      try {
        await fetch(`${API_URL}/api/session/trial`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId: session.id, programId, value: durationSeconds }),
          credentials: 'include' 
        });
      } catch (err) {}
    } else {
      setActiveTimers(prev => ({ ...prev, [programId]: Date.now() }));
    }
  };

  // --- 5. END SESSION & GENERATE AI NOTE ---
  const handleEndSession = async () => {
    if (!window.confirm("End session and generate AI Clinical Note?")) return;

    setIsGeneratingNote(true); // Trigger the AI loading screen

    try {
      // Calculate how many minutes the session lasted
      const sessionDuration = sessionStartTime ? Math.round((Date.now() - sessionStartTime) / 60000) : 0;

      // Package the raw click data into readable text for Gemini
      const aiDataPayload = programs.reduce((acc, p) => {
        acc[p.title] = `${counts[p.id] || 0} ${p.target_type === 'Frequency' ? 'instances' : 'seconds'}`;
        return acc;
      }, {});

      // Call the Gemini Backend Controller
      const res = await fetch(`${API_URL}/api/sessions/generate-note`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: session.id,
          sessionDuration: sessionDuration === 0 ? 1 : sessionDuration, // Failsafe for fast tests
          behaviors: aiDataPayload,
          skills: aiDataPayload 
        }),
        credentials: 'include' 
      });

      if (res.status === 401 || res.status === 403) throw new Error('Unauthorized');
      if (!res.ok) throw new Error("Failed to generate AI note");

      // Success! Redirect to the Learner Profile to see the generated note and graph!
      navigate(`/learner/${learnerId}`); 

    } catch (err) {
      console.error(err);
      if (err.message === 'Unauthorized') kickToLogin();
      else alert("Failed to generate AI note. Please check your connection.");
      setIsGeneratingNote(false); // Only turn off loading if it failed (otherwise it redirects)
    }
  };

  if (!learner) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg, color: '#fff' }}><h2>Loading Clinical Workspace...</h2></div>;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.bg, color: '#fff', fontFamily: '"Inter", sans-serif', padding: '20px', position: 'relative' }}>
      
      {/* --- AI LOADING OVERLAY --- */}
      {isGeneratingNote && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(8, 5, 20, 0.9)', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <BrainCircuit size={64} color={colors.primary} style={{ animation: 'pulse 1.5s infinite', marginBottom: '24px' }} />
          <h2 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>MenPrac Intelligence is writing your note...</h2>
          <p style={{ color: colors.textMuted }}>Synthesizing clinical data into an insurance-ready format.</p>
        </div>
      )}

      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.card, padding: '20px', borderRadius: '12px', border: `1px solid ${colors.border}`, marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button onClick={() => navigate(-1)} style={{ backgroundColor: 'transparent', border: 'none', color: colors.textMuted, cursor: 'pointer' }}><ArrowLeft size={24} /></button>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px' }}>{learner.first_name} {learner.last_name}</h1>
            <p style={{ margin: 0, color: colors.textMuted }}>Live Data Collection</p>
          </div>
        </div>

        {!session ? (
          <button onClick={handleStartSession} style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: colors.success, color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
            <Play size={20} /> Start Session
          </button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: colors.success, fontWeight: 'bold' }}>
              <span style={{ width: '10px', height: '10px', backgroundColor: colors.success, borderRadius: '50%', display: 'inline-block', animation: 'pulse 1.5s infinite' }}></span>
              Session Active
            </div>
            <button onClick={handleEndSession} style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: colors.primary, color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
              <BrainCircuit size={20} fill="#fff" /> End & Generate Note
            </button>
          </div>
        )}
      </div>

      {/* TRACKING GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {programs.length === 0 && <p style={{ color: colors.textMuted }}>No active programs assigned to this learner.</p>}
        
        {programs.map(p => (
          <div key={p.id} style={{ backgroundColor: colors.card, border: `1px solid ${colors.border}`, borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', opacity: session ? 1 : 0.5, pointerEvents: session ? 'auto' : 'none', transition: '0.3s' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '20px' }}>{p.title}</h3>
              {p.target_type === 'Frequency' ? <Activity color="#3b82f6" /> : <ClockIcon color="#f59e0b" />}
            </div>

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <span style={{ fontSize: '48px', fontWeight: 'bold' }}>
                {counts[p.id] || 0}
              </span>
              <span style={{ color: colors.textMuted, fontSize: '16px', marginLeft: '8px' }}>
                {p.target_type === 'Frequency' ? 'clicks' : 'secs'}
              </span>
            </div>

            {p.target_type === 'Frequency' ? (
              <button 
                onClick={() => logFrequency(p.id)}
                style={{ width: '100%', height: '80px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.1s' }}
                onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
                onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <Plus size={40} />
              </button>
            ) : (
              <button 
                onClick={() => toggleTimer(p.id)}
                style={{ width: '100%', height: '80px', backgroundColor: activeTimers[p.id] ? colors.danger : '#f59e0b', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
              >
                {activeTimers[p.id] ? <><Square fill="#fff" /> Stop Tracking</> : <><Play fill="#fff" /> Start Timer</>}
              </button>
            )}

          </div>
        ))}
      </div>
      
    </div>
  );
};

export default SessionRunner;