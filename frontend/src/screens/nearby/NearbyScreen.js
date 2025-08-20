import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import styles from './NearbyScreenstyle';
import i18n from '../locales/i18n';
import { API_URL } from './env';
import Config from 'react-native-config';
import axios from 'axios';




export default function NearbyScreen() {
  const [location, setLocation] = useState(null);
  const [religious, setReligious] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [touristic, setTouristic] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(false);
  const API_KEY_GOOGLE_PLACES = Config.API_KEY_GOOGLE_PLACES;
  


  const fetchData = async () => {
  try {
    if (!location) return; 

    const [resRestaurants, resTouristic, resReligious] = await Promise.all([
      axios.get(`${API_URL}/api/nearby/restaurant`, {
        params: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
      }),
      axios.get(`${API_URL}/api/nearby/touristic`, {
        params: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
      }),
      axios.get(`${API_URL}/api/nearby/religious`, {
        params: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
      }),
    ]);

    setRestaurants(resRestaurants.data.restaurants || []);
    setTouristic(resTouristic.data.touristPlaces || []);
    setReligious(resReligious.data.religiousPlaces || []);
  } catch (error) {
    console.error('Failed to fetch nearby places:', error.message);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(loc => {
        setLocation(loc);
        Alert.alert(
          'Location Retrieved',
          `Latitude: ${loc.latitude}\nLongitude: ${loc.longitude}`
        );
      })
      .catch(error => {
        const { message } = error;
        console.warn(message);
        Alert.alert('Error', message);
      });
  }, []);
//   useEffect(() => {
//   const requestLocation = async () => {
//     try {
//       const loc = await GetLocation.getCurrentPosition({
//         enableHighAccuracy: true,
//         timeout: 60000,
//       });
//       setLocation(loc);
//       setLocationError(false);
//       Alert.alert(
//         'Location Retrieved',
//         `Latitude: ${loc.latitude}\nLongitude: ${loc.longitude}`
//       );
//     } catch (error) {
//       console.warn('Location error:', error.message);
//       setLocationError(true);
//       setLocation({
//         latitude: 33.8938,
//         longitude: 35.5018, // Beirut fallback
//       });
//       Alert.alert(
//         'Location Error',
//         'Using default location (Beirut)'
//       );
//     }
//   };

//   requestLocation();
// }, []);

useEffect(() => {
  if (location) {
    fetchData(); // now it will fetch only after location is available
  }
}, [location]);

  // Filter and validate places data
const getValidPlaces = places => {
  return places.filter(
    place =>
      place &&
      typeof place.lat === 'number' &&
      typeof place.lng === 'number' &&
      !isNaN(place.lat) &&
      !isNaN(place.lng) &&
      place.lat >= -90 &&
      place.lat <= 90 &&
      place.lng >= -180 &&
      place.lng <= 180,
  );
};

  // Combine all valid places for map markers
  const allValidPlaces = [
    ...getValidPlaces(touristic),
    ...getValidPlaces(restaurants),
    ...getValidPlaces(religious),
  ];

  const renderSection = (title, data) => {
    if (!data || data.length === 0) {
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <Text style={styles.emptyText}>
            No {title.toLowerCase()} found nearby
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {data.map(place => {
          // Build photo URL if photo_reference exists
          const photoUrl = place.photo_reference
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photo_reference}&key=${API_KEY_GOOGLE_PLACES}`
            : 'https://via.placeholder.com/400'; // fallback image

          return (
            <View
              key={place.id || place.place_id || Math.random()}
              style={styles.card}
            >
              <Image
                source={{ uri: photoUrl }}
                style={styles.image}
                onError={() =>
                  console.log('Image failed to load for:', place.name)
                }
              />
              <Text style={styles.cardTitle}>
                {place.name || place.title || 'Unknown Place'}
              </Text>
              {place.address && (
                <Text style={styles.cardAddress}>{place.address}</Text>
              )}
            </View>
          );
        })}
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading nearby places...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>{i18n.t('nearby')}</Text>
          {locationError && (
            <Text style={styles.locationError}>
              Using default location (location access failed)
            </Text>
          )}
        </View>

        {location && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
            showsUserLocation={!locationError}
          >
       {allValidPlaces.map((place, index) => {
  let pinColor = 'gray';
  if (restaurants.includes(place)) pinColor = 'red';
  else if (touristic.includes(place)) pinColor = 'blue';
  else if (religious.includes(place)) pinColor = 'green';

  return (
    <Marker
      key={place.id || place.place_id || `marker-${index}`}
      coordinate={{
        latitude: Number(place.lat),
    longitude: Number(place.lng),
      }}
      title={place.name || place.title || 'Unknown Place'}
      description={place.address || ''}
      pinColor={pinColor} // set pin color by type
    />
  );
})}

          </MapView>
        )}

        {renderSection('Touristic Places', touristic)}
        {renderSection('Restaurants', restaurants)}
        {renderSection('Religious Places', religious)}
      </ScrollView>
    </SafeAreaView>
  );
}

