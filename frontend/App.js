// Ziara/frontend/App.js
import 'react-native-gesture-handler'; // ← يجب أن يكون الاستيراد الأول
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

// شاشات الانطلاق والتعريف
import OnboardingScreen from './src/screens/Onboarding/OnboardingScreen';
import LaunchingScreen  from './src/screens/Launching';


// شاشات تسجيل الدخول والتسجيل
import Welcome        from './src/screens/Welcome/Welcome';
import Login          from './src/screens/Login/Login';
import Signup         from './src/screens/Signup/Signup';
import ForgotPassword from './src/screens/ForgotPassword/ForgotPassword';

// تبويبات الصفحة الرئيسية
import MyTabs from './src/screens/navigation/Tabs';

// شاشات الأماكن
import TouristicPlaces  from './src/screens/Places/TouristicPlaces';
import ReligiousPlaces  from './src/screens/Places/ReligiousPlaces';
import Restaurants      from './src/screens/Places/Restaurants';


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>



      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{ headerShown: false }}
      >
        {/* أول شاشة تظهر للمستخدم */}
        <Stack.Screen name="Onboarding"     component={OnboardingScreen} />

        {/* شاشات التسجيل */}
        <Stack.Screen name="Welcome"        component={Welcome} />
        <Stack.Screen name="Login"          component={Login} />
        <Stack.Screen name="Signup"         component={Signup} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

        {/* بعد التسجيل تنتقل للتبويبات الرئيسية */}
        <Stack.Screen name="Home"           component={MyTabs} />

        {/* شاشة الانطلاق (يمكن استخدامها لعمل Splash أو تحميل أولي) */}
        <Stack.Screen name="Launching"      component={LaunchingScreen} />

        {/* باقي شاشات الأماكن */}
        <Stack.Screen name="TouristicPlaces"  component={TouristicPlaces} />
        <Stack.Screen name="ReligiousPlaces"  component={ReligiousPlaces} />
        <Stack.Screen name="Restaurants"      component={Restaurants} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}
