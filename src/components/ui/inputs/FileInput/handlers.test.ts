import { clampUploadProgress, formatFileListSummary, getFileExtensionBadge, getFileInputTrailingIconSize } from './handlers';
import { IconSize, Size } from '../../../../types/sizes';

describe('FileInput handlers', () => {
  it('clampUploadProgress', () => {
    expect(clampUploadProgress(undefined)).toBeNull();
    expect(clampUploadProgress(-5)).toBe(0);
    expect(clampUploadProgress(150)).toBe(100);
    expect(clampUploadProgress(33)).toBe(33);
  });

  it('getFileExtensionBadge', () => {
    expect(getFileExtensionBadge('report.doc')).toBe('doc');
    expect(getFileExtensionBadge('noext')).toBe('');
  });

  it('formatFileListSummary', () => {
    // В jsdom нет DataTransfer — достаточно минимального FileList для проверки логики.
    const file = new File(['x'], 'a.txt');
    const files = {
      length: 1,
      0: file,
      item: (i: number) => (i === 0 ? file : null),
    } as unknown as FileList;
    expect(formatFileListSummary(files, false)).toBe('a.txt');
    expect(formatFileListSummary(files, true)).toBe('a.txt');
  });

  it('formatFileListSummary для нескольких файлов', () => {
    const f1 = new File(['a'], 'a.txt');
    const f2 = new File(['b'], 'b.txt');
    const files = {
      length: 2,
      0: f1,
      1: f2,
      item: (i: number) => [f1, f2][i] ?? null,
    } as unknown as FileList;
    expect(formatFileListSummary(files, true)).toBe('Выбрано файлов: 2');
  });

  it('getFileInputTrailingIconSize', () => {
    expect(getFileInputTrailingIconSize(Size.SM)).toBe(IconSize.SM);
    expect(getFileInputTrailingIconSize(Size.LG)).toBe(IconSize.MD);
  });
});
