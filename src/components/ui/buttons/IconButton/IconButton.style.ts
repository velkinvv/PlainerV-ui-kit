import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import type { IconButtonProps } from '../../../../types/ui';
import { ButtonVariant } from '../../../../types/ui';
import { Size } from '../../../../types/sizes';
import { getButtonSize } from '../../../../handlers/buttonThemeHandlers';

/**
 * Стилизованная иконка-кнопка
 * @param variant - вариант кнопки (дублирует ButtonVariant)
 * @param size - размер кнопки
 * @param disabled - состояние отключения
 * @param loading - состояние загрузки
 * @param fullWidth - растянуть на всю ширину
 * @param rounded - скругленные углы
 */
export const StyledIconButton = styled(motion.button).withConfig({
  shouldForwardProp: prop => !['variant', 'size', 'loading', 'fullWidth', 'rounded'].includes(prop),
})<IconButtonProps>`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  font-family: inherit;
  font-weight: 500;
  text-decoration: none;
  outline: none;
  gap: 0;
  line-height: 0;

  /* Базовые стили (fallback) - только для не-skeleton вариантов */
  ${({ variant }) =>
    variant !== ButtonVariant.SKELETON &&
    css`
      background-color: #007bff;
      color: #ffffff;
      border: 1px solid #007bff;
    `}

  /* Размеры кнопки */
  ${({ size = Size.MD }) => {
    switch (size) {
      case Size.SM:
        return css`
          width: 32px;
          height: 32px;
          min-width: 32px;
          min-height: 32px;
          font-size: 12px;
        `;
      case Size.MD:
        return css`
          width: 40px;
          height: 40px;
          min-width: 40px;
          min-height: 40px;
          font-size: 14px;
        `;
      case Size.LG:
        return css`
          width: 48px;
          height: 48px;
          min-width: 48px;
          min-height: 48px;
          font-size: 16px;
        `;
      default:
        return css`
          width: 40px;
          height: 40px;
          min-width: 40px;
          min-height: 40px;
          font-size: 14px;
        `;
    }
  }}

  /* Форма кнопки */
  ${({ rounded, size = Size.MD, theme }) =>
    rounded
      ? css`
          border-radius: 50%;
        `
      : css`
          border-radius: ${getButtonSize(theme?.buttons, size).borderRadius};
        `}

  /* Растягивание на всю ширину */
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}

  /* Стили вариантов кнопки */
  ${({ variant = ButtonVariant.PRIMARY, theme }) => {
    const variantStyles = theme?.buttons?.variants?.[variant];
    if (!variantStyles) return css``;

    // Специальная обработка для skeleton варианта
    if (variant === ButtonVariant.SKELETON) {
      return css`
        background-image: ${variantStyles.background ||
        'linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)'};
        background-size: ${(variantStyles as { backgroundSize?: string }).backgroundSize ||
        '200% 100%'};
        background-position: ${(variantStyles as { backgroundPosition?: string })
          .backgroundPosition || '-200% 0'};
        background-repeat: no-repeat;
        animation: ${(variantStyles as { animation?: string }).animation ||
        'skeleton-loading 1.5s infinite ease-in-out'};
        color: ${variantStyles.color || '#9ca3af80'};
        border: ${variantStyles.border || '2px solid #d1d5db'};

        /* В skeleton-режиме оставляем прозрачность без blur, чтобы не было оптического смещения центра. */
        .ui-icon-button-content {
          opacity: 0.7;
        }

        &:hover:not(:disabled) {
          background-image: ${variantStyles.hover?.background ||
          'linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)'};
          background-size: ${(variantStyles.hover as { backgroundSize?: string })?.backgroundSize ||
          '200% 100%'};
          background-position: ${(variantStyles.hover as { backgroundPosition?: string })
            ?.backgroundPosition || '-200% 0'};
          background-repeat: no-repeat;
          animation: ${(variantStyles.hover as { animation?: string })?.animation ||
          'skeleton-loading 1.5s infinite ease-in-out'};
          color: ${variantStyles.hover?.color || '#9ca3af80'};
          border: ${variantStyles.hover?.border || '2px solid #d1d5db'};

          .ui-icon-button-content {
            opacity: 0.7;
          }
        }

        &:active:not(:disabled) {
          background-image: ${variantStyles.active?.background ||
          'linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)'};
          background-size: ${(variantStyles.active as { backgroundSize?: string })
            ?.backgroundSize || '200% 100%'};
          background-position: ${(variantStyles.active as { backgroundPosition?: string })
            ?.backgroundPosition || '-200% 0'};
          background-repeat: no-repeat;
          animation: ${(variantStyles.active as { animation?: string })?.animation ||
          'skeleton-loading 1.5s infinite ease-in-out'};
          color: ${variantStyles.active?.color || '#9ca3af80'};
          border: ${variantStyles.active?.border || '2px solid #d1d5db'};

          .ui-icon-button-content {
            opacity: 0.7;
          }
        }

        &:focus-visible {
          border: ${variantStyles.focus?.border || '2px solid #9ca3af'};
          outline: ${variantStyles.focus?.outline || 'none'};
        }

        &:disabled {
          background-image: ${variantStyles.disabled?.background ||
          'linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)'};
          background-size: ${(variantStyles.disabled as { backgroundSize?: string })
            ?.backgroundSize || '200% 100%'};
          background-position: ${(variantStyles.disabled as { backgroundPosition?: string })
            ?.backgroundPosition || '-200% 0'};
          background-repeat: no-repeat;
          animation: ${(variantStyles.disabled as { animation?: string })?.animation ||
          'skeleton-loading 1.5s infinite ease-in-out'};
          color: ${variantStyles.disabled?.color || '#9ca3af80'};
          border: ${variantStyles.disabled?.border || '2px solid #d1d5db'};
          opacity: 0.6;
          cursor: not-allowed;

          .ui-icon-button-content {
            opacity: 0.7;
          }
        }
      `;
    }

    // Обычные стили для всех остальных вариантов
    return css`
      background-color: ${variantStyles.background};
      color: ${variantStyles.color};
      border: ${variantStyles.border};

      &:hover:not(:disabled) {
        background-color: ${variantStyles.hover.background};
        color: ${variantStyles.hover.color};
        border: ${variantStyles.hover.border};
      }

      &:active:not(:disabled) {
        background-color: ${variantStyles.active.background};
        color: ${variantStyles.active.color};
        border: ${variantStyles.active.border};
      }

      &:focus-visible {
        border: ${variantStyles.focus.border};
        outline: ${variantStyles.focus.outline || 'none'};
      }

      &:disabled {
        background-color: ${variantStyles.disabled.background};
        color: ${variantStyles.disabled.color};
        border: ${variantStyles.disabled.border};
        opacity: 0.6;
        cursor: not-allowed;
      }
    `;
  }}

  /* Состояние загрузки */
  ${({ loading }) =>
    loading &&
    css`
      cursor: wait;
      pointer-events: none;
    `}

  /* Анимации */
  transition: ${({ theme }) => theme?.buttons?.animations?.transition || 'all 0.2s ease-in-out'};
`;

/**
 * Контейнер иконки, который жёстко центрирует контент по обеим осям.
 */
export const IconContentWrapper = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  pointer-events: none;

  > svg,
  > img {
    display: block;
    margin: 0;
    flex-shrink: 0;
  }
`;

/**
 * Спиннер загрузки для иконки-кнопки
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
