import { routing } from "./routing";

// Path che non vanno mai localizzati (rewrites, api, file statici)
const EXCLUDED = /^\/(api|media)(\/|$)|\.[a-z0-9]+$/i;

/**
 * Traduce un path interno (struttura di default) nel path localizzato:
 * aggiunge il prefisso locale e traduce i segmenti statici via routing.pathnames.
 * I segmenti dinamici ([slug]) restano invariati: gli slug tradotti
 * arrivano già da WP/WPML.
 */
export function localizeHref(href, locale) {
  if (!href || !href.startsWith("/")) return href;
  if (locale === routing.defaultLocale) return href;
  if (EXCLUDED.test(href)) return href;
  if (href === `/${locale}` || href.startsWith(`/${locale}/`)) return href;

  const [path, suffix = ""] = splitSuffix(href);
  if (path === "/") return `/${locale}${suffix}`;

  const segments = path.split("/").filter(Boolean);

  for (const [key, value] of Object.entries(routing.pathnames)) {
    const keySegments = key.split("/").filter(Boolean);
    if (keySegments.length !== segments.length) continue;

    const params = {};
    const matches = keySegments.every((ks, i) => {
      if (ks.startsWith("[")) {
        params[ks] = segments[i];
        return true;
      }
      return ks === segments[i];
    });
    if (!matches) continue;

    const target = typeof value === "string" ? value : (value[locale] ?? key);
    const localized = target
      .split("/")
      .filter(Boolean)
      .map((ts) => (ts.startsWith("[") ? params[ts] : ts))
      .join("/");
    return `/${locale}/${localized}${suffix}`;
  }

  return `/${locale}${path}${suffix}`;
}

export function isHomePath(href) {
  if (!href) return false;
  const [path] = splitSuffix(href);
  const clean = path.replace(/\/$/, "") || "/";
  return clean === "/" || routing.locales.some((l) => clean === `/${l}`);
}

function splitSuffix(href) {
  const i = href.search(/[?#]/);
  return i === -1 ? [href, ""] : [href.slice(0, i), href.slice(i)];
}
