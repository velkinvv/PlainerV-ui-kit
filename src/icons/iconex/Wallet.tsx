import type { IconComponentProps } from '../../types/icon';
import React from 'react';
import { useTheme } from 'styled-components';

export const IconExWallet: React.FC<IconComponentProps> = ({
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
      <rect x="2" y="6" width="20" height="16" rx="5" stroke={color} strokeWidth="1.5" />
      <path
        d="M19 6.5V6.5C19 4.17692 16.8678 2.43898 14.5924 2.90744L5.99174 4.67817C3.66769 5.15665 2 7.20267 2 9.57546L2 13"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M6 17.5H12"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 14C15 12.6193 16.1193 11.5 17.5 11.5H22V16.5H17.5C16.1193 16.5 15 15.3807 15 14V14Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M17.5 14H17.7"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconExWallet;
