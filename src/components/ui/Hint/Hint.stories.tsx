import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { css } from 'styled-components';
import {
  Hint,
  HintPosition,
  HintVariant,
  HintVisibilityTrigger,
  type HintPositioningMode,
} from './Hint';
import { Button } from '../buttons/Button';
import { ButtonVariant } from '../../../types/ui';
import { Icon } from '../Icon/Icon';
import { IconSize, Size } from '../../../types/sizes';
import { DOC_HINT } from '@/components/ui/storyDocs/uiKitDocs';

const meta: Meta<typeof Hint> = {
  title: 'UI Kit/Feedback/Hint',
  component: Hint,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_HINT,
      },
    },
  },
  tags: ['autodocs'],
  args: {
    visibilityTrigger: HintVisibilityTrigger.HOVER,
    delay: 0,
  },
  argTypes: {
    content: {
      control: 'text',
      description: 'Содержимое подсказки',
    },
    placement: {
      control: { type: 'select' },
      options: Object.values(HintPosition),
      description: 'Позиция подсказки',
    },
    variant: {
      control: { type: 'select' },
      options: Object.values(HintVariant),
      description: 'Вариант стилизации',
    },
    size: {
      control: { type: 'select' },
      options: Object.values(Size),
      description: 'Размер подсказки',
    },
    delay: {
      control: { type: 'number', min: 0, max: 1000, step: 50 },
      description: 'Задержка показа подсказки (мс)',
    },
    maxWidth: {
      control: { type: 'number', min: 100, max: 500, step: 50 },
      description: 'Максимальная ширина подсказки',
    },
    visibilityTrigger: {
      control: { type: 'select' },
      options: Object.values(HintVisibilityTrigger),
      description: 'Триггер видимости подсказки: hover (при наведении) или click (при клике)',
    },
    onVisibilityChange: {
      action: 'visibilityChanged',
      description:
        'Колбек на изменение видимости хинта. Вызывается с true при показе и false при скрытии.',
      table: {
        type: { summary: '(visible: boolean) => void' },
      },
    },
    onHintClick: {
      action: 'hintClicked',
      description: 'Колбек на клик по hint. Вызывается при клике на содержимое hint.',
      table: {
        type: { summary: '(event: React.MouseEvent<HTMLDivElement>) => void' },
      },
    },
    anchorClassName: {
      control: 'text',
      description: 'ClassName для внешнего контейнера (AnchorWrapper)',
    },
    anchorId: {
      control: 'text',
      description: 'Id для внешнего контейнера (AnchorWrapper)',
    },
    anchorCssMixin: {
      control: false,
      description:
        'Позволяет добавлять миксин созданный с помощью styled css для внешнего контейнера (AnchorWrapper)',
      table: {
        type: { summary: 'HintCssMixin' },
      },
    },
    positioningMode: {
      control: { type: 'select' },
      options: ['default', 'autoFlip', 'autoFit'] as HintPositioningMode[],
      description:
        'Режим позиционирования подсказки: default (текущее поведение), autoFlip (автоматически переворачивать), autoFit (автоматически подстраивать)',
      table: {
        type: { summary: 'default, autoFlip, autoFit' },
      },
    },
    isOpen: {
      control: 'boolean',
      description: 'Контролируемая видимость подсказки (контролируемый режим)',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Начальное состояние видимости подсказки (неконтролируемый режим)',
    },
    onOpenChange: {
      action: 'openChanged',
      description: 'Колбек изменения состояния видимости подсказки',
      table: {
        type: { summary: '(open: boolean) => void' },
      },
    },
    showArrow: {
      control: 'boolean',
      description: 'Показывать ли стрелку, указывающую на элемент',
    },
    closeOnScroll: {
      control: 'boolean',
      description: 'Закрывать ли hint при прокрутке страницы',
    },
    tourStep: {
      control: 'number',
      description: 'Текущий шаг экскурсии (для tour режима)',
    },
    tourTotalSteps: {
      control: 'number',
      description: 'Общее количество шагов экскурсии',
    },
    onTourNext: {
      action: 'tourNext',
      description: 'Колбек для перехода к следующему шагу экскурсии',
    },
    onTourPrev: {
      action: 'tourPrev',
      description: 'Колбек для перехода к предыдущему шагу экскурсии',
    },
    showTourControls: {
      control: 'boolean',
      description: 'Показывать ли элементы управления экскурсией (кнопки Назад/Далее)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Базовые истории
export const Default: Story = {
  args: {
    content: 'Это базовая подсказка с информацией',
    children: <Button>Наведи на меня</Button>,
  },
};

export const WithIcon: Story = {
  args: {
    content: 'Информационная подсказка',
    children: <Icon name="IconExInfoSquare" size={IconSize.MD} />,
  },
};

// Истории по вариантам (теперь все используют стандартные цвета темы)
export const DefaultVariant: Story = {
  args: {
    content: 'Стандартная подсказка с цветами темы',
    variant: HintVariant.DEFAULT,
    children: <Button variant={ButtonVariant.PRIMARY}>Стандартная</Button>,
  },
};

export const Info: Story = {
  args: {
    content: 'Информационная подсказка с полезными сведениями',
    variant: HintVariant.INFO,
    children: <Button variant={ButtonVariant.PRIMARY}>Информация</Button>,
  },
};

export const Success: Story = {
  args: {
    content: 'Операция выполнена успешно!',
    variant: HintVariant.SUCCESS,
    children: <Button variant={ButtonVariant.SUCCESS}>Успех</Button>,
  },
};

export const Warning: Story = {
  args: {
    content: 'Внимание! Это предупреждение о важном событии',
    variant: HintVariant.WARNING,
    children: <Button variant={ButtonVariant.DANGER}>Предупреждение</Button>,
  },
};

export const Error: Story = {
  args: {
    content: 'Произошла ошибка при выполнении операции',
    variant: HintVariant.ERROR,
    children: <Button variant={ButtonVariant.DANGER}>Ошибка</Button>,
  },
};

// Истории по позициям
export const TopPosition: Story = {
  args: {
    content: 'Подсказка сверху',
    placement: HintPosition.TOP,
    children: <Button variant={ButtonVariant.PRIMARY}>Сверху</Button>,
  },
};

export const BottomPosition: Story = {
  args: {
    content: 'Подсказка снизу',
    placement: HintPosition.BOTTOM,
    children: <Button variant={ButtonVariant.SECONDARY}>Снизу</Button>,
  },
};

export const LeftPosition: Story = {
  args: {
    content: 'Подсказка слева',
    placement: HintPosition.LEFT,
    children: <Button variant={ButtonVariant.OUTLINE}>Слева</Button>,
  },
};

export const RightPosition: Story = {
  args: {
    content: 'Подсказка справа',
    placement: HintPosition.RIGHT,
    children: <Button variant={ButtonVariant.GHOST}>Справа</Button>,
  },
};

// Демонстрация размеров
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      <Hint content="Маленькая подсказка" size={Size.SM}>
        <Button variant={ButtonVariant.PRIMARY}>SM</Button>
      </Hint>

      <Hint content="Средняя подсказка" size={Size.MD}>
        <Button variant={ButtonVariant.SECONDARY}>MD</Button>
      </Hint>

      <Hint content="Большая подсказка" size={Size.LG}>
        <Button variant={ButtonVariant.OUTLINE}>LG</Button>
      </Hint>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Демонстрация различных размеров подсказок',
      },
    },
  },
};

