import type { Meta } from '@storybook/react';
import { Progress } from './Progress';
import legacyMeta, {
  Circular,
  CircularWithCheckmark,
  CircularWithInfo,
  IndeterminateCircular,
  WithGradient,
} from './Progress.stories.legacy';

const meta: Meta<typeof Progress> = {
  ...(legacyMeta as Meta<typeof Progress>),
  title: 'UI Kit/Data Display/Progress/Circular',
};

export default meta;

export {
  Circular,
  CircularWithCheckmark,
  CircularWithInfo,
  IndeterminateCircular,
  WithGradient,
};
