import React from 'react';
import { useTheme } from 'styled-components';
import type { IconComponentProps } from '../../types/icon';

export const IconExCalling: React.FC<IconComponentProps> = ({
  width = 24,
  height = 24,
  color: IconColor,
  ...props
}) => {
  const theme = useTheme();
  const color = IconColor || theme.colors.text;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19.0621 20.9693C17.1077 22.9236 12.1028 21.0873 7.88327 16.8677C3.66372 12.6482 1.82739 7.64325 3.7817 5.68893L5.06847 4.40216C5.9568 3.51383 7.42054 3.53731 8.33784 4.45461L10.3309 6.4477C11.2482 7.36499 11.2717 8.82874 10.3834 9.71706L10.107 9.99345C9.62737 10.4731 9.58045 11.2468 10.0261 11.7868C10.456 12.3078 10.9194 12.8266 11.4219 13.3291C11.9244 13.8316 12.4432 14.295 12.9641 14.7249C13.5042 15.1705 14.2779 15.1236 14.7575 14.644L15.0339 14.3676C15.9222 13.4793 17.386 13.5028 18.3033 14.4201L20.2964 16.4131C21.2137 17.3304 21.2371 18.7942 20.3488 19.6825L19.0621 20.9693Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M17.6264 9.75077C17.3825 9.15559 17.0188 8.59796 16.5356 8.11469C16.0796 7.65871 15.5574 7.30924 14.9999 7.06628"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M15 3.66335C16.3347 4.14685 17.5869 4.92359 18.6569 5.99358C19.7537 7.09043 20.5424 8.37877 21.023 9.75107"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default IconExCalling;
