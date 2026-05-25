import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { fn } from '@storybook/test';
import { SliderInput } from './SliderInput';
import { Form } from '../../Form';
import { Icon } from '../../Icon/Icon';
import { Size, IconSize } from '../../../../types/sizes';
import { InputVariant } from '../../../../types/ui';
import { DOC_SLIDER_INPUT } from '@/components/ui/storyDocs/uiKitDocs';
import { sliderInputStoriesStyles } from './SliderInput.stories.styles';
import { describeStory } from '@/handlers/storybookStoryDocs';

const formatRub = (value: number) =>
  `${new Intl.NumberFormat('ru-RU').format(value)} ₽`;

const formatPercent = (value: number) => `${value} %`;

/** Все значения Size для демо трека и бегунка */
const SLIDER_INPUT_SIZES = [Size.XS, Size.SM, Size.MD, Size.LG, Size.XL] as const;

const meta: Meta<typeof SliderInput> = {
  title: 'UI Kit/Inputs/SliderInput',
  component: SliderInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_SLIDER_INPUT,
      },
      wrapUsageInForm: true,
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story, context) => (
      <Form formId={`story-slider-input-${context.id}`}>
        <Story />
      </Form>
    ),
  ],
  args: {
    onChange: fn(),
    min: 0,
    max: 100,
    step: 1,
    fullWidth: true,
  },
  argTypes: {
    range: {
      description:
        '`false` — одно число и один бегунок; `true` — пара «от / до», два поля и два бегунка (как `DateInput` с `range`).',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    value: {
      description:
        'Контролируемое значение: `number` без `range` или `readonly [number, number]` при `range={true}`.',
      control: false,
    },
    defaultValue: {
      description: 'Начальное значение в неконтролируемом режиме (число или пара).',
      control: false,
    },
    onChange: {
      description:
        '`(value: number) => void` или `(value: readonly [number, number]) => void` в зависимости от `range`.',
      control: false,
    },
    min: { table: { type: { summary: 'number' }, defaultValue: { summary: '0' } } },
    max: { table: { type: { summary: 'number' }, defaultValue: { summary: '100' } } },
    step: { table: { type: { summary: 'number' }, defaultValue: { summary: '1' } } },
    size: {
      control: { type: 'select' },
      options: Object.values(Size),
      description: 'Размер оболочки Input и полей числа.',
    },
    sliderSize: {
      control: { type: 'select' },
      options: Object.values(Size),
      description: 'Размер встроенного трека/бегунка; по умолчанию совпадает с `size`.',
    },
    variant: {
      control: { type: 'select' },
      options: [InputVariant.DEFAULT, InputVariant.CLEAR],
      description: 'Вариант оболочки поля (`default` | `clear`).',
    },
    showNumberField: {
      description:
        'Показывать поле числа. В `range` — два поля «от» и «до»; при `false` можно включить `showValueLabel`.',
    },
    showValueLabel: {
      description: 'Подпись значения под бегунком (актуально при `showNumberField={false}`).',
    },
    showScaleLabels: {
      description: 'Подписи `min` и `max` под нижней границей рамки поля.',
    },
    numberPlaceholder: { description: 'Плейсхолдер одиночного числового поля.' },
    numberFromPlaceholder: { description: 'Плейсхолдер поля «от» в range.' },
    numberToPlaceholder: { description: 'Плейсхолдер поля «до» в range.' },
    rangeFromLabel: { description: 'Подпись перед полем «от» (по умолчанию «От:»).' },
    rangeToLabel: { description: 'Подпись перед полем «до» (по умолчанию «До:»).' },
    formatValue: {
      control: false,
      description: 'Форматирование числа в полях и подписях бегунков.',
    },
    formatMinLabel: { control: false },
    formatMaxLabel: { control: false },
    trackRailHeightPx: {
      description: 'Толщина серой линии трека (px); иначе из `sliderSize` / `size`.',
    },
    trackActiveHeightPx: {
      description: 'Толщина активного сегмента (px).',
    },
    name: { description: 'Скрытое поле формы (одиночный режим).' },
    nameFrom: { description: 'Скрытое поле «от» в range.' },
    nameTo: { description: 'Скрытое поле «до» в range.' },
    displayClearIcon: {
      description: 'Кнопка очистки: сброс к `min` (одиночный) или `[min, min]` (range).',
    },
    status: {
      control: { type: 'select' },
      options: ['error', 'success', 'warning'],
      description: 'Акцент трека и обводки без текста ошибки/успеха.',
    },
    error: { description: 'Текст ошибки; приоритет над `status` для цвета трека.' },
    success: { description: 'Успешное состояние (без текста ошибки).' },
    skeleton: { description: 'Шиммер вместо интерактивной части; `aria-busy` на контейнере.' },
    isLoading: { description: 'Спиннер в правой части рамки (как у Input).' },
    readOnly: { description: 'Только чтение: слайдер и поля не редактируются.' },
    disabled: { description: 'Отключено: нет фокуса и ввода.' },
  },
};

