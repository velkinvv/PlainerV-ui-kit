import type { BreadcrumbItem } from '../../../types/ui';
import { isBreadcrumbCurrentPage, shouldUseBreadcrumbPill } from './handlers';

describe('Breadcrumb handlers', () => {
  it('isBreadcrumbCurrentPage: ellipsis никогда не текущая', () => {
    const item: BreadcrumbItem = { label: '…', ellipsis: true, onClick: () => undefined };
    expect(isBreadcrumbCurrentPage(item, 0, 1)).toBe(false);
  });

  it('shouldUseBreadcrumbPill: текущая страница без явного plain', () => {
    const item: BreadcrumbItem = { label: 'Здесь' };
    expect(shouldUseBreadcrumbPill(item, true)).toBe(true);
  });

  it('shouldUseBreadcrumbPill: явный plain', () => {
    const item: BreadcrumbItem = { label: 'X', crumbStyle: 'plain' };
    expect(shouldUseBreadcrumbPill(item, true)).toBe(false);
  });

  it('shouldUseBreadcrumbPill: disabled без явного pill', () => {
    const item: BreadcrumbItem = { label: 'X', disabled: true };
    expect(shouldUseBreadcrumbPill(item, true)).toBe(false);
  });
});
