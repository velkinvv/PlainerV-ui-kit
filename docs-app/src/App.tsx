import {
  lazy,
  Suspense,
  type ComponentType,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Alert,
  Button,
  Card,
  List,
  Link as KitLink,
  NavigationMenu,
  NavigationMenuActiveAppearance,
  NavigationMenuItem,
  SegmentedControl,
  Size,
  ThemeMode,
  ThemeProvider,
  builtinThemeCatalog,
} from '@velkinvv/plainerv';
import styled from 'styled-components';
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom';
import docsVersioning from '../docs-versioning.config.json';
import { ClientOnly } from './components/ClientOnly';
import { DocsSearch } from './components/DocsSearch';
import { VersionSwitcher } from './components/VersionSwitcher';
import { ArchivedPreview } from './components/ArchivedPreview';
import { ComponentPreview } from './components/ComponentPreview';
import { MdxProviders } from './components/MdxComponents';
import { ComponentStatusBadge } from './components/ComponentStatusBadge';
import { VariantGrid } from './components/VariantGrid';
import { PropsTable } from './components/PropsTable';
import { VersionPropsTable } from './components/VersionPropsTable';
import { ThemeAxisSwitcher } from './components/ThemeAxisSwitcher';
import { isLiveVersion } from './versioning';
import { contentManifest } from './generated/content-manifest';
import { docsManifest } from './generated/docs-manifest';

const Playground = lazy(() =>
  import('./components/Playground').then(({ Playground: PlaygroundComponent }) => ({
    default: PlaygroundComponent,
  })),
);

type DocsRouteParams = {
  locale?: string;
  platform?: string;
  version?: string;
  slug?: string;
};

export type ThemeAxisState = {
  colorMode: 'light' | 'dark';
  density: 'comfortable' | 'compact';
  radius: 'md' | 'lg';
  palette: 'brand' | 'neutral';
};

const DocsShell = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 24px;
`;

const DocsToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;

  @media (max-width: 640px) {
    flex-wrap: wrap;
  }
`;

const DocsLayout = styled.div`
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 20px;
  align-items: start;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const SidebarRoot = styled.aside`
  position: sticky;
  top: 16px;
  display: grid;
  gap: 14px;
  max-height: calc(100vh - 40px);
  overflow: auto;
  padding-right: 6px;

  @media (max-width: 980px) {
    position: static;
    max-height: none;
    border: 1px solid rgba(127, 127, 127, 0.25);
    border-radius: 12px;
    padding: 12px;
  }
`;

const DocsMainStyled = styled.main`
  display: grid;
  gap: 16px;
`;

/**
 * `pagefind.yml` индексирует только `root_selector: main`, поэтому фильтр локали
 * и исключение архивных версий обязаны стоять на самом `<main>`: атрибуты выше
 * (например, на `#root`) индексатор не видит.
 */
const DocsMain = ({ children, className }: { children: ReactNode; className?: string }) => {
  const params = useParams<DocsRouteParams>();
  const routeState = resolveRouteState(params);

  if (!isLiveVersion(routeState.platform, routeState.version)) {
    return (
      <DocsMainStyled className={className} data-pagefind-ignore="all">
        {children}
      </DocsMainStyled>
    );
  }

  return (
    <DocsMainStyled className={className} data-pagefind-filter={`locale:${routeState.locale}`}>
      {children}
    </DocsMainStyled>
  );
};

const defaultLocale =
  docsVersioning.locales.find((locale) => locale.default)?.id ?? docsVersioning.locales[0]?.id ?? 'ru';
const defaultPlatform = docsVersioning.platforms[0]?.id ?? 'web';
const defaultVersion = docsVersioning.platforms[0]?.defaultVersionId ?? 'latest';
const supportedLocales = new Set(docsVersioning.locales.map((locale) => locale.id));
const supportedPlatforms = new Set(docsVersioning.platforms.map((platform) => platform.id));

