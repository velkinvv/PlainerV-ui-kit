import type { IconComponentProps } from '../../types/icon';
import React from 'react';
import { useTheme } from 'styled-components';

export const IconExScale: React.FC<IconComponentProps> = ({
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
      <path
        d="M19.2976 7.40453V17.095M17.0952 5.20215H7.40477M17.0952 19.2974H7.40477M5.20239 7.40453V17.095"
        stroke={color}
        strokeWidth="1.5"
      />
      <circle cx="19.2976" cy="5.20238" r="2.20238" stroke={color} strokeWidth="1.5" />
      <circle cx="5.20238" cy="5.20238" r="2.20238" stroke={color} strokeWidth="1.5" />
      <circle cx="19.2976" cy="19.2976" r="2.20238" stroke={color} strokeWidth="1.5" />
      <circle cx="5.20238" cy="19.2976" r="2.20238" stroke={color} strokeWidth="1.5" />
    </svg>
  );
};

export default IconExScale;
