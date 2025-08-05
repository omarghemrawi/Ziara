import React, { useState } from 'react';
import PlacesSection from '../components/PlaceScreens';
import axios from 'axios';
import i18n from '../locales/i18n';

const TouristicPlaces = () => {
  const [searchValue, setSearchValue] = useState('');

  const data = [
    { image: require('../../assets/images/baytna.jpg') },
    { image: require('../../assets/images/baytna.jpg') },
    { image: require('../../assets/images/baytna.jpg') },
    { image: require('../../assets/images/baytna.jpg') },
    { image: require('../../assets/images/baytna.jpg') },
    { image: require('../../assets/images/baytna.jpg') },
    { image: require('../../assets/images/baytna.jpg') },
    { image: require('../../assets/images/baytna.jpg') },
    { image: require('../../assets/images/baytna.jpg') },
    { image: require('../../assets/images/baytna.jpg') },
    { image: require('../../assets/images/baytna.jpg') },

    // More images
  ];

  const handleDiscover = () => {
    console.log('Discover clicked');
  };

  const handleSave = () => {
    console.log('Save clicked');
  };

  return (
    <PlacesSection
      title={i18n.t('touristicPlaces')}
      headerColor="#FAC75C"
      headerImage={require('../../assets/images/touristicPlaces.png')}
      data={data}
      onDiscover={handleDiscover}
      onSave={handleSave}
      searchValue={searchValue}
      onSearchChange={setSearchValue}
    />
  );
};

export default TouristicPlaces;
