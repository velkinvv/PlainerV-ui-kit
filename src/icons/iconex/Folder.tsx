import type { IconComponentProps } from '../../types/icon';
import React from 'react';
import { useTheme } from 'styled-components';

export const IconExFolder: React.FC<IconComponentProps> = ({
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
        d="M11 4H16.5C18.9853 4 21 6.01472 21 8.5M12.1027 5.24371L11.3973 4.25629C10.8342 3.4679 9.925 3 8.95615 3H7C4.23858 3 2 5.23858 2 8V16C2 18.7614 4.23858 21 7 21H17C19.7614 21 22 18.7614 22 16V11.5C22 8.73858 19.7614 6.5 17 6.5H14.5439C13.575 6.5 12.6658 6.0321 12.1027 5.24371Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M12 16.5H18"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconExFolder;
