import { Select, Size, Tag } from '@velkinvv/plainerv';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import docsVersioning from '../../docs-versioning.config.json';
import { contentManifest } from '../generated/content-manifest';

type VersionEntry = {
  id: string;
  label: string;
  live: boolean;
};

const VersionBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border: 1px solid rgba(127, 127, 127, 0.25);
  border-radius: 12px;
`;

const VersionTitle = styled.span`
  font-size: 13px;
  opacity: 0.75;
`;

/**
 * Адрес страницы при переключении версии. Компонентные страницы существуют
 * для всех версий (в архивных вместо живого рендера — превью и сниппет), а
 * руководство переживает переключение, только если оно есть в контенте версии:
 * иначе получился бы пустой маршрут, и ссылка ведёт на корень версии.
 */
const resolveVersionHref = (
  locale: string,
  platform: string,
  versionId: string,
  routeSuffix: string,
): string => {
  const base = `/${locale}/${platform}/${versionId}`;
  if (!routeSuffix) {
    return base;
  }

  if (routeSuffix.startsWith('/components/')) {
    return `${base}${routeSuffix}`;
  }

  if (routeSuffix.startsWith('/guides/')) {
    const guideSlug = routeSuffix.slice('/guides/'.length);
    const hasGuide = contentManifest.guides.some(
      (guide) =>
        guide.locale === locale &&
        guide.platform === platform &&
        guide.version === versionId &&
        guide.slug === guideSlug,
    );

    return hasGuide ? `${base}${routeSuffix}` : base;
  }

  return base;
};

const resolveVersionEntries = (platformId: string): VersionEntry[] => {
  const platform = docsVersioning.platforms.find((item) => item.id === platformId);
  if (!platform) {
    return [];
  }

  return platform.versions.map((version) => ({
    id: version.id,
    label: version.label ?? version.id,
    live: version.live === true,
  }));
};

export const VersionSwitcher = ({
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
  const entries = resolveVersionEntries(platform);
  if (entries.length === 0) {
    return null;
  }

  const current = entries.find((entry) => entry.id === version);
  const liveVersion = entries.find((entry) => entry.live);
  const isLive = current?.live === true;

  return (
    <VersionBar data-version-switcher="">
      <VersionTitle>Версия:</VersionTitle>

      <Tag
        size={Size.SM}
        colorVariant={isLive ? 'primary' : 'neutral'}
        appearance={isLive ? 'filled' : 'outline'}
      >
        {current?.label ?? version}
      </Tag>

      {isLive ? (
        <Tag size={Size.SM} colorVariant="success" statusDisplay="marker">
          актуальная
        </Tag>
      ) : (
        <Tag size={Size.SM} colorVariant="warning" statusDisplay="marker">
          архивная
        </Tag>
      )}

      <Select
        autoWidth
        size={Size.SM}
        aria-label="Версия документации"
        options={entries.map((entry) => ({
          value: entry.id,
          label: entry.live ? `${entry.label} — актуальная` : entry.label,
        }))}
        value={version}
        onChange={(event) =>
          navigate(resolveVersionHref(locale, platform, event.target.value, routeSuffix))
        }
      />

      {!isLive && liveVersion ? (
        <Select
          autoWidth
          size={Size.SM}
          aria-label="Актуальная версия"
          options={[{ value: liveVersion.id, label: `перейти к ${liveVersion.label}` }]}
          value={liveVersion.id}
          onChange={() =>
            navigate(resolveVersionHref(locale, platform, liveVersion.id, routeSuffix))
          }
        />
      ) : null}
    </VersionBar>
  );
};
