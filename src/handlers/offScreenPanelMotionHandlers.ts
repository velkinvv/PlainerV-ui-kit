import type { Transition } from 'framer-motion';

/**
 * Apple-style: плавная инерция без резкого обрыва; лёгкое «досбрасывание» у цели.
 * Основная ось — горизонтальное смещение и лёгкий 3D-наклон.
 */
export const offScreenPanelSlideSpring: Transition = {
  type: 'spring',
  stiffness: 290,
  damping: 27,
  mass: 0.92,
  restDelta: 0.25,
  restSpeed: 1.5,
};

/**
 * Opacity / scale: чуть более отзывчивый spring, чтобы глубина не отставала от слайда.
 */
export const offScreenPanelDepthSpring: Transition = {
  type: 'spring',
  stiffness: 460,
  damping: 36,
  mass: 0.58,
  restDelta: 0.2,
  restSpeed: 2,
};

/** Наклон «листа» при скрытии (perspective на родителе) */
export const offScreenPanelTiltSpring: Transition = {
  ...offScreenPanelSlideSpring,
  stiffness: 260,
  damping: 26,
};

/** Переход слоя панели у края экрана (оболочка) */
export const offScreenPanelLayerTransition = {
  x: offScreenPanelSlideSpring,
  opacity: offScreenPanelDepthSpring,
  scale: offScreenPanelDepthSpring,
  rotateY: offScreenPanelTiltSpring,
};

/**
 * Внутренний контейнер Sidemenu в режиме off-screen: ширина при expand — тот же «премиальный» spring.
 */
export const sidemenuOffScreenInnerPanelTransition = {
  width: offScreenPanelSlideSpring,
  x: offScreenPanelSlideSpring,
  opacity: offScreenPanelDepthSpring,
};
