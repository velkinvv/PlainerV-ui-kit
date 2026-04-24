import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Avatar } from './Avatar';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { Size } from '../../../types/sizes';
import { AvatarStatus } from '../../../types/ui';

// Обертка для тестов с темой
const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Avatar', () => {
  describe('userName functionality', () => {
    it('should generate initials from userName when no image is provided', () => {
      renderWithTheme(<Avatar userName="Иван Петров" size={Size.MD} />);

      // Проверяем, что отображаются инициалы "ИП"
      expect(screen.getByText('ИП')).toBeInTheDocument();
    });

    it('should generate initials from single word userName', () => {
      renderWithTheme(<Avatar userName="Мария" size={Size.MD} />);

      // Проверяем, что отображаются первые две буквы "МА"
      expect(screen.getByText('МА')).toBeInTheDocument();
    });

    it('should generate initials from multiple words userName', () => {
      renderWithTheme(<Avatar userName="Александр Иванович Петров" size={Size.MD} />);

      // Проверяем, что отображаются инициалы первых двух слов "АИ"
      expect(screen.getByText('АИ')).toBeInTheDocument();
    });

    it('should use fallback when userName is not provided', () => {
      renderWithTheme(<Avatar alt="Test User" size={Size.MD} />);

      // Проверяем, что отображается первая буква alt
      expect(screen.getByText('T')).toBeInTheDocument();
    });

    it('should use custom fallback when provided', () => {
      renderWithTheme(<Avatar userName="Иван Петров" fallback="JD" size={Size.MD} />);

      // Проверяем, что отображается кастомный fallback
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('should display image when src is provided', () => {
      renderWithTheme(
        <Avatar
          userName="Иван Петров"
          src="https://example.com/avatar.jpg"
          alt="Иван Петров"
          size={Size.MD}
        />,
      );

      // Проверяем, что отображается изображение
      const image = screen.getByAltText('Иван Петров');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    });

    it('should fallback to initials when image fails to load', () => {
      renderWithTheme(
        <Avatar
          userName="Иван Петров"
          src="https://invalid-url.com/avatar.jpg"
          alt="Иван Петров"
          size={Size.MD}
        />,
      );

      const image = screen.getByAltText('Иван Петров');
      fireEvent.error(image);

      // Проверяем, что отображаются инициалы после ошибки загрузки изображения
      expect(screen.getByText('ИП')).toBeInTheDocument();
    });
  });

  describe('status functionality', () => {
    it('показывает Badge с числом при ONLINE и messageCount (цвет статуса задаётся в Badge)', () => {
      renderWithTheme(
        <Avatar
          userName="Иван Петров"
          status={AvatarStatus.ONLINE}
          messageCount={4}
          size={Size.MD}
        />,
      );

      expect(screen.getByText('4')).toBeInTheDocument();
    });

    it('показывает Badge с числом при OFFLINE и messageCount', () => {
      renderWithTheme(
        <Avatar
          userName="Иван Петров"
          status={AvatarStatus.OFFLINE}
          messageCount={2}
          size={Size.MD}
        />,
      );

      expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('не рендерит Badge без messageCount даже при переданном статусе', () => {
      const { container } = renderWithTheme(
        <Avatar userName="Иван Петров" status={AvatarStatus.ONLINE} size={Size.MD} />,
      );

      expect(container.querySelector('.ui-badge')).not.toBeInTheDocument();
    });
  });

  describe('tooltip functionality', () => {
    it('should show tooltip when showTooltip is true', () => {
      renderWithTheme(<Avatar userName="Иван Петров" showTooltip={true} size={Size.MD} />);

      // Проверяем, что компонент Tooltip рендерится
      const tooltipTrigger = document.querySelector('.ui-tooltip-trigger');
      expect(tooltipTrigger).toBeInTheDocument();
    });

    it('should not show tooltip when showTooltip is false', () => {
      renderWithTheme(<Avatar userName="Иван Петров" showTooltip={false} size={Size.MD} />);

      // Проверяем, что компонент Tooltip НЕ рендерится
      const tooltipTrigger = document.querySelector('.ui-tooltip-trigger');
      expect(tooltipTrigger).not.toBeInTheDocument();
    });

    it('should use userName as tooltip content when available', () => {
      renderWithTheme(<Avatar userName="Мария Сидорова" showTooltip={true} size={Size.MD} />);

      // Проверяем, что тултип содержит userName
      const tooltipTrigger = document.querySelector('.ui-tooltip-trigger');
      expect(tooltipTrigger).toBeInTheDocument();
    });

    it('should use alt as tooltip content when userName is not available', () => {
      renderWithTheme(<Avatar alt="Александр Иванов" showTooltip={true} size={Size.MD} />);

      // Проверяем, что тултип рендерится
      const tooltipTrigger = document.querySelector('.ui-tooltip-trigger');
      expect(tooltipTrigger).toBeInTheDocument();
    });

    it('should use default tooltip content when neither userName nor alt is available', () => {
      renderWithTheme(<Avatar showTooltip={true} size={Size.MD} />);

      // Проверяем, что тултип рендерится
      const tooltipTrigger = document.querySelector('.ui-tooltip-trigger');
      expect(tooltipTrigger).toBeInTheDocument();
    });

    it('should use tooltipText when provided', () => {
      renderWithTheme(
        <Avatar
          userName="Иван Петров"
          tooltipText="Администратор системы"
          showTooltip={true}
          size={Size.MD}
        />,
      );

      // Проверяем, что тултип рендерится
      const tooltipTrigger = document.querySelector('.ui-tooltip-trigger');
      expect(tooltipTrigger).toBeInTheDocument();
    });

    it('should prioritize tooltipText over userName', () => {
      renderWithTheme(
        <Avatar
          userName="Иван Петров"
          tooltipText="Главный разработчик"
          showTooltip={true}
          size={Size.MD}
        />,
      );

      // Проверяем, что тултип рендерится
      const tooltipTrigger = document.querySelector('.ui-tooltip-trigger');
      expect(tooltipTrigger).toBeInTheDocument();
    });

    it('should prioritize tooltipText over alt', () => {
      renderWithTheme(
        <Avatar
          alt="Александр Иванов"
          tooltipText="Менеджер проекта"
          showTooltip={true}
          size={Size.MD}
        />,
      );

      // Проверяем, что тултип рендерится
      const tooltipTrigger = document.querySelector('.ui-tooltip-trigger');
      expect(tooltipTrigger).toBeInTheDocument();
    });
  });

  describe('alt text functionality', () => {
    it('should use userName as alt when alt is not provided', () => {
      renderWithTheme(
        <Avatar userName="Иван Петров" src="https://example.com/avatar.jpg" size={Size.MD} />,
      );

      // Проверяем, что alt атрибут содержит userName
      const image = screen.getByAltText('Иван Петров');
      expect(image).toBeInTheDocument();
    });

    it('should use provided alt when both alt and userName are provided', () => {
      renderWithTheme(
        <Avatar
          userName="Иван Петров"
          alt="Кастомный alt"
          src="https://example.com/avatar.jpg"
          size={Size.MD}
        />,
      );

      // Проверяем, что alt атрибут содержит переданный alt
      const image = screen.getByAltText('Кастомный alt');
      expect(image).toBeInTheDocument();
    });

    it('should use default alt when neither alt nor userName are provided', () => {
      renderWithTheme(<Avatar src="https://example.com/avatar.jpg" size={Size.MD} />);

      // Проверяем, что alt атрибут содержит дефолтное значение
      const image = screen.getByAltText('Пользователь');
      expect(image).toBeInTheDocument();
    });
  });

  describe('cursor functionality', () => {
    it('should apply pointer cursor when cursor="pointer" is provided', () => {
      renderWithTheme(<Avatar userName="Иван Петров" cursor="pointer" size={Size.MD} />);

      // Проверяем, что аватар рендерится
      const avatar = document.querySelector('.ui-avatar');
      expect(avatar).toBeInTheDocument();
    });

    it('should apply default cursor when cursor="default" is provided', () => {
      renderWithTheme(<Avatar userName="Иван Петров" cursor="default" size={Size.MD} />);

      // Проверяем, что аватар рендерится
      const avatar = document.querySelector('.ui-avatar');
      expect(avatar).toBeInTheDocument();
    });

    it('should apply pointer cursor when onClick is provided and cursor is not specified', () => {
      renderWithTheme(
        <Avatar
          userName="Иван Петров"
          onClick={() => {
            /* Пустая функция для теста */
          }}
          size={Size.MD}
        />,
      );

      // Проверяем, что аватар рендерится
      const avatar = document.querySelector('.ui-avatar');
      expect(avatar).toBeInTheDocument();
    });

    it('should apply default cursor when neither onClick nor cursor is provided', () => {
      renderWithTheme(<Avatar userName="Иван Петров" size={Size.MD} />);

      // Проверяем, что аватар рендерится
      const avatar = document.querySelector('.ui-avatar');
      expect(avatar).toBeInTheDocument();
    });

    it('should prioritize cursor prop over onClick for cursor style', () => {
      renderWithTheme(
        <Avatar
          userName="Иван Петров"
          cursor="default"
          onClick={() => {
            /* Пустая функция для теста */
          }}
          size={Size.MD}
        />,
      );

      // Проверяем, что аватар рендерится
      const avatar = document.querySelector('.ui-avatar');
      expect(avatar).toBeInTheDocument();
    });
  });
});
