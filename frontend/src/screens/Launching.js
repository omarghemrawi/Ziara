import React from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';

export default function LaunchingScreen() {
  return (

    <View style={styles.container}>
      
     
      <Image source={require('../assets/images/launching.png')} style={styles.image}/>
    <Text style={styles.text}>Ziara</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  image: {
width:230,
marginLeft:30,
marginBottom:40,
  },
  text: {
    fontSize: 96,
    color: '#333',
    fontFamily:"RampartOne-Regular",
  }
});
