import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { Size } from '../../../types/sizes';
import type { AccordionTheme, Colors, ThemeColorScheme } from '../../../types/theme';
import { buildHoverPressMotionCss } from '../../../handlers/uiMotionStyleHandlers';
import {
  getAccordionPositionStyles,
  getAccordionSurfaceTokens,
  type AccordionItemPosition,
} from '../../../handlers/accordionGlassHandlers';

type AccordionStyledThemeSlice = {
  mode: ThemeColorScheme;
  colors: Colors;
  accordions: AccordionTheme;
};

/**
 * Контекст темы аккордеона для резолва glass-токенов.
 * @param theme — styled-components theme
 */
const getAccordionThemeContext = (theme: AccordionStyledThemeSlice) => ({
  mode: theme.mode,
  colors: theme.colors,
  accordions: theme.accordions,
});

/**
 * CSS vibrancy для glass-аккордеона.
 * @param theme — styled-components theme
 */
const accordionGlassBackdropCss = (theme: AccordionStyledThemeSlice) => {
  const backdropFilter = theme.accordions?.settings?.backdropFilter;

  return backdropFilter
    ? css`
        backdrop-filter: ${backdropFilter};
        -webkit-backdrop-filter: ${backdropFilter};
      `
    : '';
};

/**
 * Контейнер аккордеона
 * @param $firstItemBorderRadius — скругление верхних углов первого элемента
 * @param $lastItemBorderRadius — скругление нижних углов последнего элемента
 */
export const AccordionContainer = styled.div<{
  $firstItemBorderRadius?: boolean;
  $lastItemBorderRadius?: boolean;
}>`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;

  & > .ui-accordion-item:first-child {
    ${({ $firstItemBorderRadius = true }) =>
      !$firstItemBorderRadius &&
      css`
        border-top-left-radius: 0 !important;
        border-top-right-radius: 0 !important;
      `}
  }

  & > .ui-accordion-item:last-child {
    ${({ $lastItemBorderRadius = true }) =>
      !$lastItemBorderRadius &&
      css`
        border-bottom-left-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
      `}
  }
`;

/**
 * Триггер аккордеона
 */
export const AccordionTrigger = styled.button<{ $size?: Size }>`
  width: 100%;
  padding: ${({ theme, $size = Size.MD }) => theme.accordions.sizes[$size].padding};
  background: ${({ theme }) => getAccordionSurfaceTokens(getAccordionThemeContext(theme)).background};
  border: none;
  cursor: ${({ theme }) => theme.accordions.settings.cursor.clickable};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme, $size = Size.MD }) => theme.accordions.sizes[$size].gap};
  font-family: ${({ theme }) => theme.accordions.settings.fontFamily};
  font-size: ${({ theme, $size = Size.MD }) => theme.accordions.sizes[$size].fontSize};
  font-weight: ${({ theme }) => theme.accordions.settings.fontWeight.title};
  color: ${({ theme }) => getAccordionSurfaceTokens(getAccordionThemeContext(theme)).textColor};
  line-height: ${({ theme, $size = Size.MD }) => theme.accordions.sizes[$size].lineHeight};
  transition: ${({ theme }) => theme.accordions.animations.transition};
  will-change: transform, background-color, color;
  user-select: ${({ theme }) => theme.accordions.settings.userSelect};

  &:hover {
    background: ${({ theme }) =>
      getAccordionSurfaceTokens(getAccordionThemeContext(theme)).hoverBackground};
    color: ${({ theme }) => getAccordionSurfaceTokens(getAccordionThemeContext(theme)).textColor};
  }
  ${buildHoverPressMotionCss({
    hoverSelector: '&:hover',
    activeSelector: '&:active',
    hoverTransform: 'translateY(-1px)',
    activeTransform: 'scale(0.98)',
  })}

  &:focus {
    outline: none;
  }

  .chevron {
    transition: ${({ theme }) => theme.accordions.animations.chevronTransition};
    width: ${({ theme, $size = Size.MD }) => theme.accordions.iconSizes[$size].width};
    height: ${({ theme, $size = Size.MD }) => theme.accordions.iconSizes[$size].height};
    color: ${({ theme }) => getAccordionSurfaceTokens(getAccordionThemeContext(theme)).textColor};
  }

  &[data-state='open'] .chevron {
    transform: rotate(-90deg); /* Поворот на -90 градусов для стрелки вниз */
  }
`;

/**
 * Контент аккордеона
 */
