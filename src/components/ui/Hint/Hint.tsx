import React, { useState, useRef, useCallback, useMemo, forwardRef, useId, useEffect } from 'react';
import { AnchorWrapper, HintContent as StyledHintContent } from './Hint.style';
import { createPortal } from 'react-dom';
import { clsx } from 'clsx';
import {
  HintPosition,
  HintVariant,
  HintVisibilityTrigger,
  HintAnimationPreset,
  type HintProps,
  type HintPositioningMode,
} from '../../../types/ui';
import { Size } from '../../../types/sizes';
import {
  calculateHintPosition,
  createHintEventHandlers,
  createShowHint,
  createHideHint,
  type HintState,
} from './handlers';
import { validateHintProps, determineHintMode, calculateIsOpenValue } from './utils';
import { HintContent } from './HintContent';
import { HintTrigger } from './HintTrigger';
import {
  useHintClickOutside,
  useHintScrollPosition,
  useHintControlledState,
  useHintCleanup,
} from './useHintEffects';

// Реэкспорт типов для удобства импорта
export {
  HintPosition,
  HintVariant,
  HintVisibilityTrigger,
  type HintProps,
  type HintPositioningMode,
};

// HintState импортируется из handlers

export const Hint = forwardRef<HTMLDivElement, HintProps>(
  (
    {
      children,
      content,
      placement = HintPosition.TOP,
      size = Size.MD,
      maxWidth = 300,
      delay = 500,
      variant = HintVariant.DEFAULT,
      visibilityTrigger = HintVisibilityTrigger.HOVER,
      positioningMode = 'default',
      isOpen,
      defaultOpen,
      onOpenChange,
      showArrow = false,
      closeOnScroll = false,
      renderContent,
      contentClassName,
      allowHTML = false,
      icon,
      actions,
      footer,
      animationPreset = HintAnimationPreset.FADE,
      animationDuration,
      zIndex,
      hintGroup,
      loading = false,
      renderLoading,
      tourStep,
      tourTotalSteps,
      onTourNext,
      onTourPrev,
      showTourControls = false,
      boundaryElement,
      boundaryOffset = 8,
      virtualize = false,
      mobile = false,
      onVisibilityChange,
      onHintClick,
      className,
      anchorClassName,
      anchorId,
      anchorCssMixin,
      ...props
    },
    _ref,
  ) => {
    // Валидация пропсов
    validateHintProps({ isOpen, defaultOpen });

    // Определяем режим работы
    const { isControlled, isUncontrolled, useControlledMode } = determineHintMode(
      isOpen,
      defaultOpen,
    );

    // Внутреннее состояние для неконтролируемого режима
    const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen ?? false);

    // Финальное значение видимости
    const isOpenValue = calculateIsOpenValue(isControlled, isUncontrolled, isOpen, internalIsOpen);

    const [hintState, setHintState] = useState<HintState>({
      isVisible: false,
      position: { x: 0, y: 0 },
      placement,
    });

    const triggerRef = useRef<HTMLDivElement>(null);
    const hintContentRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout>();
    const hideTimeoutRef = useRef<NodeJS.Timeout>();
    const isVisibleRef = useRef(false); // Для отслеживания реальной видимости
    const hintId = useId(); // Уникальный ID для hint (для aria-describedby)

    // Функция для вычисления позиции hint с учетом режима позиционирования
    // Для position: fixed используем координаты viewport (без scroll)
    const calculatePosition = useCallback(() => {
      const result = calculateHintPosition({
        triggerElement: triggerRef.current,
        hintElement: hintContentRef.current,
        placement,
        offset: 8,
        mode: positioningMode,
        boundaryElement,
        boundaryOffset,
      });
      return result;
    }, [placement, positioningMode, boundaryElement, boundaryOffset]);

    // Функция для изменения состояния открытия
    const handleOpenChange = useCallback(
      (newIsOpen: boolean) => {
        if (!isControlled && isUncontrolled) {
          setInternalIsOpen(newIsOpen);
        }
        onOpenChange?.(newIsOpen);
      },
      [isControlled, isUncontrolled, onOpenChange],
    );

    // Создаем функции для показа и скрытия hint через handlers
    const showHint = useCallback(() => {
      const fn = createShowHint({
        useControlledMode,
        handleOpenChange,
        triggerRef,
        calculatePosition,
        setHintState,
        timeoutRef,
        isVisibleRef,
        visibilityTrigger,
        delay,
        onVisibilityChange,
        hintGroup,
      });
      fn();
    }, [
      useControlledMode,
      handleOpenChange,
      calculatePosition,
      delay,
      visibilityTrigger,
      onVisibilityChange,
      hintGroup,
    ]);

    const hideHint = useCallback(() => {
      const fn = createHideHint({
        useControlledMode,
        handleOpenChange,
        timeoutRef,
        hideTimeoutRef,
        setHintState,
        isVisibleRef,
        onVisibilityChange,
      });
      fn();
    }, [useControlledMode, handleOpenChange, onVisibilityChange]);

    // Создаем обработчики событий через функцию из handlers
    const eventHandlers = useMemo(
      () =>
        createHintEventHandlers({
          visibilityTrigger,
          useControlledMode,
          isOpenValue,
          hintStateIsVisible: hintState.isVisible,
          showHint,
          hideHint,
          hideTimeoutRef,
        }),
      [visibilityTrigger, useControlledMode, isOpenValue, hintState.isVisible, showHint, hideHint],
    );

    // Вычисляем видимость для эффектов
    const isVisible =
      useControlledMode && isOpenValue !== undefined ? isOpenValue : hintState.isVisible;

    // Обработка клика вне hint и target элемента (для click режима)
    useHintClickOutside({
      isVisible,
      visibilityTrigger,
      triggerRef,
      hintContentRef,
      hideHint,
      hintStateIsVisible: hintState.isVisible,
    });

    // Синхронизация состояния в контролируемом/неконтролируемом режиме
    useHintControlledState({
      isOpenValue,
      useControlledMode,
      triggerRef,
      calculatePosition,
      setHintState,
      isVisibleRef,
      onVisibilityChange,
    });

    // Обновление позиции при прокрутке и изменении размера окна
    useHintScrollPosition({
      isVisible,
      triggerRef,
      calculatePosition,
      setHintState,
      closeOnScroll,
      hideHint,
      hintStatePlacement: hintState.placement,
    });

    // Очистка таймеров при размонтировании
    useHintCleanup(timeoutRef, hideTimeoutRef);

    // Обработка событий завершения анимаций для Storybook
    useEffect(() => {
      const hintElement = hintContentRef.current;
      if (!hintElement) return;

      // Обработчик для события завершения transition
      const handleTransitionEnd = (event: TransitionEvent) => {
        // Игнорируем события от дочерних элементов
        if (event.target !== hintElement) return;
        // Добавляем атрибут для Storybook, чтобы он знал, что анимация завершена
        hintElement.setAttribute('data-animation-complete', 'true');
      };

      hintElement.addEventListener('transitionend', handleTransitionEnd);

      return () => {
        hintElement.removeEventListener('transitionend', handleTransitionEnd);
        hintElement.removeAttribute('data-animation-complete');
      };
    }, [hintContentRef, hintState.isVisible]);

    return (
      <>
        <AnchorWrapper
          id={anchorId}
          className={clsx('ui-hint-anchor', anchorClassName)}
          $anchorCssMixin={anchorCssMixin}
        >
          <HintTrigger
            triggerRef={triggerRef}
            tourStep={tourStep}
            visibilityTrigger={visibilityTrigger}
            onMouseEnter={eventHandlers.handleMouseEnter}
            onMouseLeave={eventHandlers.handleMouseLeave}
            onFocus={eventHandlers.handleFocus}
            onBlur={eventHandlers.handleBlur}
            onClick={eventHandlers.handleClick}
            onKeyDown={eventHandlers.handleKeyDown}
            className={className}
            {...props}
          >
            {children}
          </HintTrigger>
        </AnchorWrapper>

        {createPortal(
          <StyledHintContent
            ref={hintContentRef}
            id={hintId}
            data-hint-group={hintGroup}
            role="tooltip"
            aria-live="polite"
            aria-hidden={
              !(useControlledMode && isOpenValue !== undefined ? isOpenValue : hintState.isVisible)
            }
            $size={size}
            $isVisible={
              useControlledMode && isOpenValue !== undefined ? isOpenValue : hintState.isVisible
            }
            $position={hintState.position}
            $placement={hintState.placement}
            $maxWidth={maxWidth}
            $variant={variant}
            $clickable={
              !!onHintClick ||
              (tourStep !== undefined && (showTourControls || !!onTourNext || !!onTourPrev))
            }
            $showArrow={showArrow}
            $animationPreset={animationPreset}
            $animationDuration={animationDuration}
            $zIndex={zIndex}
            $mobile={mobile}
            onMouseEnter={eventHandlers.handleHintMouseEnter}
            onMouseLeave={eventHandlers.handleHintMouseLeave}
            onClick={onHintClick}
          >
            <HintContent
              loading={loading}
              renderLoading={renderLoading}
              content={content}
              renderContent={renderContent}
              allowHTML={allowHTML}
              contentClassName={contentClassName}
              virtualize={virtualize}
              icon={icon}
              actions={actions}
              footer={footer}
              tourStep={tourStep}
              tourTotalSteps={tourTotalSteps}
              onTourNext={onTourNext}
              onTourPrev={onTourPrev}
              showTourControls={showTourControls}
              visibilityTrigger={visibilityTrigger}
              onCloseClick={eventHandlers.handleCloseClick}
            />
          </StyledHintContent>,
          document.body,
        )}
      </>
    );
  },
);

Hint.displayName = 'Hint';
