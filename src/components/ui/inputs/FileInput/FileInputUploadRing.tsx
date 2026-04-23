import React, { useMemo } from 'react';
import styled from 'styled-components';

const RingSvg = styled.svg`
  flex-shrink: 0;

  .track {
    fill: none;
    stroke: ${({ theme }) => theme.colors.borderSecondary};
    stroke-width: 2;
  }

  .arc {
    fill: none;
    stroke: ${({ theme }) => theme.colors.progressStatusLoading};
    stroke-width: 3;
    stroke-linecap: round;
    transform: rotate(-90deg);
    transform-origin: center;
  }
`;

export type FileInputUploadRingProps = {
  /** Прогресс 0–100 */
  progress: number;
  /** Диаметр кольца в px */
  diameter?: number;
  /** Подпись для `aria-label` */
  ariaLabel?: string;
};

/**
 * Кольцевой индикатор прогресса загрузки файла (макет Figma).
 * @param props - `progress`, опционально `diameter` и `ariaLabel`.
 */
export const FileInputUploadRing: React.FC<FileInputUploadRingProps> = ({
  progress,
  diameter = 28,
  ariaLabel = 'Прогресс загрузки',
}) => {
  const d = diameter || 28;
  const r = useMemo(() => (d / 2) * 0.72, [d]);
  const cx = d / 2;
  const cy = d / 2;
  const circumference = 2 * Math.PI * r;
  const clamped = Math.min(100, Math.max(0, progress));
  const dashOffset = circumference * (1 - clamped / 100);

  return (
    <RingSvg
      width={d}
      height={d}
      viewBox={`0 0 ${d} ${d}`}
      role="progressbar"
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel}
    >
      <circle className="track" cx={cx} cy={cy} r={r} />
      <circle
        className="arc"
        cx={cx}
        cy={cy}
        r={r}
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
      />
    </RingSvg>
  );
};

FileInputUploadRing.displayName = 'FileInputUploadRing';
