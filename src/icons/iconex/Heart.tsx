import React from 'react';
import { useTheme } from 'styled-components';
import type { IconComponentProps } from '../../types/icon';

export const IconExHeart: React.FC<IconComponentProps> = ({
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
        d="M6.16393 13.1494L9.82377 17.0065C11.0068 18.2532 12.9932 18.2532 14.1762 17.0065L17.8361 13.1494C19.388 11.5139 19.388 8.86218 17.8361 7.22665C16.2842 5.59112 13.768 5.59112 12.2162 7.22665V7.22665C12.0987 7.35048 11.9013 7.35048 11.7838 7.22665V7.22665C10.2319 5.59112 7.71582 5.59112 6.16392 7.22665C4.61202 8.86218 4.61203 11.5139 6.16393 13.1494Z"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default IconExHeart;
