import React, { useEffect, useState } from 'react';
import PlacesSection from '../components/PlaceScreens';
import { useSelector } from 'react-redux';
import i18n from '../locales/i18n';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([]);

  // Get all places from Redux store
  const allPlaces = useSelector(state => state?.places?.all || []);

  // Filter places by city based on searchValue
  const getSearchedPlaces = (searchTerm = '') => {
    if (!searchTerm) {
      // If search is empty, show all
      setData(allPlaces);
    } else {
      const filtered = allPlaces.filter(place =>
        place.location?.city?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setData(filtered);
    }
  };

  // Run filtering when searchValue changes
  useEffect(() => {
    getSearchedPlaces(searchValue);
  }, [searchValue, allPlaces]);

  // Initial load
  useEffect(() => {
    setData(allPlaces);
  }, [allPlaces]);

  return (
    <PlacesSection
       title={i18n.t('search')}
      headerColor="#9a370e"
      headerImage={require('../../assets/images/Search.png')}
      data={data}
      searchValue={searchValue}
      onSearchChange={setSearchValue}
    />
  );
};

export default Search;
