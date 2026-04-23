import React, { forwardRef, useCallback, useMemo } from 'react';
import { clsx } from 'clsx';
import type { TagProps } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import { TagRoot, TagIconSlot, TagLabel } from './Tag.style';
import { getTagMetrics } from './handlers';

/**
 * Тег из макета Figma: палитра × filled/outline, текст и/или иконки слева и справа.
 *
 * @param props.children - Текст
 * @param props.colorVariant - Цветовая схема
 * @param props.appearance - Заливка или обводка
 * @param props.size - Размер (по умолчанию SM)
 * @param props.leftIcon / rightIcon - Слоты под иконки (`Icon` и т.п.)
 * @param props.onClick - При наличии тег кликабелен (`role="button"`, Enter/Space)
 * @param props.disabled - Блокировка
 * @param ref - Ref на корневой `span`
 */
export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      children,
      colorVariant = 'neutral',
      appearance = 'filled',
      size = Size.SM,
      leftIcon,
      rightIcon,
      onClick,
      disabled = false,
      className,
      role: roleProp,
      tabIndex: tabIndexProp,
      onKeyDown: onKeyDownProp,
      ...rest
    },
    ref,
  ) => {
    const clickable = Boolean(onClick) && !disabled;
    const metrics = useMemo(() => getTagMetrics(size), [size]);

    const role = roleProp ?? (clickable ? 'button' : undefined);
    const tabIndex = tabIndexProp ?? (clickable ? 0 : undefined);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLSpanElement>) => {
        onKeyDownProp?.(e);
        if (e.defaultPrevented || !clickable || !onClick) {
          return;
        }
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          (e.currentTarget as HTMLSpanElement).click();
        }
      },
      [clickable, onClick, onKeyDownProp],
    );

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLSpanElement>) => {
        if (disabled) {
          e.preventDefault();
          return;
        }
        onClick?.(e);
      },
      [disabled, onClick],
    );

    return (
      <TagRoot
        ref={ref}
        {...rest}
        role={role}
        tabIndex={tabIndex}
        onClick={onClick ? handleClick : undefined}
        onKeyDown={clickable ? handleKeyDown : onKeyDownProp}
        aria-disabled={disabled || undefined}
        $color={colorVariant}
        $appearance={appearance}
        $clickable={clickable}
        $disabled={disabled}
        $padding={metrics.padding}
        $gap={metrics.gap}
        $fontSize={metrics.fontSize}
        $minHeight={metrics.minHeight}
        className={clsx('ui-tag', className)}
      >
        {leftIcon ? <TagIconSlot aria-hidden>{leftIcon}</TagIconSlot> : null}
        {children ? <TagLabel>{children}</TagLabel> : null}
        {rightIcon ? <TagIconSlot aria-hidden>{rightIcon}</TagIconSlot> : null}
      </TagRoot>
    );
  },
);

Tag.displayName = 'Tag';
