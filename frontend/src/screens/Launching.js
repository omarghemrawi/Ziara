import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LaunchingScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding'); 
    }, 3000);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/launching.png')} style={styles.image} />
      <Text style={styles.text}>Ziara</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 230,
    marginLeft: 30,
    marginBottom: 40,
  },
  text: {
    fontSize: 96,
    color: '#333',
    fontFamily: 'RampartOne-Regular',
  },
});
