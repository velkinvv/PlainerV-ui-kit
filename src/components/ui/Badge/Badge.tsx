import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { AnimatePresence } from 'framer-motion';
import { type BadgeProps, BadgeVariant } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import { formatBadgeDisplayContent } from '../../../handlers/badgeContentHandlers';
import { useBadgeMotion } from '../../../hooks/useBadgeMotion';
import { BadgeContainer } from './Badge.style';

/**
 * Пропсы бейджа с управлением видимостью (AnimatePresence).
 * @property visible — показывать бейдж; при false — анимированное исчезновение
 */
export type BadgePresenceProps = BadgeProps & {
  /** Показывать бейдж (для анимации появления/исчезновения) */
  visible?: boolean;
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      variant = BadgeVariant.DEFAULT,
      size = Size.MD,
      isDot = false,
      rounded = true,
      className,
      onClick,
      motionEnabled = true,
    },
    ref,
  ) => {
    const { motionProps } = useBadgeMotion({
      children,
      isDot,
      size,
      interactive: Boolean(onClick),
      motionEnabled,
    });

    const formattedContent = formatBadgeDisplayContent(children, isDot);

    return (
      <BadgeContainer
        ref={ref}
        variant={variant}
        size={size}
        isDot={isDot}
        rounded={rounded}
        className={clsx('ui-badge', className)}
        onClick={onClick}
        {...motionProps}
      >
        {formattedContent}
      </BadgeContainer>
    );
  },
);

Badge.displayName = 'Badge';

/**
 * Бейдж с AnimatePresence для сценариев появления/исчезновения (Avatar, Tabs, Select).
 *
 * @param visible — монтировать бейдж в DOM
 */
export const BadgePresence = forwardRef<HTMLSpanElement, BadgePresenceProps>(
  ({ visible = true, children, ...badgeProps }, ref) => {
    return (
      <AnimatePresence mode="popLayout">
        {visible ? (
          <Badge ref={ref} {...badgeProps}>
            {children}
          </Badge>
        ) : null}
      </AnimatePresence>
    );
  },
);

BadgePresence.displayName = 'BadgePresence';
