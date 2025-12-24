import type { IconComponentProps } from '../../types/icon';
import React from 'react';
import { useTheme } from 'styled-components';

export const IconExLink2: React.FC<IconComponentProps> = ({
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
        d="M10.0399 12.9601C11.4067 14.3269 13.6228 14.3269 14.9896 12.9601L18.5252 9.42456C19.892 8.05773 19.892 5.84165 18.5252 4.47481C17.1583 3.10798 14.9423 3.10798 13.5754 4.47481L11.8077 6.24258"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12.8683 10.1316C11.5015 8.76475 9.28541 8.76474 7.91857 10.1316L4.38304 13.6671C3.0162 15.0339 3.0162 17.25 4.38304 18.6169C5.74987 19.9837 7.96595 19.9837 9.33278 18.6169L11.1006 16.8491"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default IconExLink2;
