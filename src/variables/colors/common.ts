import { neutral } from './neutral';
import { primary } from './primary';
import { success } from './success';
import { danger } from './danger';
import { warning } from './warning';
import grey from './grey';

const common = {
  black: neutral[900],
  white: neutral[10],
  transparent: 'transparent',

  primary: primary[500],
  primaryHover: primary[600],
  primaryActive: primary[500],
  // Серые цвета для вторичных элементов - используем grey
  secondary: grey[500],
  secondaryHover: grey[600],
  secondaryActive: grey[500],
  success: success[500],
  successHover: success[600],
  successActive: success[500],
  warning: warning[500],
  warningHover: warning[600],
  warningActive: warning[500],
  danger: danger[500],
  dangerHover: danger[600],
  dangerActive: danger[500],
  info: primary[500],
  infoHover: primary[600],
  infoActive: primary[500],
  // цвета для кнопок
  btnSuccess: success[500],
  btnSuccessHover: success[600],
  btnSuccessActive: success[500],
  btnDanger: danger[500],
  btnDangerHover: danger[600],
  btnDangerActive: danger[500],
  btnWarning: warning[500],
  btnWarningHover: warning[600],
  btnWarningActive: warning[500],
  btnInfo: primary[500],
  btnInfoHover: primary[600],
  btnInfoActive: primary[500],
  btnPrimary: primary[500],
  btnPrimaryHover: primary[600],
  btnPrimaryActive: primary[500],
  btnSecondary: grey[500],
  btnSecondaryHover: grey[600],
  btnSecondaryActive: grey[500],
  btnOutline: grey[500],
  btnOutlineHover: grey[600],
  btnOutlineActive: grey[500],
  // Специальные цвета для уведомлений - используем red
  notificationDanger: danger[500],
  notificationDangerHover: danger[600],
  notificationDangerActive: danger[500],
  notificationSuccess: success[500],
  notificationSuccessHover: success[600],
  notificationSuccessActive: success[500],
  notificationWarning: warning[500],
  notificationWarningHover: warning[600],
  notificationWarningActive: warning[500],
  notificationInfo: primary[500],
  notificationInfoHover: primary[600],
  notificationInfoActive: primary[500],
  // Цвета для прогресса - используем green
  progressFill: success[500],
  progressFillHover: success[600],
  // Цвета для изображений
  imageBackground: grey[500],
  onlineIndicator: success[500],
};

export default common;
