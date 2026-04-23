import styled, { css } from 'styled-components';
import type { ButtonGroupAttachedShape, ButtonGroupOrientation } from '@/types/ui';
import { Size } from '@/types/sizes';
import { getButtonGroupAttachedOuterRadius } from './handlers';

/** Прямые потомки: нативная кнопка, ссылка-кнопка, motion.button от `Button`/`IconButton` */
const attachedSegmentChildSelector = '& > button, & > a.ui-button';

/**
 * Корневая обёртка группы кнопок.
 * @property $orientation - Направление flex
 * @property $attached - Режим склеенных границ (gap 0, общий силуэт по макету Figma)
 * @property $size - Размер для внешнего радиуса сегментов
 * @property $attachedShape - Сегмент или капсула
 * @property $fullWidth - На всю ширину родителя
 */
export const ButtonGroupRoot = styled.div<{
  $orientation: ButtonGroupOrientation;
  $attached: boolean;
  $size: Size;
  $attachedShape: ButtonGroupAttachedShape;
  $fullWidth: boolean;
}>`
  display: ${({ $fullWidth }) => ($fullWidth ? 'flex' : 'inline-flex')};
  flex-direction: ${({ $orientation }) => ($orientation === 'vertical' ? 'column' : 'row')};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  align-items: stretch;
  gap: ${({ $attached }) => ($attached ? '0' : '8px')};

  ${({ $attached, $orientation, $size, $attachedShape }) =>
    $attached &&
    css`
      /* Обрезка по общему контуру, как в макете (единый прямоугольник / капсула) */
      border-radius: ${getButtonGroupAttachedOuterRadius($size, $attachedShape)};
      overflow: hidden;

      ${attachedSegmentChildSelector} {
        border-radius: 0 !important;
        position: relative;
        z-index: 0;
      }

      ${attachedSegmentChildSelector}:hover,
      ${attachedSegmentChildSelector}:focus-visible {
        z-index: 1;
      }

      ${$orientation === 'horizontal'
        ? css`
            ${attachedSegmentChildSelector}:not(:first-of-type) {
              margin-left: -1px;
            }

            ${attachedSegmentChildSelector}:first-of-type {
              border-top-left-radius: ${getButtonGroupAttachedOuterRadius($size, $attachedShape)} !important;
              border-bottom-left-radius: ${getButtonGroupAttachedOuterRadius($size, $attachedShape)} !important;
              border-top-right-radius: 0 !important;
              border-bottom-right-radius: 0 !important;
            }

            ${attachedSegmentChildSelector}:last-of-type {
              border-top-right-radius: ${getButtonGroupAttachedOuterRadius($size, $attachedShape)} !important;
              border-bottom-right-radius: ${getButtonGroupAttachedOuterRadius($size, $attachedShape)} !important;
              border-top-left-radius: 0 !important;
              border-bottom-left-radius: 0 !important;
            }
          `
        : css`
            ${attachedSegmentChildSelector}:not(:first-of-type) {
              margin-top: -1px;
            }

            ${attachedSegmentChildSelector}:first-of-type {
              border-top-left-radius: ${getButtonGroupAttachedOuterRadius($size, $attachedShape)} !important;
              border-top-right-radius: ${getButtonGroupAttachedOuterRadius($size, $attachedShape)} !important;
              border-bottom-left-radius: 0 !important;
              border-bottom-right-radius: 0 !important;
            }

            ${attachedSegmentChildSelector}:last-of-type {
              border-bottom-left-radius: ${getButtonGroupAttachedOuterRadius($size, $attachedShape)} !important;
              border-bottom-right-radius: ${getButtonGroupAttachedOuterRadius($size, $attachedShape)} !important;
              border-top-left-radius: 0 !important;
              border-top-right-radius: 0 !important;
            }
          `}
    `}

  ${({ $attached, $fullWidth, $orientation }) =>
    $attached &&
    $fullWidth &&
    $orientation === 'horizontal' &&
    css`
      ${attachedSegmentChildSelector} {
        flex: 1;
        min-width: 0;
      }
    `}
`;
