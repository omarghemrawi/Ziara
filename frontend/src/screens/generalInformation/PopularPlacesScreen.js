import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

const popularPlaces = [
  {
    id: '1',
    name: 'Jeita Grotto',
    location: 'Keserwan',
    image:
      require('../../assets/images/jeita.jpeg'),
  },
  {
    id: '2',
    name: 'Byblos',
    location: 'Jbeil',
    image:
     require('../../assets/images/byblos.jpeg'),
  },
  {
    id: '3',
    name: 'Baalbek Temples',
    location: 'Baalbek',
    image:
        require('../../assets/images/baalbak.jpeg'),
  },
  {
    id: '4',
    name: 'Raouché Rocks',
    location: 'Beirut',
    image:
         require('../../assets/images/rawche.jpeg'),
  },
];

export default function PopularPlacesScreen() {
  const renderPlace = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={item.image } style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.location}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Popular Places</Text>
      </View>
      <FlatList
        data={popularPlaces}
        renderItem={renderPlace}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: { fontSize: 24, fontWeight: 'bold' },
  list: { padding: 16 },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    height: 180,
    width: '100%',
  },
  info: {
    padding: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
