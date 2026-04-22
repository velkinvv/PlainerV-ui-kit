jest.unmock('styled-components');

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../../../../themes/ThemeProvider';
import { FileInput } from './FileInput';

/**
 * Обертка с темой для тестов.
 * @param component - Элемент с `FileInput`.
 */
const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('FileInput', () => {
  it('рендерит подпись и триггер выбора файла', () => {
    renderWithTheme(<FileInput label="Вложение" name="f" />);
    expect(screen.getByText('Вложение')).toBeInTheDocument();
    expect(screen.getByText('Выбрать файл')).toBeInTheDocument();
  });

  it('показывает текст ошибки', () => {
    renderWithTheme(<FileInput label="Файл" name="f" error="Обязательное поле" />);
    expect(screen.getByText('Обязательное поле')).toBeInTheDocument();
  });

  it('показывает helperText при отсутствии ошибки и success', () => {
    renderWithTheme(<FileInput label="Файл" name="f" helperText="До 5 МБ" />);
    expect(screen.getByText('До 5 МБ')).toBeInTheDocument();
  });

  it('вызывает onChange при выборе файла', () => {
    const handleChange = jest.fn();
    renderWithTheme(<FileInput label="Файл" name="f" onChange={handleChange} />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input).toBeTruthy();
    const file = new File(['x'], 'doc.pdf', { type: 'application/pdf' });
    fireEvent.change(input, { target: { files: [file] } });
    expect(handleChange).toHaveBeenCalled();
    expect(screen.getByText('doc.pdf')).toBeInTheDocument();
  });

  it('при showClearButton очищает выбор по клику', () => {
    const onClear = jest.fn();
    renderWithTheme(
      <FileInput label="Файл" name="f" showClearButton onClear={onClear} />,
    );
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(['x'], 'a.txt', { type: 'text/plain' });
    fireEvent.change(input, { target: { files: [file] } });
    expect(screen.getByText('a.txt')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Очистить выбор файла' }));
    expect(onClear).toHaveBeenCalled();
    expect(screen.getByText('Файл не выбран')).toBeInTheDocument();
  });
});
