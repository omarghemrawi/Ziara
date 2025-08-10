import React from 'react';
import PlacesSection from '../components/PlaceScreens';
import i18n from '../locales/i18n';

const Shops = () => {
  const typePlace = 'shop';

  return (
    <PlacesSection
      title={i18n.t('ShopsAndSouvenirs')}
      headerColor="#9a370e"
      headerImage={require('../../assets/images/kasset.png')}
      typePlace={typePlace}
    />
  );
};

export default Shops;
