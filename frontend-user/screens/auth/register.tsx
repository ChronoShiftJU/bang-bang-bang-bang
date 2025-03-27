import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Text, TextInput, Button, Checkbox } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [medicalRecordsUploaded, setMedicalRecordsUploaded] = useState(false);
  const [passwordSecure, setPasswordSecure] = useState(true);
  const [confirmPasswordSecure, setConfirmPasswordSecure] = useState(true);

  const handleUploadMedicalRecords = () => {
    // Placeholder for medical records upload
    Alert.alert(
      "Upload Medical Records", 
      "In a real app, this would open a file picker or camera",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Simulate Upload",
          onPress: () => setMedicalRecordsUploaded(true)
        }
      ]
    );
  };

  const handleRegister = () => {
    // Validation
    if (!fullName || !email || !phoneNumber) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (!termsAccepted) {
      Alert.alert("Error", "Please accept the terms and conditions");
      return;
    }

    // TODO: Actual registration logic
    Alert.alert(
      "Registration Successful", 
      "You can now log in to your account",
      [
        {
          text: "Go to Login",
          onPress: () => router.push('/auth/login')
        }
      ]
    );
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Create Your Account</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          label="Full Name"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
        />
        
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          label="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          style={styles.input}
          keyboardType="phone-pad"
        />
        
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry={passwordSecure}
          right={
            <TextInput.Icon 
              icon={passwordSecure ? "eye-off" : "eye"} 
              onPress={() => setPasswordSecure(!passwordSecure)}
            />
          }
        />
        
        <TextInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
          secureTextEntry={confirmPasswordSecure}
          right={
            <TextInput.Icon 
              icon={confirmPasswordSecure ? "eye-off" : "eye"} 
              onPress={() => setConfirmPasswordSecure(!confirmPasswordSecure)}
            />
          }
        />
        
        <Button 
          mode="outlined" 
          onPress={handleUploadMedicalRecords}
          style={styles.uploadButton}
        >
          {medicalRecordsUploaded 
            ? "Medical Records Uploaded" 
            : "Upload Past Medical Records"}
        </Button>
        
        <View style={styles.termsContainer}>
          <Checkbox
            status={termsAccepted ? 'checked' : 'unchecked'}
            onPress={() => setTermsAccepted(!termsAccepted)}
          />
          <Text style={styles.termsText}>
            I agree to the Terms and Conditions
          </Text>
        </View>
      </View>
      
      <Button 
        mode="contained" 
        onPress={handleRegister}
        style={styles.registerButton}
      >
        Register
      </Button>
      
      <View style={styles.loginContainer}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/auth/login')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2c3e50',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'white',
  },
  uploadButton: {
    marginVertical: 10,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  termsText: {
    marginLeft: 10,
  },
  registerButton: {
    marginTop: 10,
    padding: 5,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  loginText: {
    color: '#3498db',
    fontWeight: 'bold',
  },
});