import React from 'react';
import { View, Text, Button, StyleSheet, Linking } from 'react-native';

export default function MapScreen({ route }) {
  const { locationUrl, title } = route?.params || {};

  const handleOpenLink = async () => {
    if (!locationUrl) return;

    const supported = await Linking.canOpenURL(locationUrl);
    if (supported) {
      await Linking.openURL(locationUrl);
    } else {
      alert('Cannot open this URL: ' + locationUrl);
    }
  };

  if (!locationUrl) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>No location URL provided</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title || 'Go to location'}</Text>
   

      <Button title=">" onPress={handleOpenLink} color="#FAC75C"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  text: {
    fontSize: 18,
  },
});
