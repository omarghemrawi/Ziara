import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

export default function VerifyEmail({ route, navigation }) {
  const { email } = route.params;
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputsRef = useRef([]);

  // Handle input change for each box
  const handleChange = (text, index) => {
    if (/^\d$/.test(text) || text === '') {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      // Move focus to next input
      if (text && index < 5) {
        inputsRef.current[index + 1].focus();
      }
      // Move focus to previous input on backspace
      if (!text && index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const handleVerify = async () => {
    const verificationCode = code.join('');
    if (verificationCode.length < 6) {
      alert('Please enter the 6-digit code.');
      return;
    }

    try {
      const resp = await axios.post(
        'http://10.0.2.2:5000/api/user/verify-email',
        {
          email,
          code: verificationCode,
        },
      );

      if (resp.data.success) {
        alert('Email verified! You can now login.');
        navigation.replace('Login');
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
      const resp = await axios.post(
        'http://10.0.2.2:5000/api/user/resend-code',
        { email },
      );
      alert(resp.data.message);
    } catch (err) {
      console.log(err);
      alert('Could not resend code.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Email</Text>
      <Text style={styles.subtitle}>
        Enter the 6-digit code sent to {email}
      </Text>

      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={el => (inputsRef.current[index] = el)}
            style={styles.codeInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={text => handleChange(text, index)}
            textAlign="center"
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleResend} style={{ marginTop: 15 }}>
        <Text style={styles.resendText}>Resend code</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: '#666',
    textAlign: 'center',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  codeInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: 45,
    height: 55,
    fontSize: 24,
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: '#FAC75C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendText: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
