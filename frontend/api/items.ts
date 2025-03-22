import { API_URL } from '../config';
import * as SecureStore from 'expo-secure-store';
import { Item } from '../types';

// Helper function to get auth token
const getToken = async (): Promise<string | null> => {
    return await SecureStore.getItemAsync('userToken');
};

// Get all items
export const getItems = async (): Promise<Item[]> => {
    try {
        const token = await getToken();
        if (!token) throw new Error('Authentication required');

        const response = await fetch(`${API_URL}/items`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch items');
        }

        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('Get items error:', error);
        throw error;
    }
};

// Add a new item
export const addItem = async (item: Omit<Item, '_id'>): Promise<Item> => {
    try {
        const token = await getToken();
        if (!token) throw new Error('Authentication required');

        const response = await fetch(`${API_URL}/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(item),
        });

        if (!response.ok) {
            throw new Error('Failed to add item');
        }

        const data = await response.json();
        return data.item;
    } catch (error) {
        console.error('Add item error:', error);
        throw error;
    }
};

// Delete an item
export const deleteItem = async (itemId: string): Promise<void> => {
    try {
        const token = await getToken();
        if (!token) throw new Error('Authentication required');

        const response = await fetch(`${API_URL}/items/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete item');
        }
    } catch (error) {
        console.error('Delete item error:', error);
        throw error;
    }
};

// Update an item
export const updateItem = async (itemId: string, updates: Partial<Item>): Promise<Item> => {
    try {
        const token = await getToken();
        if (!token) throw new Error('Authentication required');

        const response = await fetch(`${API_URL}/items/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updates),
        });

        if (!response.ok) {
            throw new Error('Failed to update item');
        }

        const data = await response.json();
        return data.item;
    } catch (error) {
        console.error('Update item error:', error);
        throw error;
    }
};