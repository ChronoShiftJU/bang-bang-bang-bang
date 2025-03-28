import React, { useCallback, useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import {
    Text,
    TextInput,
    Button,
    Surface,
    Divider,
    HelperText
} from 'react-native-paper'
import { Link, useRouter } from 'expo-router'

import * as WebBrowser from 'expo-web-browser'
import * as AuthSession from 'expo-auth-session'
import { useSSO, useSignIn } from '@clerk/clerk-expo'

export const useWarmUpBrowser = () => {
    useEffect(() => {
        void WebBrowser.warmUpAsync()
        return () => {
            void WebBrowser.coolDownAsync()
        }
    }, [])
}

WebBrowser.maybeCompleteAuthSession()

export default function Page() {
    const { signIn, setActive, isLoaded } = useSignIn()
    const router = useRouter()

    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    useWarmUpBrowser()
    const { startSSOFlow } = useSSO()

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const onPress = useCallback(async () => {
        try {
            const { createdSessionId, setActive } = await startSSOFlow({
                strategy: 'oauth_google',
                redirectUrl: AuthSession.makeRedirectUri(),
            })

            if (createdSessionId) {
                setActive!({ session: createdSessionId })
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2))
        }
    }, [])

    const onSignInPress = async () => {
        // Reset previous errors
        setEmailError('')
        setPasswordError('')

        // Validate email
        if (!emailAddress) {
            setEmailError('Email is required')
        } else if (!validateEmail(emailAddress)) {
            setEmailError('Invalid email format')
        }

        // Validate password
        if (!password) {
            setPasswordError('Password is required')
        }

        // If there are validation errors, stop here
        if (emailError || passwordError) return

        if (!isLoaded) return

        try {
            const signInAttempt = await signIn.create({
                identifier: emailAddress,
                password,
            })

            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId })
                router.replace('/')
            } else {
                console.error(JSON.stringify(signInAttempt, null, 2))
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2))
            // You might want to set a general error message here
        }
    }

    return (
        <Surface style={styles.container}>
            <View style={styles.formContainer}>
                <Text variant="headlineMedium" style={styles.title}>Sign In</Text>

                <TextInput
                    label="Email"
                    value={emailAddress}
                    onChangeText={setEmailAddress}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    style={styles.input}
                    error={!!emailError}
                />
                {emailError ? (
                    <HelperText type="error" visible={!!emailError}>
                        {emailError}
                    </HelperText>
                ) : null}

                <TextInput
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!isPasswordVisible}
                    right={
                        <TextInput.Icon
                            icon={isPasswordVisible ? "eye-off" : "eye"}
                            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        />
                    }
                    style={styles.input}
                    error={!!passwordError}
                />
                {passwordError ? (
                    <HelperText type="error" visible={!!passwordError}>
                        {passwordError}
                    </HelperText>
                ) : null}

                <Button
                    mode="contained"
                    onPress={onSignInPress}
                    style={styles.signInButton}
                >
                    Sign In
                </Button>

                <Divider style={styles.divider} />

                <Button
                    mode="outlined"
                    onPress={onPress}
                    icon="google"
                    style={styles.googleButton}
                >
                    Sign in with Google
                </Button>

                <View style={styles.signUpContainer}>
                    <Text>Don't have an account? </Text>
                    <Link href="/sign-up">
                        <Text style={styles.signUpLink}>Sign up</Text>
                    </Link>
                </View>
            </View>
        </Surface>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    formContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        textAlign: 'center',
        marginBottom: 16,
    },
    input: {
        marginBottom: 8,
    },
    signInButton: {
        marginTop: 16,
    },
    divider: {
        marginVertical: 16,
    },
    googleButton: {
        marginBottom: 16,
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signUpLink: {
        color: 'blue',
    },
})