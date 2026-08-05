import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Rating } from './Rating';
import { RatingColorScale, RatingVariant } from '@/types/ui';
import { Size } from '@/types/sizes';
import { Icon } from '../Icon/Icon';
import { IconSize } from '@/types/sizes';
import { DOC_RATING } from '@/components/ui/storyDocs/uiKitDocs';
import { ratingStoriesStyles } from './Rating.stories.styles';

const meta: Meta<typeof Rating> = {
  title: 'UI Kit/Feedback/Rating',
  component: Rating,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_RATING,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(RatingVariant),
    },
    size: {
      control: 'select',
      options: Object.values(Size),
    },
    colorScale: {
      control: 'select',
      options: Object.values(RatingColorScale),
    },
  },
};

export default meta;
type Story = StoryObj<typeof Rating>;

/**
 * Controlled-обёртка для демо.
 * @param props — пропсы Rating без value/onChange
 */
const RatingControlledDemo: React.FC<
  Omit<React.ComponentProps<typeof Rating>, 'value' | 'onChange'> & {
    initialValue?: number | null;
  }
> = ({ initialValue = 3, ...ratingProps }) => {
  const [value, setValue] = useState<number | null>(initialValue);
  return (
    <div style={ratingStoriesStyles.row}>
      <Rating {...ratingProps} value={value} onChange={setValue} showValueLabel />
      <p style={ratingStoriesStyles.caption}>Значение: {value ?? '—'}</p>
    </div>
  );
};

export const Basic: Story = {
  name: 'Basic',
  args: {
    variant: RatingVariant.ICONS,
    defaultValue: 3,
    size: Size.MD,
  },
  render: (args) => (
    <div style={ratingStoriesStyles.storyContainer}>
      <RatingControlledDemo {...args} initialValue={args.defaultValue ?? 3} />
    </div>
  ),
};

export const PrecisionHalf: Story = {
  name: 'Precision 0.5',
  render: () => (
    <div style={ratingStoriesStyles.storyContainer}>
      <RatingControlledDemo variant={RatingVariant.ICONS} precision={0.5} initialValue={2.5} />
    </div>
  ),
};

export const Sizes: Story = {
  name: 'Sizes',
  render: () => (
    <div style={ratingStoriesStyles.storyContainer}>
      {[Size.SM, Size.MD, Size.LG].map((size) => (
        <Rating key={size} size={size} defaultValue={4} readOnly showValueLabel />
      ))}
    </div>
  ),
};

export const Icons: Story = {
  name: 'Icons',
  render: () => (
    <div style={ratingStoriesStyles.storyContainer}>
      <RatingControlledDemo variant={RatingVariant.ICONS} initialValue={4} />
    </div>
  ),
};

export const BarTraffic: Story = {
  name: 'Bar (traffic)',
  render: () => (
    <div style={ratingStoriesStyles.storyContainer}>
      <RatingControlledDemo
        variant={RatingVariant.BAR}
        colorScale={RatingColorScale.TRAFFIC}
        initialValue={3.5}
        precision={0.5}
      />
      <Rating
        variant={RatingVariant.BAR}
        value={1}
        readOnly
        showValueLabel
        colorScale={RatingColorScale.TRAFFIC}
      />
      <Rating
        variant={RatingVariant.BAR}
        value={5}
        readOnly
        showValueLabel
        colorScale={RatingColorScale.TRAFFIC}
      />
    </div>
  ),
};

export const BarCustomScale: Story = {
  name: 'Bar (custom scale)',
  render: () => (
    <div style={ratingStoriesStyles.storyContainer}>
      <RatingControlledDemo
        variant={RatingVariant.BAR}
        colorScale={['#6366f1', '#a855f7', '#ec4899']}
        initialValue={3}
      />
    </div>
  ),
};

export const Faces: Story = {
  name: 'Faces',
  render: () => (
    <div style={ratingStoriesStyles.storyContainer}>
      <RatingControlledDemo variant={RatingVariant.FACES} initialValue={4} />
      <p style={ratingStoriesStyles.caption}>highlightSelectedOnly=false</p>
      <RatingControlledDemo
        variant={RatingVariant.FACES}
        highlightSelectedOnly={false}
        initialValue={3}
      />
    </div>
  ),
};

export const Dots: Story = {
  name: 'Dots',
  render: () => (
    <div style={ratingStoriesStyles.storyContainer}>
      <RatingControlledDemo variant={RatingVariant.DOTS} initialValue={3} />
    </div>
  ),
};

export const ReadOnlyDisabled: Story = {
  name: 'ReadOnly / Disabled',
  render: () => (
    <div style={ratingStoriesStyles.storyContainer}>
      <Rating variant={RatingVariant.ICONS} value={4} readOnly showValueLabel />
      <Rating variant={RatingVariant.BAR} value={3} readOnly showValueLabel />
      <Rating variant={RatingVariant.ICONS} value={2} disabled showValueLabel />
    </div>
  ),
};

export const CustomIcons: Story = {
  name: 'Custom icons',
  render: () => (
    <div style={ratingStoriesStyles.storyContainer}>
      <RatingControlledDemo
        variant={RatingVariant.ICONS}
        initialValue={3}
        icon={<Icon name="IconExHeart" size={IconSize.SM} color="currentColor" />}
        emptyIcon={<Icon name="IconExHeart" size={IconSize.SM} color="currentColor" />}
      />
    </div>
  ),
};
