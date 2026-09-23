import type { Meta } from '@storybook/react';
import { Progress } from './Progress';
import legacyMeta, {
  CustomColors,
  CustomStyling,
  StatusChangeCallback,
  WithRetry,
  WithSpeed,
  WithTimeAndSpeed,
} from './Progress.stories.legacy';

const meta: Meta<typeof Progress> = {
  ...(legacyMeta as Meta<typeof Progress>),
  title: 'UI Kit/Data Display/Progress/Colors',
};

export default meta;

export {
  CustomColors,
  CustomStyling,
  StatusChangeCallback,
  WithRetry,
  WithSpeed,
  WithTimeAndSpeed,
};
