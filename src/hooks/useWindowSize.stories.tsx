import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '../components/ui/buttons/Button';
import { Card } from '../components/ui/Card';
import { Typography } from '../components/ui/Typography';
import { Tag } from '../components/ui/Tag';
import {
  useWindowSize,
  useScreenSize,
  useAvailableSize,
  useIsDesktop,
  DESKTOP_MIN_INNER_WIDTH_PX,
} from './useWindowSize';
import { storybookDemoStyles } from '@/handlers/storybookDemo.styles';
import { StorybookStaggerStack } from '@/handlers/storybookMotionContainers';
import { lightTheme } from '@/themes/themes';

const meta: Meta = {
  title: 'UI Kit/Hooks/useWindowSize',
  parameters: {
    docs: {
      description: {
        component: `
# useWindowSize Hook

Хук для отслеживания размера окна браузера. Включает несколько вариантов для разных типов размеров.

## Основные функции:

### useWindowSize
Отслеживает размер окна браузера (innerWidth, innerHeight).

### useScreenSize
Отслеживает размер экрана устройства (screen.width, screen.height).

### useAvailableSize
Отслеживает доступный размер экрана без панелей браузера (screen.availWidth, screen.availHeight).

### useIsDesktop
\`true\`, если \`innerWidth >= 1025\` (порог как у mobile/tablet пресетов; можно передать свой минимум в пикселях). Основан на \`useWindowSize\` и событии \`resize\`.

## Возвращаемые значения:

- **width** - ширина в пикселях
- **height** - высота в пикселях

## Использование:

\`\`\`typescript
// Размер окна браузера
const { width, height } = useWindowSize();

// Размер экрана устройства
const { width, height } = useScreenSize();

// Доступный размер экрана
const { width, height } = useAvailableSize();

// Десктоп по ширине окна (>= 1025px или свой порог)
const isDesktop = useIsDesktop();
const isDesktopWide = useIsDesktop(1280);
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Отображает статус диапазона ширины окна.
 * @param isActive - Активен ли диапазон.
 */
const renderWindowRangeStatusTag = (isActive: boolean) => (
  <Tag colorVariant={isActive ? 'success' : 'neutral'} appearance={isActive ? 'filled' : 'outline'}>
    {isActive ? 'Активно' : 'Неактивно'}
  </Tag>
);

// Компонент для демонстрации базового использования
const BasicWindowSizeDemo = () => {
  const windowSize = useWindowSize();
  const screenSize = useScreenSize();
  const availableSize = useAvailableSize();
  const isDesktop = useIsDesktop();

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Базовое использование useWindowSize
      </Typography>

      <div style={storybookDemoStyles.marginBottom16}>
        <Typography variant="body1" marginBottom="sm">
          Измените размер окна браузера, чтобы увидеть изменения
        </Typography>
      </div>

      <div style={storybookDemoStyles.gridAutoFitMin200Gap12MarginBottom16}>
        <div style={storybookDemoStyles.windowSizeMetricTile}>
          <Typography variant="body2" marginBottom="xs">
            <strong>Окно браузера</strong>
          </Typography>
          <Typography variant="body2" marginBottom="xs" style={storybookDemoStyles.typographyFinePrint12}>
            innerWidth × innerHeight
          </Typography>
          <Typography variant="h6" style={storybookDemoStyles.windowSizeValuePrimary}>
            {windowSize.width} × {windowSize.height}
          </Typography>
        </div>

        <div style={storybookDemoStyles.windowSizeMetricTile}>
          <Typography variant="body2" marginBottom="xs">
            <strong>Экран устройства</strong>
          </Typography>
          <Typography variant="body2" marginBottom="xs" style={storybookDemoStyles.typographyFinePrint12}>
            screen.width × screen.height
          </Typography>
          <Typography variant="h6" style={storybookDemoStyles.windowSizeValueSuccess}>
            {screenSize.width} × {screenSize.height}
          </Typography>
        </div>

        <div style={storybookDemoStyles.windowSizeMetricTile}>
          <Typography variant="body2" marginBottom="xs">
            <strong>Доступный размер</strong>
          </Typography>
          <Typography variant="body2" marginBottom="xs" style={storybookDemoStyles.typographyFinePrint12}>
            screen.availWidth × screen.availHeight
          </Typography>
          <Typography variant="h6" style={storybookDemoStyles.windowSizeValueWarning}>
            {availableSize.width} × {availableSize.height}
          </Typography>
        </div>
      </div>

      <div style={storybookDemoStyles.demoResultPanel}>
        <Typography variant="body1" marginBottom="sm">
          <strong>Размеры:</strong>
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Окно браузера: {windowSize.width} × {windowSize.height}px
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Экран устройства: {screenSize.width} × {screenSize.height}px
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Доступный размер: {availableSize.width} × {availableSize.height}px
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          <strong>useIsDesktop</strong> (порог {DESKTOP_MIN_INNER_WIDTH_PX}px):{' '}
          {isDesktop ? 'да' : 'нет'}
        </Typography>
      </div>
    </Card>
  );
};

// Компонент для демонстрации адаптивности
const ResponsiveDemo = () => {
  const { width, height } = useWindowSize();

  const getDeviceType = () => {
    if (width <= 768) {
      return { type: 'Mobile', bg: lightTheme.colors.backgroundTertiary, icon: '📱' };
    }
    if (width <= 1024) {
      return { type: 'Tablet', bg: lightTheme.colors.backgroundQuaternary, icon: '📱' };
    }
    if (width <= 1440) {
      return { type: 'Desktop', bg: lightTheme.colors.backgroundSecondary, icon: '🖥️' };
    }
    return { type: 'Large Desktop', bg: lightTheme.colors.card, icon: '🖥️' };
  };

  const device = getDeviceType();

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Адаптивность на основе размера окна
      </Typography>

      <div style={storybookDemoStyles.marginBottom16}>
        <Typography variant="body1" marginBottom="sm">
          Измените размер окна, чтобы увидеть изменение типа устройства
        </Typography>
      </div>

      <div
        style={{
          ...storybookDemoStyles.responsiveDeviceHeroBanner,
          backgroundColor: device.bg,
        }}
      >
        <Typography variant="h2" marginBottom="md">
          {device.icon}
        </Typography>
        <Typography variant="h4" marginBottom="sm">
          {device.type}
        </Typography>
        <Typography variant="body1">
          {width} × {height}px
        </Typography>
      </div>

      <div style={storybookDemoStyles.gridAutoFitMin120Gap8MarginBottom16}>
        <div style={storybookDemoStyles.windowSizeBreakpointCell}>
          <Typography variant="body2" style={storybookDemoStyles.typographyFinePrint12}>
            Mobile ≤ 768px
          </Typography>
          {renderWindowRangeStatusTag(width <= 768)}
        </div>
        <div style={storybookDemoStyles.windowSizeBreakpointCell}>
          <Typography variant="body2" style={storybookDemoStyles.typographyFinePrint12}>
            Tablet 769-1024px
          </Typography>
          {renderWindowRangeStatusTag(width > 768 && width <= 1024)}
        </div>
        <div style={storybookDemoStyles.windowSizeBreakpointCell}>
          <Typography variant="body2" style={storybookDemoStyles.typographyFinePrint12}>
            Desktop 1025-1440px
          </Typography>
          {renderWindowRangeStatusTag(width > 1024 && width <= 1440)}
        </div>
        <div style={storybookDemoStyles.windowSizeBreakpointCell}>
          <Typography variant="body2" style={storybookDemoStyles.typographyFinePrint12}>
            Large {'>'} 1440px
          </Typography>
          {renderWindowRangeStatusTag(width > 1440)}
        </div>
      </div>

      <div style={storybookDemoStyles.demoResultPanel}>
        <Typography variant="body1" marginBottom="sm">
          <strong>Текущее состояние:</strong>
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Размер окна: {width} × {height}px
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Тип устройства: {device.type}
        </Typography>
        <Typography variant="body2">
          Соотношение сторон: {(width / height).toFixed(2)}
        </Typography>
      </div>
    </Card>
  );
};

// Компонент для демонстрации сравнения размеров
const SizeComparisonDemo = () => {
  const windowSize = useWindowSize();
  const screenSize = useScreenSize();
  const availableSize = useAvailableSize();

  const getSizeDifference = () => {
    const windowToScreen = {
      width: screenSize.width - windowSize.width,
      height: screenSize.height - windowSize.height,
    };
    const screenToAvailable = {
      width: screenSize.width - availableSize.width,
      height: screenSize.height - availableSize.height,
    };
    return { windowToScreen, screenToAvailable };
  };

  const differences = getSizeDifference();

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Сравнение размеров
      </Typography>

      <div style={storybookDemoStyles.marginBottom16}>
        <Typography variant="body1" marginBottom="sm">
          Разница между различными типами размеров
        </Typography>
      </div>

      <div style={storybookDemoStyles.gridAutoFitMin200Gap12MarginBottom16}>
        <div style={storybookDemoStyles.windowSizeMutedPanel12}>
          <Typography variant="body2" marginBottom="xs">
            <strong>Окно браузера</strong>
          </Typography>
          <Typography variant="body2" marginBottom="xs" style={storybookDemoStyles.typographyFinePrint12}>
            Видимая область
          </Typography>
          <Typography variant="h6" style={storybookDemoStyles.windowSizeValuePrimary}>
            {windowSize.width} × {windowSize.height}
          </Typography>
        </div>

        <div style={storybookDemoStyles.windowSizeMutedPanel12}>
          <Typography variant="body2" marginBottom="xs">
            <strong>Экран устройства</strong>
          </Typography>
          <Typography variant="body2" marginBottom="xs" style={storybookDemoStyles.typographyFinePrint12}>
            Полный размер экрана
          </Typography>
          <Typography variant="h6" style={storybookDemoStyles.windowSizeValueSuccess}>
            {screenSize.width} × {screenSize.height}
          </Typography>
        </div>

        <div style={storybookDemoStyles.windowSizeMutedPanel12}>
          <Typography variant="body2" marginBottom="xs">
            <strong>Доступный размер</strong>
          </Typography>
          <Typography variant="body2" marginBottom="xs" style={storybookDemoStyles.typographyFinePrint12}>
            Без панелей браузера
          </Typography>
          <Typography variant="h6" style={storybookDemoStyles.windowSizeValueWarning}>
            {availableSize.width} × {availableSize.height}
          </Typography>
        </div>
      </div>

      <div style={storybookDemoStyles.gridTwoColumnsGap12MarginBottom16}>
        <div style={storybookDemoStyles.windowSizeMutedPanel12}>
          <Typography variant="body2" marginBottom="xs">
            <strong>Разница: Экран - Окно</strong>
          </Typography>
          <Typography variant="body2" style={storybookDemoStyles.typographyFinePrint12}>
            Ширина: {differences.windowToScreen.width}px
          </Typography>
          <Typography variant="body2" style={storybookDemoStyles.typographyFinePrint12}>
            Высота: {differences.windowToScreen.height}px
          </Typography>
        </div>

        <div style={storybookDemoStyles.windowSizeMutedPanel12}>
          <Typography variant="body2" marginBottom="xs">
            <strong>Разница: Экран - Доступный</strong>
          </Typography>
          <Typography variant="body2" style={storybookDemoStyles.typographyFinePrint12}>
            Ширина: {differences.screenToAvailable.width}px
          </Typography>
          <Typography variant="body2" style={storybookDemoStyles.typographyFinePrint12}>
            Высота: {differences.screenToAvailable.height}px
          </Typography>
        </div>
      </div>

      <div style={storybookDemoStyles.demoResultPanel}>
        <Typography variant="body1" marginBottom="sm">
          <strong>Анализ размеров:</strong>
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Окно браузера: {windowSize.width} × {windowSize.height}px
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Экран устройства: {screenSize.width} × {screenSize.height}px
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Доступный размер: {availableSize.width} × {availableSize.height}px
        </Typography>
        <Typography variant="body2">
          Использование экрана: {((windowSize.width * windowSize.height) / (screenSize.width * screenSize.height) * 100).toFixed(1)}%
        </Typography>
      </div>
    </Card>
  );
};

// Компонент для демонстрации ориентации
const OrientationDemo = () => {
  const { width, height } = useWindowSize();
  const isPortrait = height > width;
  const isLandscape = width > height;
  const isSquare = width === height;

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Ориентация окна
      </Typography>

      <div style={storybookDemoStyles.marginBottom16}>
        <Typography variant="body1" marginBottom="sm">
          Измените размер окна, чтобы увидеть изменение ориентации
        </Typography>
      </div>

      <div style={storybookDemoStyles.gridThreeColumnsGap12MarginBottom16}>
        <div
          style={{
            ...storybookDemoStyles.orientationTileBase,
            ...(isPortrait
              ? storybookDemoStyles.orientationTileActiveSuccess
              : storybookDemoStyles.orientationTileInactiveBorder),
          }}
        >
          <Typography variant="h4" marginBottom="sm">
            📱
          </Typography>
          <Typography variant="body2" marginBottom="xs">
            <strong>Портретная</strong>
          </Typography>
          <Typography variant="body2" style={storybookDemoStyles.typographyFinePrint12}>
            Высота {'>'} Ширины
          </Typography>
          <div style={storybookDemoStyles.marginTop8}>{renderWindowRangeStatusTag(isPortrait)}</div>
        </div>

        <div
          style={{
            ...storybookDemoStyles.orientationTileBase,
            ...(isLandscape
              ? storybookDemoStyles.orientationTileActivePrimary
              : storybookDemoStyles.orientationTileInactiveBorder),
          }}
        >
          <Typography variant="h4" marginBottom="sm">
            🖥️
          </Typography>
          <Typography variant="body2" marginBottom="xs">
            <strong>Альбомная</strong>
          </Typography>
          <Typography variant="body2" style={storybookDemoStyles.typographyFinePrint12}>
            Ширина {'>'} Высоты
          </Typography>
          <div style={storybookDemoStyles.marginTop8}>{renderWindowRangeStatusTag(isLandscape)}</div>
        </div>

        <div
          style={{
            ...storybookDemoStyles.orientationTileBase,
            ...(isSquare
              ? storybookDemoStyles.orientationTileActiveWarning
              : storybookDemoStyles.orientationTileInactiveBorder),
          }}
        >
          <Typography variant="h4" marginBottom="sm">
            ⬜
          </Typography>
          <Typography variant="body2" marginBottom="xs">
            <strong>Квадратная</strong>
          </Typography>
          <Typography variant="body2" style={storybookDemoStyles.typographyFinePrint12}>
            Ширина = Высота
          </Typography>
          <div style={storybookDemoStyles.marginTop8}>{renderWindowRangeStatusTag(isSquare)}</div>
        </div>
      </div>

      <div style={storybookDemoStyles.demoResultPanel}>
        <Typography variant="body1" marginBottom="sm">
          <strong>Ориентация:</strong>
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Размер: {width} × {height}px
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Портретная: {isPortrait ? 'Да' : 'Нет'}
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Альбомная: {isLandscape ? 'Да' : 'Нет'}
        </Typography>
        <Typography variant="body2">
          Квадратная: {isSquare ? 'Да' : 'Нет'}
        </Typography>
      </div>
    </Card>
  );
};

// Компонент для демонстрации реального времени
const RealTimeDemo = () => {
  const { width, height } = useWindowSize();
  const [changeCount, setChangeCount] = React.useState(0);
  const [lastChange, setLastChange] = React.useState<Date | null>(null);

  React.useEffect(() => {
    setChangeCount(prev => prev + 1);
    setLastChange(new Date());
  }, [width, height]);

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Отслеживание в реальном времени
      </Typography>

      <div style={storybookDemoStyles.marginBottom16}>
        <Typography variant="body1" marginBottom="sm">
          Изменяйте размер окна и наблюдайте за обновлениями
        </Typography>
      </div>

      <div style={storybookDemoStyles.gridAutoFitMin150Gap12MarginBottom16}>
        <div style={storybookDemoStyles.windowSizeMetricTile}>
          <Typography variant="body2" marginBottom="xs">
            <strong>Ширина</strong>
          </Typography>
          <Typography variant="h4" style={storybookDemoStyles.windowSizeValuePrimary}>
            {width}
          </Typography>
        </div>

        <div style={storybookDemoStyles.windowSizeMetricTile}>
          <Typography variant="body2" marginBottom="xs">
            <strong>Высота</strong>
          </Typography>
          <Typography variant="h4" style={storybookDemoStyles.windowSizeValueSuccess}>
            {height}
          </Typography>
        </div>

        <div style={storybookDemoStyles.windowSizeMetricTile}>
          <Typography variant="body2" marginBottom="xs">
            <strong>Изменений</strong>
          </Typography>
          <Typography variant="h4" style={storybookDemoStyles.windowSizeValueDanger}>
            {changeCount}
          </Typography>
        </div>
      </div>

      <div style={storybookDemoStyles.demoResultPanel}>
        <Typography variant="body1" marginBottom="sm">
          <strong>Статистика:</strong>
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Текущий размер: {width} × {height}px
        </Typography>
        <Typography variant="body2" marginBottom="xs">
          Количество изменений: {changeCount}
        </Typography>
        <Typography variant="body2">
          Последнее изменение: {lastChange ? lastChange.toLocaleTimeString() : 'Нет'}
        </Typography>
      </div>
    </Card>
  );
};

export const BasicUsage: Story = {
  render: () => <BasicWindowSizeDemo />,
};

export const Responsive: Story = {
  render: () => <ResponsiveDemo />,
};

export const SizeComparison: Story = {
  render: () => <SizeComparisonDemo />,
};

export const Orientation: Story = {
  render: () => <OrientationDemo />,
};

export const RealTime: Story = {
  render: () => <RealTimeDemo />,
};

export const AllExamples: Story = {
  render: () => (
    <StorybookStaggerStack>
      <BasicWindowSizeDemo />
      <ResponsiveDemo />
      <SizeComparisonDemo />
      <OrientationDemo />
      <RealTimeDemo />
    </StorybookStaggerStack>
  ),
};

