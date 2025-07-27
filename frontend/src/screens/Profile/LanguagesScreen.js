import React, { useState } from 'react';
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

const languages = [
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
];

const LanguagesScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const selectLanguage = (code) => {
    setSelectedLanguage(code);
    // Add your localization logic here
  };

  const renderItem = ({ item }) => {
    const isSelected = item.code === selectedLanguage;
    return (
      <TouchableOpacity
        style={[
          styles.item,
          { backgroundColor: isSelected ? theme.icon : theme.card },
        ]}
        onPress={() => selectLanguage(item.code)}
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
