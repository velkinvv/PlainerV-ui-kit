import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Grid } from './Grid';
import { GridMode } from '../../../types/ui';

/**
 * В тестах styled-components замоканы: CSS из литералов шаблона не попадает в DOM.
 * Проверяем разметку, дочерние элементы, пользовательские className и inline style.
 */
describe('Grid Component', () => {
  it('renders with default props', () => {
    render(
      <Grid data-testid="grid">
        <div>Test Item 1</div>
        <div>Test Item 2</div>
      </Grid>,
    );

    const grid = screen.getByTestId('grid');
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveTextContent('Test Item 1');
    expect(grid).toHaveTextContent('Test Item 2');
  });

  it('рендерит корневой элемент в режиме контейнера по умолчанию', () => {
    render(<Grid data-testid="grid" />);

    const grid = screen.getByTestId('grid');
    expect(grid.tagName).toBe('DIV');
    expect(grid).toBeInTheDocument();
  });

  it('монтируется в режиме fullscreen без ошибок', () => {
    render(<Grid data-testid="grid" mode={GridMode.FULLSCREEN} />);

    expect(screen.getByTestId('grid')).toBeInTheDocument();
  });

  it('принимает props columns и gap без падения', () => {
    render(<Grid data-testid="grid" columns={4} gap={20} />);

    expect(screen.getByTestId('grid')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    const testContent = 'Test Grid Content';
    render(
      <Grid data-testid="grid">
        <div>{testContent}</div>
      </Grid>,
    );

    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const customClass = 'custom-grid-class';
    render(<Grid data-testid="grid" className={customClass} />);

    const grid = screen.getByTestId('grid');
    expect(grid).toHaveClass(customClass);
  });

  it('applies custom style', () => {
    const customStyle = { backgroundColor: 'red' };
    render(<Grid data-testid="grid" style={customStyle} />);

    const grid = screen.getByTestId('grid');
    expect(grid).toHaveStyle('background-color: red');
  });
});
