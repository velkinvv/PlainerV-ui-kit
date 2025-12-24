import type { IconComponentProps } from '../../types/icon';
import React from 'react';
import { useTheme } from 'styled-components';

export const IconExTimeCircle: React.FC<IconComponentProps> = ({
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
        d="M12 8V11.7324C12 11.8996 12.0836 12.0557 12.2226 12.1484L15 14"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default IconExTimeCircle;
