import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';

const RestaurantScreen = () => {
  const [city, setCity] = useState('');
  const [restaurants, setRestaurants] = useState([]);

  // Load all restaurants on initial load
  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async (cityQuery = '') => {
    try {
      const baseUrl = 'http://your-backend-domain.com/api/places/restaurants'; // Change for your local IP or deployed backend
      const url = cityQuery ? `${baseUrl}?city=${cityQuery}` : baseUrl;
      const response = await fetch(url);
      const data = await response.json();
      setRestaurants(data.places);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter city (e.g., Tripoli)"
        value={city}
        onChangeText={setCity}
        style={styles.input}
      />
      <Button title="Search" onPress={() => fetchRestaurants(city)} />

      <FlatList
        data={restaurants}
        keyExtractor={item => item.place_id}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 12,
    borderRadius: 4,
  },
  item: { marginBottom: 8, fontSize: 16 },
});

export default RestaurantScreen;
