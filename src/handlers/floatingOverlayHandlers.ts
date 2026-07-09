import { ZIndexHandler } from './uiHandlers';

/** Базовый z-index всплывающих панелей, если в теме dropdown не задан свой */
export const DEFAULT_FLOATING_OVERLAY_Z_INDEX = ZIndexHandler('popover');

/**
 * Возвращает z-index всплывающей панели выше модального оверлея и темы dropdown.
 * @param layerMinimumZIndex - минимум из {@link FloatingOverlayLayerContext} (0 — только тема)
 * @param themeDropdownZIndex - `theme.dropdowns.settings.zIndex`
 */
export function resolveFloatingOverlayZIndex(
  layerMinimumZIndex: number,
  themeDropdownZIndex?: number,
): number {
  const themeOrDefault = themeDropdownZIndex ?? DEFAULT_FLOATING_OVERLAY_Z_INDEX;

  if (layerMinimumZIndex <= 0) {
    return Math.max(themeOrDefault, DEFAULT_FLOATING_OVERLAY_Z_INDEX);
  }

  return Math.max(themeOrDefault, layerMinimumZIndex + 10);
}

/**
 * Узел для `createPortal`: `document.body`, если не передан явный контейнер.
 * @param explicitPortalRoot - проп `portalContainer` компонента
 * @param layerPortalRoot - корень из контекста оверлейного слоя
 */
export function resolveFloatingOverlayPortalRoot(
  explicitPortalRoot?: HTMLElement | null,
  layerPortalRoot?: HTMLElement | null,
): HTMLElement | null {
  if (explicitPortalRoot) {
    return explicitPortalRoot;
  }

  if (layerPortalRoot) {
    return layerPortalRoot;
  }

  if (typeof document === 'undefined') {
    return null;
  }

  return document.body;
}
