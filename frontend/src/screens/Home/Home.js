import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'; 

export default function Home() {
  const handleProfilePress = () => {
    console.log('Profile pressed');
    // You can navigate to the Profile screen here
  };

  return (
    <View style={styles.container}>
      {/* Profile Icon Button */}
      <TouchableOpacity style={styles.profileIcon} onPress={handleProfilePress}>
        <AntDesign name="user" size={30} color="#000" />
      
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
    right: 40,
    zIndex: 10,
  },
  text: {
    fontFamily: 'RobotoBold',
    fontSize: 50,
    margin: 30,
  },
});
