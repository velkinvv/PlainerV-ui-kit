import { ModalSize } from '../types/sizes';
import type { ModalTheme } from '../types/theme';

/**
 * Получить размер модального окна
 * @param theme - тема модального окна
 * @param size - размер
 * @returns объект с размерами для указанного размера
 */
export const getModalSize = (theme: ModalTheme | undefined, size: ModalSize): ModalTheme['sizes'][ModalSize] => {
  // Fallback значения
  const fallbackSizes: Record<ModalSize, ModalTheme['sizes'][ModalSize]> = {
    [ModalSize.XS]: {
      width: '100%',
      maxWidth: '400px',
      padding: '24px',
      borderRadius: '16px',
    },
    [ModalSize.SM]: {
      width: '100%',
      maxWidth: '500px',
      padding: '24px',
      borderRadius: '16px',
    },
    [ModalSize.MD]: {
      width: '100%',
      maxWidth: '600px',
      padding: '24px',
      borderRadius: '16px',
    },
    [ModalSize.LG]: {
      width: '100%',
      maxWidth: '800px',
      padding: '32px',
      borderRadius: '20px',
    },
    [ModalSize.FULL]: {
      width: '95vw',
      maxWidth: '95vw',
      height: '95vh',
      padding: '32px',
      borderRadius: '24px',
    },
  };

  // Если тема не определена или размер не найден, возвращаем fallback
  if (!theme || !theme.sizes || !theme.sizes[size]) {
    return fallbackSizes[size];
  }

  // Получаем размер из темы (у FULL в типе темы может не быть maxWidth)
  const themeSize = theme.sizes[size];
  if (!themeSize?.width) {
    return fallbackSizes[size];
  }

  if (size === ModalSize.FULL) {
    return themeSize;
  }

  if (!('maxWidth' in themeSize) || !themeSize.maxWidth) {
    return fallbackSizes[size];
  }

  return themeSize;
};

/**
 * Получить стили контейнера модального окна
 * @param theme - тема модального окна
 * @param size - размер
 * @returns объект с CSS стилями для контейнера
 */
export const getModalContainerStyles = (theme: ModalTheme | undefined, size: ModalSize) => {
  // getModalSize гарантирует валидный результат с fallback значениями
  const sizeStyles = getModalSize(theme, size);

  const settings = theme?.settings || {
    maxHeight: '90vh',
    fontFamily: 'inherit',
    zIndex: 1040,
  };

  // Дополнительная защита на случай, если что-то пошло не так
  const resolvedMaxWidth =
    size === ModalSize.FULL
      ? sizeStyles.width
      : 'maxWidth' in sizeStyles && sizeStyles.maxWidth
        ? sizeStyles.maxWidth
        : '600px';

  return {
    width: sizeStyles?.width || '100%',
    maxWidth: resolvedMaxWidth,
    padding: sizeStyles?.padding || '24px',
    borderRadius: sizeStyles?.borderRadius || '16px',
    maxHeight: settings.maxHeight,
    fontFamily: settings.fontFamily,
    zIndex: settings.zIndex,
  };
};

/**
 * Получить стили оверлея
 * @param theme - тема модального окна
 * @returns объект с CSS стилями для оверлея
 */
export const getModalOverlayStyles = (theme: ModalTheme | undefined) => {
  if (!theme || !theme.overlay) {
    return {
      background: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)',
      padding: '16px',
      zIndex: 1040,
    };
  }
  return {
    background: theme.overlay.background,
    backdropFilter: theme.overlay.backdropFilter,
    padding: theme.overlay.padding,
    zIndex: theme.settings?.zIndex || 1040,
  };
};

/**
 * Получить анимации модального окна
 * @param theme - тема модального окна
 * @returns объект с настройками анимаций
 */
export const getModalAnimations = (theme: ModalTheme | undefined) => {
  if (!theme || !theme.animations) {
    return {
      transition: 'all 0.2s ease-in-out',
      openAnimation: {
        duration: '0.2s',
        easing: 'ease-out',
        transform: 'scale(1) translateY(0)',
      },
      closeAnimation: {
        duration: '0.15s',
        easing: 'ease-in',
        transform: 'scale(0.95) translateY(20px)',
      },
    };
  }
  return theme.animations;
};

/**
 * Получить стили компонентов модального окна
 * @param theme - тема модального окна
 * @returns объект с CSS стилями для компонентов
 */
export const getModalComponentStyles = (theme: ModalTheme | undefined) => {
  if (!theme || !theme.components) {
    // Fallback значения для компонентов
    return {
      header: {
        padding: '20px 24px 0 24px',
        borderBottom: '1px solid #e0e0e0',
        marginBottom: '16px',
      },
      title: {
        fontSize: '20px',
        fontWeight: 600,
        lineHeight: '1.4',
        color: '#212121',
      },
      content: {
        padding: '0 24px 24px 24px',
      },
      footer: {
        padding: '16px 24px',
        borderTop: '1px solid #e0e0e0',
        marginTop: '16px',
      },
      closeButton: {
        width: '32px',
        height: '32px',
        borderRadius: '8px',
        color: '#757575',
        hoverBackground: '#f5f5f5',
        hoverColor: '#212121',
      },
    };
  }
  return theme.components;
};
