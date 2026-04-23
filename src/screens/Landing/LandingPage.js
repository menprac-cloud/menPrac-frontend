// import React from "react";
// import { Player } from "@lottiefiles/react-lottie-player";

// const LandingPage = () => {
//   // --- DESIGN SYSTEM ---
//   const colors = {
//     bg: "#080514",
//     cardBg: "#130a2a",
//     cardBorder: "#2d1b5e",
//     primary: "#8b5cf6",
//     primaryHover: "#7c3aed",
//     textMain: "#ffffff",
//     textMuted: "#9ca3af",
//     gradientText: "linear-gradient(to right, #a78bfa, #c084fc)",
//   };

//   const styles = {
//     page: {
//       backgroundColor: colors.bg,
//       color: colors.textMain,
//       fontFamily: '"Inter", "Segoe UI", sans-serif',
//       minHeight: "100vh",
//       margin: 0,
//       padding: 0,
//       overflowX: "hidden",
//       boxSizing: "border-box",
//     },
//     nav: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       borderBottom: `1px solid ${colors.cardBorder}`,
//       backgroundColor: "rgba(8, 5, 20, 0.8)",
//       backdropFilter: "blur(12px)",
//       position: "sticky",
//       top: 0,
//       zIndex: 100,
//     },
//     navLogoContainer: {
//       display: "flex",
//       alignItems: "center",
//       gap: "10px",
//       cursor: "pointer",
//     },
//     navLogoText: {
//       fontSize: "clamp(18px, 2vw, 22px)",
//       fontWeight: "800",
//       letterSpacing: "1px",
//       background: colors.gradientText,
//       WebkitBackgroundClip: "text",
//       WebkitTextFillColor: "transparent",
//     },
//     navActions: { display: "flex", gap: "15px", alignItems: "center" },
//     h1: {
//       fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
//       fontWeight: "800",
//       lineHeight: "1.1",
//       margin: "0 0 24px 0",
//     },
//     h2: {
//       fontSize: "clamp(2rem, 4vw, 2.5rem)",
//       fontWeight: "700",
//       margin: "0 0 20px 0",
//     },
//     h3: { fontSize: "20px", fontWeight: "600", margin: "0 0 12px 0" },
//     p: {
//       fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
//       color: colors.textMuted,
//       lineHeight: "1.6",
//       margin: "0 0 30px 0",
//     },
//     grid3: {
//       display: "grid",
//       gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
//       gap: "32px",
//     },
//     trustBanner: {
//       textAlign: "center",
//       borderBottom: `1px solid ${colors.cardBorder}`,
//       borderTop: `1px solid ${colors.cardBorder}`,
//       backgroundColor: "#0b061d",
//     },
//     trustLogos: {
//       display: "flex",
//       justifyContent: "center",
//       gap: "clamp(20px, 5vw, 50px)",
//       flexWrap: "wrap",
//       color: "#4b5563",
//       fontSize: "clamp(16px, 2vw, 20px)",
//       fontWeight: "700",
//       marginTop: "24px",
//     },
//     footer: {
//       borderTop: `1px solid ${colors.cardBorder}`,
//       display: "flex",
//       flexWrap: "wrap",
//       gap: "40px",
//       justifyContent: "space-between",
//     },
//   };

//   const navigateTo = (path) => (window.location.href = path);

