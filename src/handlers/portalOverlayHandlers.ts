/**
 * Утилиты для портала в `window.top` (same-origin iframe). Не подключать к `Dropdown` / `Hint` /
 * `Tooltip` со styled-components без отдельного влива стилей в `top.document`: классы рендерятся
 * в другом документе, а `<style>` остаётся в документе iframe — панель получается без стилей.
 * Оставлено для точечных сценариев (нативный DOM, отдельный `StyleSheetManager` target и т.д.).
 */

export type OverlayPortalHost = {
  /** Узел, в который передаётся второй аргумент `createPortal` */
  root: HTMLElement;
  /** Viewport для `position: fixed` и `innerWidth` / `innerHeight` при расчёте позиции */
  view: Window;
};

/**
 * Возвращает `body` и окно viewport для оверлеев.
 * При недоступном `window.top` (cross-origin) — текущий документ.
 */
export function resolveOverlayPortalHost(): OverlayPortalHost {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return { root: undefined as unknown as HTMLElement, view: undefined as unknown as Window };
  }
  try {
    const topWindow = window.top;
    if (topWindow && topWindow !== window && topWindow.document?.body) {
      return { root: topWindow.document.body, view: topWindow };
    }
  } catch {
    /* cross-origin: доступ к top.document запрещён */
  }
  return { root: document.body, view: window };
}

/**
 * Прямоугольник элемента в координатах viewport целевого окна `view`
 * (если элемент в дочернем iframe, добавляется смещение `frameElement` в родителе).
 * @param element - DOM-узел (триггер, меню и т.д.)
 * @param view - окно, в чьём viewport нужны координаты (обычно `resolveOverlayPortalHost().view`)
 */
export function getClientRectInViewPort(element: HTMLElement, view: Window): DOMRect {
  const elementDocument = element.ownerDocument;
  const elementWindow = elementDocument?.defaultView;
  if (!elementWindow || elementWindow === view) {
    return element.getBoundingClientRect();
  }
  const frameElement = elementWindow.frameElement as HTMLElement | null;
  if (!frameElement || frameElement.ownerDocument !== view.document) {
    return element.getBoundingClientRect();
  }
  const innerRect = element.getBoundingClientRect();
  const frameRect = frameElement.getBoundingClientRect();
  return new DOMRect(
    innerRect.left + frameRect.left,
    innerRect.top + frameRect.top,
    innerRect.width,
    innerRect.height,
  );
}

/**
 * Документы, на которых в capture-фазе стоит слушать `mousedown` / `touchstart` для «клик вне»
 * (триггер в iframe, оверлей в `top` — события по родителю не попадают в `iframe.document`).
 * @param triggerElement - якорь (может быть `null` до маунта)
 * @param portalRoot - узел, куда смонтирован портал (`body` и т.п.)
 */
export function collectOverlayPointerDocuments(
  triggerElement: HTMLElement | null,
  portalRoot: HTMLElement,
): Document[] {
  const documents: Document[] = [];
  const push = (doc: Document | null | undefined) => {
    if (doc && !documents.includes(doc)) {
      documents.push(doc);
    }
  };
  push(triggerElement?.ownerDocument);
  push(portalRoot.ownerDocument);
  return documents;
}
