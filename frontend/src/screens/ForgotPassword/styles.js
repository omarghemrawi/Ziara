// src/screens/ForgotPassword/styles.js
import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
   label: {
  fontSize: 10,
  fontWeight: '500',
  color: '#333',
  marginBottom: 5,
  marginTop: 15,
  marginRight:250,
},
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 30,
  },
  input: {
    width: width * 0.9,
    height: 50,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  button: {
    width: width * 0.9,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F1C40F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
