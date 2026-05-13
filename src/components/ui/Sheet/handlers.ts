/**
 * Переиспользование логики анимации и размеров из `Drawer` (одинаковое поведение панели).
 */
export {
  getDrawerOverlayMotion as getSheetOverlayMotion,
  getDrawerPanelMotion as getSheetPanelMotion,
  drawerSizeToCss as sheetSizeToCss,
} from '../Drawer/handlers';
