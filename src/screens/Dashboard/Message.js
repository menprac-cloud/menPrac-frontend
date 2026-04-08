import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  Send,
  Shield,
  Info,
  Phone,
  Video,
  CheckCheck,
  Paperclip,
  Smile,
  Inbox,
  LayoutGrid,
  Calendar,
  Users,
  DollarSign,
  Briefcase,
  List,
  FileText,
  Share2,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  SearchIcon,
} from "lucide-react";
import API_URL from "../../config";

const Messages = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // --- UI & NAVIGATION STATE ---
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [myId, setMyId] = useState(null);

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  const theme = {
    primary: "#8b5cf6",
    sidebar: "#2a1a4a",
    sidebarHover: "#3b2568",
    border: "#e5e7eb",
    bgLight: "#f9fafb",
    textMain: "#111827",
    textMuted: "#6b7280",
    success: "#10b981",
  };

  const navItems = [
    { name: "Get started", icon: LayoutGrid, path: "/dashboard" },
    { name: "Calendar", icon: Calendar, path: "/calendar" },
    { name: "Inbox", icon: Inbox, path: "/messages" },
    { name: "Clients", icon: Users, path: "/learners" },
    { name: "Billing", icon: DollarSign, path: "/billing" },
    { name: "Your team", icon: Briefcase, path: "/team" },
  ];

  // --- INITIALIZATION ---
  useEffect(() => {
    const storedUser = localStorage.getItem("aura_user");
    if (!storedUser) {
      window.location.href = "/login";
      return;
    }
    const user = JSON.parse(storedUser);
    setMyId(user.id);

    // Mock/Fetch Contacts
    fetch(`${API_URL}/api/messages/contacts`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setContacts(data);
      })
      .catch(() => {
        // Mock data if API fails for demo
        setContacts([
          {
            id: 1,
            name: "Wendy Smith",
            role: "Clinical Supervisor",
            lastMsg: "Please review the assessment.",
          },
          {
            id: 2,
            name: "Michael Vance",
            role: "Case Manager",
            lastMsg: "Client is arriving now.",
          },
        ]);
      });

    socketRef.current = io(API_URL);
    socketRef.current.emit("register_user", user.id);
    socketRef.current.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socketRef.current?.disconnect();
  }, []);

  // Fetch Conversation
  useEffect(() => {
    if (!selectedContact) return;
    fetch(`${API_URL}/api/messages/${selectedContact.id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setMessages(data);
      })
      .catch(() => setMessages([]));
  }, [selectedContact]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedContact) return;

    const tempMsg = {
      sender_id: myId,
      content: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, tempMsg]);
    setNewMessage("");

    try {
      await fetch(`${API_URL}/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          receiverId: selectedContact.id,
          content: newMessage,
        }),
        credentials: "include",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: theme.bgLight,
        overflow: "hidden",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* ================= 1. GLOBAL SIDEBAR ================= */}
      <aside
        style={{
          width: isCollapsed ? "70px" : "240px",
          backgroundColor: theme.sidebar,
          transition: "width 0.2s ease-in-out",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          color: "#fff",
        }}
      >
        <div
          style={{
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: isCollapsed ? "center" : "space-between",
          }}
        >
          {!isCollapsed && (
            <span style={{ fontWeight: "bold", fontSize: "18px" }}>
              Menprac
            </span>
          )}
          <div
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{ cursor: "pointer", opacity: 0.7 }}
          >
            {isCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </div>
        </div>

        <nav style={{ flex: 1, padding: "0 10px" }}>
          {navItems.map((item) => (
            <div
              key={item.name}
              onClick={() => navigate(item.path)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 14px",
                borderRadius: "8px",
                cursor: "pointer",
                backgroundColor:
                  location.pathname === item.path
                    ? theme.sidebarHover
                    : "transparent",
                color: location.pathname === item.path ? "#fff" : "#a79bc8",
                justifyContent: isCollapsed ? "center" : "flex-start",
                marginBottom: "2px",
              }}
            >
              <item.icon size={20} />
              {!isCollapsed && (
                <span style={{ fontSize: "14px" }}>{item.name}</span>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* ================= 2. CONVERSATION LIST (Middle) ================= */}
      <div
        style={{
          width: "350px",
          backgroundColor: "#fff",
          borderRight: `1px solid ${theme.border}`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{ padding: "20px", borderBottom: `1px solid ${theme.border}` }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <h2 style={{ fontSize: "20px", fontWeight: "700", margin: 0 }}>
              Inbox
            </h2>
            <button
              style={{
                background: "none",
                border: "none",
                color: theme.primary,
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              + Compose
            </button>
          </div>
          <div style={{ position: "relative" }}>
            <Search
              size={16}
              style={{
                position: "absolute",
                left: "12px",
                top: "12px",
                color: theme.textMuted,
              }}
            />
            <input
              placeholder="Search conversations..."
              style={{
                width: "100%",
                padding: "10px 12px 10px 40px",
                borderRadius: "8px",
                border: `1px solid ${theme.border}`,
                backgroundColor: theme.bgLight,
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto" }}>
          <div
            style={{
              padding: "10px 20px",
              fontSize: "11px",
              fontWeight: "bold",
              color: theme.textMuted,
              textTransform: "uppercase",
            }}
          >
            Recent Messages
          </div>
          {contacts.map((c) => (
            <div
              key={c.id}
              onClick={() => setSelectedContact(c)}
              style={{
                padding: "16px 20px",
                display: "flex",
                gap: "12px",
                cursor: "pointer",
                backgroundColor:
                  selectedContact?.id === c.id ? "#f3e8ff" : "transparent",
                borderLeft:
                  selectedContact?.id === c.id
                    ? `4px solid ${theme.primary}`
                    : "4px solid transparent",
                transition: "0.2s",
              }}
            >
              <div
                style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "50%",
                  backgroundColor: theme.primary,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  flexShrink: 0,
                }}
              >
                {c.name[0]}
              </div>
              <div style={{ flex: 1, overflow: "hidden" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "2px",
                  }}
                >
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>
                    {c.name}
                  </span>
                  <span style={{ fontSize: "10px", color: theme.textMuted }}>
                    12:45 PM
                  </span>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "12px",
                    color: theme.textMuted,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {c.lastMsg || c.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= 3. CHAT WINDOW (Right) ================= */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fff",
        }}
      >
        {selectedContact ? (
          <>
            {/* Header */}
            <div
              style={{
                padding: "0 24px",
                height: "70px",
                borderBottom: `1px solid ${theme.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    backgroundColor: theme.primary,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                  }}
                >
                  {selectedContact.name[0]}
                </div>
                <div>
                  <h3
                    style={{ margin: 0, fontSize: "15px", fontWeight: "700" }}
                  >
                    {selectedContact.name}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "11px",
                      color: theme.success,
                      fontWeight: "600",
                    }}
                  >
                    <Shield size={10} /> Secure HIPAA Channel
                  </div>
                </div>
              </div>
              <div
                style={{ display: "flex", gap: "20px", color: theme.textMuted }}
              >
                <Phone size={18} style={{ cursor: "pointer" }} />
                <Video size={18} style={{ cursor: "pointer" }} />
                <MoreHorizontal size={18} style={{ cursor: "pointer" }} />
              </div>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                padding: "24px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                backgroundImage: `radial-gradient(${theme.border} 1px, transparent 0)`,
                backgroundSize: "24px 24px",
              }}
            >
              {messages.map((msg, idx) => {
                const isMine = msg.sender_id === myId;
                return (
                  <div
                    key={idx}
                    style={{
                      alignSelf: isMine ? "flex-end" : "flex-start",
                      maxWidth: "70%",
                    }}
                  >
                    <div
                      style={{
                        padding: "12px 16px",
                        borderRadius: "12px",
                        fontSize: "14px",
                        backgroundColor: isMine ? theme.primary : theme.bgLight,
                        color: isMine ? "#fff" : theme.textMain,
                        border: isMine ? "none" : `1px solid ${theme.border}`,
                        borderBottomRightRadius: isMine ? "2px" : "12px",
                        borderBottomLeftRadius: isMine ? "12px" : "2px",
                      }}
                    >
                      {msg.content}
                    </div>
                    <div
                      style={{
                        fontSize: "10px",
                        color: theme.textMuted,
                        marginTop: "4px",
                        textAlign: isMine ? "right" : "left",
                        display: "flex",
                        gap: "4px",
                        justifyContent: isMine ? "flex-end" : "flex-start",
                      }}
                    >
                      {msg.time || "12:45 PM"}{" "}
                      {isMine && <CheckCheck size={12} />}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Footer Input */}
            <div
              style={{
                padding: "20px 24px",
                borderTop: `1px solid ${theme.border}`,
              }}
            >
              <form
                onSubmit={handleSendMessage}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  backgroundColor: theme.bgLight,
                  padding: "10px 16px",
                  borderRadius: "24px",
                  border: `1px solid ${theme.border}`,
                }}
              >
                <Paperclip
                  size={18}
                  color={theme.textMuted}
                  style={{ cursor: "pointer" }}
                />
                <input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a secure message..."
                  style={{
                    flex: 1,
                    border: "none",
                    backgroundColor: "transparent",
                    outline: "none",
                    fontSize: "14px",
                  }}
                />
                <Smile
                  size={18}
                  color={theme.textMuted}
                  style={{ cursor: "pointer" }}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: theme.primary,
                    color: "#fff",
                    border: "none",
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: theme.textMuted,
            }}
          >
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                backgroundColor: theme.bgLight,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <Inbox size={48} color={theme.primary} />
            </div>
            <h2 style={{ color: theme.textMain }}>
              Secure in-app messaging made simple
            </h2>
            <p>
              Select a colleague or client to start a HIPAA-compliant
              conversation.
            </p>
            <button
              style={{
                backgroundColor: theme.primary,
                color: "#fff",
                border: "none",
                padding: "10px 24px",
                borderRadius: "8px",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              Secure message
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
