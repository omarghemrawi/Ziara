import React, { useState, useEffect,useContext } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useTheme } from '../Theme/Theme'; 
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import I18n from '../locales/i18n'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LanguageContext } from '../locales/LanguageContext';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
];


const LanguagesScreen = () => {
  const { language, changeLanguage } = useContext(LanguageContext);
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState(language || 'en');


  // useEffect(() => {
  //   // const loadLanguage = async () => {
  //   //   const savedLang = await AsyncStorage.getItem('selectedLanguage');
  //   //   if (savedLang) {
  //   //     setSelectedLanguage(savedLang);
  //   //     I18n.locale = savedLang;
  //   //   }
  //   // };
  //   // loadLanguage();
  //   setSelectedLanguage(language);
  // }, []);
    useEffect(() => {
    setSelectedLanguage(language); // update selected language when context language changes
  }, [language]);


  const selectLanguage = async (code) => {
    setSelectedLanguage(code);
      await changeLanguage(code);
    await AsyncStorage.setItem('selectedLanguage', code);
    I18n.locale = code;
  };

  const renderItem = ({ item }) => {
const isSelected = item.code === language;

    return (
      <TouchableOpacity
        style={[
          styles.item,
          { backgroundColor: isSelected ? theme.icon : theme.card },
        ]}
      onPress={() => {
  selectLanguage(item.code);
 // alert(item.code);
}}
      >
        <Text style={[styles.label, { color: theme.text }]}>{item.label}</Text>
        {isSelected && <Icon name="checkmark" size={20} color="#fff" />}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={28} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Languages</Text>
      </View>

      <FlatList
        data={languages}
        keyExtractor={(item) => item.code}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

export default LanguagesScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  list: {
    padding: 20,
  },
  item: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
  },
});
