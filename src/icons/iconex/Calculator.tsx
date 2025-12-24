import React from 'react';
import { useTheme } from 'styled-components';
import type { IconComponentProps } from '../../types/icon';

export const IconExCalculator: React.FC<IconComponentProps> = ({
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
      <rect x="4" y="2" width="16" height="20" rx="4" stroke={color} strokeWidth="1.5" />
      <rect x="8" y="6" width="8" height="3" rx="1" stroke={color} strokeWidth="1.5" />
      <path d="M9 18H8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 14H8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15 18H16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15 14L16 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

export default IconExCalculator;
