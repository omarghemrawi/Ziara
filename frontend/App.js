// Ziara/frontend/App.js
import 'react-native-gesture-handler'; // ← لازم أول شيء
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 1) Onboarding & Splash
import OnboardingScreen from './src/screens/Onboarding/OnboardingScreen';
import LaunchingScreen from './src/screens/Launching';


// 2) Welcome → Auth → Intro flow


// شاشات تسجيل الدخول والتسجيل


import Welcome        from './src/screens/Welcome/Welcome';
import Login          from './src/screens/Login/Login';
import Signup         from './src/screens/Signup/Signup';
import ForgotPassword from './src/screens/ForgotPassword/ForgotPassword';
import IntroPage      from './src/screens/Intro/IntroPage';  // ← هذا المسار لازم يكون صح

// 3) Main app tabs
import MyTabs from './src/screens/navigation/Tabs';


// 4) Places screens
import TouristicPlaces from './src/screens/Places/TouristicPlaces';
import ReligiousPlaces from './src/screens/Places/ReligiousPlaces';
import Restaurants     from './src/screens/Places/Restaurants';
import Visited from './src/screens/Visited/Visited';
import ProfileScreen from './src/screens/Profile/Profile';
import EditProfileScreen from './src/screens/Profile/EditProfile';



const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>



      <Stack.Navigator
        initialRouteName="Onboarding"  /* أول شاشة عند تشغيل الأبلكيشن */
        screenOptions={{ headerShown: false }}
      >

        {/* 1: Onboarding */}
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />

        {/* 2: Auth flow */}
        <Stack.Screen name="Welcome"        component={Welcome} />
        <Stack.Screen name="Login"          component={Login} />
        <Stack.Screen name="Signup"         component={Signup} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

        {/* 3: Intro typewriter page */}
        <Stack.Screen name="Intro" component={IntroPage} />

        {/* 4: Main tabs (بعد ما تخلص Intro) */}
        <Stack.Screen name="Home" component={MyTabs} />

        {/* 5: Launching (Splash أو تحميل أولي) */}
        <Stack.Screen name="Launching" component={LaunchingScreen} />

        {/* 6: باقي شاشات الأماكن */}
        <Stack.Screen name="TouristicPlaces" component={TouristicPlaces} />
        <Stack.Screen name="ReligiousPlaces" component={ReligiousPlaces} />
        <Stack.Screen name="Restaurants"     component={Restaurants} />
     <Stack.Screen name="Visited"     component={Visited} />
      <Stack.Screen name="Profile"     component={ProfileScreen} />
         <Stack.Screen name="EditProfile"     component={EditProfileScreen} />

      </Stack.Navigator>

    </NavigationContainer>
  );
}
