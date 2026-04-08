import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  Calendar,
  Inbox,
  Users,
  DollarSign,
  Briefcase,
  List,
  FileText,
  Share2,
  Plus,
  ChevronLeft,
  CheckCircle2,
  MapPin,
  ClipboardList,
  RefreshCw,
  CreditCard,
  Menu,
  Bell,
  Search,
  TrendingUp,
  Clock,
  MoreHorizontal,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import API_URL from "../../config";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // --- UI STATE ---
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(2);

  // --- DATA STATE ---
  const [data, setData] = useState({
    clinicianName: "",
    metrics: { totalClients: 12, revenue: "$4,250", sessions: 28 },
    schedule: [
      {
        id: 1,
        time: "09:00 AM",
        patient: "Bobby Doe",
        type: "Intake",
        status: "Upcoming",
      },
      {
        id: 2,
        time: "11:30 AM",
        patient: "Sarah Jenkins",
        type: "Follow-up",
        status: "In 2h",
      },
    ],
    caseload: [
      { id: 101, name: "Bobby Doe", lastSeen: "2 days ago", progress: 80 },
      { id: 102, name: "Sarah Jenkins", lastSeen: "Yesterday", progress: 45 },
    ],
  });

  const theme = {
    sidebarBg: "#2a1a4a",
    sidebarHover: "#3b2568",
    sidebarText: "#a79bc8",
    primary: "#8b5cf6",
    bgLight: "#f9fafb",
    border: "#e5e7eb",
    textMain: "#111827",
    textMuted: "#6b7280",
    success: "#10b981",
  };

  useEffect(() => {
    // Simulate API Load
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const navItems = [
    { name: "Dashboard", icon: LayoutGrid, path: "/dashboard" },
    { name: "Calendar", icon: Calendar, path: "/calendar" },
    { name: "Inbox", icon: Inbox, path: "/messages" },
    { name: "Clients", icon: Users, path: "/learners" },
    { name: "Billing", icon: DollarSign, path: "/billing" },
    { name: "Templates", icon: FileText, path: "/templates" },
  ];

  const onboardingSteps = [
    { id: 1, title: "Verify email", completed: true, icon: ShieldCheck },
    { id: 2, title: "Set your location", completed: false, icon: MapPin },
    { id: 3, title: "Add services", completed: false, icon: ClipboardList },
    { id: 4, title: "Sync calendar", completed: false, icon: RefreshCw },
  ];

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.bgLight,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <RefreshCw className="animate-spin" size={40} color={theme.primary} />
          <h2 style={{ marginTop: "16px", color: theme.textMain }}>
            Building your workspace...
          </h2>
        </div>
      </div>
    );

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        backgroundColor: theme.bgLight,
        overflow: "hidden",
      }}
    >
      {/* ================= COLLAPSIBLE SIDEBAR ================= */}
      <aside
        style={{
          width: isCollapsed ? "80px" : "260px",
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
            justifyContent: isCollapsed ? "center" : "space-between",
          }}
        >
          {!isCollapsed && (
            <span
              style={{ color: "#fff", fontSize: "20px", fontWeight: "bold" }}
            >
              Menprac
            </span>
          )}
          <div
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{ cursor: "pointer", color: theme.sidebarText }}
          >
            {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
          </div>
        </div>

        <nav
          style={{
            flex: 1,
            padding: "0 12px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <div
                key={item.name}
                onClick={() => navigate(item.path)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  backgroundColor: isActive
                    ? theme.sidebarHover
                    : "transparent",
                  color: isActive ? "#fff" : theme.sidebarText,
                  justifyContent: isCollapsed ? "center" : "flex-start",
                  transition: "all 0.2s ease",
                }}
              >
                <item.icon size={20} />
                {!isCollapsed && (
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: isActive ? "600" : "500",
                    }}
                  >
                    {item.name}
                  </span>
                )}
              </div>
            );
          })}
        </nav>

        {!isCollapsed && (
          <div style={{ padding: "16px", marginBottom: "10px" }}>
            <div
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                borderRadius: "12px",
                padding: "16px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  color: theme.sidebarText,
                }}
              >
                Trial ends in 14 days
              </p>
              <button
                style={{
                  width: "100%",
                  marginTop: "10px",
                  backgroundColor: theme.primary,
                  border: "none",
                  color: "#fff",
                  padding: "8px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Upgrade Pro
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {/* TOP NAVBAR */}
        <header
          style={{
            height: "70px",
            backgroundColor: "#fff",
            borderBottom: `1px solid ${theme.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 32px",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "700", margin: 0 }}>
              Dashboard
            </h2>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ position: "relative" }}>
              <Bell size={20} color={theme.textMuted} />
              <div
                style={{
                  position: "absolute",
                  top: -2,
                  right: -2,
                  width: 8,
                  height: 8,
                  backgroundColor: theme.primary,
                  borderRadius: "50%",
                  border: "2px solid #fff",
                }}
              ></div>
            </div>
            <button
              onClick={() => navigate("/learners")}
              style={{
                backgroundColor: theme.primary,
                color: "#fff",
                border: "none",
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
              }}
            >
              <Plus size={16} /> New Client
            </button>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: theme.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              OA
            </div>
          </div>
        </header>

        {/* DASHBOARD BODY */}
        <div style={{ padding: "40px" }}>
          {/* 1. KEY METRICS */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "20px",
              marginBottom: "32px",
            }}
          >
            {[
              {
                label: "Total Revenue",
                value: data.metrics.revenue,
                icon: DollarSign,
                color: "#8b5cf6",
              },
              {
                label: "Active Clients",
                value: data.metrics.totalClients,
                icon: Users,
                color: "#10b981",
              },
              {
                label: "Sessions Completed",
                value: data.metrics.sessions,
                icon: TrendingUp,
                color: "#3b82f6",
              },
              {
                label: "Pending Notes",
                value: "4",
                icon: FileText,
                color: "#f59e0b",
              },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "#fff",
                  padding: "24px",
                  borderRadius: "16px",
                  border: `1px solid ${theme.border}`,
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    backgroundColor: `${stat.color}15`,
                    padding: "12px",
                    borderRadius: "12px",
                  }}
                >
                  <stat.icon size={24} color={stat.color} />
                </div>
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      color: theme.textMuted,
                    }}
                  >
                    {stat.label}
                  </p>
                  <h3
                    style={{ margin: 0, fontSize: "24px", fontWeight: "700" }}
                  >
                    {stat.value}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "32px",
            }}
          >
            {/* 2. ONBOARDING & MAIN PANEL */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              <div
                style={{
                  backgroundColor: theme.primary,
                  borderRadius: "24px",
                  padding: "32px",
                  color: "#fff",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <h2 style={{ fontSize: "28px", margin: "0 0 8px 0" }}>
                  Welcome back, Olamilekan!
                </h2>
                <p style={{ opacity: 0.9, maxWidth: "400px", margin: 0 }}>
                  You have 2 sessions scheduled for today. Your practice setup
                  is 25% complete.
                </p>
                <button
                  style={{
                    marginTop: "20px",
                    backgroundColor: "#fff",
                    color: theme.primary,
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Continue Setup
                </button>
                <div
                  style={{
                    position: "absolute",
                    right: "-20px",
                    bottom: "-20px",
                    opacity: 0.1,
                  }}
                >
                  <LayoutGrid size={200} />
                </div>
              </div>

              {/* Caseload Preview */}
              <div
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "16px",
                  border: `1px solid ${theme.border}`,
                  padding: "24px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <h3 style={{ margin: 0 }}>Recent Clients</h3>
                  <button
                    onClick={() => navigate("/learners")}
                    style={{
                      color: theme.primary,
                      background: "none",
                      border: "none",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    View all
                  </button>
                </div>
                {data.caseload.map((c) => (
                  <div
                    key={c.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 0",
                      borderBottom: `1px solid ${theme.border}`,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          backgroundColor: theme.bgLight,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "600",
                        }}
                      >
                        {c.name[0]}
                      </div>
                      <div>
                        <p style={{ margin: 0, fontWeight: "600" }}>{c.name}</p>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "12px",
                            color: theme.textMuted,
                          }}
                        >
                          Last seen: {c.lastSeen}
                        </p>
                      </div>
                    </div>
                    <ChevronRight size={18} color={theme.textMuted} />
                  </div>
                ))}
              </div>
            </div>

            {/* 3. RIGHT SIDEBAR: SCHEDULE */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              <div
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "16px",
                  border: `1px solid ${theme.border}`,
                  padding: "24px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                  }}
                >
                  <h3 style={{ margin: 0, fontSize: "16px" }}>
                    Today's Schedule
                  </h3>
                  <Calendar size={18} color={theme.textMuted} />
                </div>
                {data.schedule.map((appt) => (
                  <div
                    key={appt.id}
                    style={{
                      padding: "16px",
                      borderRadius: "12px",
                      backgroundColor: theme.bgLight,
                      marginBottom: "12px",
                      borderLeft: `4px solid ${theme.primary}`,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "4px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: "700",
                          color: theme.primary,
                        }}
                      >
                        {appt.time}
                      </span>
                      <span
                        style={{
                          fontSize: "11px",
                          backgroundColor: "#fff",
                          padding: "2px 8px",
                          borderRadius: "10px",
                          color: theme.textMuted,
                        }}
                      >
                        {appt.status}
                      </span>
                    </div>
                    <p style={{ margin: "4px 0", fontWeight: "600" }}>
                      {appt.patient}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "12px",
                        color: theme.textMuted,
                      }}
                    >
                      {appt.type}
                    </p>
                  </div>
                ))}
                <button
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    border: `1px solid ${theme.border}`,
                    backgroundColor: "transparent",
                    fontWeight: "600",
                    cursor: "pointer",
                    marginTop: "8px",
                  }}
                >
                  View Full Calendar
                </button>
              </div>

              {/* Quick Actions */}
              <div
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "16px",
                  border: `1px solid ${theme.border}`,
                  padding: "24px",
                }}
              >
                <h3 style={{ margin: "0 0 16px 0", fontSize: "16px" }}>
                  Quick Tasks
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "14px",
                    }}
                  >
                    <CheckCircle2 size={16} color={theme.success} />{" "}
                    <span>Sign 2 Treatment Plans</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "14px",
                    }}
                  >
                    <div
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        border: `1px solid ${theme.border}`,
                      }}
                    ></div>
                    <span>Respond to Michael's message</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
