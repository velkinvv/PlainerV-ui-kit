import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Select } from './Select';
import type { DropdownMenuLoadMoreContext, SelectOption } from '../../../../types/ui';
import { Form } from '../../Form';
import { Size } from '../../../../types/sizes';
import { DOC_SELECT } from '@/components/ui/storyDocs/uiKitDocs';
import { inputFieldStoriesStyles } from '@/handlers/inputFieldStories.styles';
import { lightTheme } from '@/themes/themes';

const sampleOptions: SelectOption[] = [
  { value: 'ru', label: 'Русский' },
  { value: 'en', label: 'English' },
  { value: 'de', label: 'Deutsch', disabled: true },
];

const manyOptions: SelectOption[] = [
  { value: 'moscow', label: 'Москва' },
  { value: 'spb', label: 'Санкт-Петербург' },
  { value: 'ekb', label: 'Екатеринбург' },
  { value: 'nsk', label: 'Новосибирск' },
  { value: 'kzn', label: 'Казань' },
  { value: 'nn', label: 'Нижний Новгород' },
];

/** Иерархия опций для сторис дерева: родитель с `options`, каскадный мультивыбор в панели. */
const treeSelectOptions: SelectOption[] = [
  {
    value: 'region-center',
    id: 'region-center',
    label: 'Регион: Центр',
    options: [
      { value: 'msk', label: 'Москва' },
      { value: 'tula', label: 'Тула' },
    ],
  },
  {
    value: 'region-nw',
    id: 'region-nw',
    label: 'Регион: Северо-Запад',
    options: [
      { value: 'spb-tree', label: 'Санкт-Петербург' },
      { value: 'kgd', label: 'Калининград' },
    ],
  },
  { value: 'other-city', label: 'Отдельный пункт' },
];

