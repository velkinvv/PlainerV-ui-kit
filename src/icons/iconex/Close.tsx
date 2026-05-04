import React from 'react';
import { useTheme } from 'styled-components';
import type { IconComponentProps } from '../../types/icon';

export const IconExClose: React.FC<IconComponentProps> = ({
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
      {/* Крестик на почти весь viewBox — иначе без «рамки» линии выглядели крошечными при любом IconSize */}
      <path
        d="M6 18L18 6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 6L18 18"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconExClose;
