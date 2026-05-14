import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { clsx } from 'clsx';
import {
  TabItemTrigger,
  TabItemContent,
  TabItemGroupContainer,
  TabItemSkeletonRoot,
} from './TabItem.style';
import {
  TabsDirection,
  TabsVerticalPosition,
  TabItemTextPosition as TabItemTextPositionEnum,
  TabsVariant,
  SkeletonVariant,
  type TabItemTextOrientation,
  type TabItemTextPosition,
  type TabsItemDefinition,
} from '../../../types/ui';
import { useTheme } from 'styled-components';
import { Skeleton } from '../Skeleton/Skeleton';
import { renderTabItemTriggerInner } from './tabItemTriggerInner';
import { resolveTabsVariant } from '@/handlers/resolveTabsVariant';
import { TabItemGroupContext } from './TabItemGroupContext';
import { useTabItemGroupContext } from './TabItemGroupContext';
import { TabItemGroupList } from './TabItemGroupList';
import { usePillSegmentRegistration } from './pillSegmentTrack/PillSegmentRegistrationContext';
import { mergeRefs } from '@/handlers/assignRefs';
import { collectTabSegmentValues } from './collectTabSegmentValues';

export { TabItemGroupContext, useTabItemGroupContext } from './TabItemGroupContext';
export { TabItemGroupContainer } from './TabItem.style';
export { TabItemGroupList } from './TabItemGroupList';

/**
 * Пропсы компонента TabItem
 * @property value - Уникальное значение вкладки (обязательно)
 * @property label - Текст для кнопки вкладки
 * @property children - Панель вкладки (в группе можно опустить — только сегменты, без блока контента)
 * @property iconStart - Иконка в начале (слева для горизонтального текста, сверху для вертикального)
 * @property iconEnd - Иконка в конце (справа для горизонтального текста, снизу для вертикального)
 * @property badge - Счётчик/метка: рендер через **Badge** (**BadgeVariant.DEFAULT**, **Size.SM**); см. правила форматирования числа в **Badge**
 * @property textOrientation - Ориентация текста (horizontal/vertical)
 * @property textPosition - Позиция текста в вертикальном режиме текста (left/right)
 * @property defaultActive - Активна ли вкладка по умолчанию (для одиночного TabItem)
 * @property active - Контролируемое состояние активности (для одиночного TabItem)
 * @property onChange - Обработчик изменения активности (для одиночного TabItem)
 * @property direction - Направление табов (для одиночного TabItem без группы)
 * @property variant - Вариант оформления для одиночного TabItem; в группе берётся из TabItem.Group / Tabs
 * @property disabled - Отключить переключение вкладки
 * @property loading - Загрузка: спиннер, клик заблокирован (**aria-busy**)
 * @property skeleton - Плейсхолдер без интерактива; при **true** вместе с **loading** показывается только скелетон
 * @property triggerClassName - Класс для кнопки вкладки
 * @property contentClassName - Класс для содержимого вкладки
 * @property triggerProps - Дополнительные пропсы для кнопки вкладки
 * @property contentProps - Дополнительные пропсы для содержимого вкладки
 */
export interface TabItemProps {
  value: string;
  label?: React.ReactNode;
  children?: React.ReactNode;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  badge?: React.ReactNode;
  textOrientation?: TabItemTextOrientation;
  textPosition?: TabItemTextPosition;
  // Для одиночного TabItem
  defaultActive?: boolean;
  active?: boolean;
  onChange?: (active: boolean) => void;
  // Для группы TabItem
  direction?: TabsDirection;
  variant?: TabsVariant;
  disabled?: boolean;
  /** Индикатор загрузки: спиннер на триггере, переключение недоступно */
  loading?: boolean;
  /** Плейсхолдер вкладки без клика (приоритет над отображением loading при одновременной передаче) */
  skeleton?: boolean;
  triggerClassName?: string;
  contentClassName?: string;
  triggerProps?: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'children'>;
  contentProps?: Omit<React.HTMLAttributes<HTMLDivElement>, 'value' | 'children'>;
}

/**
 * Компонент TabItem - самодостаточный компонент вкладки
 * Может работать как одиночный компонент или в группе с другими TabItem
 */
