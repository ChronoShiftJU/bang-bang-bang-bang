import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
    Text,
    Avatar,
    Card,
    Divider,
    Button,
    Surface
} from 'react-native-paper';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import SignOutButton from '@/app/components/SignOutButton';

const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const now = new Date();

    // Get today's and yesterday's dates at midnight for comparison
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // Format time (h:mm AM/PM)
    const timeString = date.toLocaleString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    }).toUpperCase();

    // Check if the date is today or yesterday
    if (date >= today) {
        return `Today, ${timeString}`;
    } else if (date >= yesterday) {
        return `Yesterday, ${timeString}`;
    }

    // Default format: DD/MM, h:mm AM/PM
    return date.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    }).replace(',', '').toUpperCase();
};

export default function Page() {
    const { user } = useUser();
    const router = useRouter();

    return (
        <Surface style={styles.container}>
            <SignedIn>
                {user && (
                    <Card style={styles.profileCard}>
                        <Card.Content>
                            <View style={styles.profileHeader}>
                                <Avatar.Image
                                    size={80}
                                    source={{ uri: user.externalAccounts[0]?.imageUrl }}
                                    style={styles.avatar}
                                />
                                <View style={styles.userDetails}>
                                    <Text variant="titleLarge">
                                        Hello, {user.firstName || 'User'}
                                    </Text>
                                    <Text variant="bodyMedium">
                                        Email: {user.emailAddresses[0]?.emailAddress}
                                    </Text>
                                    <Text variant="bodySmall">
                                        Last Signed In: {formatDate(user.lastSignInAt)}
                                    </Text>
                                </View>
                            </View>
                        </Card.Content>
                    </Card>
                )}

                <Divider style={styles.divider} />

                <Button
                    mode="contained"
                    onPress={() => router.push('/(home)/chat')}
                    style={styles.button}
                >
                    Go Chat
                </Button>

                <View style={styles.actionContainer}>
                    
                    <SignOutButton />
                </View>
            </SignedIn>

            <SignedOut>
                <View style={styles.authLinks}>
                    <Button
                        mode="contained"
                        onPress={() => router.push('/(auth)/sign-in')}
                        style={styles.authButton}
                    >
                        Sign In
                    </Button>
                    <Button
                        mode="outlined"
                        onPress={() => router.push('/(auth)/sign-up')}
                        style={styles.authButton}
                    >
                        Sign Up
                    </Button>
                </View>
            </SignedOut>
        </Surface>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    profileCard: {
        marginBottom: 16,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        marginRight: 16,
    },
    userDetails: {
        flex: 1,
    },
    divider: {
        marginVertical: 16,
    },
    actionContainer: {
        alignItems: 'center',
    },
    authLinks: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    authButton: {
        flex: 1,
        marginHorizontal: 8,
    },
    button: {
        marginHorizontal: 8,
    },
    dataCard: {
        marginTop: 16,
    },
});