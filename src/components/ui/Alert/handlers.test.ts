import {
  getAlertDefaultIconName,
  resolveAlertActionPlacement,
  resolveAlertCloseHitAreaPx,
  resolveAlertIconNode,
  resolveAlertPaletteKey,
  resolveAlertSurfaceTokens,
  shouldRenderAlertBottomAction,
  shouldRenderAlertEndAction,
  shouldUseAlertDefaultIconName,
} from './handlers';
import type { DefaultTheme } from 'styled-components';
import { Size } from '../../../types/sizes';

const mockTheme = {
  mode: 'light',
  colors: {
    primary: '#1111ff',
    primaryHover: '#0000ee',
    info: '#00aaff',
    infoHover: '#0088cc',
    success: '#00aa00',
    successHover: '#008800',
    danger: '#cc0000',
    dangerHover: '#990000',
    warning: '#ff8800',
    text: '#222222',
    input: '#ffffff',
    background: '#ffffff',
    backgroundSecondary: '#fafafa',
    onAccent: '#fafafa',
  },
} as DefaultTheme;

describe('Alert handlers', () => {
  it('getAlertDefaultIconName', () => {
    expect(getAlertDefaultIconName('success')).toBe('IconPlainerCheck');
    expect(getAlertDefaultIconName('error')).toBe('IconExDanger');
    expect(getAlertDefaultIconName('warning')).toBe('IconPlainerWarning');
    expect(getAlertDefaultIconName('info')).toBe('IconExInfoCircle');
  });

  it('resolveAlertIconNode / shouldUseAlertDefaultIconName', () => {
    expect(resolveAlertIconNode({ severity: 'success', icon: false })).toBeNull();
    expect(shouldUseAlertDefaultIconName({ severity: 'success', icon: false })).toBe(false);
    expect(shouldUseAlertDefaultIconName({ severity: 'success' })).toBe(true);
    expect(
      resolveAlertIconNode({
        severity: 'success',
        iconMapping: { success: 'custom' },
      }),
    ).toBe('custom');
    expect(
      shouldUseAlertDefaultIconName({
        severity: 'success',
        iconMapping: { success: 'custom' },
      }),
    ).toBe(false);
  });

  it('resolveAlertPaletteKey', () => {
    expect(resolveAlertPaletteKey('success')).toBe('success');
    expect(resolveAlertPaletteKey('success', 'warning')).toBe('warning');
  });

  it('resolveAlertSurfaceTokens: filled / outlined / standard', () => {
    const filled = resolveAlertSurfaceTokens(mockTheme, 'filled', 'success');
    expect(filled.background).toBe('#00aa00');
    expect(filled.text).toBe('#fafafa');

    const outlined = resolveAlertSurfaceTokens(mockTheme, 'outlined', 'error');
    expect(outlined.border).toBe('#cc0000');
    expect(outlined.background).toBe('#ffffff');

    const standard = resolveAlertSurfaceTokens(mockTheme, 'standard', 'info');
    expect(standard.background).toContain('#00aaff');
    expect(standard.title).toBe('#00aaff');
  });

  it('resolveAlertCloseHitAreaPx', () => {
    expect(resolveAlertCloseHitAreaPx(Size.SM)).toBe(28);
    expect(resolveAlertCloseHitAreaPx(Size.MD)).toBe(32);
    expect(resolveAlertCloseHitAreaPx(Size.XL)).toBe(40);
  });
});

describe('resolveAlertActionPlacement', () => {
  it('default и неизвестное → end', () => {
    expect(resolveAlertActionPlacement()).toBe('end');
    expect(resolveAlertActionPlacement(undefined)).toBe('end');
    expect(resolveAlertActionPlacement('end')).toBe('end');
  });

  it('bottom только при явном значении', () => {
    expect(resolveAlertActionPlacement('bottom')).toBe('bottom');
  });
});

describe('shouldRenderAlertEndAction / shouldRenderAlertBottomAction', () => {
  const actionNode = 'Отменить';

  it('без action слоты пустые', () => {
    expect(shouldRenderAlertEndAction(undefined, 'end')).toBe(false);
    expect(shouldRenderAlertBottomAction(undefined, 'bottom')).toBe(false);
  });

  it('end кладёт action в правый слот', () => {
    expect(shouldRenderAlertEndAction(actionNode, 'end')).toBe(true);
    expect(shouldRenderAlertBottomAction(actionNode, 'end')).toBe(false);
  });

  it('bottom кладёт action под текст', () => {
    expect(shouldRenderAlertEndAction(actionNode, 'bottom')).toBe(false);
    expect(shouldRenderAlertBottomAction(actionNode, 'bottom')).toBe(true);
  });
});
