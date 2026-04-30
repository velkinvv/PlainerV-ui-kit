import React, { forwardRef, useCallback, useId, useMemo, useRef, useState } from 'react';
import type { FileInputLayout, FileInputProps, TooltipPosition } from '../../../../types/ui';
import { InputVariant } from '../../../../types/ui';
import { getClearIconSizeForInputField } from '../../../../handlers/iconHandlers';
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
  FileFieldTrigger,
  FileDropzoneContent,
  FileCardRow,
  FileCardMain,
  FileCardThumb,
  FileCardTexts,
  FileCardCaption,
  FileCardName,
  FileCardSide,
  FileCardRemoveButton,
  FileInputTrailingIcon,
  FileCardExtensionBadge,
  FileCardSizeText,
} from './FileInput.style';
import { FileInputUploadRing } from './FileInputUploadRing';
import {
  clampUploadProgress,
  formatFileListSummary,
  getFileExtensionBadge,
  getFileInputStatus,
} from './handlers';

const DEFAULT_BUTTON_LABEL = 'Выбрать файл';
/** Плейсхолдер пустого поля в макете Figma (`field`) */
const DEFAULT_PLACEHOLDER = 'input_file';
const DEFAULT_DROPZONE_TEXT = 'Перенесите для загрузки';
const DEFAULT_FILE_CARD_LABEL = 'Название файла';

/** Иконка справа в зависимости от размера поля */
const fileInputIconSize = (size: Size): IconSize => {
  switch (size) {
    case Size.SM:
    case Size.XS:
      return IconSize.SM;
    case Size.LG:
    case Size.XL:
      return IconSize.MD;
    default:
      return IconSize.SM;
  }
};

