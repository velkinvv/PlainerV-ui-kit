import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { Carousel } from './Carousel';
import { CarouselAnimation, CarouselOrientation, CarouselSlideOverlayPanelPlacement } from '../../../types/ui';

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider>{component}</ThemeProvider>);

describe('Carousel', () => {
  it('переключает слайд по ArrowRight на карусели', () => {
    renderWithTheme(
      <Carousel aria-label="Тестовая карусель" defaultActiveIndex={0}>
        <Carousel.Slide slideId="first" slideLabel="Первый">
          <Carousel.Image src="https://example.com/1.jpg" alt="Первый" />
        </Carousel.Slide>
        <Carousel.Slide slideId="second" slideLabel="Второй">
          <Carousel.Image src="https://example.com/2.jpg" alt="Второй" />
        </Carousel.Slide>
      </Carousel>,
    );

    const carouselRegion = screen.getByRole('region', { name: 'Тестовая карусель' });
    fireEvent.keyDown(carouselRegion, { key: 'ArrowRight' });

    expect(screen.getByRole('group', { name: 'Второй' })).toHaveAttribute('aria-hidden', 'false');
  });

  it('вызывает onActiveSlideIdChange при controlled slideId', () => {
    const handleActiveSlideIdChange = jest.fn();

    renderWithTheme(
      <Carousel
        aria-label="Карусель по slideId"
        activeSlideId="first"
        onActiveSlideIdChange={handleActiveSlideIdChange}
      >
        <Carousel.Slide slideId="first">
          <Carousel.Image src="https://example.com/1.jpg" alt="Первый" />
        </Carousel.Slide>
        <Carousel.Slide slideId="second">
          <Carousel.Image src="https://example.com/2.jpg" alt="Второй" />
        </Carousel.Slide>
      </Carousel>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Следующий слайд' }));

    expect(handleActiveSlideIdChange).toHaveBeenCalledWith('second');
  });

  it('рендерит figure для слайда', () => {
    const { container } = renderWithTheme(
      <Carousel aria-label="Семантика">
        <Carousel.Slide>
          <Carousel.Image src="https://example.com/1.jpg" alt="Слайд" />
          <Carousel.Caption>Подпись</Carousel.Caption>
        </Carousel.Slide>
      </Carousel>,
    );

    expect(container.querySelector('figure.ui-carousel-slide')).toBeInTheDocument();
    expect(container.querySelector('figcaption.ui-carousel-caption')).toBeInTheDocument();
  });

  it('поддерживает fade-анимацию без ошибок', () => {
    renderWithTheme(
      <Carousel aria-label="Fade" animation={CarouselAnimation.FADE}>
        <Carousel.Slide>
          <Carousel.Image src="https://example.com/1.jpg" alt="Первый" />
        </Carousel.Slide>
        <Carousel.Slide>
          <Carousel.Image src="https://example.com/2.jpg" alt="Второй" />
        </Carousel.Slide>
      </Carousel>,
    );

    expect(screen.getByRole('region', { name: 'Fade' })).toBeInTheDocument();
  });

  it('переключает вертикальную карусель по ArrowDown', () => {
    renderWithTheme(
      <Carousel
        aria-label="Вертикальная карусель"
        orientation={CarouselOrientation.VERTICAL}
        defaultActiveIndex={0}
      >
        <Carousel.Slide slideLabel="Первый">
          <Carousel.Image src="https://example.com/1.jpg" alt="Первый" />
        </Carousel.Slide>
        <Carousel.Slide slideLabel="Второй">
          <Carousel.Image src="https://example.com/2.jpg" alt="Второй" />
        </Carousel.Slide>
      </Carousel>,
    );

    const carouselRegion = screen.getByRole('region', { name: 'Вертикальная карусель' });
    fireEvent.keyDown(carouselRegion, { key: 'ArrowDown' });

    expect(screen.getByRole('group', { name: 'Второй' })).toHaveAttribute('aria-hidden', 'false');
  });

  it('рендерит полоску прогресса при showProgressBar', () => {
    renderWithTheme(
      <Carousel aria-label="Прогресс" showProgressBar>
        <Carousel.Slide>
          <Carousel.Image src="https://example.com/1.jpg" alt="Первый" />
        </Carousel.Slide>
        <Carousel.Slide>
          <Carousel.Image src="https://example.com/2.jpg" alt="Второй" />
        </Carousel.Slide>
      </Carousel>,
    );

    expect(screen.getByRole('progressbar', { name: 'Прогресс просмотра слайдов' })).toBeInTheDocument();
  });

  it('рендерит контентную панель OverlayPanel поверх слайда', () => {
    const { container } = renderWithTheme(
      <Carousel aria-label="Overlay panel" showCaption={false}>
        <Carousel.Slide slideId="hero">
          <Carousel.Image src="https://example.com/1.jpg" alt="Герой" />
          <Carousel.OverlayPanel placement={CarouselSlideOverlayPanelPlacement.BOTTOM}>
            <Carousel.OverlayPanel.Title>Заголовок</Carousel.OverlayPanel.Title>
            <Carousel.OverlayPanel.Text>Описание слайда</Carousel.OverlayPanel.Text>
          </Carousel.OverlayPanel>
        </Carousel.Slide>
      </Carousel>,
    );

    expect(container.querySelector('[data-carousel-overlay-panel]')).toBeInTheDocument();
    expect(screen.getByText('Заголовок')).toBeInTheDocument();
    expect(screen.getByText('Описание слайда')).toBeInTheDocument();
  });

  it('поддерживает stack-анимацию без ошибок', () => {
    renderWithTheme(
      <Carousel aria-label="Stack" animation={CarouselAnimation.STACK}>
        <Carousel.Slide>
          <Carousel.Image src="https://example.com/1.jpg" alt="Первый" />
        </Carousel.Slide>
        <Carousel.Slide>
          <Carousel.Image src="https://example.com/2.jpg" alt="Второй" />
        </Carousel.Slide>
      </Carousel>,
    );

    expect(screen.getByRole('region', { name: 'Stack' })).toBeInTheDocument();
  });

  it('рендерит карусель из пропа items', () => {
    renderWithTheme(
      <Carousel
        aria-label="Items carousel"
        items={[
          {
            slideId: 'hero',
            imageSrc: 'https://example.com/1.jpg',
            imageAlt: 'Герой',
            caption: 'Заголовок',
          },
          {
            slideId: 'second',
            imageSrc: 'https://example.com/2.jpg',
            imageAlt: 'Второй',
          },
        ]}
      />,
    );

    expect(screen.getByRole('region', { name: 'Items carousel' })).toBeInTheDocument();
    expect(screen.getByText('Заголовок')).toBeInTheDocument();
  });

  it('рендерит parallax-слои при animation=parallax', () => {
    const { container } = renderWithTheme(
      <Carousel aria-label="Parallax" animation={CarouselAnimation.PARALLAX} showCaption={false}>
        <Carousel.Slide>
          <Carousel.Image src="https://example.com/1.jpg" alt="Первый" />
          <Carousel.OverlayPanel>
            <Carousel.OverlayPanel.Title>Заголовок</Carousel.OverlayPanel.Title>
          </Carousel.OverlayPanel>
        </Carousel.Slide>
        <Carousel.Slide>
          <Carousel.Image src="https://example.com/2.jpg" alt="Второй" />
        </Carousel.Slide>
      </Carousel>,
    );

    expect(container.querySelector('[data-carousel-parallax-layer]')).toBeInTheDocument();
  });

  it('рендерит прогресс autoplay с обратным отсчётом', () => {
    renderWithTheme(
      <Carousel aria-label="Autoplay progress" autoplay showAutoplayProgress>
        <Carousel.Slide>
          <Carousel.Image src="https://example.com/1.jpg" alt="Первый" />
        </Carousel.Slide>
        <Carousel.Slide>
          <Carousel.Image src="https://example.com/2.jpg" alt="Второй" />
        </Carousel.Slide>
      </Carousel>,
    );

    expect(
      screen.getByRole('progressbar', { name: 'Прогресс автопрокрутки до следующего слайда' }),
    ).toBeInTheDocument();
  });
});
