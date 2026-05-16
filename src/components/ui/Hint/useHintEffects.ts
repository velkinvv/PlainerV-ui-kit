import {
  useEffect,
  type Dispatch,
  type MutableRefObject,
  type RefObject,
  type SetStateAction,
} from 'react';
import { HintVisibilityTrigger, type HintPosition } from '../../../types/ui';
import {
  createClickOutsideHandler,
  createScrollHandler,
  findScrollableParents,
  createUpdatePosition,
  syncControlledState,
  type HintState,
} from './handlers';

/**
 * Опции для хука useHintClickOutside
 */
export interface UseHintClickOutsideOptions {
  isVisible: boolean;
  visibilityTrigger: HintVisibilityTrigger;
  triggerRef: RefObject<HTMLDivElement>;
  hintContentRef: RefObject<HTMLDivElement>;
  hideHint: () => void;
  hintStateIsVisible: boolean;
}

/**
 * Хук для обработки клика вне hint
 */
export const useHintClickOutside = ({
  isVisible,
  visibilityTrigger,
  triggerRef,
  hintContentRef,
  hideHint,
  hintStateIsVisible,
}: UseHintClickOutsideOptions) => {
  useEffect(() => {
    if (!isVisible || visibilityTrigger !== HintVisibilityTrigger.CLICK) return;

    const handleClickOutside = createClickOutsideHandler({
      triggerRef,
      hintContentRef,
      hideHint,
    });

    // Обработка Escape для закрытия hint
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && hintStateIsVisible) {
        hideHint();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isVisible, visibilityTrigger, triggerRef, hintContentRef, hideHint, hintStateIsVisible]);
};

/**
 * Опции для хука useHintScrollPosition
 */
export interface UseHintScrollPositionOptions {
  isVisible: boolean;
  triggerRef: RefObject<HTMLDivElement>;
  calculatePosition: () => { x: number; y: number; placement: HintPosition };
  setHintState: Dispatch<SetStateAction<HintState>>;
  closeOnScroll: boolean;
  hideHint: () => void;
  hintStatePlacement: HintPosition;
}

/**
 * Хук для обновления позиции hint при прокрутке
 */
export const useHintScrollPosition = ({
  isVisible,
  triggerRef,
  calculatePosition,
  setHintState,
  closeOnScroll,
  hideHint,
  hintStatePlacement,
}: UseHintScrollPositionOptions) => {
  useEffect(() => {
    if (!isVisible) return;

    const updatePosition = createUpdatePosition({
      triggerRef,
      calculatePosition,
      setHintState,
    });

    // Обработчик прокрутки: обновляем позицию или закрываем hint
    const scrollableParents = findScrollableParents(triggerRef.current);
    const handleScroll = createScrollHandler({
      closeOnScroll,
      updatePosition,
      hideHint,
      scrollableParents,
    });

    window.addEventListener('scroll', handleScroll, true);
    document.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', updatePosition);

    scrollableParents.forEach((parent) => {
      parent.addEventListener('scroll', handleScroll, true);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      document.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', updatePosition);
      scrollableParents.forEach((parent) => {
        parent.removeEventListener('scroll', handleScroll, true);
      });
    };
  }, [
    isVisible,
    triggerRef,
    calculatePosition,
    setHintState,
    closeOnScroll,
    hideHint,
    hintStatePlacement,
  ]);
};

/**
 * Опции для хука useHintControlledState
 */
export interface UseHintControlledStateOptions {
  isOpenValue: boolean | undefined;
  useControlledMode: boolean;
  triggerRef: RefObject<HTMLDivElement>;
  calculatePosition: () => { x: number; y: number; placement: HintPosition };
  setHintState: Dispatch<SetStateAction<HintState>>;
  isVisibleRef: MutableRefObject<boolean>;
  onVisibilityChange?: (visible: boolean) => void;
}

/**
 * Хук для синхронизации состояния в контролируемом режиме
 */
export const useHintControlledState = ({
  isOpenValue,
  useControlledMode,
  triggerRef,
  calculatePosition,
  setHintState,
  isVisibleRef,
  onVisibilityChange,
}: UseHintControlledStateOptions) => {
  useEffect(() => {
    if (isOpenValue === undefined) return;
    syncControlledState({
      isOpenValue,
      useControlledMode,
      triggerRef,
      calculatePosition,
      setHintState,
      isVisibleRef,
      onVisibilityChange,
    });
  }, [
    isOpenValue,
    useControlledMode,
    triggerRef,
    calculatePosition,
    setHintState,
    isVisibleRef,
    onVisibilityChange,
  ]);
};

/**
 * Хук для очистки таймеров при размонтировании
 */
export const useHintCleanup = (
  timeoutRef: MutableRefObject<NodeJS.Timeout | undefined>,
  hideTimeoutRef: MutableRefObject<NodeJS.Timeout | undefined>,
) => {
  useEffect(() => {
    const timeout = timeoutRef;
    const hideTimeout = hideTimeoutRef;
    return () => {
      const activeTimeoutId = timeout.current;
      const activeHideTimeoutId = hideTimeout.current;
      if (activeTimeoutId) {
        clearTimeout(activeTimeoutId);
      }
      if (activeHideTimeoutId) {
        clearTimeout(activeHideTimeoutId);
      }
    };
  }, [timeoutRef, hideTimeoutRef]);
};
