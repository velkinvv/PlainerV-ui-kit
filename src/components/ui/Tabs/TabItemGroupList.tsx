import React, { forwardRef, useContext, useMemo } from 'react';
import {
  TabItemGroupListRoot,
  PillSegmentThumb,
  LineUnderlineTrackIndicator,
  TabUnderlineBaselineTrackInner,
} from './TabItem.style';
import { TabItemGroupContext } from './TabItemGroupContext';
import { TabsVariant } from '@/types/ui';
import { isTabsTextSegmentVariant } from '@/handlers/tabsVariantHandlers';
import { PillSegmentRegistrationContext } from './pillSegmentTrack/PillSegmentRegistrationContext';
import { usePillSegmentMetrics } from './pillSegmentTrack/usePillSegmentMetrics';
import { mergeRefs } from '@/handlers/assignRefs';

type TabItemGroupListProps = React.ComponentProps<typeof TabItemGroupListRoot>;

/**
 * Список триггеров вкладок / сегментов: для **pill** — «капля», для текстовых вариантов — скользящая полоска активного сегмента.
 *
 * @param props.$direction — горизонтальный или вертикальный ряд
 * @param props.$variant — **pill**, **minimal**, **line**, **underline**
 * @param props.$filledSegmentTriggers — у текстовых вариантов: заливка сегментов и **2px** полоска на треке
 */
export const TabItemGroupList = forwardRef<HTMLDivElement, TabItemGroupListProps>(
  function TabItemGroupList(props, forwardedReference) {
    const {
      children,
      $direction,
      $variant,
      $filledSegmentTriggers,
      ...restDomProps
    } = props;
    const tabItemGroupContextValue = useContext(TabItemGroupContext);

    const activeSegmentValue = tabItemGroupContextValue?.activeTab ?? '';

    const variant = $variant;
    const usesAnimatedSegmentIndicator =
      variant === TabsVariant.PILL || isTabsTextSegmentVariant(variant);

    const { metrics, setTrackRootElement, registerSegmentTriggerRef } = usePillSegmentMetrics({
      enabled: usesAnimatedSegmentIndicator,
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

    const usesItemsWidthGrayBaseline = variant === TabsVariant.UNDERLINE;

    const trackChrome = (
      <>
        {variant === TabsVariant.PILL ? (
          <PillSegmentThumb $metrics={metrics} aria-hidden />
        ) : isTabsTextSegmentVariant(variant) ? (
          <LineUnderlineTrackIndicator
            $metrics={metrics}
            $direction={$direction}
            $thickIndicator={Boolean($filledSegmentTriggers)}
            aria-hidden
          />
        ) : null}
        {children}
      </>
    );

    return (
      <PillSegmentRegistrationContext.Provider value={pillRegistrationContextValue}>
        <TabItemGroupListRoot
          ref={combinedRootReference}
          $direction={$direction}
          $variant={$variant}
          $filledSegmentTriggers={$filledSegmentTriggers}
          {...restDomProps}
        >
          {usesItemsWidthGrayBaseline ? (
            <TabUnderlineBaselineTrackInner $direction={$direction}>
              {trackChrome}
            </TabUnderlineBaselineTrackInner>
          ) : (
            trackChrome
          )}
        </TabItemGroupListRoot>
      </PillSegmentRegistrationContext.Provider>
    );
  },
);

TabItemGroupList.displayName = 'TabItemGroupList';
