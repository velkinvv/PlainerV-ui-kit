import type { Meta } from '@storybook/react';
import { DateInput } from './DateInput';
import legacyMeta, {
  ImprovedRangeDemo,
  RangeBottomPanelDemo,
  RangeCustomIconDemo,
  RangeDateFormatDemo,
  RangeInteractive,
  RangeMode,
  RangeStatusDemo,
  RangeTextAlignComparison,
  RangeWithModifyPickerValue,
  SegmentedRangeMode,
  SegmentedWithRangeValue,
  WithRangeValue,
} from './DateInput.stories.legacy';

const meta: Meta<typeof DateInput> = {
  ...(legacyMeta as Meta<typeof DateInput>),
  title: 'UI Kit/Inputs/DateInput/Range',
};

export default meta;

export {
  ImprovedRangeDemo,
  RangeBottomPanelDemo,
  RangeCustomIconDemo,
  RangeDateFormatDemo,
  RangeInteractive,
  RangeMode,
  RangeStatusDemo,
  RangeTextAlignComparison,
  RangeWithModifyPickerValue,
  SegmentedRangeMode,
  SegmentedWithRangeValue,
  WithRangeValue,
};
