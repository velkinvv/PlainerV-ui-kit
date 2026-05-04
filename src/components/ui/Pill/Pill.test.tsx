jest.unmock('styled-components');

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { Pill } from './Pill';

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

describe('Pill', () => {
  it('рендерит подпись', () => {
    renderWithTheme(<Pill>Pill</Pill>);
    expect(screen.getByRole('button', { name: /Pill/i })).toBeInTheDocument();
  });

  it('aria-pressed отражает selected', () => {
    renderWithTheme(<Pill selected>Pill</Pill>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('вызывает onClick', () => {
    const handleClick = jest.fn();
    renderWithTheme(
      <Pill onClick={handleClick}>
        A
      </Pill>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('onChange передаёт инвертированное selected и вызывается перед onClick', () => {
    const handleChange = jest.fn();
    const handleClick = jest.fn();
    renderWithTheme(
      <Pill selected={false} onChange={handleChange} onClick={handleClick}>
        Переключатель
      </Pill>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.invocationCallOrder[0]).toBeLessThan(handleClick.mock.invocationCallOrder[0]);
  });

  it('при role="radio" onChange передаёт true', () => {
    const handleChange = jest.fn();
    renderWithTheme(
      <Pill role="radio" selected={false} onChange={handleChange}>
        Радио
      </Pill>,
    );
    fireEvent.click(screen.getByRole('radio'));
    expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));
  });

  it('disabled блокирует клик', () => {
    const handleClick = jest.fn();
    renderWithTheme(
      <Pill disabled onClick={handleClick}>
        X
      </Pill>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('disabled не вызывает onChange', () => {
    const handleChange = jest.fn();
    renderWithTheme(
      <Pill disabled onChange={handleChange}>
        X
      </Pill>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('loading выставляет aria-busy и блокирует клик', () => {
    const fn = jest.fn();
    renderWithTheme(
      <Pill loading onClick={fn}>
        Ждём
      </Pill>,
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-busy', 'true');
    fireEvent.click(button);
    expect(fn).not.toHaveBeenCalled();
  });

  it('data-status отражает семантический статус', () => {
    renderWithTheme(
      <Pill status="success" selected>
        Ок
      </Pill>,
    );
    expect(screen.getByRole('button')).toHaveAttribute('data-status', 'success');
  });

  it('skeleton рендерит aria-busy без роли button', () => {
    renderWithTheme(
      <Pill skeleton aria-label="Загрузка чипа">
        —
      </Pill>,
    );
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    const skeleton = document.querySelector('.ui-pill--skeleton');
    expect(skeleton).toHaveAttribute('aria-busy', 'true');
  });
});
