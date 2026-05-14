import { createContext, useContext } from 'react';
import type { TabsDirection, TabsVerticalPosition, TabsVariant } from '@/types/ui';

/** Контекст группы TabItem / Tabs: активная вкладка и параметры трека */
export interface TabItemGroupContextType {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  direction: TabsDirection;
  tabsPosition?: TabsVerticalPosition;
  variant: TabsVariant;
}

export const TabItemGroupContext = createContext<TabItemGroupContextType | undefined>(undefined);

export function useTabItemGroupContext(): TabItemGroupContextType | undefined {
  return useContext(TabItemGroupContext);
}
