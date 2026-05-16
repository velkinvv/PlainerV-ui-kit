import styled, { css } from 'styled-components';
import {
  HintPosition,
  HintAnimationPreset as AnimationPreset,
  type HintVariant,
  type HintCssMixin,
  type HintAnimationPreset,
} from '../../../types/ui';
import { Size } from '../../../types/sizes';
import {
  buildHoverPressMotionCss,
  buildSurfaceTransitionCss,
  uiMotionSurfaceEasing,
} from '../../../handlers/uiMotionStyleHandlers';
import { ZIndexHandler } from '../../../handlers/uiHandlers';

/**
 * Внешний контейнер для hint (AnchorWrapper)
 */
export const AnchorWrapper = styled.div<{
  $anchorCssMixin?: HintCssMixin;
}>`
  display: inline-block;
  ${({ $anchorCssMixin }) => $anchorCssMixin ?? ''}
`;

/**
 * Триггер hint
 */
export const HintTrigger = styled.div`
  display: inline-block;
  cursor: help;
  transition: transform 0.12s ease;
  ${buildHoverPressMotionCss({
    hoverSelector: '&:hover',
    activeSelector: '&:active',
    hoverTransform: 'none',
    activeTransform: 'scale(0.98)',
  })}
`;

/**
 * Контент hint
 */
