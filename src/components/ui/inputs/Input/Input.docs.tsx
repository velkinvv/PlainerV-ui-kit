import { Input } from './Input';
import { Icon } from '../../Icon/Icon';
import { IconSize, Size } from '../../../../types/sizes';
import { defineComponentDocs } from '../../../../docs/defineComponentDocs';

export default defineComponentDocs({
  meta: {
    name: 'Input',
    group: 'Inputs',
    platform: 'web',
    since: '0.3.4',
    status: 'stable',
    description: 'Текстовое поле с лейблом, статусами, иконками и настройками поведения.',
  },
  examples: [
    {
      id: 'default',
      title: 'Базовое поле',
      description: 'Минимальный сценарий для ввода строки.',
      code: '<Input label="Email" placeholder="name@example.com" fullWidth />',
      render: () => <Input label="Email" placeholder="name@example.com" fullWidth />,
      showCode: true,
      themes: ['theme', 'colorMode'],
      layout: 'block',
    },
    {
      id: 'error-state',
      title: 'Ошибка валидации',
      description: 'Показ статуса ошибки и текста подсказки.',
      code: '<Input label="Email" value="bad-mail" error="Некорректный формат" fullWidth readOnly />',
      render: () => (
        <Input
          label="Email"
          value="bad-mail"
          error="Некорректный формат"
          helperText="Используйте формат name@example.com"
          fullWidth
          readOnly
        />
      ),
      showCode: true,
      themes: ['theme', 'colorMode', 'contrast'],
      layout: 'block',
    },
    {
      id: 'with-icons',
      title: 'С иконками',
      description: 'Префикс и суффикс через leftIcon/rightIcon.',
      code: '<Input label="Поиск" leftIcon={<Icon name="IconExSearch" size={IconSize.MD} />} rightIcon={<Icon name="IconPlainerClose" size={IconSize.MD} />} value="PlainerV" readOnly />',
      render: () => (
        <Input
          label="Поиск"
          leftIcon={<Icon name="IconExSearch" size={IconSize.MD} />}
          rightIcon={<Icon name="IconPlainerClose" size={IconSize.MD} />}
          value="PlainerV"
          readOnly
        />
      ),
      showCode: true,
      themes: ['theme', 'colorMode'],
      layout: 'block',
    },
  ],
  variants: [
    {
      id: 'size-matrix',
      title: 'Размеры',
      columns: 3,
      items: [
        {
          id: 'sm',
          title: 'SM',
          code: '<Input label="SM" size={Size.SM} />',
          render: () => <Input label="SM" size={Size.SM} />,
        },
        {
          id: 'md',
          title: 'MD',
          code: '<Input label="MD" size={Size.MD} />',
          render: () => <Input label="MD" size={Size.MD} />,
        },
        {
          id: 'lg',
          title: 'LG',
          code: '<Input label="LG" size={Size.LG} />',
          render: () => <Input label="LG" size={Size.LG} />,
        },
      ],
    },
  ],
  props: {
    mode: 'autogen',
  },
  a11y: {
    roles: ['textbox'],
    requiredAttributes: ['label или aria-label'],
    notes: ['Для обязательного поля передавайте required.'],
  },
  related: [
    { name: 'Select', href: '/components/select' },
    { name: 'DateInput', href: '/components/date-input' },
  ],
});
