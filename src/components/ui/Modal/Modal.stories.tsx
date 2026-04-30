import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal, useModal } from './index';
import { Button } from '../buttons/Button';
import { Icon } from '../Icon/Icon';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { ButtonVariant } from '../../../types/ui';
import { Size, IconSize, ModalSize } from '../../../types/sizes';
import {
  ButtonsSlotGrid,
  CenteredActionRow,
  CenteredContentPadding24,
  ColumnGap12,
  ContentPadding24,
  DashedContainer,
  EndAlignedActions,
  FocusContentStack,
  FocusInput,
  FocusInputLabel,
  FooterHintText,
  FormActionsRow,
  FormField,
  FormFieldLabel,
  FormInput,
  FormSelect,
  FormStack,
  FormTextArea,
  InnerOverlayContainer,
  ModalContentActions,
  PortalArea,
  ReadableParagraph,
  RelativePortalContainer,
  RowGap8,
  SizesButtonsWrap,
  VariantLabelButton,
  WarningIconCircle,
} from './Modal.stories.style';

const meta: Meta<typeof Modal> = {
  title: 'UI Kit/Surfaces/Modal',
  component: Modal,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Компонент модального окна для отображения важной информации. Поддерживает единый lifecycle API: `isOpen`, `unmountOnClose` (по умолчанию `true`) и `lazy` (по умолчанию `true`).',
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Заголовок модального окна',
    },
    description: {
      control: { type: 'text' },
      description: 'Описание/текст модального окна',
    },
    content: {
      control: { type: 'object' },
      description: 'Кастомный контент (ReactNode) для модального окна',
    },
    container: {
      control: false,
      description:
        'DOM контейнер, в который будет смонтировано модальное окно (по умолчанию document.body)',
      table: {
        type: { summary: 'DOM-элемент или null; если не задан — используется document.body' },
      },
    },
    buttons: {
      control: { type: 'object' },
      description:
        'Массив кнопок для модального окна. Каждая кнопка должна содержать label (текст кнопки), onClick (обработчик клика) и опционально variant, size, iconStart, iconEnd, disabled, loading и другие пропсы Button',
    },
    mobile: {
      control: { type: 'boolean' },
      description: 'Переключение мобильной версии модального окна (полноэкранное, без скруглений)',
    },
    overlayStyledCss: {
      control: { type: 'object' },
      description:
        'Миксин styled-components для кастомизации стилей оверлея (подложки) модального окна',
    },
    overlayClassName: {
      control: { type: 'text' },
      description: 'CSS-класс, который будет добавлен к подложке модального окна',
    },
    overlayVariant: {
      control: { type: 'select' },
      options: ['default', 'blur', 'dark', 'frosted'],
      description: 'Предустановленные стили подложки: стандарт, блюр, тёмный или “frosted glass”.',
      table: {
        type: { summary: 'default, blur, dark, frosted' },
      },
    },
    overlayStyle: {
      control: { type: 'object' },
      description: 'Inline-стили для подложки модального окна',
    },
    initialFocusRef: {
      control: false,
      description: 'Ref элемента, который должен получить фокус при открытии модального окна',
    },
    initialFocusSelector: {
      control: { type: 'text' },
      description: 'CSS-селектор элемента, который должен получить фокус после открытия',
    },
    animationPreset: {
      control: { type: 'select' },
      options: ['default', 'fade', 'slideUp'],
      description: 'Пресет анимации появления модального окна',
      table: {
        type: { summary: 'default, fade, slideUp' },
      },
    },
    animationConfig: {
      control: false,
      description: 'Переопределение motion-анимации (initial/animate/exit/transition)',
    },
    headerIcon: {
      control: false,
      description: 'Иконка слева от заголовка модального окна',
    },
    contentIcon: {
      control: false,
      description: 'Иконка в области контента',
    },
    buttonsIcon: {
      control: false,
      description: 'Иконка в контейнере кнопок',
    },
    headerSlot: {
      control: false,
      description: 'Полностью переопределяет зону заголовка',
    },
    footerSlot: {
      control: false,
      description: 'Полностью переопределяет футер перед кнопками',
    },
    buttonsSlot: {
      control: false,
      description: 'Позволяет передать готовый ReactNode вместо массива buttons',
    },
    portalTargetId: {
      control: { type: 'text' },
      description: 'ID DOM-узла для рендера модального окна, альтернатива container',
    },
    portalZIndex: {
      control: { type: 'number' },
      description: 'Принудительно выставляет z-index у подложки',
    },
    modalVariant: {
      control: { type: 'select' },
      options: ['default', 'danger', 'success', 'info'],
      description: 'Варианты оформления заголовка/иконок модального окна',
      table: {
        type: { summary: 'default, danger, success, info' },
      },
    },
    size: {
      control: { type: 'select' },
      options: Object.values(ModalSize),
      description: 'Размер модального окна (ширина и высота по токенам темы)',
      table: {
        type: { summary: 'ModalSize: XS, SM, MD, LG, FULL' },
        defaultValue: { summary: 'MD' },
      },
    },
    closeOnOverlayClick: {
      control: { type: 'boolean' },
      description:
        'Включает логику закрытия при клике по оверлею. Срабатывает только если разрешён `closeOnOutsideClick`.',
    },
    closeOnEscape: {
      control: { type: 'boolean' },
      description: 'Закрытие при нажатии Escape',
    },
    closeOnEscapeKeyDown: {
      control: { type: 'boolean' },
      description: 'Закрытие при нажатии Escape (обработчик keydown)',
    },
    closeOnOutsideClick: {
      control: { type: 'boolean' },
      description:
        'Глобально разрешает или запрещает закрытие модального окна при клике вне контента (в том числе по оверлею).',
    },
    showCloseButton: {
      control: { type: 'boolean' },
      description: 'Показать кнопку закрытия',
    },
    unmountOnClose: {
      control: { type: 'boolean' },
      description:
        'Размонтировать модальное окно после закрытия. По умолчанию true: закрытое окно удаляется из DOM.',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    lazy: {
      control: { type: 'boolean' },
      description:
        'Ленивая инициализация: компонент модалки монтируется только после первого открытия.',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ModalWrapper = ({ children, ...props }: any) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} {...props}>
        {children}
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Modal Window"
          description="Lorem ipsum dolor sit amet consectetur. Sit enim pretium ac eu porttitor interdum eu leo."
          buttons={[
            {
              label: 'Button',
              variant: ButtonVariant.OUTLINE,
              onClick: () => {
                console.log('Button clicked');
                setIsOpen(false);
              },
            },
            {
              label: 'Okey',
              variant: ButtonVariant.PRIMARY,
              onClick: () => {
                console.log('Okey clicked');
                setIsOpen(false);
              },
            },
          ]}
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Основной пример модального окна с заголовком, описанием и кнопками действий. Кнопки передаются через проп `buttons` как массив объектов с пропсами кнопок.',
      },
    },
  },
};

