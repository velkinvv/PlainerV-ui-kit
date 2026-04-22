import styled, { css } from 'styled-components';
import type { ButtonGroupOrientation } from '@/types/ui';
import { BorderRadiusHandler } from '@/handlers/uiHandlers';

/**
 * Корневая обёртка группы кнопок.
 * @property $orientation - Направление flex
 * @property $attached - Режим склеенных границ
 * @property $fullWidth - На всю ширину родителя
 */
export const ButtonGroupRoot = styled.div<{
  $orientation: ButtonGroupOrientation;
  $attached: boolean;
  $fullWidth: boolean;
}>`
  display: ${({ $fullWidth }) => ($fullWidth ? 'flex' : 'inline-flex')};
  flex-direction: ${({ $orientation }) => ($orientation === 'vertical' ? 'column' : 'row')};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  align-items: stretch;
  gap: ${({ $attached }) => ($attached ? '0' : '8px')};

  ${({ $attached, $orientation, theme }) =>
    $attached &&
    css`
      & > button {
        border-radius: 0 !important;
        position: relative;
        z-index: 0;
      }

      & > button:hover,
      & > button:focus-visible {
        z-index: 1;
      }

      ${$orientation === 'horizontal'
        ? css`
            & > button:not(:first-of-type) {
              margin-left: -1px;
            }

            & > button:first-of-type {
              border-top-left-radius: ${BorderRadiusHandler(theme.borderRadius)} !important;
              border-bottom-left-radius: ${BorderRadiusHandler(theme.borderRadius)} !important;
            }

            & > button:last-of-type {
              border-top-right-radius: ${BorderRadiusHandler(theme.borderRadius)} !important;
              border-bottom-right-radius: ${BorderRadiusHandler(theme.borderRadius)} !important;
            }
          `
        : css`
            & > button:not(:first-of-type) {
              margin-top: -1px;
            }

            & > button:first-of-type {
              border-top-left-radius: ${BorderRadiusHandler(theme.borderRadius)} !important;
              border-top-right-radius: ${BorderRadiusHandler(theme.borderRadius)} !important;
            }

            & > button:last-of-type {
              border-bottom-left-radius: ${BorderRadiusHandler(theme.borderRadius)} !important;
              border-bottom-right-radius: ${BorderRadiusHandler(theme.borderRadius)} !important;
            }
          `}
    `}
`;
