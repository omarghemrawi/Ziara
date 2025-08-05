import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import i18n from '../locales/i18n';

const dummyData = {
  touristic: [
    { id: 1, title: 'Byblos Castle', image: 'https://example.com/byblos.jpg', latitude: 34.123, longitude: 35.654 },
    { id: 2, title: 'Jeita Grotto', image: 'https://example.com/jeita.jpg', latitude: 33.990, longitude: 35.655 },
  ],
  restaurants: [
    { id: 3, title: 'Le Chef', image: 'https://example.com/lechef.jpg', latitude: 33.892, longitude: 35.501 },
    { id: 4, title: 'Tawlet', image: 'https://example.com/tawlet.jpg', latitude: 33.900, longitude: 35.530 },
  ],
  religious: [
    { id: 5, title: 'Mohammad Al-Amin Mosque', image: 'https://example.com/mosque.jpg', latitude: 33.888, longitude: 35.503 },
    { id: 6, title: 'Saint George Maronite Cathedral', image: 'https://example.com/church.jpg', latitude: 33.885, longitude: 35.506 },
  ],
};

export default function NearbyScreen() {
  const [location, setLocation] = useState(null);

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

  // Combine all places for map markers
  const allPlaces = [
    ...dummyData.touristic,
    ...dummyData.restaurants,
    ...dummyData.religious,
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>{i18n.t('nearby')}</Text>
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
            showsUserLocation={true}
          >
            {allPlaces.map(place => (
              <Marker
                key={place.id}
                coordinate={{ latitude: place.latitude, longitude: place.longitude }}
                title={place.title}
              />
            ))}
          </MapView>
        )}

        {location ? (
          <>
            {renderSection('Touristic Places', dummyData.touristic)}
            {renderSection('Restaurants', dummyData.restaurants)}
            {renderSection('Religious Places', dummyData.religious)}
          </>
        ) : (
          <Text style={styles.loading}>Fetching your location…</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );

  function renderSection(title, data) {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {data.map(place => (
          <View key={place.id} style={styles.card}>
            <Image source={{ uri: place.image }} style={styles.image} />
            <Text style={styles.cardTitle}>{place.title}</Text>
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#eee' },
  title: { fontSize: 24, fontWeight: 'bold' },
  loading: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#888' },
  map: {
    width: Dimensions.get('window').width,
    height: 250,
  },
  section: { paddingHorizontal: 20, marginTop: 20 },
  sectionTitle: { fontSize: 20, fontWeight: '600', marginBottom: 10 },
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 15,
  },
  image: { width: '100%', height: 180 },
  cardTitle: {
    padding: 10,
    fontSize: 16,
    fontWeight: '500',
    backgroundColor: '#fff',
  },
});
