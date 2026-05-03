import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ButtonGroup } from './ButtonGroup';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { ThemeProvider } from '../../../../themes/ThemeProvider';
import { ButtonVariant } from '@/types/ui';
import { IconSize, Size } from '@/types/sizes';
import { Icon } from '../../Icon/Icon';
import { DOC_BUTTON_GROUP } from '@/components/ui/storyDocs/uiKitDocs';

interface SelectableButtonGroupStoryProps extends React.ComponentProps<typeof ButtonGroup> {
  children: React.ReactNode;
  initialActiveButtonIndex?: number;
}

/**
 * Внутренний шаблон для историй: включает переключение активной кнопки по клику.
 * @param children - Дочерние кнопки группы.
 * @param initialActiveButtonIndex - Изначально активная кнопка.
 * @param buttonGroupProps - Остальные пропсы `ButtonGroup`.
 */
const SelectableButtonGroupStory = ({
  children,
  initialActiveButtonIndex = 0,
  ...buttonGroupProps
}: SelectableButtonGroupStoryProps) => {
  const [activeButtonIndex, setActiveButtonIndex] = React.useState(initialActiveButtonIndex);

  return (
    <ButtonGroup
      selectable
      activeIndex={activeButtonIndex}
      onActiveIndexChange={setActiveButtonIndex}
      {...buttonGroupProps}
    >
      {children}
    </ButtonGroup>
  );
};

