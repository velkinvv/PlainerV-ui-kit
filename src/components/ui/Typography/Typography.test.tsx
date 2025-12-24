import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Typography } from './Typography';
import { lightTheme } from '../../../../themes/themes';

/**
 * Обертка с темой для тестов
 */
const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={lightTheme}>{component}</ThemeProvider>);
};

describe('Typography', () => {
  it('рендерит текст с базовыми стилями', () => {
    renderWithTheme(<Typography>Тестовый текст</Typography>);
    expect(screen.getByText('Тестовый текст')).toBeInTheDocument();
  });

  it('применяет правильный HTML тег для заголовков', () => {
    renderWithTheme(<Typography variant="h1">Заголовок H1</Typography>);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Заголовок H1');
  });

  it('применяет правильный HTML тег для параграфов', () => {
    renderWithTheme(<Typography variant="body">Текст параграфа</Typography>);
    const paragraph = screen.getByText('Текст параграфа');
    expect(paragraph.tagName).toBe('P');
  });

  it('применяет кастомный компонент', () => {
    renderWithTheme(
      <Typography component="div" variant="h1">
        Кастомный компонент
      </Typography>,
    );
    const element = screen.getByText('Кастомный компонент');
    expect(element.tagName).toBe('DIV');
  });

  it('применяет цвет primary', () => {
    renderWithTheme(
      <Typography color="primary" data-testid="typography">
        Текст с primary цветом
      </Typography>,
    );
    const element = screen.getByTestId('typography');
    expect(element).toHaveStyle('color: #2196F3');
  });

  it('применяет выравнивание по центру', () => {
    renderWithTheme(
      <Typography align="center" data-testid="typography">
        Центрированный текст
      </Typography>,
    );
    const element = screen.getByTestId('typography');
    expect(element).toHaveStyle('text-align: center');
  });

  it('применяет подчеркивание', () => {
    renderWithTheme(
      <Typography decoration="underline" data-testid="typography">
        Подчеркнутый текст
      </Typography>,
    );
    const element = screen.getByTestId('typography');
    expect(element).toHaveStyle('text-decoration: underline');
  });

  it('применяет noWrap', () => {
    renderWithTheme(
      <Typography noWrap data-testid="typography">
        Текст без переноса
      </Typography>,
    );
    const element = screen.getByTestId('typography');
    expect(element).toHaveStyle('white-space: nowrap');
    expect(element).toHaveStyle('overflow: hidden');
    expect(element).toHaveStyle('text-overflow: ellipsis');
  });

  it('применяет uppercase', () => {
    renderWithTheme(
      <Typography uppercase data-testid="typography">
        заглавные буквы
      </Typography>,
    );
    const element = screen.getByTestId('typography');
    expect(element).toHaveStyle('text-transform: uppercase');
  });

  it('применяет lowercase', () => {
    renderWithTheme(
      <Typography lowercase data-testid="typography">
        ЗАГЛАВНЫЕ БУКВЫ
      </Typography>,
    );
    const element = screen.getByTestId('typography');
    expect(element).toHaveStyle('text-transform: lowercase');
  });

  it('применяет capitalize', () => {
    renderWithTheme(
      <Typography capitalize data-testid="typography">
        заглавные буквы
      </Typography>,
    );
    const element = screen.getByTestId('typography');
    expect(element).toHaveStyle('text-transform: capitalize');
  });

  it('применяет кастомный fontWeight', () => {
    renderWithTheme(
      <Typography fontWeight="bold" data-testid="typography">
        Жирный текст
      </Typography>,
    );
    const element = screen.getByTestId('typography');
    expect(element).toHaveStyle('font-weight: 700');
  });

  it('применяет кастомный fontSize', () => {
    renderWithTheme(
      <Typography fontSize="xl" data-testid="typography">
        Большой текст
      </Typography>,
    );
    const element = screen.getByTestId('typography');
    expect(element).toHaveStyle('font-size: 20px');
  });

  it('применяет кастомный lineHeight', () => {
    renderWithTheme(
      <Typography lineHeight="relaxed" data-testid="typography">
        Текст с расслабленным интервалом
      </Typography>,
    );
    const element = screen.getByTestId('typography');
    expect(element).toHaveStyle('line-height: 1.6');
  });

  it('применяет кастомный fontFamily', () => {
    renderWithTheme(
      <Typography fontFamily="monospace" data-testid="typography">
        Моноширинный текст
      </Typography>,
    );
    const element = screen.getByTestId('typography');
    expect(element).toHaveStyle(
      'font-family: "SF Mono", Monaco, Inconsolata, "Roboto Mono", "Source Code Pro", Menlo, Consolas, "DejaVu Sans Mono", monospace',
    );
  });

  it('передает дополнительные пропсы', () => {
    renderWithTheme(
      <Typography data-testid="typography" id="custom-id">
        Текст с дополнительными пропсами
      </Typography>,
    );
    const element = screen.getByTestId('typography');
    expect(element).toHaveAttribute('id', 'custom-id');
  });

  it('применяет className', () => {
    renderWithTheme(
      <Typography className="custom-class" data-testid="typography">
        Текст с кастомным классом
      </Typography>,
    );
    const element = screen.getByTestId('typography');
    expect(element).toHaveClass('custom-class');
  });

  it('применяет inline стили', () => {
    renderWithTheme(
      <Typography style={{ backgroundColor: 'red' }} data-testid="typography">
        Текст с inline стилями
      </Typography>,
    );
    const element = screen.getByTestId('typography');
    expect(element).toHaveStyle('background-color: red');
  });

  describe('Варианты типографики', () => {
    const variants = [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'body',
      'bodySmall',
      'bodyLarge',
      'caption',
      'button',
      'input',
      'label',
    ] as const;

    variants.forEach(variant => {
      it(`применяет стили для варианта ${variant}`, () => {
        renderWithTheme(
          <Typography variant={variant} data-testid="typography">
            Текст варианта {variant}
          </Typography>,
        );
        const element = screen.getByTestId('typography');
        expect(element).toBeInTheDocument();
      });
    });
  });

  describe('Цветовые варианты', () => {
    const colors = [
      'primary',
      'secondary',
      'success',
      'warning',
      'danger',
      'info',
      'text',
      'textSecondary',
      'textTertiary',
      'textDisabled',
    ] as const;

    colors.forEach(color => {
      it(`применяет цвет ${color}`, () => {
        renderWithTheme(
          <Typography color={color} data-testid="typography">
            Текст цвета {color}
          </Typography>,
        );
        const element = screen.getByTestId('typography');
        expect(element).toBeInTheDocument();
      });
    });
  });
});
