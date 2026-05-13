import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Drawer } from './Drawer';
import { Button } from '../buttons/Button';
import { ButtonVariant, type DrawerPlacement } from '../../../types/ui';
import { DOC_DRAWER } from '@/components/ui/storyDocs/uiKitDocs';
import { surfaceOverlayStoriesStyles } from '@/handlers/surfaceOverlayStories.styles';

const meta: Meta<typeof Drawer> = {
  title: 'UI Kit/Surfaces/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: DOC_DRAWER,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Сторона появления панели',
      table: {
        type: { summary: 'left, right, top, bottom' },
      },
    },
    isOpen: {
      description: 'Открыт ли drawer',
      table: { type: { summary: 'boolean' } },
    },
    title: { description: 'Заголовок' },
    width: {
      description: 'Ширина панели (left/right): число = px или CSS-строка',
      table: {
        type: { summary: 'число (пиксели) либо CSS-строка (например "320px", "50vw")' },
      },
    },
    height: {
      description: 'Высота панели (top/bottom)',
      table: {
        type: { summary: 'число (пиксели) либо CSS-строка' },
      },
    },
    overlayVariant: {
      control: { type: 'select' },
      options: ['default', 'blur', 'dark', 'frosted'],
      description: 'Визуал подложки (как у Modal)',
      table: {
        type: { summary: 'default, blur, dark, frosted' },
      },
    },
    unmountOnClose: {
      control: { type: 'boolean' },
      description:
        'Размонтировать панель после закрытия. По умолчанию true: закрытый drawer удаляется из DOM.',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    lazy: {
      control: { type: 'boolean' },
      description: 'Ленивая инициализация: drawer монтируется только после первого открытия.',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const DrawerDemo = ({ placement }: { placement: DrawerPlacement }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={surfaceOverlayStoriesStyles.paddedRoot}>
      <Button type="button" onClick={() => setOpen(true)}>
        Открыть ({placement})
      </Button>
      <Drawer
        isOpen={open}
        onClose={() => setOpen(false)}
        placement={placement}
        title="Заголовок"
        overlayVariant="blur"
      >
        <p>Содержимое drawer. Закрытие: крестик, клик по фону, Escape.</p>
        <Button type="button" onClick={() => setOpen(false)}>
          Закрыть изнутри
        </Button>
      </Drawer>
    </div>
  );
};

export const Right: Story = {
  render: () => <DrawerDemo placement="right" />,
};

export const Left: Story = {
  render: () => <DrawerDemo placement="left" />,
};

export const Bottom: Story = {
  render: () => <DrawerDemo placement="bottom" />,
};

export const Top: Story = {
  render: () => <DrawerDemo placement="top" />,
};

const KeepMountedWithLazyInitDrawerDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openCount, setOpenCount] = useState(0);

  React.useEffect(() => {
    if (isOpen) {
      setOpenCount((previousCount) => previousCount + 1);
    }
  }, [isOpen]);

  return (
    <div style={surfaceOverlayStoriesStyles.paddedRoot}>
      <Button type="button" onClick={() => setIsOpen(true)}>
        Open keep-mounted drawer
      </Button>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        placement="right"
        title="Keep mounted + lazy init"
        unmountOnClose={false}
        lazy
        overlayVariant="dark"
      >
        <p>Количество открытий: {openCount}</p>
        <p>После первого открытия панель сохраняется в DOM и не теряет внутреннее состояние.</p>
        <Button type="button" onClick={() => setIsOpen(false)}>
          Close
        </Button>
      </Drawer>
    </div>
  );
};

export const KeepMountedWithLazyInit: Story = {
  render: () => <KeepMountedWithLazyInitDrawerDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Демонстрация lifecycle-режима: drawer лениво монтируется при первом открытии и сохраняется в DOM после закрытия (`unmountOnClose=false`).',
      },
    },
  },
};

const LifecycleCheatsheetDrawerDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lazyModeEnabled, setLazyModeEnabled] = useState(true);
  const [unmountOnCloseEnabled, setUnmountOnCloseEnabled] = useState(true);
  const [openCount, setOpenCount] = useState(0);

  React.useEffect(() => {
    if (isOpen) {
      setOpenCount((previousOpenCountValue) => previousOpenCountValue + 1);
    }
  }, [isOpen]);

  return (
    <div style={surfaceOverlayStoriesStyles.lifecycleCheatsheetRoot}>
      <p style={surfaceOverlayStoriesStyles.paragraphReset}>
        Cheatsheet режима lifecycle для drawer: переключите флаги и откройте панель.
      </p>
      <div style={surfaceOverlayStoriesStyles.controlsRow}>
        <Button
          type="button"
          variant={lazyModeEnabled ? ButtonVariant.PRIMARY : ButtonVariant.OUTLINE}
          onClick={() => setLazyModeEnabled((previousLazyModeEnabled) => !previousLazyModeEnabled)}
        >
          lazy: {String(lazyModeEnabled)}
        </Button>
        <Button
          type="button"
          variant={unmountOnCloseEnabled ? ButtonVariant.PRIMARY : ButtonVariant.OUTLINE}
          onClick={() =>
            setUnmountOnCloseEnabled(
              (previousUnmountOnCloseEnabled) => !previousUnmountOnCloseEnabled,
            )
          }
        >
          unmountOnClose: {String(unmountOnCloseEnabled)}
        </Button>
        <Button type="button" onClick={() => setIsOpen(true)}>
          Open drawer
        </Button>
      </div>
      <p style={surfaceOverlayStoriesStyles.mutedOpenCountCaption}>
        Открытий в текущей сессии: {openCount}
      </p>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        placement="right"
        title="Lifecycle cheatsheet"
        lazy={lazyModeEnabled}
        unmountOnClose={unmountOnCloseEnabled}
        overlayVariant="blur"
      >
        <p>
          Текущая конфигурация: lazy={String(lazyModeEnabled)}, unmountOnClose=
          {String(unmountOnCloseEnabled)}.
        </p>
        <Button type="button" onClick={() => setIsOpen(false)}>
          Close
        </Button>
      </Drawer>
    </div>
  );
};

export const LifecycleCheatsheet: Story = {
  render: () => <LifecycleCheatsheetDrawerDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Cheatsheet для lifecycle-параметров `lazy` и `unmountOnClose`: интерактивное сравнение поведения drawer в одном примере.',
      },
    },
  },
};
