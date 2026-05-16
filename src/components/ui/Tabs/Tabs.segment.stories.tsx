import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  TabsDirection,
  TabsVariant,
  type TabsSegmentOption,
  type TabsItemDefinition,
} from '@/types/ui';
import { Tabs } from './Tabs';
import { Icon } from '../Icon/Icon';
import { Typography } from '../Typography';
import { DOC_TABS } from '@/components/ui/storyDocs/uiKitDocs';
import {
  TabsSegmentStoryCaption,
  TabsSegmentStoryFullWidthWrap,
  TabsSegmentStoryHorizontalWrap,
  TabsSegmentStoryInlineLabelWrap,
  TabsSegmentStoryMatrix,
  TabsSegmentStoryMatrixBlock,
  TabsSegmentStorySectionTitle,
  TabsSegmentStoryVerticalWrap,
} from './Tabs.segment.stories.styles';

/** Типичный список из трёх разделов (нейтральные подписи). */
const threeSegmentLabels: TabsSegmentOption[] = [
  { value: 'overview', label: 'Обзор' },
  { value: 'details', label: 'Детали' },
  { value: 'attachments', label: 'Вложения' },
];

/** Те же три сегмента для пропа **items** (**TabsItemDefinition**). */
const threeSegmentItems: TabsItemDefinition[] = threeSegmentLabels;

/**
 * Рендер набора **Tabs.Item** из массива данных (без отдельного списка — трек внутри **Tabs**).
 * @param optionRows — строки в порядке отображения (**TabsSegmentOption**)
 */
function tabsSegmentListFromOptions(optionRows: TabsSegmentOption[]): React.ReactElement {
  return (
    <>
      {optionRows.map((row) => (
        <Tabs.Item key={row.value} {...row} />
      ))}
    </>
  );
}

