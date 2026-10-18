import { Badge, BadgeVariant, Size } from '@velkinvv/plainerv';
import { Link } from 'react-router-dom';
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

const Versions = styled.details`
  position: relative;

  & > summary {
    cursor: pointer;
    font-size: 13px;
    padding: 4px 8px;
    border-radius: 8px;
    border: 1px solid rgba(127, 127, 127, 0.35);
    list-style: none;
  }

  & > summary::-webkit-details-marker {
    display: none;
  }
`;

const VersionList = styled.div`
  position: absolute;
  z-index: 20;
  top: calc(100% + 6px);
  left: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 4px;
  width: min(520px, 80vw);
  max-height: 320px;
  overflow: auto;
  padding: 10px;
  border-radius: 12px;
  border: 1px solid rgba(127, 127, 127, 0.3);
  background: ${({ theme }) =>
    (theme as { colors?: { background?: { primary?: string } } })?.colors?.background?.primary ??
    '#ffffff'};
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
`;

const VersionLink = styled(Link)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  padding: 6px 8px;
  border-radius: 8px;
  font-size: 13px;
  text-decoration: none;
  color: inherit;
  background: ${({ $active }) => ($active ? 'rgba(64, 120, 255, 0.16)' : 'transparent')};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};

  &:hover {
    background: rgba(127, 127, 127, 0.16);
  }
`;

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
      <Badge size={Size.SM} variant={isLive ? BadgeVariant.DEFAULT_MAIN : BadgeVariant.OUTLINE}>
        {current?.label ?? version}
      </Badge>
      {isLive ? (
        <Badge size={Size.SM} variant={BadgeVariant.DEFAULT_SUCCESS}>
          актуальная
        </Badge>
      ) : (
        <Badge size={Size.SM} variant={BadgeVariant.WARNING}>
          архивная
        </Badge>
      )}

      {!isLive && liveVersion ? (
        <Link to={resolveVersionHref(locale, platform, liveVersion.id, routeSuffix)}>
          перейти к {liveVersion.label}
        </Link>
      ) : null}

      <Versions>
        <summary>Все версии ({entries.length})</summary>
        <VersionList>
          {entries.map((entry) => (
            <VersionLink
              key={entry.id}
              to={resolveVersionHref(locale, platform, entry.id, routeSuffix)}
              $active={entry.id === version}
              data-version-id={entry.id}
              data-version-live={entry.live ? 'true' : 'false'}
            >
              <span>{entry.label}</span>
              {entry.live ? <span aria-label="актуальная версия">●</span> : null}
            </VersionLink>
          ))}
        </VersionList>
      </Versions>
    </VersionBar>
  );
};
