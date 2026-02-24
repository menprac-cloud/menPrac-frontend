import React, { useState } from 'react';
import { s } from '../../styles/AuthStyles';
import API_URL from '../../config'; // Import the dynamic URL we created

const Register = () => {
  const [formData, setFormData] = useState({ clinicName: '', email: '', password: '', role: 'BCBA' });
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      // Use the dynamic API_URL instead of localhost
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include' // Correct: Allows the browser to receive the cookie
      });
      
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Registration failed');

      // REMOVED: localStorage.setItem('aura_token', data.token); 
      // The cookie is now handled automatically by the browser.
      // Add this line right above window.location.href = '/dashboard';
localStorage.setItem('aura_user', JSON.stringify(data.user));
      // Redirect to dashboard
      window.location.href = '/dashboard';
      
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        <h2 style={s.logo}>MenPrac</h2>
        <p style={s.subtitle}>Create your clinic workspace</p>
        
        {error && <div style={s.error}>{error}</div>}

        <form style={s.form} onSubmit={handleSubmit}>
          <div style={s.inputGroup}>
            <label style={s.label}>Clinic Name</label>
            <input 
              style={s.input} 
              name="clinicName" 
              placeholder="e.g. Apex Therapy" 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div style={s.inputGroup}>
            <label style={s.label}>Work Email</label>
            <input 
              style={s.input} 
              name="email" 
              type="email" 
              placeholder="name@clinic.com" 
              onChange={handleChange} 
              required 
            />
          </div>

          <div style={s.inputGroup}>
            <label style={s.label}>Password</label>
            <input 
              style={s.input} 
              name="password" 
              type="password" 
              placeholder="••••••••" 
              onChange={handleChange} 
              required 
            />
          </div>

          <button type="submit" style={s.button}>Sign Up</button>
        </form>

        <p style={s.linkText}>
          Already have an account? <span style={s.linkSpan} onClick={() => window.location.href='/login'}>Log in</span>
        </p>
      </div>
    </div>
  );
};

export default Register;