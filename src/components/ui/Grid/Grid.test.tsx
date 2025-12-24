import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Grid } from './Grid';
import { GridMode } from '../../../types/ui';

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

  it('renders in container mode by default', () => {
    render(<Grid data-testid="grid" />);

    const grid = screen.getByTestId('grid');
    expect(grid).toHaveStyle('display: grid');
  });

  it('renders in fullscreen mode', () => {
    render(<Grid data-testid="grid" mode={GridMode.FULLSCREEN} />);

    const grid = screen.getByTestId('grid');
    expect(grid).toHaveStyle('width: 100vw');
    expect(grid).toHaveStyle('height: 100vh');
  });

  it('applies custom columns', () => {
    render(<Grid data-testid="grid" columns={4} />);

    const grid = screen.getByTestId('grid');
    expect(grid).toHaveStyle('grid-template-columns: repeat(4, 1fr)');
  });

  it('applies custom gap', () => {
    render(<Grid data-testid="grid" gap={20} />);

    const grid = screen.getByTestId('grid');
    expect(grid).toHaveStyle('gap: 20px');
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
