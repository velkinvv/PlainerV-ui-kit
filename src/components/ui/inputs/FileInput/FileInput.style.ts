import styled, { css } from 'styled-components';
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

/**
 * Строка-контейнер внутри обёртки инпута.
 * @property $isDropzoneFill — растянуть по высоте dropzone и центрировать содержимое (макет Figma).
 */
export const FileInputRow = styled.div.withConfig({
  shouldForwardProp: prop => prop !== '$isDropzoneFill',
})<{ $isDropzoneFill?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1 1 auto;
  min-width: 0;
  position: relative;
  width: 100%;

  ${({ $isDropzoneFill }) =>
    $isDropzoneFill &&
    css`
      flex: 1 1 auto;
      align-self: stretch;
      justify-content: center;
    `}
`;

/**
 * Режим `trigger`: отдельная кнопка выбора файла (прежний вид).
 * @property $disabled - Блокировка
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
 * Режим `field` / `dropzone`: кликабельная область на всю ширину (текст + иконка).
 * @property $disabled - Блокировка
 * @property $centered - Центрирование содержимого (dropzone)
 */
export const FileFieldTrigger = styled.label<{ $disabled?: boolean; $centered?: boolean }>`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: ${({ $centered }) => ($centered ? 'center' : 'space-between')};
  gap: ${({ $centered }) => ($centered ? '10px' : '12px')};
  min-width: 0;
  margin: 0;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
  user-select: none;
`;

/** Иконка загрузки справа в поле / в dropzone */
export const FileInputTrailingIcon = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/** Контент по центру в dropzone (текст + иконка в ряд) */
export const FileDropzoneContent = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
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
    $isPlaceholder ? theme.colors.textSecondary : theme.colors.text};
`;

/** Карточка файла: строка с иконкой, текстами и слотом справа */
export const FileCardRow = styled.div`
  display: flex;
  align-items: stretch;
  gap: 12px;
  width: 100%;
  min-width: 0;
  flex: 1;
`;

/** Левая+средняя часть карточки — клик выбора другого файла */
export const FileCardMain = styled.label<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
  margin: 0;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
`;

/** Иконка документа + бейдж расширения */
export const FileCardThumb = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  gap: 6px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 11px;
  line-height: 1.2;
`;

/** Подпись расширения под иконкой (например `doc`) */
export const FileCardExtensionBadge = styled.span`
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: 11px;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.textTertiary};
  text-transform: lowercase;
`;

/** Подпись и имя файла */
export const FileCardTexts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  min-width: 0;
  flex: 1;
`;

/** Мелкая подпись над именем */
export const FileCardCaption = styled.span`
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: 11px;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.textTertiary};
`;

/** Имя файла */
export const FileCardName = styled.span`
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: 600;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/** Правая колонка: прогресс / размер */
export const FileCardSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-shrink: 0;
  min-width: 40px;
  color: ${({ theme }) => theme.colors.textTertiary};
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
`;

/** Подпись размера файла справа (например «1 mb») */
export const FileCardSizeText = styled.span`
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.textTertiary};
  white-space: nowrap;
`;

/**
 * Кнопка удаления файла в карточке (не absolute, в отличие от общего `ClearButton`).
 * @property $disabled - Блокировка
 */
export const FileCardRemoveButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 6px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition: ${TransitionHandler()};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.backgroundTertiary};
    color: ${({ theme }) => theme.colors.text};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;
