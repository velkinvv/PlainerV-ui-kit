import React from 'react';
import type { IconComponentProps } from '../../types/icon';

export const IconPlainerCalendar: React.FC<IconComponentProps> = ({
  width = 24,
  height = 24,
  color = 'currentColor',
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8 2V5M16 2V5M3 7H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M7 10H9V12H7V10Z" fill={color} />
      <path d="M11 10H13V12H11V10Z" fill={color} />
      <path d="M15 10H17V12H15V10Z" fill={color} />
      <path d="M7 14H9V16H7V14Z" fill={color} />
      <path d="M11 14H13V16H11V14Z" fill={color} />
      <path d="M15 14H17V16H15V14Z" fill={color} />
    </svg>
  );
};