export const WithButtons: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal with Buttons</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Modal Window"
          description="Пример модального окна с кнопками действий"
          buttons={[
            {
              label: 'Cancel',
              variant: ButtonVariant.OUTLINE,
              onClick: () => {
                console.log('Cancel clicked');
                setIsOpen(false);
              },
            },
            {
              label: 'Confirm',
              variant: ButtonVariant.PRIMARY,
              onClick: () => {
                console.log('Confirm clicked');
                setIsOpen(false);
              },
            },
          ]}
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Пример использования модального окна с кнопками действий через проп `buttons`. Кнопки отображаются в контейнере справа с отступом 8px между ними.',
      },
    },
  },
};

export const WithButtonsAndIcons: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal with Icon Buttons</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Modal Window"
          description="Пример модального окна с кнопками, содержащими иконки"
          buttons={[
            {
              label: 'Delete',
              variant: ButtonVariant.OUTLINE,
              iconStart: <Icon name="IconPlainerClose" size={IconSize.SM} />,
              onClick: () => {
                console.log('Delete clicked');
                setIsOpen(false);
              },
            },
            {
              label: 'Save',
              variant: ButtonVariant.PRIMARY,
              iconEnd: <Icon name="IconPlainerCheck" size={IconSize.SM} />,
              onClick: () => {
                console.log('Save clicked');
                setIsOpen(false);
              },
            },
          ]}
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Пример использования модального окна с кнопками, содержащими иконки. Можно использовать `iconStart` для иконки слева от текста и `iconEnd` для иконки справа.',
      },
    },
  },
};

