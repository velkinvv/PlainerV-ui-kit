import React from 'react';
import type { IconComponentProps } from '../../types/icon';
import { useTheme } from 'styled-components';

/**
 * Шеврон вниз (только «V», без стержня) — триггеры выпадающих списков в календаре и др.
 */
export const IconPlainerChevronDown: React.FC<IconComponentProps> = ({
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
      aria-hidden
      {...props}
    >
      <path
        d="M7 10L12 15L17 10"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconPlainerChevronDown;
