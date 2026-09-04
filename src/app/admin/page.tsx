'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push('/admin/dashboard');
      } else {
        const data = await res.json();
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1F1E14', color: '#fff', fontFamily: 'sans-serif' }}>
      <div style={{ background: '#2B2A1C', padding: '40px', borderRadius: '16px', border: '1px solid #2B2A1C', width: '100%', maxWidth: '400px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <ShieldCheck size={48} color="#9C7C38" style={{ margin: '0 auto 16px' }} />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, margin: 0 }}>Secure Portal</h1>
        </div>

        {error && (
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#8A3B2A', padding: '12px', borderRadius: '8px', marginBottom: '24px', fontSize: '0.875rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '8px', color: '#8C8973' }}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #45432F', backgroundColor: '#2B2A1C', color: '#fff', outline: 'none' }}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '8px', color: '#8C8973' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #45432F', backgroundColor: '#2B2A1C', color: '#fff', outline: 'none' }}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '14px', borderRadius: '8px', border: 'none', backgroundColor: '#9C7C38', color: '#fff', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', marginTop: '8px', transition: 'background-color 0.2s' }}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
