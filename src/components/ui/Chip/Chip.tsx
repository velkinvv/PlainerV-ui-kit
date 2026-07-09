import React, {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { clsx } from 'clsx';
import { TooltipPosition, type ChipProps } from '../../../types/ui';
import { IconSize, Size } from '../../../types/sizes';
import { Badge } from '../Badge/Badge';
import { Icon } from '../Icon/Icon';
import { Tooltip } from '../Tooltip/Tooltip';
import { useChipGroupContext } from './ChipContext';
import {
  ChipBadgeSlot,
  ChipCloseButton,
  ChipIconSlot,
  ChipLabel,
  ChipRoot,
} from './Chip.style';
import {
  chipLengthToCss,
  getChipGeometry,
  isChipValueSelected,
  shouldShowChipBadge,
} from './handlers';

/**
 * Чип: компактная капсула с текстом, иконками, badge и опциональным удалением.
 * Внутри `Chips` участвует в выборе и клавиатурной навигации через context.
 *
 * @param props.children - Текст / контент
 * @param props.size - Размер (`SM` по умолчанию)
 * @param props.appearance - `filled` | `outline`
 * @param props.selected - Выбранное состояние (вне группы или переопределение)
 * @param props.disabled - Блокировка
 * @param props.leftIcon / rightIcon - Слоты иконок (`rightIcon` скрывается при `onClose`)
 * @param props.badge - Число справа от текста
 * @param props.onClose - Удаление (крестик)
 * @param props.onClick - Клик по чипу
 * @param props.value - Идентификатор в группе
 * @param props.tooltipWhenTruncated / tooltipContent - Тултип при ellipsis
 * @param props.maxWidth - Ограничение ширины
 * @param props.as - `span` | `button`
 * @param ref - Ref на корневой элемент
 */
export const Chip = forwardRef<HTMLElement, ChipProps>(
  (
    {
      children,
      size: sizeProp,
      appearance: appearanceProp,
      selected: selectedProp,
      disabled: disabledProp = false,
      leftIcon,
      rightIcon,
      badge,
      onClose,
      onClick,
      value,
      tooltipWhenTruncated = false,
      tooltipContent,
      maxWidth,
      as: asProp,
      className,
      role: roleProp,
      tabIndex: tabIndexProp,
      onKeyDown: onKeyDownProp,
      ...rest
    },
    ref,
  ) => {
    const groupContext = useChipGroupContext();
    const size = sizeProp ?? groupContext?.size ?? Size.SM;
    const appearance = appearanceProp ?? groupContext?.appearance ?? 'filled';
    const disabled = Boolean(disabledProp || groupContext?.disabled);
    const geometry = useMemo(() => getChipGeometry(size), [size]);
    const maxWidthCss = chipLengthToCss(maxWidth);

    const selectedFromGroup =
      groupContext != null && value != null
        ? isChipValueSelected(groupContext.selectionMode, groupContext.selectedValue, value)
        : false;
    const selected = selectedProp ?? selectedFromGroup;

    const isInSelectionGroup =
      groupContext != null && groupContext.selectionMode !== 'none' && value != null;
    const isGroupSelectable = isInSelectionGroup && !disabled;

    const clickable = Boolean(onClick || isGroupSelectable) && !disabled;
    /** При `onClose` корень не может быть `<button>` — внутри уже кнопка удаления */
    const useNativeButton =
      asProp === 'button' ||
      (asProp == null && !onClose && (clickable || isInSelectionGroup));
    const rootElement = asProp ?? (useNativeButton ? 'button' : 'span');

    const labelRef = useRef<HTMLSpanElement>(null);
    const rootElementRef = useRef<HTMLElement | null>(null);
    const [isTextTruncated, setIsTextTruncated] = useState(false);

    const setRootRef = useCallback(
      (element: HTMLElement | null) => {
        rootElementRef.current = element;
        if (typeof ref === 'function') {
          ref(element);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLElement | null>).current = element;
        }
        if (groupContext && value != null) {
          groupContext.registerChipFocusElement(value, element);
        }
      },
      [groupContext, ref, value],
    );

    useEffect(() => {
      if (!groupContext || value == null) {
        return;
      }
      return () => {
        groupContext.unregisterChipFocusElement(value);
      };
    }, [groupContext, value]);

    useLayoutEffect(() => {
      const labelElement = labelRef.current;
      if (!labelElement || !tooltipWhenTruncated) {
        setIsTextTruncated(false);
        return;
      }
      setIsTextTruncated(labelElement.scrollWidth > labelElement.clientWidth);
    }, [children, tooltipWhenTruncated, maxWidth, geometry.fontSize]);

    const handleSelectFromGroup = useCallback(() => {
      if (!isGroupSelectable || value == null || !groupContext) {
        return;
      }
      groupContext.onSelectChip(value);
    }, [groupContext, isGroupSelectable, value]);

    const handleClick = useCallback(
      (mouseEvent: React.MouseEvent<HTMLElement>) => {
        if (disabled) {
          mouseEvent.preventDefault();
          return;
        }
        handleSelectFromGroup();
        onClick?.(mouseEvent);
      },
      [disabled, handleSelectFromGroup, onClick],
    );

    const handleCloseClick = useCallback(
      (mouseEvent: React.MouseEvent<HTMLButtonElement>) => {
        mouseEvent.preventDefault();
        mouseEvent.stopPropagation();
        if (disabled) {
          return;
        }
        onClose?.(mouseEvent);
      },
      [disabled, onClose],
    );

    const handleKeyDown = useCallback(
      (keyboardEvent: React.KeyboardEvent<HTMLElement>) => {
        onKeyDownProp?.(keyboardEvent);
        if (keyboardEvent.defaultPrevented || disabled) {
          return;
        }

        if (
          groupContext &&
          value != null &&
          (keyboardEvent.key === 'ArrowRight' || keyboardEvent.key === 'ArrowLeft')
        ) {
          keyboardEvent.preventDefault();
          groupContext.focusChipByOffset(
            value,
            keyboardEvent.key === 'ArrowRight' ? 1 : -1,
          );
          return;
        }

        if (!clickable || useNativeButton) {
          return;
        }

        if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
          keyboardEvent.preventDefault();
          rootElementRef.current?.click();
        }
      },
      [clickable, disabled, groupContext, onKeyDownProp, useNativeButton, value],
    );

    const selectionMode = groupContext?.selectionMode ?? 'none';
    let resolvedRole = roleProp;
    if (resolvedRole == null && isInSelectionGroup) {
      resolvedRole = selectionMode === 'single' ? 'radio' : 'button';
    } else if (resolvedRole == null && clickable && !useNativeButton) {
      resolvedRole = 'button';
    }

    const tabIndex =
      tabIndexProp ??
      (disabled
        ? -1
        : isGroupSelectable || (clickable && !useNativeButton)
          ? 0
          : undefined);

    const showBadge = shouldShowChipBadge(badge);
    const showRightIcon = Boolean(rightIcon) && !onClose;
    const closeAriaLabel =
      typeof children === 'string' || typeof children === 'number'
        ? `Удалить «${children}»`
        : 'Удалить';

    const padding = onClose ? geometry.paddingWithClose : geometry.padding;
    /** Обрезка текста всегда: корень ограничен max-width (по умолчанию 100%) */
    const ellipsisActive = true;

    const ariaChecked =
      selectionMode === 'single' && isInSelectionGroup ? selected : undefined;
    const ariaPressed =
      selectionMode === 'multiple' && isInSelectionGroup ? selected : undefined;

    const chipInner = (
      <ChipRoot
        ref={setRootRef}
        {...rest}
        as={rootElement}
        {...(useNativeButton ? { type: 'button' as const, disabled } : {})}
        role={resolvedRole}
        tabIndex={tabIndex}
        aria-disabled={useNativeButton ? undefined : disabled || undefined}
        aria-checked={ariaChecked}
        aria-pressed={ariaPressed}
        data-selected={selected || undefined}
        data-value={value}
        onClick={clickable ? handleClick : undefined}
        onKeyDown={handleKeyDown}
        $appearance={appearance}
        $selected={selected}
        $clickable={clickable}
        $disabled={disabled}
        $padding={padding}
        $gap={geometry.gap}
        $fontSize={geometry.fontSize}
        $minHeight={geometry.minHeight}
        $maxWidthCss={maxWidthCss}
        className={clsx('ui-chip', className)}
      >
        {leftIcon ? <ChipIconSlot aria-hidden>{leftIcon}</ChipIconSlot> : null}
        {children != null && children !== false ? (
          <ChipLabel ref={labelRef} $ellipsis={ellipsisActive} title={typeof children === 'string' ? children : undefined}>
            {children}
          </ChipLabel>
        ) : null}
        {showBadge ? (
          <ChipBadgeSlot>
            <Badge size={Size.XS}>{badge}</Badge>
          </ChipBadgeSlot>
        ) : null}
        {showRightIcon ? <ChipIconSlot aria-hidden>{rightIcon}</ChipIconSlot> : null}
        {onClose ? (
          <ChipCloseButton
            type="button"
            disabled={disabled}
            aria-label={closeAriaLabel}
            $sizePx={geometry.closeButtonSize}
            onMouseDown={(mouseEvent) => {
              mouseEvent.preventDefault();
              mouseEvent.stopPropagation();
            }}
            onClick={handleCloseClick}
          >
            <Icon name="IconExClose" size={IconSize.XS} color="currentColor" />
          </ChipCloseButton>
        ) : null}
      </ChipRoot>
    );

    const tooltipBody: React.ReactNode =
      tooltipContent ??
      (typeof children === 'string' || typeof children === 'number' ? children : null);
    const hasTooltipPayload =
      tooltipBody != null && (typeof tooltipBody !== 'string' || tooltipBody.length > 0);
    const showTruncationTooltip = tooltipWhenTruncated && isTextTruncated && hasTooltipPayload;

    if (!tooltipWhenTruncated) {
      return chipInner;
    }

    return (
      <Tooltip
        content={tooltipBody ?? ''}
        position={TooltipPosition.TOP}
        disabled={!showTruncationTooltip}
      >
        {chipInner}
      </Tooltip>
    );
  },
);

Chip.displayName = 'Chip';
