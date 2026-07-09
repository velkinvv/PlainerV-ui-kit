import React, { forwardRef, useCallback } from 'react';
import { clsx } from 'clsx';
import type { MultiButtonProps } from '../../../../types/ui';
import { Size } from '../../../../types/sizes';
import { getChevronIconSizeForField } from '../../../../handlers/iconHandlers';
import { Icon } from '../../Icon/Icon';
import { Button } from '../Button/Button';
import { DropMenu } from '../../DropMenu';
import { MultiButtonRoot } from './MultiButton.style';
import {
  isMultiButtonMainDisabled,
  isMultiButtonMenuDisabled,
  mapMultiButtonAppearanceToVariant,
} from './handlers';

/**
 * Split-кнопка: основное действие + шеврон с выпадающим меню.
 *
 * @param props.children - Подпись основной кнопки
 * @param props.items - Пункты меню
 * @param props.onMainButtonClick - Клик по основной кнопке
 * @param props.onSelectItem - Выбор пункта меню
 * @param props.appearance - primary | secondary | outline
 * @param props.size - Размер
 * @param props.disabled - Блокировка всего компонента
 * @param props.disabledMainButton - Блокировка только main
 * @param props.skeleton - Скелетон
 * @param props.isVisible / onVisibilityChange - Controlled меню
 * @param ref - Ref на корневой контейнер
 */
export const MultiButton = forwardRef<HTMLDivElement, MultiButtonProps>(
  (
    {
      children,
      items = [],
      onMainButtonClick,
      onSelectItem,
      selected,
      value,
      appearance = 'primary',
      size = Size.MD,
      disabled = false,
      disabledMainButton = false,
      skeleton = false,
      isVisible,
      onVisibilityChange,
      menuWidth,
      menuMaxHeight,
      className,
      ...rest
    },
    ref,
  ) => {
    const buttonVariant = mapMultiButtonAppearanceToVariant(appearance, skeleton);
    const mainDisabled = isMultiButtonMainDisabled(disabled, disabledMainButton, skeleton);
    const menuDisabled = isMultiButtonMenuDisabled(disabled, skeleton);

    const handleMainClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (mainDisabled) {
          return;
        }
        onMainButtonClick?.(event);
      },
      [mainDisabled, onMainButtonClick],
    );

    return (
      <MultiButtonRoot
        ref={ref}
        className={clsx('ui-multi-button', className)}
        $size={size}
        $disabled={disabled}
        role="group"
        {...rest}
      >
        <Button
          type="button"
          variant={buttonVariant}
          size={size}
          disabled={mainDisabled}
          onClick={handleMainClick}
          className="ui-multi-button__main"
        >
          {children ?? 'Действие'}
        </Button>

        <DropMenu
          items={items}
          selected={selected}
          value={value}
          onSelectItem={onSelectItem}
          isVisible={isVisible}
          onVisibilityChange={onVisibilityChange}
          disabled={menuDisabled}
          size={size}
          menuWidth={menuWidth}
          menuMaxHeight={menuMaxHeight}
          className="ui-multi-button__menu"
          renderContentProp={({
            buttonRef,
            menuState,
            handleClick,
            handleKeyDown,
            disabled: triggerDisabled,
          }) => (
            <Button
              ref={buttonRef as React.Ref<HTMLButtonElement>}
              type="button"
              variant={buttonVariant}
              size={size}
              disabled={triggerDisabled}
              aria-label="Открыть меню"
              aria-expanded={menuState}
              aria-haspopup="menu"
              className="ui-multi-button__chevron"
              onClick={handleClick}
              onKeyDown={handleKeyDown}
              iconStart={
                <Icon
                  name="IconPlainerChevronDown"
                  size={getChevronIconSizeForField(size)}
                  color="currentColor"
                />
              }
            />
          )}
        />
      </MultiButtonRoot>
    );
  },
);

MultiButton.displayName = 'MultiButton';
