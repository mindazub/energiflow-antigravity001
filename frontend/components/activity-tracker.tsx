'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ActivityTracker() {
    const pathname = usePathname();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const logActivity = async () => {
            try {
                await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8088'}/api/activity/log`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        action: 'PAGE_VIEW',
                        details: `Visited ${pathname}`
                    })
                });
            } catch (err) {
                // Ignore tracking errors
            }
        };

        logActivity();
    }, [pathname]);

    return null; // This component doesn't render anything
}
