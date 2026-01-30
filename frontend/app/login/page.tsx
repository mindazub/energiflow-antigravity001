'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';

export default function Login() {
    const router = useRouter();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await apiClient.post('/api/auth/login', form);
            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Invalid credentials');
                setLoading(false);
            } else {
                // Store token in localStorage
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    if (data.role) localStorage.setItem('role', data.role);
                    if (data.name) localStorage.setItem('name', data.name);
                }
                router.push('/dashboard');
                router.refresh();
            }
        } catch (err) {
            setError('Network error. Please try again.');
            setLoading(false);
        }
    }

    return (
        <div style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Welcome Back</h2>
                {error && <div style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label className="label">Email</label>
                        <input
                            type="email"
                            className="input"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label className="label">Password</label>
                        <input
                            type="password"
                            className="input"
                            value={form.password}
                            onChange={e => setForm({ ...form, password: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--muted)' }}>
                    Don't have an account? <a href="/register" style={{ color: 'var(--primary)' }}>Register</a>
                </p>
            </div>
        </div>
    );
}
