import { ModalSize } from '../../types/sizes';
import type { ModalTheme } from '../../types/theme';
import { neutral } from '../../variables/colors/neutral';
import { fontFamily } from '../fonts';

/**
 * Темная тема для модального окна
 * Определяет все настройки стилизации модального окна в темной теме
 */
export const darkModalTheme: ModalTheme = {
  // Размеры модального окна
  sizes: {
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
      width: '540px',
      maxWidth: '540px',
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
      height: '95vh',
      padding: '32px',
      borderRadius: '24px',
    },
  },

  // Компоненты модального окна
  components: {
    header: {
      padding: '0',
      borderBottom: 'none',
      marginBottom: '0',
    },
    title: {
      fontSize: '20px',
      fontWeight: 500,
      lineHeight: '1.4em',
      color: '#FFFFFF',
    },
    content: {
      padding: '0',
    },
    footer: {
      padding: '0',
      borderTop: 'none',
      marginTop: '0',
    },
    closeButton: {
      width: '26px',
      height: '26px',
      borderRadius: '0',
      color: '#9E9E9E',
      hoverBackground: 'transparent',
      hoverColor: '#FFFFFF',
    },
  },

  // Оверлей
  overlay: {
    background: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(4px)',
    padding: '16px',
  },

  // Анимации и эффекты
  animations: {
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
  },

  // Дополнительные настройки
  settings: {
    zIndex: 1040,
    maxHeight: '90vh',
    fontFamily: fontFamily.primary,
  },
};
