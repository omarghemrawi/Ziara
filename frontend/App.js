// App.js
import 'react-native-gesture-handler'; // لازم أول سطر
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 1) Onboarding & Splash
import OnboardingScreen from './src/screens/Onboarding/OnboardingScreen';
import LaunchingScreen  from './src/screens/Launching';

// 2) Welcome → Auth → Intro flow
import Welcome        from './src/screens/Welcome/Welcome';
import Login          from './src/screens/Login/Login';
import Signup         from './src/screens/Signup/Signup';
import ForgotPassword from './src/screens/ForgotPassword/ForgotPassword';
import IntroPage      from './src/screens/Intro/IntroPage';

// 3) Main app tabs
import MyTabs from './src/screens/navigation/Tabs';

// 4) Places & Profile
import TouristicPlaces   from './src/screens/Places/TouristicPlaces';
import ReligiousPlaces   from './src/screens/Places/ReligiousPlaces';
import Restaurants       from './src/screens/Places/Restaurants';
import Visited           from './src/screens/Visited/Visited';
import ProfileScreen     from './src/screens/Profile/Profile';
import EditProfileScreen from './src/screens/Profile/EditProfile';

// 5) Settings flow
import SettingsScreen      from './src/screens/Profile/Settings';
import LanguagesScreen     from './src/screens/Profile/LanguagesScreen';
import HowToUseScreen      from './src/screens/Profile/HowToUseScreen';
import HelpSupportScreen   from './src/screens/Profile/HelpSupportScreen';
import PrivacyPolicyScreen from './src/screens/Profile/PrivacyPolicyScreen';


import NearbyScreen           from './src/screens/nearby/NearbyScreen';
import PopularFoodsScreen     from './src/screens/generalInformation/PopularFoodsScreen';
import PopularPlacesScreen    from './src/screens/generalInformation/PopularPlacesScreen';
import ChatScreen from './src/screens/AiSupport/ChatScreen';
import PlaceDetailScreen from './src/screens/Places/PlaceDetailScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"   // أول شاشة عند تشغيل الأبلكيشن
        screenOptions={{ headerShown: false }} // نخفي الهيدر الافتراضي
      >
        {/* 1: Onboarding & Splash */}
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Launching"  component={LaunchingScreen} />

       <Stack.Screen name="Nearby"        component={NearbyScreen} />
<Stack.Screen name="PopularFoods"  component={PopularFoodsScreen} />
<Stack.Screen name="PopularPlaces" component={PopularPlacesScreen} />


        {/* 2: Auth flow */}
        <Stack.Screen name="Welcome"        component={Welcome} />
        <Stack.Screen name="Login"          component={Login} />
        <Stack.Screen name="Signup"         component={Signup} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

        {/* 3: Intro page */}
        <Stack.Screen name="Intro" component={IntroPage} />

        {/* 4: Main tabs */}
        <Stack.Screen name="Home" component={MyTabs} />

        {/* 5: Places & Profile */}
        <Stack.Screen name="TouristicPlaces" component={TouristicPlaces} />
        <Stack.Screen name="ReligiousPlaces" component={ReligiousPlaces} />
        <Stack.Screen name="Restaurants"     component={Restaurants} />
        <Stack.Screen name="Visited"         component={Visited} />
        <Stack.Screen name="Profile"         component={ProfileScreen} />
        <Stack.Screen name="EditProfile"     component={EditProfileScreen} />

        {/* 6: Settings flow */}
        <Stack.Screen 
          name="SettingsScreen"
          component={SettingsScreen} 
          options={{ headerShown: false }} // SettingsScreen يرسم هيدر خاص فيه
        />
        <Stack.Screen 
          name="Languages" 
          component={LanguagesScreen} 
          options={{ headerShown: true, title: 'Languages' }} 
        />
        <Stack.Screen 
          name="HowToUse" 
          component={HowToUseScreen} 
          options={{ headerShown: true, title: 'How to use' }} 
        />
        <Stack.Screen 
          name="HelpSupport" 
          component={HelpSupportScreen} 
          options={{ headerShown: true, title: 'Help & Support' }} 
        />
        <Stack.Screen 
          name="PrivacyPolicy" 
          component={PrivacyPolicyScreen} 
          options={{ headerShown: true, title: 'Privacy policy' }} 
        />
            <Stack.Screen 
          name="ChatScreen" 
          component={ChatScreen} 
       
        />
        <Stack.Screen
  name="PlaceDetails"
  component={PlaceDetailScreen}
  options={{ headerShown: false }}
/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
