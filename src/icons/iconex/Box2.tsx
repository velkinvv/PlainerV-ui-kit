import React from 'react';
import { useTheme } from 'styled-components';
import type { IconComponentProps } from '../../types/icon';

export const IconExBox2: React.FC<IconComponentProps> = ({
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
        d="M2 6.16667V17.1667C2 17.5704 2.24274 17.9345 2.61538 18.0897L12 22M2 6.16667L11.2308 2.32051C11.7231 2.11538 12.2769 2.11538 12.7692 2.32051L17 4.08333M2 6.16667L7 8.25M12 10.3333V22M12 10.3333L22 6.16667M12 10.3333L7 8.25M12 22L21.3846 18.0897C21.7573 17.9345 22 17.5704 22 17.1667V6.16667M22 6.16667L17 4.08333M7 8.25L17 4.08333"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};
