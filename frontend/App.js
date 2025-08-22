import 'react-native-gesture-handler';

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LanguageProvider } from './src/screens/locales/LanguageContext';
import { ThemeProvider } from './src/screens/Theme/Theme';
import { Provider } from 'react-redux';
import store from './src/redux/store';

// Screens
import OnboardingScreen from './src/screens/Onboarding/OnboardingScreen';
import LaunchingScreen from './src/screens/Launching';
import Welcome from './src/screens/Welcome/Welcome';
import Login from './src/screens/Login/Login';
import Signup from './src/screens/Signup/Signup';
import ForgotPassword from './src/screens/ForgotPassword/ForgotPassword';
import IntroPage from './src/screens/Intro/IntroPage';
import MyTabs from './src/screens/navigation/Tabs';

import TouristicPlaces from './src/screens/Places/TouristicPlaces';
import ReligiousPlaces from './src/screens/Places/ReligiousPlaces';
import Restaurants from './src/screens/Places/Restaurants';
import Visited from './src/screens/Visited/Visited';
import ProfileScreen from './src/screens/Profile/Profile';
import EditProfileScreen from './src/screens/Profile/EditProfile';
import SettingsScreen from './src/screens/Profile/Settings';
import LanguagesScreen from './src/screens/Profile/LanguagesScreen';
import HowToUseScreen from './src/screens/Profile/HowToUseScreen';
import HelpSupportScreen from './src/screens/Profile/HelpSupportScreen';
import PrivacyPolicyScreen from './src/screens/Profile/PrivacyPolicyScreen';

import NearbyScreen from './src/screens/nearby/NearbyScreen';
import PopularFoodsScreen from './src/screens/generalInformation/PopularFoodsScreen';
import PopularPlacesScreen from './src/screens/generalInformation/PopularPlacesScreen';
import ChatScreen from './src/screens/AiSupport/ChatScreen';
import PlaceDetailScreen from './src/screens/Places/PlaceDetailScreen';
import Favourites from './src/screens/Favorites/Favorites';
import Hotels from './src/screens/Places/Hotels';
import ActivityPlaces from './src/screens/Places/ActivityPlaces';
import MapScreen from './src/screens/Map/Map';
import ReportPlaceScreen from './src/screens/Report/ReportPlaceScreen';
import VerifyEmail from './src/screens/Signup/VerfiyEmail';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = React.useState(null);

  // useEffect(() => {
  //   const checkUserStatus = async () => {
  //     const token = await AsyncStorage.getItem('token');
  //     const guest = await AsyncStorage.getItem('guest');

  //     if (token) {
  //       setInitialRoute('Home');  // logged in
  //     } else if (guest) {
  //       setInitialRoute('Home');  // guest
  //     } else {
  //       setInitialRoute('Onboarding'); // not logged in
  //     }
  //   };

  //   checkUserStatus();
  // }, []);
useEffect(() => {
  const checkUserStatus = async () => {
    const token = await AsyncStorage.getItem('token');
    const guest = await AsyncStorage.getItem('guest');
    const savedUser = await AsyncStorage.getItem('user');

    if (token && savedUser) {
      // Set user in Redux or local state
      const userObject = JSON.parse(savedUser);
      store.dispatch({ type: 'SET_USER', payload: userObject });

      setInitialRoute('Home');  // logged in
    } else if (guest) {
      setInitialRoute('Home');  // guest
    } else {
      setInitialRoute('Launching'); // not logged in
    }
  };

  checkUserStatus();
}, []);

  if (!initialRoute) return null;
  return (
    <LanguageProvider>
      <Provider store={store}>
        <ThemeProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName ={initialRoute}
              screenOptions={{ headerShown: false }}
            >
              {/* Onboarding & Splash */}
              <Stack.Screen name="Onboarding" component={OnboardingScreen} />
              <Stack.Screen name="Launching" component={LaunchingScreen} />
              <Stack.Screen name="VerifyEmail" component={VerifyEmail} />

              {/* Auth flow */}
              <Stack.Screen name="Welcome" component={Welcome} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
               <Stack.Screen name="verify" component={VerifyEmail} />

              {/* Intro */}
              <Stack.Screen name="Intro" component={IntroPage} />
              <Stack.Screen
                name="ReportPlaceScreen"
                component={ReportPlaceScreen}
              />
              {/* Main tabs */}
              <Stack.Screen name="Home" component={MyTabs} />

              {/* Places & Profile */}
              <Stack.Screen
                name="TouristicPlaces"
                component={TouristicPlaces}
              />
              <Stack.Screen
                name="ReligiousPlaces"
                component={ReligiousPlaces}
              />
              <Stack.Screen name="Restaurants" component={Restaurants} />
              <Stack.Screen name="Visited" component={Visited} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="EditProfile" component={EditProfileScreen} />

              {/* Settings */}
              <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
              <Stack.Screen name="Languages" component={LanguagesScreen} />
              <Stack.Screen name="HowToUse" component={HowToUseScreen} />
              <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
              <Stack.Screen
                name="PrivacyPolicy"
                component={PrivacyPolicyScreen}
              />

              {/* Others */}
              <Stack.Screen name="Map" component={MapScreen} />
              <Stack.Screen name="NearBy" component={NearbyScreen} />
              <Stack.Screen
                name="PopularFoods"
                component={PopularFoodsScreen}
              />
              <Stack.Screen
                name="PopularPlaces"
                component={PopularPlacesScreen}
              />
              <Stack.Screen name="ChatScreen" component={ChatScreen} />
              <Stack.Screen name="PlaceDetails" component={PlaceDetailScreen} />
              <Stack.Screen name="Favorites" component={Favourites} />
              <Stack.Screen name="Hotels" component={Hotels} />
              <Stack.Screen name="Activity" component={ActivityPlaces} />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </Provider>
      <Toast />
    </LanguageProvider>
  );
}
