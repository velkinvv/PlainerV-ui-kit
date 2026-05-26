import React from 'react';
import { useTheme } from 'styled-components';
import { ThemeShowcaseContent } from './ThemeShowcaseContent';
import { themeShowcaseStoriesStyles } from './ThemeShowcase.stories.styles';

export interface ThemeShowcasePageProps {
  /** Заголовок страницы обзора */
  pageTitle: string;
}

/**
 * Оболочка Theme Showcase: фон и текст из активной темы {@link ThemeProvider}, не из статических импортов.
 */
export const ThemeShowcasePage = ({ pageTitle }: ThemeShowcasePageProps) => {
  const theme = useTheme();

  return (
    <div
      style={{
        ...themeShowcaseStoriesStyles.pageShell,
        background: theme.colors.background,
        color: theme.colors.text,
      }}
    >
      <ThemeShowcaseContent
        pageTitle={pageTitle}
        pageTitleStyle={{ color: theme.colors.text }}
      />
    </div>
  );
};
