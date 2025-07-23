import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

export default function NearbyScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nearby</Text>
      </View>
      {/* TODO: add your “Nearby” map/list here */}
      <View style={styles.body}>
        <Text style={styles.placeholder}>Your nearby content goes here…</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header:    { padding: 20, borderBottomWidth: 1, borderBottomColor: '#eee' },
  title:     { fontSize: 24, fontWeight: 'bold' },
  body:      { flex: 1, justifyContent: 'center', alignItems: 'center' },
  placeholder: { fontSize: 16, color: '#888' },
});
