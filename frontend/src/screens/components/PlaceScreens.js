
import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const PlacesSection = ({ 
  title, 
  headerColor, 
  headerImage, 
  data, 
  onDiscover, 
  onSave, 
  onSearchChange, 
  searchValue 
}) => {
  return (
    <ScrollView style={styles.container}>
      <View style={[styles.header, { backgroundColor: headerColor }]}>
        <Image source={headerImage} style={styles.headerImage} />
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.searchSection}>
        <TextInput 
          style={styles.input} 
          placeholder="Search..." 
          value={searchValue}
          onChangeText={onSearchChange}
        />
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.discoverButton} onPress={onDiscover}>
            <Text style={styles.buttonText}>Discover</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={onSave}>
            <Text style={styles.buttonTextBlack}>Saves</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.grid}>
        {data.map((item, index) => (
          <Image key={index} source={item.image} style={styles.imageItem} />
        ))}
      </View>
    </ScrollView>
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
    width: 80,
    height: 80,
    position: 'absolute',
    top: 20,
    right: 20,
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
    marginTop: 30,
    borderColor: '#000',
    borderWidth: 1,
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: 30,
    marginLeft: 10,
  },
  discoverButton: {
    backgroundColor: '#FAC96D',
    padding: 10,
    borderRadius: 15,
    width: 100,
    borderColor: '#000',
    borderWidth: 1,
  },
  saveButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 15,
    width: 100,
    marginLeft: 10,
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
});

export default PlacesSection;
