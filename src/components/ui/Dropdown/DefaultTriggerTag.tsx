import React, { useMemo } from 'react';
import { clsx } from 'clsx';
import type { DropdownProps } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import { getChevronIconSizeForField } from '../../../handlers/iconHandlers';
import { Icon } from '../Icon/Icon';
import { Tag } from '../Tag/Tag';
import { resolveTagMenuLabelFromSelection } from './tagTriggerHandlers';

export interface DefaultTriggerTagProps {
  /** Колбэк переключения меню; дополнительно вызывается `buttonProps.onClick` */
  onToggle: () => void;
  /** Подпись и обработчик клика дефолтного триггера (аналог кнопки `Dropdown`) */
  buttonProps?: DropdownProps['buttonProps'];
  /** Оформление тега (`Tag`), если `defaultTriggerKind="tag"` */
  tagTriggerProps?: DropdownProps['tagTriggerProps'];
  skeleton?: boolean;
  disabled?: boolean;
  /** Размер строки `Dropdown` — для шеврона, если у тега не задан `tagTriggerProps.size` */
  fieldSize?: Size;
  /** Мерж к иконке шеврона у тега-триггера */
  openMenuIconProps?: DropdownProps['openMenuIconProps'];
  items?: DropdownProps['items'];
  value?: DropdownProps['value'];
  multiSelection?: DropdownProps['multiSelection'];
  /** Подставить `label` выбранного пункта вместо `buttonProps.children` */
  labelFromSelection?: boolean;
  /** Показать шеврон, если в `tagTriggerProps` не передан свой `rightIcon` */
  tagTriggerShowChevron?: boolean;
  /** Открыто ли меню — для `aria-expanded` */
  isMenuOpen: boolean;
}

/**
 * Дефолтный триггер `Dropdown` в виде тега (`Tag` как кнопка).
 */
export const DefaultTriggerTag = React.forwardRef<HTMLElement, DefaultTriggerTagProps>(
  (
    {
      onToggle,
      buttonProps,
      tagTriggerProps,
      skeleton = false,
      disabled = false,
      fieldSize = Size.MD,
      openMenuIconProps,
      items,
      value,
      multiSelection,
      labelFromSelection = false,
      tagTriggerShowChevron = true,
      isMenuOpen,
    },
    ref,
  ) => {
    const { children, onClick, disabled: buttonDisabled } = buttonProps || {};

    const isDisabled = disabled || buttonDisabled;

    const selectionLabel = useMemo(
      () =>
        labelFromSelection
          ? resolveTagMenuLabelFromSelection(items, value, multiSelection)
          : undefined,
      [items, value, multiSelection, labelFromSelection],
    );

    const triggerLabel = selectionLabel ?? children ?? 'Открыть меню';

    const {
      rightIcon: tagRightIconFromProps,
      className: tagClassName,
      size: tagSizeFromProps,
      ...restTagProps
    } = tagTriggerProps || {};

    const chevronTargetSize = tagSizeFromProps ?? fieldSize;

    const handleTagClick = (event: React.MouseEvent<HTMLElement>) => {
      if (skeleton) return;
      onToggle();
      onClick?.(event as React.MouseEvent<HTMLButtonElement>);
    };

    const openMenuIcon = (
      <Icon
        name="IconPlainerChevronDown"
        size={getChevronIconSizeForField(chevronTargetSize)}
        color="currentColor"
        {...openMenuIconProps}
      />
    );

    const effectiveRightIcon =
      tagRightIconFromProps ?? (tagTriggerShowChevron ? openMenuIcon : undefined);

    return (
      <Tag
        {...restTagProps}
        ref={ref}
        as="button"
        className={clsx('ui-dropdown__default-trigger-tag', tagClassName)}
        disabled={isDisabled}
        skeleton={skeleton}
        size={tagSizeFromProps}
        rightIcon={effectiveRightIcon}
        aria-haspopup="menu"
        aria-expanded={isMenuOpen}
        onClick={handleTagClick}
      >
        {triggerLabel}
      </Tag>
    );
  },
);

DefaultTriggerTag.displayName = 'DefaultTriggerTag';
