import React, { forwardRef, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { clsx } from 'clsx';
import { useTheme } from 'styled-components';
import {
  ButtonVariant,
  type FloatButtonBackTopProps,
  type FloatButtonGroupProps,
  type FloatButtonProps,
} from '../../../types/ui';
import { IconSize, Size } from '../../../types/sizes';
import { Badge, BadgeVariant } from '../Badge/Badge';
import { Tooltip } from '../Tooltip/Tooltip';
import { useUiMotionPresets } from '../../../hooks/useUiMotion';
import {
  FLOAT_BUTTON_DEFAULT_Z_INDEX,
  getFloatButtonEdgeOffsets,
  getFloatButtonSizePx,
  resolveFloatButtonBadge,
  resolveFloatButtonInsetPx,
  resolveFloatButtonPlacement,
  resolveFloatButtonSurface,
} from './handlers';
import { useFloatButtonGroupContext } from './FloatButtonContext';
import { Icon } from '../Icon/Icon';
import { useFloatButtonScroll } from './useFloatButtonScroll';
import {
  FloatButtonAnchor,
  FloatButtonBadgeSlot,
  FloatButtonIconSlot,
  FloatButtonLinkSurface,
  FloatButtonProgressSvg,
  FloatButtonSurface,
} from './FloatButton.style';

type FloatButtonComponent = React.ForwardRefExoticComponent<
  FloatButtonProps & React.RefAttributes<HTMLElement>
> & {
  Group?: React.FC<FloatButtonGroupProps>;
  BackTop?: React.FC<FloatButtonBackTopProps>;
};

/**
 * Содержимое кнопки: иконка, подпись, badge.
 * @param props.icon - Иконка
 * @param props.label - Подпись
 * @param props.badge - Badge
 */
const FloatButtonContent: React.FC<{
  icon?: React.ReactNode;
  label?: React.ReactNode;
  badge?: FloatButtonProps['badge'];
}> = ({ icon, label, badge }) => {
  const badgeResolve = resolveFloatButtonBadge(badge);

  return (
    <>
      {icon != null ? <FloatButtonIconSlot>{icon}</FloatButtonIconSlot> : null}
      {label != null ? <span>{label}</span> : null}
      {badgeResolve.visible ? (
        <FloatButtonBadgeSlot>
          <Badge
            variant={BadgeVariant.DEFAULT}
            size={Size.SM}
            isDot={badgeResolve.isDot}
            rounded
          >
            {badgeResolve.isDot ? null : badgeResolve.content}
          </Badge>
        </FloatButtonBadgeSlot>
      ) : null}
    </>
  );
};

/**
 * Плавающая кнопка глобального действия.
 *
 * @param props.icon - Иконка
 * @param props.label - Подпись
 * @param props.shape - circle | square
 * @param props.variant - Вариант из темы кнопок
 * @param props.color - Override палитры
 * @param props.aria-label - Имя без видимой подписи
 */
const FloatButtonBase = forwardRef<HTMLElement, FloatButtonProps>(function FloatButtonBase(
  {
    icon,
    label,
    shape = 'circle',
    variant = ButtonVariant.PRIMARY,
    color,
    size = Size.LG,
    tooltip,
    badge,
    href,
    target,
    disabled = false,
    onClick,
    backTop = false,
    placement,
    getContainer,
    insetPx,
    zIndex = FLOAT_BUTTON_DEFAULT_Z_INDEX,
    inGroup: inGroupProp,
    className,
    'aria-label': ariaLabel,
    showProgress = false,
    visibilityHeight,
    duration,
    getScrollContainer,
  },
  ref,
) {
  const theme = useTheme();
  const uiMotion = useUiMotionPresets();
  const groupContext = useFloatButtonGroupContext();
  const inGroup = inGroupProp ?? groupContext?.inGroup ?? false;
  const isTrigger = groupContext?.isTrigger ?? false;

  const resolvedPlacement = resolveFloatButtonPlacement(placement);
  const resolvedInsetPx = resolveFloatButtonInsetPx(insetPx);
  const offsets = useMemo(
    () => getFloatButtonEdgeOffsets(resolvedPlacement, resolvedInsetPx),
    [resolvedInsetPx, resolvedPlacement],
  );
  const sizePx = getFloatButtonSizePx(size);
  const hasLabel = label != null && label !== false;
  const surface = useMemo(
    () => resolveFloatButtonSurface(theme, variant, color),
    [color, theme, variant],
  );

  const { isVisible, progressRatio, scrollToTop } = useFloatButtonScroll({
    enabled: backTop,
    visibilityHeight,
    duration,
    getScrollContainer,
  });

  const resolvedIcon =
    icon ??
    (backTop ? <Icon name="IconPlainerArrowUp" size={IconSize.SM} color="currentColor" /> : null);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const [anchorMode, setAnchorMode] = useState<'viewport' | 'container'>('viewport');

  useEffect(() => {
    const containerElement = getContainer?.() ?? null;
    if (containerElement != null) {
      setPortalTarget(containerElement);
      setAnchorMode('container');
      return;
    }
    setPortalTarget(document.body);
    setAnchorMode('viewport');
  }, [getContainer]);

  useEffect(() => {
    if (hasLabel || ariaLabel != null || backTop) {
      return;
    }
    console.warn('[FloatButton] Для кнопки без label нужен aria-label.');
  }, [ariaLabel, backTop, hasLabel]);

  const resolvedAriaLabel =
    ariaLabel ?? (backTop && !hasLabel ? 'Наверх' : undefined);

  const progressRadius = sizePx / 2 + 2;
  const progressCircumference = 2 * Math.PI * progressRadius;
  const progressNode =
    backTop && showProgress ? (
      <FloatButtonProgressSvg viewBox={`0 0 ${sizePx + 8} ${sizePx + 8}`} aria-hidden>
        <circle
          cx={(sizePx + 8) / 2}
          cy={(sizePx + 8) / 2}
          r={progressRadius}
          fill="none"
          stroke={theme.colors?.border ?? 'currentColor'}
          strokeWidth="2"
        />
        <circle
          cx={(sizePx + 8) / 2}
          cy={(sizePx + 8) / 2}
          r={progressRadius}
          fill="none"
          stroke={surface.color}
          strokeWidth="2"
          strokeDasharray={progressCircumference}
          strokeDashoffset={progressCircumference * (1 - progressRatio)}
          strokeLinecap="round"
        />
      </FloatButtonProgressSvg>
    ) : null;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
    if (backTop) {
      scrollToTop();
    }
    if (inGroup && !isTrigger) {
      groupContext?.onActionActivate?.();
    }
  };

  const surfaceProps = {
    ref: ref as React.Ref<HTMLButtonElement & HTMLAnchorElement>,
    className: clsx('ui-float-button', className),
    $sizePx: sizePx,
    $hasLabel: Boolean(hasLabel),
    $shape: shape,
    $background: surface.background,
    $color: surface.color,
    $border: surface.border,
    $hoverBackground: surface.hoverBackground,
    $hoverColor: surface.hoverColor,
    $hoverBorder: surface.hoverBorder,
    $disabled: disabled,
    disabled,
    'aria-label': resolvedAriaLabel,
    'data-shape': shape,
    'aria-disabled': disabled || undefined,
    role: inGroup && !isTrigger ? 'menuitem' : undefined,
    'aria-haspopup': isTrigger ? true : undefined,
    'aria-expanded': isTrigger ? groupContext?.isOpen : undefined,
    ...uiMotion.buttonPress(!disabled),
  };

  const buttonNode = href ? (
    <FloatButtonLinkSurface
      {...surfaceProps}
      href={disabled ? undefined : href}
      target={target}
      onClick={handleClick}
    >
      <FloatButtonContent icon={resolvedIcon} label={label} badge={badge} />
      {progressNode}
    </FloatButtonLinkSurface>
  ) : (
    <FloatButtonSurface
      {...surfaceProps}
      type="button"
      onClick={handleClick}
    >
      <FloatButtonContent icon={resolvedIcon} label={label} badge={badge} />
      {progressNode}
    </FloatButtonSurface>
  );

  const withTooltip =
    tooltip != null && tooltip !== false ? (
      <Tooltip content={tooltip} disabled={disabled}>
        {buttonNode}
      </Tooltip>
    ) : (
      buttonNode
    );

  if (inGroup) {
    return withTooltip;
  }

  if (backTop && !isVisible) {
    return null;
  }

  if (portalTarget == null) {
    return null;
  }

  const anchored = (
    <FloatButtonAnchor
      data-float-button-root
      data-placement={resolvedPlacement}
      data-anchor={anchorMode}
      $position={anchorMode === 'container' ? 'absolute' : 'fixed'}
      $zIndex={zIndex}
      $offsets={offsets}
    >
      {withTooltip}
    </FloatButtonAnchor>
  );

  return createPortal(anchored, portalTarget);
});

FloatButtonBase.displayName = 'FloatButton';

export const FloatButton = FloatButtonBase as FloatButtonComponent;
