import React from 'react';
import { View, TouchableOpacity, Linking, StyleSheet, Alert, Platform } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

const SocialIcons = ({ facebookLink, instagramLink, isResto, menuLink }) => {

  const openLink = async (url) => {
    if (!url) return;

    try {
      await Linking.openURL(url);
        if (url.includes("#")) {
      const parts = url.split("#");
 
      url = `${parts[0]}/${parts[1]}`;
    }
    } catch (err) {
      console.error("Failed to open URL:", err);
      Alert.alert("Error", "Unable to open the link.");
    }
  };

  const openInstagram = async (url) => {
    if (!url) return;

    // Attempt to open Instagram app first
    const usernameMatch = url.match(/instagram\.com\/([a-zA-Z0-9._]+)/);
    const username = usernameMatch ? usernameMatch[1] : null;
    const appUrl = username ? `instagram://user?username=${username}` : url;

    try {
      const supported = await Linking.canOpenURL(appUrl);
      if (supported) {
        Linking.openURL(appUrl);
      } else {
        Linking.openURL(url); 
      }
    } catch (err) {
      console.error('Failed to open Instagram:', err);
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.container}>
      {facebookLink && (
        <TouchableOpacity onPress={() => openLink(facebookLink)}>
          <FontAwesome name="facebook" size={20} color="#4267B2" />
        </TouchableOpacity>
      )}

      {instagramLink && (
        <TouchableOpacity onPress={() => openInstagram(instagramLink)}>
          <Entypo name="instagram" size={20} color="#C13584" />
        </TouchableOpacity>
      )}

      {isResto && menuLink && (
        <TouchableOpacity onPress={() => openLink(menuLink)}>
          <Entypo name="menu" size={20} color="#000" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 15,
    padding: 10,
    marginTop: 10,
  },
});

export default SocialIcons;
