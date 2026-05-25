import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { Select } from '../Select/Select';
import { Icon } from '../../Icon/Icon';
import { Form, HiddenUsernameField } from '../../Form';
import React from 'react';
import { Size, IconSize } from '../../../../types/sizes';
import { InputVariant, type SelectOption } from '../../../../types/ui';
import { DOC_INPUT } from '@/components/ui/storyDocs/uiKitDocs';
import { inputStoriesStyles } from './Input.stories.styles';
import { inputArgsStory, inputRenderStory } from './inputStoriesDocs';

const currencySelectOptions: SelectOption[] = [
  { value: 'rub', label: '₽ RUB' },
  { value: 'usd', label: '$ USD' },
  { value: 'eur', label: '€ EUR' },
];

const unitSelectOptions: SelectOption[] = [
  { value: 'kg', label: 'кг' },
  { value: 'g', label: 'г' },
  { value: 't', label: 'т' },
];

const citySearchSelectOptions: SelectOption[] = [
  { value: 'moscow', label: 'Москва' },
  { value: 'spb', label: 'Санкт-Петербург' },
  { value: 'ekb', label: 'Екатеринбург' },
  { value: 'nsk', label: 'Новосибирск' },
  { value: 'kzn', label: 'Казань' },
  { value: 'nn', label: 'Нижний Новгород' },
];

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
      wrapUsageInForm: true,
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

// Основные варианты
const defaultArgs = { placeholder: 'Введите текст...' };

export const Default: Story = {
  ...inputArgsStory('Базовое поле с плейсхолдером.', defaultArgs),
  args: defaultArgs,
};

const withLabelArgs = {
  label: 'Email',
  placeholder: 'Введите email...',
};

export const WithLabel: Story = {
  ...inputArgsStory('Поле с подписью (`label`).', withLabelArgs),
  args: withLabelArgs,
};

const withHelperTextArgs = {
  label: 'Пароль',
  type: 'password',
  placeholder: 'Введите пароль...',
  helperText: 'Минимум 8 символов',
};

export const WithHelperText: Story = {
  ...inputArgsStory(
    'Поле с вспомогательным текстом под вводом (`helperText`).',
    withHelperTextArgs,
  ),
  args: withHelperTextArgs,
};

const withErrorArgs = {
  label: 'Email',
  placeholder: 'Введите email...',
  error: 'Неверный формат email',
};

export const WithError: Story = {
  ...inputArgsStory('Состояние ошибки: `error` — красная обводка и текст под полем.', withErrorArgs),
  args: withErrorArgs,
};

const withSuccessUsageCode = `const [email, setEmail] = React.useState('user@example.com');

<Input
  label="Email"
  placeholder="Введите email..."
  value={email}
  onChange={(event) => setEmail(event.target.value)}
  success
/>`;

export const WithSuccess: Story = {
  ...inputRenderStory(
    'Успешное состояние: контролируемый email и `success` (зелёная обводка и текст «Успешно» под полем).',
    withSuccessUsageCode,
  ),
  render: () => {
    const [email, setEmail] = React.useState('user@example.com');
    return (
      <Input
        label="Email"
        placeholder="Введите email..."
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        success={true}
      />
    );
  },
};

// Варианты
const clearUsageCode = `const [query, setQuery] = React.useState('Поисковый запрос');

<Input
  label="Поиск"
  variant="clear"
  placeholder="Поиск..."
  displayClearIcon
  value={query}
  onChange={(event) => setQuery(event.target.value)}
  onClearIconClick={() => setQuery('')}
/>`;

export const Clear: Story = {
  ...inputRenderStory(
    'Вариант `clear`: акцент на очистку (`displayClearIcon`, `onClearIconClick`).',
    clearUsageCode,
  ),
  render: () => {
    const [query, setQuery] = React.useState('Поисковый запрос');
    return (
      <Input
        label="Поиск"
        variant={InputVariant.CLEAR}
        placeholder="Поиск..."
        displayClearIcon
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onClearIconClick={() => setQuery('')}
      />
    );
  },
};

// Размеры
const smallArgs = {
  label: 'Small Input',
  size: Size.SM,
  placeholder: 'Small...',
};

export const Small: Story = {
  ...inputArgsStory('Размер `SM`.', smallArgs),
  args: smallArgs,
};

const mediumArgs = {
  label: 'Medium Input',
  size: Size.MD,
  placeholder: 'Medium...',
};

export const Medium: Story = {
  ...inputArgsStory('Размер `MD` (по умолчанию).', mediumArgs),
  args: mediumArgs,
};

const largeArgs = {
  label: 'Large Input',
  size: Size.LG,
  placeholder: 'Large...',
};

