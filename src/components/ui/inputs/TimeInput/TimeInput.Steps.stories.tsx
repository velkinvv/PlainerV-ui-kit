import type { Meta } from '@storybook/react';
import { TimeInput } from './TimeInput';
import legacyMeta, {
  CustomSteps,
  KeyboardInputWithSeconds,
  SegmentedInputWithSeconds,
  SimpleTimeFormatTest,
  TimeFormatDemo,
  WithSeconds,
  SegmentedTimeFormatDemo,
} from './TimeInput.stories.legacy';

const meta: Meta<typeof TimeInput> = {
  ...(legacyMeta as Meta<typeof TimeInput>),
  title: 'UI Kit/Inputs/TimeInput/Steps',
};

export default meta;

export {
  CustomSteps,
  KeyboardInputWithSeconds,
  SegmentedInputWithSeconds,
  SegmentedTimeFormatDemo,
  SimpleTimeFormatTest,
  TimeFormatDemo,
  WithSeconds,
};