const meta: Meta<typeof Select> = {
  title: 'UI Kit/Inputs/Select',
  component: Select,
  /** Пустой объект — чтобы в Controls был слайдер/редактор `openMenuIconProps` у всех сторис. */
  args: {
    openMenuIconProps: {},
    clearIconProps: {},
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_SELECT,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Form
        formId="story-select-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Story />
      </Form>
    ),
  ],
  argTypes: {
    mode: {
      control: 'radio',
      options: ['select', 'searchSelect', 'native'],
      description:
        '`select` — панель с поиском внутри; `searchSelect` — ввод фильтра в триггер (single или multiple); `native` — системный select',
      table: {
        type: { summary: '`select`, `searchSelect`, `native`' },
      },
    },
    label: { description: 'Подпись поля' },
    options: {
      description:
        'Массив опций: `{ value, label, disabled?, options? (вложенное дерево), tooltip?, … }`; в панели `tooltip` + `tooltipType: "hint"` дают хинт на строке списка',
    },
    placeholder: {
      description:
        'Пустое состояние (триггер / первая опция в native single); при `multiple` в панели — плейсхолдер при пустом выборе, при выборе — чипы с подписями',
    },
    value: {
      description:
        'Контролируемое значение: при `multiple: false` — одна строка (`value` выбранной опции); при `multiple: true` — массив строк (`value` всех выбранных опций)',
      table: {
        type: {
          summary: 'строка при одиночном выборе; массив строк при `multiple: true`',
        },
      },
    },
    defaultValue: {
      description:
        'Неконтролируемое начальное значение: те же правила, что у `value` — одна строка или массив строк в зависимости от `multiple`',
      table: {
        type: {
          summary: 'строка при одиночном выборе; массив строк при `multiple: true`',
        },
        defaultValue: { summary: 'undefined' },
      },
    },
    onChange: {
      description:
        'Событие изменения скрытого или нативного `select`: объект события с полем `target` (как у стандартного HTMLSelectElement)',
      table: {
        type: { summary: 'ChangeEvent у HTMLSelectElement' },
      },
    },
    onValueChange: {
      description:
        'Колбэк в `mode="select"`: при одиночном выборе передаётся строка; при `multiple: true` — массив строк выбранных значений',
      table: {
        type: {
          summary: '(значение: строка или массив строк) => void',
        },
      },
    },
    onSelectedChange: {
      action: 'selectedChange',
      description:
        'Смена выбранной опции или набора опций во всех режимах: строка или массив строк (`multiple`)',
      table: {
        type: { summary: '(value: string | string[]) => void' },
      },
    },
    multiple: { control: 'boolean', description: 'Множественный выбор' },
    treeExpandable: {
      control: 'boolean',
      description:
        'При вложенных `options`: показывать шеврон и разрешать сворачивать ветки (как у `Dropdown.treeExpandable`)',
    },
    treeDefaultExpanded: {
      control: 'radio',
      options: ['expanded', 'collapsed'],
      description:
        'Начальное раскрытие веток: все развёрнуты, все свёрнуты или задайте `treeExpandedKeys` для явного списка ключей',
    },
    treeExpandedKeys: {
      control: 'object',
      description: 'Контролируемый набор ключей раскрытых веток (см. сторис «дерево» у Dropdown)',
    },
    onTreeExpandedKeysChange: {
      action: 'treeExpandedKeysChange',
      description: 'Смена набора раскрытых веток при контролируемом `treeExpandedKeys`',
    },
    showCheckbox: {
      control: 'boolean',
      description:
        'При `multiple` в панели: чекбоксы у пунктов списка (по умолчанию `true`; `false` — скрыть, выбор по клику на строку)',
    },
    moveSelectedOnTop: {
      control: 'boolean',
      description:
        'Панель `select` / `searchSelect`: выбранные строки вверху списка. По умолчанию при `multiple` — да; при single — только если `true`',
    },
    displayClearIcon: {
      control: 'boolean',
      description:
        'В `select` / `searchSelect`: кнопка сброса в триггере (до шеврона). При `multiple` с чипами не показывается, если уже есть «очистить всё» у чипов. В `native` не используется',
    },
    onClearIconClick: {
      action: 'clearIconClick',
      description:
        'Колбэк после сброса значения (и строки поиска в `searchSelect`) по клику на иконку очистки',
    },
    showMultiSelectionCountBadge: {
      control: 'boolean',
      description:
        'В `mode="select"` при `multiple`: бейдж с числом слева от шеврона (по умолчанию `true`)',
    },
    showMultiSelectAll: {
      control: 'boolean',
      description:
        'В `mode="select"` при `multiple`: кнопка «Выбрать все» в подвале панели (только неотключённые опции; по умолчанию `true`)',
    },
    searchable: {
      control: 'boolean',
      description:
        'Только `mode="select"`: поле поиска в панели (по умолчанию `true`). В `searchSelect` не используется',
    },
    searchFormat: {
      control: 'radio',
      options: ['wholly', 'word'],
      description:
        'Встроенный поиск без `searchFilter`: `wholly` — подстрока целиком; `word` — каждое слово запроса (пробелы) должно встречаться в тексте опции',
    },
    clearInputValueAfterSelect: {
      control: 'boolean',
      description:
        "Только `searchSelect`: после выбора пункта из списка очищать строку в поле фильтра (`onSearch('')` при контроле — обновите `searchValue`)",
    },
    searchPlaceholder: { description: 'Плейсхолдер поля поиска в панели' },
    onInputChange: {
      action: 'inputChange',
      description:
        '`ChangeEvent` внутреннего `input`: в `searchSelect` — триггер; в `select` при включённом поиске — поле в шапке панели',
    },
    error: { description: 'Текст ошибки' },
    success: { description: 'Успешное состояние' },
    status: {
      control: { type: 'select' },
      options: [undefined, 'error', 'success', 'warning'],
      description:
        'Явный статус обводки: `error`, `success`, `warning` или не задан (тогда статус из `error` / `success`)',
    },
    helperText: { description: 'Текст под полем' },
    required: { control: 'boolean', description: 'Обязательное поле' },
    fullWidth: { control: 'boolean', description: 'На всю ширину' },
    readOnly: { control: 'boolean', description: 'Без открытия / disabled' },
    onFocus: {
      action: 'focus',
      description:
        'Фокус внутри оболочки `Dropdown` (панельные режимы) или `InputWrapper` вокруг `select` (`native`); `FocusEvent<HTMLDivElement>`',
    },
    onBlur: {
      action: 'blur',
      description: 'Потеря фокуса на оболочке поля',
    },
    disabled: { control: 'boolean', description: 'Отключено' },
    skeleton: { control: 'boolean', description: 'Скелетон' },
    size: {
      control: { type: 'select' },
      options: [Size.SM, Size.MD, Size.LG, Size.XL],
      description: 'Размер поля; значения: `SM`, `MD`, `LG`, `XL`',
    },
    textAlign: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      description: 'Выравнивание текста на триггере; значения: `left`, `center`, `right`',
    },
    isLoading: { control: 'boolean', description: 'Спиннер справа' },
    dropdownVariant: {
      control: 'radio',
      options: ['default', 'elevated', 'outlined'],
      description:
        'Вариант оформления панели `Dropdown`; значения: `default`, `elevated`, `outlined`',
    },
    menuMaxHeight: {
      description:
        'Максимальная высота панели (px или строка); для скролла и `onMenuLoadMore` задайте ограничение по высоте',
      table: {
        type: { summary: 'CSS-строка или число (px)' },
        defaultValue: { summary: 'undefined' },
      },
    },
    virtualScroll: {
      control: 'object',
      description:
        'Виртуальный скролл списка: `{ itemHeight: number | "auto" }`; при `"auto"` высота строки из темы для `size`',
      table: {
        type: { summary: 'DropdownVirtualScrollConfig | undefined' },
      },
    },
    isMenuOpen: {
      control: 'boolean',
      description:
        'Контролируемое открытие панели: задайте вместе с `onMenuOpenChange` и держите состояние снаружи',
    },
    onMenuOpenChange: {
      action: 'menuOpenChange',
      description: '`(isOpen: boolean) => void` — обновите `isMenuOpen` при контроле снаружи',
    },
    onOpenMenu: { description: 'Панель открыта' },
    onCloseMenu: { description: 'Панель закрыта' },
    onScrollMenu: {
      description:
        'Скролл контейнера списка; в данных события доступны метрики `scrollTop`, `scrollHeight`, `clientHeight`',
    },
    onMenuLoadMore: {
      description:
        'Догрузка при приближении к низу списка; в колбэке — `anchorFlatIndex`, `anchorValue`, `anchorId`',
      table: {
        type: {
          summary: '(context) => void или Promise<void>',
        },
      },
    },
    menuLoadMoreThresholdPx: { description: 'Порог в px до низа для догрузки (по умолчанию 80)' },
    menuHasMore: { description: 'Есть ли ещё порции данных' },
    menuIsLoadingMore: { description: 'Блокировка повторного вызова догрузки' },
    openMenuIconProps: {
      control: 'object',
      description:
        'Частичные пропсы `Icon` для шеврона открытия меню (`name`, `size`, `color`, `className`). В `select` / `searchSelect` — у иконки в триггере и прокидывается в `Dropdown`; в `native` — только у иконки у поля.',
      table: {
        type: { summary: 'OpenMenuIconProps' },
      },
    },
    clearIconProps: {
      control: 'object',
      description:
        'Частичные пропсы `Icon` для крестиков сброса в триггере (`select` / `searchSelect`): удаление чипа, «очистить всё», `displayClearIcon`. По умолчанию `IconExClose`; мерж поверх вычисленного `size`.',
      table: {
        type: { summary: 'ClearIconProps' },
      },
    },
    dropdownInline: {
      description:
        '`Dropdown.inline`: по умолчанию `false` — меню в портале под триггером; `true` — внутри контейнера (overflow/тесты)',
    },
    renderTopPanel: {
      control: false,
      description:
        '`(props: DropdownTopPanelProps) => ReactNode` — блок над списком в панели (до поля поиска при `searchable`)',
    },
    renderBottomPanel: {
      control: false,
      description:
        '`(props: DropdownTopPanelProps) => ReactNode` — блок под списком; при `multiple` кнопка «Выбрать все» ниже этой панели',
    },
    tooltip: { description: 'Подсказка' },
    tooltipType: {
      control: 'radio',
      options: ['tooltip', 'hint'],
      description: 'Тип подсказки: `tooltip` или `hint`',
    },
    tooltipPosition: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Позиция подсказки; значения: `top`, `bottom`, `left`, `right`',
    },
    additionalLabel: { description: 'Доп. подпись' },
    extraText: { description: 'Доп. текст внизу' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Панель как Dropdown, поиск включён по умолчанию */
export const Default: Story = {
  args: {
    options: manyOptions,
    placeholder: 'Выберите город',
    name: 'city',
  },
};

/** Проп `openMenuIconProps`: частичные настройки `Icon` шеврона (цвет, `name`, `size` и т.д.). */
export const OpenMenuIconProps: Story = {
  args: {
    options: manyOptions,
    placeholder: 'Выберите город',
    name: 'open-menu-icon',
    label: 'Шеврон меню',
    openMenuIconProps: {
      color: lightTheme.colors.primary,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Панельные режимы: иконка в триггере и внутри `Dropdown`. `native`: только иконка у поля. В Controls можно править объект `openMenuIconProps` (например `color` из `lightTheme.colors.primary`).',
      },
    },
  },
};

