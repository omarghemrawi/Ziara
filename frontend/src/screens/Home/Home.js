import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons'; 

export default function Home() {
  const handleProfilePress = () => {
    console.log('Profile pressed');
    // You can navigate to the Profile screen here
  };

  return (
    <View style={styles.container}>
      {/* Profile Icon Button */}
     
      <TouchableOpacity style={styles.profileIcon} onPress={handleProfilePress}>
        <EvilIcons name="user" size={80} color="#000" />
        <Image style={styles.tarbush} source={require('../../assets/images/miniTarbush.png')}/>
      
      </TouchableOpacity>

    
      <Text style={styles.text}>Find Your Destination</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  profileIcon: {
    position: 'absolute',
    top: 100,
    right: 20,
    zIndex: 10,
  },
  tarbush:{
      position: 'absolute',
    bottom: 35,
    right: 5,
    zIndex: 10,
  },
  text: {
    fontFamily: 'RobotoBold',
    fontSize: 50,
    margin: 30,
  },
});
