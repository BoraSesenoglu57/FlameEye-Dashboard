import React, { useState } from 'react';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Hata mesajı için state

  const handleSubmit = (e) => {
    e.preventDefault();

    // Belirlediğin kullanıcı adı ve şifre kontrolü
    if (username === 'admin' && password === 'flameeye2026') {
      setError(''); // Hata varsa temizle
      onLoginSuccess();
    } else {
      setError('Invalid username or password!'); // Hatalı girişte mesaj göster
    }
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1A1A2E'
    }}>
      <div style={{
        background: '#252836',
        padding: '40px',
        borderRadius: '16px',
        width: '400px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        textAlign: 'center'
      }}>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '8px'
        }}>
          <span style={{ fontSize: '28px' }}>🔥</span>
          <h1 style={{
            margin: 0,
            fontSize: '28px',
            fontWeight: 'bold',
            color: 'white',
            letterSpacing: '0.5px'
          }}>
            FlameEye AI
          </h1>
        </div>

        <p style={{ color: '#888', fontSize: '14px', marginBottom: '35px' }}>
          Wildfire Detection System Access
        </p>

        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          {/* Hata Mesajı Alanı */}
          {error && (
            <div style={{
              backgroundColor: 'rgba(255, 0, 0, 0.1)',
              color: '#ff4d4d',
              padding: '10px',
              borderRadius: '6px',
              marginBottom: '20px',
              fontSize: '13px',
              border: '1px solid rgba(255, 0, 0, 0.2)',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label style={{ color: '#f47b25', fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                background: '#1A1A24',
                border: '1px solid #333',
                borderRadius: '6px',
                color: 'white',
                outline: 'none'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ color: '#f47b25', fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                background: '#1A1A24',
                border: '1px solid #333',
                borderRadius: '6px',
                color: 'white',
                outline: 'none'
              }}
              required
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#f47b25',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'background 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#e06a1a'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#f47b25'}
          >
            LOGIN TO SYSTEM
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;