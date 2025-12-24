import type { IconComponentProps } from '../../types/icon';
import React from 'react';
import { useTheme } from 'styled-components';

export const IconExFire: React.FC<IconComponentProps> = ({
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
        d="M13.7524 3.17227C13.7503 3.09605 13.6671 3.04642 13.6016 3.08553C10.1363 5.15579 10.2004 10.3491 10.2418 11.2901C10.2449 11.3611 10.1778 11.4112 10.1135 11.3809C9.71316 11.1924 8.5661 10.4823 8.50273 8.51534C8.50028 8.43901 8.41792 8.38994 8.35223 8.42888C6.34578 9.61806 5 11.8144 5 14.25C5 17.978 8.134 21 12 21C15.866 21 19 17.978 19 14.25C19 8.83416 13.8803 7.66943 13.7524 3.17227Z"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default IconExFire;
