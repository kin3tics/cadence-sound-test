import React, { useContext, useState, useEffect } from 'react';
import themes from './styles/themes';

const STORAGE_KEY = 'theme';
const ThemeContext = React.createContext();

let storage = window.localStorage;

export const ThemeContextProvider = ({ children }) => {
  const [themeID, setThemeID] = useState();

  useEffect(() => {
    (async () => {
      const storedThemeID = await storage.getItem(STORAGE_KEY);
      if (storedThemeID && themes[storedThemeID]) setThemeID(storedThemeID);
      else setThemeID(Object.keys(themes)[0]);
    })();
  }, []);

  return (
    <ThemeContext.Provider value={{ themeID, setThemeID }}>
      {!!themeID ? children : null}
    </ThemeContext.Provider>
  );
};
  
export function withTheme(Component) {
  return props => {
    const { themeID, setThemeID } = useContext(ThemeContext);

    const getTheme = themeID => themes[themeID];
    const setTheme = themeID => {
      storage.setItem(STORAGE_KEY, themeID);
      setThemeID(themeID);
    };

    return (
      <Component
        {...props}
        themes={themes}
        theme={getTheme(themeID)}
        setTheme={setTheme}
      />
    );
  };
}