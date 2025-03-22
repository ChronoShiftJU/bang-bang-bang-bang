import { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { FAB, Portal, Modal, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import ItemCard from '../components/ItemCard';
import ItemForm from '../components/ItemForm';
import { getItems, addItem, deleteItem } from '../api/items';
import { Item } from '../types';

export default function Home() {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        setLoading(true);
        try {
            const data = await getItems();
            setItems(data);
        } catch (error) {
            console.error('Error loading items:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddItem = async (newItem: Omit<Item, '_id'>) => {
        try {
            const addedItem = await addItem(newItem);
            setItems(prevItems => [...prevItems, addedItem]);
            setVisible(false);
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    const handleDeleteItem = async (itemId: string) => {
        try {
            await deleteItem(itemId);
            setItems(prevItems => prevItems.filter(item => item._id !== itemId));
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleProfileNav = () => {
        router.push('/profile');
    };

    return (
        <View style={styles.container}>
            <Text variant="headlineMedium" style={styles.header}>
                Welcome, {user?.name}!
            </Text>

            <FlatList
                data={items}
                renderItem={({ item }) => (
                    <ItemCard
                        item={item}
                        onDelete={() => handleDeleteItem(item._id)}
                    />
                )}
                keyExtractor={item => item._id}
                contentContainerStyle={styles.listContent}
                refreshing={loading}
                onRefresh={loadItems}
            />

            <Portal>
                <Modal
                    visible={visible}
                    onDismiss={() => setVisible(false)}
                    contentContainerStyle={styles.modalContent}
                >
                    <ItemForm onSubmit={handleAddItem} onCancel={() => setVisible(false)} />
                </Modal>
            </Portal>

            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => setVisible(true)}
            />

            <FAB
                icon="account"
                style={styles.profileFab}
                onPress={handleProfileNav}
                small
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
    },
    header: {
        padding: 16,
    },
    listContent: {
        padding: 8,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 16,
        margin: 16,
        borderRadius: 8,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    profileFab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        top: 40,
    },
});