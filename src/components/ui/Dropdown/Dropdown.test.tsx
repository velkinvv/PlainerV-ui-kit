import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { Dropdown } from './Dropdown';
import { Button } from '../buttons/Button/Button';
import { Size } from '../../../types/sizes';

/**
 * Обертка с темой для тестов
 */
const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Dropdown', () => {
  const items = [
    { value: '1', label: 'Пункт 1' },
    { value: '2', label: 'Пункт 2' },
    { value: '3', label: 'Пункт 3' },
  ];

  it('рендерится с trigger', () => {
    renderWithTheme(
      <Dropdown trigger={<Button>Открыть меню</Button>} items={items} onSelect={jest.fn()} />,
    );

    expect(screen.getByText('Открыть меню')).toBeInTheDocument();
  });

  it('открывается при клике на trigger', () => {
    renderWithTheme(
      <Dropdown trigger={<Button>Открыть меню</Button>} items={items} onSelect={jest.fn()} />,
    );

    const trigger = screen.getByText('Открыть меню');
    fireEvent.click(trigger);

    // Проверяем что меню открылось (поиск пунктов меню)
    expect(screen.getByText('Пункт 1')).toBeInTheDocument();
  });

  it('вызывает onSelect при выборе элемента', () => {
    const handleSelect = jest.fn();
    renderWithTheme(
      <Dropdown trigger={<Button>Открыть меню</Button>} items={items} onSelect={handleSelect} />,
    );

    const trigger = screen.getByText('Открыть меню');
    fireEvent.click(trigger);

    const item = screen.getByText('Пункт 1');
    fireEvent.click(item);

    expect(handleSelect).toHaveBeenCalledWith('1', expect.any(Object));
  });

  it('закрывается при выборе элемента', () => {
    renderWithTheme(
      <Dropdown trigger={<Button>Открыть меню</Button>} items={items} onSelect={jest.fn()} />,
    );

    const trigger = screen.getByText('Открыть меню');
    fireEvent.click(trigger);

    const item = screen.getByText('Пункт 1');
    fireEvent.click(item);

    // Меню должно закрыться
    expect(screen.queryByText('Пункт 2')).not.toBeInTheDocument();
  });

  it('работает с поиском', () => {
    renderWithTheme(
      <Dropdown
        trigger={<Button>Открыть меню</Button>}
        items={items}
        onSelect={jest.fn()}
        searchable
      />,
    );

    const trigger = screen.getByText('Открыть меню');
    fireEvent.click(trigger);

    const searchInput = screen.getByPlaceholderText(/поиск/i);
    expect(searchInput).toBeInTheDocument();
  });

  it('открывает меню при клике на дефолтный триггер в режиме tag', () => {
    renderWithTheme(
      <Dropdown
        defaultTriggerKind="tag"
        buttonProps={{ children: 'Тег-меню' }}
        tagTriggerProps={{ size: Size.SM, colorVariant: 'neutral', appearance: 'filled' }}
        size={Size.SM}
        items={items}
        onSelect={jest.fn()}
      />,
    );

    fireEvent.click(screen.getByText('Тег-меню'));
    expect(screen.getByText('Пункт 1')).toBeInTheDocument();
  });

  it('показывает подпись выбранного пункта при labelFromSelection и defaultTriggerKind tag', () => {
    renderWithTheme(
      <Dropdown
        defaultTriggerKind="tag"
        labelFromSelection
        value="2"
        buttonProps={{ children: 'запасной' }}
        tagTriggerProps={{ size: Size.SM, colorVariant: 'neutral', appearance: 'filled' }}
        size={Size.SM}
        items={items}
        onSelect={jest.fn()}
      />,
    );

    expect(screen.getByText('Пункт 2')).toBeInTheDocument();
  });

  it('при первом открытии ставит меню под триггер, а не в левый верхний угол', () => {
    const triggerRect = {
      x: 80,
      y: 120,
      left: 80,
      top: 120,
      right: 200,
      bottom: 160,
      width: 120,
      height: 40,
      toJSON: () => ({}),
    } as DOMRect;

    const getBoundingClientRectSpy = jest
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockReturnValue(triggerRect);

    renderWithTheme(
      <Dropdown trigger={<Button>Открыть меню</Button>} items={items} onSelect={jest.fn()} />,
    );

    fireEvent.click(screen.getByText('Открыть меню'));

    const menu = screen.getByRole('menu');
    const dropdownPanel = menu.parentElement;
    expect(dropdownPanel).toHaveStyle({ left: '80px', top: '164px' });
    expect(dropdownPanel).toHaveStyle({ visibility: 'visible' });

    getBoundingClientRectSpy.mockRestore();
  });
});
