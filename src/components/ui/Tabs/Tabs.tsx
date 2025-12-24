import React, { useContext } from 'react';
import { clsx } from 'clsx';
import { TabsDirection, TabsVerticalPosition, type TabsProps } from '../../../types/ui';
import {
  TabItemGroup,
  TabItemGroupContainer,
  TabItemGroupList,
  TabItemGroupContext,
} from './TabItem';

// Стилизованные компоненты (используются для обратной совместимости)
export const TabsContainer = TabItemGroupContainer;
export const TabsList = TabItemGroupList;

/**
 * Компонент Tabs - обёртка над TabItem.Group
 * Использует TabItem внутри для отображения вкладок
 */
export const Tabs: React.FC<TabsProps> & {
  List: React.FC<TabsListProps>;
} = ({
  children,
  className,
  defaultActiveTab,
  onChange,
  direction = TabsDirection.HORIZONTAL,
  tabsPosition = TabsVerticalPosition.START,
}) => {
  return (
    <TabItemGroup
      defaultActiveTab={defaultActiveTab}
      onChange={onChange}
      direction={direction}
      tabsPosition={tabsPosition}
      className={clsx('ui-tabs', className)}
    >
      {children}
    </TabItemGroup>
  );
};

// Интерфейс для подкомпонента List
interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

// Подкомпонент List - обёртка над TabItemGroupList
const TabsListComponent: React.FC<TabsListProps> = ({ children, className, ...props }) => {
  // Получаем direction из контекста TabItem.Group
  const groupContext = useContext(TabItemGroupContext);
  // Используем direction из контекста или по умолчанию HORIZONTAL
  const direction = groupContext?.direction || TabsDirection.HORIZONTAL;

  return (
    <TabItemGroupList className={clsx('ui-tabs-list', className)} $direction={direction} {...props}>
      {children}
    </TabItemGroupList>
  );
};

Tabs.List = TabsListComponent;
