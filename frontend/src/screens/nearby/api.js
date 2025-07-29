import axios from 'axios';
import { Alert } from 'react-native';

const BASE_URL = 'http://192.168.1.103:3000';

export const fetchTouristicPlaces = async (latitude, longitude) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/places/touristic`, {
      latitude,
      longitude,
    });
    const places = res.data.touristPlaces;
    if (!places || places.length === 0) {
      Alert.alert('Info', 'No touristic places found nearby.');
    }
    return places;
  } catch (error) {
    Alert.alert('Error', 'Failed to fetch touristic places.');
    console.error('fetchTouristicPlaces error:', error);
    return [];
  }
};

export const fetchRestaurants = async (latitude, longitude) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/places/restaurants`, {
      latitude,
      longitude,
    });
    const places = res.data.restaurants;
    if (!places || places.length === 0) {
      Alert.alert('Info', 'No restaurants found nearby.');
    }
    return places;
  } catch (error) {
    Alert.alert('Error', 'Failed to fetch restaurants.');
    console.error('fetchRestaurants error:', error);
    return [];
  }
};

export const fetchReligiousPlaces = async (latitude, longitude) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/places/religious`, {
      latitude,
      longitude,
    });
    const places = res.data.religiousPlaces;
    if (!places || places.length === 0) {
      Alert.alert('Info', 'No religious places found nearby.');
    }
    return places;
  } catch (error) {
    Alert.alert('Error', 'Failed to fetch religious places.');
    console.error('fetchReligiousPlaces error:', error);
    return [];
  }
};