export const WithContent: Story = {
  render: () => (
    <ModalWrapper
      title="Default Modal"
      content={
        <div>
          <p>This is a basic modal with default settings.</p>
          <ModalContentActions>
            <Button
              variant={ButtonVariant.OUTLINE}
              onClick={() => {
                /* Пустая функция для демонстрации */
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                /* Пустая функция для демонстрации */
              }}
            >
              Confirm
            </Button>
          </ModalContentActions>
        </div>
      }
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Пример использования модального окна с кастомным контентом через проп content (ReactNode)',
      },
    },
  },
};

export const WithChildren: Story = {
  render: () => (
    <ModalWrapper title="Default Modal">
      <div>
        <p>This is a basic modal with default settings.</p>
        <ModalContentActions>
          <Button
            variant={ButtonVariant.OUTLINE}
            onClick={() => {
              /* Пустая функция для демонстрации */
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              /* Пустая функция для демонстрации */
            }}
          >
            Confirm
          </Button>
        </ModalContentActions>
      </div>
    </ModalWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Пример использования модального окна с кастомным контентом через children',
      },
    },
  },
};

export const Small: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Small Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Small Modal"
          description="This is a small modal for simple confirmations."
          size={ModalSize.SM}
          buttons={[
            {
              label: 'Cancel',
              variant: ButtonVariant.OUTLINE,
              size: Size.SM,
              onClick: () => {
                console.log('Cancel clicked');
                setIsOpen(false);
              },
            },
            {
              label: 'OK',
              variant: ButtonVariant.PRIMARY,
              size: Size.SM,
              onClick: () => {
                console.log('OK clicked');
                setIsOpen(false);
              },
            },
          ]}
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Пример маленького модального окна (SM) с использованием пропсов',
      },
    },
  },
};

export const Large: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Large Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Large Modal"
          description="This is a large modal for complex content. It can accommodate more complex layouts and content."
          size={ModalSize.LG}
          buttons={[
            {
              label: 'Cancel',
              variant: ButtonVariant.OUTLINE,
              onClick: () => {
                console.log('Cancel clicked');
                setIsOpen(false);
              },
            },
            {
              label: 'Save Changes',
              variant: ButtonVariant.PRIMARY,
              onClick: () => {
                console.log('Save Changes clicked');
                setIsOpen(false);
              },
            },
          ]}
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Пример большого модального окна (LG) с использованием пропсов',
      },
    },
  },
};

export const FullScreen: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Full Screen Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Full Screen Modal"
          description="This modal takes up the full screen. It can contain a lot of content and will scroll if needed."
          size={ModalSize.FULL}
          buttons={[
            {
              label: 'Cancel',
              variant: ButtonVariant.OUTLINE,
              onClick: () => {
                console.log('Cancel clicked');
                setIsOpen(false);
              },
            },
            {
              label: 'Save',
              variant: ButtonVariant.PRIMARY,
              onClick: () => {
                console.log('Save clicked');
                setIsOpen(false);
              },
            },
          ]}
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Пример полноэкранного модального окна (FULL) с использованием пропсов',
      },
    },
  },
};

export const MobileVersion: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Mobile Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Mobile Modal"
          description="Мобильная версия модального окна занимает всю высоту экрана и не имеет скруглений."
          mobile
          buttons={[
            {
              label: 'Закрыть',
              variant: ButtonVariant.PRIMARY,
              onClick: () => setIsOpen(false),
            },
          ]}
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Пример мобильной версии модального окна с пропом `mobile`.',
      },
    },
  },
};

export const DisableEscapeKeyDown: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal (Escape disabled)</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Escape Disabled"
          description="Нажатие клавиши Escape не закрывает модальное окно. Закройте окно кнопкой или кликом по фону."
          closeOnEscape
          closeOnEscapeKeyDown={false}
          buttons={[
            {
              label: 'Close',
              variant: ButtonVariant.PRIMARY,
              onClick: () => setIsOpen(false),
            },
          ]}
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Пример использования пропа `closeOnEscapeKeyDown`. При значении `false` нажатие Escape не закрывает модальное окно.',
      },
    },
  },
};

