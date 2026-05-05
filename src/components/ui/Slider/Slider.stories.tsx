import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Slider } from './Slider';
import { RangeSlider } from './RangeSlider';
import { Form } from '../Form';
import { Size } from '../../../types/sizes';
import {
  SliderStoriesCompact,
  SliderStoriesMedium,
  SliderStoriesNarrow,
  SliderStoriesRoot,
  SliderStoriesSection,
  SliderStoriesSectionTitle,
  SliderStoriesSizeLabel,
  SliderStoriesSizeRow,
  SliderStoriesStack,
} from './Slider.stories.style';
import { DOC_SLIDER } from '@/components/ui/storyDocs/uiKitDocs';

const formatRub = (n: number) => `${new Intl.NumberFormat('ru-RU').format(n)} ₽`;

const formatPercent = (n: number) => `${n} %`;

/** Все значения `Size`: диаметр бегунка 12 / 16 / 20 / 24 / 28 px (XS → XL) */
const SLIDER_SIZES = [Size.XS, Size.SM, Size.MD, Size.LG, Size.XL] as const;

const meta: Meta<typeof Slider> = {
  title: 'UI Kit/Inputs/Slider',
  component: Slider,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_SLIDER,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: 'Контролируемое значение бегунка',
      table: { type: { summary: 'number' } },
    },
    defaultValue: {
      description: 'Начальное значение в неконтролируемом режиме',
      table: { type: { summary: 'number' } },
    },
    onChange: {
      description: 'Новое значение после перетаскивания, клика по треку или клавиатуры',
      table: {
        type: { summary: '(value: number) => void' },
      },
    },
    min: {
      table: { type: { summary: 'number' } },
    },
    max: {
      table: { type: { summary: 'number' } },
    },
    step: {
      table: { type: { summary: 'number' } },
    },
    disabled: {
      table: { type: { summary: 'boolean' } },
    },
    fullWidth: {
      table: { type: { summary: 'boolean' } },
    },
    formatValue: {
      control: false,
      table: {
        type: { summary: '(value: number) => string' },
      },
    },
    formatMinLabel: {
      control: false,
      table: {
        type: { summary: '(min: number) => string' },
      },
    },
    formatMaxLabel: {
      control: false,
      table: {
        type: { summary: '(max: number) => string' },
      },
    },
    showValueLabel: {
      table: { type: { summary: 'boolean' } },
    },
    size: {
      control: { type: 'select' },
      options: Object.values(Size),
      table: {
        type: { summary: 'Size: XS, SM, MD, LG, XL' },
      },
    },
    name: {
      table: { type: { summary: 'string (name у скрытого input, для форм)' } },
    },
    label: {
      table: { type: { summary: 'ReactNode' } },
    },
    additionalLabel: { table: { type: { summary: 'string' } } },
    error: { table: { type: { summary: 'string' } } },
    success: { table: { type: { summary: 'boolean' } } },
    helperText: { table: { type: { summary: 'string' } } },
    extraText: { table: { type: { summary: 'string' } } },
    required: { table: { type: { summary: 'boolean' } } },
    trackRailHeightPx: {
      description: 'Толщина серой линии (px); при отсутствии — из `size` (`getSliderTrackMetrics`)',
      table: { type: { summary: 'number' } },
    },
    trackActiveHeightPx: {
      description: 'Толщина синего сегмента (px); при отсутствии — из `size`',
      table: { type: { summary: 'number' } },
    },
    skeleton: {
      description: 'Плейсхолдер загрузки вместо трека (`aria-busy` при обёртке с полем)',
      table: { type: { summary: 'boolean' } },
    },
    status: {
      description: 'Акцент обводки и заливки: error | success | warning',
      control: { type: 'select' },
      options: ['error', 'success', 'warning'],
      table: { type: { summary: "'error' | 'success' | 'warning'" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  render: () => {
    const [sliderValue, setSliderValue] = useState(1_000_000);
    return (
      <SliderStoriesCompact>
        <Slider
          fullWidth
          min={0}
          max={2_000_000}
          step={50_000}
          value={sliderValue}
          onChange={setSliderValue}
          formatValue={formatRub}
          formatMinLabel={() => '0'}
          formatMaxLabel={() => '2 млн ₽'}
        />
      </SliderStoriesCompact>
    );
  },
};

export const Range: Story = {
  render: () => {
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1_000_000]);
    return (
      <SliderStoriesMedium>
        <RangeSlider
          fullWidth
          min={0}
          max={2_000_000}
          step={50_000}
          value={priceRange}
          onChange={(nextPriceRange) => setPriceRange([nextPriceRange[0], nextPriceRange[1]])}
          formatValue={formatRub}
          formatMinLabel={() => '0'}
          formatMaxLabel={() => '2 млн ₽'}
        />
      </SliderStoriesMedium>
    );
  },
};