const meta: Meta<typeof Tabs> = {
  title: 'UI Kit/Navigation/Tabs/Segments',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: DOC_TABS,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description:
        'Дочерние **Tabs.Item** / **TabItem**; трек рендерится внутри **Tabs**. Если задан непустой **items**, для списка вкладок не используется.',
      control: false,
    },
    items: {
      description:
        'Массив **TabsItemDefinition** — вкладки из данных; при непустом значении строятся вместо **children**.',
      control: false,
    },
    value: {
      description:
        'Выбранное **value** (контролируемый режим). Не смешивайте с **defaultValue** / **defaultActiveTab**.',
      control: { type: 'text' },
    },
    defaultValue: {
      description:
        'Начальное **value** (неконтролируемый режим). Если не задано — активен первый сегмент по порядку в DOM.',
      control: { type: 'text' },
    },
    defaultActiveTab: {
      description: 'Алиас **defaultValue** (то же назначение).',
      control: { type: 'text' },
    },
    onChange: {
      description: '(activeTab: string) => void — при каждом выборе сегмента.',
      action: 'change',
    },
    direction: {
      control: { type: 'select' },
      options: [TabsDirection.HORIZONTAL, TabsDirection.VERTICAL],
      description: 'Ось списка: **horizontal** (по умолчанию) или **vertical**.',
    },
    variant: {
      control: { type: 'select' },
      options: [TabsVariant.PILL, TabsVariant.MINIMAL, TabsVariant.LINE, TabsVariant.UNDERLINE],
      description:
        '**pill**, **minimal**, **line**, **underline**; если не задан — **resolveTabsVariant** (горизонтально **pill**, вертикально **minimal**).',
    },
    filledSegmentTriggers: {
      control: { type: 'boolean' },
      description:
        'Заливка сегментов для **minimal** / **line** / **underline** — см. корневую документацию **Tabs**.',
    },
    ariaLabel: {
      description: '**aria-label** группы (**role="group"** на корне **Tabs**).',
      control: { type: 'text' },
    },
    className: {
      description: 'Класс корня (**ui-tabs**).',
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

/** Песочница: три пункта без панелей контента. */
export const SegmentPlayground: Story = {
  name: 'Сегменты · Playground',
  args: {
    ariaLabel: 'Демо сегментов',
    defaultValue: 'attachments',
    direction: TabsDirection.HORIZONTAL,
    variant: TabsVariant.PILL,
  },
  render: (storyArguments) => (
    <TabsSegmentStoryHorizontalWrap>
      <Tabs {...storyArguments}>{tabsSegmentListFromOptions(threeSegmentLabels)}</Tabs>
    </TabsSegmentStoryHorizontalWrap>
  ),
};

/** Песочница: три пункта без панелей контента, список через проп **items**. */
export const SegmentPlaygroundItemsProp: Story = {
  name: 'Сегменты · Playground (items)',
  args: {
    ariaLabel: 'Демо сегментов',
    defaultValue: 'attachments',
    direction: TabsDirection.HORIZONTAL,
    variant: TabsVariant.PILL,
    items: threeSegmentItems,
  },
  render: (storyArguments) => (
    <TabsSegmentStoryHorizontalWrap>
      <Tabs {...storyArguments} />
    </TabsSegmentStoryHorizontalWrap>
  ),
};

/** Горизонтальный **pill** — фильтр / режим без панелей. */
export const SegmentHorizontalPill: Story = {
  name: 'Сегменты · Горизонтально pill',
  parameters: {
    docs: {
      description: {
        story: 'Явный пример горизонтального **pill**.',
      },
    },
  },
  render: (storyArguments) => (
    <TabsSegmentStoryHorizontalWrap>
      <Tabs
        {...storyArguments}
        defaultValue="attachments"
        variant={TabsVariant.PILL}
        direction={TabsDirection.HORIZONTAL}
        ariaLabel="Горизонтально, pill"
      >
        {tabsSegmentListFromOptions(threeSegmentLabels)}
      </Tabs>
    </TabsSegmentStoryHorizontalWrap>
  ),
};

/** Горизонтальный **minimal**: без серой базовой линии. */
export const SegmentHorizontalMinimal: Story = {
  name: 'Сегменты · Горизонтально minimal',
  parameters: {
    docs: {
      description: {
        story: 'Только подписи и полоска **primary** у активного пункта.',
      },
    },
  },
  render: (storyArguments) => (
    <TabsSegmentStoryHorizontalWrap>
      <Tabs
        {...storyArguments}
        defaultValue="details"
        direction={TabsDirection.HORIZONTAL}
        variant={TabsVariant.MINIMAL}
        ariaLabel="Горизонтально, minimal"
      >
        {tabsSegmentListFromOptions(threeSegmentLabels)}
      </Tabs>
    </TabsSegmentStoryHorizontalWrap>
  ),
};

/** Горизонтальный **line** с **filledSegmentTriggers** (классический «залитый» ряд). */
export const SegmentHorizontalLine: Story = {
  name: 'Сегменты · Горизонтально line (filled)',
  parameters: {
    docs: {
      description: {
        story: 'Вариант **line** с заливкой сегментов и фоном трека (**filledSegmentTriggers**).',
      },
    },
  },
  render: (storyArguments) => (
    <TabsSegmentStoryHorizontalWrap>
      <Tabs
        {...storyArguments}
        defaultValue="details"
        direction={TabsDirection.HORIZONTAL}
        variant={TabsVariant.LINE}
        filledSegmentTriggers
        ariaLabel="Горизонтально, line filled"
      >
        {tabsSegmentListFromOptions(threeSegmentLabels)}
      </Tabs>
    </TabsSegmentStoryHorizontalWrap>
  ),
};

/** Горизонтальный **underline**: серая линия только под триггерами. */
export const SegmentHorizontalUnderline: Story = {
  name: 'Сегменты · Горизонтально underline',
  parameters: {
    docs: {
      description: {
        story: '**TabsVariant.UNDERLINE**: общая серая полоска по ширине ряда вкладок.',
      },
    },
  },
  render: (storyArguments) => (
    <TabsSegmentStoryHorizontalWrap>
      <Tabs
        {...storyArguments}
        defaultValue="details"
        direction={TabsDirection.HORIZONTAL}
        variant={TabsVariant.UNDERLINE}
        ariaLabel="Горизонтально, underline"
      >
        {tabsSegmentListFromOptions(threeSegmentLabels)}
      </Tabs>
    </TabsSegmentStoryHorizontalWrap>
  ),
};

/** Вертикальный **pill**. */
export const SegmentVerticalPill: Story = {
  name: 'Сегменты · Вертикально pill',
  parameters: {
    docs: {
      description: {
        story: 'Узкая колонка сегментов в скруглённом треке.',
      },
    },
  },
  render: (storyArguments) => (
    <TabsSegmentStoryVerticalWrap>
      <Tabs
        {...storyArguments}
        defaultValue="overview"
        direction={TabsDirection.VERTICAL}
        variant={TabsVariant.PILL}
        ariaLabel="Вертикально, pill"
      >
        {tabsSegmentListFromOptions(threeSegmentLabels)}
      </Tabs>
    </TabsSegmentStoryVerticalWrap>
  ),
};

/** Вертикальный **minimal**. */
export const SegmentVerticalMinimal: Story = {
  name: 'Сегменты · Вертикально minimal',
  parameters: {
    docs: {
      description: {
        story: 'Компактная колонка без серой базовой линии.',
      },
    },
  },
  render: (storyArguments) => (
    <TabsSegmentStoryVerticalWrap>
      <Tabs
        {...storyArguments}
        defaultValue="overview"
        direction={TabsDirection.VERTICAL}
        variant={TabsVariant.MINIMAL}
        ariaLabel="Вертикально, minimal"
      >
        {tabsSegmentListFromOptions(threeSegmentLabels)}
      </Tabs>
    </TabsSegmentStoryVerticalWrap>
  ),
};

/** Вертикальный **line** с заливкой (**filledSegmentTriggers**). */
export const SegmentVerticalLine: Story = {
  name: 'Сегменты · Вертикально line (filled)',
  parameters: {
    docs: {
      description: {
        story: 'Классический вертикальный ряд с фоном трека и заливкой активного сегмента.',
      },
    },
  },
  render: (storyArguments) => (
    <TabsSegmentStoryVerticalWrap>
      <Tabs
        {...storyArguments}
        defaultValue="overview"
        direction={TabsDirection.VERTICAL}
        variant={TabsVariant.LINE}
        filledSegmentTriggers
        ariaLabel="Вертикально, line filled"
      >
        {tabsSegmentListFromOptions(threeSegmentLabels)}
      </Tabs>
    </TabsSegmentStoryVerticalWrap>
  ),
};

/** Вертикальный **underline**: серая линия по высоте ряда триггеров. */
export const SegmentVerticalUnderline: Story = {
  name: 'Сегменты · Вертикально underline',
  parameters: {
    docs: {
      description: {
        story:
          '**TabsVariant.UNDERLINE**: вертикальная серая базовая линия только у колонки вкладок.',
      },
    },
  },
  render: (storyArguments) => (
    <TabsSegmentStoryVerticalWrap>
      <Tabs
        {...storyArguments}
        defaultValue="overview"
        direction={TabsDirection.VERTICAL}
        variant={TabsVariant.UNDERLINE}
        ariaLabel="Вертикально, underline"
      >
        {tabsSegmentListFromOptions(threeSegmentLabels)}
      </Tabs>
    </TabsSegmentStoryVerticalWrap>
  ),
};

/** Матрица **TabsDirection** × **TabsVariant**. */
export const SegmentMatrixDirectionAndVariant: Story = {
  name: 'Сегменты · Матрица направление × вариант',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Четыре варианта направления × оформления: **pill**, **minimal**, **line** (серая линия на весь трек, без **filledSegmentTriggers**), **underline** (серая линия под триггерами). Для «залитых» сегментов см. отдельные сторис **SegmentHorizontalLine** / **SegmentVerticalLine**.',
      },
    },
  },
  render: () => (
    <TabsSegmentStoryMatrix>
      <TabsSegmentStoryMatrixBlock>
        <TabsSegmentStorySectionTitle>Горизонтально · pill</TabsSegmentStorySectionTitle>
        <TabsSegmentStoryHorizontalWrap>
          <Tabs
            ariaLabel="Матрица: горизонтально pill"
            defaultValue="attachments"
            direction={TabsDirection.HORIZONTAL}
            variant={TabsVariant.PILL}
          >
            {tabsSegmentListFromOptions(threeSegmentLabels)}
          </Tabs>
        </TabsSegmentStoryHorizontalWrap>
      </TabsSegmentStoryMatrixBlock>
      <TabsSegmentStoryMatrixBlock>
        <TabsSegmentStorySectionTitle>Горизонтально · minimal</TabsSegmentStorySectionTitle>
        <TabsSegmentStoryHorizontalWrap>
          <Tabs
            ariaLabel="Матрица: горизонтально minimal"
            defaultValue="details"
            direction={TabsDirection.HORIZONTAL}
            variant={TabsVariant.MINIMAL}
          >
            {tabsSegmentListFromOptions(threeSegmentLabels)}
          </Tabs>
        </TabsSegmentStoryHorizontalWrap>
      </TabsSegmentStoryMatrixBlock>
      <TabsSegmentStoryMatrixBlock>
        <TabsSegmentStorySectionTitle>
          Горизонтально · line (серая линия на весь трек)
        </TabsSegmentStorySectionTitle>
        <TabsSegmentStoryHorizontalWrap>
          <Tabs
            ariaLabel="Матрица: горизонтально line"
            defaultValue="details"
            direction={TabsDirection.HORIZONTAL}
            variant={TabsVariant.LINE}
          >
            {tabsSegmentListFromOptions(threeSegmentLabels)}
          </Tabs>
        </TabsSegmentStoryHorizontalWrap>
      </TabsSegmentStoryMatrixBlock>
      <TabsSegmentStoryMatrixBlock>
        <TabsSegmentStorySectionTitle>Горизонтально · underline</TabsSegmentStorySectionTitle>
        <TabsSegmentStoryHorizontalWrap>
          <Tabs
            ariaLabel="Матрица: горизонтально underline"
            defaultValue="overview"
            direction={TabsDirection.HORIZONTAL}
            variant={TabsVariant.UNDERLINE}
          >
            {tabsSegmentListFromOptions(threeSegmentLabels)}
          </Tabs>
        </TabsSegmentStoryHorizontalWrap>
      </TabsSegmentStoryMatrixBlock>
      <TabsSegmentStoryMatrixBlock>
        <TabsSegmentStorySectionTitle>Вертикально · pill</TabsSegmentStorySectionTitle>
        <TabsSegmentStoryVerticalWrap>
          <Tabs
            ariaLabel="Матрица: вертикально pill"
            defaultValue="overview"
            direction={TabsDirection.VERTICAL}
            variant={TabsVariant.PILL}
          >
            {tabsSegmentListFromOptions(threeSegmentLabels)}
          </Tabs>
        </TabsSegmentStoryVerticalWrap>
      </TabsSegmentStoryMatrixBlock>
      <TabsSegmentStoryMatrixBlock>
        <TabsSegmentStorySectionTitle>Вертикально · minimal</TabsSegmentStorySectionTitle>
        <TabsSegmentStoryVerticalWrap>
          <Tabs
            ariaLabel="Матрица: вертикально minimal"
            defaultValue="attachments"
            direction={TabsDirection.VERTICAL}
            variant={TabsVariant.MINIMAL}
          >
            {tabsSegmentListFromOptions(threeSegmentLabels)}
          </Tabs>
        </TabsSegmentStoryVerticalWrap>
      </TabsSegmentStoryMatrixBlock>
      <TabsSegmentStoryMatrixBlock>
        <TabsSegmentStorySectionTitle>
          Вертикально · line (серая линия на весь трек)
        </TabsSegmentStorySectionTitle>
        <TabsSegmentStoryVerticalWrap>
          <Tabs
            ariaLabel="Матрица: вертикально line"
            defaultValue="attachments"
            direction={TabsDirection.VERTICAL}
            variant={TabsVariant.LINE}
          >
            {tabsSegmentListFromOptions(threeSegmentLabels)}
          </Tabs>
        </TabsSegmentStoryVerticalWrap>
      </TabsSegmentStoryMatrixBlock>
      <TabsSegmentStoryMatrixBlock>
        <TabsSegmentStorySectionTitle>Вертикально · underline</TabsSegmentStorySectionTitle>
        <TabsSegmentStoryVerticalWrap>
          <Tabs
            ariaLabel="Матрица: вертикально underline"
            defaultValue="details"
            direction={TabsDirection.VERTICAL}
            variant={TabsVariant.UNDERLINE}
          >
            {tabsSegmentListFromOptions(threeSegmentLabels)}
          </Tabs>
        </TabsSegmentStoryVerticalWrap>
      </TabsSegmentStoryMatrixBlock>
    </TabsSegmentStoryMatrix>
  ),
};

