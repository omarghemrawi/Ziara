import React, { use, useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import Config from 'react-native-config';
const API_URL = Config.API_URL;

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  // Validation schema
  const loginSchema = Yup.object({
    email: Yup.string()
      .email('Please enter a valid email')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleLogin = async values => {
    try {
      const response = await axios.post(
        'http://192.168.0.101:5000/api/user/login',
        {
          email: values.email,
          password: values.password,
        },
      );

      if (response.data.success) {
        await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.removeItem('guest');
        dispatch({
          type: 'SET_USER',
          payload: response.data.user,
        });
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          }),
        ); // Navigate to Home after successful login
      } else {
        Toast.show({
          type: 'error',
          text1: 'error',
          text2: response.data.message,
          position: 'bottom',
          visibilityTime: 5000,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'error',
        text2: 'Login failed. Please check your credentials.',
        position: 'top',
        visibilityTime: 5000,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Enter Your account</Text>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText2}>*{errors.email}</Text>
            )}
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText2}>*{errors.password}</Text>
            )}

            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}
              >
                <Text style={styles.linkText}>forgot password?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
}
