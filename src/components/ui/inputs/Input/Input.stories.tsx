import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { Icon } from '../../Icon/Icon';
import { Form, HiddenUsernameField } from '../../Form';
import React from 'react';
import { Size, IconSize } from '../../../../types/sizes';
import { InputVariant } from '../../../../types/ui';
import { DOC_INPUT } from '@/components/ui/storyDocs/uiKitDocs';

const meta: Meta<typeof Input> = {
  title: 'UI Kit/Inputs/Input',
  component: Input,
  args: {
    clearIconProps: {},
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_INPUT,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story, context) => (
      <Form formId={`story-${context.id}`}>
        <Story />
      </Form>
    ),
  ],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'clear'],
      description:
        'Вариант поля; значения: `default` (обычное), `clear` (акцент на очистку; селектор и дата — в отдельных компонентах)',
      table: {
        type: { summary: 'default или clear (TextInputVariant)' },
      },
    },
    size: {
      control: { type: 'select' },
      options: Object.values(Size),
      description: 'Размер поля (токены отступов и высоты как у остальных полей)',
      table: {
        type: { summary: 'Size: XS, SM, MD, LG, XL' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Отключенное состояние',
    },
    readOnly: {
      control: { type: 'boolean' },
      description:
        'Поле только для чтения (текст остается обычным цветом, но фон становится серым)',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Полная ширина',
    },
    displayClearIcon: {
      control: { type: 'boolean' },
      description: 'Показывать кнопку с крестиком очистки (`onClearIconClick` — сброс у родителя)',
    },
    onClearIconClick: {
      action: 'clearIconClick',
      description: 'Клик по очистке (после сброса локального состояния)',
      table: {
        type: { summary: '() => void' },
      },
    },
    clearIconProps: {
      control: 'object',
      description:
        'Частичные пропсы `Icon` для кнопки очистки при `displayClearIcon`. По умолчанию `IconExClose`; мерж поверх вычисленного `size`.',
      table: {
        type: { summary: 'ClearIconProps' },
      },
    },
    textAlign: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      description: 'Выравнивание текста; значения: `left`, `center`, `right`',
      table: {
        type: { summary: 'left, center или right' },
      },
    },
    status: {
      control: { type: 'select' },
      options: ['error', 'success', 'warning'],
      description:
        'Цвет обводки по статусу (без текста ошибки; для текста используйте error/helperText)',
      table: {
        type: { summary: 'error, success или warning' },
      },
    },
    value: {
      description: 'Контролируемое значение поля',
      table: {
        type: { summary: 'string (и прочие атрибуты нативного input из InputHTMLAttributes)' },
      },
    },
    onChange: {
      description: 'Нативное событие change у input',
      table: {
        type: {
          summary: '(event: React.ChangeEvent<HTMLInputElement>) => void',
        },
      },
    },
    tooltipType: {
      control: { type: 'radio' },
      options: ['tooltip', 'hint'],
      description: 'Тип подсказки вокруг поля',
      table: {
        type: { summary: 'tooltip или hint' },
      },
    },
    tooltipPosition: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Позиция Tooltip или Hint',
      table: {
        type: { summary: 'top, bottom, left или right' },
      },
    },
    displayCharacterCounter: {
      control: { type: 'boolean' },
      description: 'Показывать счетчик символов при наличии maxLength',
    },
    ignoreMaskCharacters: {
      control: { type: 'boolean' },
      description: 'Исключать символы маски из подсчета символов для maxLength',
    },
    characterCounterVisibilityThreshold: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description:
        'Коэффициент влияющий на появление счетчика (0-1): 0 - всегда видим, 1 - всегда невидим, 0.8 - видим при >80% заполнения',
    },
    additionalLabel: {
      control: { type: 'text' },
      description: 'Дополнительное имя поля формы',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Кнопка сброса полей в интерактивных сторис */
const inputStoriesResetButtonStyle: React.CSSProperties = {
  padding: '8px 16px',
  marginTop: '12px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  background: 'white',
  cursor: 'pointer',
};

// Основные варианты
export const Default: Story = {
  args: {
    placeholder: 'Введите текст...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email',
    placeholder: 'Введите email...',
  },
};

export const WithHelperText: Story = {
  render: () => (
    <Form formId="helper-text-form">
      <Input
        label="Пароль"
        type="password"
        placeholder="Введите пароль..."
        helperText="Минимум 8 символов"
      />
    </Form>
  ),
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Введите email...',
    error: 'Неверный формат email',
  },
};

export const WithSuccess: Story = {
  render: () => {
    const [email, setEmail] = React.useState('user@example.com');
    return (
      <Input
        label="Email"
        placeholder="Введите email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        success={true}
      />
    );
  },
};

