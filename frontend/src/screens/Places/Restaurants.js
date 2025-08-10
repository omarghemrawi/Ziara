import React from 'react';
import PlacesSection from '../components/PlaceScreens';
import i18n from '../locales/i18n';

const Restaurants = () => {
  const typePlace = 'restaurant';

  return (
    <PlacesSection
      title={i18n.t('restaurants')}
      headerColor="#FAC75C"
      headerImage={require('../../assets/images/pizza.png')}
      typePlace={typePlace}
    />
  );
};

export default Restaurants;
