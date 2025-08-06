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

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={28} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>
          {i18n.t('privacy_policy')}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.paragraph, { color: theme.text }]}>
       {i18n.t('intro')}
        </Text>

        <Text style={[styles.heading, { color: theme.text }]}>
       {i18n.t('section1')}
        </Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
     {i18n.t('text1')}
        </Text>

        <Text style={[styles.heading, { color: theme.text }]}>
           {i18n.t('section2')}
        </Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
            {i18n.t('text2')}
        </Text>

        <Text style={[styles.heading, { color: theme.text }]}>
         {i18n.t('section3')}
        </Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          {i18n.t('text3')}
        </Text>

        <Text style={[styles.heading, { color: theme.text }]}>
       {i18n.t('section4')}
        </Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
               {i18n.t('text4')}
        </Text>

        <Text style={[styles.heading, { color: theme.text }]}>
            {i18n.t('section5')}
        </Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
        {i18n.t('text5')}
        </Text>

        <Text style={[styles.heading, { color: theme.text }]}>
      {i18n.t('section6')}
        </Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
                {i18n.t('text6')}
        </Text>

        <Text style={[styles.heading, { color: theme.text }]}>
       {i18n.t('section7')}
        </Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          {i18n.t('text7')}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicyScreen;

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
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
  },
});