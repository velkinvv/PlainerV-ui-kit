import type { Meta, StoryObj } from '@storybook/react';
import { ValueMotionShowcase } from './ValueMotionShowcase';

const meta: Meta = {
  title: 'UI Kit/Motion/Value Motion',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Интерактивная витрина анимаций счётчиков и индикаторов на базе `ValueMotion`, `ValueMotionPresence` и `BadgePresence`: появление, пульс при смене значения, исчезновение. Учитывается `prefers-reduced-motion`.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

/** Все сценарии анимации в одном интерактивном превью */
export const AnimatedCounters: Story = {
  render: () => <ValueMotionShowcase />,
};
