import type { Meta } from '@storybook/react';
import { DateInput } from './DateInput';
import legacyMeta, {
  DateFormatDemo,
  HandleInputDemo,
  IgnoreMaskCharactersDemo,
  SegmentedDateFormatDemo,
  SegmentedTextAlignDemo,
  SimpleFormatTest,
} from './DateInput.stories.legacy';

const meta: Meta<typeof DateInput> = {
  ...(legacyMeta as Meta<typeof DateInput>),
  title: 'UI Kit/Inputs/DateInput/Mask',
};

export default meta;

export {
  DateFormatDemo,
  HandleInputDemo,
  IgnoreMaskCharactersDemo,
  SegmentedDateFormatDemo,
  SegmentedTextAlignDemo,
  SimpleFormatTest,
};
