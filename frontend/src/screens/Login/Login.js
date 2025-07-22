// src/screens/Login/Login.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import styles from './styles';

export default function Login({ navigation }) {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');

  // دالة وهمية تحاكي طلب الـ API
  async function handleLogin() {
    // هنا تضع منطق التحقق الحقيقي (API call)
    // لنفترض أنه يرجع true للنجاح و false للفشل
    return email === 'test@example.com' && password === '1234';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>تسجيل الدخول</Text>
      <Text style={styles.subtitle}>أدخل بيانات حسابك</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          const success = await handleLogin();
          if (success) {
            // إذا نجح، نستبدل الشاشة الحالية بشاشة Intro
            navigation.replace('Intro');
          } else {
            alert('فشل تسجيل الدخول، تحقق من البيانات');
          }
        }}
      >
        <Text style={styles.buttonText}>دخول</Text>
      </TouchableOpacity>
    </View>
  );
}
