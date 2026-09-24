import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';
import docs from './Alert.docs';

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

const meta: Meta<typeof Alert> = {
  title: "UI Kit (DSL)/Feedback/Alert",
  component: Alert,
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

export const BasicSuccess: Story = {
  name: "Базовый success",
  render: docs.examples[0].render,
  parameters: {
    layout: "padded",
    /** Способ подачи примера и оси темы, объявленные в DSL */
    dsl: {
      layout: "block",
      themes: ["theme","colorMode","contrast"],
      showCode: true,
    },
    docs: {
      description: { story: "Минимальная конфигурация уведомления." },
      source: {
        type: 'code',
        code: "<Alert severity=\"success\" title=\"Успешно\">Операция выполнена.</Alert>",
        language: 'tsx',
      },
    },
  },
};

export const FilledErrorClose: Story = {
  name: "Filled + close",
  render: docs.examples[1].render,
  parameters: {
    layout: "padded",
    /** Способ подачи примера и оси темы, объявленные в DSL */
    dsl: {
      layout: "block",
      themes: ["theme","colorMode"],
      showCode: true,
    },
    docs: {
      description: { story: "Вариант filled с кнопкой закрытия." },
      source: {
        type: 'code',
        code: "<Alert severity=\"error\" variant=\"filled\" onClose={() => undefined}>Ошибка сохранения.</Alert>",
        language: 'tsx',
      },
    },
  },
};

export const WithAction: Story = {
  name: "Со slot action",
  render: docs.examples[2].render,
  parameters: {
    layout: "padded",
    /** Способ подачи примера и оси темы, объявленные в DSL */
    dsl: {
      layout: "block",
      themes: ["theme","colorMode"],
      showCode: true,
    },
    docs: {
      description: { story: "Кнопка действия в Alert для быстрых сценариев undo/retry." },
      source: {
        type: 'code',
        code: "<Alert severity=\"info\" action={<Button variant={ButtonVariant.GHOST} size={Size.SM}>Подробнее</Button>}>Найдено обновление.</Alert>",
        language: 'tsx',
      },
    },
  },
};

export const SeverityMatrixSuccess: Story = {
  name: "Severity: Success",
  render: docs.variants?.[0]?.items?.[0]?.render ?? (() => null),
  parameters: {
    docs: {
      description: { story: "" },
      source: {
        type: 'code',
        code: "<Alert severity=\"success\">Success</Alert>",
        language: 'tsx',
      },
    },
  },
};

export const SeverityMatrixInfo: Story = {
  name: "Severity: Info",
  render: docs.variants?.[0]?.items?.[1]?.render ?? (() => null),
  parameters: {
    docs: {
      description: { story: "" },
      source: {
        type: 'code',
        code: "<Alert severity=\"info\">Info</Alert>",
        language: 'tsx',
      },
    },
  },
};

export const SeverityMatrixWarning: Story = {
  name: "Severity: Warning",
  render: docs.variants?.[0]?.items?.[2]?.render ?? (() => null),
  parameters: {
    docs: {
      description: { story: "" },
      source: {
        type: 'code',
        code: "<Alert severity=\"warning\">Warning</Alert>",
        language: 'tsx',
      },
    },
  },
};

export const SeverityMatrixError: Story = {
  name: "Severity: Error",
  render: docs.variants?.[0]?.items?.[3]?.render ?? (() => null),
  parameters: {
    docs: {
      description: { story: "" },
      source: {
        type: 'code',
        code: "<Alert severity=\"error\">Error</Alert>",
        language: 'tsx',
      },
    },
  },
};

