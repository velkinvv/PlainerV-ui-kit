import type { Meta, StoryObj } from '@storybook/react';
import type { RadioButtonGroupOption } from '../../../types/ui';
import React, { useState } from 'react';
import { RadioButtonGroup } from './RadioButtonGroup';
import { Size, IconSize } from '../../../types/sizes';
import {
  RadioButtonGroupOrientation,
  RadioButtonVariant,
  RadioButtonLabelPosition,
  TooltipPosition,
} from '../../../types/ui';
import { Icon } from '../Icon/Icon';
import { DOC_RADIO_BUTTON_GROUP } from '@/components/ui/storyDocs/uiKitDocs';
import { radioButtonGroupStoriesStyles } from './RadioButtonGroup.stories.styles';

const meta: Meta<typeof RadioButtonGroup> = {
  title: 'UI Kit/Inputs/RadioButtonGroup',
  component: RadioButtonGroup,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_RADIO_BUTTON_GROUP,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: [RadioButtonGroupOrientation.HORIZONTAL, RadioButtonGroupOrientation.VERTICAL],
      description: 'Ориентация группы: horizontal или vertical',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключить всю группу',
    },
    readOnly: {
      control: 'boolean',
      description: 'Только для чтения (вся группа)',
    },
    size: {
      control: { type: 'select' },
      options: [Size.SM, Size.MD, Size.LG],
      description: 'Размер радиокнопок в группе',
    },
    variant: {
      control: { type: 'select' },
      options: [RadioButtonVariant.FILLED, RadioButtonVariant.OUTLINE],
      description: 'Вариант радиокнопок в группе',
    },
    labelPosition: {
      control: { type: 'select' },
      options: [
        RadioButtonLabelPosition.RIGHT,
        RadioButtonLabelPosition.LEFT,
        RadioButtonLabelPosition.TOP,
        RadioButtonLabelPosition.BOTTOM,
        RadioButtonLabelPosition.NONE,
      ],
      description: 'Позиция лейбла для радиокнопок в группе',
    },
    error: {
      description:
        'Текст ошибки для всей группы или отдельных опций: одна строка либо массив строк по порядку опций',
      control: { type: 'text' },
      table: {
        type: {
          summary: 'строка (общая ошибка) или массив строк (по опциям)',
        },
      },
    },
    additionalLabel: {
      control: 'text',
      description: 'Вторая строка под заголовком группы (как additionalLabel у Input)',
    },
    helperText: {
      control: 'text',
      description: 'Вспомогательный текст под группой (не показывается при ошибке группы или success)',
    },
    success: {
      control: 'boolean',
      description: 'Успешное состояние группы (текст «Успешно» под опциями, как у Input)',
    },
    extraText: {
      control: 'text',
      description: 'Дополнительная строка под сообщениями группы (как extraText у Input)',
    },
  },
};

export default meta;
type RadioButtonGroupStory = StoryObj<typeof RadioButtonGroup>;

// Базовые опции для примеров
const basicOptions: RadioButtonGroupOption[] = [
  { value: 'option1', label: 'Опция 1' },
  { value: 'option2', label: 'Опция 2' },
  { value: 'option3', label: 'Опция 3' },
];

export const GroupDefault: RadioButtonGroupStory = {
  render: () => {
    const [value, setValue] = useState('option1');

    return (
      <RadioButtonGroup
        options={basicOptions}
        value={value}
        onChange={(changeEvent) => setValue(changeEvent.target.value)}
        label="Выберите опцию"
      />
    );
  },
};

export const GroupHorizontal: RadioButtonGroupStory = {
  render: () => {
    const [value, setValue] = useState('option1');

    return (
      <RadioButtonGroup
        options={basicOptions}
        value={value}
        onChange={(changeEvent) => setValue(changeEvent.target.value)}
        label="Горизонтальное расположение"
        additionalLabel="Та же дополнительная строка подписи, что и у текстовых полей."
        orientation={RadioButtonGroupOrientation.HORIZONTAL}
      />
    );
  },
};

