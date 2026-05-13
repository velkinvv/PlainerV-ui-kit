import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { NavigationMenu } from './NavigationMenu';
import { NavigationMenuItem } from './NavigationMenuItem';
import {
  HintPosition,
  NavigationMenuActiveAppearance,
  NavigationMenuExpandInteraction,
  NavigationMenuItemStatus,
  TooltipPosition,
} from '@/types/ui';
import { Size } from '@/types/sizes';
import { Icon } from '../Icon/Icon';
import { DOC_NAVIGATION_MENU } from '@/components/ui/storyDocs/uiKitDocs';
import {
  initialActiveIdFromStoryArgs,
  NavigationMenuStoryWithState,
  pickNavigationMenuPropsFromStoryArgs,
} from './NavigationMenu.stories.helpers';
import { navigationMenuStoriesStyles } from './NavigationMenu.stories.styles';

const meta: Meta<typeof NavigationMenu> = {
  title: 'UI Kit/Navigation/NavigationMenu',
  component: NavigationMenu,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_NAVIGATION_MENU,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={navigationMenuStoriesStyles.storyContainer}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    collapsed: {
      description: 'Компактный режим: только иконки',
      table: { type: { summary: 'boolean' } },
    },
    collapsedNestedFlyout: {
      description:
        'В compact вложенность показывать в поповере при hover (true) или не показывать в колонке (false)',
      table: { type: { summary: 'boolean' } },
    },
    activeId: {
      control: false,
      description:
        'В демо-историях не используется: выбор хранит обёртка **NavigationMenuStoryWithState** (иначе Storybook передаёт `activeId` и ломает клики).',
      table: { type: { summary: 'string или null' } },
    },
    defaultActiveId: {
      description: 'Начальный выбранный id в неконтролируемом режиме',
      table: { type: { summary: 'string или null' } },
    },
    onActiveChange: {
      description: 'Смена активного пункта',
      table: {
        type: { summary: '(id: string) => void' },
      },
    },
    activeAppearance: {
      control: { type: 'select' },
      options: Object.values(NavigationMenuActiveAppearance),
      description: 'Как подсвечивается активный пункт',
      table: {
        type: { summary: 'bar, highlighted или solid (NavigationMenuActiveAppearance)' },
      },
    },
    'aria-label': {
      description: 'Подпись навигации для скринридеров',
      table: { type: { summary: 'string' } },
    },
    children: {
      control: false,
      description: 'Пункты NavigationMenuItem',
      table: { type: { summary: 'ReactNode' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NavigationMenu>;

/** Общие стили содержимого панели поповера в сторис */
const popoverPanelStyle: React.CSSProperties = {
  padding: 12,
  minWidth: 220,
  fontSize: 14,
};

/** Несколько уровней вложенности: проп `items`, раскрытие по клику, активный лист внутри дерева */
export const NestedLevels: Story = {
  args: {
    'aria-label': 'Навигация с вложенностью',
    defaultActiveId: 'leaf-deep',
    activeAppearance: NavigationMenuActiveAppearance.HIGHLIGHTED,
  },
  render: (args) => (
    <NavigationMenuStoryWithState
      initialActiveId={initialActiveIdFromStoryArgs(args, 'leaf-deep')}
      navigationMenuProps={pickNavigationMenuPropsFromStoryArgs(args)}
    >
      <>
        <NavigationMenuItem id="home" label="Главная" icon={<Icon name="IconExHome" size="md" />} />
        <NavigationMenuItem
          id="catalog"
          label="Каталог"
          icon={<Icon name="IconExFolder" size="md" />}
          items={[
            {
              id: 'group-a',
              label: 'Группа A',
              icon: <Icon name="IconExBox1" size="md" />,
              items: [
                {
                  id: 'leaf-deep',
                  label: 'Глубокий пункт',
                  icon: <Icon name="IconExDocument" size="md" />,
                },
                {
                  id: 'leaf-a2',
                  label: 'Ещё пункт',
                  icon: <Icon name="IconExCheck" size="md" />,
                },
              ],
            },
            {
              id: 'group-b',
              label: 'Группа B',
              icon: <Icon name="IconExChart" size="md" />,
              items: [
                {
                  id: 'leaf-b1',
                  label: 'Пункт B1',
                  icon: <Icon name="IconExUser" size="md" />,
                },
              ],
            },
          ]}
        />
        <NavigationMenuItem
          id="settings"
          label="Настройки"
          icon={<Icon name="IconExSettings" size="md" />}
        />
      </>
    </NavigationMenuStoryWithState>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Рекурсивный проп **items**; шеврон по умолчанию; родитель подсвечивается, если активен потомок; в компактном режиме подсписки скрыты.',
      },
    },
  },
};

export const Expanded: Story = {
  args: {
    'aria-label': 'Основная навигация',
    defaultActiveId: 'home',
    activeAppearance: NavigationMenuActiveAppearance.BAR,
  },
  render: (args) => (
    <NavigationMenuStoryWithState
      initialActiveId={initialActiveIdFromStoryArgs(args, 'home')}
      navigationMenuProps={pickNavigationMenuPropsFromStoryArgs(args)}
    >
      <>
        <NavigationMenuItem id="home" label="Главная" icon={<Icon name="IconExHome" size="md" />} />
        <NavigationMenuItem
          id="inbox"
          label="Входящие"
          icon={<Icon name="IconExUser" size="md" />}
          badge={3}
        />
        <NavigationMenuItem
          id="folders"
          label="Папки"
          icon={<Icon name="IconExSettings" size="md" />}
          suffix={<span aria-hidden>▼</span>}
        />
        <NavigationMenuItem
          id="disabled"
          label="Отключено"
          disabled
          icon={<Icon name="IconExHome" size="md" />}
        />
      </>
    </NavigationMenuStoryWithState>
  ),
};

export const HighlightedActive: Story = {
  args: {
    'aria-label': 'Навигация',
    defaultActiveId: 'inbox',
    activeAppearance: NavigationMenuActiveAppearance.HIGHLIGHTED,
  },
  render: (args) => (
    <NavigationMenuStoryWithState
      initialActiveId={initialActiveIdFromStoryArgs(args, 'inbox')}
      navigationMenuProps={pickNavigationMenuPropsFromStoryArgs(args)}
    >
      <>
        <NavigationMenuItem id="home" label="Главная" icon={<Icon name="IconExHome" size="md" />} />
        <NavigationMenuItem
          id="inbox"
          label="Входящие"
          icon={<Icon name="IconExUser" size="md" />}
          badge={12}
        />
        <NavigationMenuItem id="faq" label="FAQ" icon={<Icon name="IconExSettings" size="md" />} />
      </>
    </NavigationMenuStoryWithState>
  ),
};

export const SolidActive: Story = {
  args: {
    'aria-label': 'Навигация',
    defaultActiveId: 'home',
    activeAppearance: NavigationMenuActiveAppearance.SOLID,
  },
  render: (args) => (
    <NavigationMenuStoryWithState
      initialActiveId={initialActiveIdFromStoryArgs(args, 'home')}
      navigationMenuProps={pickNavigationMenuPropsFromStoryArgs(args)}
    >
      <>
        <NavigationMenuItem id="home" label="Главная" icon={<Icon name="IconExHome" size="md" />} />
        <NavigationMenuItem
          id="profile"
          label="Профиль"
          icon={<Icon name="IconExUser" size="md" />}
        />
      </>
    </NavigationMenuStoryWithState>
  ),
};

export const Collapsed: Story = {
  args: {
    collapsed: true,
    'aria-label': 'Навигация',
    defaultActiveId: 'inbox',
  },
  render: (args) => (
    <NavigationMenuStoryWithState
      initialActiveId={initialActiveIdFromStoryArgs(args, 'inbox')}
      navigationMenuProps={pickNavigationMenuPropsFromStoryArgs(args)}
    >
      <>
        <NavigationMenuItem id="home" label="Главная" icon={<Icon name="IconExHome" size="md" />} />
        <NavigationMenuItem
          id="inbox"
          label="Входящие"
          icon={<Icon name="IconExUser" size="md" />}
          badge={3}
        />
        <NavigationMenuItem
          id="settings"
          label="Настройки"
          icon={<Icon name="IconExSettings" size="md" />}
        />
      </>
    </NavigationMenuStoryWithState>
  ),
};

/**
 * Обзор: **tooltip**, **hint**, приоритет hint над tooltip, **popover** (с/без выбора пункта).
 * Компактный режим — подсказки удобнее у иконок.
 */
export const ItemTooltipHintPopoverOverview: Story = {
  name: 'Пункты: tooltip, hint, popover',
  args: {
    collapsed: true,
    'aria-label': 'Демо: tooltip, hint и popover у пунктов',
    defaultActiveId: 'row-tooltip',
  },
  render: (args) => (
    <NavigationMenuStoryWithState
      initialActiveId={initialActiveIdFromStoryArgs(args, 'row-tooltip')}
      navigationMenuProps={{
        ...pickNavigationMenuPropsFromStoryArgs(args),
        collapsed: true,
      }}
    >
      <>
        <NavigationMenuItem
          id="row-tooltip"
          label="Tooltip"
          icon={<Icon name="IconExHome" size="md" />}
          tooltip={{ content: 'Краткий тултип при наведении', position: TooltipPosition.RIGHT }}
        />
        <NavigationMenuItem
          id="row-hint"
          label="Hint"
          icon={<Icon name="IconExUser" size="md" />}
          hint={{
            content:
              'Расширенная подсказка (Hint) при наведении или по настройкам visibilityTrigger',
            placement: HintPosition.RIGHT,
          }}
        />
        <NavigationMenuItem
          id="row-hint-wins"
          label="Hint важнее tooltip"
          icon={<Icon name="IconExBell" size="md" />}
          tooltip={{ content: 'Не показывается, если задан hint', position: TooltipPosition.RIGHT }}
          hint={{
            content: 'При одновременной передаче hint и tooltip показывается hint',
            placement: HintPosition.RIGHT,
          }}
        />
        <NavigationMenuItem
          id="row-popover"
          label="Popover"
          icon={<Icon name="IconExBox1" size="md" />}
          popover={{
            size: Size.MD,
            contentAriaLabel: 'Дополнительный блок',
            children: (
              <div style={popoverPanelStyle}>
                Панель поповера: клик по строке открывает; activeId по умолчанию не меняется.
              </div>
            ),
          }}
        />
        <NavigationMenuItem
          id="row-popover-active"
          label="Popover + пункт активен"
          icon={<Icon name="IconExCheck" size="md" />}
          popoverActivateNavigation
          popover={{
            size: Size.SM,
            contentAriaLabel: 'Панель с выбором строки',
            children: (
              <div style={popoverPanelStyle}>
                Задан **popoverActivateNavigation** — клик и открывает панель, и выделяет пункт.
              </div>
            ),
          }}
        />
      </>
    </NavigationMenuStoryWithState>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Один столбец меню: сверху вниз — только **tooltip**, только **hint**, оба пропа (виден hint), **popover** без смены active, **popover** с **popoverActivateNavigation**.',
      },
    },
  },
};