/** Проп `clearIconProps`: стилизация всех крестиков сброса в триггере (поле очистки при `displayClearIcon`). */
export const ClearIconProps: Story = {
  args: {
    options: manyOptions,
    placeholder: 'Выберите город',
    name: 'clear-icon-props',
    label: 'Крестик очистки',
    value: 'moscow',
    displayClearIcon: true,
    clearIconProps: {
      color: lightTheme.colors.danger,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'При `displayClearIcon` и непустом значении — кнопка сброса до шеврона. Тот же `clearIconProps` применяется к «очистить всё» у мультиселекта и к кресту в чипе.',
      },
    },
  },
};

/** Поиск в самом поле; список открывается по фокусу; отдельного инпута в панели нет */
export const SearchSelect: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={inputFieldStoriesStyles.maxWidth360}>
        <Select
          mode="searchSelect"
          label="Город"
          options={manyOptions}
          placeholder="Начните вводить название"
          searchPlaceholder="Фильтр списка"
          value={value}
          onValueChange={(v) => setValue(String(v))}
          name="city-search"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Режим `searchSelect`: строка фильтра вводится в поле селекта, при фокусе открывается список. Для контролируемой строки поиска используйте `searchValue` и `onSearch`.',
      },
    },
  },
};

/** `searchSelect` + `multiple`: в закрытом меню — чипы, при открытом — поле фильтра и чекбоксы */
export const SearchSelectMultiple: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['moscow', 'spb']);
    return (
      <div style={inputFieldStoriesStyles.maxWidth420}>
        <Select
          mode="searchSelect"
          label="Города"
          name="cities-search-multi"
          multiple
          options={manyOptions}
          value={value}
          onValueChange={(v) => setValue(v as string[])}
          placeholder="Выберите города"
          searchPlaceholder="Фильтр списка"
          showMultiSelectionCountBadge={false}
        />
      </div>
    );
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Город',
    options: manyOptions,
    placeholder: 'Выберите…',
    name: 'city',
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('moscow');
    return (
      <Select
        label="Город"
        name="city-controlled"
        options={manyOptions}
        value={value}
        onValueChange={(v) => setValue(String(v))}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

/** Несколько значений: чипы в триггере, сортировка выбранных вверху списка, «Выбрать все» в подвале */
export const MultiSelect: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['ru', 'en']);
    return (
      <Select
        label="Языки"
        name="langs"
        multiple
        options={sampleOptions.filter((o) => !o.disabled)}
        value={value}
        onValueChange={(v) => setValue(v as string[])}
        placeholder="Выберите языки"
      />
    );
  },
};