/** Иконки, **badge**, недоступный сегмент. */
export const SegmentWithIconsBadgeDisabled: Story = {
  name: 'Сегменты · Иконки, бейдж, disabled',
  parameters: {
    docs: {
      description: {
        story: 'Комбинация **iconStart**, **badge** и **disabled**.',
      },
    },
  },
  render: () => (
    <TabsSegmentStoryHorizontalWrap>
      <Tabs ariaLabel="Режим отображения" defaultValue="grid" variant={TabsVariant.PILL}>
        <Tabs.Item value="list" label="Список" iconStart={<Icon name="IconExHome" size="sm" />} />
        <Tabs.Item
          value="grid"
          label="Плитка"
          iconStart={<Icon name="IconExUser" size="sm" />}
          badge="12"
        />
        <Tabs.Item
          value="map"
          label="Карта"
          iconStart={<Icon name="IconExSettings" size="sm" />}
          disabled
        />
      </Tabs>
    </TabsSegmentStoryHorizontalWrap>
  ),
};

/** **loading**, **skeleton** и **disabled** на сегментах. */
export const SegmentLoadingSkeletonDisabled: Story = {
  name: 'Сегменты · loading, skeleton, disabled',
  parameters: {
    docs: {
      description: {
        story:
          '**loading** — спиннер и **aria-busy**, переключение недоступно. **skeleton** — плейсхолдер без клика. **disabled** — явно отключённый пункт.',
      },
    },
  },
  render: () => (
    <TabsSegmentStoryHorizontalWrap>
      <Tabs ariaLabel="Состояния сегментов" defaultValue="ok" variant={TabsVariant.PILL}>
        <Tabs.Item value="ok" label="Готово" />
        <Tabs.Item value="loading" label="Загрузка…" loading />
        <Tabs.Item value="sk" label="" skeleton />
        <Tabs.Item value="off" label="Недоступно" disabled />
      </Tabs>
    </TabsSegmentStoryHorizontalWrap>
  ),
};

