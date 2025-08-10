import React, { useEffect, useState } from 'react';
import PlacesSection from '../components/PlaceScreens';
import { useSelector } from 'react-redux';
import i18n from '../locales/i18n';
import SearchSection from './SearchSection';

const Search = () => {
  return (
    <SearchSection
      title={i18n.t('search')}
      headerColor="#9a370e"
      headerImage={require('../../assets/images/Search.png')}
    />
  );
};

export default Search;
