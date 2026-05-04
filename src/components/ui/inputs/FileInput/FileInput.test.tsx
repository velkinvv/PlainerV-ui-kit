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
  it('рендерит подпись и поле выбора файла (макет field по умолчанию)', () => {
    renderWithTheme(<FileInput label="Вложение" name="f" />);
    expect(screen.getByText('Вложение')).toBeInTheDocument();
    expect(screen.getByText('input_file')).toBeInTheDocument();
  });

  it('рендерит кнопку «Выбрать файл» в макете trigger', () => {
    renderWithTheme(<FileInput label="Вложение" name="f" fileLayout="trigger" />);
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

  it('в карточке файла показывает кнопку удаления без displayClearIcon', () => {
    renderWithTheme(<FileInput label="Файл" name="f" fileLayout="file" fileName="a.txt" />);
    expect(screen.getByRole('button', { name: 'Удалить файл' })).toBeInTheDocument();
  });

  it('при displayClearIcon очищает выбор по клику', () => {
    const onClearIconClick = jest.fn();
    renderWithTheme(
      <FileInput label="Файл" name="f" displayClearIcon onClearIconClick={onClearIconClick} />,
    );
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(['x'], 'a.txt', { type: 'text/plain' });
    fireEvent.change(input, { target: { files: [file] } });
    expect(screen.getByText('a.txt')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Очистить выбор файла' }));
    expect(onClearIconClick).toHaveBeenCalled();
    expect(screen.getByText('input_file')).toBeInTheDocument();
  });
});
