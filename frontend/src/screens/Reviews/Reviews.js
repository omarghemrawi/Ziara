import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../Theme/Theme';
import { useSelector } from 'react-redux';

export default function AllReviewsScreen() {
  const { theme } = useTheme();
  const users = useSelector(state => state.user.allUsers); // assuming all users are stored here

 const allReviews = Array.isArray(users)
  ? users.flatMap(user =>
      user.reviews?.map(review => ({
        username: user.username,
        photoUrl: review.photoUrl,
        placeName: review.placeName,
        comment: review.comment,
        rating: review.rating,
      }))
    )
  : [];

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      <Text style={[styles.title, { color: theme.text }]}>All User Reviews</Text>

      {allReviews.map((review, index) => (
        <View key={index} style={styles.reviewCard}>
          {review.photoUrl && (
            <Image source={{ uri: review.photoUrl }} style={styles.reviewImage} />
          )}
          <View style={styles.reviewTextContainer}>
            <Text style={[styles.username, { color: theme.text }]}>
              @{review.username}
            </Text>
            <Text style={[styles.placeName, { color: theme.text }]}>
              {review.placeName}
            </Text>
            <Text style={[styles.comment, { color: theme.text }]}>
              {review.comment}
            </Text>
            <View style={styles.stars}>
              {[...Array(review.rating)].map((_, i) => (
                <FontAwesome key={i} name="star" size={16} color="#FFD700" />
              ))}
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  reviewCard: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
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
  username: {
    fontSize: 14,
    fontWeight: '600',
  },
  placeName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  comment: {
    fontSize: 14,
    marginTop: 4,
  },
  stars: {
    flexDirection: 'row',
    marginTop: 4,
  },
});
