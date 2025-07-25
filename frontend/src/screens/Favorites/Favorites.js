import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';

export default function Favourites() {
  const navigation = useNavigation();
  const [isVisited, setIsVisited] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleToggle = () => {
    setIsVisited(!isVisited);
    if (!isVisited) {
      navigation.navigate('Visited');
    }
  };

  const handleDotsPress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <Text style={styles.title}>Favourites</Text>
         <TouchableOpacity style={styles.visitedButton} onPress={() => navigation.navigate('Visited')}>
    <Text style={styles.visitedButtonText}>Go to Visited</Text>
  </TouchableOpacity>
        </View>

        <Image
          source={require('../../assets/images/Favourites.png')}
          style={styles.headerImage}
        />
      </View>

      {/* Place Item */}
      <View style={styles.grid}>
        <Image
          style={styles.imageItem}
          source={require('../../assets/images/jbeil.jpeg')}
        />

        <View style={styles.textContainer}>
          <Text style={styles.placeName}>Al-Amin Mosque</Text>
          <Text style={styles.placeLocation}>Beirut</Text>
        </View>

        <TouchableOpacity style={styles.iconContainer} onPress={handleDotsPress}>
          <Entypo name="dots-three-vertical" size={18} color="#000" />
        </TouchableOpacity>
      </View>

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
          <TouchableOpacity style={styles.modalOption}>
            <Text>✓ Move to Visited</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalOption}>
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
    fontFamily: 'RobotoSlabBold',
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
    marginTop: 70,
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
