// HowToUseScreen.js
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

const HowToUseScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>How to use</Text>
      </View>
    </SafeAreaView>
  );
};

export default HowToUseScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header:    { padding: 20, borderBottomWidth: 1, borderBottomColor: '#eee' },
  title:     { fontSize: 24, fontWeight: 'bold' },
});