export default meta;

type Story = StoryObj<typeof SliderInput>;

// ——— Одиночный режим (range=false) ———

export const Default: Story = {
  ...describeStory(
    'Базовый одиночный режим: одно числовое поле, встроенный слайдер у нижней кромки, подписи min/max под рамкой, кнопка очистки. Значение по умолчанию 42, шаг 1, диапазон 0–100.',
  ),
  args: {
    label: 'Громкость',
    helperText: 'Перетащите бегунок или введите значение в поле',
    defaultValue: 42,
    displayClearIcon: true,
    numberPlaceholder: '0–100',
  },
};

export const SingleControlled: Story = {
  name: 'Одиночный: контролируемый',
  ...describeStory(
    'Контролируемый режим: `value` и `onChange` с `useState`. Полезно для фильтров и форм, где значение синхронизируется с другими контролами. В helperText выводится текущее значение.',
    `const [level, setLevel] = useState(35);

<SliderInput
  label="Уровень"
  value={level}
  onChange={setLevel}
  min={0}
  max={100}
  step={5}
  fullWidth
  helperText={\`Текущее значение: \${level}\`}
/>`,
  ),
  render: function SliderInputSingleControlledStory() {
    const [level, setLevel] = useState(35);
    return (
      <SliderInput
        label="Уровень"
        value={level}
        onChange={setLevel}
        min={0}
        max={100}
        step={5}
        fullWidth
        helperText={`Текущее значение: ${level}`}
      />
    );
  },
};

export const SingleDecimalStep: Story = {
  name: 'Одиночный: дробный шаг',
  ...describeStory(
    'Шаг 0.1 между 0 и 10: проверка округления при вводе с клавиатуры и перетаскивании. Включена подпись под бегунком (`showValueLabel`), если скрыть поле числа.',
  ),
  args: {
    label: 'Процент с шагом 0.1',
    min: 0,
    max: 10,
    step: 0.1,
    defaultValue: 3.7,
    showValueLabel: true,
  },
};

export const SingleAtMinimum: Story = {
  name: 'Одиночный: у минимума',
  ...describeStory(
    'Значение на нижней границе (`defaultValue: min`). Проверка, что активная линия трека начинается от левого края без зазора (embedded single).',
  ),
  args: {
    label: 'Минимум',
    defaultValue: 0,
    helperText: 'Бегунок у левого края, заливка от начала трека',
  },
};

export const SingleAtMaximum: Story = {
  name: 'Одиночный: у максимума',
  ...describeStory(
    'Значение на верхней границе шкалы. Активный сегмент должен доходить до правого бегунка.',
  ),
  args: {
    label: 'Максимум',
    defaultValue: 100,
    helperText: 'Бегунок у правого края',
  },
};

export const SingleWithoutNumberField: Story = {
  name: 'Одиночный: без поля числа',
  ...describeStory(
    '`showNumberField={false}` — только слайдер и опционально подпись значения. Удобно для компактных фильтров, когда число не нужно вводить с клавиатуры.',
  ),
  args: {
    label: 'Только слайдер',
    showNumberField: false,
    min: 10,
    max: 90,
    defaultValue: 50,
  },
};

export const SingleValueLabelOnly: Story = {
  name: 'Одиночный: подпись под бегунком',
  ...describeStory(
    'Без поля числа, но с `showValueLabel` — значение отображается под бегунком. Формат можно задать через `formatValue`.',
  ),
  args: {
    label: 'Заполненность',
    showNumberField: false,
    showValueLabel: true,
    formatValue: formatPercent,
    defaultValue: 65,
    min: 0,
    max: 100,
  },
};

