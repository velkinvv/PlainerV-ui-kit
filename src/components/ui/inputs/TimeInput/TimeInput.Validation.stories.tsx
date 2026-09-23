import type { Meta } from '@storybook/react';
import { TimeInput } from './TimeInput';
import legacyMeta, {
  CombinedDisabled,
  DisabledHours,
  DisabledMinutes,
  DisabledSeconds,
  DisabledSpecificTimes,
  HandleInputDemo,
  IgnoreMaskCharactersDemo,
  LunchBreakDisabled,
  SegmentedStatusDemo,
  WithError,
  WorkingHours,
} from './TimeInput.stories.legacy';

const meta: Meta<typeof TimeInput> = {
  ...(legacyMeta as Meta<typeof TimeInput>),
  title: 'UI Kit/Inputs/TimeInput/Validation',
};

export default meta;

export {
  CombinedDisabled,
  DisabledHours,
  DisabledMinutes,
  DisabledSeconds,
  DisabledSpecificTimes,
  HandleInputDemo,
  IgnoreMaskCharactersDemo,
  LunchBreakDisabled,
  SegmentedStatusDemo,
  WithError,
  WorkingHours,
};
