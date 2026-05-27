import { getBackendURL } from "./api-helpers";
import qs from "qs";
export async function fetchAPI(path = "", urlParamsObject = {}, isGravity = false) {
  try {
    const options = {
      next: { tags: ["all"] },
      cache: "force-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("studio375:" + process.env.APPLICATION_PASSWORD),
      },
    };

    // Build request URL
    const queryString = qs.stringify(urlParamsObject);
    var requestUrl = `${getBackendURL(
      `/${path}${queryString ? `?${queryString}` : ""}`,
    )}`;
    if(isGravity){
      requestUrl = `${process.env.GRAVITY_ENDPOINT}/${path}${queryString ? `?${queryString}` : ""}`;
    }

    // Trigger API call
    const response = await fetch(requestUrl, options);
    const r = await response.json();
    if ("slug" in urlParamsObject) {
      return Array.isArray(r) ? (r[0] ?? null) : null;
    }
    return r;
  } catch (error) {
    console.error(error);
    throw new Error(
      `Please check if your server is running and you set all the required tokens.`,
    );
  }
}


export async function getTranslatedSlug(path, slug, fromLocale, toLocale) {
  const post = await fetchAPI(`${path}`, {
    lang: `${fromLocale}`,
    slug: slug,
    _embed: true,
  });
  if (!post?.wpml_translations) return null;
  const match = Object.entries(post.wpml_translations).find(
    ([key]) => key === toLocale || key.startsWith(toLocale),
  );
  return match ? match[1].slug : null;
}