import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { useTheme as useStyledTheme } from 'styled-components';
import { Button } from '../components/ui/buttons/Button';
import { Card } from '../components/ui/Card';
import { Typography } from '../components/ui/Typography';
import {
  getButtonSize,
  getButtonVariant,
  getButtonAnimations,
  getButtonSettings,
  getButtonDisabledStyles,
  getButtonHoverStyles,
  getButtonActiveStyles,
  getButtonFocusStyles,
} from './buttonThemeHandlers';
import { Size } from '../types/sizes';
import { ButtonVariant } from '../types/ui';

const meta: Meta = {
  title: 'UI Kit/Utils/Handlers/Button Theme Handlers',
  parameters: {
    docs: {
      description: {
        component: `
# Хендлеры для работы с темой кнопок

Набор утилит для получения стилей кнопок из темы и работы с различными состояниями.

## Основные функции:

- **getButtonSize** - получает размеры кнопки из темы
- **getButtonVariant** - получает стили варианта кнопки из темы
- **getButtonAnimations** - получает анимации кнопки из темы
- **getButtonSettings** - получает настройки кнопки из темы
- **getButtonDisabledStyles** - получает стили для состояния disabled
- **getButtonHoverStyles** - получает стили для состояния hover
- **getButtonActiveStyles** - получает стили для состояния active
- **getButtonFocusStyles** - получает стили для состояния focus

## Использование:

Эти хендлеры полезны для создания кастомных компонентов кнопок или для получения стилей программно.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Компонент для демонстрации размеров кнопок
const ButtonSizesDemo = () => {
  const theme = useStyledTheme();
  const [selectedSize, setSelectedSize] = useState<Size>(Size.MD);

  const sizes = [Size.SM, Size.MD, Size.LG, Size.XL];

  const buttonSize = getButtonSize(theme.buttons, selectedSize);

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Размеры кнопок
      </Typography>

      <div style={{ marginBottom: '16px' }}>
        <Typography variant="body1" marginBottom="sm">
          Выберите размер:
        </Typography>
        <div
          style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {sizes.map((size) => (
            <Button
              key={size}
              variant={selectedSize === size ? 'primary' : 'outlined'}
              size={size}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <Typography variant="body1" marginBottom="sm">
          <strong>Стили для размера {selectedSize}:</strong>
        </Typography>
        <pre style={{ fontSize: '12px', overflow: 'auto' }}>
          {JSON.stringify(buttonSize, null, 2)}
        </pre>
      </div>
    </Card>
  );
};

// Компонент для демонстрации вариантов кнопок
const ButtonVariantsDemo = () => {
  const theme = useStyledTheme();
  const [selectedVariant, setSelectedVariant] = useState<ButtonVariant>(ButtonVariant.PRIMARY);

  const variants = [
    ButtonVariant.PRIMARY,
    ButtonVariant.SECONDARY,
    ButtonVariant.OUTLINE,
    ButtonVariant.GHOST,
    ButtonVariant.DANGER,
    ButtonVariant.SUCCESS,
    ButtonVariant.WARNING,
  ];

  const buttonVariant = getButtonVariant(theme.buttons, selectedVariant);

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Варианты кнопок
      </Typography>

      <div style={{ marginBottom: '16px' }}>
        <Typography variant="body1" marginBottom="sm">
          Выберите вариант:
        </Typography>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {variants.map((variant) => (
            <Button key={variant} variant={variant} onClick={() => setSelectedVariant(variant)}>
              {variant}
            </Button>
          ))}
        </div>
      </div>

      <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <Typography variant="body1" marginBottom="sm">
          <strong>Стили для варианта {selectedVariant}:</strong>
        </Typography>
        <pre style={{ fontSize: '12px', overflow: 'auto' }}>
          {JSON.stringify(buttonVariant, null, 2)}
        </pre>
      </div>
    </Card>
  );
};

// Компонент для демонстрации состояний кнопок
const ButtonStatesDemo = () => {
  const theme = useStyledTheme();
  const [selectedVariant, setSelectedVariant] = useState<ButtonVariant>(ButtonVariant.PRIMARY);
  const [selectedState, setSelectedState] = useState<
    'default' | 'hover' | 'active' | 'focus' | 'disabled'
  >('default');

  const variants = [
    ButtonVariant.PRIMARY,
    ButtonVariant.SECONDARY,
    ButtonVariant.OUTLINE,
    ButtonVariant.DANGER,
  ];

  const states = [
    { key: 'default', label: 'По умолчанию' },
    { key: 'hover', label: 'При наведении' },
    { key: 'active', label: 'При нажатии' },
    { key: 'focus', label: 'При фокусе' },
    { key: 'disabled', label: 'Отключено' },
  ] as const;

  const getStateStyles = () => {
    switch (selectedState) {
      case 'hover':
        return getButtonHoverStyles(theme.buttons, selectedVariant);
      case 'active':
        return getButtonActiveStyles(theme.buttons, selectedVariant);
      case 'focus':
        return getButtonFocusStyles(theme.buttons, selectedVariant);
      case 'disabled':
        return getButtonDisabledStyles(theme.buttons, selectedVariant);
      default:
        return getButtonVariant(theme.buttons, selectedVariant);
    }
  };

  const stateStyles = getStateStyles();

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Состояния кнопок
      </Typography>

      <div style={{ marginBottom: '16px' }}>
        <Typography variant="body1" marginBottom="sm">
          Выберите вариант:
        </Typography>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
          {variants.map((variant) => (
            <Button
              key={variant}
              variant={variant}
              size="sm"
              onClick={() => setSelectedVariant(variant)}
            >
              {variant}
            </Button>
          ))}
        </div>

        <Typography variant="body1" marginBottom="sm">
          Выберите состояние:
        </Typography>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {states.map((state) => (
            <Button
              key={state.key}
              variant={selectedState === state.key ? 'primary' : 'outlined'}
              size="sm"
              onClick={() => setSelectedState(state.key)}
            >
              {state.label}
            </Button>
          ))}
        </div>
      </div>

      <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <Typography variant="body1" marginBottom="sm">
          <strong>
            Стили для состояния {selectedState} варианта {selectedVariant}:
          </strong>
        </Typography>
        <pre style={{ fontSize: '12px', overflow: 'auto' }}>
          {JSON.stringify(stateStyles, null, 2)}
        </pre>
      </div>
    </Card>
  );
};

// Компонент для демонстрации анимаций и настроек
const ButtonAnimationsDemo = () => {
  const theme = useStyledTheme();

  const animations = getButtonAnimations(theme.buttons);
  const settings = getButtonSettings(theme.buttons);

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Анимации и настройки кнопок
      </Typography>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <Typography variant="body1" marginBottom="sm">
            <strong>Анимации:</strong>
          </Typography>
          <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <pre style={{ fontSize: '12px', overflow: 'auto' }}>
              {JSON.stringify(animations, null, 2)}
            </pre>
          </div>
        </div>

        <div>
          <Typography variant="body1" marginBottom="sm">
            <strong>Настройки:</strong>
          </Typography>
          <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <pre style={{ fontSize: '12px', overflow: 'auto' }}>
              {JSON.stringify(settings, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Компонент для демонстрации практического использования
const ButtonHandlersUsageDemo = () => {
  const theme = useStyledTheme();
  const [customVariant, setCustomVariant] = useState<ButtonVariant>(ButtonVariant.PRIMARY);
  const [customSize, setCustomSize] = useState<Size>(Size.MD);

  // Получаем стили программно
  const buttonSize = getButtonSize(theme.buttons, customSize);
  const buttonVariant = getButtonVariant(theme.buttons, customVariant);
  const hoverStyles = getButtonHoverStyles(theme.buttons, customVariant);
  const activeStyles = getButtonActiveStyles(theme.buttons, customVariant);

  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        Практическое использование хендлеров
      </Typography>

      <div style={{ marginBottom: '16px' }}>
        <Typography variant="body1" marginBottom="sm">
          Настройте параметры:
        </Typography>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
          <div>
            <Typography variant="body2" marginBottom="xs">
              Вариант:
            </Typography>
            <select
              value={customVariant}
              onChange={(e) => setCustomVariant(e.target.value as ButtonVariant)}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value={ButtonVariant.PRIMARY}>Primary</option>
              <option value={ButtonVariant.SECONDARY}>Secondary</option>
              <option value={ButtonVariant.OUTLINE}>Outlined</option>
              <option value={ButtonVariant.DANGER}>Danger</option>
            </select>
          </div>

          <div>
            <Typography variant="body2" marginBottom="xs">
              Размер:
            </Typography>
            <select
              value={customSize}
              onChange={(e) => setCustomSize(e.target.value as Size)}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value={Size.SM}>Small</option>
              <option value={Size.MD}>Medium</option>
              <option value={Size.LG}>Large</option>
              <option value={Size.XL}>Extra Large</option>
            </select>
          </div>
        </div>
      </div>

      <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <Typography variant="body1" marginBottom="sm">
          <strong>Полученные стили:</strong>
        </Typography>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <Typography variant="body2" marginBottom="xs">
              Размер:
            </Typography>
            <pre
              style={{
                fontSize: '10px',
                overflow: 'auto',
                backgroundColor: 'white',
                padding: '8px',
                borderRadius: '4px',
              }}
            >
              {JSON.stringify(buttonSize, null, 2)}
            </pre>
          </div>
          <div>
            <Typography variant="body2" marginBottom="xs">
              Вариант:
            </Typography>
            <pre
              style={{
                fontSize: '10px',
                overflow: 'auto',
                backgroundColor: 'white',
                padding: '8px',
                borderRadius: '4px',
              }}
            >
              {JSON.stringify(buttonVariant, null, 2)}
            </pre>
          </div>
          <div>
            <Typography variant="body2" marginBottom="xs">
              Hover:
            </Typography>
            <pre
              style={{
                fontSize: '10px',
                overflow: 'auto',
                backgroundColor: 'white',
                padding: '8px',
                borderRadius: '4px',
              }}
            >
              {JSON.stringify(hoverStyles, null, 2)}
            </pre>
          </div>
          <div>
            <Typography variant="body2" marginBottom="xs">
              Active:
            </Typography>
            <pre
              style={{
                fontSize: '10px',
                overflow: 'auto',
                backgroundColor: 'white',
                padding: '8px',
                borderRadius: '4px',
              }}
            >
              {JSON.stringify(activeStyles, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </Card>
  );
};

export const ButtonSizes: Story = {
  render: () => <ButtonSizesDemo />,
};

export const ButtonVariants: Story = {
  render: () => <ButtonVariantsDemo />,
};

export const ButtonStates: Story = {
  render: () => <ButtonStatesDemo />,
};

export const ButtonAnimations: Story = {
  render: () => <ButtonAnimationsDemo />,
};

export const ButtonHandlersUsage: Story = {
  render: () => <ButtonHandlersUsageDemo />,
};

export const AllExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <ButtonSizesDemo />
      <ButtonVariantsDemo />
      <ButtonStatesDemo />
      <ButtonAnimationsDemo />
      <ButtonHandlersUsageDemo />
    </div>
  ),
};

