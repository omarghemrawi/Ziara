// import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView , PermissionsAndroid, Platform } from 'react-native';
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import { useNavigation } from '@react-navigation/native';
// import { useTheme } from '../Theme/Theme';
// import React, { useEffect, useState } from 'react';
// import Geolocation from 'react-native-geolocation-service';
// export default function Home() {
// const [location, setLocation] = useState(null);
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../Theme/Theme';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import i18n from '../locales/i18n';

export default function Home() {
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const { theme } = useTheme();

  const getData = async (searchTerm = '') => {
    try {
      const staticRes = await axios.get('http://192.168.0.101:5000/api/static');
      const clientRes = await axios.get('http://192.168.0.101:5000/api/client');

      const staticPlaces = staticRes.data.places || [];
      const clientPlaces = clientRes.data.places || [];

      // Priority sorting only for clientPlaces
      const priorityOrder = { top: 3, boosted: 2, normal: 1 };

      clientPlaces.sort((a, b) => {
        const priorityDiff =
          priorityOrder[b.plan.priority] - priorityOrder[a.plan.priority];
        if (priorityDiff !== 0) return priorityDiff;

        // Random shuffle for boosted
        if (a.plan.priority === 'boosted' && b.plan.priority === 'boosted') {
          return Math.random() - 0.5;
        }

        return 0;
      });
      console.log(clientPlaces);

      const allPlaces = [...clientPlaces, ...staticPlaces];

      if (allPlaces.length > 0) {
        dispatch({ type: 'SET_PLACES', payload: allPlaces });
      } else {
        console.error('No restaurants found');
        dispatch({ type: 'SET_PLACES', payload: null });
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Profile Icon with Tarbush */}
      <TouchableOpacity style={styles.profileIcon} onPress={handleProfilePress}>
        <EvilIcons name="user" size={70} color={theme.text} />
        <Image
          style={styles.tarbush}
          source={require('../../assets/images/miniTarbush.png')}
        />
      </TouchableOpacity>

      {/* Header Text */}
      <Text style={[styles.headerText, { color: theme.text }]}>
        {i18n.t('findYourDestination')}
      </Text>

      {/* Horizontal Scroll Section */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalScroll}
        contentContainerStyle={styles.horizontalContent}
      >
        <OptionBox
          labelKey="nearby"
          image={require('../../assets/images/map.png')}
        />
        <OptionBox
          labelKey="popularFoods"
          image={require('../../assets/images/Hummus.png')}
          isBrown
        />
        <OptionBox
          labelKey="popularPlaces"
          image={require('../../assets/images/window1.png')}
        />
      </ScrollView>

      {/* Vertical Scroll Section */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.verticalScroll}
      >
        <DetailBox
          labelKey="touristicPlaces"
          image={require('../../assets/images/touristicPlaces.png')}
        />
        <DetailBox
          image={require('../../assets/images/religious.png')}
          labelKey="religiousPlaces"
          isBrown
          imageStyle={{ width: 200, height: 200 }}
        />
        <DetailBox
          labelKey="restaurants"
          image={require('../../assets/images/pizza.png')}
        />
        <DetailBox
          labelKey="activity"
          image={require('../../assets/images/activity.png')}
          isBrown
          imageStyle={{ width: 130, height: 130, marginLeft: 30 }}
        />
        <DetailBox
          labelKey="hotels"
          image={require('../../assets/images/hotel.png')}
          imageStyle={{ width: 130, height: 130, marginLeft: 30 }}
        />
      </ScrollView>
    </View>
  );
}

// Small horizontal square box
const OptionBox = ({ labelKey, image, isBrown }) => {
  const navigation = useNavigation();

  // map label → screen name
  const screenMap = {
    nearby: 'NearBy',
    popularFoods: 'PopularFoods',
    popularPlaces: 'PopularPlaces',
  };

  return (
    <TouchableOpacity
      onPress={() => {
        const screen = screenMap[labelKey];
        if (screen) navigation.navigate(screen);
        else console.warn(`No screen for ${labelKey}`);
      }}
      style={[styles.optionBox, isBrown && styles.brownBox]}
    >
      <Image source={image} style={styles.optionImage} />
      <Text style={styles.optionText}>{i18n.t(labelKey)}</Text>
    </TouchableOpacity>
  );
};

// Big vertical box
const DetailBox = ({ labelKey, image, isBrown, imageStyle }) => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const screenMap = {
    touristicPlaces: 'TouristicPlaces',
    religiousPlaces: 'ReligiousPlaces',
    restaurants: 'Restaurants',
    activity: 'Activity',
    hotels: 'Hotels',
  };

  const screenName = screenMap[labelKey];

  return (
    <TouchableOpacity
      onPress={() => {
        if (screenName) {
          navigation.navigate(screenName);
        } else {
          console.warn(`No screen found for labelKey: ${labelKey}`);
        }
      }}
      style={[styles.detailBox, isBrown && styles.brownBox]}
    >
      <Image source={image} style={[styles.detailImage, imageStyle]} />
      <Text
        style={[
          styles.detailText,
          labelKey === 'Restaurants' && { marginLeft: 200 },
          { color: theme.subtitle1 },
        ]}
      >
        {i18n.t(labelKey)}
      </Text>
      <EvilIcons
        name="chevron-right"
        size={30}
        color="#fff"
        style={styles.arrow}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  profileIcon: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 10,
    alignItems: 'center',
  },
  tarbush: {
    position: 'absolute',
    bottom: 30,
    right: 5,
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  headerText: {
    fontFamily: 'RobotoBold',
    fontSize: 36,
    marginHorizontal: 30,
    // marginTop: 20,
    marginBottom: 15,
    padding: 7,
    color: '#000',
  },
  horizontalScroll: {
    paddingLeft: 10,
  },
  horizontalContent: {
    paddingRight: 10,
    marginBottom: 40,
  },
  optionBox: {
    width: 100,
    height: 100,
    backgroundColor: '#fac75c',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    marginBottom: 25,
    marginLeft: 12,
  },
  optionImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  optionText: {
    fontSize: 10,
    color: '#fff',
    textAlign: 'center',
  },
  verticalScroll: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  detailBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 140,
    backgroundColor: '#fac75c',
    borderRadius: 30,
    marginVertical: 9,
    padding: 15,
    position: 'relative',
  },
  detailImage: {
    position: 'absolute',
    width: 220,
    height: 140,
    borderRadius: 30,
    left: -10,
  },
  detailText: {
    marginLeft: 170,
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
  },
  arrow: {
    position: 'absolute',
    left: 330,
    bottom: 60,
  },
  brownBox: {
    backgroundColor: '#9a370e',
  },
});
