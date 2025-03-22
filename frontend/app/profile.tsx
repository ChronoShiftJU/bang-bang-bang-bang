import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Text, Avatar, Card, Divider } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.replace('/auth/login');
    };

    const handleBack = () => {
        router.back();
    };

    if (!user) {
        return (
            <View style={styles.container}>
                <Text>Loading profile...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Button
                icon="arrow-left"
                onPress={handleBack}
                style={styles.backButton}
            >
                Back
            </Button>

            <View style={styles.profileHeader}>
                <Avatar.Text
                    size={80}
                    label={user.name.substring(0, 2).toUpperCase()}
                    style={styles.avatar}
                />
                <Text variant="headlineMedium" style={styles.nameText}>{user.name}</Text>
                <Text variant="bodyLarge" style={styles.emailText}>{user.email}</Text>
            </View>

            <Divider style={styles.divider} />

            <Card style={styles.infoCard}>
                <Card.Title title="Account Information" />
                <Card.Content>
                    <View style={styles.infoRow}>
                        <Text variant="bodyMedium">Name:</Text>
                        <Text variant="bodyMedium">{user.name}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text variant="bodyMedium">Email:</Text>
                        <Text variant="bodyMedium">{user.email}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text variant="bodyMedium">Member Since:</Text>
                        <Text variant="bodyMedium">
                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                        </Text>
                    </View>
                </Card.Content>
            </Card>

            <Button
                mode="contained"
                onPress={handleLogout}
                style={styles.logoutButton}
                buttonColor="#f44336"
            >
                Logout
            </Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    backButton: {
        alignSelf: 'flex-start',
        margin: 16,
    },
    profileHeader: {
        alignItems: 'center',
        padding: 20,
    },
    avatar: {
        marginBottom: 16,
    },
    nameText: {
        marginBottom: 8,
    },
    emailText: {
        opacity: 0.7,
    },
    divider: {
        height: 1,
        marginHorizontal: 16,
    },
    infoCard: {
        margin: 16,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 0.5,
        borderBottomColor: '#e0e0e0',
    },
    logoutButton: {
        margin: 16,
    },
});