export const TabItem: React.FC<TabItemProps> & {
  Group: React.FC<TabItemGroupProps>;
} = ({
  value,
  label,
  children,
  iconStart,
  iconEnd,
  badge,
  textOrientation,
  textPosition,
  defaultActive = false,
  active: controlledActive,
  onChange,
  direction: groupDirection,
  variant: tabVariantProp,
  disabled = false,
  loading = false,
  skeleton = false,
  triggerClassName,
  contentClassName,
  triggerProps,
  contentProps,
}) => {
  const theme = useTheme();
  const spinnerColor = theme?.colors?.primary ?? '#68d5f8';

  const groupContext = useTabItemGroupContext();

  const [internalActive, setInternalActive] = useState(defaultActive);
  const isControlled = controlledActive !== undefined;

  const {
    onClick: triggerOnClick,
    disabled: triggerDisabled,
    ref: externalTriggerReference,
    ...restTriggerPropsWithoutRef
  } = triggerProps ?? {};
  const isInteractionBlocked = !!(disabled || triggerDisabled || loading || skeleton);

  const pillSegmentRegistration = usePillSegmentRegistration();

  const mergedGroupTriggerReference = useMemo(() => {
    if (!groupContext || groupContext.variant !== TabsVariant.PILL) {
      return externalTriggerReference;
    }
    return mergeRefs(externalTriggerReference, (element) => {
      pillSegmentRegistration.registerSegmentTriggerRef(value, element);
    });
  }, [groupContext, externalTriggerReference, pillSegmentRegistration, value]);

  if (groupContext) {
    const { activeTab, setActiveTab, direction, variant: groupVariant } = groupContext;
    const isActive = activeTab === value;

    const finalTextPosition =
      textOrientation === 'vertical' && !textPosition
        ? TabItemTextPositionEnum.RIGHT
        : textPosition;

    const shouldWrapText =
      textOrientation === 'vertical' && finalTextPosition === TabItemTextPositionEnum.RIGHT;

    const isVertical = textOrientation === 'vertical';
    const flexDirection = isVertical ? 'column' : 'row';
    const gap = isVertical ? '4px' : '8px';

    const handleGroupClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      triggerOnClick?.(e);
      if (isInteractionBlocked || e.defaultPrevented) {
        return;
      }
      setActiveTab(value);
    };

    if (skeleton) {
      return (
        <TabItemSkeletonRoot
          ref={mergedGroupTriggerReference}
          className={clsx('ui-tab-item-skeleton', triggerClassName)}
          $direction={direction}
          $variant={groupVariant}
          aria-hidden
        >
          <Skeleton
            variant={SkeletonVariant.CUSTOM}
            shape="rect"
            width={direction === TabsDirection.VERTICAL ? '80%' : '72px'}
            height={14}
            borderRadius={6}
            animated
            ariaLabel="Загрузка вкладки"
          />
        </TabItemSkeletonRoot>
      );
    }

    const triggerInner = renderTabItemTriggerInner({
      iconStart,
      iconEnd,
      label,
      badge,
      loading,
      spinnerColor,
      shouldWrapText,
    });

    return (
      <TabItemTrigger
        type="button"
        className={clsx('ui-tab-item-trigger', triggerClassName)}
        $isActive={isActive}
        $direction={direction}
        $variant={groupVariant}
        $disabled={isInteractionBlocked}
        disabled={isInteractionBlocked}
        $loading={loading}
        $textOrientation={textOrientation}
        $textPosition={finalTextPosition}
        $hasIcons={!!(iconStart || iconEnd)}
        $flexDirection={flexDirection}
        $gap={gap}
        onClick={handleGroupClick}
        ref={mergedGroupTriggerReference}
        aria-pressed={isActive}
        aria-busy={loading ? true : undefined}
        {...restTriggerPropsWithoutRef}
      >
        {triggerInner}
      </TabItemTrigger>
    );
  }

  const isActiveStandalone = isControlled ? controlledActive : internalActive;

  const handleStandaloneClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    triggerOnClick?.(e);
    if (isInteractionBlocked || e.defaultPrevented) {
      return;
    }
    const newActive = !isActiveStandalone;
    if (!isControlled) {
      setInternalActive(newActive);
    }
    onChange?.(newActive);
  };

  const finalTextPositionStandalone =
    textOrientation === 'vertical' && !textPosition ? TabItemTextPositionEnum.RIGHT : textPosition;

  const shouldWrapTextStandalone =
    textOrientation === 'vertical' &&
    finalTextPositionStandalone === TabItemTextPositionEnum.RIGHT;

  const isVerticalStandalone = textOrientation === 'vertical';
  const flexDirectionStandalone = isVerticalStandalone ? 'column' : 'row';
  const gapStandalone = isVerticalStandalone ? '4px' : '8px';

  const direction = groupDirection ?? TabsDirection.HORIZONTAL;
  const resolvedVariant = resolveTabsVariant(direction, tabVariantProp);

  if (skeleton) {
    return (
      <>
        <TabItemSkeletonRoot
          ref={externalTriggerReference}
          className={clsx('ui-tab-item-skeleton', triggerClassName)}
          $direction={direction}
          $variant={resolvedVariant}
          aria-hidden
        >
          <Skeleton
            variant={SkeletonVariant.CUSTOM}
            shape="rect"
            width={direction === TabsDirection.VERTICAL ? '80%' : '72px'}
            height={14}
            borderRadius={6}
            animated
            ariaLabel="Загрузка вкладки"
          />
        </TabItemSkeletonRoot>
        <TabItemContent
          className={clsx('ui-tab-item-content', contentClassName)}
          $isActive={isActiveStandalone}
          $direction={direction}
          {...contentProps}
        >
          {children}
        </TabItemContent>
      </>
    );
  }

  const standaloneTriggerInner = renderTabItemTriggerInner({
    iconStart,
    iconEnd,
    label,
    badge,
    loading,
    spinnerColor,
    shouldWrapText: shouldWrapTextStandalone,
  });

  return (
    <>
      <TabItemTrigger
        type="button"
        className={clsx('ui-tab-item-trigger', triggerClassName)}
        $isActive={isActiveStandalone}
        $direction={direction}
        $variant={resolvedVariant}
        $disabled={isInteractionBlocked}
        disabled={isInteractionBlocked}
        $loading={loading}
        $textOrientation={textOrientation}
        $textPosition={finalTextPositionStandalone}
        $hasIcons={!!(iconStart || iconEnd)}
        $flexDirection={flexDirectionStandalone}
        $gap={gapStandalone}
        onClick={handleStandaloneClick}
        ref={externalTriggerReference}
        aria-busy={loading ? true : undefined}
        {...restTriggerPropsWithoutRef}
      >
        {standaloneTriggerInner}
      </TabItemTrigger>
      <TabItemContent
        className={clsx('ui-tab-item-content', contentClassName)}
        $isActive={isActiveStandalone}
        $direction={direction}
        {...contentProps}
      >
        {children}
      </TabItemContent>
    </>
  );
};