/** **iconStart** и **iconEnd**. */
export const SegmentIconStartAndEnd: Story = {
  name: 'Сегменты · Иконки с двух сторон',
  parameters: {
    docs: {
      description: {
        story: 'Подпись между двумя иконками.',
      },
    },
  },
  render: () => (
    <TabsSegmentStoryHorizontalWrap>
      <Tabs ariaLabel="Представление данных" variant={TabsVariant.PILL} defaultValue="pickup">
        <Tabs.Item
          value="pickup"
          label="Компактный"
          iconStart={<Icon name="IconExPin" size="sm" />}
          iconEnd={<Icon name="IconPlainerChevronDown" size="sm" />}
        />
        <Tabs.Item
          value="courier"
          label="Расширенный"
          iconStart={<Icon name="IconExBox1" size="sm" />}
          iconEnd={<Icon name="IconExSend" size="sm" />}
        />
      </Tabs>
    </TabsSegmentStoryHorizontalWrap>
  ),
};

/** **label** как ReactNode. */
export const SegmentLabelAsReactNode: Story = {
  name: 'Сегменты · Label как ReactNode',
  parameters: {
    docs: {
      description: {
        story: 'Кастомная вёрстка подписи через **Typography** и иконку.',
      },
    },
  },
  render: () => (
    <TabsSegmentStoryHorizontalWrap>
      <Tabs ariaLabel="Структура данных" variant={TabsVariant.PILL} defaultValue="brief">
        <Tabs.Item
          value="brief"
          label={
            <TabsSegmentStoryInlineLabelWrap>
              <Icon name="IconExChart" size="sm" />
              <Typography variant="bodySmall" component="span">
                Кратко
              </Typography>
            </TabsSegmentStoryInlineLabelWrap>
          }
        />
        <Tabs.Item
          value="verbose"
          label={
            <TabsSegmentStoryInlineLabelWrap>
              <Icon name="IconExDocument" size="sm" />
              <Typography variant="bodySmall" component="span">
                Подробно
              </Typography>
            </TabsSegmentStoryInlineLabelWrap>
          }
        />
      </Tabs>
    </TabsSegmentStoryHorizontalWrap>
  ),
};

