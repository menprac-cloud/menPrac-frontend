import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import SidebarLayout from '../../components/SidebarLayout';
import { Search, Send, User } from 'lucide-react';
import API_URL from '../../config'; // Use dynamic URL

const Messages = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [myId, setMyId] = useState(null);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  const colors = { bg: '#080514', sidebar: '#0d071c', card: '#130a2a', border: '#2d1b5e', primary: '#8b5cf6', textMuted: '#9ca3af', myMsg: '#8b5cf6', theirMsg: '#1e1140' };

  // 1. Initial Load & Socket Connection
  useEffect(() => {
    // Look for the user profile data instead of the token
    const storedUser = localStorage.getItem('aura_user');
    
    if (!storedUser) {
      window.location.href = '/login';
      return;
    }
    
    const user = JSON.parse(storedUser);
    setMyId(user.id);

    // Fetch Contacts (The browser automatically attaches the secure cookie!)
    fetch(`${API_URL}/api/messages/contacts`, {
      credentials: 'include' 
    })
    .then(res => res.json())
    .then(data => {
      if(Array.isArray(data)) setContacts(data);
    })
    .catch(err => console.error("Error fetching contacts:", err));

    // Connect Socket & Register ID for private messages
    socketRef.current = io(API_URL);
    socketRef.current.emit('register_user', user.id);

    // Listen for incoming messages
    socketRef.current.on('receive_message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, []);

  // 2. Fetch Chat History when a contact is clicked
  useEffect(() => {
    if (!selectedContact) return;
    
    fetch(`${API_URL}/api/messages/${selectedContact.id}`, {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      if(Array.isArray(data)) setMessages(data);
    })
    .catch(err => console.error("Error fetching messages:", err));
  }, [selectedContact]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 3. Send Message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedContact) return;

    try {
      const res = await fetch(`${API_URL}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ receiverId: selectedContact.id, content: newMessage }),
        credentials: 'include'
      });
      
      if (!res.ok) throw new Error("Failed to send message");
      
      const savedMsg = await res.json();
      setMessages([...messages, savedMsg]); 
      setNewMessage(''); 
    } catch (err) {
      console.error("Message Send Error:", err);
    }
  };

  return (
    <SidebarLayout>
      <div style={{ display: 'flex', height: '100vh', backgroundColor: colors.bg }}>
        
        {/* LEFT PANE: CONTACTS */}
        <div style={{ width: '300px', borderRight: `1px solid ${colors.border}`, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '24px', borderBottom: `1px solid ${colors.border}` }}>
            <h2 style={{ margin: '0 0 16px 0', fontSize: '20px' }}>Staff Directory</h2>
            <div style={{ display: 'flex', gap: '8px', padding: '10px', backgroundColor: colors.card, borderRadius: '8px', border: `1px solid ${colors.border}` }}>
              <Search size={16} color={colors.textMuted} />
              <input type="text" placeholder="Search staff..." style={{ backgroundColor: 'transparent', border: 'none', color: '#fff', width: '100%', outline: 'none' }} />
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {contacts.length === 0 ? <p style={{ padding: '24px', color: colors.textMuted, textAlign: 'center' }}>No other staff accounts found.</p> : null}
            {contacts.map(c => (
              <div 
                key={c.id} 
                onClick={() => setSelectedContact(c)}
                style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', borderBottom: `1px solid ${colors.border}`, backgroundColor: selectedContact?.id === c.id ? colors.card : 'transparent', transition: '0.2s' }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: colors.border, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={20} color={colors.primary} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '15px' }}>{c.name || c.clinic_name}</h4>
                  <p style={{ margin: 0, fontSize: '12px', color: colors.textMuted }}>{c.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANE: CHAT WINDOW */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {!selectedContact ? (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.textMuted }}>
              <h3>Select a conversation to start messaging.</h3>
            </div>
          ) : (
             <>
              {/* Chat Header */}
              <div style={{ padding: '24px', borderBottom: `1px solid ${colors.border}`, backgroundColor: colors.card }}>
                <h3 style={{ margin: 0, fontSize: '18px' }}>{selectedContact.name || selectedContact.clinic_name}</h3>
                <p style={{ margin: 0, fontSize: '13px', color: colors.primary }}>Secure HIPAA-Compliant Channel</p>
              </div>

              {/* Chat Messages */}
              <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {messages.length === 0 && <p style={{ textAlign: 'center', color: colors.textMuted }}>This is the beginning of your conversation.</p>}
                
                {messages.map((msg, idx) => {
                  const isMine = msg.sender_id === myId;
                  return (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: isMine ? 'flex-end' : 'flex-start' }}>
                      <div style={{ 
                        maxWidth: '60%', padding: '12px 16px', borderRadius: '12px', 
                        backgroundColor: isMine ? colors.myMsg : colors.theirMsg,
                        borderBottomRightRadius: isMine ? '4px' : '12px',
                        borderBottomLeftRadius: isMine ? '12px' : '4px',
                      }}>
                        <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.4' }}>{msg.content}</p>
                      </div>
                      <span style={{ fontSize: '11px', color: colors.textMuted, marginTop: '4px' }}>{msg.time}</span>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div style={{ padding: '24px', borderTop: `1px solid ${colors.border}`, backgroundColor: colors.bg }}>
                <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '12px' }}>
                  <input 
                    type="text" 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a secure message..." 
                    style={{ flex: 1, padding: '14px', backgroundColor: colors.card, border: `1px solid ${colors.border}`, borderRadius: '8px', color: '#fff', fontSize: '15px', outline: 'none' }} 
                  />
                  <button type="submit" style={{ padding: '0 20px', backgroundColor: colors.primary, color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s' }}>
                    <Send size={20} />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>

      </div>
    </SidebarLayout>
  );
};

export default Messages;