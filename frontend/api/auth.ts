import { API_URL } from '../config';

interface User {
    _id: string;
    name: string;
    email: string;
    createdAt?: string;
    updatedAt?: string;
}

interface AuthResponse {
    success: boolean;
    token?: string;
    user?: User;
    message?: string;
}

export const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API login error:', error);
        throw error;
    }
};

export const register = async (name: string, email: string, password: string): Promise<AuthResponse> => {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API register error:', error);
        throw error;
    }
};

export const getUser = async (token: string): Promise<User> => {
    try {
        const response = await fetch(`${API_URL}/auth/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to get user data');
        }

        const data = await response.json();
        return data.user;
    } catch (error) {
        console.error('Get user error:', error);
        throw error;
    }
};