export const SingleWithoutScaleLabels: Story = {
  name: 'Одиночный: без подписей шкалы',
  ...describeStory(
    '`showScaleLabels={false}` скрывает min/max под рамкой. Границы по-прежнему задаются пропами `min` и `max`.',
  ),
  args: {
    label: 'Без шкалы снизу',
    showScaleLabels: false,
    defaultValue: 30,
  },
};

export const SingleClearVariant: Story = {
  name: 'Одиночный: variant clear',
  ...describeStory(
    'Оболочка `InputVariant.CLEAR` — прозрачный фон поля, как у текстового Input в режиме clear.',
  ),
  args: {
    label: 'Прозрачное поле',
    variant: InputVariant.CLEAR,
    defaultValue: 55,
  },
};

export const SingleWithClearIcon: Story = {
  name: 'Одиночный: кнопка очистки',
  ...describeStory(
    '`displayClearIcon` — сброс к `min` (здесь 0). Работает вместе с контролируемым и неконтролируемым режимом.',
  ),
  args: {
    label: 'С очисткой',
    defaultValue: 80,
    displayClearIcon: true,
    helperText: 'Крестик сбрасывает значение к min',
  },
};

export const SingleCustomFormat: Story = {
  name: 'Одиночный: формат валюты',
  ...describeStory(
    '`formatValue`, `formatMinLabel`, `formatMaxLabel` — отображение в рублях в поле, под бегунком и в подписях шкалы. Широкий диапазон и крупный шаг.',
  ),
  args: {
    label: 'Бюджет',
    min: 0,
    max: 2_000_000,
    step: 50_000,
    defaultValue: 750_000,
    formatValue: formatRub,
    formatMinLabel: () => '0 ₽',
    formatMaxLabel: () => '2 млн ₽',
    numberPlaceholder: 'Сумма',
  },
};

export const SingleNegativeRange: Story = {
  name: 'Одиночный: отрицательный min',
  ...describeStory(
    'Шкала с отрицательным минимумом (−50 … 50): проверка позиционирования бегунка и заливки при значениях ниже нуля.',
  ),
  args: {
    label: 'Температура, °C',
    min: -50,
    max: 50,
    step: 1,
    defaultValue: -12,
    helperText: 'Диапазон с отрицательными значениями',
  },
};

export const SingleNarrowContainer: Story = {
  name: 'Одиночный: узкий контейнер',
  ...describeStory(
    '`fullWidth={false}` в контейнере ~320px — поле не растягивается на всю ширину viewport, только на родителя.',
  ),
  decorators: [
    (Story) => (
      <StoryLayoutWrapper style={sliderInputStoriesStyles.maxWidth360}>
        <Story />
      </StoryLayoutWrapper>
    ),
  ],
  args: {
    label: 'Не на всю страницу',
    fullWidth: false,
    defaultValue: 40,
  },
};

export const SingleAllSizes: Story = {
  name: 'Одиночный: все размеры',
  ...describeStory(
    'Сетка всех `size` (XS → XL): высота рамки Input, поля числа и диаметр бегунка. Для каждого размера одно и то же значение 42 на шкале 0–100.',
  ),
  render: () => (
    <StoryLayoutWrapper style={sliderInputStoriesStyles.columnGap24MaxWidth480}>
      {SLIDER_INPUT_SIZES.map((size) => (
        <SliderInput
          key={size}
          size={size}
          label={`size = ${size}`}
          min={0}
          max={100}
          defaultValue={42}
          fullWidth
        />
      ))}
    </StoryLayoutWrapper>
  ),
};

export const SingleSliderSizeOverride: Story = {
  name: 'Одиночный: sliderSize ≠ size',
  ...describeStory(
    'Поле `size={Size.SM}`, трек `sliderSize={Size.XL}` — компактная рамка с крупным бегунком. Удобно, когда нужен плотный layout, но крупная зона захвата слайдера.',
  ),
  args: {
    label: 'Малое поле, крупный трек',
    size: Size.SM,
    sliderSize: Size.XL,
    defaultValue: 60,
  },
};

export const SingleWithError: Story = {
  name: 'Одиночный: ошибка',
  ...describeStory(
    'Проп `error` — красный акцент трека и текст ошибки под полем (как у Input). Приоритет над `status`.',
  ),
  args: {
    label: 'Лимит',
    defaultValue: 120,
    max: 100,
    error: 'Значение не может быть больше 100',
  },
};

