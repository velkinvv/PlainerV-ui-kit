import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { useTheme } from 'styled-components';
import {
  BadgeVariant,
  SpinnerVariant,
  SkeletonVariant,
  TooltipPosition,
  type NavigationMenuItemProps,
} from '@/types/ui';
import { IconSize, Size } from '@/types/sizes';
import { navigationMenuItemContentMotionTransition } from '@/handlers/navigationMenuItemMotionHandlers';
import { navigationMenuSubtreeContainsActiveId } from '@/handlers/navigationMenuNestedHandlers';
import { wrapNavigationMenuItemTrigger } from '@/handlers/navigationMenuItemOverlayHandlers';
import { Popover } from '../Popover/Popover';
import { Badge } from '../Badge/Badge';
import { Spinner } from '../Spinner/Spinner';
import { Skeleton } from '../Skeleton/Skeleton';
import { Icon } from '../Icon/Icon';
import { getNavigationMenuItemDisplayTitle } from './NavigationMenu.handlers';
import {
  NavigationMenuFlyoutBranchProvider,
  useNavigationMenuContext,
} from './NavigationMenuContext';
import { NavigationMenuDepthProvider, useNavigationMenuDepth } from './NavigationMenuDepthContext';
import {
  NavigationMenuRowCollapse,
  NavigationMenuRowCollapseInner,
  NavigationMenuRowCollapseDiv,
  NavigationMenuItemContentMotion,
  NavigationMenuItemSkeletonSurface,
  NavigationMenuItemButton,
  NavigationMenuItemAnchor,
  NavigationMenuItemIconWrap,
  NavigationMenuBadgeFloatRoot,
  NavigationMenuBadgeInlineRoot,
  NavigationMenuItemLabel,
  NavigationMenuItemSuffix,
  NavigationMenuItemLoadingSlot,
  NavigationMenuBranchRoot,
  NavigationMenuNestedCollapse,
  NavigationMenuNestedCollapseInner,
  NavigationMenuNestedList,
  NavigationMenuBranchChevron,
} from './NavigationMenu.style';

/**
 * Пункт меню навигации (`NavigationMenu`). Поддерживает иконку, бейдж, суффикс, режим collapsed и **вложенные уровни** (`items`).
 * @param id — совпадает с `activeId` родительского `NavigationMenu` при выборе (лист); id по дереву уникальны
 * @param label — основной текст
 * @param icon — иконка слева
 * @param badge — счётчик/метка; отображается внутри {@link Badge} (тема `BadgeVariant.DEFAULT`)
 * @param suffix — элемент справа (например шеврон); у ветки по умолчанию шеврон раскрытия
 * @param disabled — блокирует клики и обновление active
 * @param href — режим ссылки только для **листа** (без `items`)
 * @param title — подсказка; в collapsed полезно при `label` не строка (в компактном режиме без hint/tooltip превращается в стилизованный Tooltip, не в нативный `title`)
 * @param onClick — дополнительный обработчик после логики выбора / раскрытия ветки
 * @param className — класс на интерактивном элементе
 * @param children — доп. содержимое строки (между подписью и бейджем)
 * @param status — цветовой акцент фона строки
 * @param loading — спиннер справа; выбор active у листа блокируется
 * @param skeleton — строка-скелетон без интерактива
 * @param isVisible — показ строки с анимацией
 * @param items — вложенные пункты; в развёрнутой панели — клик раскрывает список; в **collapsed** при **collapsedNestedFlyout** — подменю в панели при наведении
 * @param defaultNestedExpanded — начальное открытие ветки / flyout (см. **NavigationMenuItemProps**)
 * @param hint — обёртка {@link Hint} вокруг кнопки/ссылки; при одновременной передаче с tooltip имеет приоритет
 * @param tooltip — обёртка {@link Tooltip}; не используется, если задан hint
 * @param popover — компонент Popover: панель в `popover.children`, триггер — строка пункта; снаружи hint/tooltip
 * @param popoverActivateNavigation — при popover на листе: явно `true`, чтобы клик ещё и выбрал пункт (**activeId**)
 */
