import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../Theme/Theme'; 

const HowToUseScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const instructions = [
    '📱 Open the app and create your account or log in.',
    '🧭 Use the bottom tabs to navigate easily through features.',
    '🔍 Search for places to explore new locations.',
    '⭐ Tap on a place to view details and save it to favorites.',
    '🌗 Switch between dark and light mode in Settings.',
    '💬 Contact support for help from the Settings page.',
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
          <Icon name="chevron-back" size={28} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>How to Use</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {instructions.map((step, index) => (
          <View key={index} style={[styles.card, { backgroundColor: theme.card }]}>
            <Text style={[styles.instruction, { color: theme.text }]}>{step}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HowToUseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginLeft: 10,
  },
  content: {
    padding: 20,
  },
  card: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  instruction: {
    fontSize: 16,
    lineHeight: 24,
  },
});
