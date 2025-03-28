import React, { useState, useEffect, useCallback } from 'react'
import {
    View,
    StyleSheet,
    FlatList,
    KeyboardAvoidingView,
    Platform
} from 'react-native'
import {
    Text,
    TextInput,
    Surface,
    Avatar
} from 'react-native-paper'
import { useAuth, useUser } from '@clerk/clerk-expo'

// Assume you have a WebSocket or Firebase connection setup
// This is a placeholder for your actual real-time messaging logic
interface Message {
    id: string
    userId: string
    userName: string
    userImage: string
    text: string
    timestamp: number
}


// const URL = '192.168.61.49';
const URL = '192.168.29.250';

export default function GlobalChatPage() {
    const { user } = useUser();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const { getToken, isSignedIn } = useAuth();

    useEffect(() => {
        // Fetch initial messages or set up WebSocket connection
        const fetchMessages = async() => {
            try {
                const token = await getToken();
                const response = await fetch(`http://${URL}:5000/api/messages/`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const messages = await response.json();
                console.log('Fetched messages:', messages);
                setMessages(messages);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        }

        fetchMessages();
    }, [])

    const sendMessage = useCallback(async () => {
        if (!newMessage.trim()) return

        const message: Message = {
            id: `${Date.now()}`, // Temporary unique ID
            userId: user?.id || 'unknown',
            userName: user?.fullName || user?.emailAddresses[0]?.emailAddress || 'Anonymous',
            userImage: user?.externalAccounts[0]?.imageUrl || '',
            text: newMessage.trim(),
            timestamp: Date.now()
        }

        try {
            const token = await getToken();
            const response = await fetch(`http://${URL}:5000/api/messages/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify(message)
            });
            
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const savedMessage = await response.json();
            console.log('Message posted:', savedMessage);
            // Optionally, update your UI to include the new message.
          } catch (error) {
            console.error('Error posting message:', error);
          }
        

        // Send message to backend
        // In a real app, this would be a WebSocket emit or API call
        setMessages(prev => [...prev, message])
        setNewMessage('')
    }, [newMessage, user])

    const renderMessage = ({ item }: { item: Message }) => (
        <Surface style={styles.messageContainer}>
            <Avatar.Image
                size={40}
                source={{ uri: item.userImage }}
                style={styles.avatar}
            />
            <View style={styles.messageContent}>
                <Text variant="bodyMedium" style={styles.userName}>
                    {item.userName}
                </Text>
                <Text variant="bodyMedium">{item.text}</Text>
            </View>
        </Surface>
    )

    return (
        <View
            style={styles.container}

        >
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.messageList}
                inverted
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.inputContainer}>
                <TextInput
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="Type a message..."
                    style={styles.input}
                    right={
                        <TextInput.Icon
                            icon="send"
                            onPress={sendMessage}
                        />
                    }
                />
            </KeyboardAvoidingView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    messageList: {
        padding: 16,
        paddingBottom: 0
    },
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        padding: 12,
        borderRadius: 8,
        elevation: 2
    },
    avatar: {
        marginRight: 12
    },
    messageContent: {
        flex: 1
    },
    userName: {
        fontWeight: 'bold',
        marginBottom: 4
    },
    inputContainer: {
        padding: 16,
        backgroundColor: 'white'
    },
    input: {
        backgroundColor: '#f5f5f5'
    }
})