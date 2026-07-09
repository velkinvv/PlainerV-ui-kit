jest.unmock('styled-components');

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { SegmentedControl } from './SegmentedControl';

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

describe('SegmentedControl', () => {
  it('рендерит сегменты из children', () => {
    renderWithTheme(
      <SegmentedControl ariaLabel="Вид" defaultValue="list">
        <SegmentedControl.Item value="list">Список</SegmentedControl.Item>
        <SegmentedControl.Item value="grid">Сетка</SegmentedControl.Item>
      </SegmentedControl>,
    );

    expect(screen.getByRole('group', { name: 'Вид' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Список' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Сетка' })).not.toBeChecked();
  });

  it('onChange в single режиме', () => {
    const handleChange = jest.fn();
    renderWithTheme(
      <SegmentedControl value="list" onChange={handleChange} ariaLabel="Вид">
        <SegmentedControl.Item value="list">Список</SegmentedControl.Item>
        <SegmentedControl.Item value="grid">Сетка</SegmentedControl.Item>
      </SegmentedControl>,
    );

    fireEvent.click(screen.getByRole('radio', { name: 'Сетка' }));
    expect(handleChange).toHaveBeenCalledWith('grid', expect.any(Object));
  });

  it('multiple режим переключает массив', () => {
    const handleChange = jest.fn();
    renderWithTheme(
      <SegmentedControl
        selectionMode="multiple"
        value={['a']}
        onChange={handleChange}
        ariaLabel="Теги"
      >
        <SegmentedControl.Item value="a">A</SegmentedControl.Item>
        <SegmentedControl.Item value="b">B</SegmentedControl.Item>
      </SegmentedControl>,
    );

    fireEvent.click(screen.getByRole('checkbox', { name: 'B' }));
    expect(handleChange).toHaveBeenCalledWith(['a', 'b'], expect.any(Object));
  });

  it('options data-driven', () => {
    renderWithTheme(
      <SegmentedControl
        ariaLabel="Опции"
        defaultValue="one"
        options={[
          { value: 'one', label: 'Один' },
          { value: 'two', label: 'Два' },
        ]}
      />,
    );

    expect(screen.getByRole('radio', { name: 'Один' })).toBeChecked();
    expect(screen.getByText('Два')).toBeInTheDocument();
  });

  it('disabled сегмент не выбирается', () => {
    const handleChange = jest.fn();
    renderWithTheme(
      <SegmentedControl value="a" onChange={handleChange} ariaLabel="Группа">
        <SegmentedControl.Item value="a">A</SegmentedControl.Item>
        <SegmentedControl.Item value="b" disabled>
          B
        </SegmentedControl.Item>
      </SegmentedControl>,
    );

    fireEvent.click(screen.getByRole('radio', { name: 'B' }));
    expect(handleChange).not.toHaveBeenCalled();
  });
});
