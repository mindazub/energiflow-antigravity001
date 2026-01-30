'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export function AuthNav() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        // Check if user has a token
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        setIsLoggedIn(!!token);
        setIsAdmin(role === 'ADMIN');
    }, [pathname]); // Re-check when route changes

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                // Inform backend of logout for activity tracking
                await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8088'}/api/auth/logout`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
            } catch (err) { /* ignore */ }
        }
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('name');
        setIsLoggedIn(false);
        setIsAdmin(false);
        router.push('/');
        router.refresh();
    };

    if (isLoggedIn) {
        return (
            <>
                {isAdmin && (
                    <a href="/admin" style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--primary)' }}>
                        Admin
                    </a>
                )}
                <a href="/dashboard" style={{ fontWeight: 500, fontSize: '0.95rem' }}>
                    Dashboard
                </a>
                <button
                    onClick={handleLogout}
                    className="btn btn-outline"
                    style={{ padding: '0.5rem 1.25rem' }}
                >
                    Sign Out
                </button>
            </>
        );
    }

    return (
        <>
            <a href="/login" style={{ fontWeight: 500, fontSize: '0.95rem' }}>
                Login
            </a>
            <a href="/register" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem' }}>
                Get Started
            </a>
        </>
    );
}