// Демонстрация всех вариантов (теперь все используют стандартные цвета)
export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: '20px',
        gridTemplateColumns: 'repeat(2, 1fr)',
      }}
    >
      <Hint content="Стандартная подсказка" variant={HintVariant.DEFAULT}>
        <Button variant={ButtonVariant.PRIMARY}>DEFAULT</Button>
      </Hint>

      <Hint content="Информационная подсказка" variant={HintVariant.INFO}>
        <Button variant={ButtonVariant.PRIMARY}>INFO</Button>
      </Hint>

      <Hint content="Успешная операция" variant={HintVariant.SUCCESS}>
        <Button variant={ButtonVariant.SUCCESS}>SUCCESS</Button>
      </Hint>

      <Hint content="Предупреждение" variant={HintVariant.WARNING}>
        <Button variant={ButtonVariant.DANGER}>WARNING</Button>
      </Hint>

      <Hint content="Ошибка выполнения" variant={HintVariant.ERROR}>
        <Button variant={ButtonVariant.DANGER}>ERROR</Button>
      </Hint>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Демонстрация всех доступных вариантов стилизации (все используют стандартные цвета темы)',
      },
    },
  },
};

// Демонстрация всех позиций
export const AllPositions: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: '20px',
        gridTemplateColumns: 'repeat(2, 1fr)',
        padding: '40px',
      }}
    >
      <Hint content="Подсказка сверху" placement={HintPosition.TOP}>
        <Button variant={ButtonVariant.PRIMARY}>TOP</Button>
      </Hint>

      <Hint content="Подсказка снизу" placement={HintPosition.BOTTOM}>
        <Button variant={ButtonVariant.SECONDARY}>BOTTOM</Button>
      </Hint>

      <Hint content="Подсказка слева" placement={HintPosition.LEFT}>
        <Button variant={ButtonVariant.OUTLINE}>LEFT</Button>
      </Hint>

      <Hint content="Подсказка справа" placement={HintPosition.RIGHT}>
        <Button variant={ButtonVariant.GHOST}>RIGHT</Button>
      </Hint>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Демонстрация всех доступных позиций подсказки',
      },
    },
  },
};

