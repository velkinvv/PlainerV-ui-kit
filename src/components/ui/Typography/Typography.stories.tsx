import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Typography } from './Typography';
import { DOC_TYPOGRAPHY } from '@/components/ui/storyDocs/uiKitDocs';

const meta: Meta<typeof Typography> = {
  title: 'UI Kit/Data Display/Typography',
  component: Typography,
  tags: ['autodocs'], // Включаем автоматическую генерацию документации
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_TYPOGRAPHY,
      },
    },
  },
  argTypes: {
    children: {
      description: 'Текст или разметка',
      table: { type: { summary: 'ReactNode' } },
    },
    variant: {
      control: { type: 'select' },
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'body',
        'bodySmall',
        'bodyLarge',
        'caption',
        'button',
        'input',
        'label',
        'inherit',
      ],
      description:
        'Вариант типографики; значения: `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `body`, `bodySmall`, `bodyLarge`, `caption`, `button`, `input`, `label`, `inherit`',
      table: {
        type: {
          summary: 'h1–h6, body, bodySmall, bodyLarge, caption, button, input, label или inherit',
        },
      },
    },
    color: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'success',
        'warning',
        'danger',
        'info',
        'text',
        'textSecondary',
        'textTertiary',
        'textDisabled',
        'inherit',
      ],
      description:
        'Цвет текста; значения: `primary`, `secondary`, `success`, `warning`, `danger`, `info`, `text`, `textSecondary`, `textTertiary`, `textDisabled`, `inherit`',
      table: {
        type: {
          summary:
            'primary, secondary, success, warning, danger, info, text, textSecondary, textTertiary, textDisabled или inherit',
        },
      },
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right', 'justify', 'inherit'],
      description: 'Выравнивание текста; значения: `left`, `center`, `right`, `justify`, `inherit`',
      table: {
        type: { summary: 'left, center, right, justify или inherit' },
      },
    },
    decoration: {
      control: { type: 'select' },
      options: ['none', 'underline', 'line-through', 'inherit'],
      description: 'Декорация текста; значения: `none`, `underline`, `line-through`, `inherit`',
      table: {
        type: { summary: 'none, underline, line-through или inherit' },
      },
    },
    component: {
      control: 'text',
      description: 'HTML тег для рендеринга',
      table: {
        type: { summary: 'строка с именем элемента (например p, span, div)' },
      },
    },
    noWrap: {
      control: 'boolean',
      description: 'Отключить перенос строк',
      table: { type: { summary: 'boolean' } },
    },
    uppercase: {
      control: 'boolean',
      description: 'Сделать текст заглавными буквами',
      table: { type: { summary: 'boolean' } },
    },
    lowercase: {
      control: 'boolean',
      description: 'Сделать текст строчными буквами',
      table: { type: { summary: 'boolean' } },
    },
    capitalize: {
      control: 'boolean',
      description: 'Сделать первую букву заглавной',
      table: { type: { summary: 'boolean' } },
    },
    fontWeight: {
      control: { type: 'select' },
      options: [
        'thin',
        'extraLight',
        'light',
        'regular',
        'medium',
        'semiBold',
        'bold',
        'extraBold',
        'black',
      ],
      description:
        'Жирность шрифта; значения: `thin`, `extraLight`, `light`, `regular`, `medium`, `semiBold`, `bold`, `extraBold`, `black`',
      table: {
        type: {
          summary: 'thin, extraLight, light, regular, medium, semiBold, bold, extraBold или black',
        },
      },
    },
    fontSize: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'],
      description:
        'Размер шрифта; значения: `xs`, `sm`, `base`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`',
      table: {
        type: { summary: 'xs … 5xl (токены размера из темы)' },
      },
    },
    lineHeight: {
      control: { type: 'select' },
      options: ['tight', 'normal', 'relaxed', 'loose'],
      description: 'Высота строки; значения: `tight`, `normal`, `relaxed`, `loose`',
      table: {
        type: { summary: 'tight, normal, relaxed или loose' },
      },
    },
    fontFamily: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'monospace'],
      description: 'Семейство шрифтов; значения: `primary`, `secondary`, `monospace`',
      table: {
        type: { summary: 'primary, secondary или monospace' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

/**
 * Базовый пример
 */
export const Default: Story = {
  args: {
    children: 'Базовый текст с использованием Typography компонента',
  },
};

/**
 * Заголовки
 */
export const Headings: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Typography variant="h1">Заголовок H1</Typography>
      <Typography variant="h2">Заголовок H2</Typography>
      <Typography variant="h3">Заголовок H3</Typography>
      <Typography variant="h4">Заголовок H4</Typography>
      <Typography variant="h5">Заголовок H5</Typography>
      <Typography variant="h6">Заголовок H6</Typography>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Все доступные варианты заголовков с соответствующими стилями из темы.',
      },
    },
  },
};

