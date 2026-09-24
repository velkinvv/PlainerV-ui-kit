import type { Meta } from '@storybook/react';
import { Button } from './Button';
import legacyMeta from './Button.stories.legacy';

const meta: Meta<typeof Button> = {
  ...(legacyMeta as Meta<typeof Button>),
  title: 'UI Kit/Buttons/Button',
};

export default meta;
export * from './Button.stories.legacy';