//   return (
//     <div style={styles.page}>
//       {/* RESPONSIVE CSS ENGINE */}
//       <style>{`
//         .btn-primary { background-color: ${colors.primary}; color: #fff; padding: 14px 28px; border-radius: 8px; border: none; font-weight: 600; font-size: 16px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 14px 0 rgba(139, 92, 246, 0.39); white-space: nowrap; }
//         .btn-primary:hover { background-color: ${colors.primaryHover}; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(139, 92, 246, 0.5); }
//         .btn-ghost { color: ${colors.textMain}; background: none; border: none; cursor: pointer; font-size: 16px; font-weight: 500; transition: color 0.2s ease; white-space: nowrap; }
//         .btn-ghost:hover { color: ${colors.primary}; }
//         .glass-card { background-color: ${colors.cardBg}; border: 1px solid ${colors.cardBorder}; border-radius: 16px; padding: 32px; transition: transform 0.3s ease, border-color 0.3s ease; position: relative; overflow: hidden; }
//         .glass-card:hover { transform: translateY(-5px); border-color: ${colors.primary}; }
//         .fade-up { animation: fadeUp 0.8s ease-out forwards; }
//         @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
//         .lottie-glow { filter: drop-shadow(0 0 15px rgba(139,92,246,0.4)) brightness(1.2); }

//         .section-container { padding: 100px 5%; max-width: 1200px; margin: 0 auto; }
//         .nav-container { padding: 20px 5%; }
//         .trust-container { padding: 50px 5%; }
//         .responsive-row { display: flex; flex-wrap: wrap; gap: 60px; align-items: center; }
//         .responsive-row-reverse { display: flex; flex-wrap: wrap; gap: 60px; align-items: center; flex-direction: row-reverse; }
//         .col-text { flex: 1 1 500px; }
//         .col-visual { flex: 1 1 400px; display: flex; justify-content: center; width: 100%; }
//         .responsive-lottie { width: 100%; max-width: 450px; height: auto; aspect-ratio: 1/1; }

//         @media (max-width: 768px) {
//           .section-container { padding: 60px 5%; }
//           .nav-container { padding: 15px 5%; }
//           .trust-container { padding: 40px 5%; }
//           .responsive-row, .responsive-row-reverse { flex-direction: column-reverse; gap: 40px; text-align: center; }
//           .mobile-center-flex { justify-content: center; flex-direction: column; align-items: center; gap: 10px !important; }
//           ul { text-align: left; display: inline-block; }
//           .btn-primary { padding: 12px 20px; font-size: 14px; }
//           .btn-ghost { font-size: 14px; }
//         }
//       `}</style>

//       {/* NAVBAR */}
//       {/* NAVBAR */}
//       <nav style={styles.nav} className="nav-container">
//         <div style={styles.navLogoContainer} onClick={() => navigateTo("/")}>
//           {/* YOUR CUSTOM LOGO */}
//           <img
//             src="/logo.png" /* <-- Change "logo.png" to your actual file's name */
//             alt="MenPrac Logo"
//             style={{
//               height:
//                 "70px" /* Adjust this value to make your logo bigger or smaller */,
//               width: "auto",
//               objectFit: "contain",
//             }}
//           />

//           {/* Your brand name text (optional, you can delete this if your image includes the text) */}
//           <div style={styles.navLogoText}></div>
//         </div>

//         <div style={styles.navActions}>
//           <button className="btn-ghost" onClick={() => navigateTo("/login")}>
//             Login
//           </button>
//           <button
//             className="btn-primary"
//             onClick={() => navigateTo("/register")}
//           >
//             Sign Up
//           </button>
//         </div>
//       </nav>

//       {/* HERO SECTION */}
//       <section className="section-container fade-up">
//         <div className="responsive-row">
//           <div className="col-text">
//             <h1 style={styles.h1}>
//               The Intelligent Software for{" "}
//               <span style={{ color: colors.primary }}>
//                 Modern Clinical Practices.
//               </span>
//             </h1>
//             <p style={styles.p}>
//               Automate documentation. Track patient journeys in real time.
//               Optimize workflows across your entire organization. Improve care
//               quality and operational efficiency all within one secure,
//               AI-powered platform
//             </p>
//             <div
//               className="mobile-center-flex"
//               style={{
//                 display: "flex",
//                 gap: "20px",
//                 alignItems: "center",
//                 marginTop: "40px",
//               }}
//             >
//               <button
//                 className="btn-primary"
//                 onClick={() => navigateTo("/register")}
//               >
//                 Request Demo{" "}
//               </button>
//               <span
//                 style={{
//                   color: colors.textMuted,
//                   fontSize: "14px",
//                   fontWeight: "500",
//                 }}
//               ></span>
//             </div>
//             {/* <p style={{ color: colors.textMuted, fontSize: '13px', marginTop: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
//               <span>✓ HIPAA-Aligned</span>
//               <span>✓ End-to-End Encryption</span>
//               <span>✓ SOC2 Certified</span>
//             </p> */}
//           </div>
//           <div className="col-visual">
//             <Player
//               autoplay
//               loop
//               className="lottie-glow"
//               src="/animations/hero.json"
//               style={{ width: "100%", maxWidth: "550px", height: "auto" }}
//             />
//           </div>
//         </div>
//       </section>