export const GroupVertical: RadioButtonGroupStory = {
  render: () => {
    const [value, setValue] = useState('option1');

    return (
      <RadioButtonGroup
        options={basicOptions}
        value={value}
        onChange={(changeEvent) => setValue(changeEvent.target.value)}
        label="Вертикальное расположение"
        orientation={RadioButtonGroupOrientation.VERTICAL}
      />
    );
  },
};

export const GroupWithExtraText: RadioButtonGroupStory = {
  render: () => {
    const [value, setValue] = useState('option1');

    const options: RadioButtonGroupOption[] = [
      { value: 'option1', label: 'Базовый план', extraText: 'Бесплатно навсегда' },
      { value: 'option2', label: 'Профессиональный план', extraText: '990₽/месяц' },
      { value: 'option3', label: 'Корпоративный план', extraText: 'По запросу' },
    ];

    return (
      <RadioButtonGroup
        options={options}
        value={value}
        onChange={(changeEvent) => setValue(changeEvent.target.value)}
        label="Выберите тарифный план"
        orientation={RadioButtonGroupOrientation.VERTICAL}
      />
    );
  },
};

export const GroupWithOnClick: RadioButtonGroupStory = {
  render: () => {
    const [value, setValue] = useState('option1');
    const [clickedValue, setClickedValue] = useState<string | null>(null);

    const handleChange = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
      setValue(changeEvent.target.value);
    };

    const handleClick = (val: string, option: RadioButtonGroupOption) => {
      setClickedValue(val);
      console.log('Клик по опции:', val, option);
    };

    return (
      <div style={radioButtonGroupStoriesStyles.columnGap16}>
        <RadioButtonGroup
          options={basicOptions}
          value={value}
          onChange={handleChange}
          onClick={handleClick}
          label="Группа с обработчиком onClick"
        />
        {clickedValue && (
          <div style={radioButtonGroupStoriesStyles.selectedCard}>
            <strong>Последний клик:</strong> {clickedValue}
          </div>
        )}
      </div>
    );
  },
};

export const GroupDisabled: RadioButtonGroupStory = {
  render: () => {
    const [value, setValue] = useState('option1');

    return (
      <RadioButtonGroup
        options={basicOptions}
        value={value}
        onChange={(changeEvent) => setValue(changeEvent.target.value)}
        label="Отключенная группа"
        disabled={true}
      />
    );
  },
};

export const GroupReadOnly: RadioButtonGroupStory = {
  render: () => {
    const [value, setValue] = useState('option2');

    return (
      <RadioButtonGroup
        options={basicOptions}
        value={value}
        onChange={(changeEvent) => setValue(changeEvent.target.value)}
        label="Группа только для чтения"
        readOnly={true}
      />
    );
  },
};

export const GroupWithVariants: RadioButtonGroupStory = {
  render: () => {
    const [value1, setValue1] = useState('option1');
    const [value2, setValue2] = useState('option1');

    return (
      <div style={radioButtonGroupStoriesStyles.columnGap24}>
        <RadioButtonGroup
          options={basicOptions}
          value={value1}
          onChange={(changeEvent) => setValue1(changeEvent.target.value)}
          label="Filled вариант (по умолчанию)"
          variant={RadioButtonVariant.FILLED}
        />
        <RadioButtonGroup
          options={basicOptions}
          value={value2}
          onChange={(changeEvent) => setValue2(changeEvent.target.value)}
          label="Outline вариант"
          variant={RadioButtonVariant.OUTLINE}
        />
      </div>
    );
  },
};

export const GroupWithSizes: RadioButtonGroupStory = {
  render: () => {
    const [value1, setValue1] = useState('option1');
    const [value2, setValue2] = useState('option1');
    const [value3, setValue3] = useState('option1');

    return (
      <div style={radioButtonGroupStoriesStyles.columnGap24}>
        <RadioButtonGroup
          options={basicOptions}
          value={value1}
          onChange={(changeEvent) => setValue1(changeEvent.target.value)}
          label="Маленький размер"
          size={Size.SM}
        />
        <RadioButtonGroup
          options={basicOptions}
          value={value2}
          onChange={(changeEvent) => setValue2(changeEvent.target.value)}
          label="Средний размер (по умолчанию)"
          size={Size.MD}
        />
        <RadioButtonGroup
          options={basicOptions}
          value={value3}
          onChange={(changeEvent) => setValue3(changeEvent.target.value)}
          label="Большой размер"
          size={Size.LG}
        />
      </div>
    );
  },
};