/** Пропсы **tooltip** и **hint** на строке пункта (в компактном режиме удобны подписи к иконкам) */
export const ItemTooltipAndHint: Story = {
  name: 'Пункты: только Tooltip и Hint (детально)',
  args: {
    collapsed: true,
    'aria-label': 'Навигация с подсказками',
    defaultActiveId: 'home',
  },
  render: (args) => (
    <NavigationMenuStoryWithState
      initialActiveId={initialActiveIdFromStoryArgs(args, 'home')}
      navigationMenuProps={pickNavigationMenuPropsFromStoryArgs(args)}
    >
      <>
        <NavigationMenuItem
          id="home"
          label="Главная"
          icon={<Icon name="IconExHome" size="md" />}
          tooltip={{ content: 'Перейти на главную', position: TooltipPosition.RIGHT }}
        />
        <NavigationMenuItem
          id="inbox"
          label="Входящие"
          icon={<Icon name="IconExUser" size="md" />}
          badge={3}
          hint={{
            content: 'Непрочитанные сообщения и уведомления',
            placement: HintPosition.RIGHT,
          }}
        />
        <NavigationMenuItem
          id="settings"
          label="Настройки"
          icon={<Icon name="IconExSettings" size="md" />}
          tooltip={{
            content: 'Если бы был и hint — показался бы он',
            position: TooltipPosition.RIGHT,
          }}
          hint={{ content: 'Hint имеет приоритет над tooltip', placement: HintPosition.RIGHT }}
        />
      </>
    </NavigationMenuStoryWithState>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Третий пункт: заданы и **tooltip**, и **hint** — отображается хинт. Первый — только тултип, второй — только хинт.',
      },
    },
  },
};

