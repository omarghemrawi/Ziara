import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../Theme/Theme';
import { useSelector } from 'react-redux';
import i18n from '../locales/i18n';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const user = useSelector(state => state.user.user);
  //dummy data for reviews
  user.reviews = [
    {
      placeName: 'Raouche Rock',
      comment: 'Amazing view and clean place!',
      rating: 5,
      photoUrl: 'https://example.com/raouche.jpg',
    },
    {
      placeName: 'Raouche Rock',
      comment: 'Amazing view and clean place!',
      rating: 5,
      photoUrl: 'https://example.com/raouche.jpg',
    },
    {
      placeName: 'Raouche Rock',
      comment: 'Amazing view and clean place!',
      rating: 5,
      photoUrl: 'https://example.com/raouche.jpg',
    },
    {
      placeName: 'Beirut Souks',
      comment: 'Nice shops but a bit crowded.',
      rating: 3,
      photoUrl: null,
    },
    {
      placeName: 'Beirut Souks',
      comment: 'Nice shops but a bit crowded.',
      rating: 3,
      photoUrl: null,
    },
    {
      placeName: 'Beirut Souks',
      comment: 'Nice shops but a bit crowded.',
      rating: 3,
      photoUrl: null,
    },
  ];
    const [reviews, setReviews] = useState(user.reviews);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReviewIndex, setSelectedReviewIndex] = useState(null);
  const handleDeletePress = (index) => {
    setSelectedReviewIndex(index);
    setModalVisible(true);
  };

  const confirmDelete = () => {
    const updatedReviews = [...reviews];
    updatedReviews.splice(selectedReviewIndex, 1);
    setReviews(updatedReviews);
    setModalVisible(false);
    setSelectedReviewIndex(null);
  };

  const cancelDelete = () => {
    setModalVisible(false);
    setSelectedReviewIndex(null);
  };
  console.log(user);
  const year = new Date(user.createdAt).getFullYear();
  return (
    <View
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Entypo name="chevron-left" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          {i18n.t('profile')}
        </Text>
        <View style={[styles.headerIcons, { color: theme.text }]}>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <MaterialIcons
              name="edit"
              size={30}
              color="#000"
              style={[styles.icon, , { color: theme.text }]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SettingsScreen')}
          >
            <FontAwesome
              name="cog"
              size={30}
              color="#000"
              style={[styles.icon, , { color: theme.text }]}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* User Info */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: user.profile || null }} // User profile picture
          style={styles.avatar}
        />
        <View style={styles.user}>
          <Text style={[styles.userName, { color: theme.text }]}>
            {user.username}
          </Text>
          <Text style={[styles.joinedText, , { color: theme.text }]}>
            {i18n.t('joined_in', { year })}
          </Text>
        </View>
      </View>

      {/* User Reviews Section */}
      <View style={{ marginBottom: 30 }}>
        <Text
          style={[styles.sectionTitle, { color: theme.text, marginBottom: 10 }]}
        >
          {i18n.t('your_reviews')}
        </Text>

        {/* Example Review Item */}
        <ScrollView
          style={[styles.reviewTextContainer, { minHeight: 500 }]} // Adjust height as needed
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
        >
          {user.reviews.map((review, index) => (
            <View key={index} style={styles.reviewCard}>
              {review.photoUrl && (
                <Image
                  source={{ uri: review.photoUrl }}
                  style={styles.reviewImage}
                />
              )}
              <View style={styles.reviewTextContainer}>
           <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
  <Text style={[styles.reviewPlaceName, { color: theme.text }]}>
    {review.placeName}
  </Text>

  {/* Delete Icon */}
  <TouchableOpacity onPress={() => handleDeletePress(index)}>
    <MaterialIcons name="delete" size={20} color="#e0e0e0" />
  </TouchableOpacity>
</View>
                <View style={styles.starContainer}>
                  {[...Array(review.rating)].map((_, i) => (
                    <FontAwesome
                      key={i}
                      name="star"
                      size={16}
                      color="#FFD700"
                    />
                  ))}
                </View>
                <Text style={[styles.reviewText, { color: theme.text }]}>
                  {review.comment}
                </Text>
         
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      {/* <TouchableOpacity
  onPress={() => navigation.navigate('AllReviewsScreen')}
  style={[styles.button, { borderColor: theme.text, marginTop: 10 }]}
>
  <Text style={[styles.buttonText, { color: theme.text }]}>
    See All Reviews
  </Text>
</TouchableOpacity> */}
  <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={cancelDelete}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>{i18n.t('deleteReviewConfirmation')}</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#FAC75C' }]} onPress={confirmDelete}>
                <Text style={styles.modalButtonText}>{i18n.t('yes')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, { backgroundColor: 'gray' }]} onPress={cancelDelete}>
                <Text style={styles.modalButtonText}>{i18n.t('no')}</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    marginRight:10,
  },
  icon: {
    marginLeft: 10,
  },
  profileSection: {
    flexDirection: 'row',
    marginVertical: 60,
    marginHorizontal:30,
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
  joinedText: {
    color: '#777',
    fontSize: 14,
    marginTop: 4,
  },
  section: {
    marginBottom: 30,
    alignItems: 'flex-start',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft:20,
  },
  sectionSubtitle: {
    color: '#666',
    fontSize: 14,
    marginVertical: 10,
    textAlign: 'center',
    width: '100%',
  },
  button: {
    borderWidth: 1,

    borderRadius: 30,
    paddingHorizontal: 105,
    paddingVertical: 15,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  user: {
    marginLeft: 15,
  },
  reviewCard: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginLeft:10,
  },
  reviewImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: '#ccc',
  },
  reviewTextContainer: {
    flex: 1,
  },
  reviewPlaceName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  reviewText: {
    fontSize: 14,
    marginBottom: 4,
    marginTop: 10,
  },
  starContainer: {
    flexDirection: 'row',
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
});
