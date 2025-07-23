// SettingsScreen.js
import React, { useState } from 'react';
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

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [isLightMode, setIsLightMode] = useState(true);

  // ربط كل بند في الإعدادات باسم الشاشة التي سينتقل إليها
  const settingsItems = [
    { key: 'languages',     label: 'Languages',        icon: 'language',       screen: 'Languages' },
    { key: 'howToUse',      label: 'How to use',       icon: 'info-outline',   screen: 'HowToUse' },
    { key: 'helpSupport',   label: 'Help and Support', icon: 'help-outline',   screen: 'HelpSupport' },
    { key: 'privacyPolicy', label: 'Privacy policy',   icon: 'security',       screen: 'PrivacyPolicy' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* زر الرجوع */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" size={24} color="#000" />
        </TouchableOpacity>

        {/* عنوان الصفحة */}
        <Text style={styles.title}>Settings</Text>

        {/* مفتاح تغيير الوضع */}
        <View style={styles.switchContainer}>
          <Switch
            value={isLightMode}
            onValueChange={setIsLightMode}
          />
          <Text style={styles.switchLabel}>Light Mode</Text>
        </View>
      </View>

      <ScrollView>
        {settingsItems.map(item => (
          <TouchableOpacity
            key={item.key}
            style={styles.item}
            onPress={() => navigation.navigate(item.screen)}  // هنا التنقل للشاشة المناسبة
          >
            <Icon name={item.icon} size={24} color="#000" style={styles.itemIcon} />
            <Text style={styles.itemLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 20 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 30 },
  title: { fontSize: 22, fontWeight: 'bold' },
  switchContainer: { flexDirection: 'row', alignItems: 'center' },
  switchLabel: { marginLeft: 8, fontSize: 14 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  itemIcon: { marginRight: 15 },
  itemLabel: { fontSize: 16 },
});
