/** Реальный styled-components */
jest.unmock('styled-components');

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/themes/ThemeProvider';
import { NavigationMenuActiveAppearance } from '@/types/ui';
import { NavigationMenu } from './NavigationMenu';
import { NavigationMenuItem } from './NavigationMenuItem';

/**
 * Обёртка с темой для тестов NavigationMenu.
 * @param ui — дерево React
 */
const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

describe('NavigationMenu collapsed flyout', () => {
  it('не открывает flyout при mount, если activeId — потомок ветки', () => {
    renderWithTheme(
      <NavigationMenu
        collapsed
        collapsedNestedFlyout
        activeId="leaf-deep"
        activeAppearance={NavigationMenuActiveAppearance.HIGHLIGHTED}
        aria-label="Тест flyout"
      >
        <NavigationMenuItem
          id="catalog"
          label="Каталог"
          items={[
            {
              id: 'group-a',
              label: 'Группа A',
              items: [{ id: 'leaf-deep', label: 'Глубокий пункт' }],
            },
          ]}
        />
      </NavigationMenu>,
    );

    const catalogBranch = screen.getByRole('button', { name: 'Каталог' });
    expect(catalogBranch).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('region', { name: 'Каталог: подменю' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Глубокий пункт' })).not.toBeInTheDocument();
  });

  it('открывает flyout по hover и подсвечивает лист с activeId', () => {
    renderWithTheme(
      <NavigationMenu
        collapsed
        collapsedNestedFlyout
        activeId="leaf-deep"
        activeAppearance={NavigationMenuActiveAppearance.HIGHLIGHTED}
        aria-label="Тест flyout hover"
      >
        <NavigationMenuItem
          id="catalog"
          label="Каталог"
          items={[
            {
              id: 'group-a',
              label: 'Группа A',
              items: [
                { id: 'leaf-deep', label: 'Глубокий пункт' },
                { id: 'leaf-other', label: 'Другой пункт' },
              ],
            },
          ]}
        />
      </NavigationMenu>,
    );

    const catalogBranch = screen.getByRole('button', { name: 'Каталог' });
    const flyoutAnchor = catalogBranch.closest('.ui-popover-anchor');
    expect(flyoutAnchor).not.toBeNull();

    fireEvent.mouseEnter(flyoutAnchor as Element);

    expect(catalogBranch).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('region', { name: 'Каталог: подменю' })).toBeInTheDocument();

    const activeLeaf = screen.getByRole('button', { name: 'Глубокий пункт' });
    expect(activeLeaf).toHaveAttribute('aria-current', 'page');
  });

  it('открывает flyout при mount только если defaultNestedExpanded=true', () => {
    renderWithTheme(
      <NavigationMenu
        collapsed
        collapsedNestedFlyout
        activeId="leaf-deep"
        aria-label="Тест defaultNestedExpanded"
      >
        <NavigationMenuItem
          id="catalog"
          label="Каталог"
          defaultNestedExpanded
          items={[{ id: 'leaf-deep', label: 'Глубокий пункт' }]}
        />
      </NavigationMenu>,
    );

    expect(screen.getByRole('button', { name: 'Каталог' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(screen.getByRole('region', { name: 'Каталог: подменю' })).toBeInTheDocument();
  });
});
