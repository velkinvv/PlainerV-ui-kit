import styled, { css } from 'styled-components';
import { AvatarGroupVariant } from '../../../types/ui';
import { Size } from '../../../types/sizes';

/**
 * Контейнер группы аватаров
 * @param variant - вариант отображения (stack или row)
 * @param size - размер аватаров
 * @param spacing - отступ между аватарами (для row варианта)
 */
export const AvatarGroupContainer = styled.div<{
  variant?: AvatarGroupVariant;
  size?: Size;
  spacing?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  line-height: 0; /* Убираем влияние line-height на выравнивание */

  ${({ variant, size, spacing, theme }) => {
    const avatarSize = theme.avatars.sizes[size || Size.MD];
    const groupTheme = theme.avatarGroups;

    if (variant === AvatarGroupVariant.STACK) {
      return css`
        /* Для stack варианта аватары накладываются друг на друга */
        .ui-avatar-wrapper {
          margin-left: ${groupTheme.variants.stack.marginLeft};
          width: ${avatarSize.width};
          height: ${avatarSize.height};
          display: flex;
          align-items: center;
          justify-content: center;

          &:first-child {
            margin-left: 0; /* Первый аватар без отступа */
          }

          /* Добавляем ободок вокруг аватаров в цвет фона карточки */
          .ui-avatar {
            border: ${groupTheme.sizes[size || Size.MD].borderWidth} solid
              ${theme.cards.variants.elevated.background};
            border-radius: 50%;
          }

          /* Увеличиваем z-index для каждого последующего аватара - последний поверх всех */
          &:nth-child(1) {
            z-index: ${groupTheme.variants.stack.zIndex.base};
          }
          &:nth-child(2) {
            z-index: ${groupTheme.variants.stack.zIndex.base + 1};
          }
          &:nth-child(3) {
            z-index: ${groupTheme.variants.stack.zIndex.base + 2};
          }
          &:nth-child(4) {
            z-index: ${groupTheme.variants.stack.zIndex.base + 3};
          }
          &:nth-child(5) {
            z-index: ${groupTheme.variants.stack.zIndex.base + 4};
          }
          &:nth-child(6) {
            z-index: ${groupTheme.variants.stack.zIndex.base + 5};
          }
          &:nth-child(7) {
            z-index: ${groupTheme.variants.stack.zIndex.base + 6};
          }
          &:nth-child(8) {
            z-index: ${groupTheme.variants.stack.zIndex.base + 7};
          }
          &:nth-child(9) {
            z-index: ${groupTheme.variants.stack.zIndex.base + 8};
          }
          &:nth-child(10) {
            z-index: ${groupTheme.variants.stack.zIndex.max};
          }
        }
      `;
    } else if (variant === AvatarGroupVariant.ROW) {
      // Для row варианта аватары выстраиваются в ряд
      const margin = spacing !== undefined ? spacing : 8;
      return css`
        gap: ${margin}px;

        .ui-avatar-wrapper {
          /* Убираем лишнюю границу для row варианта */
          width: ${avatarSize.width};
          height: ${avatarSize.height};
          display: flex;
          align-items: center;
          justify-content: center;

          /* Добавляем ободок вокруг аватаров в цвет фона карточки */
          .ui-avatar {
            border: ${groupTheme.sizes[size || Size.MD].borderWidth} solid
              ${theme.cards.variants.elevated.background};
            border-radius: 50%;
          }
        }
      `;
    } else {
      // Для grid варианта аватары располагаются в сетке 3x2
      return css`
        display: grid;
        grid-template-columns: repeat(${groupTheme.variants.grid.columns}, 1fr);
        grid-template-rows: repeat(${groupTheme.variants.grid.rows}, 1fr);
        gap: ${groupTheme.variants.grid.gap};
        width: fit-content;

        .ui-avatar-wrapper {
          width: ${avatarSize.width};
          height: ${avatarSize.height};
          display: flex;
          align-items: center;
          justify-content: center;

          /* Добавляем ободок вокруг аватаров в цвет фона карточки */
          .ui-avatar {
            border: ${groupTheme.sizes[size || Size.MD].borderWidth} solid
              ${theme.cards.variants.elevated.background};
            border-radius: 50%;
          }
        }
      `;
    }
  }}
`;

/**
 * Контейнер для счетчика дополнительных аватаров
 * @param size - размер аватара
 * @param variant - вариант отображения
 */
export const AvatarCounter = styled.div<{
  size?: Size;
  variant?: AvatarGroupVariant;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.avatarGroups.counter.background};
  color: ${({ theme }) => theme.avatarGroups.counter.color};
  border: ${({ theme, size = Size.MD }) => theme.avatarGroups.sizes[size].borderWidth} solid
    ${({ theme }) =>
      theme.avatarGroups.avatarBorder.color || theme.cards.variants.elevated.background};
  border-radius: ${({ theme }) => theme.avatarGroups.counter.borderRadius};
  font-family: ${({ theme }) => theme.avatarGroups.counter.fontFamily};
  font-weight: ${({ theme }) => theme.avatarGroups.counter.fontWeight};
  cursor: ${({ theme }) => theme.avatarGroups.counter.cursor};
  transition: ${({ theme }) => theme.avatarGroups.counter.transition};
  flex-shrink: ${({ theme }) => theme.avatarGroups.settings.flexShrink};

  ${({ theme, size = Size.MD }) => {
    const avatarSize = theme.avatars.sizes[size];
    return css`
      width: ${avatarSize.width};
      height: ${avatarSize.height};
      font-size: ${theme.avatarGroups.sizes[size].fontSize};
      line-height: ${theme.avatarGroups.sizes[size].lineHeight};
    `;
  }}

  ${({ variant, theme }) => {
    if (variant === AvatarGroupVariant.STACK) {
      return css`
        margin-left: ${theme.avatarGroups.variants.stack.marginLeft};
        z-index: ${theme.avatarGroups.variants.stack.zIndex.max +
        1}; /* Счетчик поверх всех аватаров */
      `;
    } else if (variant === AvatarGroupVariant.GRID) {
      return css`
        /* Для grid варианта убираем отступ, чтобы счетчик был в сетке */
        margin: 0;
      `;
    } else {
      return css`
        margin-left: ${theme.avatarGroups.variants.row.gap};
      `;
    }
  }}

  &:hover {
    background: ${({ theme }) => theme.avatarGroups.counter.hover.background};
    transform: ${({ theme }) => theme.avatarGroups.counter.hover.transform};
  }
`;

/**
 * Враппер для отдельного аватара в группе
 */
export const AvatarWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: ${({ theme }) => theme.avatarGroups.settings.flexShrink};
`;
