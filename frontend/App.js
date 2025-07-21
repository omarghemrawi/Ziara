import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LaunchingScreen from './src/screens/Launching';
import OnboardingScreen from './src/screens/Onboarding/OnboardingScreen';


import MyTabs from './src/screens/naviagtion/Tabs';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
{/* //         <Stack.Navigator
//     initialRouteName='Onboarding'
//         screenOptions={{
//           headerShown: false, 
//         }}
//       >
//          <Stack.Screen name="Onboarding" options={{headerShown: false}} component={OnboardingScreen} />
//  <Stack.Screen name="Home" component={MyTabs} options={{headerShown: false}} />
//         <Stack.Screen name="Launching" component={LaunchingScreen} />
//       </Stack.Navigator> */}
        <Stack.Navigator
    initialRouteName='Onboarding'
        screenOptions={{
          headerShown: false, 
        }}
      >
         <Stack.Screen name="Onboarding" options={{headerShown: false}} component={OnboardingScreen} />
 <Stack.Screen name="Home" component={MyTabs} options={{headerShown: false}} />
        <Stack.Screen name="Launching" component={LaunchingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}