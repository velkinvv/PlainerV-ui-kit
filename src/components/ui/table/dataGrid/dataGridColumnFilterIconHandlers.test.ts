import { IconSize } from '@/types/sizes';
import { mergeDataGridColumnFilterIconProps } from './dataGridColumnFilterIconHandlers';

describe('mergeDataGridColumnFilterIconProps', () => {
  it('по умолчанию возвращает IconExFilter и XS', () => {
    const merged = mergeDataGridColumnFilterIconProps({ filterApplied: false });
    expect(merged.name).toBe('IconExFilter');
    expect(merged.size).toBe(IconSize.XS);
    expect(merged.color).toBe('currentColor');
  });

  it('мержит filterIconProps', () => {
    const merged = mergeDataGridColumnFilterIconProps({
      filterApplied: false,
      filterIconProps: { name: 'IconExFilter2', color: '#336699' },
    });
    expect(merged.name).toBe('IconExFilter2');
    expect(merged.color).toBe('#336699');
  });

  it('при filterApplied накладывает filterIconPropsApplied', () => {
    const merged = mergeDataGridColumnFilterIconProps({
      filterApplied: true,
      filterIconProps: { name: 'IconExFilter2', color: '#111' },
      filterIconPropsApplied: { color: '#fff' },
    });
    expect(merged.name).toBe('IconExFilter2');
    expect(merged.color).toBe('#fff');
  });

  it('не применяет filterIconPropsApplied без filterApplied', () => {
    const merged = mergeDataGridColumnFilterIconProps({
      filterApplied: false,
      filterIconProps: { color: '#111' },
      filterIconPropsApplied: { color: '#fff' },
    });
    expect(merged.color).toBe('#111');
  });
});
