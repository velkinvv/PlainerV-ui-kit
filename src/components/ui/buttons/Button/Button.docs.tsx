import { Button } from './Button';
import { Icon } from '../../Icon/Icon';
import { IconSize, Size } from '../../../../types/sizes';
import { ButtonVariant } from '../../../../types/ui';
import { defineComponentDocs } from '../../../../docs/defineComponentDocs';

export default defineComponentDocs({
  meta: {
    name: 'Button',
    group: 'Buttons',
    platform: 'web',
    since: '0.3.4',
    status: 'stable',
    description:
      'Базовая кнопка UI Kit: варианты оформления, размеры, иконки и состояния загрузки/disabled.',
  },
  examples: [
    {
      id: 'primary',
      title: 'Primary',
      description: 'Базовый сценарий подтверждающего действия.',
      code: '<Button variant={ButtonVariant.PRIMARY}>Сохранить</Button>',
      render: () => <Button variant={ButtonVariant.PRIMARY}>Сохранить</Button>,
      showCode: true,
      themes: ['theme', 'colorMode', 'motion'],
      layout: 'inline',
    },
    {
      id: 'with-icons',
      title: 'С иконками',
      description: 'Кнопка с иконкой в начале и конце текста.',
      code: '<Button iconStart={<Icon name="IconExHome" size={IconSize.MD} />} iconEnd={<Icon name="IconPlainerArrowRight" size={IconSize.MD} />}>Открыть</Button>',
      render: () => (
        <Button
          iconStart={<Icon name="IconExHome" size={IconSize.MD} />}
          iconEnd={<Icon name="IconPlainerArrowRight" size={IconSize.MD} />}
        >
          Открыть
        </Button>
      ),
      showCode: true,
      themes: ['theme', 'colorMode'],
      layout: 'inline',
    },
    {
      id: 'loading',
      title: 'Состояние загрузки',
      description: 'Кнопка в loading-состоянии блокирует повторный клик.',
      code: '<Button loading size={Size.MD}>Сохранить</Button>',
      render: () => (
        <Button loading size={Size.MD}>
          Сохранить
        </Button>
      ),
      showCode: true,
      themes: ['theme', 'motion'],
      layout: 'inline',
    },
  ],
  variants: [
    {
      id: 'variant-matrix',
      title: 'Варианты кнопки',
      columns: 3,
      items: [
        {
          id: 'primary',
          title: 'Primary',
          code: '<Button variant={ButtonVariant.PRIMARY}>Primary</Button>',
          render: () => <Button variant={ButtonVariant.PRIMARY}>Primary</Button>,
        },
        {
          id: 'secondary',
          title: 'Secondary',
          code: '<Button variant={ButtonVariant.SECONDARY}>Secondary</Button>',
          render: () => <Button variant={ButtonVariant.SECONDARY}>Secondary</Button>,
        },
        {
          id: 'outline',
          title: 'Outline',
          code: '<Button variant={ButtonVariant.OUTLINE}>Outline</Button>',
          render: () => <Button variant={ButtonVariant.OUTLINE}>Outline</Button>,
        },
      ],
    },
  ],
  props: {
    mode: 'autogen',
  },
  a11y: {
    roles: ['button'],
    keyboard: ['Enter', 'Space'],
    notes: ['Для icon-only кнопок добавляйте aria-label.'],
  },
  related: [
    { name: 'IconButton', href: '/components/icon-button' },
    { name: 'Icon', href: '/components/icon' },
  ],
});
