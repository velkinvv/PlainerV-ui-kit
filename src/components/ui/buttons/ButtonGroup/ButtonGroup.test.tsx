jest.unmock('styled-components');

import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../../../themes/ThemeProvider';
import { ButtonGroup } from './ButtonGroup';
import { Button } from '../Button';
import { ButtonVariant } from '@/types/ui';

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
});
