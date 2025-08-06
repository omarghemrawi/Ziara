import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';


import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { favoritePlaces } from '../Favorites/FavoriteStorage';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { refreshUser } from '../../redux/actions/user.action';
import i18n from '../locales/i18n';
import SocialIcons from '../components/SocialIcons';

export default function PlaceDetailScreen({ 
  facebookLink, 
  instagramLink, 
  isResto, 
  menuLink 
}) {
  const [isFavourite, setIsFavourite] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [selectedStar, setSelectedStar] = useState(0);
  const [image, setImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
const [reviews, setReviews] = useState([]);
//just testing with dummy data
const place1 = {
  name: 'Test Resto',
  description: 'A dummy place for testing.',
  facebook: 'https://facebook.com/testPage',
  instagram: 'https://instagram.com/testPage',
  menuLink: 'https://example.com/menu.pdf',
};
//testing with dummy data
const serviceType1 = 'resto'; 
  const openLink = (url) => {
    if (!url) return;
    Linking.canOpenURL(url).then(supported => {
      if (supported) Linking.openURL(url);
    });
  };



//fetching reviews of a specific place
const fetchReviews = async (placeId, pageNumber = 1) => {
  try {
    const res = await axios.get(`http://192.168.0.103:5000/reviews/place/${placeId}?page=${pageNumber}&limit=10`);//adjust this :)
    if (res.data.success) {
      if (pageNumber === 1) {
        setReviews(res.data.reviews);
      } else {
        setReviews(prev => [...prev, ...res.data.reviews]);
      }
      setHasMoreReviews(res.data.hasMore); // You must return this from backend(optional)
      setPage(pageNumber);
    }
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }
};
const openReviewsModal = () => {
  fetchReviews(id, 1);
  setReviewModalVisible(true);
};



  const route = useRoute();
  const { id, type } = route.params;
  const navigation = useNavigation();
  const data = useSelector(state => state.places[type]);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
   

  const place = data.find(item => item._id === id);

  const starArray = [1, 2, 3, 4, 5];

  const handleFavouriteToggle = async () => {
    const newValue = !isFavourite;
    setIsFavourite(newValue);

    try {
      console.log(id, user._id);
      if (newValue) {
        await axios.post('http://10.0.2.2:5000/api/favorite/', {
          placeId: id,
          userId: user._id,
        });
      } else {
        await axios.delete('http://10.0.2.2:5000/api/favorite', {
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
    if (!selectedStar || !reviewText || !selectedDate) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      let imageUrl = '';

      // Upload image if selected
      if (image) {
        imageUrl = await uploadImageToCloudinary(image);
      }

      // Submit review data
      const res = await axios.post('http:// 192.168.0.103:5000/reviews', {
        rate: selectedStar,
        review: reviewText,
        image: imageUrl || null,
        date: selectedDate,
        userId: user._id,
        placeId: place._id,
      });

      if (res.data.success) {
        alert('Review submitted successfully!');
        setSelectedStar(0);
        setReviewText('');
        setImage(null);
        setSelectedDate('');
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Submit error:', err);
      alert('Submission failed. Please check your network or try again later.');
    }
  };

  useEffect(() => {
    const existsInFavorites = user.favoritePlaces?.some(fav => fav === id);
    if (existsInFavorites) {
      setIsFavourite(true);
    } else {
      setIsFavourite(false);
    }
  }, []);

  const [visibleReviews, setVisibleReviews] = useState(3); // Start by showing 3 reviews
  const [showModal, setShowModal] = useState(false);

  // Example data
  const allReviews = [
    { id: 1, name: 'John', rating: 4, comment: 'Amazing place!' },
    { id: 2, name: 'Jane', rating: 5, comment: 'Best experience ever.' },
    { id: 3, name: 'Ali', rating: 3, comment: 'It was okay.' },
    { id: 4, name: 'Sara', rating: 5, comment: 'Highly recommended!' },
    { id: 5, name: 'Mike', rating: 4, comment: 'Enjoyed a lot!' },
    { id: 6, name: 'Lina', rating: 2, comment: 'Not worth it.' },
    { id: 7, name: 'Nour', rating: 3, comment: 'Just fine.' },
    { id: 8, name: 'Tony', rating: 5, comment: 'Superb vibes.' },
    { id: 9, name: 'Maya', rating: 4, comment: 'Loved the atmosphere!' },
    { id: 10, name: 'Sam', rating: 5, comment: 'Exceptional hospitality!' },
    { id: 11, name: 'George', rating: 3, comment: 'Could be better.' },
  ];

  useEffect(() => {
    // Simulate API call
    setReviews(allReviews);
  }, []);

  const loadMoreReviews = () => {
    setVisibleReviews(prev => prev + 3);
  };

const renderReview = (review, index) => (
  <View key={index} style={styles.reviewCard}>
    <View style={styles.reviewHeader}>
      <Image
        source={{ uri: review.userImage || 'https://via.placeholder.com/50' }}
        style={styles.reviewAvatar}
      />
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.reviewerName}>{review.name}</Text>
        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map(star => (
            <Text
              key={star}
              style={[
                styles.star1,
                star <= review.rate ? styles.filledStar : styles.unfilledStar,
              ]}
            >
              ★
            </Text>
          ))}
        </View>
      </View>
    </View>

    <Text style={styles.comment}>{review.comment}</Text>

    {review.image && (
      <Image source={{ uri: review.image }} style={styles.reviewImage} />
    )}
  </View>
);

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.headerTitleRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Entypo name="chevron-left" size={20} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>{place.businessName}</Text>

  
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
          {/* <SocialIcons
    facebookLink={place.facebook}
    instagramLink={place.instagram}
    isResto={serviceType === 'resto'}
    menuLink={place.menuLink}
  /> */}
     <SocialIcons
      facebookLink={place1.facebook}
      instagramLink={place1.instagram}
      isResto={serviceType1 === 'resto'}
      menuLink={place1.menuLink}
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
            // onPress={() => setModalVisible(true)
             
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
              <Image
                source={{ uri: place.profileImage }}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.name}>Baytna</Text>
                <Text style={styles.location}>Tripoli</Text>
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
              {reviewText.length}{i18n.t('CharactersLimit')}
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

            {/* <Text style={styles.label}>When did you visit?</Text> */}
                 {/* <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => setOpen(true)}
            >
              <Text style={styles.uploadText}>Date {'>'}</Text>
    
            </TouchableOpacity>   */}
      {/* <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      /> */}

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
              <TouchableOpacity style={styles.loadMoreButton} onPress={loadMoreReviews}>
                <Text style={styles.loadMoreText}>{i18n.t('LoadMoreReviews')}</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
    
      <TouchableOpacity
       
        onPress={() => {
          setReviewModalVisible(false);
          setModalVisible(true);
        }}
      >
        <Text style={{ color: '#333',fontSize:10 }}>{i18n.t('YouAlsoVisited')}</Text>
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
    marginTop:10,
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
    marginTop:30,
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
});
