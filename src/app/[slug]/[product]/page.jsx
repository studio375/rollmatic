import { fetchAPI } from "@/helpers/api/fetch-api";
import { notFound } from "next/navigation";
import ProductPage from "./clientProductPage";

export default async function Page({params}){
    const {slug, product} = await params;
    
    const prodotto = await fetchAPI('prodotto', {
        slug: product,
        acf_format: "standard",
        _embed: true
    });
    const cat = prodotto._embedded['wp:term'][0][0];
    if(!prodotto) notFound();
    
    return <ProductPage prodotto={prodotto} cat={cat} />;
}