export const HintContent = styled.div<{
  $size?: Size;
  $isVisible: boolean;
  $position: { x: number; y: number };
  $placement?: HintPosition;
  $maxWidth?: number;
  $variant?: HintVariant;
  $clickable?: boolean;
  $showArrow?: boolean;
  $animationPreset?: HintAnimationPreset;
  $animationDuration?: number;
  $zIndex?: number;
  $mobile?: boolean;
}>`
  position: fixed;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 500;
  z-index: ${({ $zIndex }) => $zIndex ?? ZIndexHandler('hint')};
  pointer-events: ${({ $isVisible, $clickable }) =>
    $isVisible ? ($clickable ? 'auto' : 'none') : 'none'};
  user-select: ${({ theme }) => theme.hints.settings.userSelect};
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
  max-width: ${({ $maxWidth, $mobile }) => ($mobile ? '90vw' : $maxWidth || 300)}px;
  word-wrap: ${({ theme }) => theme.hints.settings.wordWrap};
  white-space: ${({ theme }) => theme.hints.settings.whiteSpace};
  display: ${({ theme }) => theme.hints.settings.display};
  align-items: ${({ theme }) => theme.hints.settings.alignItems};
  justify-content: ${({ theme }) => theme.hints.settings.justifyContent};
  will-change: transform, opacity;

  /* Мобильный режим */
  ${({ $mobile }) =>
    $mobile &&
    css`
      font-size: 16px; /* Увеличенный размер для touch-интерфейса */
      padding: 12px 16px; /* Увеличенные отступы */
      max-width: 90vw;
      border-radius: 12px;
    `}

  /* Размеры из темы */
  ${({ $size = Size.MD, theme }) => {
    const sizeConfig = theme.hints.sizes[$size];
    return css`
      font-size: ${sizeConfig.fontSize};
      line-height: ${sizeConfig.lineHeight};
      padding: ${sizeConfig.padding};
      border-radius: ${sizeConfig.borderRadius};
      gap: ${sizeConfig.gap};
    `;
  }}

  /* Варианты из темы */
  ${({ $variant = 'default', theme }) => {
    const variantConfig = theme.hints.variants[$variant as keyof typeof theme.hints.variants];
    return css`
      background: ${variantConfig.background};
      color: ${variantConfig.color};
      border: ${variantConfig.border};
      box-shadow: ${variantConfig.boxShadow};
    `;
  }}

  /* Состояния из темы с учетом позиционирования и анимации (аналогично Tooltip) */
  ${({ $isVisible, $placement, $animationPreset = AnimationPreset.FADE, theme }) => {
    const stateConfig = $isVisible ? theme.hints.states.visible : theme.hints.states.hidden;

    // Определяем базовую трансформацию в зависимости от позиции (как в Tooltip)
    const baseTransform = (() => {
      if (!$placement) return 'translate(-50%, -50%)';

      if ($placement === HintPosition.TOP) {
        return 'translateX(-50%) translateY(-100%)';
      }
      if ($placement === HintPosition.BOTTOM) {
        return 'translateX(-50%)';
      }
      if ($placement === HintPosition.LEFT) {
        return 'translateY(-50%) translateX(-100%)';
      }
      if ($placement === HintPosition.RIGHT) {
        return 'translateY(-50%)';
      }
      // Для угловых позиций
      if ($placement === HintPosition.TOP_LEFT) {
        return 'translateY(-100%)';
      }
      if ($placement === HintPosition.TOP_RIGHT) {
        return 'translateX(-100%) translateY(-100%)';
      }
      if ($placement === HintPosition.BOTTOM_LEFT) {
        return '';
      }
      if ($placement === HintPosition.BOTTOM_RIGHT) {
        return 'translateX(-100%)';
      }
      return 'translate(-50%, -50%)';
    })();

    // Определяем трансформацию в зависимости от типа анимации
    let transform = baseTransform;
    if ($animationPreset === AnimationPreset.SCALE) {
      const scale = $isVisible ? 'scale(1)' : 'scale(0.8)';
      transform = `${baseTransform} ${scale}`;
    } else if ($animationPreset === AnimationPreset.SLIDE) {
      // Для slide добавляем смещение в зависимости от позиции
      if (!$isVisible) {
        let slideOffset = '';
        if ($placement === HintPosition.TOP) {
          slideOffset = 'translateY(10px)';
        } else if ($placement === HintPosition.BOTTOM) {
          slideOffset = 'translateY(-10px)';
        } else if ($placement === HintPosition.LEFT) {
          slideOffset = 'translateX(10px)';
        } else if ($placement === HintPosition.RIGHT) {
          slideOffset = 'translateX(-10px)';
        }
        if (slideOffset) {
          transform = `${baseTransform} ${slideOffset}`;
        } else {
          transform = `${baseTransform} scale(0.95)`;
        }
      } else {
        transform = baseTransform;
      }
    } else if ($animationPreset === AnimationPreset.FADE) {
      const scale = $isVisible ? 'scale(1)' : 'scale(0.95)';
      transform = `${baseTransform} ${scale}`;
    }

    return css`
      opacity: ${stateConfig.opacity};
      visibility: ${stateConfig.visibility};
      transform: ${transform};
    `;
  }}

  /* Анимация из темы или кастомная */
  ${({ $animationPreset = AnimationPreset.FADE, $animationDuration, theme }) => {
    const duration = $animationDuration ?? theme.hints.animations.duration;
    const durationMs = `${duration}ms`;

    switch ($animationPreset) {
      case AnimationPreset.FADE:
        return css`
          ${buildSurfaceTransitionCss(
            `opacity ${durationMs} ${uiMotionSurfaceEasing},
             visibility ${durationMs} ${uiMotionSurfaceEasing},
             transform ${durationMs} ${uiMotionSurfaceEasing}`,
          )}
        `;
      case AnimationPreset.SLIDE:
        return css`
          ${buildSurfaceTransitionCss(
            `opacity ${durationMs} ${theme.hints.animations.easing},
             visibility ${durationMs} ${theme.hints.animations.easing},
             transform ${durationMs} cubic-bezier(0.4, 0, 0.2, 1)`,
          )}
        `;
      case AnimationPreset.SCALE:
        return css`
          ${buildSurfaceTransitionCss(
            `opacity ${durationMs} ${theme.hints.animations.easing},
             visibility ${durationMs} ${theme.hints.animations.easing},
             transform ${durationMs} cubic-bezier(0.34, 1.56, 0.64, 1)`,
          )}
        `;
      case AnimationPreset.NONE:
        return buildSurfaceTransitionCss('none');
      default:
        return css`
          ${buildSurfaceTransitionCss(theme.hints.animations.transition)}
        `;
    }
  }}

  /* Позиционирование */
  left: ${({ $position }) => $position.x}px;
  top: ${({ $position }) => $position.y}px;

  /* Стрелка */
  ${({ $showArrow, $placement, $variant = 'default', $isVisible, theme }) => {
    if (!$showArrow) return '';

    const variantConfig = theme.hints.variants[$variant as keyof typeof theme.hints.variants];
    // Извлекаем цвет границы для стрелки (убираем "1px solid " если есть)
    const borderColor =
      variantConfig.border.replace(/^\d+px\s+solid\s+/, '') || variantConfig.border;

    return css`
      &::after {
        content: '';
        position: absolute;
        z-index: 1;
        opacity: ${$isVisible ? 1 : 0};
        transition: opacity 0.2s ease-in-out;

        ${() => {
          if ($placement === HintPosition.TOP) {
            return css`
              bottom: -8px;
              left: 50%;
              transform: translateX(-50%);
              width: 0;
              height: 0;
              border-left: 8px solid transparent;
              border-right: 8px solid transparent;
              border-top: 8px solid ${borderColor};
            `;
          }
          if ($placement === HintPosition.BOTTOM) {
            return css`
              top: -8px;
              left: 50%;
              transform: translateX(-50%);
              width: 0;
              height: 0;
              border-left: 8px solid transparent;
              border-right: 8px solid transparent;
              border-bottom: 8px solid ${borderColor};
            `;
          }
          if ($placement === HintPosition.LEFT) {
            return css`
              right: 0px;
              top: 50%;
              transform: translateY(-50%) translateX(50%);
              width: 0;
              height: 0;
              border-top: 8px solid transparent;
              border-bottom: 8px solid transparent;
              border-left: 8px solid ${borderColor};
            `;
          }
          if ($placement === HintPosition.RIGHT) {
            return css`
              left: 0px;
              top: 50%;
              transform: translateY(-50%) translateX(-50%);
              width: 0;
              height: 0;
              border-top: 8px solid transparent;
              border-bottom: 8px solid transparent;
              border-right: 8px solid ${borderColor};
            `;
          }
          // Для угловых позиций стрелка направлена к центру элемента
          if ($placement === HintPosition.TOP_LEFT) {
            return css`
              bottom: -8px;
              left: 12px;
              width: 0;
              height: 0;
              border-left: 8px solid transparent;
              border-right: 8px solid transparent;
              border-top: 8px solid ${borderColor};
            `;
          }
          if ($placement === HintPosition.TOP_RIGHT) {
            return css`
              bottom: -8px;
              right: 12px;
              width: 0;
              height: 0;
              border-left: 8px solid transparent;
              border-right: 8px solid transparent;
              border-top: 8px solid ${borderColor};
            `;
          }
          if ($placement === HintPosition.BOTTOM_LEFT) {
            return css`
              top: -8px;
              left: 12px;
              width: 0;
              height: 0;
              border-left: 8px solid transparent;
              border-right: 8px solid transparent;
              border-bottom: 8px solid ${borderColor};
            `;
          }
          if ($placement === HintPosition.BOTTOM_RIGHT) {
            return css`
              top: -8px;
              right: 12px;
              width: 0;
              height: 0;
              border-left: 8px solid transparent;
              border-right: 8px solid transparent;
              border-bottom: 8px solid ${borderColor};
            `;
          }
          return '';
        }}
      }
    `;
  }}
`;