const meta: Meta<typeof ButtonGroup> = {
  title: 'UI Kit/Inputs/ButtonGroup',
  component: ButtonGroup,
  args: {
    attached: true,
    size: Size.MD,
    attachedShape: 'segment',
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_BUTTON_GROUP,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      table: {
        type: { summary: 'horizontal или vertical' },
      },
    },
    attached: {
      control: 'boolean',
      description: 'Склеенная группа: общий радиус и стык −1px',
      table: { type: { summary: 'boolean' } },
    },
    size: {
      control: 'select',
      options: [Size.XS, Size.SM, Size.MD, Size.LG, Size.XL],
      description: 'Внешний радиус сегмента (согласуйте с size у кнопок)',
      table: {
        type: { summary: 'Size: XS, SM, MD, LG, XL' },
      },
    },
    attachedShape: {
      control: 'radio',
      options: ['segment', 'pill'],
      description: 'Форма склеенной группы',
      table: {
        type: { summary: 'segment или pill' },
      },
    },
    fullWidth: {
      control: 'boolean',
      table: { type: { summary: 'boolean' } },
    },
    selectable: {
      control: 'boolean',
      description: 'Режим переключения активной кнопки по клику',
      table: { type: { summary: 'boolean' } },
    },
    activeButtonVariant: {
      control: 'select',
      options: [...Object.values(ButtonVariant)],
      description: 'Вариант активной кнопки в режиме selectable',
      table: { type: { summary: 'ButtonVariant' } },
    },
    inactiveButtonVariant: {
      control: 'select',
      options: [...Object.values(ButtonVariant)],
      description: 'Вариант неактивных кнопок в режиме selectable',
      table: { type: { summary: 'ButtonVariant' } },
    },
    ariaLabel: {
      description: 'Подпись для `aria-label` на контейнере',
      table: { type: { summary: 'string' } },
    },
    children: {
      control: false,
      description: 'Button и/или IconButton',
      table: { type: { summary: 'ReactNode' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  render: () => (
    <SelectableButtonGroupStory
      attached
      size={Size.MD}
      activeButtonVariant={ButtonVariant.PRIMARY}
      inactiveButtonVariant={ButtonVariant.OUTLINE}
      ariaLabel="Переключение действия"
    >
      <Button size={Size.MD}>Изменить</Button>
      <Button size={Size.MD}>Копировать</Button>
      <Button size={Size.MD}>Применить</Button>
    </SelectableButtonGroupStory>
  ),
};

export const Attached: Story = {
  render: () => (
    <SelectableButtonGroupStory
      attached
      size={Size.MD}
      activeButtonVariant={ButtonVariant.SECONDARY}
      inactiveButtonVariant={ButtonVariant.OUTLINE}
      ariaLabel="Режим attached"
    >
      <Button size={Size.MD}>
        День
      </Button>
      <Button size={Size.MD}>
        Неделя
      </Button>
      <Button size={Size.MD}>
        Месяц
      </Button>
    </SelectableButtonGroupStory>
  ),
};

/** Как на скрине: primary + outline, два сегмента */
export const AttachedPrimaryOutline: Story = {
  render: () => (
    <SelectableButtonGroupStory
      attached
      size={Size.MD}
      activeButtonVariant={ButtonVariant.PRIMARY}
      inactiveButtonVariant={ButtonVariant.OUTLINE}
      ariaLabel="Вид"
    >
      <Button size={Size.MD}>
        Список
      </Button>
      <Button size={Size.MD}>
        Сетка
      </Button>
    </SelectableButtonGroupStory>
  ),
};

export const Selectable: Story = {
  render: () => (
    <SelectableButtonGroupStory
      attached
      size={Size.MD}
      activeButtonVariant={ButtonVariant.PRIMARY}
      inactiveButtonVariant={ButtonVariant.OUTLINE}
      ariaLabel="Переключение режима отображения"
    >
      <Button size={Size.MD}>День</Button>
      <Button size={Size.MD}>Неделя</Button>
      <Button size={Size.MD}>Месяц</Button>
    </SelectableButtonGroupStory>
  ),
};

/** Три размера — разный внешний радиус сегмента */
export const AttachedSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <SelectableButtonGroupStory
        attached
        size={Size.SM}
        activeButtonVariant={ButtonVariant.PRIMARY}
        inactiveButtonVariant={ButtonVariant.OUTLINE}
        ariaLabel="SM"
      >
        <Button size={Size.SM}>
          Button
        </Button>
        <Button size={Size.SM}>
          Button
        </Button>
      </SelectableButtonGroupStory>
      <SelectableButtonGroupStory
        attached
        size={Size.MD}
        activeButtonVariant={ButtonVariant.PRIMARY}
        inactiveButtonVariant={ButtonVariant.OUTLINE}
        ariaLabel="MD"
      >
        <Button size={Size.MD}>
          Button
        </Button>
        <Button size={Size.MD}>
          Button
        </Button>
      </SelectableButtonGroupStory>
      <SelectableButtonGroupStory
        attached
        size={Size.LG}
        activeButtonVariant={ButtonVariant.PRIMARY}
        inactiveButtonVariant={ButtonVariant.OUTLINE}
        ariaLabel="LG"
      >
        <Button size={Size.LG}>
          Button
        </Button>
        <Button size={Size.LG}>
          Button
        </Button>
      </SelectableButtonGroupStory>
    </div>
  ),
};

/** Капсула (`attachedShape="pill"`) */
export const AttachedPill: Story = {
  render: () => (
    <SelectableButtonGroupStory
      attached
      attachedShape="pill"
      size={Size.MD}
      activeButtonVariant={ButtonVariant.PRIMARY}
      inactiveButtonVariant={ButtonVariant.OUTLINE}
      ariaLabel="Pill"
    >
      <Button size={Size.MD}>
        Опция A
      </Button>
      <Button size={Size.MD}>
        Опция B
      </Button>
    </SelectableButtonGroupStory>
  ),
};

/** Текст + иконка / иконка + текст */
export const AttachedWithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <SelectableButtonGroupStory
        attached
        size={Size.MD}
        activeButtonVariant={ButtonVariant.PRIMARY}
        inactiveButtonVariant={ButtonVariant.OUTLINE}
        ariaLabel="Текст и стрелка справа"
      >
        <Button
          size={Size.MD}
          iconEnd={<Icon name="IconPlainerArrowRight" size={IconSize.SM} />}
        >
          Button
        </Button>
        <Button size={Size.MD} iconEnd={<Icon name="IconPlainerArrowRight" size={IconSize.SM} />}>
          Button
        </Button>
      </SelectableButtonGroupStory>
      <SelectableButtonGroupStory
        attached
        size={Size.MD}
        activeButtonVariant={ButtonVariant.PRIMARY}
        inactiveButtonVariant={ButtonVariant.OUTLINE}
        ariaLabel="Стрелка слева от текста"
      >
        <Button
          size={Size.MD}
          iconStart={<Icon name="IconPlainerArrowRight" size={IconSize.SM} />}
        >
          Button
        </Button>
        <Button
          size={Size.MD}
          iconStart={<Icon name="IconPlainerArrowRight" size={IconSize.SM} />}
        >
          Button
        </Button>
      </SelectableButtonGroupStory>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <SelectableButtonGroupStory
      attached
      orientation="vertical"
      size={Size.SM}
      activeButtonVariant={ButtonVariant.PRIMARY}
      inactiveButtonVariant={ButtonVariant.OUTLINE}
      ariaLabel="Вертикальная группа"
    >
      <Button size={Size.SM}>
        Вверх
      </Button>
      <Button size={Size.SM}>
        Вниз
      </Button>
    </SelectableButtonGroupStory>
  ),
};

