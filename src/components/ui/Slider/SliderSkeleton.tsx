import React from 'react';
import { Size } from '../../../types/sizes';
import { SliderRoot, SliderScaleRow, SliderValuesRow } from './Slider.style';
import {
  getSliderThumbSizePx,
  getSliderTrackMetrics,
  getSliderValueLabelRootPaddingHorizontalPx,
  sliderThumbLeftCalcCss,
} from './handlers';
import {
  SliderSkeletonPill,
  SliderSkeletonRailBar,
  SliderSkeletonThumbCircle,
  SliderSkeletonTrackSlot,
} from './SliderSkeleton.style';

export type SliderSkeletonSingleProps = {
  /** Размер бегунка / трека */
  size?: Size;
  fullWidth?: boolean;
  /** Плейсхолдер строки под значением */
  showValueLabel?: boolean;
};

/**
 * Скелетон одиночного слайдера: шкала, трек, бегунок, опционально подпись.
 */
export const SliderSkeletonSingle: React.FC<SliderSkeletonSingleProps> = ({
  size = Size.MD,
  fullWidth = true,
  showValueLabel = true,
}) => {
  const thumbPx = getSliderThumbSizePx(size);
  const track = getSliderTrackMetrics(size);
  const valuePad = showValueLabel ? getSliderValueLabelRootPaddingHorizontalPx(thumbPx) : 0;
  const fakePct = 38;

  return (
    <SliderRoot
      className="ui-slider ui-slider--skeleton"
      $fullWidth={fullWidth}
      $valueLabelPadPx={valuePad}
      aria-busy="true"
    >
      <SliderScaleRow aria-hidden>
        <SliderSkeletonPill $widthPx={40} $heightPx={12} />
        <SliderSkeletonPill $widthPx={40} $heightPx={12} />
      </SliderScaleRow>
      <SliderSkeletonTrackSlot $heightPx={track.trackWrapHeightPx}>
        <SliderSkeletonRailBar $heightPx={track.railHeightPx} />
        <SliderSkeletonThumbCircle
          $sizePx={thumbPx}
          style={{ left: sliderThumbLeftCalcCss(thumbPx, fakePct) }}
          aria-hidden
        />
      </SliderSkeletonTrackSlot>
      {showValueLabel ? (
        <SliderValuesRow aria-hidden>
          <SliderSkeletonPill
            $widthPx={56}
            $heightPx={14}
            style={{
              position: 'absolute',
              top: 0,
              left: sliderThumbLeftCalcCss(thumbPx, fakePct),
              transform: 'translateX(-50%)',
            }}
          />
        </SliderValuesRow>
      ) : null}
    </SliderRoot>
  );
};

SliderSkeletonSingle.displayName = 'SliderSkeletonSingle';

export type SliderSkeletonRangeProps = {
  size?: Size;
  fullWidth?: boolean;
  showValueLabel?: boolean;
};

/**
 * Скелетон range-слайдера: два бегунка и сегмент между ними (упрощённо одним шиммером на рельсе).
 */
export const SliderSkeletonRange: React.FC<SliderSkeletonRangeProps> = ({
  size = Size.MD,
  fullWidth = true,
  showValueLabel = true,
}) => {
  const thumbPx = getSliderThumbSizePx(size);
  const track = getSliderTrackMetrics(size);
  const valuePad = showValueLabel ? getSliderValueLabelRootPaddingHorizontalPx(thumbPx) : 0;
  const lowPct = 18;
  const highPct = 78;

  return (
    <SliderRoot
      className="ui-range-slider ui-range-slider--skeleton"
      $fullWidth={fullWidth}
      $valueLabelPadPx={valuePad}
      aria-busy="true"
    >
      <SliderScaleRow aria-hidden>
        <SliderSkeletonPill $widthPx={40} $heightPx={12} />
        <SliderSkeletonPill $widthPx={40} $heightPx={12} />
      </SliderScaleRow>
      <SliderSkeletonTrackSlot $heightPx={track.trackWrapHeightPx}>
        <SliderSkeletonRailBar $heightPx={track.railHeightPx} />
        <SliderSkeletonThumbCircle
          $sizePx={thumbPx}
          style={{ left: sliderThumbLeftCalcCss(thumbPx, lowPct) }}
          aria-hidden
        />
        <SliderSkeletonThumbCircle
          $sizePx={thumbPx}
          style={{ left: sliderThumbLeftCalcCss(thumbPx, highPct) }}
          aria-hidden
        />
      </SliderSkeletonTrackSlot>
      {showValueLabel ? (
        <SliderValuesRow aria-hidden>
          <SliderSkeletonPill
            $widthPx={48}
            $heightPx={14}
            style={{
              position: 'absolute',
              top: 0,
              left: sliderThumbLeftCalcCss(thumbPx, lowPct),
              transform: 'translateX(-50%)',
            }}
          />
          <SliderSkeletonPill
            $widthPx={48}
            $heightPx={14}
            style={{
              position: 'absolute',
              top: 0,
              left: sliderThumbLeftCalcCss(thumbPx, highPct),
              transform: 'translateX(-50%)',
            }}
          />
        </SliderValuesRow>
      ) : null}
    </SliderRoot>
  );
};

SliderSkeletonRange.displayName = 'SliderSkeletonRange';
