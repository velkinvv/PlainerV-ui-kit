import type { IconComponentProps } from '../../types/icon';
import React from 'react';
import { useTheme } from 'styled-components';

export const IconExMicrophone: React.FC<IconComponentProps> = ({
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
      <rect x="8" y="2" width="8" height="13" rx="4" stroke={color} strokeWidth="1.5" />
      <path
        d="M20 11.5C20 15.9183 16.4183 19.5 12 19.5C7.58172 19.5 4 15.9183 4 11.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M12 22V20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

export default IconExMicrophone;
