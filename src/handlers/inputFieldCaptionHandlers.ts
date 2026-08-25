import type { InputLabelVariant } from '../types/ui';

/** Дефолтный режим подписи полей даты/времени — паритет с Input / Select. */
export const DEFAULT_INPUT_LABEL_VARIANT: InputLabelVariant = 'field';

/**
 * @param labelVariant - явный режим подписи или `undefined`
 * @returns `field` или `floating`
 */
export function resolveInputLabelVariant(
  labelVariant?: InputLabelVariant,
): InputLabelVariant {
  return labelVariant ?? DEFAULT_INPUT_LABEL_VARIANT;
}

/**
 * @param labelVariant - явный режим подписи или `undefined`
 * @returns `true`, если нужен прежний absolute-лейбл
 */
export function isFloatingInputLabel(labelVariant?: InputLabelVariant): boolean {
  return resolveInputLabelVariant(labelVariant) === 'floating';
}

/**
 * Нужен ли на корне поля резерв `padding-top: 10px` под absolute-лейбл.
 * Без `label` / `additionalLabel` и в режиме `field` отступа нет — иначе контрол
 * в одной grid-строке с Input / Select уезжает вниз примерно на 10px.
 *
 * @param labelVariant - режим подписи (`field` | `floating`) или `undefined`
 * @param hasFieldCaption - передан ли `label` или `additionalLabel`
 */
export function shouldReserveFloatingInputCaptionSpace(
  labelVariant?: InputLabelVariant,
  hasFieldCaption?: boolean,
): boolean {
  return isFloatingInputLabel(labelVariant) && Boolean(hasFieldCaption);
}
