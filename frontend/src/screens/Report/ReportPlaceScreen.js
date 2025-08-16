import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useTheme } from '../Theme/Theme';
import { useNavigation } from '@react-navigation/native';
import i18n from '../locales/i18n';
import Entypo from 'react-native-vector-icons/Entypo';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export default function ReportPlaceScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { placeId, userId } = route.params;

  const reasonsList = [
    i18n.t('hateSpeech'),
    i18n.t('offensiveLanguage'),
    i18n.t('inappropriateContent'),
    i18n.t('misleadingContent'),
  ];

  const [selectedReasons, setSelectedReasons] = useState([]);

  const toggleReason = reason => {
    if (selectedReasons.includes(reason)) {
      setSelectedReasons(selectedReasons.filter(r => r !== reason));
    } else {
      setSelectedReasons([...selectedReasons, reason]);
    }
  };

  const handleSubmit = async () => {
    if (selectedReasons.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please select at least one reason.',
        position: 'botton',
        visibilityTime: 5000,
      });
      return;
    }
    try {
      const response = await axios.post('http://192.168.0.101:5000/api/report', {
        type: 'ClientPlace',
        complainant: 'User',
        targetId: placeId,
        reportedBy: userId,
        reason: selectedReasons,
      });

      if (response.data.success) {
        Toast.show({
          type: 'success',
          text1: 'Report Submitted',
          text2: 'Thank you for your feedback',
          position: 'botton',
          visibilityTime: 5000,
        });
        navigation.goBack();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to submit the report. Please try again.',
          position: 'top',
          visibilityTime: 5000,
        });
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong. Please try again.',
        position: 'top',
        visibilityTime: 5000,
      });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Entypo name="chevron-left" size={20} color="#000" />
      </TouchableOpacity>
      <Text style={[styles.title, { color: theme.text }]}>
        {' '}
        {i18n.t('reportPlace')}
      </Text>
      <Text style={[styles.subtitle, { color: theme.text }]}>
        {i18n.t('selectReason')}
      </Text>

      <ScrollView contentContainerStyle={styles.scroll}>
        {reasonsList.map((reason, index) => {
          const selected = selectedReasons.includes(reason);
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.reasonBox,
                {
                  backgroundColor: selected ? '#FAC75C' : '#f0f0f0',
                  borderColor: selected ? '#e0a500' : '#ccc',
                },
              ]}
              onPress={() => toggleReason(reason)}
            >
              <Text
                style={[
                  styles.reasonText,
                  { color: selected ? '#fff' : theme.text },
                ]}
              >
                {reason}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>{i18n.t('submitReport')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scroll: {
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    marginBottom: 20,
  },
  reasonBox: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 15,
  },
  reasonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#FAC75C',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 'auto',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