// Варианты
export const Clear: Story = {
  render: () => {
    const [q, setQ] = React.useState('Поисковый запрос');
    return (
      <Input
        label="Поиск"
        variant={InputVariant.CLEAR}
        placeholder="Поиск..."
        displayClearIcon
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onClearIconClick={() => setQ('')}
      />
    );
  },
};

// Размеры
export const Small: Story = {
  args: {
    label: 'Small Input',
    size: Size.SM,
    placeholder: 'Small...',
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium Input',
    size: Size.MD,
    placeholder: 'Medium...',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Input',
    size: Size.LG,
    placeholder: 'Large...',
  },
};

export const ExtraLarge: Story = {
  args: {
    label: 'Extra Large Input',
    size: Size.XL,
    placeholder: 'Extra Large...',
  },
};

// С иконками
export const WithLeftIcon: Story = {
  args: {
    label: 'Email',
    placeholder: 'Введите email...',
    leftIcon: <Icon name="IconExMail" size={IconSize.MD} />,
  },
};

export const WithRightIcon: Story = {
  args: {
    label: 'Поиск',
    placeholder: 'Поиск...',
    rightIcon: <Icon name="IconExSearch" size={IconSize.MD} />,
  },
};

export const WithBothIcons: Story = {
  args: {
    label: 'Сумма',
    placeholder: '0.00',
    leftIcon: <Icon name="IconPlainerDollar" size={IconSize.MD} />,
    rightIcon: <Icon name="IconPlainerPercent" size={IconSize.MD} />,
  },
};

// Состояния
export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Недоступно...',
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    label: 'Обязательное поле',
    placeholder: 'Введите значение...',
    required: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width Input',
    placeholder: 'Полная ширина...',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

// Выравнивание текста
export const TextAlignLeft: Story = {
  args: {
    label: 'Выравнивание по левому краю',
    placeholder: 'Текст слева...',
    textAlign: 'left',
    defaultValue: 'Текст выровнен по левому краю',
  },
};

export const TextAlignCenter: Story = {
  args: {
    label: 'Выравнивание по центру',
    placeholder: 'Текст по центру...',
    textAlign: 'center',
    defaultValue: 'Текст по центру',
  },
};

export const TextAlignRight: Story = {
  args: {
    label: 'Выравнивание по правому краю',
    placeholder: 'Текст справа...',
    textAlign: 'right',
    defaultValue: 'Текст справа',
  },
};

export const TextAlignComparison: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '400px',
      }}
    >
      <Input
        label="По левому краю (по умолчанию)"
        placeholder="Введите текст..."
        textAlign="left"
        defaultValue="Текст слева"
      />

      <Input
        label="По центру"
        placeholder="Введите текст..."
        textAlign="center"
        defaultValue="Текст по центру"
      />

      <Input
        label="По правому краю"
        placeholder="Введите текст..."
        textAlign="right"
        defaultValue="Текст справа"
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// Комплексные примеры
export const AllVariants: Story = {
  render: () => {
    const [okEmail, setOkEmail] = React.useState('user@example.com');
    const [search, setSearch] = React.useState('Поисковый запрос');
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          width: '400px',
        }}
      >
        <Input
          label="Обычное поле"
          placeholder="Введите текст..."
          helperText="Это обычное поле ввода"
        />

        <Input label="С ошибкой" placeholder="Введите email..." error="Неверный формат email" />

        <Input
          label="С успехом"
          placeholder="Введите email..."
          value={okEmail}
          onChange={(e) => setOkEmail(e.target.value)}
          success={true}
        />

        <Input
          label="С очисткой"
          variant={InputVariant.CLEAR}
          placeholder="Поиск..."
          displayClearIcon
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClearIconClick={() => setSearch('')}
          rightIcon={<Icon name="IconExSearch" size={IconSize.MD} />}
        />

        <Input label="Отключенное" placeholder="Недоступно..." disabled={true} />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

export const FormExample: Story = {
  render: () => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [password2, setPassword2] = React.useState('');
    const mismatch =
      password2.length > 0 && password.length > 0 && password !== password2
        ? 'Пароли не совпадают'
        : undefined;
    const reset = () => {
      setName('');
      setEmail('');
      setPassword('');
      setPassword2('');
    };
    return (
      <Form formId="form-example" onSubmit={(e) => e.preventDefault()}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            width: '400px',
          }}
        >
          <HiddenUsernameField />
          <Input
            label="Имя"
            placeholder="Введите имя..."
            leftIcon={<Icon name="IconExUser" size={IconSize.MD} />}
            autoComplete="given-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            label="Email"
            placeholder="Введите email..."
            leftIcon={<Icon name="IconExMail" size={IconSize.MD} />}
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Пароль"
            placeholder="Введите пароль..."
            leftIcon={<Icon name="IconExLock" size={IconSize.MD} />}
            type="password"
            autoComplete="new-password"
            helperText="Минимум 8 символов"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Input
            label="Подтвердите пароль"
            placeholder="Повторите пароль..."
            leftIcon={<Icon name="IconExLock" size={IconSize.MD} />}
            type="password"
            autoComplete="new-password"
            error={mismatch}
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />

          <button type="button" onClick={reset} style={inputStoriesResetButtonStyle}>
            Очистить форму
          </button>
        </div>
      </Form>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