export const DisableOutsideClick: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal (outside click disabled)</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Outside click disabled"
          description="Клик по фону не закроет модальное окно. Используйте кнопку для закрытия."
          closeOnOverlayClick
          closeOnOutsideClick={false}
          buttons={[
            {
              label: 'Close',
              variant: ButtonVariant.PRIMARY,
              onClick: () => setIsOpen(false),
            },
          ]}
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Пример использования пропа `closeOnOutsideClick`. При значении `false` клик по фону не закрывает модальное окно.',
      },
    },
  },
};

export const FocusManagement: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const primaryActionRef = React.useRef<HTMLButtonElement>(null);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Accessible Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Focus management"
          description="После открытия модального окна фокус автоматически переходит на основное действие."
          initialFocusRef={primaryActionRef}
          buttons={[
            {
              label: 'Cancel',
              variant: ButtonVariant.OUTLINE,
              onClick: () => setIsOpen(false),
            },
          ]}
        >
          <FocusContentStack>
            <FocusInputLabel>
              Email
              <FocusInput type="email" placeholder="user@example.com" />
            </FocusInputLabel>
            <Button ref={primaryActionRef} variant={ButtonVariant.PRIMARY}>
              Continue
            </Button>
          </FocusContentStack>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Пример управления фокусом: проп `initialFocusRef` указывает элемент, который получает фокус после открытия модалки.',
      },
    },
  },
};

export const IconsPlacement: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal with icons</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Modal with icons"
          description="Иконки можно выводить в заголовке, контенте и рядом с кнопками."
          headerIcon={<Icon name="IconPlainerCheck" size={IconSize.SM} />}
          contentIcon={<Icon name="IconPlainerPlus" size={IconSize.MD} />}
          buttonsIcon={<Icon name="IconPlainerArrowRight" size={IconSize.SM} />}
          buttons={[
            {
              label: 'Close',
              variant: ButtonVariant.PRIMARY,
              onClick: () => setIsOpen(false),
            },
          ]}
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Пример использования пропсов `headerIcon`, `contentIcon`, `buttonsIcon` для визуального акцента.',
      },
    },
  },
};

export const AsyncActions: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const simulateAsync = async () =>
      new Promise<void>((resolve) => {
        setTimeout(resolve, 1500);
      });

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Async Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Async actions"
          description="Кнопки могут выполнять асинхронные операции и показывать состояние загрузки."
          buttons={[
            {
              label: 'Cancel',
              variant: ButtonVariant.OUTLINE,
              onClick: () => setIsOpen(false),
              placement: 'secondary',
            },
            {
              label: 'Save',
              loadingLabel: 'Saving...',
              variant: ButtonVariant.PRIMARY,
              placement: 'primary',
              asyncOnClick: async () => {
                await simulateAsync();
              },
              onClick: () => setIsOpen(false),
            },
          ]}
        >
          <p>
            Имитация запроса занимает 1.5 секунды, кнопка блокируется и показывает текст Saving...
          </p>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Демонстрация `placement`, `asyncOnClick`, `loadingLabel` для кнопок.',
      },
    },
  },
};

export const ButtonsSlotExample: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Buttons Slot Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Custom buttons slot"
          description="Полностью кастомная зона кнопок с произвольной сеткой."
          buttonsSlot={
            <ButtonsSlotGrid>
              <Button variant={ButtonVariant.OUTLINE} onClick={() => setIsOpen(false)}>
                Skip
              </Button>
              <Button
                variant={ButtonVariant.PRIMARY}
                onClick={() => {
                  console.log('Custom action');
                  setIsOpen(false);
                }}
              >
                Continue
              </Button>
            </ButtonsSlotGrid>
          }
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Пример использования `buttonsSlot` для произвольной кастомизации.',
      },
    },
  },
};

