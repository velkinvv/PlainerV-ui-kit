export type DocsPlatform = 'web' | 'mobile';

export type DocsStatus = 'stable' | 'beta' | 'deprecated';

export type ExampleThemeAxis =
  | 'theme'
  | 'colorMode'
  | 'contrast'
  | 'density'
  | 'motion'
  | 'locale'
  | 'rtl';

export type ExampleLayout = 'inline' | 'block' | 'grid';

export interface ComponentDocsMeta {
  name: string;
  group: string;
  platform: DocsPlatform;
  since: string;
  status: DocsStatus;
  description: string;
  deprecated?: {
    since: string;
    reason?: string;
    replacement?: string;
  };
}

export interface ComponentDocsExample {
  id: string;
  title: string;
  description?: string;
  code: string;
  render: () => JSX.Element;
  showCode?: boolean;
  themes?: ExampleThemeAxis[];
  layout?: ExampleLayout;
}

export interface ComponentDocsVariantCase {
  id: string;
  title: string;
  description?: string;
  code?: string;
  render: () => JSX.Element;
}

export interface ComponentDocsVariantGroup {
  id: string;
  title: string;
  columns?: number;
  items: ComponentDocsVariantCase[];
}

export interface ComponentDocsPropItem {
  name: string;
  type: string;
  required?: boolean;
  defaultValue?: string;
  description?: string;
  deprecated?: boolean;
}

export interface ComponentDocsPropsSource {
  mode: 'autogen' | 'manual' | 'merge';
  include?: string[];
  exclude?: string[];
  manual?: ComponentDocsPropItem[];
}

export interface ComponentDocsA11y {
  roles?: string[];
  requiredAttributes?: string[];
  keyboard?: string[];
  notes?: string[];
}

export interface ComponentDocsRelated {
  name: string;
  href: string;
  reason?: string;
}

export interface ComponentDocsDefinition {
  meta: ComponentDocsMeta;
  examples: ComponentDocsExample[];
  variants?: ComponentDocsVariantGroup[];
  props?: ComponentDocsPropsSource;
  a11y?: ComponentDocsA11y;
  related?: ComponentDocsRelated[];
}