TabItem.displayName = 'TabItem';

// Интерфейс для группы TabItem
interface TabItemGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Дочерние **TabItem**; если задан непустой **items**, для построения списка вкладок не используется.
   */
  children?: React.ReactNode;
  /**
   * Вкладки из данных (те же поля, что у **TabItem** в группе); при непустом массиве имеют приоритет над **children**.
   */
  items?: TabsItemDefinition[];
  direction?: TabsDirection;
  /** Начальный активный сегмент (неконтролируемый режим) */
  defaultActiveTab?: string;
  /** Алиас для **defaultActiveTab** */
  defaultValue?: string;
  /** Контролируемое значение активного сегмента */
  value?: string;
  onChange?: (activeTab: string) => void;
  className?: string;
  /** Позиция табов в вертикальном режиме (слева или справа от контента) */
  tabsPosition?: TabsVerticalPosition;
  /**
   * Вариант оформления. Если не задан: вертикально — line, горизонтально — pill (макет Figma).
   */
  variant?: TabsVariant;
  /** Доступное имя группы сегментов (**role="group"** на корне) */
  ariaLabel?: string;
  /** Пропсы внутреннего трека (**TabItemGroupList**); к **className** добавляется **ui-tabs-list** */
  segmentTrackProps?: Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>;
}