// Демонстрация с иконками
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      <Hint content="Информация">
        <Icon name="IconExInfoSquare" size={IconSize.MD} />
      </Hint>

      <Hint content="Предупреждение">
        <Icon name="IconPlainerWarning" size={IconSize.MD} />
      </Hint>

      <Hint content="Ошибка">
        <Icon name="IconPlainerClose" size={IconSize.MD} />
      </Hint>

      <Hint content="Успех">
        <Icon name="IconExCheck" size={IconSize.MD} />
      </Hint>

      <Hint content="Настройки">
        <Icon name="IconExSettings" size={IconSize.MD} />
      </Hint>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Подсказки с различными иконками',
      },
    },
  },
};

// Демонстрация с разными задержками
export const DifferentDelays: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      <Hint content="Без задержки" delay={0}>
        <Button variant={ButtonVariant.PRIMARY}>0мс</Button>
      </Hint>

      <Hint content="Задержка 200мс" delay={200}>
        <Button variant={ButtonVariant.SECONDARY}>200мс</Button>
      </Hint>

      <Hint content="Задержка 500мс" delay={500}>
        <Button variant={ButtonVariant.OUTLINE}>500мс</Button>
      </Hint>

      <Hint content="Задержка 1000мс" delay={1000}>
        <Button variant={ButtonVariant.GHOST}>1000мс</Button>
      </Hint>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Демонстрация различных задержек показа подсказки',
      },
    },
  },
};

// Демонстрация стрелок
export const ArrowDemo: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        padding: '40px',
      }}
    >
      <Hint content="Стрелка вниз" placement={HintPosition.TOP} showArrow>
        <Button variant={ButtonVariant.PRIMARY}>Top</Button>
      </Hint>

      <Hint content="Стрелка вверх" placement={HintPosition.BOTTOM} showArrow>
        <Button variant={ButtonVariant.SECONDARY}>Bottom</Button>
      </Hint>

      <Hint content="Стрелка вправо" placement={HintPosition.LEFT} showArrow>
        <Button variant={ButtonVariant.OUTLINE}>Left</Button>
      </Hint>

      <Hint content="Стрелка влево" placement={HintPosition.RIGHT} showArrow>
        <Button variant={ButtonVariant.GHOST}>Right</Button>
      </Hint>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Демонстрация стрелок hint во всех основных направлениях. Стрелки автоматически позиционируются и используют цвет границы из варианта hint.',
      },
    },
  },
};

// Демонстрация click режима
export const ClickMode: Story = {
  args: {
    content:
      'Подсказка открывается при клике. Закройте её, нажав на крестик, Escape или кликнув вне элемента.',
    visibilityTrigger: HintVisibilityTrigger.CLICK,
    children: <Button variant={ButtonVariant.PRIMARY}>Кликни на меня</Button>,
  },
  parameters: {
    docs: {
      description: {
        story:
          'В режиме click hint открывается при клике на элемент или нажатии Space/Enter. Закрывается при клике на крестик, клике вне элемента или нажатии Escape.',
      },
    },
  },
};

