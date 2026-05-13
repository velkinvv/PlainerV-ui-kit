import React, { useState, useContext, createContext, useEffect } from 'react';
import { clsx } from 'clsx';
import {
  TabItemTrigger,
  TabItemContent,
  TabItemGroupContainer,
  TabItemGroupList,
  TabItemBadge,
  TabItemIconSlot,
  TabItemVerticalTextWrap,
} from './TabItem.style';
import type { TabsVariant } from '../../../types/ui';
import {
  TabsDirection,
  TabsVerticalPosition,
  TabItemTextPosition as TabItemTextPositionEnum,
  type TabItemTextOrientation,
  type TabItemTextPosition,
} from '../../../types/ui';
import { resolveTabsVariant } from '@/handlers/resolveTabsVariant';

// Контекст для группы TabItem (опциональный)
interface TabItemGroupContextType {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  direction: TabsDirection;
  tabsPosition?: TabsVerticalPosition;
  variant: TabsVariant;
}

export const TabItemGroupContext = createContext<TabItemGroupContextType | undefined>(undefined);

const useTabItemGroupContext = () => {
  return useContext(TabItemGroupContext);
};

export { TabItemGroupContainer, TabItemGroupList } from './TabItem.style';

/**
 * Пропсы компонента TabItem
 * @property value - Уникальное значение вкладки (обязательно)
 * @property label - Текст для кнопки вкладки
 * @property children - Содержимое вкладки
 * @property iconStart - Иконка в начале (слева для горизонтального текста, сверху для вертикального)
 * @property iconEnd - Иконка в конце (справа для горизонтального текста, снизу для вертикального)
 * @property badge - Счётчик/метка в красном бейдже справа от подписи (вариант pill в макете Figma)
 * @property textOrientation - Ориентация текста (horizontal/vertical)
 * @property textPosition - Позиция текста в вертикальном режиме текста (left/right)
 * @property defaultActive - Активна ли вкладка по умолчанию (для одиночного TabItem)
 * @property active - Контролируемое состояние активности (для одиночного TabItem)
 * @property onChange - Обработчик изменения активности (для одиночного TabItem)
 * @property direction - Направление табов (для одиночного TabItem без группы)
 * @property variant - Вариант оформления для одиночного TabItem; в группе берётся из TabItem.Group / Tabs
 * @property disabled - Отключить переключение вкладки
 * @property triggerClassName - Класс для кнопки вкладки
 * @property contentClassName - Класс для содержимого вкладки
 * @property triggerProps - Дополнительные пропсы для кнопки вкладки
 * @property contentProps - Дополнительные пропсы для содержимого вкладки
 */
