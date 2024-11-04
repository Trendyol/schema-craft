"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  onThemeChange: (value: Theme) => void;
  toggleTheme: () => void;
} | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) throw Error("Context cannot be null");

  return context;
};

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  const onChange = (value: Theme) => {
    setTheme(value);
    localStorage.setItem("theme", value);
    document.documentElement.setAttribute("data-theme", theme === "light" ? "dark" : "light");
  };

  const toggleTheme = () => {
    onChange(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    setTheme(localStorage.getItem("theme") ? (localStorage.getItem("theme") as Theme) : "light");
    document.documentElement.setAttribute(
      "data-theme",
      localStorage.getItem("theme") ? (localStorage.getItem("theme") as Theme) : "light"
    );
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: theme, onThemeChange: onChange, toggleTheme: toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
