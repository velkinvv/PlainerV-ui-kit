import type { IconComponentProps } from '../../../types/icon';
import React from 'react';
import { useTheme } from 'styled-components';

export const PhosphorRecycle: React.FC<IconComponentProps> = ({
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
        d="M11.25 16.5L13.6 6.3L2.76 9.38L11.25 12.62L1.51 9.37L7.71 1.5L10.46 9.38"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};

export default PhosphorRecycle;
