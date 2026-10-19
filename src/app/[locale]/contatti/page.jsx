import { fetchAPI } from "@/helpers/api/fetch-api"
import Link from "next/link";
import { notFound } from "next/navigation";
import parse from 'html-react-parser';
import Image from "next/image";
import GravityForm from "@/components/Library/Gravity Form/gravityForm";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/helpers/seo/metadata";
import Breadcrumbs from "@/components/Library/Breadcrumbs/breadcrumbs";
import ClientPage from "./clientPage";

export default async function Page({params}){
    const {locale} = await params;
    setRequestLocale(locale);
    var page = await fetchAPI('pages', {
        slug: 'contatti',
        acf_format: 'standard',
        _embed: true,
        lang: locale
    });
    if(!page) notFound();
    var form = await fetchAPI('forms/1', {
        lang:locale
    }, true);
    return <ClientPage page={page} form={form} />
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const page = await fetchAPI("pages", {
    lang: locale,
    slug: "contatti",
    _fields: "yoast_head_json",
  });
  return buildMetadata({
    yoast: page?.yoast_head_json,
    pathname: "/contatti",
    locale,
  });
}