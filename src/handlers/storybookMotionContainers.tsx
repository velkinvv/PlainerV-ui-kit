import React from 'react';
import { motion } from 'framer-motion';
import {
  storybookStaggerContainerVariants,
  storybookStaggerItemVariants,
  useStorybookMotionTransitions,
} from '@/handlers/storybookMotion';

export type StorybookStaggerStackProps = {
  /** Дочерние блоки демо (часто несколько `<Card>...</Card>` подряд). */
  children: React.ReactNode;
  /** Вертикальный зазор между блоками в пикселях (по умолчанию как у общих колонок сторис). */
  gapPx?: number;
};

/**
 * Вертикальный столбец демо с каскадным появлением (stagger).
 * Используется на страницах «All examples» в Storybook.
 */
export function StorybookStaggerStack({ children, gapPx = 24 }: StorybookStaggerStackProps) {
  const motionTransitions = useStorybookMotionTransitions();
  const childNodes = React.Children.toArray(children);

  return (
    <motion.div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: `${gapPx}px`,
      }}
      variants={storybookStaggerContainerVariants(motionTransitions.stagger)}
      initial="hidden"
      animate="visible"
    >
      {childNodes.map((child, index) => (
        <motion.div
          key={index}
          variants={storybookStaggerItemVariants}
          transition={motionTransitions.springSoft}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