export const RangeWithInputs: Story = {
  render: () => {
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 2_000_000]);
    return (
      <Form formId="story-slider-range" onSubmit={(submitEvent) => submitEvent.preventDefault()}>
        <SliderStoriesMedium>
          <RangeSlider
            fullWidth
            min={0}
            max={2_000_000}
            step={10_000}
            value={priceRange}
            onChange={(nextPriceRange) => setPriceRange([nextPriceRange[0], nextPriceRange[1]])}
            formatValue={formatRub}
            formatMinLabel={() => '0'}
            formatMaxLabel={() => '2 млн ₽'}
            showManualInputs
            nameFrom="priceFrom"
            nameTo="priceTo"
          />
        </SliderStoriesMedium>
      </Form>
    );
  },
};

/**
 * Одиночный слайдер: все варианты `size` (бегунок 12–28 px по шкале XS → XL).
 */
export const SingleAllSizes: Story = {
  name: 'Одиночный: размеры',
  render: () => (
    <SliderStoriesRoot>
      <SliderStoriesStack>
        {SLIDER_SIZES.map((size) => (
          <SliderStoriesSizeRow key={size}>
            <SliderStoriesSizeLabel>{`size = ${size}`}</SliderStoriesSizeLabel>
            <Slider
              size={size}
              fullWidth
              min={0}
              max={100}
              step={1}
              defaultValue={42}
              formatValue={formatPercent}
              formatMinLabel={() => '0 %'}
              formatMaxLabel={() => '100 %'}
            />
          </SliderStoriesSizeRow>
        ))}
      </SliderStoriesStack>
    </SliderStoriesRoot>
  ),
};

/**
 * Диапазон: все варианты `size`.
 */
export const RangeAllSizes: Story = {
  name: 'Диапазон: размеры',
  render: () => (
    <SliderStoriesRoot>
      <SliderStoriesStack>
        {SLIDER_SIZES.map((size) => (
          <SliderStoriesSizeRow key={size}>
            <SliderStoriesSizeLabel>{`size = ${size}`}</SliderStoriesSizeLabel>
            <RangeSlider
              size={size}
              fullWidth
              min={0}
              max={100}
              step={1}
              defaultValue={[25, 75]}
              formatValue={formatPercent}
              formatMinLabel={() => '0 %'}
              formatMaxLabel={() => '100 %'}
            />
          </SliderStoriesSizeRow>
        ))}
      </SliderStoriesStack>
    </SliderStoriesRoot>
  ),
};

/**
 * Отключённые одиночный и диапазон (typical width).
 */
