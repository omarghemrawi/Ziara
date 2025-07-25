
import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isLightMode, setIsLightMode] = useState(true);

  const toggleTheme = () => setIsLightMode(prev => !prev);

  const theme = isLightMode ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ isLightMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

const lightTheme = {
  background: '#fff',
  text: '#000',
  border: '#ccc',
};

const darkTheme = {
  background: '#000',
  text: '#fff',
  border: '#444',
  
};
