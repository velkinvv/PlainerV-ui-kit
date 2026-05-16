jest.unmock('styled-components');

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { TabsDirection, type TabsSegmentOption } from '@/types/ui';
import { Tabs } from './Tabs';

const renderWithTheme = (element: React.ReactElement) =>
  render(<ThemeProvider>{element}</ThemeProvider>);

function tabsSegmentTrackFromOptions(optionRows: TabsSegmentOption[]): React.ReactElement {
  return (
    <>
      {optionRows.map((row) => (
        <Tabs.Item key={row.value} {...row} />
      ))}
    </>
  );
}

describe('Tabs (сегменты без панелей)', () => {
  const demoOptions: TabsSegmentOption[] = [
    { value: 'a', label: 'Первый' },
    { value: 'b', label: 'Второй' },
  ];

  it('рендерит сегменты и группу с aria-label', () => {
    renderWithTheme(
      <Tabs ariaLabel="Тест переключателя" defaultValue="a">
        {tabsSegmentTrackFromOptions(demoOptions)}
      </Tabs>,
    );
    expect(screen.getByRole('group', { name: 'Тест переключателя' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Первый' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Второй' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('переключает выбор в неконтролируемом режиме', () => {
    renderWithTheme(<Tabs defaultValue="a">{tabsSegmentTrackFromOptions(demoOptions)}</Tabs>);
    const secondButton = screen.getByRole('button', { name: 'Второй' });
    fireEvent.click(secondButton);
    expect(screen.getByRole('button', { name: 'Первый' })).toHaveAttribute('aria-pressed', 'false');
    expect(secondButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('вызывает onChange в контролируемом режиме', () => {
    const handleChange = jest.fn();
    renderWithTheme(
      <Tabs value="a" onChange={handleChange} ariaLabel="Тип">
        {tabsSegmentTrackFromOptions(demoOptions)}
      </Tabs>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Второй' }));
    expect(handleChange).toHaveBeenCalledWith('b');
  });

  it('не переключает отключённый сегмент', () => {
    const handleChange = jest.fn();
    renderWithTheme(
      <Tabs defaultValue="x" onChange={handleChange}>
        <Tabs.Item value="x" label="Доступно" />
        <Tabs.Item value="y" label="Заблокировано" disabled />
      </Tabs>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Заблокировано' }));
    expect(handleChange).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Доступно' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('поддерживает вертикальное направление без ошибки', () => {
    renderWithTheme(
      <Tabs defaultValue="b" direction={TabsDirection.VERTICAL} ariaLabel="Вертикально">
        {tabsSegmentTrackFromOptions(demoOptions)}
      </Tabs>,
    );
    expect(screen.getByRole('group', { name: 'Вертикально' })).toBeInTheDocument();
  });
});
