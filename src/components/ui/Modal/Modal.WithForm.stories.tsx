import type { Meta } from '@storybook/react';
import legacyMeta from './Modal.stories.legacy';

const meta: Meta = {
  ...legacyMeta,
  title: 'UI Kit/Surfaces/Modal/WithForm',
};

export default meta;

export { FormModal as WithForm } from './Modal.stories.legacy';
