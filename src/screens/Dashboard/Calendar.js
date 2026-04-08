import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  Calendar as CalIcon,
  Inbox,
  Users,
  DollarSign,
  Briefcase,
  List,
  FileText,
  Share2,
  ChevronLeft,
  ChevronRight,
  Plus,
  Settings,
  Filter,
  Menu,
  X,
  Bell,
  Search,
  Info,
} from "lucide-react";

const CalendarPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // --- STATE ---
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [view, setView] = useState("Week"); // Day, Week, Month
  const [showWorkInProgress, setShowWorkInProgress] = useState(false);
  const today = new Date(2026, 3, 8); // April 8, 2026

  const theme = {
    primary: "#8b5cf6",
    sidebar: "#2a1a4a",
    sidebarHover: "#3b2568",
    border: "#e5e7eb",
    bg: "#F9FAFB",
    textMain: "#111827",
    textMuted: "#6b7280",
    todayBg: "#f3e8ff",
  };

  const navItems = [
    { name: "Get started", icon: LayoutGrid, path: "/dashboard" },
    { name: "Calendar", icon: CalIcon, path: "/calendar" },
    { name: "Inbox", icon: Inbox, path: "/messages" },
    { name: "Clients", icon: Users, path: "/learners" },
    { name: "Billing", icon: DollarSign, path: "/billing" },
    { name: "Your team", icon: Briefcase, path: "/team" },
    { name: "Contacts", icon: List, path: "/contacts" },
    { name: "Templates", icon: FileText, path: "/templates" },
    { name: "Workflows", icon: Share2, path: "/workflows" },
  ];

  const hours = Array.from({ length: 13 }, (_, i) =>
    `${i + 8} AM`
      .replace("13 AM", "1 PM")
      .replace("14 AM", "2 PM")
      .replace("15 AM", "3 PM")
      .replace("16 AM", "4 PM")
      .replace("17 AM", "5 PM")
      .replace("18 AM", "6 PM")
      .replace("12 AM", "12 PM"),
  );

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: theme.bg,
        fontFamily: "Inter, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* ================= COLLAPSIBLE SIDEBAR ================= */}
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
              <item.icon
                size={20}
                strokeWidth={location.pathname === item.path ? 2.5 : 2}
              />
              {!isCollapsed && (
                <span style={{ fontSize: "14px" }}>{item.name}</span>
              )}
            </div>
          ))}
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
            height: "64px",
            backgroundColor: "#fff",
            borderBottom: `1px solid ${theme.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              style={{
                padding: "6px 12px",
                border: `1px solid ${theme.border}`,
                borderRadius: "6px",
                backgroundColor: "#fff",
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
              Today
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <ChevronLeft size={20} style={{ cursor: "pointer" }} />
              <ChevronRight size={20} style={{ cursor: "pointer" }} />
            </div>
            <strong style={{ fontSize: "16px" }}>5 - 11 Apr 2026</strong>
            <select
              value={view}
              onChange={(e) => setView(e.target.value)}
              style={{
                padding: "6px",
                border: `1px solid ${theme.border}`,
                borderRadius: "6px",
                fontSize: "13px",
              }}
            >
              <option>Day</option>
              <option>Week</option>
              <option>Month</option>
            </select>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                border: `1px solid ${theme.primary}`,
                color: theme.primary,
                padding: "6px 12px",
                borderRadius: "6px",
                fontWeight: "600",
                fontSize: "13px",
              }}
            >
              Booking
            </button>
            <button
              onClick={() => setShowWorkInProgress(true)}
              style={{
                backgroundColor: theme.primary,
                color: "#fff",
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                fontWeight: "bold",
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <Plus size={18} /> New
            </button>
            <Settings size={20} color={theme.textMuted} />
          </div>
        </header>

        {/* CALENDAR BODY */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
          }}
        >
          {/* Day Headers */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "80px repeat(7, 1fr)",
              borderBottom: `1px solid ${theme.border}`,
              position: "sticky",
              top: 0,
              backgroundColor: "#fff",
              zIndex: 10,
            }}
          >
            <div
              style={{
                borderRight: `1px solid ${theme.border}`,
                display: "flex",
                alignItems: "flex-end",
                padding: "8px",
                fontSize: "10px",
                color: theme.textMuted,
              }}
            >
              GMT+1
            </div>
            {[
              "Sun 5",
              "Mon 6",
              "Tue 7",
              "Wed 8",
              "Thu 9",
              "Fri 10",
              "Sat 11",
            ].map((day) => {
              const isToday = day.includes("Wed 8");
              return (
                <div
                  key={day}
                  style={{
                    textAlign: "center",
                    padding: "12px",
                    borderRight: `1px solid ${theme.border}`,
                    backgroundColor: isToday ? theme.todayBg : "transparent",
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: isToday ? theme.primary : theme.textMain,
                    }}
                  >
                    {day}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Time Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "80px repeat(7, 1fr)",
            }}
          >
            {hours.map((h) => (
              <React.Fragment key={h}>
                <div
                  style={{
                    padding: "20px 10px",
                    fontSize: "11px",
                    color: theme.textMuted,
                    textAlign: "right",
                    borderBottom: `1px solid ${theme.border}`,
                    borderRight: `1px solid ${theme.border}`,
                  }}
                >
                  {h}
                </div>
                {[0, 1, 2, 3, 4, 5, 6].map((dayIdx) => (
                  <div
                    key={dayIdx}
                    style={{
                      borderBottom: `1px solid ${theme.border}`,
                      borderRight: `1px solid ${theme.border}`,
                      position: "relative",
                      minHeight: "60px",
                    }}
                  >
                    {/* Sample Appointment: Wed 8 at 10 AM */}
                    {h === "10 AM" && dayIdx === 3 && (
                      <div
                        style={{
                          position: "absolute",
                          inset: "2px",
                          backgroundColor: "#10b981",
                          color: "#fff",
                          padding: "6px",
                          borderRadius: "4px",
                          fontSize: "11px",
                          borderLeft: "4px solid #065f46",
                        }}
                      >
                        <strong>Sarah D - Initial Assessment</strong>
                        <div style={{ opacity: 0.9 }}>10 AM</div>
                      </div>
                    )}
                    {/* Sample Appointment: Wed 8 at 1 PM */}
                    {h === "1 PM" && dayIdx === 3 && (
                      <div
                        style={{
                          position: "absolute",
                          inset: "2px",
                          backgroundColor: "#d946ef",
                          color: "#fff",
                          padding: "6px",
                          borderRadius: "4px",
                          fontSize: "11px",
                          borderLeft: "4px solid #701a75",
                        }}
                      >
                        <strong>John D - Final Appointment</strong>
                        <div style={{ opacity: 0.9 }}>1 PM</div>
                      </div>
                    )}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* WORK IN PROGRESS OVERLAY */}
        {showWorkInProgress && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 100,
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                padding: "40px",
                borderRadius: "12px",
                textAlign: "center",
                boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
                maxWidth: "400px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#f3f4f6",
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                }}
              >
                <Info size={30} color={theme.primary} />
              </div>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "8px",
                }}
              >
                Coming Soon
              </h2>
              <p style={{ color: theme.textMuted, marginBottom: "24px" }}>
                We are working on that feature right now! Check back shortly for
                full scheduling capabilities.
              </p>
              <button
                onClick={() => setShowWorkInProgress(false)}
                style={{
                  backgroundColor: theme.primary,
                  color: "#fff",
                  border: "none",
                  padding: "10px 24px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CalendarPage;
