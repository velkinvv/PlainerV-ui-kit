import type { Meta } from '@storybook/react';
import legacyMeta from './Hint.stories.legacy';

const meta: Meta = {
  ...legacyMeta,
  title: 'UI Kit/Feedback/Hint/Placement',
};

export default meta;

export {
  TopPosition,
  BottomPosition,
  LeftPosition,
  RightPosition,
  AllPositions,
  PositioningModeDefault,
  PositioningModeAutoFlip,
  PositioningModeAutoFit,
  PositioningModesComparison,
} from './Hint.stories.legacy';
