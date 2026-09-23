import type { Decorator } from '@storybook/react';
import { motion } from 'framer-motion';
import {
  storybookFadeSlideVariants,
  useStorybookMotionTransitions,
} from '../src/handlers/storybookMotion';

/** Параметры сторис для включения анимации появления: `parameters.storybookMotion.enabled`. */
export type StorybookMotionParameters = {
  enabled?: boolean;
};

/**
 * Плавное появление содержимого Canvas при смене сторис.
 * Opt-in: обёртка `framer-motion` создаётся только если сторис явно запросила
 * `parameters.storybookMotion = { enabled: true }`; по умолчанию canvas без анимации.
 */
export const withStorybookMotion: Decorator = (Story, context) => {
  const motionParameters = context.parameters?.storybookMotion as StorybookMotionParameters | undefined;

  if (!motionParameters?.enabled) {
    return <Story />;
  }

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
