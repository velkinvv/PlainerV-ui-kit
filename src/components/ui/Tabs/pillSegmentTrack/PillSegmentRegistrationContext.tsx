import { createContext, useContext } from 'react';

/** Регистрация кнопки сегмента pill-трека для расчёта позиции «капли» */
export interface PillSegmentRegistrationContextValue {
  /** Учитывается только при активном pill-треке; иначе без эффекта */
  registerSegmentTriggerRef: (segmentValue: string, element: HTMLElement | null) => void;
}

const noopRegisterSegmentTriggerRef = (_segmentValue: string, _element: HTMLElement | null) => {};

const defaultPillSegmentRegistrationValue: PillSegmentRegistrationContextValue = {
  registerSegmentTriggerRef: noopRegisterSegmentTriggerRef,
};

export const PillSegmentRegistrationContext =
  createContext<PillSegmentRegistrationContextValue>(defaultPillSegmentRegistrationValue);

/**
 * Регистрация триггера сегмента (внутри TabItemGroupList в режиме pill).
 * Вне трека возвращает безопасную заглушку.
 */
export function usePillSegmentRegistration(): PillSegmentRegistrationContextValue {
  return useContext(PillSegmentRegistrationContext);
}