/** Мультиселект без бейджа числа у шеврона (`showMultiSelectionCountBadge={false}`) */
export const MultiSelectWithoutCountBadge: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['ru', 'en']);
    return (
      <Select
        label="Языки (без бейджа)"
        name="langs-no-badge"
        multiple
        showMultiSelectionCountBadge={false}
        options={sampleOptions.filter((o) => !o.disabled)}
        value={value}
        onValueChange={(v) => setValue(v as string[])}
        placeholder="Выберите языки"
      />
    );
  },
};

/** Мультиселект с вложенными `options`: каскад, indeterminate у родителя, шевроны (`treeDefaultExpanded`). */
export const TreeMultipleSelect: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div style={inputFieldStoriesStyles.maxWidth440}>
        <Select
          label="Города по регионам"
          name="cities-tree"
          multiple
          options={treeSelectOptions}
          value={value}
          onValueChange={(next) => setValue(next as string[])}
          placeholder="Выберите города"
          treeExpandable
          treeDefaultExpanded="expanded"
          disableSelectedOptionHighlight
        />
        {value.length > 0 ? (
          <pre style={inputFieldStoriesStyles.storyPreviewPreJson}>
            {JSON.stringify(value, null, 2)}
          </pre>
        ) : null}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Вложенные `options` у родительских строк превращаются в `nestedItems` в панели. Поведение выбора совпадает с примером групп-чекбоксов в меню (каскад, частичный выбор детей).',
      },
    },
  },
};