export const SingleWithSuccess: Story = {
  name: 'Одиночный: успех',
  ...describeStory(
    '`success` без текста ошибки — зелёный акцент встроенного слайдера и обводки.',
  ),
  args: {
    label: 'Цель достигнута',
    defaultValue: 100,
    success: true,
    helperText: 'Значение в допустимом диапазоне',
  },
};

export const SingleWithWarningStatus: Story = {
  name: 'Одиночный: status warning',
  ...describeStory(
    'Явный `status="warning"` без `error` — жёлтый/оранжевый акцент трека (как у Slider).',
  ),
  args: {
    label: 'Близко к лимиту',
    defaultValue: 92,
    status: 'warning',
    helperText: 'Рекомендуется снизить значение',
  },
};

export const SingleDisabled: Story = {
  name: 'Одиночный: disabled',
  ...describeStory(
    '`disabled` — нет взаимодействия со слайдером и полем, визуальное затемнение.',
  ),
  args: {
    label: 'Недоступно',
    defaultValue: 50,
    disabled: true,
  },
};

export const SingleReadOnly: Story = {
  name: 'Одиночный: readOnly',
  ...describeStory(
    '`readOnly` — значение видно, редактирование и перетаскивание отключены.',
  ),
  args: {
    label: 'Только просмотр',
    defaultValue: 33,
    readOnly: true,
    helperText: 'Значение задано системой',
  },
};

export const SingleRequired: Story = {
  name: 'Одиночный: required',
  ...describeStory(
    '`required` — маркер обязательности у метки и участие в нативной валидации формы.',
  ),
  args: {
    label: 'Обязательный параметр',
    required: true,
    defaultValue: 10,
  },
};

export const SingleSkeleton: Story = {
  name: 'Одиночный: skeleton',
  ...describeStory(
    '`skeleton` — плейсхолдер загрузки вместо интерактивной части; контейнер с `aria-busy`.',
  ),
  args: {
    label: 'Загрузка данных',
    skeleton: true,
  },
};

export const SingleLoading: Story = {
  name: 'Одиночный: isLoading',
  ...describeStory(
    '`isLoading` — спиннер в правой части рамки Input (поле и слайдер остаются на месте).',
  ),
  args: {
    label: 'Сохранение',
    defaultValue: 45,
    isLoading: true,
  },
};

export const SingleWithIcons: Story = {
  name: 'Одиночный: иконки',
  ...describeStory(
    'Слоты `leftIcon` и `rightIcon` в оболочке Input — как у обычного поля ввода.',
  ),
  args: {
    label: 'Скидка',
    defaultValue: 15,
    min: 0,
    max: 100,
    leftIcon: <Icon name="IconPlainerPercent" size={IconSize.MD} />,
    rightIcon: <Icon name="IconPlainerDollar" size={IconSize.MD} />,
  },
};

export const SingleLabelsAndExtraText: Story = {
  name: 'Одиночный: additionalLabel и extraText',
  ...describeStory(
    '`additionalLabel` — вторичная подпись у метки; `extraText` — дополнительная строка внизу блока поля.',
  ),
  args: {
    label: 'Мощность',
    additionalLabel: 'кВт',
    extraText: 'Расчёт по тарифу «День»',
    defaultValue: 7,
    min: 0,
    max: 20,
    step: 0.5,
  },
};

// ——— Диапазон (range=true) ———

export const RangeDefault: Story = {
  name: 'Диапазон: по умолчанию',
  ...describeStory(
    'Режим `range={true}`: два числовых поля («От:» / «До:»), два бегунка, разделитель «—» по центру, общий трек. Значение — пара `[от, до]`.',
  ),
  args: {
    label: 'Диапазон цены',
    range: true,
    min: 0,
    max: 100_000,
    step: 1000,
    defaultValue: [10_000, 60_000],
    helperText: 'Два бегунка и поля «от» / «до»',
    displayClearIcon: true,
  },
};