export const GroupWithLabelPositions: RadioButtonGroupStory = {
  render: () => {
    const [value1, setValue1] = useState('option1');
    const [value2, setValue2] = useState('option1');
    const [value3, setValue3] = useState('option1');

    const options: RadioButtonGroupOption[] = [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
    ];

    return (
      <div style={radioButtonGroupStoriesStyles.columnGap24}>
        <RadioButtonGroup
          options={options}
          value={value1}
          onChange={(changeEvent) => setValue1(changeEvent.target.value)}
          label="Лейбл справа (по умолчанию)"
          labelPosition={RadioButtonLabelPosition.RIGHT}
        />
        <RadioButtonGroup
          options={options}
          value={value2}
          onChange={(changeEvent) => setValue2(changeEvent.target.value)}
          label="Лейбл слева"
          labelPosition={RadioButtonLabelPosition.LEFT}
        />
        <RadioButtonGroup
          options={options}
          value={value3}
          onChange={(changeEvent) => setValue3(changeEvent.target.value)}
          label="Лейбл сверху"
          labelPosition={RadioButtonLabelPosition.TOP}
          orientation={RadioButtonGroupOrientation.HORIZONTAL}
        />
      </div>
    );
  },
};

export const GroupComplex: RadioButtonGroupStory = {
  render: () => {
    const [value, setValue] = useState('plan1');

    const options: RadioButtonGroupOption[] = [
      {
        value: 'plan1',
        label: 'Базовый план',
        extraText: 'Идеально для начинающих',
        variant: RadioButtonVariant.FILLED,
      },
      {
        value: 'plan2',
        label: 'Профессиональный план',
        extraText: 'Для профессионалов и команд',
        variant: RadioButtonVariant.FILLED,
      },
      {
        value: 'plan3',
        label: 'Корпоративный план',
        extraText: 'Максимальные возможности',
        variant: RadioButtonVariant.FILLED,
      },
    ];

    return (
      <div style={radioButtonGroupStoriesStyles.columnGap16}>
        <RadioButtonGroup
          options={options}
          value={value}
          onChange={(changeEvent) => setValue(changeEvent.target.value)}
          label="Выберите тарифный план"
          orientation={RadioButtonGroupOrientation.VERTICAL}
          size={Size.MD}
        />
        <div style={radioButtonGroupStoriesStyles.selectedCard}>
          <strong>Выбранный план:</strong> {value}
        </div>
      </div>
    );
  },
};

// ==================== Новые функции для группы ====================

export const GroupWithError: RadioButtonGroupStory = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <RadioButtonGroup
        options={basicOptions}
        value={value}
        onChange={(changeEvent) => setValue(changeEvent.target.value)}
        label="Выберите опцию (с ошибкой)"
        error="Пожалуйста, выберите одну из опций"
        required
      />
    );
  },
};

export const GroupWithHelperText: RadioButtonGroupStory = {
  render: () => {
    const [value, setValue] = useState('option1');

    return (
      <RadioButtonGroup
        options={basicOptions}
        value={value}
        onChange={(changeEvent) => setValue(changeEvent.target.value)}
        label="Выберите опцию"
        helperText="Это вспомогательный текст, который помогает понять выбор"
      />
    );
  },
};

export const GroupWithHelperAndExtraText: RadioButtonGroupStory = {
  render: () => {
    const [value, setValue] = useState('option1');

    return (
      <RadioButtonGroup
        options={basicOptions}
        value={value}
        onChange={(changeEvent) => setValue(changeEvent.target.value)}
        label="Способ доставки"
        helperText="От выбора зависит срок и стоимость."
        extraText="Бесплатная доставка от 3000 ₽ по городу."
      />
    );
  },
};

