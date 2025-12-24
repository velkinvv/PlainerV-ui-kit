import 'styled-components';
import type { ThemeType, ThemeMode } from '../types/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {
    mode: ThemeMode;
  }
}
