import type { Meta, StoryObj } from '@storybook/react';
import { DateInput } from './DateInput';
import docs from './DateInput.docs';

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

const meta: Meta<typeof DateInput> = {
  title: "UI Kit (DSL)/Inputs/DateInput",
  component: DateInput,
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

export const SingleDate: Story = {
  name: "Одиночная дата",
  render: docs.examples[0].render,
  parameters: {
    layout: "padded",
    /** Способ подачи примера и оси темы, объявленные в DSL */
    dsl: {
      layout: "block",
      themes: ["theme","colorMode"],
      showCode: true,
    },
    docs: {
      description: { story: "Базовый сценарий выбора одной даты." },
      source: {
        type: 'code',
        code: "<DateInput label=\"Дата\" value=\"2026-08-15\" onChange={() => undefined} />",
        language: 'tsx',
      },
    },
  },
};

export const DateRange: Story = {
  name: "Диапазон дат",
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
      description: { story: "Range-режим с объектом start/end." },
      source: {
        type: 'code',
        code: "<DateInput range value={{ start: \"2026-08-10\", end: \"2026-08-15\" }} onChange={() => undefined} />",
        language: 'tsx',
      },
    },
  },
};

export const MonthPrecision: Story = {
  name: "Точность month",
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
      description: { story: "Режим выбора месяца с форматом YYYY-MM." },
      source: {
        type: 'code',
        code: "<DateInput precision=\"month\" value=\"2026-08\" onChange={() => undefined} size={Size.MD} />",
        language: 'tsx',
      },
    },
  },
};

