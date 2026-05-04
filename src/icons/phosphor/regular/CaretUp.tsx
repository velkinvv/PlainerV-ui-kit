import type { IconComponentProps } from '../../../types/icon';
import React from 'react';
import { useTheme } from 'styled-components';

/** Контурный шеврон вверх (сортировка в шапке таблицы, макет Figma). */
export const PhosphorCaretUp: React.FC<IconComponentProps> = ({
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
        d="M7 14L12 9L17 14"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};

export default PhosphorCaretUp;
