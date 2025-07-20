import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons'; 


export default function Home() {
  const handleProfilePress = () => {
    console.log('Profile pressed');
  };

  return (
    <View style={styles.container}>
      {/* Profile Icon Button */}
      <TouchableOpacity style={styles.profileIcon} onPress={handleProfilePress}>
        <EvilIcons name="user" size={80} color="#000" />
        <Image style={styles.tarbush} source={require('../../assets/images/miniTarbush.png')} />
      </TouchableOpacity>

      <Text style={styles.text}>Find Your Destination</Text>

      {/* Scrollable Row of Boxes */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollRow}>
        <View style={styles.box}>
          <Image style={styles.boxImage} source={require('../../assets/images/map.png')} />
          <Text style={styles.boxText}>Nearby</Text>
        </View>

        <View style={[styles.box, styles.brownBox]}>
          <Image style={styles.boxImage} source={require('../../assets/images/Hummus.png')} />
          <Text style={styles.boxText}>Popular Foods</Text>
        </View>

        <View style={styles.box}>
          <Image style={styles.boxImage} source={require('../../assets/images/map.png')} />
          <Text style={styles.boxText}>Popular Places</Text>
        </View>
      </ScrollView>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    width: 140,
    height: 140,
    backgroundColor: '#fac75c',
    borderRadius: 40,
    alignItems: 'center',
    padding: 20,
     margin:10,
  },
  brownBox:{
    backgroundColor:'#9a370e',
  },
  boxImage: {
    width: 80,
    height: 60,
    borderRadius: 60,
    marginBottom: 10,
   
  },
  boxText: {
    textAlign: 'center',
    fontSize: 14,
    color:'#ffffff'
  },
});
