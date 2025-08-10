import React from 'react';
import PlacesSection from '../components/PlaceScreens';
import i18n from '../locales/i18n';

const Hotels = () => {
  const typePlace = 'hotel';

  return (
    <PlacesSection
      title={i18n.t('hotels')}
      headerColor="#9a370e"
      headerImage={require('../../assets/images/hotel.png')}
      typePlace={typePlace}
    />
  );
};

export default Hotels;