export const WithClearIcon: Story = {
  render: () => {
    const [text, setText] = React.useState('Пример текста');
    return (
      <Input
        label="Кнопка очистки"
        placeholder="Введите текст..."
        displayClearIcon
        value={text}
        onChange={(e) => setText(e.target.value)}
        onClearIconClick={() => setText('')}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Кнопка очистки: `displayClearIcon` + `onClearIconClick` сбрасывают значение у родителя.',
      },
    },
  },
};

export const LoadingDemo: Story = {
  render: () => {
    const [value1, setValue1] = React.useState('');
    const [value2, setValue2] = React.useState('');
    const [value3, setValue3] = React.useState('');
    const [isLoading1, setIsLoading1] = React.useState(false);
    const [isLoading2, _setIsLoading2] = React.useState(true);
    const [isLoading3, setIsLoading3] = React.useState(false);

    React.useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading1(false);
        setValue1('Данные загружены!');
      }, 3000);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <Input
          label="Загрузка данных (3 сек)"
          placeholder="Введите текст..."
          isLoading={isLoading1}
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
          leftIcon={<Icon name="IconPlainerPlus" size={IconSize.SM} />}
        />

        <Input
          label="Постоянная загрузка"
          placeholder="Введите текст..."
          isLoading={isLoading2}
          value={value2}
          onChange={(e) => setValue2(e.target.value)}
          leftIcon={<Icon name="IconPlainerUser" size={IconSize.SM} />}
        />

        <Input
          label="Загрузка с кнопкой"
          placeholder="Введите текст..."
          isLoading={isLoading3}
          value={value3}
          onChange={(e) => setValue3(e.target.value)}
          rightIcon={<Icon name="IconPlainerSearch" size={IconSize.SM} />}
        />

        <button
          onClick={() => setIsLoading3(!isLoading3)}
          style={{
            padding: '8px 16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            background: 'white',
            cursor: 'pointer',
          }}
        >
          {isLoading3 ? 'Остановить загрузку' : 'Начать загрузку'}
        </button>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Демонстрация состояния загрузки в Input. При isLoading=true отображается спиннер вместо rightIcon.',
      },
    },
  },
};

export const SkeletonDemo: Story = {
  render: () => {
    const [value1, setValue1] = React.useState('');
    const [value2, setValue2] = React.useState('');
    const [value3, setValue3] = React.useState('');
    const [skeleton1, setSkeleton1] = React.useState(false);
    const [skeleton2, _setSkeleton2] = React.useState(true);
    const [skeleton3, setSkeleton3] = React.useState(false);

    React.useEffect(() => {
      const timer = setTimeout(() => {
        setSkeleton1(false);
        setValue1('Данные загружены!');
      }, 3000);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <Input
          label="Skeleton эффект (3 сек)"
          placeholder="Введите текст..."
          skeleton={skeleton1}
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
          leftIcon={<Icon name="IconPlainerPlus" size={IconSize.SM} />}
        />

        <Input
          label="Постоянный skeleton"
          placeholder="Введите текст..."
          skeleton={skeleton2}
          value={value2}
          onChange={(e) => setValue2(e.target.value)}
          leftIcon={<Icon name="IconPlainerUser" size={IconSize.SM} />}
        />

        <Input
          label="Skeleton с кнопкой"
          placeholder="Введите текст..."
          skeleton={skeleton3}
          value={value3}
          onChange={(e) => setValue3(e.target.value)}
          rightIcon={<Icon name="IconPlainerSearch" size={IconSize.SM} />}
        />

        <button
          onClick={() => setSkeleton3(!skeleton3)}
          style={{
            padding: '8px 16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            background: 'white',
            cursor: 'pointer',
          }}
        >
          {skeleton3 ? 'Убрать skeleton' : 'Показать skeleton'}
        </button>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'При skeleton=true анимированный плейсхолдер показывается только на поле ввода; label и additionalLabel остаются видимым текстом.',
      },
    },
  },
};

