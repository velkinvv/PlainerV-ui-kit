import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';
import { Icon } from '../../Icon/Icon';
import React from 'react';
import { IconSize } from '../../../../types/sizes';
import { ButtonVariant } from '../../../../types/ui';

const meta: Meta<typeof IconButton> = {
  title: 'Components/Buttons/IconButton/Test',
  component: IconButton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TestWarning: Story = {
  args: {
    variant: ButtonVariant.WARNING,
    icon: <Icon name="IconExInfoSquare" size={IconSize.MD} />,
  },
};
