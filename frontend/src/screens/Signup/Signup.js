import React, { useState } from 'react'; // <-- Add useState
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';
import * as yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';

export default function Signup({ navigation }) {
  const [passwordInput, setPasswordInput] = useState('');

  const userSchema = yup.object({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, '')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSignUp = async values => {
    try {
      const resp = await axios.post('http://10.0.2.2:3000/user/signup', {
        username: values.username,
        email: values.email,
        password: values.password,
      });
      if (resp.data.success) {
        alert(resp.data.message);
        navigation.navigate('Login');
      } else {
        alert(resp.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkPasswordRules = password => ({
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[^A-Za-z0-9]/.test(password),
    hasLength: password.length >= 8,
  });

  const RequirementText = ({ met, text }) => (
   <Text style={[styles.req, { color: met ? 'green' : 'red', fontSize: 12 }]}>
  • {text}
</Text>

  );

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
        onSubmit={handleSignUp}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => {
          const rules = checkPasswordRules(passwordInput);
          return (
            <>
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={values.username}
                onBlur={handleBlur('username')}
                onChangeText={handleChange('username')}
              />

              <TextInput
                style={styles.input}
                placeholder="Email"
                value={values.email}
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')}
                keyboardType="email-address"
                autoCapitalize="none"
              />
             
                          
{touched.email && errors.email && (
  <Text style={styles.errorText2}>*{errors.email}</Text>
)}

              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={values.password}
                onBlur={handleBlur('password')}
                onChangeText={(text) => {
                  handleChange('password')(text);
                  setPasswordInput(text);
                }}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText1}>*{errors.password}</Text>
              )}

              <View style={{ marginVertical: 5, marginLeft: 10 }}>
                <RequirementText met={rules.hasUpper} text="At least one uppercase letter" />
                <RequirementText met={rules.hasLower} text="At least one lowercase letter" />
                <RequirementText met={rules.hasNumber} text="At least one number" />
                <RequirementText met={rules.hasSpecial} text="At least one special character" />
                <RequirementText met={rules.hasLength} text="Minimum 8 characters" />
              </View>

              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                value={values.confirmPassword}
                onBlur={handleBlur('confirmPassword')}
                onChangeText={handleChange('confirmPassword')}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.errorText}>*{errors.confirmPassword}</Text>
              )}
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