export const GroupWithSuccessAndExtraText: RadioButtonGroupStory = {
  render: () => {
    const [value, setValue] = useState('option2');

    return (
      <RadioButtonGroup
        options={basicOptions}
        value={value}
        onChange={(changeEvent) => setValue(changeEvent.target.value)}
        label="План подписки"
        success
        extraText="Изменения вступят в силу со следующего расчётного периода."
      />
    );
  },
};

/** Общая ошибка группы и `extraText` снизу (подсказка к ошибке не показывается — только extra). */
export const GroupWithErrorAndFooterExtra: RadioButtonGroupStory = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <RadioButtonGroup
        options={basicOptions}
        value={value}
        onChange={(changeEvent) => setValue(changeEvent.target.value)}
        label="Согласие на обработку"
        error="Нужно выбрать один из вариантов."
        extraText="Подробнее в политике конфиденциальности в подвале страницы."
        required
      />
    );
  },
};

/** Только групповой `extraText` без helper и success — как нейтральное примечание к форме. */
export const GroupFooterExtraTextOnly: RadioButtonGroupStory = {
  render: () => {
    const [value, setValue] = useState('option1');

    return (
      <RadioButtonGroup
        options={basicOptions}
        value={value}
        onChange={(changeEvent) => setValue(changeEvent.target.value)}
        label="Частота рассылки"
        extraText="Письма можно отключить в любой момент в настройках профиля."
      />
    );
  },
};

/** Только успех без дополнительной строки — строка «Успешно» под опциями. */
export const GroupWithSuccessOnly: RadioButtonGroupStory = {
  render: () => {
    const [value, setValue] = useState('option1');

    return (
      <RadioButtonGroup
        options={basicOptions}
        value={value}
        onChange={(changeEvent) => setValue(changeEvent.target.value)}
        label="Регион"
        success
      />
    );
  },
};

/** Группа с tooltip на заголовке, helper, групповым `extraText` и тарифами с `extraText` у опций. */
export const GroupWithTooltipHelperAndFooterExtra: RadioButtonGroupStory = {
  render: () => {
    const [value, setValue] = useState('plan2');

    const tariffOptions: RadioButtonGroupOption[] = [
      { value: 'plan1', label: 'Старт', extraText: '0 ₽' },
      { value: 'plan2', label: 'Бизнес', extraText: '1 490 ₽ / мес' },
      { value: 'plan3', label: 'Enterprise', extraText: 'по запросу' },
    ];

    return (
      <RadioButtonGroup
        options={tariffOptions}
        value={value}
        onChange={(changeEvent) => setValue(changeEvent.target.value)}
        label="Тариф"
        tooltip="Тариф влияет на лимиты API и количество мест."
        tooltipPosition={TooltipPosition.TOP}
        helperText="Смена тарифа не прерывает текущий оплаченный период."
        extraText="НДС включён в цену для юрлиц РФ."
        orientation={RadioButtonGroupOrientation.VERTICAL}
      />
    );
  },
};

/**
 * Витрина: несколько групп с разными комбинациями нижних текстов (как у `Input`).
 */
