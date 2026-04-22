import React, { forwardRef, useCallback, useId, useMemo, useRef, useState } from 'react';
import type { FileInputProps, TooltipPosition } from '../../../../types/ui';
import { InputVariant } from '../../../../types/ui';
import { Size, IconSize } from '../../../../types/sizes';
import { Icon } from '../../Icon/Icon';
import { Tooltip } from '../../Tooltip/Tooltip';
import { Hint, HintVariant, type HintPosition } from '../../Hint/Hint';
import { useFormContext } from '../../../../contexts/FormContext';
import {
  InputContainer,
  Label,
  InputWrapper,
  HelperText,
  ErrorText,
  SuccessText,
  ClearButton,
  LoadingSpinner,
  SkeletonEffect,
  AdditionalLabel,
  ExtraText,
  RequiredIndicator,
} from '../shared';
import {
  VisuallyHiddenFileInput,
  FileInputRow,
  FileChooseTrigger,
  FileNamePreview,
} from './FileInput.style';
import { formatFileListSummary, getFileInputStatus } from './handlers';

const DEFAULT_BUTTON_LABEL = 'Выбрать файл';
const DEFAULT_PLACEHOLDER = 'Файл не выбран';

/**
 * Поле выбора файла: скрытый `input[type=file]`, триггер (`label htmlFor`) и подпись выбранных файлов.
 * Поддерживает те же обёртки `Form`, `Tooltip`/`Hint`, состояния ошибки и скелетона, что и `Input`/`TextArea`.
 *
 * Входящие пропсы — см. `FileInputProps` в `types/ui` (в т.ч. `buttonLabel`, `fileName`, `showClearButton`, `onClear`, `accept`, `multiple`).
 */
export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      label,
      placeholder = DEFAULT_PLACEHOLDER,
      error,
      success,
      status,
      helperText,
      required = false,
      fullWidth = false,
      skeleton = false,
      disabled = false,
      variant = InputVariant.DEFAULT,
      size = Size.MD,
      buttonLabel = DEFAULT_BUTTON_LABEL,
      fileName,
      showClearButton = false,
      onClear,
      onChange,
      onFocus,
      onBlur,
      isLoading = false,
      extraText,
      tooltip,
      tooltipType = 'tooltip',
      tooltipPosition = 'top',
      additionalLabel,
      className,
      multiple,
      accept,
      name,
      id: idFromProps,
      ...rest
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false);
    const [internalSummary, setInternalSummary] = useState('');
    const innerRef = useRef<HTMLInputElement | null>(null);
    const reactId = useId();
    const captionId = `${reactId}-file-caption`;
    const fileInputId = idFromProps ?? `${reactId}-file-input`;
    const formContext = useFormContext();

    const currentStatus = useMemo(
      () => getFileInputStatus(status, error, success),
      [status, error, success],
    );

    const setRefs = useCallback(
      (node: HTMLInputElement | null) => {
        innerRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
        }
      },
      [ref],
    );

    const hasSelection = useMemo(() => {
      if (fileName !== undefined) {
        return Boolean(fileName?.length);
      }
      return Boolean(internalSummary?.length);
    }, [fileName, internalSummary]);

    const displayFileText = useMemo(() => {
      if (fileName !== undefined) {
        return fileName?.length ? fileName : placeholder;
      }
      return internalSummary?.length ? internalSummary : placeholder;
    }, [fileName, internalSummary, placeholder]);

    const effectiveVariant = useMemo(
      () => (showClearButton && hasSelection ? InputVariant.CLEAR : variant),
      [showClearButton, hasSelection, variant],
    );

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setFocused(true);
        onFocus?.(e);
      },
      [onFocus],
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setFocused(false);
        onBlur?.(e);
      },
      [onBlur],
    );

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setInternalSummary(formatFileListSummary(e.target?.files, multiple));
        onChange?.(e);
      },
      [onChange, multiple],
    );

    const handleClear = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (innerRef.current) {
          innerRef.current.value = '';
        }
        setInternalSummary('');
        onClear?.();
      },
      [onClear],
    );

    const showClear = Boolean(showClearButton && hasSelection && !disabled);

    const wrapperProps = {
      variant: effectiveVariant,
      size,
      error,
      success,
      status: currentStatus,
      fullWidth,
      focused,
      readOnly: false,
      className,
    } as const;

    const hiddenInput = (
      <VisuallyHiddenFileInput
        ref={setRefs}
        id={fileInputId}
        name={name}
        form={formContext?.formId}
        disabled={disabled}
        required={required}
        multiple={multiple}
        accept={accept}
        aria-invalid={error ? true : undefined}
        aria-labelledby={label ? captionId : undefined}
        aria-label={label ? undefined : buttonLabel}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      />
    );

    const rowContent = (
      <FileInputRow>
        {hiddenInput}
        <FileChooseTrigger htmlFor={fileInputId} $disabled={disabled}>
          {buttonLabel}
        </FileChooseTrigger>
        <FileNamePreview $isPlaceholder={!hasSelection}>{displayFileText}</FileNamePreview>
        {isLoading ? <LoadingSpinner size={size} /> : null}
      </FileInputRow>
    );

    if (skeleton) {
      return (
        <InputContainer fullWidth={fullWidth}>
          {label ? <SkeletonEffect size={size} /> : null}
          <SkeletonEffect size={size} />
        </InputContainer>
      );
    }

    return (
      <InputContainer fullWidth={fullWidth}>
        {label ? (
          <Label id={captionId}>
            {label}
            {required ? <RequiredIndicator>*</RequiredIndicator> : null}
          </Label>
        ) : null}

        {additionalLabel ? <AdditionalLabel>{additionalLabel}</AdditionalLabel> : null}

        {tooltip && tooltipType === 'tooltip' ? (
          <Tooltip content={tooltip} position={tooltipPosition as TooltipPosition}>
            <InputWrapper {...wrapperProps}>
              {rowContent}
              {showClear ? (
                <ClearButton type="button" onClick={handleClear} aria-label="Очистить выбор файла">
                  <Icon name="IconExClose" size={IconSize.SM} />
                </ClearButton>
              ) : null}
            </InputWrapper>
          </Tooltip>
        ) : (
          <InputWrapper {...wrapperProps}>
            {rowContent}
            {showClear ? (
              <ClearButton type="button" onClick={handleClear} aria-label="Очистить выбор файла">
                <Icon name="IconExClose" size={IconSize.SM} />
              </ClearButton>
            ) : null}
          </InputWrapper>
        )}

        {tooltip && tooltipType === 'hint' ? (
          <Hint
            content={tooltip}
            placement={tooltipPosition as HintPosition}
            variant={HintVariant.DEFAULT}
          >
            {tooltip}
          </Hint>
        ) : null}

        {error ? <ErrorText>{error}</ErrorText> : null}
        {success ? <SuccessText>Успешно</SuccessText> : null}
        {helperText && !error && !success ? <HelperText>{helperText}</HelperText> : null}
        {extraText ? <ExtraText>{extraText}</ExtraText> : null}
      </InputContainer>
    );
  },
);

FileInput.displayName = 'FileInput';
