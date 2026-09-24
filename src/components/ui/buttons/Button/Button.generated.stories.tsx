import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import docs from './Button.docs';

const buildDslDocsDescription = () => {
  const sections: string[] = [];

  if (docs.meta.description?.trim()) {
    sections.push(docs.meta.description.trim());
  }

  if (docs.meta.deprecated?.since) {
    const replacement = docs.meta.deprecated.replacement ? ` Замена: ${docs.meta.deprecated.replacement}.` : "";
    const reason = docs.meta.deprecated.reason ? ` Причина: ${docs.meta.deprecated.reason}.` : "";
    sections.push(`**Deprecated since ${docs.meta.deprecated.since}.**${reason}${replacement}`);
  }

  if (docs.a11y) {
    const a11yLines: string[] = [];
    if (docs.a11y.roles?.length) a11yLines.push(`- Roles: ${docs.a11y.roles.join(", ")}`);
    if (docs.a11y.requiredAttributes?.length) {
      a11yLines.push(`- Required attributes: ${docs.a11y.requiredAttributes.join(", ")}`);
    }
    if (docs.a11y.keyboard?.length) a11yLines.push(`- Keyboard: ${docs.a11y.keyboard.join("; ")}`);
    if (docs.a11y.notes?.length) a11yLines.push(`- Notes: ${docs.a11y.notes.join("; ")}`);
    if (a11yLines.length > 0) {
      sections.push(`### Accessibility\n${a11yLines.join("\n")}`);
    }
  }

  if (docs.related?.length) {
    const relatedLines = docs.related.map((item) => `- [${item.name}](${item.href})${item.reason ? ` — ${item.reason}` : ""}`);
    sections.push(`### Related\n${relatedLines.join("\n")}`);
  }

  if (docs.props) {
    const modeLine = `Mode: ${docs.props.mode}`;
    const includeLine = docs.props.include?.length ? `Included: ${docs.props.include.join(", ")}` : null;
    const excludeLine = docs.props.exclude?.length ? `Excluded: ${docs.props.exclude.join(", ")}` : null;
    const manualLine = docs.props.manual?.length ? `Manual props: ${docs.props.manual.length}` : null;
    const manualItems = docs.props.manual?.length
      ? docs.props.manual.map((prop) => {
          const required = prop.required ? " required" : "";
          const deprecated = prop.deprecated ? " deprecated" : "";
          const defaultValue = prop.defaultValue ? ` (default: ${prop.defaultValue})` : "";
          const description = prop.description ? ` — ${prop.description}` : "";
          return `- \`${prop.name}\` (${prop.type})${required}${deprecated}${defaultValue}${description}`;
        })
      : [];
    const propsLines = [modeLine, includeLine, excludeLine, manualLine, ...manualItems].filter(Boolean);
    sections.push(`### Props source\n${propsLines.join("\n")}`);
  }

  return sections.join("\n\n");
};

const meta: Meta<typeof Button> = {
  title: "UI Kit (DSL)/Buttons/Button",
  component: Button,
  tags: ["autodocs","dsl-generated"],
  parameters: {
    docs: { description: { component: buildDslDocsDescription() } },
    dsl: {
      platform: docs.meta.platform,
      since: docs.meta.since,
      status: docs.meta.status,
      deprecated: docs.meta.deprecated ?? null,
      props: docs.props ?? null,
      a11y: docs.a11y ?? null,
      related: docs.related ?? null,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Primary",
  render: docs.examples[0].render,
  parameters: {
    layout: "centered",
    /** Способ подачи примера и оси темы, объявленные в DSL */
    dsl: {
      layout: "inline",
      themes: ["theme","colorMode","motion"],
      showCode: true,
    },
    docs: {
      description: { story: "Базовый сценарий подтверждающего действия." },
      source: {
        type: 'code',
        code: "<Button variant={ButtonVariant.PRIMARY}>Сохранить</Button>",
        language: 'tsx',
      },
    },
  },
};

export const WithIcons: Story = {
  name: "С иконками",
  render: docs.examples[1].render,
  parameters: {
    layout: "centered",
    /** Способ подачи примера и оси темы, объявленные в DSL */
    dsl: {
      layout: "inline",
      themes: ["theme","colorMode"],
      showCode: true,
    },
    docs: {
      description: { story: "Кнопка с иконкой в начале и конце текста." },
      source: {
        type: 'code',
        code: "<Button iconStart={<Icon name=\"IconExHome\" size={IconSize.MD} />} iconEnd={<Icon name=\"IconPlainerArrowRight\" size={IconSize.MD} />}>Открыть</Button>",
        language: 'tsx',
      },
    },
  },
};

export const Loading: Story = {
  name: "Состояние загрузки",
  render: docs.examples[2].render,
  parameters: {
    layout: "centered",
    /** Способ подачи примера и оси темы, объявленные в DSL */
    dsl: {
      layout: "inline",
      themes: ["theme","motion"],
      showCode: true,
    },
    docs: {
      description: { story: "Кнопка в loading-состоянии блокирует повторный клик." },
      source: {
        type: 'code',
        code: "<Button loading size={Size.MD}>Сохранить</Button>",
        language: 'tsx',
      },
    },
  },
};

export const VariantMatrixPrimary: Story = {
  name: "Варианты кнопки: Primary",
  render: docs.variants?.[0]?.items?.[0]?.render ?? (() => null),
  parameters: {
    docs: {
      description: { story: "" },
      source: {
        type: 'code',
        code: "<Button variant={ButtonVariant.PRIMARY}>Primary</Button>",
        language: 'tsx',
      },
    },
  },
};

export const VariantMatrixSecondary: Story = {
  name: "Варианты кнопки: Secondary",
  render: docs.variants?.[0]?.items?.[1]?.render ?? (() => null),
  parameters: {
    docs: {
      description: { story: "" },
      source: {
        type: 'code',
        code: "<Button variant={ButtonVariant.SECONDARY}>Secondary</Button>",
        language: 'tsx',
      },
    },
  },
};

export const VariantMatrixOutline: Story = {
  name: "Варианты кнопки: Outline",
  render: docs.variants?.[0]?.items?.[2]?.render ?? (() => null),
  parameters: {
    docs: {
      description: { story: "" },
      source: {
        type: 'code',
        code: "<Button variant={ButtonVariant.OUTLINE}>Outline</Button>",
        language: 'tsx',
      },
    },
  },
};

