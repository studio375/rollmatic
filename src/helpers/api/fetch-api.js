import { getBackendURL } from "./api-helpers";
import qs from "qs";
export async function fetchAPI(
  path = "",
  urlParamsObject = {},
  isGravity = false,
) {
  try {
    const options = {
      next: { tags: ["all"] },
      cache: "force-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " + btoa("studio375:" + process.env.APPLICATION_PASSWORD),
      },
    };

    // Build request URL
    const queryString = qs.stringify(urlParamsObject);
    var requestUrl = `${getBackendURL(
      `/${path}${queryString ? `?${queryString}` : ""}`,
    )}`;
    if (isGravity) {
      requestUrl = `${process.env.GRAVITY_ENDPOINT}/${path}${queryString ? `?${queryString}` : ""}`;
    }
    // Trigger API call
    const response = await fetch(requestUrl, options);
    const body = await response.text();
    let r;
    try {
      r = JSON.parse(body);
    } catch {
      throw new Error(
        `Risposta non JSON da ${requestUrl} (HTTP ${response.status}): ${body.slice(0, 300)}`,
      );
    }
    if ("slug" in urlParamsObject) {
      return Array.isArray(r) ? (r[0] ?? null) : null;
    }
    return r;
  } catch (error) {
    console.error(`fetchAPI failed: ${requestUrl ?? path}`, error);
    throw error;
  }
}

export async function getTranslatedSlug(path, slug, fromLocale, toLocale) {
  const post = await fetchAPI(`${path}`, {
    lang: `${fromLocale}`,
    slug: slug,
    _embed: true,
    acf_format: "standard",
  });
  if (!post?.wpml_translations) return null;
  const match = Object.entries(post.wpml_translations).find(
    ([key]) => key === toLocale || key.startsWith(toLocale),
  );
  return match ? match[1].slug : null;
}

export async function getAllSlugs(path, locale, more_opt = {}) {
  var allPar = {
    ...more_opt,
    lang: `${locale}`,
    // wpml_translations.locale pesa nulla ma evita il warning PHP del tema (functions.php:56)
    _fields: "slug,id,wpml_translations.locale",
    per_page: 100,
  };
  const posts = await fetchAPI(`${path}`, allPar);
  return posts.map((p) => {
    return { slug: p.slug, id: p.id };
  });
}

export async function fetchBySlug(path, locale, slug, category = false) {
  return fetchAPI(path, {
    lang: locale,
    slug,
    ...(category ? { categoria_slug: category } : {}),
    acf_format: "standard",
    _embed: "true",
    context: "edit",
  });
}
