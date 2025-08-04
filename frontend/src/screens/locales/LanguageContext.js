import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import I18n from '../locales/i18n';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
 
   const [language, setLanguage] = useState('en');

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLang = await AsyncStorage.getItem('selectedLanguage');
      if (savedLang) {
        I18n.locale = savedLang;
        setLanguage(savedLang);
      }
    };
    loadLanguage();
  }, []);

  const changeLanguage = async (langCode) => {
    await AsyncStorage.setItem('selectedLanguage', langCode);
    I18n.locale = langCode;
    setLanguage(langCode); // This re-renders consumers
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};


export const useLanguage = () => useContext(LanguageContext);
