'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';

interface User {
    id: number;
    email: string;
    name?: string;
    createdAt: string;
}

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            const token = localStorage.getItem('token');

            if (!token) {
                router.push('/login');
                return;
            }

            try {
                const res = await apiClient.get('/api/auth/me', token);

                if (!res.ok) {
                    localStorage.removeItem('token');
                    router.push('/login');
                    return;
                }

                const userData = await res.json();
                setUser(userData);
            } catch (error) {
                localStorage.removeItem('token');
                router.push('/login');
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, [router]);

    if (loading) {
        return (
            <div className="container" style={{ paddingTop: '5rem', textAlign: 'center' }}>
                <p>Loading...</p>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '5rem' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>Dashboard</h1>

            <div className="card" style={{ marginBottom: '2rem' }}>
                <h2 style={{ marginBottom: '1rem' }}>Welcome, {user.name || user.email}!</h2>
                <p style={{ color: 'var(--muted)' }}>You are now part of the energy revolution.</p>
                <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(0,0,0,0.1)', borderRadius: '0.5rem', fontFamily: 'monospace' }}>
                    User ID: {user.id}<br />
                    Email: {user.email}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <div className="card">
                    <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Current Usage</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>450 kWh</p>
                    <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>-12% vs last month</p>
                </div>
                <div className="card">
                    <h3 style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>Efficiency Score</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>A+</p>
                    <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>Top 5% of users</p>
                </div>
                <div className="card">
                    <h3 style={{ color: '#a855f7', marginBottom: '0.5rem' }}>Active Devices</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>12</p>
                    <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>All systems normal</p>
                </div>
            </div>
        </div>
    );
}
