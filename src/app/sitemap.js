// // src/app/sitemap.js
// import { routing } from "@/i18n/routing";
// import { getPathname } from "@/i18n/navigation";

// const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
// const WP_API = process.env.BACKEND_ENDPOINT;

// // Pagine statiche (quelle definite in routing.js)

// const staticPages = [
//   "/",
//   "/azienda",
//   "/contatti",
//   "/grazie",
//   "/news",
//   "/pronta-consegna",
//   "/settori",
// ];

// // Fetch appartamenti da WP per entrambe le lingue
// async function getAppartamentiByLocale(locale) {
//   const res = await fetch(
//     `${WP_API}/appartamenti?lang=${locale}&per_page=100&_fields=slug,modified`,
//     { next: { revalidate: 3600 } },
//   );
//   if (!res.ok) return [];
//   return res.json();
// }
// function makeEntry(pathname, params = {}, lastModified = null) {
//   const languages = {};

//   for (const locale of routing.locales) {
//     const path = getPathname({
//       href: params.slug
//         ? { pathname, params: { slug: params[locale] || params.slug } }
//         : pathname,
//       locale,
//     });

//     // IT senza prefisso, EN con /en
//     languages[locale] = `${SITE_URL}${path}`;
//   }

//   return {
//     url: languages[routing.defaultLocale], // canonical = italiano
//     priority: 1,
//     lastModified: lastModified || new Date(),
//     alternates: { languages },
//   };
// }

// // Sitemap

// export default async function sitemap() {
//   // 1. Pagine statiche
//   const staticEntries = staticPages.map((page) => makeEntry(page));

//   // 2. Appartamenti dinamici — fetch entrambe le lingue
//   const [aptIT, aptEN] = await Promise.all([
//     getAppartamentiByLocale("it"),
//     getAppartamentiByLocale("en"),
//   ]);

//   // Mappa slug EN per indice (assumendo stesso ordine da WPML)
//   const dynamicEntries = aptIT.map((post, i) => {
//     const enSlug = aptEN[i]?.slug || post.slug;

//     return {
//       url: `${SITE_URL}/appartamento/${post.slug}`,
//       lastModified: post.modified || new Date(),
//       priority: 0.8,
//       alternates: {
//         languages: {
//           it: `${SITE_URL}/appartamento/${post.slug}`,
//           en: `${SITE_URL}/en/apartment/${enSlug}`,
//         },
//       },
//     };
//   });

//   return [...staticEntries, ...dynamicEntries];
// }