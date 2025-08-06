import React, { useEffect, useState } from 'react';
import PlacesSection from '../components/PlaceScreens';
import { useSelector, useDispatch } from 'react-redux';
import i18n from '../locales/i18n';

const Restaurants = () => {
  const [searchValue, setSearchValue] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const data = useSelector(state => state.places.all);
  const dispatch = useDispatch();

  const getRestaurant = async (searchTerm = '') => {
    try {
      const filtered = data.filter(item => item.serviceType === 'restaurant');
      setRestaurants(filtered);
      dispatch({
        type: 'SET_RESTAURANTS',
        payload: filtered,
      });
    } catch (error) {
      console.log('Error fetching restaurants:', error);
    }
  };

  const handleSearch = () => {
    getData(searchValue);
  };
  useEffect(() => {
    getRestaurant();
  }, []);

  return (
    <PlacesSection
      title={i18n.t('restaurants')}
      headerColor="#FAC75C"
      headerImage={require('../../assets/images/pizza.png')}
      data={restaurants}
      onSearch={handleSearch}
      searchValue={searchValue}
      onSearchChange={setSearchValue}
    />
  );
};

export default Restaurants;