export const ModalVariants: Story = {
  render: () => {
    const [variant, setVariant] = React.useState<'default' | 'danger' | 'success' | 'info'>(
      'danger',
    );
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <RowGap8>
        {['default', 'danger', 'success', 'info'].map((option) => (
          <VariantLabelButton
            key={option}
            $isActive={variant === option}
            variant={variant === option ? ButtonVariant.PRIMARY : ButtonVariant.SECONDARY}
            onClick={() => {
              setVariant(option as typeof variant);
              setIsOpen(true);
            }}
          >
            {option}
          </VariantLabelButton>
        ))}
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Modal variant"
          description="Заголовок и иконки подстраиваются под выбранный вариант."
          modalVariant={variant}
          headerIcon={<Icon name="IconPlainerCheck" size={IconSize.SM} />}
          contentIcon={<Icon name="IconPlainerPlus" size={IconSize.MD} />}
          buttons={[
            {
              label: 'Close',
              variant: ButtonVariant.PRIMARY,
              onClick: () => setIsOpen(false),
            },
          ]}
        />
      </RowGap8>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Пример использования `modalVariant`.',
      },
    },
  },
};

export const PortalTarget: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <RelativePortalContainer>
        <PortalArea id="modal-portal-area" />
        <Button onClick={() => setIsOpen(true)}>Open in portal target</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Portal target"
          description="Модальное окно монтируется в DOM-узел с id modal-portal-area."
          portalTargetId="modal-portal-area"
          portalZIndex={1200}
          buttons={[
            {
              label: 'Close',
              variant: ButtonVariant.PRIMARY,
              onClick: () => setIsOpen(false),
            },
          ]}
        />
      </RelativePortalContainer>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Использование `portalTargetId` и `portalZIndex`.',
      },
    },
  },
};

export const BestPractices: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const submitBtnRef = React.useRef<HTMLButtonElement>(null);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Best Practices</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Form example"
          description="Комбинация рекомендаций: initialFocusSelector, async кнопки, кастомный футер."
          initialFocusRef={submitBtnRef}
          modalVariant="info"
          footerSlot={<FooterHintText>Нажимая подтвердить, вы соглашаетесь с условиями.</FooterHintText>}
          buttons={[
            {
              label: 'Отменить',
              variant: ButtonVariant.OUTLINE,
              onClick: () => setIsOpen(false),
              placement: 'secondary',
            },
          ]}
          buttonsSlot={
            <EndAlignedActions>
              <Button variant={ButtonVariant.OUTLINE} onClick={() => setIsOpen(false)}>
                Назад
              </Button>
              <Button
                ref={submitBtnRef}
                variant={ButtonVariant.PRIMARY}
                onClick={() => setIsOpen(false)}
              >
                Подтвердить
              </Button>
            </EndAlignedActions>
          }
        >
          <FocusInputLabel>
            Название
            <FocusInput type="text" placeholder="Введите текст" />
          </FocusInputLabel>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Секция с рекомендациями: управление фокусом, кастомные слоты, дополнительные подсказки и работа с формами.',
      },
    },
  },
};

export const WithoutCloseButton: Story = {
  render: () => (
    <ModalWrapper showCloseButton={false}>
      <ContentPadding24>
        <h2>Modal without Close Button</h2>
        <p>This modal doesn&apos;t have a close button in the header.</p>
        <p>You can only close it using the Cancel button or by clicking outside.</p>
        <ModalContentActions>
          <Button
            variant={ButtonVariant.OUTLINE}
            onClick={() => {
              /* Пустая функция для демонстрации */
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              /* Пустая функция для демонстрации */
            }}
          >
            Continue
          </Button>
        </ModalContentActions>
      </ContentPadding24>
    </ModalWrapper>
  ),
};

export const ConfirmationModal: Story = {
  render: () => (
    <ModalWrapper size={ModalSize.SM}>
      <CenteredContentPadding24>
        <WarningIconCircle>
          ⚠️
        </WarningIconCircle>
        <h3>Confirm Action</h3>
        <p>Are you sure you want to delete this item? This action cannot be undone.</p>
        <CenteredActionRow>
          <Button
            variant={ButtonVariant.OUTLINE}
            onClick={() => {
              /* Пустая функция для демонстрации */
            }}
          >
            Cancel
          </Button>
          <Button
            variant={ButtonVariant.DANGER}
            onClick={() => {
              /* Пустая функция для демонстрации */
            }}
          >
            Delete
          </Button>
        </CenteredActionRow>
      </CenteredContentPadding24>
    </ModalWrapper>
  ),
};

