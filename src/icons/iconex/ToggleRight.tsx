import type { IconComponentProps } from '../../types/icon';
import React from 'react';
import { useTheme } from 'styled-components';

export const IconExToggleRight: React.FC<IconComponentProps> = ({
  width = 24,
  height = 24,
  color: IconColor,
  className,
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
      className={className}
      {...props}
    >
      <rect x="3" y="7" width="18" height="10" rx="5" stroke={color} strokeWidth="1.5" />
      <circle cx="16" cy="12" r="2.5" stroke={color} strokeWidth="1.5" />
    </svg>
  );
};

export default IconExToggleRight;
