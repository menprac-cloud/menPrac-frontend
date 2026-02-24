import React, { useState } from 'react';
import { s } from '../../styles/AuthStyles';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include' // THIS IS THE MAGIC LINE
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      // Save token and go to dashboard
      // Add this line right above window.location.href = '/dashboard';
localStorage.setItem('aura_user', JSON.stringify(data.user));
      localStorage.setItem('aura_token', data.token);
      window.location.href = '/dashboard';
      
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        <h2 style={s.logo}>Welcome Back</h2>
        <p style={s.subtitle}>Sign in to your MenPrac dashboard</p>
        
        {error && <div style={s.error}>{error}</div>}

        <form style={s.form} onSubmit={handleSubmit}>
          <div style={s.inputGroup}>
            <label style={s.label}>Work Email</label>
            <input style={s.input} name="email" type="email" placeholder="name@clinic.com" onChange={handleChange} required />
          </div>

          <div style={s.inputGroup}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label style={s.label}>Password</label>
              <span style={{...s.linkSpan, fontSize: '13px'}} onClick={() => window.location.href='/forgot-password'}>Forgot?</span>
            </div>
            <input style={s.input} name="password" type="password" placeholder="••••••••" onChange={handleChange} required />
          </div>

          <button type="submit" style={s.button}>Log In</button>
        </form>

        <p style={s.linkText}>
          New to MenPrac? <span style={s.linkSpan} onClick={() => window.location.href='/register'}>Create an account</span>
        </p>
      </div>
    </div>
  );
};

export default Login;