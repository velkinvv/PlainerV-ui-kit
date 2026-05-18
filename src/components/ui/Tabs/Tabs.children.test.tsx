jest.unmock('styled-components');

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { Tabs } from './Tabs';
import { TabItem } from './TabItem';

const renderWithTheme = (element: React.ReactElement) =>
  render(<ThemeProvider>{element}</ThemeProvider>);

describe('Tabs (children TabItem)', () => {
  it('рендерит триггеры и панели из дочерних TabItem', () => {
    renderWithTheme(
      <Tabs defaultValue="a" ariaLabel="Вкладки">
        <TabItem value="a" label="Первая">
          <p>Панель A</p>
        </TabItem>
        <TabItem value="b" label="Вторая">
          <p>Панель B</p>
        </TabItem>
      </Tabs>,
    );

    expect(screen.getByRole('button', { name: 'Первая' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Вторая' })).toBeInTheDocument();
    expect(screen.getByText('Панель A')).toBeVisible();
    expect(screen.queryByText('Панель B')).not.toBeVisible();
  });

  it('переключает панель при клике по TabItem в children', () => {
    renderWithTheme(
      <Tabs defaultValue="a">
        <TabItem value="a" label="A">
          <p>Контент A</p>
        </TabItem>
        <TabItem value="b" label="B">
          <p>Контент B</p>
        </TabItem>
      </Tabs>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'B' }));
    expect(screen.getByText('Контент B')).toBeVisible();
    expect(screen.queryByText('Контент A')).not.toBeVisible();
  });

  it('при непустом items использует items, children не строят список', () => {
    renderWithTheme(
      <Tabs defaultValue="from-items" items={[{ value: 'from-items', label: 'Из items' }]}>
        <TabItem value="from-children" label="Из children">
          <p>Не должно</p>
        </TabItem>
      </Tabs>,
    );

    expect(screen.getByRole('button', { name: 'Из items' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Из children' })).not.toBeInTheDocument();
  });

  it('работает с TabItem во Fragment', () => {
    renderWithTheme(
      <Tabs defaultValue="x">
        <>
          <TabItem value="x" label="X">
            <p>FX</p>
          </TabItem>
        </>
      </Tabs>,
    );

    expect(screen.getByRole('button', { name: 'X' })).toBeInTheDocument();
    expect(screen.getByText('FX')).toBeVisible();
  });
});
