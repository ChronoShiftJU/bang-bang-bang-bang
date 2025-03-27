import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';

// Import your screens
import LandingScreen from './screens/landing';
import LoginScreen from './screens/auth/login';
import RegisterScreen from './screens/auth/register';

// Define the type for your RootStackParamList
export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  Register: undefined;
  SOS: undefined;
  SOSConfirm: undefined;
  SOSTracking: undefined;
  MedicalHistory: undefined;
  EmergencyContacts: undefined;
  Profile: undefined;
  Settings: undefined;
};

// Create the Stack Navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Landing"
          screenOptions={{
            headerShown: false, // Hide default headers
            contentStyle: {
              backgroundColor: '#f0f4f8' // Consistent background color
            }
          }}
        >
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}