/** Два сегмента. */
export const SegmentTwoSegments: Story = {
  name: 'Сегменты · Два пункта',
  parameters: {
    docs: {
      description: {
        story: 'Минимальный набор из двух **value**.',
      },
    },
  },
  render: () => (
    <TabsSegmentStoryHorizontalWrap>
      <Tabs ariaLabel="Интервал" variant={TabsVariant.PILL} defaultValue="day">
        <Tabs.Item value="day" label="День" />
        <Tabs.Item value="week" label="Неделя" />
      </Tabs>
    </TabsSegmentStoryHorizontalWrap>
  ),
};

/** Пять коротких сегментов. */
export const SegmentFiveSegments: Story = {
  name: 'Сегменты · Пять пунктов',
  parameters: {
    docs: {
      description: {
        story: 'Узкие подписи и деление ширины (**flex** у горизонтального **pill**).',
      },
    },
  },
  render: () => (
    <TabsSegmentStoryHorizontalWrap>
      <Tabs ariaLabel="Глубина истории" variant={TabsVariant.PILL} defaultValue="1m">
        <Tabs.Item value="1d" label="1Д" />
        <Tabs.Item value="5d" label="5Д" />
        <Tabs.Item value="1m" label="1М" />
        <Tabs.Item value="3m" label="3М" />
        <Tabs.Item value="all" label="Все" />
      </Tabs>
    </TabsSegmentStoryHorizontalWrap>
  ),
};

