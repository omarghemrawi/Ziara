import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Button,
  TextInput,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { favoritePlaces } from '../Favorites/FavoriteStorage';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { refreshUser } from '../../redux/actions/user.action';
import i18n from '../locales/i18n';
import SocialIcons from '../components/SocialIcons';
import { uploadImageToCloudinary } from '../../utils/cloudinaryUpload';

export default function PlaceDetailScreen() {
  const [isFavourite, setIsFavourite] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [selectedStar, setSelectedStar] = useState(0);
  const [image, setImage] = useState(null);
  const [showTooltip, setShowTooltip] = useState(true);

  const route = useRoute();
  const { id, type } = route.params;
  const navigation = useNavigation();
  const data = useSelector(state => state.places[type]);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  console.log(data);

  const place = data.find(item => item._id === id);

  const starArray = [1, 2, 3, 4, 5];

  const handleFavouriteToggle = async () => {
    const newValue = !isFavourite;
    setIsFavourite(newValue);

    try {
      console.log(id, user._id);
      if (newValue) {
        await axios.post('http://192.168.0.103/api/favorite/', {
          placeId: id,
          userId: user._id,
        });
      } else {
        await axios.delete('http://192.168.0.103:5000/api/favorite', {
          data: {
            placeId: id,
            userId: user._id,
          },
        });
      }
      dispatch(refreshUser(user._id)); // Refresh after success
    } catch (error) {
      console.error('Error toggling favorite:', error);
      setIsFavourite(newValue);
      // Optionally revert UI state here if needed
    }
  };

  const handleImagePick = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const asset = response.assets && response.assets[0];
        if (asset) {
          setImage(asset.uri);
        }
      }
    });
  };

  const handleSubmit = async () => {
    if (!selectedStar || !reviewText) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      let imageUrl = '';
      // Upload image if selected
      if (image) {
        imageUrl = await uploadImageToCloudinary(image);
      }
      // specific model type
      const staticTypes = ['religious', 'touristic'];
      const modelType = staticTypes.includes(place.type)
        ? 'StaticPlace'
        : 'ClientPlace';
      // Submit review data
      const res = await axios.post('http://192.168.0.103:5000/api/review', {
        rating: selectedStar,
        comment: reviewText,
        image: imageUrl || null,
        userId: user._id,
        placeId: place._id,
        placeModel: modelType,
      });

      if (res.data.success) {
        alert('Review submitted successfully!');
        setSelectedStar(0);
        setReviewText('');
        setImage(null);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Submit error:', err);
      alert(
        Done,
        'Submission failed. Please check your network or try again later.',
      );
    }
  };

  useEffect(() => {
    const existsInFavorites = user.favoritePlaces?.some(fav => fav === id);
    if (existsInFavorites) {
      setIsFavourite(true);
    } else {
      setIsFavourite(false);
    }
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 4000); // Hide after 4 seconds
    return () => clearTimeout(timer);
  }, []);

  //fetching reviews of a specific place
  const fetchReviews = async placeId => {
    try {
      const res = await axios.get(
        `http://192.168.0.103:5000/api/review/place/${placeId}`,
      );
      console.log(res.data);
      if (res.data.success) {
        setReviews(res.data.reviews);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const [visibleReviews, setVisibleReviews] = useState(3); // Start by showing 3 reviews
  const [showModal, setShowModal] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);

  const loadMoreReviews = () => {
    setVisibleReviews(prev => prev + 3);
  };

  const renderReview = (review, index) => (
    <View key={index} style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Image
          source={{
            uri: review.userId.profileImage || 'https://via.placeholder.com/50',
          }}
          style={styles.reviewAvatar}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.reviewerName}>{review.name}</Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map(
              (
                star, // !!! now you have a variable named rating instead of that array
              ) => (
                <Text
                  key={star}
                  style={[
                    styles.star1,
                    star <= review.rate
                      ? styles.filledStar
                      : styles.unfilledStar,
                  ]}
                >
                  ★
                </Text>
              ),
            )}
          </View>
        </View>
      </View>

      <Text style={styles.comment}>{review.comment}</Text>

      {review.image && (
        <Image source={{ uri: review.image }} style={styles.reviewImage} />
      )}
    </View>
  );

  const openReviewsModal = () => {
    fetchReviews(id);
    setReviewModalVisible(true);
  };
  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.headerTitleRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="chevron-left" size={20} color="#000" />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '90%',
            }}
          >
            <Text style={styles.title}>{place.name}</Text>
            <View style={{ alignItems: 'center' }}>
              {showTooltip && (
                <View style={styles.tooltipContainer}>
                  <Text style={styles.tooltipText}>
                    {i18n.t('tooltipReport')}
                  </Text>
                  <View style={styles.tooltipArrow} />
                </View>
              )}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ReportPlaceScreen', {
                    placeId: id,
                    userId: user._id,
                  })
                }
              >
                <MaterialIcons name="report" size={29} color="#FAC75C" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.headerImageContainer}>
          <Image source={{ uri: place.profile }} style={styles.headerImage} />

          <TouchableOpacity
            style={styles.mapButton}
            onPress={() =>
              navigation.navigate('Map', { location: place.location || null })
            }
          >
            <Text style={styles.mapButtonText}>{i18n.t('ViewOnMap')}</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.galleryRow}>
            {place.referenceImages.map((img, index) => (
              <Image
                key={index}
                source={{ uri: img }}
                style={styles.galleryImage}
              />
            ))}
          </View>
        </ScrollView>

        <Text style={styles.sectionTitle}>{i18n.t('Description')}</Text>
        <Text style={styles.descriptionText}>{place.description}</Text>
        <Text style={styles.sectionTitle}>{i18n.t('Visit Us')}</Text>

        <SocialIcons
          facebookLink={place.facebook}
          instagramLink={place.instagram}
          isResto={place.type === 'restaurant'}
          menuLink={place.menuLink}
        />

        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleFavouriteToggle()}
          >
            <Text style={styles.actionText}>{i18n.t('AddToFavourite')}</Text>
            <AntDesign
              name={isFavourite ? 'heart' : 'hearto'}
              size={20}
              color={isFavourite ? '#FAC75C' : 'black'}
              style={{ marginTop: 50 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={openReviewsModal}
          >
            <Text style={styles.actionText}>{i18n.t('RatingAndReview')}</Text>
            <Entypo
              name="chevron-right"
              size={20}
              color="black"
              style={{ marginTop: 50 }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal Sheet */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeX}
            >
              <Text style={styles.xText}>✕</Text>
            </TouchableOpacity>

            <View style={styles.profileSection}>
              <Image source={{ uri: place.profile }} style={styles.avatar} />
              <View>
                <Text style={styles.name}>{place.name}</Text>
                <Text style={styles.location}>{place.city} || Tripoli</Text>
              </View>
            </View>

            <Text style={styles.label}>
              {i18n.t('HowWouldYouRateYourExperience')}
            </Text>
            <View style={styles.stars}>
              {starArray.map(star => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setSelectedStar(star)}
                >
                  <Text
                    style={[
                      styles.star,
                      star <= selectedStar && styles.filledStar,
                    ]}
                  >
                    ★
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={styles.modalInput1}
              placeholder={i18n.t('WriteYourReview')}
              multiline
              value={reviewText}
              onChangeText={setReviewText}
              maxLength={200}
            />
            <Text style={styles.charCount}>
              {reviewText.length}
              {i18n.t('CharactersLimit')}
            </Text>

            <Text style={styles.label}>{i18n.t('UploadPhotoOptional')}</Text>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={handleImagePick}
            >
              <Text style={styles.uploadText}>{i18n.t('Upload')}</Text>
            </TouchableOpacity>
            {image && (
              <Image source={{ uri: image }} style={styles.previewImage} />
            )}

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveText}>{i18n.t('Save')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
              >
                <Text style={styles.submitText}>{i18n.t('Submit')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Modal Sheet1 */}
      <Modal
        animationType="slide"
        transparent
        visible={reviewModalVisible}
        onRequestClose={() => setReviewModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setReviewModalVisible(false)}
              style={styles.closeX}
            >
              <Text style={styles.xText}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>{i18n.t('UsersReviews')}</Text>
            <ScrollView>
              {reviews.slice(0, visibleReviews).map(renderReview)}

              {visibleReviews < reviews.length && (
                <TouchableOpacity
                  style={styles.loadMoreButton}
                  onPress={loadMoreReviews}
                >
                  <Text style={styles.loadMoreText}>
                    {i18n.t('LoadMoreReviews')}
                  </Text>
                </TouchableOpacity>
              )}
            </ScrollView>

            <TouchableOpacity
              onPress={() => {
                setReviewModalVisible(false);
                setModalVisible(true);
              }}
            >
              <Text style={{ color: '#333', fontSize: 10 }}>
                {i18n.t('YouAlsoVisited')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 20,
  },
  headerImageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  headerImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  mapButton: {
    position: 'absolute',
    bottom: 80,
    right: 120,
    backgroundColor: '#FAC75C',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  mapButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  galleryRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  galleryImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 8,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 6,
    marginTop: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#555',
  },
  actionsRow: {
    flexDirection: 'column',
    gap: 12,
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 0,
  },
  actionText: {
    fontSize: 16,
    marginRight: 200,
    marginTop: 30,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    marginTop: 30,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    minHeight: '100%',
  },
  closeX: {
    alignSelf: 'flex-end',
  },
  xText: {
    fontSize: 20,
    color: '#333',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },

  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  location: {
    color: '#666',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 20,
  },
  stars: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  star: {
    fontSize: 54,
    color: '#ccc',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  filledStar: {
    color: '#FAC75C',
  },
  modalInput1: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    height: 100,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    height: 40,
  },
  charCount: {
    alignSelf: 'flex-end',
    color: '#888',
    fontSize: 12,
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    width: 90,
    marginTop: 20,
    borderWidth: 1,
  },

  uploadText: {
    color: '#333',
  },
  uploadText1: {
    color: '#333',
    padding: 10,
  },
  previewImage: {
    width: '100%',
    height: 150,
    marginTop: 10,
    borderRadius: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 120,
  },
  saveButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 50,
    flex: 1,
    borderWidth: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#FAC75C',
    padding: 12,
    borderRadius: 50,
    flex: 1,
    borderWidth: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  saveText: {
    color: '#333',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadMoreButton: {
    backgroundColor: '#FAC75C',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginVertical: 10,
  },
  loadMoreText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  writeReviewLink: {
    marginTop: 25,
    alignItems: 'center',
  },
  writeReviewText: {
    color: '#FAC75C',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },

  rating: {
    marginTop: 4,
    color: '#444',
  },
  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  reviewAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  starsRow: {
    flexDirection: 'row',
    marginTop: 2,
  },

  star1: {
    fontSize: 16,
    marginRight: 2,
  },
  star: {
    fontSize: 54,
    color: '#ccc',
    textAlign: 'center',
    marginHorizontal: 10,
  },

  filledStar: {
    color: '#f1c40f',
  },

  unfilledStar: {
    color: '#ccc',
  },

  comment: {
    fontSize: 14,
    color: '#333',
  },

  reviewImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginTop: 10,
  },

  iconRow: {
    flexDirection: 'row',
    gap: 20,
    marginVertical: 10,
  },
  icon: {
    padding: 6,
  },
  tooltipContainer: {
    backgroundColor: '#FAC75C',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
    marginBottom: 6,
    position: 'relative',
  },
  tooltipText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  tooltipArrow: {
    position: 'absolute',
    bottom: -6,
    left: '60%',
    marginLeft: -6,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FAC75C',
  },
});
