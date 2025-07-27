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
  // Google Places API key - replace with your actual API key
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

  const getPhotoUrl = (photoReference, maxwidth = 400) => {
    if (!photoReference) return null;
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxwidth}&photo_reference=${photoReference}&key=${GOOGLE_API_KEY}`;
  };

  // Handle place item press
  const handlePlacePress = place => {
    // Navigate to place details or handle the press
    console.log('Place pressed:', place.name);
    // navigation.navigate('PlaceDetails', { place });
  };
  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: headerColor }]}>
        <Image
          source={headerImage}
          style={[styles.headerImage, title === 'Search' && { width: 110 }]}
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

      {/* <ScrollView>
        <View style={styles.grid}>
          {data.map((place, index) => (
            <Image key={index} source={place.image} style={styles.imageItem} />
          ))}
        </View>
      </ScrollView> */}
      <ScrollView>
        <View style={styles.grid}>
          {data.map((place, index) => (
            <TouchableOpacity
              key={place.place_id || index}
              style={styles.placeItem}
              onPress={() => handlePlacePress(place)}
            >
              <Image
                source={{
                  uri:
                    getPhotoUrl(place.photo_reference) ||
                    'https://via.placeholder.com/400x150?text=No+Image',
                }}
                style={styles.imageItem}
                defaultSource={require('../../assets/images/placeholder.png')} // Add a placeholder image
              />
              <View style={styles.placeInfo}>
                <Text style={styles.placeName} numberOfLines={2}>
                  {place.name}
                </Text>
                <Text style={styles.placeAddress} numberOfLines={1}>
                  {place.address}
                </Text>
                {place.rating && (
                  <View style={styles.ratingContainer}>
                    <MaterialIcons name="star" size={16} color="#FFD700" />
                    <Text style={styles.rating}>{place.rating}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {data.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No places found</Text>
          </View>
        )}
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
    width: 160, //110
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
  input: {
    backgroundColor: '#F1F1F1',
    borderRadius: 30,
    paddingHorizontal: 20,
    height: 60,
    marginBottom: 30,
    marginTop: 80,
    borderColor: '#000',
    borderWidth: 1,
  },

  buttonText: {
    color: '#fff',
    paddingLeft: 12,
  },
  buttonTextBlack: {
    color: '#000',
    paddingLeft: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  imageItem: {
    width: '47%',
    height: 150,
    borderRadius: 15,
    marginBottom: 10,
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
  placeItem: {
    width: '47%',
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageItem: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  placeInfo: {
    padding: 10,
  },
  placeName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  placeAddress: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    color: '#333',
    marginLeft: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default PlacesSection;
