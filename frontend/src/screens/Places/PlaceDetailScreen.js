import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { useRoute } from '@react-navigation/native';

export default function PlaceDetailScreen() {
  const sampleImages = [
    require('../../assets/images/jbeil.jpeg'),// if there any more images
  
  ];
   const route = useRoute();
  const { id } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Header Image */}
      <Text style={styles.title}>Place Name {id} </Text>
      <View style={styles.headerImageContainer}>
        <Image
          source={require('../../assets/images/jbeil.jpeg')}// top image
          style={styles.headerImage}
        />
        <TouchableOpacity style={styles.mapButton}>
          <Text style={styles.mapButtonText}>View on map</Text>
        </TouchableOpacity>
      </View>

      {/* Gallery */}
      <View style={styles.galleryRow}>
        {sampleImages.map((img, index) => (
          <Image key={index} source={img} style={styles.galleryImage} />
        ))}
      </View>

      {/* Description */}
      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.descriptionText}>
        This is a brief description about the place. It can include location, highlights, history, and more.
      </Text>

      {/* Action Buttons */}
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Add To Favourite</Text>
          <AntDesign name="hearto" size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Rating & Review</Text>
          <Entypo name="chevron-right" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  headerImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
  },
  mapButton: {
    position: 'absolute',
    bottom: 70,
    left: 120,
    backgroundColor: '#FAC75C',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  mapButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  galleryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  galleryImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
  },
  actionsRow: {
    flexDirection: 'column',
    gap: 40,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  actionText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom:30,
  },
});
