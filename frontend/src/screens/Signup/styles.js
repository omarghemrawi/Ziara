// src/screens/Signup/styles.js
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
  },
  errorText:{
fontSize:10,
color:'red',
position:'relative',
right:80,
bottom:10,
  },
    errorText1:{
fontSize:10,
color:'red',
position:'relative',
right:100,
bottom:10,
  },
      errorText2:{
fontSize:10,
color:'red',
position:'relative',
right:110,
bottom:10,
  },
  req:{
position:'relative',
right:10,
bottom:10,

  },
  subtitle: {
    marginTop: 8,
    marginBottom: 30,
    color: '#888',
    textAlign: 'center',
  },
  input: {
    width: width * 0.9,
    height: 50,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  button: {
    marginTop: 20,
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
