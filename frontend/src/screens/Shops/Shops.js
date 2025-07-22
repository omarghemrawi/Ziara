
import React, { useState } from 'react';
import PlacesSection from '../components/PlaceScreens';

const Shops = () => {
  const [searchValue, setSearchValue] = useState('');
  
  const data = [
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
      title="Shops & Souvenirs"
      headerColor="#9a370e"
      headerImage={require('../../assets/images/kasset.png')}
      data={data}
      onDiscover={handleDiscover}
      onSave={handleSave}
      searchValue={searchValue}
      onSearchChange={setSearchValue}
    />
  );
};

export default Shops;
