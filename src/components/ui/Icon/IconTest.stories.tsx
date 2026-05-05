import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';
import { IconSize } from '../../../types/sizes';
import { iconTestStoriesStyles } from './IconTest.stories.styles';

const meta: Meta<typeof Icon> = {
  title: 'UI Kit/Data Display/Icon/Test',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TestIcons: Story = {
  render: () => (
    <div style={iconTestStoriesStyles.iconRow}>
      {/* Lucide Icons */}
      <div style={iconTestStoriesStyles.iconCell}>
        <h4>Lucide</h4>
        <Icon name="IconExHeart" size={IconSize.MD} />
        <div>heart</div>
      </div>

      <div style={iconTestStoriesStyles.iconCell}>
        <h4>Lucide</h4>
        <Icon name="IconExStar" size={IconSize.MD} />
        <div>star</div>
      </div>

      <div style={iconTestStoriesStyles.iconCell}>
        <h4>Lucide</h4>
        <Icon name="IconExHome" size={IconSize.MD} />
        <div>home</div>
      </div>

      {/* Plainer Icons */}
      <div style={iconTestStoriesStyles.iconCell}>
        <h4>Plainer</h4>
        <Icon name="IconPlainerUser" size={IconSize.MD} />
        <div>User</div>
      </div>

      <div style={iconTestStoriesStyles.iconCell}>
        <h4>Plainer</h4>
        <Icon name="IconPlainerSearch" size={IconSize.MD} />
        <div>Search</div>
      </div>

      <div style={iconTestStoriesStyles.iconCell}>
        <h4>Plainer</h4>
        <Icon name="IconPlainerPlus" size={IconSize.MD} />
        <div>Plus</div>
      </div>

      {/* IconEx Icons */}
      <div style={iconTestStoriesStyles.iconCell}>
        <h4>IconEx</h4>
        <Icon name="IconExUser" size={IconSize.MD} />
        <div>User</div>
      </div>

      <div style={iconTestStoriesStyles.iconCell}>
        <h4>IconEx</h4>
        <Icon name="IconExSettings" size={IconSize.MD} />
        <div>Settings</div>
      </div>

      <div style={iconTestStoriesStyles.iconCell}>
        <h4>IconEx</h4>
        <Icon name="IconExHeart" size={IconSize.MD} />
        <div>Heart</div>
      </div>
    </div>
  ),
};

