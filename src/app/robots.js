export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Le route API non hanno niente da indicizzare
      disallow: ["/api/"],
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
    host: process.env.NEXT_PUBLIC_SITE_URL,
  };
}