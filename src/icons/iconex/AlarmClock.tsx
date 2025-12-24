import React from 'react';
import { useTheme } from 'styled-components';
import type { IconComponentProps } from '../../types/icon';

export const IconExAlarmClock: React.FC<IconComponentProps> = ({
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
      <circle cx="12" cy="13" r="9" stroke={color} strokeWidth="1.5" />
      <path
        d="M12 9V12.7324C12 12.8996 12.0836 13.0557 12.2226 13.1484L15 15"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M17 2L21 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 2L12 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17 21L18 23" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 21L6 23" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 2L3 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};