/** Проп **popover**: клик по строке открывает панель; по умолчанию **activeId** не меняется — см. второй пункт с **popoverActivateNavigation** */
export const ItemWithPopover: Story = {
  name: 'Пункты: только Popover (детально)',
  args: {
    'aria-label': 'Навигация с поповером',
    defaultActiveId: 'home',
  },
  render: (args) => (
    <NavigationMenuStoryWithState
      initialActiveId={initialActiveIdFromStoryArgs(args, 'home')}
      navigationMenuProps={pickNavigationMenuPropsFromStoryArgs(args)}
    >
      <>
        <NavigationMenuItem id="home" label="Главная" icon={<Icon name="IconExHome" size="md" />} />
        <NavigationMenuItem
          id="more"
          label="Ещё"
          icon={<Icon name="IconExBox1" size="md" />}
          popover={{
            size: Size.MD,
            contentAriaLabel: 'Дополнительные действия',
            children: (
              <div style={popoverPanelStyle}>Содержимое панели: форма, ссылки, список.</div>
            ),
          }}
        />
        <NavigationMenuItem
          id="withActive"
          label="С выбором пункта"
          icon={<Icon name="IconExCheck" size="md" />}
          popoverActivateNavigation
          popover={{
            size: Size.SM,
            contentAriaLabel: 'Панель с подсветкой пункта',
            children: (
              <div style={popoverPanelStyle}>
                Клик по строке и открывает панель, и выделяет пункт меню.
              </div>
            ),
          }}
        />
      </>
    </NavigationMenuStoryWithState>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Первый пункт без поповера. «Ещё» — только поповер (**popoverActivateNavigation** не задан). «С выбором пункта» — **popoverActivateNavigation**: строка получает **activeId**.',
      },
    },
  },
};

