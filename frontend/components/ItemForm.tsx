import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { Item } from '../types';

interface ItemFormProps {
    onSubmit: (item: Omit<Item, '_id'>) => void;
    onCancel: () => void;
    initialValues?: Partial<Item>;
}

const ItemForm: React.FC<ItemFormProps> = ({ onSubmit, onCancel, initialValues }) => {
    const [title, setTitle] = useState(initialValues?.title || '');
    const [description, setDescription] = useState(initialValues?.description || '');
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        if (!title.trim()) {
            return;
        }

        setLoading(true);

        const newItem = {
            title,
            description,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        onSubmit(newItem);
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text variant="titleLarge" style={styles.title}>
                {initialValues ? 'Edit Item' : 'Add New Item'}
            </Text>

            <TextInput
                mode="outlined"
                label="Title"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
            />

            <TextInput
                mode="outlined"
                label="Description"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
                multiline
                numberOfLines={3}
            />

            <View style={styles.buttonContainer}>
                <Button
                    mode="outlined"
                    onPress={onCancel}
                    style={styles.button}
                >
                    Cancel
                </Button>

                <Button
                    mode="contained"
                    onPress={handleSubmit}
                    style={styles.button}
                    loading={loading}
                    disabled={loading || !title.trim()}
                >
                    {initialValues ? 'Update' : 'Add'}
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        marginBottom: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    button: {
        flex: 1,
        marginHorizontal: 4,
    },
});

export default ItemForm;