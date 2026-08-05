import type { RatingTheme } from '../../types/theme';
import { Size } from '../../types/sizes';
import { danger } from '../../variables/colors/danger';
import { warning } from '../../variables/colors/warning';
import { success } from '../../variables/colors/success';
import { neutral } from '../../variables/colors/neutral';

/**
 * Тёмная тема Rating.
 */
export const darkRatingTheme: RatingTheme = {
  sizes: {
    [Size.XS]: {
      iconSize: '14px',
      barHeight: '4px',
      barWidth: '96px',
      dotSize: '6px',
      gap: '4px',
    },
    [Size.SM]: {
      iconSize: '16px',
      barHeight: '6px',
      barWidth: '120px',
      dotSize: '8px',
      gap: '6px',
    },
    [Size.MD]: {
      iconSize: '20px',
      barHeight: '8px',
      barWidth: '160px',
      dotSize: '10px',
      gap: '8px',
    },
    [Size.LG]: {
      iconSize: '24px',
      barHeight: '10px',
      barWidth: '200px',
      dotSize: '12px',
      gap: '10px',
    },
    [Size.XL]: {
      iconSize: '28px',
      barHeight: '12px',
      barWidth: '240px',
      dotSize: '14px',
      gap: '12px',
    },
  },
  colors: {
    empty: neutral[600],
    filled: warning[400],
    hover: warning[300],
    disabled: neutral[500],
    track: neutral[700],
    label: neutral[200],
  },
  trafficStops: [danger[400], warning[400], success[400]],
};