function RadioButtonGroupFooterShowcaseDemo() {
  const [valueErrorExtra, setValueErrorExtra] = useState('');
  const [valueHelperExtra, setValueHelperExtra] = useState('option2');
  const [valueSuccessExtra, setValueSuccessExtra] = useState('option3');

  return (
    <div style={radioButtonGroupStoriesStyles.showcaseContainer}>
      <section aria-labelledby="rg-showcase-error-extra">
        <h3 id="rg-showcase-error-extra" style={radioButtonGroupStoriesStyles.showcaseHeading}>
          Ошибка + extraText
        </h3>
        <RadioButtonGroup
          options={basicOptions}
          value={valueErrorExtra}
          onChange={(changeEvent) => setValueErrorExtra(changeEvent.target.value)}
          label="Пример 1"
          error={valueErrorExtra ? undefined : 'Сделайте выбор'}
          extraText="Дополнительное пояснение под ошибкой."
          orientation={RadioButtonGroupOrientation.VERTICAL}
        />
      </section>

      <section aria-labelledby="rg-showcase-helper-extra">
        <h3 id="rg-showcase-helper-extra" style={radioButtonGroupStoriesStyles.showcaseHeading}>
          helperText + extraText
        </h3>
        <RadioButtonGroup
          options={basicOptions}
          value={valueHelperExtra}
          onChange={(changeEvent) => setValueHelperExtra(changeEvent.target.value)}
          label="Пример 2"
          helperText="Обычная подсказка под группой."
          extraText="Второстепенная строка внизу."
        />
      </section>

      <section aria-labelledby="rg-showcase-success-extra">
        <h3 id="rg-showcase-success-extra" style={radioButtonGroupStoriesStyles.showcaseHeading}>
          success + extraText
        </h3>
        <RadioButtonGroup
          options={basicOptions}
          value={valueSuccessExtra}
          onChange={(changeEvent) => setValueSuccessExtra(changeEvent.target.value)}
          label="Пример 3"
          success
          extraText="Успех: helper скрыт, эта строка остаётся."
        />
      </section>
    </div>
  );
}

export const GroupFooterTextsShowcase: RadioButtonGroupStory = {
  render: () => <RadioButtonGroupFooterShowcaseDemo />,
};

export const GroupWithRequired: RadioButtonGroupStory = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <RadioButtonGroup
        options={basicOptions}
        value={value}
        onChange={(changeEvent) => setValue(changeEvent.target.value)}
        label="Обязательная группа"
        required
      />
    );
  },
};

export const GroupWithTooltip: RadioButtonGroupStory = {
  render: () => {
    const [value, setValue] = useState('option1');

    return (
      <RadioButtonGroup
        options={basicOptions}
        value={value}
        onChange={(changeEvent) => setValue(changeEvent.target.value)}
        label="Группа с tooltip"
        tooltip="Это подсказка для всей группы радиокнопок"
        tooltipPosition={TooltipPosition.TOP}
      />
    );
  },
};

export const GroupWithFullWidth: RadioButtonGroupStory = {
  render: () => {
    const [value, setValue] = useState('option1');

    return (
      <div style={radioButtonGroupStoriesStyles.width500}>
        <RadioButtonGroup
          options={basicOptions}
          value={value}
          onChange={(changeEvent) => setValue(changeEvent.target.value)}
          label="Группа с fullWidth"
          fullWidth
        />
      </div>
    );
  },
};

export const GroupWithIndividualErrors: RadioButtonGroupStory = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <RadioButtonGroup
        options={basicOptions}
        value={value}
        onChange={(changeEvent) => setValue(changeEvent.target.value)}
        label="Группа с индивидуальными ошибками"
        error={['Ошибка для опции 1', '', 'Ошибка для опции 3']}
      />
    );
  },
};

export const GroupComplexNew: RadioButtonGroupStory = {
  render: () => {
    const [value, setValue] = useState('plan1');

    const options: RadioButtonGroupOption[] = [
      {
        value: 'plan1',
        label: 'Базовый план',
        extraText: 'Бесплатно навсегда',
        leftIcon: <Icon name="IconExHome" size={IconSize.SM} />,
      },
      {
        value: 'plan2',
        label: 'Профессиональный план',
        extraText: '990₽/месяц',
        leftIcon: <Icon name="IconExStar" size={IconSize.SM} />,
      },
      {
        value: 'plan3',
        label: 'Корпоративный план',
        extraText: 'По запросу',
        leftIcon: <Icon name="IconExSettings" size={IconSize.SM} />,
      },
    ];

    return (
      <RadioButtonGroup
        options={options}
        value={value}
        onChange={(changeEvent) => setValue(changeEvent.target.value)}
        label="Выберите тарифный план"
        helperText="Выберите подходящий для вас тарифный план"
        extraText="Иконки и подписи опций — из макета; эта строка — групповой extraText, как у Input."
        required
        tooltip="Тарифные планы различаются по функциональности и цене"
        tooltipPosition={TooltipPosition.TOP}
        orientation={RadioButtonGroupOrientation.VERTICAL}
        fullWidth
      />
    );
  },
};

