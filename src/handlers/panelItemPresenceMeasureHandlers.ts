/** Ориентация раскладки для измерения размера пункта */
export type PanelItemLayoutOrientation = 'horizontal' | 'vertical';

/**
 * Измеряет ширину (horizontal) или высоту (vertical) DOM-узла вне текущего layout (клон в body).
 *
 * @param sourceElement — элемент для клонирования
 * @param orientation — horizontal: width, vertical: height
 */
export function measurePanelItemSizePx(
  sourceElement: HTMLElement,
  orientation: PanelItemLayoutOrientation,
): number {
  const cloneElement = sourceElement.cloneNode(true) as HTMLElement;
  cloneElement.style.position = 'absolute';
  cloneElement.style.visibility = 'hidden';
  cloneElement.style.pointerEvents = 'none';
  cloneElement.style.left = '-9999px';
  cloneElement.style.top = '0';

  if (orientation === 'vertical') {
    cloneElement.style.height = 'max-content';
    cloneElement.style.width = 'max-content';
  } else {
    cloneElement.style.width = 'max-content';
  }

  document.body.appendChild(cloneElement);

  const measuredSize =
    orientation === 'vertical'
      ? Math.ceil(
          Math.max(
            cloneElement.getBoundingClientRect().height,
            cloneElement.scrollHeight,
            cloneElement.offsetHeight,
          ),
        )
      : Math.ceil(
          Math.max(
            cloneElement.getBoundingClientRect().width,
            cloneElement.scrollWidth,
            cloneElement.offsetWidth,
          ),
        );

  document.body.removeChild(cloneElement);

  return measuredSize;
}
