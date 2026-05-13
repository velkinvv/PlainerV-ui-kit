import type { CSSProperties } from 'react';
import { lightTheme } from '@/themes/themes';

export const progressStoriesStyles = {
  paddedCard: {
    padding: 24,
    maxWidth: 360,
  } satisfies CSSProperties,
  sectionColumn16: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  } satisfies CSSProperties,
  sectionColumn24: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  } satisfies CSSProperties,
  rowGap8: {
    display: 'flex',
    gap: 8,
  } satisfies CSSProperties,
  rowGap8Wrap: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  } satisfies CSSProperties,
  heading14: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: 600,
  } satisfies CSSProperties,
  heading14WithSpace: {
    marginBottom: 12,
    fontSize: 14,
    fontWeight: 600,
  } satisfies CSSProperties,
  heading16: {
    marginBottom: 16,
  } satisfies CSSProperties,
  sectionColumn12: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  } satisfies CSSProperties,
  maxWidth400Column16: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    maxWidth: 400,
  } satisfies CSSProperties,
  maxWidth340: {
    maxWidth: 340,
  } satisfies CSSProperties,
  paddedCardNoPadding: {
    maxWidth: 360,
  } satisfies CSSProperties,
  statusInfoText: {
    marginTop: 16,
    fontSize: 14,
    color: lightTheme.colors.textSecondary,
  } satisfies CSSProperties,
  segmentedSuccess: lightTheme.colors.success,
  segmentedWarning: lightTheme.colors.warning,
  segmentedAwait: lightTheme.colors.border,
  customTrackColor: lightTheme.colors.backgroundTertiary,
  customProgressColor: lightTheme.colors.info,
  customStylingRoot: {
    padding: 16,
    backgroundColor: lightTheme.colors.backgroundTertiary,
    borderRadius: 8,
  } satisfies CSSProperties,
  customTrackBorderColor: lightTheme.colors.border,
  customFillGradient: `linear-gradient(90deg, ${lightTheme.colors.success}, color-mix(in srgb, ${lightTheme.colors.success} 75%, ${lightTheme.colors.warning}))`,
  helperText: {
    fontSize: 12,
    color: lightTheme.colors.textSecondary,
    marginTop: 8,
  } satisfies CSSProperties,
  helperTextNoTop: {
    fontSize: 12,
    color: lightTheme.colors.textSecondary,
  } satisfies CSSProperties,
  helperTextNoTopWithBottom: {
    fontSize: 12,
    color: lightTheme.colors.textSecondary,
    marginBottom: 8,
  } satisfies CSSProperties,
  successText: {
    color: lightTheme.colors.success,
    fontWeight: 600,
  } satisfies CSSProperties,
  maxWidth400: {
    maxWidth: 400,
  } satisfies CSSProperties,
  maxWidth500Column: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    maxWidth: 500,
  } satisfies CSSProperties,
  maxWidth500Column16: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    maxWidth: 500,
  } satisfies CSSProperties,
  maxWidth800Column: {
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
    maxWidth: 800,
  } satisfies CSSProperties,
  preCode: {
    background: lightTheme.colors.backgroundTertiary,
    padding: 12,
    borderRadius: 4,
    fontSize: 12,
  } satisfies CSSProperties,
  dashboardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 24,
    width: '100%',
  } satisfies CSSProperties,
  h4Title: {
    margin: '0 0 12px',
  } satisfies CSSProperties,
};
