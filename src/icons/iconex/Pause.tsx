import type { IconComponentProps } from '../../types/icon';
import React from 'react';
import { useTheme } from 'styled-components';

export const IconExPause: React.FC<IconComponentProps> = ({
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
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
      <path d="M10.3 9.5L10.3 14.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13.8 9.5L13.8 14.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

export default IconExPause;
