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
import i18n from '../locales/i18n';

const HowToUseScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const instructions = [
 i18n.t('step1'),
  i18n.t('step2'),
   i18n.t('step3'),
    i18n.t('step4'),
     i18n.t('step5'),
      i18n.t('step6'),

  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
          <Icon name="chevron-back" size={28} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>{i18n.t('how_to_use')}</Text>
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