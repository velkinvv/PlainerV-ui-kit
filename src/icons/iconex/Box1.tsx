import React from 'react';
import { useTheme } from 'styled-components';
import type { IconComponentProps } from '../../types/icon';

export const IconExBox1: React.FC<IconComponentProps> = ({
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
      <rect x="2" y="2" width="20" height="20" rx="5" stroke={color} strokeWidth="1.5" />
      <path
        d="M10 17H14"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 2L9 9L12 8L15 9L15 2.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconExBox1;
