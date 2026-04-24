require('@testing-library/jest-dom');
const React = require('react');
const { configure } = require('@testing-library/react');
const actualStyledComponents = jest.requireActual('styled-components');

// Настройка для styled-components
configure({ testIdAttribute: 'data-testid' });

/**
 * Пропсы styled-компонентов, которые не должны попадать на нативные DOM-теги в Jest (иначе warning'и React).
 */
const STYLED_DOM_BLOCKLIST = new Set([
  'theme',
  'as',
  'fullWidth',
  'textAlign',
  'variant',
  'focused',
  'error',
  'success',
  'status',
  'skeleton',
  'isLoading',
  'loading',
  'disableCopying',
  'messageCount',
  'showTooltip',
  'tooltipText',
  'transparent',
  'round',
  'column',
  'row',
  'columnSpan',
  'rowSpan',
  'justifySelf',
  'alignSelf',
  'placeSelf',
  'area',
  'labelPosition',
  'iconStart',
  'iconEnd',
  'showClearButton',
  'clearIcon',
  'state',
  'cursor',
  'minColumnWidth',
  'maxColumnWidth',
  'iconOnly',
  'htmlType',
  'isActive',
  'isSelected',
  'isCurrent',
  'isOpen',
  'tone',
  'minWidth',
  'maxWidth',
  'hasIcon',
  'isDisabled',
  'showSeconds',
]);

/**
 * Убирает transient ($prop) и кастомные пропсы перед createElement для строковых тегов.
 * @param {string} elType - имя DOM-тега
 * @param {Record<string, unknown>} props - исходные пропсы
 */
const sanitizeDomProps = (elType, props) => {
  const out = {};
  for (const [key, value] of Object.entries(props)) {
    if (key === 'theme' || key === 'as') continue;
    if (key.startsWith('$')) continue;
    if (STYLED_DOM_BLOCKLIST.has(key)) continue;
    // Анимации framer-motion — не валидны на нативных тегах
    if (
      key === 'whileHover' ||
      key === 'whileTap' ||
      key === 'whileFocus' ||
      key === 'transition' ||
      key === 'layout' ||
      key === 'initial' ||
      key === 'animate' ||
      key === 'exit'
    ) {
      continue;
    }
    if (key === 'checked' && elType !== 'input') continue;
    if (key === 'readOnly' && elType !== 'input' && elType !== 'textarea') continue;
    if (key === 'size' && elType !== 'input' && elType !== 'select') continue;
    out[key] = value;
  }
  return out;
};

const makeStyledFactory = (element) => {
  const templateFn = (strings, ...values) => {
    const Type = typeof element === 'string' ? element : element;
    const Comp = React.forwardRef((props, ref) => {
      const { as: asProp, ...rest } = props;
      if (typeof Type === 'string') {
        const El = typeof asProp === 'string' && asProp ? asProp : Type;
        return React.createElement(El, { ...sanitizeDomProps(El, rest), ref });
      }
      // styled(motion.*): убираем пропсы UI-кита, иначе они утекают на button/span
      return React.createElement(Type, { ...sanitizeDomProps('div', rest), ref });
    });
    const label = typeof element === 'string' ? element : element.displayName || 'Component';
    Comp.displayName = `styled(${label})`;
    return Comp;
  };
  templateFn.withConfig = () => templateFn;
  return templateFn;
};

const intrinsicTags = [
  'div',
  'button',
  'input',
  'label',
  'span',
  'svg',
  'circle',
  'path',
  'p',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'section',
  'article',
  'header',
  'footer',
  'nav',
  'main',
  'aside',
  'ul',
  'ol',
  'li',
  'a',
  'img',
  'form',
  'textarea',
  'select',
  'option',
  'table',
  'thead',
  'tbody',
  'tfoot',
  'tr',
  'th',
  'td',
];

/** @param {string | import('react').ElementType} tagOrComponent - тег или компонент */
function styled(tagOrComponent) {
  return makeStyledFactory(tagOrComponent);
}

intrinsicTags.forEach((tag) => {
  styled[tag] = makeStyledFactory(tag);
});

jest.mock('styled-components', () => ({
  __esModule: true,
  default: styled,
  ThemeProvider: actualStyledComponents.ThemeProvider,
  createGlobalStyle: jest.fn(() => () => null),
  keyframes: jest.fn(() => ''),
  css: jest.fn((strings, ...values) => (Array.isArray(strings) ? strings.join('') : String(strings))),
  useTheme: actualStyledComponents.useTheme,
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
