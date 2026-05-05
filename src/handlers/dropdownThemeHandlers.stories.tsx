import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Size } from '../types/sizes';
import { lightTheme, darkTheme } from '../themes/themes';
import {
  getDropdownSize,
  getDropdownVariant,
  getDropdownState,
  getDropdownAnimations,
  getDropdownSettings,
  getDropdownOpenStyles,
  getDropdownCloseStyles,
  getDropdownItemStyles,
  getDropdownContainerStyles,
} from './dropdownThemeHandlers';
import { storybookDemoStyles } from '@/handlers/storybookDemo.styles';

const meta: Meta = {
  title: 'UI Kit/Utils/Handlers/Dropdown Theme Handlers',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Хендлеры для работы с темами dropdown компонентов. Предоставляют функции для получения размеров, вариантов, состояний и анимаций dropdown.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Демо компонент для отображения стилей dropdown
const DropdownDemo = ({
  theme,
  size,
  variant,
  state,
}: {
  theme: typeof lightTheme;
  size: Size;
  variant: 'default' | 'elevated' | 'outlined';
  state?: 'hover' | 'active' | 'disabled' | 'selected';
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const containerStyles = getDropdownContainerStyles(theme.dropdowns, size, variant);
  const itemStyles = getDropdownItemStyles(theme.dropdowns, size, state);
  const openStyles = getDropdownOpenStyles(theme.dropdowns);
  const closeStyles = getDropdownCloseStyles(theme.dropdowns);

  return (
    <div style={storybookDemoStyles.inlineBlockRelative}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={storybookDemoStyles.storyDropdownTriggerButton}
      >
        Открыть Dropdown
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: '4px',
            ...containerStyles,
            ...(isOpen ? openStyles : closeStyles),
          }}
        >
          <div style={itemStyles}>Элемент 1</div>
          <div style={itemStyles}>Элемент 2</div>
          <div style={itemStyles}>Элемент 3</div>
        </div>
      )}
    </div>
  );
};