const mdxModules = import.meta.glob('../content/docs/*/web/*/*.mdx') as Record<
  string,
  () => Promise<{ default: ComponentType }>
>;

const resolveMdxModuleLoader = (locale: string, version: string, slug: string) => {
  const modulePath = `../content/docs/${locale}/web/${version}/${slug}.mdx`;
  return mdxModules[modulePath] ?? null;
};

const resolveVersionIds = (platformId: string): string[] => {
  const platform = docsVersioning.platforms.find((item) => item.id === platformId);
  return platform ? platform.versions.map((version) => version.id) : [];
};

const resolveRouteState = (params: DocsRouteParams) => {
  const locale = params.locale ?? defaultLocale;
  const platform = params.platform ?? defaultPlatform;
  const version = params.version ?? defaultVersion;

  const versions = resolveVersionIds(platform);
  const isValid =
    supportedLocales.has(locale) &&
    supportedPlatforms.has(platform) &&
    versions.includes(version);

  return {
    locale,
    platform,
    version,
    versions,
    isValid,
  };
};

const selectGuides = (locale: string, platform: string, version: string) =>
  contentManifest.guides.filter(
    (guide) => guide.locale === locale && guide.platform === platform && guide.version === version,
  );

const RouteSwitchers = ({
  locale,
  platform,
  version,
  routeSuffix = '',
}: {
  locale: string;
  platform: string;
  version: string;
  routeSuffix?: string;
}) => {
  const navigate = useNavigate();

  return (
    <div className="docs-switchers">
      <div className="docs-switcher-group">
        <span className="docs-switcher-title">Язык:</span>
        <SegmentedControl
          size={Size.SM}
          ariaLabel="Язык документации"
          value={locale}
          options={docsVersioning.locales.map((item) => ({
            value: item.id,
            label: item.label,
          }))}
          onChange={(nextValue) =>
            navigate(`/${nextValue}/${platform}/${version}${routeSuffix}`)
          }
        />
      </div>

      <VersionSwitcher locale={locale} platform={platform} version={version} routeSuffix={routeSuffix} />
    </div>
  );
};

const DocsSidebar = ({
  locale,
  platform,
  version,
  activeSlug,
  activeGuideSlug,
}: {
  locale: string;
  platform: string;
  version: string;
  activeSlug?: string;
  activeGuideSlug?: string;
}) => {
  const navigate = useNavigate();
  const guides = selectGuides(locale, platform, version);
  const baseUrl = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const basePath = `${baseUrl}/${locale}/${platform}/${version}`;
  const activeId = activeGuideSlug ? `guide:${activeGuideSlug}` : (activeSlug ?? null);

  // Клик по любой ссылке меню (на любом уровне вложенности) ведём роутером:
  // href остаётся в разметке для краулеров и «открыть в новой вкладке».
  const handleSidebarClick = (event: ReactMouseEvent<HTMLElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    const anchor = (event.target as HTMLElement).closest('a');

    if (!(anchor instanceof HTMLAnchorElement)) {
      return;
    }

    const href = anchor.getAttribute('href');

    if (!href?.startsWith('/')) {
      return;
    }

    event.preventDefault();
    navigate(href.startsWith(baseUrl) ? href.slice(baseUrl.length) || '/' : href);
  };

  return (
    <SidebarRoot onClick={handleSidebarClick}>
      <NavigationMenu
        activeId={activeId}
        aria-label="Навигация по документации"
        activeAppearance={NavigationMenuActiveAppearance.HIGHLIGHTED}
      >
        {guides.length > 0 ? (
          <NavigationMenuItem
            id="docs-guides"
            label="Руководства"
            badge={guides.length}
            items={guides.map((guide) => ({
              id: `guide:${guide.slug}`,
              label: guide.title,
              href: `${basePath}/guides/${guide.slug}`,
            }))}
          />
        ) : null}

        {docsManifest.groups.map((group) => {
          const items = group.items
            .map((slug) => docsManifest.components.find((component) => component.slug === slug))
            .filter(
              (component): component is (typeof docsManifest.components)[number] =>
                Boolean(component),
            )
            .map((component) => ({
              id: component.slug,
              label: component.name,
              href: `${basePath}/components/${component.slug}`,
            }));

          if (items.length === 0) {
            return null;
          }

          return (
            <NavigationMenuItem
              key={group.id}
              id={group.id}
              label={group.title}
              badge={items.length}
              items={items}
            />
          );
        })}
      </NavigationMenu>
    </SidebarRoot>
  );
};

