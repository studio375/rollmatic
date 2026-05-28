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
    const paramsCat = [];
    const paramsProd = [];
    for (const locale of routing.locales) {
        const slugs = await getAllSlugs("categoria", locale);
        for (const {slug, id} of slugs) {
            paramsCat.push({ locale, slug, id});
        }
    }
    console.log(paramsCat);
    // for (const locale of routing.locales) {
    //     for (const product_cat of paramsCat) {
    //         const products = await getAllSlugs('prodotto', locale, product_cat);
    //         console.log(products);
    //     }
    // }
    // for (const locale of routing.locales) {
    //     const slugs = await getAllSlugs("prodotto", locale);
    //     for (const product of slugs) {
    //         params.push({ locale, product_cat, product });
    //     }
    // }
    return [];
}