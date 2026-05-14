import React, { forwardRef, useContext, useMemo } from 'react';
import { TabItemGroupListRoot, PillSegmentThumb } from './TabItem.style';
import { TabItemGroupContext } from './TabItemGroupContext';
import { TabsVariant } from '@/types/ui';
import { PillSegmentRegistrationContext } from './pillSegmentTrack/PillSegmentRegistrationContext';
import { usePillSegmentMetrics } from './pillSegmentTrack/usePillSegmentMetrics';
import { mergeRefs } from '@/handlers/assignRefs';

type TabItemGroupListProps = React.ComponentProps<typeof TabItemGroupListRoot>;

/**
 * Список триггеров вкладок / сегментов: для **pill** подставляет анимированную «каплю» под активным значением.
 *
 * @param props.$direction — горизонтальный или вертикальный ряд
 * @param props.$variant — **pill**, **line** или **underline** (без «капли»; для **pill** нужны зарегистрированные ref сегментов)
 */
export const TabItemGroupList = forwardRef<HTMLDivElement, TabItemGroupListProps>(
  function TabItemGroupList(props, forwardedReference) {
    const { children, ...restProps } = props;
    const tabItemGroupContextValue = useContext(TabItemGroupContext);

    const activeSegmentValue = tabItemGroupContextValue?.activeTab ?? '';

    const isPillVariant = props.$variant === TabsVariant.PILL;

    const { metrics, setTrackRootElement, registerSegmentTriggerRef } = usePillSegmentMetrics({
      enabled: isPillVariant,
      activeSegmentValue,
    });

    const pillRegistrationContextValue = useMemo(
      () => ({
        registerSegmentTriggerRef,
      }),
      [registerSegmentTriggerRef],
    );

    const combinedRootReference = useMemo(
      () => mergeRefs(forwardedReference, setTrackRootElement),
      [forwardedReference, setTrackRootElement],
    );

    return (
      <PillSegmentRegistrationContext.Provider value={pillRegistrationContextValue}>
        <TabItemGroupListRoot ref={combinedRootReference} {...restProps}>
          {isPillVariant ? <PillSegmentThumb $metrics={metrics} aria-hidden /> : null}
          {children}
        </TabItemGroupListRoot>
      </PillSegmentRegistrationContext.Provider>
    );
  },
);

TabItemGroupList.displayName = 'TabItemGroupList';
