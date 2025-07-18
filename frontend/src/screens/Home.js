import React from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';

export default function HomeScreen() {
  return (

    <View style={styles.container}>
      
     
      <Image source={require('../assets/images/launching.png')}/>
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

  },
  text: {
    fontSize: 24,
    color: '#333'
  }
});
