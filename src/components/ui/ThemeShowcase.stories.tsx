import type { Meta, StoryObj } from '@storybook/react';
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
 * Сторис фиксирует глобал `theme`, чтобы тулбар Storybook и shell совпадали с превью.
 */
export const LightTheme: Story = {
  globals: {
    theme: 'light',
  },
  render: () => <ThemeShowcasePage pageTitle="UI Components — Light Theme" />,
};

export const DarkTheme: Story = {
  globals: {
    theme: 'dark',
  },
  render: () => <ThemeShowcasePage pageTitle="UI Components — Dark Theme" />,
};
