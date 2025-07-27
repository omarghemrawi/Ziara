import React, { useEffect, useState } from 'react';
import PlacesSection from '../components/PlaceScreens';
import axios from 'axios';

const Restaurants = () => {
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([]);

  // const datat = [{ image: require('../../assets/images/baytna.jpg') }];

  const getData = async (searchTerm = '') => {
    try {
      const res = await axios.get('http://10.0.2.2:3000/place/all/restaurant', {
        params: { city: searchTerm },
      });
      if (res.data.places) {
        console.log('Restaurants data:', res.data.places);
        setData(res.data.places);
      } else {
        console.error('No restaurants found');
        setData([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]);
    }
  };

  const handleSearch = () => {
    getData(searchValue);
  };

  useEffect(() => {
    // getData();
  }, []);

  return (
    <PlacesSection
      title="Restaurants"
      headerColor="#FAC75C"
      headerImage={require('../../assets/images/pizza.png')}
      data={data}
      onSearch={handleSearch}
      searchValue={searchValue}
      onSearchChange={setSearchValue}
    />
  );
};

export default Restaurants;