export const TooltipDemo: Story = {
  render: () => {
    const [value1, setValue1] = React.useState('Обычный инпут');
    const [value2, setValue2] = React.useState('Инпут с тултипом');
    const [value3, setValue3] = React.useState('Инпут с хинтом');
    const [value4, setValue4] = React.useState('');
    const [value5, setValue5] = React.useState('');
    const [value6, setValue6] = React.useState('');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <Input
          label="Обычный инпут"
          placeholder="Без подсказки"
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
        />

        <Input
          label="Инпут с тултипом (сверху)"
          placeholder="Наведите курсор для показа тултипа"
          value={value2}
          onChange={(e) => setValue2(e.target.value)}
          tooltip="Это тултип с дополнительной информацией об инпуте"
          tooltipType="tooltip"
          tooltipPosition="top"
        />

        <Input
          label="Инпут с хинтом (снизу)"
          placeholder="Наведите курсор для показа хинта"
          value={value3}
          onChange={(e) => setValue3(e.target.value)}
          tooltip="Это хинт с более подробной информацией и возможностью взаимодействия"
          tooltipType="hint"
          tooltipPosition="bottom"
        />

        <Input
          label="Инпут с тултипом (слева)"
          placeholder="Тултип слева"
          value={value4}
          onChange={(e) => setValue4(e.target.value)}
          tooltip="Тултип слева от инпута"
          tooltipType="tooltip"
          tooltipPosition="left"
        />

        <Input
          label="Инпут с хинтом (справа)"
          placeholder="Хинт справа"
          value={value5}
          onChange={(e) => setValue5(e.target.value)}
          tooltip="Хинт справа от инпута"
          tooltipType="hint"
          tooltipPosition="right"
        />

        <Input
          label="Инпут с тултипом и иконкой"
          placeholder="Тултип с иконкой"
          value={value6}
          onChange={(e) => setValue6(e.target.value)}
          leftIcon={<Icon name="IconPlainerPlus" size={IconSize.SM} />}
          tooltip={
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon name="IconPlainerPlus" size={IconSize.XS} />
              <span>Тултип с иконкой и текстом</span>
            </div>
          }
          tooltipType="tooltip"
          tooltipPosition="top"
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Демонстрация tooltip и hint для Input. Можно выбрать тип подсказки (tooltip/hint) и позицию (top/bottom/left/right).',
      },
    },
  },
};

export const CharacterCounterDemo: Story = {
  render: () => {
    const [value1, setValue1] = React.useState('Обычный инпут');
    const [value2, setValue2] = React.useState('Инпут с счетчиком');
    const [value3, setValue3] = React.useState('Инпут без счетчика');
    const [value4, setValue4] = React.useState('');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <Input
          label="Обычный инпут"
          placeholder="Без maxLength"
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
        />

        <Input
          label="Инпут с счетчиком символов"
          placeholder="С maxLength и счетчиком"
          value={value2}
          onChange={(e) => setValue2(e.target.value)}
          maxLength={50}
          displayCharacterCounter={true}
        />

        <Input
          label="Инпут без счетчика символов"
          placeholder="С maxLength но без счетчика"
          value={value3}
          onChange={(e) => setValue3(e.target.value)}
          maxLength={30}
          displayCharacterCounter={false}
        />

        <Input
          label="Лимит 20 символов"
          placeholder="Счётчик при maxLength=20"
          value={value4}
          onChange={(e) => setValue4(e.target.value)}
          maxLength={20}
          displayCharacterCounter={true}
          helperText="Браузер не даст ввести больше 20 символов — счётчик показывает заполнение"
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Демонстрация displayCharacterCounter для Input. Позволяет отключать появление счетчика символов при задании maxLength.',
      },
    },
  },
};

export const ExtraTextDemo: Story = {
  render: () => {
    const [value1, setValue1] = React.useState('Обычный инпут');
    const [value2, setValue2] = React.useState('Инпут с дополнительным текстом');
    const [value3, setValue3] = React.useState('');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <Input
          label="Обычный инпут"
          placeholder="Без дополнительного текста"
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
          helperText="Это helper text"
        />

        <Input
          label="Инпут с extraText"
          placeholder="С дополнительным текстом"
          value={value2}
          onChange={(e) => setValue2(e.target.value)}
          helperText="Это helper text"
          extraText="Это дополнительный текст, который отображается ниже компонента"
        />

        <Input
          label="Только extraText"
          placeholder="Без helper text"
          value={value3}
          onChange={(e) => setValue3(e.target.value)}
          extraText="Только дополнительный текст без helper text"
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Демонстрация extraText для Input. Дополнительный текст отображается ниже компонента.',
      },
    },
  },
};

