jest.unmock('styled-components');

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../../../themes/ThemeProvider';
import { ButtonGroup } from './ButtonGroup';
import { Button } from '../Button';
import { ButtonVariant } from '@/types/ui';
import { Size } from '@/types/sizes';

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

describe('ButtonGroup', () => {
  it('рендерит детей и role=group', () => {
    renderWithTheme(
      <ButtonGroup ariaLabel="Тестовая группа">
        <Button variant={ButtonVariant.OUTLINE}>A</Button>
        <Button variant={ButtonVariant.OUTLINE}>B</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole('group', { name: 'Тестовая группа' })).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('в режиме attached добавляет класс ui-button-group', () => {
    renderWithTheme(
      <ButtonGroup attached ariaLabel="Склеенная">
        <Button variant={ButtonVariant.SECONDARY}>A</Button>
        <Button variant={ButtonVariant.SECONDARY}>B</Button>
      </ButtonGroup>,
    );
    const group = screen.getByRole('group', { name: 'Склеенная' });
    expect(group).toHaveClass('ui-button-group');
  });

  it('в режиме selectable переключает активную кнопку по клику', () => {
    renderWithTheme(
      <ButtonGroup attached selectable ariaLabel="Селектор периода">
        <Button size={Size.MD}>День</Button>
        <Button size={Size.MD}>Неделя</Button>
      </ButtonGroup>,
    );

    const dayButton = screen.getByRole('button', { name: 'День' });
    const weekButton = screen.getByRole('button', { name: 'Неделя' });

    expect(dayButton).toHaveAttribute('aria-pressed', 'true');
    expect(weekButton).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(weekButton);

    expect(dayButton).toHaveAttribute('aria-pressed', 'false');
    expect(weekButton).toHaveAttribute('aria-pressed', 'true');
  });
});
