import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './themes';
import { ThemeMode } from '../types/theme';
import { GlobalStyles } from '../styles/GlobalStyles';

interface ThemeContextProps {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Инициализируем тему из localStorage или по умолчанию
  const getInitialTheme = (): ThemeMode => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('storybook-theme');
      if (savedTheme === 'dark') return ThemeMode.DARK;
      if (savedTheme === 'light') return ThemeMode.LIGHT;
    }
    return ThemeMode.LIGHT;
  };

  const [mode, setMode] = useState<ThemeMode>(getInitialTheme);

  const theme = useMemo(() => (mode === ThemeMode.LIGHT ? lightTheme : darkTheme), [mode]);

  const toggle = () => setMode(m => (m === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT));

  const themeWithType = useMemo(() => ({ ...theme, type: theme.mode }), [theme]);

  // Синхронизация с темой Storybook
  useEffect(() => {
    const handleThemeChange = (event: { theme: string }) => {
      const newTheme = event.theme;
      if (newTheme === 'dark') {
        setMode(ThemeMode.DARK);
      } else if (newTheme === 'light') {
        setMode(ThemeMode.LIGHT);
      }
    };

    // Слушаем события от аддона Storybook
    if (typeof window !== 'undefined') {
      const storybookWindow = window as unknown as {
        __STORYBOOK_ADDONS_CHANNEL__?: {
          on: (event: string, handler: (event: { theme: string }) => void) => void;
          off: (event: string, handler: (event: { theme: string }) => void) => void;
        };
      };
      const channel = storybookWindow.__STORYBOOK_ADDONS_CHANNEL__;
      if (!channel) {
        return;
      }
      channel.on('THEME_CHANGED', handleThemeChange);

      return () => {
        channel.off('THEME_CHANGED', handleThemeChange);
      };
    }
  }, []);

  // Обновляем localStorage при изменении темы
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const themeValue = mode === ThemeMode.DARK ? 'dark' : 'light';
      localStorage.setItem('storybook-theme', themeValue);
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode, toggle }}>
      <StyledThemeProvider theme={themeWithType}>
        <GlobalStyles />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