/**
 * Поле выбора файла по макету Figma: режимы `field`, `dropzone`, `file`, либо прежний `trigger`.
 * См. `FileInputProps` в `types/ui`.
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
      size = Size.SM,
      buttonLabel = DEFAULT_BUTTON_LABEL,
      fileName,
      displayClearIcon = false,
      onClearIconClick,
      clearIconProps,
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
      fileLayout = 'field',
      dropzoneText = DEFAULT_DROPZONE_TEXT,
      fileCardLabel = DEFAULT_FILE_CARD_LABEL,
      fileCardBadge,
      uploadProgress,
      fileSizeLabel,
      onDragEnter: onDragEnterProp,
      onDragLeave: onDragLeaveProp,
      onDragOver: onDragOverProp,
      onDrop: onDropProp,
      ...rest
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false);
    const [internalSummary, setInternalSummary] = useState('');
    const [dragDepth, setDragDepth] = useState(0);
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

    const effectiveFileLayout: FileInputLayout = useMemo(() => {
      if (fileLayout === 'file' && !hasSelection) {
        return 'field';
      }
      return fileLayout;
    }, [fileLayout, hasSelection]);

    const useFloatingClear = Boolean(
      displayClearIcon && hasSelection && !disabled && effectiveFileLayout !== 'file',
    );

    /** Обводка и курсор: очистка, кликабельное поле/dropzone, остальное из пропсов */
    const wrapperVariant = useMemo(() => {
      if (useFloatingClear) {
        return InputVariant.CLEAR;
      }
      if (effectiveFileLayout === 'field' || effectiveFileLayout === 'dropzone') {
        return InputVariant.SELECTOR;
      }
      return variant;
    }, [useFloatingClear, effectiveFileLayout, variant]);

    const progressValue = useMemo(() => clampUploadProgress(uploadProgress), [uploadProgress]);
    const showUploadRing = Boolean(
      progressValue != null && progressValue < 100 && !isLoading && effectiveFileLayout === 'file',
    );

    const extensionBadge = useMemo(() => {
      if (fileCardBadge?.length) {
        return fileCardBadge;
      }
      if (hasSelection && displayFileText && displayFileText !== placeholder) {
        return getFileExtensionBadge(displayFileText);
      }
      return '';
    }, [fileCardBadge, hasSelection, displayFileText, placeholder]);

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
        onClearIconClick?.();
      },
      [onClearIconClick],
    );

    const handleDragEnter = useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        if (effectiveFileLayout === 'dropzone') {
          e.preventDefault();
          e.stopPropagation();
          setDragDepth(d => d + 1);
        }
        onDragEnterProp?.(e);
      },
      [effectiveFileLayout, onDragEnterProp],
    );

    const handleDragLeave = useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        if (effectiveFileLayout === 'dropzone') {
          e.preventDefault();
          e.stopPropagation();
          setDragDepth(d => Math.max(0, d - 1));
        }
        onDragLeaveProp?.(e);
      },
      [effectiveFileLayout, onDragLeaveProp],
    );

    const handleDragOver = useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        if (effectiveFileLayout === 'dropzone') {
          e.preventDefault();
          e.stopPropagation();
        }
        onDragOverProp?.(e);
      },
      [effectiveFileLayout, onDragOverProp],
    );

    const handleDrop = useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        if (effectiveFileLayout === 'dropzone') {
          setDragDepth(0);
        }
        onDropProp?.(e);
      },
      [effectiveFileLayout, onDropProp],
    );

    const dragActive = dragDepth > 0 && effectiveFileLayout === 'dropzone';

    const wrapperProps = {
      variant: wrapperVariant,
      size,
      error,
      success,
      status: currentStatus,
      fullWidth,
      focused,
      readOnly: false,
      className,
      $fileSurface:
        effectiveFileLayout === 'field'
          ? ('field' as const)
          : effectiveFileLayout === 'dropzone'
            ? ('dropzone' as const)
            : effectiveFileLayout === 'file'
              ? ('file' as const)
              : undefined,
      $dragActive: dragActive,
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

    const iconSz = fileInputIconSize(size);

    const rowContent =
      effectiveFileLayout === 'trigger' ? (
        <FileInputRow>
          {hiddenInput}
          <FileChooseTrigger htmlFor={fileInputId} $disabled={disabled}>
            {buttonLabel}
          </FileChooseTrigger>
          <FileNamePreview $isPlaceholder={!hasSelection}>{displayFileText}</FileNamePreview>
          {isLoading ? <LoadingSpinner size={size} /> : null}
        </FileInputRow>
      ) : effectiveFileLayout === 'field' ? (
        <FileInputRow>
          {hiddenInput}
          <FileFieldTrigger htmlFor={fileInputId} $disabled={disabled}>
            <FileNamePreview $isPlaceholder={!hasSelection}>{displayFileText}</FileNamePreview>
            <FileInputTrailingIcon aria-hidden>
              <Icon name="IconExCloudUpload" size={iconSz} color="currentColor" />
            </FileInputTrailingIcon>
          </FileFieldTrigger>
          {isLoading ? <LoadingSpinner size={size} /> : null}
        </FileInputRow>
      ) : effectiveFileLayout === 'dropzone' ? (
        <FileInputRow $isDropzoneFill>
          {hiddenInput}
          <FileFieldTrigger htmlFor={fileInputId} $disabled={disabled} $centered>
            <FileDropzoneContent>
              <span>{dropzoneText}</span>
              <Icon name="IconExCloudUpload" size={iconSz} color="currentColor" />
            </FileDropzoneContent>
          </FileFieldTrigger>
        </FileInputRow>
      ) : (
        <FileCardRow>
          {hiddenInput}
          <FileCardMain htmlFor={fileInputId} $disabled={disabled}>
            <FileCardThumb>
              <Icon name="IconExDocument" size={iconSz} color="currentColor" />
              {extensionBadge ? <FileCardExtensionBadge>{extensionBadge}</FileCardExtensionBadge> : null}
            </FileCardThumb>
            <FileCardTexts>
              <FileCardCaption>{fileCardLabel}</FileCardCaption>
              <FileCardName title={displayFileText}>{displayFileText}</FileCardName>
            </FileCardTexts>
          </FileCardMain>
          <FileCardSide>
            {isLoading ? <LoadingSpinner size={size} /> : null}
            {showUploadRing && progressValue != null ? (
              <FileInputUploadRing progress={progressValue} ariaLabel="Загрузка файла" />
            ) : null}
            {!isLoading && !showUploadRing && fileSizeLabel ? (
              <FileCardSizeText>{fileSizeLabel}</FileCardSizeText>
            ) : null}
            {!isLoading && !showUploadRing && !fileSizeLabel && hasSelection ? (
              <FileCardRemoveButton
                type="button"
                disabled={disabled}
                onClick={handleClear}
                aria-label="Удалить файл"
              >
                <Icon
                  name="IconExClose"
                  size={IconSize.SM}
                  color="currentColor"
                  {...clearIconProps}
                />
              </FileCardRemoveButton>
            ) : null}
          </FileCardSide>
        </FileCardRow>
      );

    // Скелетон только у поля; подписи остаются текстом (нет файлового инпута для `htmlFor`/`id`)
    if (skeleton) {
      return (
        <InputContainer fullWidth={fullWidth} aria-busy="true">
          {label ? (
            <Label as="span">
              {label}
              {required ? <RequiredIndicator>*</RequiredIndicator> : null}
            </Label>
          ) : null}
          {additionalLabel ? <AdditionalLabel>{additionalLabel}</AdditionalLabel> : null}
          <SkeletonEffect size={size} fullWidth={fullWidth} role="presentation" />
        </InputContainer>
      );
    }

    const fileFieldWrapper = (
      <InputWrapper
        {...wrapperProps}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {rowContent}
        {useFloatingClear ? (
          <ClearButton type="button" onClick={handleClear} aria-label="Очистить выбор файла">
            <Icon
              name="IconExClose"
              size={getClearIconSizeForInputField(size)}
              {...clearIconProps}
            />
          </ClearButton>
        ) : null}
      </InputWrapper>
    );

    let wrappedFileField: React.ReactNode = fileFieldWrapper;
    if (tooltip && tooltipType === 'tooltip') {
      wrappedFileField = (
        <Tooltip content={tooltip} position={tooltipPosition as TooltipPosition}>
          {fileFieldWrapper}
        </Tooltip>
      );
    } else if (tooltip && tooltipType === 'hint') {
      wrappedFileField = (
        <Hint
          content={tooltip}
          placement={tooltipPosition as HintPosition}
          variant={HintVariant.DEFAULT}
        >
          {fileFieldWrapper}
        </Hint>
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

        {wrappedFileField}

        {error ? <ErrorText>{error}</ErrorText> : null}
        {success ? <SuccessText>Успешно</SuccessText> : null}
        {helperText && !error && !success ? <HelperText>{helperText}</HelperText> : null}
        {extraText ? <ExtraText>{extraText}</ExtraText> : null}
      </InputContainer>
    );
  },
);

FileInput.displayName = 'FileInput';