/** Дерево опций: ветки по умолчанию свёрнуты. */
export const TreeMultipleSelectCollapsed: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['msk']);
    return (
      <div style={inputFieldStoriesStyles.maxWidth440}>
        <Select
          label="Регионы (свёрнуто по умолчанию)"
          name="cities-tree-collapsed"
          multiple
          options={treeSelectOptions}
          value={value}
          onValueChange={(next) => setValue(next as string[])}
          placeholder="Выберите"
          treeExpandable
          treeDefaultExpanded="collapsed"
          disableSelectedOptionHighlight
        />
      </div>
    );
  },
};

/** Контролируемое раскрытие веток панели. */
export const TreeMultipleSelectControlledExpand: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    const [expandedKeys, setExpandedKeys] = useState<string[]>(['m/region-nw']);
    return (
      <div style={inputFieldStoriesStyles.maxWidth460}>
        <p style={inputFieldStoriesStyles.storyCaption13Secondary}>
          Развёрнута ветка с ключом <code>m/region-nw</code> (вторая группа в списке).
        </p>
        <Select
          label="Города (контроль шевронов)"
          name="cities-tree-controlled-expand"
          multiple
          options={treeSelectOptions}
          value={value}
          onValueChange={(next) => setValue(next as string[])}
          placeholder="Выберите города"
          treeExpandable
          treeExpandedKeys={expandedKeys}
          onTreeExpandedKeysChange={setExpandedKeys}
          disableSelectedOptionHighlight
        />
      </div>
    );
  },
};

const lazyPageSize = 12;
const lazyTotalRows = 48;

/** Догрузка `options` у нижней границы списка: `onMenuLoadMore` с якорем, меню остаётся открытым */
export const SelectLazyLoadOnScroll: Story = {
  render: () => {
    const [options, setOptions] = useState<SelectOption[]>(() =>
      Array.from({ length: lazyPageSize }, (_, i) => ({
        value: `row-${i}`,
        id: `srv-${i}`,
        label: `Пункт ${i + 1}`,
      })),
    );
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [value, setValue] = useState('');
    const [events, setEvents] = useState<string[]>([]);

    const appendLog = (line: string) => {
      setEvents((prev) => [...prev.slice(-8), line]);
    };

    const handleLoadMore = async (ctx: DropdownMenuLoadMoreContext) => {
      appendLog(
        `onMenuLoadMore: index=${ctx.anchorFlatIndex} value=${ctx.anchorValue} id=${ctx.anchorId ?? '—'}`,
      );
      setLoadingMore(true);
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 350);
      });
      setOptions((prev) => {
        const start = prev.length;
        if (start >= lazyTotalRows) {
          setHasMore(false);
          return prev;
        }
        const chunk: SelectOption[] = [];
        for (let i = 0; i < lazyPageSize && start + i < lazyTotalRows; i += 1) {
          const n = start + i;
          chunk.push({ value: `row-${n}`, id: `srv-${n}`, label: `Пункт ${n + 1}` });
        }
        const next = [...prev, ...chunk];
        if (next.length >= lazyTotalRows) {
          setHasMore(false);
        }
        return next;
      });
      setLoadingMore(false);
    };

    return (
      <div style={inputFieldStoriesStyles.maxWidth400}>
        <Select
          label="Ленивая подгрузка"
          name="lazy-scroll"
          options={options}
          value={value}
          onValueChange={(v) => setValue(String(v))}
          placeholder="Прокрутите список вниз"
          menuMaxHeight={220}
          searchable={false}
          onOpenMenu={() => appendLog('onOpenMenu')}
          onCloseMenu={() => appendLog('onCloseMenu')}
          onScrollMenu={() => {
            /* при необходимости — телеметрия скролла */
          }}
          onMenuLoadMore={handleLoadMore}
          menuHasMore={hasMore}
          menuIsLoadingMore={loadingMore}
        />
        <pre style={inputFieldStoriesStyles.storyEventLogPre}>
          {events.join('\n') || 'События появятся здесь'}
        </pre>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Паттерн бесконечной подгрузки: при приближении к низу вызывается `onMenuLoadMore` с индексом и полями последней строки (`value`, `id`); родитель дописывает `options`, скролл компенсируется внутри `Dropdown`. Укажите `menuMaxHeight`, иначе контейнер не скроллится.',
      },
    },
  },
};