export const RangeControlled: Story = {
  name: 'Диапазон: контролируемый',
  ...describeStory(
    'Контролируемая пара `value={[number, number]}` и `onChange` с обновлением состояния. HelperText показывает текущие границы.',
    `const [bounds, setBounds] = useState<readonly [number, number]>([20, 80]);

<SliderInput
  label="Уровень (диапазон)"
  range
  value={bounds}
  onChange={setBounds}
  min={0}
  max={100}
  step={5}
  fullWidth
  helperText={\`От \${bounds[0]} до \${bounds[1]}\`}
/>`,
  ),
  render: function SliderInputRangeControlledStory() {
    const [bounds, setBounds] = useState<readonly [number, number]>([20, 80]);
    return (
      <SliderInput
        label="Уровень (диапазон)"
        range
        value={bounds}
        onChange={setBounds}
        min={0}
        max={100}
        step={5}
        fullWidth
        helperText={`От ${bounds[0]} до ${bounds[1]}`}
      />
    );
  },
};

export const RangeAtMinimum: Story = {
  name: 'Диапазон: оба у минимума',
  ...describeStory(
    '`defaultValue: [0, 0]` при min=0 — оба бегунка у левого края. Проверка выравнивания бегунков и сегмента трека без «разрыва» активной линии.',
  ),
  args: {
    label: 'Оба ползунка у минимума',
    range: true,
    defaultValue: [0, 0],
    helperText: 'Сегмент между бегунками схлопнут',
  },
};

export const RangeAtMaximum: Story = {
  name: 'Диапазон: оба у максимума',
  ...describeStory(
    'Пара `[max, max]` — оба бегунка у правого края шкалы.',
  ),
  args: {
    label: 'Оба у максимума',
    range: true,
    defaultValue: [100, 100],
    helperText: 'Верхняя граница диапазона',
  },
};

export const RangeFullSpan: Story = {
  name: 'Диапазон: вся шкала',
  ...describeStory(
    'Выбран весь отрезок от min до max — активная полоса на всём треке между бегунками.',
  ),
  args: {
    label: 'Весь диапазон',
    range: true,
    defaultValue: [0, 100],
    helperText: 'От минимума до максимума',
  },
};

export const RangeWithoutNumberField: Story = {
  name: 'Диапазон: без полей числа',
  ...describeStory(
    'Только два бегунка и при необходимости `showValueLabel` под каждым. Компактный фильтр «от–до» без клавиатурного ввода.',
  ),
  args: {
    label: 'Только бегунки',
    range: true,
    showNumberField: false,
    showValueLabel: true,
    defaultValue: [25, 75],
    formatValue: formatPercent,
  },
};

export const RangeCustomLabels: Story = {
  name: 'Диапазон: свои подписи полей',
  ...describeStory(
    '`rangeFromLabel` и `rangeToLabel` заменяют стандартные «От:» / «До:». Плейсхолдеры — через `numberFromPlaceholder` / `numberToPlaceholder`.',
  ),
  args: {
    label: 'Срок',
    range: true,
    rangeFromLabel: 'С:',
    rangeToLabel: 'По:',
    numberFromPlaceholder: 'Начало',
    numberToPlaceholder: 'Конец',
    min: 1,
    max: 31,
    defaultValue: [5, 20],
    nameFrom: 'periodFrom',
    nameTo: 'periodTo',
  },
};

export const RangeDecimalStep: Story = {
  name: 'Диапазон: дробный шаг',
  ...describeStory(
    'Шаг 0.5 на узком интервале 0–10 — синхронизация пары при вводе дробей в оба поля.',
  ),
  args: {
    label: 'Рейтинг',
    range: true,
    min: 0,
    max: 10,
    step: 0.5,
    defaultValue: [2.5, 8],
  },
};

export const RangeWithClearIcon: Story = {
  name: 'Диапазон: очистка',
  ...describeStory(
    'Очистка сбрасывает пару к `[min, min]` (оба бегунка к левому краю).',
  ),
  args: {
    label: 'Фильтр',
    range: true,
    defaultValue: [30, 70],
    displayClearIcon: true,
    helperText: 'Крестик → [min, min]',
  },
};

export const RangeCustomFormat: Story = {
  name: 'Диапазон: формат валюты',
  ...describeStory(
    'Форматирование рублей в полях и подписях шкалы при широком числовом диапазоне.',
  ),
  args: {
    label: 'Цена',
    range: true,
    min: 0,
    max: 500_000,
    step: 5_000,
    defaultValue: [50_000, 300_000],
    formatValue: formatRub,
    formatMinLabel: () => '0 ₽',
    formatMaxLabel: () => '500 тыс. ₽',
  },
};

