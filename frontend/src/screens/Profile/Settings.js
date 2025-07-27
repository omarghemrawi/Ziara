import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../Theme/Theme';


const SettingsScreen = () => {
  const navigation = useNavigation();
  const { isLightMode, toggleTheme, theme } = useTheme();

  const settingsItems = [
    { key: 'languages', label: 'Languages', icon: 'language', screen: 'Languages' },
    { key: 'howToUse', label: 'How to use', icon: 'info-outline', screen: 'HowToUse' },
    { key: 'helpSupport', label: 'Help and Support', icon: 'help-outline', screen: 'HelpSupport' },
    { key: 'privacyPolicy', label: 'Privacy policy', icon: 'security', screen: 'PrivacyPolicy' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icon name="arrow-back-ios" size={24} color={theme.text} />
        </TouchableOpacity>

        <Text style={[styles.title, { color: theme.text }]}>Settings</Text>

        <View style={styles.switchContainer}>
          <Switch value={!isLightMode} onValueChange={toggleTheme} />
          <Text style={[styles.switchLabel, { color: theme.text }]}>
            {isLightMode ? 'Light Mode' : 'Dark Mode'}
          </Text>
        </View>
      </View>


      <ScrollView>
        {settingsItems.map(item => (
          <TouchableOpacity
            key={item.key}
            style={[styles.item, { borderBottomColor: theme.border }]}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Icon name={item.icon} size={24} color={theme.text} style={styles.itemIcon} />
            <Text style={[styles.itemLabel, { color: theme.text }]}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 30 },
  title: { fontSize: 22, fontWeight: 'bold' },
  switchContainer: { flexDirection: 'row', alignItems: 'center' },
  switchLabel: { marginLeft: 8, fontSize: 14 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  itemIcon: { marginRight: 15 },
  itemLabel: { fontSize: 16 },
});
