import type { Meta, StoryObj } from '@storybook/react';
import { ThemeToggle } from './ThemeToggle';
import React from 'react';
import { DOC_THEME_TOGGLE } from '@/components/ui/storyDocs/uiKitDocs';
import { themeToggleStoriesStyles } from './ThemeToggle.stories.styles';

const meta: Meta<typeof ThemeToggle> = {
  title: 'UI Kit/Utils/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: DOC_THEME_TOGGLE,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithBackground: Story = {
  render: () => (
    <div style={themeToggleStoriesStyles.withBackgroundContainer}>
      <span>Light/Dark Theme:</span>
      <ThemeToggle />
    </div>
  ),
};

