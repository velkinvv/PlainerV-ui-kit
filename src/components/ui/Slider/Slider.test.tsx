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

  it('показывает лейбл и helperText как у инпута', () => {
    renderWithTheme(
      <Slider
        min={0}
        max={10}
        defaultValue={5}
        label="Громкость"
        helperText="Подсказка под ползунком"
        formatMinLabel={() => '0'}
        formatMaxLabel={() => '10'}
      />,
    );
    expect(screen.getByText('Громкость')).toBeInTheDocument();
    expect(screen.getByText('Подсказка под ползунком')).toBeInTheDocument();
  });

  it('в режиме скелетона не показывает slider и ставит aria-busy на контейнер поля при лейбле', () => {
    const { container } = renderWithTheme(
      <Slider
        skeleton
        label="Загрузка"
        min={0}
        max={100}
        formatMinLabel={() => '0'}
        formatMaxLabel={() => '100'}
      />,
    );
    expect(screen.queryByRole('slider')).not.toBeInTheDocument();
    const busyRoot = container.querySelector('[aria-busy="true"]');
    expect(busyRoot).not.toBeNull();
    expect(screen.getByText('Загрузка')).toBeInTheDocument();
  });
});

describe('RangeSlider', () => {
  it('рендерит два slider', () => {
    renderWithTheme(<RangeSlider min={0} max={100} defaultValue={[20, 80]} />);
    expect(screen.getAllByRole('slider')).toHaveLength(2);
  });

  it('в режиме скелетона не показывает бегунки', () => {
    renderWithTheme(<RangeSlider skeleton min={0} max={100} formatMinLabel={() => ''} formatMaxLabel={() => ''} />);
    expect(screen.queryByRole('slider')).not.toBeInTheDocument();
  });
});
