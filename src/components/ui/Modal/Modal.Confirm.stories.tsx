import type { Meta } from '@storybook/react';
import legacyMeta from './Modal.stories.legacy';

const meta: Meta = {
  ...legacyMeta,
  title: 'UI Kit/Surfaces/Modal/Confirm',
};

export default meta;

export { ConfirmationModal as Confirm } from './Modal.stories.legacy';
