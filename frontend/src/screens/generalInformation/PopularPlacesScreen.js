import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

export default function PopularPlacesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Popular Places</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.placeholder}>List of popular places…</Text>
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
