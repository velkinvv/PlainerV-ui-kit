import type { IconSize } from './sizes';

export type IconTypeProps = React.SVGProps<SVGSVGElement> & {
  size?: IconSize | string;
  color?: string;
  className?: string;
};

export type IconComponentProps = React.SVGProps<SVGSVGElement> & {
  width?: string | number;
  height?: string | number;
  color?: string;
  className?: string;
};
