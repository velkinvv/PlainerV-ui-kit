import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { Carousel } from './Carousel';
import {
  CarouselAnimation,
  CarouselDotsPosition,
  CarouselNavigation,
  CarouselOrientation,
  CarouselSlideOverlayAlign,
  CarouselSlideOverlayPanelGradient,
  CarouselSlideOverlayPanelPlacement,
  CarouselSlideOverlayPlacement,
  type CarouselSlideChangeEvent,
  type CarouselSlideClickEvent,
} from '../../../types/ui';
import { Size } from '../../../types/sizes';
import { Button } from '../buttons/Button/Button';
import { glassLightTheme } from '@/themes/themes';
import { DOC_CAROUSEL } from '@/components/ui/storyDocs/uiKitDocs';
import { carouselStoriesStyles } from './Carousel.stories.styles';
import {
  carouselDemoSlides,
  mapCarouselDemoSlidesToItems,
  renderCarouselDemoSlides,
  useCarouselDemoSlides,
  useCarouselStoryActiveIndex,
} from './Carousel.stories.helpers';

const meta: Meta<typeof Carousel> = {
  title: 'UI Kit/Data Display/Carousel',
  component: Carousel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_CAROUSEL,
      },
    },
  },
  tags: ['autodocs'],
  render: (storyArgs) => (
    <CarouselStoryDemo
      animation={storyArgs.animation}
      navigation={storyArgs.navigation}
      dotsPosition={storyArgs.dotsPosition}
      thumbnails={storyArgs.thumbnails}
      thumbnailHeight={storyArgs.thumbnailHeight}
      loop={storyArgs.loop ?? true}
      random={storyArgs.random}
      showCaption={storyArgs.showCaption}
      fullscreen={storyArgs.fullscreen}
      fullscreenOpenAriaLabel={storyArgs.fullscreenOpenAriaLabel}
      autoplay={storyArgs.autoplay}
      autoplayInterval={storyArgs.autoplayInterval}
      swipeEnabled={storyArgs.swipeEnabled}
      pauseOnHover={storyArgs.pauseOnHover}
      pauseOnFocus={storyArgs.pauseOnFocus}
      animationDuration={storyArgs.animationDuration}
      size={storyArgs.size}
      aspectRatio={storyArgs.aspectRatio}
      height={storyArgs.height}
      aria-label={storyArgs['aria-label']}
      showActiveIndex
    />
  ),
  argTypes: {
    activeIndex: {
      control: false,
      description: 'Активный слайд (контролируемый режим, с 0)',
      table: { type: { summary: 'number' } },
    },
    defaultActiveIndex: {
      control: { type: 'number', min: 0 },
      description: 'Начальный слайд в неконтролируемом режиме',
      table: { type: { summary: 'number' }, defaultValue: { summary: '0' } },
    },
    onActiveIndexChange: {
      action: 'activeIndexChange',
      description: 'Колбэк смены активного слайда (только индекс)',
      table: { type: { summary: '(activeIndex: number) => void' } },
    },
    onSlideChange: {
      action: 'slideChange',
      description: 'Колбэк смены слайда с данными current / previous / next',
      table: { type: { summary: '(event: CarouselSlideChangeEvent) => void' } },
    },
    onSlideClick: {
      action: 'slideClick',
      description: 'Колбэк клика по области слайда',
      table: { type: { summary: '(event: CarouselSlideClickEvent) => void' } },
    },
    onThumbnailClick: {
      action: 'thumbnailClick',
      description: 'Колбэк клика по миниатюре (превью) слайда',
      table: { type: { summary: '(event: CarouselSlideClickEvent) => void' } },
    },
    onTitleClick: {
      action: 'titleClick',
      description: 'Колбэк клика по заголовку (`Carousel.Caption`) слайда',
      table: { type: { summary: '(event: CarouselSlideClickEvent) => void' } },
    },
    loop: {
      control: 'boolean',
      description: 'Зацикливание: после последнего слайда — первый',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    random: {
      control: 'boolean',
      description: 'Случайный порядок отображения слайдов при монтировании',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    animation: {
      control: { type: 'select' },
      options: Object.values(CarouselAnimation),
      description: 'Тип анимации: slide, fade, scale',
      table: {
        type: { summary: 'CarouselAnimation' },
        defaultValue: { summary: 'CarouselAnimation.SLIDE' },
      },
    },
    animationDuration: {
      control: { type: 'number', min: 0, max: 2000, step: 50 },
      description: 'Длительность анимации в мс (учитывается prefers-reduced-motion)',
      table: { type: { summary: 'number' }, defaultValue: { summary: '350' } },
    },
    navigation: {
      control: { type: 'select' },
      options: Object.values(CarouselNavigation),
      description: 'Набор контролов: arrows, dots, both, none',
      table: {
        type: { summary: 'CarouselNavigation' },
        defaultValue: { summary: 'CarouselNavigation.BOTH' },
      },
    },
    dotsPosition: {
      control: { type: 'select' },
      options: Object.values(CarouselDotsPosition),
      description: 'Расположение точек: inner (поверх слайда) или outer (под областью)',
      table: {
        type: { summary: 'CarouselDotsPosition' },
        defaultValue: { summary: 'CarouselDotsPosition.INNER' },
      },
    },
    thumbnails: {
      control: 'boolean',
      description: 'Полоса миниатюр под основной областью (можно вместе со стрелками / точками)',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    thumbnailHeight: {
      control: { type: 'number', min: 48, max: 120, step: 4 },
      description: 'Высота миниатюры в px',
      table: { type: { summary: 'number' }, defaultValue: { summary: '72' } },
    },
    showCaption: {
      control: 'boolean',
      description: 'Показывать подписи `Carousel.Caption` под изображениями',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
    fullscreen: {
      control: 'boolean',
      description: 'Показывать кнопку полноэкранного просмотра активного слайда',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    fullscreenOpenAriaLabel: {
      control: 'text',
      description: 'Подпись кнопки открытия полноэкранного режима',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Открыть слайд на весь экран' },
      },
    },
    autoplay: {
      control: 'boolean',
      description: 'Автоматическая смена слайдов',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    autoplayInterval: {
      control: { type: 'number', min: 1000, max: 15000, step: 500 },
      description: 'Интервал автопрокрутки в мс',
      table: { type: { summary: 'number' }, defaultValue: { summary: '5000' } },
    },
    pauseOnHover: {
      control: 'boolean',
      description: 'Пауза автопрокрутки при наведении',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
    pauseOnFocus: {
      control: 'boolean',
      description: 'Пауза автопрокрутки при фокусе внутри карусели',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
    swipeEnabled: {
      control: 'boolean',
      description: 'Свайп / drag для переключения слайдов',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
    aspectRatio: {
      control: 'text',
      description: 'CSS aspect-ratio области слайдов (если не задан height)',
      table: { type: { summary: 'string' }, defaultValue: { summary: '16 / 9' } },
    },
    height: {
      control: 'text',
      description: 'Фиксированная высота (альтернатива aspectRatio)',
      table: { type: { summary: 'string | number' } },
    },
    size: {
      control: { type: 'select' },
      options: Object.values(Size),
      description: 'Размер стрелок, точек и скругления',
      table: { type: { summary: 'Size' }, defaultValue: { summary: 'Size.MD' } },
    },
    'aria-label': {
      control: 'text',
      description: 'Обязательная подпись region для screen reader',
      table: { type: { summary: 'string' } },
    },
    className: {
      control: 'text',
      table: { type: { summary: 'string' } },
    },
    children: {
      control: false,
      table: { type: { summary: 'Carousel.Slide[]' } },
    },
    items: {
      control: false,
      description:
        'Массив **CarouselItemDefinition** — слайды из данных; при непустом значении заменяет **children**.',
      table: { type: { summary: 'CarouselItemDefinition[]' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

type CarouselStoryDemoProps = {
  animation?: CarouselAnimation;
  navigation?: CarouselNavigation;
  dotsPosition?: CarouselDotsPosition;
  thumbnails?: boolean;
  thumbnailHeight?: number;
  showCaption?: boolean;
  fullscreen?: boolean;
  fullscreenOpenAriaLabel?: string;
  random?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
  swipeEnabled?: boolean;
  pauseOnHover?: boolean;
  pauseOnFocus?: boolean;
  animationDuration?: number;
  size?: Size;
  aspectRatio?: string;
  height?: string | number;
  orientation?: CarouselOrientation;
  showProgressBar?: boolean;
  'aria-label'?: string;
  showActiveIndex?: boolean;
  shellStyle?: React.CSSProperties;
};

const CarouselStoryDemo = ({
  animation = CarouselAnimation.SLIDE,
  navigation = CarouselNavigation.BOTH,
  dotsPosition = CarouselDotsPosition.INNER,
  thumbnails = false,
  thumbnailHeight = 72,
  showCaption = true,
  fullscreen = false,
  fullscreenOpenAriaLabel,
  random = false,
  loop = true,
  autoplay = false,
  autoplayInterval = 5000,
  swipeEnabled = true,
  pauseOnHover = true,
  pauseOnFocus = true,
  animationDuration = 350,
  size = Size.MD,
  aspectRatio = '16 / 9',
  height,
  orientation = CarouselOrientation.HORIZONTAL,
  showProgressBar = false,
  'aria-label': ariaLabel = 'Галерея изображений',
  showActiveIndex = true,
  shellStyle,
}: CarouselStoryDemoProps) => {
  const { activeIndex, setActiveIndex } = useCarouselStoryActiveIndex();
  const slideNodes = useCarouselDemoSlides(carouselDemoSlides);

  return (
    <div style={carouselStoriesStyles.section}>
      {showActiveIndex ? (
        <p style={carouselStoriesStyles.statusPanel}>
          Активный слайд: {activeIndex + 1} из {carouselDemoSlides.length}
        </p>
      ) : null}
      <div style={shellStyle}>
        <Carousel
          activeIndex={activeIndex}
          onActiveIndexChange={setActiveIndex}
          animation={animation}
          navigation={navigation}
          dotsPosition={dotsPosition}
          thumbnails={thumbnails}
          thumbnailHeight={thumbnailHeight}
          showCaption={showCaption}
          fullscreen={fullscreen}
          fullscreenOpenAriaLabel={fullscreenOpenAriaLabel}
          random={random}
          loop={loop}
          autoplay={autoplay}
          autoplayInterval={autoplayInterval}
          swipeEnabled={swipeEnabled}
          pauseOnHover={pauseOnHover}
          pauseOnFocus={pauseOnFocus}
          animationDuration={animationDuration}
          size={size}
          aspectRatio={aspectRatio}
          height={height}
          orientation={orientation}
          showProgressBar={showProgressBar}
          aria-label={ariaLabel}
        >
          {slideNodes}
        </Carousel>
      </div>
    </div>
  );
};

/** Playground: все основные пропсы через Controls */
export const Playground: Story = {
  render: (storyArgs) => (
    <CarouselStoryDemo
      animation={storyArgs.animation}
      navigation={storyArgs.navigation}
      dotsPosition={storyArgs.dotsPosition}
      thumbnails={storyArgs.thumbnails}
      thumbnailHeight={storyArgs.thumbnailHeight}
      loop={storyArgs.loop}
      random={storyArgs.random}
      showCaption={storyArgs.showCaption}
      fullscreen={storyArgs.fullscreen}
      fullscreenOpenAriaLabel={storyArgs.fullscreenOpenAriaLabel}
      autoplay={storyArgs.autoplay}
      autoplayInterval={storyArgs.autoplayInterval}
      swipeEnabled={storyArgs.swipeEnabled}
      pauseOnHover={storyArgs.pauseOnHover}
      pauseOnFocus={storyArgs.pauseOnFocus}
      animationDuration={storyArgs.animationDuration}
      size={storyArgs.size}
      aspectRatio={storyArgs.aspectRatio}
      height={storyArgs.height}
      aria-label={storyArgs['aria-label']}
      showActiveIndex
    />
  ),
  args: {
    animation: CarouselAnimation.SLIDE,
    navigation: CarouselNavigation.BOTH,
    dotsPosition: CarouselDotsPosition.INNER,
    thumbnails: false,
    thumbnailHeight: 72,
    showCaption: true,
    fullscreen: false,
    fullscreenOpenAriaLabel: 'Открыть слайд на весь экран',
    loop: true,
    autoplay: false,
    autoplayInterval: 5000,
    swipeEnabled: true,
    pauseOnHover: true,
    pauseOnFocus: true,
    animationDuration: 350,
    size: Size.MD,
    aspectRatio: '16 / 9',
    'aria-label': 'Галерея изображений',
  },
};

/** Базовая карусель: slide-анимация, стрелки и точки */
export const Default: Story = {
  render: () => <CarouselStoryDemo aria-label="Галерея фотографий" />,
};

/** Слайды из пропа items (CarouselItemDefinition[]) */
export const ItemsFromData: Story = {
  render: () => {
    const { activeIndex, setActiveIndex } = useCarouselStoryActiveIndex();
    const carouselItems = mapCarouselDemoSlidesToItems(carouselDemoSlides);

    return (
      <div style={carouselStoriesStyles.page}>
        <p style={carouselStoriesStyles.hint}>
          Проп **items** (`CarouselItemDefinition[]`) — альтернатива дочерним **Carousel.Slide**.
          Для простых слайдов достаточно **imageSrc**, **imageAlt**, **caption**; для сложной вёрстки —
          **children** в элементе массива.
        </p>
        <p style={carouselStoriesStyles.statusPanel}>
          Активный слайд: {activeIndex + 1} / {carouselItems.length}
        </p>
        <Carousel
          activeIndex={activeIndex}
          onActiveIndexChange={setActiveIndex}
          items={carouselItems}
          loop
          navigation={CarouselNavigation.BOTH}
          aria-label="Галерея из items"
        />
      </div>
    );
  },
};

/** Без подписей под изображениями */
export const WithoutCaption: Story = {
  render: () => (
    <div style={carouselStoriesStyles.page}>
      <p style={carouselStoriesStyles.hint}>
        `showCaption={false}` скрывает `Carousel.Caption` — изображение занимает всю высоту слайда.
      </p>
      <CarouselStoryDemo showCaption={false} aria-label="Галерея без подписей" />
    </div>
  ),
};

/** Полноэкранный просмотр активного слайда */
export const Fullscreen: Story = {
  render: () => (
    <div style={carouselStoriesStyles.page}>
      <p style={carouselStoriesStyles.hint}>
        `fullscreen={true}` добавляет кнопку ⛶ в правом верхнем углу. В полноэкранном режиме доступны
        стрелки, Escape и клик по затемнению для закрытия.
      </p>
      <CarouselStoryDemo
        fullscreen
        loop
        navigation={CarouselNavigation.BOTH}
        aria-label="Галерея с полноэкранным просмотром"
      />
    </div>
  ),
};

/** События клика и смены слайда */
export const SlideEvents: Story = {
  render: () => {
    const [slideChangeEvent, setSlideChangeEvent] = useState<CarouselSlideChangeEvent | null>(null);
    const [slideClickEvent, setSlideClickEvent] = useState<CarouselSlideClickEvent | null>(null);
    const [thumbnailClickEvent, setThumbnailClickEvent] = useState<CarouselSlideClickEvent | null>(null);
    const [titleClickEvent, setTitleClickEvent] = useState<CarouselSlideClickEvent | null>(null);
    const { activeIndex, setActiveIndex } = useCarouselStoryActiveIndex();
    const slideNodes = useCarouselDemoSlides(carouselDemoSlides);

    return (
      <div style={carouselStoriesStyles.page}>
        <p style={carouselStoriesStyles.hint}>
          Задайте `slideId` на `Carousel.Slide`. `onSlideChange` — current / previous / next;
          `onSlideClick` — клик по области слайда; `onThumbnailClick` — по миниатюре;
          `onTitleClick` — по подписи `Carousel.Caption`.
        </p>
        <div style={carouselStoriesStyles.statusPanel}>
          <p>
            Активный индекс: {activeIndex + 1} / {carouselDemoSlides.length}
          </p>
          {slideChangeEvent ? (
            <p>
              onSlideChange: id={slideChangeEvent.current.slideId ?? '—'}, index=
              {slideChangeEvent.activeIndex}, prev=
              {slideChangeEvent.previous?.slideId ?? 'null'}, next=
              {slideChangeEvent.next?.slideId ?? 'null'}
            </p>
          ) : null}
          {slideClickEvent ? (
            <p>
              onSlideClick: id={slideClickEvent.slide.slideId ?? '—'}, index=
              {slideClickEvent.slide.slideIndex}
            </p>
          ) : null}
          {thumbnailClickEvent ? (
            <p>
              onThumbnailClick: id={thumbnailClickEvent.slide.slideId ?? '—'}, index=
              {thumbnailClickEvent.slide.slideIndex}
            </p>
          ) : null}
          {titleClickEvent ? (
            <p>
              onTitleClick: id={titleClickEvent.slide.slideId ?? '—'}, caption=
              {titleClickEvent.slide.caption ?? '—'}
            </p>
          ) : null}
        </div>
        <Carousel
          activeIndex={activeIndex}
          onActiveIndexChange={setActiveIndex}
          onSlideChange={setSlideChangeEvent}
          onSlideClick={setSlideClickEvent}
          onThumbnailClick={setThumbnailClickEvent}
          onTitleClick={setTitleClickEvent}
          loop
          thumbnails
          navigation={CarouselNavigation.BOTH}
          aria-label="Галерея с событиями слайдов"
        >
          {slideNodes}
        </Carousel>
      </div>
    );
  },
};

/** Оверлеи поверх слайда: top / bottom / left / right с выравниванием */
export const SlideOverlays: Story = {
  render: () => {
    const { activeIndex, setActiveIndex } = useCarouselStoryActiveIndex();
    const overlayButtonStyle = carouselStoriesStyles.overlayDemoButton;

    return (
      <div style={carouselStoriesStyles.page}>
        <p style={carouselStoriesStyles.hint}>
          `Carousel.Overlay` рендерит элементы поверх слайда в зонах top / bottom (горизонтально) и
          left / right (вертикально) с выравниванием start, center, end. Render prop получает
          `CarouselSlideInfo`.
        </p>
        <p style={carouselStoriesStyles.statusPanel}>
          Активный слайд: {activeIndex + 1} / {carouselDemoSlides.length}
        </p>
        <Carousel
          activeIndex={activeIndex}
          onActiveIndexChange={setActiveIndex}
          loop
          showCaption={false}
          navigation={CarouselNavigation.BOTH}
          aria-label="Галерея с оверлеями"
        >
          {carouselDemoSlides.map((slide) => (
            <Carousel.Slide key={slide.slideKey} slideId={slide.slideKey} slideLabel={slide.slideLabel}>
              <Carousel.Image src={slide.imageSrc} alt={slide.imageAlt} loading="eager" />
              <Carousel.Overlay
                placement={CarouselSlideOverlayPlacement.TOP}
                align={CarouselSlideOverlayAlign.START}
              >
                {(slideInfo) => (
                  <Button style={overlayButtonStyle} size={Size.SM}>
                    Top start · {slideInfo.slideId}
                  </Button>
                )}
              </Carousel.Overlay>
              <Carousel.Overlay
                placement={CarouselSlideOverlayPlacement.TOP}
                align={CarouselSlideOverlayAlign.END}
              >
                <Button style={overlayButtonStyle} size={Size.SM}>
                  Top end
                </Button>
              </Carousel.Overlay>
              <Carousel.Overlay
                placement={CarouselSlideOverlayPlacement.BOTTOM}
                align={CarouselSlideOverlayAlign.CENTER}
              >
                {(slideInfo) => (
                  <Button style={overlayButtonStyle} size={Size.SM}>
                    Bottom center · {slideInfo.slideIndex + 1}
                  </Button>
                )}
              </Carousel.Overlay>
              <Carousel.Overlay
                placement={CarouselSlideOverlayPlacement.LEFT}
                align={CarouselSlideOverlayAlign.CENTER}
              >
                <Button style={overlayButtonStyle} size={Size.SM}>
                  Left
                </Button>
              </Carousel.Overlay>
              <Carousel.Overlay
                placement={CarouselSlideOverlayPlacement.RIGHT}
                align={CarouselSlideOverlayAlign.END}
              >
                <Button style={overlayButtonStyle} size={Size.SM}>
                  Right end
                </Button>
              </Carousel.Overlay>
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
    );
  },
};

/** Контентная панель поверх слайда: заголовок, текст, кнопки */
export const SlideOverlayPanel: Story = {
  render: () => {
    const { activeIndex, setActiveIndex } = useCarouselStoryActiveIndex();
    const overlayButtonStyle = carouselStoriesStyles.overlayDemoButton;

    return (
      <div style={carouselStoriesStyles.page}>
        <p style={carouselStoriesStyles.hint}>
          `Carousel.OverlayPanel` — панель поверх изображения для текста и произвольных элементов.
          `Carousel.OverlayPanel.Title` и `.Text` — готовые стили; можно комбинировать с
          `Carousel.Overlay` для кнопок в углах.
        </p>
        <p style={carouselStoriesStyles.statusPanel}>
          Активный слайд: {activeIndex + 1} / {carouselDemoSlides.length}
        </p>
        <Carousel
          activeIndex={activeIndex}
          onActiveIndexChange={setActiveIndex}
          loop
          showCaption={false}
          navigation={CarouselNavigation.BOTH}
          aria-label="Галерея с контентной панелью"
        >
          {carouselDemoSlides.map((slide) => (
            <Carousel.Slide key={slide.slideKey} slideId={slide.slideKey} slideLabel={slide.slideLabel}>
              <Carousel.Image src={slide.imageSrc} alt={slide.imageAlt} loading="eager" />
              <Carousel.OverlayPanel
                placement={CarouselSlideOverlayPanelPlacement.BOTTOM}
                align={CarouselSlideOverlayAlign.START}
                gradient={CarouselSlideOverlayPanelGradient.BOTTOM}
              >
                {(slideInfo) => (
                  <>
                    <Carousel.OverlayPanel.Title>{slide.caption ?? slide.slideLabel}</Carousel.OverlayPanel.Title>
                    <Carousel.OverlayPanel.Text>
                      Слайд {slideInfo.slideIndex + 1} · id: {slideInfo.slideId}
                    </Carousel.OverlayPanel.Text>
                    <Button style={overlayButtonStyle} size={Size.SM}>
                      Подробнее
                    </Button>
                  </>
                )}
              </Carousel.OverlayPanel>
              <Carousel.Overlay
                placement={CarouselSlideOverlayPlacement.TOP}
                align={CarouselSlideOverlayAlign.END}
              >
                <Button style={overlayButtonStyle} size={Size.SM}>
                  Поделиться
                </Button>
              </Carousel.Overlay>
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
    );
  },
};

/** Parallax: фон медленнее, текст и кнопки быстрее при drag и смене слайда */
export const ParallaxAnimation: Story = {
  render: () => {
    const { activeIndex, setActiveIndex } = useCarouselStoryActiveIndex();
    const overlayButtonStyle = carouselStoriesStyles.overlayDemoButton;

    return (
      <div style={carouselStoriesStyles.page}>
        <p style={carouselStoriesStyles.hint}>
          `animation={CarouselAnimation.PARALLAX}` или `parallax={true}` — фон (`Carousel.Image`) движется
          медленнее, `Carousel.OverlayPanel` и `Carousel.Overlay` — быстрее. Работает при drag, стрелках и
          autoplay. Коэффициент можно задать числом на каждом слое.
        </p>
        <Carousel
          activeIndex={activeIndex}
          onActiveIndexChange={setActiveIndex}
          animation={CarouselAnimation.PARALLAX}
          loop
          showCaption={false}
          navigation={CarouselNavigation.BOTH}
          swipeEnabled
          aria-label="Parallax галерея"
        >
          {carouselDemoSlides.map((slide) => (
            <Carousel.Slide key={slide.slideKey} slideId={slide.slideKey} slideLabel={slide.slideLabel}>
              <Carousel.Image src={slide.imageSrc} alt={slide.imageAlt} loading="eager" />
              <Carousel.OverlayPanel placement={CarouselSlideOverlayPanelPlacement.BOTTOM}>
                {(slideInfo) => (
                  <>
                    <Carousel.OverlayPanel.Title>{slide.caption ?? slide.slideLabel}</Carousel.OverlayPanel.Title>
                    <Carousel.OverlayPanel.Text>
                      Parallax · слайд {slideInfo.slideIndex + 1}
                    </Carousel.OverlayPanel.Text>
                  </>
                )}
              </Carousel.OverlayPanel>
              <Carousel.Overlay
                placement={CarouselSlideOverlayPlacement.TOP}
                align={CarouselSlideOverlayAlign.END}
              >
                <Button style={overlayButtonStyle} size={Size.SM}>
                  Действие
                </Button>
              </Carousel.Overlay>
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
    );
  },
};

/** Случайный порядок отображения слайдов */
export const Random: Story = {
  render: () => {
    const [displayOrderLabel, setDisplayOrderLabel] = useState('');
    const { activeIndex, setActiveIndex } = useCarouselStoryActiveIndex();
    const slideNodes = useCarouselDemoSlides(carouselDemoSlides);

    return (
      <div style={carouselStoriesStyles.page}>
        <p style={carouselStoriesStyles.hint}>
          `random={true}` перемешивает слайды при монтировании. Порядок id в колбэке отражает текущую
          последовательность отображения. Перезагрузите сторис, чтобы увидеть новый порядок.
        </p>
        <p style={carouselStoriesStyles.statusPanel}>
          Активный слайд: {activeIndex + 1} / {carouselDemoSlides.length}
          {displayOrderLabel ? ` · Порядок id: ${displayOrderLabel}` : null}
        </p>
        <Carousel
          activeIndex={activeIndex}
          onActiveIndexChange={setActiveIndex}
          random
          loop
          navigation={CarouselNavigation.BOTH}
          onSlideChange={({ current, previous, next }) => {
            const orderParts = [previous?.slideId, current.slideId, next?.slideId].filter(Boolean);
            setDisplayOrderLabel(orderParts.join(' → '));
          }}
          aria-label="Галерея со случайным порядком"
        >
          {slideNodes}
        </Carousel>
      </div>
    );
  },
};

/** Горизонтальный сдвиг ленты */
export const SlideAnimation: Story = {
  render: () => (
    <CarouselStoryDemo
      animation={CarouselAnimation.SLIDE}
      navigation={CarouselNavigation.BOTH}
      aria-label="Карусель со сдвигом слайдов"
    />
  ),
};

/** Плавное затухание между слайдами */
export const FadeAnimation: Story = {
  render: () => (
    <div style={carouselStoriesStyles.page}>
      <p style={carouselStoriesStyles.hint}>
        Анимация fade: слайды накладываются друг на друга с плавным изменением прозрачности.
      </p>
      <CarouselStoryDemo
        animation={CarouselAnimation.FADE}
        navigation={CarouselNavigation.BOTH}
        aria-label="Карусель с затуханием"
      />
    </div>
  ),
};

/** Масштаб с затуханием */
export const ScaleAnimation: Story = {
  render: () => (
    <div style={carouselStoriesStyles.page}>
      <p style={carouselStoriesStyles.hint}>
        Анимация scale: активный слайд слегка увеличивается, неактивные уменьшаются и затухают.
      </p>
      <CarouselStoryDemo
        animation={CarouselAnimation.SCALE}
        navigation={CarouselNavigation.BOTH}
        aria-label="Карусель с масштабированием"
      />
    </div>
  ),
};

/** 3D coverflow */
export const CoverflowAnimation: Story = {
  render: () => (
    <div style={{ ...carouselStoriesStyles.page, maxWidth: 720, margin: '0 auto' }}>
      <p style={carouselStoriesStyles.hint}>
        `animation={CarouselAnimation.COVERFLOW}` — перспектива, поворот и глубина боковых слайдов.
      </p>
      <CarouselStoryDemo
        animation={CarouselAnimation.COVERFLOW}
        navigation={CarouselNavigation.BOTH}
        loop
        aria-label="Coverflow-карусель"
      />
    </div>
  ),
};

/** 3D flip */
export const FlipAnimation: Story = {
  render: () => (
    <div style={{ ...carouselStoriesStyles.page, maxWidth: 720, margin: '0 auto' }}>
      <p style={carouselStoriesStyles.hint}>
        `animation={CarouselAnimation.FLIP}` — карточки лежат в одной точке и переворачиваются по оси Y при смене слайда.
      </p>
      <CarouselStoryDemo
        animation={CarouselAnimation.FLIP}
        navigation={CarouselNavigation.BOTH}
        loop
        aria-label="Flip-карусель"
      />
    </div>
  ),
};

/** Stack — текущий слайд уезжает в сторону и уходит под следующий */
export const StackAnimation: Story = {
  render: () => (
    <div style={{ ...carouselStoriesStyles.page, maxWidth: 720, margin: '0 auto' }}>
      <p style={carouselStoriesStyles.hint}>
        `animation={CarouselAnimation.STACK}` — как в hero-слайдере на bruno-pizza.ru: активный слайд
        уезжает влево и уходит под следующий, который уже лежит в стопке сзади.
      </p>
      <CarouselStoryDemo
        animation={CarouselAnimation.STACK}
        navigation={CarouselNavigation.BOTH}
        loop
        autoplay
        showAutoplayProgress
        aria-label="Stack-карусель"
      />
    </div>
  ),
};

/** Сравнение всех типов анимации */
export const AnimationComparison: Story = {
  render: () => (
    <div style={carouselStoriesStyles.page}>
      <p style={carouselStoriesStyles.hint}>
        Три режима анимации на одном наборе изображений. Переключайте слайды стрелками или точками.
      </p>
      <div style={carouselStoriesStyles.grid}>
        {(
          [
            { title: 'Slide', animation: CarouselAnimation.SLIDE },
            { title: 'Fade', animation: CarouselAnimation.FADE },
            { title: 'Scale', animation: CarouselAnimation.SCALE },
            { title: 'Parallax', animation: CarouselAnimation.PARALLAX },
          ] as const
        ).map(({ title, animation }) => (
          <div key={animation}>
            <p style={carouselStoriesStyles.gridItemTitle}>{title}</p>
            <CarouselStoryDemo
              animation={animation}
              navigation={CarouselNavigation.DOTS}
              aria-label={`Карусель ${title}`}
            />
          </div>
        ))}
      </div>
    </div>
  ),
};

/** Только стрелки */
export const ArrowsOnly: Story = {
  render: () => (
    <CarouselStoryDemo
      navigation={CarouselNavigation.ARROWS}
      aria-label="Карусель со стрелками"
    />
  ),
};

/** Только точки-индикаторы */
export const DotsOnly: Story = {
  render: () => (
    <CarouselStoryDemo
      navigation={CarouselNavigation.DOTS}
      aria-label="Карусель с точками"
    />
  ),
};

/** Точки поверх нижней части слайда */
export const DotsInner: Story = {
  render: () => (
    <CarouselStoryDemo
      dotsPosition={CarouselDotsPosition.INNER}
      navigation={CarouselNavigation.DOTS}
      aria-label="Карусель с точками поверх изображения"
    />
  ),
};

/** Точки под областью слайдов */
export const DotsOuter: Story = {
  render: () => (
    <div style={carouselStoriesStyles.page}>
      <p style={carouselStoriesStyles.hint}>
        Режим outer: индикаторы располагаются под изображением и не перекрывают контент.
      </p>
      <CarouselStoryDemo
        dotsPosition={CarouselDotsPosition.OUTER}
        navigation={CarouselNavigation.BOTH}
        aria-label="Карусель с точками снизу"
      />
    </div>
  ),
};

/** Без видимых контролов — свайп и клавиатура через фокус на region */
export const NoControls: Story = {
  render: () => (
    <div style={carouselStoriesStyles.page}>
      <p style={carouselStoriesStyles.hint}>
        navigation=&quot;none&quot;: переключение свайпом на touch-устройствах или drag мышью.
      </p>
      <CarouselStoryDemo
        navigation={CarouselNavigation.NONE}
        aria-label="Карусель без контролов"
      />
    </div>
  ),
};

/** Зацикливание слайдов */
export const Loop: Story = {
  render: () => (
    <CarouselStoryDemo loop aria-label="Зацикленная галерея" showActiveIndex />
  ),
};

/** Автопрокрутка с паузой при наведении и кнопкой play/pause */
export const Autoplay: Story = {
  render: () => (
    <div style={carouselStoriesStyles.page}>
      <p style={carouselStoriesStyles.hint}>
        Автопрокрутка каждые 4 с. Пауза при наведении и фокусе. Кнопка ⏸/▶ управляет
        воспроизведением.
      </p>
      <CarouselStoryDemo
        autoplay
        autoplayInterval={4000}
        loop
        navigation={CarouselNavigation.BOTH}
        aria-label="Автоматическая галерея"
      />
    </div>
  ),
};

/** Контролируемый режим: activeIndex снаружи */
export const Controlled: Story = {
  render: () => {
    const ControlledCarouselDemo = () => {
      const [activeIndex, setActiveIndex] = useState(0);

      return (
        <div style={carouselStoriesStyles.section}>
          <p style={carouselStoriesStyles.statusPanel}>
            Внешнее управление: слайд {activeIndex + 1} из {carouselDemoSlides.length}
          </p>
          <div style={carouselStoriesStyles.hint}>
            <button type="button" onClick={() => setActiveIndex(0)}>
              Первый
            </button>{' '}
            <button type="button" onClick={() => setActiveIndex(2)}>
              Третий
            </button>{' '}
            <button
              type="button"
              onClick={() =>
                setActiveIndex((previousIndex) =>
                  previousIndex >= carouselDemoSlides.length - 1 ? 0 : previousIndex + 1,
                )
              }
            >
              Следующий
            </button>
          </div>
          <Carousel
            activeIndex={activeIndex}
            onActiveIndexChange={setActiveIndex}
            loop
            navigation={CarouselNavigation.BOTH}
            aria-label="Контролируемая галерея"
          >
            {renderCarouselDemoSlides(carouselDemoSlides)}
          </Carousel>
        </div>
      );
    };

    return <ControlledCarouselDemo />;
  },
};

/** Разные размеры контролов */
export const Sizes: Story = {
  render: () => (
    <div style={carouselStoriesStyles.page}>
      {(Object.values(Size) as Size[]).map((size) => (
        <div key={size} style={carouselStoriesStyles.section}>
          <p style={carouselStoriesStyles.gridItemTitle}>size={size}</p>
          <CarouselStoryDemo size={size} aria-label={`Галерея размера ${size}`} />
        </div>
      ))}
    </div>
  ),
};

/** Узкий контейнер: свайп и точки */
export const NarrowContainer: Story = {
  render: () => (
    <div style={carouselStoriesStyles.narrowShell}>
      <CarouselStoryDemo
        navigation={CarouselNavigation.BOTH}
        dotsPosition={CarouselDotsPosition.OUTER}
        aria-label="Узкая галерея"
      />
    </div>
  ),
};

/** Только полоса миниатюр под основной областью */
export const Thumbnails: Story = {
  render: () => (
    <div style={carouselStoriesStyles.page}>
      <p style={carouselStoriesStyles.hint}>
        Миниатюры автоматически берутся из `Carousel.Image` в каждом слайде. Активная миниатюра
        прокручивается в видимую область.
      </p>
      <CarouselStoryDemo
        navigation={CarouselNavigation.THUMBNAILS}
        thumbnails
        aria-label="Галерея с миниатюрами"
        showActiveIndex
      />
    </div>
  ),
};

/** Миниатюры вместе со стрелками и точками */
export const ThumbnailsWithNavigation: Story = {
  render: () => (
    <CarouselStoryDemo
      navigation={CarouselNavigation.BOTH}
      dotsPosition={CarouselDotsPosition.OUTER}
      thumbnails
      loop
      aria-label="Галерея с полной навигацией"
    />
  ),
};

/** Glass-тема: полупрозрачные контролы и полоса миниатюр */
export const GlassVibrancy: Story = {
  name: 'Glass Vibrancy',
  render: () => (
    <StyledThemeProvider theme={glassLightTheme}>
      <div
        style={{
          ...carouselStoriesStyles.glassDemoCanvas,
          background: glassLightTheme.surfaceMaterial?.pageBackground,
          backgroundAttachment: 'fixed',
        }}
      >
        <CarouselStoryDemo
          navigation={CarouselNavigation.BOTH}
          dotsPosition={CarouselDotsPosition.INNER}
          thumbnails
          loop
          animation={CarouselAnimation.FADE}
          aria-label="Glass-галерея"
        />
      </div>
    </StyledThemeProvider>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Демо glassLightTheme. Переключите глобальную тему Storybook на glassLight / glassDark — контролы, подпись и миниатюры получают полупрозрачность и backdrop-filter.',
      },
    },
  },
};

/** Навигация по slideId (controlled) */
export const SlideIdControl: Story = {
  render: () => {
    const [activeSlideId, setActiveSlideId] = useState('forest');
    const slideNodes = useCarouselDemoSlides(carouselDemoSlides);

    return (
      <div style={carouselStoriesStyles.page}>
        <p style={carouselStoriesStyles.hint}>
          Управление через `activeSlideId` / `onActiveSlideIdChange`. Клавиатура: ArrowLeft/Right,
          Home/End на карусели.
        </p>
        <p style={carouselStoriesStyles.statusPanel}>activeSlideId: {activeSlideId}</p>
        <Carousel
          activeSlideId={activeSlideId}
          onActiveSlideIdChange={(nextSlideId) => {
            if (nextSlideId) {
              setActiveSlideId(nextSlideId);
            }
          }}
          loop
          navigation={CarouselNavigation.BOTH}
          aria-label="Карусель с управлением по slideId"
        >
          {slideNodes}
        </Carousel>
      </div>
    );
  },
};

/** Детерминированный shuffle через randomSeed */
export const RandomSeed: Story = {
  render: () => {
    const slideNodes = useCarouselDemoSlides(carouselDemoSlides);

    return (
      <div style={carouselStoriesStyles.page}>
        <p style={carouselStoriesStyles.hint}>
          `randomSeed={42}` даёт одинаковый порядок слайдов при каждом монтировании.
        </p>
        <Carousel
          random
          randomSeed={42}
          loop
          navigation={CarouselNavigation.BOTH}
          aria-label="Карусель с фиксированным seed"
        >
          {slideNodes}
        </Carousel>
      </div>
    );
  },
};

/** Полоска прогресса с автопрокруткой */
export const ProgressBar: Story = {
  render: () => {
    const slideNodes = useCarouselDemoSlides(carouselDemoSlides);

    return (
      <div style={carouselStoriesStyles.page}>
        <p style={carouselStoriesStyles.hint}>
          `showProgressBar` — сегменты по слайдам; при autoplay текущий сегмент заполняется за
          интервал автопрокрутки.
        </p>
        <Carousel
          loop
          autoplay
          showProgressBar
          navigation={CarouselNavigation.NONE}
          aria-label="Карусель с полоской прогресса"
        >
          {slideNodes}
        </Carousel>
      </div>
    );
  },
};

/** Прогресс autoplay с обратным отсчётом */
export const AutoplayProgress: Story = {
  render: () => {
    const slideNodes = useCarouselDemoSlides(carouselDemoSlides);

    return (
      <div style={carouselStoriesStyles.page}>
        <p style={carouselStoriesStyles.hint}>
          `showAutoplayProgress` — линейная полоска и обратный отсчёт до следующего слайда. Пауза при
          наведении (`pauseOnHover`).
        </p>
        <Carousel
          loop
          autoplay
          showAutoplayProgress
          showAutoplayCountdown
          navigation={CarouselNavigation.BOTH}
          aria-label="Карусель с прогрессом autoplay"
        >
          {slideNodes}
        </Carousel>
      </div>
    );
  },
};

/** Вертикальная карусель */
export const Vertical: Story = {
  render: () => (
    <div style={{ ...carouselStoriesStyles.page, maxWidth: 360, margin: '0 auto' }}>
      <p style={carouselStoriesStyles.hint}>
        `orientation={CarouselOrientation.VERTICAL}` — свайп вверх/вниз, стрелки CaretUp/CaretDown,
        клавиатура ArrowUp/ArrowDown.
      </p>
      <CarouselStoryDemo
        orientation={CarouselOrientation.VERTICAL}
        navigation={CarouselNavigation.BOTH}
        loop
        height={420}
        aria-label="Вертикальная галерея"
      />
    </div>
  ),
};
