
import React, { useState } from 'react';
import PlacesSection from '../components/PlaceScreens';
import i18n from '../locales/i18n';

const Search = () => {
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
      title={i18n.t('search')}
      headerColor="#9a370e"
      headerImage={require('../../assets/images/Search.png')}
      data={data}
      onDiscover={handleDiscover}
      onSave={handleSave}
      searchValue={searchValue}
      onSearchChange={setSearchValue}
    />
  );
};

export default Search;
