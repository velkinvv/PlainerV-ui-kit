import type { IconComponentProps } from '../../types/icon';
import React from 'react';
import { useTheme } from 'styled-components';

export const IconExDots: React.FC<IconComponentProps> = ({
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
      <circle cx="6.5" cy="12" r="1.25" fill={color} />
      <circle cx="12" cy="12" r="1.25" fill={color} />
      <circle cx="17.5" cy="12" r="1.25" fill={color} />
    </svg>
  );
};

export default IconExDots;
