import React, { useCallback } from 'react';
import { clsx } from 'clsx';
import { Button } from '../../buttons/Button';
import { ButtonVariant } from '@/types/ui';
import type { ColumnFilterPanelProps } from '@/types/ui';
import { Size } from '@/types/sizes';
import {
  ColumnFilterPanelBody,
  ColumnFilterPanelFooter,
  ColumnFilterPanelRoot,
} from './ColumnFilterPanel.style';
import { resolveColumnFilterFooterButtonSize } from './columnFilterPanelHandlers';

/**
 * Обёртка для UI фильтра по колонке: произвольное содержимое + кнопки подтверждения и сброса.
 * Стили из темы (карточка, тень dropdown, границы). Поля ввода передаются через `children`.
 *
 * @param props.children — контролы фильтрации
 * @param props.onApply — подтверждение (например запись буфера в модель и закрытие поповера)
 * @param props.onClear — сброс условия по колонке
 * @param props.onApplyButtonClick — опционально: клик по «Применить» с событием DOM (перед `onApply`)
 * @param props.onClearButtonClick — опционально: клик по «Очистить» с событием (перед `onClear`)
 * @param props.applyLabel — подпись кнопки применения (по умолчанию «Применить»)
 * @param props.clearLabel — подпись кнопки сброса (по умолчанию «Очистить»)
 * @param props.size — плотность корня панели (токены карточки); кнопки футера на ступень меньше
 * @param props.disabled — блокирует обе кнопки
 * @param props.applyDisabled — только кнопка применения
 * @param props.clearDisabled — только кнопка очистки
 * @param props.fullWidthButtons — кнопки на всю ширину футера
 * @param props.presentation — `embeddedInDropdown` внутри `Dropdown` (без второй тени/фона); иначе отдельная карточка
 */
export function ColumnFilterPanel({
  children,
  onApply,
  onClear,
  onApplyButtonClick,
  onClearButtonClick,
  applyLabel = 'Применить',
  clearLabel = 'Очистить',
  size = Size.SM,
  disabled = false,
  applyDisabled,
  clearDisabled,
  fullWidthButtons = true,
  presentation = 'elevatedCard',
  className,
  'aria-label': ariaLabel = 'Фильтр по колонке',
  ...restHtml
}: ColumnFilterPanelProps): React.ReactElement {
  const applyIsDisabled = Boolean(disabled || applyDisabled);
  const clearIsDisabled = Boolean(disabled || clearDisabled);
  const footerButtonSize = resolveColumnFilterFooterButtonSize(size);

  /** Не даём всплытию mousedown закрывать родительский Dropdown/Popover до клика по кнопке */
  const handleFooterMouseDown = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleApplyClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onApplyButtonClick?.(event);
      onApply();
    },
    [onApply, onApplyButtonClick],
  );

  const handleClearClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onClearButtonClick?.(event);
      onClear();
    },
    [onClear, onClearButtonClick],
  );

  return (
    <ColumnFilterPanelRoot
      {...restHtml}
      className={clsx('ui-column-filter-panel', className)}
      $panelSize={size}
      $presentation={presentation}
      role="region"
      aria-label={ariaLabel}
    >
      <ColumnFilterPanelBody>{children}</ColumnFilterPanelBody>
      <ColumnFilterPanelFooter
        $equalWidthButtons={fullWidthButtons}
        onMouseDown={handleFooterMouseDown}
      >
        <Button
          type="button"
          variant={ButtonVariant.PRIMARY}
          size={footerButtonSize}
          disabled={applyIsDisabled}
          onClick={handleApplyClick}
        >
          {applyLabel}
        </Button>
        <Button
          type="button"
          variant={ButtonVariant.SECONDARY}
          size={footerButtonSize}
          disabled={clearIsDisabled}
          onClick={handleClearClick}
        >
          {clearLabel}
        </Button>
      </ColumnFilterPanelFooter>
    </ColumnFilterPanelRoot>
  );
}

ColumnFilterPanel.displayName = 'ColumnFilterPanel';
