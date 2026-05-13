import type { CSSProperties } from 'react';
import type { ThemeType } from '@/types/theme';

export const dropdownStoriesStyles = {
  inlineFlexCenterGap8: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
  } satisfies CSSProperties,
  wrappedRowGap24: {
    display: 'flex',
    gap: 24,
    flexWrap: 'wrap',
  } satisfies CSSProperties,
  wrappedRowGap24AlignStart: {
    display: 'flex',
    gap: 24,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  } satisfies CSSProperties,
  controlColumnGap16: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  } satisfies CSSProperties,
  rowGap8AlignCenter: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
  } satisfies CSSProperties,
  controlColumnGap24: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  } satisfies CSSProperties,
  controlColumnGap4: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  } satisfies CSSProperties,
  rowGap16: {
    display: 'flex',
    gap: 16,
  } satisfies CSSProperties,
  inlineFlexRelativeGap6: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
  } satisfies CSSProperties,
  alignSelfDemoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    gap: 24,
    minHeight: 220,
    padding: 16,
    borderRadius: 12,
  } satisfies CSSProperties,
  smartPositioningContainer: {
    borderRadius: 12,
    height: 320,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  } satisfies CSSProperties,
  alignSelfStart: {
    alignSelf: 'flex-start',
  } satisfies CSSProperties,
  alignSelfEnd: {
    alignSelf: 'flex-end',
  } satisfies CSSProperties,
  errorStateContainer: {
    padding: 24,
    textAlign: 'center',
  } satisfies CSSProperties,
  errorStateTitle: {
    display: 'block',
    marginBottom: 8,
  } satisfies CSSProperties,
  inlineModeContainer: {
    padding: 24,
    borderRadius: 12,
    width: 320,
    height: 220,
    overflow: 'auto',
    position: 'relative',
  } satisfies CSSProperties,
  inlineModeSpacer: {
    height: 120,
  } satisfies CSSProperties,
  portalContainer: {
    padding: 24,
    borderRadius: 12,
    position: 'relative',
    minHeight: 220,
  } satisfies CSSProperties,
  portalTargetOverlay: {
    position: 'absolute',
    inset: 16,
    pointerEvents: 'none',
  } satisfies CSSProperties,
  targetElementBox: {
    padding: 16,
    borderRadius: 8,
    width: 200,
    textAlign: 'center',
    cursor: 'pointer',
  } satisfies CSSProperties,
  panelContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 12px',
    borderRadius: 6,
  } satisfies CSSProperties,
  panelInput: {
    padding: '6px 12px',
    borderRadius: 6,
    fontSize: 14,
    width: 150,
  } satisfies CSSProperties,
  panelButtonBase: {
    padding: '6px 12px',
    borderRadius: 6,
    fontSize: 14,
    cursor: 'pointer',
  } satisfies CSSProperties,
  panelHeading: {
    fontSize: 14,
    fontWeight: 600,
  } satisfies CSSProperties,
  panelMetaText: {
    fontSize: 12,
  } satisfies CSSProperties,
  userMenuTrigger: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    cursor: 'pointer',
    padding: '8px 12px',
    borderRadius: 8,
  } satisfies CSSProperties,
  userMenuAvatar: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  } satisfies CSSProperties,
  notificationBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    borderRadius: '50%',
    width: 16,
    height: 16,
    fontSize: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } satisfies CSSProperties,
  controlledMenuStateText: {
    fontSize: 14,
  } satisfies CSSProperties,
  treeContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    maxWidth: 440,
  } satisfies CSSProperties,
  treeCollapsedContainer: {
    maxWidth: 440,
  } satisfies CSSProperties,
  treeControlledContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    maxWidth: 480,
  } satisfies CSSProperties,
  sectionColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  } satisfies CSSProperties,
  sectionTitle: {
    margin: 0,
  } satisfies CSSProperties,
  sectionDescription: {
    margin: 0,
    marginBottom: '10px',
  } satisfies CSSProperties,
  treeDescription: {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.5,
  } satisfies CSSProperties,
  treeKeysDescription: {
    margin: 0,
    fontSize: 13,
  } satisfies CSSProperties,
  previewPanel: {
    padding: 12,
    borderRadius: 8,
    fontSize: 14,
  } satisfies CSSProperties,
  selectedValuesPreview: {
    margin: 0,
    padding: 12,
    borderRadius: 8,
    fontSize: 12,
    overflow: 'auto',
  } satisfies CSSProperties,
};