export const Disabled: Story = {
  name: 'Отключено',
  render: () => (
    <SliderStoriesRoot>
      <SliderStoriesStack>
        <SliderStoriesSection>
          <SliderStoriesSectionTitle>Одиночный</SliderStoriesSectionTitle>
          <Slider
            disabled
            fullWidth
            min={0}
            max={2_000_000}
            step={50_000}
            value={500_000}
            formatValue={formatRub}
            formatMinLabel={() => '0'}
            formatMaxLabel={() => '2 млн ₽'}
          />
        </SliderStoriesSection>
        <SliderStoriesSection>
          <SliderStoriesSectionTitle>Диапазон</SliderStoriesSectionTitle>
          <RangeSlider
            disabled
            fullWidth
            min={0}
            max={2_000_000}
            step={50_000}
            value={[200_000, 1_200_000]}
            formatValue={formatRub}
            formatMinLabel={() => '0'}
            formatMaxLabel={() => '2 млн ₽'}
          />
        </SliderStoriesSection>
      </SliderStoriesStack>
    </SliderStoriesRoot>
  ),
};

/**
 * Без подписи значения под бегунком(ами).
 */
export const WithoutValueLabels: Story = {
  name: 'Без подписи значения',
  render: () => (
    <SliderStoriesRoot>
      <SliderStoriesStack>
        <SliderStoriesSection>
          <SliderStoriesSectionTitle>Одиночный (size LG)</SliderStoriesSectionTitle>
          <Slider
            size={Size.LG}
            showValueLabel={false}
            fullWidth
            min={0}
            max={100}
            defaultValue={33}
            formatMinLabel={() => 'A'}
            formatMaxLabel={() => 'Z'}
          />
        </SliderStoriesSection>
        <SliderStoriesSection>
          <SliderStoriesSectionTitle>Диапазон (size SM)</SliderStoriesSectionTitle>
          <RangeSlider
            size={Size.SM}
            showValueLabel={false}
            fullWidth
            min={0}
            max={100}
            defaultValue={[10, 90]}
            formatMinLabel={() => 'min'}
            formatMaxLabel={() => 'max'}
          />
        </SliderStoriesSection>
      </SliderStoriesStack>
    </SliderStoriesRoot>
  ),
};

/**
 * Мелкий целочисленный шаг (0–10) — краткая шкала.
 */
export const SmallIntegerScale: Story = {
  name: 'Короткая шкала 0–10',
  render: () => {
    const [single, setSingle] = useState(7);
    const [range, setRange] = useState<[number, number]>([2, 8]);
    return (
      <SliderStoriesRoot>
        <SliderStoriesStack>
          <SliderStoriesSection>
            <SliderStoriesSectionTitle>Одиночный</SliderStoriesSectionTitle>
            <Slider
              size={Size.MD}
              fullWidth
              min={0}
              max={10}
              step={1}
              value={single}
              onChange={setSingle}
              formatValue={(n) => String(n)}
              formatMinLabel={() => '0'}
              formatMaxLabel={() => '10'}
            />
          </SliderStoriesSection>
          <SliderStoriesSection>
            <SliderStoriesSectionTitle>Диапазон</SliderStoriesSectionTitle>
            <RangeSlider
              size={Size.MD}
              fullWidth
              min={0}
              max={10}
              step={1}
              value={range}
            onChange={(nextRangeValue) => setRange([nextRangeValue[0], nextRangeValue[1]])}
              formatValue={(n) => String(n)}
              formatMinLabel={() => '0'}
              formatMaxLabel={() => '10'}
            />
          </SliderStoriesSection>
        </SliderStoriesStack>
      </SliderStoriesRoot>
    );
  },
};

/**
 * Узкий контейнер: проверка вёрстки и бегунков у краёв.
 */
export const NarrowContainer: Story = {
  name: 'Узкая колонка',
  render: () => (
    <SliderStoriesNarrow>
      <SliderStoriesStack>
        <Slider
          size={Size.SM}
          fullWidth
          min={0}
          max={100}
          defaultValue={0}
          formatValue={formatPercent}
          formatMinLabel={() => '0'}
          formatMaxLabel={() => '100'}
        />
        <RangeSlider
          size={Size.SM}
          fullWidth
          min={0}
          max={100}
          defaultValue={[0, 100]}
          formatValue={formatPercent}
          formatMinLabel={() => '0'}
          formatMaxLabel={() => '100'}
        />
      </SliderStoriesStack>
    </SliderStoriesNarrow>
  ),
};

