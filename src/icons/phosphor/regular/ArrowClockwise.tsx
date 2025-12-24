import type { IconComponentProps } from '../../../types/icon';
import React from 'react';
import { useTheme } from 'styled-components';

export const PhosphorArrowClockwise: React.FC<IconComponentProps> = ({
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
        d="M21.77 4.1C21.77 4.1 21.77 3 21.77 3C21.77 3 3.77 3 3.77 3"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M15.77 10.1C15.77 10.1 15.77 4.1 15.77 4.1C15.77 4.1 15.77 10.1 15.77 10.1"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};

export default PhosphorArrowClockwise;
