import type { Meta } from '@storybook/react';
import { Progress } from './Progress';
import legacyMeta, {
  StepperAllSizes,
  StepperCircularAllSizes,
} from './Progress.stories.legacy';

const meta: Meta<typeof Progress> = {
  ...(legacyMeta as Meta<typeof Progress>),
  title: 'UI Kit/Data Display/Progress/Sizes',
};

export default meta;

export { StepperAllSizes, StepperCircularAllSizes };
