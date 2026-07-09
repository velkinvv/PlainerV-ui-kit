import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useCharacterCounterMotion } from '../../../../hooks/useCharacterCounterMotion';
import { CharacterCounter } from './InputStyles';

/** Пропсы анимированного счётчика символов */
export type CharacterCounterMotionProps = {
  /** Показывать счётчик (например, после порога видимости) */
  visible: boolean;
  /** Текущая длина текста */
  currentLength: number;
  /** Максимальная длина */
  maxLength: number;
  /** Включить анимации */
  motionEnabled?: boolean;
};

/**
 * Счётчик символов с появлением и пульсом при достижении лимита.
 *
 * @param visible — монтировать счётчик
 * @param currentLength — текущее количество символов
 * @param maxLength — лимит символов
 */
export const CharacterCounterMotion: React.FC<CharacterCounterMotionProps> = ({
  visible,
  currentLength,
  maxLength,
  motionEnabled = true,
}) => {
  const isOverLimit = currentLength > maxLength;
  const { motionProps } = useCharacterCounterMotion({
    currentLength,
    maxLength,
    motionEnabled,
  });

  return (
    <AnimatePresence mode="popLayout">
      {visible ? (
        <CharacterCounter {...motionProps} $isOverLimit={isOverLimit}>
          {`${currentLength}/${maxLength}`}
        </CharacterCounter>
      ) : null}
    </AnimatePresence>
  );
};