export const FormModal: Story = {
  render: () => (
    <ModalWrapper size={ModalSize.MD}>
      <ContentPadding24>
        <h2>Create New Item</h2>
        <FormStack>
          <FormField>
            <FormFieldLabel>Name</FormFieldLabel>
            <FormInput type="text" placeholder="Enter name" />
          </FormField>
          <FormField>
            <FormFieldLabel>Description</FormFieldLabel>
            <FormTextArea placeholder="Enter description" />
          </FormField>
          <FormField>
            <FormFieldLabel>Category</FormFieldLabel>
            <FormSelect>
              <option>Select category</option>
              <option>Category 1</option>
              <option>Category 2</option>
              <option>Category 3</option>
            </FormSelect>
          </FormField>
          <FormActionsRow>
            <Button
              variant={ButtonVariant.OUTLINE}
              onClick={() => {
                /* Пустая функция для демонстрации */
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                /* Пустая функция для демонстрации */
              }}
            >
              Create Item
            </Button>
          </FormActionsRow>
        </FormStack>
      </ContentPadding24>
    </ModalWrapper>
  ),
};

export const AllSizes: Story = {
  render: () => {
    const [activeModal, setActiveModal] = React.useState<ModalSize | null>(null);

    const sizeOptions: { label: string; size: ModalSize; description: string }[] = [
      {
        label: 'Small',
        size: ModalSize.SM,
        description: 'Компактное модальное окно для подтверждений',
      },
      {
        label: 'Medium',
        size: ModalSize.MD,
        description: 'Стандартное модальное окно',
      },
      {
        label: 'Large',
        size: ModalSize.LG,
        description: 'Большое модальное окно для сложного контента',
      },
      {
        label: 'Full Screen',
        size: ModalSize.FULL,
        description: 'Полноэкранное модальное окно',
      },
    ];

    const openModal = (size: ModalSize) => setActiveModal(size);
    const closeModal = () => setActiveModal(null);

    const activeConfig = sizeOptions.find((option) => option.size === activeModal);

    return (
      <SizesButtonsWrap>
        {sizeOptions.map((option) => (
          <Button key={option.size} onClick={() => openModal(option.size)}>
            {option.label}
          </Button>
        ))}

        {activeModal && activeConfig && (
          <Modal
            isOpen
            onClose={closeModal}
            size={activeModal}
            title={`${activeConfig.label} Modal`}
            description={activeConfig.description}
            buttons={[
              {
                label: 'Close',
                variant: ButtonVariant.OUTLINE,
                onClick: closeModal,
              },
            ]}
          />
        )}
      </SizesButtonsWrap>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

export const CustomContainer: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    return (
      <DashedContainer>
        <InnerOverlayContainer ref={containerRef} />

        <Button onClick={() => setIsOpen(true)}>Open Modal in Custom Container</Button>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Modal in custom container"
          description="Модальное окно закреплено внутри выделенной области и не выходит за её границы."
          container={containerRef.current ?? undefined}
          buttons={[
            {
              label: 'Close',
              variant: ButtonVariant.PRIMARY,
              onClick: () => setIsOpen(false),
            },
          ]}
        />
      </DashedContainer>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Пример использования пропа `container` для размещения модального окна в произвольном DOM-элементе.',
      },
    },
  },
};

export const CustomOverlayStyles: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal with custom overlay</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Custom Overlay"
          description="Оверлей модального окна стилизован через проп overlayStyledCss."
          overlayStyledCss={`
            background: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(12px);
            padding: 48px;
          `}
          overlayClassName="modal-overlay--dark"
          overlayStyle={{ border: '2px solid rgba(255, 255, 255, 0.4)' }}
          buttons={[
            {
              label: 'Close',
              variant: ButtonVariant.PRIMARY,
              onClick: () => setIsOpen(false),
            },
          ]}
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Пример использования пропа `overlayStyledCss` для кастомизации подложки модального окна.',
      },
    },
  },
};

