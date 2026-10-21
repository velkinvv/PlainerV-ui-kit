import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { Input, Link, Size } from '@velkinvv/plainerv';
import { useLocation, useNavigate } from 'react-router-dom';

type SearchHit = {
  url: string;
  title: string;
  excerpt: string;
};

type PagefindResult = {
  data: () => Promise<{
    url: string;
    excerpt: string;
    meta?: { title?: string };
  }>;
};

type PagefindModule = {
  init: () => Promise<void>;
  search: (
    query: string,
    options?: { filters?: Record<string, string> },
  ) => Promise<{ results: PagefindResult[] }>;
};

type DocsSearchProps = {
  fallbackLocale: string;
};

const baseUrl = import.meta.env.BASE_URL;
const basePath = baseUrl.replace(/\/+$/, '');

/**
 * Pagefind отдаёт пути от корня сайта без учёта `base`, поэтому приводим их
 * к тому же префиксу, под которым раздаётся приложение.
 */
const resolveHitUrl = (url: string) => {
  if (url.startsWith(basePath)) {
    return url;
  }

  return `${basePath}${url.startsWith('/') ? '' : '/'}${url}`;
};

/** Путь для роутера: `basename` добавит префикс сам, поэтому его надо срезать. */
const toRouterPath = (url: string) =>
  url.startsWith(basePath) ? url.slice(basePath.length) || '/' : url;

export const DocsSearch = ({ fallbackLocale }: DocsSearchProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [status, setStatus] = useState<'idle' | 'searching' | 'done' | 'unavailable'>('idle');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [shortcutLabel, setShortcutLabel] = useState('Ctrl+K');
  const pagefindRef = useRef<PagefindModule | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  // Поле из кита не пробрасывает ref наружу, поэтому фокус адресуем по id.
  const searchInputElement = () =>
    document.getElementById('docs-search-input') as HTMLInputElement | null;

  const locale = location.pathname.split('/').filter(Boolean)[0] ?? fallbackLocale;
  const normalizedQuery = query.trim();
  const isPanelOpen = isOpen && normalizedQuery.length >= 2;

  useEffect(() => {
    if (typeof navigator !== 'undefined' && /Mac|iPhone|iPad/i.test(navigator.userAgent)) {
      setShortcutLabel('⌘+K');
    }
  }, []);

  // Навигация закрывает панель: поле — часть шапки, а не модальное окно.
  useEffect(() => {
    setIsOpen(false);
    setQuery('');
    setHits([]);
    setStatus('idle');
    setActiveIndex(-1);
  }, [location.pathname]);

  // Кнопки «Поиск» больше нет, поэтому поле фокусируется горячей клавишей.
  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsOpen(true);
        searchInputElement()?.focus();
      }
    };

    window.addEventListener('keydown', handleShortcut);

    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

  // Клик вне поля закрывает панель с результатами.
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);

    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [isOpen]);

  // Индекс подключается лениво и только на клиенте: в dev-режиме его нет,
  // поэтому недоступность поиска — ожидаемое состояние, а не ошибка.
  useEffect(() => {
    if (!isOpen || pagefindRef.current) {
      return undefined;
    }

    let cancelled = false;

    const connect = async () => {
      try {
        const pagefind = (await import(
          /* @vite-ignore */ `${baseUrl}pagefind/pagefind.js`
        )) as PagefindModule;
        await pagefind.init();

        if (!cancelled) {
          pagefindRef.current = pagefind;
        }
      } catch {
        if (!cancelled) {
          setStatus('unavailable');
        }
      }
    };

    void connect();

    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  useEffect(() => {
    if (normalizedQuery.length < 2) {
      setHits([]);
      setStatus('idle');
      setActiveIndex(-1);
      return undefined;
    }

    let cancelled = false;
    setStatus('searching');
    setActiveIndex(-1);

    const timer = window.setTimeout(async () => {
      const pagefind = pagefindRef.current;

      if (!pagefind) {
        setStatus('unavailable');
        return;
      }

      try {
        const result = await pagefind.search(normalizedQuery, { filters: { locale } });
        const items = await Promise.all(result.results.slice(0, 8).map((entry) => entry.data()));

        if (cancelled) {
          return;
        }

        setHits(
          items.map((item) => ({
            url: resolveHitUrl(item.url),
            title: item.meta?.title ?? item.url,
            excerpt: item.excerpt,
          })),
        );
        setStatus('done');
      } catch {
        if (!cancelled) {
          setStatus('unavailable');
        }
      }
    }, 250);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [normalizedQuery, locale]);

  const handleInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
      searchInputElement()?.blur();
      return;
    }

    if (event.key === 'ArrowDown' && hits.length > 0) {
      event.preventDefault();
      setActiveIndex((previous) => (previous + 1) % hits.length);
      return;
    }

    if (event.key === 'ArrowUp' && hits.length > 0) {
      event.preventDefault();
      setActiveIndex((previous) => (previous <= 0 ? hits.length - 1 : previous - 1));
      return;
    }

    if (event.key === 'Enter') {
      const target = hits[activeIndex >= 0 ? activeIndex : 0];

      if (target) {
        event.preventDefault();
        navigate(toRouterPath(target.url));
      }
    }
  };

  return (
    <div className="docs-search" ref={rootRef}>
      <div className="docs-search-field">
        <Input
          id="docs-search-input"
          fullWidth
          size={Size.SM}
          type="search"
          value={query}
          placeholder="Поиск по документации"
          aria-label="Поиск по документации"
          role="combobox"
          aria-expanded={isPanelOpen}
          aria-controls="docs-search-results"
          aria-autocomplete="list"
          aria-activedescendant={activeIndex >= 0 ? `docs-search-hit-${activeIndex}` : undefined}
          onFocus={() => setIsOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onKeyDown={handleInputKeyDown}
        />

        <kbd className="docs-search-shortcut" aria-hidden="true">
          {shortcutLabel}
        </kbd>
      </div>

      {isPanelOpen ? (
        <div className="docs-search-panel">
          {status === 'unavailable' ? (
            <p className="docs-search-hint">Поиск доступен в собранной версии сайта.</p>
          ) : null}

          {status === 'searching' ? <p className="docs-search-hint">Ищем…</p> : null}

          {status === 'done' && hits.length === 0 ? (
            <p className="docs-search-hint">Ничего не найдено.</p>
          ) : null}

          {hits.length > 0 ? (
            <div className="docs-search-results" id="docs-search-results" role="listbox">
              {hits.map((hit, index) => (
                <Link
                  key={hit.url}
                  id={`docs-search-hit-${index}`}
                  href={hit.url}
                  role="option"
                  aria-selected={index === activeIndex}
                  className={index === activeIndex ? 'docs-search-hit is-active' : 'docs-search-hit'}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={(event) => {
                    // Ведём переход роутером, чтобы не перезагружать страницу.
                    event.preventDefault();
                    setIsOpen(false);
                    setQuery('');
                    navigate(toRouterPath(hit.url));
                  }}
                >
                  <span className="docs-search-title">{hit.title}</span>
                  {/* Разметку подсветки формирует сам Pagefind по своему индексу. */}
                  <span
                    className="docs-search-excerpt"
                    dangerouslySetInnerHTML={{ __html: hit.excerpt }}
                  />
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
