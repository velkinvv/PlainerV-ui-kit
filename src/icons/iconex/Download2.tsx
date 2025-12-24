import type { IconComponentProps } from '../../types/icon';
import React from 'react';
import { useTheme } from 'styled-components';

export const IconExDownload2: React.FC<IconComponentProps> = ({
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
        d="M9 8L7 8C4.79086 8 3 9.79086 3 12L3 17C3 19.2091 4.79086 21 7 21L19 21C21.2091 21 23 19.2091 23 17L23 12C23 9.79086 21.2091 8 19 8L17 8"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M10 13L12.2929 15.2929C12.6834 15.6834 13.3166 15.6834 13.7071 15.2929L16 13"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M13 15L13 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

export default IconExDownload2;
