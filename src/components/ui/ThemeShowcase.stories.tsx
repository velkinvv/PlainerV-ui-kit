import type { Meta, StoryObj } from '@storybook/react';
import { ThemeColorScheme, ThemeVariant } from '@/types/theme';
import { ThemeShowcasePage } from './ThemeShowcasePage';
import { DOC_THEME_SHOWCASE } from '@/components/ui/storyDocs/uiKitDocs';

const meta: Meta = {
  title: 'UI Kit/Utils/Theme Showcase',
  parameters: {
    layout: 'fullscreen',
    /** Без отступов и своего фона у декоратора canvas — фон только из Theme Showcase. */
    plainervStoryCanvas: {
      disablePadding: true,
      disableBackground: true,
    },
    docs: {
      description: {
        component: DOC_THEME_SHOWCASE,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Сторис фиксирует globals themeVariant и colorScheme для согласованного превью.
 */
export const LightTheme: Story = {
  globals: {
    themeVariant: ThemeVariant.standard,
    colorScheme: ThemeColorScheme.LIGHT,
  },
  render: () => <ThemeShowcasePage pageTitle="UI Components — Light Theme" />,
};

export const DarkTheme: Story = {
  globals: {
    themeVariant: ThemeVariant.standard,
    colorScheme: ThemeColorScheme.DARK,
  },
  render: () => <ThemeShowcasePage pageTitle="UI Components — Dark Theme" />,
};