/**
 * Контейнер для содержимого hint с крестиком
 */
export const HintContentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

/**
 * Контент hint (текст/HTML)
 */
export const HintTextContent = styled.div`
  flex: 1;
`;

/**
 * Иконка в hint
 */
export const HintIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-right: 8px;
`;

/**
 * Контейнер для кнопок действий
 */
export const HintActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
  flex-wrap: wrap;
`;

/**
 * Футер hint
 */
export const HintFooter = styled.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

/**
 * Крестик для закрытия hint
 */
export const HintCloseButton = styled.button`
  position: relative;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 0;
  margin: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  color: inherit;
  opacity: 0.7;
  transition:
    opacity 0.2s ease-in-out,
    background-color 0.2s ease-in-out,
    transform 0.12s ease;
  border-radius: 4px;
  ${buildHoverPressMotionCss({
    hoverSelector: '&:hover',
    activeSelector: '&:active',
    hoverTransform: 'translateY(-1px)',
    activeTransform: 'scale(0.96)',
  })}

  &:hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.05);
  }

  &:focus {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 1.5px;
    background: currentColor;
    border-radius: 1px;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;

/**
 * Контейнер для элементов тура
 */
export const HintTourContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

/**
 * Индикатор прогресса тура
 */
export const HintTourProgress = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  color: inherit;
  opacity: 0.8;
`;

/**
 * Контейнер для кнопок навигации тура
 */
export const HintTourControls = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

/**
 * Обертка для highlight элемента в туре
 */
export const HintTourHighlight = styled.div`
  position: relative;
  display: inline-block;

  &::before {
    content: '';
    position: fixed;
    inset: 0;
    border: 2px solid ${({ theme }) => theme.colors.primary};
    border-radius: 8px;
    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.3);
    pointer-events: none;
    z-index: 999;
  }
`;
