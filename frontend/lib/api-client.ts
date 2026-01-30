// API configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8088';

export const apiClient = {
    async post(endpoint: string, data: any) {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response;
    },

    async get(endpoint: string, token?: string) {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'GET',
            headers,
        });
        return response;
    },

    async postWithAuth(endpoint: string, data: any, token: string) {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        return response;
    },
};
