import React, { useEffect, useRef } from 'react';
import { PermissionsAndroid, Platform, Alert, Linking } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { useDispatch } from 'react-redux';

// The purpose of this component is to track the user's location while the app is open
// and save it in Redux. When the app is closed, tracking will stop automatically.
// and should put in main(App.js ==  with app navigation)
const SendLocation = () => {
  const dispatch = useDispatch();
  const watchId = useRef(null);

  // Ask Android for location permission
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Allow Location Access',
          message:
            'Ziara needs your location to show nearby attractions and restaurants.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  // Start watching the user's location
  const startWatchingLocation = async () => {
    const permission = await requestLocationPermission();
    if (!permission) return;

    watchId.current = Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;

        if (latitude !== null && longitude !== null) {
          dispatch({
            type: 'SET_COORDINATES',
            payload: { latitude, longitude },
          });
        }
      },
      error => {
        if (error.code === 2) {
          Alert.alert(
            'GPS is Disabled',
            'Please enable location services (GPS) in your device settings.',
            [
              { text: 'Open Settings', onPress: () => Linking.openSettings() },
              { text: 'Cancel', style: 'cancel' },
            ],
          );
        } else {
          console.error('Location Error:', error.message);
        }
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10, // Only update when user moves 10 meters
        interval: 10000, // Android only: minimum time between updates
        fastestInterval: 5000, // Android only: fastest rate of updates
      },
    );
  };

  useEffect(() => {
    startWatchingLocation();

    // Stop tracking when component unmounts
    return () => {
      if (watchId.current !== null) {
        Geolocation.clearWatch(watchId.current);
        console.log('Location tracking stopped');
      }
    };
  }, []);

  return null; // No UI needed
};

export default SendLocation;
