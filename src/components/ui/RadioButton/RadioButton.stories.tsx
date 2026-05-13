import type { Meta, StoryObj } from '@storybook/react';
import React, { useId, useState } from 'react';
import { RadioButton } from './RadioButton';
import { AdditionalLabel, InputContainer, Label, RequiredIndicator } from '../inputs/shared';
import { Size, IconSize } from '../../../types/sizes';
import { TooltipPosition, RadioButtonLabelPosition, RadioButtonVariant } from '../../../types/ui';
import { Icon } from '../Icon/Icon';
import { DOC_RADIO_BUTTON } from '@/components/ui/storyDocs/uiKitDocs';
import { radioButtonStoriesStyles } from './RadioButton.stories.styles';

const meta: Meta<typeof RadioButton> = {
  title: 'UI Kit/Inputs/RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_RADIO_BUTTON,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Выбрана ли радио кнопка',
    },
    label: {
      control: 'text',
      description: 'Подпись рядом с кружком опции',
    },
    fieldLabel: {
      control: 'text',
      description: 'Подпись над радиокнопкой — как основной label у Input',
    },
    additionalLabel: {
      control: 'text',
      description: 'Строка под fieldLabel (как additionalLabel у Input)',
    },
    formRequired: {
      control: 'boolean',
      description: 'Звезда у fieldLabel и required на input',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключить радио кнопку',
    },
    size: {
      control: { type: 'select' },
      options: [Size.SM, Size.MD, Size.LG],
      description: 'Размер радио кнопки',
    },
    name: {
      control: 'text',
      description: 'Имя группы радио кнопок',
    },
    value: {
      control: 'text',
      description: 'Значение радио кнопки',
    },
    status: {
      control: { type: 'select' },
      options: [undefined, 'success', 'error', 'warning'],
      description: 'Визуальный статус обводки и палитры',
      table: {
        type: { summary: '`success`, `error`, `warning` либо не задан' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: [RadioButtonVariant.FILLED, RadioButtonVariant.OUTLINE],
      description: 'Вариант заливки',
      table: {
        type: { summary: '`filled` или `outline`' },
      },
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
      description: 'Позиция подписи относительно кружка',
      table: {
        type: { summary: '`right`, `left`, `top`, `bottom`, `none`' },
      },
    },
    onChange: {
      action: 'changed',
      description:
        'Событие change у `<input type="radio" />`; в связке нескольких кнопок сравнивайте `event.target.value` с `value` каждой кнопки',
      table: {
        type: {
          summary: '(event: React.ChangeEvent<HTMLInputElement>) => void',
        },
      },
    },
    error: {
      control: 'text',
      description: 'Текст ошибки под контролом (как у Input)',
    },
    helperText: {
      control: 'text',
      description: 'Подсказка под контролом; скрывается при `error` или `success`',
    },
    success: {
      control: 'boolean',
      description: 'Успех: строка «Успешно» под контролом, как у Input',
    },
    extraText: {
      control: 'text',
      description: 'Доп. строка у подписи опции (рядом с лейблом)',
    },
    extraFooterText: {
      control: 'text',
      description: 'Доп. строка под всем блоком сообщений — аналог `extraText` у Input',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Одна радиокнопка под контролем стейта (`checked` задаётся из `useState`, не только из args). */
const renderInteractiveRadioButton = (initialChecked = false): Story['render'] => {
  return (args) => {
    const [checked, setChecked] = useState(initialChecked);

    return (
      <RadioButton
        {...args}
        checked={checked}
        onChange={(event) => {
          args.onChange?.(event);
          setChecked(event.target.checked);
        }}
      />
    );
  };
};

export const Default: Story = {
  args: {
    label: 'Опция 1',
    name: 'options',
    value: 'option1',
  },
  render: renderInteractiveRadioButton(false),
};

export const Checked: Story = {
  args: {
    checked: true,
    label: 'Выбранная опция',
    name: 'options',
    value: 'option1',
  },
  render: renderInteractiveRadioButton(true),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Отключенная опция',
    name: 'options',
    value: 'option1',
  },
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
    label: 'Отключенная выбранная опция',
    name: 'options',
    value: 'option1',
  },
};

export const WithoutLabel: Story = {
  args: {
    name: 'options',
    value: 'option1',
    'aria-label': 'Радиокнопка без текстовой метки',
  },
  render: renderInteractiveRadioButton(false),
};

export const Sizes: Story = {
  render: () => {
    const [selectedSize, setSelectedSize] = useState<string>('medium');

    const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedSize(event.target.value);
    };

    return (
      <fieldset style={radioButtonStoriesStyles.fieldsetReset}>
        <legend style={radioButtonStoriesStyles.legendBase}>Размеры (одна активная группа)</legend>
        <div style={radioButtonStoriesStyles.columnGap16}>
          <RadioButton
            checked={selectedSize === 'small'}
            onChange={handleSizeChange}
            label="Маленький размер"
            name="sizes"
            value="small"
            size={Size.SM}
          />
          <RadioButton
            checked={selectedSize === 'medium'}
            onChange={handleSizeChange}
            label="Средний размер"
            name="sizes"
            value="medium"
            size={Size.MD}
          />
          <RadioButton
            checked={selectedSize === 'large'}
            onChange={handleSizeChange}
            label="Большой размер"
            name="sizes"
            value="large"
            size={Size.LG}
          />
        </div>
      </fieldset>
    );
  },
};

