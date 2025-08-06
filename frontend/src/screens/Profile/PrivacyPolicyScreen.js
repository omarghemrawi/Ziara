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
          Privacy Policy
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          We respect your privacy and are committed to protecting your personal
          data. This privacy policy explains how we collect, use, and safeguard
          your information when you use our app.
        </Text>

        <Text style={[styles.heading, { color: theme.text }]}>
          1. Information We Collect
        </Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          We may collect personal information such as your name, email address,
          and usage data when you register or interact with the app.
        </Text>

        <Text style={[styles.heading, { color: theme.text }]}>
          2. How We Use Your Information
        </Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          Your information helps us provide, improve, and personalize our
          services, respond to your requests, and send important updates.
        </Text>

        <Text style={[styles.heading, { color: theme.text }]}>
          3. Data Sharing and Security
        </Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          We do not sell or rent your personal data. We may share information
          with trusted service providers who assist us in operating the app. We
          implement reasonable security measures to protect your data.
        </Text>

        <Text style={[styles.heading, { color: theme.text }]}>
          4. Your Choices
        </Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          You can manage your personal information and communication preferences
          within the app settings. You can also contact us to request deletion
          of your data.
        </Text>

        <Text style={[styles.heading, { color: theme.text }]}>
          5. Children’s Privacy
        </Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          Our app is not intended for children under 13 years old. We do not
          knowingly collect data from children without parental consent.
        </Text>

        <Text style={[styles.heading, { color: theme.text }]}>
          6. Changes to This Policy
        </Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          We may update this privacy policy periodically. We encourage you to
          review it regularly for any changes.
        </Text>

        <Text style={[styles.heading, { color: theme.text }]}>
          7. Contact Us
        </Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          If you have any questions or concerns about this policy, please
          contact us at support@example.com.
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
