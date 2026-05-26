import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { DOC_THEME_SELECTOR } from '@/components/ui/storyDocs/uiKitDocs';
import React from 'react';
import { ThemeColorScheme } from '@/types/theme';
import { defineThemeCatalog } from '@/handlers/themeCatalogHandlers';
import { ThemeProvider } from '@/themes/ThemeProvider';
import { Button } from '@/components/ui/buttons/Button';
import { Typography } from '@/components/ui/Typography';
import { ThemeSelector } from './ThemeSelector';
import { themeSelectorStoriesStyles } from './ThemeSelector.stories.styles';

const appThemes = defineThemeCatalog([
  { id: 'light', label: 'Светлая', baseMode: ThemeColorScheme.LIGHT },
  {
    id: 'ocean',
    label: 'Океан',
    baseMode: ThemeColorScheme.LIGHT,
    override: { colors: { primary: '#0284C7', primaryHover: '#0369A1' } },
  },
  {
    id: 'forest',
    label: 'Лес',
    baseMode: ThemeColorScheme.LIGHT,
    override: { colors: { primary: '#059669', primaryHover: '#047857' } },
  },
  { id: 'dark', label: 'Тёмная', baseMode: ThemeColorScheme.DARK },
  {
    id: 'midnight',
    label: 'Полночь',
    baseMode: ThemeColorScheme.DARK,
    override: { colors: { primary: '#8B5CF6', background: '#0F172A' } },
  },
] as const);

type AppThemeMode = (typeof appThemes.themeModes)[number];

const withMultiThemeCatalog: Decorator = (Story, context) => {
  const rawTheme = context.globals?.theme;
  const initialThemeMode: AppThemeMode =
    rawTheme === 'dark' ? appThemes.themeMode.dark : appThemes.themeMode.light;

  return (
    <ThemeProvider<AppThemeMode>
      key={`multi-theme-catalog-${initialThemeMode}`}
      themes={appThemes.catalog}
      initialThemeMode={initialThemeMode}
      defaultThemeMode={appThemes.themeMode.light}
      applyGlobalStyles={false}
    >
      <Story />
    </ThemeProvider>
  );
};

const meta: Meta<typeof ThemeSelector> = {
  title: 'UI Kit/Theming/ThemeSelector',
  component: ThemeSelector,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_THEME_SELECTOR,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [withMultiThemeCatalog],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FiveThemes: Story = {
  name: 'Каталог из 5 тем',
  render: () => (
    <div style={themeSelectorStoriesStyles.panel}>
      <ThemeSelector />
      <Typography variant="body2" color="secondary">
        `setThemeMode(appThemes.themeMode.ocean)` — только id из каталога.
      </Typography>
      <Button variant="primary">Primary</Button>
      <Button variant="outline">Outline</Button>
    </div>
  ),
};
