import { useEffect, useState } from 'react';

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
};

/**
 * Единая логика видимости для overlay-компонентов.
 * Позволяет не дублировать связку `isOpen + unmountOnClose + lazy` в Modal/Drawer/Sheet.
 * @param overlayVisibilityParameters - входные параметры управления видимостью
 */
export const useOverlayVisibility = (
  overlayVisibilityParameters: UseOverlayVisibilityParameters,
): UseOverlayVisibilityResult => {
  const {
    isOpen,
    unmountOnClose = true,
    lazy = true,
  } = overlayVisibilityParameters;

  const [isInitialized, setIsInitialized] = useState<boolean>(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsInitialized(true);
    }
  }, [isOpen]);

  const shouldRenderByLazy = !lazy || isOpen || isInitialized;
  const shouldRenderPortal = shouldRenderByLazy && (isOpen || !unmountOnClose);
  const shouldRenderContent = unmountOnClose ? isOpen : shouldRenderByLazy;
  const isHidden = !isOpen && !unmountOnClose;

  return {
    shouldRenderPortal,
    shouldRenderContent,
    isHidden,
  };
};
