import React from 'react';
import { useTheme } from 'styled-components';
import type { IconComponentProps } from '../../types/icon';

export const IconExCase: React.FC<IconComponentProps> = ({
  width = 24,
  height = 24,
  color: IconColor,
  ...props
}) => {
  const theme = useTheme();
  const color = IconColor || theme.colors.text;

  return (
    <svg width={width} height={height} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M2 8.42871C2 7.32414 2.89543 6.42871 4 6.42871H20C21.1046 6.42871 22 7.32414 22 8.42871V10.0835C22 10.9667 21.4207 11.7453 20.5747 11.9991L13.1494 14.2267C12.3996 14.4516 11.6004 14.4516 10.8506 14.2267L3.42531 11.9991C2.57934 11.7453 2 10.9667 2 10.0835V8.42871Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M12 11.5717L12 9.85742"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.83337 11.5713L2.83337 16.9998C2.83337 19.2089 4.62424 20.9998 6.83338 20.9998H17.1667C19.3758 20.9998 21.1667 19.2089 21.1667 16.9998V11.5713"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M15.3333 6.42855V5C15.3333 3.89543 14.4379 3 13.3333 3H10.6666C9.56206 3 8.66663 3.89543 8.66663 5L8.66663 6.42855"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default IconExCase;
