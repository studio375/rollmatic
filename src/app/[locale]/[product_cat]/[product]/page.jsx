import { fetchAPI, getAllSlugs } from "@/helpers/api/fetch-api";
import { notFound } from "next/navigation";
import ProductPage from "./clientProductPage";
import { routing } from "@/i18n/routing";

export default async function Page({params}){
    const {product_cat, product} = await params;
    
    const prodotto = await fetchAPI('prodotto', {
        slug: product,
        acf_format: "standard",
        _embed: true
    });
    if(!prodotto) notFound();
    const cat = prodotto?._embedded['wp:term'][0][0];
    var form = await fetchAPI('forms/1', {}, true);
    return <ProductPage prodotto={prodotto} cat={cat} formObject={form} />;
}

export async function generateStaticParams() {
    const categories = [];
    const params = [];
    for (const locale of routing.locales) {
        const slugs = await getAllSlugs("categoria", locale);
        for (const {slug, id} of slugs) {
            categories.push({ locale, slug, id});
        }
    }
    for(const cat of categories){
        const locale = cat.locale;
        const product_cat = cat.slug;
        const slugs = await getAllSlugs('prodotto', locale, {categoria: cat.id});
        for(const {slug, id} of slugs){
            const product = slug;
            params.push({locale, product_cat, product});
        }
    }
    return params;
}