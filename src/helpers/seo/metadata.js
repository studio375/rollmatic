import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

// Trovo lo slug tradotto in un oggetto wpml translations per una locale specifica
function translatedSlug(translations, locale) {
  const match = Object.values(translations || {}).find((t) =>
    t?.locale?.startsWith(locale),
  );
  return match?.slug || null;
}

// Trovo le translations di un termine tassonomia dentro wpml_translations_tax cercando per slug corrente
function taxTranslations(translationsTax, taxonomy, slug) {
  const terms = translationsTax?.[taxonomy] || {};
  const term = Object.values(terms).find((t) => t?.slug === slug);
  return term?.translations || null;
}

// Costruisco l'oggetto metadata dai dati yoast_head_json di WP
/**
  Es più segmenti dinamici: 
  buildMetadata({
    yoast: page?.yoast_head_json,
    pathname: "/[categoria]/[prodotto]",
    locale,
    value: prodottoSlug,
    translations: page?.wpml_translations,
    taxValues: [categoriaSlug],
    taxonomies: ["categoria-prodotto"],
    translationsTax: page?.wpml_translations_tax,
  })
*/
export function buildMetadata({
  yoast,
  pathname,
  locale,
  value,
  translations,
  taxValues = [],
  taxonomies = [],
  translationsTax,
}) {
  if (!yoast) return {};

  const params = [...pathname.matchAll(/\[(\w+)\]/g)].map((m) => m[1]);
  const lastParam = params.at(-1);
  const taxParams = params.slice(0, -1);

  const taxParamsTranslations = taxParams.map((_, i) =>
    taxTranslations(translationsTax, taxonomies[i], taxValues[i]),
  );


  const buildParams = (targetLocale) => {
    const result = {};
    taxParams.forEach((p, i) => {
      const v =
        targetLocale === locale
          ? taxValues[i]
          : translatedSlug(taxParamsTranslations[i], targetLocale);
      if (!v) return;
      result[p] = v;
    });
    const lastValue =
      targetLocale === locale
        ? value
        : translatedSlug(translations, targetLocale);
    if (!lastValue) return null;
    result[lastParam] = lastValue;
    return result;
  };

  const currentParams = lastParam ? buildParams(locale) : null;
  const href = lastParam ? { pathname, params: currentParams } : pathname;
  const url = `${SITE_URL}${getPathname({ href, locale })}`;
  const languages = {};
  for (const l of routing.locales) {
    if (!lastParam) {
      languages[l] = `${SITE_URL}${getPathname({ href: pathname, locale: l })}`;
      continue;
    }
    const localizedParams = buildParams(l);
    if (!localizedParams) continue;
    languages[l] = `${SITE_URL}${getPathname({
      href: { pathname, params: localizedParams },
      locale: l,
    })}`;
  }
  const images = (yoast.og_image || []).map((img) => ({
    url: img.url,
    width: img.width,
    height: img.height,
  }));

  return {
    title: yoast.title,
    description: yoast.description,
    robots: {
      index: yoast.robots?.index == "index" ? true : false,
      follow: yoast.robots?.follow == "follow" ? true : false,
    },
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title: yoast.og_title,
      description: yoast.og_description,
      url,
      siteName: yoast.og_site_name,
      locale: yoast.og_locale,
      type: yoast.og_type,
      images,
    },
    twitter: {
      card: yoast.twitter_card,
      title: yoast.twitter_title || yoast.og_title,
      description: yoast.twitter_description || yoast.og_description,
      images,
    },
  };
}
