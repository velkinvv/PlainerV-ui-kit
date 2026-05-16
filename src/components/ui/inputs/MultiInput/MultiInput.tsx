import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import {
  InputVariant,
  type MultiInputChangeEvent,
  type MultiInputDuplicatePolicy,
  type MultiInputProps,
  type TooltipPosition,
} from '../../../../types/ui';
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
  IconContainer,
  ClearButton,
  LoadingSpinner,
  SkeletonEffect,
  AdditionalLabel,
  ExtraText,
  CharacterCounter,
  RequiredIndicator,
  shouldShowInputClearButton,
} from '../shared';
import {
  SelectMultiChip,
  SelectMultiChipLabel,
  SelectMultiChipRemove,
} from '../Select/Select.style';
import { MultiInputInner, MultiInputNativeInput } from './MultiInput.style';
import {
  normalizeMultiInputToken,
  shouldAcceptMultiInputToken,
  splitMultiInputPaste,
} from './handlers';

/**
 * Поле для ввода нескольких токенов (как теги внутри рамки инпута): тот же контейнер, лейблы и статусы, что у `Input`.
 * Фиксация токена: Enter; по желанию запятая; при вставке — разбор по переносам/запятым/`;`/табам.
 * Референс по UX: [Admiral MultiInputField](https://admiralds.github.io/react-ui/?path=/docs/admiral-2-1-form-field-multiinputfield--docs).
 *
 * @param value - Массив токенов (контролируемый режим).
 * @param defaultValue - Начальные токены (неконтролируемый режим).
 * @param onValuesChange - Вызывается при любом изменении массива токенов.
 * @param onChange - Событие с `target.values` и `target.name` для совместимости с формами.
 * @param commitWithComma - Добавить токен по клавише `,`.
 * @param commitOnBlur - Добавить непустой черновик при уходе фокуса.
 * @param maxItems - Лимит числа токенов.
 * @param duplicates - Запрет дубликатов (`reject` по умолчанию).
 * @param validateToken - Отклонить отдельный токен при `false`.
 * @param displayTokenRemove - Кнопка удаления на чипе.
 * @param maxTokenLength - `maxLength` внутреннего поля.
 * @param name - Для отправки формы: скрытые `input` по одному на токен.
 * @param ref - Ссылка на видимое поле ввода следующего токена.
 */
