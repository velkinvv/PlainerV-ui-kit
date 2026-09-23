import type { Meta } from '@storybook/react';
import { DateInput } from './DateInput';
import legacyMeta, {
  PickerDraftImmediatePreview,
  PrecisionMonthYearAndNames,
  PrecisionWeek,
  SinglePickerDraftOnPickerChange,
} from './DateInput.stories.legacy';

const meta: Meta<typeof DateInput> = {
  ...(legacyMeta as Meta<typeof DateInput>),
  title: 'UI Kit/Inputs/DateInput/Presets',
};

export default meta;

export {
  PickerDraftImmediatePreview,
  PrecisionMonthYearAndNames,
  PrecisionWeek,
  SinglePickerDraftOnPickerChange,
};
