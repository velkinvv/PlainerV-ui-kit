import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '../components/ui/buttons/Button';
import { Card } from '../components/ui/Card';
import { Typography } from '../components/ui/Typography';
import { Badge } from '../components/ui/Badge';
import {
  useMediaQuery,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  useIsLargeScreen,
  useIsPortrait,
  useIsLandscape,
  useSupportsHover,
  useSupportsTouch,
} from './useMediaQuery';

const meta: Meta = {
  title: 'Hooks/useMediaQuery',
  parameters: {
    docs: {
      description: {
        component: `
# useMediaQuery Hook

Хук для отслеживания медиа-запросов и адаптивности. Позволяет реагировать на изменения размера экрана, ориентации и других медиа-свойств.

## Основные функции:

### useMediaQuery
Базовый хук для произвольных медиа-запросов.

### Предопределенные хуки
- **useIsMobile** - мобильные устройства (max-width: 768px)
- **useIsTablet** - планшеты (769px - 1024px)
- **useIsDesktop** - десктопы (min-width: 1025px)
- **useIsLargeScreen** - большие экраны (min-width: 1440px)
- **useIsPortrait** - портретная ориентация
- **useIsLandscape** - альбомная ориентация
- **useSupportsHover** - поддержка hover
- **useSupportsTouch** - сенсорные устройства

## Использование:

\`\`\`typescript
// Произвольный медиа-запрос
const isSmallScreen = useMediaQuery('(max-width: 600px)');

// Предопределенные хуки
const isMobile = useIsMobile();
const isTablet = useIsTablet();
const isDesktop = useIsDesktop();
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Компонент для демонстрации базового использования
const BasicMediaQueryDemo = () => {
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const isMediumScreen = useMediaQuery('(min-width: 601px) and (max-width: 1024px)');
  const isLargeScreen = useMediaQuery('(min-width: 1025px)');

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Базовое использование useMediaQuery
      </Typography>

      <div style={{ marginBottom: '16px' }}>
        <Typography variant="body1" marginBottom="sm">
          Измените размер окна браузера, чтобы увидеть изменения
        </Typography>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
          marginBottom: '16px',
        }}
      >
        <div
          style={{
            padding: '12px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" marginBottom="xs">
            <strong>Малый экран</strong>
          </Typography>
          <Typography variant="body2" marginBottom="xs">
            ≤ 600px
          </Typography>
          <Badge variant={isSmallScreen ? 'success' : 'outlined'}>
            {isSmallScreen ? 'Активно' : 'Неактивно'}
          </Badge>
        </div>

        <div
          style={{
            padding: '12px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" marginBottom="xs">
            <strong>Средний экран</strong>
          </Typography>
          <Typography variant="body2" marginBottom="xs">
            601px - 1024px
          </Typography>
          <Badge variant={isMediumScreen ? 'success' : 'outlined'}>
            {isMediumScreen ? 'Активно' : 'Неактивно'}
          </Badge>
        </div>

        <div
          style={{
            padding: '12px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" marginBottom="xs">
            <strong>Большой экран</strong>
          </Typography>
          <Typography variant="body2" marginBottom="xs">
            ≥ 1025px
          </Typography>
          <Badge variant={isLargeScreen ? 'success' : 'outlined'}>
            {isLargeScreen ? 'Активно' : 'Неактивно'}
          </Badge>
        </div>
      </div>

      <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <Typography variant="body1" marginBottom="sm">
          <strong>Текущее состояние:</strong>
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Малый экран: {isSmallScreen ? 'Да' : 'Нет'}
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Средний экран: {isMediumScreen ? 'Да' : 'Нет'}
        </Typography>
        <Typography variant="body2">Большой экран: {isLargeScreen ? 'Да' : 'Нет'}</Typography>
      </div>
    </Card>
  );
};

// Компонент для демонстрации предопределенных хуков
const PredefinedHooksDemo = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();
  const isLargeScreen = useIsLargeScreen();

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Предопределенные хуки
      </Typography>

      <div style={{ marginBottom: '16px' }}>
        <Typography variant="body1" marginBottom="sm">
          Стандартные брейкпоинты для устройств
        </Typography>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '12px',
          marginBottom: '16px',
        }}
      >
        <div
          style={{
            padding: '12px',
            backgroundColor: '#e3f2fd',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" marginBottom="xs">
            <strong>Mobile</strong>
          </Typography>
          <Typography variant="body2" marginBottom="xs" style={{ fontSize: '12px' }}>
            ≤ 768px
          </Typography>
          <Badge variant={isMobile ? 'success' : 'outlined'}>{isMobile ? 'Да' : 'Нет'}</Badge>
        </div>

        <div
          style={{
            padding: '12px',
            backgroundColor: '#e8f5e8',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" marginBottom="xs">
            <strong>Tablet</strong>
          </Typography>
          <Typography variant="body2" marginBottom="xs" style={{ fontSize: '12px' }}>
            769px - 1024px
          </Typography>
          <Badge variant={isTablet ? 'success' : 'outlined'}>{isTablet ? 'Да' : 'Нет'}</Badge>
        </div>

        <div
          style={{
            padding: '12px',
            backgroundColor: '#fff3e0',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" marginBottom="xs">
            <strong>Desktop</strong>
          </Typography>
          <Typography variant="body2" marginBottom="xs" style={{ fontSize: '12px' }}>
            ≥ 1025px
          </Typography>
          <Badge variant={isDesktop ? 'success' : 'outlined'}>{isDesktop ? 'Да' : 'Нет'}</Badge>
        </div>

        <div
          style={{
            padding: '12px',
            backgroundColor: '#f3e5f5',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" marginBottom="xs">
            <strong>Large</strong>
          </Typography>
          <Typography variant="body2" marginBottom="xs" style={{ fontSize: '12px' }}>
            ≥ 1440px
          </Typography>
          <Badge variant={isLargeScreen ? 'success' : 'outlined'}>
            {isLargeScreen ? 'Да' : 'Нет'}
          </Badge>
        </div>
      </div>

      <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <Typography variant="body1" marginBottom="sm">
          <strong>Определение устройства:</strong>
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Мобильное: {isMobile ? 'Да' : 'Нет'}
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Планшет: {isTablet ? 'Да' : 'Нет'}
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Десктоп: {isDesktop ? 'Да' : 'Нет'}
        </Typography>
        <Typography variant="body2">Большой экран: {isLargeScreen ? 'Да' : 'Нет'}</Typography>
      </div>
    </Card>
  );
};

// Компонент для демонстрации ориентации
const OrientationDemo = () => {
  const isPortrait = useIsPortrait();
  const isLandscape = useIsLandscape();

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Ориентация экрана
      </Typography>

      <div style={{ marginBottom: '16px' }}>
        <Typography variant="body1" marginBottom="sm">
          Поверните устройство или измените размер окна
        </Typography>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '16px',
        }}
      >
        <div
          style={{
            padding: '20px',
            backgroundColor: isPortrait ? '#e8f5e8' : '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" marginBottom="sm">
            📱
          </Typography>
          <Typography variant="body1" marginBottom="xs">
            <strong>Портретная</strong>
          </Typography>
          <Badge variant={isPortrait ? 'success' : 'outlined'}>
            {isPortrait ? 'Активно' : 'Неактивно'}
          </Badge>
        </div>

        <div
          style={{
            padding: '20px',
            backgroundColor: isLandscape ? '#e3f2fd' : '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" marginBottom="sm">
            🖥️
          </Typography>
          <Typography variant="body1" marginBottom="xs">
            <strong>Альбомная</strong>
          </Typography>
          <Badge variant={isLandscape ? 'success' : 'outlined'}>
            {isLandscape ? 'Активно' : 'Неактивно'}
          </Badge>
        </div>
      </div>

      <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <Typography variant="body1" marginBottom="sm">
          <strong>Ориентация:</strong>
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Портретная: {isPortrait ? 'Да' : 'Нет'}
        </Typography>
        <Typography variant="body2">Альбомная: {isLandscape ? 'Да' : 'Нет'}</Typography>
      </div>
    </Card>
  );
};

// Компонент для демонстрации поддержки устройств
const DeviceSupportDemo = () => {
  const supportsHover = useSupportsHover();
  const supportsTouch = useSupportsTouch();

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Поддержка устройств
      </Typography>

      <div style={{ marginBottom: '16px' }}>
        <Typography variant="body1" marginBottom="sm">
          Определение возможностей устройства
        </Typography>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '16px',
        }}
      >
        <div
          style={{
            padding: '20px',
            backgroundColor: supportsHover ? '#e8f5e8' : '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" marginBottom="sm">
            🖱️
          </Typography>
          <Typography variant="body1" marginBottom="xs">
            <strong>Hover</strong>
          </Typography>
          <Typography variant="body2" marginBottom="xs" style={{ fontSize: '12px' }}>
            Поддержка наведения
          </Typography>
          <Badge variant={supportsHover ? 'success' : 'outlined'}>
            {supportsHover ? 'Поддерживается' : 'Не поддерживается'}
          </Badge>
        </div>

        <div
          style={{
            padding: '20px',
            backgroundColor: supportsTouch ? '#e3f2fd' : '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" marginBottom="sm">
            👆
          </Typography>
          <Typography variant="body1" marginBottom="xs">
            <strong>Touch</strong>
          </Typography>
          <Typography variant="body2" marginBottom="xs" style={{ fontSize: '12px' }}>
            Сенсорное управление
          </Typography>
          <Badge variant={supportsTouch ? 'success' : 'outlined'}>
            {supportsTouch ? 'Поддерживается' : 'Не поддерживается'}
          </Badge>
        </div>
      </div>

      <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <Typography variant="body1" marginBottom="sm">
          <strong>Возможности устройства:</strong>
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Hover: {supportsHover ? 'Поддерживается' : 'Не поддерживается'}
        </Typography>
        <Typography variant="body2">
          Touch: {supportsTouch ? 'Поддерживается' : 'Не поддерживается'}
        </Typography>
      </div>
    </Card>
  );
};

// Компонент для демонстрации адаптивного контента
const ResponsiveContentDemo = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();

  const getContent = () => {
    if (isMobile) {
      return {
        title: 'Мобильная версия',
        description: 'Оптимизировано для смартфонов',
        icon: '📱',
        color: '#e3f2fd',
      };
    } else if (isTablet) {
      return {
        title: 'Планшетная версия',
        description: 'Оптимизировано для планшетов',
        icon: '📱',
        color: '#e8f5e8',
      };
    } else {
      return {
        title: 'Десктопная версия',
        description: 'Оптимизировано для компьютеров',
        icon: '🖥️',
        color: '#fff3e0',
      };
    }
  };

  const content = getContent();

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Адаптивный контент
      </Typography>

      <div style={{ marginBottom: '16px' }}>
        <Typography variant="body1" marginBottom="sm">
          Контент меняется в зависимости от размера экрана
        </Typography>
      </div>

      <div
        style={{
          padding: '24px',
          backgroundColor: content.color,
          borderRadius: '12px',
          textAlign: 'center',
          marginBottom: '16px',
        }}
      >
        <Typography variant="h2" marginBottom="md">
          {content.icon}
        </Typography>
        <Typography variant="h4" marginBottom="sm">
          {content.title}
        </Typography>
        <Typography variant="body1">{content.description}</Typography>
      </div>

      <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <Typography variant="body1" marginBottom="sm">
          <strong>Текущее устройство:</strong>
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Мобильное: {isMobile ? 'Да' : 'Нет'}
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Планшет: {isTablet ? 'Да' : 'Нет'}
        </Typography>
        <Typography variant="body2">Десктоп: {isDesktop ? 'Да' : 'Нет'}</Typography>
      </div>
    </Card>
  );
};

// Компонент для демонстрации кастомных медиа-запросов
const CustomMediaQueryDemo = () => {
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const isHighContrast = useMediaQuery('(prefers-contrast: high)');
  const isReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const isPrint = useMediaQuery('print');

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Кастомные медиа-запросы
      </Typography>

      <div style={{ marginBottom: '16px' }}>
        <Typography variant="body1" marginBottom="sm">
          Специальные медиа-запросы для доступности и предпочтений
        </Typography>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
          marginBottom: '16px',
        }}
      >
        <div
          style={{
            padding: '12px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" marginBottom="xs">
            <strong>Темная тема</strong>
          </Typography>
          <Typography variant="body2" marginBottom="xs" style={{ fontSize: '12px' }}>
            prefers-color-scheme: dark
          </Typography>
          <Badge variant={isDarkMode ? 'success' : 'outlined'}>
            {isDarkMode ? 'Включена' : 'Выключена'}
          </Badge>
        </div>

        <div
          style={{
            padding: '12px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" marginBottom="xs">
            <strong>Высокий контраст</strong>
          </Typography>
          <Typography variant="body2" marginBottom="xs" style={{ fontSize: '12px' }}>
            prefers-contrast: high
          </Typography>
          <Badge variant={isHighContrast ? 'success' : 'outlined'}>
            {isHighContrast ? 'Включен' : 'Выключен'}
          </Badge>
        </div>

        <div
          style={{
            padding: '12px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" marginBottom="xs">
            <strong>Уменьшенное движение</strong>
          </Typography>
          <Typography variant="body2" marginBottom="xs" style={{ fontSize: '12px' }}>
            prefers-reduced-motion: reduce
          </Typography>
          <Badge variant={isReducedMotion ? 'success' : 'outlined'}>
            {isReducedMotion ? 'Включено' : 'Выключено'}
          </Badge>
        </div>

        <div
          style={{
            padding: '12px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" marginBottom="xs">
            <strong>Печать</strong>
          </Typography>
          <Typography variant="body2" marginBottom="xs" style={{ fontSize: '12px' }}>
            print
          </Typography>
          <Badge variant={isPrint ? 'success' : 'outlined'}>
            {isPrint ? 'Активно' : 'Неактивно'}
          </Badge>
        </div>
      </div>

      <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <Typography variant="body1" marginBottom="sm">
          <strong>Предпочтения пользователя:</strong>
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Темная тема: {isDarkMode ? 'Да' : 'Нет'}
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Высокий контраст: {isHighContrast ? 'Да' : 'Нет'}
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Уменьшенное движение: {isReducedMotion ? 'Да' : 'Нет'}
        </Typography>
        <Typography variant="body2">Режим печати: {isPrint ? 'Да' : 'Нет'}</Typography>
      </div>
    </Card>
  );
};

export const BasicUsage: Story = {
  render: () => <BasicMediaQueryDemo />,
};

export const PredefinedHooks: Story = {
  render: () => <PredefinedHooksDemo />,
};

export const Orientation: Story = {
  render: () => <OrientationDemo />,
};

export const DeviceSupport: Story = {
  render: () => <DeviceSupportDemo />,
};

export const ResponsiveContent: Story = {
  render: () => <ResponsiveContentDemo />,
};

export const CustomMediaQueries: Story = {
  render: () => <CustomMediaQueryDemo />,
};

export const AllExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <BasicMediaQueryDemo />
      <PredefinedHooksDemo />
      <OrientationDemo />
      <DeviceSupportDemo />
      <ResponsiveContentDemo />
      <CustomMediaQueryDemo />
    </div>
  ),
};
