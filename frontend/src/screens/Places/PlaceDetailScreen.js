import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { launchImageLibrary } from 'react-native-image-picker';
import { useRoute } from '@react-navigation/native';
import { favoritePlaces } from '../Favorites/FavoriteStorage';

export default function PlaceDetailScreen() {
  const [isFavourite, setIsFavourite] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [selectedStar, setSelectedStar] = useState(0);
  const [image, setImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');

  const route = useRoute();
  const { id } = route.params;

  const starArray = [1, 2, 3, 4, 5];

  const sampleImages = [
    require('../../assets/images/jbeil.jpeg'),
  ];

  const handleFavouriteToggle = () => {
    const newStatus = !isFavourite;
    setIsFavourite(newStatus);

    if (newStatus) {
      const alreadyAdded = favoritePlaces.find(p => p.id === id);
      if (!alreadyAdded) {
        favoritePlaces.push({
          id: id,
          name: `Place Name ${id}`,
          image: require('../../assets/images/jbeil.jpeg'),
        });
      }
    }
  };

  const handleImagePick = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: false,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const asset = response.assets && response.assets[0];
        if (asset) {
          setImage(asset.uri);
        }
      }
    });
  };

  const handleSubmit = () => {
    console.log('Review submitted:', {
      stars: selectedStar,
      reviewText,
      date: selectedDate,
      image,
    });

    setModalVisible(false);
    setSelectedStar(0);
    setReviewText('');
    setImage(null);
    setSelectedDate('');
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Place Name {id}</Text>
        <View style={styles.headerImageContainer}>
          <Image
            source={require('../../assets/images/jbeil.jpeg')}
            style={styles.headerImage}
          />
          <TouchableOpacity style={styles.mapButton}>
            <Text style={styles.mapButtonText}>View on map</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.galleryRow}>
          {sampleImages.map((img, index) => (
            <Image key={index} source={img} style={styles.galleryImage} />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.descriptionText}>
          This is a brief description about the place. It can include location,
          highlights, history, and more.
        </Text>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionButton} onPress={handleFavouriteToggle}>
            <Text style={styles.actionText}>Add To Favourite</Text>
            <AntDesign
              name={isFavourite ? 'heart' : 'hearto'}
              size={20}
              color={isFavourite ? '#FAC75C' : 'black'}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.actionText}>Rating & Review</Text>
            <Entypo name="chevron-right" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal Sheet */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeX}>
              <Text style={styles.xText}>✕</Text>
            </TouchableOpacity>

            <View style={styles.profileSection}>
              <Image
                source={{ uri: 'https://your-image-url.com/image.jpg' }}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.name}>Baytna</Text>
                <Text style={styles.location}>Tripoli</Text>
              </View>
            </View>

            <Text style={styles.label}>How would you rate your experience?</Text>
            <View style={styles.stars}>
              {starArray.map((star) => (
                <TouchableOpacity key={star} onPress={() => setSelectedStar(star)}>
                  <Text style={[styles.star, star <= selectedStar && styles.filledStar]}>★</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={styles.modalInput1}
              placeholder="Write your review..."
              multiline
              value={reviewText}
              onChangeText={setReviewText}
              maxLength={200}
            />
            <Text style={styles.charCount}>{reviewText.length}/200 characters</Text>

            <Text style={styles.label}>Upload a photo (Optional)</Text>
            <TouchableOpacity style={styles.uploadButton} onPress={handleImagePick}>
              <Text style={styles.uploadText}>Upload</Text>
            </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={styles.previewImage} />}

            <Text style={styles.label}>When did you visit?</Text>
            <TextInput
              style={[styles.modalInput, { marginBottom: 0 }]}
              placeholder="Enter visit date (e.g. July 2025)"
              value={selectedDate}
              onChangeText={setSelectedDate}
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerImageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  headerImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  mapButton: {
    position: 'absolute',
    bottom: 80,
    right: 120,
    backgroundColor: '#FAC75C',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  mapButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  galleryRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  galleryImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 8,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 6,
  },
  descriptionText: {
    fontSize: 14,
    color: '#555',
  },
  actionsRow: {
flexDirection: 'column',
gap: 12,         
alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  
  },
  actionText: {
    fontSize: 16,
    marginRight:200,
    marginTop:50,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    minHeight: '100%',
  },
  closeX: {
    alignSelf: 'flex-end',
  },
  xText: {
    fontSize: 20,
    color: '#333',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  location: {
    color: '#666',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  stars: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  star: {
    fontSize: 54,
    color: '#ccc',
    textAlign:'center',
    marginHorizontal: 10,
  },
  filledStar: {
    color: '#FAC75C',
  },
  modalInput1: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    height: 100,
  },
    modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    height: 40,
  },
  charCount: {
    alignSelf: 'flex-end',
    color: '#888',
    fontSize: 12,
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    width:90,
    marginTop:20,
    borderWidth:1,
 
  },
  uploadText: {
    color: '#333',
  },
  previewImage: {
    width: '100%',
    height: 150,
    marginTop: 10,
    borderRadius: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 120,
  },
  saveButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 50,
    flex: 1,
    borderWidth:1,
    marginRight: 8,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#FAC75C',
    padding: 12,
    borderRadius: 50,
    flex: 1,
      borderWidth:1,
    marginLeft: 8,
    alignItems: 'center',
  },
  saveText: {
    color: '#333',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
