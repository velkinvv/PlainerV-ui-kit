jest.unmock('styled-components');

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { Slider } from './Slider';
import { RangeSlider } from './RangeSlider';

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

describe('Slider', () => {
  it('рендерит роль slider и подписи min/max', () => {
    renderWithTheme(<Slider min={0} max={10} defaultValue={5} formatMinLabel={() => '0'} formatMaxLabel={() => '10'} />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('вызывает onChange при клавиатуре', () => {
    const fn = jest.fn();
    renderWithTheme(<Slider min={0} max={10} defaultValue={5} onChange={fn} />);
    const thumb = screen.getByRole('slider');
    thumb.focus();
    fireEvent.keyDown(thumb, { key: 'ArrowRight' });
    expect(fn).toHaveBeenCalled();
  });
});

describe('RangeSlider', () => {
  it('рендерит два slider', () => {
    renderWithTheme(<RangeSlider min={0} max={100} defaultValue={[20, 80]} />);
    expect(screen.getAllByRole('slider')).toHaveLength(2);
  });
});
