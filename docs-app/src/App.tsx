import { lazy, Suspense, type ComponentType, useEffect, useMemo, useState } from 'react';
import {
  Button,
  ButtonVariant,
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
import { contentManifest } from './generated/content-manifest';
import { docsManifest } from './generated/docs-manifest';
import { isLiveVersion } from './versioning';

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
  justify-content: flex-end;
  margin-bottom: 16px;
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

const DocsMain = styled.main`
  display: grid;
  gap: 16px;
`;

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
}) => (
  <div className="docs-switchers">
    <div className="docs-switcher-group">
      <span className="docs-switcher-title">Язык:</span>
      {docsVersioning.locales.map((item) => (
        <Link key={item.id} to={`/${item.id}/${platform}/${version}`} className="docs-switcher-link">
          {item.label}
        </Link>
      ))}
    </div>

    <VersionSwitcher locale={locale} platform={platform} version={version} routeSuffix={routeSuffix} />
  </div>
);

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

  return (
    <SidebarRoot aria-label="Component navigation">
      {guides.length > 0 ? (
        <section className="docs-sidebar-group">
          <h3>Guides</h3>
          <div className="docs-sidebar-buttons">
            {guides.map((guide) => (
              <Button
                key={`guide-${guide.slug}`}
                size={Size.SM}
                variant={guide.slug === activeGuideSlug ? ButtonVariant.PRIMARY : ButtonVariant.GHOST}
                fullWidth
                onClick={() => navigate(`/${locale}/${platform}/${version}/guides/${guide.slug}`)}
              >
                {guide.title}
              </Button>
            ))}
          </div>
        </section>
      ) : null}

      {docsManifest.groups.map((group) => (
        <section key={group.id} className="docs-sidebar-group">
          <h3>{group.title}</h3>
          <div className="docs-sidebar-buttons">
            {group.items
              .map((slug) => docsManifest.components.find((component) => component.slug === slug))
              .filter(
                (component): component is (typeof docsManifest.components)[number] =>
                  Boolean(component),
              )
              .map((component) => (
                <Button
                  key={component.slug}
                  size={Size.SM}
                  variant={component.slug === activeSlug ? ButtonVariant.PRIMARY : ButtonVariant.GHOST}
                  fullWidth
                  onClick={() => navigate(`/${locale}/${platform}/${version}/components/${component.slug}`)}
                >
                  {component.name}
                </Button>
              ))}
          </div>
        </section>
      ))}
    </SidebarRoot>
  );
};

const ComponentListPage = () => {
  const params = useParams<DocsRouteParams>();
  const navigate = useNavigate();
  const routeState = resolveRouteState(params);

  if (!routeState.isValid) {
    return <Navigate to={`/${defaultLocale}/${defaultPlatform}/${defaultVersion}`} replace />;
  }

  return (
    <DocsLayout>
      <DocsSidebar
        locale={routeState.locale}
        platform={routeState.platform}
        version={routeState.version}
      />

      <DocsMain>
        <h1>PlainerV Docs</h1>
        <p className="docs-subtitle">
          {routeState.locale} / {routeState.platform} / {routeState.version}
        </p>

        <RouteSwitchers
          locale={routeState.locale}
          platform={routeState.platform}
          version={routeState.version}
        />

        {selectGuides(routeState.locale, routeState.platform, routeState.version).length > 0 ? (
          <section className="docs-section">
            <h2>Руководства</h2>
            <ul className="docs-list">
              {selectGuides(routeState.locale, routeState.platform, routeState.version).map((guide) => (
                <li key={`guide-${guide.slug}`}>
                  <div>
                    <strong>{guide.title}</strong>
                    <div className="docs-group">{guide.description || guide.slug}</div>
                  </div>
                  <Button
                    size={Size.SM}
                    variant={ButtonVariant.OUTLINE}
                    onClick={() =>
                      navigate(`/${routeState.locale}/${routeState.platform}/${routeState.version}/guides/${guide.slug}`)
                    }
                  >
                    Открыть
                  </Button>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <ul className="docs-list">
          {docsManifest.components.map((component) => (
            <li key={component.slug}>
              <div>
                <strong>{component.name}</strong>
                <div className="docs-group">{component.group}</div>
              </div>
              <Button
                size={Size.SM}
                variant={ButtonVariant.OUTLINE}
                onClick={() =>
                  navigate(`/${routeState.locale}/${routeState.platform}/${routeState.version}/components/${component.slug}`)
                }
              >
                Открыть
              </Button>
            </li>
          ))}
        </ul>
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
          <div className="docs-archive-notice" role="note">
            Архивная версия {routeState.version}: примеры показаны статичными превью и кодом,
            Playground и переключатель тем доступны только в актуальной версии.
          </div>
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
            <ul>
              {toc.map((item) => (
                <li key={item.id} className={`docs-guide-toc-level-${item.level}`}>
                  <a href={`#${item.id}`} className={item.id === activeHeadingId ? 'docs-guide-toc-link-active' : ''}>
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
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
      <ClientOnly>
        <DocsSearch fallbackLocale={defaultLocale} />
      </ClientOnly>
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
