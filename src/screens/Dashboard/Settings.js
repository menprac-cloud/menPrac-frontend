import React, { useState, useEffect } from "react";
import SidebarLayout from "../../components/SidebarLayout";
import { User, Lock, Bell, Save, AlertCircle, CheckCircle } from "lucide-react";

const Settings = () => {
  const [formData, setFormData] = useState({ clinicName: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  const colors = {
    bg: "#080514",
    card: "#130a2a",
    border: "#2d1b5e",
    primary: "#8b5cf6",
    textMuted: "#9ca3af",
    danger: "#ef4444",
    success: "#10b981",
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // --- 1. Fetch User Data on Load ---
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("aura_token");
        const res = await fetch(
          "https://menprac-backend.onrender.com/api/users/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
            credentials: "include", // THIS IS THE MAGIC LINE
          },
        );

        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();

        setFormData({ clinicName: data.clinic_name, email: data.email });
      } catch (err) {
        showNotification("Error loading profile data.", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // --- 2. Handle Form Submission ---
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("aura_token");
      const res = await fetch(
        "https://menprac-backend.onrender.com/api/users/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
          credentials: "include", // THIS IS THE MAGIC LINE
        },
      );

      if (!res.ok) throw new Error("Failed to update settings");

      showNotification("Settings saved successfully!");
    } catch (err) {
      showNotification("Error saving settings. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- 3. Handle Logout ---
  const handleLogout = () => {
    localStorage.removeItem("aura_token");
    window.location.href = "/";
  };

  return (
    <SidebarLayout>
      <div
        style={{
          padding: "30px 40px",
          position: "relative",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* NOTIFICATION BANNER */}
        {notification && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor:
                notification.type === "error"
                  ? `${colors.danger}20`
                  : `${colors.success}20`,
              border: `1px solid ${notification.type === "error" ? colors.danger : colors.success}`,
              color:
                notification.type === "error" ? colors.danger : colors.success,
              padding: "12px 24px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontWeight: "bold",
              zIndex: 1000,
              animation: "fadeInDown 0.3s",
            }}
          >
            {notification.type === "error" ? (
              <AlertCircle size={18} />
            ) : (
              <CheckCircle size={18} />
            )}
            {notification.message}
          </div>
        )}

        {/* HEADER */}
        <header style={{ marginBottom: "40px" }}>
          <h1 style={{ margin: "0 0 8px 0", fontSize: "32px" }}>
            Account Settings
          </h1>
          <p style={{ color: colors.textMuted, margin: 0 }}>
            Manage your clinic profile and system preferences.
          </p>
        </header>

        {/* MAIN SETTINGS GRID */}
        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          {/* PROFILE SETTINGS CARD */}
          <div
            style={{
              backgroundColor: colors.card,
              border: `1px solid ${colors.border}`,
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "20px 24px",
                borderBottom: `1px solid ${colors.border}`,
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <User color={colors.primary} size={24} />
              <h2 style={{ margin: 0, fontSize: "18px" }}>Clinic Profile</h2>
            </div>

            <div style={{ padding: "24px" }}>
              {loading ? (
                <p style={{ color: colors.textMuted }}>
                  Loading your profile...
                </p>
              ) : (
                <form
                  onSubmit={handleSaveSettings}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "20px",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "8px",
                          color: colors.textMuted,
                          fontSize: "14px",
                        }}
                      >
                        Provider / Clinic Name
                      </label>
                      <input
                        type="text"
                        value={formData.clinicName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            clinicName: e.target.value,
                          })
                        }
                        style={{
                          width: "100%",
                          padding: "12px",
                          backgroundColor: colors.bg,
                          border: `1px solid ${colors.border}`,
                          borderRadius: "8px",
                          color: "#fff",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "8px",
                          color: colors.textMuted,
                          fontSize: "14px",
                        }}
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        style={{
                          width: "100%",
                          padding: "12px",
                          backgroundColor: colors.bg,
                          border: `1px solid ${colors.border}`,
                          borderRadius: "8px",
                          color: "#fff",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "10px",
                    }}
                  >
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        backgroundColor: colors.primary,
                        color: "#fff",
                        padding: "12px 24px",
                        borderRadius: "8px",
                        border: "none",
                        fontWeight: "bold",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Save size={18} />{" "}
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* DANGER ZONE (LOGOUT) */}
          <div
            style={{
              backgroundColor: colors.card,
              border: `1px solid ${colors.danger}40`,
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "20px 24px",
                borderBottom: `1px solid ${colors.danger}40`,
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <Lock color={colors.danger} size={24} />
              <h2 style={{ margin: 0, fontSize: "18px", color: colors.danger }}>
                Security & Access
              </h2>
            </div>
            <div
              style={{
                padding: "24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <p style={{ margin: "0 0 4px 0", fontWeight: "bold" }}>
                  Sign Out
                </p>
                <p
                  style={{
                    margin: 0,
                    color: colors.textMuted,
                    fontSize: "14px",
                  }}
                >
                  Securely log out of your MenPrac workspace.
                </p>
              </div>
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: "transparent",
                  color: colors.danger,
                  border: `1px solid ${colors.danger}`,
                  padding: "10px 20px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Settings;