export const RangeWithError: Story = {
  name: 'Диапазон: ошибка',
  ...describeStory(
    'Текст `error` при некорректной паре (например, «от» больше «до» после ручного ввода).',
  ),
  args: {
    label: 'Интервал',
    range: true,
    defaultValue: [80, 20],
    error: 'Значение «от» не может быть больше «до»',
  },
};

export const RangeWithSuccess: Story = {
  name: 'Диапазон: успех',
  ...describeStory(
    'Успешное состояние для выбранного корректного интервала.',
  ),
  args: {
    label: 'Период',
    range: true,
    defaultValue: [10, 90],
    success: true,
    helperText: 'Диапазон сохранён',
  },
};

export const RangeWithWarningStatus: Story = {
  name: 'Диапазон: status warning',
  ...describeStory(
    'Предупреждение через `status="warning"` без текста ошибки.',
  ),
  args: {
    label: 'Широкий интервал',
    range: true,
    defaultValue: [5, 95],
    status: 'warning',
    helperText: 'Слишком широкий фильтр',
  },
};

export const RangeDisabled: Story = {
  name: 'Диапазон: disabled',
  ...describeStory(
    'Отключённый range: оба бегунка и поля недоступны.',
  ),
  args: {
    label: 'Фильтр недоступен',
    range: true,
    defaultValue: [40, 60],
    disabled: true,
  },
};

export const RangeReadOnly: Story = {
  name: 'Диапазон: readOnly',
  ...describeStory(
    'Только просмотр выбранного интервала.',
  ),
  args: {
    label: 'Зафиксированный период',
    range: true,
    defaultValue: [15, 45],
    readOnly: true,
  },
};

export const RangeRequired: Story = {
  name: 'Диапазон: required',
  ...describeStory(
    'Обязательный выбор диапазона в форме.',
  ),
  args: {
    label: 'Интервал дат (числа)',
    range: true,
    required: true,
    defaultValue: [1, 31],
    min: 1,
    max: 31,
  },
};

export const RangeSkeleton: Story = {
  name: 'Диапазон: skeleton',
  ...describeStory(
    'Скелетон в режиме range — шиммер вместо пары полей и трека.',
  ),
  args: {
    label: 'Загрузка фильтра',
    range: true,
    skeleton: true,
  },
};

// ——— Сравнение режимов ———

export const OverviewSingleVsRange: Story = {
  name: 'Обзор: одиночный и диапазон',
  ...describeStory(
    'Два поля подряд: один `range={false}`, второй `range={true}` с одинаковой шкалой 0–100. Сравнение layout: одно поле числа vs сетка «от / — / до».',
  ),
  render: () => (
    <StoryLayoutWrapper style={sliderInputStoriesStyles.columnGap24MaxWidth480}>
      <SliderInput
        label="Одиночное значение"
        defaultValue={42}
        helperText="Один бегунок и одно поле"
        fullWidth
      />
      <SliderInput
        label="Диапазон"
        range
        defaultValue={[20, 80]}
        helperText="Два бегунка и два поля"
        fullWidth
      />
    </StoryLayoutWrapper>
  ),
};

export const OverviewStatesMatrix: Story = {
  name: 'Обзор: состояния',
  ...describeStory(
    'Матрица визуальных состояний для одиночного режима: default, error, success, warning (`status`), disabled, readOnly, skeleton.',
  ),
  render: () => (
    <StoryLayoutWrapper style={sliderInputStoriesStyles.columnGap24MaxWidth480}>
      <SliderInput label="Default" defaultValue={50} fullWidth />
      <SliderInput label="Error" defaultValue={110} max={100} error="Слишком большое" fullWidth />
      <SliderInput label="Success" defaultValue={100} success fullWidth />
      <SliderInput label="Warning" defaultValue={88} status="warning" fullWidth />
      <SliderInput label="Disabled" defaultValue={50} disabled fullWidth />
      <SliderInput label="Read only" defaultValue={50} readOnly fullWidth />
      <SliderInput label="Skeleton" skeleton fullWidth />
    </StoryLayoutWrapper>
  ),
};

/** Обёртка для storybook-демо с ограничением ширины */
function StoryLayoutWrapper({
  style,
  children,
}: {
  style: React.CSSProperties;
  children: React.ReactNode;
}) {
  return <div style={style}>{children}</div>;
}
