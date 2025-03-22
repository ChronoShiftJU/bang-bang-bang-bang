import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    const { login } = useAuth();

    const handleLogin = async () => {
        if (!email || !password) {
            setErrorMessage('Please fill all fields');
            setVisible(true);
            return;
        }

        setLoading(true);
        try {
            const result = await login(email, password);
            if (result.success) {
                router.replace('/home');
            } else {
                setErrorMessage(result.message || 'Login failed');
                setVisible(true);
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
            setVisible(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title} variant="headlineMedium">Log In</Text>

            <TextInput
                mode="outlined"
                label="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                mode="outlined"
                label="Password"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
            />

            <Button
                mode="contained"
                onPress={handleLogin}
                style={styles.button}
                loading={loading}
                disabled={loading}
            >
                Log In
            </Button>

            <View style={styles.linkContainer}>
                <Text>Don't have an account? </Text>
                <Link href="/auth/register" asChild>
                    <TouchableOpacity>
                        <Text style={styles.link}>Register</Text>
                    </TouchableOpacity>
                </Link>
            </View>

            <Snackbar
                visible={visible}
                onDismiss={() => setVisible(false)}
                duration={3000}
            >
                {errorMessage}
            </Snackbar>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    title: {
        marginBottom: 20,
        alignSelf: 'center',
    },
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 16,
    },
    linkContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    link: {
        color: '#6200ee',
    }
});