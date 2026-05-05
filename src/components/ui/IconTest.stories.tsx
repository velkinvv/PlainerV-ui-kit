import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IconPlainerUser } from '../../icons/plainer';
import { iconTestPageStoriesStyles, iconTestStoryColors } from './IconTest.stories.styles';

const meta: Meta = {
  title: 'UI Kit/Data Display/Icon/Icon Test',
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div style={iconTestPageStoriesStyles.centeredRoot}>
      <h3>Icon Test</h3>
      <IconPlainerUser width={48} height={48} />
      <p>Иконка должна использовать цвет из темы</p>
    </div>
  ),
};

export const CustomColor: Story = {
  render: () => (
    <div style={iconTestPageStoriesStyles.centeredRoot}>
      <h3>Icon with Custom Color</h3>
      <IconPlainerUser width={48} height={48} color={iconTestStoryColors.customIconColor} />
      <p>Иконка с кастомным красным цветом</p>
    </div>
  ),
};

