import { useMemo, type CSSProperties } from 'react';

type UseOverlayPresentationParameters = {
  /**
   * Текущее состояние открытия оверлейного компонента.
   */
  isOpen: boolean;
  /**
   * Скрывать ли компонент, сохраняя его в DOM.
   */
  isHidden: boolean;
  /**
   * Базовые inline-стили оверлея.
   */
  overlayInlineStyle?: CSSProperties;
};

type UseOverlayPresentationResult = {
  /**
   * Финальные inline-стили для оверлея.
   */
  overlayPresentationStyle: CSSProperties | undefined;
  /**
   * Признак скрытия для accessibility.
   */
  ariaHidden: boolean;
};

/**
 * Единая логика presentation-слоя оверлея:
 * рассчитывает `style` и `aria-hidden` для закрытого состояния.
 * @param overlayPresentationParameters - параметры отображения оверлея
 */
export const useOverlayPresentation = (
  overlayPresentationParameters: UseOverlayPresentationParameters,
): UseOverlayPresentationResult => {
  const { isOpen, isHidden, overlayInlineStyle } = overlayPresentationParameters;

  const overlayPresentationStyle = useMemo(() => {
    if (!isHidden) {
      return overlayInlineStyle;
    }

    return { ...(overlayInlineStyle || {}), display: 'none' as const };
  }, [isHidden, overlayInlineStyle]);

  return {
    overlayPresentationStyle,
    ariaHidden: !isOpen,
  };
};
