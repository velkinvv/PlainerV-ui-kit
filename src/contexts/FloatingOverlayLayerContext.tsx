import React, { createContext, useContext, useMemo } from 'react';

/** Контекст z-index и портала для всплывающих панелей внутри оверлея (Modal, Drawer, Sheet) */
export type FloatingOverlayLayerContextValue = {
  /** Нижняя граница z-index: панели должны быть строго выше этого значения */
  minimumZIndex: number;
  /** Корень портала (обычно `document.body` того же документа, что и оверлей) */
  portalRoot: HTMLElement | null;
};

const defaultFloatingOverlayLayerContextValue: FloatingOverlayLayerContextValue = {
  minimumZIndex: 0,
  portalRoot: null,
};

export const FloatingOverlayLayerContext = createContext<FloatingOverlayLayerContextValue>(
  defaultFloatingOverlayLayerContextValue,
);

export type FloatingOverlayLayerProviderProps = {
  /** z-index оверлейного компонента (Modal / Drawer / Sheet) */
  baseZIndex: number;
  /** Узел, куда смонтирован оверлей (для согласованного портала) */
  portalRoot?: HTMLElement | null;
  children: React.ReactNode;
};

/**
 * Оборачивает содержимое оверлея, чтобы вложенные Dropdown / Popover / DateInput
 * поднимали z-index и монтировали панели поверх текущего слоя.
 */
export const FloatingOverlayLayerProvider: React.FC<FloatingOverlayLayerProviderProps> = ({
  baseZIndex,
  portalRoot = null,
  children,
}) => {
  const parentLayer = useContext(FloatingOverlayLayerContext);

  const layerValue = useMemo<FloatingOverlayLayerContextValue>(() => {
    const resolvedPortalRoot =
      portalRoot ??
      parentLayer.portalRoot ??
      (typeof document !== 'undefined' ? document.body : null);

    return {
      minimumZIndex: Math.max(parentLayer.minimumZIndex, baseZIndex),
      portalRoot: resolvedPortalRoot,
    };
  }, [baseZIndex, parentLayer.minimumZIndex, parentLayer.portalRoot, portalRoot]);

  return (
    <FloatingOverlayLayerContext.Provider value={layerValue}>
      {children}
    </FloatingOverlayLayerContext.Provider>
  );
};

/**
 * Текущий оверлейный слой для всплывающих панелей.
 */
export function useFloatingOverlayLayer(): FloatingOverlayLayerContextValue {
  return useContext(FloatingOverlayLayerContext);
}
