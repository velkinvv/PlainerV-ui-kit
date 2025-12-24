import React from 'react';
import { useTheme } from 'styled-components';
import type { IconComponentProps } from '../../types/icon';

export const IconExFigma: React.FC<IconComponentProps> = ({
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
        d="M5 5.33333C5 3.49238 6.49239 2 8.33333 2H11.6667V8.66667H8.33333C6.49238 8.66667 5 7.17428 5 5.33333V5.33333Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M18.3334 5.33333C18.3334 3.49238 16.841 2 15 2H11.6667V8.66667H15C16.841 8.66667 18.3334 7.17428 18.3334 5.33333V5.33333Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M18.3334 11.9998C18.3334 10.1589 16.841 8.6665 15 8.6665V8.6665C13.1591 8.6665 11.6667 10.1589 11.6667 11.9998V11.9998C11.6667 13.8408 13.1591 15.3332 15 15.3332V15.3332C16.841 15.3332 18.3334 13.8408 18.3334 11.9998V11.9998Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M5 11.9998C5 10.1589 6.49239 8.6665 8.33333 8.6665H11.6667V15.3332H8.33333C6.49238 15.3332 5 13.8408 5 11.9998V11.9998Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M5 18.6668C5 16.8259 6.49239 15.3335 8.33333 15.3335H11.6667V18.6668C11.6667 20.5078 10.1743 22.0002 8.33333 22.0002V22.0002C6.49238 22.0002 5 20.5078 5 18.6668V18.6668Z"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default IconExFigma;
