import React from 'react';
import { View, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

const SocialIcons = ({ facebookLink, instagramLink, isResto, menuLink }) => {
  const openLink = async (url) => {
    if (url && (await Linking.canOpenURL(url))) {
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.container}>
      {facebookLink && (
        <TouchableOpacity onPress={() => openLink(facebookLink)}>
          <FontAwesome name="facebook" size={18} color="#4267B2"/>
        </TouchableOpacity>
      )}
      {instagramLink && (
        <TouchableOpacity onPress={() => openLink(instagramLink)}>
          <Entypo name="instagram" size={18} color="#C13584" />
        </TouchableOpacity>
      )}
      {isResto && menuLink && (
        <TouchableOpacity onPress={() => openLink(menuLink)}>
          <Entypo name="menu" size={18} color="#000"/>
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
    marginTop:10,
  },

});

export default SocialIcons;