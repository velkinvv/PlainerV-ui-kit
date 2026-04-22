import styled from 'styled-components';
import { BorderRadiusHandler, TransitionHandler } from '../../../../handlers/uiHandlers';

/** Скрытый нативный `input type="file"` (доступен с клавиатуры и для `label htmlFor`). */
export const VisuallyHiddenFileInput = styled.input.attrs({ type: 'file' })`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

/** Строка: триггер выбора + подпись файла. */
export const FileInputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1 1 auto;
  min-width: 0;
  position: relative;
  width: 100%;
`;

/**
 * Видимый триггер выбора файла (связан с `input` через `htmlFor`).
 * @property $disabled - Блокировка взаимодействия (визуально и `pointer-events`).
 */
export const FileChooseTrigger = styled.label<{ $disabled?: boolean }>`
  flex-shrink: 0;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
  margin: 0;
  padding: 6px 12px;
  border-radius: ${({ theme }) => BorderRadiusHandler(theme.borderRadius)};
  border: 1px solid ${({ theme }) => theme.colors.borderSecondary};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  font-weight: ${({ theme }) => theme.typography.label.fontWeight};
  line-height: ${({ theme }) => theme.typography.caption.lineHeight};
  transition: ${TransitionHandler()};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

/**
 * Текст имени файла или плейсхолдера.
 * @property $isPlaceholder - Признак «пустого» состояния (стиль вторичного текста).
 */
export const FileNamePreview = styled.span<{ $isPlaceholder?: boolean }>`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.fontWeight};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
  color: ${({ theme, $isPlaceholder }) =>
    $isPlaceholder ? theme.colors.textTertiary : theme.colors.text};
`;
