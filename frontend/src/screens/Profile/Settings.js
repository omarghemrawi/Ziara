import {useContext} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../Theme/Theme';
import i18n from '../locales/i18n';
import { useLanguage } from '../locales/LanguageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';



const SettingsScreen = () => {
  const navigation = useNavigation();
  const { isLightMode, toggleTheme, theme } = useTheme();
  const handleLogout = async () => {
  try {
    // Clear stored token or user info
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user'); 
   
    navigation.replace('Login');
  } catch (error) {
    console.error('Logout error:', error);
  }
};


const { language } = useLanguage(); 
console.log(language);
  const settingsItems = [
    {
      key: 'languages',
      label: i18n.t('languages'),
      icon: 'language',
      screen: 'Languages',
    },
    {
      key: 'howToUse',
      label: i18n.t('how_to_use'),
      icon: 'info-outline',
      screen: 'HowToUse',
    },
    {
      key: 'helpSupport',
      label:  i18n.t('help_and_support'),
      icon: 'help-outline',
      screen: 'HelpSupport',
    },
    {
      key: 'privacyPolicy',
      label: i18n.t('privacy_policy'),
      icon: 'security',
      screen: 'PrivacyPolicy',
    },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icon name="arrow-back-ios" size={24} color={theme.text} />
        </TouchableOpacity>

        <Text style={[styles.title, { color: theme.text }]}>{i18n.t('settings')}</Text>

        <View style={styles.switchContainer}>
          <Switch value={!isLightMode} onValueChange={toggleTheme} />
          <Text style={[styles.switchLabel, { color: theme.text }]}>
            {isLightMode ? i18n.t('light_mode') : i18n.t('dark_mode')}
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
            <Icon
              name={item.icon}
              size={24}
              color={theme.text}
              style={styles.itemIcon}
            />
            <Text style={[styles.itemLabel, { color: theme.text }]}>
              {item.label}
            </Text>
          </TouchableOpacity>
          
        ))}
        {/* Logout Button */}
  <TouchableOpacity
    style={[styles.item, { borderBottomColor: theme.border }]}
    onPress={handleLogout}
  >
    <Icon name="logout" size={24} color={theme.text} style={styles.itemIcon} />
    <Text style={[styles.itemLabel, { color: theme.text }]}>
      {i18n.t('logout')}
    </Text>
  </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
    marginTop: 20,
  },
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