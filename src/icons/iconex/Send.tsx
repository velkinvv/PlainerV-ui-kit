import type { IconComponentProps } from '../../types/icon';
import React from 'react';
import { useTheme } from 'styled-components';

export const IconExSend: React.FC<IconComponentProps> = ({
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
        d="M19.7232 2.75892C20.6613 2.44621 21.5538 3.3387 21.2411 4.27681L16.1845 19.4466C15.8561 20.4318 14.5163 20.563 14.0029 19.6603L10.9078 14.2171C10.6409 13.7477 10.2522 13.3591 9.78283 13.0922L4.33973 9.99709C3.437 9.48377 3.56824 8.14391 4.55342 7.81552L19.7232 2.75892Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M12.7858 11.2143L10.7858 13.2143"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconExSend;
