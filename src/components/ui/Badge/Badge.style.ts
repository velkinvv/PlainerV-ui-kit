import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { type BadgeProps, BadgeVariant } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import type { BadgeTheme } from '../../../types/theme';

/**
 * CSS-стили варианта бейджа из темы (фон, текст, граница, тень).
 * @param variantStyles — объект варианта из theme.badges.variants
 */
const getBadgeVariantStyles = (
  variantStyles: BadgeTheme['variants'][keyof BadgeTheme['variants']],
  isDot?: boolean,
) => css`
  background: ${variantStyles.background};
  color: ${variantStyles.color};
  ${variantStyles.border ? `border: ${variantStyles.border};` : ''}
  ${isDot && variantStyles.boxShadow
    ? css`
        box-shadow: ${variantStyles.boxShadow};
      `
    : ''}
`;

/**
 * Контейнер бейджа
 * @param variant - вариант бейджа согласно дизайн-системе
 * @param size - размер бейджа
 * @param isDot - специальный dot размер (8x8px без текста)
 * @param rounded - скругленные углы (по умолчанию true)
 * @param onClick - обработчик клика
 */
export const BadgeContainer = styled(motion.span)<BadgeProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  /* Вместе с симметричным padding из темы даёт ровный круг при фиксированных width/height */
  box-sizing: border-box;
  font-family: ${({ theme }) => theme.badges.settings.fontFamily};
  font-weight: ${({ theme }) => theme.badges.settings.fontWeight};
  /* Всегда круглый Badge */
  border-radius: 50%;
  aspect-ratio: 1;
  cursor: ${({ onClick, theme }) =>
    onClick ? theme.badges.settings.cursor.clickable : theme.badges.settings.cursor.default};
  transition: ${({ theme }) => theme.badges.animations.transition};
  text-align: ${({ theme }) => theme.badges.settings.textAlign};
  line-height: ${({ theme }) => theme.badges.settings.lineHeight};
  user-select: ${({ theme }) => theme.badges.settings.userSelect};
  white-space: ${({ theme }) => theme.badges.settings.whiteSpace};

  ${({ theme }) => {
    const backdropFilter = theme.badges.settings.backdropFilter;

    return backdropFilter
      ? css`
          backdrop-filter: ${backdropFilter};
          -webkit-backdrop-filter: ${backdropFilter};
        `
      : '';
  }}

  ${({ size, isDot, theme }) => css`
    ${isDot
      ? css`
          width: ${theme.badges.dotSizes[size || Size.MD].width};
          height: ${theme.badges.dotSizes[size || Size.MD].height};
          padding: ${theme.badges.dotSizes[size || Size.MD].padding};
          font-size: ${theme.badges.dotSizes[size || Size.MD].fontSize};
        `
      : css`
          /* Используем максимальное значение из min-width и min-height для круглой формы */
          width: ${theme.badges.sizes[size || Size.MD].minWidth};
          height: ${theme.badges.sizes[size || Size.MD].minHeight};
          min-width: ${theme.badges.sizes[size || Size.MD].minWidth};
          min-height: ${theme.badges.sizes[size || Size.MD].minHeight};
          padding: ${theme.badges.sizes[size || Size.MD].padding};
          font-size: ${theme.badges.sizes[size || Size.MD].fontSize};
        `}
  `}

  ${({ variant = BadgeVariant.DEFAULT, theme, isDot }) => {
    const badgeTheme = theme.badges;

    switch (variant) {
      case BadgeVariant.DEFAULT:
        return getBadgeVariantStyles(badgeTheme.variants.default, isDot);
      case BadgeVariant.DEFAULT_MAIN:
        return getBadgeVariantStyles(badgeTheme.variants.defaultMain, isDot);
      case BadgeVariant.DEFAULT_MAIN_INVERSION:
        return getBadgeVariantStyles(badgeTheme.variants.defaultMainInversion, isDot);
      case BadgeVariant.DEFAULT_SUCCESS:
        return getBadgeVariantStyles(badgeTheme.variants.defaultSuccess, isDot);
      case BadgeVariant.DISABLE:
        return getBadgeVariantStyles(badgeTheme.variants.disable, isDot);
      case BadgeVariant.OUTLINE:
        return getBadgeVariantStyles(badgeTheme.variants.outline, isDot);
      case BadgeVariant.OUTLINE_INVERSION:
        return getBadgeVariantStyles(badgeTheme.variants.outlineInversion, isDot);
      case BadgeVariant.PRIMARY:
        return getBadgeVariantStyles(badgeTheme.variants.primary, isDot);
      case BadgeVariant.SECONDARY:
        return getBadgeVariantStyles(badgeTheme.variants.secondary, isDot);
      case BadgeVariant.SUCCESS:
        return getBadgeVariantStyles(badgeTheme.variants.success, isDot);
      case BadgeVariant.DANGER:
        return getBadgeVariantStyles(badgeTheme.variants.danger, isDot);
      case BadgeVariant.WARNING:
        return getBadgeVariantStyles(badgeTheme.variants.warning, isDot);
      case BadgeVariant.INFO:
        return getBadgeVariantStyles(badgeTheme.variants.info, isDot);
      default:
        return getBadgeVariantStyles(badgeTheme.variants.default, isDot);
    }
  }}

  &:hover {
    transform: ${({ onClick, theme }) =>
      onClick ? `scale(${theme.badges.animations.hoverScale})` : 'none'};
  }

  &:active {
    transform: ${({ onClick, theme }) =>
      onClick ? `scale(${theme.badges.animations.tapScale})` : 'none'};
  }
`;
