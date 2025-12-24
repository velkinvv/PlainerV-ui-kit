import React from 'react';
import { useTheme } from 'styled-components';
import type { IconComponentProps } from '../../types/icon';

export const IconExCategory: React.FC<IconComponentProps> = ({
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
      <rect x="4" y="4" width="7" height="7" rx="2.5" stroke={color} strokeWidth="1.5" />
      <rect x="4" y="14" width="7" height="7" rx="2.5" stroke={color} strokeWidth="1.5" />
      <rect x="14" y="4" width="7" height="7" rx="2.5" stroke={color} strokeWidth="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="2.5" stroke={color} strokeWidth="1.5" />
    </svg>
  );
};

export default IconExCategory;
