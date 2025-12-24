import type { IconComponentProps } from '../../types/icon';
import React from 'react';
import { useTheme } from 'styled-components';

export const IconExDocument: React.FC<IconComponentProps> = ({
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
      <rect x="4" y="2" width="16" height="20" rx="4" stroke={color} strokeWidth="1.5" />
      <path d="M8 7H16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 12H16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 17H12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

export default IconExDocument;
