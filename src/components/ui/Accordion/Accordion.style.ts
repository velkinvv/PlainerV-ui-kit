import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { Size } from '../../../types/sizes';
import { buildHoverPressMotionCss } from '../../../handlers/uiMotionStyleHandlers';

/**
 * Контейнер аккордеона
 */
export const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
`;

/**
 * Триггер аккордеона
 */
export const AccordionTrigger = styled.button<{ $size?: Size }>`
  width: 100%;
  padding: ${({ theme, $size = Size.MD }) => theme.accordions.sizes[$size].padding};
  background: ${({ theme }) => theme.accordions.variants.default.background};
  border: none;
  cursor: ${({ theme }) => theme.accordions.settings.cursor.clickable};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme, $size = Size.MD }) => theme.accordions.sizes[$size].gap};
  font-family: ${({ theme }) => theme.accordions.settings.fontFamily};
  font-size: ${({ theme, $size = Size.MD }) => theme.accordions.sizes[$size].fontSize};
  font-weight: ${({ theme }) => theme.accordions.settings.fontWeight.title};
  color: ${({ theme }) => theme.accordions.variants.default.color};
  line-height: ${({ theme, $size = Size.MD }) => theme.accordions.sizes[$size].lineHeight};
  transition: ${({ theme }) => theme.accordions.animations.transition};
  will-change: transform, background-color, color;
  user-select: ${({ theme }) => theme.accordions.settings.userSelect};

  &:hover {
    background: ${({ theme }) => theme.accordions.variants.hover.background};
    color: ${({ theme }) => theme.accordions.variants.hover.color};
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
    color: ${({ theme }) => theme.accordions.variants.default.color};
  }

  &[data-state='open'] .chevron {
    transform: rotate(-90deg); /* Поворот на -90 градусов для стрелки вниз */
  }

`;

/**
 * Контент аккордеона
 */
export const AccordionContent = styled(motion.div)`
  background: ${({ theme }) => theme.accordions.variants.default.background} !important;
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
  $position?: 'start' | 'center' | 'last';
}>`
  overflow: ${({ theme }) => theme.accordions.settings.overflow};
  background: ${({ theme }) => theme.accordions.variants.default.background};

  /* Границы и радиусы согласно позиции элемента */
  ${({ $position, theme }) => {
    const position = $position || 'center';
    const positionStyles = theme.accordions.positions[position];

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
  color: ${({ theme }) => theme.accordions.variants.default.color};
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
  color: ${({ theme }) => theme.accordions.variants.default.color};
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
  color: ${({ theme }) => theme.accordions.variants.default.color};
  line-height: ${({ theme, $size = Size.MD }) => theme.accordions.subtitleSizes[$size].lineHeight};
  text-align: ${({ $align = 'left' }) => $align};
`;