//       {/* TRUST BANNER */}
//       <div style={styles.trustBanner} className="trust-container">
//         <p
//           style={{
//             color: colors.textMuted,
//             fontSize: "15px",
//             fontWeight: "500",
//             margin: 0,
//             letterSpacing: "1px",
//           }}
//         >
//           TRUSTED BY PRACTITIONERS NATIONWIDE
//         </p>
//         {/* <div style={styles.trustLogos}>
//           <span>MedCore</span>
//           <span>PrimeHealth</span>
//           <span>CarePoint</span>
//           <span>CityClinic</span>
//           <span>NovaMed</span>
//         </div> */}
//       </div>

//       {/* PROBLEM SECTION */}
//       <section className="section-container" style={{ textAlign: "center" }}>
//         <h2 style={styles.h2}>Clinical administration is slowing you down.</h2>
//         <p style={{ ...styles.p, maxWidth: "700px", margin: "0 auto 60px" }}>
//           The use of multiple practice management is simplified with MenPrac
//           providing opportunities for clinical information and data management,
//           multiple practices, scheduling, AI assistant for data interpretation
//           and documentation, and HR tool for payroll.
//         </p>

//         <div style={styles.grid3}>
//           <div className="glass-card" style={{ textAlign: "left" }}>
//             <Player
//               autoplay
//               loop
//               className="lottie-glow"
//               src="/animations/paperwork.json"
//               style={{
//                 height: "100px",
//                 width: "100px",
//                 margin: "-10px 0 10px -10px",
//               }}
//             />
//             <h3 style={styles.h3}>Manual Note Overload</h3>
//             <p style={{ ...styles.p, margin: 0, fontSize: "15px" }}>
//               Clinicians spend 6–10 hours weekly typing repetitive session notes
//               and graphing paper data.
//             </p>
//           </div>
//           <div className="glass-card" style={{ textAlign: "left" }}>
//             <Player
//               autoplay
//               loop
//               className="lottie-glow"
//               src="/animations/clock.json"
//               style={{
//                 height: "100px",
//                 width: "100px",
//                 margin: "-10px 0 10px -10px",
//               }}
//             />
//             <h3 style={styles.h3}>Delayed Progress Tracking</h3>
//             <p style={{ ...styles.p, margin: 0, fontSize: "15px" }}>
//               Waiting for end-of-week data entry means missing critical
//               behavioral trends and mastery criteria.
//             </p>
//           </div>
//           <div className="glass-card" style={{ textAlign: "left" }}>
//             <Player
//               autoplay
//               loop
//               className="lottie-glow"
//               src="/animations/network.json"
//               style={{
//                 height: "100px",
//                 width: "100px",
//                 margin: "-10px 0 10px -10px",
//               }}
//             />
//             <h3 style={styles.h3}>Fragmented Systems</h3>
//             <p style={{ ...styles.p, margin: 0, fontSize: "15px" }}>
//               Scheduling, goal building, and live session notes live in
//               disconnected, clunky software tools.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* FEATURE 2: REAL-TIME GRAPHING */}
//       <section className="section-container">
//         <div className="responsive-row-reverse">
//           <div className="col-text">
//             <div
//               style={{
//                 color: "#ec4899",
//                 fontWeight: "700",
//                 letterSpacing: "1px",
//                 marginBottom: "10px",
//               }}
//             >
//               LIVE SYNC
//             </div>
//             <h2 style={styles.h2}>Real-Time Predictive Graphing</h2>
//             <p style={styles.p}>
//               Our mobile-first Session Runner allows RBTs to capture data
//               frictionlessly. MenPrac instantly graphs this data, predicting
//               when a learner will meet mastery criteria before they even do.
//             </p>
//             <ul
//               style={{
//                 color: colors.textMuted,
//                 lineHeight: "2",
//                 paddingLeft: "20px",
//               }}
//             >
//               <li>Instant phase change lines.</li>
//               <li>Visual ABC Data analysis.</li>
//               <li>Mobile-optimized for iPads and Tablets.</li>
//             </ul>
//           </div>
//           <div className="col-visual">
//             <Player
//               autoplay
//               loop
//               className="lottie-glow responsive-lottie"
//               src="/animations/charts.json"
//             />
//           </div>
//         </div>
//       </section>
//       {/* FEATURE 1: AI CLINICAL NOTES */}
//       <section className="section-container">
//         <div className="responsive-row">
//           <div className="col-text">
//             <div
//               style={{
//                 color: colors.primary,
//                 fontWeight: "700",
//                 letterSpacing: "1px",
//                 marginBottom: "10px",
//               }}
//             >
//               MENPRAC INTELLIGENCE
//             </div>
//             <h2 style={styles.h2}>AI Clinical Documentation</h2>
//             <p style={styles.p}>
//               MenPrac's native AI engine analyzes raw trial data (frequency,
//               duration, ABC) and instantly generates compliant, insurance-ready
//               session summaries the moment the session ends.
//             </p>
//             <ul
//               style={{
//                 color: colors.textMuted,
//                 lineHeight: "2",
//                 paddingLeft: "20px",
//               }}
//             >
//               <li>Eliminates after-hours documentation.</li>
//               <li>Ensures medical necessity compliance.</li>
//               <li>Learns your clinical writing style over time.</li>
//             </ul>
//           </div>
//           <div className="col-visual">
//             <Player
//               autoplay
//               loop
//               className="lottie-glow responsive-lottie"
//               src="/animations/brain.json"
//             />
//           </div>
//         </div>
//       </section>

