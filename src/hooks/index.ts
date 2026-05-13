// UI хуки
export { useModal } from './useModal';
export { useToast, ToastProvider } from './useToast';
export type { ToastType, ToastItem, UseToastReturn, ShowToastOptions } from './useToast';
export { ToastAppearance } from './useToast';
export { useSnackbar, SnackbarProvider } from './useSnackbar';
export type {
  SnackbarItem,
  ShowSnackbarOptions,
  UseSnackbarReturn,
  SnackbarPlacement,
} from './useSnackbar';
export { useLocalStorage } from './useLocalStorage';
export { useDebounce } from './useDebounce';
export { useClickOutside } from './useClickOutside';
export { useKeyPress } from './useKeyPress';
export { useMediaQuery } from './useMediaQuery';
export { useScrollPosition } from './useScrollPosition';
export {
  useWindowSize,
  useScreenSize,
  useAvailableSize,
  useIsDesktop,
  DESKTOP_MIN_INNER_WIDTH_PX,
} from './useWindowSize';
export type { WindowSize } from './useWindowSize';
export { useNavigationMenuExpand } from './useNavigationMenuExpand';
export type {
  UseNavigationMenuExpandParams,
  UseNavigationMenuExpandResult,
} from './useNavigationMenuExpand';
export { useUiMotionPresets } from './useUiMotion';
