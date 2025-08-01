import React, { useState, useEffect } from 'react';
import PlacesSection from '../components/PlaceScreens';
import { useSelector, useDispatch } from 'react-redux';

const ReligiousPlaces = () => {
  const [searchValue, setSearchValue] = useState('');
  const [religious, setReligious] = useState([]);
  const data = useSelector(state => state.places.all);
  const dispatch = useDispatch();

  const getReligious = async (searchTerm = '') => {
    try {
      const filtered = data.filter(item => item.type === 'religious');
      setReligious(filtered);
      dispatch({
        type: 'SET_RELIGIOUS_PALCES',
        payload: filtered,
      });
    } catch (error) {
      console.log('Error fetching religious:', error);
    }
  };

  const handleDiscover = () => {
    console.log('Discover clicked');
  };

  const handleSave = () => {
    console.log('Save clicked');
  };
  useEffect(() => {
    getReligious();
  }, []);
  return (
    <PlacesSection
      title="Religious Places"
      headerColor="#9a370e"
      headerImage={require('../../assets/images/religious.png')}
      data={religious}
      onDiscover={handleDiscover}
      onSave={handleSave}
      searchValue={searchValue}
      onSearchChange={setSearchValue}
    />
  );
};

export default ReligiousPlaces;
