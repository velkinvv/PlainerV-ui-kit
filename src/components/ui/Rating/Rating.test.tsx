/** Реальный styled-components */
jest.unmock('styled-components');

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/themes/ThemeProvider';
import { Rating } from './Rating';
import { RatingVariant } from '@/types/ui';

/**
 * Обёртка с темой для тестов Rating.
 * @param ui — дерево React
 */
const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider>{ui}</ThemeProvider>);

describe('Rating', () => {
  it('icons: клик вызывает onChange', () => {
    const handleChange = jest.fn();
    renderWithTheme(
      <Rating
        variant={RatingVariant.ICONS}
        defaultValue={0}
        onChange={handleChange}
        getLabelText={(value) => `${value} звезд`}
      />,
    );
    fireEvent.click(screen.getByLabelText('3 звезд'));
    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it('readOnly не вызывает onChange', () => {
    const handleChange = jest.fn();
    renderWithTheme(
      <Rating variant={RatingVariant.ICONS} value={2} readOnly onChange={handleChange} />,
    );
    fireEvent.click(screen.getByRole('img'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('clearable сбрасывает значение', () => {
    const handleChange = jest.fn();
    renderWithTheme(
      <Rating
        variant={RatingVariant.DOTS}
        defaultValue={2}
        clearable
        onChange={handleChange}
        getLabelText={(value) => `${value}`}
      />,
    );
    fireEvent.click(screen.getByLabelText('2'));
    expect(handleChange).toHaveBeenCalledWith(null);
  });

  it('bar readOnly показывает роль img', () => {
    renderWithTheme(
      <Rating variant={RatingVariant.BAR} value={4} max={5} readOnly aria-label="Оценка 4 из 5" />,
    );
    expect(screen.getByLabelText(/Оценка 4/)).toBeInTheDocument();
  });
});
