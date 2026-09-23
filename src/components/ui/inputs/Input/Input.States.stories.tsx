import type { Meta } from '@storybook/react';
import { Input } from './Input';
import legacyMeta, {
  CharacterCounterDemo,
  CharacterCounterThresholdDemo,
  Disabled,
  ExtraTextDemo,
  LoadingDemo,
  SkeletonDemo,
  TooltipDemo,
  WithBothIcons,
  WithClearIcon,
  WithError,
  WithLeftIcon,
  WithRightIcon,
} from './Input.stories.legacy';

const meta: Meta<typeof Input> = {
  ...(legacyMeta as Meta<typeof Input>),
  title: 'UI Kit/Inputs/Input/States',
};

export default meta;

export {
  CharacterCounterDemo,
  CharacterCounterThresholdDemo,
  Disabled,
  ExtraTextDemo,
  LoadingDemo,
  SkeletonDemo,
  TooltipDemo,
  WithBothIcons,
  WithClearIcon,
  WithError,
  WithLeftIcon,
  WithRightIcon,
};
