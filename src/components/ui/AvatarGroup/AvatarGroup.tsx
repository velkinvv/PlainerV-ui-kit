import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { AvatarGroupVariant, type AvatarGroupProps } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import { Avatar } from '../Avatar/Avatar';
import { AvatarWrapper, AvatarGroupContainer, AvatarCounter } from './AvatarGroup.style';

/**
 * Компонент группы аватаров
 * Поддерживает три варианта отображения: stack (наложение), row (в ряд) и grid (в сетке)
 *
 * @param avatars - Массив пропсов для аватаров
 * @param variant - Вариант отображения (stack, row или grid)
 * @param maxVisible - Максимальное количество видимых аватаров
 * @param size - Размер аватаров
 * @param spacing - Отступ между аватарами (для row варианта)
 * @param showTooltip - Показывать ли тултипы для аватаров
 * @param onCounterClick - Обработчик клика по счетчику дополнительных аватаров
 * @param onAvatarSelect - Колбек на выбор аватара (по клику или нажатию клавиши)
 * @param className - Дополнительные CSS классы
 */
export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    {
      avatars,
      variant = AvatarGroupVariant.STACK,
      maxVisible = 3,
      size = Size.MD,
      spacing = 8,
      showTooltip = true,
      onCounterClick,
      onAvatarSelect,
      className,
      ...props
    },
    ref,
  ) => {
    // Вычисляем количество аватаров для отображения
    // Для grid варианта показываем максимум 6 аватаров (3x2)
    const maxForVariant = variant === AvatarGroupVariant.GRID ? 6 : maxVisible;
    const visibleAvatars = avatars.slice(0, maxForVariant);
    const remainingCount = avatars.length - maxForVariant;

    // Рендерим видимые аватары
    const renderAvatars = () => {
      return visibleAvatars.map((avatarProps, index) => {
        // Создаем обработчик, который вызывает и onAvatarSelect, и собственный onClick
        const handleAvatarClick = (clickedId?: string) => {
          // Если есть onAvatarSelect и у аватара есть id, вызываем его
          if (onAvatarSelect && clickedId) {
            onAvatarSelect(clickedId);
          }
          // Если есть собственный onClick у аватара, вызываем его с id
          if (avatarProps.onClick) {
            avatarProps.onClick(clickedId);
          }
        };

        return (
          <AvatarWrapper key={avatarProps.id || index} className="ui-avatar-wrapper">
            <Avatar
              {...avatarProps}
              size={avatarProps.size || size}
              showTooltip={
                avatarProps.showTooltip !== undefined ? avatarProps.showTooltip : showTooltip
              }
              cursor={avatarProps.onClick || onAvatarSelect ? 'pointer' : 'default'}
              onClick={handleAvatarClick}
            />
          </AvatarWrapper>
        );
      });
    };

    // Рендерим счетчик дополнительных аватаров
    const renderCounter = () => {
      if (remainingCount <= 0) return null;

      const remainingAvatars = avatars.slice(maxForVariant);

      const handleCounterClick = () => {
        if (onCounterClick) {
          onCounterClick(remainingAvatars);
        }
      };

      return (
        <AvatarCounter
          size={size}
          variant={variant}
          className="ui-avatar-counter"
          title={`Ещё ${remainingCount} ${remainingCount === 1 ? 'пользователь' : 'пользователей'}`}
          onClick={handleCounterClick}
        >
          +{remainingCount}
        </AvatarCounter>
      );
    };

    return (
      <AvatarGroupContainer
        ref={ref}
        variant={variant}
        size={size}
        spacing={spacing}
        className={clsx('ui-avatar-group', className)}
        data-testid="avatar-group"
        {...props}
      >
        {renderAvatars()}
        {renderCounter()}
      </AvatarGroupContainer>
    );
  },
);

AvatarGroup.displayName = 'AvatarGroup';
