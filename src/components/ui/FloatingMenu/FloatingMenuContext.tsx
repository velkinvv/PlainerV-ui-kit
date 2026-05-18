import { createContext, useContext, type Dispatch, type SetStateAction } from 'react';
import { FloatingMenuGroupVariant, type FloatingMenuDragSource } from '@/types/ui';

/** Контекст корня плавающего меню */
export interface FloatingMenuRootContextValue {
  draggable: boolean;
  dragSource: FloatingMenuDragSource;
  zIndex: number;
  /** id открытого выпадающего пункта (для взаимного закрытия) */
  openDropdownId: string | null;
  setOpenDropdownId: Dispatch<SetStateAction<string | null>>;
  /** Зарегистрирован ли дочерний DragHandle (для режима HANDLE) */
  hasDragHandle: boolean;
  setHasDragHandle: (v: boolean) => void;
}

export const FloatingMenuRootContext = createContext<FloatingMenuRootContextValue | undefined>(
  undefined,
);

export const useFloatingMenuRootContext = (): FloatingMenuRootContextValue => {
  const ctx = useContext(FloatingMenuRootContext);
  if (!ctx) {
    throw new Error('Компоненты FloatingMenu.* должны находиться внутри FloatingMenu');
  }
  return ctx;
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
