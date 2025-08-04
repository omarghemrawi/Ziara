import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../Theme/Theme';
import i18n from '../locales/i18n';

const SUPPORT_EMAIL = 'support@example.com'; // change to support email

const HelpSupportScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [message, setMessage] = useState('');

  const sendEmail = () => {
    if (!message.trim()) {
      Alert.alert('Please enter a message before sending.');
      return;
    }

    const subject = encodeURIComponent('Support Request from App');
    const body = encodeURIComponent(message);

    const mailtoUrl = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;

    Linking.canOpenURL(mailtoUrl)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Email client not available on this device');
        } else {
          Linking.openURL(mailtoUrl);
          setMessage(''); // clear message 
        }
      })
      .catch((err) => Alert.alert('An error occurred', err.message));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <View style={[styles.header, { borderBottomColor: theme.border }]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={28} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: theme.text }]}>{i18n.t('help_and_support')}</Text>
        </View>

        <View style={styles.content}>
          <Text style={[styles.label, { color: theme.text }]}>
          {i18n.t('contact_support_message')}
          </Text>

          <TextInput
            style={[styles.textInput, { backgroundColor: theme.card, color: theme.text, borderColor: theme.border }]}
            multiline
            placeholder="Type your message here..."
            placeholderTextColor={theme.subtitle1}
            value={message}
            onChangeText={setMessage}
            textAlignVertical="top"
          />

          <TouchableOpacity style={[styles.button, { backgroundColor: theme.icon }]} onPress={sendEmail}>
            <Text style={styles.buttonText}>{i18n.t('send')}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HelpSupportScreen;

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
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 15,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
});
