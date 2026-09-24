import { Drawer } from './Drawer';
import { defineComponentDocs } from '../../../docs/defineComponentDocs';

export default defineComponentDocs({
  meta: {
    name: 'Drawer',
    group: 'Surfaces',
    platform: 'web',
    since: '0.3.4',
    status: 'stable',
    description: 'Выдвижная панель с оверлеем: размещение по сторонам, focus trap и управление закрытием.',
  },
  examples: [
    {
      id: 'right-opened',
      title: 'Открыт справа',
      description: 'Базовый drawer, закреплённый справа.',
      code: '<Drawer isOpen onClose={() => undefined} placement="right" title="Фильтры">Контент панели</Drawer>',
      render: () => (
        <Drawer isOpen onClose={() => undefined} placement="right" title="Фильтры">
          <p>Контент панели</p>
        </Drawer>
      ),
      showCode: true,
      themes: ['theme', 'colorMode', 'motion'],
      layout: 'block',
    },
    {
      id: 'bottom-opened',
      title: 'Открыт снизу',
      description: 'Drawer внизу с ограничением по высоте.',
      code: '<Drawer isOpen onClose={() => undefined} placement="bottom" height="40vh" title="История">Контент</Drawer>',
      render: () => (
        <Drawer
          isOpen
          onClose={() => undefined}
          placement="bottom"
          height="40vh"
          title="История"
        >
          <p>Контент нижней панели</p>
        </Drawer>
      ),
      showCode: true,
      themes: ['theme', 'colorMode', 'motion'],
      layout: 'block',
    },
  ],
  variants: [
    {
      id: 'placement-matrix',
      title: 'Сторона появления',
      columns: 2,
      items: [
        {
          id: 'left',
          title: 'Left',
          code: '<Drawer isOpen onClose={() => undefined} placement="left" title="Left" />',
          render: () => <Drawer isOpen onClose={() => undefined} placement="left" title="Left" />,
        },
        {
          id: 'right',
          title: 'Right',
          code: '<Drawer isOpen onClose={() => undefined} placement="right" title="Right" />',
          render: () => (
            <Drawer isOpen onClose={() => undefined} placement="right" title="Right" />
          ),
        },
      ],
    },
  ],
  props: {
    mode: 'autogen',
  },
  a11y: {
    roles: ['dialog'],
    keyboard: ['Escape', 'Tab', 'Shift+Tab'],
  },
  related: [
    { name: 'Modal', href: '/components/modal' },
    { name: 'Button', href: '/components/button' },
  ],
});
