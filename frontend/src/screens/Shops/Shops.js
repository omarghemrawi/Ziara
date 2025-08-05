import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PlacesSection from '../components/PlaceScreens';
import i18n from '../locales/i18n';

const Shops = () => {
  const [searchValue, setSearchValue] = useState('');
  const [shops, setShops] = useState([]);
  const data = useSelector(state => state.places.all);
  const dispatch = useDispatch();

  const getHotel = async (searchTerm = '') => {
    try {
      const filtered = data.filter(item => item.serviceType === 'shop');
      setShops(filtered);
      dispatch({
        type: 'SET_SHOPS',
        payload: filtered,
      });
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
      title={i18n.t('ShopsAndSouvenirs')}
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