// Демонстрация onVisibilityChange
export const WithVisibilityChange: Story = {
  render: () => {
    const [visibilityLog, setVisibilityLog] = React.useState<string[]>([]);

    const handleVisibilityChange = (visible: boolean) => {
      const timestamp = new Date().toLocaleTimeString();
      const status = visible ? 'показан' : 'скрыт';
      setVisibilityLog((prev) => [...prev, `${timestamp}: Hint ${status}`]);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
        <Hint
          content="Наведи на меня и посмотри в консоль/логи"
          onVisibilityChange={handleVisibilityChange}
        >
          <Button variant={ButtonVariant.PRIMARY}>Наведи на меня</Button>
        </Hint>

        <div
          style={{
            padding: '16px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            minWidth: '300px',
            maxHeight: '200px',
            overflowY: 'auto',
          }}
        >
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>
            Лог изменений видимости:
          </h4>
          {visibilityLog.length === 0 ? (
            <p style={{ margin: 0, color: '#666', fontSize: '12px' }}>
              Наведите на кнопку, чтобы увидеть события
            </p>
          ) : (
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px' }}>
              {visibilityLog.map((log, index) => (
                <li key={index} style={{ marginBottom: '4px' }}>
                  {log}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Демонстрация работы колбека onVisibilityChange. При наведении/фокусе на элемент hint показывается и вызывается onVisibilityChange(true). При потере ховера/фокуса hint скрывается и вызывается onVisibilityChange(false).',
      },
    },
  },
};

// Демонстрация onHintClick
export const WithHintClick: Story = {
  render: () => {
    const [clickLog, setClickLog] = React.useState<string[]>([]);

    const handleHintClick = (_event: React.MouseEvent<HTMLDivElement>) => {
      const timestamp = new Date().toLocaleTimeString();
      setClickLog((prev) => [...prev, `${timestamp}: Клик по hint`]);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
        <Hint
          content="Кликни на меня! (Клик по hint будет залогирован)"
          onHintClick={handleHintClick}
        >
          <Button variant={ButtonVariant.PRIMARY}>Наведи на меня</Button>
        </Hint>

        <div
          style={{
            padding: '16px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            minWidth: '300px',
            maxHeight: '200px',
            overflowY: 'auto',
          }}
        >
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>
            Лог кликов по hint:
          </h4>
          {clickLog.length === 0 ? (
            <p style={{ margin: 0, color: '#666', fontSize: '12px' }}>
              Наведите на кнопку и кликните по hint, чтобы увидеть события
            </p>
          ) : (
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px' }}>
              {clickLog.map((log, index) => (
                <li key={index} style={{ marginBottom: '4px' }}>
                  {log}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Демонстрация работы колбека onHintClick. При клике на содержимое hint вызывается onHintClick с событием клика.',
      },
    },
  },
};

// Демонстрация anchorCssMixin
export const WithAnchorCssMixin: Story = {
  args: {
    content: 'Подсказка с кастомным CSS миксином для внешнего контейнера',
    children: <Button variant={ButtonVariant.PRIMARY}>Наведи на меня</Button>,
    anchorCssMixin: css`
      border: 2px dashed rgba(59, 130, 246, 0.5);
      border-radius: 8px;
      padding: 8px;
      background: rgba(59, 130, 246, 0.05);

      &::before {
        content: 'AnchorWrapper';
        position: absolute;
        top: -20px;
        left: 0;
        font-size: 10px;
        color: rgba(59, 130, 246, 0.7);
        font-weight: 600;
      }
    `,
  },
  parameters: {
    docs: {
      description: {
        story:
          '`anchorCssMixin` полезен, когда нужно подключить сложный mixin через `styled-components/css`: добавить псевдоэлементы, blur, media-запросы. Миксин применяется поверх стандартных стилей внешнего контейнера (AnchorWrapper).',
      },
    },
  },
};

// Демонстрация режимов позиционирования
export const PositioningModeDefault: Story = {
  args: {
    content:
      'Режим default - подсказка отображается в указанной позиции без автоматической корректировки',
    children: <Button variant={ButtonVariant.PRIMARY}>Default режим</Button>,
    placement: HintPosition.TOP,
    positioningMode: 'default',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Режим `default` - подсказка отображается в указанной позиции без автоматической корректировки. Может выходить за границы viewport.',
      },
    },
  },
};

export const PositioningModeAutoFlip: Story = {
  args: {
    content:
      'Режим autoFlip - подсказка автоматически переворачивается при недостатке места (TOP ↔ BOTTOM, LEFT ↔ RIGHT)',
    children: <Button variant={ButtonVariant.PRIMARY}>AutoFlip режим</Button>,
    placement: HintPosition.TOP,
    positioningMode: 'autoFlip',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Режим `autoFlip` - подсказка автоматически переворачивается при недостатке места. Например, если указана позиция TOP, но недостаточно места сверху, подсказка перевернется в BOTTOM.',
      },
    },
  },
};

export const PositioningModeAutoFit: Story = {
  args: {
    content:
      'Режим autoFit - подсказка автоматически подстраивает позицию, чтобы не выходить за границы viewport',
    children: <Button variant={ButtonVariant.PRIMARY}>AutoFit режим</Button>,
    placement: HintPosition.TOP,
    positioningMode: 'autoFit',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Режим `autoFit` - подсказка автоматически подстраивает позицию, чтобы не выходить за границы viewport. Может переворачивать и корректировать координаты.',
      },
    },
  },
};

// Демонстрация режимов позиционирования в разных позициях
export const PositioningModesComparison: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', padding: '100px' }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Hint
            content="Default режим - может выйти за границы"
            placement={HintPosition.TOP}
            positioningMode="default"
          >
            <Button variant={ButtonVariant.PRIMARY}>Default</Button>
          </Hint>
          <Hint
            content="AutoFlip режим - переворачивается"
            placement={HintPosition.TOP}
            positioningMode="autoFlip"
          >
            <Button variant={ButtonVariant.PRIMARY}>AutoFlip</Button>
          </Hint>
          <Hint
            content="AutoFit режим - подстраивается"
            placement={HintPosition.TOP}
            positioningMode="autoFit"
          >
            <Button variant={ButtonVariant.PRIMARY}>AutoFit</Button>
          </Hint>
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginTop: '200px' }}>
          <Hint
            content="Default режим - может выйти за границы"
            placement={HintPosition.BOTTOM}
            positioningMode="default"
          >
            <Button variant={ButtonVariant.PRIMARY}>Default</Button>
          </Hint>
          <Hint
            content="AutoFlip режим - переворачивается"
            placement={HintPosition.BOTTOM}
            positioningMode="autoFlip"
          >
            <Button variant={ButtonVariant.PRIMARY}>AutoFlip</Button>
          </Hint>
          <Hint
            content="AutoFit режим - подстраивается"
            placement={HintPosition.BOTTOM}
            positioningMode="autoFit"
          >
            <Button variant={ButtonVariant.PRIMARY}>AutoFit</Button>
          </Hint>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Сравнение всех трех режимов позиционирования. Наведите на кнопки, чтобы увидеть разницу в поведении.',
      },
    },
  },
};

