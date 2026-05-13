import React, { useCallback } from 'react';
import { clsx } from 'clsx';

import { NavigationMenu } from '../NavigationMenu';
import { Icon } from '../Icon/Icon';
import { NavigationMenuActiveAppearance, NavigationMenuExpandInteraction } from '@/types/ui';
import type { SidemenuProps, SidemenuItem } from '../../../types/ui';
import { SidemenuVariant } from '../../../types/ui';
import { IconSize } from '../../../types/sizes';
import { sidemenuOffScreenInnerPanelTransition } from '@/handlers/offScreenPanelMotionHandlers';
import {
  mapSidemenuItemToNavigationProps,
  resolveSidemenuActiveId,
  findSidemenuItemById,
} from '@/handlers/navigationMenuNestedHandlers';
import { useNavigationMenuExpand } from '@/hooks/useNavigationMenuExpand';
import {
  SidemenuExpandToggleButton,
  SidemenuExpandToggleIconWrap,
  SidemenuExpandToggleSlot,
  SidemenuFooter,
  SidemenuFooterRegion,
  SidemenuHeaderSection,
  SidemenuLogoIconSlot,
  SidemenuLogoRow,
  SidemenuLogoRowStart,
  SidemenuLogoTitleText,
  SidemenuMenuItemsContainer,
  SidemenuPanelRoot,
  SidemenuSectionDivider,
} from './Sidemenu.style';
import { SidemenuOffScreenHoverShell } from './SidemenuOffScreenHoverShell';

const DEFAULT_SIDEMENU_COMPACT = 100;
const DEFAULT_SIDEMENU_EXPANDED = 310;
const DEFAULT_OFF_SCREEN_EDGE_WIDTH_PX = 16;
const DEFAULT_OFF_SCREEN_Z_INDEX = 1030;

/** Переходы панели: ширина всегда из Framer Motion, чтобы сворачивание/разворачивание было плавным */
const sidemenuPanelMotionTransition = {
  width: { type: 'tween' as const, duration: 0.34, ease: [0.25, 0.1, 0.25, 1] as const },
  x: { type: 'tween' as const, duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const },
  opacity: { type: 'tween' as const, duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const },
};

/**
 * Боковое меню навигации: пункты через {@link NavigationMenu}, логотип, компактная / полная раскладка.
 *
 * @param items — список пунктов меню (`SidemenuItem[]`)
 * @param logo — опционально иконка и заголовок в шапке (игнорируются для блока шапки, если задан **logoSlot**)
 * @param logoSlot — произвольный контент слева в шапке вместо **logo.icon** / **logo.title**
 * @param variant — при `expandInteraction === none` задаёт ширину и подписи; иначе начальное состояние через `defaultExpanded` / `variant`
 * @param className — дополнительный CSS-класс корневого контейнера
 * @param onItemClick — колбэк при выборе пункта (до `item.onClick`)
 * @param expandInteraction — раскрытие панели по клику или наведению (`NavigationMenuExpandInteraction`)
 * @param expanded — контролируемое раскрытие
 * @param defaultExpanded — начальное раскрытие (по умолчанию от `variant === EXPANDED`)
 * @param onExpand — после разворота панели
 * @param onCollapse — после сворачивания
 * @param onExpandedChange — смена `expanded` в контролируемом режиме
 * @param expandCompactWidth — ширина компактной панели (px)
 * @param expandExpandedWidth — ширина развёрнутой панели (px)
 * @param offScreenHoverReveal — панель слева за краем; полоса у кромки по hover раскрывает меню (анимация)
 * @param offScreenEdgeWidth — ширина полосы наведения у левого края (px)
 * @param offScreenRevealed — контролируемая видимость панели
 * @param defaultOffScreenRevealed — начальное состояние при неконтролируемом режиме
 * @param onOffScreenRevealedChange — запрос смены видимости с экрана
 * @param onOffScreenShow — после появления панели
 * @param onOffScreenHide — после скрытия панели
 * @param offScreenZIndex — z-index фиксированной оболочки
 * @param offScreenHideDelayMs — пауза перед скрытием после ухода курсора (мс)
 * @param expandToggleRender — кнопка раскрытия панели в шапке (кастомная)
 * @param onExpandToggleClick — колбэк для встроенной кнопки или через **toggleExpanded** из render
 * @param showExpandToggleButton — встроенная кнопка при режимах CLICK / HOVER
 * @param footer — нижний слот: произвольный ReactNode (второе меню, кнопки и т.д.); клик по обёртке не переключает раскрытие панели
 * @param slotStyles — инлайн-стили зон **header** / **body** / **footer** (высота, flex, overflow)
 * @param edgeAttached — панель без скругления и тени у левого края экрана (**min-height: 100vh**)
 */