export const Large: Story = {
  ...inputArgsStory('Размер `LG`.', largeArgs),
  args: largeArgs,
};

const extraLargeArgs = {
  label: 'Extra Large Input',
  size: Size.XL,
  placeholder: 'Extra Large...',
};

export const ExtraLarge: Story = {
  ...inputArgsStory('Размер `XL`.', extraLargeArgs),
  args: extraLargeArgs,
};

// С иконками
const withLeftIconArgs = {
  label: 'Email',
  placeholder: 'Введите email...',
  leftIcon: <Icon name="IconExMail" size={IconSize.MD} />,
};

export const WithLeftIcon: Story = {
  ...inputArgsStory('Иконка слева (`leftIcon`).', withLeftIconArgs),
  args: withLeftIconArgs,
};

const withRightIconArgs = {
  label: 'Поиск',
  placeholder: 'Поиск...',
  rightIcon: <Icon name="IconExSearch" size={IconSize.MD} />,
};

export const WithRightIcon: Story = {
  ...inputArgsStory('Иконка справа (`rightIcon`).', withRightIconArgs),
  args: withRightIconArgs,
};

const withBothIconsArgs = {
  label: 'Сумма',
  placeholder: '0.00',
  leftIcon: <Icon name="IconPlainerDollar" size={IconSize.MD} />,
  rightIcon: <Icon name="IconPlainerPercent" size={IconSize.MD} />,
};

export const WithBothIcons: Story = {
  ...inputArgsStory('Иконки слева и справа.', withBothIconsArgs),
  args: withBothIconsArgs,
};

// Состояния
const disabledArgs = {
  label: 'Disabled Input',
  placeholder: 'Недоступно...',
  disabled: true,
};

export const Disabled: Story = {
  ...inputArgsStory('Отключённое поле (`disabled`).', disabledArgs),
  args: disabledArgs,
};

const requiredArgs = {
  label: 'Обязательное поле',
  placeholder: 'Введите значение...',
  required: true,
};

export const Required: Story = {
  ...inputArgsStory('Обязательное поле (`required`).', requiredArgs),
  args: requiredArgs,
};

const fullWidthArgs = {
  label: 'Full Width Input',
  placeholder: 'Полная ширина...',
  fullWidth: true,
};

export const FullWidth: Story = {
  ...inputArgsStory('Полная ширина (`fullWidth`).', fullWidthArgs),
  args: fullWidthArgs,
  parameters: {
    layout: 'padded',
  },
};

// Выравнивание текста
const textAlignLeftArgs = {
  label: 'Выравнивание по левому краю',
  placeholder: 'Текст слева...',
  textAlign: 'left' as const,
  defaultValue: 'Текст выровнен по левому краю',
};

export const TextAlignLeft: Story = {
  ...inputArgsStory('Выравнивание текста по левому краю (`textAlign="left"`).', textAlignLeftArgs),
  args: textAlignLeftArgs,
};

const textAlignCenterArgs = {
  label: 'Выравнивание по центру',
  placeholder: 'Текст по центру...',
  textAlign: 'center' as const,
  defaultValue: 'Текст по центру',
};

export const TextAlignCenter: Story = {
  ...inputArgsStory('Выравнивание по центру (`textAlign="center"`).', textAlignCenterArgs),
  args: textAlignCenterArgs,
};

const textAlignRightArgs = {
  label: 'Выравнивание по правому краю',
  placeholder: 'Текст справа...',
  textAlign: 'right' as const,
  defaultValue: 'Текст справа',
};

export const TextAlignRight: Story = {
  ...inputArgsStory('Выравнивание по правому краю (`textAlign="right"`).', textAlignRightArgs),
  args: textAlignRightArgs,
};

