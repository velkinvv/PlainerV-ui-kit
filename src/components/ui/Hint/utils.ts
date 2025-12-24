import type { HintProps } from '../../../types/ui';

/**
 * Валидирует пропсы компонента Hint
 */
export const validateHintProps = (props: Pick<HintProps, 'isOpen' | 'defaultOpen'>): void => {
  if (
    process.env.NODE_ENV !== 'production' &&
    props.isOpen !== undefined &&
    props.defaultOpen !== undefined
  ) {
    // eslint-disable-next-line no-console
    console.warn(
      'Hint: нельзя использовать isOpen и defaultOpen одновременно. Используйте либо isOpen (контролируемый режим), либо defaultOpen (неконтролируемый режим).',
    );
  }
};

/**
 * Определяет режим работы компонента Hint
 */
export interface HintMode {
  isControlled: boolean;
  isUncontrolled: boolean;
  useControlledMode: boolean;
}

/**
 * Определяет режим работы hint на основе пропсов
 */
export const determineHintMode = (
  isOpen: HintProps['isOpen'],
  defaultOpen: HintProps['defaultOpen'],
): HintMode => {
  const isControlled = isOpen !== undefined;
  const isUncontrolled = defaultOpen !== undefined && !isControlled;
  const useControlledMode = isControlled || isUncontrolled;

  return {
    isControlled,
    isUncontrolled,
    useControlledMode,
  };
};

/**
 * Вычисляет финальное значение видимости hint
 */
export const calculateIsOpenValue = (
  isControlled: boolean,
  isUncontrolled: boolean,
  isOpen: boolean | undefined,
  internalIsOpen: boolean,
): boolean | undefined => {
  if (isControlled) {
    return isOpen;
  }
  if (isUncontrolled) {
    return internalIsOpen;
  }
  return undefined;
};
