import React from 'react';
import { clsx } from 'clsx';
import { TabsDirection, TabsVerticalPosition, type TabsProps } from '../../../types/ui';
import { TabItem, TabItemGroup, TabItemGroupContainer } from './TabItem';

/** Обратная совместимость: контейнер группы вкладок */
export const TabsContainer = TabItemGroupContainer;

/**
 * Вкладки и сегменты: дочерние **TabItem** / **Tabs.Item** или проп **items** (**TabsItemDefinition[]**) — список попадает во внутренний трек (**TabItemGroupList**).
 * Отдельная обёртка списка не нужна; атрибуты трека — **segmentTrackProps**.
 *
 * @param props.segmentTrackProps — **className**, **style** и др. для трека (добавляется **ui-tabs-list**)
 * @param props.items — при непустом массиве вкладки строятся из данных (приоритет над **children** для списка)
 * @param props.filledSegmentTriggers — у **minimal** / **line** / **underline**: заливка сегментов и фон трека (**filled**)
 */
export const Tabs: React.FC<TabsProps> & {
  Item: typeof TabItem;
} = ({
  children,
  className,
  defaultActiveTab,
  defaultValue,
  value,
  onChange,
  direction = TabsDirection.HORIZONTAL,
  tabsPosition = TabsVerticalPosition.START,
  variant,
  ariaLabel,
  segmentTrackProps,
  items,
  filledSegmentTriggers,
}) => {
  return (
    <TabItemGroup
      defaultActiveTab={defaultActiveTab}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      direction={direction}
      tabsPosition={tabsPosition}
      variant={variant}
      ariaLabel={ariaLabel}
      segmentTrackProps={segmentTrackProps}
      items={items}
      filledSegmentTriggers={filledSegmentTriggers}
      className={clsx('ui-tabs', className)}
    >
      {children}
    </TabItemGroup>
  );
};

Tabs.Item = TabItem;
