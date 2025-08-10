import React, { useState, useEffect } from 'react';
import PlacesSection from '../components/PlaceScreens';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import i18n from '../locales/i18n';

const TouristicPlaces = () => {
  const typePlace = 'touristic';

  return (
    <PlacesSection
      title={i18n.t('touristicPlaces')}
      headerColor="#FAC75C"
      headerImage={require('../../assets/images/touristicPlaces.png')}
      typePlace={typePlace}
    />
  );
};

export default TouristicPlaces;
