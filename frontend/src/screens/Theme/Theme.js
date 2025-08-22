
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
subtitle:'#000',
subtitle1:'#fff',
  border: '#ccc',
  icon:'#FAC75C',
};

const darkTheme = {
  background: '#3C3D37',
  text: '#b3b3b3',
  subtitle:'#fff',
  subtitle1:'#fff',
  border: '#444',
  icon:'#9A370E',
  
};
