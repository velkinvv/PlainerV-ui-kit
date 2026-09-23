import type { Meta } from '@storybook/react';
import { DateInput } from './DateInput';
import legacyMeta, { DisableCopyingDemo, Disabled, SegmentedDisabled } from './DateInput.stories.legacy';

const meta: Meta<typeof DateInput> = {
  ...(legacyMeta as Meta<typeof DateInput>),
  title: 'UI Kit/Inputs/DateInput/Disabled',
};

export default meta;

export { DisableCopyingDemo, Disabled, SegmentedDisabled };
