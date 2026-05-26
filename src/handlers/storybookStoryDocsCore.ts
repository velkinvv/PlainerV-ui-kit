/** Пропсы, не попадающие в сниппет использования компонента. */
const SKIPPED_USAGE_PROP_KEYS = new Set([
  'key',
  'ref',
  'as',
  'forwardedRef',
  'clearIconProps',
  'openMenuIconProps',
  'iconStart',
  'iconEnd',
  'leftIcon',
  'rightIcon',
  'prefix',
  'suffix',
  'onChange',
  'onValuesChange',
  'onValueChange',
  'onClearIconClick',
  'validateToken',
  'formatValue',
  'formatMinLabel',
  'formatMaxLabel',
]);

/** Пропсы, которые задаются как дочерний текст, а не атрибут. */
const CHILD_CONTENT_PROP_KEYS = new Set(['children']);

/** Пропсы с React-элементом `Icon` — сериализуем в JSX для Docs. */
const ICON_ELEMENT_PROP_KEYS = new Set(['leftIcon', 'rightIcon']);

const ICON_SIZE_TOKENS = new Set(['XS', 'SM', 'MD', 'LG', 'XL']);

/**
 * Проверяет, что значение похоже на React-элемент.
 * @param value - Значение пропса из args сторис.
 */
const isReactElement = (value: unknown): value is { type: unknown; props: Record<string, unknown> } =>
  typeof value === 'object' &&
  value !== null &&
  'type' in value &&
  'props' in value &&
  typeof (value as { props?: unknown }).props === 'object' &&
  (value as { props?: unknown }).props !== null;

/**
 * Имя компонента из `type` (в т.ч. React.memo).
 * @param type - `element.type` из React-элемента.
 */
const resolveElementTypeName = (type: unknown): string | undefined => {
  if (typeof type === 'string') {
    return type;
  }

  if (typeof type === 'function') {
    const fnType = type as { displayName?: string; name?: string };
    return fnType.displayName || fnType.name;
  }

  if (typeof type === 'object' && type !== null) {
    const objectType = type as {
      displayName?: string;
      name?: string;
      type?: unknown;
      render?: { displayName?: string; name?: string };
    };

    if (objectType.type) {
      return resolveElementTypeName(objectType.type);
    }

    if (objectType.render) {
      return objectType.render.displayName || objectType.render.name;
    }

    return objectType.displayName || objectType.name;
  }

  return undefined;
};

/**
 * Форматирует `size` иконки для сниппета (`IconSize.MD` или строка).
 * @param size - Значение `size` из props `Icon`.
 */
const formatIconSizeForUsage = (size: unknown): string => {
  if (typeof size === 'string' && ICON_SIZE_TOKENS.has(size)) {
    return `{IconSize.${size}}`;
  }

  if (typeof size === 'number') {
    return `{${size}}`;
  }

  return '{IconSize.MD}';
};

/**
 * Собирает JSX `<Icon />` из React-элемента в args (как в Input.stories).
 * @param element - React-элемент из `leftIcon` / `rightIcon`.
 */
export const formatIconElementForUsage = (
  element: { type: unknown; props: Record<string, unknown> },
): string | null => {
  if (resolveElementTypeName(element.type) !== 'Icon') {
    return null;
  }

  const iconName = element.props.name;
  if (typeof iconName !== 'string' || iconName.length === 0) {
    return null;
  }

  const attributes = [`name="${iconName}"`];

  if (element.props.size !== undefined) {
    attributes.push(`size=${formatIconSizeForUsage(element.props.size)}`);
  }

  return `<Icon ${attributes.join(' ')} />`;
};

/**
 * Форматирует значение пропса для JSX-сниппета.
 * @param value - Значение из `args` сторис.
 */
const formatUsagePropValue = (value: unknown): string | null => {
  if (value === undefined || value === null) {
    return null;
  }

  if (typeof value === 'function') {
    return null;
  }

  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }

  if (typeof value === 'number') {
    return String(value);
  }

  if (typeof value === 'string') {
    return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
  }

  if (Array.isArray(value)) {
    const items = value
      .map((item) => formatUsagePropValue(item))
      .filter((item): item is string => item !== null);
    if (items.length === 0) {
      return null;
    }
    return `[${items.join(', ')}]`;
  }

  return null;
};

