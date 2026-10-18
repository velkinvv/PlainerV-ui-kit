import { useEffect, useState } from 'react';
import { PropsTable } from './PropsTable';

export type VersionPropItem = {
  name: string;
  type: string;
  required?: boolean;
  defaultValue?: string;
  description?: string;
  deprecated?: boolean;
};

type VersionPropsPayload = {
  components?: Record<string, { items?: VersionPropItem[] }>;
};

const propsLoaders = import.meta.glob<{ default: VersionPropsPayload }>(
  '../generated/versions/*/props.json',
);

/**
 * Таблица пропсов архивной версии: данные берутся из деклараций опубликованного
 * пакета этой версии (`scripts/build-version-props.mjs`). Файла может не быть —
 * тогда показываем пропсы актуальной версии с явной пометкой.
 */
export const VersionPropsTable = ({
  version,
  componentSlug,
  fallbackItems,
}: {
  version: string;
  componentSlug: string;
  fallbackItems: readonly VersionPropItem[];
}) => {
  const [items, setItems] = useState<VersionPropItem[] | null>(null);
  const [isMissing, setIsMissing] = useState(false);

  useEffect(() => {
    // При переходе на другую версию компонент переиспользуется, поэтому
    // состояние предыдущей версии нужно сбросить до загрузки новой.
    setItems(null);
    setIsMissing(false);

    const loader = propsLoaders[`../generated/versions/${version}/props.json`];
    if (!loader) {
      setIsMissing(true);
      return;
    }

    let isCancelled = false;
    loader()
      .then((module) => {
        if (isCancelled) return;
        const versionItems = module.default?.components?.[componentSlug]?.items ?? [];
        if (versionItems.length === 0) {
          setIsMissing(true);
          return;
        }
        setItems(versionItems);
      })
      .catch(() => {
        if (!isCancelled) setIsMissing(true);
      });

    return () => {
      isCancelled = true;
    };
  }, [version, componentSlug]);

  if (items) {
    return (
      <>
        <p className="docs-props-source">Источник: декларации пакета версии {version}.</p>
        <PropsTable items={items} />
      </>
    );
  }

  return (
    <>
      <p className="docs-props-source">
        {isMissing
          ? `Данные пакета версии ${version} не сгенерированы — ниже пропсы актуальной версии.`
          : 'Загрузка пропсов версии…'}
      </p>
      {isMissing ? <PropsTable items={fallbackItems} /> : null}
    </>
  );
};
