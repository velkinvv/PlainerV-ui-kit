import React, { forwardRef, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { clsx } from 'clsx';
import type { TagColorVariant, TagProps } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import { Tooltip } from '../Tooltip/Tooltip';
import { TooltipPosition } from '../../../types/ui';
import { TagRoot, TagIconSlot, TagLabel, TagStatusMarker } from './Tag.style';
import { TagSkeletonRoot } from './TagSkeleton.style';
import { getTagMetrics, getTagSkeletonDefaultWidthPx, tagLengthToCss } from './handlers';

/**
 * Тег из макета Figma: палитра темы, режимы **surface** / **marker**, кастомные цвета.
 * палитра × filled/outline, режим **surface** / **marker** (цветной кружок), кастомные цвета поверхности,
 * ширина, тултип при переполнении, полиморфный корень (`as="button"`).
 *
 * @param props.children - Текст
 * @param props.colorVariant — Цветовая схема (`primary` — основной акцент темы)
 * @param props.appearance - Заливка или обводка
 * @param props.statusDisplay - `surface` — красим всю пилюлю; `marker` — нейтральный фон и цветной маркер слева
 * @param props.size - Размер (по умолчанию SM)
 * @param props.leftIcon / rightIcon - Слоты под иконки
 * @param props.onClick - Кликабельность; при `as="button"` — нативная кнопка
 * @param props.disabled - Блокировка
 * @param props.skeleton / skeletonWidth - Плейсхолдер загрузки
 * @param props.width / maxWidth - Габариты
 * @param props.as - `span` | `button` | `div`
 * @param props.customColors — Фон/бордер/hover/текст (`background` включает полностью кастомную пилюлю); `marker` — цвет кружка в режиме `statusDisplay="marker"`
 * @param props.hideBorder - Скрыть обводку
 * @param props.tooltipWhenTruncated / tooltipContent - Тултип при ellipsis
 * @param ref - Ref на корневой элемент
 */
export const Tag = forwardRef<HTMLElement, TagProps>(
  (
    {
      children,
      colorVariant = 'neutral',
      appearance = 'filled',
      statusDisplay: statusDisplayProp = 'surface',
      size = Size.SM,
      leftIcon,
      rightIcon,
      onClick,
      disabled = false,
      skeleton = false,
      skeletonWidth,
      width,
      maxWidth,
      as: rootElement = 'span',
      customColors,
      hideBorder = false,
      tooltipWhenTruncated = false,
      tooltipContent,
      className,
      role: roleProp,
      tabIndex: tabIndexProp,
      onKeyDown: onKeyDownProp,
      ...rest
    },
    ref,
  ) => {
    const metrics = useMemo(() => getTagMetrics(size), [size]);

    /** Полная кастомная заливка пилюли — только при заданном `background` */
    const hasFullCustomChip = Boolean(customColors?.background);
    const statusDisplay = hasFullCustomChip ? 'surface' : statusDisplayProp;
    /** Для палитры темы: `custom` без своих цветов трактуем как нейтральный */
    const paletteColorVariant: TagColorVariant =
      colorVariant === 'custom' && !hasFullCustomChip ? 'neutral' : colorVariant;

    const widthCss = tagLengthToCss(width);
    const maxWidthCss = tagLengthToCss(maxWidth);
    const labelRef = useRef<HTMLSpanElement>(null);
    const [isTextTruncated, setIsTextTruncated] = useState(false);

    useLayoutEffect(() => {
      const element = labelRef.current;
      if (!element || !tooltipWhenTruncated) {
        setIsTextTruncated(false);
        return;
      }
      setIsTextTruncated(element.scrollWidth > element.clientWidth);
    }, [children, tooltipWhenTruncated, maxWidth, width, metrics.fontSize]);

    const useNativeButton = rootElement === 'button';
    const clickable = Boolean(onClick) && !disabled;
    const showMarker = statusDisplay === 'marker';

    const role = roleProp ?? (clickable && !useNativeButton ? 'button' : undefined);
    const tabIndex = tabIndexProp ?? (clickable && !useNativeButton ? 0 : undefined);

    const handleKeyDown = useCallback(
      (keyboardEvent: React.KeyboardEvent<HTMLElement>) => {
        onKeyDownProp?.(keyboardEvent as React.KeyboardEvent<HTMLSpanElement>);
        if (keyboardEvent.defaultPrevented || !clickable || !onClick || useNativeButton) {
          return;
        }
        if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
          keyboardEvent.preventDefault();
          (keyboardEvent.currentTarget as HTMLElement).click();
        }
      },
      [clickable, onClick, onKeyDownProp, useNativeButton],
    );

    const handleClick = useCallback(
      (mouseEvent: React.MouseEvent<HTMLElement>) => {
        if (disabled) {
          mouseEvent.preventDefault();
          return;
        }
        onClick?.(mouseEvent as React.MouseEvent<HTMLSpanElement>);
      },
      [disabled, onClick],
    );

    if (skeleton) {
      const widthPx = skeletonWidth ?? getTagSkeletonDefaultWidthPx(size);
      return (
        <TagSkeletonRoot
          ref={ref as React.Ref<HTMLSpanElement>}
          {...rest}
          className={clsx('ui-tag', 'ui-tag--skeleton', className)}
          aria-busy="true"
          $minHeight={metrics.minHeight}
          $widthPx={widthPx}
        />
      );
    }

    const ellipsisActive = Boolean(widthCss ?? maxWidthCss);

    const tagInner = (
      <TagRoot
        ref={ref}
        {...rest}
        as={rootElement}
        {...(useNativeButton ? { type: 'button' as const, disabled } : {})}
        role={role}
        tabIndex={tabIndex}
        onClick={onClick ? handleClick : undefined}
        onKeyDown={clickable && !useNativeButton ? handleKeyDown : onKeyDownProp}
        aria-disabled={useNativeButton ? undefined : disabled || undefined}
        $color={paletteColorVariant}
        $appearance={appearance}
        $statusDisplay={statusDisplay}
        $clickable={clickable}
        $disabled={disabled}
        $padding={metrics.padding}
        $gap={metrics.gap}
        $fontSize={metrics.fontSize}
        $minHeight={metrics.minHeight}
        $widthCss={widthCss}
        $maxWidthCss={maxWidthCss}
        $hideBorder={hideBorder}
        $customSurface={customColors ?? null}
        className={clsx('ui-tag', className)}
      >
        {showMarker ? (
          <TagStatusMarker
            $markerColor={paletteColorVariant}
            $markerFill={customColors?.marker}
            aria-hidden
          />
        ) : null}
        {leftIcon ? <TagIconSlot aria-hidden>{leftIcon}</TagIconSlot> : null}
        {children ? (
          <TagLabel ref={labelRef} $ellipsis={ellipsisActive}>
            {children}
          </TagLabel>
        ) : null}
        {rightIcon ? <TagIconSlot aria-hidden>{rightIcon}</TagIconSlot> : null}
      </TagRoot>
    );

    const tooltipBody: React.ReactNode =
      tooltipContent ??
      (typeof children === 'string' || typeof children === 'number' ? children : null);
    const hasTooltipPayload =
      tooltipBody != null && (typeof tooltipBody !== 'string' || tooltipBody.length > 0);
    const showTruncationTooltip = tooltipWhenTruncated && isTextTruncated && hasTooltipPayload;

    if (!tooltipWhenTruncated) {
      return tagInner;
    }

    return (
      <Tooltip
        content={tooltipBody ?? ''}
        position={TooltipPosition.TOP}
        disabled={!showTruncationTooltip}
      >
        {tagInner}
      </Tooltip>
    );
  },
);

Tag.displayName = 'Tag';
