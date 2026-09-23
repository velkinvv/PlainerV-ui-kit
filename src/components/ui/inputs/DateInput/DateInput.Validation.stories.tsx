import type { Meta } from '@storybook/react';
import { DateInput } from './DateInput';
import legacyMeta, {
  SegmentedStatusDemo,
  SegmentedWithDisabledDates,
  StatusDemo,
  WithDisabledDates,
  WithDisabledDays,
  WithDisabledMonths,
  WithDisabledYears,
  WithError,
  WithMinMaxDates,
  WithMultipleDisabledOptions,
} from './DateInput.stories.legacy';

const meta: Meta<typeof DateInput> = {
  ...(legacyMeta as Meta<typeof DateInput>),
  title: 'UI Kit/Inputs/DateInput/Validation',
};

export default meta;

export {
  SegmentedStatusDemo,
  SegmentedWithDisabledDates,
  StatusDemo,
  WithDisabledDates,
  WithDisabledDays,
  WithDisabledMonths,
  WithDisabledYears,
  WithError,
  WithMinMaxDates,
  WithMultipleDisabledOptions,
};
