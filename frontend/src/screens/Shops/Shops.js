import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PlacesSection from '../components/PlaceScreens';

const Shops = () => {
  const [searchValue, setSearchValue] = useState('');

  const [shops, setShops] = useState([]);
  const data = useSelector(state => state.places.all);

  const getHotel = async (searchTerm = '') => {
    try {
      setShops(data.filter(item => item.serviceType === 'shop'));
    } catch (error) {
      console.log('Error fetching Hotels:', error);
    }
  };

  const handleSave = () => {
    console.log('Save clicked');
  };

  useEffect(() => {
    getHotel();
  }, []);

  return (
    <PlacesSection
      title="Shops & Souvenirs"
      headerColor="#9a370e"
      headerImage={require('../../assets/images/kasset.png')}
      data={shops}
      onSave={handleSave}
      searchValue={searchValue}
      onSearchChange={setSearchValue}
    />
  );
};

export default Shops;
