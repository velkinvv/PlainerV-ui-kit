import type { IconComponentProps } from '../../types/icon';
import React from 'react';
import { useTheme } from 'styled-components';

export const IconExCart: React.FC<IconComponentProps> = ({
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
      <path
        d="M2 3L3.04936 3.20987C3.91136 3.38227 4.55973 4.09732 4.6472 4.97203L4.8 6.5M4.8 6.5L5.7886 14.7383C5.90922 15.7435 6.76195 16.5 7.77435 16.5H16.7673C18.3733 16.5 19.7733 15.407 20.1628 13.8489L21.2855 9.35783C21.6485 7.90619 20.5505 6.5 19.0542 6.5H4.8Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M13 13.5H9"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8.5" cy="20" r="1.5" fill={color} />
      <circle cx="17.5" cy="20" r="1.5" fill={color} />
    </svg>
  );
};

export default IconExCart;
