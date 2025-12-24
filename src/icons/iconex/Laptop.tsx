import type { IconComponentProps } from '../../types/icon';
import React from 'react';
import { useTheme } from 'styled-components';

export const IconExLaptop: React.FC<IconComponentProps> = ({
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
      <rect x="2" y="17" width="20" height="3" rx="1" stroke={color} strokeWidth="1.5" />
      <rect x="3" y="5" width="18" height="12" rx="1" stroke={color} strokeWidth="1.5" />
      <path d="M14 5.5L10 5.5" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
};

export default IconExLaptop;
