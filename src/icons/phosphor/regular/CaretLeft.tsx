import type { IconComponentProps } from '../../../types/icon';
import React from 'react';
import { useTheme } from 'styled-components';

/** Контурный шеврон влево (пагинация «назад», макет Figma). */
export const PhosphorCaretLeft: React.FC<IconComponentProps> = ({
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
        d="M15 6L9 12L15 18"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};

export default PhosphorCaretLeft;