export const DisableCopyingDemo: Story = {
  render: () => {
    const [value1, setValue1] = React.useState('Обычный инпут - можно копировать');
    const [value2, setValue2] = React.useState('Защищенный инпут - нельзя копировать');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <Input
          label="Обычный инпут"
          placeholder="Можно выделять и копировать текст"
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
          helperText="Попробуйте выделить и скопировать текст (Ctrl+C)"
        />

        <Input
          label="Защищенный инпут"
          placeholder="Нельзя выделять и копировать текст"
          value={value2}
          onChange={(e) => setValue2(e.target.value)}
          disableCopying={true}
          helperText="Попробуйте выделить и скопировать текст - не получится!"
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Демонстрация disableCopying для Input. Отключает возможность выделения и копирования значения поля.',
      },
    },
  },
};

export const HandleInputDemo: Story = {
  render: () => {
    const [value1, setValue1] = React.useState('');
    const [value2, setValue2] = React.useState('');
    const [value3, setValue3] = React.useState('');
    const [value4, setValue4] = React.useState('');
    const [value5, setValue5] = React.useState('');

    // Маска для телефона
    const phoneMask = (value: string, cursorPosition: number) => {
      const digits = value.replace(/\D/g, '');
      let formatted = '';

      if (digits.length > 0) {
        formatted = '+7';
        if (digits.length > 1) {
          formatted += ` (${digits.slice(1, 4)}`;
          if (digits.length > 4) {
            formatted += `) ${digits.slice(4, 7)}`;
            if (digits.length > 7) {
              formatted += `-${digits.slice(7, 9)}`;
              if (digits.length > 9) {
                formatted += `-${digits.slice(9, 11)}`;
              }
            }
          }
        }
      }

      // Умное позиционирование курсора
      let newCursorPosition = cursorPosition;

      // Если строка стала длиннее (добавили символ), ставим курсор в конец
      if (formatted.length > value.length) {
        newCursorPosition = formatted.length;
      } else if (formatted.length < value.length) {
        // Если строка стала короче (удалили символ), сохраняем позицию
        newCursorPosition = Math.min(cursorPosition, formatted.length);
      } else {
        // Если длина не изменилась, сохраняем позицию
        newCursorPosition = Math.min(cursorPosition, formatted.length);
      }

      return {
        value: formatted,
        cursorPosition: newCursorPosition,
      };
    };

    // Маска для карты
    const cardMask = (value: string, cursorPosition: number) => {
      const digits = value.replace(/\D/g, '');
      let formatted = '';

      for (let i = 0; i < digits.length; i++) {
        if (i > 0 && i % 4 === 0) {
          formatted += ' ';
        }
        formatted += digits[i];
      }

      // Умное позиционирование курсора
      let newCursorPosition = cursorPosition;

      // Если строка стала длиннее (добавили символ), ставим курсор в конец
      if (formatted.length > value.length) {
        newCursorPosition = formatted.length;
      } else if (formatted.length < value.length) {
        // Если строка стала короче (удалили символ), сохраняем позицию
        newCursorPosition = Math.min(cursorPosition, formatted.length);
      } else {
        // Если длина не изменилась, сохраняем позицию
        newCursorPosition = Math.min(cursorPosition, formatted.length);
      }

      return {
        value: formatted,
        cursorPosition: newCursorPosition,
      };
    };

    // Маска для суммы
    const amountMask = (value: string, cursorPosition: number) => {
      const digits = value.replace(/\D/g, '');
      const amount = digits ? parseInt(digits, 10) : 0;
      const formatted = amount.toLocaleString('ru-RU');

      // Умное позиционирование курсора
      let newCursorPosition = cursorPosition;

      // Если строка стала длиннее (добавили символ), ставим курсор в конец
      if (formatted.length > value.length) {
        newCursorPosition = formatted.length;
      } else if (formatted.length < value.length) {
        // Если строка стала короче (удалили символ), сохраняем позицию
        newCursorPosition = Math.min(cursorPosition, formatted.length);
      } else {
        // Если длина не изменилась, сохраняем позицию
        newCursorPosition = Math.min(cursorPosition, formatted.length);
      }

      return { value: formatted, cursorPosition: newCursorPosition };
    };

    // Маска для ИНН
    const innMask = (value: string, cursorPosition: number) => {
      const digits = value.replace(/\D/g, '');
      const formatted = digits.slice(0, 12); // ИНН может быть 10 или 12 цифр

      // Умное позиционирование курсора
      let newCursorPosition = cursorPosition;

      // Если строка стала длиннее (добавили символ), ставим курсор в конец
      if (formatted.length > value.length) {
        newCursorPosition = formatted.length;
      } else if (formatted.length < value.length) {
        // Если строка стала короче (удалили символ), сохраняем позицию
        newCursorPosition = Math.min(cursorPosition, formatted.length);
      } else {
        // Если длина не изменилась, сохраняем позицию
        newCursorPosition = Math.min(cursorPosition, formatted.length);
      }

      return {
        value: formatted,
        cursorPosition: newCursorPosition,
      };
    };

    // Маска для СНИЛС
    const snilsMask = (value: string, cursorPosition: number) => {
      const digits = value.replace(/\D/g, '');
      let formatted = '';

      if (digits.length > 0) {
        formatted = digits.slice(0, 3);
        if (digits.length > 3) {
          formatted += `-${digits.slice(3, 6)}`;
          if (digits.length > 6) {
            formatted += `-${digits.slice(6, 9)}`;
            if (digits.length > 9) {
              formatted += ` ${digits.slice(9, 11)}`;
            }
          }
        }
      }

      // Умное позиционирование курсора
      let newCursorPosition = cursorPosition;

      // Если строка стала длиннее (добавили символ), ставим курсор в конец
      if (formatted.length > value.length) {
        newCursorPosition = formatted.length;
      } else if (formatted.length < value.length) {
        // Если строка стала короче (удалили символ), сохраняем позицию
        newCursorPosition = Math.min(cursorPosition, formatted.length);
      } else {
        // Если длина не изменилась, сохраняем позицию
        newCursorPosition = Math.min(cursorPosition, formatted.length);
      }

      return {
        value: formatted,
        cursorPosition: newCursorPosition,
      };
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <Input
          label="Телефон (маска +7 (XXX) XXX-XX-XX)"
          placeholder="+7 (___) ___-__-__"
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
          handleInput={phoneMask}
        />

        <Input
          label="Номер карты (маска XXXX XXXX XXXX XXXX)"
          placeholder="____ ____ ____ ____"
          value={value2}
          onChange={(e) => setValue2(e.target.value)}
          handleInput={cardMask}
        />

        <Input
          label="Сумма (форматирование с пробелами)"
          placeholder="0"
          value={value3}
          onChange={(e) => setValue3(e.target.value)}
          handleInput={amountMask}
        />

        <Input
          label="ИНН (только цифры, макс 12)"
          placeholder="1234567890"
          value={value4}
          onChange={(e) => setValue4(e.target.value)}
          handleInput={innMask}
        />

        <Input
          label="СНИЛС (маска XXX-XXX-XXX XX)"
          placeholder="123-456-789 12"
          value={value5}
          onChange={(e) => setValue5(e.target.value)}
          handleInput={snilsMask}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Демонстрация `handleInput` в `Input`: маски и форматирование применяются при вводе (цифры телефона, карты и т.д.).',
      },
    },
  },
};

