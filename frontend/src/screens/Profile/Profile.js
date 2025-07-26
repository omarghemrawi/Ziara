import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../Theme/Theme';

export default function ProfileScreen() {
     const navigation = useNavigation();
      const { theme } = useTheme();
  return (
    <ScrollView contentContainerStyle={[styles.container,{backgroundColor:theme.background}]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity  onPress={() => navigation.navigate('Home')}>
          <Entypo name="chevron-left" size={24} color={theme.text} />
        </TouchableOpacity>
      <Text style={[styles.headerTitle,{color:theme.text}]}>Profile</Text>
        <View style={[styles.headerIcons,{color:theme.text}]}>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <MaterialIcons name="edit" size={30} color="#000" style={[styles.icon,,{color:theme.text}]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
            <FontAwesome name="cog" size={30} color="#000" style={[styles.icon,,{color:theme.text}]} />
          </TouchableOpacity>
        </View>
      </View>

      {/* User Info */}
      <View style={styles.profileSection}>
        <Image
          source={require('../../assets/images/pizza.png')} // User profile picture
          style={styles.avatar}
        />
        <View style={styles.user}>
        <Text style={[styles.userName,{color:theme.text}]}>Rama T</Text>
        <Text style={[styles.joinedText,,{color:theme.text}]}>Joined in 2025</Text>
      </View>
      </View>

      {/* Photos Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle,{color:theme.text}]}>0 photos</Text>
        <Text style={[styles.sectionSubtitle,{color:theme.text}]}>You have no photos yet</Text>
        <TouchableOpacity style={[styles.button,{borderColor:theme.text}]}>
          <Text style={[styles.buttonText,{color:theme.text}]}>Upload a Photo</Text>
        </TouchableOpacity>
      </View>

      {/* Reviews Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle,{color:theme.text}]}>0 reviews</Text>
        <Text style={[styles.sectionSubtitle,{color:theme.text}]}>You have no reviews yet</Text>
        <TouchableOpacity style={[styles.button,{borderColor:theme.text}]}>
          <Text style={[styles.buttonText,{color:theme.text}]}>Write a review</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  icon: {
    marginLeft: 10,
  },
  profileSection: {
     flexDirection: 'row',
    marginVertical: 60,
  },
  avatar: {
  
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ddd',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  joinedText: {
    color: '#777',
    fontSize: 14,
    marginTop: 4,
  },
  section: {
    marginBottom: 30,
     alignItems: 'flex-start',
   
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  
  },
  sectionSubtitle: {
    color: '#666',
    fontSize: 14,
    marginVertical: 10,
 textAlign: 'center', 
  width: '100%',
  },
  button: {
    borderWidth: 1,
 
    borderRadius: 30,
    paddingHorizontal: 105,
    paddingVertical: 15,
    alignItems:'center',
      width: '100%',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  user :{
    
    marginLeft: 15,
 
    
  },
});
