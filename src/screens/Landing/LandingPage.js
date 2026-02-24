import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

const LandingPage = () => {
  // --- DESIGN SYSTEM ---
  const colors = {
    bg: "#080514",
    cardBg: "#130a2a",
    cardBorder: "#2d1b5e",
    primary: "#8b5cf6",
    primaryHover: "#7c3aed",
    textMain: "#ffffff",
    textMuted: "#9ca3af",
    gradientText: "linear-gradient(to right, #a78bfa, #c084fc)",
  };

  const styles = {
    page: {
      backgroundColor: colors.bg,
      color: colors.textMain,
      fontFamily: '"Inter", "Segoe UI", sans-serif',
      minHeight: "100vh",
      margin: 0,
      padding: 0,
      overflowX: "hidden",
      boxSizing: "border-box",
    },
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: `1px solid ${colors.cardBorder}`,
      backgroundColor: "rgba(8, 5, 20, 0.8)",
      backdropFilter: "blur(12px)",
      position: "sticky",
      top: 0,
      zIndex: 100,
    },
    navLogoContainer: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      cursor: "pointer",
    },
    navLogoText: {
      fontSize: "clamp(18px, 2vw, 22px)",
      fontWeight: "800",
      letterSpacing: "1px",
      background: colors.gradientText,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    navActions: { display: "flex", gap: "15px", alignItems: "center" },
    h1: {
      fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
      fontWeight: "800",
      lineHeight: "1.1",
      margin: "0 0 24px 0",
    },
    h2: {
      fontSize: "clamp(2rem, 4vw, 2.5rem)",
      fontWeight: "700",
      margin: "0 0 20px 0",
    },
    h3: { fontSize: "20px", fontWeight: "600", margin: "0 0 12px 0" },
    p: {
      fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
      color: colors.textMuted,
      lineHeight: "1.6",
      margin: "0 0 30px 0",
    },
    grid3: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "32px",
    },
    trustBanner: {
      textAlign: "center",
      borderBottom: `1px solid ${colors.cardBorder}`,
      borderTop: `1px solid ${colors.cardBorder}`,
      backgroundColor: "#0b061d",
    },
    trustLogos: {
      display: "flex",
      justifyContent: "center",
      gap: "clamp(20px, 5vw, 50px)",
      flexWrap: "wrap",
      color: "#4b5563",
      fontSize: "clamp(16px, 2vw, 20px)",
      fontWeight: "700",
      marginTop: "24px",
    },
    footer: {
      borderTop: `1px solid ${colors.cardBorder}`,
      display: "flex",
      flexWrap: "wrap",
      gap: "40px",
      justifyContent: "space-between",
    },
  };

  const navigateTo = (path) => (window.location.href = path);

  return (
    <div style={styles.page}>
      {/* RESPONSIVE CSS ENGINE */}
      <style>{`
        .btn-primary { background-color: ${colors.primary}; color: #fff; padding: 14px 28px; border-radius: 8px; border: none; font-weight: 600; font-size: 16px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 14px 0 rgba(139, 92, 246, 0.39); white-space: nowrap; }
        .btn-primary:hover { background-color: ${colors.primaryHover}; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(139, 92, 246, 0.5); }
        .btn-ghost { color: ${colors.textMain}; background: none; border: none; cursor: pointer; font-size: 16px; font-weight: 500; transition: color 0.2s ease; white-space: nowrap; }
        .btn-ghost:hover { color: ${colors.primary}; }
        .glass-card { background-color: ${colors.cardBg}; border: 1px solid ${colors.cardBorder}; border-radius: 16px; padding: 32px; transition: transform 0.3s ease, border-color 0.3s ease; position: relative; overflow: hidden; }
        .glass-card:hover { transform: translateY(-5px); border-color: ${colors.primary}; }
        .fade-up { animation: fadeUp 0.8s ease-out forwards; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .lottie-glow { filter: drop-shadow(0 0 15px rgba(139,92,246,0.4)) brightness(1.2); }
        
        .section-container { padding: 100px 5%; max-width: 1200px; margin: 0 auto; }
        .nav-container { padding: 20px 5%; }
        .trust-container { padding: 50px 5%; }
        .responsive-row { display: flex; flex-wrap: wrap; gap: 60px; align-items: center; }
        .responsive-row-reverse { display: flex; flex-wrap: wrap; gap: 60px; align-items: center; flex-direction: row-reverse; }
        .col-text { flex: 1 1 500px; }
        .col-visual { flex: 1 1 400px; display: flex; justify-content: center; width: 100%; }
        .responsive-lottie { width: 100%; max-width: 450px; height: auto; aspect-ratio: 1/1; }

        @media (max-width: 768px) {
          .section-container { padding: 60px 5%; }
          .nav-container { padding: 15px 5%; }
          .trust-container { padding: 40px 5%; }
          .responsive-row, .responsive-row-reverse { flex-direction: column-reverse; gap: 40px; text-align: center; }
          .mobile-center-flex { justify-content: center; flex-direction: column; align-items: center; gap: 10px !important; }
          ul { text-align: left; display: inline-block; } 
          .btn-primary { padding: 12px 20px; font-size: 14px; }
          .btn-ghost { font-size: 14px; }
        }
      `}</style>

      {/* NAVBAR */}
      {/* NAVBAR */}
      <nav style={styles.nav} className="nav-container">
        <div style={styles.navLogoContainer} onClick={() => navigateTo("/")}>
          {/* YOUR CUSTOM LOGO */}
          <img
            src="/logo.png" /* <-- Change "logo.png" to your actual file's name */
            alt="MenPrac Logo"
            style={{
              height:
                "70px" /* Adjust this value to make your logo bigger or smaller */,
              width: "auto",
              objectFit: "contain",
            }}
          />

          {/* Your brand name text (optional, you can delete this if your image includes the text) */}
          <div style={styles.navLogoText}></div>
        </div>

        <div style={styles.navActions}>
          <button className="btn-ghost" onClick={() => navigateTo("/login")}>
            Login
          </button>
          <button
            className="btn-primary"
            onClick={() => navigateTo("/register")}
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="section-container fade-up">
        <div className="responsive-row">
          <div className="col-text">
            <h1 style={styles.h1}>
              The Intelligent Software for{" "}
              <span style={{ color: colors.primary }}>
                Modern Clinical Practices.
              </span>
            </h1>
            <p style={styles.p}>
              Automate clinical documentation. Track behavioral progress
              instantly. Increase clinical outcomes. All from one secure,
              AI-powered platform.
            </p>
            <div
              className="mobile-center-flex"
              style={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
                marginTop: "40px",
              }}
            >
              <button
                className="btn-primary"
                onClick={() => navigateTo("/register")}
              >
                Request Demo{" "}
              </button>
              <span
                style={{
                  color: colors.textMuted,
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              ></span>
            </div>
            {/* <p style={{ color: colors.textMuted, fontSize: '13px', marginTop: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <span>✓ HIPAA-Aligned</span>
              <span>✓ End-to-End Encryption</span>
              <span>✓ SOC2 Certified</span>
            </p> */}
          </div>
          <div className="col-visual">
            <Player
              autoplay
              loop
              className="lottie-glow"
              src="/animations/hero.json"
              style={{ width: "100%", maxWidth: "550px", height: "auto" }}
            />
          </div>
        </div>
      </section>

      {/* TRUST BANNER */}
      <div style={styles.trustBanner} className="trust-container">
        <p
          style={{
            color: colors.textMuted,
            fontSize: "15px",
            fontWeight: "500",
            margin: 0,
            letterSpacing: "1px",
          }}
        >
          TRUSTED BY PRACTITIONERS NATIONWIDE
        </p>
        {/* <div style={styles.trustLogos}>
          <span>MedCore</span>
          <span>PrimeHealth</span>
          <span>CarePoint</span>
          <span>CityClinic</span>
          <span>NovaMed</span>
        </div> */}
      </div>

      {/* PROBLEM SECTION */}
      <section className="section-container" style={{ textAlign: "center" }}>
        <h2 style={styles.h2}>Clinical administration is slowing you down.</h2>
        <p style={{ ...styles.p, maxWidth: "700px", margin: "0 auto 60px" }}>
          BCBAs and RBTs are burning out from paperwork instead of focusing on
          patient care.
        </p>

        <div style={styles.grid3}>
          <div className="glass-card" style={{ textAlign: "left" }}>
            <Player
              autoplay
              loop
              className="lottie-glow"
              src="/animations/paperwork.json"
              style={{
                height: "100px",
                width: "100px",
                margin: "-10px 0 10px -10px",
              }}
            />
            <h3 style={styles.h3}>Manual Note Overload</h3>
            <p style={{ ...styles.p, margin: 0, fontSize: "15px" }}>
              Clinicians spend 6–10 hours weekly typing repetitive session notes
              and graphing paper data.
            </p>
          </div>
          <div className="glass-card" style={{ textAlign: "left" }}>
            <Player
              autoplay
              loop
              className="lottie-glow"
              src="/animations/clock.json"
              style={{
                height: "100px",
                width: "100px",
                margin: "-10px 0 10px -10px",
              }}
            />
            <h3 style={styles.h3}>Delayed Progress Tracking</h3>
            <p style={{ ...styles.p, margin: 0, fontSize: "15px" }}>
              Waiting for end-of-week data entry means missing critical
              behavioral trends and mastery criteria.
            </p>
          </div>
          <div className="glass-card" style={{ textAlign: "left" }}>
            <Player
              autoplay
              loop
              className="lottie-glow"
              src="/animations/network.json"
              style={{
                height: "100px",
                width: "100px",
                margin: "-10px 0 10px -10px",
              }}
            />
            <h3 style={styles.h3}>Fragmented Systems</h3>
            <p style={{ ...styles.p, margin: 0, fontSize: "15px" }}>
              Scheduling, goal building, and live session notes live in
              disconnected, clunky software tools.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURE 2: REAL-TIME GRAPHING */}
      <section className="section-container">
        <div className="responsive-row-reverse">
          <div className="col-text">
            <div
              style={{
                color: "#ec4899",
                fontWeight: "700",
                letterSpacing: "1px",
                marginBottom: "10px",
              }}
            >
              LIVE SYNC
            </div>
            <h2 style={styles.h2}>Real-Time Predictive Graphing</h2>
            <p style={styles.p}>
              Our mobile-first Session Runner allows RBTs to capture data
              frictionlessly. MenPrac instantly graphs this data, predicting
              when a learner will meet mastery criteria before they even do.
            </p>
            <ul
              style={{
                color: colors.textMuted,
                lineHeight: "2",
                paddingLeft: "20px",
              }}
            >
              <li>Instant phase change lines.</li>
              <li>Visual ABC Data analysis.</li>
              <li>Mobile-optimized for iPads and Tablets.</li>
            </ul>
          </div>
          <div className="col-visual">
            <Player
              autoplay
              loop
              className="lottie-glow responsive-lottie"
              src="/animations/charts.json"
            />
          </div>
        </div>
      </section>
      {/* FEATURE 1: AI CLINICAL NOTES */}
      <section className="section-container">
        <div className="responsive-row">
          <div className="col-text">
            <div
              style={{
                color: colors.primary,
                fontWeight: "700",
                letterSpacing: "1px",
                marginBottom: "10px",
              }}
            >
              MENPRAC INTELLIGENCE
            </div>
            <h2 style={styles.h2}>AI Clinical Documentation</h2>
            <p style={styles.p}>
              MenPrac's native AI engine analyzes raw trial data (frequency,
              duration, ABC) and instantly generates compliant, insurance-ready
              session summaries the moment the session ends.
            </p>
            <ul
              style={{
                color: colors.textMuted,
                lineHeight: "2",
                paddingLeft: "20px",
              }}
            >
              <li>Eliminates after-hours documentation.</li>
              <li>Ensures medical necessity compliance.</li>
              <li>Learns your clinical writing style over time.</li>
            </ul>
          </div>
          <div className="col-visual">
            <Player
              autoplay
              loop
              className="lottie-glow responsive-lottie"
              src="/animations/brain.json"
            />
          </div>
        </div>
      </section>

      {/* SECURITY SECTION */}
      <section className="section-container" style={{ textAlign: "center" }}>
        <Player
          autoplay
          loop
          className="lottie-glow"
          src="/animations/security.json"
          style={{ height: "160px", width: "160px", margin: "0 auto" }}
        />
        <h2
          style={{
            ...styles.h2,
            fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
            marginTop: "20px",
          }}
        >
          Enterprise-grade security. Built for healthcare.
        </h2>
        <p style={{ ...styles.p, maxWidth: "600px", margin: "0 auto 40px" }}>
          Your patients' data is sacred. MenPrac utilizes AES-256 encryption at
          rest and in transit, complete with immutable audit logs.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          {[
            "End-to-End Encryption",
            "HIPAA-Aligned Infrastructure",
            "Role-Based Access Control",
            "Automated Backups",
          ].map((badge, idx) => (
            <div
              key={idx}
              style={{
                border: `1px solid ${colors.primary}`,
                color: colors.primary,
                padding: "10px 20px",
                borderRadius: "50px",
                fontSize: "clamp(12px, 2vw, 14px)",
                fontWeight: "600",
                backgroundColor: "rgba(139, 92, 246, 0.05)",
              }}
            >
              {badge}
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section
        className="section-container"
        style={{
          textAlign: "center",
          background: "linear-gradient(180deg, #080514 0%, #170d36 100%)",
          borderTop: `1px solid ${colors.cardBorder}`,
        }}
      >
        <h1 style={{ ...styles.h1, fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
          Run your practice. <br />
          Not paperwork.
        </h1>
        <p style={{ ...styles.p, maxWidth: "600px", margin: "20px auto 40px" }}>
          Join forward-thinking healthcare professionals transforming their
          operations and patient outcomes today.
        </p>
        <button
          className="btn-primary"
          style={{ padding: "20px 40px", fontSize: "18px" }}
          onClick={() => navigateTo("/register")}
        >
          Get Started For Free
        </button>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer} className="section-container">
        <div style={{ flex: "1 1 250px" }}>
          <div style={styles.navLogoContainer} onClick={() => navigateTo("/")}>
            {/* YOUR CUSTOM MINI LOGO */}
            <img
              src="/logo.png"
              alt="MenPrac Logo"
              style={{ height: "60px", width: "auto", objectFit: "contain" }}
            />

            <h3 style={{ ...styles.h3, margin: 0 }}></h3>
          </div>
          <p style={{ ...styles.p, fontSize: "13px", marginTop: "16px" }}>
            © 2026 MenPrac Platform. All rights reserved.
          </p>
        </div>

        <div
          style={{
            flex: "1 1 300px",
            display: "flex",
            gap: "40px",
            flexWrap: "wrap",
            fontSize: "14px",
            color: colors.textMuted,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              minWidth: "100px",
            }}
          >
            <span style={{ color: "#fff", fontWeight: "600" }}>Product</span>
            <span style={{ cursor: "pointer" }}>Features</span>
            <span style={{ cursor: "pointer" }}>Pricing</span>
            <span style={{ cursor: "pointer" }}>Security</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              minWidth: "100px",
            }}
          >
            <span style={{ color: "#fff", fontWeight: "600" }}>Company</span>
            <span style={{ cursor: "pointer" }}>About Us</span>
            <span style={{ cursor: "pointer" }}>Careers</span>
            <span style={{ cursor: "pointer" }}>Contact</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              minWidth: "100px",
            }}
          >
            <span style={{ color: "#fff", fontWeight: "600" }}>Legal</span>
            <span style={{ cursor: "pointer" }}>Terms of Service</span>
            <span style={{ cursor: "pointer" }}>Privacy Policy</span>
            <span style={{ cursor: "pointer" }}>BAA Agreement</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
