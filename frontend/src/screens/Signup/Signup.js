import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';
import * as yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';

export default function Signup({ navigation }) {
  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirm, setConfirm] = useState('');

  let userSchema = yup.object({
    username: yup.string().required('Username is required'),
    email: yup.string().email().required(),
    password: yup.string().min(4, 'Less Than 4').required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSignUp = async values => {
    try {
      console.log(values);
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
        }) => (
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
            {touched.email && errors.email && <Text>{errors.email}</Text>}
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={values.password}
              onBlur={handleBlur('password')}
              onChangeText={handleChange('password')}
            />
            {touched.password && errors.password && (
              <Text>{errors.password}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              value={values.confirmPassword}
              onBlur={handleBlur('confirmPassword')}
              onChangeText={handleChange('confirmPassword')}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text>{errors.confirmPassword}</Text>
            )}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>

    </View>
  );
}
