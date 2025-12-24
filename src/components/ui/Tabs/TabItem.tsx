import React, { useState, useContext, createContext, useEffect } from 'react';
import styled from 'styled-components';
import { clsx } from 'clsx';
import { TabItemTrigger, TabItemContent } from './TabItem.style';
import {
  TabsDirection,
  TabsVerticalPosition,
  TabItemTextPosition as TabItemTextPositionEnum,
  type TabItemTextOrientation,
  type TabItemTextPosition,
} from '../../../types/ui';

// Контекст для группы TabItem (опциональный)
interface TabItemGroupContextType {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  direction: TabsDirection;
  tabsPosition?: TabsVerticalPosition;
}

export const TabItemGroupContext = createContext<TabItemGroupContextType | undefined>(undefined);

const useTabItemGroupContext = () => {
  return useContext(TabItemGroupContext);
};

// Стилизованные компоненты для группы TabItem
export const TabItemGroupContainer = styled.div<{
  $direction: TabsDirection;
  $tabsPosition?: TabsVerticalPosition;
}>`
  display: flex;
  flex-direction: ${({ $direction, $tabsPosition }) => {
    if ($direction === TabsDirection.VERTICAL) {
      // В вертикальном режиме: START (по умолчанию) = row, END = row-reverse
      return $tabsPosition === TabsVerticalPosition.END ? 'row-reverse' : 'row';
    }
    return 'column';
  }};
`;

export const TabItemGroupList = styled.div<{
  $direction: TabsDirection;
}>`
  display: flex;
  flex-direction: ${({ $direction }) => ($direction === TabsDirection.VERTICAL ? 'column' : 'row')};
  border-bottom: ${({ $direction, theme }) =>
    $direction === TabsDirection.VERTICAL ? 'none' : `1px solid ${theme.colors.borderSecondary}`};
  border-right: ${({ $direction, theme }) =>
    $direction === TabsDirection.VERTICAL ? `1px solid ${theme.colors.borderSecondary}` : 'none'};
  background: ${({ theme }) => theme.colors.backgroundSecondary};

  /* В горизонтальном режиме список триггеров должен занимать всю ширину */
  ${({ $direction }) =>
    $direction === TabsDirection.HORIZONTAL
      ? `
    width: 100%;
  `
      : ''}
`;

