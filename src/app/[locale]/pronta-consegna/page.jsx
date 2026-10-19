import BigText from "@/components/Library/Big Text/bigText";
import Breadcrumbs from "@/components/Library/Breadcrumbs/breadcrumbs";
import Faq from "@/components/Library/Faq/faq";
import GravityForm from "@/components/Library/Gravity Form/gravityForm";
import Paragraph from "@/components/Library/Paragraph/paragraph";
import ProductLoop from "@/components/Library/Product Loop/productLoop";
import { fetchAPI } from "@/helpers/api/fetch-api";
import { buildMetadata } from "@/helpers/seo/metadata";

import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import ClientPage from "./clientPage";

export default async function Page({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("strings");
  var page = await fetchAPI("pages", {
    slug: "pronta-consegna",
    acf_format: "standard",
    lang: locale,
  });
  if (!page) notFound();

  var products = await fetchAPI("prodotto", {
    acf_format: "standard",
    status: 'publish, draft',
    per_page: 100,
    lang: locale,
    _fields:
      "id,slug,title,category_info,thumbnail_data,wpml_translations.locale,acf.pronta_consegna,acf.scheda_tecnica",
  });
  var form = await fetchAPI(
    "forms/1",
    {
      lang: locale,
    },
    true,
  );
  
  return <ClientPage page={page} form={form} products={products} />
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const page = await fetchAPI("pages", {
    lang: locale,
    slug: "pronta-consegna",
    _fields: "yoast_head_json",
  });
  return buildMetadata({
    yoast: page?.yoast_head_json,
    pathname: "/pronta-consegna",
    locale,
  });
}
