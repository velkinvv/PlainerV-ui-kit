import type { DataGridColumnFilterIconProps, IconProps } from '@/types/ui';
import { IconSize } from '@/types/sizes';

/** Имя иконки фильтра по умолчанию в шапке колонки */
const DEFAULT_DATA_GRID_FILTER_ICON_NAME: IconProps['name'] = 'IconExFilter';

export type DataGridColumnFilterIconMergeParams = {
  /** Фильтр уже применён — поверх результата накладывается `filterIconPropsApplied` */
  filterApplied: boolean;
  /** Частичные пропсы `Icon` поверх значений по умолчанию */
  filterIconProps?: DataGridColumnFilterIconProps;
  /** Дополнительный мерж при `filterApplied === true` (например другой `color` на фоне `info`) */
  filterIconPropsApplied?: DataGridColumnFilterIconProps;
};

/**
 * Собирает полные пропсы для `Icon` в кнопке фильтра заголовка колонки.
 * @param filterApplied — активен ли фильтр (влияет на слой `filterIconPropsApplied`)
 * @param filterIconProps — кастомизация `name`, `size`, `color`, `className`
 * @param filterIconPropsApplied — поверх базы и `filterIconProps`, только если `filterApplied`
 */
export function mergeDataGridColumnFilterIconProps(
  params: DataGridColumnFilterIconMergeParams,
): IconProps {
  const base: IconProps = {
    name: DEFAULT_DATA_GRID_FILTER_ICON_NAME,
    size: IconSize.XS,
    color: 'currentColor',
  };
  let merged: IconProps = { ...base, ...params.filterIconProps };
  if (params.filterApplied && params.filterIconPropsApplied) {
    merged = { ...merged, ...params.filterIconPropsApplied };
  }
  if (!merged.name) {
    merged = { ...merged, name: DEFAULT_DATA_GRID_FILTER_ICON_NAME };
  }
  return merged;
}
