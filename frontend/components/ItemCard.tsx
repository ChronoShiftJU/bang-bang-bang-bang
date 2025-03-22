import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { Item } from '../types';

interface ItemCardProps {
    item: Item;
    onDelete: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onDelete }) => {
    return (
        <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
                <Text variant="titleMedium">{item.title}</Text>
                <Text variant="bodyMedium">{item.description}</Text>
            </Card.Content>
            <Card.Actions style={styles.cardActions}>
                <Text variant="bodySmall" style={styles.dateText}>
                    {new Date(item.createdAt).toLocaleDateString()}
                </Text>
                <IconButton
                    icon="delete"
                    size={20}
                    onPress={onDelete}
                />
            </Card.Actions>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        marginVertical: 4,
        marginHorizontal: 8,
    },
    cardContent: {
        paddingBottom: 8,
    },
    cardActions: {
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    dateText: {
        color: '#757575',
    },
});

export default ItemCard;