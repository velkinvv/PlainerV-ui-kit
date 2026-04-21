import type { SVGProps } from 'react';
import type { IconSize } from './sizes';

export type IconTypeProps = SVGProps<SVGSVGElement> & {
  size?: IconSize | string;
  color?: string;
  className?: string;
};

export type IconComponentProps = SVGProps<SVGSVGElement> & {
  width?: string | number;
  height?: string | number;
  color?: string;
  className?: string;
};
