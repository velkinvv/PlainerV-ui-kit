import { useCallback, useEffect, useState } from 'react';

type UseOverlayVisibilityParameters = {
  /**
   * Текущее состояние открытия оверлейного компонента (Modal/Drawer/Sheet).
   */
  isOpen: boolean;
  /**
   * Размонтировать компонент после закрытия.
   * Если `false`, компонент остаётся в DOM и скрывается.
   */
  unmountOnClose?: boolean;
  /**
   * Лениво инициализировать компонент только после первого открытия.
   */
  lazy?: boolean;
};

type UseOverlayVisibilityResult = {
  /**
   * Нужен ли рендер портала в текущем состоянии.
   */
  shouldRenderPortal: boolean;
  /**
   * Рендерить ли содержимое внутри `AnimatePresence`.
   */
  shouldRenderContent: boolean;
  /**
   * Скрыто ли содержимое в режиме `unmountOnClose=false`.
   */
  isHidden: boolean;
  /**
   * Передать в `AnimatePresence` как `onExitComplete`: после выходной анимации
   * снимает «удержание» портала при `unmountOnClose=true`, иначе портал исчезает
   * вместе с деревом до проигрывания `exit`.
   */
  notifyPresenceExitComplete: () => void;
};

/**
 * Единая логика видимости для overlay-компонентов.
 * Позволяет не дублировать связку `isOpen + unmountOnClose + lazy` в Modal/Drawer/Sheet.
 * @param overlayVisibilityParameters - входные параметры управления видимостью
 */
export const useOverlayVisibility = (
  overlayVisibilityParameters: UseOverlayVisibilityParameters,
): UseOverlayVisibilityResult => {
  const { isOpen, unmountOnClose = true, lazy = true } = overlayVisibilityParameters;

  const [isInitialized, setIsInitialized] = useState<boolean>(isOpen);
  /**
   * После `true` при `unmountOnClose` портал можно снять (выходная анимация закончилась).
   * Пока `false` при закрытом `isOpen` портал остаётся смонтированным ради `AnimatePresence`.
   */
  const [allowPortalUnmountAfterClose, setAllowPortalUnmountAfterClose] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsInitialized(true);
      setAllowPortalUnmountAfterClose(false);
    }
  }, [isOpen]);

  const shouldRenderByLazy = !lazy || isOpen || isInitialized;
  const shouldRenderPortal =
    shouldRenderByLazy &&
    (!unmountOnClose || isOpen || (isInitialized && !allowPortalUnmountAfterClose));
  const shouldRenderContent = unmountOnClose ? isOpen : shouldRenderByLazy;
  const isHidden = !isOpen && !unmountOnClose;

  const notifyPresenceExitComplete = useCallback(() => {
    if (unmountOnClose) {
      setAllowPortalUnmountAfterClose(true);
    }
  }, [unmountOnClose]);

  return {
    shouldRenderPortal,
    shouldRenderContent,
    isHidden,
    notifyPresenceExitComplete,
  };
};
