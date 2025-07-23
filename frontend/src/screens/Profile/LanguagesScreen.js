// LanguagesScreen.js
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

const LanguagesScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Languages</Text>
      </View>
    </SafeAreaView>
  );
};

export default LanguagesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header:    { padding: 20, borderBottomWidth: 1, borderBottomColor: '#eee' },
  title:     { fontSize: 24, fontWeight: 'bold' },
});