// Демонстрация контролируемого режима
export const ControlledMode: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '40px' }}>
        <div>
          <Hint
            content="Контролируемая подсказка. Видимость управляется извне через проп isOpen."
            isOpen={isOpen}
            onOpenChange={setIsOpen}
          >
            <Button variant={ButtonVariant.PRIMARY}>Контролируемый режим</Button>
          </Hint>
        </div>
        <div>
          <Button
            variant={ButtonVariant.SECONDARY}
            onClick={() => setIsOpen(!isOpen)}
            style={{ marginRight: '10px' }}
          >
            {isOpen ? 'Скрыть' : 'Показать'} подсказку
          </Button>
          <span style={{ fontSize: '14px', color: '#666' }}>
            Текущее состояние: {isOpen ? 'открыта' : 'закрыта'}
          </span>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'В контролируемом режиме видимость подсказки управляется через проп `isOpen`. Компонент вызывает `onOpenChange` при попытке изменить состояние, но фактическое изменение происходит только через обновление `isOpen` извне.',
      },
    },
  },
};

// Демонстрация неконтролируемого режима
export const UncontrolledMode: Story = {
  render: () => {
    const [openState, setOpenState] = React.useState<boolean | null>(null);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '40px' }}>
        <div>
          <Hint
            content="Неконтролируемая подсказка с начальным состоянием defaultOpen={true}. Видимость управляется внутренним состоянием компонента."
            defaultOpen={true}
            onOpenChange={setOpenState}
          >
            <Button variant={ButtonVariant.PRIMARY}>Неконтролируемый режим</Button>
          </Hint>
        </div>
        <div>
          <span style={{ fontSize: '14px', color: '#666' }}>
            Последнее изменение состояния:{' '}
            {openState === null ? 'не было' : openState ? 'открыта' : 'закрыта'}
          </span>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'В неконтролируемом режиме видимость подсказки управляется внутренним состоянием компонента. Проп `defaultOpen` задает начальное состояние. Компонент вызывает `onOpenChange` при изменении состояния, но управление происходит внутри компонента.',
      },
    },
  },
};