// Компонент группы TabItem
export const TabItemGroup: React.FC<TabItemGroupProps> = ({
  children,
  items,
  direction = TabsDirection.HORIZONTAL,
  defaultActiveTab,
  defaultValue,
  value: controlledActiveTabValue,
  onChange,
  className,
  tabsPosition = TabsVerticalPosition.START,
  variant: variantProp,
  ariaLabel,
  segmentTrackProps,
  ...props
}) => {
  const resolvedVariant = resolveTabsVariant(direction, variantProp);

  const tabNodesFromItems = useMemo(() => {
    if (!items?.length) {
      return null;
    }
    return (
      <>
        {items.map((itemDefinition) => (
          <TabItem key={itemDefinition.value} {...itemDefinition} />
        ))}
      </>
    );
  }, [items]);

  const effectiveTabChildren = tabNodesFromItems ?? children ?? null;

  const segmentValues = useMemo(() => {
    if (items?.length) {
      return items.map((row) => row.value);
    }
    return collectTabSegmentValues(children);
  }, [children, items]);
  const segmentValuesKey = segmentValues.join('\0');

  const effectiveDefaultTab = defaultActiveTab ?? defaultValue ?? '';
  const firstSegmentValue = segmentValues[0] ?? '';

  const [internalActiveTab, setInternalActiveTab] = useState(
    () => effectiveDefaultTab || firstSegmentValue,
  );

  const isControlled = controlledActiveTabValue !== undefined;
  const activeTab = isControlled ? (controlledActiveTabValue ?? '') : internalActiveTab;

  useEffect(() => {
    if (!isControlled && defaultValue !== undefined) {
      setInternalActiveTab(defaultValue);
    }
  }, [defaultValue, isControlled]);

  useEffect(() => {
    if (!isControlled && defaultActiveTab !== undefined) {
      setInternalActiveTab(defaultActiveTab);
    }
  }, [defaultActiveTab, isControlled]);

  useEffect(() => {
    if (isControlled || segmentValues.length === 0) {
      return;
    }
    const validValues = new Set(segmentValues);
    if (!validValues.has(internalActiveTab)) {
      setInternalActiveTab(segmentValues[0] ?? '');
    }
  }, [segmentValuesKey, internalActiveTab, isControlled, segmentValues]);

  const handleTabChange = useCallback(
    (tabId: string) => {
      if (!isControlled) {
        setInternalActiveTab(tabId);
      }
      onChange?.(tabId);
    },
    [isControlled, onChange],
  );

  const triggers: React.ReactNode[] = [];
  const contents: React.ReactNode[] = [];
  const otherChildren: React.ReactNode[] = [];

  const processChildren = (node: React.ReactNode): void => {
    React.Children.forEach(node, (child) => {
      if (React.isValidElement(child)) {
        if (child.type === TabItem) {
          const tabItem = child as React.ReactElement<TabItemProps>;
          const tabValue = tabItem.props.value;
          const isActive = activeTab === tabValue;

          triggers.push(
            React.cloneElement(tabItem, {
              key: `trigger-${tabValue}`,
              children: undefined,
            } as Partial<TabItemProps>),
          );

          contents.push(
            <TabItemContent
              key={`content-${tabValue}`}
              className={clsx('ui-tab-item-content', tabItem.props.contentClassName)}
              $isActive={isActive}
              $direction={direction}
              {...tabItem.props.contentProps}
            >
              {tabItem.props.children}
            </TabItemContent>,
          );
        } else if (child.type === TabItemGroupList) {
          const listChildren: React.ReactNode[] = [];
          React.Children.forEach(child.props.children, (listChild) => {
            if (React.isValidElement(listChild) && listChild.type === TabItem) {
              const tabItem = listChild as React.ReactElement<TabItemProps>;
              const tabValue = tabItem.props.value;
              const isActive = activeTab === tabValue;

              triggers.push(
                React.cloneElement(tabItem, {
                  key: `trigger-${tabValue}`,
                  children: undefined,
                } as Partial<TabItemProps>),
              );

              contents.push(
                <TabItemContent
                  key={`content-${tabValue}`}
                  className={clsx('ui-tab-item-content', tabItem.props.contentClassName)}
                  $isActive={isActive}
                  $direction={direction}
                  {...tabItem.props.contentProps}
                >
                  {tabItem.props.children}
                </TabItemContent>,
              );

              listChildren.push(
                React.cloneElement(tabItem, {
                  key: `trigger-${tabValue}`,
                  children: undefined,
                } as Partial<TabItemProps>),
              );
            } else {
              listChildren.push(listChild);
            }
          });
          otherChildren.push(
            React.cloneElement(child, {
              key: 'tab-item-group-list',
              $direction: direction,
              $variant: resolvedVariant,
              ...segmentTrackProps,
              className: clsx(
                'ui-tabs-list',
                segmentTrackProps?.className,
                (child.props as { className?: string }).className,
              ),
              children: listChildren,
            } as Partial<React.ComponentProps<typeof TabItemGroupList>>),
          );
        } else if (child.props?.children) {
          processChildren(child.props.children);
        } else {
          otherChildren.push(child);
        }
      }
    });
  };

  processChildren(effectiveTabChildren);

  return (
    <TabItemGroupContext.Provider
      value={{
        activeTab,
        setActiveTab: handleTabChange,
        direction,
        tabsPosition,
        variant: resolvedVariant,
      }}
    >
      <TabItemGroupContainer
        className={clsx('ui-tab-item-group', className)}
        $direction={direction}
        $tabsPosition={direction === TabsDirection.VERTICAL ? tabsPosition : undefined}
        {...props}
        {...(ariaLabel ? { role: 'group' as const, 'aria-label': ariaLabel } : {})}
      >
        {otherChildren.length > 0 ? (
          <>
            {otherChildren}
            {contents}
          </>
        ) : (
          <>
            <TabItemGroupList
              $direction={direction}
              $variant={resolvedVariant}
              {...segmentTrackProps}
              className={clsx('ui-tabs-list', segmentTrackProps?.className)}
            >
              {triggers}
            </TabItemGroupList>
            {contents}
          </>
        )}
      </TabItemGroupContainer>
    </TabItemGroupContext.Provider>
  );
};

TabItem.Group = TabItemGroup;