/** Несколько **disabled** подряд. */
export const SegmentSeveralDisabled: Story = {
  name: 'Сегменты · Несколько disabled',
  parameters: {
    docs: {
      description: {
        story: 'Недоступные сегменты не вызывают **onChange**.',
      },
    },
  },
  render: () => (
    <TabsSegmentStoryHorizontalWrap>
      <Tabs
        ariaLabel="Этапы процесса"
        variant={TabsVariant.LINE}
        filledSegmentTriggers
        defaultValue="draft"
      >
        <Tabs.Item value="draft" label="Черновик" />
        <Tabs.Item value="step2" label="Шаг 2" disabled />
        <Tabs.Item value="step3" label="Шаг 3" disabled />
        <Tabs.Item value="final" label="Финал" />
      </Tabs>
    </TabsSegmentStoryHorizontalWrap>
  ),
};

/** Трек на всю ширину родителя. */
export const SegmentFullWidthInParent: Story = {
  name: 'Сегменты · На всю ширину',
  parameters: {
    docs: {
      description: {
        story:
          '**TabItemGroupList** при горизонтали задаёт **width: 100%**; узкий родитель имитирует панель инструментов.',
      },
    },
  },
  render: () => (
    <TabsSegmentStoryFullWidthWrap>
      <Tabs ariaLabel="Структура экрана" variant={TabsVariant.PILL} defaultValue="overview">
        {tabsSegmentListFromOptions(threeSegmentLabels)}
      </Tabs>
    </TabsSegmentStoryFullWidthWrap>
  ),
};

/** Без **defaultValue**: активен первый сегмент. */
export const SegmentUncontrolledFirstSelected: Story = {
  name: 'Сегменты · Первый активен по умолчанию',
  parameters: {
    docs: {
      description: {
        story:
          'Если **defaultValue** / **defaultActiveTab** не переданы, активируется первый **value** в DOM.',
      },
    },
  },
  render: () => (
    <TabsSegmentStoryHorizontalWrap>
      <Tabs ariaLabel="Без явного defaultValue" variant={TabsVariant.PILL}>
        {tabsSegmentListFromOptions(threeSegmentLabels)}
      </Tabs>
    </TabsSegmentStoryHorizontalWrap>
  ),
};

/** Контролируемый режим. */
export const SegmentControlled: Story = {
  name: 'Сегменты · Контролируемый',
  parameters: {
    docs: {
      description: {
        story: 'Состояние снаружи: **value** + **onChange**.',
      },
    },
  },
  render: () => {
    const [selectedValue, setSelectedValue] = useState('details');
    return (
      <TabsSegmentStoryHorizontalWrap>
        <Tabs
          ariaLabel="Активный раздел"
          value={selectedValue}
          onChange={setSelectedValue}
          variant={TabsVariant.PILL}
        >
          {tabsSegmentListFromOptions(threeSegmentLabels)}
        </Tabs>
        <TabsSegmentStoryCaption>Текущее value: {selectedValue}</TabsSegmentStoryCaption>
      </TabsSegmentStoryHorizontalWrap>
    );
  },
};
