import { useReducedMotion } from 'framer-motion';
import {
  uiMotionAvatarInteractive,
  uiMotionBadgeInteractive,
  uiMotionButtonPress,
  uiMotionCardInteractions,
  uiMotionPillPress,
} from '../handlers/uiMotion';

/**
 * Готовые пресеты анимации для UI-kit: учитывают `prefers-reduced-motion`.
 * Используйте в компонентах с `motion.*` из framer-motion.
 */
export function useUiMotionPresets() {
  const reducedMotion = useReducedMotion();

  return {
    /** У пользователя включено «уменьшить движение». */
    reducedMotion: Boolean(reducedMotion),
    /** Кнопки, IconButton: нажатие (scale). @param active — не disabled и не loading */
    buttonPress: (active: boolean) => uiMotionButtonPress(reducedMotion, active),
    /** Card: hoverable / clickable */
    card: (options: { hoverable: boolean; clickable: boolean }) =>
      uiMotionCardInteractions(reducedMotion, options),
    /** Badge с onClick */
    badge: (interactive: boolean) => uiMotionBadgeInteractive(reducedMotion, interactive),
    /** Avatar с onClick */
    avatar: (interactive: boolean) => uiMotionAvatarInteractive(reducedMotion, interactive),
    /** Pill как кнопка */
    pill: (active: boolean) => uiMotionPillPress(reducedMotion, active),
  };
}
