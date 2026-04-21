import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import type { AvatarProps } from '../../../types/ui';
import { AvatarStatus } from '../../../types/ui';
import { AvatarState } from '../../../types/ui';
import { Size } from '../../../types/sizes';

/**
 * Враппер для аватара и статуса
 * @param size - размер аватара
 */
export const AvatarWrapper = styled.div<{ size?: Size }>`
  position: relative;
  display: inline-block;

  ${({ theme, size = Size.MD }) => css`
    width: ${theme.avatars.sizes[size].width};
    height: ${theme.avatars.sizes[size].height};
  `}
`;

/**
 * Основной контейнер аватара
 * @param state - состояние аватара (CLOSE, PIN, SUB, CONTACT, LIKE, UNPIN)
 * @param size - размер аватара
 * @param cursor - тип курсора
 * @param onClick - обработчик клика
 */
export const AvatarContainer = styled(motion.div)<AvatarProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.avatars.settings.borderRadius};
  overflow: ${({ theme }) => theme.avatars.settings.overflow};
  background: ${({ theme }) => theme.avatars.variants.default.background};
  cursor: ${({ cursor, onClick, theme }) =>
    cursor ||
    (onClick ? theme.avatars.settings.cursor.clickable : theme.avatars.settings.cursor.default)};
  transition: ${({ theme }) => theme.avatars.animations.transition};
  width: 100%;
  height: 100%;
  user-select: ${({ theme }) => theme.avatars.settings.userSelect};

  ${({ state, theme }) => {
    if (
      state === AvatarState.CLOSE ||
      state === AvatarState.PIN ||
      state === AvatarState.SUB ||
      state === AvatarState.CONTACT ||
      state === AvatarState.LIKE ||
      state === AvatarState.UNPIN
    ) {
      return css`
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: ${theme.avatars.states.overlay.background};
          border-radius: ${theme.avatars.settings.borderRadius};
          z-index: ${theme.avatars.settings.zIndex.overlay};
        }
      `;
    }
    return '';
  }}

  &:hover {
    transform: ${({ onClick, theme }) =>
      onClick ? `scale(${theme.avatars.animations.hoverScale})` : 'none'};
  }

  &:active {
    transform: ${({ onClick, theme }) =>
      onClick ? `scale(${theme.avatars.animations.tapScale})` : 'none'};
  }
`;

/**
 * Изображение аватара
 */
export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

/**
 * Фолбэк контейнер для аватара
 * @param $backgroundColor - цвет фона (префикс $ предотвращает передачу в DOM)
 */
export const AvatarFallback = styled.div<{ $backgroundColor?: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.avatars.settings.fontFamily};
  font-weight: ${({ theme }) => theme.avatars.settings.fontWeight};
  color: ${({ theme }) => theme.avatars.variants.default.color};
  background: ${({ $backgroundColor, theme }) =>
    $backgroundColor || theme.avatars.variants.default.background};
`;

/**
 * Текст аватара
 * @param size - размер аватара
 */
export const AvatarText = styled.div<{ size?: Size }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: ${({ theme }) => theme.avatars.settings.fontFamily};
  font-weight: ${({ theme }) => theme.avatars.settings.fontWeight};
  color: ${({ theme }) => theme.avatars.variants.default.color};
  z-index: ${({ theme }) => theme.avatars.settings.zIndex.overlay};

  ${({ theme, size = Size.MD }) => css`
    font-size: ${theme.avatars.sizes[size].fontSize};
    line-height: ${theme.avatars.sizes[size].lineHeight};
  `}
`;

/**
 * Контейнер для иконки аватара
 * @param size - размер аватара
 */
export const AvatarIcon = styled.div<{ size?: Size }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: ${({ theme }) => theme.avatars.settings.zIndex.overlay};
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme, size = Size.MD }) => css`
    width: ${theme.avatars.iconSizes[size].width};
    height: ${theme.avatars.iconSizes[size].height};
  `}
`;

/**
 * Индикатор статуса аватара
 * @param size - размер аватара
 * @param status - статус аватара (ONLINE, OFFLINE, DANGER, WARNING)
 */
export const StatusIndicator = styled.div<{
  size?: Size;
  status?: AvatarStatus;
}>`
  position: absolute;
  border-radius: 50%;
  z-index: ${({ theme }) => theme.avatars.settings.zIndex.status};
  border: 2px solid ${({ theme }) => theme.colors.background || '#FFFFFF'};

  ${({ status, theme }) => {
    switch (status) {
      case AvatarStatus.ONLINE:
        return css`
          background: ${theme.avatars.statuses.online.background};
          box-shadow: ${theme.avatars.statuses.online.boxShadow};
        `;
      case AvatarStatus.OFFLINE:
        return css`
          background: ${theme.avatars.statuses.offline.background};
          box-shadow: ${theme.avatars.statuses.offline.boxShadow};
        `;
      case AvatarStatus.DANGER:
        return css`
          background: ${theme.avatars.statuses.danger.background};
          box-shadow: ${theme.avatars.statuses.danger.boxShadow};
        `;
      case AvatarStatus.WARNING:
        return css`
          background: ${theme.avatars.statuses.warning.background};
          box-shadow: ${theme.avatars.statuses.warning.boxShadow};
        `;
      default:
        return css`
          background: ${theme.avatars.statuses.online.background};
          box-shadow: ${theme.avatars.statuses.online.boxShadow};
        `;
    }
  }}

  ${({ theme, size = Size.MD }) => css`
    width: ${theme.avatars.statusSizes[size].width};
    height: ${theme.avatars.statusSizes[size].height};
    top: ${theme.avatars.statusSizes[size].top};
    right: ${theme.avatars.statusSizes[size].right};
  `}
`;

/**
 * Кнопка закрытия аватара
 * @param size - размер аватара
 */
export const CloseButton = styled.button<{ size?: Size }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.avatars.states.close.background};
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ theme }) => theme.avatars.settings.cursor.clickable};
  z-index: ${({ theme }) => theme.avatars.settings.zIndex.overlay};

  ${({ theme, size = Size.MD }) => css`
    width: ${theme.avatars.buttonSizes[size].width};
    height: ${theme.avatars.buttonSizes[size].height};
  `}
`;
