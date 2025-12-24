import type { IconComponentProps } from '../../types/icon';
import React from 'react';
import { useTheme } from 'styled-components';

export const IconExTimer: React.FC<IconComponentProps> = ({
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
      <circle cx="12" cy="14" r="9" stroke={color} strokeWidth="1.5" />
      <path d="M10 2H14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 2L12 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 14L15 11" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18.5 7L19 6.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

export default IconExTimer;
