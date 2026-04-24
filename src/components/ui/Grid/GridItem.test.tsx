import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GridItem } from './GridItem';
import { Grid } from './Grid';
import { ThemeProvider } from '../../../themes/ThemeProvider';

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

/**
 * В Jest styled-components замоканы без применения CSS из шаблонов —
 * проверяем монтирование, дочерние элементы, className и пользовательский inline style.
 */
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

  it('монтируется с columnSpan и rowSpan без ошибок', () => {
    render(
      <TestWrapper>
        <Grid columns={3}>
          <GridItem data-testid="grid-item" columnSpan={2} rowSpan={2}>
            <div>Spanned Item</div>
          </GridItem>
        </Grid>
      </TestWrapper>,
    );

    expect(screen.getByTestId('grid-item')).toBeInTheDocument();
  });

  it('монтируется с позицией column и row', () => {
    render(
      <TestWrapper>
        <Grid columns={3} rows={3}>
          <GridItem data-testid="grid-item" column={2} row={2}>
            <div>Positioned Item</div>
          </GridItem>
        </Grid>
      </TestWrapper>,
    );

    expect(screen.getByTestId('grid-item')).toBeInTheDocument();
  });

  it('монтируется с выравниванием justifySelf и alignSelf', () => {
    render(
      <TestWrapper>
        <Grid columns={2}>
          <GridItem data-testid="grid-item" justifySelf="center" alignSelf="end">
            <div>Aligned Item</div>
          </GridItem>
        </Grid>
      </TestWrapper>,
    );

    expect(screen.getByTestId('grid-item')).toBeInTheDocument();
  });

  it('принимает width и height как пропсы без падения (CSS задаётся styled)', () => {
    render(
      <TestWrapper>
        <Grid columns={2}>
          <GridItem data-testid="grid-item" width="200px" height="150px">
            <div>Sized Item</div>
          </GridItem>
        </Grid>
      </TestWrapper>,
    );

    expect(screen.getByTestId('grid-item')).toBeInTheDocument();
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
