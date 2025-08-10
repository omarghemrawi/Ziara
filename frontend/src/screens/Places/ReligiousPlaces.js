import React from 'react';
import PlacesSection from '../components/PlaceScreens';
import i18n from '../locales/i18n';

const ReligiousPlaces = () => {
  const typePlace = 'religious';

  return (
    <PlacesSection
      title={i18n.t('religiousPlaces')}
      headerColor="#9a370e"
      headerImage={require('../../assets/images/religious.png')}
      typePlace={typePlace}
    />
  );
};

export default ReligiousPlaces;