// Демонстрация комбинации контролируемого режима с click триггером
export const ControlledWithClick: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '40px' }}>
        <div>
          <Hint
            content="Контролируемая подсказка с click триггером. Клик по кнопке вызывает onOpenChange, но состояние управляется извне."
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            visibilityTrigger={HintVisibilityTrigger.CLICK}
          >
            <Button variant={ButtonVariant.PRIMARY}>Кликни меня</Button>
          </Hint>
        </div>
        <div>
          <Button
            variant={ButtonVariant.SECONDARY}
            onClick={() => setIsOpen(!isOpen)}
            style={{ marginRight: '10px' }}
          >
            {isOpen ? 'Закрыть' : 'Открыть'} программно
          </Button>
          <span style={{ fontSize: '14px', color: '#666' }}>
            Состояние: {isOpen ? 'открыта' : 'закрыта'}
          </span>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Контролируемый режим можно комбинировать с `visibilityTrigger="click"`. В этом случае клик по триггеру вызывает `onOpenChange`, но фактическое открытие/закрытие происходит только при обновлении `isOpen` извне.',
      },
    },
  },
};

// Демонстрация стрелок для всех вариантов
export const ArrowsWithVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        padding: '40px',
      }}
    >
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Hint
          content="Default с стрелкой"
          placement={HintPosition.TOP}
          showArrow
          variant={HintVariant.DEFAULT}
        >
          <Button variant={ButtonVariant.PRIMARY}>Default</Button>
        </Hint>
        <Hint
          content="Info с стрелкой"
          placement={HintPosition.TOP}
          showArrow
          variant={HintVariant.INFO}
        >
          <Button variant={ButtonVariant.PRIMARY}>Info</Button>
        </Hint>
        <Hint
          content="Success с стрелкой"
          placement={HintPosition.TOP}
          showArrow
          variant={HintVariant.SUCCESS}
        >
          <Button variant={ButtonVariant.PRIMARY}>Success</Button>
        </Hint>
        <Hint
          content="Warning с стрелкой"
          placement={HintPosition.TOP}
          showArrow
          variant={HintVariant.WARNING}
        >
          <Button variant={ButtonVariant.PRIMARY}>Warning</Button>
        </Hint>
        <Hint
          content="Error с стрелкой"
          placement={HintPosition.TOP}
          showArrow
          variant={HintVariant.ERROR}
        >
          <Button variant={ButtonVariant.PRIMARY}>Error</Button>
        </Hint>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Демонстрация стрелок для всех вариантов hint. Цвет стрелки соответствует цвету границы варианта.',
      },
    },
  },
};

// Демонстрация стрелок для угловых позиций
export const ArrowsCornerPositions: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        padding: '100px',
      }}
    >
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Hint content="Top-Left" placement={HintPosition.TOP_LEFT} showArrow>
          <Button variant={ButtonVariant.PRIMARY}>Top-Left</Button>
        </Hint>
        <Hint content="Top-Right" placement={HintPosition.TOP_RIGHT} showArrow>
          <Button variant={ButtonVariant.PRIMARY}>Top-Right</Button>
        </Hint>
      </div>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginTop: '200px' }}>
        <Hint content="Bottom-Left" placement={HintPosition.BOTTOM_LEFT} showArrow>
          <Button variant={ButtonVariant.PRIMARY}>Bottom-Left</Button>
        </Hint>
        <Hint content="Bottom-Right" placement={HintPosition.BOTTOM_RIGHT} showArrow>
          <Button variant={ButtonVariant.PRIMARY}>Bottom-Right</Button>
        </Hint>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Демонстрация стрелок для угловых позиций. Стрелки позиционируются ближе к соответствующему углу.',
      },
    },
  },
};