/**
 * Пропсы компонента TabItem
 * @property value - Уникальное значение вкладки (обязательно)
 * @property label - Текст для кнопки вкладки
 * @property children - Содержимое вкладки
 * @property iconStart - Иконка в начале (слева для горизонтального текста, сверху для вертикального)
 * @property iconEnd - Иконка в конце (справа для горизонтального текста, снизу для вертикального)
 * @property textOrientation - Ориентация текста (horizontal/vertical)
 * @property textPosition - Позиция текста в вертикальном режиме текста (left/right)
 * @property defaultActive - Активна ли вкладка по умолчанию (для одиночного TabItem)
 * @property active - Контролируемое состояние активности (для одиночного TabItem)
 * @property onChange - Обработчик изменения активности (для одиночного TabItem)
 * @property direction - Направление табов (для группы TabItem)
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
  textOrientation?: TabItemTextOrientation;
  textPosition?: TabItemTextPosition;
  // Для одиночного TabItem
  defaultActive?: boolean;
  active?: boolean;
  onChange?: (active: boolean) => void;
  // Для группы TabItem
  direction?: TabsDirection;
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
  textOrientation,
  textPosition,
  defaultActive = false,
  active: controlledActive,
  onChange,
  direction: groupDirection,
  triggerClassName,
  contentClassName,
  triggerProps,
  contentProps,
}) => {
  // Проверяем, есть ли контекст группы
  const groupContext = useTabItemGroupContext();

  // Для одиночного компонента используем локальное состояние (всегда вызываем хуки)
  const [internalActive, setInternalActive] = useState(defaultActive);
  const isControlled = controlledActive !== undefined;

  // Если есть контекст группы, используем его
  if (groupContext) {
    const { activeTab, setActiveTab, direction } = groupContext;
    const isActive = activeTab === value;

    // По умолчанию для вертикального текста используется правая позиция
    const finalTextPosition =
      textOrientation === 'vertical' && !textPosition
        ? TabItemTextPositionEnum.RIGHT
        : textPosition;

    // Обёртка для текста при вертикальной ориентации с правой позицией
    const shouldWrapText =
      textOrientation === 'vertical' && finalTextPosition === TabItemTextPositionEnum.RIGHT;

    // Определяем направление для иконок в зависимости от ориентации текста
    const isVertical = textOrientation === 'vertical';
    const flexDirection = isVertical ? 'column' : 'row';
    const gap = isVertical ? '4px' : '8px';

    const content = (
      <>
        {iconStart && (
          <span style={{ display: 'inline-flex', alignItems: 'center' }}>{iconStart}</span>
        )}
        {label && <span>{label}</span>}
        {iconEnd && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{iconEnd}</span>}
      </>
    );

    // В группе рендерим только триггер, контент будет рендериться отдельно
    return (
      <TabItemTrigger
        className={clsx('ui-tab-item-trigger', triggerClassName)}
        $isActive={isActive}
        $direction={direction}
        $textOrientation={textOrientation}
        $textPosition={finalTextPosition}
        $hasIcons={!!(iconStart || iconEnd)}
        $flexDirection={flexDirection}
        $gap={gap}
        onClick={() => setActiveTab(value)}
        {...triggerProps}
      >
        {shouldWrapText ? (
          <span style={{ transform: 'rotate(180deg)', display: 'inline-block' }}>{content}</span>
        ) : (
          content
        )}
      </TabItemTrigger>
    );
  }

  // Иначе работаем как одиночный компонент
  const isActive = isControlled ? controlledActive : internalActive;

  const handleClick = () => {
    const newActive = !isActive;
    if (!isControlled) {
      setInternalActive(newActive);
    }
    onChange?.(newActive);
  };

  // По умолчанию для вертикального текста используется правая позиция
  const finalTextPosition =
    textOrientation === 'vertical' && !textPosition ? TabItemTextPositionEnum.RIGHT : textPosition;

  // Обёртка для текста при вертикальной ориентации с правой позицией
  const shouldWrapText =
    textOrientation === 'vertical' && finalTextPosition === TabItemTextPositionEnum.RIGHT;

  // Определяем направление для иконок в зависимости от ориентации текста
  const isVertical = textOrientation === 'vertical';
  const flexDirection = isVertical ? 'column' : 'row';
  const gap = isVertical ? '4px' : '8px';

  // Используем направление из пропса или по умолчанию горизонтальное
  const direction = groupDirection || TabsDirection.HORIZONTAL;

  const content = (
    <>
      {iconStart && (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>{iconStart}</span>
      )}
      {label && <span>{label}</span>}
      {iconEnd && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{iconEnd}</span>}
    </>
  );

  return (
    <>
      <TabItemTrigger
        className={clsx('ui-tab-item-trigger', triggerClassName)}
        $isActive={isActive}
        $direction={direction}
        $textOrientation={textOrientation}
        $textPosition={finalTextPosition}
        $hasIcons={!!(iconStart || iconEnd)}
        $flexDirection={flexDirection}
        $gap={gap}
        onClick={handleClick}
        {...triggerProps}
      >
        {shouldWrapText ? (
          <span style={{ transform: 'rotate(180deg)', display: 'inline-block' }}>{content}</span>
        ) : (
          content
        )}
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
}

// Компонент группы TabItem
export const TabItemGroup: React.FC<TabItemGroupProps> = ({
  children,
  direction = TabsDirection.HORIZONTAL,
  defaultActiveTab,
  onChange,
  className,
  tabsPosition = TabsVerticalPosition.START,
  ...props
}) => {
  // Собираем все TabItem для определения первого активного
  const allTabItems: Array<{ value: string; children: React.ReactNode }> = [];

  const collectTabItems = (node: React.ReactNode): void => {
    React.Children.forEach(node, child => {
      if (React.isValidElement(child)) {
        // Проверяем, является ли это TabItem
        if (child.type === TabItem) {
          const tabItem = child as React.ReactElement<TabItemProps>;
          allTabItems.push({
            value: tabItem.props.value,
            children: tabItem.props.children,
          });
        } else if (child.props && child.props.children) {
          // Рекурсивно обрабатываем вложенные элементы (например, Tabs.List)
          collectTabItems(child.props.children);
        }
      }
    });
  };

  collectTabItems(children);

  // Устанавливаем первый TabItem как активный по умолчанию, если defaultActiveTab не задан
  const initialActiveTab = defaultActiveTab || (allTabItems.length > 0 ? allTabItems[0].value : '');

  const [activeTab, setActiveTab] = useState(initialActiveTab);

  // Синхронизируем activeTab с defaultActiveTab, если он изменился
  useEffect(() => {
    if (defaultActiveTab !== undefined) {
      setActiveTab(defaultActiveTab);
    } else if (allTabItems.length > 0) {
      const firstTabValue = allTabItems[0].value;
      setActiveTab(prev => (prev === '' ? firstTabValue : prev));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultActiveTab]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  // Собираем все TabItem и разделяем триггеры и контент
  const triggers: React.ReactNode[] = [];
  const contents: React.ReactNode[] = [];
  const otherChildren: React.ReactNode[] = [];

  const processChildren = (node: React.ReactNode): void => {
    React.Children.forEach(node, child => {
      if (React.isValidElement(child)) {
        // Если это TabItem
        if (child.type === TabItem) {
          const tabItem = child as React.ReactElement<TabItemProps>;
          const value = tabItem.props.value;
          const isActive = activeTab === value;

          // Триггер
          triggers.push(
            React.cloneElement(tabItem, {
              key: `trigger-${value}`,
              // Убираем children из триггера
              children: undefined,
            } as Partial<TabItemProps>),
          );

          // Контент
          contents.push(
            <TabItemContent
              key={`content-${value}`}
              className={clsx('ui-tab-item-content', tabItem.props.contentClassName)}
              $isActive={isActive}
              $direction={direction}
              {...tabItem.props.contentProps}
            >
              {tabItem.props.children}
            </TabItemContent>,
          );
        } else if (child.type === TabItemGroupList) {
          // Если это TabItemGroupList, обрабатываем его children
          const listChildren: React.ReactNode[] = [];
          React.Children.forEach(child.props.children, listChild => {
            if (React.isValidElement(listChild) && listChild.type === TabItem) {
              const tabItem = listChild as React.ReactElement<TabItemProps>;
              const value = tabItem.props.value;
              const isActive = activeTab === value;

              // Триггер
              triggers.push(
                React.cloneElement(tabItem, {
                  key: `trigger-${value}`,
                  children: undefined,
                } as Partial<TabItemProps>),
              );

              // Контент
              contents.push(
                <TabItemContent
                  key={`content-${value}`}
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
                  key: `trigger-${value}`,
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
              children: listChildren,
            }),
          );
        } else if (child.props && child.props.children) {
          // Для других компонентов с children рекурсивно обрабатываем
          processChildren(child.props.children);
        } else {
          // Если это не TabItem и не компонент с children, добавляем как есть
          otherChildren.push(child);
        }
      }
    });
  };

  processChildren(children);

  return (
    <TabItemGroupContext.Provider
      value={{ activeTab, setActiveTab: handleTabChange, direction, tabsPosition }}
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
            <TabItemGroupList $direction={direction}>{triggers}</TabItemGroupList>
            {contents}
          </>
        )}
      </TabItemGroupContainer>
    </TabItemGroupContext.Provider>
  );
};

TabItem.Group = TabItemGroup;
