import type { IconComponentProps } from '../../types/icon';
import React from 'react';
import { useTheme } from 'styled-components';

export const IconExPlay: React.FC<IconComponentProps> = ({
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
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
      <path
        d="M10 10.0554C10 9.1768 10.9792 8.65277 11.7102 9.14011L14.6271 11.0847C15.2802 11.5201 15.2802 12.4799 14.6271 12.9153L11.7102 14.8599C10.9792 15.3472 10 14.8232 10 13.9446V10.0554Z"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default IconExPlay;
