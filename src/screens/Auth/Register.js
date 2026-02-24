import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import API_URL from "../../config"; // Import the dynamic URL we created

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    clinicName: "",
    email: "",
    password: "",
    role: "BCBA",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const colors = {
    primary: "#8b5cf6",
    textMain: "#ffffff",
    textMuted: "#9ca3af",
    danger: "#ef4444",
    inputBg: "rgba(15, 8, 34, 0.6)",
    border: "rgba(139, 92, 246, 0.3)",
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include", // Secure HTTP-Only Cookie Magic
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Registration failed");

      // Save user profile data to local storage
      localStorage.setItem("aura_user", JSON.stringify(data.user));
      // If your backend still sends a token for fallback, uncomment the next line:
      // localStorage.setItem("aura_token", data.token);

      // Seamlessly transition to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to create account. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* --- INJECTED ANIMATION STYLES --- */}
      <style>
        {`
          @keyframes gradientPan {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes float {
            0% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-20px) scale(1.05); }
            100% { transform: translateY(0px) scale(1); }
          }
          .animated-wrapper {
            background: linear-gradient(-45deg, #080514, #130a2a, #1e1140, #0a0518);
            background-size: 400% 400%;
            animation: gradientPan 15s ease infinite;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
            font-family: 'Inter', sans-serif;
          }
          /* Subtle background glowing orbs */
          .glow-orb-1 {
            position: absolute;
            top: -10%; left: -10%;
            width: 500px; height: 500px;
            background: radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(0,0,0,0) 70%);
            border-radius: 50%;
            animation: float 8s ease-in-out infinite;
          }
          .glow-orb-2 {
            position: absolute;
            bottom: -20%; right: -10%;
            width: 600px; height: 600px;
            background: radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(0,0,0,0) 70%);
            border-radius: 50%;
            animation: float 12s ease-in-out infinite reverse;
          }
          /* Frosted Glass Effect */
          .glass-panel {
            background: rgba(19, 10, 42, 0.4);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.05);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            border-radius: 20px;
            padding: 40px;
            width: 100%;
            max-width: 420px;
            z-index: 10;
            color: white;
          }
          .custom-input:focus {
            outline: none;
            border-color: ${colors.primary} !important;
            box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
          }
        `}
      </style>

      <div className="animated-wrapper">
        <div className="glow-orb-1"></div>
        <div className="glow-orb-2"></div>

        {/* Back to Home Button */}
        <button
          onClick={() => navigate("/")}
          style={{
            position: "absolute",
            top: "30px",
            left: "40px",
            background: "transparent",
            border: "none",
            color: colors.textMuted,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
            fontSize: "14px",
            zIndex: 20,
            transition: "0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = colors.textMuted)}
        >
          <ArrowLeft size={18} /> Back to Home
        </button>

        <div className="glass-panel">
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            {/* If you have a logo, keep this img tag. Otherwise, it will safely fall back to the h2 */}
            <img
              src="/logo.png"
              alt="MenPrac Logo"
              style={{
                height: "48px",
                marginBottom: "16px",
                objectFit: "contain",
              }}
              onError={(e) => (e.target.style.display = "none")}
            />
            <h2
              style={{
                margin: "0 0 8px 0",
                fontSize: "24px",
                fontWeight: "600",
              }}
            >
              Create your Workspace
            </h2>
            <p style={{ margin: 0, color: colors.textMuted, fontSize: "15px" }}>
              Register your clinic on MenPrac
            </p>
          </div>

          {error && (
            <div
              style={{
                backgroundColor: `${colors.danger}20`,
                border: `1px solid ${colors.danger}`,
                color: colors.danger,
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "20px",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "13px",
                  color: colors.textMuted,
                }}
              >
                Clinic Name
              </label>
              <input
                className="custom-input"
                name="clinicName"
                type="text"
                placeholder="e.g. Apex Therapy"
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  backgroundColor: colors.inputBg,
                  border: `1px solid ${colors.border}`,
                  borderRadius: "10px",
                  color: colors.textMain,
                  boxSizing: "border-box",
                  transition: "all 0.2s",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "13px",
                  color: colors.textMuted,
                }}
              >
                Work Email
              </label>
              <input
                className="custom-input"
                name="email"
                type="email"
                placeholder="name@clinic.com"
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  backgroundColor: colors.inputBg,
                  border: `1px solid ${colors.border}`,
                  borderRadius: "10px",
                  color: colors.textMain,
                  boxSizing: "border-box",
                  transition: "all 0.2s",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "13px",
                  color: colors.textMuted,
                }}
              >
                Password
              </label>
              <input
                className="custom-input"
                name="password"
                type="password"
                placeholder="••••••••"
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  backgroundColor: colors.inputBg,
                  border: `1px solid ${colors.border}`,
                  borderRadius: "10px",
                  color: colors.textMain,
                  boxSizing: "border-box",
                  transition: "all 0.2s",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "14px",
                backgroundColor: colors.primary,
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: "bold",
                cursor: isLoading ? "not-allowed" : "pointer",
                marginTop: "10px",
                transition: "background-color 0.2s",
                opacity: isLoading ? 0.7 : 1,
              }}
              onMouseEnter={(e) => {
                if (!isLoading)
                  e.currentTarget.style.backgroundColor = "#7c3aed";
              }}
              onMouseLeave={(e) => {
                if (!isLoading)
                  e.currentTarget.style.backgroundColor = colors.primary;
              }}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: "30px",
              fontSize: "14px",
              color: colors.textMuted,
            }}
          >
            Already have an account?{" "}
            <span
              style={{
                color: colors.primary,
                cursor: "pointer",
                fontWeight: "500",
              }}
              onClick={() => navigate("/login")}
              onMouseEnter={(e) =>
                (e.currentTarget.style.textDecoration = "underline")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.textDecoration = "none")
              }
            >
              Log in
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
