import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LaunchingScreen from './src/screens/Launching';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator
    
        screenOptions={{
          headerShown: false, 
        }}
      >
         
        <Stack.Screen name="Home" component={LaunchingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
