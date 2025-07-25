import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import { favoritePlaces } from './FavoriteStorage';

export default function Favourites() {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedPlaceIndex, setSelectedPlaceIndex] = useState(null);

  const handleDotsPress = (index) => {
    setSelectedPlaceIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleMoveToVisited = () => {
    const place = favoritePlaces[selectedPlaceIndex];
    //  remove from favorites
    // favoritePlaces.splice(selectedPlaceIndex, 1);
    navigation.navigate('Visited', { place });
    closeModal();
  };

  const handleDelete = () => {
    favoritePlaces.splice(selectedPlaceIndex, 1);
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <Text style={styles.title}>Favourites</Text>
          <TouchableOpacity
            style={styles.visitedButton}
            onPress={() => navigation.navigate('Visited')}
          >
            <Text style={styles.visitedButtonText}>Go to Visited</Text>
          </TouchableOpacity>
        </View>

        <Image
          source={require('../../assets/images/Favourites.png')}
          style={styles.headerImage}
        />
      </View>

      {/* Favorite Places List */}
      {favoritePlaces.length === 0 ? (
        <Text style={{ padding: 20, fontSize: 16 }}>No favourites added yet.</Text>
      ) : (
        favoritePlaces.map((place, index) => (
          <View key={index} style={styles.grid}>
            <Image style={styles.imageItem} source={place.image} />
            <View style={styles.textContainer}>
              <Text style={styles.placeName}>{place.name}</Text>
              <Text style={styles.placeLocation}>ID: {place.id}</Text>
            </View>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => handleDotsPress(index)}
            >
              <Entypo name="dots-three-vertical" size={18} color="#000" />
            </TouchableOpacity>
          </View>
        ))
      )}

      {/* Modal Bottom Sheet */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.modalOption}>
            <Text>Edit Trip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalOption} onPress={handleMoveToVisited}>
            <Text>✓ Move to Visited</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalOption} onPress={handleDelete}>
            <Text style={{ color: 'red' }}>🗑 Delete</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: 40,
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
  iconContainer: {
    paddingLeft: 20,
  },
  visitedButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  visitedButtonText: {
    color: '#9a370e',
    fontWeight: 'bold',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
});
