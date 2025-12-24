import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { type BadgeProps, BadgeVariant } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import { BadgeContainer } from './Badge.style';

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      variant = BadgeVariant.DEFAULT,
      size = Size.MD,
      isDot = false,
      rounded = true, // По умолчанию true для Badge согласно макету
      className,
      onClick,
    },
    ref,
  ) => {
    // Функция для форматирования содержимого Badge
    const formatBadgeContent = (content: React.ReactNode): React.ReactNode => {
      if (isDot) return null;

      // Если содержимое - число больше 9, показываем "9+"
      if (typeof content === 'number' && content > 9) {
        return '9+';
      }

      // Если содержимое - строка, которая является числом больше 9
      if (typeof content === 'string') {
        const num = parseInt(content, 10);
        if (!isNaN(num) && num > 9) {
          return '9+';
        }
      }

      return content;
    };

    return (
      <BadgeContainer
        ref={ref}
        variant={variant}
        size={size}
        isDot={isDot}
        rounded={rounded}
        className={clsx('ui-badge', className)}
        onClick={onClick}
        whileHover={onClick ? { scale: 1.05 } : undefined}
        whileTap={onClick ? { scale: 0.95 } : undefined}
      >
        {formatBadgeContent(children)}
      </BadgeContainer>
    );
  },
);

Badge.displayName = 'Badge';
