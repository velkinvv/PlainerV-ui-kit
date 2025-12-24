import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { type ButtonProps, ButtonVariant } from '../../../../types/ui';
import { Size } from '../../../../types/sizes';
import {
  getButtonSize,
  getButtonVariant,
  getButtonAnimations,
  getButtonSettings,
} from '../../../../handlers/buttonThemeHandlers';

/**
 * Стилизованная кнопка
 * @param variant - вариант кнопки (PRIMARY, SECONDARY, OUTLINE, LINE, GHOST, DANGER, SUCCESS)
 * @param size - размер кнопки
 * @param disabled - состояние отключения
 * @param loading - состояние загрузки
 * @param fullWidth - полная ширина
 * @param rounded - скругленные углы
 */
export const StyledButton = styled(motion.button).withConfig({
  shouldForwardProp: prop => !['loading', 'fullWidth', 'rounded'].includes(prop),
})<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  outline: none;

  /* Базовые стили из темы */
  ${({ theme, size = Size.MD }) => {
    const buttonSize = getButtonSize(theme.buttons, size);
    const settings = getButtonSettings(theme.buttons);
    const animations = getButtonAnimations(theme.buttons);

    return css`
      font-family: ${settings.fontFamily};
      font-weight: ${settings.fontWeight.default};
      line-height: ${settings.lineHeight};
      text-align: ${settings.textAlign};
      text-decoration: none;
      user-select: ${settings.userSelect};
      white-space: ${settings.whiteSpace};
      cursor: ${settings.cursor.default};
      transition: ${animations.transition};

      /* Размеры и отступы */
      min-height: ${buttonSize.minHeight};
      padding: ${buttonSize.padding};
      gap: ${buttonSize.gap};
      border-radius: ${buttonSize.borderRadius};
      font-size: ${buttonSize.fontSize};

      /* Минимальная ширина для XL размера */
      ${buttonSize.minWidth &&
      css`
        min-width: ${buttonSize.minWidth};
      `}
    `;
  }}

  /* Полная ширина */
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}

  /* Скругленные углы */
  ${({ rounded }) =>
    rounded &&
    css`
      border-radius: 50px;
    `}

  /* Состояние загрузки */
  ${({ theme, loading }) =>
    loading &&
    css`
      cursor: ${getButtonSettings(theme.buttons).cursor.loading};
    `}

  /* Состояние отключения */
  ${({ theme, disabled }) =>
    disabled &&
    css`
      cursor: ${getButtonSettings(theme.buttons).cursor.disabled};
    `}

  /* Варианты кнопок */
  ${({ theme, variant = ButtonVariant.PRIMARY, disabled, loading, size = Size.MD }) => {
    const isDisabled = disabled || loading;
    const variantStyles = getButtonVariant(theme.buttons, variant);
    const settings = getButtonSettings(theme.buttons);

    return css`
      ${variant === ButtonVariant.SKELETON
        ? css`
            background-image: ${variantStyles.background};
            background-size: ${(variantStyles as { backgroundSize?: string }).backgroundSize};
            background-position: ${(variantStyles as { backgroundPosition?: string })
              .backgroundPosition};
            background-repeat: no-repeat;
            animation: ${(variantStyles as { animation?: string }).animation};
          `
        : css`
            background-color: ${variantStyles.background};
          `}
      color: ${variantStyles.color};
      border: ${variantStyles.border};

      /* Специальный вес шрифта для LG размера в некоторых вариантах */
      ${size === Size.LG &&
      (variant === ButtonVariant.SECONDARY ||
        variant === ButtonVariant.OUTLINE ||
        variant === ButtonVariant.LINE ||
        variant === ButtonVariant.GHOST ||
        variant === ButtonVariant.DANGER ||
        variant === ButtonVariant.SUCCESS) &&
      css`
        font-weight: ${settings.fontWeight.large};
      `}

      &:hover:not(:disabled) {
        ${variant === ButtonVariant.SKELETON
          ? css`
              background-image: ${variantStyles.hover.background};
              background-size: ${(variantStyles.hover as { backgroundSize?: string })
                .backgroundSize};
              background-position: ${(variantStyles.hover as { backgroundPosition?: string })
                .backgroundPosition};
              animation: ${(variantStyles.hover as { animation?: string }).animation};
            `
          : css`
              background-color: ${variantStyles.hover.background};
            `}
        border-color: ${variantStyles.hover.border};
        ${variantStyles.hover.color && `color: ${variantStyles.hover.color};`}
        ${'textDecoration' in variantStyles.hover &&
        variantStyles.hover.textDecoration &&
        `text-decoration: ${variantStyles.hover.textDecoration};`}
      }

      &:active:not(:disabled) {
        ${variant === ButtonVariant.SKELETON
          ? css`
              background-image: ${variantStyles.active.background};
              background-size: ${(variantStyles.active as { backgroundSize?: string })
                .backgroundSize};
              background-position: ${(variantStyles.active as { backgroundPosition?: string })
                .backgroundPosition};
              animation: ${(variantStyles.active as { animation?: string }).animation};
            `
          : css`
              background-color: ${variantStyles.active.background};
            `}
        border-color: ${variantStyles.active.border};
        ${variantStyles.active.color && `color: ${variantStyles.active.color};`}
      }

      &:focus-visible {
        border: ${variantStyles.focus.border};
        ${variantStyles.focus.outline && `outline: ${variantStyles.focus.outline};`}
      }

      ${isDisabled &&
      css`
        ${variant === ButtonVariant.SKELETON
          ? css`
              background-image: ${variantStyles.disabled.background};
              background-size: ${(variantStyles.disabled as { backgroundSize?: string })
                .backgroundSize};
              background-position: ${(variantStyles.disabled as { backgroundPosition?: string })
                .backgroundPosition};
              animation: ${(variantStyles.disabled as { animation?: string }).animation};
            `
          : css`
              background-color: ${variantStyles.disabled.background};
            `}
        border-color: ${variantStyles.disabled.border};
        color: ${variantStyles.disabled.color};
        cursor: ${settings.cursor.disabled};
        ${'textDecoration' in variantStyles.disabled &&
        variantStyles.disabled.textDecoration &&
        `text-decoration: ${variantStyles.disabled.textDecoration};`}
      `}
    `;
  }}

  /* Анимации */
  &:not(:disabled):not([data-loading="true"]) {
    transition: all 0.2s ease-in-out;
  }
`;

/**
 * Контейнер для состояния загрузки
 */
export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: inherit;
  font-weight: inherit;
`;

/**
 * Спиннер загрузки
 */
export const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