/**
 * Текстовые варианты
 */
export const BodyText: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Typography variant="bodyLarge">
        Большой текст (bodyLarge) - используется для основного контента на странице.
      </Typography>
      <Typography variant="body">
        Обычный текст (body) - стандартный размер для большинства текстов.
      </Typography>
      <Typography variant="bodySmall">
        Маленький текст (bodySmall) - для дополнительной информации и подписей.
      </Typography>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Варианты основного текста с разными размерами.',
      },
    },
  },
};

/**
 * Специальные элементы
 */
export const SpecialElements: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Typography variant="caption">
        Подпись (caption) - для мелкого текста и метаинформации
      </Typography>
      <Typography variant="button">Текст кнопки (button) - стили для текста в кнопках</Typography>
      <Typography variant="input">
        Текст поля ввода (input) - стили для текста в полях ввода
      </Typography>
      <Typography variant="label">Метка (label) - стили для меток полей формы</Typography>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Специальные варианты для различных элементов интерфейса.',
      },
    },
  },
};

/**
 * Цветовые варианты
 */
export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Typography color="primary">Primary цвет - основной акцентный цвет</Typography>
      <Typography color="secondary">Secondary цвет - вторичный цвет</Typography>
      <Typography color="success">Success цвет - цвет успеха</Typography>
      <Typography color="warning">Warning цвет - цвет предупреждения</Typography>
      <Typography color="danger">Danger цвет - цвет ошибки</Typography>
      <Typography color="info">Info цвет - информационный цвет</Typography>
      <Typography color="text">Text цвет - основной текст</Typography>
      <Typography color="textSecondary">TextSecondary цвет - вторичный текст</Typography>
      <Typography color="textTertiary">TextTertiary цвет - третичный текст</Typography>
      <Typography color="textDisabled">TextDisabled цвет - отключенный текст</Typography>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Все доступные цветовые варианты текста.',
      },
    },
  },
};

/**
 * Выравнивание текста
 */
export const Alignment: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Typography align="left" style={{ border: '1px solid #ccc', padding: '8px' }}>
        Текст выровнен по левому краю (align=&quot;left&quot;)
      </Typography>
      <Typography align="center" style={{ border: '1px solid #ccc', padding: '8px' }}>
        Текст выровнен по центру (align=&quot;center&quot;)
      </Typography>
      <Typography align="right" style={{ border: '1px solid #ccc', padding: '8px' }}>
        Текст выровнен по правому краю (align=&quot;right&quot;)
      </Typography>
      <Typography
        align="justify"
        style={{ border: '1px solid #ccc', padding: '8px', width: '300px' }}
      >
        Текст выровнен по ширине (align=&quot;justify&quot;). Этот текст будет растянут по всей
        ширине контейнера, создавая ровные края с обеих сторон.
      </Typography>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Различные варианты выравнивания текста.',
      },
    },
  },
};

/**
 * Декорация текста
 */
export const Decoration: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Typography decoration="none">Обычный текст без декорации</Typography>
      <Typography decoration="underline">Подчеркнутый текст</Typography>
      <Typography decoration="line-through">Зачеркнутый текст</Typography>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Различные варианты декорации текста.',
      },
    },
  },
};

/**
 * Трансформация текста
 */
export const TextTransform: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Typography>Обычный текст без трансформации</Typography>
      <Typography uppercase>заглавные буквы (uppercase)</Typography>
      <Typography lowercase>СТРОЧНЫЕ БУКВЫ (lowercase)</Typography>
      <Typography capitalize>первая буква заглавная (capitalize)</Typography>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Различные варианты трансформации текста.',
      },
    },
  },
};

/**
 * Кастомные стили
 */
