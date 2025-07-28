
import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View } from 'react-native';

export default function MapScreen({ route }) {
  console.log('Received route params:', route?.params); 
  const { latitude, longitude, title } = route?.params || {};

  if (!latitude || !longitude) {
    return <View><Text>Invalid location data</Text></View>;
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} title={title} />
      </MapView>
    </View>
  );
}