/**
 * Поля «От / До» с увеличенным бегунком.
 */
export const RangeWithInputsLarge: Story = {
  name: 'Диапазон с полями (LG)',
  render: () => {
    const [priceRange, setPriceRange] = useState<[number, number]>([300_000, 1_700_000]);
    return (
      <Form formId="story-slider-range-lg" onSubmit={(submitEvent) => submitEvent.preventDefault()}>
        <SliderStoriesMedium>
          <RangeSlider
            size={Size.LG}
            fullWidth
            min={0}
            max={2_000_000}
            step={25_000}
            value={priceRange}
            onChange={(nextPriceRange) => setPriceRange([nextPriceRange[0], nextPriceRange[1]])}
            formatValue={formatRub}
            formatMinLabel={() => '0'}
            formatMaxLabel={() => '2 млн ₽'}
            showManualInputs
            nameFrom="priceFromLg"
            nameTo="priceToLg"
          />
        </SliderStoriesMedium>
      </Form>
    );
  },
};

/**
 * Явные `trackRailHeightPx` / `trackActiveHeightPx` при том же `size` (MD по умолчанию).
 */
/**
 * Лейбл, доп. подпись, helper, extra — как у полей ввода.
 */
export const WithFieldLabels: Story = {
  name: 'С лейблом и текстами',
  render: () => {
    const [value, setValue] = useState(35);
    const [range, setRange] = useState<[number, number]>([10, 90]);
    return (
      <SliderStoriesRoot>
        <SliderStoriesStack>
          <Slider
            fullWidth
            min={0}
            max={100}
            value={value}
            onChange={setValue}
            required
            label="Бюджет, %"
            additionalLabel="Доля от максимума в категории"
            helperText="Перетащите бегунок или используйте клавиатуру"
            extraText="Доп. пояснение внизу"
            formatValue={formatPercent}
            formatMinLabel={() => '0 %'}
            formatMaxLabel={() => '100 %'}
          />
          <RangeSlider
            fullWidth
            min={0}
            max={100}
            value={range}
            onChange={(next) => setRange([next[0], next[1]])}
            label="Диапазон"
            additionalLabel="Нижняя и верхняя граница"
            helperText="Подсказка скрывается, если заданы error или success"
            formatValue={formatPercent}
            formatMinLabel={() => '0 %'}
            formatMaxLabel={() => '100 %'}
          />
        </SliderStoriesStack>
      </SliderStoriesRoot>
    );
  },
};

/**
 * Плейсхолдер загрузки; при лейбле — `aria-busy` на контейнере поля.
 */
export const SkeletonLoading: Story = {
  name: 'Скелетон',
  render: () => (
    <SliderStoriesRoot>
      <SliderStoriesStack>
        <SliderStoriesSection>
          <SliderStoriesSectionTitle>Одиночный, без лейбла</SliderStoriesSectionTitle>
          <Slider skeleton fullWidth min={0} max={100} formatMinLabel={() => ''} formatMaxLabel={() => ''} />
        </SliderStoriesSection>
        <SliderStoriesSection>
          <SliderStoriesSectionTitle>С лейблом и подсказкой</SliderStoriesSectionTitle>
          <Slider
            skeleton
            label="Диапазон цен"
            helperText="Загружаем доступные значения…"
            fullWidth
            formatMinLabel={() => '0'}
            formatMaxLabel={() => '100'}
          />
        </SliderStoriesSection>
        <SliderStoriesSection>
          <SliderStoriesSectionTitle>Диапазон</SliderStoriesSectionTitle>
          <RangeSlider skeleton fullWidth min={0} max={100} formatMinLabel={() => ''} formatMaxLabel={() => ''} />
        </SliderStoriesSection>
      </SliderStoriesStack>
    </SliderStoriesRoot>
  ),
};

