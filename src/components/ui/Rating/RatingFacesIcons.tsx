import React from 'react';

type RatingFaceSvgProps = {
  /** Размер стороны SVG в px или CSS */
  size?: string | number;
  /** Доп. класс */
  className?: string;
};

/**
 * Базовый SVG-круг лица (currentColor).
 * @param size — размер
 * @param mouthPath — path рта
 * @param className — класс
 */
const RatingFaceBase: React.FC<RatingFaceSvgProps & { mouthPath: string }> = ({
  size = '100%',
  mouthPath,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.75" />
    <circle cx="8.5" cy="10" r="1.25" fill="currentColor" />
    <circle cx="15.5" cy="10" r="1.25" fill="currentColor" />
    <path d={mouthPath} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" fill="none" />
  </svg>
);

/** Очень плохо */
export const RatingFace1: React.FC<RatingFaceSvgProps> = (props) => (
  <RatingFaceBase {...props} mouthPath="M8 16.5c1.2-2 2.8-3 4-3s2.8 1 4 3" />
);

/** Плохо */
export const RatingFace2: React.FC<RatingFaceSvgProps> = (props) => (
  <RatingFaceBase {...props} mouthPath="M8.5 16c1-1.2 2.5-1.8 3.5-1.8S14.5 14.8 15.5 16" />
);

/** Нейтрально */
export const RatingFace3: React.FC<RatingFaceSvgProps> = (props) => (
  <RatingFaceBase {...props} mouthPath="M8.5 15.5h7" />
);

/** Хорошо */
export const RatingFace4: React.FC<RatingFaceSvgProps> = (props) => (
  <RatingFaceBase {...props} mouthPath="M8.5 14.5c1 1.4 2.5 2.2 3.5 2.2s2.5-.8 3.5-2.2" />
);

/** Отлично */
export const RatingFace5: React.FC<RatingFaceSvgProps> = (props) => (
  <RatingFaceBase {...props} mouthPath="M7.5 14c1.4 2.4 3.2 3.5 4.5 3.5S15.1 16.4 16.5 14" />
);

/** Набор лиц по умолчанию (индекс 0 = оценка 1) */
export const DEFAULT_RATING_FACE_ICONS: React.FC<RatingFaceSvgProps>[] = [
  RatingFace1,
  RatingFace2,
  RatingFace3,
  RatingFace4,
  RatingFace5,
];

/**
 * Выбирает иконки лиц под произвольный max (равномерная выборка из 5).
 * @param max — число лиц
 */
export function pickRatingFaceComponents(max: number): React.FC<RatingFaceSvgProps>[] {
  const safeMax = Math.max(1, Math.floor(max));
  if (safeMax === 5) {
    return DEFAULT_RATING_FACE_ICONS;
  }
  if (safeMax < 5) {
    const result: React.FC<RatingFaceSvgProps>[] = [];
    for (let index = 0; index < safeMax; index += 1) {
      const sourceIndex = Math.round((index * 4) / Math.max(safeMax - 1, 1));
      result.push(DEFAULT_RATING_FACE_ICONS[sourceIndex]);
    }
    return result;
  }
  const result: React.FC<RatingFaceSvgProps>[] = [];
  for (let index = 0; index < safeMax; index += 1) {
    const sourceIndex = Math.min(4, Math.floor((index * 5) / safeMax));
    result.push(DEFAULT_RATING_FACE_ICONS[sourceIndex]);
  }
  return result;
}
