import type { RefObject } from 'react';

/**
 * Ref из `useRef(null)` / `useRef<T | undefined>(undefined)` — в React 19 у `.current` есть `null`.
 */
export type NullableRefObject<ElementType extends HTMLElement = HTMLElement> =
  RefObject<ElementType | null>;
