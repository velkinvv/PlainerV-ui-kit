import type { Meta } from '@storybook/react';
import { TimeInput } from './TimeInput';
import legacyMeta, {
  KeyboardRangeInput,
  Range,
  RangeBottomPanelDemo,
  RangeCustomIconDemo,
  RangeStatusDemo,
  RangeTextAlignComparison,
  RangeTimeFormatDemo,
  RangeWithClearIcon,
  RangeWithDisabled,
  RangeWithModifyPickerValue,
  RangeWithSecondsDisabled,
  RangeWithValue,
  RegularRangeInputMode,
  SegmentedRangeInput,
  SegmentedRangeInputMode,
} from './TimeInput.stories.legacy';

const meta: Meta<typeof TimeInput> = {
  ...(legacyMeta as Meta<typeof TimeInput>),
  title: 'UI Kit/Inputs/TimeInput/Range',
};

export default meta;

export {
  KeyboardRangeInput,
  Range,
  RangeBottomPanelDemo,
  RangeCustomIconDemo,
  RangeStatusDemo,
  RangeTextAlignComparison,
  RangeTimeFormatDemo,
  RangeWithClearIcon,
  RangeWithDisabled,
  RangeWithModifyPickerValue,
  RangeWithSecondsDisabled,
  RangeWithValue,
  RegularRangeInputMode,
  SegmentedRangeInput,
  SegmentedRangeInputMode,
};
