import type { IconComponentProps } from '../../types/icon';
import React from 'react';
import { useTheme } from 'styled-components';

export const IconExIphone: React.FC<IconComponentProps> = ({
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
      <rect x="6" y="2" width="12" height="20" rx="3" stroke={color} strokeWidth="1.5" />
      <path d="M14 2.49994L10 2.49994" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
};

export default IconExIphone;
