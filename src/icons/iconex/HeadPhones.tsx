import type { IconComponentProps } from '../../types/icon';
import React from 'react';
import { useTheme } from 'styled-components';

export const IconExHeadPhones: React.FC<IconComponentProps> = ({
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
        d="M21 19V12C21 7.02944 16.9706 3 12 3V3C7.02944 3 3 7.02944 3 12V19"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M16 15C16 13.8954 16.8954 13 18 13H19C20.1046 13 21 13.8954 21 15V19C21 20.1046 20.1046 21 19 21H18C16.8954 21 16 20.1046 16 19V15Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M8 15C8 13.8954 7.10457 13 6 13H5C3.89543 13 3 13.8954 3 15V19C3 20.1046 3.89543 21 5 21H6C7.10457 21 8 20.1046 8 19V15Z"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default IconExHeadPhones;
