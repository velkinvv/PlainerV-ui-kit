import type { Meta } from '@storybook/react';
import legacyMeta from './Modal.stories.legacy';

const meta: Meta = {
  ...legacyMeta,
  title: 'UI Kit/Surfaces/Modal/Nested',
};

export default meta;

export { WithChildren as Nested } from './Modal.stories.legacy';
