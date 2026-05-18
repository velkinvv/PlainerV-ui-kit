import type { DefaultTheme } from 'styled-components';
import type { IconProps } from '@/types/ui';

export type ModalStatusVariant = 'danger' | 'success' | 'info';

export type ModalStatusIconConfig = {
  /** Имя иконки из набора **Icon** */
  iconName: IconProps['name'];
  /** Акцентный цвет иконки и подсветки */
  accentColor: string;
};

/**
 * Конфигурация иконки статуса для `modalVariant` (кроме `default`).
 * @param variant — вариант модалки
 * @param theme — тема styled-components
 */
export function getModalStatusIconConfig(
  variant: ModalStatusVariant,
  theme: DefaultTheme,
): ModalStatusIconConfig {
  switch (variant) {
    case 'danger':
      return {
        iconName: 'IconExDanger',
        accentColor: theme.colors.danger,
      };
    case 'success':
      return {
        iconName: 'IconExCheck',
        accentColor: theme.colors.success,
      };
    case 'info':
      return {
        iconName: 'IconExInfoCircle',
        accentColor: theme.colors.info,
      };
    default: {
      const exhaustiveCheck: never = variant;
      return exhaustiveCheck;
    }
  }
}

/** Проверяет, нужна ли встроенная иконка статуса для варианта модалки. */
export function isModalStatusVariant(variant: string | undefined): variant is ModalStatusVariant {
  return variant === 'danger' || variant === 'success' || variant === 'info';
}
