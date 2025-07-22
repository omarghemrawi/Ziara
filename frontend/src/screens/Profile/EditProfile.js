import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

export default function EditProfile({ navigation }) {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [about, setAbout] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Entypo name="chevron-left" size={28} color="#000" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Edit profile</Text>

      {/* Profile Image */}
      <View style={styles.profileContainer}>
        <Image
          source={require('../../assets/images/pizza.png')} // Replace with your own image or URI
          style={styles.profileImage}
        />
      </View>

      {/* Name Field */}
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Rama T"
        placeholderTextColor="#777"
        value={name}
        onChangeText={setName}
      />



      {/* About You Field */}
      <Text style={styles.label}>About you</Text>
      <TextInput
        style={styles.textarea}
        placeholder="Write some details about yourself"
        placeholderTextColor="#777"
        value={about}
        onChangeText={setAbout}
        multiline
        numberOfLines={4}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ddd',
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#FAFAF0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 14,
  },
  textarea: {
    backgroundColor: '#FAFAF0',
    padding: 10,
    borderRadius: 8,
    height: 100,
    textAlignVertical: 'top',
    fontSize: 14,
  },
});
