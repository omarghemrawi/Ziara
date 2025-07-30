// src/screens/welcome/Home.js
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
    

      <Text style={styles.title}>Welcome</Text>

      <Image
        source={require('../../assets/images/Welcome.jpeg')}
        style={styles.image}
      />

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
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.skipText}>Join as guest</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}
