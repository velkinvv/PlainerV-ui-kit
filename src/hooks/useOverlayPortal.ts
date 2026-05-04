import { useMemo } from 'react';
import type { CSSProperties } from 'react';
import { getModalMountNode } from '../components/ui/Modal/handlers';

type UseOverlayPortalParameters = {
  /**
   * Контейнер для портала. Если не задан, используется `portalTargetId`, далее `document.body`.
   */
  container?: Element | null;
  /**
   * ID контейнера для портала.
   */
  portalTargetId?: string;
  /**
   * Inline-стили оверлея.
   */
  overlayStyle?: CSSProperties;
  /**
   * Принудительный z-index, добавляемый поверх `overlayStyle`.
   */
  portalZIndex?: number;
};

type UseOverlayPortalResult = {
  /**
   * Узел, в который монтируется портал.
   */
  mountNode: Element | null;
  /**
   * Готовые inline-стили оверлея с учётом `portalZIndex`.
   */
  overlayInlineStyle: CSSProperties | undefined;
};

/**
 * Единая логика для порталов оверлейных компонентов.
 * @param overlayPortalParameters - параметры контейнера и стилей портала
 */
export const useOverlayPortal = (
  overlayPortalParameters: UseOverlayPortalParameters,
): UseOverlayPortalResult => {
  const {
    container,
    portalTargetId,
    overlayStyle,
    portalZIndex,
  } = overlayPortalParameters;

  const mountNode = useMemo(
    () => getModalMountNode(container, portalTargetId),
    [container, portalTargetId],
  );

  const overlayInlineStyle = useMemo(() => {
    if (portalZIndex === undefined) {
      return overlayStyle;
    }

    return { ...(overlayStyle || {}), zIndex: portalZIndex };
  }, [overlayStyle, portalZIndex]);

  return { mountNode, overlayInlineStyle };
};
