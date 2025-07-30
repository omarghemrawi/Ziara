// src/screens/welcome/styles.js
import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  LoginSignupConatiner:{
   width: '110%',
  alignItems: 'center',

  gap: 5,

  },
  skipButton:{
 marginTop:20,
  
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginTop: 10,
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
    resizeMode: 'contain',
  },
  loginButton: {
       width: '80%',
 
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  signupButton: {
    width: '80%',
    paddingVertical: 14,
    borderRadius: 25,
    backgroundColor: '#F1C40F',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
});
