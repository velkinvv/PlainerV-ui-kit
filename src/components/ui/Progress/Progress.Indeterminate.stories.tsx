import type { Meta } from '@storybook/react';
import { Progress } from './Progress';
import legacyMeta, {
  Indeterminate,
  OnComplete,
  WithPause,
} from './Progress.stories.legacy';

const meta: Meta<typeof Progress> = {
  ...(legacyMeta as Meta<typeof Progress>),
  title: 'UI Kit/Data Display/Progress/Indeterminate',
};

export default meta;

export { Indeterminate, OnComplete, WithPause };
