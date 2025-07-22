// src/screens/Signup/Signup.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import styles from './styles';

export default function Signup({ navigation }) {
  const [username, setUsername] = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [confirm,  setConfirm]  = useState('');

  // دالة وهمية تحاكي طلب الـ API للتسجيل
  async function handleSignup() {
    // تأكد أن كلمة المرور وتأكيدها متطابقان
    if (password !== confirm) {
      alert('كلمة المرور وتأكيدها غير متطابقين');
      return false;
    }
    // هنا تضع منطق التسجيل الحقيقي (API call)
    // لنفترض أنه يرجع true للنجاح
    return true;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>إنشاء حساب</Text>
      <Text style={styles.subtitle}>أنشئ حساباً مجانياً</Text>

      <TextInput
        style={styles.input}
        placeholder="اسم المستخدم"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="البريد الإلكتروني"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="كلمة المرور"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="تأكيد كلمة المرور"
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          const success = await handleSignup();
          if (success) {
            // إذا نجح التسجيل، نستبدل الشاشة الحالية بشاشة Intro
            navigation.replace('Intro');
          }
        }}
      >
        <Text style={styles.buttonText}>تسجيل</Text>
      </TouchableOpacity>
    </View>
  );
}
