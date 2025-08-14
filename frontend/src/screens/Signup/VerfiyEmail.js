import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';


export default function VerifyEmail({ route, navigation }) {
  const { email } = route.params; // email passed from Signup
  const [code, setCode] = useState('');

  const handleVerify = async () => {
    try {
      const resp = await axios.post('http://192.168.0.103:5000/api/user/verify-email', {
        email,
        code
      });
      if (resp.data.success) {
        alert('Email verified! You can now login.');
        navigation.replace('Login'); // go to login after verification
      } else {
        alert(resp.data.message);
      }
    } catch (err) {
      console.log(err);
      alert('Verification failed. Please try again.');
    }
  };

  const handleResend = async () => {
    try {
      const resp = await axios.post('http://192.168.0.103:3000/api/user/resend-code', { email });
      alert(resp.data.message);
    } catch (err) {
      alert('Could not resend code.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Email</Text>
      <Text style={styles.subtitle}>Enter the 6-digit code sent to {email}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter verification code"
        keyboardType="number-pad"
        maxLength={6}
        value={code}
        onChangeText={setCode}
      />

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleResend} style={{ marginTop: 12 }}>
        <Text style={{ textAlign: 'center' }}>Resend code</Text>
      </TouchableOpacity>
    </View>
  );
}
