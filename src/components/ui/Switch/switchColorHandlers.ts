/**
 * Реэкспорт общих хендлеров акцентного цвета (совместимость со Switch).
 * Канонический модуль: `handlers/controlAccentColorHandlers`.
 */
export {
  CONTROL_COLOR_PRESETS,
  CONTROL_COLOR_PRESETS as SWITCH_COLOR_PRESETS,
  isControlColorPreset,
  isControlColorPreset as isSwitchColorPreset,
  resolveControlAccentColors,
  resolveControlAccentColors as resolveSwitchCheckedTrackColors,
  type ControlAccentColors,
  type ControlAccentColors as SwitchCheckedTrackColors,
} from '../../../handlers/controlAccentColorHandlers';
