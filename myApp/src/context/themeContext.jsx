import { createContext, useState, useEffect } from "react";
import propTypes from "prop-types";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  //save the dark mode in local storage
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode");
    if (isDarkMode) {
      setDarkMode(JSON.parse(isDarkMode));
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeContextProvider.propTypes = {
  children: propTypes.node.isRequired,
};
