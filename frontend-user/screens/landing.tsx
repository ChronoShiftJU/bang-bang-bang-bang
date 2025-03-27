import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // Import the RootStackParamList type

// Type for the screen props
type LandingScreenProps = NativeStackScreenProps<RootStackParamList, 'Landing'>;

export default function LandingScreen({ navigation }: LandingScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Emergency Medical Assistance</Text>
        
        <Text style={styles.subtitle}>
          Quick, Reliable, and Lifesaving Support at Your Fingertips
        </Text>

        <View style={styles.buttonContainer}>
          <Button 
            mode="contained" 
            onPress={() => navigation.navigate('Login')}
            style={styles.button}
          >
            Login
          </Button>

          <Button 
            mode="outlined" 
            onPress={() => navigation.navigate('Register')}
            style={styles.button}
          >
            Register
          </Button>
        </View>
      </View>

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          Emergency Help: Always Here, Always Ready
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    color: '#7f8c8d',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 30,
  },
  button: {
    marginVertical: 10,
  },
  footerContainer: {
    marginBottom: 20,
  },
  footerText: {
    color: '#7f8c8d',
    fontSize: 12,
  }
});