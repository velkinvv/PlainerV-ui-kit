import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Sheet } from './Sheet';
import { Button } from '../buttons/Button';
import { ButtonVariant, type SheetPlacement } from '../../../types/ui';
import { DOC_SHEET } from '@/components/ui/storyDocs/uiKitDocs';
import { surfaceOverlayStoriesStyles } from '@/handlers/surfaceOverlayStories.styles';

const meta: Meta<typeof Sheet> = {
  title: 'UI Kit/Surfaces/Sheet',
  component: Sheet,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: DOC_SHEET,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Сторона (по умолчанию bottom)',
      table: {
        type: { summary: 'left, right, top, bottom' },
        defaultValue: { summary: 'bottom' },
      },
    },
    unmountOnClose: {
      control: { type: 'boolean' },
      description:
        'Размонтировать панель после закрытия. По умолчанию true: закрытый sheet удаляется из DOM.',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    lazy: {
      control: { type: 'boolean' },
      description:
        'Ленивая инициализация: sheet монтируется только после первого открытия.',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const SheetDemo = ({ placement }: { placement: SheetPlacement }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={surfaceOverlayStoriesStyles.paddedRoot}>
      <Button type="button" onClick={() => setOpen(true)}>
        Открыть sheet ({placement})
      </Button>
      <Sheet
        isOpen={open}
        onClose={() => setOpen(false)}
        placement={placement}
        title="Действия"
        overlayVariant="blur"
      >
        <p>Содержимое sheet.</p>
        <Button type="button" onClick={() => setOpen(false)}>
          Закрыть
        </Button>
      </Sheet>
    </div>
  );
};

export const BottomDefault: Story = {
  render: () => <SheetDemo placement="bottom" />,
};

export const Right: Story = {
  render: () => <SheetDemo placement="right" />,
};

export const Top: Story = {
  render: () => <SheetDemo placement="top" />,
};

const KeepMountedWithLazyInitSheetDemo = () => {
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
        Open keep-mounted sheet
      </Button>
      <Sheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        placement="bottom"
        title="Keep mounted + lazy init"
        unmountOnClose={false}
        lazy
        overlayVariant="dark"
      >
        <p>Количество открытий: {openCount}</p>
        <p>После первого открытия лист остаётся в DOM и сохраняет локальное состояние.</p>
        <Button type="button" onClick={() => setIsOpen(false)}>
          Close
        </Button>
      </Sheet>
    </div>
  );
};

export const KeepMountedWithLazyInit: Story = {
  render: () => <KeepMountedWithLazyInitSheetDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Демонстрация lifecycle-режима: sheet лениво монтируется при первом открытии и остаётся в DOM после закрытия (`unmountOnClose=false`).',
      },
    },
  },
};

const LifecycleCheatsheetSheetDemo = () => {
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
        Cheatsheet режима lifecycle для sheet: переключите флаги и откройте лист.
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
            setUnmountOnCloseEnabled((previousUnmountOnCloseEnabled) => !previousUnmountOnCloseEnabled)
          }
        >
          unmountOnClose: {String(unmountOnCloseEnabled)}
        </Button>
        <Button type="button" onClick={() => setIsOpen(true)}>
          Open sheet
        </Button>
      </div>
      <p style={surfaceOverlayStoriesStyles.mutedOpenCountCaption}>
        Открытий в текущей сессии: {openCount}
      </p>
      <Sheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        placement="bottom"
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
      </Sheet>
    </div>
  );
};

export const LifecycleCheatsheet: Story = {
  render: () => <LifecycleCheatsheetSheetDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Cheatsheet для lifecycle-параметров `lazy` и `unmountOnClose`: интерактивное сравнение поведения sheet в одном примере.',
      },
    },
  },
};