//       {/* SECURITY SECTION */}
//       <section className="section-container" style={{ textAlign: "center" }}>
//         <Player
//           autoplay
//           loop
//           className="lottie-glow"
//           src="/animations/security.json"
//           style={{ height: "160px", width: "160px", margin: "0 auto" }}
//         />
//         <h2
//           style={{
//             ...styles.h2,
//             fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
//             marginTop: "20px",
//           }}
//         >
//           Enterprise-grade security. Built for healthcare.
//         </h2>
//         <p style={{ ...styles.p, maxWidth: "600px", margin: "0 auto 40px" }}>
//           Your patients' data is sacred. MenPrac utilizes AES-256 encryption at
//           rest and in transit, complete with immutable audit logs.
//         </p>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             gap: "15px",
//             flexWrap: "wrap",
//           }}
//         >
//           {[
//             "End-to-End Encryption",
//             "HIPAA-Aligned Infrastructure",
//             "Role-Based Access Control",
//             "Automated Backups",
//           ].map((badge, idx) => (
//             <div
//               key={idx}
//               style={{
//                 border: `1px solid ${colors.primary}`,
//                 color: colors.primary,
//                 padding: "10px 20px",
//                 borderRadius: "50px",
//                 fontSize: "clamp(12px, 2vw, 14px)",
//                 fontWeight: "600",
//                 backgroundColor: "rgba(139, 92, 246, 0.05)",
//               }}
//             >
//               {badge}
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* BOTTOM CTA */}
//       <section
//         className="section-container"
//         style={{
//           textAlign: "center",
//           background: "linear-gradient(180deg, #080514 0%, #170d36 100%)",
//           borderTop: `1px solid ${colors.cardBorder}`,
//         }}
//       >
//         <h1 style={{ ...styles.h1, fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
//           Run your practice. <br />
//           Not paperwork.
//         </h1>
//         <p style={{ ...styles.p, maxWidth: "600px", margin: "20px auto 40px" }}>
//           Join forward-thinking healthcare professionals transforming their
//           operations and patient outcomes today.
//         </p>
//         <button
//           className="btn-primary"
//           style={{ padding: "20px 40px", fontSize: "18px" }}
//           onClick={() => navigateTo("/register")}
//         >
//           Get Started For Free
//         </button>
//       </section>

