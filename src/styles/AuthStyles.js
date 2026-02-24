export const colors = {
    bg: '#080514',
    cardBg: '#130a2a',
    cardBorder: '#2d1b5e',
    primary: '#8b5cf6',
    textMain: '#ffffff',
    textMuted: '#9ca3af',
    inputBg: '#0f0822',
  };
  
  export const s = {
    page: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg, fontFamily: '"Inter", sans-serif', color: colors.textMain },
    card: { width: '100%', maxWidth: '420px', padding: '40px', backgroundColor: colors.cardBg, border: `1px solid ${colors.cardBorder}`, borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' },
    logo: { fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '8px', color: '#fff' },
    subtitle: { textAlign: 'center', color: colors.textMuted, fontSize: '14px', marginBottom: '30px' },
    form: { display: 'flex', flexDirection: 'column', gap: '16px' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
    label: { fontSize: '13px', fontWeight: '600', color: colors.textMuted },
    input: { padding: '12px 16px', backgroundColor: colors.inputBg, border: `1px solid ${colors.cardBorder}`, borderRadius: '8px', color: colors.textMain, fontSize: '15px', outline: 'none' },
    button: { padding: '14px', backgroundColor: colors.primary, color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' },
    linkText: { textAlign: 'center', fontSize: '14px', color: colors.textMuted, marginTop: '20px' },
    linkSpan: { color: colors.primary, cursor: 'pointer', fontWeight: '600' },
    error: { backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '10px', borderRadius: '8px', fontSize: '13px', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.2)' }
  };