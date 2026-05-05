import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';
import { DividerOrientation } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import { DOC_DIVIDER } from '@/components/ui/storyDocs/uiKitDocs';
import { dividerStoriesStyles } from './Divider.stories.styles';

const meta: Meta<typeof Divider> = {
  title: 'UI Kit/Surfaces/Divider',
  component: Divider,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_DIVIDER,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: [...Object.values(DividerOrientation)],
      description: 'Ориентация разделителя',
      table: {
        type: { summary: 'horizontal или vertical (DividerOrientation)' },
      },
    },
    size: {
      control: { type: 'select' },
      options: [...Object.values(Size)],
      description: 'Размер разделителя',
      table: {
        type: { summary: 'Size: XS, SM, MD, LG, XL' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Horizontal: Story = {
  args: {
    orientation: DividerOrientation.HORIZONTAL,
  },
};

export const Vertical: Story = {
  args: {
    orientation: DividerOrientation.VERTICAL,
  },
};

export const Small: Story = {
  args: {
    size: Size.SM,
  },
};

export const Medium: Story = {
  args: {
    size: Size.MD,
  },
};

export const Large: Story = {
  args: {
    size: Size.LG,
  },
};

export const HorizontalWithContent: Story = {
  render: () => (
    <div style={dividerStoriesStyles.width300}>
      <p>Content above the divider</p>
      <Divider />
      <p>Content below the divider</p>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const VerticalWithContent: Story = {
  render: () => (
    <div style={dividerStoriesStyles.verticalWithContentContainer}>
      <span>Left content</span>
      <Divider orientation={DividerOrientation.VERTICAL} />
      <span>Right content</span>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={dividerStoriesStyles.allSizesContainer}>
      <div>
        <p style={dividerStoriesStyles.captionSmall}>Small</p>
        <Divider size={Size.SM} />
      </div>
      <div>
        <p style={dividerStoriesStyles.captionMedium}>Medium</p>
        <Divider size={Size.MD} />
      </div>
      <div>
        <p style={dividerStoriesStyles.captionLarge}>Large</p>
        <Divider size={Size.LG} />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const AllOrientations: Story = {
  render: () => (
    <div style={dividerStoriesStyles.allOrientationsRoot}>
      <div style={dividerStoriesStyles.horizontalSection}>
        <span>Horizontal dividers:</span>
        <Divider orientation={DividerOrientation.HORIZONTAL} size={Size.SM} />
        <Divider orientation={DividerOrientation.HORIZONTAL} size={Size.MD} />
        <Divider orientation={DividerOrientation.HORIZONTAL} size={Size.LG} />
      </div>
      <div style={dividerStoriesStyles.verticalSection}>
        <span>Vertical dividers:</span>
        <div style={dividerStoriesStyles.verticalRow}>
          <span>Left</span>
          <Divider orientation={DividerOrientation.VERTICAL} size={Size.SM} />
          <span>Right</span>
        </div>
        <div style={dividerStoriesStyles.verticalRow}>
          <span>Left</span>
          <Divider orientation={DividerOrientation.VERTICAL} size={Size.MD} />
          <span>Right</span>
        </div>
        <div style={dividerStoriesStyles.verticalRow}>
          <span>Left</span>
          <Divider orientation={DividerOrientation.VERTICAL} size={Size.LG} />
          <span>Right</span>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const InList: Story = {
  render: () => (
    <div style={dividerStoriesStyles.width300}>
      <ul style={dividerStoriesStyles.listReset}>
        <li style={dividerStoriesStyles.listItem}>List item 1</li>
        <Divider />
        <li style={dividerStoriesStyles.listItem}>List item 2</li>
        <Divider />
        <li style={dividerStoriesStyles.listItem}>List item 3</li>
        <Divider />
        <li style={dividerStoriesStyles.listItem}>List item 4</li>
      </ul>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

