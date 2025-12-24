import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GridItem } from './GridItem';
import { Grid } from './Grid';
import { ThemeProvider } from '../../../themes/ThemeProvider';

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('GridItem Component', () => {
  it('renders with default props', () => {
    render(
      <TestWrapper>
        <Grid columns={2}>
          <GridItem data-testid="grid-item">
            <div>Test Item</div>
          </GridItem>
        </Grid>
      </TestWrapper>,
    );

    const gridItem = screen.getByTestId('grid-item');
    expect(gridItem).toBeInTheDocument();
    expect(gridItem).toHaveTextContent('Test Item');
  });

  it('applies column span', () => {
    render(
      <TestWrapper>
        <Grid columns={3}>
          <GridItem data-testid="grid-item" columnSpan={2}>
            <div>Spanned Item</div>
          </GridItem>
        </Grid>
      </TestWrapper>,
    );

    const gridItem = screen.getByTestId('grid-item');
    expect(gridItem).toHaveStyle('grid-column: span 2');
  });

  it('applies row span', () => {
    render(
      <TestWrapper>
        <Grid columns={2} rows={3}>
          <GridItem data-testid="grid-item" rowSpan={2}>
            <div>Row Spanned Item</div>
          </GridItem>
        </Grid>
      </TestWrapper>,
    );

    const gridItem = screen.getByTestId('grid-item');
    expect(gridItem).toHaveStyle('grid-row: span 2');
  });

  it('applies custom column position', () => {
    render(
      <TestWrapper>
        <Grid columns={3}>
          <GridItem data-testid="grid-item" column={2}>
            <div>Positioned Item</div>
          </GridItem>
        </Grid>
      </TestWrapper>,
    );

    const gridItem = screen.getByTestId('grid-item');
    expect(gridItem).toHaveStyle('grid-column: 2');
  });

  it('applies custom row position', () => {
    render(
      <TestWrapper>
        <Grid columns={2} rows={3}>
          <GridItem data-testid="grid-item" row={2}>
            <div>Row Positioned Item</div>
          </GridItem>
        </Grid>
      </TestWrapper>,
    );

    const gridItem = screen.getByTestId('grid-item');
    expect(gridItem).toHaveStyle('grid-row: 2');
  });

  it('applies justify-self alignment', () => {
    render(
      <TestWrapper>
        <Grid columns={2}>
          <GridItem data-testid="grid-item" justifySelf="center">
            <div>Centered Item</div>
          </GridItem>
        </Grid>
      </TestWrapper>,
    );

    const gridItem = screen.getByTestId('grid-item');
    expect(gridItem).toHaveStyle('justify-self: center');
  });

  it('applies align-self alignment', () => {
    render(
      <TestWrapper>
        <Grid columns={2}>
          <GridItem data-testid="grid-item" alignSelf="end">
            <div>Aligned Item</div>
          </GridItem>
        </Grid>
      </TestWrapper>,
    );

    const gridItem = screen.getByTestId('grid-item');
    expect(gridItem).toHaveStyle('align-self: end');
  });

  it('applies custom width and height', () => {
    render(
      <TestWrapper>
        <Grid columns={2}>
          <GridItem data-testid="grid-item" width="200px" height="150px">
            <div>Sized Item</div>
          </GridItem>
        </Grid>
      </TestWrapper>,
    );

    const gridItem = screen.getByTestId('grid-item');
    expect(gridItem).toHaveStyle('width: 200px');
    expect(gridItem).toHaveStyle('height: 150px');
  });

  it('applies custom className', () => {
    const customClass = 'custom-grid-item-class';
    render(
      <TestWrapper>
        <Grid columns={2}>
          <GridItem data-testid="grid-item" className={customClass}>
            <div>Custom Class Item</div>
          </GridItem>
        </Grid>
      </TestWrapper>,
    );

    const gridItem = screen.getByTestId('grid-item');
    expect(gridItem).toHaveClass(customClass);
  });

  it('applies custom style', () => {
    const customStyle = { backgroundColor: 'red' };
    render(
      <TestWrapper>
        <Grid columns={2}>
          <GridItem data-testid="grid-item" style={customStyle}>
            <div>Styled Item</div>
          </GridItem>
        </Grid>
      </TestWrapper>,
    );

    const gridItem = screen.getByTestId('grid-item');
    expect(gridItem).toHaveStyle('background-color: red');
  });

  it('renders children correctly', () => {
    const testContent = 'Test GridItem Content';
    render(
      <TestWrapper>
        <Grid columns={2}>
          <GridItem data-testid="grid-item">
            <div>{testContent}</div>
          </GridItem>
        </Grid>
      </TestWrapper>,
    );

    expect(screen.getByText(testContent)).toBeInTheDocument();
  });
});