/**
 * Ошибка / успех / предупреждение на треке и обводке (`status` и тексты как у формы).
 */
export const StatusVariants: Story = {
  name: 'Состояния (validation)',
  render: () => (
    <SliderStoriesRoot>
      <SliderStoriesStack>
        <SliderStoriesSection>
          <SliderStoriesSectionTitle>Ошибка (`error` + текст)</SliderStoriesSectionTitle>
          <Slider
            fullWidth
            min={0}
            max={100}
            value={10}
            error="Значение вне допустимого диапазона"
            helperText="Эта подсказка скрыта при ошибке"
            formatValue={formatPercent}
            formatMinLabel={() => '0 %'}
            formatMaxLabel={() => '100 %'}
          />
        </SliderStoriesSection>
        <SliderStoriesSection>
          <SliderStoriesSectionTitle>Успех (`success`)</SliderStoriesSectionTitle>
          <Slider
            fullWidth
            min={0}
            max={100}
            value={88}
            success
            formatValue={formatPercent}
            formatMinLabel={() => '0 %'}
            formatMaxLabel={() => '100 %'}
          />
        </SliderStoriesSection>
        <SliderStoriesSection>
          <SliderStoriesSectionTitle>Предупреждение (status = warning)</SliderStoriesSectionTitle>
          <Slider
            fullWidth
            min={0}
            max={100}
            value={50}
            status="warning"
            helperText="Рекомендуем скорректировать значение"
            formatValue={formatPercent}
            formatMinLabel={() => '0 %'}
            formatMaxLabel={() => '100 %'}
          />
        </SliderStoriesSection>
        <SliderStoriesSection>
          <SliderStoriesSectionTitle>Диапазон с ошибкой</SliderStoriesSectionTitle>
          <RangeSlider
            fullWidth
            min={0}
            max={100}
            value={[5, 95]}
            error="Сузьте диапазон для фильтра"
            formatValue={formatPercent}
            formatMinLabel={() => '0 %'}
            formatMaxLabel={() => '100 %'}
          />
        </SliderStoriesSection>
      </SliderStoriesStack>
    </SliderStoriesRoot>
  ),
};

export const CustomTrackThickness: Story = {
  name: 'Кастомная толщина трека',
  render: () => (
    <SliderStoriesRoot>
      <SliderStoriesStack>
        <SliderStoriesSection>
          <SliderStoriesSectionTitle>Дефолт (MD, линии из `size`)</SliderStoriesSectionTitle>
          <Slider
            fullWidth
            min={0}
            max={100}
            defaultValue={40}
            formatValue={formatPercent}
            formatMinLabel={() => '0'}
            formatMaxLabel={() => '100'}
          />
        </SliderStoriesSection>
        <SliderStoriesSection>
          <SliderStoriesSectionTitle>Толстый трек: rail 8px, active 12px</SliderStoriesSectionTitle>
          <Slider
            fullWidth
            min={0}
            max={100}
            defaultValue={40}
            trackRailHeightPx={8}
            trackActiveHeightPx={12}
            formatValue={formatPercent}
            formatMinLabel={() => '0'}
            formatMaxLabel={() => '100'}
          />
        </SliderStoriesSection>
        <SliderStoriesSection>
          <SliderStoriesSectionTitle>Диапазон: тонкая рельса (2 / 5 px)</SliderStoriesSectionTitle>
          <RangeSlider
            fullWidth
            min={0}
            max={100}
            defaultValue={[30, 70]}
            trackRailHeightPx={2}
            trackActiveHeightPx={5}
            formatValue={formatPercent}
            formatMinLabel={() => '0'}
            formatMaxLabel={() => '100'}
          />
        </SliderStoriesSection>
      </SliderStoriesStack>
    </SliderStoriesRoot>
  ),
};
