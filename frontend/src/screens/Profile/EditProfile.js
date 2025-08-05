import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import { uploadImageToCloudinary } from '../../utils/cloudinaryUpload';
import { useNavigation } from '@react-navigation/native';
import Config from 'react-native-config';
import axios from 'axios';
import { refreshUser } from '../../redux/actions/user.action';
import i18n from '../locales/i18n';

export default function EditProfileScreen({ navigation }) {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [about, setAbout] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigation();

  const user = useSelector(state => state.user.user);

  // console.log(process.env.CLOUD_NAME);
  console.log(Config.UPLOAD_PRESET);

  const handleEdit = async () => {
    if (!name) {
      alert('Please Enter a Name');
      return;
    }
    try {
      let imageUrl = '';
      if (profileImage !== null) {
        imageUrl = await uploadImageToCloudinary(profileImage);
      } else {
        imageUrl = user.profileImage;
      }
      const res = await axios.post('http://10.0.2.2:5000/user/edit-profile', {
        profileImage: imageUrl,
        userId: user._id,
        about,
        username: name,
      });
      dispatch(refreshUser(user._id));
      navigate.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const handleImagePick = () => {
    // launchImageLibrary({ mediaType: 'photo' }, response => {
    //   if (response.assets && response.assets.length > 0) {
    //     setProfileImage(response.assets[0].uri);
    //   }
    // });

    const options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const asset = response.assets && response.assets[0];
        if (asset) {
          setProfileImage(asset.uri);
        }
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Entypo name="chevron-left" size={28} color="#000" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>{i18n.t('edit_profile')}</Text>

      {/* Profile Image with Camera Icon */}
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri:
              profileImage ||
              user.profileImage ||
              'https://example.com/default.jpg',
          }}
          style={styles.profileImage}
        />
        <TouchableOpacity onPress={handleImagePick} style={styles.cameraIcon}>
          <FontAwesome name="camera" size={10} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <Text style={styles.label}>{i18n.t('name')}</Text>
      <TextInput
        style={styles.input}
        placeholder={'Current ' + user.username}
        placeholderTextColor="#777"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>{i18n.t('about_you')}</Text>
      <TextInput
        style={styles.textarea}
        placeholder="Write some details about yourself"
        placeholderTextColor="#777"
        value={about}
        onChangeText={setAbout}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity onPress={handleEdit}>
        <Text style={styles.button}>{i18n.t('save')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 1,
    marginTop: 10,
  
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ddd',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 130,
    backgroundColor: '#000',
    padding: 5,
    borderRadius: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#FAFAF0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 14,
  },
  textarea: {
    backgroundColor: '#FAFAF0',
    padding: 10,
    borderRadius: 8,
    height: 100,
    textAlignVertical: 'top',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#FAC75C',
    width: 100,
    textAlign: 'center',
    padding: 10,
    margin: 10,
    borderRadius:30,
      color:'white',
      
  },
});
