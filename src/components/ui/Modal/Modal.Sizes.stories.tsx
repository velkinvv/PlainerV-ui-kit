import type { Meta } from '@storybook/react';
import legacyMeta from './Modal.stories.legacy';

const meta: Meta = {
  ...legacyMeta,
  title: 'UI Kit/Surfaces/Modal/Sizes',
};

export default meta;

export { AllSizes as Sizes, Small, Large, FullScreen } from './Modal.stories.legacy';
