/**
 * Фильтр `shouldForwardProp` для styled-components (React 19).
 * Всегда отфильтровывает transient-пропы (`$…`); дополнительно — перечисленные кастомные поля
 * (например `variant`, `loading` на motion-кнопке).
 * Всегда делегирует в `defaultValidatorFn` (как в документации styled-components).
 *
 * @param customBlockedPropNames - имена пропов компонента, не являющихся атрибутами DOM
 */
export function createStyledShouldForwardProp(
  customBlockedPropNames: readonly string[] = [],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- совместимость @types/sc5 и sc6 / motion
): any {
  const customBlocked = new Set(customBlockedPropNames);

  return (prop: string | number, defaultValidatorFn: (prop: string | number) => boolean) => {
    const propName = String(prop);
    if (propName.startsWith('$') || customBlocked.has(propName)) {
      return false;
    }

    return defaultValidatorFn(prop);
  };
}

/** Ключи обработчиков React DOM, конфликтующие с API drag framer-motion на `motion.button` / `motion.a`. */
const motionConflictingDomHandlerKeys = [
  'onDrag',
  'onDragStart',
  'onDragEnd',
  'onDragEnter',
  'onDragExit',
  'onDragLeave',
  'onDragOver',
] as const;

type MotionConflictingDomHandlerKey = (typeof motionConflictingDomHandlerKeys)[number];

/**
 * Убирает из пропов обработчики HTML drag, несовместимые с framer-motion.
 *
 * @param props - пропы кнопки/ссылки перед spread на `motion.*`
 */
export function omitMotionConflictingDomHandlers<Props extends Record<string, unknown>>(
  props: Props,
): Omit<Props, MotionConflictingDomHandlerKey> {
  const sanitizedProps = { ...props };
  for (const handlerKey of motionConflictingDomHandlerKeys) {
    delete sanitizedProps[handlerKey];
  }
  return sanitizedProps;
}
