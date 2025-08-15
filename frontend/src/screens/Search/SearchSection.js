import React, { useState, useEffect } from 'react';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useTheme } from '../Theme/Theme';
import { useSelector } from 'react-redux';
import i18n from '../locales/i18n';

const SearchSection = ({ title, headerColor, headerImage }) => {
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState('');
  const { theme } = useTheme();
  const [places, setPlaces] = useState([]);
  const data = useSelector(state => state.places.all);

  const getPlaces = (searchTerm = '') => {
    try {
      const lowerSearch = searchTerm.toLowerCase();

      const filtered = data.filter(item => {
        if (!lowerSearch) return true;

        const nameMatch = item.name?.toLowerCase().includes(lowerSearch);
        const cityMatch = item.city?.toLowerCase().includes(lowerSearch);

        return nameMatch || cityMatch;
      });

      setPlaces(filtered);
    } catch (error) {
      console.log('Error filtering places:', error);
    }
  };

  useEffect(() => {
    getPlaces(searchValue);
  }, [searchValue, data]);

  //fill the stars depending on the rate of the place
  const renderStars = rating => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const totalStars = 5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Ionicons key={`full-${i}`} name="star" size={16} color="#FAC75C" />,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Ionicons key="half" name="star-half" size={16} color="#FAC75C" />,
      );
    }

    const remaining = totalStars - stars.length;
    for (let i = 0; i < remaining; i++) {
      stars.push(
        <Ionicons
          key={`empty-${i}`}
          name="star-outline"
          size={16}
          color="#FAC75C"
        />,
      );
    }

    return stars;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: headerColor }]}>
        <Image
          source={headerImage}
          style={[
            styles.headerImage,
            title === i18n.t('search') && { width: 110 },
          ]}
        />
        <View style={styles.headerTitleRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="chevron-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={i18n.t('search_by_name_or_city')}
            value={searchValue}
            onChangeText={setSearchValue}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.grid}>
        {places.length === 0 ? (
          <Text style={styles.noResultsText}>No results found</Text>
        ) : (
          places.map(item => (
            <TouchableOpacity
              key={item._id || item.id}
              style={styles.card}
              onPress={() =>
                navigation.navigate('PlaceDetails', {
                  id: item._id,
                  type: item.type,
                })
              }
              activeOpacity={0.8}
            >
              <Image
                source={{ uri: item.profile }}
                style={styles.imageItem}
                resizeMode="cover"
              />

              <Text style={styles.cardTitle}>{item.name}</Text>
              <View style={styles.ratingContainer}>
                {renderStars(item.rate)}
                <Text style={styles.ratingText}> {item.rate} / 5</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
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
    backgroundColor: '#FFFAFA',
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
    fontSize: 13,
    color: '#333',
  },
  ratingContainer: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
  },
  ratingText: {
    fontSize: 10,
    marginLeft: 5,
    color: '#555',
  },
  noResultsText: {
    flex: 1,
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#888',
    width: '100%',
  },
});

export default SearchSection;
