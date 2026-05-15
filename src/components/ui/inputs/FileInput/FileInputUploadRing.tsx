import React, { useMemo } from 'react';
import { FileInputUploadRingSvg } from './FileInputUploadRing.style';

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
    <FileInputUploadRingSvg
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
    </FileInputUploadRingSvg>
  );
};

FileInputUploadRing.displayName = 'FileInputUploadRing';
