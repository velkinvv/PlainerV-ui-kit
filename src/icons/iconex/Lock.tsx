import type { IconComponentProps } from '../../types/icon';
import React from 'react';
import { useTheme } from 'styled-components';

export const IconExLock: React.FC<IconComponentProps> = ({
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
      <rect x="4" y="9" width="16" height="12" rx="4" stroke={color} strokeWidth="1.5" />
      <path
        d="M12 16L12 14"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 9V7C16 4.79086 14.2091 3 12 3V3C9.79086 3 8 4.79086 8 7L8 9"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default IconExLock;
