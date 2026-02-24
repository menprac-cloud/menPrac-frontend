import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// Removed BrainCircuit since we are using your custom logo now
import { Activity, Users, FileText, MessageSquare, Settings } from 'lucide-react';

const SidebarLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const colors = { bg: '#080514', sidebar: '#0d071c', border: '#2d1b5e', primary: '#8b5cf6', textMuted: '#9ca3af', hover: '#1e1140' };

  const menuItems = [
    { name: 'Dashboard', icon: <Activity size={18}/>, route: '/dashboard' },
    { name: 'Clients', icon: <Users size={18}/>, route: '/learners' },
    { name: 'Programs', icon: <FileText size={18}/>, route: '/programs' },
    { name: 'Messages', icon: <MessageSquare size={18}/>, route: '/messages' },
    { name: 'Settings', icon: <Settings size={18}/>, route: '/settings' }
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: colors.bg, color: '#fff', fontFamily: '"Inter", sans-serif' }}>
      
      {/* SIDEBAR */}
      <aside style={{ width: '260px', backgroundColor: colors.sidebar, borderRight: `1px solid ${colors.border}`, display: 'flex', flexDirection: 'column', padding: '24px 0', flexShrink: 0 }}>
         
         {/* YOUR CUSTOM LOGO */}
         <h2 style={{ padding: '0 24px', margin: '0 0 30px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
           <img 
             src="/logo.png" 
             alt="MenPrac Logo" 
             style={{ height: '70px', width: 'auto', objectFit: 'contain' }} 
           />
         </h2>

         {/* MENU ITEMS */}
         {menuItems.map((item, i) => {
           const isActive = location.pathname.includes(item.route);
           return (
             <div 
               key={i} 
               onClick={() => navigate(item.route)} 
               style={{ 
                 display: 'flex', 
                 alignItems: 'center', 
                 gap: '12px', 
                 padding: '14px 24px', 
                 color: isActive ? colors.primary : colors.textMuted, 
                 backgroundColor: isActive ? colors.hover : 'transparent', 
                 borderRight: isActive ? `3px solid ${colors.primary}` : 'none', 
                 cursor: 'pointer', 
                 fontWeight: '500', 
                 transition: '0.2s' 
               }}
             >
               {item.icon} {item.name}
             </div>
           );
         })}
      </aside>

      {/* MAIN CONTENT AREA */}
      <main style={{ flex: 1, overflowY: 'auto' }}>
        {children}
      </main>

    </div>
  );
};

export default SidebarLayout;