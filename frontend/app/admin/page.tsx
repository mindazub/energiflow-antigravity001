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

interface PaginatedResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}

export default function AdminDashboard() {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [activities, setActivities] = useState<ActivityLog[]>([]);
    const [tab, setTab] = useState<'users' | 'activities'>('users');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalActivities, setTotalActivities] = useState(0);

    useEffect(() => {
        const role = localStorage.getItem('role');
        const token = localStorage.getItem('token');

        if (!token || role !== 'ADMIN') {
            router.push('/dashboard');
            return;
        }

        // Fetch users at least once to get the count
        if (users.length === 0) {
            fetchUsers();
        }

        if (tab === 'activities') {
            fetchActivities();
        } else {
            fetchUsers();
        }
    }, [router, currentPage, tab]);

    async function fetchUsers() {
        const token = localStorage.getItem('token');
        try {
            const res = await apiClient.get('/api/admin/users', token || '');
            if (res.ok) {
                setUsers(await res.json());
                if (tab === 'users') setLoading(false);
            }
        } catch (err) {
            setError('Error connecting to the backend.');
        }
    }

    async function fetchActivities() {
        setLoading(true);
        const token = localStorage.getItem('token');
        try {
            const res = await apiClient.get(`/api/admin/activities?page=${currentPage}&size=10`, token || '');
            if (res.ok) {
                const data: PaginatedResponse<ActivityLog> = await res.json();
                setActivities(data.content);
                setTotalPages(data.totalPages);
                setTotalActivities(data.totalElements);
            } else {
                setError('Failed to fetch activity logs.');
            }
        } catch (err) {
            setError('Error connecting to the backend.');
        } finally {
            setLoading(false);
        }
    }

    if (loading && activities.length === 0 && users.length === 0) {
        return (
            <div className="container" style={{ padding: '8rem', textAlign: 'center' }}>
                <div className="loading-spinner"></div>
                <p style={{ marginTop: '1rem', color: 'var(--muted)' }}>Loading Admin Panel...</p>
            </div>
        );
    }

    if (error) return <div className="container" style={{ padding: '4rem', textAlign: 'center', color: 'red' }}>{error}</div>;

    return (
        <div className="container" style={{ padding: '2rem 0' }}>
            <h1 style={{ marginBottom: '2rem' }}>Admin Dashboard</h1>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
                <button
                    onClick={() => { setTab('users'); setCurrentPage(0); }}
                    style={{
                        padding: '1rem 2rem',
                        background: 'none',
                        border: 'none',
                        borderBottom: tab === 'users' ? '2px solid var(--primary)' : 'none',
                        color: tab === 'users' ? 'var(--primary)' : 'var(--muted)',
                        cursor: 'pointer',
                        fontWeight: 600,
                        transition: 'all 0.2s'
                    }}
                >
                    Registered Users ({users.length})
                </button>
                <button
                    onClick={() => { setTab('activities'); setCurrentPage(0); }}
                    style={{
                        padding: '1rem 2rem',
                        background: 'none',
                        border: 'none',
                        borderBottom: tab === 'activities' ? '2px solid var(--primary)' : 'none',
                        color: tab === 'activities' ? 'var(--primary)' : 'var(--muted)',
                        cursor: 'pointer',
                        fontWeight: 600,
                        transition: 'all 0.2s'
                    }}
                >
                    Activity Log ({totalActivities})
                </button>
            </div>

            {tab === 'users' ? (
                <div className="card" style={{ padding: 0, overflow: 'hidden', width: '100%' }}>
                    <div className="table-container">
                        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                            <thead style={{ background: 'var(--muted)', opacity: 0.1 }}>
                                <tr>
                                    <th style={{ padding: '1.25rem 1rem', textAlign: 'left', width: '25%' }}>Name</th>
                                    <th style={{ padding: '1.25rem 1rem', textAlign: 'left' }}>Email</th>
                                    <th style={{ padding: '1.25rem 1rem', textAlign: 'left', width: '150px' }}>Role</th>
                                    <th style={{ padding: '1.25rem 1rem', textAlign: 'left', width: '200px' }}>Joined At</th>
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
                </div>
            ) : (
                <>
                    <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '1.5rem', opacity: loading ? 0.6 : 1, transition: 'opacity 0.2s', width: '100%' }}>
                        <div className="table-container">
                            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                                <thead style={{ background: 'var(--muted)', opacity: 0.1 }}>
                                    <tr>
                                        <th style={{ padding: '1.25rem 1rem', textAlign: 'left', width: '25%' }}>User</th>
                                        <th style={{ padding: '1.25rem 1rem', textAlign: 'left', width: '150px' }}>Action</th>
                                        <th style={{ padding: '1.25rem 1rem', textAlign: 'left' }}>Details</th>
                                        <th style={{ padding: '1.25rem 1rem', textAlign: 'left', width: '200px' }}>Time</th>
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
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
                            <button
                                disabled={currentPage === 0 || loading}
                                onClick={() => { setCurrentPage(prev => prev - 1); window.scrollTo(0, 0); }}
                                className="btn btn-outline"
                                style={{ padding: '0.5rem 1.5rem', opacity: currentPage === 0 ? 0.5 : 1 }}
                            >
                                Previous
                            </button>
                            <div style={{ fontWeight: 600, color: 'var(--muted)' }}>
                                Page {currentPage + 1} <span style={{ fontWeight: 400, opacity: 0.5 }}>of</span> {totalPages}
                            </div>
                            <button
                                disabled={currentPage === totalPages - 1 || loading}
                                onClick={() => { setCurrentPage(prev => prev + 1); window.scrollTo(0, 0); }}
                                className="btn btn-primary"
                                style={{ padding: '0.5rem 1.5rem', opacity: currentPage === totalPages - 1 ? 0.5 : 1 }}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
