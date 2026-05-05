import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';
import { Tag } from './Tag';
import { Icon } from '../Icon/Icon';
import { IconSize, Size } from '../../../types/sizes';
import type { TagAppearance, TagColorVariant } from '../../../types/ui';
import {
  TagStoriesCompactStack,
  TagStoriesStack,
  TagStoriesSectionTitle,
  TagStoriesRow,
  TagStoriesColumn,
  TagStoriesCaption,
  TagStoriesCaptionTitle,
  TagStoriesCaptionCode,
  TagStoriesMatrixSection,
  TagStoriesMatrixAppearanceTitle,
  TagStoriesMatrixColorRow,
  TagStoriesMatrixLabel,
  tagStoriesCustomColors,
} from './Tag.stories.style';
import { DOC_TAG } from '@/components/ui/storyDocs/uiKitDocs';

const sampleIcon = <Icon name="IconExCopy" size={IconSize.XS} color="currentColor" />;

/** Варианты темы для матриц и превью (без `custom` — он задаётся вместе с `customColors`) */
const TAG_COLORS: readonly TagColorVariant[] = [
  'neutral',
  'secondary',
  'primary',
  'danger',
  'info',
  'success',
  'warning',
  'purple',
  'teal',
  'cyan',
  'pink',
];

/** Все значения для контрола Playground, включая `custom` */
const TAG_COLOR_CONTROL_OPTIONS: readonly TagColorVariant[] = [...TAG_COLORS, 'custom'];
const TAG_APPEARANCES: readonly TagAppearance[] = ['filled', 'outline'];
const TAG_SIZES = [Size.XS, Size.SM, Size.MD, Size.LG, Size.XL] as const;

