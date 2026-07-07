import React, { useCallback, useState } from 'react';
import { clsx } from 'clsx';
import {
  ActionBarSize,
  type ActionBarDropMenuRenderOptions,
  type ActionBarItemDefinition,
} from '../../../types/ui';
import { IconSize } from '../../../types/sizes';
import { Dropdown } from '../Dropdown/Dropdown';
import { Menu } from '../Menu/Menu';
import { Icon } from '../Icon/Icon';
import { ActionBarOverflowSlot, ActionBarOverflowTrigger } from './ActionBar.style';
import { resolveActionBarDropdownSize } from './handlers';

type ActionBarOverflowMenuProps = {
  /** Размер панели */
  barSize: ActionBarSize;
  /** Элементы, не поместившиеся в ширину панели */
  hiddenItems: ActionBarItemDefinition[];
  /** Рендер строки overflow-меню */
  renderDropMenuItem: (
    itemId: string,
    options?: ActionBarDropMenuRenderOptions,
  ) => React.ReactNode;
  /** Проверка disabled для пунктов меню */
  itemIsDisabled: (itemId: string) => boolean;
  /** Подпись кнопки и меню */
  overflowMenuAriaLabel: string;
};

/**
 * Overflow-меню ActionBar: кнопка «ещё» и выпадающий список скрытых действий.
 */
export const ActionBarOverflowMenu: React.FC<ActionBarOverflowMenuProps> = ({
  barSize,
  hiddenItems,
  renderDropMenuItem,
  itemIsDisabled,
  overflowMenuAriaLabel,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  if (hiddenItems.length === 0) {
    return null;
  }

  return (
    <ActionBarOverflowSlot $barSize={barSize} className="ui-action-bar-overflow">
      <Dropdown
        size={resolveActionBarDropdownSize(barSize)}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        trigger={
          <ActionBarOverflowTrigger
            type="button"
            $barSize={barSize}
            aria-label={overflowMenuAriaLabel}
            aria-haspopup="menu"
            aria-expanded={isMenuOpen}
            className={clsx('ui-action-bar-overflow-trigger', isMenuOpen && 'is-open')}
          >
            <Icon name="IconPlainerChevronDown" size={IconSize.SM} color="currentColor" />
          </ActionBarOverflowTrigger>
        }
      >
        <Menu aria-label={overflowMenuAriaLabel} dense={barSize === ActionBarSize.SM}>
          {hiddenItems.map((item) => (
            <Menu.Item
              key={item.itemId}
              disabled={itemIsDisabled(item.itemId)}
              onClick={closeMenu}
            >
              {renderDropMenuItem(item.itemId, { closeMenu })}
            </Menu.Item>
          ))}
        </Menu>
      </Dropdown>
    </ActionBarOverflowSlot>
  );
};

ActionBarOverflowMenu.displayName = 'ActionBarOverflowMenu';