//       {/* FOOTER */}
//       <footer style={styles.footer} className="section-container">
//         <div style={{ flex: "1 1 250px" }}>
//           <div style={styles.navLogoContainer} onClick={() => navigateTo("/")}>
//             {/* YOUR CUSTOM MINI LOGO */}
//             <img
//               src="/logo.png"
//               alt="MenPrac Logo"
//               style={{ height: "60px", width: "auto", objectFit: "contain" }}
//             />

//             <h3 style={{ ...styles.h3, margin: 0 }}></h3>
//           </div>
//           <p style={{ ...styles.p, fontSize: "13px", marginTop: "16px" }}>
//             © 2026 MenPrac Platform. All rights reserved.
//           </p>
//         </div>

//         <div
//           style={{
//             flex: "1 1 300px",
//             display: "flex",
//             gap: "40px",
//             flexWrap: "wrap",
//             fontSize: "14px",
//             color: colors.textMuted,
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               gap: "12px",
//               minWidth: "100px",
//             }}
//           >
//             <span style={{ color: "#fff", fontWeight: "600" }}>Product</span>
//             <span style={{ cursor: "pointer" }}>Features</span>
//             <span style={{ cursor: "pointer" }}>Pricing</span>
//             <span style={{ cursor: "pointer" }}>Security</span>
//           </div>
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               gap: "12px",
//               minWidth: "100px",
//             }}
//           >
//             <span style={{ color: "#fff", fontWeight: "600" }}>Company</span>
//             <span style={{ cursor: "pointer" }}>About Us</span>
//             <span style={{ cursor: "pointer" }}>Careers</span>
//             <span style={{ cursor: "pointer" }}>Contact</span>
//           </div>
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               gap: "12px",
//               minWidth: "100px",
//             }}
//           >
//             <span style={{ color: "#fff", fontWeight: "600" }}>Legal</span>
//             <span style={{ cursor: "pointer" }}>Terms of Service</span>
//             <span style={{ cursor: "pointer" }}>Privacy Policy</span>
//             <span style={{ cursor: "pointer" }}>BAA Agreement</span>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;
import React from "react";

const theme = {
  ink: "#1a1410",
  paper: "#f5f0e8",
  warm: "#c9a96e",
  warmDark: "#8b6b35",
  red: "#b5362a",
  muted: "#6b5e4e",
  border: "rgba(139, 107, 53, 0.25)",
  serif: "'Playfair Display', Georgia, serif",
  sans: "'DM Sans', system-ui, sans-serif",
};