const meta: Meta<typeof Tag> = {
  title: 'UI Kit/Data Display/Tag',
  component: Tag,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_TAG,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Текст или разметка внутри тега (не показывается при `skeleton`)',
      table: { type: { summary: 'ReactNode' } },
    },
    colorVariant: {
      control: 'select',
      options: [...TAG_COLOR_CONTROL_OPTIONS],
      description: 'Палитра тега (`custom` — с `customColors`)',
      table: {
        type: { summary: 'TagColorVariant' },
      },
    },
    appearance: {
      control: 'select',
      options: [...TAG_APPEARANCES],
      description: 'Заливка или только обводка',
      table: {
        type: { summary: 'TagAppearance' },
      },
    },
    size: {
      control: { type: 'select' },
      options: Object.values(Size),
      description: 'Размер (отступы и типографика; по умолчанию SM)',
      table: {
        type: { summary: 'Size' },
      },
    },
    leftIcon: {
      control: false,
      description: 'Иконка слева от подписи',
      table: { type: { summary: 'ReactNode' } },
    },
    rightIcon: {
      control: false,
      description: 'Иконка справа от подписи',
      table: { type: { summary: 'ReactNode' } },
    },
    onClick: {
      control: false,
      description: 'При передаче тег кликабелен (`role="button"`, Enter/Space)',
      table: {
        type: { summary: '(event: React.MouseEvent<HTMLSpanElement>) => void' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Неактивное состояние (курсор, opacity, без hover)',
      table: { type: { summary: 'boolean' } },
    },
    skeleton: {
      control: 'boolean',
      description: 'Шиммер вместо содержимого; `aria-busy`',
      table: { type: { summary: 'boolean' } },
    },
    skeletonWidth: {
      control: { type: 'number' },
      description: 'Ширина скелетона в px (иначе — дефолт по `size`)',
      table: { type: { summary: 'number | undefined' } },
    },
    statusDisplay: {
      control: 'select',
      options: ['surface', 'marker'],
      description:
        '`surface` — красим всю пилюлю; `marker` — нейтральный фон и цветной кружок статуса слева',
      table: { type: { summary: 'surface | marker' } },
    },
    width: {
      control: 'text',
      description: 'Фиксированная ширина (число = px или строка CSS)',
    },
    maxWidth: {
      control: 'text',
      description: 'Макс. ширина; с `tooltipWhenTruncated` — тултип при ellipsis',
    },
    as: {
      control: 'select',
      options: ['span', 'button', 'div'],
      description: 'Корневой элемент (для клика рекомендуется `button`)',
    },
    hideBorder: {
      control: 'boolean',
      description: 'Скрыть видимую обводку',
    },
    tooltipWhenTruncated: {
      control: 'boolean',
      description: 'Показывать Tooltip, если текст не помещается (нужны `width` и/или `maxWidth`)',
    },
    tooltipContent: {
      control: 'text',
      description: 'Текст тултипа при обрезке, если `children` не строка',
    },
    customColors: {
      control: false,
      description:
        '`{ background?, border?, backgroundHover?, color?, marker? }` — при заданном `background` вся пилюля кастомная; `marker` задаёт цвет кружка в `statusDisplay="marker"`',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    children: 'Tag',
    colorVariant: 'neutral',
    appearance: 'filled',
    skeleton: false,
  },
};

/**
 * Все сочетания палитры × иконка слева / только текст / иконка справа для filled и outline.
 */
export const PaletteMatrix: Story = {
  name: 'Матрица палитры × иконки',
  render: () => (
    <TagStoriesStack>
      {TAG_APPEARANCES.map((appearance) => (
        <TagStoriesMatrixSection key={appearance}>
          <TagStoriesMatrixAppearanceTitle>{appearance}</TagStoriesMatrixAppearanceTitle>
          <TagStoriesCompactStack>
            {TAG_COLORS.map((colorVariant) => (
              <TagStoriesMatrixColorRow key={colorVariant}>
                <TagStoriesMatrixLabel>{colorVariant}</TagStoriesMatrixLabel>
                <Tag colorVariant={colorVariant} appearance={appearance} rightIcon={sampleIcon}>
                  Tag
                </Tag>
                <Tag colorVariant={colorVariant} appearance={appearance}>
                  Tag
                </Tag>
                <Tag colorVariant={colorVariant} appearance={appearance} leftIcon={sampleIcon}>
                  Tag
                </Tag>
              </TagStoriesMatrixColorRow>
            ))}
          </TagStoriesCompactStack>
        </TagStoriesMatrixSection>
      ))}
    </TagStoriesStack>
  ),
};

/**
 * Все значения `size`: высота и типографика.
 */
export const AllSizes: Story = {
  name: 'Все размеры',
  render: () => (
    <TagStoriesRow aria-label="Размеры Tag">
      {TAG_SIZES.map((tagSize) => (
        <TagStoriesColumn key={tagSize}>
          <TagStoriesCaption>
            <TagStoriesCaptionTitle>{tagSize}</TagStoriesCaptionTitle>
            <TagStoriesCaptionCode>{`size={Size.${tagSize}}`}</TagStoriesCaptionCode>
          </TagStoriesCaption>
          <Tag size={tagSize} colorVariant="neutral">
            Tag
          </Tag>
        </TagStoriesColumn>
      ))}
    </TagStoriesRow>
  ),
};

/**
 * Иконка только слева, только справа, с двух сторон; короткий и длинный текст.
 */
export const IconLayouts: Story = {
  name: 'Иконки и текст',
  render: () => (
    <TagStoriesStack>
      <div>
        <TagStoriesSectionTitle>Одна иконка</TagStoriesSectionTitle>
        <TagStoriesRow>
          <Tag leftIcon={sampleIcon}>Только слева</Tag>
          <Tag rightIcon={sampleIcon}>Только справа</Tag>
          <Tag leftIcon={sampleIcon} rightIcon={sampleIcon}>
            С двух сторон
          </Tag>
        </TagStoriesRow>
      </div>
      <div>
        <TagStoriesSectionTitle>Длина текста</TagStoriesSectionTitle>
        <TagStoriesRow>
          <Tag colorVariant="info">Ок</Tag>
          <Tag colorVariant="info">Длинная метка фильтра</Tag>
          <Tag colorVariant="info" appearance="outline">
            Очень длинная метка для проверки переноса (nowrap)
          </Tag>
        </TagStoriesRow>
      </div>
    </TagStoriesStack>
  ),
};

/**
 * Клик и фокус (`fn` в панели действий Storybook).
 */
export const Interactive: Story = {
  name: 'Интерактив (клик и фокус)',
  args: {
    children: 'Снять фильтр',
    colorVariant: 'neutral',
    onClick: fn(),
  },
};

/**
 * Все палитры и оба вида в состоянии `disabled`.
 */
export const Disabled: Story = {
  name: 'Состояние disabled',
  render: () => (
    <TagStoriesStack>
      {TAG_APPEARANCES.map((appearance) => (
        <div key={appearance}>
          <TagStoriesSectionTitle>{appearance}</TagStoriesSectionTitle>
          <TagStoriesRow>
            {TAG_COLORS.map((colorVariant) => (
              <Tag key={`${appearance}-${colorVariant}`} appearance={appearance} colorVariant={colorVariant} disabled>
                Недоступно
              </Tag>
            ))}
          </TagStoriesRow>
        </div>
      ))}
    </TagStoriesStack>
  ),
};

/**
 * Типичные сценарии: нейтральная метка, ошибка, успех, предупреждение, информация (семантика через `colorVariant`).
 */
export const SemanticStates: Story = {
  name: 'Семантические состояния',
  render: () => (
    <TagStoriesStack>
      <TagStoriesSectionTitle>Сценарии использования</TagStoriesSectionTitle>
      <TagStoriesRow>
        <Tag colorVariant="neutral">Черновик</Tag>
        <Tag colorVariant="danger" appearance="filled">
          Ошибка валидации
        </Tag>
        <Tag colorVariant="success">Опубликовано</Tag>
        <Tag colorVariant="warning" appearance="outline">
          Требует внимания
        </Tag>
        <Tag colorVariant="info">Подсказка</Tag>
        <Tag colorVariant="primary">Primary</Tag>
      </TagStoriesRow>
      <TagStoriesSectionTitle>С outline для акцента на обводке</TagStoriesSectionTitle>
      <TagStoriesRow>
        <Tag colorVariant="danger" appearance="outline">
          Удалить
        </Tag>
        <Tag colorVariant="success" appearance="outline">
          Готово
        </Tag>
        <Tag colorVariant="warning" appearance="outline">
          Просрочено
        </Tag>
      </TagStoriesRow>
    </TagStoriesStack>
  ),
};

/**
 * Скелетон по размерам (дефолтная ширина из `getTagSkeletonDefaultWidthPx`).
 */
export const SkeletonSizes: Story = {
  name: 'Скелетон: размеры',
  render: () => (
    <TagStoriesRow aria-label="Скелетоны Tag по размерам">
      {TAG_SIZES.map((tagSize) => (
        <TagStoriesColumn key={tagSize}>
          <TagStoriesCaption>
            <TagStoriesCaptionTitle>{tagSize}</TagStoriesCaptionTitle>
            <TagStoriesCaptionCode>skeleton</TagStoriesCaptionCode>
          </TagStoriesCaption>
          <Tag skeleton size={tagSize} />
        </TagStoriesColumn>
      ))}
    </TagStoriesRow>
  ),
};

/**
 * Явная ширина скелетона (`skeletonWidth`).
 */
export const SkeletonWidths: Story = {
  name: 'Скелетон: ширина',
  render: () => (
    <TagStoriesRow>
      <Tag skeleton skeletonWidth={48} />
      <Tag skeleton skeletonWidth={120} />
      <Tag skeleton skeletonWidth={200} size={Size.LG} />
    </TagStoriesRow>
  ),
};

/**
 * Имитация строки фильтров при загрузке.
 */
export const SkeletonFilterRow: Story = {
  name: 'Скелетон: строка фильтров',
  render: () => (
    <TagStoriesRow>
      <Tag skeleton size={Size.SM} skeletonWidth={72} />
      <Tag skeleton size={Size.SM} skeletonWidth={96} />
      <Tag skeleton size={Size.SM} skeletonWidth={88} />
      <Tag skeleton size={Size.SM} skeletonWidth={104} />
    </TagStoriesRow>
  ),
};

/**
 * Комбинация: иконки + клик + палитра (без скелетона).
 */
export const CombinedExample: Story = {
  name: 'Комбинированный пример',
  render: () => (
    <TagStoriesRow>
      <Tag colorVariant="neutral" leftIcon={sampleIcon} onClick={fn()}>
        Фильтр
      </Tag>
      <Tag colorVariant="success" rightIcon={sampleIcon}>
        Активно
      </Tag>
      <Tag colorVariant="danger" appearance="outline" disabled>
        Отключённый тег
      </Tag>
    </TagStoriesRow>
  ),
};

/**
 * Статус через цветную метку слева (`statusDisplay="marker"`), фон тега нейтральный.
 */
export const StatusMarkerKind: Story = {
  name: 'Метка-кружок',
  render: () => (
    <TagStoriesStack>
      <TagStoriesSectionTitle>filled</TagStoriesSectionTitle>
      <TagStoriesRow>
        {TAG_COLORS.map((colorVariant) => (
          <Tag key={`m-${colorVariant}`} statusDisplay="marker" colorVariant={colorVariant} appearance="filled">
            {colorVariant}
          </Tag>
        ))}
      </TagStoriesRow>
      <TagStoriesSectionTitle>outline</TagStoriesSectionTitle>
      <TagStoriesRow>
        {TAG_COLORS.map((colorVariant) => (
          <Tag key={`mo-${colorVariant}`} statusDisplay="marker" colorVariant={colorVariant} appearance="outline">
            {colorVariant}
          </Tag>
        ))}
      </TagStoriesRow>
    </TagStoriesStack>
  ),
};

/**
 * Ограниченная ширина и тултип при переполнении текста.
 */
export const TruncationTooltip: Story = {
  name: 'Обрезка и тултип',
  render: () => (
    <TagStoriesRow>
      <Tag maxWidth={140} tooltipWhenTruncated colorVariant="neutral">
        Если текст длиннее ширины тега, при наведении показывается тултип
      </Tag>
    </TagStoriesRow>
  ),
};

/**
 * Свои цвета поверхности через `customColors`.
 */
export const CustomSurfaceColors: Story = {
  name: 'Кастомные цвета surface',
  render: () => (
    <TagStoriesStack>
      <TagStoriesSectionTitle>Полная кастомная пилюля (`background`)</TagStoriesSectionTitle>
      <TagStoriesRow>
        <Tag
          customColors={tagStoriesCustomColors.customSurface}
          onClick={fn()}
        >
          Кастом
        </Tag>
      </TagStoriesRow>
      <TagStoriesSectionTitle>Только кастомный маркер (`marker`, фон из темы)</TagStoriesSectionTitle>
      <TagStoriesRow>
        <Tag
          statusDisplay="marker"
          colorVariant="neutral"
          customColors={tagStoriesCustomColors.orangeMarker}
        >
          Orange dot
        </Tag>
        <Tag
          statusDisplay="marker"
          colorVariant="info"
          customColors={tagStoriesCustomColors.purpleMarker}
        >
          Info + purple marker
        </Tag>
        <Tag
          statusDisplay="marker"
          colorVariant="custom"
          customColors={tagStoriesCustomColors.tealMarker}
        >
          custom + teal marker
        </Tag>
      </TagStoriesRow>
    </TagStoriesStack>
  ),
};

/**
 * Нативная кнопка вместо span + role (удобнее для доступности).
 */
export const NativeButton: Story = {
  name: 'Корень button',
  args: {
    children: 'В корне button',
    as: 'button',
    colorVariant: 'primary',
    onClick: fn(),
  },
};
