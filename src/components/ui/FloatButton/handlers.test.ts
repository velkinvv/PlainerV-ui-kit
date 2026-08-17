import React from 'react';
import {
  FLOAT_BUTTON_DEFAULT_INSET_PX,
  FLOAT_BUTTON_DEFAULT_SCROLL_DURATION_MS,
  FLOAT_BUTTON_DEFAULT_VISIBILITY_HEIGHT_PX,
  getFloatButtonEdgeOffsets,
  getFloatButtonScrollProgressRatio,
  partitionFloatButtonGroupChildren,
  readFloatButtonScrollMetrics,
  resolveFloatButtonBadge,
  resolveFloatButtonInsetPx,
  resolveFloatButtonPlacement,
  resolveFloatButtonScrollDurationMs,
  shouldShowFloatButtonBackTop,
} from './handlers';

describe('resolveFloatButtonPlacement', () => {
  it('default bottom-end', () => {
    expect(resolveFloatButtonPlacement()).toBe('bottom-end');
    expect(resolveFloatButtonPlacement('top-start')).toBe('top-start');
  });
});

describe('getFloatButtonEdgeOffsets', () => {
  it('bottom-end → block-end + inline-end', () => {
    expect(getFloatButtonEdgeOffsets('bottom-end', 24)).toEqual({
      insetBlockEnd: 24,
      insetInlineEnd: 24,
    });
  });

  it('top-start → block-start + inline-start', () => {
    expect(getFloatButtonEdgeOffsets('top-start', 16)).toEqual({
      insetBlockStart: 16,
      insetInlineStart: 16,
    });
  });
});

describe('BackTop helpers', () => {
  it('скрыт ниже порога, показан на пороге', () => {
    expect(shouldShowFloatButtonBackTop(399, 400)).toBe(false);
    expect(shouldShowFloatButtonBackTop(400, FLOAT_BUTTON_DEFAULT_VISIBILITY_HEIGHT_PX)).toBe(true);
  });

  it('progress 0 на верху, 1 внизу', () => {
    expect(getFloatButtonScrollProgressRatio(0, 1000, 200)).toBe(0);
    expect(getFloatButtonScrollProgressRatio(800, 1000, 200)).toBe(1);
    expect(getFloatButtonScrollProgressRatio(400, 1000, 200)).toBe(0.5);
  });

  it('reduced motion → duration 0', () => {
    expect(resolveFloatButtonScrollDurationMs(undefined, true)).toBe(0);
    expect(resolveFloatButtonScrollDurationMs(undefined, false)).toBe(
      FLOAT_BUTTON_DEFAULT_SCROLL_DURATION_MS,
    );
  });
});

describe('resolveFloatButtonBadge', () => {
  it('true → dot; число → content; пусто → hidden', () => {
    expect(resolveFloatButtonBadge(true)).toEqual({ visible: true, isDot: true, content: null });
    expect(resolveFloatButtonBadge(3)).toEqual({ visible: true, isDot: false, content: 3 });
    expect(resolveFloatButtonBadge(undefined)).toEqual({
      visible: false,
      isDot: false,
      content: null,
    });
  });
});

describe('partitionFloatButtonGroupChildren', () => {
  it('последний — триггер', () => {
    const partitioned = partitionFloatButtonGroupChildren([
      React.createElement('span', { key: 'a' }, 'A'),
      React.createElement('span', { key: 'b' }, 'B'),
      React.createElement('span', { key: 'c' }, 'C'),
    ]);
    expect(partitioned.actions).toHaveLength(2);
    expect(partitioned.trigger).toBeTruthy();
  });
});

describe('readFloatButtonScrollMetrics', () => {
  it('читает scrollY окна', () => {
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 500 });
    expect(readFloatButtonScrollMetrics(window).scrollTopPx).toBe(500);
  });

  it('читает scrollTop элемента', () => {
    const scrollBox = document.createElement('div');
    Object.defineProperty(scrollBox, 'scrollTop', { configurable: true, value: 120 });
    Object.defineProperty(scrollBox, 'scrollHeight', { configurable: true, value: 800 });
    Object.defineProperty(scrollBox, 'clientHeight', { configurable: true, value: 200 });
    expect(readFloatButtonScrollMetrics(scrollBox)).toEqual({
      scrollTopPx: 120,
      scrollHeightPx: 800,
      clientHeightPx: 200,
    });
  });
});

describe('resolveFloatButtonInsetPx', () => {
  it('default 24', () => {
    expect(resolveFloatButtonInsetPx()).toBe(FLOAT_BUTTON_DEFAULT_INSET_PX);
    expect(resolveFloatButtonInsetPx(8)).toBe(8);
  });
});
