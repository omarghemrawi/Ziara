import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';

export default function Favourites() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Favourites</Text>
        <Image
          source={require('../../assets/images/Favourites.png')}
          style={styles.headerImage}
        />
      </View>

      {/* Grid Section */}
      <View style={styles.grid}>
        <Image
          style={styles.imageItem}
          source={require('../../assets/images/jbeil.jpeg')}
        />

        <View style={styles.textContainer}>
          <Text style={styles.placeName}>Place name</Text>
          <Text style={styles.placeLocation}>Place location</Text>
        </View>

        <TouchableOpacity style={styles.iconContainer}>
          <Entypo name="dots-three-vertical" size={18} color="#000" />
        </TouchableOpacity>
        
      </View>
       <View style={styles.grid}>
        <Image
          style={styles.imageItem}
          source={require('../../assets/images/jbeil.jpeg')}
        />

        <View style={styles.textContainer}>
          <Text style={styles.placeName}>Place name</Text>
          <Text style={styles.placeLocation}>Place location</Text>
        </View>

        <TouchableOpacity style={styles.iconContainer}>
          <Entypo name="dots-three-vertical" size={18} color="#000" />
        </TouchableOpacity>
        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 180,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    padding: 20,
    backgroundColor: '#9a370e',
  },
  headerImage: {
    width: 110,
    height: 110,
    position: 'absolute',
    top: 120,
    left: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'RobotoSlabBold',
    marginTop: 20,
    marginLeft: 10,
  },
  grid: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 70,
  },
  imageItem: {
    width: 90,
    height: 90,
    borderRadius: 15,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  placeName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom:10,
  },
  placeLocation: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  iconContainer: {
    paddingLeft: 10,
  },
});
