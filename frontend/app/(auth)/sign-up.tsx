import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { 
  Text, 
  TextInput, 
  Button, 
  Surface, 
  HelperText,
  Divider
} from 'react-native-paper'
import { Link, useRouter } from 'expo-router'
import { useSignUp } from '@clerk/clerk-expo'

export default function SignUpScreen() {
    const { isLoaded, signUp, setActive } = useSignUp()
    const router = useRouter()

    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')
    const [pendingVerification, setPendingVerification] = useState(false)
    const [code, setCode] = useState('')

    // Form validation states
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    // Validation functions
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const validatePassword = (password: string) => {
        // At least 8 characters, one uppercase, one lowercase, one number
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
        return passwordRegex.test(password)
    }

    // Handle submission of sign-up form
    const onSignUpPress = async () => {
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
        } else if (!validatePassword(password)) {
            setPasswordError('Password must be at least 8 characters, include uppercase, lowercase, and number')
        }

        // If there are validation errors, stop here
        if (emailError || passwordError) return

        if (!isLoaded) return

        try {
            await signUp.create({
                emailAddress,
                password,
            })

            // Send user an email with verification code
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

            // Set 'pendingVerification' to true to display second form
            setPendingVerification(true)
        } catch (err) {
            console.error(JSON.stringify(err, null, 2))
            // You might want to set a general error message here
        }
    }

    // Handle submission of verification form
    const onVerifyPress = async () => {
        if (!isLoaded) return

        try {
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code,
            })

            if (signUpAttempt.status === 'complete') {
                await setActive({ session: signUpAttempt.createdSessionId })
                router.replace('/')
            } else {
                console.error(JSON.stringify(signUpAttempt, null, 2))
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2))
        }
    }

    // Verification code screen
    if (pendingVerification) {
        return (
            <Surface style={styles.container}>
                <View style={styles.formContainer}>
                    <Text variant="headlineMedium" style={styles.title}>
                        Verify Your Email
                    </Text>
                    <Text style={styles.subtitle}>
                        Enter the 6-digit code sent to {emailAddress}
                    </Text>

                    <TextInput
                        label="Verification Code"
                        value={code}
                        onChangeText={setCode}
                        keyboardType="numeric"
                        style={styles.input}
                        maxLength={6}
                    />

                    <Button 
                        mode="contained" 
                        onPress={onVerifyPress} 
                        style={styles.verifyButton}
                    >
                        Verify
                    </Button>

                    <Button 
                        mode="text" 
                        onPress={() => setPendingVerification(false)}
                    >
                        Go Back
                    </Button>
                </View>
            </Surface>
        )
    }

    // Sign-up screen
    return (
        <Surface style={styles.container}>
            <View style={styles.formContainer}>
                <Text variant="headlineMedium" style={styles.title}>
                    Create Account
                </Text>
                
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
                    onPress={onSignUpPress} 
                    style={styles.signUpButton}
                >
                    Continue
                </Button>

                <Divider style={styles.divider} />

                <View style={styles.signInContainer}>
                    <Text>Already have an account? </Text>
                    <Link href="/sign-in">
                        <Text style={styles.signInLink}>Sign in</Text>
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
    subtitle: {
        textAlign: 'center',
        marginBottom: 16,
        color: 'gray',
    },
    input: {
        marginBottom: 8,
    },
    signUpButton: {
        marginTop: 16,
    },
    verifyButton: {
        marginTop: 16,
        marginBottom: 8,
    },
    divider: {
        marginVertical: 16,
    },
    signInContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signInLink: {
        color: 'blue',
    },
})