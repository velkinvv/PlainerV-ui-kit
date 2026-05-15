import styled from 'styled-components';

/** Строка: слайдер (колонка) и опционально поле числа. */
export const SliderInputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-width: 0;
`;

/** Колонка под `SliderRoot` (трек растягивается). */
export const SliderInputTrackSlot = styled.div`
  flex: 1;
  min-width: 0;
`;

/**
 * Фиксированная колонка под ввод числа.
 * @property $width - CSS ширина (например `88px`).
 */
export const SliderInputNumberSlot = styled.div<{ $width: string }>`
  flex-shrink: 0;
  width: ${({ $width }) => $width};
  min-width: 0;
`;
