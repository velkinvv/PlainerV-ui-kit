/**
 * Преобразует CSS border вида «Npx solid color» в inset box-shadow.
 * На круге с overflow:hidden обычный border даёт разрывы из‑за antialiasing;
 * inset-кольцо рисуется ровно по контуру.
 *
 * @param borderValue — значение из темы (`1px solid rgba(...)`) или `none` / undefined
 * @returns строка `box-shadow` или `null`, если обводки нет
 */
export function avatarBorderToInsetBoxShadow(
  borderValue: string | undefined | null,
): string | null {
  if (borderValue == null) {
    return null;
  }

  const trimmedBorder = borderValue.trim();
  if (trimmedBorder.length === 0 || trimmedBorder === 'none') {
    return null;
  }

  const solidBorderMatch = trimmedBorder.match(
    /^([\d.]+)(px|em|rem)?\s+solid\s+(.+)$/i,
  );
  if (solidBorderMatch == null) {
    return null;
  }

  const widthValue = solidBorderMatch[1];
  const widthUnit = solidBorderMatch[2] ?? 'px';
  const borderColor = solidBorderMatch[3].trim();

  return `inset 0 0 0 ${widthValue}${widthUnit} ${borderColor}`;
}

/**
 * Собирает внешнее кольцо (для стека AvatarGroup) через box-shadow без border.
 *
 * @param borderWidth — толщина кольца (например `2px`)
 * @param borderColor — цвет кольца
 * @returns строка `box-shadow` или `null`
 */
export function avatarOuterRingBoxShadow(
  borderWidth: string | undefined | null,
  borderColor: string | undefined | null,
): string | null {
  if (borderWidth == null || borderColor == null) {
    return null;
  }

  const trimmedWidth = borderWidth.trim();
  const trimmedColor = borderColor.trim();
  if (trimmedWidth.length === 0 || trimmedColor.length === 0 || trimmedWidth === '0') {
    return null;
  }

  return `0 0 0 ${trimmedWidth} ${trimmedColor}`;
}
