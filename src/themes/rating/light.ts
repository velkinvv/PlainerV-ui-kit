import type { RatingTheme } from '../../types/theme';
import { Size } from '../../types/sizes';
import { danger } from '../../variables/colors/danger';
import { warning } from '../../variables/colors/warning';
import { success } from '../../variables/colors/success';
import { neutral } from '../../variables/colors/neutral';

/**
 * Светлая тема Rating.
 */
export const lightRatingTheme: RatingTheme = {
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
    empty: neutral[300],
    filled: warning[500],
    hover: warning[400],
    disabled: neutral[400],
    track: neutral[200],
    label: neutral[700],
  },
  trafficStops: [danger[500], warning[500], success[500]],
};