const ComponentListPage = () => {
  const params = useParams<DocsRouteParams>();
  const routeState = resolveRouteState(params);

  if (!routeState.isValid) {
    return <Navigate to={`/${defaultLocale}/${defaultPlatform}/${defaultVersion}`} replace />;
  }

  const guides = selectGuides(routeState.locale, routeState.platform, routeState.version);
  const components = docsManifest.components;

  return (
    <DocsLayout>
      <DocsSidebar
        locale={routeState.locale}
        platform={routeState.platform}
        version={routeState.version}
      />

      <DocsMain>
        <section className="docs-hero">
          <span className="docs-hero-glow" aria-hidden="true" />

          <span className="docs-hero-eyebrow">UI Kit · Documentation</span>
          <h1 className="docs-hero-title">PlainerV Docs</h1>
          <p className="docs-hero-lead">
            Компоненты, живые примеры и токены темы. Открытая версия{' '}
            <strong>{routeState.version}</strong> · {routeState.locale.toUpperCase()}
          </p>

          <dl className="docs-hero-stats">
            <div className="docs-hero-stat">
              <dt>Компоненты</dt>
              <dd>{components.length}</dd>
            </div>
            <div className="docs-hero-stat">
              <dt>Группы</dt>
              <dd>{docsManifest.groups.length}</dd>
            </div>
            <div className="docs-hero-stat">
              <dt>Руководства</dt>
              <dd>{guides.length}</dd>
            </div>
          </dl>

          <RouteSwitchers
            locale={routeState.locale}
            platform={routeState.platform}
            version={routeState.version}
          />
        </section>

        {guides.length > 0 ? (
          <section className="docs-section">
            <div className="docs-section-head">
              <h2>Руководства</h2>
              <span className="docs-section-count">{guides.length}</span>
            </div>

            <div className="docs-card-grid">
              {guides.map((guide, index) => (
                <Link
                  key={`guide-${guide.slug}`}
                  to={`/${routeState.locale}/${routeState.platform}/${routeState.version}/guides/${guide.slug}`}
                  className="docs-tile docs-tile--guide"
                  style={{ '--tile-index': index } as unknown as CSSProperties}
                >
                  <Card className="docs-tile-card" fullWidth hoverable clickable>
                    <span className="docs-tile-icon" aria-hidden="true">
                      §
                    </span>
                    <span className="docs-tile-body">
                      <span className="docs-tile-title">{guide.title}</span>
                      <span className="docs-tile-text">{guide.description || guide.slug}</span>
                    </span>
                    <span className="docs-tile-arrow" aria-hidden="true">
                      →
                    </span>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section className="docs-section">
          <div className="docs-section-head">
            <h2>Компоненты</h2>
            <span className="docs-section-count">{components.length}</span>
          </div>

          <div className="docs-groups">
            {docsManifest.groups.map((group) => {
              const groupComponents = group.items
                .map((slug) => components.find((component) => component.slug === slug))
                .filter((component): component is (typeof components)[number] => Boolean(component));

              if (groupComponents.length === 0) {
                return null;
              }

              return (
                <section key={group.id} className="docs-group-block">
                  <h3 className="docs-group-title">{group.title}</h3>

                  <div className="docs-card-grid">
                    {groupComponents.map((component, index) => (
                      <Link
                        key={component.slug}
                        to={`/${routeState.locale}/${routeState.platform}/${routeState.version}/components/${component.slug}`}
                        className="docs-tile"
                        style={{ '--tile-index': index } as unknown as CSSProperties}
                      >
                        <Card className="docs-tile-card" fullWidth hoverable clickable>
                          <span className="docs-tile-body">
                            <span className="docs-tile-title">
                              {component.name}
                              <ComponentStatusBadge
                                status={component.status}
                                since={component.since}
                              />
                            </span>
                            <span className="docs-tile-text">{component.description}</span>
                            <span className="docs-tile-meta">
                              {component.examples.length} примера · {component.props.items.length} пропсов
                            </span>
                          </span>
                          <span className="docs-tile-arrow" aria-hidden="true">
                            →
                          </span>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </section>
      </DocsMain>
    </DocsLayout>
  );
};

const ComponentPage = ({
  themeAxes,
  onThemeAxesChange,
}: {
  themeAxes: ThemeAxisState;
  onThemeAxesChange: (next: ThemeAxisState) => void;
}) => {
  const params = useParams<DocsRouteParams>();
  const routeState = resolveRouteState(params);

  if (!routeState.isValid) {
    return <Navigate to={`/${defaultLocale}/${defaultPlatform}/${defaultVersion}`} replace />;
  }

  const component = docsManifest.components.find((item) => item.slug === params.slug);
  if (!component) {
    return (
      <Navigate
        to={`/${routeState.locale}/${routeState.platform}/${routeState.version}`}
        replace
      />
    );
  }

  const isArchived = !isLiveVersion(routeState.platform, routeState.version);

  return (
    <DocsLayout>
      <DocsSidebar
        locale={routeState.locale}
        platform={routeState.platform}
        version={routeState.version}
        activeSlug={component.slug}
      />

      <DocsMain>
        <Link
          className="docs-back"
          to={`/${routeState.locale}/${routeState.platform}/${routeState.version}`}
        >
          ← Все компоненты
        </Link>

        <RouteSwitchers
          locale={routeState.locale}
          platform={routeState.platform}
          version={routeState.version}
          routeSuffix={`/components/${component.slug}`}
        />

        <header className="docs-header">
          <h1>{component.name}</h1>
          <ComponentStatusBadge status={component.status} since={component.since} />
        </header>
        <p>{component.description}</p>

        {isArchived ? (
          <Alert
            severity="warning"
            variant="outlined"
            title={`Архивная версия ${routeState.version}`}
          >
            Примеры показаны статичными превью и кодом, Playground и переключатель тем доступны
            только в актуальной версии.
          </Alert>
        ) : (
          <ThemeAxisSwitcher
            state={themeAxes}
            onChange={onThemeAxesChange}
            themes={Array.from(
              new Set(component.examples.flatMap((example) => example.themes ?? [])),
            )}
          />
        )}

        <section className="docs-section">
          <h2>Примеры</h2>
          {component.examples.map((example) =>
            isArchived ? (
              <ArchivedPreview
                key={example.id}
                version={routeState.version}
                componentSlug={component.slug}
                exampleId={example.id}
                title={example.title}
                description={example.description}
                code={example.code}
                showCode={example.showCode}
              />
            ) : (
              <ComponentPreview
                key={example.id}
                exampleId={example.id}
                title={example.title}
                description={example.description}
                code={example.code}
                showCode={example.showCode}
                deferredHeight={
                  component.slug === 'datagrid'
                    ? 420
                    : component.slug === 'dateinput'
                    ? 240
                    : undefined
                }
              />
            ),
          )}
        </section>

        {component.props ? (
          <section className="docs-section">
            <h2>Пропсы</h2>
            {isArchived ? (
              <VersionPropsTable
                version={routeState.version}
                componentSlug={component.slug}
                fallbackItems={component.props.items ?? []}
              />
            ) : (
              <PropsTable items={component.props.items ?? []} />
            )}
          </section>
        ) : null}

        {isArchived ? null : (
          <section className="docs-section">
            <h2>Playground</h2>
            <ClientOnly
              fallback={
                <div className="docs-playground docs-playground-placeholder">
                  Интерактивный Playground загружается на клиенте.
                </div>
              }
            >
              <Suspense
                fallback={
                  <div className="docs-playground docs-playground-placeholder">
                    Загрузка интерактивного Playground.
                  </div>
                }
              >
                <Playground code={component.examples[0]?.code ?? ''} />
              </Suspense>
            </ClientOnly>
          </section>
        )}

        {isArchived
          ? null
          : component.variants?.map((variantGroup) => (
              <VariantGrid key={variantGroup.id} group={variantGroup} />
            ))}
      </DocsMain>
    </DocsLayout>
  );
};

const GuidePage = () => {
  const params = useParams<DocsRouteParams>();
  const routeState = resolveRouteState(params);
  const [toc, setToc] = useState<Array<{ id: string; text: string; level: number }>>([]);
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');

  const guides = selectGuides(routeState.locale, routeState.platform, routeState.version);
  const guideSlug = params.slug ?? '';
  const guide = guides.find((item) => item.slug === guideSlug) ?? null;
  const guideIndex = guide ? guides.findIndex((item) => item.slug === guide.slug) : -1;
  const previousGuide = guideIndex > 0 ? guides[guideIndex - 1] : null;
  const nextGuide = guideIndex >= 0 && guideIndex < guides.length - 1 ? guides[guideIndex + 1] : null;

  // Контент грузим через `lazy`, а не в `useEffect`: пререндер идёт потоковым
  // рендером с `onAllReady`, и только Suspense-граница даёт ему дождаться
  // MDX-чанка. С эффектом руководства навсегда оставались пустым SPA-шаблоном.
  const GuideContent = useMemo(() => {
    if (!routeState.isValid || !guide) {
      return null;
    }

    const loader = resolveMdxModuleLoader(routeState.locale, routeState.version, guide.slug);
    if (!loader) {
      return null;
    }

    return lazy(async () => {
      const module = await loader();
      return { default: module.default ?? (() => null) };
    });
  }, [routeState.isValid, routeState.locale, routeState.version, guide]);

  useEffect(() => {
    if (!guide || !GuideContent) {
      setToc([]);
      setActiveHeadingId('');
      return;
    }

    const root = document.querySelector('.docs-guide-content');
    if (!root) {
      setToc([]);
      return;
    }

    const headingElements = Array.from(root.querySelectorAll('h1, h2, h3')) as HTMLElement[];
    const items = headingElements.map((heading, index) => {
      const fallbackId = `section-${index + 1}`;
      if (!heading.id) {
        heading.id = fallbackId;
      }

      return {
        id: heading.id,
        text: heading.textContent?.trim() || fallbackId,
        level: Number(heading.tagName.slice(1)),
      };
    });

    setToc(items);
    setActiveHeadingId(items[0]?.id ?? '');
  }, [GuideContent, routeState.locale, routeState.platform, routeState.version, guide?.slug]);

  useEffect(() => {
    if (toc.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry && visibleEntry.target instanceof HTMLElement) {
          setActiveHeadingId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: '-20% 0px -65% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [toc]);

  if (!routeState.isValid) {
    return <Navigate to={`/${defaultLocale}/${defaultPlatform}/${defaultVersion}`} replace />;
  }

  if (!guide || !GuideContent) {
    return <Navigate to={`/${routeState.locale}/${routeState.platform}/${routeState.version}`} replace />;
  }

  return (
    <DocsLayout>
      <DocsSidebar
        locale={routeState.locale}
        platform={routeState.platform}
        version={routeState.version}
        activeGuideSlug={guide.slug}
      />

      <DocsMain className="docs-guide-page">
        <nav className="docs-breadcrumbs" aria-label="breadcrumbs">
          <Link to={`/${routeState.locale}/${routeState.platform}/${routeState.version}`}>Материалы</Link>
          <span>/</span>
          <span>Guides</span>
          <span>/</span>
          <span>{guide.title}</span>
        </nav>

        <Link className="docs-back" to={`/${routeState.locale}/${routeState.platform}/${routeState.version}`}>
          ← Все материалы
        </Link>

        <RouteSwitchers
          locale={routeState.locale}
          platform={routeState.platform}
          version={routeState.version}
          routeSuffix={`/guides/${guide.slug}`}
        />

        <article className="docs-guide-content">
          <Suspense fallback={<p>Загрузка руководства…</p>}>
            <GuideContent />
          </Suspense>
        </article>

        {toc.length > 0 ? (
          <section className="docs-guide-toc" aria-label="Оглавление">
            <h2>Оглавление</h2>
            <List>
              {toc.map((item) => (
                <List.Item key={item.id} className={`docs-guide-toc-level-${item.level}`}>
                  <KitLink
                    href={`#${item.id}`}
                    className={item.id === activeHeadingId ? 'docs-guide-toc-link-active' : ''}
                  >
                    {item.text}
                  </KitLink>
                </List.Item>
              ))}
            </List>
          </section>
        ) : null}

        {previousGuide || nextGuide ? (
          <section className="docs-guide-pager">
            {previousGuide ? (
              <Link to={`/${routeState.locale}/${routeState.platform}/${routeState.version}/guides/${previousGuide.slug}`}>
                ← {previousGuide.title}
              </Link>
            ) : <span />}

            {nextGuide ? (
              <Link to={`/${routeState.locale}/${routeState.platform}/${routeState.version}/guides/${nextGuide.slug}`}>
                {nextGuide.title} →
              </Link>
            ) : <span />}
          </section>
        ) : null}
      </DocsMain>
    </DocsLayout>
  );
};

export const DocsAppContent = ({
  themeAxes,
  onThemeAxesChange,
}: {
  themeAxes: ThemeAxisState;
  onThemeAxesChange: (next: ThemeAxisState) => void;
}) => (
  <DocsShell className={`docs-density-${themeAxes.density} docs-radius-${themeAxes.radius} docs-palette-${themeAxes.palette}`}>
    <DocsToolbar>
      <DocsSearch fallbackLocale={defaultLocale} />
      <Button
        onClick={() =>
          onThemeAxesChange({
            ...themeAxes,
            colorMode: themeAxes.colorMode === 'dark' ? 'light' : 'dark',
          })
        }
      >
        {themeAxes.colorMode === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
      </Button>
    </DocsToolbar>
    <MdxProviders>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={`/${defaultLocale}/${defaultPlatform}/${defaultVersion}`} replace />}
        />
        <Route path="/:locale/:platform/:version" element={<ComponentListPage />} />
        <Route
          path="/:locale/:platform/:version/components/:slug"
          element={<ComponentPage themeAxes={themeAxes} onThemeAxesChange={onThemeAxesChange} />}
        />
        <Route
          path="/:locale/:platform/:version/guides/:slug"
          element={<GuidePage />}
        />
      </Routes>
    </MdxProviders>
  </DocsShell>
);

export const DEFAULT_THEME_AXES: ThemeAxisState = {
  colorMode: 'light',
  density: 'comfortable',
  radius: 'md',
  palette: 'brand',
};

export const App = () => {
  const [themeAxes, setThemeAxes] = useState<ThemeAxisState>(DEFAULT_THEME_AXES);

  // ThemeProvider не принимает готовую тему: он выбирает режим из каталога,
  // а `initialThemeMode` синхронизируется при каждом изменении пропа. Раньше
  // сюда передавался `theme`, которого в API нет, — переключатель темы молча
  // не работал.
  return (
    <ThemeProvider
      themes={builtinThemeCatalog}
      initialThemeMode={themeAxes.colorMode === 'dark' ? ThemeMode.dark : ThemeMode.light}
    >
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/+$/, '')}>
        <DocsAppContent themeAxes={themeAxes} onThemeAxesChange={setThemeAxes} />
      </BrowserRouter>
    </ThemeProvider>
  );
};
