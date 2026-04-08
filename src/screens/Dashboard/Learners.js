import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  Plus,
  UserPlus,
  Filter,
  FileUp,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Calendar,
  Inbox,
  Users,
  DollarSign,
  Briefcase,
  List,
  FileText,
  Share2,
  Menu,
  X,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

const Learners = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // --- UI STATE ---
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // --- DUMMY DATA FOR TESTERS ---
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "Bobby Doe",
      email: "bobby.d@outlook.com",
      phone: "+1 (555) 010-4432",
      status: "Active",
      tags: ["Intake", "Insurance"],
      lastSeen: "2 hrs ago",
      color: "#8B5CF6",
    },
    {
      id: 2,
      name: "Sarah Jenkins",
      email: "s.jenkins@gmail.com",
      phone: "+1 (555) 010-9988",
      status: "Waitlist",
      tags: ["Elevated Risk"],
      lastSeen: "Yesterday",
      color: "#EF4444",
    },
    {
      id: 3,
      name: "Michael Vance",
      email: "m.vance@company.io",
      phone: "+1 (555) 012-3321",
      status: "Active",
      tags: ["Couple"],
      lastSeen: "3 days ago",
      color: "#10B981",
    },
    {
      id: 4,
      name: "Elena Rodriguez",
      email: "elena.rod@provider.com",
      phone: "+1 (555) 015-7766",
      status: "Lead",
      tags: ["Referral"],
      lastSeen: "1 week ago",
      color: "#F59E0B",
    },
    {
      id: 5,
      name: "John Smith",
      email: "jsmith@example.com",
      phone: "+1 (555) 019-1122",
      status: "Inactive",
      tags: ["Archived"],
      lastSeen: "1 month ago",
      color: "#6B7280",
    },
  ]);

  // --- THEME ---
  const theme = {
    sidebarBg: "#2a1a4a",
    sidebarHover: "#3b2568",
    primary: "#8b5cf6",
    bgLight: "#f9fafb",
    border: "#e5e7eb",
    textMain: "#111827",
    textMuted: "#6b7280",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // --- SHARED SIDEBAR COMPONENT (Inline) ---
  const SidebarItem = ({ icon: Icon, name, path }) => {
    const isActive = location.pathname === path;
    return (
      <div
        onClick={() => navigate(path)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "12px 16px",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "4px",
          backgroundColor: isActive ? theme.sidebarHover : "transparent",
          color: isActive ? "#fff" : "#a79bc8",
          transition: "all 0.2s ease",
          justifyContent: isSidebarCollapsed ? "center" : "flex-start",
        }}
      >
        <Icon size={20} />
        {!isSidebarCollapsed && (
          <span
            style={{ fontSize: "14px", fontWeight: isActive ? "600" : "500" }}
          >
            {name}
          </span>
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        backgroundColor: theme.bgLight,
        fontFamily: '"Inter", sans-serif',
        overflow: "hidden",
      }}
    >
      {/* NOTIFICATION */}
      {notification && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
            backgroundColor: theme.primary,
            color: "#fff",
            padding: "12px 24px",
            borderRadius: "30px",
            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: "600",
          }}
        >
          <CheckCircle2 size={18} /> {notification}
        </div>
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        style={{
          width: isSidebarCollapsed ? "80px" : "260px",
          backgroundColor: theme.sidebarBg,
          transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          position: "relative",
        }}
      >
        <div
          style={{
            padding: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: isSidebarCollapsed ? "center" : "space-between",
          }}
        >
          {!isSidebarCollapsed && (
            <span
              style={{ color: "#fff", fontSize: "20px", fontWeight: "bold" }}
            >
              Menprac
            </span>
          )}
          <div
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            style={{ cursor: "pointer", color: "#a79bc8" }}
          >
            {isSidebarCollapsed ? (
              <Menu size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </div>
        </div>

        <nav style={{ flex: 1, padding: "0 12px" }}>
          <SidebarItem icon={LayoutGrid} name="Get started" path="/dashboard" />
          <SidebarItem icon={Calendar} name="Calendar" path="/calendar" />
          <SidebarItem icon={Inbox} name="Inbox" path="/messages" />
          <SidebarItem icon={Users} name="Clients" path="/learners" />
          <SidebarItem icon={DollarSign} name="Billing" path="/billing" />
          <SidebarItem icon={Briefcase} name="Your team" path="/team" />
          <SidebarItem icon={FileText} name="Templates" path="/templates" />
        </nav>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* HEADER */}
        <header
          style={{
            height: "70px",
            backgroundColor: "#fff",
            borderBottom: `1px solid ${theme.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 32px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <h1
              style={{
                fontSize: "20px",
                fontWeight: "700",
                color: theme.textMain,
                margin: 0,
              }}
            >
              Clients
            </h1>
            <div style={{ position: "relative" }}>
              <Search
                size={18}
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "10px",
                  color: theme.textMuted,
                }}
              />
              <input
                type="text"
                placeholder="Search by name, email, or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: "10px 12px 10px 40px",
                  borderRadius: "8px",
                  border: `1px solid ${theme.border}`,
                  width: "320px",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 16px",
                borderRadius: "8px",
                border: `1px solid ${theme.border}`,
                backgroundColor: "#fff",
                color: theme.textMain,
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              <FileUp size={16} /> Import
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 16px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: theme.primary,
                color: "#fff",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "14px",
                boxShadow: "0 4px 6px -1px rgba(139, 92, 246, 0.2)",
              }}
            >
              <Plus size={16} /> New Client
            </button>
          </div>
        </header>

        {/* DATA TABLE AREA */}
        <div style={{ flex: 1, padding: "32px", overflowY: "auto" }}>
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              border: `1px solid ${theme.border}`,
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            {/* TABLE HEADER */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.5fr 1fr 1fr 1fr 0.5fr",
                padding: "16px 24px",
                borderBottom: `1px solid ${theme.border}`,
                backgroundColor: "#fafafa",
                borderRadius: "12px 12px 0 0",
              }}
            >
              {["Client Name", "Contact", "Status", "Tags", ""].map((h) => (
                <span
                  key={h}
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: theme.textMuted,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {h}
                </span>
              ))}
            </div>

            {/* TABLE ROWS */}
            {filteredClients.map((client) => (
              <div
                key={client.id}
                onClick={() => navigate(`/learner/${client.id}`)}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.5fr 1fr 1fr 1fr 0.5fr",
                  padding: "20px 24px",
                  borderBottom: `1px solid ${theme.border}`,
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f9fafb")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                {/* NAME & AVATAR */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: `${client.color}20`,
                      color: client.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    {client.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div style={{ fontWeight: "600", color: theme.textMain }}>
                      {client.name}
                    </div>
                    <div style={{ fontSize: "12px", color: theme.textMuted }}>
                      ID: MP-00{client.id}
                    </div>
                  </div>
                </div>

                {/* CONTACT INFO */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "13px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      color: theme.textMain,
                    }}
                  >
                    <Mail size={12} color={theme.textMuted} /> {client.email}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      color: theme.textMuted,
                    }}
                  >
                    <Phone size={12} /> {client.phone}
                  </div>
                </div>

                {/* STATUS PILL */}
                <div>
                  <span
                    style={{
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "700",
                      backgroundColor:
                        client.status === "Active"
                          ? "#E1FCEF"
                          : client.status === "Waitlist"
                            ? "#FEE2E2"
                            : "#F3F4F6",
                      color:
                        client.status === "Active"
                          ? "#065F46"
                          : client.status === "Waitlist"
                            ? "#991B1B"
                            : "#374151",
                    }}
                  >
                    {client.status}
                  </span>
                </div>

                {/* TAGS */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {client.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: "11px",
                        backgroundColor: "#EDE9FE",
                        color: "#6D28D9",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        fontWeight: "600",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* ACTIONS */}
                <div style={{ textAlign: "right" }}>
                  <button
                    style={{
                      border: "none",
                      background: "none",
                      color: theme.textMuted,
                      cursor: "pointer",
                    }}
                  >
                    <MoreHorizontal size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- ADD CLIENT MODAL --- */}
        {isModalOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(17, 24, 39, 0.6)",
              backdropFilter: "blur(4px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "16px",
                padding: "32px",
                width: "100%",
                maxWidth: "480px",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "24px",
                }}
              >
                <h2 style={{ fontSize: "20px", fontWeight: "700", margin: 0 }}>
                  Add New Client
                </h2>
                <X
                  size={20}
                  style={{ cursor: "pointer", color: theme.textMuted }}
                  onClick={() => setIsModalOpen(false)}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "12px",
                  }}
                >
                  <div>
                    <label
                      style={{
                        fontSize: "13px",
                        fontWeight: "600",
                        marginBottom: "6px",
                        display: "block",
                      }}
                    >
                      First Name
                    </label>
                    <input
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "8px",
                        border: `1px solid ${theme.border}`,
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        fontSize: "13px",
                        fontWeight: "600",
                        marginBottom: "6px",
                        display: "block",
                      }}
                    >
                      Last Name
                    </label>
                    <input
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "8px",
                        border: `1px solid ${theme.border}`,
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      marginBottom: "6px",
                      display: "block",
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "8px",
                      border: `1px solid ${theme.border}`,
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      marginBottom: "6px",
                      display: "block",
                    }}
                  >
                    Status
                  </label>
                  <select
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "8px",
                      border: `1px solid ${theme.border}`,
                    }}
                  >
                    <option>Active</option>
                    <option>Waitlist</option>
                    <option>Lead</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    showNotification("Client profile created successfully!");
                  }}
                  style={{
                    backgroundColor: theme.primary,
                    color: "#fff",
                    border: "none",
                    padding: "14px",
                    borderRadius: "8px",
                    fontWeight: "700",
                    marginTop: "12px",
                    cursor: "pointer",
                  }}
                >
                  Create Client
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Learners;
