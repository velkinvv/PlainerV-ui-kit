import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Size } from '@velkinvv/plainerv';

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

/**
 * Pagefind отдаёт пути от корня сайта без учёта `base`, поэтому приводим их
 * к тому же префиксу, под которым раздаётся приложение.
 */
const resolveHitUrl = (url: string) => {
  const base = baseUrl.replace(/\/+$/, '');

  if (url.startsWith(base)) {
    return url;
  }

  return `${base}${url.startsWith('/') ? '' : '/'}${url}`;
};

export const DocsSearch = ({ fallbackLocale }: DocsSearchProps) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [status, setStatus] = useState<'idle' | 'searching' | 'done' | 'unavailable'>('idle');
  const pagefindRef = useRef<PagefindModule | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const locale = location.pathname.split('/').filter(Boolean)[0] ?? fallbackLocale;

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
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
    const normalized = query.trim();

    if (normalized.length < 2) {
      setHits([]);
      setStatus('idle');
      return undefined;
    }

    let cancelled = false;
    setStatus('searching');

    const timer = window.setTimeout(async () => {
      const pagefind = pagefindRef.current;

      if (!pagefind) {
        setStatus('unavailable');
        return;
      }

      try {
        const result = await pagefind.search(normalized, { filters: { locale } });
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
  }, [query, locale]);

  return (
    <div className="docs-search">
      <Button size={Size.SM} onClick={() => setIsOpen((previous) => !previous)} aria-expanded={isOpen}>
        Поиск
      </Button>

      {isOpen ? (
        <div className="docs-search-panel" role="dialog" aria-label="Поиск по документации">
          <input
            ref={inputRef}
            className="docs-search-input"
            type="search"
            value={query}
            placeholder="Найти компонент или раздел"
            aria-label="Поисковый запрос"
            onChange={(event) => setQuery(event.target.value)}
          />

          {status === 'unavailable' ? (
            <p className="docs-search-hint">Поиск доступен в собранной версии сайта.</p>
          ) : null}

          {status === 'searching' ? <p className="docs-search-hint">Ищем…</p> : null}

          {status === 'done' && hits.length === 0 ? (
            <p className="docs-search-hint">Ничего не найдено.</p>
          ) : null}

          {hits.length > 0 ? (
            <ul className="docs-search-results">
              {hits.map((hit) => (
                <li key={hit.url}>
                  <a href={hit.url}>
                    <span className="docs-search-title">{hit.title}</span>
                    {/* Разметку подсветки формирует сам Pagefind по своему индексу. */}
                    <span
                      className="docs-search-excerpt"
                      dangerouslySetInnerHTML={{ __html: hit.excerpt }}
                    />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
