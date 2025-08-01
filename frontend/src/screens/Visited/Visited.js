import React, { useState, useEffect } from 'react';
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
import { useTheme } from '../Theme/Theme';
import { useSelector, useDispatch } from 'react-redux';

export default function Visited() {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [visitedPlaces, setVisitedPLaces] = useState([]);
  const { theme } = useTheme();

  const user = useSelector(state => state.user.user);
  const places = useSelector(state => state.places.all);
  const dispatch = useDispatch();

  const getVisitedPlaces = () => {
    setVisitedPLaces(
      places.filter(place => user.visitedPlaces.includes(place._id)),
    );
  };

  useEffect(() => {
    getVisitedPlaces();
  }, [user.visitedPlaces]);

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <Text style={styles.title}>Visited</Text>
        </View>

        <Image
          source={require('../../assets/images/Favourites.png')}
          style={styles.headerImage}
        />
      </View>

      {/* Place Item */}
      {visitedPlaces.length === 0 ? (
        <Text
          style={{
            padding: 20,
            fontSize: 16,
            color: theme.text,
            textAlign: 'center',
            marginTop: 20,
          }}
        >
          No visited added yet.
        </Text>
      ) : (
        visitedPlaces.map((place, index) => (
          <View
            key={index}
            style={[styles.grid, { backgroundColor: theme.background }]}
          >
            <Image style={styles.imageItem} source={{ uri: place.profile }} />

            <View style={styles.textContainer}>
              <Text style={[styles.placeName, { color: theme.text }]}>
                {place.name}
              </Text>
              <Text style={[styles.placeLocation, { color: theme.text }]}>
                {place.city || 'Not Found'}
              </Text>
            </View>
          </View>
        ))
      )}
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
});
