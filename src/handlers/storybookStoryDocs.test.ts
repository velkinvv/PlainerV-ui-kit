import { describeStory, getStoryDocsSourceCode } from './storybookStoryDocs';
import React from 'react';
import {
  buildComponentUsageSnippetFromArgs,
  formatIconElementForUsage,
  formatUsagePropsFromArgs,
} from './storybookStoryDocsCore';
import {
  buildUsageSnippetFromRenderSource,
  extractRenderSectionFromExport,
  extractReturnJsxFromStorySource,
  extractStoryExportBlock,
  normalizeStoryUsageJsx,
} from './storybookUsageExtract';

describe('storybookStoryDocs', () => {
  it('formatUsagePropsFromArgs форматирует строки и boolean', () => {
    expect(formatUsagePropsFromArgs({ label: 'Сумма', fullWidth: true, disabled: false })).toBe(
      ' label="Сумма" fullWidth',
    );
  });

  it('formatUsagePropsFromArgs сериализует leftIcon как Icon JSX', () => {
    const IconStub = ({ name: _name, size: _size }: { name: string; size: string }) => null;
    IconStub.displayName = 'Icon';

    const props = formatUsagePropsFromArgs({
      label: 'Email',
      leftIcon: React.createElement(IconStub, { name: 'IconExMail', size: 'MD' }),
    });

    expect(props).toContain('leftIcon={<Icon name="IconExMail" size={IconSize.MD} />}');
    expect(props).toContain('label="Email"');
  });

  it('WithLeftIcon: сниппет из args содержит leftIcon', () => {
    const IconStub = ({ name: _name, size: _size }: { name: string; size: string }) => null;
    IconStub.displayName = 'Icon';

    const snippet = buildComponentUsageSnippetFromArgs('Input', {
      label: 'Email',
      placeholder: 'Введите email...',
      leftIcon: React.createElement(IconStub, { name: 'IconExMail', size: 'MD' }),
    });

    expect(snippet).toContain('leftIcon={<Icon name="IconExMail"');
    expect(snippet).not.toContain('React-элемент — см. сторис');
  });

  it('formatIconElementForUsage возвращает null для не-Icon', () => {
    const SpanStub = () => null;
    expect(formatIconElementForUsage(React.createElement(SpanStub) as never)).toBeNull();
  });

  it('buildComponentUsageSnippetFromArgs собирает JSX', () => {
    expect(buildComponentUsageSnippetFromArgs('Input', { label: 'Email', type: 'email' })).toBe(
      '<Input label="Email" type="email" />',
    );
  });

  it('buildComponentUsageSnippetFromArgs выводит children между тегами', () => {
    expect(
      buildComponentUsageSnippetFromArgs('Button', {
        children: 'Primary Button',
        variant: 'primary',
      }),
    ).toBe('<Button variant="primary">Primary Button</Button>');
  });

  it('buildComponentUsageSnippetFromArgs форматирует defaultValue-массив', () => {
    expect(
      buildComponentUsageSnippetFromArgs('SliderInput', {
        range: true,
        defaultValue: [10, 60],
      }),
    ).toBe('<SliderInput range defaultValue={[10, 60]} />');
  });

  it('getStoryDocsSourceCode предпочитает явный usageCode даже при наличии render', () => {
    const withRender = `export const WithSuccess = {
      render: () => <Input label="Другое" />,
    };`;

    const result = getStoryDocsSourceCode(withRender, {
      parameters: { docs: { source: { code: '<Input label="Email" success />' } } },
      title: 'UI Kit/Inputs/Input',
    } as never);

    expect(result).toContain('label="Email"');
    expect(result).not.toContain('Другое');
  });

  it('getStoryDocsSourceCode предпочитает явный usageCode без render', () => {
    const result = getStoryDocsSourceCode('export const X = { args: { label: "A" } };', {
      parameters: { docs: { source: { code: '<Input label="A" />' } } },
      title: 'UI Kit/Inputs/Input',
    } as never);

    expect(result).toContain('<Input label="A"');
    expect(result).toContain('<Form formId="example-form">');
  });

  it('describeStory задаёт type code для обхода dynamic transform', () => {
    const params = describeStory('Описание', '<Input success />').parameters;
    expect(params?.docs?.source?.type).toBe('code');
    expect(params?.docs?.source?.code).toBe('<Input success />');
  });

  it('getStoryDocsSourceCode строит сниппет из args без render', () => {
    const result = getStoryDocsSourceCode('export const Default = { args: { label: "X" } };', {
      component: { displayName: 'SliderInput' },
      args: { label: 'Громкость', defaultValue: 42 },
      parameters: {},
    } as never);

    expect(result).toContain('<SliderInput');
    expect(result).toContain('label="Громкость"');
    expect(result).not.toContain('Интерактивная демонстрация');
  });

  it('getStoryDocsSourceCode извлекает JSX из render с useState', () => {
    const source = `export const SearchSelect = {
      render: () => {
        const [value, setValue] = useState('');
        return (
          <div style={styles.box}>
            <Select mode="searchSelect" value={value} onValueChange={setValue} />
          </div>
        );
      },
    };`;

    const result = getStoryDocsSourceCode(source, {
      component: { displayName: 'Select' },
      args: {},
      parameters: {},
    } as never);

    expect(result).toContain('useState');
    expect(result).toContain('<Select');
    expect(result).not.toContain('Интерактивная демонстрация');
  });

  it('extractReturnJsxFromStorySource извлекает render без скобок вокруг JSX', () => {
    const jsx = extractReturnJsxFromStorySource(`render: () => (
    <Button size={Size.SM}>Small</Button>
  ),`);
    expect(jsx).toContain('<Button');
  });

  it('buildUsageSnippetFromRenderSource извлекает несколько кнопок', () => {
    const source = `render: () => (
      <div style={buttonStoriesStyles.row}>
        <Button size={Size.SM}>Small</Button>
        <Button size={Size.MD}>Medium</Button>
      </div>
    )`;

    const snippet = buildUsageSnippetFromRenderSource(source);
    expect(snippet).toContain('<Button size={Size.SM}>Small</Button>');
    expect(snippet).not.toContain('buttonStoriesStyles');
  });

  it('extractReturnJsxFromStorySource находит return', () => {
    const jsx = extractReturnJsxFromStorySource('render: () => { return (<Input label="A" />); }');
    expect(jsx).toBe('<Input label="A" />');
  });

  it('normalizeStoryUsageJsx убирает style', () => {
    expect(normalizeStoryUsageJsx('<Input label="A" style={inputStoriesStyles.box} />')).toBe(
      '<Input label="A" />',
    );
  });

  it('extractStoryExportBlock вырезает один экспорт', () => {
    const file = `export const A = { args: { x: 1 } };
export const B = { render: () => <Input label="B" /> };`;
    const block = extractStoryExportBlock(file, 'B');
    expect(block).toContain('render');
    expect(block).not.toContain('args: { x: 1 }');
  });

  it('извлекает JSX из тела сторис без ключевого слова render', () => {
    const storyFnSource = `() => (
    <Form formId="helper-text-form">
      <Input
        label="Пароль"
        type="password"
        placeholder="Введите пароль..."
        helperText="Минимум 8 символов"
      />
    </Form>
  )`;

    const snippet = buildUsageSnippetFromRenderSource(storyFnSource, { wrapInForm: true });
    expect(snippet).toContain('helperText="Минимум 8 символов"');
    expect(snippet).toContain('label="Пароль"');
  });

  it('WithHelperText: args-сторис даёт явный сниппет с helperText', () => {
    const result = getStoryDocsSourceCode('export const WithHelperText = { args: {} };', {
      name: 'With Helper Text',
      id: 'ui-kit-inputs-input--with-helper-text',
      component: { displayName: 'Input' },
      args: {
        label: 'Пароль',
        type: 'password',
        placeholder: 'Введите пароль...',
        helperText: 'Минимум 8 символов',
      },
      parameters: {
        docs: {
          source: {
            type: 'code',
            code: `<Input
  label="Пароль"
  type="password"
  placeholder="Введите пароль..."
  helperText="Минимум 8 символов"
/>`,
          },
        },
      },
      title: 'UI Kit/Inputs/Input',
    } as never);

    expect(result).toContain('helperText="Минимум 8 символов"');
    expect(result).toContain('label="Пароль"');
    expect(result).toContain('type="password"');
    expect(result).toContain('<Form formId="example-form">');
  });

  it('WithHelperText: сниппет из render совпадает с полем на канвасе', () => {
    const withHelperTextSource = `export const WithHelperText: Story = {
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
};`;

    const snippet = buildUsageSnippetFromRenderSource(withHelperTextSource, { wrapInForm: true });
    expect(snippet).toContain('label="Пароль"');
    expect(snippet).toContain('helperText="Минимум 8 символов"');
    expect(snippet).toContain('type="password"');
  });

  it('WithSuccess: явный usageCode с useState оборачивается в StoryExample', () => {
    const usageCode = `const [email, setEmail] = React.useState('user@example.com');

<Input
  label="Email"
  placeholder="Введите email..."
  value={email}
  onChange={(event) => setEmail(event.target.value)}
  success
/>`;

    const result = getStoryDocsSourceCode('export const WithSuccess = { render: () => null };', {
      name: 'With Success',
      id: 'ui-kit-inputs-input--with-success',
      component: { displayName: 'Input' },
      args: { clearIconProps: {} },
      parameters: { docs: { source: { type: 'code', code: usageCode } } },
      title: 'UI Kit/Inputs/Input',
    } as never);

    expect(result).toContain('function StoryExample');
    expect(result).toContain('label="Email"');
    expect(result).toContain('placeholder="Введите email..."');
    expect(result).toMatch(/success/);
    expect(result).toContain('<Form formId="example-form">');
  });

  it('WithSuccess: block render с useState и onChange', () => {
    const withSuccessSource = `export const WithSuccess: Story = {
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
};`;

    const snippet = buildUsageSnippetFromRenderSource(withSuccessSource, { wrapInForm: true });
    expect(snippet).toContain('function StoryExample');
    expect(snippet).toContain('useState');
    expect(snippet).toContain('label="Email"');
    expect(snippet).toMatch(/success/);
    expect(snippet).toContain('<Form formId="example-form">');

    const fromDocs = getStoryDocsSourceCode(withSuccessSource, {
      name: 'With Success',
      id: 'ui-kit-inputs-input--with-success',
      component: { displayName: 'Input' },
      args: { clearIconProps: {} },
      parameters: {},
      title: 'UI Kit/Inputs/Input',
    } as never);

    expect(fromDocs).toContain('function StoryExample');
    expect(fromDocs).toContain('label="Email"');
    expect(fromDocs).toContain('placeholder="Введите email..."');
    expect(fromDocs).not.toContain('Пароль');
  });

  it('WithSuccess: тело сторис без render (блочная стрелка)', () => {
    const storyBodyOnly = `export const WithSuccess: Story = {
  render: () => {
  const [email, setEmail] = React.useState('user@example.com');
  return (
    <Input
      label="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      success={true}
    />
  );
  },
};`;

    const result = getStoryDocsSourceCode(storyBodyOnly, {
      name: 'With Success',
      id: 'ui-kit-inputs-input--with-success',
      component: { displayName: 'Input' },
      args: { clearIconProps: {} },
      parameters: {},
      title: 'UI Kit/Inputs/Input',
    } as never);

    expect(result).toContain('function StoryExample');
    expect(result).toContain('Email');
    expect(result).toContain('useState');
  });

  it('getStoryDocsSourceCode не подменяет render-сторис на meta args', () => {
    const storyFnOnly = `export const WithHelperText: Story = {
  render: () => (
    <Form formId="helper-text-form">
      <Input label="Пароль" helperText="Минимум 8 символов" />
    </Form>
  ),
};`;

    const result = getStoryDocsSourceCode(storyFnOnly, {
      name: 'With Helper Text',
      id: 'ui-kit-inputs-input--with-helper-text',
      component: { displayName: 'Input' },
      args: { clearIconProps: {} },
      parameters: {},
      title: 'UI Kit/Inputs/Input',
    } as never);

    expect(result).toContain('Пароль');
    expect(result).toContain('Минимум 8 символов');
    expect(result).not.toMatch(/<Input\s*\/>/);
  });

  it('extractRenderSectionFromExport находит render при spread describeStory', () => {
    const spreadSource = `export const WithHelperText: Story = {
  ...inputRenderStory('Описание'),
  render: () => (
    <Input label="Пароль" helperText="Минимум 8 символов" />
  ),
};
export const Next = { args: {} };`;

    const section = extractRenderSectionFromExport(spreadSource, 'WithHelperText');
    expect(section).toContain('render:');
    expect(section).toContain('helperText="Минимум 8 символов"');
    expect(section).not.toContain('export const Next');
  });

  it('getStoryDocsSourceCode использует блок текущего экспорта, а не соседней сторис', () => {
    const file = `export const ArgsOnly = { args: { label: "A" } };
export const WithRender = {
  render: () => <Button size={Size.SM}>Small</Button>,
};`;

    const result = getStoryDocsSourceCode(file, {
      name: 'ArgsOnly',
      id: 'ui-kit-inputs-input--args-only',
      component: { displayName: 'Input' },
      args: { label: 'Только args' },
      parameters: {},
      title: 'UI Kit/Inputs/Input',
    } as never);

    expect(result).toContain('label="Только args"');
    expect(result).not.toContain('Button');
  });
});
