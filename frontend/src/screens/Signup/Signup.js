import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';
import * as yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import Toast from 'react-native-toast-message';

export default function Signup({ navigation }) {
  const [passwordInput, setPasswordInput] = useState('');

  // Form validation schema
  const userSchema = yup.object({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  // Check password strength
  const checkPasswordIsStrong = password => {
    return (
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password) &&
      password.length >= 8
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>Create an account, it's free</Text>

      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={userSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            // Signup request
            const resp = await axios.post(
              'http://10.0.2.2:5000/api/user/signup',
              {
                username: values.username,
                email: values.email,
                password: values.password,
              },
            );

            if (resp.data.success) {
              await AsyncStorage.removeItem('guest');
              Toast.show({
                type: 'success',
                text1: resp.data.message,
                position: 'top',
                visibilityTime: 5000,
              });

              resetForm(); // clear form
              // Navigate to Verify Email page
              navigation.navigate('VerifyEmail', { email: values.email });
            } else {
              Toast.show({
                type: 'error',
                text1: resp.data.message,
                position: 'top',
                visibilityTime: 5000,
              });
            }
          } catch (error) {
            console.log(error.response?.data || error.message);
            alert(error.response?.data?.message || 'Signup failed');
          }
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => {
          const isStrongPassword = checkPasswordIsStrong(passwordInput);

          return (
            <>
              {/* Username */}
              <TextInput
                style={styles.input}
                placeholder="Enter your username"
                value={values.username}
                onBlur={handleBlur('username')}
                onChangeText={handleChange('username')}
              />
              {touched.username && errors.username && (
                <Text style={styles.errorText1}>*{errors.username}</Text>
              )}

              {/* Email */}
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={values.email}
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText2}>*{errors.email}</Text>
              )}

              {/* Password */}
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry
                value={values.password}
                onBlur={handleBlur('password')}
                onChangeText={text => {
                  handleChange('password')(text);
                  setPasswordInput(text);
                }}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText1}>*{errors.password}</Text>
              )}
              {passwordInput !== '' && (
                <Text
                  style={{
                    color: isStrongPassword ? 'green' : 'red',
                    fontSize: 12,
                    marginLeft: 10,
                    marginBottom: 5,
                  }}
                >
                  {isStrongPassword ? 'Strong password' : 'Weak password'}
                </Text>
              )}
              <Text style={[styles.req, { fontSize: 10, color: '#666' }]}>
                *Min 8 chars, uppercase, lowercase, number, special characters
              </Text>

              {/* Confirm Password */}
              <TextInput
                style={styles.input}
                placeholder="Confirm your password"
                secureTextEntry
                value={values.confirmPassword}
                onBlur={handleBlur('confirmPassword')}
                onChangeText={handleChange('confirmPassword')}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.errorText}>*{errors.confirmPassword}</Text>
              )}

              {/* Submit Button */}
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Signup</Text>
              </TouchableOpacity>
            </>
          );
        }}
      </Formik>
    </View>
  );
}
