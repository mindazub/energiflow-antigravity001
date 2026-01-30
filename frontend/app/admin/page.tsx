'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';

interface User {
    id: number;
    email: string;
    name: string;
    role: string;
    createdAt: string;
}

interface ActivityLog {
    id: number;
    action: string;
    details: string;
    timestamp: string;
    userName: string;
    userEmail?: string;
}

export default function AdminDashboard() {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [activities, setActivities] = useState<ActivityLog[]>([]);
    const [tab, setTab] = useState<'users' | 'activities'>('users');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const role = localStorage.getItem('role');
        const token = localStorage.getItem('token');

        if (!token || role !== 'ADMIN') {
            router.push('/dashboard');
            return;
        }

        fetchData();
    }, [router]);

    async function fetchData() {
        setLoading(true);
        const token = localStorage.getItem('token');

        try {
            const [usersRes, actsRes] = await Promise.all([
                apiClient.get('/api/admin/users', token || ''),
                apiClient.get('/api/admin/activities', token || '')
            ]);

            if (usersRes.ok && actsRes.ok) {
                setUsers(await usersRes.json());
                setActivities(await actsRes.json());
            } else {
                setError('Failed to fetch data. Are you an admin?');
            }
        } catch (err) {
            setError('Error connecting to the backend.');
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Loading Admin Panel...</div>;
    if (error) return <div className="container" style={{ padding: '4rem', textAlign: 'center', color: 'red' }}>{error}</div>;

    return (
        <div className="container" style={{ padding: '2rem 0' }}>
            <h1 style={{ marginBottom: '2rem' }}>Admin Dashboard</h1>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
                <button
                    onClick={() => setTab('users')}
                    style={{
                        padding: '1rem 2rem',
                        background: 'none',
                        border: 'none',
                        borderBottom: tab === 'users' ? '2px solid var(--primary)' : 'none',
                        color: tab === 'users' ? 'var(--primary)' : 'var(--muted)',
                        cursor: 'pointer',
                        fontWeight: 600
                    }}
                >
                    Registered Users ({users.length})
                </button>
                <button
                    onClick={() => setTab('activities')}
                    style={{
                        padding: '1rem 2rem',
                        background: 'none',
                        border: 'none',
                        borderBottom: tab === 'activities' ? '2px solid var(--primary)' : 'none',
                        color: tab === 'activities' ? 'var(--primary)' : 'var(--muted)',
                        cursor: 'pointer',
                        fontWeight: 600
                    }}
                >
                    Activity Log ({activities.length})
                </button>
            </div>

            {tab === 'users' ? (
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: 'var(--muted)', opacity: 0.1 }}>
                            <tr>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Name</th>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Email</th>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Role</th>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Joined At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '1rem' }}>{user.name}</td>
                                    <td style={{ padding: '1rem' }}>{user.email}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '4px',
                                            fontSize: '0.75rem',
                                            background: user.role === 'ADMIN' ? 'rgba(52, 211, 153, 0.1)' : 'rgba(96, 165, 250, 0.1)',
                                            color: user.role === 'ADMIN' ? '#10b981' : '#3b82f6'
                                        }}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', color: 'var(--muted)' }}>
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: 'var(--muted)', opacity: 0.1 }}>
                            <tr>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>User</th>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Action</th>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Details</th>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activities.map(log => (
                                <tr key={log.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '1rem' }}>{log.userName} <br /><small style={{ color: 'var(--muted)' }}>{log.userEmail}</small></td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            padding: '0.2rem 0.4rem',
                                            borderRadius: '4px',
                                            fontSize: '0.7rem',
                                            fontWeight: 700,
                                            background: 'var(--muted)',
                                            color: 'var(--foreground)'
                                        }}>
                                            {log.action}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>{log.details}</td>
                                    <td style={{ padding: '1rem', color: 'var(--muted)', fontSize: '0.85rem' }}>
                                        {new Date(log.timestamp).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
