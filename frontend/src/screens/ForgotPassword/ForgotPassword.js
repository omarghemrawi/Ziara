import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import styles from './styles';

export default function ForgotPassword({ navigation }) {
  const [step, setStep] = useState(1); // 1 = request code, 2 = reset password
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const requestResetCode = async () => {
    try {
      const res = await axios.post(
        'http://10.0.2.2:5000/api/user/forgot-password',
        { email: email.toLowerCase() },
      );
      Alert.alert('Success', res.data.message);
      setStep(2);
    } catch (error) {
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Something went wrong',
      );
    }
  };

  const resetPassword = async () => {
    if (newPassword !== confirmPass) {
      return Alert.alert('Error', 'Passwords do not match');
    }
    try {
      const res = await axios.post(
        'http://10.0.2.2:5000/api/user/reset-password',
        {
          email: email.toLowerCase(),
          code,
          newPassword,
        },
      );
      Alert.alert('Success', res.data.message);
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Something went wrong',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>

      {step === 1 ? (
        <>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TouchableOpacity style={styles.button} onPress={requestResetCode}>
            <Text style={styles.buttonText}>Send Reset Code</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.label}>Enter reset code</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter reset code"
            value={code}
            onChangeText={setCode}
          />
          <Text style={styles.label}>New Password</Text>
          <TextInput
            style={styles.input}
            placeholder="New password"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            secureTextEntry
            value={confirmPass}
            onChangeText={setConfirmPass}
          />
          <TouchableOpacity style={styles.button} onPress={resetPassword}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