const expandStoryChildren = (
  <>
    <NavigationMenuItem id="home" label="Главная" icon={<Icon name="IconExHome" size="md" />} />
    <NavigationMenuItem
      id="inbox"
      label="Входящие"
      icon={<Icon name="IconExUser" size="md" />}
      badge={3}
    />
    <NavigationMenuItem
      id="settings"
      label="Настройки"
      icon={<Icon name="IconExSettings" size="md" />}
    />
  </>
);

/** Раскрытие по наведению: подписи и ширина анимируются */
export const ExpandOnHover: Story = {
  args: {
    expandInteraction: NavigationMenuExpandInteraction.HOVER,
    collapsed: true,
    defaultExpanded: false,
    expandCompactWidth: 72,
    expandFullWidth: 280,
    'aria-label': 'Навигация',
    defaultActiveId: 'home',
    onExpand: fn(),
    onCollapse: fn(),
  },
  render: (args) => (
    <NavigationMenuStoryWithState
      initialActiveId={initialActiveIdFromStoryArgs(args, 'home')}
      navigationMenuProps={pickNavigationMenuPropsFromStoryArgs(args)}
    >
      {expandStoryChildren}
    </NavigationMenuStoryWithState>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Наведите курсор на меню — панель раскроется; уберите — свернётся. Колбэки **onExpand** / **onCollapse**.',
      },
    },
  },
};

/** Раскрытие по клику вне кнопок пунктов (по оболочке) */
export const ExpandOnClick: Story = {
  args: {
    expandInteraction: NavigationMenuExpandInteraction.CLICK,
    collapsed: true,
    defaultExpanded: false,
    expandCompactWidth: 72,
    expandFullWidth: 280,
    'aria-label': 'Навигация',
    defaultActiveId: 'home',
    onExpand: fn(),
    onCollapse: fn(),
  },
  render: (args) => (
    <NavigationMenuStoryWithState
      initialActiveId={initialActiveIdFromStoryArgs(args, 'home')}
      navigationMenuProps={pickNavigationMenuPropsFromStoryArgs(args)}
    >
      {expandStoryChildren}
    </NavigationMenuStoryWithState>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Клик по области меню вне кнопок пунктов переключает компактный / полный вид. Клик по пункту только меняет активный id.',
      },
    },
  },
};

export const WithNavigationMenuItemAlias: Story = {
  name: 'NavigationMenu.Item',
  args: {
    defaultActiveId: 'a',
  },
  render: (args) => (
    <NavigationMenuStoryWithState
      initialActiveId={initialActiveIdFromStoryArgs(args, 'a')}
      navigationMenuProps={pickNavigationMenuPropsFromStoryArgs(args)}
    >
      <>
        <NavigationMenu.Item id="a" label="Пункт A" icon={<Icon name="IconExHome" size="md" />} />
        <NavigationMenu.Item id="b" label="Пункт B" icon={<Icon name="IconExUser" size="md" />} />
      </>
    </NavigationMenuStoryWithState>
  ),
};

