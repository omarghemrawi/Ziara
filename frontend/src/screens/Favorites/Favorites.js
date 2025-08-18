import React, { useEffect, useState } from 'react';
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
import { useTheme } from '../Theme/Theme';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { refreshUser } from '../../redux/actions/user.action';
import i18n from '../locales/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Favourites() {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [idSelectedPlace, setIdSelectedPlace] = useState(null);
  const [favoritePlaces, setFavoritePlaces] = useState([]);
  const { theme } = useTheme();
  const user = useSelector(state => state.user.user);
  const places = useSelector(state => state.places.all);
  const [token, setToken] = useState('');
  const dispatch = useDispatch();
  const [isGuest, setIsGuest] = useState(false);
  const getToken = async () => setToken(await AsyncStorage.getItem('token'));

  const getFavoritePLaces = () => {
    if (!user || !user.favoritePlaces) {
      setFavoritePlaces([]);
      return;
    }

    setFavoritePlaces(
      places.filter(place => user.favoritePlaces.includes(place._id)),
    );
  };

  const handleDotsPress = id => {
    setIdSelectedPlace(id);
    setModalVisible(true);
  };
  useEffect(() => {
    const checkGuest = async () => {
      const guest = await AsyncStorage.getItem('guest');
      if (guest) {
        setIsGuest(true);
      }
    };
    checkGuest();
  }, []);

  const handleMoveToVisited = async () => {
    try {
      await axios.post(
        'http://192.168.0.101:5000/api/visited',
        { place_id: idSelectedPlace },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      // Refresh Redux store
      dispatch(refreshUser(user._id));

      // close modal
      setModalVisible(false);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  //************************************************** */

  const handleDelete = async () => {
    try {
      await axios.delete('http://192.168.0.101:5000/api/favorite', {
        data: { placeId: idSelectedPlace },
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(refreshUser(user._id));
      getFavoritePLaces();
      setModalVisible(false);
    } catch (error) {
      console.log(error);
    }

    setModalVisible(false);
  };

  // useEffect(() => {
  //   getFavoritePLaces();
  // }, [user.favoritePlaces]);
  useEffect(() => {
    getToken();
  }, []);
  useEffect(() => {
    if (user && user.favoritePlaces) {
      getFavoritePLaces();
        AsyncStorage.setItem('favorites', JSON.stringify(user.favoritePlaces));
    } else {
      setFavoritePlaces([]);
        AsyncStorage.removeItem('favorites');
    }
  }, [user.favoritePlaces, places]);
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="chevron-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>{i18n.t('favorites')}</Text>
          <TouchableOpacity
            style={styles.visitedButton}
            onPress={() => navigation.navigate('Visited')}
          >
            <Text style={[styles.visitedButtonText]}>
              {i18n.t('goToVisited')}
            </Text>
          </TouchableOpacity>
        </View>

        <Image
          source={require('../../assets/images/Favourites.png')}
          style={styles.headerImage}
        />
      </View>

      {/* Favorite Places List */}
      {favoritePlaces.length === 0 ? (
        <Text
          style={{
            padding: 20,
            fontSize: 16,
            color: theme.text,
            textAlign: 'center',
            marginTop: 20,
          }}
        >
          {i18n.t('noFavourites')}
        </Text>
      ) : (
        favoritePlaces.map((place, index) => (
          <View key={index} style={styles.grid}>
            <Image style={styles.imageItem} source={{ uri: place.profile }} />
            <View style={styles.textContainer}>
              <Text style={styles.placeName}>{place.name}</Text>
              <Text style={styles.placeLocation}>
                {' '}
                {i18n.t('city')}: {place.city}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => handleDotsPress(place._id)}
            >
              <Entypo name="dots-three-vertical" size={18} color="#000" />
            </TouchableOpacity>
          </View>
        ))
      )}

      {/* Modal Bottom Sheet */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.modalOption}>
            <Text>{i18n.t('edit_favorite')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={handleMoveToVisited}
          >
            <Text>✓ {i18n.t('move_to_visited')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalOption} onPress={handleDelete}>
            <Text style={{ color: 'red' }}>🗑 {i18n.t('delete')}</Text>
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
