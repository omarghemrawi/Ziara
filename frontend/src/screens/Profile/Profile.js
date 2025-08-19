import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../Theme/Theme';
import { useDispatch, useSelector } from 'react-redux';
import i18n from '../locales/i18n';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setPlacesRefresh } from '../../redux/actions/user.action';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const user = useSelector(state => state.user.user);
  const [reviews, setReviews] = useState([]);
  const [isGuest, setIsGuest] = useState(false);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReviewIndex, setSelectedReviewIndex] = useState(null);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  // Open image modal to show full image
  const openImageModal = uri => {
    setSelectedImageUri(uri);
    setImageModalVisible(true);
  };

  // Close image modal
  const closeImageModal = () => {
    setImageModalVisible(false);
    setSelectedImageUri(null);
  };

  // When user clicks delete icon on a review
  const handleDeletePress = index => {
    setSelectedReviewIndex(index);
    setModalVisible(true);
  };

  // Confirm deletion of review
  const confirmDelete = async () => {
    if (selectedReviewIndex === null) return;
    const id = selectedReviewIndex;

    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.delete(`http://192.168.0.101:5000/api/review/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        fetchReviews();
        setModalVisible(false);
        setSelectedReviewIndex(null);
        dispatch(setPlacesRefresh(true));
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'alert',
        text2: 'review Not deleted',
        position: 'top',
        visibilityTime: 5000,
      });
    }
  };

  // Cancel deletion modal
  const cancelDelete = () => {
    setModalVisible(false);
    setSelectedReviewIndex(null);
  };

  // Fetch user reviews from API and normalize data
  const fetchReviews = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return;
    try {
      const res = await axios.get('http://192.168.0.101:5000/api/review/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('API response:', res.data);

      if (res.data.success && Array.isArray(res.data.reviews)) {
        const normalizedReviews = res.data.reviews.map(r => ({
          _id: r._id,
          placeName: r.placeId?.name || 'Unknown Place',
          comment: r.comment || '',
          rating: r.rating || 0,
          photoUrl: r.image || null,
        }));
        setReviews(normalizedReviews);
      } else {
        console.error('Failed to fetch user reviews:', res.data.message);
        setReviews([]);
      }
    } catch (error) {
      console.error('Error fetching user reviews:', error);
      setReviews([]);
    }
  };

  // Get year user joined
  const year = user?.createdAt ? new Date(user.createdAt).getFullYear() : '';
  // check if guest
  useEffect(() => {
    const checkGuest = async () => {
      const guest = await AsyncStorage.getItem('guest');
      if (guest) {
        setIsGuest(true);
      }
    };
    checkGuest();
  }, []);

  useEffect(() => {
    if (user?._id) {
      fetchReviews();
    }
  }, [user, isGuest]);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.background, flex: 1 }]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Entypo name="chevron-left" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          {i18n.t('profile')}
        </Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity
            onPress={async () => {
              const guest = await AsyncStorage.getItem('guest');

              if (!guest) {
                navigation.navigate('EditProfile');
              } else {
                Alert.alert(i18n.t('login_required'), i18n.t('login_message'), [
                  { text: i18n.t('cancel'), style: 'cancel' },
                  {
                    text: i18n.t('login'),
                    onPress: () => navigation.navigate('Login'),
                  },
                  {
                    text: i18n.t('signup'),
                    onPress: () => navigation.navigate('Signup'),
                  },
                ]);
              }
            }}
          >
            <MaterialIcons
              name="edit"
              size={30}
              color={theme.text}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SettingsScreen')}
          >
            <FontAwesome
              name="cog"
              size={30}
              color={theme.text}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* User Info */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: user?.profile || 'https://via.placeholder.com/70' }}
          style={styles.avatar}
        />
        <View style={styles.user}>
          <Text style={[styles.userName, { color: theme.text }]}>
            {user?.username || ''}
          </Text>
          <Text style={[styles.joinedText, { color: theme.text }]}>
            {year ? i18n.t('joined_in', { year }) : ''}
          </Text>
        </View>
      </View>

      {/* User Reviews Section */}
      <View style={{ marginBottom: 30, flex: 1 }}>
        <Text
          style={[styles.sectionTitle, { color: theme.text, marginBottom: 10 }]}
        >
          {i18n.t('your_reviews')}
        </Text>

        <ScrollView
          style={{ flex: 1 }}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
        >
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <View key={review._id || index} style={styles.reviewCard}>
                {review.photoUrl && (
                  <TouchableOpacity
                    onPress={() => openImageModal(review.photoUrl)}
                  >
                    <Image
                      source={{ uri: review.photoUrl }}
                      style={styles.reviewImage}
                    />
                  </TouchableOpacity>
                )}

                <View style={styles.reviewContent}>
                  <View style={styles.topRow}>
                    <Text
                      style={[styles.reviewPlaceName, { color: theme.text }]}
                    >
                      {review.placeName}
                    </Text>
                    <TouchableOpacity
                      onPress={() => handleDeletePress(review._id)}
                    >
                      <MaterialIcons name="delete" size={22} color="black" />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.starsRow}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <Text
                        key={star}
                        style={[
                          styles.star1,
                          star <= review.rating
                            ? styles.filledStar
                            : styles.unfilledStar,
                        ]}
                      >
                        ★
                      </Text>
                    ))}
                  </View>

                  <Text style={[styles.reviewText, { color: theme.text }]}>
                    {review.comment || i18n.t('no_comment')}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Text style={{ color: theme.text, fontSize: 16 }}>
                {i18n.t('no_reviews_yet')}
              </Text>
            </View>
          )}
        </ScrollView>
      </View>

      {/* Delete Confirmation Modal */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={cancelDelete}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>
              {i18n.t('deleteReviewConfirmation')}
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#FAC75C' }]}
                onPress={() => confirmDelete()}
              >
                <Text style={styles.modalButtonText}>{i18n.t('yes')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: 'gray' }]}
                onPress={cancelDelete}
              >
                <Text style={styles.modalButtonText}>{i18n.t('no')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Image Fullscreen Modal */}
      <Modal
        visible={imageModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeImageModal}
      >
        <View style={styles.fullscreenImageOverlay}>
          <TouchableOpacity
            style={styles.fullscreenCloseArea}
            onPress={closeImageModal}
          />
          <Image
            source={{ uri: selectedImageUri }}
            style={styles.fullscreenImage}
            resizeMode="contain"
          />
          <TouchableOpacity
            style={styles.fullscreenCloseButton}
            onPress={closeImageModal}
          >
            <MaterialIcons name="close" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 10,
    marginRight: 10,
  },
  icon: {
    marginLeft: 10,
  },
  profileSection: {
    flexDirection: 'row',
    marginVertical: 60,
    marginHorizontal: 30,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ddd',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  user: {
    marginLeft: 20,
  },
  joinedText: {
    color: '#777',
    fontSize: 14,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  reviewCard: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    alignItems: 'flex-start',
  },
  reviewImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#ccc',
    marginRight: 15,
  },
  reviewContent: {
    flex: 1,
    flexDirection: 'column',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  reviewPlaceName: {
    fontWeight: 'bold',
    fontSize: 16,
    flexShrink: 1,
  },
  starsRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  star1: {
    fontSize: 16,
    marginRight: 2,
  },
  filledStar: {
    color: '#FAC75C',
  },
  unfilledStar: {
    color: '#ccc',
  },
  reviewText: {
    fontSize: 14,
    flexWrap: 'wrap',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  fullscreenImageOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  fullscreenCloseArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  fullscreenImage: {
    width: '90%',
    height: '70%',
    borderRadius: 12,
  },
  fullscreenCloseButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
  },
});
