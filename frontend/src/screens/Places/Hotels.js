import React, { useState, useEffect } from 'react';
import PlacesSection from '../components/PlaceScreens';
import { useSelector, useDispatch } from 'react-redux';

const Hotels = () => {
  const [searchValue, setSearchValue] = useState('');
  const [hotels, setHotels] = useState([]);
  const data = useSelector(state => state.places.all);
  const dispatch = useDispatch();

  const getHotel = async (searchTerm = '') => {
    try {
      const filtered = data.filter(item => item.serviceType === 'hotel');
      setHotels(filtered);
      dispatch({
        type: 'SET_HOTELS',
        payload: filtered,
      });
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
