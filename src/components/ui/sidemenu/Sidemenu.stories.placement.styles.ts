import type { CSSProperties } from 'react';
import type { ThemeType } from '@/types/theme';

/** Общие стили галереи позиционирования Sidemenu */
export const sidemenuPlacementStoriesStyles = {
  matrixPageRoot: {
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
    padding: '24px 24px 48px',
    boxSizing: 'border-box',
    fontFamily: 'system-ui, sans-serif',
  } satisfies CSSProperties,
  matrixIntro: {
    margin: 0,
    maxWidth: 920,
    fontSize: 14,
    lineHeight: 1.55,
  } satisfies CSSProperties,
  matrixSectionTitle: {
    margin: '0 0 8px',
    fontSize: 18,
    fontWeight: 600,
  } satisfies CSSProperties,
  matrixSectionHint: {
    margin: '0 0 16px',
    fontSize: 13,
    opacity: 0.8,
    maxWidth: 920,
    lineHeight: 1.5,
  } satisfies CSSProperties,
  matrixGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: 20,
  } satisfies CSSProperties,
  matrixCell: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '72vh',
    border: '1px dashed rgba(127, 127, 127, 0.45)',
    borderRadius: 12,
    overflow: 'hidden',
    boxSizing: 'border-box',
  } satisfies CSSProperties,
  matrixCellHeader: {
    padding: '10px 14px',
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '0.02em',
    borderBottom: '1px solid rgba(127, 127, 127, 0.25)',
  } satisfies CSSProperties,
  matrixCellBody: {
    display: 'flex',
    flex: 1,
    minHeight: 0,
    alignItems: 'stretch',
  } satisfies CSSProperties,
  matrixCellMain: {
    flex: 1,
    padding: 16,
    fontSize: 13,
    lineHeight: 1.45,
    boxSizing: 'border-box',
  } satisfies CSSProperties,
  scrollSectionRoot: {
    position: 'relative',
    minHeight: '100vh',
    boxSizing: 'border-box',
    padding: '24px 24px 24px 120px',
  } satisfies CSSProperties,
  scrollSectionLabel: {
    position: 'absolute',
    top: 16,
    left: 16,
    maxWidth: 280,
    margin: 0,
    padding: '10px 12px',
    borderRadius: 8,
    fontSize: 12,
    lineHeight: 1.45,
    boxSizing: 'border-box',
  } satisfies CSSProperties,
  codeSnippet: {
    margin: '8px 0 0',
    padding: '10px 12px',
    borderRadius: 8,
    fontSize: 11,
    lineHeight: 1.5,
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  } satisfies CSSProperties,
};

/**
 * Тематические стили галереи позиционирования.
 * @param theme — активная тема Storybook
 */
export const createSidemenuPlacementStoryThemeStyles = (theme: ThemeType) => ({
  matrixCellHeader: {
    background: theme.colors.backgroundSecondary,
    color: theme.colors.text,
  } satisfies CSSProperties,
  matrixCellMain: {
    background: theme.colors.backgroundTertiary,
    color: theme.colors.textSecondary,
  } satisfies CSSProperties,
  scrollSectionRoot: {
    background: theme.colors.backgroundTertiary,
    color: theme.colors.text,
  } satisfies CSSProperties,
  scrollSectionLabel: {
    background: theme.colors.backgroundSecondary,
    border: `1px solid ${theme.colors.border}`,
    color: theme.colors.text,
  } satisfies CSSProperties,
  codeSnippet: {
    background: theme.colors.backgroundSecondary,
    border: `1px solid ${theme.colors.border}`,
    color: theme.colors.textSecondary,
  } satisfies CSSProperties,
});
