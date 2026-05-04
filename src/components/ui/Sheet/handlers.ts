/**
 * Переиспользование логики анимации и размеров из `Drawer` (одинаковое поведение панели).
 */
export {
  drawerOverlayMotion as sheetOverlayMotion,
  getDrawerPanelMotion as getSheetPanelMotion,
  drawerSizeToCss as sheetSizeToCss,
} from '../Drawer/handlers';