export const Sidemenu: React.FC<SidemenuProps> = ({
  items,
  logo,
  logoSlot,
  footer,
  slotStyles,
  edgeAttached = false,
  variant = SidemenuVariant.EXPANDED,
  className,
  onItemClick,
  expandInteraction: expandInteractionProp,
  expanded: expandedProp,
  defaultExpanded: defaultExpandedProp,
  onExpand,
  onCollapse,
  onExpandedChange,
  expandCompactWidth = DEFAULT_SIDEMENU_COMPACT,
  expandExpandedWidth = DEFAULT_SIDEMENU_EXPANDED,
  offScreenHoverReveal = false,
  offScreenEdgeWidth,
  offScreenRevealed,
  defaultOffScreenRevealed,
  onOffScreenRevealedChange,
  onOffScreenShow,
  onOffScreenHide,
  offScreenZIndex,
  offScreenHideDelayMs,
  expandToggleRender,
  onExpandToggleClick,
  showExpandToggleButton = false,
}) => {
  const expandInteraction = expandInteractionProp ?? NavigationMenuExpandInteraction.NONE;

  const expand = useNavigationMenuExpand({
    expandInteraction,
    collapsed: variant === SidemenuVariant.COLLAPSED,
    expanded: expandedProp,
    defaultExpanded:
      defaultExpandedProp !== undefined
        ? defaultExpandedProp
        : variant === SidemenuVariant.EXPANDED,
    onExpand,
    onCollapse,
    onExpandedChange,
  });

  const handleBuiltInExpandToggleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const nextExpanded = !expand.isExpanded;
      onExpandToggleClick?.(event, nextExpanded);
      if (event.defaultPrevented) {
        return;
      }
      expand.setExpanded(nextExpanded);
    },
    [expand, onExpandToggleClick],
  );

  const handleToggleExpandedFromContext = useCallback(() => {
    const nextExpanded = !expand.isExpanded;
    onExpandToggleClick?.(null, nextExpanded);
    expand.setExpanded(nextExpanded);
  }, [expand, onExpandToggleClick]);

  const shouldShowDefaultExpandToggleButton =
    expandToggleRender == null &&
    expand.isExpandInteractionEnabled &&
    (expandInteraction === NavigationMenuExpandInteraction.TOGGLE_BUTTON ||
      showExpandToggleButton === true);

  const expandToggleSlot =
    expand.isExpandInteractionEnabled &&
    (expandToggleRender != null || shouldShowDefaultExpandToggleButton) ? (
      expandToggleRender != null ? (
        expandToggleRender({
          isExpanded: expand.isExpanded,
          toggleExpanded: handleToggleExpandedFromContext,
        })
      ) : (
        <SidemenuExpandToggleButton
          type="button"
          onClick={handleBuiltInExpandToggleClick}
          aria-expanded={expand.isExpanded}
          aria-label={expand.isExpanded ? 'Свернуть боковую панель' : 'Развернуть боковую панель'}
        >
          <SidemenuExpandToggleIconWrap
            $expanded={expand.isExpanded}
            $chevronAxis={
              expandInteraction === NavigationMenuExpandInteraction.TOGGLE_BUTTON
                ? 'horizontal'
                : 'vertical'
            }
            aria-hidden
          >
            <Icon name="IconPlainerChevronDown" size={IconSize.SM} color="currentColor" />
          </SidemenuExpandToggleIconWrap>
        </SidemenuExpandToggleButton>
      )
    ) : null;

  const handleItemClick = (item: SidemenuItem) => {
    onItemClick?.(item);
    item.onClick?.();
  };

  const resolvedActiveId = resolveSidemenuActiveId(items);

  const handleNavigationActiveChange = (nextActiveId: string) => {
    const selectedItem = findSidemenuItemById(items, nextActiveId);
    if (selectedItem) {
      handleItemClick(selectedItem);
    }
  };

  const isFullLayout = expand.isExpanded;

  /**
   * Показывать шапку с логотипом и разделитель: только если есть что вывести
   * (**logoSlot**; либо иконка в любом режиме; заголовок — только в развёрнутой панели).
   */
  const shouldRenderLogoHeader =
    logoSlot != null ||
    (logo != null && (Boolean(logo?.icon) || (isFullLayout && Boolean(logo?.title))));

  const hasLogoStartBlock =
    logoSlot != null || Boolean(logo?.icon) || (isFullLayout && Boolean(logo?.title));

  const shouldRenderHeaderRow = shouldRenderLogoHeader || expandToggleSlot != null;

  /** При expandInteraction === none значение совпадает с variant; ширина всегда из motion */
  const targetPanelWidth = expand.isExpanded ? expandExpandedWidth : expandCompactWidth;

  const offScreenEdgeWidthPx = offScreenEdgeWidth ?? DEFAULT_OFF_SCREEN_EDGE_WIDTH_PX;
  const offScreenLayerZIndex = offScreenZIndex ?? DEFAULT_OFF_SCREEN_Z_INDEX;

  /** У режима «за краем» входная анимация только обрезкой снаружи, без сдвига x с экрана */
  const panelMotionInitial = offScreenHoverReveal
    ? false
    : { x: -100, opacity: 0, width: targetPanelWidth };

  const panelMotionAnimate = {
    x: 0,
    opacity: 1,
    width: targetPanelWidth,
  };

  const sidemenuPanel = (
    <SidemenuPanelRoot
      $edgeAttached={edgeAttached}
      className={clsx('ui-sidemenu', edgeAttached && 'ui-sidemenu--edge-attached', className)}
      {...expand.expandRootProps}
      initial={panelMotionInitial}
      animate={panelMotionAnimate}
      transition={
        offScreenHoverReveal ? sidemenuOffScreenInnerPanelTransition : sidemenuPanelMotionTransition
      }
    >
      {shouldRenderHeaderRow ? (
        <SidemenuHeaderSection style={slotStyles?.header}>
          <SidemenuLogoRow $withToggle={expandToggleSlot != null} $hasLogoBlock={hasLogoStartBlock}>
            {hasLogoStartBlock ? (
              <SidemenuLogoRowStart data-prevent-navigation-expand-toggle>
                {logoSlot != null ? (
                  logoSlot
                ) : (
                  <>
                    {logo?.icon != null ? (
                      <SidemenuLogoIconSlot>{logo.icon}</SidemenuLogoIconSlot>
                    ) : null}
                    {isFullLayout && logo?.title != null ? (
                      <SidemenuLogoTitleText>{logo.title}</SidemenuLogoTitleText>
                    ) : null}
                  </>
                )}
              </SidemenuLogoRowStart>
            ) : null}
            {expandToggleSlot != null ? (
              <SidemenuExpandToggleSlot $standaloneToggle={!hasLogoStartBlock}>
                {expandToggleSlot}
              </SidemenuExpandToggleSlot>
            ) : null}
          </SidemenuLogoRow>
          <SidemenuSectionDivider
            $expanded={isFullLayout}
            $placement="afterHeader"
            $edgeAttached={edgeAttached}
          />
        </SidemenuHeaderSection>
      ) : null}

      <SidemenuMenuItemsContainer
        $leadPaddingTopPx={shouldRenderHeaderRow ? 0 : 24}
        style={slotStyles?.body}
      >
        <NavigationMenu
          collapsed={!isFullLayout}
          activeId={resolvedActiveId}
          onActiveChange={handleNavigationActiveChange}
          activeAppearance={NavigationMenuActiveAppearance.HIGHLIGHTED}
          aria-label="Основная навигация приложения"
          className="ui-sidemenu__navigation"
        >
          {items.map((menuEntry) => (
            <NavigationMenu.Item
              key={menuEntry.id}
              {...mapSidemenuItemToNavigationProps(menuEntry)}
            />
          ))}
        </NavigationMenu>
      </SidemenuMenuItemsContainer>

      {footer != null ? (
        <SidemenuFooterRegion data-prevent-navigation-expand-toggle>
          <SidemenuSectionDivider
            $expanded={isFullLayout}
            $placement="beforeFooter"
            $edgeAttached={edgeAttached}
          />
          <SidemenuFooter style={slotStyles?.footer}>{footer}</SidemenuFooter>
        </SidemenuFooterRegion>
      ) : null}
    </SidemenuPanelRoot>
  );

  if (offScreenHoverReveal) {
    return (
      <SidemenuOffScreenHoverShell
        edgeWidthPx={offScreenEdgeWidthPx}
        panelWidthPx={targetPanelWidth}
        revealed={offScreenRevealed}
        defaultRevealed={defaultOffScreenRevealed}
        onRevealedChange={onOffScreenRevealedChange}
        onShow={onOffScreenShow}
        onHide={onOffScreenHide}
        zIndex={offScreenLayerZIndex}
        hideDelayMs={offScreenHideDelayMs}
      >
        {sidemenuPanel}
      </SidemenuOffScreenHoverShell>
    );
  }

  return sidemenuPanel;
};
