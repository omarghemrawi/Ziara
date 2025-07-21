import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function OnboardingItem({ item , index}) {
    const isEven = index % 2 === 0;
  const backgroundColor = isEven ? '#fac75c' : '#ffffff';
  const titleColor=isEven ? '#ffffff':'#A75D3E';
  const imageWidth=index===4? 250:300;
  const imageMarginLeft=index===4? 40:0;
  return (
    
       <View style={[styles.fullScreen, { width, backgroundColor }]}>
    <View style={[styles.container, { width }]}>
      <Image source={item.image} style={[styles.image,{width:imageWidth,marginLeft:imageMarginLeft}]} resizeMode="contain" />
      <Text style={[styles.title, { color: titleColor }]}>{item.title}</Text>
      <Text style={[styles.description, {color: titleColor}]}>{item.description}</Text>
    </View>
        </View>
  );
}

const styles = StyleSheet.create({
    fullScreen: {
   

  },
  container: {
    alignItems: 'center',
    padding: 20,
    marginTop: 70,

  },
  image: {
 
    height: 300,
    marginBottom: 30,
    marginTop:20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'RobotoSlabBolad',
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop:10,
  },
});