
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LaunchingScreen from './src/screens/Launching';
import OnboardingScreen from './src/screens/Onboarding/OnboardingScreen';
import ReligiousPlaces from './src/screens/Places/ReligiousPlaces';
 import TouristicPlaces from './src/screens/Places/TouristicPlaces';
 import Restaurants from './src/screens/Places/Restaurants';


import MyTabs from './src/screens/naviagtion/Tabs';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>

        <Stack.Navigator
    initialRouteName='Onboarding'
        screenOptions={{
          headerShown: false, 
        }}
      >
         <Stack.Screen name="Onboarding" options={{headerShown: false}} component={OnboardingScreen} />
 <Stack.Screen name="Home" component={MyTabs} options={{headerShown: false}} />
        <Stack.Screen name="Launching" component={LaunchingScreen} />
    <Stack.Screen name="TouristicPlaces" component={TouristicPlaces} />
<Stack.Screen name="ReligiousPlaces" component={ReligiousPlaces} />
<Stack.Screen name="Restaurants" component={Restaurants} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}