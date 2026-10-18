import docsVersioning from '../docs-versioning.config.json';

export type VersionInfo = {
  id: string;
  label: string;
  live: boolean;
};

const findPlatform = (platformId: string) =>
  docsVersioning.platforms.find((platform) => platform.id === platformId);

export const getPlatformVersions = (platformId: string): VersionInfo[] => {
  const platform = findPlatform(platformId);
  if (!platform) return [];

  return platform.versions.map((version) => ({
    id: version.id,
    label: version.label ?? version.id,
    live: version.live === true,
  }));
};

export const getVersionInfo = (platformId: string, versionId: string): VersionInfo | null =>
  getPlatformVersions(platformId).find((version) => version.id === versionId) ?? null;

export const isLiveVersion = (platformId: string, versionId: string): boolean =>
  getVersionInfo(platformId, versionId)?.live === true;

export const getLiveVersion = (platformId: string): VersionInfo | null =>
  getPlatformVersions(platformId).find((version) => version.live) ?? null;

/** Каталог превью версии внутри `public/`; префикс деплоя уже учтён в `BASE_URL`. */
export const getSnapshotDirectory = (versionId: string): string =>
  `${import.meta.env.BASE_URL}version-snapshots/${versionId}`;
