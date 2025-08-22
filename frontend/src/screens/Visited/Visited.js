import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Entypo from 'react-native-vector-icons/Entypo';
import { useTheme } from '../Theme/Theme';
import { useSelector, useDispatch } from 'react-redux';
import i18n from '../locales/i18n';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { refreshUser } from '../../redux/actions/user.action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Config from 'react-native-config';
const API_URL = Config.API_URL;

export default function Visited() {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [visitedPlaces, setVisitedPLaces] = useState([]);
  const { theme } = useTheme();

  const user = useSelector(state => state.user.user);
  const places = useSelector(state => state.places.all);
  const dispatch = useDispatch();

  const handleDeleteVisited = async placeId => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token);

      const { data } = await axios.delete(
        `http://192.168.0.101:5000/api/visited/${placeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        Toast.show({
          type: 'success',
          text1: '✅ Place removed from visited',
        });
        dispatch(refreshUser(user._id));
        getVisitedPlaces();
      }
    } catch (error) {
      console.error('Failed to delete visited place:', error);
    }
  };

  const getVisitedPlaces = () => {
    setVisitedPLaces(
      places.filter(place => user?.visitedPlaces?.includes(place._id)),
    );
  };

  useEffect(() => {
    if (user && user?.visitedPlaces) {
      getVisitedPlaces();
      AsyncStorage.setItem('visited', JSON.stringify(user.visitedPlaces));
    } else {
      setVisitedPLaces([]);
      AsyncStorage.removeItem('visited');
    }
  }, [user?.visitedPlaces]);

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="chevron-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>{i18n.t('visited')}</Text>
        </View>

        <Image
          source={require('../../assets/images/Favourites.png')}
          style={styles.headerImage}
        />
      </View>

      {/* Place Item */}
      {visitedPlaces.length === 0 ? (
        <Text
          style={{
            padding: 20,
            fontSize: 16,
            color: theme.text,
            textAlign: 'center',
            marginTop: 20,
          }}
        >
          No visited added yet.
        </Text>
      ) : (
        visitedPlaces.map((place, index) => (
          <View key={index} style={[styles.grid, {}]}>
            <Image style={styles.imageItem} source={{ uri: place.profile }} />

            <View style={styles.textContainer}>
              <Text style={[styles.placeName, { color: theme.text }]}>
                {place.name}
              </Text>
              <Text style={[styles.placeLocation, { color: theme.text }]}>
                {place.city || 'Not Found'}
              </Text>
              <TouchableOpacity
                onPress={() => handleDeleteVisited(place._id)}
                style={styles.deleteButton}
              >
                <MaterialIcons name="delete" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  header: {
    height: 180,
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    padding: 20,
    backgroundColor: '#9a370e',
    justifyContent: 'flex-start',
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'RobotoSlabBold',
    marginRight: 240,
  },
  headerImage: {
    width: 90,
    height: 90,
    position: 'absolute',
    bottom: -20,
    left: 20,
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
  },
  placeLocation: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
});
