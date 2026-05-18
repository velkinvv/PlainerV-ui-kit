import type { DataGridExcelExportCellStyle, PillStatus, TagColorVariant } from '@/types/ui';

/** Пресет: зелёный статус (успех / активен) */
const successStatusStyle: DataGridExcelExportCellStyle = {
  textColor: '#1B5E20',
  backgroundColor: '#E8F5E9',
};

/** Пресет: красный статус (ошибка) */
const dangerStatusStyle: DataGridExcelExportCellStyle = {
  textColor: '#B71C1C',
  backgroundColor: '#FFEBEE',
};

/** Пресет: оранжевый статус (внимание) */
const warningStatusStyle: DataGridExcelExportCellStyle = {
  textColor: '#E65100',
  backgroundColor: '#FFF3E0',
};

/** Пресет: нейтральный серый статус */
const neutralStatusStyle: DataGridExcelExportCellStyle = {
  textColor: '#424242',
  backgroundColor: '#F5F5F5',
};

/** Пресет: информационный синий */
const infoStatusStyle: DataGridExcelExportCellStyle = {
  textColor: '#0D47A1',
  backgroundColor: '#E3F2FD',
};

/** Пресет: основной акцент */
const primaryStatusStyle: DataGridExcelExportCellStyle = {
  textColor: '#1565C0',
  backgroundColor: '#E3F2FD',
};

/**
 * Стили Excel для семантики **Pill** (`data-status` / `status`).
 * @param status — статус Pill
 */
export function resolveDataGridExcelExportStyleFromPillStatus(
  status: PillStatus | string | undefined,
): DataGridExcelExportCellStyle | undefined {
  switch (status) {
    case 'success':
      return successStatusStyle;
    case 'danger':
      return dangerStatusStyle;
    case 'warning':
      return warningStatusStyle;
    case 'info':
      return infoStatusStyle;
    case 'default':
      return primaryStatusStyle;
    default:
      return undefined;
  }
}

/**
 * Стили Excel для палитры **Tag** (`colorVariant`).
 * @param colorVariant — вариант цвета Tag
 */
export function resolveDataGridExcelExportStyleFromTagColorVariant(
  colorVariant: TagColorVariant | string | undefined,
): DataGridExcelExportCellStyle | undefined {
  switch (colorVariant) {
    case 'success':
      return successStatusStyle;
    case 'danger':
      return dangerStatusStyle;
    case 'warning':
      return warningStatusStyle;
    case 'info':
    case 'primary':
    case 'cyan':
      return infoStatusStyle;
    case 'neutral':
    case 'secondary':
      return neutralStatusStyle;
    case 'purple':
      return { textColor: '#6A1B9A', backgroundColor: '#F3E5F5' };
    case 'teal':
      return { textColor: '#00695C', backgroundColor: '#E0F2F1' };
    case 'pink':
      return { textColor: '#AD1457', backgroundColor: '#FCE4EC' };
    default:
      return undefined;
  }
}