export const createDropdownStoryThemeStyles = (theme: ThemeType) => ({
  palette: {
    iconAccent: theme.colors.info,
    mutedText: theme.colors.textSecondary,
    surface: theme.colors.backgroundSecondary,
    surfaceMuted: theme.colors.backgroundTertiary,
    border: theme.colors.border,
    danger: theme.colors.danger,
    warningTint: `color-mix(in srgb, ${theme.colors.warning} 22%, ${theme.colors.backgroundSecondary})`,
    infoTint: `color-mix(in srgb, ${theme.colors.info} 18%, ${theme.colors.backgroundSecondary})`,
    violetTint: `color-mix(in srgb, ${theme.colors.primary} 14%, ${theme.colors.backgroundSecondary})`,
  },
  sectionDescription: {
    color: theme.colors.textSecondary,
  } satisfies CSSProperties,
  treeDescription: {
    color: theme.colors.textSecondary,
  } satisfies CSSProperties,
  treeKeysDescription: {
    color: theme.colors.textSecondary,
  } satisfies CSSProperties,
  previewPanel: {
    backgroundColor: theme.colors.backgroundTertiary,
  } satisfies CSSProperties,
  selectedValuesPreview: {
    backgroundColor: theme.colors.backgroundTertiary,
  } satisfies CSSProperties,
  alignSelfDemoContainer: {
    border: `1px dashed ${theme.colors.border}`,
  } satisfies CSSProperties,
  smartPositioningContainer: {
    border: `1px solid ${theme.colors.border}`,
  } satisfies CSSProperties,
  inlineModeContainer: {
    border: `1px solid ${theme.colors.border}`,
  } satisfies CSSProperties,
  portalContainer: {
    border: `1px solid ${theme.colors.info}`,
  } satisfies CSSProperties,
  targetElementBox: {
    backgroundColor: theme.colors.backgroundTertiary,
  } satisfies CSSProperties,
  panelContainerByDisabled: (disabled: boolean): CSSProperties => ({
    backgroundColor: disabled ? theme.colors.backgroundTertiary : theme.colors.backgroundSecondary,
  }),
  panelInput: {
    border: `1px solid ${theme.colors.border}`,
  } satisfies CSSProperties,
  panelMetaText: {
    color: theme.colors.textSecondary,
  } satisfies CSSProperties,
  panelButtonSecondaryByDisabled: (disabled: boolean): CSSProperties => ({
    border: `1px solid ${theme.colors.border}`,
    backgroundColor: disabled ? theme.colors.backgroundTertiary : theme.colors.backgroundSecondary,
    cursor: disabled ? 'not-allowed' : 'pointer',
  }),
  panelButtonPrimaryByDisabled: (disabled: boolean): CSSProperties => ({
    border: 'none',
    backgroundColor: disabled ? theme.colors.backgroundTertiary : theme.colors.info,
    color: disabled ? theme.colors.textSecondary : theme.colors.backgroundSecondary,
    cursor: disabled ? 'not-allowed' : 'pointer',
  }),
  userMenuTrigger: {
    border: `1px solid ${theme.colors.border}`,
    backgroundColor: theme.colors.backgroundTertiary,
  } satisfies CSSProperties,
  userMenuAvatar: {
    backgroundColor: theme.colors.info,
    color: theme.colors.backgroundSecondary,
  } satisfies CSSProperties,
  notificationBadge: {
    backgroundColor: theme.colors.danger,
    color: theme.colors.backgroundSecondary,
  } satisfies CSSProperties,
  notificationWarningRow: {
    backgroundColor: `color-mix(in srgb, ${theme.colors.warning} 22%, ${theme.colors.backgroundSecondary})`,
    borderBottom: `1px solid ${theme.colors.border}`,
  } satisfies CSSProperties,
  notificationInfoRow: {
    backgroundColor: `color-mix(in srgb, ${theme.colors.info} 18%, ${theme.colors.backgroundSecondary})`,
    borderBottom: `1px solid ${theme.colors.border}`,
  } satisfies CSSProperties,
  notificationVioletRow: {
    backgroundColor: `color-mix(in srgb, ${theme.colors.primary} 14%, ${theme.colors.backgroundSecondary})`,
  } satisfies CSSProperties,
  controlledMenuStateText: {
    color: theme.colors.textSecondary,
  } satisfies CSSProperties,
});