export const Interactive: Story = {
  args: {
    name: 'interactive',
    value: 'option1',
    label: 'Опция 1',
  },
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState('option1');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      args.onChange?.(event);
      setSelectedValue(event.target.value);
    };

    return (
      <div style={radioButtonStoriesStyles.columnGap12}>
        <RadioButton
          {...args}
          checked={selectedValue === 'option1'}
          onChange={handleChange}
          label="Опция 1"
          value="option1"
        />
        <RadioButton
          {...args}
          checked={selectedValue === 'option2'}
          onChange={handleChange}
          label="Опция 2"
          value="option2"
        />
        <RadioButton
          {...args}
          checked={selectedValue === 'option3'}
          onChange={handleChange}
          label="Опция 3"
          value="option3"
        />
        <div style={radioButtonStoriesStyles.selectedCard}>
          <strong>Выбранная опция:</strong> {selectedValue}
        </div>
      </div>
    );
  },
};

/**
 * Несколько `RadioButton` с одной общей подписью сверху: оболочка как у текстовых полей (`InputContainer` + `Label`),
 * без дублирования `fieldLabel` на каждой опции. Для многих сценариев удобнее `RadioButtonGroup`.
 */
export const SharedFieldCaptionMultipleRadios: Story = {
  render: () => {
    const [deliveryMethod, setDeliveryMethod] = useState('courier');
    const groupHeadingCaptionId = useId();

    const handleDeliveryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setDeliveryMethod(event.target.value);
    };

    return (
      <InputContainer fullWidth>
        <Label id={groupHeadingCaptionId}>
          Способ доставки
          <RequiredIndicator>*</RequiredIndicator>
        </Label>
        <AdditionalLabel>
          Все варианты относятся к одному заказу; доступен только один способ.
        </AdditionalLabel>
        <div role="radiogroup" aria-labelledby={groupHeadingCaptionId}>
          <div style={radioButtonStoriesStyles.columnGap12}>
            <RadioButton
              name="delivery-shared-caption"
              value="courier"
              checked={deliveryMethod === 'courier'}
              onChange={handleDeliveryChange}
              label="Курьерская доставка"
            />
            <RadioButton
              name="delivery-shared-caption"
              value="pickup"
              checked={deliveryMethod === 'pickup'}
              onChange={handleDeliveryChange}
              label="Самовывоз со склада"
            />
            <RadioButton
              name="delivery-shared-caption"
              value="post"
              checked={deliveryMethod === 'post'}
              onChange={handleDeliveryChange}
              label="Почтовая отправка"
            />
          </div>
        </div>
        <p style={radioButtonStoriesStyles.selectedValueCaption}>
          Выбрано:&nbsp;<strong>{deliveryMethod}</strong>
        </p>
      </InputContainer>
    );
  },
};

