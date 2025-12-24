import type { IconComponentProps } from '../../types/icon';
import React from 'react';
import { useTheme } from 'styled-components';

export const IconExLogout: React.FC<IconComponentProps> = ({
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
        d="M16 16V18C16 20.2091 14.2091 22 12 22H7C4.79086 22 3 20.2091 3 18V6C3 3.79086 4.79086 2 7 2H12C14.2091 2 16 3.79086 16 6V8"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M19 15L21.2929 12.7071C21.6834 12.3166 21.6834 11.6834 21.2929 11.2929L19 9"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M21 12L9 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

export default IconExLogout;
