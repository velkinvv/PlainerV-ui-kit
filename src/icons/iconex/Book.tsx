import React from 'react';
import { useTheme } from 'styled-components';
import type { IconComponentProps } from '../../types/icon';

export const IconExBook: React.FC<IconComponentProps> = ({
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
        d="M12 4.11751V20.9907M12 4.11751L13.1001 3.70467C15.6036 2.76519 18.3964 2.76519 20.8999 3.70467C21.5643 3.95401 22 4.55775 22 5.22913V19.0798C22 20.0017 21.0075 20.6321 20.0951 20.2897C18.1082 19.5441 15.8918 19.5441 13.9049 20.2897L12.0137 20.9994C12.0071 21.0018 12 20.9973 12 20.9907M12 4.11751L10.8999 3.70467C8.39638 2.76519 5.60362 2.76519 3.10014 3.70467C2.43569 3.95401 2 4.55775 2 5.22913V19.0798C2 20.0017 2.99247 20.6321 3.90485 20.2897C5.89175 19.5441 8.10825 19.5441 10.0951 20.2897L11.9863 20.9994C11.9929 21.0018 12 20.9973 12 20.9907"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
};
