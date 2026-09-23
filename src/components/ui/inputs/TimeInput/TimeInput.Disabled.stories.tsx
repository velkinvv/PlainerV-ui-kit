import type { Meta } from '@storybook/react';
import { TimeInput } from './TimeInput';
import legacyMeta, { DisableCopyingDemo, Disabled } from './TimeInput.stories.legacy';

const meta: Meta<typeof TimeInput> = {
  ...(legacyMeta as Meta<typeof TimeInput>),
  title: 'UI Kit/Inputs/TimeInput/Disabled',
};

export default meta;

export { DisableCopyingDemo, Disabled };
