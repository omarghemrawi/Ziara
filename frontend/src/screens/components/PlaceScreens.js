
import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


const PlacesSection = ({ 
  title, 
  headerColor, 
  headerImage, 
  data, 
  onSearch, 
  onSearchChange, 
  searchValue 
}) => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: headerColor }]}>
        <Image source={headerImage} style={[
  styles.headerImage,
  title === 'Search'  && { width: 110}
]} />
        <Text style={styles.title}>{title}</Text>
      </View>

     <View style={styles.searchSection}>
  <View style={styles.searchInputContainer}>
    <TextInput 
      style={styles.searchInput} 
      placeholder="Search..." 
      value={searchValue}
      onChangeText={onSearchChange}
    />
    <TouchableOpacity onPress={onSearch} style={styles.sendIcon}>
      <MaterialIcons name="send" size={22} color="#FAC75C" />
    </TouchableOpacity>
  </View>
</View>

<ScrollView>
      <View style={styles.grid}>
        {data.map((item, index) => (
          <Image key={index} source={item.image} style={styles.imageItem} />
        ))}
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    height: 180,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    padding: 20,
   
  },
  headerImage: {
   
    width: 160,//110
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
  searchSection: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#F1F1F1',
    borderRadius: 30,
    paddingHorizontal: 20,
    height: 60,
    marginBottom: 30,
    marginTop: 80,
    borderColor: '#000',
    borderWidth: 1,
  },



  buttonText: {
    color: '#fff',
    paddingLeft: 12,
  },
  buttonTextBlack: {
    color: '#000',
    paddingLeft: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  imageItem: {
    width: '47%',
    height: 150,
    borderRadius: 15,
    marginBottom: 10,
  },
  searchInputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#F1F1F1',
  borderRadius: 30,
  borderColor: '#000',
  borderWidth: 1,
  height: 60,
  paddingHorizontal: 20,
  marginTop: 80,
  marginBottom: 30,
},
searchInput: {
  flex: 1,
  fontSize: 16,
},
sendIcon: {
  marginLeft: 10,

  padding: 8,
  borderRadius: 10,

},

});

export default PlacesSection;