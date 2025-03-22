import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    const { register } = useAuth();

    const handleRegister = async () => {
        // Validation
        if (!name || !email || !password || !confirmPassword) {
            setErrorMessage('Please fill all fields');
            setVisible(true);
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            setVisible(true);
            return;
        }

        setLoading(true);
        try {
            const result = await register(name, email, password);
            if (result.success) {
                router.replace('/home');
            } else {
                setErrorMessage(result.message || 'Registration failed');
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
            <Text style={styles.title} variant="headlineMedium">Register</Text>

            <TextInput
                mode="outlined"
                label="Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />

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

            <TextInput
                mode="outlined"
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={styles.input}
                secureTextEntry
            />

            <Button
                mode="contained"
                onPress={handleRegister}
                style={styles.button}
                loading={loading}
                disabled={loading}
            >
                Register
            </Button>

            <View style={styles.linkContainer}>
                <Text>Already have an account? </Text>
                <Link href="/auth/login" asChild>
                    <TouchableOpacity>
                        <Text style={styles.link}>Log In</Text>
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