export const RadioGroup: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState('light');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedValue(event.target.value);
    };

    const options = [
      { value: 'light', label: 'Светлая тема' },
      { value: 'dark', label: 'Темная тема' },
      { value: 'auto', label: 'Автоматически' },
    ];

    return (
      <div style={radioButtonStoriesStyles.columnGap12}>
        <h3 style={radioButtonStoriesStyles.headingWithBottom16}>Выберите тему оформления:</h3>
        {options.map((option) => (
          <RadioButton
            key={option.value}
            checked={selectedValue === option.value}
            onChange={handleChange}
            label={option.label}
            name="theme"
            value={option.value}
          />
        ))}
        <div style={radioButtonStoriesStyles.selectedCard}>
          <strong>Выбранная тема:</strong> {selectedValue}
        </div>
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedValue(event.target.value);
    };

    const hasError = selectedValue === '';

    return (
      <div style={radioButtonStoriesStyles.columnGap12}>
        <h3 style={radioButtonStoriesStyles.headingWithBottom16}>Выберите способ доставки:</h3>
        <RadioButton
          checked={selectedValue === 'courier'}
          onChange={handleChange}
          label="Курьерская доставка"
          name="delivery"
          value="courier"
        />
        <RadioButton
          checked={selectedValue === 'pickup'}
          onChange={handleChange}
          label="Самовывоз"
          name="delivery"
          value="pickup"
        />
        <RadioButton
          checked={selectedValue === 'post'}
          onChange={handleChange}
          label="Почта России"
          name="delivery"
          value="post"
        />
        {hasError && (
          <div style={radioButtonStoriesStyles.errorText}>Пожалуйста, выберите способ доставки</div>
        )}
      </div>
    );
  },
};

// ==================== Новые функции ====================

export const WithErrorState: Story = {
  render: () => {
    const [value, setValue] = useState('option1');

    return (
      <div style={radioButtonStoriesStyles.columnGap16}>
        <RadioButton
          checked={value === 'option1'}
          onChange={(changeEvent) => setValue(changeEvent.target.value)}
          label="Опция с ошибкой"
          name="error"
          value="option1"
          error="Это поле обязательно для заполнения"
        />
        <RadioButton
          checked={value === 'option2'}
          onChange={(changeEvent) => setValue(changeEvent.target.value)}
          label="Опция без ошибки"
          name="error"
          value="option2"
        />
      </div>
    );
  },
};

export const WithHelperText: Story = {
  render: () => {
    const [value, setValue] = useState('option1');

    return (
      <div style={radioButtonStoriesStyles.columnGap16}>
        <RadioButton
          checked={value === 'option1'}
          onChange={(changeEvent) => setValue(changeEvent.target.value)}
          label="Опция с подсказкой"
          name="helper"
          value="option1"
          helperText="Это вспомогательный текст, который помогает пользователю понять выбор"
        />
        <RadioButton
          checked={value === 'option2'}
          onChange={(changeEvent) => setValue(changeEvent.target.value)}
          label="Обычная опция"
          name="helper"
          value="option2"
        />
      </div>
    );
  },
};

export const WithHelperAndFooterExtra: Story = {
  render: () => {
    const [value, setValue] = useState('option1');

    return (
      <RadioButton
        checked={value === 'option1'}
        onChange={(changeEvent) => setValue(changeEvent.target.value)}
        label="Экспресс-доставка"
        name="radio-footer-demo"
        value="option1"
        helperText="Срок — 1–2 рабочих дня по городу."
        extraFooterText="Стоимость рассчитывается при оформлении заказа."
      />
    );
  },
};

