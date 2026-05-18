import isPropValid from '@emotion/is-prop-valid';

/**
 * Фильтр `shouldForwardProp` для styled-components 6.x (React 19).
 * Отфильтровывает transient-пропы (`$…`) и перечисленные кастомные поля
 * (например `variant`, `loading` на motion-кнопке).
 *
 * В v6 второй аргумент — `target` (имя DOM-тега или компонент), не `defaultValidatorFn` как в v5.
 * Для DOM используется `@emotion/is-prop-valid`; для компонентов — пропускаем остальные поля.
 *
 * Не устраняет ошибку Vite `o2 is not a function`: при prebundle кита появляются две копии
 * styled-components (dist + отдельный чанк). Нужны `optimizeDeps.exclude` для кита и/или `resolve.dedupe`
 * у потребителя (`@velkinvv/plainerv/vite`).
 *
 * @param customBlockedPropNames - имена пропов компонента, не являющихся атрибутами DOM
 */
export function createStyledShouldForwardProp(
  customBlockedPropNames: readonly string[] = [],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- совместимость @types/sc5 и sc6 / motion
): any {
  const customBlocked = new Set(customBlockedPropNames);

  return (prop: string | number, targetOrDefaultValidator: unknown) => {
    const propName = String(prop);
    if (propName.startsWith('$') || customBlocked.has(propName)) {
      return false;
    }

    // styled-components v5: (prop, defaultValidatorFn)
    if (typeof targetOrDefaultValidator === 'function') {
      return targetOrDefaultValidator(prop);
    }

    // styled-components v6: (prop, target) — target это строка-тег или React-компонент
    if (typeof targetOrDefaultValidator === 'string') {
      return isPropValid(propName);
    }

    return true;
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