export const DropdownSizes: Story = {
  render: () => (
    <div style={storybookDemoStyles.columnFlexGap20}>
      <h3>Размеры Dropdown</h3>
      {Object.values(Size).map(size => (
        <div key={size}>
          <h4>Размер: {size}</h4>
          <div style={storybookDemoStyles.rowFlexGap10AlignCenter}>
            <DropdownDemo theme={lightTheme} size={size} variant="default" />
            <div style={storybookDemoStyles.storyJsonCaption12}>
              <pre>{JSON.stringify(getDropdownSize(lightTheme.dropdowns, size), null, 2)}</pre>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const DropdownVariants: Story = {
  render: () => (
    <div style={storybookDemoStyles.columnFlexGap20}>
      <h3>Варианты Dropdown</h3>
      {(['default', 'elevated', 'outlined'] as const).map(variant => (
        <div key={variant}>
          <h4>Вариант: {variant}</h4>
          <div style={storybookDemoStyles.rowFlexGap10AlignCenter}>
            <DropdownDemo theme={lightTheme} size={Size.MD} variant={variant} />
            <div style={storybookDemoStyles.storyJsonCaption12}>
              <pre>
                {JSON.stringify(getDropdownVariant(lightTheme.dropdowns, variant), null, 2)}
              </pre>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const DropdownStates: Story = {
  render: () => (
    <div style={storybookDemoStyles.columnFlexGap20}>
      <h3>Состояния Dropdown</h3>
      {(['hover', 'active', 'disabled', 'selected'] as const).map(state => (
        <div key={state}>
          <h4>Состояние: {state}</h4>
          <div style={storybookDemoStyles.rowFlexGap10AlignCenter}>
            <DropdownDemo theme={lightTheme} size={Size.MD} variant="default" state={state} />
            <div style={storybookDemoStyles.storyJsonCaption12}>
              <pre>{JSON.stringify(getDropdownState(lightTheme.dropdowns, state), null, 2)}</pre>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const DropdownAnimations: Story = {
  render: () => (
    <div style={storybookDemoStyles.columnFlexGap20}>
      <h3>Анимации Dropdown</h3>
      <div>
        <h4>Общие анимации</h4>
        <pre style={storybookDemoStyles.demoPreCodeBlock}>
          {JSON.stringify(getDropdownAnimations(lightTheme.dropdowns), null, 2)}
        </pre>
      </div>

      <div>
        <h4>Стили открытия</h4>
        <pre style={storybookDemoStyles.demoPreCodeBlock}>
          {JSON.stringify(getDropdownOpenStyles(lightTheme.dropdowns), null, 2)}
        </pre>
      </div>

      <div>
        <h4>Стили закрытия</h4>
        <pre style={storybookDemoStyles.demoPreCodeBlock}>
          {JSON.stringify(getDropdownCloseStyles(lightTheme.dropdowns), null, 2)}
        </pre>
      </div>
    </div>
  ),
};

export const DropdownSettings: Story = {
  render: () => (
    <div style={storybookDemoStyles.columnFlexGap20}>
      <h3>Настройки Dropdown</h3>
      <div>
        <h4>Общие настройки</h4>
        <pre style={storybookDemoStyles.demoPreCodeBlock}>
          {JSON.stringify(getDropdownSettings(lightTheme.dropdowns), null, 2)}
        </pre>
      </div>
    </div>
  ),
};

export const DropdownItemStyles: Story = {
  render: () => (
    <div style={storybookDemoStyles.columnFlexGap20}>
      <h3>Стили элементов Dropdown</h3>
      {Object.values(Size).map(size => (
        <div key={size}>
          <h4>Размер: {size}</h4>
          <div style={storybookDemoStyles.rowFlexGap10AlignCenter}>
            <div style={getDropdownItemStyles(lightTheme.dropdowns, size)}>Элемент dropdown</div>
            <div style={storybookDemoStyles.storyJsonCaption12}>
              <pre>
                {JSON.stringify(getDropdownItemStyles(lightTheme.dropdowns, size), null, 2)}
              </pre>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const DropdownContainerStyles: Story = {
  render: () => (
    <div style={storybookDemoStyles.columnFlexGap20}>
      <h3>Стили контейнера Dropdown</h3>
      {(['default', 'elevated', 'outlined'] as const).map(variant => (
        <div key={variant}>
          <h4>Вариант: {variant}</h4>
          <div style={storybookDemoStyles.rowFlexGap10AlignCenter}>
            <div style={getDropdownContainerStyles(lightTheme.dropdowns, Size.MD, variant)}>
              <div style={storybookDemoStyles.dropdownStoryMenuItemPad}>Элемент 1</div>
              <div style={storybookDemoStyles.dropdownStoryMenuItemPad}>Элемент 2</div>
              <div style={storybookDemoStyles.dropdownStoryMenuItemPad}>Элемент 3</div>
            </div>
            <div style={storybookDemoStyles.storyJsonCaption12}>
              <pre>
                {JSON.stringify(
                  getDropdownContainerStyles(lightTheme.dropdowns, Size.MD, variant),
                  null,
                  2,
                )}
              </pre>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const LightVsDarkTheme: Story = {
  render: () => (
    <div style={storybookDemoStyles.columnFlexGap20}>
      <h3>Сравнение светлой и темной темы</h3>

      <div style={storybookDemoStyles.rowFlexGap20}>
        <div>
          <h4>Светлая тема</h4>
          <div style={storybookDemoStyles.themePreviewLightCard}>
            <DropdownDemo theme={lightTheme} size={Size.MD} variant="default" />
          </div>
        </div>

        <div>
          <h4>Темная тема</h4>
          <div style={storybookDemoStyles.themePreviewDarkCard}>
            <DropdownDemo theme={darkTheme} size={Size.MD} variant="default" />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const PracticalUsage: Story = {
  render: () => (
    <div style={storybookDemoStyles.columnFlexGap20}>
      <h3>Практическое использование</h3>

      <div>
        <h4>Пример интеграции с компонентом</h4>
        <pre style={storybookDemoStyles.demoPreCodeBlock12}>
          {`// Использование в styled-components
const StyledDropdown = styled.div\`
  \${({ theme, size, variant }) => {
    const containerStyles = getDropdownContainerStyles(theme.dropdowns, size, variant);
    return css\`
      min-width: \${containerStyles.minWidth};
      max-width: \${containerStyles.maxWidth};
      padding: \${containerStyles.padding};
      background: \${containerStyles.background};
      color: \${containerStyles.color};
      border: \${containerStyles.border};
      border-radius: \${containerStyles.borderRadius};
      box-shadow: \${containerStyles.boxShadow};
      z-index: \${containerStyles.zIndex};
    \`;
  }}
\`;

// Использование в компоненте
const DropdownItem = ({ size, state, children }) => {
  const theme = useTheme();
  const itemStyles = getDropdownItemStyles(theme.dropdowns, size, state);

  return (
    <div style={itemStyles}>
      {children}
    </div>
  );
};`}
        </pre>
      </div>
    </div>
  ),
};