export const WithSuccessAndFooterExtra: Story = {
  render: () => {
    const [value, setValue] = useState('option1');

    return (
      <RadioButton
        checked={value === 'option1'}
        onChange={(changeEvent) => setValue(changeEvent.target.value)}
        label="Способ оплаты сохранён"
        name="radio-success-demo"
        value="option1"
        success
        extraFooterText="Платёж будет списан при отгрузке."
      />
    );
  },
};

export const WithErrorAndFooterExtra: Story = {
  render: () => {
    const [value, setValue] = useState('option1');

    return (
      <RadioButton
        checked={value === 'option1'}
        onChange={(changeEvent) => setValue(changeEvent.target.value)}
        label="Проблемный способ оплаты"
        name="radio-error-extra-demo"
        value="option1"
        error="Карта отклонена банком. Выберите другой способ."
        extraFooterText="Поддержка: support@example.com"
      />
    );
  },
};

export const WithFieldLabelAndFooterMessages: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <RadioButton
        checked={value === 'save'}
        onChange={() => setValue('save')}
        fieldLabel="Сохранение черновика"
        additionalLabel="Черновик виден только вам до публикации."
        label="Сохранить как черновик"
        name="draft-save"
        value="save"
        formRequired
        error={value ? undefined : 'Подтвердите действие, выбрав опцию.'}
        helperText={value ? 'Можно вернуться к редактированию позже.' : undefined}
        extraFooterText="Черновики хранятся 30 дней."
      />
    );
  },
};

export const WithTooltip: Story = {
  render: () => {
    const [value, setValue] = useState('option1');

    return (
      <div style={radioButtonStoriesStyles.columnGap16}>
        <RadioButton
          checked={value === 'option1'}
          onChange={(changeEvent) => setValue(changeEvent.target.value)}
          label="Опция с tooltip (сверху)"
          name="tooltip"
          value="option1"
          tooltip="Это подсказка, которая появляется при наведении"
          tooltipPosition={TooltipPosition.TOP}
        />
        <RadioButton
          checked={value === 'option2'}
          onChange={(changeEvent) => setValue(changeEvent.target.value)}
          label="Опция с tooltip (снизу)"
          name="tooltip"
          value="option2"
          tooltip="Подсказка снизу"
          tooltipPosition={TooltipPosition.BOTTOM}
        />
        <RadioButton
          checked={value === 'option3'}
          onChange={(changeEvent) => setValue(changeEvent.target.value)}
          label="Опция с tooltip (слева)"
          name="tooltip"
          value="option3"
          tooltip="Подсказка слева"
          tooltipPosition={TooltipPosition.LEFT}
        />
        <RadioButton
          checked={value === 'option4'}
          onChange={(changeEvent) => setValue(changeEvent.target.value)}
          label="Опция с tooltip (справа)"
          name="tooltip"
          value="option4"
          tooltip="Подсказка справа"
          tooltipPosition={TooltipPosition.RIGHT}
        />
      </div>
    );
  },
};

export const WithRequired: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <div style={radioButtonStoriesStyles.columnGap16}>
        <RadioButton
          checked={value === 'option1'}
          onChange={(changeEvent) => setValue(changeEvent.target.value)}
          label="Обязательная опция 1"
          name="required"
          value="option1"
          required
        />
        <RadioButton
          checked={value === 'option2'}
          onChange={(changeEvent) => setValue(changeEvent.target.value)}
          label="Обязательная опция 2"
          name="required"
          value="option2"
          required
        />
        <RadioButton
          checked={value === 'option3'}
          onChange={(changeEvent) => setValue(changeEvent.target.value)}
          label="Необязательная опция"
          name="required"
          value="option3"
        />
      </div>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const [value, setValue] = useState('option1');

    return (
      <div style={radioButtonStoriesStyles.columnGap16}>
        <RadioButton
          checked={value === 'option1'}
          onChange={(changeEvent) => setValue(changeEvent.target.value)}
          label="Опция с иконкой слева"
          name="icons"
          value="option1"
          leftIcon={<Icon name="IconExHome" size={IconSize.SM} />}
        />
        <RadioButton
          checked={value === 'option2'}
          onChange={(changeEvent) => setValue(changeEvent.target.value)}
          label="Опция с иконкой справа"
          name="icons"
          value="option2"
          rightIcon={<Icon name="IconExCheck" size={IconSize.SM} />}
          labelPosition={RadioButtonLabelPosition.LEFT}
        />
        <RadioButton
          checked={value === 'option3'}
          onChange={(changeEvent) => setValue(changeEvent.target.value)}
          label="Опция с обеими иконками"
          name="icons"
          value="option3"
          leftIcon={<Icon name="IconExStar" size={IconSize.SM} />}
          rightIcon={<Icon name="IconExHeart" size={IconSize.SM} />}
        />
      </div>
    );
  },
};