/** Статусы: лёгкий фон success / warning / danger / info */
export const ItemStatuses: Story = {
  args: {
    'aria-label': 'Навигация со статусами',
    defaultActiveId: 'ok',
  },
  render: (args) => (
    <NavigationMenuStoryWithState
      initialActiveId={initialActiveIdFromStoryArgs(args, 'ok')}
      navigationMenuProps={pickNavigationMenuPropsFromStoryArgs(args)}
    >
      <>
        <NavigationMenuItem
          id="ok"
          label="Успех"
          status={NavigationMenuItemStatus.SUCCESS}
          icon={<Icon name="IconExCheck" size="md" />}
        />
        <NavigationMenuItem
          id="warn"
          label="Предупреждение"
          status={NavigationMenuItemStatus.WARNING}
          icon={<Icon name="IconExBell" size="md" />}
        />
        <NavigationMenuItem
          id="err"
          label="Ошибка"
          status={NavigationMenuItemStatus.DANGER}
          icon={<Icon name="IconExClose" size="md" />}
        />
        <NavigationMenuItem
          id="info"
          label="Инфо"
          status={NavigationMenuItemStatus.INFO}
          icon={<Icon name="IconExInfoCircle" size="md" />}
        />
      </>
    </NavigationMenuStoryWithState>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Проп **status** добавляет фон с оттенком из темы; не отменяет логику **active**.',
      },
    },
  },
};

/** Пункт в загрузке: спиннер справа, смена active отключена */
export const ItemLoading: Story = {
  args: {
    'aria-label': 'Навигация',
    defaultActiveId: 'a',
  },
  render: (args) => (
    <NavigationMenuStoryWithState
      initialActiveId={initialActiveIdFromStoryArgs(args, 'a')}
      navigationMenuProps={pickNavigationMenuPropsFromStoryArgs(args)}
    >
      <>
        <NavigationMenuItem id="a" label="Готово" icon={<Icon name="IconExHome" size="md" />} />
        <NavigationMenuItem
          id="loading"
          label="Синхронизация…"
          icon={<Icon name="IconExLoading" size="md" />}
          loading
        />
        <NavigationMenuItem id="b" label="Другое" icon={<Icon name="IconExUser" size="md" />} />
      </>
    </NavigationMenuStoryWithState>
  ),
  parameters: {
    docs: {
      description: {
        story: '**loading** — `aria-busy`, кнопка disabled, выбор другого пункта доступен.',
      },
    },
  },
};

/** Скелетон вместо данных пункта */
export const ItemSkeleton: Story = {
  args: {
    'aria-label': 'Навигация',
    defaultActiveId: 'a',
  },
  render: (args) => (
    <NavigationMenuStoryWithState
      initialActiveId={initialActiveIdFromStoryArgs(args, 'a')}
      navigationMenuProps={pickNavigationMenuPropsFromStoryArgs(args)}
    >
      <>
        <NavigationMenuItem id="a" label="Готово" icon={<Icon name="IconExHome" size="md" />} />
        <NavigationMenuItem id="sk" label="" skeleton />
        <NavigationMenuItem id="b" label="Пункт" icon={<Icon name="IconExUser" size="md" />} />
      </>
    </NavigationMenuStoryWithState>
  ),
};

const itemVisibilityToggleToolbarStyle: React.CSSProperties = {
  marginTop: 0,
  marginBottom: 12,
  fontSize: 14,
};

const ItemVisibilityToggleExample: React.FC = () => {
  const [isOptionalVisible, setIsOptionalVisible] = React.useState(true);
  return (
    <div>
      <p style={itemVisibilityToggleToolbarStyle}>
        <button
          type="button"
          onClick={() => setIsOptionalVisible((previous) => !previous)}
          style={navigationMenuStoriesStyles.toggleVisibilityButton}
        >
          {isOptionalVisible ? 'Скрыть' : 'Показать'} пункт «Скрываемый»
        </button>
      </p>
      <NavigationMenuStoryWithState
        initialActiveId="a"
        navigationMenuProps={{ 'aria-label': 'Навигация' }}
      >
        <NavigationMenuItem id="a" label="Всегда" icon={<Icon name="IconExHome" size="md" />} />
        <NavigationMenuItem
          id="opt"
          label="Скрываемый"
          icon={<Icon name="IconExSettings" size="md" />}
          isVisible={isOptionalVisible}
        />
        <NavigationMenuItem id="b" label="Конец" icon={<Icon name="IconExUser" size="md" />} />
      </NavigationMenuStoryWithState>
    </div>
  );
};

/** Скрытие / появление строки: кнопка переключает пункт «Скрываемый» */
export const ItemVisibilityToggle: Story = {
  render: () => <ItemVisibilityToggleExample />,
  parameters: {
    docs: {
      description: {
        story:
          '**isVisible** — анимация opacity + смещение и схлопывание строки (CSS grid 1fr/0fr).',
      },
    },
  },
};
