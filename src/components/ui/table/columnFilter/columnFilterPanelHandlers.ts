import { Size } from '@/types/sizes';

/**
 * Размер кнопок «Применить» / «Очистить» в футере панели: на одну ступень меньше корня панели,
 * чтобы в поповере фильтра кнопки визуально не доминировали над полями.
 *
 * @param panelSize — значение пропа `size` у `ColumnFilterPanel` (отступы и токены карточки корня)
 * @returns размер для `Button` в футере
 */
export function resolveColumnFilterFooterButtonSize(panelSize: Size): Size {
  switch (panelSize) {
    case Size.XL:
      return Size.LG;
    case Size.LG:
      return Size.MD;
    case Size.MD:
      return Size.SM;
    case Size.SM:
    case Size.XS:
    default:
      return Size.XS;
  }
}
