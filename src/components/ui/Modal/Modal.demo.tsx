import React from 'react';
import { Modal } from './index';
import { Button } from '../buttons/Button';
import { ButtonVariant } from '../../../types/ui';
import { modalStoriesStyles } from './Modal.stories.styles';

export const KeepMountedWithLazyInitDemo = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [renderCounter, setRenderCounter] = React.useState(0);

  React.useEffect(() => {
    if (isOpen) {
      setRenderCounter((previousCounterValue) => previousCounterValue + 1);
    }
  }, [isOpen]);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open keep-mounted modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Keep mounted + lazy init"
        description="После первого открытия модальное окно остаётся в DOM при закрытии, чтобы сохранять локальное состояние."
        unmountOnClose={false}
        lazy
        buttons={[
          {
            label: 'Close',
            variant: ButtonVariant.PRIMARY,
            onClick: () => setIsOpen(false),
          },
        ]}
      >
        <p>Количество открытий: {renderCounter}</p>
      </Modal>
    </>
  );
};

export const LifecycleCheatsheetDemo = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [lazyModeEnabled, setLazyModeEnabled] = React.useState(true);
  const [unmountOnCloseEnabled, setUnmountOnCloseEnabled] = React.useState(true);
  const [openCount, setOpenCount] = React.useState(0);

  React.useEffect(() => {
    if (isOpen) {
      setOpenCount((previousOpenCountValue) => previousOpenCountValue + 1);
    }
  }, [isOpen]);

  return (
    <div style={modalStoriesStyles.lifecycleRoot}>
      <p style={modalStoriesStyles.paragraphNoMargin}>
        Быстрая памятка: переключите режимы и откройте модалку, чтобы увидеть поведение lifecycle.
      </p>
      <div style={modalStoriesStyles.controlsRow}>
        <Button
          variant={lazyModeEnabled ? ButtonVariant.PRIMARY : ButtonVariant.OUTLINE}
          onClick={() => setLazyModeEnabled((previousLazyModeEnabled) => !previousLazyModeEnabled)}
        >
          lazy: {String(lazyModeEnabled)}
        </Button>
        <Button
          variant={unmountOnCloseEnabled ? ButtonVariant.PRIMARY : ButtonVariant.OUTLINE}
          onClick={() =>
            setUnmountOnCloseEnabled(
              (previousUnmountOnCloseEnabled) => !previousUnmountOnCloseEnabled,
            )
          }
        >
          unmountOnClose: {String(unmountOnCloseEnabled)}
        </Button>
        <Button onClick={() => setIsOpen(true)}>Open modal</Button>
      </div>
      <p style={modalStoriesStyles.mutedParagraph}>
        Открытий в текущей сессии: {openCount}. Сохранение внутреннего состояния видно при
        `unmountOnClose=false`.
      </p>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Lifecycle cheatsheet"
        description="Используйте переключатели lazy и unmountOnClose, чтобы увидеть разницу между режимами."
        lazy={lazyModeEnabled}
        unmountOnClose={unmountOnCloseEnabled}
        buttons={[
          {
            label: 'Close',
            variant: ButtonVariant.PRIMARY,
            onClick: () => setIsOpen(false),
          },
        ]}
      >
        <p style={modalStoriesStyles.paragraphNoMargin}>
          Текущая конфигурация: lazy={String(lazyModeEnabled)}, unmountOnClose=
          {String(unmountOnCloseEnabled)}.
        </p>
      </Modal>
    </div>
  );
};
