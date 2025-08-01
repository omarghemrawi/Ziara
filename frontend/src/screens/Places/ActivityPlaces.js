import React, { useState, useEffect } from 'react';
import PlacesSection from '../components/PlaceScreens';
import { useSelector, useDispatch } from 'react-redux';

const ActivityPlaces = () => {
  const [searchValue, setSearchValue] = useState('');
  const [activityPlaces, setActivityPlaces] = useState([]);
  const data = useSelector(state => state.places.all);
  const dispatch = useDispatch();

  const getActivityPlaces = async (searchTerm = '') => {
    try {
      const filtered = data.filter(
        item => item.serviceType === 'activityPlace',
      );
      setActivityPlaces(filtered);
      dispatch({
        type: 'SET_ACTIVITY_PLACES',
        payload: filtered,
      });
    } catch (error) {
      console.log('Error fetching activity places:', error);
    }
  };

  useEffect(() => {
    getActivityPlaces();
  }, []);
  return (
    <PlacesSection
      title="Activity"
      headerColor="#9a370e"
      headerImage={require('../../assets/images/activity.png')}
      data={activityPlaces}
      searchValue={searchValue}
      onSearchChange={setSearchValue}
    />
  );
};

export default ActivityPlaces;
