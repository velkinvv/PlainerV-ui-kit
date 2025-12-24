import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IconPlainerUser } from '../../icons/plainer';

const meta: Meta = {
  title: 'Components/Icon/Icon Test',
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h3>Icon Test</h3>
      <IconPlainerUser width={48} height={48} />
      <p>Иконка должна использовать цвет из темы</p>
    </div>
  ),
};

export const CustomColor: Story = {
  render: () => (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h3>Icon with Custom Color</h3>
      <IconPlainerUser width={48} height={48} color="#ff0000" />
      <p>Иконка с кастомным красным цветом</p>
    </div>
  ),
};
