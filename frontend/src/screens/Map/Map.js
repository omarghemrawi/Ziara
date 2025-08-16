import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen({ route }) {
  const { locationUrl, title } = route?.params || {};
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    const processUrl = async () => {
      if (!locationUrl) return;

      let finalUrl = locationUrl;

      // 1️⃣ Resolve short URLs
      if (locationUrl.includes("maps.app.goo.gl")) {
        finalUrl = await resolveShortUrl(locationUrl);
      }

      // 2️⃣ Try to extract coordinates
      let extracted = extractLatLng(finalUrl);

      // 3️⃣ Try iframe format if normal extraction failed
      if (!extracted && finalUrl.includes("embed?pb=")) {
        extracted = extractLatLngFromEmbed(finalUrl);
      }

      if (extracted) {
        setCoords(extracted);
      } else {
        console.log("No coordinates found in:", finalUrl);
      }
    };

    processUrl();
  }, [locationUrl]);

  if (!coords) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>No valid location found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title || 'Location'}</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={coords} title={title || 'Pinned Location'} />
      </MapView>
    </View>
  );
}

// -------------------------
// Extract from standard Google Maps URLs
// -------------------------
// Extract from standard Google Maps URLs
const extractLatLng = (url) => {
  // @lat,long
  let regex = /@([-+]?\d+\.\d+),([-+]?\d+\.\d+)/;
  let match = url.match(regex);
  if (match) return { latitude: parseFloat(match[1]), longitude: parseFloat(match[2]) };

  // ?q=lat,long
  regex = /[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/;
  match = url.match(regex);
  if (match) return { latitude: parseFloat(match[1]), longitude: parseFloat(match[2]) };

  // !3dlat!4dlong (Google Place links)
  regex = /!3d([-+]?\d+\.\d+)!4d([-+]?\d+\.\d+)/;
  match = url.match(regex);
  if (match) return { latitude: parseFloat(match[1]), longitude: parseFloat(match[2]) };

  return null;
};

// -------------------------
// Extract from iframe embed URLs
const extractLatLngFromEmbed = (url) => {
  const longMatch = url.match(/!2d([-+]?\d+\.\d+)/);
  const latMatch = url.match(/!3d([-+]?\d+\.\d+)/);
  if (latMatch && longMatch) return { latitude: parseFloat(latMatch[1]), longitude: parseFloat(longMatch[1]) };
  return null;
};

// -------------------------
// Resolve short URLs (maps.app.goo.gl → expanded URL)
const resolveShortUrl = async (shortUrl) => {
  try {
    const response = await fetch(shortUrl, { method: "HEAD" });
    return response.url;
  } catch (e) {
    console.log("Error resolving short URL:", e);
    return shortUrl;
  }
};

// -------------------------
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 10 },
  map: { flex: 1, width: '100%', marginTop: 10 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold' },
  text: { fontSize: 16 },
});
