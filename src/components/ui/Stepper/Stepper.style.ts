import styled, { css } from 'styled-components';
import type { StepperAppearance } from '../../../types/ui';
import { BorderRadiusHandler } from '../../../handlers/uiHandlers';
import { createStyledShouldForwardProp } from '../../../handlers/styledComponentHandlers';
import { neutral } from '../../../variables/colors/neutral';

/**
 * Корень степпера (`nav`): горизонтальный ряд, скругление из `theme.borderRadius` (`BorderRadiusHandler`).
 * @property $appearance - Светлая или тёмная панель по макету.
 * @property $fullWidth - Растянуть на всю ширину контейнера.
 */
export const StepperRoot = styled.nav.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<{ $appearance: StepperAppearance; $fullWidth?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  max-width: 100%;
  box-sizing: border-box;
  padding: 10px 14px;
  border-radius: ${({ theme }) => BorderRadiusHandler(theme.borderRadius)};

  ${({ $appearance, theme }) =>
    $appearance === 'dark'
      ? css`
          background: ${neutral[800]};
          color: ${theme.colors.backgroundSecondary};
        `
      : css`
          background: ${theme.colors.backgroundSecondary};
          color: ${theme.colors.text};
          border: 1px solid ${theme.colors.border};
        `}
`;

/**
 * Кнопка «назад» (шеврон); скругление как у остальных контролов темы.
 * @property $appearance - Влияет на цвет иконки.
 */
export const StepperBackButton = styled.button.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<{ $appearance: StepperAppearance }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin: 0;
  padding: 4px;
  border: none;
  border-radius: ${({ theme }) => BorderRadiusHandler(theme.borderRadius)};
  background: transparent;
  cursor: pointer;
  color: ${({ theme, $appearance }) =>
    $appearance === 'dark' ? theme.colors.backgroundSecondary : theme.colors.text};

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
`;

/** Обёртка SVG компактного кольца */
export const StepperCompactSvgWrap = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 52px;
  height: 52px;
`;

/** Центральный текст «N/M» в компактном кольце */
export const StepperCompactCounter = styled.span`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  pointer-events: none;
`;

/**
 * Колонка заголовка / подзаголовка (compact).
 * @property $appearance - Палитра текста.
 */
export const StepperCompactTextCol = styled.div.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<{ $appearance: StepperAppearance }>`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
  text-align: left;

  ${({ $appearance, theme }) =>
    $appearance === 'dark'
      ? css`
          color: ${theme.colors.backgroundSecondary};
        `
      : css`
          color: ${theme.colors.text};
        `}
`;

export const StepperCompactTitle = styled.span`
  font-size: 15px;
  font-weight: 600;
  line-height: 1.25;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

/**
 * Подзаголовок компактного варианта.
 * @property $appearance - Приглушённый цвет.
 */
export const StepperCompactSubtitle = styled.span.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<{ $appearance: StepperAppearance }>`
  font-size: 12px;
  font-weight: 400;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme, $appearance }) =>
    $appearance === 'dark' ? theme.colors.textTertiary : theme.colors.textSecondary};
`;

/** Ряд шагов в линейном варианте (без кнопки назад) */
export const StepperLinearStepsRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  min-width: 0;
  gap: 0;
`;

/** Одна ячейка шага: круг + подписи */
export const StepperLinearStepCell = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
`;

export const StepperLinearTextStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;

/**
 * Мелкая подпись «Шаг N».
 * @property $appearance - Тема панели.
 */
export const StepperLinearStepHint = styled.span.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<{ $appearance: StepperAppearance }>`
  font-size: 11px;
  line-height: 1.2;
  color: ${({ theme, $appearance }) =>
    $appearance === 'dark' ? theme.colors.textTertiary : theme.colors.textTertiary};
`;

/**
 * Заголовок шага в линейном варианте.
 * @property $appearance - Тема панели.
 * @property $muted - Будущий шаг — чуть приглушённее.
 */
export const StepperLinearStepTitle = styled.span.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<{ $appearance: StepperAppearance; $muted?: boolean }>`
  font-size: 14px;
  font-weight: 600;
  line-height: 1.25;
  white-space: nowrap;
  color: ${({ theme, $appearance, $muted }) => {
    if ($appearance === 'dark') {
      return $muted ? theme.colors.textSecondary : theme.colors.backgroundSecondary;
    }
    return $muted ? theme.colors.textSecondary : theme.colors.text;
  }};
`;

/**
 * Кружок номера шага (linear).
 * @property $visual - Заливка или только обводка.
 * @property $appearance - Светлая / тёмная панель.
 */
export const StepperLinearCircle = styled.span.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<{
  $visual: 'filled' | 'outline';
  $appearance: StepperAppearance;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  box-sizing: border-box;

  ${({ $visual, theme, $appearance }) =>
    $visual === 'filled'
      ? css`
          background: ${theme.colors.progressFill};
          color: ${$appearance === 'dark' ? neutral[900] : theme.colors.text};
          border: 2px solid transparent;
        `
      : css`
          background: transparent;
          color: ${theme.colors.textTertiary};
          border: 2px solid ${theme.colors.borderSecondary};
        `}
`;

/**
 * Горизонтальный соединитель между шагами.
 * @property $completed - Пройденный отрезок (до активного шага).
 * @property $appearance - Тема панели.
 */
export const StepperLinearConnector = styled.span.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<{ $completed: boolean; $appearance: StepperAppearance }>`
  flex: 1 1 12px;
  align-self: center;
  min-width: 12px;
  height: 1px;
  margin: 0 6px;
  border-radius: 1px;
  background: ${({ theme, $completed, $appearance }) => {
    if ($completed) {
      return theme.colors.progressFill;
    }
    return $appearance === 'dark' ? theme.colors.borderSecondary : theme.colors.border;
  }};
`;
