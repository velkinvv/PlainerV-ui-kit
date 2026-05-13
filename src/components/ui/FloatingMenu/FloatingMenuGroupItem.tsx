import React, { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { clsx } from 'clsx';
import {
  FloatingMenuDropdownTrigger,
  FloatingMenuGroupVariant,
  TooltipPosition,
  type FloatingMenuGroupItemProps,
} from '@/types/ui';
import { Size } from '@/types/sizes';
import { Tooltip } from '../Tooltip/Tooltip';
import { useFloatingMenuGroupContext, useFloatingMenuRootContext } from './FloatingMenuContext';
import {
  FloatingMenuDropdownPanel,
  FloatingMenuItemButton,
  FloatingMenuItemChevron,
  FloatingMenuItemIconSlot,
} from './FloatingMenu.style';
import { getDropdownPanelPosition } from './handlers';

const HOVER_OPEN_MS = 120;
const HOVER_CLOSE_MS = 220;

/**
 * Кнопка пункта плавающей панели: иконка, опционально шеврон и всплывающее меню, опционально подсказка.
 * См. пропсы `FloatingMenuGroupItemProps` в `@/types/ui`.
 */
export const FloatingMenuGroupItem: React.FC<FloatingMenuGroupItemProps> = ({
  icon,
  active = false,
  disabled = false,
  hasDropdown = false,
  dropdownTrigger = FloatingMenuDropdownTrigger.CLICK,
  dropdownContent,
  tooltip,
  tooltipPosition = TooltipPosition.TOP,
  onClick,
  className,
  'aria-label': ariaLabel,
}) => {
  const itemDomId = useId();
  const itemId = `fmi-${itemDomId}`;
  const { variant } = useFloatingMenuGroupContext();
  const { openDropdownId, setOpenDropdownId, zIndex } = useFloatingMenuRootContext();
  const insetGroup = variant === FloatingMenuGroupVariant.INSET;

  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);

  const hasMenu = Boolean(dropdownContent);
  const isOpen = openDropdownId === itemId;

  const open = useCallback(() => {
    if (!hasMenu || disabled) {
      return;
    }
    setOpenDropdownId(itemId);
  }, [disabled, hasMenu, itemId, setOpenDropdownId]);

  const close = useCallback(() => {
    setOpenDropdownId((prev) => (prev === itemId ? null : prev));
  }, [itemId, setOpenDropdownId]);

  const toggle = useCallback(() => {
    if (!hasMenu || disabled) {
      return;
    }
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [close, disabled, hasMenu, isOpen, open]);

  useLayoutEffect(() => {
    if (!isOpen || !buttonRef.current) {
      setCoords(null);
      return;
    }
    setCoords(getDropdownPanelPosition(buttonRef.current));
  }, [isOpen]);

  const hoverOpenTimer = useRef<ReturnType<typeof setTimeout> | undefined>();
  const hoverCloseTimer = useRef<ReturnType<typeof setTimeout> | undefined>();

  const clearHoverTimers = useCallback(() => {
    if (hoverOpenTimer.current) {
      clearTimeout(hoverOpenTimer.current);
      hoverOpenTimer.current = undefined;
    }
    if (hoverCloseTimer.current) {
      clearTimeout(hoverCloseTimer.current);
      hoverCloseTimer.current = undefined;
    }
  }, []);

  const scheduleHoverOpen = useCallback(() => {
    if (dropdownTrigger !== FloatingMenuDropdownTrigger.HOVER || !hasMenu || disabled) {
      return;
    }
    clearHoverTimers();
    hoverOpenTimer.current = setTimeout(() => {
      open();
    }, HOVER_OPEN_MS);
  }, [clearHoverTimers, disabled, dropdownTrigger, hasMenu, open]);

  const scheduleHoverClose = useCallback(() => {
    if (dropdownTrigger !== FloatingMenuDropdownTrigger.HOVER) {
      return;
    }
    clearHoverTimers();
    hoverCloseTimer.current = setTimeout(() => {
      close();
    }, HOVER_CLOSE_MS);
  }, [clearHoverTimers, close, dropdownTrigger]);

  useEffect(() => () => clearHoverTimers(), [clearHoverTimers]);

  useEffect(() => {
    if (!isOpen || dropdownTrigger !== FloatingMenuDropdownTrigger.CLICK) {
      return;
    }
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node | null;
      if (!t) {
        return;
      }
      if (buttonRef.current?.contains(t) || panelRef.current?.contains(t)) {
        return;
      }
      close();
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [close, dropdownTrigger, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [close, isOpen]);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (disabled) {
      return;
    }
    if (hasMenu && dropdownTrigger === FloatingMenuDropdownTrigger.CLICK) {
      toggle();
    }
  };

  const handleButtonMouseEnter = () => {
    if (dropdownTrigger === FloatingMenuDropdownTrigger.HOVER && hasMenu) {
      scheduleHoverOpen();
    }
  };

  const handleButtonMouseLeave = () => {
    if (dropdownTrigger === FloatingMenuDropdownTrigger.HOVER && hasMenu) {
      scheduleHoverClose();
    }
  };

  const button = (
    <FloatingMenuItemButton
      ref={buttonRef}
      type="button"
      className={clsx('ui-floating-menu-group-item', className)}
      disabled={disabled}
      $active={active}
      $disabled={disabled}
      $insetGroup={insetGroup}
      aria-label={ariaLabel}
      aria-expanded={hasMenu ? isOpen : undefined}
      aria-haspopup={hasMenu ? 'true' : undefined}
      onClick={handleButtonClick}
      onMouseEnter={handleButtonMouseEnter}
      onMouseLeave={handleButtonMouseLeave}
    >
      <FloatingMenuItemIconSlot>{icon}</FloatingMenuItemIconSlot>
      {hasDropdown && hasMenu ? (
        <FloatingMenuItemChevron aria-hidden>▾</FloatingMenuItemChevron>
      ) : null}
    </FloatingMenuItemButton>
  );

  const showTooltip = tooltip != null && tooltip !== false && tooltip !== '';
  const wrapped = showTooltip ? (
    <Tooltip content={tooltip} position={tooltipPosition} size={Size.SM}>
      {button}
    </Tooltip>
  ) : (
    button
  );

  const panel =
    typeof document !== 'undefined' && isOpen && coords && hasMenu && dropdownContent ? (
      <FloatingMenuDropdownPanel
        ref={panelRef}
        className="ui-floating-menu-dropdown-panel"
        $zIndex={zIndex + 2}
        style={{ top: coords.top, left: coords.left }}
        data-floating-menu-dropdown-panel
        onMouseEnter={() => {
          if (dropdownTrigger === FloatingMenuDropdownTrigger.HOVER) {
            clearHoverTimers();
          }
        }}
        onMouseLeave={() => {
          if (dropdownTrigger === FloatingMenuDropdownTrigger.HOVER) {
            scheduleHoverClose();
          }
        }}
      >
        {dropdownContent}
      </FloatingMenuDropdownPanel>
    ) : null;

  return (
    <>
      {wrapped}
      {panel ? createPortal(panel, document.body) : null}
    </>
  );
};

FloatingMenuGroupItem.displayName = 'FloatingMenuGroupItem';
