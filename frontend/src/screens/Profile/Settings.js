import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
//
export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSwitch = () => setIsDarkMode(prev => !prev);

  const themeStyles = isDarkMode ? darkTheme : lightTheme;

  return (
    <SafeAreaView style={[styles.container, themeStyles.container]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header with toggle */}
        <View style={styles.header}>
          <Text style={[styles.headerText, themeStyles.text]}>Settings</Text>
          <View style={styles.toggleContainer}>
            <Text style={[styles.modeLabel, themeStyles.text]}>
              {isDarkMode ? 'Dark' : 'Light'} Mode
            </Text>
            <Switch
              value={isDarkMode}
              onValueChange={toggleSwitch}
              thumbColor={isDarkMode ? '#f4f3f4' : '#f4f3f4'}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
            />
          </View>
        </View>

        {/* Add other settings options here */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, themeStyles.text]}>
            Notifications
          </Text>
          <Text style={[styles.sectionDescription, themeStyles.text]}>
            Manage your notification preferences
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, themeStyles.text]}>Privacy</Text>
          <Text style={[styles.sectionDescription, themeStyles.text]}>
            Manage your privacy settings
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const lightTheme = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  text: {
    color: '#000',
  },
});

const darkTheme = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
  },
  text: {
    color: '#fff',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modeLabel: {
    marginRight: 10,
    fontSize: 16,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  sectionDescription: {
    fontSize: 14,
    marginTop: 4,
  },
});
