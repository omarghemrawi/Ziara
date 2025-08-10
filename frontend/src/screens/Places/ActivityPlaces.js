import React, { useState, useEffect } from 'react';
import PlacesSection from '../components/PlaceScreens';
import { useSelector, useDispatch } from 'react-redux';
import i18n from '../locales/i18n';

const ActivityPlaces = () => {
  const typePlace = 'activity';
  return (
    <PlacesSection
      title={i18n.t('activity')}
      headerColor="#9a370e"
      headerImage={require('../../assets/images/activity.png')}
      typePlace={typePlace}
    />
  );
};

export default ActivityPlaces;
