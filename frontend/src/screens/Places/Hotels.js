import React, { useState, useEffect } from 'react';
import PlacesSection from '../components/PlaceScreens';
import { useSelector } from 'react-redux';

const Hotels = () => {
  const [searchValue, setSearchValue] = useState('');
  const [hotels, setHotels] = useState([]);
  const data = useSelector(state => state.places.all);

  const getHotel = async (searchTerm = '') => {
    try {
      setHotels(data.filter(item => item.serviceType === 'hotel'));
    } catch (error) {
      console.log('Error fetching Hotels:', error);
    }
  };
  useEffect(() => {
    getHotel();
  }, []);

  return (
    <PlacesSection
      title="Hotels"
      headerColor="#9a370e"
      headerImage={require('../../assets/images/hotel.png')}
      data={hotels}
      searchValue={searchValue}
      onSearchChange={setSearchValue}
    />
  );
};

export default Hotels;
