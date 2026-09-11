import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const STORAGE_KEY = "shrinkr-theme";

const getSystemTheme = () => {
  if (typeof window === "undefined") return "light";

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    if (typeof window === "undefined") return "light";

    return localStorage.getItem(STORAGE_KEY) || "light";
  });

  const [resolvedTheme, setResolvedTheme] = useState(() =>
    theme === "system" ? getSystemTheme() : theme,
  );

  const setTheme = (value) => {
    setThemeState(value);
    localStorage.setItem(STORAGE_KEY, value);
  };

  useEffect(() => {
    const applyTheme = (value) => {
      setResolvedTheme(value);
      document.documentElement.classList.toggle("dark", value === "dark");
    };

    applyTheme(theme === "system" ? getSystemTheme() : theme);

    if (theme !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => applyTheme(getSystemTheme());

    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
