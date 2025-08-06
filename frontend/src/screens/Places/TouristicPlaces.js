import React, { useState, useEffect } from 'react';
import PlacesSection from '../components/PlaceScreens';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import i18n from '../locales/i18n';

const TouristicPlaces = () => {
  const [searchValue, setSearchValue] = useState('');
  const [touristics, setTouristics] = useState([]);
  const data = useSelector(state => state.places.all);
  const dispatch = useDispatch();

  const getTouristic = async (searchTerm = '') => {
    try {
      const filtered = data.filter(item => item.type === 'touristic');
      setTouristics(filtered);
      dispatch({
        type: 'SET_TOURISTIC_PLACES',
        payload: filtered,
      });
    } catch (error) {
      console.log('Error fetching touristic:', error);
    }
  };

  const handleDiscover = () => {
    console.log('Discover clicked');
  };

  const handleSave = () => {
    console.log('Save clicked');
  };

  useEffect(() => {
    getTouristic();
  }, []);

  return (
    <PlacesSection
      title={i18n.t('touristicPlaces')}
      headerColor="#FAC75C"
      headerImage={require('../../assets/images/touristicPlaces.png')}
      data={touristics}
      onDiscover={handleDiscover}
      onSave={handleSave}
      searchValue={searchValue}
      onSearchChange={setSearchValue}
    />
  );
};

export default TouristicPlaces;
