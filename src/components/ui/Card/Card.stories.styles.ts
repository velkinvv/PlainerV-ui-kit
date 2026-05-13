import type { CSSProperties } from 'react';
import type { ThemeType } from '@/types/theme';

export const cardStoriesStyles = {
  noPaddingContent: {
    padding: '16px',
  } satisfies CSSProperties,
  imagePreview: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px 8px 0 0',
  } satisfies CSSProperties,
  imageContent: {
    padding: '16px',
  } satisfies CSSProperties,
  newsCardRoot: {
    width: '742px',
    borderRadius: '20px',
    padding: '24px',
  } satisfies CSSProperties,
  newsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  } satisfies CSSProperties,
  newsAuthorGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  } satisfies CSSProperties,
  newsActionGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  } satisfies CSSProperties,
  newsTitle: {
    margin: '0 0 8px',
  } satisfies CSSProperties,
  newsText: {
    margin: 0,
  } satisfies CSSProperties,
  newsBodySection: {
    marginBottom: '16px',
  } satisfies CSSProperties,
  newsProgressSection: {
    marginTop: '16px',
  } satisfies CSSProperties,
  compositeRoot: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    maxWidth: '840px',
  } satisfies CSSProperties,
  compositeCard: {
    width: '400px',
    borderRadius: '20px',
    padding: '20px',
  } satisfies CSSProperties,
  compositeCardTitle: {
    marginTop: 0,
  } satisfies CSSProperties,
  tasksList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  } satisfies CSSProperties,
  taskPrimaryCard: {
    padding: '12px',
  } satisfies CSSProperties,
  taskRowCard: {
    padding: '10px 12px',
  } satisfies CSSProperties,
  taskTitle: {
    margin: 0,
  } satisfies CSSProperties,
  taskTimePrimary: {
    margin: '6px 0 10px',
  } satisfies CSSProperties,
  taskTimeSecondary: {
    margin: '4px 0 0',
  } satisfies CSSProperties,
  variantsRow: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  } satisfies CSSProperties,
  variantCard: {
    width: '200px',
  } satisfies CSSProperties,
  sizesRow: {
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
  } satisfies CSSProperties,
  sizeCardSmall: {
    width: '150px',
  } satisfies CSSProperties,
  sizeCardMedium: {
    width: '200px',
  } satisfies CSSProperties,
  sizeCardLarge: {
    width: '250px',
  } satisfies CSSProperties,
};

export const createDarkCardStoriesStyles = (theme: ThemeType) => ({
  darkSurfaceBackground: {
    background: theme.colors.backgroundSecondary,
  } satisfies CSSProperties,
  darkTertiaryBackground: {
    background: theme.colors.backgroundTertiary,
  } satisfies CSSProperties,
  primaryText: {
    color: theme.colors.text,
  } satisfies CSSProperties,
  secondaryText: {
    color: theme.colors.textSecondary,
  } satisfies CSSProperties,
});

export const buildDarkCardSurfaceStyle = (theme: ThemeType, baseStyle: CSSProperties) => ({
  ...baseStyle,
  background: theme.colors.backgroundSecondary,
});

export const buildDarkTertiaryCardStyle = (theme: ThemeType, baseStyle: CSSProperties) => ({
  ...baseStyle,
  background: theme.colors.backgroundTertiary,
});
