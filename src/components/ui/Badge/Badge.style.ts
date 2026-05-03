import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { type BadgeProps, BadgeVariant } from '../../../types/ui';
import { Size } from '../../../types/sizes';

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
      // Новые варианты согласно макету
      case BadgeVariant.DEFAULT:
        return css`
          background: ${badgeTheme.variants.default.background};
          color: ${badgeTheme.variants.default.color};
        `;
      case BadgeVariant.DEFAULT_MAIN:
        return css`
          background: ${badgeTheme.variants.defaultMain.background};
          color: ${badgeTheme.variants.defaultMain.color};
        `;
      case BadgeVariant.DEFAULT_MAIN_INVERSION:
        return css`
          background: ${badgeTheme.variants.defaultMainInversion.background};
          color: ${badgeTheme.variants.defaultMainInversion.color};
        `;
      case BadgeVariant.DEFAULT_SUCCESS:
        return css`
          background: ${badgeTheme.variants.defaultSuccess.background};
          color: ${badgeTheme.variants.defaultSuccess.color};
          ${isDot &&
          badgeTheme.variants.defaultSuccess.boxShadow &&
          css`
            box-shadow: ${badgeTheme.variants.defaultSuccess.boxShadow};
          `}
        `;
      case BadgeVariant.DISABLE:
        return css`
          background: ${badgeTheme.variants.disable.background};
          color: ${badgeTheme.variants.disable.color};
        `;
      case BadgeVariant.OUTLINE:
        return css`
          background: ${badgeTheme.variants.outline.background};
          color: ${badgeTheme.variants.outline.color};
          border: ${badgeTheme.variants.outline.border};
        `;
      case BadgeVariant.OUTLINE_INVERSION:
        return css`
          background: ${badgeTheme.variants.outlineInversion.background};
          color: ${badgeTheme.variants.outlineInversion.color};
          border: ${badgeTheme.variants.outlineInversion.border};
        `;
      // Обратная совместимость
      case BadgeVariant.PRIMARY:
        return css`
          background: ${badgeTheme.variants.primary.background};
          color: ${badgeTheme.variants.primary.color};
        `;
      case BadgeVariant.SECONDARY:
        return css`
          background: ${badgeTheme.variants.secondary.background};
          color: ${badgeTheme.variants.secondary.color};
        `;
      case BadgeVariant.SUCCESS:
        return css`
          background: ${badgeTheme.variants.success.background};
          color: ${badgeTheme.variants.success.color};
        `;
      case BadgeVariant.DANGER:
        return css`
          background: ${badgeTheme.variants.danger.background};
          color: ${badgeTheme.variants.danger.color};
        `;
      case BadgeVariant.WARNING:
        return css`
          background: ${badgeTheme.variants.warning.background};
          color: ${badgeTheme.variants.warning.color};
        `;
      case BadgeVariant.INFO:
        return css`
          background: ${badgeTheme.variants.info.background};
          color: ${badgeTheme.variants.info.color};
        `;
      default:
        return css`
          background: ${badgeTheme.variants.default.background};
          color: ${badgeTheme.variants.default.color};
        `;
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