export const OverlayVariants: Story = {
  render: () => {
    const [variant, setVariant] = React.useState<'default' | 'blur' | 'dark' | 'frosted'>('blur');
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <ColumnGap12>
        <RowGap8>
          {['default', 'blur', 'dark', 'frosted'].map((option) => (
            <Button
              key={option}
              variant={variant === option ? ButtonVariant.PRIMARY : ButtonVariant.SECONDARY}
              onClick={() => {
                setVariant(option as typeof variant);
                setIsOpen(true);
              }}
            >
              {option}
            </Button>
          ))}
        </RowGap8>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Overlay variants"
          description="Выберите предустановленный стиль подложки. Можно комбинировать с overlayStyledCss."
          overlayVariant={variant}
          buttons={[
            {
              label: 'Close',
              variant: ButtonVariant.PRIMARY,
              onClick: () => setIsOpen(false),
            },
          ]}
        />
      </ColumnGap12>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Пример использования пропа `overlayVariant`. Доступны варианты: default, blur, dark, frosted.',
      },
    },
  },
};

export const AnimationPresets: Story = {
  render: () => {
    const [preset, setPreset] = React.useState<'default' | 'fade' | 'slideUp'>('slideUp');
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <ColumnGap12>
        <RowGap8>
          {['default', 'fade', 'slideUp'].map((option) => (
            <Button
              key={option}
              variant={preset === option ? ButtonVariant.PRIMARY : ButtonVariant.SECONDARY}
              onClick={() => {
                setPreset(option as typeof preset);
                setIsOpen(true);
              }}
            >
              {option}
            </Button>
          ))}
        </RowGap8>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Animation presets"
          description="Пример переключения предустановленных анимаций."
          animationPreset={preset}
          buttons={[
            {
              label: 'Close',
              variant: ButtonVariant.PRIMARY,
              onClick: () => setIsOpen(false),
            },
          ]}
        />
      </ColumnGap12>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Пример использования пропа `animationPreset` с вариантами `default`, `fade`, `slideUp`.',
      },
    },
  },
};

export const UseModalHook: Story = {
  render: () => {
    const modal = useModal();

    return (
      <>
        <Button onClick={modal.open}>Open via hook</Button>
        <Modal
          isOpen={modal.isOpen}
          onClose={modal.close}
          title="Hook controlled modal"
          description="Состояние модального окна управляется пользовательским хуком useModal."
          buttons={[
            {
              label: 'Toggle',
              variant: ButtonVariant.OUTLINE,
              onClick: modal.toggle,
            },
            {
              label: 'Close',
              variant: ButtonVariant.PRIMARY,
              onClick: modal.close,
            },
          ]}
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Пример использования хука `useModal` для управления состоянием извне.',
      },
    },
  },
};

const KeepMountedWithLazyInitDemo = () => {
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

export const KeepMountedWithLazyInit: Story = {
  render: () => <KeepMountedWithLazyInitDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Компромиссный режим жизненного цикла: lazy-монтирование после первого открытия + сохранение дерева (`unmountOnClose=false`) при последующих закрытиях.',
      },
    },
  },
};

const LifecycleCheatsheetDemo = () => {
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 760 }}>
      <p style={{ margin: 0 }}>
        Быстрая памятка: переключите режимы и откройте модалку, чтобы увидеть поведение lifecycle.
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Button
          variant={lazyModeEnabled ? ButtonVariant.PRIMARY : ButtonVariant.OUTLINE}
          onClick={() => setLazyModeEnabled((previousLazyModeEnabled) => !previousLazyModeEnabled)}
        >
          lazy: {String(lazyModeEnabled)}
        </Button>
        <Button
          variant={unmountOnCloseEnabled ? ButtonVariant.PRIMARY : ButtonVariant.OUTLINE}
          onClick={() =>
            setUnmountOnCloseEnabled((previousUnmountOnCloseEnabled) => !previousUnmountOnCloseEnabled)
          }
        >
          unmountOnClose: {String(unmountOnCloseEnabled)}
        </Button>
        <Button onClick={() => setIsOpen(true)}>Open modal</Button>
      </div>
      <p style={{ margin: 0, color: '#6b7280' }}>
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
        <p style={{ margin: 0 }}>
          Текущая конфигурация: lazy={String(lazyModeEnabled)}, unmountOnClose=
          {String(unmountOnCloseEnabled)}.
        </p>
      </Modal>
    </div>
  );
};

export const LifecycleCheatsheet: Story = {
  render: () => <LifecycleCheatsheetDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Cheatsheet для lifecycle-параметров `lazy` и `unmountOnClose`: быстрое сравнение всех режимов в одном интерактивном примере.',
      },
    },
  },
};

