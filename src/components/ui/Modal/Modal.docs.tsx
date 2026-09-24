import { Modal } from './Modal';
import { ButtonVariant } from '../../../types/ui';
import { defineComponentDocs } from '../../../docs/defineComponentDocs';

export default defineComponentDocs({
  meta: {
    name: 'Modal',
    group: 'Surfaces',
    platform: 'web',
    since: '0.3.4',
    status: 'stable',
    description: 'Модальное окно с порталом, управлением фокусом, overlay и action-кнопками.',
  },
  examples: [
    {
      id: 'basic-opened',
      title: 'Открытое окно',
      description: 'Минимальный пример открытого модального окна.',
      code: '<Modal isOpen onClose={() => undefined} title="Подтверждение" description="Вы уверены?" />',
      render: () => (
        <Modal
          isOpen
          onClose={() => undefined}
          title="Подтверждение"
          description="Вы уверены, что хотите продолжить?"
        />
      ),
      showCode: true,
      themes: ['theme', 'colorMode', 'motion'],
      layout: 'block',
    },
    {
      id: 'with-buttons',
      title: 'С кнопками действий',
      description: 'Кнопки задаются через массив buttons.',
      code: '<Modal isOpen onClose={() => undefined} title="Удаление" buttons={[{ label: "Отмена", variant: ButtonVariant.OUTLINE, onClick: () => undefined }, { label: "Удалить", variant: ButtonVariant.DANGER, onClick: () => undefined }]} />',
      render: () => (
        <Modal
          isOpen
          onClose={() => undefined}
          title="Удаление записи"
          description="Это действие нельзя отменить"
          buttons={[
            { label: 'Отмена', variant: ButtonVariant.OUTLINE, onClick: () => undefined },
            { label: 'Удалить', variant: ButtonVariant.DANGER, onClick: () => undefined },
          ]}
        />
      ),
      showCode: true,
      themes: ['theme', 'colorMode', 'motion'],
      layout: 'block',
    },
    {
      id: 'status-variant',
      title: 'Статус danger',
      description: 'Вариант модалки с визуальным статусом danger.',
      code: '<Modal isOpen onClose={() => undefined} title="Внимание" modalVariant="danger" />',
      render: () => (
        <Modal
          isOpen
          onClose={() => undefined}
          title="Внимание"
          description="Критичное действие требует подтверждения"
          modalVariant="danger"
        />
      ),
      showCode: true,
      themes: ['theme', 'colorMode', 'contrast'],
      layout: 'block',
    },
  ],
  props: {
    mode: 'autogen',
  },
  a11y: {
    roles: ['dialog'],
    keyboard: ['Escape', 'Tab', 'Shift+Tab'],
    requiredAttributes: ['aria-modal'],
  },
  related: [
    { name: 'Drawer', href: '/components/drawer' },
    { name: 'Button', href: '/components/button' },
  ],
});
