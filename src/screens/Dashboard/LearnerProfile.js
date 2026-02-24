import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SidebarLayout from '../../components/SidebarLayout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { BrainCircuit, Calendar, ArrowLeft, UserCircle, Stethoscope, FileSignature } from 'lucide-react';
import API_URL from '../../config';

const LearnerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [learner, setLearner] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [programsTracked, setProgramsTracked] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Get the logged-in clinician's name from local storage
  const clinicianUser = JSON.parse(localStorage.getItem('aura_user') || '{}');
  const clinicianName = clinicianUser.name || clinicianUser.clinic_name || 'Authorized Provider';

  const colors = { bg: '#080514', card: '#130a2a', border: '#2d1b5e', primary: '#8b5cf6', textMuted: '#9ca3af', success: '#10b981', headerBg: '#0f0822' };
  const lineColors = ['#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#3b82f6'];

  const kickToLogin = () => {
    localStorage.removeItem('aura_user');
    window.location.href = '/login'; 
  };

  // --- THE MAGIC FORMATTER ---
  const formatAINote = (text) => {
    if (!text) return null;
    
    return text.split('\n').map((line, idx) => {
      if (line.trim() === '') return <div key={idx} style={{ height: '12px' }} />;
      
      // Handle Bullet Points
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        line = line.replace(/^[\*-]\s/, '• ');
      }

      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <div key={idx} style={{ margin: '0 0 6px 0', color: '#e2e8f0', lineHeight: '1.6', fontSize: '14.5px' }}>
          {parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={i} style={{ color: colors.primary, letterSpacing: '0.5px' }}>{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </div>
      );
    });
  };

  useEffect(() => {
    const fetchRealProfileData = async () => {
      try {
        const res = await fetch(`${API_URL}/api/learners/${id}/profile`, {
          credentials: 'include' 
        });
        
        if (res.status === 401 || res.status === 403) throw new Error('Unauthorized');
        if (!res.ok) throw new Error("Failed to fetch profile");
        
        const data = await res.json();
        
        setLearner(data.learner);
        setSessions(data.sessions);
        setGraphData(data.graphData);

        const uniquePrograms = new Set();
        data.graphData.forEach(day => {
          Object.keys(day).forEach(key => {
            if (key !== 'date') uniquePrograms.add(key);
          });
        });
        setProgramsTracked(Array.from(uniquePrograms));

      } catch (err) {
        console.error("Error loading real data:", err);
        if (err.message === 'Unauthorized') kickToLogin();
      } finally {
        setLoading(false);
      }
    };
    
    fetchRealProfileData();
  }, [id]);

  if (loading) return <SidebarLayout><div style={{ padding: '40px', color: '#fff' }}>Loading Profile...</div></SidebarLayout>;
  if (!learner) return <SidebarLayout><div style={{ padding: '40px', color: '#fff' }}>Learner not found.</div></SidebarLayout>;

  return (
    <SidebarLayout>
      <div style={{ padding: '30px 40px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
          <button onClick={() => navigate(-1)} style={{ backgroundColor: colors.card, border: `1px solid ${colors.border}`, color: '#fff', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 style={{ margin: '0 0 4px 0', fontSize: '28px' }}>{learner.first_name} {learner.last_name}'s Profile</h1>
            <p style={{ margin: 0, color: colors.textMuted }}>Real-time clinical data and AI session insights.</p>
          </div>
        </div>

        {/* VISUAL GRAPH */}
        <div style={{ backgroundColor: colors.card, border: `1px solid ${colors.border}`, borderRadius: '12px', padding: '24px', marginBottom: '30px' }}>
          <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#fff' }}>Behavioral Progress Tracking</h2>
          
          {graphData.length === 0 ? (
            <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.textMuted }}>
              No data collected yet. Start a session and track targets to generate this graph.
            </div>
          ) : (
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={graphData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
                  <XAxis dataKey="date" stroke={colors.textMuted} />
                  <YAxis stroke={colors.textMuted} />
                  <Tooltip contentStyle={{ backgroundColor: colors.bg, borderColor: colors.border }} />
                  <Legend />
                  
                  {programsTracked.map((programName, index) => (
                    <Line 
                      key={programName} 
                      type="monotone" 
                      dataKey={programName} 
                      stroke={lineColors[index % lineColors.length]} 
                      strokeWidth={3} 
                      activeDot={{ r: 8 }} 
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* AI SESSION NOTES WITH CLINICAL HEADER */}
        <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileSignature size={20} color={colors.primary} /> Clinical Notes & AI Summaries
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {sessions.length === 0 ? (
            <p style={{ color: colors.textMuted }}>No completed sessions yet.</p>
          ) : (
            sessions.map(session => (
              <div key={session.id} style={{ backgroundColor: colors.card, border: `1px solid ${colors.border}`, borderRadius: '12px', overflow: 'hidden' }}>
                
                {/* --- FORMAL CLINICAL HEADER --- */}
                <div style={{ backgroundColor: colors.headerBg, borderBottom: `1px solid ${colors.border}`, padding: '16px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <UserCircle size={18} color={colors.textMuted} />
                    <div style={{ fontSize: '13px', color: colors.textMuted }}>
                      Client: <strong style={{ color: '#fff', fontSize: '14px', marginLeft: '4px' }}>{learner.first_name} {learner.last_name}</strong>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Stethoscope size={18} color={colors.textMuted} />
                    <div style={{ fontSize: '13px', color: colors.textMuted }}>
                      Examiner: <strong style={{ color: '#fff', fontSize: '14px', marginLeft: '4px' }}>{clinicianName}</strong>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Calendar size={18} color={colors.textMuted} />
                    <div style={{ fontSize: '13px', color: colors.textMuted }}>
                      Date of Service: <strong style={{ color: '#fff', fontSize: '14px', marginLeft: '4px' }}>{session.date}</strong>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <BrainCircuit size={18} color={colors.primary} />
                    <div style={{ fontSize: '13px', color: colors.textMuted }}>
                      Service Type: <strong style={{ color: colors.primary, fontSize: '14px', marginLeft: '4px' }}>Clinical Therapy Session</strong>
                    </div>
                  </div>
                </div>

                {/* --- AI GENERATED NARRATIVE --- */}
                <div style={{ padding: '24px' }}>
                  <div style={{ flex: 1 }}>
                    {formatAINote(session.note)}
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </SidebarLayout>
  );
};

export default LearnerProfile;