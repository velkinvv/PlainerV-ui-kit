import React from 'react';
import { fn } from '@storybook/test';
import { IconSize, Size } from '@/types/sizes';
import { ButtonVariant } from '@/types/ui';
import { IconButton } from '../../buttons';
import { Icon } from '../../Icon/Icon';

/**
 * Демо-панель иконок над шапкой таблицы для сторис DataGrid (настройки, экспорт, история и др.).
 * Обработчики кликов — заглушки Storybook `fn()` (события в Actions).
 */
export function DataGridStoryHeaderToolbar(): React.ReactElement {
  return (
    <>
      <IconButton
        variant={ButtonVariant.GHOST}
        size={Size.SM}
        aria-label="Настройки таблицы"
        showTooltip
        tooltipText="Настройки таблицы"
        icon={<Icon name="IconExSettings" size={IconSize.SM} color="currentColor" />}
        onClick={fn()}
      />
      <IconButton
        variant={ButtonVariant.GHOST}
        size={Size.SM}
        aria-label="Экспорт в файл"
        showTooltip
        tooltipText="Экспорт в файл"
        icon={<Icon name="IconExDocument2" size={IconSize.SM} color="currentColor" />}
        onClick={fn()}
      />
      <IconButton
        variant={ButtonVariant.GHOST}
        size={Size.SM}
        aria-label="Обновить данные"
        showTooltip
        tooltipText="Обновить данные"
        icon={<Icon name="PhosphorArrowsClockwise" size={IconSize.SM} color="currentColor" />}
        onClick={fn()}
      />
      <IconButton
        variant={ButtonVariant.GHOST}
        size={Size.SM}
        aria-label="Закрыть или сбросить"
        showTooltip
        tooltipText="Закрыть"
        icon={<Icon name="IconExClose" size={IconSize.SM} color="currentColor" />}
        onClick={fn()}
      />
      <IconButton
        variant={ButtonVariant.GHOST}
        size={Size.SM}
        aria-label="История изменений"
        showTooltip
        tooltipText="История изменений"
        icon={<Icon name="IconExTimeCircle" size={IconSize.SM} color="currentColor" />}
        onClick={fn()}
      />
      <IconButton
        variant={ButtonVariant.GHOST}
        size={Size.SM}
        aria-label="Документация"
        showTooltip
        tooltipText="Документация"
        icon={<Icon name="IconExBook" size={IconSize.SM} color="currentColor" />}
        onClick={fn()}
      />
    </>
  );
}