export const TextAlignComparison: Story = {
  ...inputRenderStory('Сравнение `textAlign`: left, center, right.'),
  render: () => (
    <div style={inputStoriesStyles.columnGap16Width400}>
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
  ...inputRenderStory('Набор типовых состояний: helper, error, success, clear, disabled.'),
  render: () => {
    const [okEmail, setOkEmail] = React.useState('user@example.com');
    const [search, setSearch] = React.useState('Поисковый запрос');
    return (
      <div style={inputStoriesStyles.columnGap24Width400}>
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
  ...inputRenderStory('Форма регистрации: несколько полей, проверка совпадения паролей, `HiddenUsernameField`.'),
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
        <div style={inputStoriesStyles.columnGap16Width400}>
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

          <button type="button" onClick={reset} style={inputStoriesStyles.formResetButton}>
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
  ...inputRenderStory('Кнопка очистки: `displayClearIcon` + `onClearIconClick` сбрасывают значение у родителя.'),
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
};

export const LoadingDemo: Story = {
  ...inputRenderStory('Демонстрация состояния загрузки в Input. При `isLoading` отображается спиннер вместо `rightIcon`.'),
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
      <div style={inputStoriesStyles.columnGap16Width400}>
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
          type="button"
          style={inputStoriesStyles.actionButtonMedium}
        >
          {isLoading3 ? 'Остановить загрузку' : 'Начать загрузку'}
        </button>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

export const SkeletonDemo: Story = {
  ...inputRenderStory('При `skeleton` анимированный плейсхолдер только на поле ввода; label и `additionalLabel` остаются видимым текстом.'),
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
      <div style={inputStoriesStyles.columnGap16Width400}>
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
          type="button"
          style={inputStoriesStyles.actionButtonMedium}
        >
          {skeleton3 ? 'Убрать skeleton' : 'Показать skeleton'}
        </button>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

export const TooltipDemo: Story = {
  ...inputRenderStory('Демонстрация `tooltip` и `hint`: тип подсказки (`tooltipType`) и позиция (`tooltipPosition`).'),
  render: () => {
    const [value1, setValue1] = React.useState('Обычный инпут');
    const [value2, setValue2] = React.useState('Инпут с тултипом');
    const [value3, setValue3] = React.useState('Инпут с хинтом');
    const [value4, setValue4] = React.useState('');
    const [value5, setValue5] = React.useState('');
    const [value6, setValue6] = React.useState('');

    return (
      <div style={inputStoriesStyles.columnGap16Width400}>
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
            <div style={inputStoriesStyles.rowAlignCenterGap8}>
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
  },
};

export const CharacterCounterDemo: Story = {
  ...inputRenderStory('Демонстрация `displayCharacterCounter` при `maxLength`: счётчик можно включить или отключить.'),
  render: () => {
    const [value1, setValue1] = React.useState('Обычный инпут');
    const [value2, setValue2] = React.useState('Инпут с счетчиком');
    const [value3, setValue3] = React.useState('Инпут без счетчика');
    const [value4, setValue4] = React.useState('');

    return (
      <div style={inputStoriesStyles.columnGap16Width400}>
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
  },
};

export const ExtraTextDemo: Story = {
  ...inputRenderStory('Демонстрация `extraText`: дополнительный текст отображается ниже компонента.'),
  render: () => {
    const [value1, setValue1] = React.useState('Обычный инпут');
    const [value2, setValue2] = React.useState('Инпут с дополнительным текстом');
    const [value3, setValue3] = React.useState('');

    return (
      <div style={inputStoriesStyles.columnGap16Width400}>
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
  },
};

export const DisableCopyingDemo: Story = {
  ...inputRenderStory('Демонстрация `disableCopying`: отключает выделение и копирование значения поля.'),
  render: () => {
    const [value1, setValue1] = React.useState('Обычный инпут - можно копировать');
    const [value2, setValue2] = React.useState('Защищенный инпут - нельзя копировать');

    return (
      <div style={inputStoriesStyles.columnGap16Width400}>
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
  },
};

export const HandleInputDemo: Story = {
  ...inputRenderStory('Демонстрация `handleInput`: маски и форматирование применяются при вводе (телефон, карта и т.д.).'),
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
      <div style={inputStoriesStyles.columnGap16Width400}>
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
  },
};

export const IgnoreMaskCharactersDemo: Story = {
  ...inputRenderStory('Демонстрация `ignoreMaskCharacters`: исключать символы маски (разделители) из подсчёта для `maxLength`.'),
  render: () => {
    const [value1, setValue1] = React.useState('10.12.1985');
    const [value2, setValue2] = React.useState('10.12.1985');

    return (
      <div style={inputStoriesStyles.columnGap16Width400}>
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

        <div style={inputStoriesStyles.infoBoxWithTopMargin}>
          <h4 style={inputStoriesStyles.heading14}>Сравнение:</h4>
          <ul style={inputStoriesStyles.list12}>
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
  },
};

export const CharacterCounterThresholdDemo: Story = {
  ...inputRenderStory('Демонстрация `characterCounterVisibilityThreshold`: видимость счётчика в зависимости от заполненности.'),
  render: () => {
    const [value1, setValue1] = React.useState('');
    const [value2, setValue2] = React.useState('');
    const [value3, setValue3] = React.useState('');

    return (
      <div style={inputStoriesStyles.columnGap16Width400}>
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

        <div style={inputStoriesStyles.infoBoxWithTopMargin}>
          <h4 style={inputStoriesStyles.heading14}>Пороги видимости:</h4>
          <ul style={inputStoriesStyles.list12}>
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
  },
};

export const AdditionalLabelDemo: Story = {
  ...inputRenderStory('Демонстрация `additionalLabel`: дополнительное описание справа от основного `label`.'),
  render: () => {
    const [value1, setValue1] = React.useState('');
    const [value2, setValue2] = React.useState('');
    const [value3, setValue3] = React.useState('');

    return (
      <div style={inputStoriesStyles.columnGap16Width400}>
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

        <div style={inputStoriesStyles.infoBoxWithTopMargin}>
          <h4 style={inputStoriesStyles.heading14}>Дополнительные метки:</h4>
          <ul style={inputStoriesStyles.list12}>
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
  },
};

const readOnlyArgs = {
  label: 'Поле только для чтения',
  value: 'Это значение нельзя изменить',
  readOnly: true,
  helperText: 'Текст остается обычным цветом, но фон становится серым',
};

export const ReadOnly: Story = {
  ...inputArgsStory(
    'Поле в режиме только для чтения: текст обычного цвета, серый фон.',
    readOnlyArgs,
  ),
  args: readOnlyArgs,
};

const readOnlyWithIconArgs = {
  label: 'Поле только для чтения с иконкой',
  value: 'Значение с иконкой',
  readOnly: true,
  leftIcon: <Icon name="IconPlainerUser" size={IconSize.SM} />,
  helperText: 'Иконки также работают в режиме readOnly',
};

export const ReadOnlyWithIcon: Story = {
  ...inputArgsStory('ReadOnly с `leftIcon`.', readOnlyWithIconArgs),
  args: readOnlyWithIconArgs,
};

export const ReadOnlyComparison: Story = {
  ...inputRenderStory('Сравнение обычного поля, `readOnly` и `disabled`.'),
  render: () => {
    const [editable, setEditable] = React.useState('Можно редактировать');
    return (
      <div style={inputStoriesStyles.columnGap16}>
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
};

export const PasswordForm: Story = {
  ...inputRenderStory('Пример `Form` для полей пароля — устраняет предупреждения браузера о паролях вне формы.'),
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
        <div style={inputStoriesStyles.columnGap16}>
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
          <div style={inputStoriesStyles.rowWrapGap8}>
            <button type="submit" style={inputStoriesStyles.submitButtonPrimary}>
              Отправить
            </button>
            <button type="button" onClick={reset} style={inputStoriesStyles.formResetButton}>
              Очистить
            </button>
          </div>
        </div>
      </Form>
    );
  },
};

export const PasswordComparison: Story = {
  ...inputRenderStory('Сравнение форм регистрации (`new-password`) и входа (`current-password`) с корректным `autoComplete`.'),
  render: () => {
    const [regUser, setRegUser] = React.useState('');
    const [regPass, setRegPass] = React.useState('');
    const [regPass2, setRegPass2] = React.useState('');
    const [loginEmail, setLoginEmail] = React.useState('');
    const [loginPass, setLoginPass] = React.useState('');
    return (
      <div style={inputStoriesStyles.columnGap32}>
        <div>
          <h3 style={inputStoriesStyles.sectionTitleRegistration}>
            ✅ Форма регистрации (новые пароли)
          </h3>
          <Form formId="registration-form" onSubmit={(e) => e.preventDefault()}>
            <div style={inputStoriesStyles.columnGap16}>
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
                style={inputStoriesStyles.formResetButton}
              >
                Очистить
              </button>
            </div>
          </Form>
        </div>

        <div>
          <h3 style={inputStoriesStyles.sectionTitleLogin}>✅ Форма входа (текущий пароль)</h3>
          <Form formId="login-form" onSubmit={(e) => e.preventDefault()}>
            <div style={inputStoriesStyles.columnGap16}>
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
                style={inputStoriesStyles.formResetButton}
              >
                Очистить
              </button>
            </div>
          </Form>
        </div>
      </div>
    );
  },
};

/** Составное поле: сумма + выбор валюты в suffix (аналог Admiral InputEx). */
export const WithSuffixSelect: Story = {
  ...inputRenderStory('Режим InputEx: `suffix` с `Select` — общая оболочка, разделитель между сегментами. Для Select автоматически включается `embeddedInCompositeField`.'),
  render: function WithSuffixSelectStory() {
    const [amount, setAmount] = React.useState('1000');
    const [currency, setCurrency] = React.useState('rub');

    return (
      <Input
        label="Сумма"
        type="text"
        inputMode="decimal"
        placeholder="0"
        fullWidth
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
        suffix={
          <Select
            options={currencySelectOptions}
            value={currency}
            onValueChange={setCurrency}
            aria-label="Валюта"
          />
        }
        helperText="Select в suffix — одна рамка с полем ввода"
      />
    );
  },
};

/** Префикс с текстом и суффикс с единицей измерения. */
export const WithPrefixTextAndSuffixSelect: Story = {
  ...inputRenderStory('Комбинация текстового `prefix` и `Select` в `suffix`: префикс с отступами, селект без собственной рамки.'),
  render: function WithPrefixTextAndSuffixSelectStory() {
    const [weight, setWeight] = React.useState('42');
    const [unit, setUnit] = React.useState('kg');

    return (
      <div style={inputStoriesStyles.columnGap16}>
        <Input
          label="Вес"
          fullWidth
          value={weight}
          onChange={(event) => setWeight(event.target.value)}
          prefix={<span style={inputStoriesStyles.compositePrefixText}>до</span>}
          suffix={
            <Select
              options={unitSelectOptions}
              value={unit}
              onValueChange={setUnit}
              aria-label="Единица измерения"
            />
          }
        />
      </div>
    );
  },
};

/** InputEx + `Select` с `mode="searchSelect"` в suffix: фильтр в слоте, список по фокусу. */
export const WithSuffixSearchSelect: Story = {
  ...inputRenderStory('Составное поле с `Select mode="searchSelect"` в `suffix`: фильтр и выбор города в одной оболочке с текстовым полем. `embeddedInCompositeField` включается автоматически.'),
  render: function WithSuffixSearchSelectStory() {
    const [query, setQuery] = React.useState('доставка');
    const [city, setCity] = React.useState('moscow');

    return (
      <Input
        label="Поиск по адресу"
        placeholder="Улица, дом"
        fullWidth
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        suffix={
          <Select
            mode="searchSelect"
            options={citySearchSelectOptions}
            value={city}
            onValueChange={(nextValue) => setCity(String(nextValue))}
            placeholder="Город"
            searchPlaceholder="Начните вводить"
            aria-label="Город"
          />
        }
        helperText="searchSelect в suffix: поиск в поле селекта, общая рамка с Input"
      />
    );
  },
};

/** InputEx + searchSelect в prefix (категория) и текстовый ввод справа. */
export const WithPrefixSearchSelect: Story = {
  ...inputRenderStory('Тот же InputEx, но `searchSelect` в `prefix` — слева фильтр по категории, справа основной ввод.'),
  render: function WithPrefixSearchSelectStory() {
    const [category, setCategory] = React.useState('');
    const [title, setTitle] = React.useState('');

    const categoryOptions: SelectOption[] = [
      { value: 'goods', label: 'Товары' },
      { value: 'services', label: 'Услуги' },
      { value: 'rent', label: 'Аренда' },
    ];

    return (
      <Input
        label="Объявление"
        placeholder="Заголовок"
        fullWidth
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        prefix={
          <Select
            mode="searchSelect"
            options={categoryOptions}
            value={category}
            onValueChange={(nextValue) => setCategory(String(nextValue))}
            placeholder="Категория"
            aria-label="Категория"
          />
        }
        helperText="searchSelect в prefix: удобно для коротких справочников с поиском"
      />
    );
  },
};

/** Select слева, ввод справа (например, код страны + телефон). */
export const WithPrefixSelect: Story = {
  ...inputRenderStory('Select в `prefix`: код страны и поле номера в одном контроле.'),
  render: function WithPrefixSelectStory() {
    const [country, setCountry] = React.useState('ru');
    const [phone, setPhone] = React.useState('');

    const countryOptions: SelectOption[] = [
      { value: 'ru', label: '+7' },
      { value: 'kz', label: '+7 KZ' },
      { value: 'by', label: '+375' },
    ];

    return (
      <Input
        label="Телефон"
        type="tel"
        placeholder="999 000-00-00"
        fullWidth
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        prefix={
          <Select
            options={countryOptions}
            value={country}
            onValueChange={setCountry}
            aria-label="Код страны"
          />
        }
      />
    );
  },
};

export const AutocompleteDemo: Story = {
  ...inputRenderStory('Демонстрация атрибутов `autoComplete` для UX и безопасности (username, email, пароли, имя).'),
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
        <div style={inputStoriesStyles.columnGap16}>
          <h3 style={inputStoriesStyles.autocompleteDemoHeading}>
            Демонстрация различных типов autocomplete
          </h3>

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

          <button type="button" onClick={resetAll} style={inputStoriesStyles.formResetButton}>
            Очистить все поля
          </button>
        </div>
      </Form>
    );
  },
};