// Демонстрация closeOnScroll
export const CloseOnScroll: Story = {
  render: () => (
    <div style={{ padding: '40px', height: '200vh' }}>
      <div style={{ marginBottom: '20px' }}>
        <Hint
          content="Эта подсказка закроется при прокрутке страницы (closeOnScroll={true})"
          closeOnScroll={true}
        >
          <Button variant={ButtonVariant.PRIMARY}>Наведи и прокрути</Button>
        </Hint>
      </div>
      <div style={{ marginTop: '100vh' }}>
        <Hint
          content="Эта подсказка останется открытой при прокрутке (closeOnScroll={false}, по умолчанию)"
          closeOnScroll={false}
        >
          <Button variant={ButtonVariant.SECONDARY}>Наведи и прокрути</Button>
        </Hint>
      </div>
      <p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        Прокрутите страницу вниз, чтобы увидеть разницу в поведении
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Демонстрация пропа `closeOnScroll`. Когда `closeOnScroll={true}`, hint автоматически закрывается при прокрутке страницы. По умолчанию `closeOnScroll={false}` и hint остается открытым, обновляя свою позицию.',
      },
    },
  },
};

// Демонстрация tour функциональности (экскурсия)
export const TourGuide: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = React.useState(1);
    const totalSteps = 4;

    const handleNext = () => {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    };

    const handlePrev = () => {
      if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
      }
    };

    return (
      <div
        style={{
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Hint
            content="Шаг 1: Это первая кнопка в экскурсии"
            tourStep={currentStep === 1 ? 1 : undefined}
            tourTotalSteps={totalSteps}
            onTourNext={handleNext}
            onTourPrev={handlePrev}
            showTourControls={true}
            isOpen={currentStep === 1}
          >
            <Button variant={ButtonVariant.PRIMARY}>Кнопка 1</Button>
          </Hint>
          <Hint
            content="Шаг 2: Это вторая кнопка в экскурсии"
            tourStep={currentStep === 2 ? 2 : undefined}
            tourTotalSteps={totalSteps}
            onTourNext={handleNext}
            onTourPrev={handlePrev}
            showTourControls={true}
            isOpen={currentStep === 2}
          >
            <Button variant={ButtonVariant.SECONDARY}>Кнопка 2</Button>
          </Hint>
          <Hint
            content="Шаг 3: Это третья кнопка в экскурсии"
            tourStep={currentStep === 3 ? 3 : undefined}
            tourTotalSteps={totalSteps}
            onTourNext={handleNext}
            onTourPrev={handlePrev}
            showTourControls={true}
            isOpen={currentStep === 3}
          >
            <Button variant={ButtonVariant.OUTLINE}>Кнопка 3</Button>
          </Hint>
          <Hint
            content="Шаг 4: Это последняя кнопка в экскурсии"
            tourStep={currentStep === 4 ? 4 : undefined}
            tourTotalSteps={totalSteps}
            onTourNext={handleNext}
            onTourPrev={handlePrev}
            showTourControls={true}
            isOpen={currentStep === 4}
          >
            <Button variant={ButtonVariant.DANGER}>Кнопка 4</Button>
          </Hint>
        </div>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
            Текущий шаг: {currentStep} из {totalSteps}
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <Button
              variant={ButtonVariant.OUTLINE}
              size={Size.SM}
              onClick={handlePrev}
              disabled={currentStep === 1}
            >
              Назад
            </Button>
            <Button
              variant={ButtonVariant.PRIMARY}
              size={Size.SM}
              onClick={handleNext}
              disabled={currentStep === totalSteps}
            >
              {currentStep === totalSteps ? 'Завершить' : 'Далее'}
            </Button>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Демонстрация tour функциональности (экскурсии). Используйте пропсы `tourStep`, `tourTotalSteps`, `onTourNext`, `onTourPrev` и `showTourControls` для создания пошаговой экскурсии по интерфейсу. Элементы с `tourStep` будут подсвечены, а в hint будут отображаться элементы управления навигацией.',
      },
    },
  },
};

