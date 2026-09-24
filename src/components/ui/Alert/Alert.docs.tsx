import { Alert } from './Alert';
import { Button } from '../buttons/Button/Button';
import { ButtonVariant } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import { defineComponentDocs } from '../../../docs/defineComponentDocs';

export default defineComponentDocs({
  meta: {
    name: 'Alert',
    group: 'Feedback',
    platform: 'web',
    since: '0.3.4',
    status: 'stable',
    description: 'Inline-уведомления с severity, action и управлением закрытием.',
  },
  examples: [
    {
      id: 'basic-success',
      title: 'Базовый success',
      description: 'Минимальная конфигурация уведомления.',
      code: '<Alert severity="success" title="Успешно">Операция выполнена.</Alert>',
      render: () => (
        <Alert severity="success" title="Успешно" fullWidth>
          Операция выполнена.
        </Alert>
      ),
      showCode: true,
      themes: ['theme', 'colorMode', 'contrast'],
      layout: 'block',
    },
    {
      id: 'filled-error-close',
      title: 'Filled + close',
      description: 'Вариант filled с кнопкой закрытия.',
      code: '<Alert severity="error" variant="filled" onClose={() => undefined}>Ошибка сохранения.</Alert>',
      render: () => (
        <Alert severity="error" variant="filled" onClose={() => undefined} fullWidth>
          Ошибка сохранения.
        </Alert>
      ),
      showCode: true,
      themes: ['theme', 'colorMode'],
      layout: 'block',
    },
    {
      id: 'with-action',
      title: 'Со slot action',
      description: 'Кнопка действия в Alert для быстрых сценариев undo/retry.',
      code: '<Alert severity="info" action={<Button variant={ButtonVariant.GHOST} size={Size.SM}>Подробнее</Button>}>Найдено обновление.</Alert>',
      render: () => (
        <Alert
          severity="info"
          fullWidth
          action={
            <Button variant={ButtonVariant.GHOST} size={Size.SM}>
              Подробнее
            </Button>
          }
        >
          Найдено обновление.
        </Alert>
      ),
      showCode: true,
      themes: ['theme', 'colorMode'],
      layout: 'block',
    },
  ],
  variants: [
    {
      id: 'severity-matrix',
      title: 'Severity',
      columns: 2,
      items: [
        {
          id: 'success',
          title: 'Success',
          code: '<Alert severity="success">Success</Alert>',
          render: () => <Alert severity="success">Success</Alert>,
        },
        {
          id: 'info',
          title: 'Info',
          code: '<Alert severity="info">Info</Alert>',
          render: () => <Alert severity="info">Info</Alert>,
        },
        {
          id: 'warning',
          title: 'Warning',
          code: '<Alert severity="warning">Warning</Alert>',
          render: () => <Alert severity="warning">Warning</Alert>,
        },
        {
          id: 'error',
          title: 'Error',
          code: '<Alert severity="error">Error</Alert>',
          render: () => <Alert severity="error">Error</Alert>,
        },
      ],
    },
  ],
  props: {
    mode: 'autogen',
  },
  a11y: {
    roles: ['alert', 'status'],
    notes: ['Используйте role="status" для не-критичных сообщений.'],
  },
  related: [
    { name: 'Toast', href: '/components/toast' },
    { name: 'Button', href: '/components/button' },
  ],
});