export const IgnoreMaskCharactersDemo: Story = {
  render: () => {
    const [value1, setValue1] = React.useState('10.12.1985');
    const [value2, setValue2] = React.useState('10.12.1985');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <Input
          label="Обычный счетчик символов"
          placeholder="Введите дату..."
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
          maxLength={10}
          displayCharacterCounter={true}
          ignoreMaskCharacters={false}
          helperText="Считаются все символы включая разделители (10/10)"
        />

        <Input
          label="Счетчик без символов маски"
          placeholder="Введите дату..."
          value={value2}
          onChange={(e) => setValue2(e.target.value)}
          maxLength={8}
          displayCharacterCounter={true}
          ignoreMaskCharacters={true}
          helperText="Считаются только цифры, разделители игнорируются (8/8)"
        />

        <div
          style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
          }}
        >
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Сравнение:</h4>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px' }}>
            <li>
              <strong>ignoreMaskCharacters=false:</strong> &quot;10.12.1985&quot; = 10 символов
            </li>
            <li>
              <strong>ignoreMaskCharacters=true:</strong> &quot;10.12.1985&quot; = 8 символов
              (10121985)
            </li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Демонстрация пропа ignoreMaskCharacters. Позволяет исключать символы маски (разделители) из подсчета символов для maxLength.',
      },
    },
  },
};

