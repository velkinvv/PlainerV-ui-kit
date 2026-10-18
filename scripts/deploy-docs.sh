#!/usr/bin/env bash
# Выкладка собранной документации на свой сервер.
#
# Раскладка на сервере:
#   ${DOCS_DEPLOY_PATH}/releases/<release>/docs/  — статика одного релиза (содержимое docs-app/dist)
#   ${DOCS_DEPLOY_PATH}/current                   — симлинк на активный релиз
#   ${DOCS_DEPLOY_PATH}/.previous-release         — релиз, на который переключает откат
#
# Релизы не удаляются: откат — переключение симлинка на предыдущий.
#
# Использование:
#   deploy-docs.sh deploy     — выгрузить релиз и активировать его
#   deploy-docs.sh rollback   — вернуть предыдущий релиз (или указанный в DOCS_DEPLOY_ROLLBACK_TO)
set -euo pipefail

mode="${1:-deploy}"

fail() {
  echo "[ERROR] $*" >&2
  exit 1
}

require_env() {
  local name="$1"
  if [ -z "${!name:-}" ]; then
    fail "не задана переменная окружения ${name}"
  fi
}

require_env DOCS_DEPLOY_HOST
require_env DOCS_DEPLOY_USER
require_env DOCS_DEPLOY_PATH

remote_root="${DOCS_DEPLOY_PATH%/}"
remote_port="${DOCS_DEPLOY_PORT:-22}"
ssh_key="${DOCS_DEPLOY_SSH_KEY_PATH:-$HOME/.ssh/docs_deploy}"
remote="${DOCS_DEPLOY_USER}@${DOCS_DEPLOY_HOST}"

case "$remote_root" in
  '/' | '') fail "DOCS_DEPLOY_PATH не должен быть корнем файловой системы" ;;
esac

[ -f "$ssh_key" ] || fail "не найден приватный ключ ${ssh_key}"

ssh_opts=(
  -i "$ssh_key"
  -p "$remote_port"
  -o IdentitiesOnly=yes
  -o BatchMode=yes
  -o ConnectTimeout=15
)

# Проверку ключа хоста не отключаем молча: либо готовый known_hosts,
# либо явное разрешение принять ключ при первом подключении.
if [ -s "$HOME/.ssh/known_hosts" ]; then
  host_key_opts=(-o StrictHostKeyChecking=yes)
elif [ "${DOCS_DEPLOY_ACCEPT_NEW_HOST_KEY:-0}" = '1' ]; then
  echo "[WARN] known_hosts не подготовлен: ключ хоста принимается при первом подключении." >&2
  host_key_opts=(-o StrictHostKeyChecking=accept-new)
else
  fail "нет $HOME/.ssh/known_hosts: добавьте DOCS_DEPLOY_KNOWN_HOSTS или ssh-keyscan ${DOCS_DEPLOY_HOST}"
fi

ssh_opts+=("${host_key_opts[@]}")

# rsync запускает ssh сам, поэтому те же опции передаются ему явно: иначе
# при accept-new выгрузка падала бы на проверке ключа хоста, хотя ssh-шаги проходят.
rsync_ssh="ssh -i ${ssh_key} -p ${remote_port} -o IdentitiesOnly=yes -o BatchMode=yes -o ConnectTimeout=15 ${host_key_opts[*]}"

check_health() {
  local url="$1"
  local attempts="${DOCS_HEALTHCHECK_ATTEMPTS:-5}"
  local marker="${DOCS_HEALTHCHECK_MARKER:-}"
  local attempt body

  if [ -z "$url" ]; then
    echo "[WARN] DOCS_HEALTHCHECK_URL не задан: проверка после переключения пропущена." >&2
    return 0
  fi

  for attempt in $(seq 1 "$attempts"); do
    if body="$(curl -fsSL --max-time 20 "$url" 2>/dev/null)"; then
      if [ -z "$marker" ] || grep -q -- "$marker" <<<"$body"; then
        echo "[OK] Проверка ${url} прошла (попытка ${attempt})."
        return 0
      fi
    fi
    sleep 3
  done

  echo "[ERROR] ${url} не ответил как ожидалось за ${attempts} попыток (маркер: ${marker:-не задан})." >&2
  return 1
}

deploy() {
  local dist_dir="${DOCS_DIST_DIR:-docs-app/dist}"
  local release="${DEPLOY_RELEASE_ID:-}"
  local staging
  local previously_active

  require_env DEPLOY_RELEASE_ID
  case "$release" in
    *[!A-Za-z0-9._-]*) fail "DEPLOY_RELEASE_ID содержит недопустимые символы: ${release}" ;;
  esac

  [ -f "${dist_dir}/index.html" ] || fail "нет ${dist_dir}/index.html: сборка документации не выполнена"
  [ -f "${dist_dir}/pagefind/pagefind.js" ] ||
    fail "нет ${dist_dir}/pagefind/pagefind.js: индекс поиска не собран (без него поиск на проде молчит)"

  staging="${remote_root}/releases/.staging-${release}"

  echo "[1/4] Готовлю каталог релиза ${release} на ${remote}"
  ssh "${ssh_opts[@]}" "$remote" bash -s -- "$remote_root" "$staging" <<'REMOTE'
