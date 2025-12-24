import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../../../../themes/ThemeProvider';
import { Modal } from './Modal';

/**
 * Обертка с темой для тестов
 */
const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Modal', () => {
  it('не рендерится когда isOpen=false', () => {
    renderWithTheme(
      <Modal isOpen={false} onClose={jest.fn()}>
        <div>Содержимое модального окна</div>
      </Modal>
    );

    expect(screen.queryByText('Содержимое модального окна')).not.toBeInTheDocument();
  });

  it('рендерится когда isOpen=true', () => {
    renderWithTheme(
      <Modal isOpen={true} onClose={jest.fn()}>
        <div>Содержимое модального окна</div>
      </Modal>
    );

    expect(screen.getByText('Содержимое модального окна')).toBeInTheDocument();
  });

  it('вызывает onClose при клике на overlay', () => {
    const handleClose = jest.fn();
    renderWithTheme(
      <Modal isOpen={true} onClose={handleClose} closeOnOverlayClick>
        <div>Содержимое</div>
      </Modal>
    );

    // Находим overlay и кликаем на него
    const overlay = screen.getByText('Содержимое').closest('[role="dialog"]')?.parentElement;
    if (overlay) {
      fireEvent.click(overlay);
      expect(handleClose).toHaveBeenCalled();
    }
  });

  it('показывает title', () => {
    renderWithTheme(
      <Modal isOpen={true} onClose={jest.fn()} title="Заголовок модального окна">
        <div>Содержимое</div>
      </Modal>
    );

    expect(screen.getByText('Заголовок модального окна')).toBeInTheDocument();
  });

  it('показывает description', () => {
    renderWithTheme(
      <Modal
        isOpen={true}
        onClose={jest.fn()}
        title="Заголовок"
        description="Описание модального окна"
      >
        <div>Содержимое</div>
      </Modal>
    );

    expect(screen.getByText('Описание модального окна')).toBeInTheDocument();
  });

  it('вызывает onClose при клике на кнопку закрытия', () => {
    const handleClose = jest.fn();
    renderWithTheme(
      <Modal isOpen={true} onClose={handleClose} showCloseButton>
        <div>Содержимое</div>
      </Modal>
    );

    // Ищем кнопку закрытия (обычно это кнопка с иконкой закрытия)
    const closeButton = screen.getByRole('button', { name: /close/i });
    if (closeButton) {
      fireEvent.click(closeButton);
      expect(handleClose).toHaveBeenCalled();
    }
  });
});
