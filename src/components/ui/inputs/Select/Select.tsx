import { forwardRef } from 'react';
import type { SelectProps } from '../../../../types/ui';
import { SelectNative } from './SelectNative';
import { SelectPanel } from './SelectPanel';

/**
 * Поле выбора: по умолчанию `mode="select"` — панель как у `Dropdown` (поиск, мультивыбор); `mode="native"` — нативный `select`.
 * @param props - Пропсы `SelectProps` (`mode` опционален, по умолчанию `select`).
 * @param ref - Ref на `HTMLSelectElement` (в панельном режиме — на скрытый `select` для форм).
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const { mode = 'select', ...rest } = props;
  if (mode === 'native') {
    return <SelectNative ref={ref} {...rest} />;
  }
  return <SelectPanel ref={ref} {...rest} />;
});

Select.displayName = 'Select';