export const CharacterCounterThresholdDemo: Story = {
  render: () => {
    const [value1, setValue1] = React.useState('');
    const [value2, setValue2] = React.useState('');
    const [value3, setValue3] = React.useState('');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <Input
          label="Всегда видимый счетчик (threshold=0)"
          placeholder="Введите текст..."
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
          maxLength={20}
          displayCharacterCounter={true}
          characterCounterVisibilityThreshold={0}
          helperText="Счетчик виден с первого символа"
        />

        <Input
          label="Счетчик при 80% заполнения (threshold=0.8)"
          placeholder="Введите текст..."
          value={value2}
          onChange={(e) => setValue2(e.target.value)}
          maxLength={20}
          displayCharacterCounter={true}
          characterCounterVisibilityThreshold={0.8}
          helperText="Счетчик появится при вводе 16+ символов"
        />

        <Input
          label="Скрытый счетчик (threshold=1)"
          placeholder="Введите текст..."
          value={value3}
          onChange={(e) => setValue3(e.target.value)}
          maxLength={20}
          displayCharacterCounter={true}
          characterCounterVisibilityThreshold={1}
          helperText="Счетчик никогда не показывается"
        />

        <div
          style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
          }}
        >
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Пороги видимости:</h4>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px' }}>
            <li>
              <strong>threshold=0:</strong> Счетчик всегда видим
            </li>
            <li>
              <strong>threshold=0.5:</strong> Видим при заполнении 50% (10/20 символов)
            </li>
            <li>
              <strong>threshold=0.8:</strong> Видим при заполнении 80% (16/20 символов)
            </li>
            <li>
              <strong>threshold=1:</strong> Счетчик всегда скрыт
            </li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Демонстрация пропа characterCounterVisibilityThreshold. Позволяет управлять видимостью счетчика символов в зависимости от заполненности поля.',
      },
    },
  },
};

export const AdditionalLabelDemo: Story = {
  render: () => {
    const [value1, setValue1] = React.useState('');
    const [value2, setValue2] = React.useState('');
    const [value3, setValue3] = React.useState('');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <Input
          label="Имя пользователя"
          additionalLabel="Уникальный идентификатор для входа в систему"
          placeholder="Введите имя пользователя..."
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
          helperText="Используйте только латинские буквы и цифры"
        />

        <Input
          label="Email"
          additionalLabel="Основной адрес электронной почты"
          placeholder="example@domain.com"
          value={value2}
          onChange={(e) => setValue2(e.target.value)}
          type="email"
          helperText="На этот адрес будут приходить уведомления"
        />

        <Input
          label="Номер телефона"
          additionalLabel="Международный формат с кодом страны"
          placeholder="+7 (999) 123-45-67"
          value={value3}
          onChange={(e) => setValue3(e.target.value)}
          type="tel"
          helperText="Используется для двухфакторной аутентификации"
        />

        <div
          style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
          }}
        >
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Дополнительные метки:</h4>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px' }}>
            <li>
              <strong>additionalLabel</strong> отображается справа от основного label
            </li>
            <li>Имеет меньший размер шрифта и пониженную прозрачность</li>
            <li>Предоставляет дополнительную информацию о назначении поля</li>
            <li>Помогает пользователям лучше понимать требования к вводу</li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Демонстрация пропа additionalLabel. Позволяет добавить дополнительное описание поля формы под основным label.',
      },
    },
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'Поле только для чтения',
    value: 'Это значение нельзя изменить',
    readOnly: true,
    helperText: 'Текст остается обычным цветом, но фон становится серым',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Поле в режиме только для чтения. Текст остается обычным цветом, но фон становится серым, чтобы показать, что поле недоступно для редактирования.',
      },
    },
  },
};

export const ReadOnlyWithIcon: Story = {
  args: {
    label: 'Поле только для чтения с иконкой',
    value: 'Значение с иконкой',
    readOnly: true,
    leftIcon: <Icon name="IconPlainerUser" size={IconSize.SM} />,
    helperText: 'Иконки также работают в режиме readOnly',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Поле в режиме только для чтения с иконкой. Иконки отображаются нормально, но поле остается недоступным для редактирования.',
      },
    },
  },
};

export const ReadOnlyComparison: Story = {
  render: () => {
    const [editable, setEditable] = React.useState('Можно редактировать');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Input
          label="Обычное поле"
          value={editable}
          onChange={(e) => setEditable(e.target.value)}
          placeholder="Введите текст"
        />
        <Input
          label="Поле только для чтения"
          value="Нельзя редактировать"
          readOnly={true}
          helperText="Текст обычного цвета, серый фон"
        />
        <Input
          label="Отключенное поле"
          value="Полностью отключено"
          disabled={true}
          helperText="Текст серого цвета, полностью неактивно"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Сравнение обычного поля, поля только для чтения и отключенного поля. ReadOnly сохраняет читаемость текста, но показывает, что поле недоступно для редактирования.',
      },
    },
  },
};

export const PasswordForm: Story = {
  render: () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [password2, setPassword2] = React.useState('');
    const reset = () => {
      setUsername('');
      setPassword('');
      setPassword2('');
    };
    return (
      <Form formId="password-form" formName="passwordForm" onSubmit={(e) => e.preventDefault()}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input
            label="Имя пользователя"
            placeholder="Введите имя пользователя"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            label="Пароль"
            type="password"
            placeholder="Введите пароль..."
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            label="Повторите пароль"
            type="password"
            placeholder="Повторите пароль..."
            autoComplete="new-password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              type="submit"
              style={{
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Отправить
            </button>
            <button type="button" onClick={reset} style={inputStoriesResetButtonStyle}>
              Очистить
            </button>
          </div>
        </div>
      </Form>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Пример использования компонента Form для группировки полей пароля. Это устраняет предупреждения браузера о полях пароля вне формы.',
      },
    },
  },
};

