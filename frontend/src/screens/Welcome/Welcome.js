// src/screens/welcome/Home.js
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }) {
  
  const joinAsGuest = async () => {
    try {
      await AsyncStorage.setItem('guest', 'true'); 
      navigation.replace('Home'); 
    } catch (error) {
      console.error('Error setting guest mode:', error);
    }
  };
  return (
    <View style={styles.container}>
    


     <Text style={styles.text}>
  <Text style={{ color: '#FAC75C' }}>Z</Text>
  <Text style={{ color: '#FAC75C' }}>i</Text>
  <Text style={{ color: '#FAC75C' }}>a</Text>
  <Text style={{ color: '#FAC75C' }}>r</Text>
  <Text style={{ color: '#FAC75C' }}>a</Text>
</Text>
<Image source={require("../../assets/images/launching.png")}></Image>


      {/* Buttons container */}
      <View style={styles.LoginSignupConatiner}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.signupText}>Signup</Text>
        </TouchableOpacity>
          {/* Skip button */}
      <TouchableOpacity
        style={styles.skipButton}
        onPress={joinAsGuest}
      >
        <Text style={styles.skipText}>Join as guest</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}
