import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useTheme } from '../Theme/Theme';
import Entypo from 'react-native-vector-icons/Entypo';

const PlacesSection = ({
  title,
  headerColor,
  headerImage,
  data,
  onSearch,
  onSearchChange,
  searchValue,
}) => {
  const navigation = useNavigation();

  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: headerColor }]}>
        <Image
          source={headerImage}
          style={[
            styles.headerImage,
            title === 'Search' && { width: 110 },
            title === 'Activity' && { width: 130, height: 160 },
            title === 'Hotels' && { width: 130, height: 140 },
          ]}
        />
        <View style={styles.headerTitleRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Entypo name="chevron-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchValue}
            onChangeText={onSearchChange}
          />
          <TouchableOpacity onPress={onSearch} style={styles.sendIcon}>
            <MaterialIcons name="send" size={22} color="#FAC75C" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.grid}>
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
<<<<<<< Updated upstream
            onPress={() => navigation.navigate('PlaceDetails', { place: item })}
=======
            onPress={() =>
              navigation.navigate('PlaceDetails', {
                id: item._id,
                serviceType: item.serviceType,
              })
            }
>>>>>>> Stashed changes
            activeOpacity={0.8}
          >
            <Image
              source={{ uri: item.profileImage }}
              style={styles.imageItem}
              resizeMode="cover"
            />
            <Text style={styles.cardTitle}>{item.businessName}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 180,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    padding: 20,

    justifyContent: 'flex-end',
  },
  headerImage: {
    width: 160,
    height: 110,
    position: 'absolute',
    top: 120,
    left: 20,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 90,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'RobotoSlabBold',
    marginLeft: 10,
  },
  searchSection: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    borderRadius: 30,
    borderColor: '#000',
    borderWidth: 1,
    height: 60,
    paddingHorizontal: 20,
    marginTop: 80,
    marginBottom: 30,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  sendIcon: {
    marginLeft: 10,
    padding: 8,
    borderRadius: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  card: {
    width: '47%',
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  imageItem: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardTitle: {
    padding: 10,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
    color: '#333',
  },
});

export default PlacesSection;