export const WithIconButtons: Story = {
  render: () => (
    <SelectableButtonGroupStory
      attached
      size={Size.SM}
      activeButtonVariant={ButtonVariant.PRIMARY}
      inactiveButtonVariant={ButtonVariant.OUTLINE}
      ariaLabel="Форматирование"
    >
      <IconButton
        size={Size.SM}
        rounded={false}
        aria-label="Жирный"
        icon={<Icon name="PhosphorPushPin" size={IconSize.SM} />}
      />
      <IconButton
        size={Size.SM}
        rounded={false}
        aria-label="Курсив"
        icon={<Icon name="PhosphorBookmarkSimple" size={IconSize.SM} />}
      />
    </SelectableButtonGroupStory>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <SelectableButtonGroupStory
        attached
        fullWidth
        size={Size.MD}
        activeButtonVariant={ButtonVariant.PRIMARY}
        inactiveButtonVariant={ButtonVariant.OUTLINE}
        ariaLabel="Полная ширина"
      >
        <Button size={Size.MD}>
          Сохранить
        </Button>
        <Button size={Size.MD}>
          Отмена
        </Button>
      </SelectableButtonGroupStory>
    </div>
  ),
};

/** Склеенная группа на всю ширину: сегменты делят ширину поровну */
export const AttachedFullWidth: Story = {
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <SelectableButtonGroupStory
        attached
        fullWidth
        size={Size.MD}
        activeButtonVariant={ButtonVariant.PRIMARY}
        inactiveButtonVariant={ButtonVariant.OUTLINE}
        ariaLabel="Две равные колонки"
      >
        <Button size={Size.MD}>
          Нет
        </Button>
        <Button size={Size.MD}>
          Да
        </Button>
      </SelectableButtonGroupStory>
    </div>
  ),
};

export const AllButtonVariants: Story = {
  render: () => {
    const allButtonVariants: ButtonVariant[] = [
      ButtonVariant.PRIMARY,
      ButtonVariant.SECONDARY,
      ButtonVariant.OUTLINE,
      ButtonVariant.LINE,
      ButtonVariant.GHOST,
      ButtonVariant.DANGER,
      ButtonVariant.SUCCESS,
      ButtonVariant.WARNING,
      ButtonVariant.SKELETON,
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {allButtonVariants.map((buttonVariant) => (
          (() => {
            const inactiveVariantForRow =
              buttonVariant === ButtonVariant.GHOST || buttonVariant === ButtonVariant.LINE
                ? buttonVariant
                : ButtonVariant.OUTLINE;

            return (
          <SelectableButtonGroupStory
            key={`all-variants-${buttonVariant}`}
            attached
            size={Size.MD}
            activeButtonVariant={buttonVariant}
            inactiveButtonVariant={inactiveVariantForRow}
            ariaLabel={`Вариант ${buttonVariant}`}
          >
            <Button size={Size.MD}>Button</Button>
            <Button size={Size.MD}>Button</Button>
            <Button size={Size.MD}>Button</Button>
          </SelectableButtonGroupStory>
            );
          })()
        ))}
      </div>
    );
  },
};

