import { createContext, useContext, type Dispatch, type SetStateAction } from 'react';
import {
  FloatingMenuGroupVariant,
  FloatingMenuOrientation,
  type FloatingMenuDragSource,
} from '@/types/ui';

/** Контекст корня плавающего меню */
export interface FloatingMenuRootContextValue {
  draggable: boolean;
  dragSource: FloatingMenuDragSource;
  zIndex: number;
  orientation: FloatingMenuOrientation;
  /** Включён режим dynamicSize */
  dynamicSize: boolean;
  /** CSS max-width / max-height для dynamicSize */
  dynamicSizeMaxCss?: string;
  /** Блокировка overflow на время size-анимации */
  sizeAnimating: boolean;
  openDropdownId: string | null;
  setOpenDropdownId: Dispatch<SetStateAction<string | null>>;
  hasDragHandle: boolean;
  setHasDragHandle: (v: boolean) => void;
  registerGroupItemCount: (groupId: string, itemCount: number) => void;
  unregisterGroupItemCount: (groupId: string) => void;
  endSizeAnimation: () => void;
}

export const FloatingMenuRootContext = createContext<FloatingMenuRootContextValue | undefined>(
  undefined,
);

export const useFloatingMenuRootContext = (): FloatingMenuRootContextValue => {
  const contextValue = useContext(FloatingMenuRootContext);
  if (!contextValue) {
    throw new Error('Компоненты FloatingMenu.* должны находиться внутри FloatingMenu');
  }
  return contextValue;
};

/** Контекст группы (default / inset) */
export interface FloatingMenuGroupContextValue {
  variant: FloatingMenuGroupVariant;
}

export const FloatingMenuGroupContext = createContext<FloatingMenuGroupContextValue>({
  variant: FloatingMenuGroupVariant.DEFAULT,
});

export const useFloatingMenuGroupContext = (): FloatingMenuGroupContextValue =>
  useContext(FloatingMenuGroupContext);
