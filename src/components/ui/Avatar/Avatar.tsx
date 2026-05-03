import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { AvatarState, AvatarStatus, BadgeVariant, type AvatarProps } from '../../../types/ui';
import { Size, IconSize } from '../../../types/sizes';
import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip/Tooltip';
import { Badge } from '../Badge/Badge';
import {
  AvatarWrapper,
  AvatarContainer,
  AvatarImage,
  AvatarFallback,
  AvatarText,
  AvatarIcon,
  CloseButton,
  AvatarMessageBadgeAnchor,
} from './Avatar.style';

// Функция для получения иконки по состоянию
const getIconByState = (state: AvatarState): string => {
  switch (state) {
    case AvatarState.PIN:
      return 'PhosphorPushPin';
    case AvatarState.SUB:
      return 'PhosphorBookmarkSimple';
    case AvatarState.CONTACT:
      return 'PhosphorUserPlus';
    case AvatarState.LIKE:
      return 'PhosphorHeartStraight';
    case AvatarState.UNPIN:
      return 'PhosphorPushPinSlash';
    default:
      return 'PhosphorUserCircle';
  }
};

// Функция для генерации цвета фона на основе userName
const generateBackgroundColor = (userName: string): string => {
  // Создаем хеш из всех символов userName
  let hash = 0;
  for (let i = 0; i < userName.length; i++) {
    hash = userName.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Преобразуем хеш в HSL цвет
  const hue = Math.abs(hash) % 360;
  const saturation = 60 + (Math.abs(hash) % 20); // 60-80%
  const lightness = 45 + (Math.abs(hash >> 8) % 15); // 45-60%

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

// Функция для генерации инициалов из userName
const generateInitials = (userName: string): string => {
  const words = userName.trim().split(/\s+/);

  if (words.length === 1) {
    // Если одно слово, берем первые две буквы
    return words[0].substring(0, 2).toUpperCase();
  } else {
    // Если несколько слов, берем первые буквы первых двух слов
    return words
      .slice(0, 2)
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase();
  }
};

// Функция для определения цвета Badge на основе статуса
const getBadgeVariantByStatus = (status?: AvatarStatus): BadgeVariant => {
  switch (status) {
    case AvatarStatus.ONLINE:
      return BadgeVariant.SUCCESS;
    case AvatarStatus.OFFLINE:
      return BadgeVariant.SECONDARY;
    case AvatarStatus.DANGER:
      return BadgeVariant.DANGER;
    case AvatarStatus.WARNING:
      return BadgeVariant.WARNING;
    default:
      return BadgeVariant.DANGER; // По умолчанию красный для привлечения внимания
  }
};

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      id,
      src,
      alt,
      size = Size.MD,
      fallback,
      className,
      onClick,
      state = AvatarState.OFFLINE,
      text,
      icon,
      status,
      messageCount,
      onIconClick,
      userName,
      showTooltip = false,
      tooltipText,
      cursor,
    },
    ref,
  ) => {
    const [imageError, setImageError] = React.useState(false);

    const handleImageError = () => {
      setImageError(true);
    };

    const handleClick = () => {
      if (onClick) {
        onClick(id);
      }
    };

    const getFallbackContent = () => {
      if (fallback) return fallback;
      if (userName) return generateInitials(userName);
      if (alt) return alt.charAt(0).toUpperCase();
      return 'U';
    };

    const getFallbackBackgroundColor = () => {
      if (userName) return generateBackgroundColor(userName);
      return undefined;
    };

    const getTooltipContent = () => {
      if (tooltipText) return tooltipText;
      if (userName) return userName;
      if (alt) return alt;
      return 'Пользователь';
    };

    // Используем userName как alt если alt не передан
    const getAltText = () => {
      return alt || userName || 'Пользователь';
    };

    const renderContent = () => {
      // Основной контент аватара
      const mainContent =
        src && !imageError ? (
          <AvatarImage src={src} alt={getAltText()} onError={handleImageError} />
        ) : (
          <AvatarFallback $backgroundColor={getFallbackBackgroundColor()}>
            {getFallbackContent()}
          </AvatarFallback>
        );

      // Дополнительные элементы в зависимости от состояния
      const additionalElements = [];

      // Текст для состояния AVATAR
      if (state === AvatarState.AVATAR && text) {
        additionalElements.push(
          <AvatarText key="text" size={size}>
            {text}
          </AvatarText>,
        );
      }

      // Иконка для состояний с иконками
      if (state === AvatarState.CLOSE) {
        additionalElements.push(
          <CloseButton key="close" size={size} onClick={onIconClick}>
            <Icon
              name={'PhosphorX' as never}
              size={size === Size.LG ? IconSize.MD : IconSize.SM}
              color="#FFFFFF"
            />
          </CloseButton>,
        );
      } else if (
        [
          AvatarState.PIN,
          AvatarState.SUB,
          AvatarState.CONTACT,
          AvatarState.LIKE,
          AvatarState.UNPIN,
        ].includes(state)
      ) {
        const iconName = getIconByState(state);
        additionalElements.push(
          <AvatarIcon key="icon" size={size} onClick={onIconClick}>
            <Icon
              name={iconName as never}
              size={size === Size.LG ? IconSize.MD : IconSize.SM}
              color="#FFFFFF"
            />
          </AvatarIcon>,
        );
      }

      // Кастомная иконка
      if (icon) {
        additionalElements.push(
          <AvatarIcon key="custom-icon" size={size} onClick={onIconClick}>
            {icon}
          </AvatarIcon>,
        );
      }

      // Статус теперь рендерится отдельно вне AvatarContainer

      return (
        <>
          {mainContent}
          {additionalElements}
        </>
      );
    };

    const hasMessageBadge = Boolean(messageCount && messageCount > 0);

    const avatarContent = (
      <AvatarWrapper
        size={size}
        $hasMessageBadge={hasMessageBadge}
        className={clsx('ui-avatar-wrapper', className)}
      >
        <AvatarContainer
          ref={ref}
          size={size}
          state={state}
          className={clsx('ui-avatar')}
          onClick={handleClick}
          cursor={cursor}
          whileHover={onClick ? { scale: 1.05 } : undefined}
          whileTap={onClick ? { scale: 0.95 } : undefined}
        >
          {renderContent()}
        </AvatarContainer>
        {/* Badge с количеством сообщений вне AvatarContainer (у него overflow: hidden); враппер с полями — см. AvatarWrapper.$hasMessageBadge */}
        {hasMessageBadge && (
          <AvatarMessageBadgeAnchor>
            <Badge
              variant={getBadgeVariantByStatus(status)}
              size={size === Size.LG ? Size.MD : Size.SM}
              rounded={true}
            >
              {(messageCount ?? 0) > 99 ? '99+' : messageCount ?? 0}
            </Badge>
          </AvatarMessageBadgeAnchor>
        )}
      </AvatarWrapper>
    );

    // Если showTooltip включен, оборачиваем в Tooltip
    if (showTooltip) {
      return <Tooltip content={getTooltipContent()}>{avatarContent}</Tooltip>;
    }

    return avatarContent;
  },
);

Avatar.displayName = 'Avatar';
