import { calculateDropdownPosition } from './handlers';

/** Мок DOMRect для тестов позиционирования */
function createDomRect(partial: Partial<DOMRect>): DOMRect {
  return {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    toJSON: () => ({}),
    ...partial,
  } as DOMRect;
}

describe('calculateDropdownPosition', () => {
  const originalInnerWidth = window.innerWidth;
  const originalInnerHeight = window.innerHeight;

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: originalInnerWidth });
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: originalInnerHeight });
  });

  it('autoFlip — открывает панель вверх, если снизу не хватает места', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 400 });
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 300 });

    const triggerElement = {
      getBoundingClientRect: () =>
        createDomRect({ top: 250, left: 40, bottom: 280, right: 120, width: 80, height: 30 }),
    } as HTMLElement;

    const menuElement = {
      getBoundingClientRect: () => createDomRect({ width: 160, height: 120 }),
    } as HTMLElement;

    const position = calculateDropdownPosition({
      triggerElement,
      menuElement,
      offset: 4,
      mode: 'autoFlip',
    });

    expect(position.y).toBeLessThan(250);
  });

  it('autoFlip — сдвигает панель влево, если выходит за правый край', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 320 });
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 600 });

    const triggerElement = {
      getBoundingClientRect: () =>
        createDomRect({ top: 40, left: 260, bottom: 72, right: 300, width: 40, height: 32 }),
    } as HTMLElement;

    const menuElement = {
      getBoundingClientRect: () => createDomRect({ width: 200, height: 80 }),
    } as HTMLElement;

    const position = calculateDropdownPosition({
      triggerElement,
      menuElement,
      offset: 4,
      mode: 'autoFlip',
    });

    expect(position.x).toBeLessThanOrEqual(320 - 200 - 4);
  });

  it("default — не flip'ит вертикально при нехватке места снизу", () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 400 });
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 300 });

    const triggerElement = {
      getBoundingClientRect: () =>
        createDomRect({ top: 250, left: 40, bottom: 280, right: 120, width: 80, height: 30 }),
    } as HTMLElement;

    const menuElement = {
      getBoundingClientRect: () => createDomRect({ width: 160, height: 120 }),
    } as HTMLElement;

    const position = calculateDropdownPosition({
      triggerElement,
      menuElement,
      offset: 4,
      mode: 'default',
    });

    expect(position.y).toBe(284);
  });
});

describe('getDropdownPanelPosition', () => {
  it('возвращает viewport-координаты без scroll offset', async () => {
    const { getDropdownPanelPosition } = await import('../FloatingMenu/handlers');

    Object.defineProperty(window, 'scrollX', { configurable: true, value: 500 });
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 800 });
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1024 });
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 768 });

    const triggerElement = {
      getBoundingClientRect: () =>
        createDomRect({ top: 100, left: 200, bottom: 132, right: 240, width: 40, height: 32 }),
    } as HTMLElement;

    const position = getDropdownPanelPosition(triggerElement);

    expect(position.top).toBeGreaterThanOrEqual(132);
    expect(position.left).toBe(200);
  });
});