export const CustomStyles: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Typography fontWeight="bold" fontSize="xl" color="primary">
        Жирный большой текст primary цвета
      </Typography>
      <Typography fontFamily="monospace" fontSize="sm" color="textSecondary">
        Моноширинный маленький текст вторичного цвета
      </Typography>
      <Typography lineHeight="loose" fontSize="lg">
        Текст с свободным межстрочным интервалом и большим размером шрифта. Этот текст
        демонстрирует, как выглядит текст с увеличенным межстрочным интервалом.
      </Typography>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Примеры использования кастомных стилей для создания уникальных вариантов текста.',
      },
    },
  },
};

/**
 * NoWrap и переполнение
 */
export const NoWrap: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ width: '200px', border: '1px solid #ccc', padding: '8px' }}>
        <Typography>
          Обычный текст с переносом строк. Этот текст будет переноситься на новую строку, если не
          помещается в контейнер.
        </Typography>
      </div>
      <div style={{ width: '200px', border: '1px solid #ccc', padding: '8px' }}>
        <Typography noWrap>
          Текст без переноса строк (noWrap). Этот текст не будет переноситься и будет обрезан с
          многоточием.
        </Typography>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Демонстрация работы noWrap - текст обрезается с многоточием вместо переноса.',
      },
    },
  },
};

/**
 * Кастомные компоненты
 */
export const CustomComponents: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Typography component="div" variant="h3" color="primary">
        Заголовок как div элемент
      </Typography>
      <Typography component="span" variant="body" color="success">
        Текст как span элемент
      </Typography>
      <Typography component="p" variant="bodyLarge">
        Параграф с большим текстом
      </Typography>
      <Typography component="strong" variant="body" fontWeight="bold">
        Жирный текст как strong элемент
      </Typography>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Примеры использования кастомных HTML компонентов с Typography стилями.',
      },
    },
  },
};

/**
 * Шрифты из темы
 */
export const ThemeFonts: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <Typography variant="h3" color="primary" style={{ marginBottom: '12px' }}>
          Основной шрифт (Montserrat)
        </Typography>
        <Typography fontFamily="primary" fontSize="lg">
          Этот текст использует основной шрифт Montserrat из темы. Он идеально подходит для
          заголовков и основного контента.
        </Typography>
      </div>

      <div>
        <Typography variant="h3" color="primary" style={{ marginBottom: '12px' }}>
          Вторичный шрифт (Inter)
        </Typography>
        <Typography fontFamily="secondary" fontSize="lg">
          Этот текст использует вторичный шрифт Inter из темы. Он отлично подходит для
          дополнительного контента и описаний.
        </Typography>
      </div>

      <div>
        <Typography variant="h3" color="primary" style={{ marginBottom: '12px' }}>
          Моноширинный шрифт
        </Typography>
        <Typography fontFamily="monospace" fontSize="base" color="textSecondary">
          Этот текст использует моноширинный шрифт из темы. Идеально подходит для кода, технических
          данных и консольных сообщений.
        </Typography>
      </div>

      <div>
        <Typography variant="h3" color="primary" style={{ marginBottom: '12px' }}>
          Различные веса шрифта
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Typography fontWeight="thin">Thin (100) - Очень тонкий шрифт</Typography>
          <Typography fontWeight="light">Light (300) - Светлый шрифт</Typography>
          <Typography fontWeight="regular">Regular (400) - Обычный шрифт</Typography>
          <Typography fontWeight="medium">Medium (500) - Средний шрифт</Typography>
          <Typography fontWeight="semiBold">SemiBold (600) - Полужирный шрифт</Typography>
          <Typography fontWeight="bold">Bold (700) - Жирный шрифт</Typography>
          <Typography fontWeight="extraBold">ExtraBold (800) - Очень жирный шрифт</Typography>
          <Typography fontWeight="black">Black (900) - Самый жирный шрифт</Typography>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Демонстрация всех шрифтов и их весов, доступных в теме приложения.',
      },
    },
  },
};

/**
 * Интерактивный пример
 */
export const Interactive: Story = {
  args: {
    variant: 'body',
    color: 'text',
    align: 'left',
    decoration: 'none',
    noWrap: false,
    uppercase: false,
    lowercase: false,
    capitalize: false,
    children:
      'Интерактивный пример Typography компонента. Измените параметры в панели Controls, чтобы увидеть, как они влияют на отображение текста.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Интерактивный пример - используйте панель Controls для изменения параметров компонента.',
      },
    },
  },
};

