import React from 'react';
import { useTheme } from 'styled-components';
import type { IconComponentProps } from '../../types/icon';

export const IconExCategory2: React.FC<IconComponentProps> = ({
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
      <rect x="4" y="4" width="7" height="4" rx="2" stroke={color} strokeWidth="1.5" />
      <rect x="4" y="11" width="7" height="10" rx="2.5" stroke={color} strokeWidth="1.5" />
      <rect x="14" y="4" width="7" height="10" rx="2.5" stroke={color} strokeWidth="1.5" />
      <rect x="14" y="17" width="7" height="4" rx="2" stroke={color} strokeWidth="1.5" />
    </svg>
  );
};

export default IconExCategory2;