export const WithStatus: Story = {
  render: () => {
    const [value1, setValue1] = useState('option1');
    const [value2, setValue2] = useState('option1');
    const [value3, setValue3] = useState('option1');

    return (
      <div style={radioButtonStoriesStyles.columnGap24}>
        <div>
          <h4>Success статус:</h4>
          <RadioButton
            checked={value1 === 'option1'}
            onChange={(changeEvent) => setValue1(changeEvent.target.value)}
            label="Опция со статусом success"
            name="status-success"
            value="option1"
            status="success"
          />
        </div>
        <div>
          <h4>Error статус:</h4>
          <RadioButton
            checked={value2 === 'option1'}
            onChange={(changeEvent) => setValue2(changeEvent.target.value)}
            label="Опция со статусом error"
            name="status-error"
            value="option1"
            status="error"
          />
        </div>
        <div>
          <h4>Warning статус:</h4>
          <RadioButton
            checked={value3 === 'option1'}
            onChange={(changeEvent) => setValue3(changeEvent.target.value)}
            label="Опция со статусом warning"
            name="status-warning"
            value="option1"
            status="warning"
          />
        </div>
      </div>
    );
  },
};

export const FullWidth: Story = {
  render: () => {
    const [value, setValue] = useState('option1');

    return (
      <div style={radioButtonStoriesStyles.width400Column16}>
        <RadioButton
          checked={value === 'option1'}
          onChange={(changeEvent) => setValue(changeEvent.target.value)}
          label="Опция с fullWidth"
          name="fullwidth"
          value="option1"
          fullWidth
        />
        <RadioButton
          checked={value === 'option2'}
          onChange={(changeEvent) => setValue(changeEvent.target.value)}
          label="Обычная опция"
          name="fullwidth"
          value="option2"
        />
      </div>
    );
  },
};

export const ComplexExample: Story = {
  render: () => {
    const [value, setValue] = useState('plan1');

    return (
      <div style={radioButtonStoriesStyles.columnGap16}>
        <RadioButton
          checked={value === 'plan1'}
          onChange={(changeEvent) => setValue(changeEvent.target.value)}
          label="Базовый план"
          name="complex"
          value="plan1"
          extraText="Бесплатно навсегда"
          helperText="Идеально для начинающих пользователей"
          leftIcon={<Icon name="IconExHome" size={IconSize.SM} />}
          required
          tooltip="Это базовый план с ограниченными возможностями"
        />
        <RadioButton
          checked={value === 'plan2'}
          onChange={(changeEvent) => setValue(changeEvent.target.value)}
          label="Профессиональный план"
          name="complex"
          value="plan2"
          extraText="990₽/месяц"
          helperText="Для профессионалов и команд"
          leftIcon={<Icon name="IconExStar" size={IconSize.SM} />}
          required
          status="success"
        />
        <RadioButton
          checked={value === 'plan3'}
          onChange={(changeEvent) => setValue(changeEvent.target.value)}
          label="Корпоративный план"
          name="complex"
          value="plan3"
          extraText="По запросу"
          error="Этот план временно недоступен"
          leftIcon={<Icon name="IconExSettings" size={IconSize.SM} />}
          required
          status="error"
        />
      </div>
    );
  },
};
