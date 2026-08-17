import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { clsx } from 'clsx';
import type { FloatButtonGroupProps, FloatButtonItem } from '../../../types/ui';
import { ButtonVariant } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import {
  FLOAT_BUTTON_DEFAULT_Z_INDEX,
  getFloatButtonEdgeOffsets,
  partitionFloatButtonGroupChildren,
  resolveFloatButtonInsetPx,
  resolveFloatButtonPlacement,
} from './handlers';
import { FloatButton } from './FloatButton';
import { FloatButtonGroupProvider } from './FloatButtonContext';
import { FloatButtonAnchor, FloatButtonFan } from './FloatButton.style';

/**
 * Собирает кнопку из item-описания.
 * @param item - Пункт
 * @param extras - Общие пропсы группы
 */
const renderFloatButtonFromItem = (
  item: FloatButtonItem,
  extras: {
    shape?: FloatButtonGroupProps['shape'];
    variant?: FloatButtonGroupProps['variant'];
    color?: FloatButtonGroupProps['color'];
    size?: FloatButtonGroupProps['size'];
  },
) => (
  <FloatButton
    key={item.id}
    icon={item.icon}
    label={item.label}
    tooltip={item.tooltip}
    badge={item.badge}
    href={item.href}
    disabled={item.disabled}
    onClick={item.onClick}
    shape={extras.shape}
    variant={extras.variant}
    color={extras.color}
    size={extras.size}
    aria-label={item.ariaLabel}
    inGroup
  />
);

/**
 * Группа плавающих кнопок с веером.
 *
 * @param props.children - Последний child — триггер
 * @param props.items - Действия веера
 * @param props.triggerItem - Главная кнопка при items
 * @param props.trigger - click | hover
 */
export const FloatButtonGroup: React.FC<FloatButtonGroupProps> = ({
  children,
  items,
  triggerItem,
  trigger = 'click',
  open,
  defaultOpen = false,
  onOpenChange,
  expandPlacement = 'top',
  shape = 'circle',
  variant = ButtonVariant.PRIMARY,
  color,
  size = Size.LG,
  placement,
  getContainer,
  insetPx,
  zIndex = FLOAT_BUTTON_DEFAULT_Z_INDEX,
  className,
  'aria-label': ariaLabel,
}) => {
  const isControlled = open != null;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpen = isControlled ? Boolean(open) : uncontrolledOpen;

  const setOpenState = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  const resolvedPlacement = resolveFloatButtonPlacement(placement);
  const resolvedInsetPx = resolveFloatButtonInsetPx(insetPx);
  const offsets = useMemo(
    () => getFloatButtonEdgeOffsets(resolvedPlacement, resolvedInsetPx),
    [resolvedInsetPx, resolvedPlacement],
  );

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
    if (trigger !== 'click' || !isOpen) {
      return undefined;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenState(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setOpenState, trigger]);

  const partitioned = partitionFloatButtonGroupChildren(children);
  const useChildren = partitioned.trigger != null;
  const actionItems = items ?? [];

  const triggerNode = useChildren ? (
    partitioned.trigger
  ) : triggerItem != null ? (
    renderFloatButtonFromItem(
      {
        id: triggerItem.id ?? 'float-button-trigger',
        icon: triggerItem.icon,
        label: triggerItem.label,
        ariaLabel: triggerItem.ariaLabel,
        tooltip: triggerItem.tooltip,
        badge: triggerItem.badge,
        href: triggerItem.href,
        disabled: triggerItem.disabled,
        onClick: (event) => {
          triggerItem.onClick?.(event);
          if (trigger === 'click') {
            setOpenState(!isOpen);
          }
        },
      },
      { shape, variant, color, size },
    )
  ) : null;

  const actionNodes = useChildren
    ? partitioned.actions
    : actionItems.map((item) => renderFloatButtonFromItem(item, { shape, variant, color, size }));

  const handleTriggerClick = () => {
    if (trigger === 'click') {
      setOpenState(!isOpen);
    }
  };

  if (portalTarget == null || triggerNode == null) {
    return null;
  }

  const fan =
    isOpen && actionNodes.length > 0 ? (
      <FloatButtonFan role="menu" aria-label={ariaLabel} $expandPlacement={expandPlacement} data-expand={expandPlacement}>
        <FloatButtonGroupProvider
          value={{
            inGroup: true,
            isTrigger: false,
            isOpen,
            onActionActivate: () => setOpenState(false),
          }}
        >
          {actionNodes}
        </FloatButtonGroupProvider>
      </FloatButtonFan>
    ) : null;

  const triggerWrapped = (
    <FloatButtonGroupProvider
      value={{
        inGroup: true,
        isTrigger: true,
        isOpen,
        onActionActivate: undefined,
      }}
    >
      <span onClick={useChildren ? handleTriggerClick : undefined} role="presentation">
        {triggerNode}
      </span>
    </FloatButtonGroupProvider>
  );

  const cluster =
    expandPlacement === 'bottom' || expandPlacement === 'end' ? (
      <>
        {triggerWrapped}
        {fan}
      </>
    ) : (
      <>
        {fan}
        {triggerWrapped}
      </>
    );

  const anchored = (
    <FloatButtonAnchor
      className={clsx('ui-float-button-group', className)}
      data-float-button-root
      data-placement={resolvedPlacement}
      data-anchor={anchorMode}
      $position={anchorMode === 'container' ? 'absolute' : 'fixed'}
      $zIndex={zIndex}
      $offsets={offsets}
      onMouseEnter={trigger === 'hover' ? () => setOpenState(true) : undefined}
      onMouseLeave={trigger === 'hover' ? () => setOpenState(false) : undefined}
    >
      {cluster}
    </FloatButtonAnchor>
  );

  return createPortal(anchored, portalTarget);
};

FloatButtonGroup.displayName = 'FloatButton.Group';

FloatButton.Group = FloatButtonGroup;
