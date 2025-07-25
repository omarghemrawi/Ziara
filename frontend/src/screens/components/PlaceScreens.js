import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PlacesSection = ({
  title,
  headerColor,
  headerImage,
  data,
  onSearch,
  onSearchChange,
  searchValue,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: headerColor }]}>
        <Image
          source={headerImage}
          style={[
            styles.headerImage,
            title === 'Search' && { width: 110 },
          ]}
        />
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchValue}
            onChangeText={onSearchChange}
          />
          <TouchableOpacity onPress={onSearch} style={styles.sendIcon}>
            <MaterialIcons name="send" size={22} color="#FAC75C" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.grid}>
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate('PlaceDetails',{ id: item.id })}
            activeOpacity={0.8}
          >
            <Image
              source={item.image}
              style={styles.imageItem}
              resizeMode="cover"
            />
            <Text style={styles.cardTitle}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    height: 180,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    padding: 20,
  },
  headerImage: {
    width: 160,
    height: 110,
    position: 'absolute',
    top: 120,
    left: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'RobotoSlabBold',
    marginTop: 20,
    marginLeft: 10,
  },
  searchSection: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    borderRadius: 30,
    borderColor: '#000',
    borderWidth: 1,
    height: 60,
    paddingHorizontal: 20,
    marginTop: 80,
    marginBottom: 30,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  sendIcon: {
    marginLeft: 10,
    padding: 8,
    borderRadius: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  card: {
    width: '47%',
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  imageItem: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardTitle: {
    padding: 10,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
    color: '#333',
  },
});

export default PlacesSection;
