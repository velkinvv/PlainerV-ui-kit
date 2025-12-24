import type { IconComponentProps } from '../../types/icon';
import React from 'react';
import { useTheme } from 'styled-components';

export const IconExNoSound: React.FC<IconComponentProps> = ({
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
        d="M16.4136 12.7686C16.5559 12.3796 16.3559 11.9489 15.9669 11.8066C15.5779 11.6643 15.1472 11.8642 15.0049 12.2532L16.4136 12.7686ZM13.1102 14.3066C12.7272 14.4644 12.5447 14.9028 12.7025 15.2857C12.8603 15.6687 13.2987 15.8512 13.6817 15.6934L13.1102 14.3066ZM8.75 10.8513V6.42565H7.25V10.8513H8.75ZM12 2.75C13.7254 2.75 15.25 4.32249 15.25 6.42565H16.75C16.75 3.64037 14.6929 1.25 12 1.25V2.75ZM12 1.25C9.3071 1.25 7.25 3.64037 7.25 6.42565H8.75C8.75 4.32249 10.2746 2.75 12 2.75V1.25ZM15.25 6.42565V9.08527H16.75V6.42565H15.25ZM13.6817 15.6934C14.9441 15.1732 15.9279 14.0961 16.4136 12.7686L15.0049 12.2532C14.6509 13.2208 13.9503 13.9604 13.1102 14.3066L13.6817 15.6934ZM10.2969 13.9814C9.38426 13.3438 8.75 12.1938 8.75 10.8513H7.25C7.25 12.6624 8.10638 14.2809 9.43794 15.211L10.2969 13.9814Z"
        fill={color}
      />
      <path
        d="M20 11.5C20 15.9183 16.4183 19.5 12 19.5C11.0187 19.5 10.0786 19.3233 9.20989 19M4 11.5C4 14.0653 5.20739 16.3485 7.0849 17.8125"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M12 22V20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M20 5L5 20"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconExNoSound;
