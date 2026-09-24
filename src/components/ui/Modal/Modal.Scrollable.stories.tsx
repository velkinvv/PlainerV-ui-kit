import type { Meta } from '@storybook/react';
import legacyMeta from './Modal.stories.legacy';

const meta: Meta = {
  ...legacyMeta,
  title: 'UI Kit/Surfaces/Modal/Scrollable',
};

export default meta;

export { BestPractices as Scrollable } from './Modal.stories.legacy';
