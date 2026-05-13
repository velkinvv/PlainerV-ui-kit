import type { Decorator } from '@storybook/react';
import { motion } from 'framer-motion';
import {
  storybookFadeSlideVariants,
  useStorybookMotionTransitions,
} from '../src/handlers/storybookMotion';

/**
 * Плавное появление содержимого Canvas при смене сторис.
 * Внутренний декоратор (ближе всего к сторис): учитывает prefers-reduced-motion.
 */
export const withStorybookMotion: Decorator = (Story, context) => {
  function MotionDecorator() {
    const transitions = useStorybookMotionTransitions();
    return (
      <motion.div
        key={String(context.id)}
        variants={storybookFadeSlideVariants}
        initial="hidden"
        animate="visible"
        transition={transitions.panel}
        style={{ minHeight: 'min-content' }}
      >
        <Story />
      </motion.div>
    );
  }

  return <MotionDecorator />;
};
