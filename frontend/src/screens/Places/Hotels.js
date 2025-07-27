
import React, { useState } from 'react';
import PlacesSection from '../components/PlaceScreens';

const Hotels = () => {
  const [searchValue, setSearchValue] = useState('');
  
  const data = [
    { image: require('../../assets/images/baytna.jpg'),name:'jbeil' ,id:'1'},//replace the id with the real id
 
    // More images
  ];

  return (
    <PlacesSection
      title="Hotels"
      headerColor="#9a370e"
      headerImage={require('../../assets/images/hotel.png')}
      data={data}
     
      searchValue={searchValue}
      onSearchChange={setSearchValue}
    />
  );
};

export default Hotels;
