import React from 'react';
import { useTheme } from 'styled-components';
import type { IconComponentProps } from '../../types/icon';

export const IconExBasketBall: React.FC<IconComponentProps> = ({
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
      <rect x="2" y="2" width="20" height="20" rx="10" stroke={color} strokeWidth="1.5" />
      <path
        d="M19 4.8584C17.1486 6.67332 16 9.20244 16 11.9998C16 14.7972 17.1486 17.3263 19 19.1413"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M5 5C6.85136 6.77898 8 9.25801 8 12C8 14.742 6.85136 17.221 5 19"
        stroke={color}
        strokeWidth="1.5"
      />
      <path d="M12 2V22" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M22 12L2 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

export default IconExBasketBall;
