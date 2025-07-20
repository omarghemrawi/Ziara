import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons'; 


export default function Home() {
  const handleProfilePress = () => {
    console.log('Profile pressed');
  };
  const handleArrowPress=()=>{

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
        <TouchableOpacity  onPress={() => console.log('Religious Places pressed')} style={styles.box}>
          <Image style={styles.boxImage} source={require('../../assets/images/map.png')} />
          <Text style={styles.boxText}>Nearby</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log('Religious Places pressed')} style={[styles.box, styles.brownBox]}>
          <Image style={styles.boxImage} source={require('../../assets/images/Hummus.png')} />
          <Text style={styles.boxText}>Popular Foods</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log('Religious Places pressed')} style={styles.box}>
          <Image style={styles.boxImage} source={require('../../assets/images/map.png')} />
          <Text style={styles.boxText}>Popular Places</Text>
        </TouchableOpacity>
      </ScrollView>





        {/* Scrollable Column of Boxes */}
      <ScrollView vertical showsVerticalScrollIndicator={false} style={styles.scrollRow}>
        <TouchableOpacity  onPress={() => console.log('Religious Places pressed')}style={styles.box1}>
          <Image style={styles.boxImage1} source={require('../../assets/images/touristicPlaces.png')} />
          <Text style={styles.boxText1Margin}>Touristic Places</Text>
             <TouchableOpacity style={styles.profileIcon} onPress={handleArrowPress}>
        <EvilIcons name="chevron-right" style={styles.arrow} size={50} color="#ffffff" />
       
      </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log('Religious Places pressed')}style={[styles.box1,styles.brownBox,styles.box1Margin]}>
          <Image style={styles.boxImage1} source={require('../../assets/images/religious.png')} />
          <Text style={styles.boxText1Margin}>Religious Places</Text>
           <TouchableOpacity style={styles.profileIcon} onPress={handleArrowPress}>
        <EvilIcons style={styles.arrow} name="chevron-right" size={50} color="#ffffff" />
       
      </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity  onPress={() => console.log('Religious Places pressed')} style={styles.box1}>
          <Image style={styles.boxImage1} source={require('../../assets/images/pizza.png')} />
          <Text style={styles.boxText1}>Restaurants</Text>
             <TouchableOpacity style={styles.profileIcon} onPress={handleArrowPress}>
        <EvilIcons name="chevron-right" style={styles.arrow} size={50} color="#ffffff" />
       
      </TouchableOpacity>
        </TouchableOpacity>
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
    box1: {
  flexDirection: 'row',       
  alignItems: 'center',       
  width: 360,
  height: 160,
  backgroundColor: '#fac75c',
  borderRadius: 40,
  padding: 20,
  margin: 10,
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
    boxImage1: {
      position:'absolute',
    width: 240,
    height: 160,
    top:20,
    left:-10,
    borderRadius: 60,
    marginBottom: 10,
   
  },
  boxText1: {
    position:'absolute',
    textAlign: 'center',
    fontSize: 17,
    left:200,
    marginLeft:30,
    color:'#ffffff'
  },
  boxText1Margin:{
  marginRight:20,
    position:'absolute',
    textAlign: 'center',
    fontSize: 17,
    left:200,
  
    color:'#ffffff'
  },
  arrow:{
      position:'absolute',

  right:-25,
  bottom:5,
  
   
  }
});
