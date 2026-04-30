import type { Meta, StoryObj } from '@storybook/react';
import { ThemeToggle } from './ThemeToggle';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import React from 'react';

const meta: Meta<typeof ThemeToggle> = {
  title: 'UI Kit/Utils/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithBackground: Story = {
  render: () => (
    <div
      style={{
        padding: '20px',
        background: 'var(--background)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <span>Light/Dark Theme:</span>
      <ThemeToggle />
    </div>
  ),
};

