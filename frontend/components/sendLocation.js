import React, { useEffect, useRef } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

const SendLocation = () => {
  // Used to store the watch ID so we can stop watching later
  const watchId = useRef(null);

  // Ask for location permission
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'Ziara needs your location to find nearby places',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    // iOS permissions are handled in Info.plist
    return true;
  };

  // Send the latitude and longitude to the backend
  const sendLocationToBackend = async (latitude, longitude) => {
    try {
      const response = await axios.post(
        'https://your-backend-url.com/api/nearby',
        {
          latitude,
          longitude,
        },
      );
      console.log('Nearby places:', response.data);
    } catch (err) {
      console.error('Error sending location:', err.message);
    }
  };

  useEffect(() => {
    // Start watching the user's location
    const startWatching = async () => {
      const permission = await requestLocationPermission();
      if (!permission) return; // Stop if permission is denied

      watchId.current = Geolocation.watchPosition(
        position => {
          const { latitude, longitude } = position.coords;
          console.log('Updated coords:', latitude, longitude);
          sendLocationToBackend(latitude, longitude);
        },
        error => {
          console.error('Location watch error:', error.message);
        },
        {
          enableHighAccuracy: true, // Use GPS if available
          distanceFilter: 50, // Only update if the user moved 50 meters
          interval: 10000, // Try to get location every 10 seconds
          fastestInterval: 5000, // Minimum time between updates (Android only)
        },
      );
    };

    startWatching();

    // Stop watching when the component unmounts
    return () => {
      if (watchId.current !== null) {
        Geolocation.clearWatch(watchId.current);
      }
    };
  }, []);

  // This component doesn't show any UI
  return null;
};

export default SendLocation;
