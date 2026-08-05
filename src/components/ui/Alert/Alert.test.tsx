/** Реальный styled-components */
jest.unmock('styled-components');

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { Alert } from './Alert';
import { Button } from '../buttons/Button/Button';
import { ButtonVariant } from '../../../types/ui';
import { Size } from '../../../types/sizes';

const wrap = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

describe('Alert', () => {
  it('рендерит severity и текст', () => {
    wrap(
      <Alert severity="warning" title="Внимание">
        Проверьте данные
      </Alert>,
    );
    expect(screen.getByRole('alert')).toHaveAttribute('data-severity', 'warning');
    expect(screen.getByText('Внимание')).toBeInTheDocument();
    expect(screen.getByText('Проверьте данные')).toBeInTheDocument();
  });

  it('variant filled / outlined', () => {
    const { rerender } = wrap(
      <Alert severity="info" variant="filled">
        Info
      </Alert>,
    );
    expect(screen.getByRole('alert')).toHaveAttribute('data-variant', 'filled');
    rerender(
      <ThemeProvider>
        <Alert severity="info" variant="outlined">
          Info
        </Alert>
      </ThemeProvider>,
    );
    expect(screen.getByRole('alert')).toHaveAttribute('data-variant', 'outlined');
  });

  it('icon={false} скрывает иконку', () => {
    const { container } = wrap(
      <Alert severity="success" icon={false}>
        Без иконки
      </Alert>,
    );
    expect(container.querySelector('.ui-alert')?.querySelector('[aria-hidden="true"]')).toBeNull();
  });

  it('onClose показывает кнопку и вызывает колбэк', () => {
    const onClose = jest.fn();
    wrap(
      <Alert severity="error" onClose={onClose}>
        Ошибка
      </Alert>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Закрыть' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('action вместо дефолтного close', () => {
    wrap(
      <Alert
        severity="success"
        onClose={() => undefined}
        action={
          <Button variant={ButtonVariant.GHOST} size={Size.SM}>
            Отменить
          </Button>
        }
      >
        Сохранено
      </Alert>,
    );
    expect(screen.getByText('Отменить')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Закрыть' })).toBeNull();
  });

  it('Alert.Title в children', () => {
    wrap(
      <Alert severity="info">
        <Alert.Title>Заголовок</Alert.Title>
        Текст
      </Alert>,
    );
    expect(screen.getByText('Заголовок')).toBeInTheDocument();
  });

  it('role=status', () => {
    wrap(
      <Alert severity="success" role="status">
        Статус
      </Alert>,
    );
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('color override не ломает severity data-атрибут', () => {
    wrap(
      <Alert severity="success" color="warning">
        Ок
      </Alert>,
    );
    expect(screen.getByRole('alert')).toHaveAttribute('data-severity', 'success');
  });
});
