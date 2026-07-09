import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useValuePulseMotion } from '../../../hooks/useValuePulseMotion';

/** Базовые пропсы анимации значения */
type ValueMotionBaseProps = {
  /** Ключ содержимого — при изменении запускается пульс */
  contentKey: string;
  /** Включить анимации */
  motionEnabled?: boolean;
  /** Кликабельный элемент (hover/tap) */
  interactive?: boolean;
  /** Анимировать layout при смене размера */
  layoutEnabled?: boolean;
  /** Дочерние элементы */
  children?: React.ReactNode;
};

/** Пропсы обёртки с AnimatePresence */
export type ValueMotionPresenceProps<C extends React.ElementType> = ValueMotionBaseProps & {
  /** Показывать элемент (для появления/исчезновения) */
  visible?: boolean;
  /** Стилизованный motion-компонент */
  as: C;
} & Omit<React.ComponentPropsWithoutRef<C>, 'children'>;

/** Пропсы обёртки без AnimatePresence */
export type ValueMotionProps<C extends React.ElementType> = ValueMotionBaseProps & {
  /** Стилизованный motion-комponent */
  as: C;
} & Omit<React.ComponentPropsWithoutRef<C>, 'children'>;

/**
 * Обёртка с AnimatePresence для динамических счётчиков и индикаторов.
 *
 * @param visible — монтировать элемент в DOM
 * @param contentKey — ключ для пульса при смене значения
 * @param as — styled(motion.*) компонент
 */
export function ValueMotionPresence<C extends React.ElementType>({
  visible = true,
  contentKey,
  motionEnabled = true,
  interactive = false,
  layoutEnabled = false,
  as,
  children,
  ...rest
}: ValueMotionPresenceProps<C>) {
  const Component = as as React.ElementType;
  const { motionProps } = useValuePulseMotion({
    contentKey,
    motionEnabled,
    interactive,
    layoutEnabled,
  });

  return (
    <AnimatePresence mode="popLayout">
      {visible ? (
        <Component {...rest} {...motionProps}>
          {children}
        </Component>
      ) : null}
    </AnimatePresence>
  );
}

/**
 * Обёртка без AnimatePresence — для элементов, которые всегда в DOM.
 *
 * @param contentKey — ключ для пульса при смене значения
 * @param as — styled(motion.*) компонент
 */
export function ValueMotion<C extends React.ElementType>({
  contentKey,
  motionEnabled = true,
  interactive = false,
  layoutEnabled = false,
  as,
  children,
  ...rest
}: ValueMotionProps<C>) {
  const Component = as as React.ElementType;
  const { motionProps } = useValuePulseMotion({
    contentKey,
    motionEnabled,
    interactive,
    layoutEnabled,
  });

  return (
    <Component {...rest} {...motionProps}>
      {children}
    </Component>
  );
}
