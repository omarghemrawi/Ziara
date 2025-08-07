import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../Theme/Theme';
import { useSelector } from 'react-redux';
import i18n from '../locales/i18n';
import axios from 'axios';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const user = useSelector(state => state.user.user);
  const [reviews, setReviews] = useState([]);
  //dummy data for reviews
  // user.reviews = [
  //   {
  //     placeName: 'Raouche Rock',
  //     comment: 'Amazing view and clean place!',
  //     rating: 5,
  //     photoUrl: 'https://example.com/raouche.jpg',
  //   },
  //   {
  //     placeName: 'Raouche Rock',
  //     comment: 'Amazing view and clean place!',
  //     rating: 5,
  //     photoUrl: 'https://example.com/raouche.jpg',
  //   },
  //   {
  //     placeName: 'Raouche Rock',
  //     comment: 'Amazing view and clean place!',
  //     rating: 5,
  //     photoUrl: 'https://example.com/raouche.jpg',
  //   },
  //   {
  //     placeName: 'Beirut Souks',
  //     comment: 'Nice shops but a bit crowded.',
  //     rating: 3,
  //     photoUrl: null,
  //   },
  //   {
  //     placeName: 'Beirut Souks',
  //     comment: 'Nice shops but a bit crowded.',
  //     rating: 3,
  //     photoUrl: null,
  //   },
  //   {
  //     placeName: 'Beirut Souks',
  //     comment: 'Nice shops but a bit crowded.',
  //     rating: 3,
  //     photoUrl: null,
  //   },
  // ];

  const fetchReviews = async () => {
    const userId = user._id;
    try {
      const res = await axios.get(
        `http://10.0.2.2:5000/api/review/user/${userId}`,
      );
      if (res.data.success) {
        setReviews(res.data.reviews); // your state update function
      } else {
        console.error('Failed to fetch user reviews:', res.data.message);
      }
    } catch (error) {
      console.error('Error fetching user reviews:', error);
    }
  };
  console.log(reviews);

  const year = new Date(user.createdAt).getFullYear();

  useEffect(() => {
    fetchReviews();
  }, []);
  return (
    <ScrollView
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
          style={[styles.reviewTextContainer, { maxHeight: 300 }]} // Adjust height as needed
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
        >
          {reviews.map((review, index) => (
            <View key={index} style={styles.reviewCard}>
              {review.placeId.profile && (
                <Image
                  source={{ uri: review.placeId.profile }}
                  style={styles.reviewImage}
                />
              )}
              <View style={styles.reviewTextContainer}>
                <Text style={[styles.reviewPlaceName, { color: theme.text }]}>
                  {review.placeId.name}
                </Text>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
  },
  icon: {
    marginLeft: 10,
  },
  profileSection: {
    flexDirection: 'row',
    marginVertical: 60,
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
});
