import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Favourites() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Favourites</Text>
        <Image
          source={require('../../assets/images/Favourites.png')}
          style={[
            styles.headerImage,
         
          ]}
        />
      </View>

      {/* Grid Section */}
      <View style={styles.grid}>
        <Image
          style={styles.imageItem}
          source={require('../../assets/images/jbeil.jpeg')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    height: 180,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    padding: 20,
    backgroundColor:'#9a370e',
   
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
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: 10,
  },
    imageItem: {
    width: '27%',
    height: 90,
    borderRadius: 15,
    marginBottom: 10,
    marginTop:70,
  },
});