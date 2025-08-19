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
import i18n from '../locales/i18n';
import Config from 'react-native-config';
import axios from 'axios';

export default function NearbyScreen() {
  const [location, setLocation] = useState(null);
  const [religious, setReligious] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [touristic, setTouristic] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(false);

  const fetchData = async () => {
    try {
      const [resRestaurants, resTouristic, resReligious] = await Promise.all([
        axios.get('http://10.0.2.2:5000/api/nearby/restaurant', {
          params: {
            latitude: 34.424569,
            longitude: 35.8304939,
          },
        }),
        axios.get('http://10.0.2.2:5000/api/nearby/touristic', {
          params: {
            latitude: 34.424569,
            longitude: 35.8304939,
          },
        }),
        axios.get('http://10.0.2.2:5000/api/nearby/religious', {
          params: {
            latitude: 34.424569,
            longitude: 35.8304939,
          },
        }),
      ]);

      setRestaurants(resRestaurants.data.restaurants || []);
      setTouristic(resTouristic.data.touristPlaces || []);
      setReligious(resReligious.data.religiousPlaces || []);
    } catch (error) {
      console.error('Failed to fetch nearby places:', error.message);
      // You could set an error state here if needed
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const requestLocation = async () => {
      try {
        const loc = await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 60000,
        });
        setLocation(loc);
        setLocationError(false);
      } catch (error) {
        console.warn('Location error:', error.message);
        setLocationError(true);
        // Set a default location if location fails
        setLocation({
          latitude: 33.8938,
          longitude: 35.5018, // Beirut coordinates as fallback
        });
      }
    };

    requestLocation();
    fetchData();
  }, []);

  // Filter and validate places data
  const getValidPlaces = places => {
    return places.filter(
      place =>
        place &&
        typeof place.latitude === 'number' &&
        typeof place.longitude === 'number' &&
        !isNaN(place.latitude) &&
        !isNaN(place.longitude) &&
        place.latitude >= -90 &&
        place.latitude <= 90 &&
        place.longitude >= -180 &&
        place.longitude <= 180,
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
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photo_reference}&key=AIzaSyCEcwxMIkPKG2RoZ8Qa1LKAkB0BHnKU6go`
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
            {allValidPlaces.map((place, index) => (
              <Marker
                key={place.id || place.place_id || `marker-${index}`}
                coordinate={{
                  latitude: Number(place.latitude),
                  longitude: Number(place.longitude),
                }}
                title={place.name || place.title || 'Unknown Place'}
                description={place.address || ''}
              />
            ))}
          </MapView>
        )}

        {renderSection('Touristic Places', touristic)}
        {renderSection('Restaurants', restaurants)}
        {renderSection('Religious Places', religious)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  locationError: {
    fontSize: 12,
    color: '#FF6B6B',
    fontStyle: 'italic',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  map: {
    width: Dimensions.get('window').width,
    height: 250,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 20,
  },
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  image: {
    width: '100%',
    height: 180,
  },
  cardTitle: {
    padding: 10,
    paddingBottom: 5,
    fontSize: 16,
    fontWeight: '500',
    backgroundColor: '#fff',
  },
  cardAddress: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    fontSize: 14,
    color: '#666',
    backgroundColor: '#fff',
  },
});
