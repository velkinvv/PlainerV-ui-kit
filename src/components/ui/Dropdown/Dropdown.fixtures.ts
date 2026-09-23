import type { DropdownMenuItemProps } from '../../../types/ui';

/**
 * Пункты с nestedItems для tree-демо в Dropdown stories.
 */
export const DROPDOWN_TREE_MULTI_ITEMS: DropdownMenuItemProps[] = [
  {
    id: 'region-center',
    label: 'Регион: Центр',
    value: 'region-center',
    nestedItems: [
      { label: 'Москва', value: 'msk' },
      { label: 'Тула', value: 'tula' },
    ],
  },
  {
    id: 'region-nw',
    label: 'Регион: Северо-Запад',
    value: 'region-nw',
    nestedItems: [
      { label: 'Санкт-Петербург', value: 'spb' },
      { label: 'Калининград', value: 'kgd' },
    ],
  },
  { label: 'Без вложений', value: 'flat-other' },
];

/**
 * Генератор большого списка элементов для демонстрации virtual scroll.
 */
export const createDropdownVirtualItems = (count = 100): DropdownMenuItemProps[] =>
  Array.from({ length: count }, (_, i) => ({
    label: `Элемент ${i + 1}`,
    value: `item-${i + 1}`,
  }));
