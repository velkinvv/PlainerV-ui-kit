import type { ReactNode } from 'react';
import { Size } from '../../../types/sizes';
import type {
  DropdownMenuGroup,
  DropdownMenuItemProps,
  DropdownMenuItemValue,
} from '../../../types/ui';
import { flattenDropdownDefinitions } from './handlers';

/**
 * Сопоставляет размер тега размеру контента выпадающего списка (`Dropdown`).
 *
 * @param tagSize — размер из пропсов `Tag`
 */
export function mapTagSizeToDropdownMenuSize(tagSize: Size | undefined): Size {
  switch (tagSize) {
    case Size.XS:
    case Size.SM:
      return Size.SM;
    case Size.LG:
    case Size.XL:
      return Size.LG;
    case Size.MD:
    default:
      return Size.MD;
  }
}

/**
 * Возвращает подпись для тега-триггера по выбранному значению и определениям меню (только одиночный выбор).
 *
 * @param items — те же пункты, что у `Dropdown`
 * @param selectedValue — текущее значение (`value`)
 * @param multiSelection — при true возвращает `undefined` (подпись задаётся через `buttonProps.children`)
 */
export function resolveTagMenuLabelFromSelection(
  items: (DropdownMenuItemProps | DropdownMenuGroup)[] | undefined,
  selectedValue: DropdownMenuItemValue | DropdownMenuItemValue[] | undefined,
  multiSelection: boolean | undefined,
): ReactNode | undefined {
  if (multiSelection || selectedValue === undefined || selectedValue === null || !items?.length) {
    return undefined;
  }
  if (Array.isArray(selectedValue)) {
    return undefined;
  }
  const flat = flattenDropdownDefinitions(items);
  const match = flat.find(
    (item) => item.value === selectedValue || String(item.value) === String(selectedValue),
  );
  return match?.label ?? undefined;
}
