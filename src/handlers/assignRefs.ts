import type { MutableRefObject, Ref, RefCallback } from 'react';

/**
 * Проставляет один DOM-узел сразу на несколько React-ref (callback и object refs).
 *
 * @param element — текущий узел или null при размонтировании
 * @param references — список ref; пустые элементы пропускаются
 */
export function assignRefs<T>(element: T | null, references: Array<Ref<T> | undefined>): void {
  references.forEach((reference) => {
    if (!reference) {
      return;
    }
    if (typeof reference === 'function') {
      (reference as RefCallback<T | null>)(element);
    } else {
      (reference as MutableRefObject<T | null>).current = element;
    }
  });
}

/**
 * Объединяет несколько ref в один callback ref (удобно для forwardRef + внутренний ref).
 */
export function mergeRefs<T>(...references: Array<Ref<T> | undefined>): RefCallback<T> {
  return (element) => assignRefs(element, references);
}
