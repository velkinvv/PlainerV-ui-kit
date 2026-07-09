import { Size } from '../../../types/sizes';
import { getPulseGeometry, resolvePulseColor } from './handlers';

describe('Pulse handlers', () => {
  it('getPulseGeometry: MD по умолчанию', () => {
    expect(getPulseGeometry().dotSize).toBe(12);
    expect(getPulseGeometry(Size.SM).dotSize).toBe(8);
    expect(getPulseGeometry(Size.LG).dotSize).toBe(16);
  });

  it('resolvePulseColor: статусы и custom', () => {
    const theme = {
      colors: {
        danger: '#e00',
        success: '#0a0',
        warning: '#fa0',
        info: '#06f',
        primary: '#00f',
      },
    } as Parameters<typeof resolvePulseColor>[0];

    expect(resolvePulseColor(theme, 'danger')).toBe('#e00');
    expect(resolvePulseColor(theme, 'success')).toBe('#0a0');
    expect(resolvePulseColor(theme, 'warning')).toBe('#fa0');
    expect(resolvePulseColor(theme, 'info')).toBe('#06f');
    expect(resolvePulseColor(theme, 'info', { background: '#abc' })).toBe('#abc');
  });
});
