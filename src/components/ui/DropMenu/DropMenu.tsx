import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { clsx } from 'clsx';
import type { DropMenuProps, DropMenuRenderContentProps } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import { getChevronIconSizeForField } from '../../../handlers/iconHandlers';
import { Icon } from '../Icon/Icon';
import { Dropdown } from '../Dropdown/Dropdown';
import {
  isDropMenuTriggerOpenKey,
  mapDropMenuPropsToDropdown,
} from './DropMenu.handlers';

/**
 * Выпадающее меню с кастомным или стандартным триггером.
 * Фасад над `Dropdown`: `renderContentProp` / `trigger` / дефолтная кнопка,
 * алиасы `isVisible` / `onSelectItem` / `selected`.
 *
 * @param props.renderContentProp - Рендер кастомного триггера (приоритет)
 * @param props.trigger - Кастомный триггер без render-prop
 * @param props.buttonProps - Пропсы дефолтной кнопки
 * @param props.items - Пункты меню
 * @param props.selected / value - Выбранное значение
 * @param props.onSelectItem / onSelect - Выбор пункта
 * @param props.isVisible / onVisibilityChange - Controlled видимость
 * @param props.defaultOpen - Начальная открытость
 * @param ref - Ref на корень `Dropdown`
 */
export const DropMenu = forwardRef<HTMLDivElement, DropMenuProps>(
  (
    {
      renderContentProp,
      trigger: triggerProp,
      buttonProps,
      selected,
      value,
      onSelectItem,
      onSelect,
      isVisible,
      onVisibilityChange,
      defaultOpen = false,
      disabled = false,
      size = Size.MD,
      openMenuIconProps,
      className,
      ...restDropdownProps
    },
    ref,
  ) => {
    const isVisibilityControlled = isVisible !== undefined;
    const [uncontrolledVisible, setUncontrolledVisible] = useState(defaultOpen);
    const menuState = isVisibilityControlled ? Boolean(isVisible) : uncontrolledVisible;

    const triggerElementRef = useRef<HTMLElement | null>(null);

    const setMenuVisible = useCallback(
      (nextVisible: boolean) => {
        if (!isVisibilityControlled) {
          setUncontrolledVisible(nextVisible);
        }
        onVisibilityChange?.(nextVisible);
      },
      [isVisibilityControlled, onVisibilityChange],
    );

    const handleVisibilityChange = useCallback(
      (nextVisible: boolean) => {
        setMenuVisible(nextVisible);
      },
      [setMenuVisible],
    );

    const handleTriggerClick = useCallback(
      (event?: React.MouseEvent) => {
        if (disabled) {
          event?.preventDefault();
          return;
        }
        setMenuVisible(!menuState);
      },
      [disabled, menuState, setMenuVisible],
    );

    const handleTriggerKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        if (disabled) {
          return;
        }
        if (isDropMenuTriggerOpenKey(event.key)) {
          event.preventDefault();
          setMenuVisible(true);
        }
      },
      [disabled, setMenuVisible],
    );

    const setButtonRef = useCallback((element: HTMLElement | null) => {
      triggerElementRef.current = element;
    }, []);

    const statusIcon = useMemo(
      () => (
        <Icon
          name="IconPlainerChevronDown"
          size={getChevronIconSizeForField(size)}
          color="currentColor"
          {...openMenuIconProps}
        />
      ),
      [openMenuIconProps, size],
    );

    const renderContentOptions = useMemo<DropMenuRenderContentProps>(
      () => ({
        buttonRef: setButtonRef,
        menuState,
        handleKeyDown: handleTriggerKeyDown,
        handleClick: handleTriggerClick,
        statusIcon,
        disabled,
      }),
      [
        disabled,
        handleTriggerClick,
        handleTriggerKeyDown,
        menuState,
        setButtonRef,
        statusIcon,
      ],
    );

    const usesRenderContentProp = typeof renderContentProp === 'function';

    const mappedProps = useMemo(
      () =>
        mapDropMenuPropsToDropdown({
          value,
          selected,
          isVisible: menuState,
          onVisibilityChange: handleVisibilityChange,
          onSelectItem,
          onSelect,
          usesRenderContentProp,
        }),
      [
        handleVisibilityChange,
        menuState,
        onSelect,
        onSelectItem,
        selected,
        usesRenderContentProp,
        value,
      ],
    );

    const resolvedTrigger = usesRenderContentProp
      ? renderContentProp?.(renderContentOptions)
      : triggerProp;

    return (
      <Dropdown
        ref={ref}
        {...restDropdownProps}
        {...mappedProps}
        trigger={resolvedTrigger}
        buttonProps={usesRenderContentProp || triggerProp ? undefined : buttonProps}
        disabled={disabled}
        size={size}
        openMenuIconProps={openMenuIconProps}
        className={clsx('ui-drop-menu', className)}
      />
    );
  },
);

DropMenu.displayName = 'DropMenu';