export default function DeveloperNotice() {
  const styles = {
    container: {
      backgroundColor: theme.paper,
      color: theme.ink,
      fontFamily: theme.sans,
      minHeight: "100vh",
      overflowX: "hidden",
      position: "relative",
    },
    noise: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      pointerEvents: "none",
      zIndex: 0,
    },
    topBand: {
      backgroundColor: theme.ink,
      color: theme.warm,
      textAlign: "center",
      padding: "10px 1rem",
      fontSize: "11px",
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      fontWeight: 500,
      position: "relative",
      zIndex: 10,
    },
    header: {
      position: "relative",
      zIndex: 10,
      borderBottom: `1px solid ${theme.border}`,
      padding: "2rem 2rem 1.5rem",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "1rem",
    },
    logoArea: { display: "flex", alignItems: "center", gap: "14px" },
    logoMark: {
      width: "44px",
      height: "44px",
      backgroundColor: theme.ink,
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    logoMarkSpan: {
      color: theme.warm,
      fontFamily: theme.serif,
      fontSize: "20px",
      fontWeight: 700,
    },
    logoText: {
      fontFamily: theme.serif,
      fontSize: "18px",
      fontWeight: 700,
      color: theme.ink,
      lineHeight: 1.1,
    },
    logoSub: {
      fontSize: "11px",
      color: theme.muted,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      fontWeight: 400,
    },
    headerDate: {
      fontSize: "12px",
      color: theme.muted,
      letterSpacing: "0.06em",
      textAlign: "right",
    },
    hero: {
      position: "relative",
      zIndex: 10,
      maxWidth: "860px",
      margin: "0 auto",
      padding: "5rem 2rem 4rem",
      textAlign: "center",
    },
    heroKicker: {
      display: "inline-block",
      backgroundColor: theme.red,
      color: "#fff",
      fontSize: "11px",
      fontWeight: 500,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      padding: "6px 18px",
      borderRadius: "2px",
      marginBottom: "2rem",
    },
    h1: {
      fontFamily: theme.serif,
      fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
      fontWeight: 900,
      lineHeight: 1.05,
      color: theme.ink,
      marginBottom: "2rem",
    },
    h1Em: { fontStyle: "italic", color: theme.warmDark },
    heroSub: {
      fontSize: "1.1rem",
      color: theme.muted,
      maxWidth: "560px",
      margin: "0 auto 3rem",
      lineHeight: 1.7,
      fontWeight: 300,
    },
    ornament: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      maxWidth: "400px",
      margin: "0 auto 4rem",
      color: theme.warm,
    },
    ornamentLine: { flex: 1, height: "1px", backgroundColor: theme.border },
    ornamentIcon: { fontSize: "18px", color: theme.warm },
    statsRow: {
      position: "relative",
      zIndex: 10,
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
      gap: "1px",
      backgroundColor: theme.border,
      border: `1px solid ${theme.border}`,
      maxWidth: "860px",
      margin: "0 auto 5rem",
      borderRadius: "8px",
      overflow: "hidden",
    },
    stat: {
      backgroundColor: theme.paper,
      padding: "2rem 1.5rem",
      textAlign: "center",
    },
    statNum: {
      fontFamily: theme.serif,
      fontSize: "2.6rem",
      fontWeight: 900,
      color: theme.ink,
      lineHeight: 1,
      marginBottom: "6px",
    },
    statNumRed: { color: theme.red },
    statLabel: {
      fontSize: "12px",
      color: theme.muted,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      fontWeight: 500,
    },
    section: {
      position: "relative",
      zIndex: 10,
      maxWidth: "860px",
      margin: "0 auto",
      padding: "0 2rem 5rem",
    },
    sectionLabelWrap: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "1.5rem",
    },
    sectionLabel: {
      fontSize: "11px",
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      fontWeight: 500,
      color: theme.warmDark,
    },
    sectionLabelLine: {
      flex: "0 0 40px",
      height: "1px",
      backgroundColor: theme.warmDark,
    },
    messageCard: {
      backgroundColor: theme.ink,
      color: theme.paper,
      borderRadius: "12px",
      padding: "3rem",
      position: "relative",
      overflow: "hidden",
    },
    quoteMark: {
      position: "absolute",
      top: "-20px",
      left: "30px",
      fontFamily: theme.serif,
      fontSize: "14rem",
      color: "rgba(201, 169, 110, 0.08)",
      lineHeight: 1,
      pointerEvents: "none",
    },
    messageP: {
      fontSize: "1.08rem",
      lineHeight: 1.85,
      color: "rgba(245, 240, 232, 0.88)",
      marginBottom: "1.4rem",
      position: "relative",
      zIndex: 2,
      fontWeight: 300,
    },
    messageStrong: { color: theme.warm, fontWeight: 500 },
    workItems: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: "1.5rem",
      marginTop: "1.5rem",
    },
    workItem: {
      border: `1px solid ${theme.border}`,
      borderRadius: "10px",
      padding: "1.5rem",
      backgroundColor: "rgba(255,255,255,0.4)",
    },
    workItemNum: {
      fontFamily: theme.serif,
      fontSize: "2rem",
      fontWeight: 900,
      color: theme.warmDark,
      opacity: 0.4,
      lineHeight: 1,
      marginBottom: "8px",
    },
    workItemTitle: {
      fontFamily: theme.serif,
      fontSize: "1.1rem",
      fontWeight: 700,
      color: theme.ink,
      marginBottom: "6px",
    },
    workItemDesc: { fontSize: "0.88rem", color: theme.muted, lineHeight: 1.6 },
    ctaSection: {
      position: "relative",
      zIndex: 10,
      maxWidth: "860px",
      margin: "0 auto",
      padding: "0 2rem 6rem",
      textAlign: "center",
    },
    ctaBox: {
      border: `1px solid ${theme.border}`,
      borderRadius: "16px",
      padding: "3.5rem 2.5rem",
      backgroundColor: "rgba(255,255,255,0.5)",
      position: "relative",
    },
    ctaH2: {
      fontFamily: theme.serif,
      fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
      fontWeight: 900,
      color: theme.ink,
      marginBottom: "1rem",
      lineHeight: 1.2,
    },
    ctaP: {
      fontSize: "1rem",
      color: theme.muted,
      maxWidth: "480px",
      margin: "0 auto 2.5rem",
      lineHeight: 1.7,
      fontWeight: 300,
    },
    ctaEmail: {
      display: "inline-flex",
      alignItems: "center",
      gap: "12px",
      backgroundColor: theme.ink,
      color: theme.warm,
      fontFamily: theme.sans,
      fontSize: "1rem",
      fontWeight: 500,
      padding: "1rem 2.2rem",
      borderRadius: "6px",
      textDecoration: "none",
      letterSpacing: "0.02em",
      marginBottom: "1.5rem",
    },
    ctaNote: {
      fontSize: "0.82rem",
      color: theme.muted,
      letterSpacing: "0.04em",
    },
    footer: {
      position: "relative",
      zIndex: 10,
      borderTop: `1px solid ${theme.border}`,
      padding: "1.5rem 2rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "0.5rem",
      fontSize: "12px",
      color: theme.muted,
    },
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
      <div style={styles.container}>
        <div style={styles.noise}></div>

        <div style={styles.topBand}>
          Official Notice — Pending Project Completion & Payment
        </div>

        <header style={styles.header}>
          <div style={styles.logoArea}>
            <div style={styles.logoMark}>
              <span style={styles.logoMarkSpan}>D</span>
            </div>
            <div>
              <div style={styles.logoText}>Developer Notice</div>
              <div style={styles.logoSub}>Full-Stack Web Development</div>
            </div>
          </div>
          <div style={styles.headerDate}>
            Issued: April 2025
            <br />
            <span style={{ color: theme.red, fontWeight: 500 }}>
              Status: Awaiting Response
            </span>
          </div>
        </header>

        <section style={styles.hero}>
          <div style={styles.heroKicker}>Urgent — For the Website Owner</div>
          <h1 style={styles.h1}>
            Your Websites Is
            <br />
            <em style={styles.h1Em}>Not Yet Complete.</em>
          </h1>
          <p style={styles.heroSub}>
            This page is a formal notice addressed to the owner of the
            full-stack websites currently in development. There is an unresolved
            matter of payment and project status that requires your immediate
            attention.
          </p>
          <div style={styles.ornament}>
            <div style={styles.ornamentLine}></div>
            <span style={styles.ornamentIcon}>◆</span>
            <div style={styles.ornamentLine}></div>
          </div>
        </section>

        {/* <div style={styles.statsRow}>
          <div style={styles.stat}>
            <div style={{ ...styles.statNum, ...styles.statNumRed }}>
              Partial
            </div>
            <div style={styles.statLabel}>Payment Status</div>
          </div>
          <div style={styles.stat}>
            <div style={styles.statNum}>0</div>
            <div style={styles.statLabel}>Projects Delivered</div>
          </div>
        </div> */}

        <section style={styles.section}>
          <div style={styles.sectionLabelWrap}>
            <span style={styles.sectionLabel}>The Message</span>
            <div style={styles.sectionLabelLine}></div>
          </div>
          <div style={styles.messageCard}>
            <div style={styles.quoteMark}>"</div>
            <p style={styles.messageP}>
              This page is addressed directly to{" "}
              <strong>the owner of the full-stack websites</strong> whose
              development was commissioned. You engaged a developer through a
              third party, and work has begun in good faith on the projects.
            </p>
            <p style={styles.messageP}>
              To date, the payment received has been{" "}
              <strong>far below what is appropriate</strong> for full-stack web
              development projects. Full-stack development involves both
              frontend and backend engineering, database design, API
              development, and deployment — significant skilled work that
              deserves fair compensation.
            </p>
            <p style={styles.messageP}>
              The projects{" "}
              <strong>remain incomplete and will not be delivered</strong> until
              a clear agreement on fair payment has been established. This is
              not a personal dispute — it is a professional boundary. Skilled
              labour deserves to be fairly paid.
            </p>
            <p style={{ ...styles.messageP, marginBottom: 0 }}>
              If you are the website owner and you{" "}
              <strong>wish to continue</strong> and receive your completed
              websites, please reach out directly. A fair discussion about
              project scope, timeline, and compensation is all that is needed to
              move forward. The work can be completed — let's talk.
            </p>
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.sectionLabelWrap}>
            <span style={styles.sectionLabel}>Scope of Work</span>
            <div style={styles.sectionLabelLine}></div>
          </div>
          <div style={styles.workItems}>
            <div style={styles.workItem}>
              <div style={styles.workItemNum}>01</div>
              <div style={styles.workItemTitle}>Frontend Development</div>
              <div style={styles.workItemDesc}>
                Responsive UI, page layouts, navigation, component design, and
                user experience work across the websites.
              </div>
            </div>
            <div style={styles.workItem}>
              <div style={styles.workItemNum}>02</div>
              <div style={styles.workItemTitle}>Backend Development</div>
              <div style={styles.workItemDesc}>
                Server-side logic, APIs, authentication systems, and business
                logic — the engine that powers each website.
              </div>
            </div>
            <div style={styles.workItem}>
              <div style={styles.workItemNum}>03</div>
              <div style={styles.workItemTitle}>Database & Integration</div>
              <div style={styles.workItemDesc}>
                Data architecture, database setup, and integration between
                frontend, backend, and any third-party services.
              </div>
            </div>
          </div>
        </section>

        <section style={styles.ctaSection}>
          <div style={styles.ctaBox}>
            <h2 style={styles.ctaH2}>
              Ready to Continue?
              <br />
              Let's Resolve This.
            </h2>
            <p style={styles.ctaP}>
              If you are the website owner and want your projects completed
              professionally and on time, one email is all it takes to restart
              the conversation. The developer is willing, ready, and
              professional.
            </p>
            <a href="mailto:sportcolony92@gmail.com" style={styles.ctaEmail}>
              <svg
                viewBox="0 0 24 24"
                style={{
                  width: "18px",
                  height: "18px",
                  fill: theme.warm,
                  flexShrink: 0,
                }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              sportcolony92@gmail.com
            </a>
            <br />
            <span style={styles.ctaNote}>
              Click the button above to open your email and write directly to
              the developer.
            </span>
          </div>
        </section>

        <footer style={styles.footer}>
          <span>Developer Notice — Full-Stack Web Development</span>
          <span>sportcolony92@gmail.com</span>
        </footer>
      </div>
    </>
  );
}