/** Панель без поля поиска */
export const SearchDisabled: Story = {
  args: {
    label: 'Роль',
    searchable: false,
    options: [
      { value: 'admin', label: 'Администратор' },
      { value: 'user', label: 'Пользователь' },
    ],
    placeholder: 'Выберите роль',
    name: 'role',
  },
};

/** Системный select (без Dropdown) */
export const NativeMode: Story = {
  args: {
    mode: 'native',
    label: 'Статус (native)',
    options: [
      { value: 'a', label: 'Активен' },
      { value: 'b', label: 'Черновик' },
    ],
    placeholder: 'Выберите',
    name: 'status-native',
  },
};

export const WithError: Story = {
  args: {
    label: 'Роль',
    options: [
      { value: 'admin', label: 'Администратор' },
      { value: 'user', label: 'Пользователь' },
    ],
    placeholder: 'Выберите роль',
    error: 'Выберите значение из списка',
    name: 'role',
  },
};

export const WithSuccess: Story = {
  args: {
    label: 'Статус',
    options: [
      { value: 'active', label: 'Активен' },
      { value: 'inactive', label: 'Неактивен' },
    ],
    value: 'active',
    success: true,
    name: 'status',
    onChange: () => {
      /* демо */
    },
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Часовой пояс',
    options: [
      { value: 'msk', label: 'Москва (UTC+3)' },
      { value: 'ekb', label: 'Екатеринбург (UTC+5)' },
    ],
    helperText: 'Используется для отображения времени',
    name: 'tz',
  },
};

export const WithTooltip: Story = {
  args: {
    label: 'Тариф',
    options: [
      { value: 'free', label: 'Free' },
      { value: 'pro', label: 'Pro' },
    ],
    placeholder: 'Выберите тариф',
    tooltip: 'От тарифа зависит лимит запросов',
    tooltipType: 'tooltip',
    name: 'plan',
  },
};

/** Хинты у строк в открытом списке (`tooltip` + `tooltipType: 'hint'` на опции) */
export const WithHintsInDropdownMenu: Story = {
  args: {
    label: 'Тариф',
    options: [
      {
        value: 'free',
        label: 'Free — старт без оплаты',
        tooltip: 'До 100 запросов в месяц, общий пул на команду.',
        tooltipType: 'hint',
      },
      {
        value: 'pro',
        label: 'Pro — для растущих команд',
        tooltip: 'Безлимит запросов, приоритетная поддержка и расширенная аналитика.',
        tooltipType: 'hint',
      },
    ],
    placeholder: 'Откройте список и наведите на пункт',
    name: 'plan-hints-menu',
  },
  parameters: {
    docs: {
      description: {
        story:
          'В `mode="select"` / `searchSelect` у каждой опции можно задать `tooltip` и `tooltipType: "hint"`: в открытом меню при наведении на строку показывается компонент `Hint` вместо тултипа.',
      },
    },
  },
};

export const Loading: Story = {
  args: {
    label: 'Загрузка списка',
    options: [{ value: 'x', label: 'Вариант' }],
    value: 'x',
    isLoading: true,
    name: 'loading',
  },
};

export const SkeletonStory: Story = {
  name: 'Skeleton',
  args: {
    label: 'Поле',
    skeleton: true,
    options: [],
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Ширина 100%',
    fullWidth: true,
    options: manyOptions,
    placeholder: 'Выберите',
    name: 'fw',
  },
};

export const Small: Story = {
  args: {
    label: 'Small',
    size: Size.SM,
    options: sampleOptions,
    name: 'sm',
  },
};

export const InFormWithSubmit: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <>
        <Select
          label="Страна"
          name="country"
          required
          options={[
            { value: 'ru', label: 'Россия' },
            { value: 'kz', label: 'Казахстан' },
          ]}
          placeholder="Выберите страну"
          value={value}
          onValueChange={(v) => setValue(String(v))}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" style={inputFieldStoriesStyles.submitButtonPrimaryMarginTop12}>
          Отправить
        </button>
      </>
    );
  },
};
