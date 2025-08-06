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
import i18n from '../locales/i18n';

const popularDishes = [
  {
    id: '1',
    name: 'Kibbeh',
    location: 'National Dish',
    image:
    require('../../assets/images/kebbeh.jpeg'),
  },
  {
    id: '2',
    name: 'Tabbouleh',
    location: 'Salad Specialty',
    image:
      require('../../assets/images/tabbouleh.jpeg'),
  },
  {
    id: '3',
    name: 'Manakish',
    location: 'Street Food',
    image:
    require('../../assets/images/manakish.jpeg'),
  },
  {
    id: '4',
    name: 'Hummus',
    location: 'Traditional Dip',
    image:
         require('../../assets/images/hummus.jpeg'),
  },
  {
    id: '5',
    name: 'Shawarma',
    location: 'Popular Fast Food',
    image:
          require('../../assets/images/shawarma.jpeg'),
  },
];

export default function PopularDishesScreen() {
  const renderDish = ({ item }) => (
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
        <Text style={styles.title}>{i18n.t('PopularLebaneseDishes')}</Text>
      </View>
      <FlatList
        data={popularDishes}
        renderItem={renderDish}
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





























