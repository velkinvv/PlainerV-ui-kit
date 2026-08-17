import {
  LAYOUT_BREAKPOINT_THRESHOLD_PX,
  LAYOUT_HEADER_PADDING_INLINE_PX,
  LAYOUT_SIDEBAR_DEFAULT_COLLAPSED_WIDTH_PX,
  LAYOUT_SIDEBAR_DEFAULT_WIDTH_PX,
  LAYOUT_ZERO_WIDTH_TRIGGER_SIZE_PX,
  formatLayoutWidthCss,
  getLayoutContentFlexOrder,
  getLayoutSidebarBreakpointMediaQuery,
  getLayoutSidebarFlexOrder,
  getLayoutSidebarTriggerRotationDeg,
  isLayoutCollapsedWidthZero,
  isLayoutSidebarBelowBreakpoint,
  resolveLayoutScrollMode,
  resolveLayoutSidebarGutterCss,
  resolveLayoutSidebarPlacement,
  resolveLayoutSidebarWidthCss,
  resolveLayoutWidthTransitionMs,
  shouldLayoutSidebarOverlay,
  shouldLayoutUseRowDirection,
  shouldShowLayoutZeroWidthTrigger,
} from './handlers';

describe('resolveLayoutScrollMode', () => {
  it('default page', () => {
    expect(resolveLayoutScrollMode()).toBe('page');
    expect(resolveLayoutScrollMode('content')).toBe('content');
  });
});

describe('resolveLayoutSidebarPlacement', () => {
  it('default start', () => {
    expect(resolveLayoutSidebarPlacement()).toBe('start');
    expect(resolveLayoutSidebarPlacement('end')).toBe('end');
  });
});

describe('shouldLayoutUseRowDirection', () => {
  it('проп true перекрывает счётчик 0', () => {
    expect(shouldLayoutUseRowDirection(true, 0)).toBe(true);
  });
  it('проп false перекрывает счётчик > 0', () => {
    expect(shouldLayoutUseRowDirection(false, 1)).toBe(false);
  });
  it('авто по счётчику', () => {
    expect(shouldLayoutUseRowDirection(undefined, 0)).toBe(false);
    expect(shouldLayoutUseRowDirection(undefined, 1)).toBe(true);
  });
});

describe('breakpoint', () => {
  it('lg: 991 ниже, 992 нет', () => {
    expect(isLayoutSidebarBelowBreakpoint(991, 'lg')).toBe(true);
    expect(isLayoutSidebarBelowBreakpoint(LAYOUT_BREAKPOINT_THRESHOLD_PX.lg, 'lg')).toBe(false);
  });
  it('media query max-width = порог - 1', () => {
    expect(getLayoutSidebarBreakpointMediaQuery('lg')).toBe('(max-width: 991px)');
  });
});

describe('width helpers', () => {
  it('константы', () => {
    expect(LAYOUT_SIDEBAR_DEFAULT_WIDTH_PX).toBe(200);
    expect(LAYOUT_SIDEBAR_DEFAULT_COLLAPSED_WIDTH_PX).toBe(80);
    expect(LAYOUT_HEADER_PADDING_INLINE_PX).toBe(24);
    expect(LAYOUT_ZERO_WIDTH_TRIGGER_SIZE_PX).toBe(40);
  });
  it('format number и string', () => {
    expect(formatLayoutWidthCss(200)).toBe('200px');
    expect(formatLayoutWidthCss('25%')).toBe('25%');
  });
  it('collapsed → collapsedWidth', () => {
    expect(resolveLayoutSidebarWidthCss({ collapsed: true })).toBe('80px');
    expect(resolveLayoutSidebarWidthCss({ collapsed: false })).toBe('200px');
  });
  it('zero width', () => {
    expect(isLayoutCollapsedWidthZero(0)).toBe(true);
    expect(isLayoutCollapsedWidthZero('0px')).toBe(true);
    expect(isLayoutCollapsedWidthZero(80)).toBe(false);
  });
});

describe('overlay / order / trigger', () => {
  it('overlay только развёрнутый', () => {
    expect(shouldLayoutSidebarOverlay(true, false)).toBe(true);
    expect(shouldLayoutSidebarOverlay(true, true)).toBe(false);
  });
  it('gutter = collapsed width', () => {
    expect(resolveLayoutSidebarGutterCss(0)).toBe('0px');
    expect(resolveLayoutSidebarGutterCss()).toBe('80px');
  });
  it('end → order 1, content 0', () => {
    expect(getLayoutSidebarFlexOrder('end')).toBe(1);
    expect(getLayoutSidebarFlexOrder('start')).toBe(0);
    expect(getLayoutContentFlexOrder()).toBe(0);
  });
  it('reduced motion → 0', () => {
    expect(resolveLayoutWidthTransitionMs(300, true)).toBe(0);
    expect(resolveLayoutWidthTransitionMs(300, false)).toBe(300);
  });
  it('zero-width trigger', () => {
    expect(
      shouldShowLayoutZeroWidthTrigger({ collapsed: true, collapsedWidth: 0, trigger: undefined }),
    ).toBe(true);
    expect(
      shouldShowLayoutZeroWidthTrigger({ collapsed: true, collapsedWidth: 0, trigger: null }),
    ).toBe(false);
    expect(
      shouldShowLayoutZeroWidthTrigger({ collapsed: false, collapsedWidth: 0, trigger: undefined }),
    ).toBe(false);
  });
  it('rotation start collapsed → -90', () => {
    expect(getLayoutSidebarTriggerRotationDeg('start', true)).toBe(-90);
    expect(getLayoutSidebarTriggerRotationDeg('start', false)).toBe(90);
    expect(getLayoutSidebarTriggerRotationDeg('end', true)).toBe(90);
    expect(getLayoutSidebarTriggerRotationDeg('end', false)).toBe(-90);
  });
});
