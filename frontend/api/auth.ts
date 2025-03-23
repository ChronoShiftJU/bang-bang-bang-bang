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

export const login = async (email: string, password: string) => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Login failed 1");
        }
        
        return data; // Expects { token: "..." }
    } catch (error) {
        console.error("Login error:", error);
        return { error: error.message };
    }
};

export const register = async (name: string, email: string, password: string) => {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || "Registration failed");
        }
        
        return { success: true };
    } catch (error) {
        console.error("Registration error:", error);
        return { success: false, message: error.message };
    }
};

export const getUser = async (token: string) => {
    try {
        const response = await fetch(`${API_URL}/auth/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch user");

        return data;
    } catch (error) {
        console.error("Get user error:", error);
        return null;
    }
};
