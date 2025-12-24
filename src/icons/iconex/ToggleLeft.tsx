import type { IconComponentProps } from '../../types/icon';
import React from 'react';
import { useTheme } from 'styled-components';

export const IconExToggleLeft: React.FC<IconComponentProps> = ({
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
      <rect
        width="18"
        height="10"
        rx="5"
        transform="matrix(-1 0 0 1 21 7)"
        stroke={color}
        strokeWidth="1.5"
      />
      <circle r="2.5" transform="matrix(-1 0 0 1 8 12)" stroke={color} strokeWidth="1.5" />
    </svg>
  );
};

export default IconExToggleLeft;