export const PasswordComparison: Story = {
  render: () => {
    const [regUser, setRegUser] = React.useState('');
    const [regPass, setRegPass] = React.useState('');
    const [regPass2, setRegPass2] = React.useState('');
    const [loginEmail, setLoginEmail] = React.useState('');
    const [loginPass, setLoginPass] = React.useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <h3 style={{ marginBottom: '16px', color: '#28a745' }}>
            ✅ Форма регистрации (новые пароли)
          </h3>
          <Form formId="registration-form" onSubmit={(e) => e.preventDefault()}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Input
                label="Имя пользователя"
                placeholder="Введите имя пользователя"
                autoComplete="username"
                value={regUser}
                onChange={(e) => setRegUser(e.target.value)}
              />
              <Input
                label="Пароль"
                type="password"
                placeholder="Введите пароль..."
                autoComplete="new-password"
                value={regPass}
                onChange={(e) => setRegPass(e.target.value)}
              />
              <Input
                label="Повторите пароль"
                type="password"
                placeholder="Повторите пароль..."
                autoComplete="new-password"
                value={regPass2}
                onChange={(e) => setRegPass2(e.target.value)}
              />
              <button
                type="button"
                onClick={() => {
                  setRegUser('');
                  setRegPass('');
                  setRegPass2('');
                }}
                style={inputStoriesResetButtonStyle}
              >
                Очистить
              </button>
            </div>
          </Form>
        </div>

        <div>
          <h3 style={{ marginBottom: '16px', color: '#007bff' }}>
            ✅ Форма входа (текущий пароль)
          </h3>
          <Form formId="login-form" onSubmit={(e) => e.preventDefault()}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <HiddenUsernameField />
              <Input
                label="Email"
                type="email"
                placeholder="Введите email"
                autoComplete="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <Input
                label="Пароль"
                type="password"
                placeholder="Введите пароль"
                autoComplete="current-password"
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
              />
              <button
                type="button"
                onClick={() => {
                  setLoginEmail('');
                  setLoginPass('');
                }}
                style={inputStoriesResetButtonStyle}
              >
                Очистить
              </button>
            </div>
          </Form>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Сравнение различных типов форм с полями пароля. Все поля правильно обернуты в Form компоненты с соответствующими атрибутами autocomplete.',
      },
    },
  },
};

export const AutocompleteDemo: Story = {
  render: () => {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [newPass, setNewPass] = React.useState('');
    const [curPass, setCurPass] = React.useState('');
    const [given, setGiven] = React.useState('');
    const [family, setFamily] = React.useState('');
    const resetAll = () => {
      setUsername('');
      setEmail('');
      setNewPass('');
      setCurPass('');
      setGiven('');
      setFamily('');
    };
    return (
      <Form formId="autocomplete-demo" onSubmit={(e) => e.preventDefault()}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ marginBottom: '8px' }}>Демонстрация различных типов autocomplete</h3>

          <HiddenUsernameField />

          <Input
            label="Имя пользователя"
            placeholder="Введите имя пользователя"
            autoComplete="username"
            helperText="autocomplete='username'"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            label="Email"
            type="email"
            placeholder="Введите email"
            autoComplete="email"
            helperText="autocomplete='email'"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Новый пароль"
            type="password"
            placeholder="Введите новый пароль"
            autoComplete="new-password"
            helperText="autocomplete='new-password'"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />

          <Input
            label="Текущий пароль"
            type="password"
            placeholder="Введите текущий пароль"
            autoComplete="current-password"
            helperText="autocomplete='current-password'"
            value={curPass}
            onChange={(e) => setCurPass(e.target.value)}
          />

          <Input
            label="Имя"
            placeholder="Введите имя"
            autoComplete="given-name"
            helperText="autocomplete='given-name'"
            value={given}
            onChange={(e) => setGiven(e.target.value)}
          />

          <Input
            label="Фамилия"
            placeholder="Введите фамилию"
            autoComplete="family-name"
            helperText="autocomplete='family-name'"
            value={family}
            onChange={(e) => setFamily(e.target.value)}
          />

          <button type="button" onClick={resetAll} style={inputStoriesResetButtonStyle}>
            Очистить все поля
          </button>
        </div>
      </Form>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Демонстрация различных типов атрибутов autocomplete для улучшения пользовательского опыта и безопасности.',
      },
    },
  },
};

