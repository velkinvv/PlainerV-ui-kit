require('@testing-library/jest-dom');
const { configure } = require('@testing-library/react');

// Настройка для styled-components
configure({ testIdAttribute: 'data-testid' });

// Mock styled-components
const createStyledComponent = (tag) => {
  return jest.fn((strings, ...values) => {
    return tag;
  });
};

const styled = new Proxy(
  {},
  {
    get: (target, prop) => {
      if (prop === 'default') {
        return styled;
      }
      return createStyledComponent(prop);
    },
  },
);

// Добавляем методы для styled-components
styled.div = createStyledComponent('div');
styled.button = createStyledComponent('button');
styled.input = createStyledComponent('input');
styled.label = createStyledComponent('label');
styled.span = createStyledComponent('span');
styled.svg = createStyledComponent('svg');
styled.circle = createStyledComponent('circle');
styled.path = createStyledComponent('path');
styled.p = createStyledComponent('p');
styled.h1 = createStyledComponent('h1');
styled.h2 = createStyledComponent('h2');
styled.h3 = createStyledComponent('h3');
styled.h4 = createStyledComponent('h4');
styled.h5 = createStyledComponent('h5');
styled.h6 = createStyledComponent('h6');
styled.section = createStyledComponent('section');
styled.article = createStyledComponent('article');
styled.header = createStyledComponent('header');
styled.footer = createStyledComponent('footer');
styled.nav = createStyledComponent('nav');
styled.main = createStyledComponent('main');
styled.aside = createStyledComponent('aside');
styled.ul = createStyledComponent('ul');
styled.ol = createStyledComponent('ol');
styled.li = createStyledComponent('li');
styled.a = createStyledComponent('a');
styled.img = createStyledComponent('img');
styled.form = createStyledComponent('form');
styled.textarea = createStyledComponent('textarea');
styled.select = createStyledComponent('select');
styled.option = createStyledComponent('option');

jest.mock('styled-components', () => ({
  __esModule: true,
  default: styled,
  ThemeProvider: ({ children }) => children,
  createGlobalStyle: jest.fn(() => () => null),
  keyframes: jest.fn(() => ''),
  css: jest.fn((strings, ...values) => strings.join('')),
  useTheme: () => ({
    colors: {
      progressFill: '#68D5F8',
      progressFillHover: '#5BC4E5',
      progressValue: '#333333',
      progressStatusAwait: '#94D263',
      progressStatusLoading: '#68D5F8',
      progressStatusSuccess: '#94D263',
      progressStatusError: '#FF5252',
      progressTrack: '#F2F2F2',
      text: '#333333',
      textSecondary: '#666666',
      backgroundSecondary: '#F5F5F5',
      borderSecondary: '#E0E0E0',
      primary: '#68D5F8',
    },
    mode: 'light',
  }),
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
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
