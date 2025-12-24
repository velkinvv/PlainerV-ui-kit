import type { IconComponentProps } from '../../types/icon';
import React from 'react';
import { useTheme } from 'styled-components';

export const IconExLink: React.FC<IconComponentProps> = ({
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
        d="M16.4142 13.728L18.5355 11.6067C20.4882 9.65404 20.4882 6.48822 18.5355 4.53559V4.53559C16.5829 2.58297 13.4171 2.58297 11.4645 4.53559L9.34315 6.65692M13.5858 16.5564L11.4645 18.6777C9.51184 20.6304 6.34602 20.6304 4.3934 18.6777V18.6777C2.44078 16.7251 2.44078 13.5593 4.3934 11.6067L6.51472 9.48534"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M13.5858 9.48533L9.34314 13.728"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconExLink;
