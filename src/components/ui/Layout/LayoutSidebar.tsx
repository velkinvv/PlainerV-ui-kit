import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { useReducedMotion } from 'framer-motion';
import { useTheme } from 'styled-components';
import { ButtonVariant, type LayoutSidebarCollapseReason, type LayoutSidebarProps } from '../../../types/ui';
import { IconSize } from '../../../types/sizes';
import { IconButton } from '../buttons/IconButton/IconButton';
import { Icon } from '../Icon/Icon';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import {
  getLayoutSidebarBreakpointMediaQuery,
  getLayoutSidebarFlexOrder,
  getLayoutSidebarTriggerRotationDeg,
  resolveLayoutSidebarGutterCss,
  resolveLayoutSidebarPlacement,
  resolveLayoutSidebarWidthCss,
  resolveLayoutWidthTransitionMs,
  shouldLayoutSidebarOverlay,
  shouldShowLayoutZeroWidthTrigger,
} from './handlers';
import { useLayoutContext } from './LayoutContext';
import {
  LayoutSidebarBody,
  LayoutSidebarGutter,
  LayoutSidebarSlot,
  LayoutSidebarTriggerBar,
  LayoutSidebarTriggerIcon,
  LayoutZeroWidthTriggerSlot,
} from './Layout.style';

/**
 * Боковая колонка каркаса.
 *
 * @param props.width - Развёрнутая ширина
 * @param props.collapsedWidth - Ширина collapsed
 * @param props.collapsible - Показать триггер
 * @param props.placement - start | end
 * @param props.overlay - Развёрнутый вне потока
 * @param props.breakpoint - Свернуть ниже порога
 */
export const LayoutSidebar: React.FC<LayoutSidebarProps> = ({
  width,
  collapsedWidth,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  collapsible = false,
  trigger,
  placement: placementProp,
  overlay = false,
  sticky = false,
  breakpoint,
  onBreakpointChange,
  className,
  children,
}) => {
  const theme = useTheme();
  const prefersReducedMotion = Boolean(useReducedMotion());
  const { registerSidebar, setSidebarPlacement, setOverlayActive } = useLayoutContext();
  const asideId = useId();
  const placement = resolveLayoutSidebarPlacement(placementProp);
  const isControlled = collapsedProp != null;
  const [uncontrolledCollapsed, setUncontrolledCollapsed] = useState(defaultCollapsed);
  const collapsed = isControlled ? Boolean(collapsedProp) : uncontrolledCollapsed;
  const isOverlayActive = shouldLayoutSidebarOverlay(overlay, collapsed);
  const resolvedPosition = isOverlayActive ? 'absolute' : sticky ? 'sticky' : 'relative';
  const widthCss = resolveLayoutSidebarWidthCss({ collapsed, width, collapsedWidth });
  const transitionMs = resolveLayoutWidthTransitionMs(
    theme.durations?.ms300 ?? 300,
    prefersReducedMotion,
  );
  const triggerLabel = collapsed ? 'Развернуть панель' : 'Свернуть панель';
  const showZeroWidthTrigger = shouldShowLayoutZeroWidthTrigger({
    collapsed,
    collapsedWidth,
    trigger,
  });
  const isZeroWidthCollapsed = showZeroWidthTrigger;
  const sidebarOrder = getLayoutSidebarFlexOrder(placement);
  const breakpointQuery =
    breakpoint != null ? getLayoutSidebarBreakpointMediaQuery(breakpoint) : '(min-width: 0px)';
  const mediaMatches = useMediaQuery(breakpointQuery);
  const isBelowBreakpoint = breakpoint != null && mediaMatches;
  const previousIsBelowRef = useRef<boolean | null>(null);

  const setCollapsedState = useCallback(
    (nextCollapsed: boolean, reason: LayoutSidebarCollapseReason) => {
      if (!isControlled) {
        setUncontrolledCollapsed(nextCollapsed);
      }
      onCollapsedChange?.(nextCollapsed, reason);
    },
    [isControlled, onCollapsedChange],
  );

  useEffect(() => {
    const unregister = registerSidebar();
    return unregister;
  }, [registerSidebar]);

  useEffect(() => {
    setSidebarPlacement(placement);
  }, [placement, setSidebarPlacement]);

  useEffect(() => {
    setOverlayActive(isOverlayActive);
    return () => setOverlayActive(false);
  }, [isOverlayActive, setOverlayActive]);

  useEffect(() => {
    if (breakpoint == null) {
      return;
    }
    if (previousIsBelowRef.current === isBelowBreakpoint) {
      return;
    }
    previousIsBelowRef.current = isBelowBreakpoint;
    onBreakpointChange?.(isBelowBreakpoint);
    setCollapsedState(isBelowBreakpoint, 'breakpoint');
  }, [breakpoint, isBelowBreakpoint, onBreakpointChange, setCollapsedState]);

  const handleTriggerClick = () => {
    setCollapsedState(!collapsed, 'trigger');
  };

  const chevronIcon = (
    <LayoutSidebarTriggerIcon $rotationDeg={getLayoutSidebarTriggerRotationDeg(placement, collapsed)}>
      <Icon name="IconPlainerChevronDown" size={IconSize.SM} color="currentColor" />
    </LayoutSidebarTriggerIcon>
  );

  const showDefaultTrigger = collapsible && trigger === undefined && !showZeroWidthTrigger;
  const showCustomTrigger = collapsible && trigger != null && !showZeroWidthTrigger;
  const triggerNode = showDefaultTrigger ? (
    <IconButton
      variant={ButtonVariant.GHOST}
      aria-label={triggerLabel}
      aria-expanded={!collapsed}
      aria-controls={asideId}
      onClick={handleTriggerClick}
      icon={chevronIcon}
    />
  ) : showCustomTrigger ? (
    <div onClick={handleTriggerClick} role="presentation">
      {trigger}
    </div>
  ) : null;

  return (
    <>
      {isOverlayActive ? (
        <LayoutSidebarGutter
          data-layout-sidebar-gutter
          aria-hidden
          $widthCss={resolveLayoutSidebarGutterCss(collapsedWidth)}
          $order={sidebarOrder}
        />
      ) : null}
      <LayoutSidebarSlot
        id={asideId}
        className={clsx('ui-layout-sidebar', className)}
        $widthCss={widthCss}
        $order={sidebarOrder}
        $sticky={sticky}
        $placement={placement}
        $position={resolvedPosition}
        $transitionMs={transitionMs}
        data-collapsed={collapsed ? 'true' : 'false'}
        data-placement={placement}
        data-overlay={overlay ? 'true' : 'false'}
        aria-hidden={isZeroWidthCollapsed ? true : undefined}
      >
        <LayoutSidebarBody>{children}</LayoutSidebarBody>
        {triggerNode != null ? (
          <LayoutSidebarTriggerBar>{triggerNode}</LayoutSidebarTriggerBar>
        ) : null}
      </LayoutSidebarSlot>
      {showZeroWidthTrigger ? (
        <LayoutZeroWidthTriggerSlot $placement={placement}>
          <IconButton
            variant={ButtonVariant.GHOST}
            aria-label={triggerLabel}
            aria-expanded={false}
            aria-controls={asideId}
            onClick={handleTriggerClick}
            icon={chevronIcon}
          />
        </LayoutZeroWidthTriggerSlot>
      ) : null}
    </>
  );
};

LayoutSidebar.displayName = 'Layout.Sidebar';
