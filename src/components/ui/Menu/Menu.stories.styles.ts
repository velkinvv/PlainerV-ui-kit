import type { CSSProperties } from 'react';

export const menuStoriesStyles = {
  anchoredContainer: {
    position: 'relative',
    display: 'inline-block',
  } satisfies CSSProperties,
  anchoredPopup: {
    position: 'absolute',
    left: 0,
    top: '100%',
    marginTop: 4,
    zIndex: 2,
  } satisfies CSSProperties,
};