set -euo pipefail
root="$1"
staging="$2"
mkdir -p "${root}/releases"
rm -rf "${staging}"
mkdir -p "${staging}/docs"
REMOTE

  echo "[2/4] Выгружаю статику (rsync)"
  rsync -az --delete --chmod=D755,F644 -e "$rsync_ssh" "${dist_dir}/" "${remote}:${staging}/docs/"

  echo "[3/4] Фиксирую релиз и переключаю симлинк current"
  previously_active="$(
    ssh "${ssh_opts[@]}" "$remote" bash -s -- "$remote_root" "$release" "$staging" <<'REMOTE'
set -euo pipefail
root="$1"
release="$2"
staging="$3"

test -f "${staging}/docs/index.html" || { echo "[ERROR] в выгрузке нет docs/index.html" >&2; exit 2; }
test -f "${staging}/docs/pagefind/pagefind.js" || { echo "[ERROR] в выгрузке нет docs/pagefind/pagefind.js" >&2; exit 3; }

rm -rf "${root}/releases/${release}"
mv "${staging}" "${root}/releases/${release}"

# Запоминаем активный релиз до переключения: на него вернёт откат.
previous="$(readlink -f "${root}/current" 2>/dev/null || true)"
previous_name=""
if [ -n "${previous}" ] && [ -d "${previous}" ]; then
  case "${previous}" in
    "${root}/releases/"*) previous_name="$(basename "${previous}")" ;;
  esac
fi

if [ -n "${previous_name}" ]; then
  printf '%s\n' "${previous_name}" > "${root}/.previous-release"
else
  rm -f "${root}/.previous-release"
fi

# Атомарная замена симлинка: GNU mv -T переставляет ссылку одной операцией.
# Там, где -T не поддерживается, остаётся неудачная попытка и обычная замена.
ln -sfn "releases/${release}" "${root}/.current.new"
if ! mv -Tf "${root}/.current.new" "${root}/current" 2>/dev/null; then
  if [ -L "${root}/current" ]; then
    rm -f "${root}/current"
  elif [ -e "${root}/current" ]; then
    echo "[ERROR] ${root}/current существует и не является симлинком — выкладка остановлена" >&2
    exit 4
  fi
  mv "${root}/.current.new" "${root}/current"
fi

if [ -n "${previous_name}" ]; then
  printf '%s\n' "${previous_name}"
fi
REMOTE
  )"

  echo "[OK] Активен релиз ${release}."
  if [ -n "$previously_active" ]; then
    echo "[OK] Предыдущий релиз сохранён для отката: ${previously_active}."
  else
    echo "[WARN] Предыдущего релиза не было — откат недоступен."
  fi

  echo "[4/4] Проверяю страницу после переключения"
  if ! check_health "${DOCS_HEALTHCHECK_URL:-}"; then
    if [ -n "$previously_active" ]; then
      echo "[ERROR] Проверка не прошла — возвращаю релиз ${previously_active}." >&2
      ( rollback "$previously_active" ) || true
      fail "деплой ${release} отменён, активен предыдущий релиз"
    fi
    fail "деплой ${release} не прошёл проверку, предыдущего релиза для отката нет"
  fi
}

rollback() {
  local target="${1:-${DOCS_DEPLOY_ROLLBACK_TO:-}}"
  local active

  if [ -z "$target" ]; then
    target="$(ssh "${ssh_opts[@]}" "$remote" bash -s -- "$remote_root" <<'REMOTE'
set -euo pipefail
root="$1"
if [ -s "${root}/.previous-release" ]; then
  cat "${root}/.previous-release"
fi
REMOTE
)"
  fi

  [ -n "$target" ] || fail "не задан релиз для отката и не найден ${remote_root}/.previous-release"
  case "$target" in
    *[!A-Za-z0-9._-]*) fail "имя релиза содержит недопустимые символы: ${target}" ;;
  esac

  active="$(
    ssh "${ssh_opts[@]}" "$remote" bash -s -- "$remote_root" "$target" <<'REMOTE'
set -euo pipefail
root="$1"
target="$2"

test -f "${root}/releases/${target}/docs/index.html" || {
  echo "[ERROR] релиз ${target} не найден в ${root}/releases" >&2
  exit 2
}

current="$(readlink -f "${root}/current" 2>/dev/null || true)"
current_name=""
if [ -n "${current}" ] && [ -d "${current}" ]; then
  case "${current}" in
    "${root}/releases/"*) current_name="$(basename "${current}")" ;;
  esac
fi
if [ -n "${current_name}" ]; then
  printf '%s\n' "${current_name}" > "${root}/.previous-release"
fi

ln -sfn "releases/${target}" "${root}/.current.new"
if ! mv -Tf "${root}/.current.new" "${root}/current" 2>/dev/null; then
  if [ -L "${root}/current" ]; then
    rm -f "${root}/current"
  elif [ -e "${root}/current" ]; then
    echo "[ERROR] ${root}/current существует и не является симлинком — откат остановлен" >&2
    exit 4
  fi
  mv "${root}/.current.new" "${root}/current"
fi

basename "$(readlink -f "${root}/current")"
REMOTE
  )"

  echo "[OK] Активен релиз ${active}."
  check_health "${DOCS_HEALTHCHECK_URL:-}" || fail "страница после отката не отвечает"
}

case "$mode" in
  deploy) deploy ;;
  rollback) rollback ;;
  *)
    echo "Использование: $0 [deploy|rollback]" >&2
    exit 1
    ;;
esac