export const NavigationMenuItem = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  NavigationMenuItemProps
>(
  (
    {
      id,
      label,
      icon,
      badge,
      suffix,
      disabled = false,
      href,
      className,
      title,
      children,
      onClick,
      status,
      loading = false,
      skeleton = false,
      isVisible = true,
      items: nestedItemsProp,
      defaultNestedExpanded,
      hint,
      tooltip,
      popover,
      popoverActivateNavigation,
    },
    ref,
  ) => {
    const theme = useTheme();
    const { collapsed, activeId, setActiveId, activeAppearance, collapsedNestedFlyout } =
      useNavigationMenuContext();
    const depth = useNavigationMenuDepth();
    const nestedGroupId = useId();
    const branchControlId = useId();

    const active = activeId === id;
    const nestedItems = nestedItemsProp;
    const hasNestedBranch = Boolean(nestedItems != null && nestedItems.length > 0 && !skeleton);

    /** В компактном режиме ветка показывает **items** в поповере справа (не в колонке) */
    const collapsedFlyoutNested =
      collapsed && collapsedNestedFlyout && hasNestedBranch;

    const descendantActive =
      hasNestedBranch && navigationMenuSubtreeContainsActiveId(nestedItems, activeId);
    const rowLooksActive = hasNestedBranch ? active || Boolean(descendantActive) : active;

    const [nestedOpen, setNestedOpen] = useState(() => {
      if (!hasNestedBranch || nestedItems == null) {
        return false;
      }
      return (
        defaultNestedExpanded ??
        navigationMenuSubtreeContainsActiveId(nestedItems, activeId)
      );
    });

    useEffect(() => {
      if (!hasNestedBranch || nestedItems == null) {
        return;
      }
      if (navigationMenuSubtreeContainsActiveId(nestedItems, activeId)) {
        setNestedOpen(true);
      }
    }, [activeId, hasNestedBranch, nestedItems]);

    const [nestedFlyoutOpen, setNestedFlyoutOpen] = useState(() => {
      if (!nestedItems?.length || skeleton) {
        return false;
      }
      if (!collapsed || !collapsedNestedFlyout) {
        return false;
      }
      return Boolean(
        defaultNestedExpanded ??
          navigationMenuSubtreeContainsActiveId(nestedItems, activeId),
      );
    });

    const nestedFlyoutCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearNestedFlyoutCloseTimer = useCallback(() => {
      if (nestedFlyoutCloseTimerRef.current != null) {
        clearTimeout(nestedFlyoutCloseTimerRef.current);
        nestedFlyoutCloseTimerRef.current = null;
      }
    }, []);

    const scheduleNestedFlyoutClose = useCallback(() => {
      clearNestedFlyoutCloseTimer();
      nestedFlyoutCloseTimerRef.current = setTimeout(() => {
        setNestedFlyoutOpen(false);
        nestedFlyoutCloseTimerRef.current = null;
      }, 220);
    }, [clearNestedFlyoutCloseTimer]);

    const openNestedFlyout = useCallback(() => {
      clearNestedFlyoutCloseTimer();
      setNestedFlyoutOpen(true);
    }, [clearNestedFlyoutCloseTimer]);

    useEffect(() => {
      return () => clearNestedFlyoutCloseTimer();
    }, [clearNestedFlyoutCloseTimer]);

    useEffect(() => {
      if (!collapsed) {
        clearNestedFlyoutCloseTimer();
        setNestedFlyoutOpen(false);
      }
    }, [collapsed, clearNestedFlyoutCloseTimer]);

    useEffect(() => {
      if (!collapsedFlyoutNested || nestedItems == null) {
        return;
      }
      if (navigationMenuSubtreeContainsActiveId(nestedItems, activeId)) {
        setNestedFlyoutOpen(true);
      }
    }, [activeId, collapsedFlyoutNested, nestedItems]);

    const resolvedTitle = getNavigationMenuItemDisplayTitle(collapsed, label, title);

    const allowLeafActivationForPopover =
      popover == null || popoverActivateNavigation === true;

    const handleLeafActivate = useCallback(
      (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        onClick?.(event);
        if (disabled || loading || skeleton || event.defaultPrevented) {
          return;
        }
        if (!allowLeafActivationForPopover) {
          return;
        }
        setActiveId(id);
      },
      [
        allowLeafActivationForPopover,
        disabled,
        id,
        loading,
        onClick,
        setActiveId,
        skeleton,
      ],
    );

    const handleBranchClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (disabled || loading || skeleton || event.defaultPrevented) {
          return;
        }
        event.preventDefault();
        setNestedOpen(previous => !previous);
      },
      [disabled, loading, onClick, skeleton],
    );

    const handleBranchFlyoutClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (disabled || loading || skeleton || event.defaultPrevented) {
          return;
        }
        event.preventDefault();
        setNestedFlyoutOpen(previous => !previous);
      },
      [disabled, loading, onClick, skeleton],
    );

    const showFloatingBadge = !!(collapsed && badge != null && badge !== false);
    const showInlineBadge = !!(!collapsed && badge != null && badge !== false);
    const useLink =
      Boolean(href) && !disabled && !loading && !skeleton && !hasNestedBranch;

    const surfaceInteractiveDisabled = disabled || skeleton;

    /** Подсказка к иконке в collapsed без явного tooltip/hint: стилизованный Tooltip вместо нативного `title` */
    const collapsedLabelTooltip =
      collapsed &&
      hint == null &&
      tooltip == null &&
      typeof resolvedTitle === 'string' &&
      resolvedTitle.trim().length > 0
        ? {
            content: resolvedTitle,
            position: TooltipPosition.RIGHT,
            disabled: surfaceInteractiveDisabled || loading,
          }
        : undefined;

    const effectiveTooltip = tooltip ?? collapsedLabelTooltip;

    const commonSurface = {
      $collapsed: collapsed,
      $active: rowLooksActive,
      $disabled: surfaceInteractiveDisabled,
      $appearance: activeAppearance,
      $status: status,
      className: clsx('ui-navigation-menu-item', className),
      'aria-current': active && !hasNestedBranch ? ('page' as const) : undefined,
      /* Нативный title убираем, если показываем Hint/Tooltip — иначе дублируется «браузерная» подсказка */
      title:
        hint != null || effectiveTooltip != null ? undefined : resolvedTitle,
    };

    const spinnerColor = theme?.colors?.primary ?? '#68d5f8';

    const motionInnerProps = {
      initial: false as const,
      animate: {
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : -12,
      },
      transition: navigationMenuItemContentMotionTransition,
      style: {
        pointerEvents:
          isVisible && !skeleton ? ('auto' as const) : ('none' as const),
      },
      'aria-hidden': !isVisible,
    };

    const showNestedPanel =
      hasNestedBranch &&
      !collapsed &&
      nestedOpen &&
      nestedItems != null &&
      nestedItems.length > 0;

    const resolvedSuffix =
      suffix ??
      (hasNestedBranch && !collapsed ? (
        <NavigationMenuBranchChevron $open={nestedOpen} aria-hidden>
          <Icon name="IconPlainerChevronDown" size={IconSize.SM} color="currentColor" />
        </NavigationMenuBranchChevron>
      ) : null);

    if (skeleton) {
      return (
        <NavigationMenuRowCollapse $isVisible={isVisible}>
          <NavigationMenuRowCollapseInner>
            <NavigationMenuItemContentMotion {...motionInnerProps}>
              <NavigationMenuItemSkeletonSurface $collapsed={collapsed} aria-hidden>
                {/* Одна полоса на всю строку, как у пункта DropdownMenuItem при skeleton */}
                <Skeleton
                  variant={SkeletonVariant.CUSTOM}
                  shape="rect"
                  width="100%"
                  height={32}
                  borderRadius={6}
                  animated
                  ariaLabel="Загрузка пункта меню"
                />
              </NavigationMenuItemSkeletonSurface>
            </NavigationMenuItemContentMotion>
          </NavigationMenuRowCollapseInner>
        </NavigationMenuRowCollapse>
      );
    }

    const innerRowContent = (
      <>
        {icon != null || showFloatingBadge ? (
          <NavigationMenuItemIconWrap>
            {icon}
            {showFloatingBadge ? (
              <NavigationMenuBadgeFloatRoot>
                <Badge variant={BadgeVariant.DEFAULT} size={Size.SM}>
                  {badge}
                </Badge>
              </NavigationMenuBadgeFloatRoot>
            ) : null}
          </NavigationMenuItemIconWrap>
        ) : null}
        <NavigationMenuItemLabel $collapsed={collapsed}>{label}</NavigationMenuItemLabel>
        {children}
        {showInlineBadge ? (
          <NavigationMenuBadgeInlineRoot>
            <Badge variant={BadgeVariant.DEFAULT} size={Size.MD}>
              {badge}
            </Badge>
          </NavigationMenuBadgeInlineRoot>
        ) : null}
        {loading ? (
          <NavigationMenuItemLoadingSlot>
            <Spinner
              size={Size.SM}
              color={spinnerColor}
              variant={SpinnerVariant.CIRCLE}
              thickness={2}
              ariaLabel="Загрузка"
            />
          </NavigationMenuItemLoadingSlot>
        ) : null}
        {!collapsed && resolvedSuffix ? (
          <NavigationMenuItemSuffix>{resolvedSuffix}</NavigationMenuItemSuffix>
        ) : null}
      </>
    );

    if (hasNestedBranch && nestedItems != null) {
      const branchLabelForAria =
        typeof label === 'string' || typeof label === 'number'
          ? String(label)
          : 'Вложенное меню';

      const branchButton = (
        <NavigationMenuItemButton
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          id={branchControlId}
          disabled={surfaceInteractiveDisabled || loading}
          {...commonSurface}
          onClick={collapsedFlyoutNested ? handleBranchFlyoutClick : handleBranchClick}
          aria-busy={loading ? true : undefined}
          aria-expanded={
            collapsedFlyoutNested
              ? nestedFlyoutOpen
              : !collapsed
                ? nestedOpen
                : false
          }
          aria-controls={nestedGroupId}
        >
          {innerRowContent}
        </NavigationMenuItemButton>
      );

      const branchTrigger = wrapNavigationMenuItemTrigger(
        branchButton,
        hint,
        effectiveTooltip,
        collapsedFlyoutNested ? undefined : popover,
      );

      if (collapsedFlyoutNested) {
        return (
          <NavigationMenuBranchRoot>
            <NavigationMenuRowCollapseDiv $isVisible={isVisible}>
              <NavigationMenuRowCollapseInner>
                <NavigationMenuItemContentMotion {...motionInnerProps}>
                  <Popover
                    open={nestedFlyoutOpen}
                    onOpenChange={setNestedFlyoutOpen}
                    preferredPlacement="rightStart"
                    positioningMode="autoFit"
                    triggerWrapClickToggle={false}
                    offset={8}
                    size={Size.MD}
                    contentWidth={280}
                    contentMaxHeight={420}
                    contentAriaLabel={`${branchLabelForAria}: подменю`}
                    trigger={branchTrigger}
                    triggerWrapperProps={{
                      onMouseEnter: openNestedFlyout,
                      onMouseLeave: scheduleNestedFlyoutClose,
                    }}
                  >
                    <div
                      onMouseEnter={clearNestedFlyoutCloseTimer}
                      onMouseLeave={scheduleNestedFlyoutClose}
                    >
                      <NavigationMenuFlyoutBranchProvider>
                        <NavigationMenuNestedList
                          id={nestedGroupId}
                          role="group"
                          aria-labelledby={branchControlId}
                          $inFlyout
                        >
                          <NavigationMenuDepthProvider depth={depth + 1}>
                            {nestedItems.map(childItem => (
                              <NavigationMenuItem key={childItem.id} {...childItem} />
                            ))}
                          </NavigationMenuDepthProvider>
                        </NavigationMenuNestedList>
                      </NavigationMenuFlyoutBranchProvider>
                    </div>
                  </Popover>
                </NavigationMenuItemContentMotion>
              </NavigationMenuRowCollapseInner>
            </NavigationMenuRowCollapseDiv>
          </NavigationMenuBranchRoot>
        );
      }

      return (
        <NavigationMenuBranchRoot>
          <NavigationMenuRowCollapseDiv $isVisible={isVisible}>
            <NavigationMenuRowCollapseInner>
              <NavigationMenuItemContentMotion {...motionInnerProps}>
                {branchTrigger}
              </NavigationMenuItemContentMotion>
            </NavigationMenuRowCollapseInner>
          </NavigationMenuRowCollapseDiv>

          <NavigationMenuNestedCollapse $open={showNestedPanel}>
            <NavigationMenuNestedCollapseInner>
              <NavigationMenuNestedList
                id={nestedGroupId}
                role="group"
                aria-labelledby={branchControlId}
              >
                <NavigationMenuDepthProvider depth={depth + 1}>
                  {nestedItems.map(childItem => (
                    <NavigationMenuItem key={childItem.id} {...childItem} />
                  ))}
                </NavigationMenuDepthProvider>
              </NavigationMenuNestedList>
            </NavigationMenuNestedCollapseInner>
          </NavigationMenuNestedCollapse>
        </NavigationMenuBranchRoot>
      );
    }

    const leafTrigger = wrapNavigationMenuItemTrigger(
      useLink && href ? (
        <NavigationMenuItemAnchor
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          {...commonSurface}
          onClick={handleLeafActivate}
          aria-busy={loading ? true : undefined}
        >
          {innerRowContent}
        </NavigationMenuItemAnchor>
      ) : (
        <NavigationMenuItemButton
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          disabled={surfaceInteractiveDisabled || loading}
          {...commonSurface}
          onClick={handleLeafActivate}
          aria-busy={loading ? true : undefined}
        >
          {innerRowContent}
        </NavigationMenuItemButton>
      ),
      hint,
      effectiveTooltip,
      popover,
    );

    return (
      <NavigationMenuRowCollapse $isVisible={isVisible}>
        <NavigationMenuRowCollapseInner>
          <NavigationMenuItemContentMotion {...motionInnerProps}>
            {leafTrigger}
          </NavigationMenuItemContentMotion>
        </NavigationMenuRowCollapseInner>
      </NavigationMenuRowCollapse>
    );
  },
);

NavigationMenuItem.displayName = 'NavigationMenuItem';
