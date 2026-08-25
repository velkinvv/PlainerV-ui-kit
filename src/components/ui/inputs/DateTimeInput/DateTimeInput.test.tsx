import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DateTimeInput } from './DateTimeInput';
import { Input } from '../Input/Input';
import { Size } from '../../../../types/sizes';
import { ThemeProvider } from '../../../../themes/ThemeProvider';

/**
 * @param component - дерево с ThemeProvider кита
 */
const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

jest.mock('../../Icon/Icon', () => ({
  Icon: ({ name, size }: { name: string; size: string }) => (
    <div data-testid={`icon-${name}-${size}`} />
  ),
}));

describe('DateTimeInput', () => {
  it('по умолчанию лейбл в потоке документа, без 20px-обёртки', () => {
    renderWithTheme(<DateTimeInput label="Дата и время" onChange={jest.fn()} size={Size.MD} />);

    expect(screen.getByText('Дата и время').closest('[data-input-label-variant="floating"]')).toBeNull();
  });

  it('цвет и типографика лейбла совпадают с Input', () => {
    renderWithTheme(
      <>
        <Input label="Email" size={Size.MD} />
        <DateTimeInput label="Дата и время" onChange={jest.fn()} size={Size.MD} />
      </>,
    );

    expect(screen.getByText('Дата и время').className).toBe(screen.getByText('Email').className);
  });

  it('без label не резервирует padding-top на корне', () => {
    renderWithTheme(<DateTimeInput onChange={jest.fn()} size={Size.MD} />);

    expect(document.querySelector('.ui-date-time-input')).not.toHaveAttribute(
      'data-input-caption-padding',
      'floating',
    );
  });

  it('field-лейбл не добавляет padding-top: 10px на корень', () => {
    renderWithTheme(<DateTimeInput label="Дата и время" onChange={jest.fn()} size={Size.MD} />);

    expect(document.querySelector('.ui-date-time-input')).not.toHaveAttribute(
      'data-input-caption-padding',
      'floating',
    );
  });

  it('floating без label не резервирует padding-top', () => {
    renderWithTheme(<DateTimeInput onChange={jest.fn()} labelVariant="floating" size={Size.MD} />);

    expect(document.querySelector('.ui-date-time-input')).not.toHaveAttribute(
      'data-input-caption-padding',
      'floating',
    );
  });

  it('floating с label резервирует padding-top на корне', () => {
    renderWithTheme(
      <DateTimeInput label="Дата и время" onChange={jest.fn()} labelVariant="floating" />,
    );

    expect(document.querySelector('.ui-date-time-input')).toHaveAttribute(
      'data-input-caption-padding',
      'floating',
    );
  });
});