export interface TabItemProps {
  value: string;
  label?: React.ReactNode;
  children: React.ReactNode;
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
  triggerClassName,
  contentClassName,
  triggerProps,
  contentProps,
}) => {
  const groupContext = useTabItemGroupContext();

  const [internalActive, setInternalActive] = useState(defaultActive);
  const isControlled = controlledActive !== undefined;

  const {
    onClick: triggerOnClick,
    disabled: triggerDisabled,
    ...restTriggerProps
  } = triggerProps ?? {};
  const isDisabled = !!(disabled || triggerDisabled);

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
      if (isDisabled || e.defaultPrevented) {
        return;
      }
      setActiveTab(value);
    };

    const inner = (
      <>
        {iconStart ? <TabItemIconSlot>{iconStart}</TabItemIconSlot> : null}
        {label ? <span>{label}</span> : null}
        {iconEnd ? <TabItemIconSlot>{iconEnd}</TabItemIconSlot> : null}
        {badge != null && badge !== false ? <TabItemBadge>{badge}</TabItemBadge> : null}
      </>
    );

    return (
      <TabItemTrigger
        type="button"
        className={clsx('ui-tab-item-trigger', triggerClassName)}
        $isActive={isActive}
        $direction={direction}
        $variant={groupVariant}
        $disabled={isDisabled}
        disabled={isDisabled}
        $textOrientation={textOrientation}
        $textPosition={finalTextPosition}
        $hasIcons={!!(iconStart || iconEnd)}
        $flexDirection={flexDirection}
        $gap={gap}
        onClick={handleGroupClick}
        {...restTriggerProps}
      >
        {shouldWrapText ? <TabItemVerticalTextWrap>{inner}</TabItemVerticalTextWrap> : inner}
      </TabItemTrigger>
    );
  }

  const isActive = isControlled ? controlledActive : internalActive;

  const handleStandaloneClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    triggerOnClick?.(e);
    if (isDisabled || e.defaultPrevented) {
      return;
    }
    const newActive = !isActive;
    if (!isControlled) {
      setInternalActive(newActive);
    }
    onChange?.(newActive);
  };

  const finalTextPosition =
    textOrientation === 'vertical' && !textPosition ? TabItemTextPositionEnum.RIGHT : textPosition;

  const shouldWrapText =
    textOrientation === 'vertical' && finalTextPosition === TabItemTextPositionEnum.RIGHT;

  const isVertical = textOrientation === 'vertical';
  const flexDirection = isVertical ? 'column' : 'row';
  const gap = isVertical ? '4px' : '8px';

  const direction = groupDirection ?? TabsDirection.HORIZONTAL;
  const resolvedVariant = resolveTabsVariant(direction, tabVariantProp);

  const inner = (
    <>
      {iconStart ? <TabItemIconSlot>{iconStart}</TabItemIconSlot> : null}
      {label ? <span>{label}</span> : null}
      {iconEnd ? <TabItemIconSlot>{iconEnd}</TabItemIconSlot> : null}
      {badge != null && badge !== false ? <TabItemBadge>{badge}</TabItemBadge> : null}
    </>
  );

  return (
    <>
      <TabItemTrigger
        type="button"
        className={clsx('ui-tab-item-trigger', triggerClassName)}
        $isActive={isActive}
        $direction={direction}
        $variant={resolvedVariant}
        $disabled={isDisabled}
        disabled={isDisabled}
        $textOrientation={textOrientation}
        $textPosition={finalTextPosition}
        $hasIcons={!!(iconStart || iconEnd)}
        $flexDirection={flexDirection}
        $gap={gap}
        onClick={handleStandaloneClick}
        {...restTriggerProps}
      >
        {shouldWrapText ? <TabItemVerticalTextWrap>{inner}</TabItemVerticalTextWrap> : inner}
      </TabItemTrigger>
      <TabItemContent
        className={clsx('ui-tab-item-content', contentClassName)}
        $isActive={isActive}
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
  children: React.ReactNode;
  direction?: TabsDirection;
  defaultActiveTab?: string;
  onChange?: (activeTab: string) => void;
  className?: string;
  /** Позиция табов в вертикальном режиме (слева или справа от контента) */
  tabsPosition?: TabsVerticalPosition;
  /**
   * Вариант оформления. Если не задан: вертикально — line, горизонтально — pill (макет Figma).
   */
  variant?: TabsVariant;
}

// Компонент группы TabItem
export const TabItemGroup: React.FC<TabItemGroupProps> = ({
  children,
  direction = TabsDirection.HORIZONTAL,
  defaultActiveTab,
  onChange,
  className,
  tabsPosition = TabsVerticalPosition.START,
  variant: variantProp,
  ...props
}) => {
  const resolvedVariant = resolveTabsVariant(direction, variantProp);

  const allTabItems: Array<{ value: string; children: React.ReactNode }> = [];

  const collectTabItems = (node: React.ReactNode): void => {
    React.Children.forEach(node, (child) => {
      if (React.isValidElement(child)) {
        if (child.type === TabItem) {
          const tabItem = child as React.ReactElement<TabItemProps>;
          allTabItems.push({
            value: tabItem.props.value,
            children: tabItem.props.children,
          });
        } else if (child.props?.children) {
          collectTabItems(child.props.children);
        }
      }
    });
  };

  collectTabItems(children);

  const initialActiveTab = defaultActiveTab || (allTabItems.length > 0 ? allTabItems[0].value : '');

  const [activeTab, setActiveTab] = useState(initialActiveTab);

  useEffect(() => {
    if (defaultActiveTab !== undefined) {
      setActiveTab(defaultActiveTab);
    } else if (allTabItems.length > 0) {
      const firstTabValue = allTabItems[0].value;
      setActiveTab((prev) => (prev === '' ? firstTabValue : prev));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultActiveTab]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

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

  processChildren(children);

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
      >
        {otherChildren.length > 0 ? (
          <>
            {otherChildren}
            {contents}
          </>
        ) : (
          <>
            <TabItemGroupList $direction={direction} $variant={resolvedVariant}>
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