export const AccordionContent = styled(motion.div)`
  background: ${({ theme }) =>
    getAccordionSurfaceTokens(getAccordionThemeContext(theme)).background} !important;
  overflow: ${({ theme }) => theme.accordions.settings.overflow};
  position: relative;
  z-index: ${({ theme }) => theme.accordions.settings.zIndex};
  will-change: height, opacity;
`;

/**
 * Контейнер элемента аккордеона
 * @param position - позиция элемента (start, center, last)
 */
export const AccordionItemContainer = styled.div<{
  $position?: AccordionItemPosition;
}>`
  overflow: ${({ theme }) => theme.accordions.settings.overflow};
  background: ${({ theme }) => getAccordionSurfaceTokens(getAccordionThemeContext(theme)).background};
  ${({ theme }) => accordionGlassBackdropCss(getAccordionThemeContext(theme))}

  /* Границы и радиусы согласно позиции элемента */
  ${({ $position, theme }) => {
    const position = $position || 'center';
    const positionStyles = getAccordionPositionStyles(position, getAccordionThemeContext(theme));

    return css`
      border-radius: ${positionStyles.borderRadius};
      ${positionStyles.borderTop && `border-top: ${positionStyles.borderTop};`}
      ${positionStyles.borderBottom && `border-bottom: ${positionStyles.borderBottom};`}
      ${positionStyles.borderLeft && `border-left: ${positionStyles.borderLeft};`}
      ${positionStyles.borderRight && `border-right: ${positionStyles.borderRight};`}
    `;
  }}

  &:not(:last-child) {
    margin-bottom: 0;
  }
`;

/**
 * Внутренний контент аккордеона
 * @param align - выравнивание текста
 */
export const ContentInner = styled.div<{
  $align?: 'left' | 'center' | 'right';
  $size?: Size;
}>`
  padding: ${({ theme, $size = Size.MD }) => theme.accordions.contentSizes[$size].padding};
  font-family: ${({ theme }) => theme.accordions.settings.fontFamily};
  font-size: ${({ theme, $size = Size.MD }) => theme.accordions.contentSizes[$size].fontSize};
  font-weight: ${({ theme }) => theme.accordions.settings.fontWeight.content};
  color: ${({ theme }) => getAccordionSurfaceTokens(getAccordionThemeContext(theme)).textColor};
  line-height: ${({ theme, $size = Size.MD }) => theme.accordions.contentSizes[$size].lineHeight};
  text-align: ${({ $align = 'left' }) => $align};
`;

/**
 * Заголовок аккордеона
 * @param align - выравнивание текста
 */
export const AccordionHeader = styled.div<{
  $align?: 'left' | 'center' | 'right';
  $size?: Size;
}>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme, $size = Size.MD }) => theme.accordions.sizes[$size].gap};
  flex: 1;
  text-align: ${({ $align = 'left' }) => $align};
`;

/**
 * Заголовок аккордеона
 * @param align - выравнивание текста
 */
export const AccordionTitle = styled.div<{
  $align?: 'left' | 'center' | 'right';
  $size?: Size;
}>`
  font-family: ${({ theme }) => theme.accordions.settings.fontFamily};
  font-size: ${({ theme, $size = Size.MD }) => theme.accordions.sizes[$size].fontSize};
  font-weight: ${({ theme }) => theme.accordions.settings.fontWeight.title};
  color: ${({ theme }) => getAccordionSurfaceTokens(getAccordionThemeContext(theme)).textColor};
  line-height: ${({ theme, $size = Size.MD }) => theme.accordions.sizes[$size].lineHeight};
  text-align: ${({ $align = 'left' }) => $align};
`;

/**
 * Подзаголовок аккордеона
 * @param align - выравнивание текста
 */
export const AccordionSubtitle = styled.div<{
  $align?: 'left' | 'center' | 'right';
  $size?: Size;
}>`
  font-family: ${({ theme }) => theme.accordions.settings.fontFamily};
  font-size: ${({ theme, $size = Size.MD }) => theme.accordions.subtitleSizes[$size].fontSize};
  font-weight: ${({ theme }) => theme.accordions.settings.fontWeight.subtitle};
  color: ${({ theme }) => getAccordionSurfaceTokens(getAccordionThemeContext(theme)).textColor};
  line-height: ${({ theme, $size = Size.MD }) => theme.accordions.subtitleSizes[$size].lineHeight};
  text-align: ${({ $align = 'left' }) => $align};
`;
