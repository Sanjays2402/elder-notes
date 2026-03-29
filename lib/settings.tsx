import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type FontSizeOption = "small" | "medium" | "large" | "xlarge";

interface Settings {
  darkMode: boolean;
  fontSize: FontSizeOption;
}

interface SettingsContextType extends Settings {
  toggleDarkMode: () => void;
  setFontSize: (size: FontSizeOption) => void;
  theme: typeof lightTheme;
  fontScale: number;
}

const SETTINGS_KEY = "elder_notes_settings";

const lightTheme = {
  bg: "#F5F5F5",
  card: "#FFFFFF",
  text: "#1A1A1A",
  textSecondary: "#555555",
  textMuted: "#999999",
  border: "#E0E0E0",
  inputBg: "#F0F0F0",
  primary: "#4A90D9",
  danger: "#FF4444",
  headerBg: "#4A90D9",
  headerText: "#FFFFFF",
  statusBar: "light-content" as const,
};

const darkTheme = {
  bg: "#121212",
  card: "#1E1E1E",
  text: "#F5F5F5",
  textSecondary: "#CCCCCC",
  textMuted: "#AAAAAA",
  border: "#333333",
  inputBg: "#2A2A2A",
  primary: "#5BA3EC",
  danger: "#FF6666",
  headerBg: "#1A1A2E",
  headerText: "#FFFFFF",
  statusBar: "light-content" as const,
};

const fontScales: Record<FontSizeOption, number> = {
  small: 0.85,
  medium: 1,
  large: 1.2,
  xlarge: 1.4,
};

const SettingsContext = createContext<SettingsContextType>({
  darkMode: false,
  fontSize: "medium",
  toggleDarkMode: () => {},
  setFontSize: () => {},
  theme: lightTheme,
  fontScale: 1,
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSizeState] = useState<FontSizeOption>("medium");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(SETTINGS_KEY).then((raw) => {
      if (raw) {
        const s = JSON.parse(raw);
        if (s.darkMode !== undefined) setDarkMode(s.darkMode);
        if (s.fontSize) setFontSizeState(s.fontSize);
      }
      setLoaded(true);
    });
  }, []);

  const persist = (s: Settings) => {
    AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
  };

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    persist({ darkMode: next, fontSize });
  };

  const setFontSize = (size: FontSizeOption) => {
    setFontSizeState(size);
    persist({ darkMode, fontSize: size });
  };

  if (!loaded) return null;

  return (
    <SettingsContext.Provider
      value={{
        darkMode,
        fontSize,
        toggleDarkMode,
        setFontSize,
        theme: darkMode ? darkTheme : lightTheme,
        fontScale: fontScales[fontSize],
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
