import type { IconComponentProps } from '../../types/icon';
import React from 'react';
import { useTheme } from 'styled-components';

export const IconExMoreSquare: React.FC<IconComponentProps> = ({
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
      <rect x="2" y="2" width="20" height="20" rx="5" stroke={color} strokeWidth="1.5" />
      <circle cx="7.05005" cy="12.0498" r="1.25" fill={color} />
      <circle cx="12.05" cy="12.0498" r="1.25" fill={color} />
      <circle cx="17.05" cy="12.0498" r="1.25" fill={color} />
    </svg>
  );
};

export default IconExMoreSquare;