export const MultiInput = forwardRef<HTMLInputElement, MultiInputProps>(
  (
    {
      label,
      placeholder,
      value: valueFromProps,
      defaultValue,
      onValuesChange,
      onChange,
      commitWithComma = true,
      commitOnBlur = true,
      maxItems,
      duplicates = 'reject',
      validateToken,
      displayTokenRemove: displayTokenRemoveProp,
      maxTokenLength,
      variant = InputVariant.DEFAULT,
      size = Size.SM,
      error,
      success,
      status,
      isLoading = false,
      skeleton = false,
      disableCopying = false,
      extraText,
      tooltip,
      tooltipType = 'tooltip',
      tooltipPosition = 'top',
      displayCharacterCounter = false,
      characterCounterVisibilityThreshold = 0,
      additionalLabel,
      helperText,
      fullWidth = false,
      disabled = false,
      readOnly = false,
      required = false,
      textAlign = 'left',
      displayClearIcon = false,
      onClearIconClick,
      clearIconProps,
      leftIcon,
      rightIcon,
      className,
      id,
      name,
      ignoreMaskCharacters: _ignoreMaskCharacters = false,
      onFocus,
      onBlur,
      onKeyDown,
      ...rest
    },
    ref,
  ) => {
    const inputId = useMemo(
      () => id ?? `multi-input-${Math.random().toString(36).slice(2, 10)}`,
      [id],
    );
    const formContext = useFormContext();
    const isControlled = valueFromProps !== undefined;
    const [internalItems, setInternalItems] = useState<string[]>(() => defaultValue ?? []);
    const [draft, setDraft] = useState('');
    const [focused, setFocused] = useState(false);

    const items = React.useMemo(
      () => (isControlled ? (valueFromProps ?? []) : internalItems),
      [isControlled, valueFromProps, internalItems],
    );
    const currentStatus = status || (error ? 'error' : success ? 'success' : undefined);

    const duplicatePolicy: MultiInputDuplicatePolicy = duplicates;

    const emit = useCallback(
      (nextItems: string[]) => {
        if (!isControlled) {
          setInternalItems(nextItems);
        }
        onValuesChange?.(nextItems);
        const event: MultiInputChangeEvent = {
          target: { values: nextItems, name: name ?? undefined },
        };
        onChange?.(event);
      },
      [isControlled, name, onChange, onValuesChange],
    );

    const commitDraft = useCallback(() => {
      const token = normalizeMultiInputToken(draft);
      if (!token) {
        return;
      }
      if (
        !shouldAcceptMultiInputToken({
          token,
          currentValues: items,
          duplicates: duplicatePolicy,
          validateToken,
          maxItems,
        })
      ) {
        return;
      }
      emit([...items, token]);
      setDraft('');
    }, [draft, duplicatePolicy, emit, items, maxItems, validateToken]);

    const removeTokenAt = useCallback(
      (index: number) => {
        const next = items.filter((_, itemIndex) => itemIndex !== index);
        emit(next);
      },
      [emit, items],
    );

    const handleClearField = useCallback(() => {
      setDraft('');
      emit([]);
      onClearIconClick?.();
    }, [emit, onClearIconClick]);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      setDraft(event.target?.value ?? '');
    }, []);

    const handleFocus = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        setFocused(true);
        onFocus?.(event);
      },
      [onFocus],
    );

    const handleBlur = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        setFocused(false);
        if (commitOnBlur && !readOnly && !disabled) {
          const token = normalizeMultiInputToken(draft);
          if (token) {
            if (
              shouldAcceptMultiInputToken({
                token,
                currentValues: items,
                duplicates: duplicatePolicy,
                validateToken,
                maxItems,
              })
            ) {
              emit([...items, token]);
              setDraft('');
            }
          }
        }
        onBlur?.(event);
      },
      [
        commitOnBlur,
        readOnly,
        disabled,
        draft,
        items,
        duplicatePolicy,
        validateToken,
        maxItems,
        emit,
        onBlur,
      ],
    );

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (disabled || readOnly) {
          onKeyDown?.(event);
          return;
        }

        if (event.key === 'Enter') {
          event.preventDefault();
          commitDraft();
          onKeyDown?.(event);
          return;
        }

        if (commitWithComma && event.key === ',') {
          event.preventDefault();
          commitDraft();
          onKeyDown?.(event);
          return;
        }

        if (event.key === 'Backspace' && draft === '' && items.length > 0) {
          event.preventDefault();
          removeTokenAt(items.length - 1);
          onKeyDown?.(event);
          return;
        }

        onKeyDown?.(event);
      },
      [
        commitDraft,
        commitWithComma,
        disabled,
        draft,
        items.length,
        onKeyDown,
        readOnly,
        removeTokenAt,
      ],
    );

    const handlePaste = useCallback(
      (event: React.ClipboardEvent<HTMLInputElement>) => {
        if (disableCopying) {
          event.preventDefault();
          return;
        }
        const text = event.clipboardData?.getData('text') ?? '';
        if (!/[\n,;\t]/.test(text) && splitMultiInputPaste(text).length <= 1) {
          return;
        }
        event.preventDefault();
        const incoming = splitMultiInputPaste(text);
        let next = [...items];
        for (const token of incoming) {
          if (
            !shouldAcceptMultiInputToken({
              token,
              currentValues: next,
              duplicates: duplicatePolicy,
              validateToken,
              maxItems,
            })
          ) {
            continue;
          }
          next = [...next, token];
        }
        emit(next);
        setDraft('');
      },
      [disableCopying, duplicatePolicy, emit, items, maxItems, validateToken],
    );

    const handleCopy = useCallback(
      (event: React.ClipboardEvent<HTMLInputElement>) => {
        if (disableCopying) {
          event.preventDefault();
        }
      },
      [disableCopying],
    );

    const showTokenRemove = displayTokenRemoveProp ?? (!readOnly && !disabled);

    const hasVisibleValue = items.length > 0 || draft.length > 0;
    const showClearButton = shouldShowInputClearButton({
      displayClearIcon,
      currentValue: hasVisibleValue ? '1' : '',
      disabled,
      readOnly,
    });

    const currentLength = useMemo(() => {
      const joined = [...items, draft].join('');
      return joined.length;
    }, [draft, items]);

    const maxLengthFromRest = rest.maxLength as number | undefined;
    const effectiveMaxLength = maxTokenLength ?? maxLengthFromRest;
    const { maxLength: _maxLengthOmit, ...restForNativeInput } = rest;
    const showCounter = useMemo(
      () =>
        displayCharacterCounter &&
        (effectiveMaxLength ?? 0) > 0 &&
        currentLength >= characterCounterVisibilityThreshold,
      [
        characterCounterVisibilityThreshold,
        currentLength,
        displayCharacterCounter,
        effectiveMaxLength,
      ],
    );

    if (skeleton) {
      return (
        <InputContainer fullWidth={fullWidth} aria-busy="true">
          {label && (
            <Label as="span">
              {label}
              {required && <RequiredIndicator>*</RequiredIndicator>}
            </Label>
          )}
          {additionalLabel && <AdditionalLabel>{additionalLabel}</AdditionalLabel>}
          <SkeletonEffect size={size} fullWidth={fullWidth} role="presentation" />
        </InputContainer>
      );
    }

    const inputSection = (
      <InputWrapper
        variant={variant}
        size={size}
        error={error}
        success={success}
        status={currentStatus}
        fullWidth={fullWidth}
        focused={focused}
        readOnly={readOnly}
        className={className}
      >
        {leftIcon && (
          <IconContainer $position="left" size={size}>
            {leftIcon}
          </IconContainer>
        )}

        <MultiInputInner>
          {items.map((token, index) => (
            <SelectMultiChip key={`${String(index)}-${token}`}>
              <SelectMultiChipLabel title={token}>{token}</SelectMultiChipLabel>
              {showTokenRemove ? (
                <SelectMultiChipRemove
                  type="button"
                  disabled={disabled}
                  aria-label={`Удалить «${token}»`}
                  onMouseDown={(mouseEvent: React.MouseEvent<HTMLButtonElement>) => {
                    mouseEvent.preventDefault();
                    mouseEvent.stopPropagation();
                  }}
                  onClick={() => {
                    removeTokenAt(index);
                  }}
                >
                  <Icon
                    name="IconExClose"
                    size={IconSize.XS}
                    color="currentColor"
                    {...clearIconProps}
                  />
                </SelectMultiChipRemove>
              ) : null}
            </SelectMultiChip>
          ))}

          <MultiInputNativeInput
            ref={ref}
            id={inputId}
            type="text"
            value={draft}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onCopy={handleCopy}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            textAlign={textAlign}
            form={formContext?.formId}
            autoComplete="off"
            maxLength={effectiveMaxLength}
            {...restForNativeInput}
          />
        </MultiInputInner>

        {rightIcon && (
          <IconContainer $position="right" size={size}>
            {rightIcon}
          </IconContainer>
        )}

        {isLoading ? <LoadingSpinner size={size} /> : null}

        {showClearButton ? (
          <ClearButton onClick={handleClearField} type="button">
            <Icon
              name="IconExClose"
              size={getClearIconSizeForInputField(size)}
              {...clearIconProps}
            />
          </ClearButton>
        ) : null}
      </InputWrapper>
    );

    const withOptionalTooltip = tooltip ? (
      tooltipType === 'tooltip' ? (
        <Tooltip content={tooltip} position={tooltipPosition as TooltipPosition}>
          {inputSection}
        </Tooltip>
      ) : (
        <Hint
          content={tooltip}
          placement={tooltipPosition as HintPosition}
          variant={HintVariant.DEFAULT}
        >
          {inputSection}
        </Hint>
      )
    ) : (
      inputSection
    );

    return (
      <InputContainer fullWidth={fullWidth}>
        {name
          ? items.map((token, index) => (
              <input
                key={`multi-hidden-${String(index)}-${token}`}
                type="hidden"
                name={name}
                value={token}
                readOnly
                aria-hidden
              />
            ))
          : null}
        {label ? (
          <Label htmlFor={inputId}>
            {label}
            {required ? <RequiredIndicator>*</RequiredIndicator> : null}
          </Label>
        ) : null}

        {additionalLabel ? <AdditionalLabel>{additionalLabel}</AdditionalLabel> : null}

        {withOptionalTooltip}

        {error ? <ErrorText>{error}</ErrorText> : null}
        {success ? <SuccessText>Успешно</SuccessText> : null}
        {helperText && !error && !success ? <HelperText>{helperText}</HelperText> : null}
        {extraText ? <ExtraText>{extraText}</ExtraText> : null}

        {showCounter && effectiveMaxLength ? (
          <CharacterCounter $isOverLimit={currentLength > effectiveMaxLength}>
            {currentLength}/{effectiveMaxLength}
          </CharacterCounter>
        ) : null}
      </InputContainer>
    );
  },
);

MultiInput.displayName = 'MultiInput';
