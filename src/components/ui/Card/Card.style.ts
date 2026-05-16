import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { CardVariant, type CardProps } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import type { ThemeType } from '../../../types/theme';

/**
 * Нормализует входной размер карточки к ключам темы (`XS | SM | MD | LG | XL`).
 * Поддерживает как enum-значения, так и строковые варианты в нижнем регистре из сторис.
 * @param rawSize - входящее значение `size`/`padding` из пропсов карточки
 */
const resolveCardSizeKey = (rawSize: CardProps['size'] | CardProps['padding']): Size => {
  if (typeof rawSize !== 'string' || rawSize.length === 0) {
    return Size.MD;
  }

  const normalizedSize = rawSize.toUpperCase() as keyof typeof Size;
  return Size[normalizedSize] ?? Size.MD;
};

/**
 * Возвращает настройки размера карточки с безопасным fallback на `MD`.
 * @param theme - активная тема styled-components
 * @param rawSize - входящее значение `size`/`padding` из пропсов карточки
 */
const getCardSizeSettings = (
  theme: ThemeType,
  rawSize: CardProps['size'] | CardProps['padding'],
): ThemeType['cards']['sizes'][Size] => {
  const resolvedSize = resolveCardSizeKey(rawSize);
  return theme.cards?.sizes?.[resolvedSize] ?? theme.cards.sizes[Size.MD];
};

/**
 * Стилизованная карточка
 * @param variant - вариант карточки (ELEVATED, OUTLINED, FILLED)
 * @param size - размер карточки
 * @param padding - внутренние отступы
 * @param hoverable - возможность наведения
 * @param clickable - возможность клика
 * @param fullWidth - полная ширина
 */
export const StyledCard = styled(motion.div)<CardProps>`
  background: ${({ theme }) => theme.cards.variants.elevated.background};
  color: ${({ theme }) => theme.cards.variants.elevated.color};
  border-radius: ${({ theme, size = Size.MD }) => getCardSizeSettings(theme, size).borderRadius};
  overflow: ${({ theme }) => theme.cards.settings.overflow};
  transition: ${({ theme }) => theme.cards.animations.transition};
  user-select: ${({ theme }) => theme.cards.settings.userSelect};

  ${({ fullWidth, theme }) =>
    fullWidth &&
    css`
      width: ${theme.cards.settings.fullWidth};
    `}

  ${({ variant = CardVariant.ELEVATED, theme }) => {
    switch (variant) {
      case CardVariant.ELEVATED:
        return css`
          background: ${theme.cards.variants.elevated.background};
          color: ${theme.cards.variants.elevated.color};
          box-shadow: ${theme.boxShadow?.md || theme.cards.variants.elevated.boxShadow};
          border: ${theme.cards.variants.elevated.border || 'none'};
        `;
      case CardVariant.OUTLINED:
        return css`
          background: ${theme.cards.variants.outlined.background};
          color: ${theme.cards.variants.outlined.color};
          border: ${theme.cards.variants.outlined.border};
          box-shadow: ${theme.cards.variants.outlined.boxShadow || 'none'};
        `;
      case CardVariant.FILLED:
        return css`
          background: ${theme.cards.variants.filled.background};
          color: ${theme.cards.variants.filled.color};
          box-shadow: ${theme.cards.variants.filled.boxShadow || 'none'};
          border: ${theme.cards.variants.filled.border || 'none'};
        `;
      default:
        return css`
          background: ${theme.cards.variants.elevated.background};
          color: ${theme.cards.variants.elevated.color};
          box-shadow: ${theme.boxShadow?.md || theme.cards.variants.elevated.boxShadow};
          border: ${theme.cards.variants.elevated.border || 'none'};
        `;
    }
  }}

  ${({ theme, size = Size.MD }) => css`
    min-height: ${getCardSizeSettings(theme, size).minHeight};
  `}

  ${({ theme, padding = Size.MD }) => css`
    padding: ${getCardSizeSettings(theme, padding).padding};
  `}

  ${({ hoverable, clickable, theme, variant = CardVariant.ELEVATED }) =>
    (hoverable || clickable) &&
    css`
      cursor: ${theme.cards.settings.cursor.clickable};
      &:hover {
        transform: ${theme.cards.states.hover.transform};
        ${variant === CardVariant.ELEVATED &&
        css`
          box-shadow: ${theme.cards.states.hover.boxShadow.elevated};
        `}
        ${variant === CardVariant.OUTLINED &&
        css`
          box-shadow: ${theme.cards.states.hover.boxShadow.outlined};
        `}
        ${variant === CardVariant.FILLED &&
        css`
          box-shadow: ${theme.cards.states.hover.boxShadow.filled};
        `}
      }
      &:active {
        transform: ${theme.cards.states.active.transform};
      }
    `}
`;

/**
 * Заголовок карточки
 */
export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.cards.components.header.marginBottom};
  padding-bottom: ${({ theme }) => theme.cards.components.header.paddingBottom};
  ${({ theme }) =>
    theme.cards.components.header.borderBottom &&
    `border-bottom: ${theme.cards.components.header.borderBottom};`}
`;

/**
 * Заголовок карточки
 */
export const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.cards.components.title.fontFamily};
  font-size: ${({ theme }) => theme.cards.components.title.fontSize};
  font-weight: ${({ theme }) => theme.cards.components.title.fontWeight};
  line-height: ${({ theme }) => theme.cards.components.title.lineHeight};
  color: ${({ theme }) => theme.cards.components.title.color};
  margin: ${({ theme }) => theme.cards.components.title.margin};
`;

/**
 * Подзаголовок карточки
 */
export const CardSubtitle = styled.p`
  font-family: ${({ theme }) => theme.cards.components.subtitle.fontFamily};
  font-size: ${({ theme }) => theme.cards.components.subtitle.fontSize};
  font-weight: ${({ theme }) => theme.cards.components.subtitle.fontWeight};
  line-height: ${({ theme }) => theme.cards.components.subtitle.lineHeight};
  color: ${({ theme }) => theme.cards.components.subtitle.color};
  margin: ${({ theme }) => theme.cards.components.subtitle.margin};
`;

/**
 * Контент карточки
 */
export const CardContent = styled.div`
  flex: 1;
  font-family: ${({ theme }) => theme.cards.components.content.fontFamily};
  font-size: ${({ theme }) => theme.cards.components.content.fontSize};
  font-weight: ${({ theme }) => theme.cards.components.content.fontWeight};
  line-height: ${({ theme }) => theme.cards.components.content.lineHeight};
  color: ${({ theme }) => theme.cards.components.content.color};
`;

/**
 * Футер карточки
 */
export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.cards.components.footer.marginTop};
  padding-top: ${({ theme }) => theme.cards.components.footer.paddingTop};
  ${({ theme }) =>
    theme.cards.components.footer.borderTop &&
    `border-top: ${theme.cards.components.footer.borderTop};`}
`;

/**
 * Действия карточки
 */
export const CardActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.cards.components.actions.gap};
  align-items: center;
`;
