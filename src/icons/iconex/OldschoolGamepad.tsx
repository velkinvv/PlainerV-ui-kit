import type { IconComponentProps } from '../../types/icon';
import React from 'react';
import { useTheme } from 'styled-components';

export const IconExOldSchoolGamepad: React.FC<IconComponentProps> = ({
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
      {...props}
    >
      <rect x="2" y="8" width="20" height="14" rx="5" stroke={color} strokeWidth="1.5" />
      <path
        d="M12 7.5V7C12 6.17157 11.3284 5.5 10.5 5.5V5.5C9.67157 5.5 9 4.82843 9 4V3"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="18" cy="13.5" r="1" fill="#262626" />
      <circle cx="16" cy="16.5" r="1" fill="#262626" />
      <path
        d="M8 17L8 13"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 15H10"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconExOldSchoolGamepad;