/**
 * Собирает строку JSX-атрибутов из `args` сторис.
 * @param args - Аргументы сторис Storybook.
 */
export const formatUsagePropsFromArgs = (args: Record<string, unknown>): string => {
  const attributeParts: string[] = [];

  for (const [propKey, propValue] of Object.entries(args)) {
    if (CHILD_CONTENT_PROP_KEYS.has(propKey)) {
      continue;
    }

    if (ICON_ELEMENT_PROP_KEYS.has(propKey) && isReactElement(propValue)) {
      const iconJsx = formatIconElementForUsage(propValue);
      if (iconJsx) {
        attributeParts.push(`${propKey}={${iconJsx}}`);
        continue;
      }
    }

    if (SKIPPED_USAGE_PROP_KEYS.has(propKey)) {
      continue;
    }

    const formattedValue = formatUsagePropValue(propValue);
    if (formattedValue === null) {
      continue;
    }

    if (typeof propValue === 'boolean') {
      if (propValue) {
        attributeParts.push(propKey);
      }
      continue;
    }

    if (typeof propValue === 'string') {
      const escaped = propValue.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      attributeParts.push(`${propKey}="${escaped}"`);
      continue;
    }

    attributeParts.push(`${propKey}={${formattedValue}}`);
  }

  return attributeParts.length > 0 ? ` ${attributeParts.join(' ')}` : '';
};

/**
 * Имя компонента для сниппета из контекста сторис.
 * @param context - Контекст Storybook.
 */
export const resolveStoryComponentName = (context: {
  component?: { displayName?: string; name?: string };
}): string | undefined => {
  const component = context.component;
  return component?.displayName || component?.name || undefined;
};

/**
 * Собирает пример использования компонента из `args` (без кода render-функции сторис).
 * @param componentName - Имя React-компонента.
 * @param args - Пропсы сторис.
 * @param options.wrapInForm - Обернуть в `<Form>` (как в декораторе полей ввода).
 */
/**
 * Комментарии для пропсов, не попавших в JSX-атрибуты (функции, React-элементы, options и т.д.).
 * @param args - Исходные args сторис.
 */
const buildOmittedUsagePropComments = (args: Record<string, unknown>): string[] => {
  const comments: string[] = [];

  for (const [propKey, propValue] of Object.entries(args)) {
    if (CHILD_CONTENT_PROP_KEYS.has(propKey)) {
      continue;
    }

    if (ICON_ELEMENT_PROP_KEYS.has(propKey) && isReactElement(propValue) && formatIconElementForUsage(propValue)) {
      continue;
    }

    const isExplicitlySkipped = SKIPPED_USAGE_PROP_KEYS.has(propKey);
    const formatted = formatUsagePropValue(propValue);

    if (!isExplicitlySkipped && formatted !== null) {
      continue;
    }

    if (propValue === undefined || propValue === null) {
      continue;
    }

    if (typeof propValue === 'function') {
      comments.push(`// ${propKey}: функция или колбэк — см. сторис`);
      continue;
    }

    if (Array.isArray(propValue)) {
      comments.push(`// ${propKey}: массив (например options) — см. константу в файле сторис`);
      continue;
    }

    if (typeof propValue === 'object') {
      comments.push(`// ${propKey}: React-элемент — см. сторис`);
    }
  }

  return comments;
};

export const buildComponentUsageSnippetFromArgs = (
  componentName: string,
  args: Record<string, unknown>,
  options?: { wrapInForm?: boolean },
): string => {
  const argsForAttributes = { ...args };
  const childContent = argsForAttributes.children;
  delete argsForAttributes.children;

  const propsFragment = formatUsagePropsFromArgs(argsForAttributes);
  const skippedComments = buildOmittedUsagePropComments(args);

  const hasChildText =
    typeof childContent === 'string' || typeof childContent === 'number';

  const elementLine = hasChildText
    ? `<${componentName}${propsFragment}>${String(childContent)}</${componentName}>`
    : `<${componentName}${propsFragment} />`;

  const body =
    skippedComments.length > 0
      ? `${skippedComments.join('\n')}\n${elementLine}`
      : elementLine;

  if (options?.wrapInForm) {
    return `<Form formId="example-form">\n  ${body.split('\n').join('\n  ')}\n</Form>`;
  }

  return body;
};
