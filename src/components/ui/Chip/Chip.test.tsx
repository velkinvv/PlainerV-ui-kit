jest.unmock('styled-components');

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { Chip } from './Chip';

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

describe('Chip', () => {
  it('рендерит текст', () => {
    renderWithTheme(<Chip>Фильтр</Chip>);
    expect(screen.getByText('Фильтр')).toBeInTheDocument();
  });

  it('вызывает onClick', () => {
    const handleClick = jest.fn();
    renderWithTheme(<Chip onClick={handleClick}>A</Chip>);
    fireEvent.click(screen.getByRole('button', { name: /A/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disabled блокирует клик и close', () => {
    const handleClick = jest.fn();
    const handleClose = jest.fn();
    renderWithTheme(
      <Chip disabled onClick={handleClick} onClose={handleClose}>
        X
      </Chip>,
    );
    fireEvent.click(screen.getByRole('button', { name: /X/i }));
    expect(handleClick).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: /Удалить/i }));
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('onClose не вызывает onClick', () => {
    const handleClick = jest.fn();
    const handleClose = jest.fn();
    renderWithTheme(
      <Chip onClick={handleClick} onClose={handleClose}>
        Токен
      </Chip>,
    );
    fireEvent.click(screen.getByRole('button', { name: /Удалить «Токен»/i }));
    expect(handleClose).toHaveBeenCalledTimes(1);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('показывает badge и скрывает rightIcon при onClose', () => {
    const { container } = renderWithTheme(
      <Chip
        badge={3}
        onClose={() => undefined}
        rightIcon={<span data-testid="right-icon">R</span>}
        leftIcon={<span data-testid="left-icon">L</span>}
      >
        Chip
      </Chip>,
    );
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('right-icon')).not.toBeInTheDocument();
    expect(container.querySelector('.ui-chip')).not.toBeNull();
  });

  it('badge={0} не показывается', () => {
    renderWithTheme(<Chip badge={0}>Chip</Chip>);
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('selected выставляет data-selected', () => {
    const { container } = renderWithTheme(<Chip selected>Выбран</Chip>);
    expect(container.querySelector('[data-selected="true"]')).not.toBeNull();
  });
});
