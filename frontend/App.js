
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LaunchingScreen from './src/screens/Launching';
import OnboardingScreen from './src/screens/Onboarding/OnboardingScreen';
import ReligiousPlaces from './src/screens/Places/ReligiousPlaces';
 import TouristicPlaces from './src/screens/Places/TouristicPlaces';
 import Restaurants from './src/screens/Places/Restaurants';
import Visited from './src/screens/Visited/Visited';

import MyTabs from './src/screens/naviagtion/Tabs';
import Shops from './src/screens/Shops/Shops';
import Favorites from './src/screens/Favorites/Favorites';
import ProfileScreen from './src/screens/Profile/Profile';
import EditProfile from './src/screens/Profile/EditProfile';
import SettingsScreen from './src/screens/Profile/Settings';
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
<Stack.Screen name="Shops" component={Shops}/>
<Stack.Screen name="Favorites" component={Favorites}/>
<Stack.Screen name="Visited" component={Visited}/>
<Stack.Screen name="Profile" component={ProfileScreen}/>
<Stack.Screen name="EditProfile" component={EditProfile}/>
<Stack.Screen name="SettingsScreen" component={SettingsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}