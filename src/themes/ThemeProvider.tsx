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

interface ThemeProviderProps {
  children: React.ReactNode;
  /**
   * Применять ли глобальные стили библиотеки (`GlobalStyles`).
   * Для внешних приложений, где уже есть собственные глобальные стили (например docs),
   * лучше отключать, чтобы избежать перезаписи базовой типографики и layout.
   */
  applyGlobalStyles?: boolean;
  /**
   * Начальный режим темы с сервера (SSR), например из cookie — совпадает с `data-theme` на `<html>`
   * и устраняет рассинхрон гидрации с первым чтением `localStorage` на клиенте.
   * Если не передан — используется ключ `storybook-theme` в `localStorage`, затем светлая тема.
   */
  initialMode?: ThemeMode;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  applyGlobalStyles = true,
  initialMode,
}) => {
  // Инициализируем тему из localStorage или по умолчанию
  const getInitialTheme = (): ThemeMode => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('storybook-theme');
      if (savedTheme === 'dark') return ThemeMode.DARK;
      if (savedTheme === 'light') return ThemeMode.LIGHT;
    }
    return ThemeMode.LIGHT;
  };

  const [mode, setMode] = useState<ThemeMode>(() => {
    if (initialMode !== undefined) {
      return initialMode;
    }
    return getInitialTheme();
  });

  const theme = useMemo(() => (mode === ThemeMode.LIGHT ? lightTheme : darkTheme), [mode]);

  const toggle = () => setMode(m => (m === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT));

  const themeWithType = useMemo(() => ({ ...theme, type: theme.mode }), [theme]);

  // Синхронизация с тулбаром тем Storybook: см. `.storybook/withStorybookUiKitTheme.tsx` (глобал `theme` в декораторе).

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
        {applyGlobalStyles ? <GlobalStyles /> : null}
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
