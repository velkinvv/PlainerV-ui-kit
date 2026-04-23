import type { BreadcrumbItem } from '../../../types/ui';

/**
 * Определяет, нужно ли выставить `aria-current="page"` для пункта.
 * @param item - Пункт цепочки
 * @param index - Индекс в массиве
 * @param length - Число пунктов
 * @returns `true`, если пункт считается текущей страницей
 */
export const isBreadcrumbCurrentPage = (
  item: BreadcrumbItem,
  index: number,
  length: number,
): boolean => {
  if (item.ellipsis) {
    return false;
  }
  if (item.current === true) {
    return true;
  }
  if (item.current === false) {
    return false;
  }
  return index === length - 1 && !item.href && !item.onClick;
};

/**
 * Нужна ли капсула с фоном вокруг крошки (макет Figma: текущая страница и явный `pill`).
 * @param item - Пункт
 * @param isCurrent - Результат `isBreadcrumbCurrentPage`
 */
export const shouldUseBreadcrumbPill = (item: BreadcrumbItem, isCurrent: boolean): boolean => {
  if (item.ellipsis) {
    return false;
  }
  if (item.crumbStyle === 'pill') {
    return true;
  }
  if (item.crumbStyle === 'plain') {
    return false;
  }
  if (item.disabled) {
    return false;
  }
  return Boolean(isCurrent);
};
